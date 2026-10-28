import { NextRequest, NextResponse } from "next/server";
import prismaClient from "@/lib/prisma";


interface ModulePatchPayload {
  action: "SAVE_CODE_EDITS" | "TOGGLE_INVARIANT" | "VERIFY_AND_PUBLISH";
  reanimatedTypeScriptCode?: string;
  generatedUnitTests?: string;
  invariantIndex?: number;
  verifierName?: string;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ relicId: string }> }
) {
  try {
    const { relicId: relicIdStr } = await params;
    const relicId = parseInt(relicIdStr, 10);

    if (isNaN(relicId)) {
      return NextResponse.json(
        { success: false, error: "Invalid relicId provided in URL path." },
        { status: 400 }
      );
    }

    const body = (await req.json()) as Partial<ModulePatchPayload>;

    // 1. Fetch current module
    const existingModule = await prismaClient.reanimated_modules.findUnique({
      where: { relic_id: relicId },
    });

    if (!existingModule) {
      return NextResponse.json(
        {
          success: false,
          error: `No reanimated module found for relic #${relicId}. Run resurrection first.`,
        },
        { status: 404 }
      );
    }

    // 2. Process Actions
    if (body.action === "SAVE_CODE_EDITS") {
      await prismaClient.reanimated_modules.update({
        where: { relic_id: relicId },
        data: {
          reanimated_typescript_code:
            body.reanimatedTypeScriptCode !== undefined
              ? body.reanimatedTypeScriptCode
              : existingModule.reanimated_typescript_code,
          generated_unit_tests:
            body.generatedUnitTests !== undefined
              ? body.generatedUnitTests
              : existingModule.generated_unit_tests,
          updated_at: new Date(),
        },
      });
    } else if (body.action === "TOGGLE_INVARIANT") {
      const checklist = Array.isArray(existingModule.soul_invariants_checklist)
        ? [...(existingModule.soul_invariants_checklist as any[])]
        : [];

      const idx = typeof body.invariantIndex === "number" ? body.invariantIndex : 0;
      if (checklist[idx]) {
        const isPreserved = checklist[idx].preserved === true;
        checklist[idx] = {
          ...checklist[idx],
          preserved: !isPreserved,
          modern_implementation_quote: !isPreserved
            ? "Verified & patched by engineer during review"
            : checklist[idx].modern_implementation_quote,
        };
      }

      const total = checklist.length || 1;
      const preservedCount = checklist.filter((item: any) => item.preserved === true).length;
      const soulPreservationScore = Math.round((preservedCount / total) * 100);
      const resurrectionStatus: "SOUL_PRESERVED" | "MUTATION_DETECTED" =
        soulPreservationScore === 100 ? "SOUL_PRESERVED" : "MUTATION_DETECTED";

      await prismaClient.reanimated_modules.update({
        where: { relic_id: relicId },
        data: {
          soul_invariants_checklist: checklist,
          soul_preservation_score: soulPreservationScore,
          resurrection_status: resurrectionStatus,
          updated_at: new Date(),
        },
      });
    } else if (body.action === "VERIFY_AND_PUBLISH") {
      const verifier = body.verifierName?.trim() || "Lead Necromancer";
      const stamp = `// ✔ VITAL SIGNS VERIFIED & PUBLISHED TO MODERN STACK BY: ${verifier} on ${new Date().toISOString()}\n`;

      let code = existingModule.reanimated_typescript_code;
      if (!code.includes("VITAL SIGNS VERIFIED & PUBLISHED TO MODERN STACK")) {
        code = stamp + code;
      }

      // Mark all checklist invariants as preserved upon verification
      const checklist = Array.isArray(existingModule.soul_invariants_checklist)
        ? (existingModule.soul_invariants_checklist as any[]).map((inv) => ({
            ...inv,
            preserved: true,
            modern_implementation_quote:
              inv.modern_implementation_quote || `Verified & certified by ${verifier}`,
          }))
        : [];

      await prismaClient.reanimated_modules.update({
        where: { relic_id: relicId },
        data: {
          reanimated_typescript_code: code,
          soul_invariants_checklist: checklist,
          resurrection_status: "SOUL_PRESERVED",
          soul_preservation_score: 100,
          updated_at: new Date(),
        },
      });

      await prismaClient.dead_relics.update({
        where: { id: relicId },
        data: { status: "VERIFIED" },
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: `Unsupported action: '${body.action}'. Supported: 'SAVE_CODE_EDITS' | 'TOGGLE_INVARIANT' | 'VERIFY_AND_PUBLISH'.`,
        },
        { status: 400 }
      );
    }

    // 3. Return updated relic & reanimated module
    const updatedRelic = await prismaClient.dead_relics.findUnique({
      where: { id: relicId },
      include: { reanimated_modules: true },
    });

    return NextResponse.json({
      success: true,
      relic: updatedRelic,
    });
  } catch (error: any) {
    console.error("[PATCH /api/necro/module/[relicId]] Error updating module:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to update reanimated module",
      },
      { status: 500 }
    );
  }
}
