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

export interface ReanimatedModuleRecord {
  id: number;
  relic_id: number;
  resurrection_status: "SOUL_PRESERVED" | "MUTATION_DETECTED" | string;
  soul_preservation_score: number;
  autopsy_causes_of_death: CauseOfDeath[];
  soul_invariants_checklist: SoulInvariantVerification[];
  reanimated_typescript_code: string;
  generated_unit_tests: string;
  maintainer_tribute: string;
  updated_at: string;
}

export interface DeadRelicRecord {
  id: number;
  relic_code: string;
  filename: string;
  original_author: string;
  abandoned_year: number;
  source_language: string;
  era_category: string;
  backstory: string;
  legacy_code: string;
  known_symptoms: string[];
  expected_soul_invariants: Record<string, { invariant: string; description: string }>;
  status: "IN_CRYPT" | "REANIMATED" | "VERIFIED" | string;
  created_at: string;
  reanimated_modules?: ReanimatedModuleRecord | null;
  matched_grimoire_patterns?: GrimoirePatternMatch[];
}

export interface CryptStats {
  totalRelics: number;
  inCryptCount: number;
  reanimatedCount: number;
  verifiedCount: number;
  cvesAndDeadApisBanished: number;
  soulsPreservedCount: number;
  averageSoulScore: number;
  telemetry: {
    inferenceEngine: string;
    grimoireStore: string;
    codeEgressBytes: number;
    digitalPermanence: string;
  };
}

export interface SSEEventPayload {
  type:
    | "ritual_start"
    | "relic_start"
    | "node_active"
    | "node_complete"
    | "relic_complete"
    | "ritual_complete"
    | "error";
  relicId?: number;
  filename?: string;
  sourceLanguage?: string;
  abandonedYear?: number;
  eraCategory?: string;
  step?: number;
  node?: string;
  label?: string;
  logs?: string[];
  resurrectionStatus?: "SOUL_PRESERVED" | "MUTATION_DETECTED";
  soulPreservationScore?: number;
  totalRelics?: number;
  totalProcessed?: number;
  message?: string;
  data?: Record<string, any>;
}
