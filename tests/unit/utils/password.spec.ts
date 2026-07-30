import { hashPassword, comparePassword } from "../../../src/utils/password";

describe("Password Utils", () => {
  it("should hash a password", async () => {
    const password = "123456";

    const hashedPassword = await hashPassword(password);

    expect(hashedPassword).toBeDefined();
    expect(hashedPassword).not.toBe(password);
  });

  it("should compare password correctly", async () => {
    const password = "123456";

    const hashedPassword = await hashPassword(password);

    const result = await comparePassword(password, hashedPassword);

    expect(result).toBeTrue();
  });

  it("should reject wrong password", async () => {
    const password = "123456";
    const wrongPassword = "wrong-password";

    const hashedPassword = await hashPassword(password);

    const result = await comparePassword(wrongPassword, hashedPassword);

    expect(result).toBeFalse();
  });
});
