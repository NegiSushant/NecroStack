import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "necrostack-local-open-source-secret-key-2026"
);

export interface AuthUserPayload {
  userId: number;
  email: string;
  name: string;
  role: string;
}

/**
 * Hash raw password using bcryptjs
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

/**
 * Compare raw password with bcrypt hash
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Sign a JWT auth token using jose
 */
export async function signAuthToken(payload: AuthUserPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

/**
 * Verify a JWT auth token using jose
 */
export async function verifyAuthToken(
  token: string
): Promise<AuthUserPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      userId: Number(payload.userId),
      email: String(payload.email),
      name: String(payload.name),
      role: String(payload.role || "Lead Necromancer"),
    };
  } catch {
    return null;
  }
}

/**
 * Server helper to read necro_session cookie and retrieve authenticated user
 */
export async function getCurrentUser(): Promise<AuthUserPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("necro_session")?.value;
    if (!token) return null;
    return await verifyAuthToken(token);
  } catch {
    return null;
  }
}

