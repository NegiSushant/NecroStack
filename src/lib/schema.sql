-- ==============================================================================
-- NecroStack Phase 2 Database Schema
-- The Abandoned Open-Source & Dead Code Resurrector
-- PostgreSQL 16 + pgvector Schema with HNSW Cosine Indexing
-- ==============================================================================

-- 1. Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Drop existing Phase 2 tables in reverse dependency order for idempotent seeding
DROP TABLE IF EXISTS reanimated_modules CASCADE;
DROP TABLE IF EXISTS dead_relics CASCADE;
DROP TABLE IF EXISTS migration_grimoire CASCADE;

-- 3. The Migration Grimoire: Curated modern architectural replacement patterns
CREATE TABLE migration_grimoire (
    id SERIAL PRIMARY KEY,
    era_category VARCHAR(100) NOT NULL,
    deprecated_pattern VARCHAR(200) NOT NULL,
    modern_replacement_title TEXT NOT NULL,
    rule_text TEXT NOT NULL,
    code_example TEXT NOT NULL,
    embedding vector(1024)
);

-- HNSW Cosine similarity index for fast approximate nearest neighbor search
CREATE INDEX idx_migration_grimoire_embedding 
    ON migration_grimoire 
    USING hnsw (embedding vector_cosine_ops);

-- B-tree index for filtering by era category during hybrid search
CREATE INDEX idx_migration_grimoire_era_category 
    ON migration_grimoire (era_category);

-- 4. The Crypt Queue: Catalog of dead & abandoned open-source relics
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

-- Index for querying relic status and era in the Crypt UI
CREATE INDEX idx_dead_relics_status ON dead_relics (status);
CREATE INDEX idx_dead_relics_era ON dead_relics (era_category);

-- 5. Reanimated Modules: Output of the LangGraph Necromancy Agent
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
