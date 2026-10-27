import "dotenv/config";
import { DOCKER_MODEL_BASE_URL, EMBEDDING_MODEL_NAME } from "./config";

const DEFAULT_FALLBACK_DIMENSION = 1024;

let hasLoggedFallbackWarning = false;

/**
 * Deterministic pseudo-random number generator (Mulberry32) seeded by text hash.
 * Produces unit-normalized vectors suitable for cosine similarity.
 */
function createDeterministicFallbackVector(
  text: string,
  dim: number = DEFAULT_FALLBACK_DIMENSION
): number[] {
  // 32-bit FNV-1a hash of input string
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }

  // Mulberry32 PRNG
  let state = hash >>> 0;
  const nextFloat = () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const vector: number[] = new Array(dim);
  let normSq = 0;

  for (let i = 0; i < dim; i++) {
    // Generate values centered around 0 in [-1.0, 1.0]
    const val = nextFloat() * 2 - 1;
    vector[i] = val;
    normSq += val * val;
  }

  // Normalize to unit L2 length
  const norm = Math.sqrt(normSq) || 1;
  for (let i = 0; i < dim; i++) {
    vector[i] = Number((vector[i] / norm).toFixed(6));
  }

  return vector;
}

/**
 * Generates an embedding vector using the local Docker Model Runner (llama.cpp)
 * or gracefully falls back to deterministic seeded vectors if unreachable.
 */
export async function generateLocalEmbedding(
  text: string,
  fallbackDim: number = DEFAULT_FALLBACK_DIMENSION
): Promise<number[]> {
  const url = `${DOCKER_MODEL_BASE_URL.replace(/\/$/, "")}/embeddings`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: EMBEDDING_MODEL_NAME,
        input: text,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Endpoint returned status ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    const embedding = data?.data?.[0]?.embedding || data?.embedding;

    if (Array.isArray(embedding) && embedding.length > 0) {
      return embedding;
    }

    throw new Error("Invalid or empty embedding vector received from endpoint");
  } catch (err: any) {
    if (!hasLoggedFallbackWarning) {
      console.warn(
        `⚠️  [NecroStack Embedding] Local Docker Model Runner at ${url} unreachable (${err?.message || err}).`
      );
      console.warn(
        `   Using deterministic fallback embeddings (dim: ${fallbackDim}) to ensure repeatable offline execution.`
      );
      hasLoggedFallbackWarning = true;
    }
    return createDeterministicFallbackVector(text, fallbackDim);
  }
}

/**
 * Helper to format a JavaScript float array into PostgreSQL pgvector literal string "[v1,v2,...]"
 */
export function formatVectorForPg(vector: number[]): string {
  return `[${vector.join(",")}]`;
}
