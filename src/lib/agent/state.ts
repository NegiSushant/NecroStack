import { Annotation } from "@langchain/langgraph";

export interface CauseOfDeath {
  api_or_pattern: string;
  severity: "CRITICAL_CVE" | "REMOVED_API" | "OBSOLETE_SYNTAX";
  reason: string;
}

export interface SoulInvariantVerification {
  invariant: string;
  preserved: boolean;
  original_line_quote: string;
  modern_implementation_quote: string;
}

export interface GrimoirePatternMatch {
  id: number;
  era_category: string;
  deprecated_pattern: string;
  modern_replacement_title: string;
  rule_text: string;
  code_example: string;
  similarity?: number;
}

/**
 * NecroGraphState defines the state channels flowing through the 4-Node LangGraph Ritual.
 */
export const NecroGraphState = Annotation.Root({
  relicId: Annotation<number>(),
  relicData: Annotation<any>(),
  autopsyCausesOfDeath: Annotation<CauseOfDeath[]>({
    reducer: (_, next) => next,
    default: () => [],
  }),
  soulInvariantsList: Annotation<Array<{ invariant: string; original_line_quote: string }>>({
    reducer: (_, next) => next,
    default: () => [],
  }),
  grimoirePatterns: Annotation<GrimoirePatternMatch[]>({
    reducer: (_, next) => next,
    default: () => [],
  }),
  reanimatedTypeScriptCode: Annotation<string>({
    reducer: (_, next) => next,
    default: () => "",
  }),
  invariantVerificationList: Annotation<SoulInvariantVerification[]>({
    reducer: (_, next) => next,
    default: () => [],
  }),
  generatedUnitTests: Annotation<string>({
    reducer: (_, next) => next,
    default: () => "",
  }),
  maintainerTribute: Annotation<string>({
    reducer: (_, next) => next,
    default: () => "",
  }),
  resurrectionStatus: Annotation<"SOUL_PRESERVED" | "MUTATION_DETECTED">({
    reducer: (_, next) => next,
    default: () => "MUTATION_DETECTED",
  }),
  soulPreservationScore: Annotation<number>({
    reducer: (_, next) => next,
    default: () => 0,
  }),
  reanimatedModuleId: Annotation<number | null>({
    reducer: (_, next) => next,
    default: () => null,
  }),
  executionLogs: Annotation<string[]>({
    reducer: (a, b) => a.concat(b),
    default: () => [],
  }),
});

export type NecroGraphStateType = typeof NecroGraphState.State;
