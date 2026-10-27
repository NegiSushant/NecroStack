import "dotenv/config";

export const DOCKER_MODEL_BASE_URL = process.env.DOCKER_MODEL_BASE_URL || "http://localhost:12434/engines/llama.cpp/v1";
export const LLM_MODEL_NAME = process.env.LLM_MODEL_NAME || "ai/gemma3:4B-F16";
export const EMBEDDING_MODEL_NAME = process.env.EMBEDDING_MODEL_NAME || "ai/mxbai-embed-large";