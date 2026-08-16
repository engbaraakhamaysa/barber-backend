import jwt, { type JwtPayload as JwtLibraryPayload } from "jsonwebtoken";
import type { UserRole } from "../modules/users/user.types";
import env from "../config/env";

export interface JwtPayload {
  id: number;
  email: string;
  role: UserRole;
}

function getJwtSecret(): string {
  if (!env.jwt.secret) {
    throw new Error("JWT_SECRET_NOT_CONFIGURED");
  }

  return env.jwt.secret;
}

function isValidUserRole(role: unknown): role is UserRole {
  return role === "admin" || role === "barber" || role === "user";
}

function isValidJwtPayload(
  payload: string | JwtLibraryPayload,
): payload is JwtPayload {
  return (
    typeof payload === "object" &&
    payload !== null &&
    typeof payload.id === "number" &&
    typeof payload.email === "string" &&
    isValidUserRole(payload.role)
  );
}

export const generateToken = (payload: JwtPayload): string => {
  const secret = getJwtSecret();
  return jwt.sign(payload, secret, {
    expiresIn: env.jwt.expiresIn,
  });
};

export const verifyToken = (token: string): JwtPayload => {
  const secret = getJwtSecret();

  const payload = jwt.verify(token, secret);

  if (!isValidJwtPayload(payload)) {
    throw new Error("INVALID_TOKEN_PAYLOAD");
  }
  return payload;
};
