import { generateToken, verifyToken } from "../../../src/utils/jwt";

describe("JWT Utils", () => {
  const payload = {
    id: 1,
    email: "test@test.com",
    role: "admin" as const,
  };

  it("should generate a JWT token", () => {
    const token = generateToken(payload);

    expect(token).toBeDefined();
    expect(typeof token).toBe("string");
  });

  it("should verify a valid JWT token", () => {
    const token = generateToken(payload);

    const decoded = verifyToken(token);

    expect(decoded.id).toBe(payload.id);
    expect(decoded.email).toBe(payload.email);
    expect(decoded.role).toBe(payload.role);
  });

  it("should reject an invalid JWT token", () => {
    const invalidToken = "invalid-token";

    expect(() => {
      verifyToken(invalidToken);
    }).toThrow();
  });
});
