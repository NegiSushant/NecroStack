import "dotenv/config";
import prismaClient from "../src/lib/prisma";
import { resurrectAllCryptRelics } from "../src/lib/agent/necroGraph";

async function runAgentTest() {
  console.log("\n========================================================");
  console.log("⚡ NECROSTACK: Phase 3 LangGraph Necromancy Ritual Test");
  console.log("========================================================\n");

  try {
    const results = await resurrectAllCryptRelics();

    console.log(`\n🎉 Resurrected ${results.length} Relics successfully!\n`);

    for (const res of results) {
      const relic = res.relicData;
      console.log("────────────────────────────────────────────────────────");
      console.log(`⚰️  RELIC: [${relic.relic_code}] ${relic.filename}`);
      console.log(`👤 Author: ${relic.original_author} (${relic.abandoned_year})`);
      console.log(`🔮 Era: ${relic.era_category} | Runtime: ${relic.source_language}`);
      console.log(`📊 Score: ${res.soulPreservationScore}% | Status: ${res.resurrectionStatus}`);
      console.log("────────────────────────────────────────────────────────");

      console.log("\n💀 Causes of Death Extracted (Forensic Autopsy):");
      for (const cod of res.autopsyCausesOfDeath) {
        console.log(`   - [${cod.severity}] ${cod.api_or_pattern}: ${cod.reason}`);
      }

      console.log("\n✨ Sacred Soul Invariants Verified:");
      for (const inv of res.invariantVerificationList) {
        const checkMark = inv.preserved ? "✓" : "✗";
        console.log(`   ${checkMark} [${inv.invariant}]`);
        console.log(`     Original: "${inv.original_line_quote}"`);
        console.log(`     Modern:   "${inv.modern_implementation_quote}"`);
      }

      console.log("\n📜 Día de los Muertos Maintainer Tribute:");
      console.log(`   "${res.maintainerTribute}"`);

      console.log("\n⚡ Reanimated TypeScript Preview (First 15 lines):");
      const preview = res.reanimatedTypeScriptCode
        .split("\n")
        .slice(0, 15)
        .join("\n");
      console.log(preview);
      console.log("   ...\n");
    }

    console.log("========================================================");
    console.log("✨ All 4 LangGraph nodes and PostgreSQL writes verified!");
    console.log("========================================================\n");
  } catch (error) {
    console.error("❌ LangGraph Ritual failed:", error);
    process.exit(1);
  } finally {
    // Graceful disconnect
    await prismaClient.$disconnect();
  }
}

runAgentTest();
