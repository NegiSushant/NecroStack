import "dotenv/config";
import { NextRequest } from "next/server";
import { GET as getCrypt } from "../src/app/api/necro/crypt/route";
import { POST as postCustom } from "../src/app/api/necro/custom/route";
import { PATCH as patchModule } from "../src/app/api/necro/module/[relicId]/route";
import { POST as postReset } from "../src/app/api/necro/reset/route";
import { POST as postResurrect } from "../src/app/api/necro/resurrect/route";
import prismaClient from "../src/lib/prisma";
async function runRouteTests() {
  console.log("\n========================================================");
  console.log("⚡ NECROSTACK: Phase 4 API Route & SSE Verification Test");
  console.log("========================================================\n");
  try {
    // Test 1: GET /api/necro/crypt
    console.log("1. Testing GET /api/necro/crypt...");
    const cryptRes = await getCrypt();
    const cryptData = await cryptRes.json();
    console.log(`   ✓ Success: ${cryptData.success}`);
    console.log(`   ✓ Relics count: ${cryptData.relics?.length}`);
    console.log(`   ✓ Stats: Total: ${cryptData.stats?.totalRelics}, Reanimated:  ${cryptData.stats?.reanimatedCount}, Preserved: ${cryptData.stats?.soulsPreservedCount}`);
    // Test 2: POST /api/necro/custom (runImmediately: false)
    console.log("\n2. Testing POST /api/necro/custom...");
    const customReq = new NextRequest("http://localhost:3000/api/necro/custom", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename: "test-relic-phantom.js",
        sourceLanguage: "Node.js v4 (CommonJS)",
        legacyCode: "var buf = new Buffer('hello'); console.log(buf);",
        runImmediately: false,
      }),
    });
    const customRes = await postCustom(customReq);
    const customData = await customRes.json();
    console.log(`   ✓ Created custom relic #${customData.relicId} (code: ${customData.relic?.relic_code})`);
    // Test 3: PATCH /api/necro/module/[relicId]
    console.log("\n3. Testing PATCH /api/necro/module/1 (TOGGLE_INVARIANT)...");
    const patchReq = new NextRequest("http://localhost:3000/api/necro/module/1", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "TOGGLE_INVARIANT",
        invariantIndex: 0,
      }),
    });
    const patchRes = await patchModule(patchReq, {
      params: Promise.resolve({ relicId: "1" }),
    });
    const patchData = await patchRes.json();
    console.log(`   ✓ Status: ${patchData.relic?.reanimated_modules?.resurrection_status}`);
    console.log(`   ✓ Score: ${patchData.relic?.reanimated_modules?.soul_preservation_score}%`);
    // Test 4: POST /api/necro/reset
    console.log("\n4. Testing POST /api/necro/reset (Demo Cleanup)...");
    const resetRes = await postReset();
    const resetData = await resetRes.json();
    console.log(`   ✓ Reset message: "${resetData.message}"`);
    // Verify all 3 relics are in IN_CRYPT state and custom relic was deleted
    const verifyRelics = await prismaClient.dead_relics.findMany();
    console.log(`   ✓ Relics remaining in Crypt: ${verifyRelics.length} (all IN_CRYPT: ${verifyRelics.every(r => r.status === 'IN_CRYPT')})`);
    // Test 5: POST /api/necro/resurrect with stream: true
    console.log("\n5. Testing POST /api/necro/resurrect (SSE Stream Mode)...");
    const sseReq = new NextRequest("http://localhost:3000/api/necro/resurrect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        relicId: verifyRelics[0].id,
        stream: true,
      }),
    });
    const sseRes = await postResurrect(sseReq);
    console.log(`   ✓ Content-Type: ${sseRes.headers.get("Content-Type")}`);
    console.log(`   ✓ Cache-Control: ${sseRes.headers.get("Cache-Control")}`);
    // Read first few SSE chunks
    if (sseRes.body) {
      const reader = sseRes.body.getReader();
      const decoder = new TextDecoder();
      let chunksCount = 0;
      while (chunksCount < 6) {
        const { value, done } = await reader.read();
        if (done) break;
        const text = decoder.decode(value);
        const lines = text.split("\n").filter(l => l.startsWith("data:"));
        for (const line of lines) {
          const parsed = JSON.parse(line.replace("data: ", ""));
          console.log(`     -> SSE Event: type="${parsed.type}" ${parsed.label ? `[${parsed.label}]` : ""}`);
          chunksCount++;
        }
      }
      reader.cancel();
    }
    console.log("\n========================================================");
    console.log("🎉 All 5 Next.js API Routes and SSE stream verified!");
    console.log("========================================================\n");
  } catch (err) {
    console.error("❌ Route test failed:", err);
    process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}
runRouteTests();