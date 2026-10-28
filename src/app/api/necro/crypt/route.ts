import { NextResponse } from "next/server";
import prismaClient from "@/lib/prisma";
import { LLM_MODEL_NAME } from "@/lib/config";


export async function GET() {
  try {
    // 1. Fetch all relics with their reanimated module details
    const relics = await prismaClient.dead_relics.findMany({
      include: {
        reanimated_modules: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    // 2. Fetch all migration grimoire patterns (selecting non-vector columns for safe JSON transport)
    const grimoireEntries = await prismaClient.migration_grimoire.findMany({
      select: {
        id: true,
        era_category: true,
        deprecated_pattern: true,
        modern_replacement_title: true,
        rule_text: true,
        code_example: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    // 3. Attach matching grimoire patterns to each relic for UI context
    const relicsWithGrimoire = relics.map((relic) => {
      const matchingPatterns = grimoireEntries.filter(
        (g) => g.era_category === relic.era_category
      );
      return {
        ...relic,
        matched_grimoire_patterns: matchingPatterns,
      };
    });

    // 4. Compute KPI Metrics & Telemetry
    const totalRelics = relics.length;
    const inCryptCount = relics.filter((r) => r.status === "IN_CRYPT").length;
    const reanimatedCount = relics.filter(
      (r) => r.status === "REANIMATED" || r.status === "VERIFIED"
    ).length;
    const verifiedCount = relics.filter((r) => r.status === "VERIFIED").length;

    let cvesAndDeadApisBanished = 0;
    let soulsPreservedCount = 0;
    const reanimatedScores: number[] = [];

    for (const r of relics) {
      const mod = r.reanimated_modules;
      if (mod) {
        // Count banished CVEs / causes of death
        if (Array.isArray(mod.autopsy_causes_of_death)) {
          cvesAndDeadApisBanished += mod.autopsy_causes_of_death.length;
        } else if (r.known_symptoms) {
          cvesAndDeadApisBanished += r.known_symptoms.length;
        }

        // Count preserved soul invariants
        if (Array.isArray(mod.soul_invariants_checklist)) {
          const preserved = (mod.soul_invariants_checklist as any[]).filter(
            (inv) => inv.preserved === true
          );
          soulsPreservedCount += preserved.length;
        }

        reanimatedScores.push(mod.soul_preservation_score);
      }
    }

    const averageSoulScore =
      reanimatedScores.length > 0
        ? Math.round(
            reanimatedScores.reduce((acc, score) => acc + score, 0) /
              reanimatedScores.length
          )
        : totalRelics > 0 && inCryptCount === 0
        ? 100
        : 0;

    const stats = {
      totalRelics,
      inCryptCount,
      reanimatedCount,
      verifiedCount,
      cvesAndDeadApisBanished,
      soulsPreservedCount,
      averageSoulScore,
      telemetry: {
        inferenceEngine: LLM_MODEL_NAME ? `${LLM_MODEL_NAME} (Docker Model Runner)` : "ai/gemma3:4B-F16 (Docker Model Runner)",
        grimoireStore: "PostgreSQL pgvector (HNSW Hybrid Index)",
        codeEgressBytes: 0,
        digitalPermanence: "100% Offline-Capable / Zero Cloud Lock-In",
      },
    };

    return NextResponse.json({
      success: true,
      stats,
      relics: relicsWithGrimoire,
      grimoire: grimoireEntries,
    });
  } catch (error: any) {
    console.error("[GET /api/necro/crypt] Failed to load crypt queue:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to query crypt queue",
      },
      { status: 500 }
    );
  }
}
