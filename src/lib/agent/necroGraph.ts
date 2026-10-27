import { StateGraph, START, END } from "@langchain/langgraph";
import prismaClient from "../prisma";
import { NecroGraphState, NecroGraphStateType } from "./state";
import {
  performForensicAutopsy,
  consultMigrationGrimoire,
  reanimateIntoTypeScript,
  verifyVitalSignsAndSave,
} from "./nodes";

// The 4-Node LangGraph Necromancy Ritual StateGraph
const workflow = new StateGraph(NecroGraphState)
  .addNode("performForensicAutopsy", performForensicAutopsy)
  .addNode("consultMigrationGrimoire", consultMigrationGrimoire)
  .addNode("reanimateIntoTypeScript", reanimateIntoTypeScript)
  .addNode("verifyVitalSignsAndSave", verifyVitalSignsAndSave)
  .addEdge(START, "performForensicAutopsy")
  .addEdge("performForensicAutopsy", "consultMigrationGrimoire")
  .addEdge("consultMigrationGrimoire", "reanimateIntoTypeScript")
  .addEdge("reanimateIntoTypeScript", "verifyVitalSignsAndSave")
  .addEdge("verifyVitalSignsAndSave", END);

//Compiled LangGraph executable workflow
export const necroWorkflow = workflow.compile();

//Convenience Helper 1: Resurrect a single relic by its database ID
export async function resurrectSingleRelic(
  relicId: number
): Promise<NecroGraphStateType> {
  const result = await necroWorkflow.invoke({ relicId });
  return result as NecroGraphStateType;
}

// Convenience Helper 2: Resurrect all relics currently waiting in the Crypt
export async function resurrectAllCryptRelics(): Promise<NecroGraphStateType[]> {
  // Query all relics currently marked IN_CRYPT
  let targets = await prismaClient.dead_relics.findMany({
    where: { status: "IN_CRYPT" },
    orderBy: { id: "asc" },
  });

  // If all are already reanimated, re-run for all relics
  if (targets.length === 0) {
    targets = await prismaClient.dead_relics.findMany({
      orderBy: { id: "asc" },
    });
  }

  const results: NecroGraphStateType[] = [];
  for (const relic of targets) {
    console.log(`\nInvoking Necromancy Ritual for [${relic.relic_code}] ${relic.filename}...`);
    const state = await resurrectSingleRelic(relic.id);
    results.push(state);
  }

  return results;
}

// Convenience Helper 3: Ingest, inter, and immediately resurrect custom dead code snippet
export async function resurrectCustomDeadCode(input: {
  filename: string;
  sourceLanguage: string;
  legacyCode: string;
  originalAuthor?: string;
  abandonedYear?: number;
  backstory?: string;
}): Promise<{
  relic: any;
  resurrectionState: NecroGraphStateType;
}> {
  const uniqueCode = `CUSTOM-2026-${Date.now().toString(36).toUpperCase()}`;

  // Heuristic era categorization for hybrid search
  const langLower = (input.sourceLanguage + " " + input.filename + " " + input.legacyCode).toLowerCase();
  let eraCategory = "Node.js v4 Legacy Crypto";
  if (langLower.includes("jquery") || langLower.includes("dom") || langLower.includes("ajax")) {
    eraCategory = "jQuery 1.8 DOM & AJAX";
  } else if (langLower.includes("python") || langLower.includes("urllib") || langLower.includes("ledger")) {
    eraCategory = "Python 2.7 Financial & IO";
  }

  // Insert into dead_relics via prismaClient
  const newRelic = await prismaClient.dead_relics.create({
    data: {
      relic_code: uniqueCode,
      filename: input.filename,
      original_author: input.originalAuthor || "@anonymous_maintainer",
      abandoned_year: input.abandonedYear || 2016,
      source_language: input.sourceLanguage,
      era_category: eraCategory,
      backstory:
        input.backstory ||
        "Custom dead code relic submitted directly to the NecroStack Crypt for automated resurrection.",
      legacy_code: input.legacyCode,
      known_symptoms: ["Custom legacy code submitted for modern TypeScript reanimation"],
      expected_soul_invariants: {
        custom_algorithm_preservation: {
          invariant: "Custom Algorithm & Boundary Edge-Case Preservation",
          description: "Preserves custom business logic, error boundaries, and input sanitization",
        },
      },
      status: "IN_CRYPT",
    },
  });

  // Execute workflow
  const resurrectionState = await resurrectSingleRelic(newRelic.id);

  return {
    relic: newRelic,
    resurrectionState,
  };
}
