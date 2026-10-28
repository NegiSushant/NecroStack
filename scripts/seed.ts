import "dotenv/config";
import bcrypt from "bcryptjs";
import { pool } from "../src/lib/db";
import {
  generateLocalEmbedding,
  formatVectorForPg,
} from "../src/lib/embeddings";
import {
  migrationGrimoirePatterns,
  deadRelics,
} from "../src/lib/seed-data";

async function runSeed() {
  console.log("\n========================================================");
  console.log("💀 NECROSTACK: Phase 2 Database Schema & Seed Ritual");
  console.log("========================================================\n");

  try {
    // 1. Probe local embedding dimension
    console.log("🔮 Step 1: Probing embedding model dimension...");
    const probeVector = await generateLocalEmbedding("NecroStack Model Probe");
    const embeddingDim = probeVector.length;
    console.log(`   Detected vector dimension: ${embeddingDim} floats\n`);

    // 2. Execute DDL Schema Creation
    console.log("⚡ Step 2: Applying idempotent PostgreSQL schema with pgvector & HNSW...");
    const ddl = `
      -- Enable vector extension
      CREATE EXTENSION IF NOT EXISTS vector;

      -- Drop existing tables in reverse dependency order
      DROP TABLE IF EXISTS reanimated_modules CASCADE;
      DROP TABLE IF EXISTS dead_relics CASCADE;
      DROP TABLE IF EXISTS migration_grimoire CASCADE;

      -- 1. Migration Grimoire table with dynamic vector dimension
      CREATE TABLE migration_grimoire (
          id SERIAL PRIMARY KEY,
          era_category VARCHAR(100) NOT NULL,
          deprecated_pattern VARCHAR(200) NOT NULL,
          modern_replacement_title TEXT NOT NULL,
          rule_text TEXT NOT NULL,
          code_example TEXT NOT NULL,
          embedding vector(${embeddingDim})
      );

      -- HNSW cosine index for sub-millisecond approximate nearest neighbor lookup
      CREATE INDEX idx_migration_grimoire_embedding 
          ON migration_grimoire 
          USING hnsw (embedding vector_cosine_ops);

      -- B-Tree index for hybrid era filtering
      CREATE INDEX idx_migration_grimoire_era_category 
          ON migration_grimoire (era_category);

      -- 2. Dead Relics table ("The Crypt Queue")
      CREATE TABLE dead_relics (
          id SERIAL PRIMARY KEY,
          relic_code VARCHAR(50) UNIQUE NOT NULL,
          filename VARCHAR(150) NOT NULL,
          original_author VARCHAR(150) NOT NULL,
          abandoned_year INTEGER NOT NULL,
          source_language VARCHAR(100) NOT NULL,
          era_category VARCHAR(100) NOT NULL,
          backstory TEXT NOT NULL,
          legacy_code TEXT NOT NULL,
          known_symptoms TEXT[] NOT NULL,
          expected_soul_invariants JSONB NOT NULL,
          status VARCHAR(50) DEFAULT 'IN_CRYPT',
          created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE INDEX idx_dead_relics_status ON dead_relics (status);
      CREATE INDEX idx_dead_relics_era ON dead_relics (era_category);

      -- 3. Reanimated Modules table (LangGraph Agent Output)
      CREATE TABLE reanimated_modules (
          id SERIAL PRIMARY KEY,
          relic_id INTEGER UNIQUE REFERENCES dead_relics(id) ON DELETE CASCADE,
          resurrection_status VARCHAR(50) NOT NULL,
          soul_preservation_score INTEGER NOT NULL CHECK (soul_preservation_score BETWEEN 0 AND 100),
          autopsy_causes_of_death JSONB NOT NULL,
          soul_invariants_checklist JSONB NOT NULL,
          reanimated_typescript_code TEXT NOT NULL,
          generated_unit_tests TEXT NOT NULL,
          maintainer_tribute TEXT NOT NULL,
          updated_at TIMESTAMP DEFAULT NOW()
      );

      CREATE INDEX idx_reanimated_modules_status ON reanimated_modules (resurrection_status);

      -- 4. Users table (Lead Necromancers & Authenticated Operators)
      CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(150) UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          role VARCHAR(50) DEFAULT 'Lead Necromancer',
          last_sign_in_at TIMESTAMP,
          created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
    `;

    await pool.query(ddl);
    console.log("   Schema & HNSW indices created successfully.\n");

    // 3. Vectorize and Insert Migration Grimoire patterns
    console.log(
      `📜 Step 3: Vectorizing ${migrationGrimoirePatterns.length} Migration Grimoire patterns...`
    );
    for (const pattern of migrationGrimoirePatterns) {
      const textToEmbed = `${pattern.era_category} ${pattern.deprecated_pattern} ${pattern.modern_replacement_title} ${pattern.rule_text}`;
      const vector = await generateLocalEmbedding(textToEmbed, embeddingDim);
      const vectorLiteral = formatVectorForPg(vector);

      await pool.query(
        `INSERT INTO migration_grimoire 
          (era_category, deprecated_pattern, modern_replacement_title, rule_text, code_example, embedding)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          pattern.era_category,
          pattern.deprecated_pattern,
          pattern.modern_replacement_title,
          pattern.rule_text,
          pattern.code_example,
          vectorLiteral,
        ]
      );
      console.log(`   ✓ [${pattern.era_category}] ${pattern.modern_replacement_title}`);
    }
    console.log("");

    // 4. Insert Dead Relics into Crypt Queue
    console.log(`⚰️  Step 4: Interring ${deadRelics.length} Dead Code Relics into the Crypt...`);
    for (const relic of deadRelics) {
      await pool.query(
        `INSERT INTO dead_relics (
          relic_code, filename, original_author, abandoned_year,
          source_language, era_category, backstory, legacy_code,
          known_symptoms, expected_soul_invariants, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          relic.relic_code,
          relic.filename,
          relic.original_author,
          relic.abandoned_year,
          relic.source_language,
          relic.era_category,
          relic.backstory,
          relic.legacy_code,
          relic.known_symptoms,
          JSON.stringify(relic.expected_soul_invariants),
          relic.status,
        ]
      );
      console.log(`   ✓ Queued [${relic.relic_code}] ${relic.filename} (${relic.abandoned_year})`);
    }
    console.log("");

    // 5. Seed Judge / Demo account
    console.log("🕯️ Step 5: Seeding Hacktoberfest Judge demo account...");
    const judgePasswordHash = await bcrypt.hash("hacktoberfest2026", 10);
    await pool.query(
      `INSERT INTO users (name, email, password_hash, role)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (email) DO UPDATE
       SET password_hash = EXCLUDED.password_hash,
           name = EXCLUDED.name,
           role = EXCLUDED.role`,
      [
        "Hacktoberfest Judge",
        "judge@necrostack.dev",
        judgePasswordHash,
        "Lead Necromancer",
      ]
    );
    console.log("   ✓ Demo Judge user ready: judge@necrostack.dev\n");

    // 6. Print Summary Table
    console.log("📊 SEED SUMMARY REPORT:");
    console.table([
      {
        Component: "PostgreSQL Database",
        Status: "Connected",
        Details: "pgvector extension active",
      },
      {
        Component: "Embedding Dimension",
        Status: "Configured",
        Details: `${embeddingDim} floats (HNSW vector_cosine_ops)`,
      },
      {
        Component: "Migration Grimoire",
        Status: "Seeded",
        Details: `${migrationGrimoirePatterns.length} patterns vectorized`,
      },
      {
        Component: "Crypt Relic Queue",
        Status: "Seeded",
        Details: `${deadRelics.length} relics in IN_CRYPT state`,
      },
      {
        Component: "Demo Judge User",
        Status: "Seeded",
        Details: "judge@necrostack.dev (hacktoberfest2026)",
      },
    ]);

    console.log("⚰️  CRYPT RELICS CATALOG:");
    console.table(
      deadRelics.map((r) => ({
        Code: r.relic_code,
        Filename: r.filename,
        Language: r.source_language,
        Era: r.era_category,
        Status: r.status,
      }))
    );

    console.log("\n🎉 Phase 2 Database Schema & Seed ritual completed successfully!\n");
  } catch (error) {
    console.error("❌ Seeding ritual failed:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runSeed();
