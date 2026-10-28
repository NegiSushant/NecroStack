import { NextRequest, NextResponse } from "next/server";
import prismaClient from "@/lib/prisma";
import { resurrectCustomDeadCode } from "@/lib/agent/necroGraph";


interface CustomRelicPayload {
  filename: string;
  sourceLanguage: string;
  legacyCode: string;
  eraCategory?: string;
  originalAuthor?: string;
  abandonedYear?: number;
  backstory?: string;
  runImmediately?: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<CustomRelicPayload>;

    // 1. Validation
    if (
      !body.filename ||
      typeof body.filename !== "string" ||
      !body.sourceLanguage ||
      typeof body.sourceLanguage !== "string" ||
      !body.legacyCode ||
      typeof body.legacyCode !== "string" ||
      body.filename.trim() === "" ||
      body.legacyCode.trim() === ""
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Fields 'filename', 'sourceLanguage', and 'legacyCode' are required and must be non-empty strings.",
        },
        { status: 400 }
      );
    }

    const runImmediately = body.runImmediately !== false;

    // 2. If runImmediately is true, invoke full LangGraph reanimation ritual
    if (runImmediately) {
      const { relic, resurrectionState } = await resurrectCustomDeadCode({
        filename: body.filename.trim(),
        sourceLanguage: body.sourceLanguage.trim(),
        legacyCode: body.legacyCode,
        originalAuthor: body.originalAuthor?.trim(),
        abandonedYear: body.abandonedYear,
        backstory: body.backstory?.trim(),
      });

      return NextResponse.json(
        {
          success: true,
          relicId: relic.id,
          relic,
          result: resurrectionState,
        },
        { status: 201 }
      );
    }

    // 3. Otherwise, inter into the Crypt Queue without immediately resurrecting
    const uniqueCode = `CUSTOM-2026-${Date.now().toString(36).toUpperCase()}`;

    const langLower = `${body.sourceLanguage} ${body.filename} ${body.legacyCode}`.toLowerCase();
    let eraCategory = body.eraCategory || "Node.js v4 Legacy Crypto";
    if (!body.eraCategory) {
      if (langLower.includes("jquery") || langLower.includes("dom") || langLower.includes("ajax")) {
        eraCategory = "jQuery 1.8 DOM & AJAX";
      } else if (langLower.includes("python") || langLower.includes("urllib") || langLower.includes("ledger")) {
        eraCategory = "Python 2.7 Financial & IO";
      }
    }

    const relic = await prismaClient.dead_relics.create({
      data: {
        relic_code: uniqueCode,
        filename: body.filename.trim(),
        original_author: body.originalAuthor?.trim() || "@anonymous_maintainer",
        abandoned_year: body.abandonedYear || 2016,
        source_language: body.sourceLanguage.trim(),
        era_category: eraCategory,
        backstory:
          body.backstory?.trim() ||
          "Custom dead code relic submitted directly to the NecroStack Crypt for automated resurrection.",
        legacy_code: body.legacyCode,
        known_symptoms: ["Custom legacy code awaiting modern TypeScript reanimation"],
        expected_soul_invariants: {
          custom_algorithm_preservation: {
            invariant: "Custom Algorithm & Boundary Edge-Case Preservation",
            description: "Preserves custom business logic, error boundaries, and input sanitization",
          },
        },
        status: "IN_CRYPT",
      },
    });

    return NextResponse.json(
      {
        success: true,
        relicId: relic.id,
        relic,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[POST /api/necro/custom] Error ingesting custom relic:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to process custom code relic",
      },
      { status: 500 }
    );
  }
}
