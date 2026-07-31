import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
const OWNER_EMAIL = "zszoro818@gmail.com";
const OWNER_PASSWORD_HASH =
  "3f74ac7a2439d2d4422a07b942d5b19e5fc89f45303190f5cb31fba1d468ed82";
const sessionSecret =
  process.env.AUTH_SECRET || `${OWNER_PASSWORD_HASH}:vortex-owner-session`;
function sign(value: string) {
  return createHmac("sha256", sessionSecret).update(value).digest("hex");
}
export function validateOwner(email: string, password: string) {
  const hash = createHash("sha256").update(password).digest("hex");
  return (
    email.toLowerCase() === OWNER_EMAIL &&
    timingSafeEqual(Buffer.from(hash), Buffer.from(OWNER_PASSWORD_HASH))
  );
}
export function createSessionToken() {
  const payload = Buffer.from(
    JSON.stringify({
      email: OWNER_EMAIL,
      exp: Date.now() + 1000 * 60 * 60 * 24 * 7,
    }),
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}
export function verifySessionToken(token?: string) {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig || sign(payload) !== sig) return false;
  try {
    return (
      JSON.parse(Buffer.from(payload, "base64url").toString()).exp > Date.now()
    );
  } catch {
    return false;
  }
}
export async function isAuthenticated() {
  return verifySessionToken((await cookies()).get("vortex_session")?.value);
}
