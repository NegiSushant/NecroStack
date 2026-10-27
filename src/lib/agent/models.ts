import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { generateLocalEmbedding } from "../embeddings";
import { DOCKER_MODEL_BASE_URL, LLM_MODEL_NAME } from "../config";


// Local Gemma LLM instance
export const gemmaModel = new ChatOpenAI({
  modelName: LLM_MODEL_NAME,
  apiKey: "docker-model-runner-local",
  configuration: {
    baseURL: DOCKER_MODEL_BASE_URL.replace(/\/$/, ""),
  },
  temperature: 0.1,
  maxRetries: 0,
  timeout: 4000,
});

// Generates an embedding vector for hybrid search querying
export async function generateQueryEmbedding(text: string): Promise<number[]> {
  return generateLocalEmbedding(text);
}

/**
 * Robust JSON extraction utility that cleanses LLM output by removing:
 * - <think>...</think> reasoning tags
 * - ```json ... ``` code blocks
 * - Leading and trailing non-JSON prose
 */
export function extractJsonFromLLM<T>(rawContent: string, fallback: T): T {
  if (!rawContent || typeof rawContent !== "string") {
    return fallback;
  }

  try {
    // 1. Remove <think>...</think> blocks from reasoning models
    let cleaned = rawContent.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

    // 2. Remove markdown code fences if present
    const codeBlockMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    if (codeBlockMatch && codeBlockMatch[1]) {
      cleaned = codeBlockMatch[1].trim();
    }

    // 3. Direct JSON parse attempt
    try {
      return JSON.parse(cleaned) as T;
    } catch {
      // 4. Fallback: Search for outer matching { ... } or [ ... ]
      const firstCurly = cleaned.indexOf("{");
      const lastCurly = cleaned.lastIndexOf("}");
      const firstSquare = cleaned.indexOf("[");
      const lastSquare = cleaned.lastIndexOf("]");

      if (
        firstCurly !== -1 &&
        lastCurly !== -1 &&
        (firstSquare === -1 || firstCurly < firstSquare) &&
        lastCurly > firstCurly
      ) {
        const jsonSlice = cleaned.slice(firstCurly, lastCurly + 1);
        return JSON.parse(jsonSlice) as T;
      }

      if (
        firstSquare !== -1 &&
        lastSquare !== -1 &&
        (firstCurly === -1 || firstSquare < firstCurly) &&
        lastSquare > firstSquare
      ) {
        const jsonSlice = cleaned.slice(firstSquare, lastSquare + 1);
        return JSON.parse(jsonSlice) as T;
      }
    }

    return fallback;
  } catch (err) {
    console.error("[extractJsonFromLLM] Failed to parse JSON, using fallback:", err);
    return fallback;
  }
}
