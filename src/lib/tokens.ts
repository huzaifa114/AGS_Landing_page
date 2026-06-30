import { randomBytes } from "crypto";

const TOKEN_BYTES = 32;
const VERIFICATION_EXPIRY_HOURS = 24;
const RESET_EXPIRY_HOURS = 1;

export function generateToken(): string {
  return randomBytes(TOKEN_BYTES).toString("hex");
}

export function verificationExpiry(): Date {
  const date = new Date();
  date.setHours(date.getHours() + VERIFICATION_EXPIRY_HOURS);
  return date;
}

export function resetExpiry(): Date {
  const date = new Date();
  date.setHours(date.getHours() + RESET_EXPIRY_HOURS);
  return date;
}

export function isExpired(expiresAt: Date): boolean {
  return new Date() > expiresAt;
}
