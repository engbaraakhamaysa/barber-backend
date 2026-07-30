import { AuthService } from "../../../src/modules/auth/auth.service";
import { AuthRepository } from "../../../src/modules/auth/auth.repository";
import * as PasswordUtils from "../../../src/utils/password";
import * as JwtUtils from "../../../src/utils/jwt";

describe("AuthService", () => {
  const mockUser = {
    id: 1,
    name: "Baraa",
    email: "baraa@test.com",
    password: "hashed-password",
    role: "user" as const,
    status: "active" as const,
  };

  describe("register", () => {
    it("should register a new user", async () => {
      spyOn(AuthRepository, "findByEmail").and.resolveTo(undefined);

      spyOn(AuthRepository, "create").and.resolveTo({
        id: 1,
        name: "Baraa",
        email: "baraa@test.com",
        role: "user",
      });

      const result = await AuthService.register({
        name: "Baraa",
        email: "baraa@test.com",
        password: "123456",
      });

      expect(AuthRepository.findByEmail).toHaveBeenCalledWith("baraa@test.com");

      expect(AuthRepository.create).toHaveBeenCalled();

      expect(result.email).toBe("baraa@test.com");
    });

    it("should reject duplicate email", async () => {
      spyOn(AuthRepository, "findByEmail").and.resolveTo(mockUser);

      await expectAsync(
        AuthService.register({
          name: "Baraa",
          email: "baraa@test.com",
          password: "123456",
        }),
      ).toBeRejectedWithError("EMAIL_ALREADY_REGISTERED");
    });
  });

  describe("login", () => {
    it("should login user with correct password", async () => {
      spyOn(AuthRepository, "findByEmail").and.resolveTo(mockUser);

      spyOn(PasswordUtils, "comparePassword").and.resolveTo(true);

      spyOn(JwtUtils, "generateToken").and.returnValue("fake-token");

      const result = await AuthService.login({
        email: "baraa@test.com",
        password: "123456",
      });

      expect(result.user.email).toBe("baraa@test.com");

      expect(result.accessToken).toBe("fake-token");
    });

    it("should reject blocked user", async () => {
      spyOn(AuthRepository, "findByEmail").and.resolveTo({
        ...mockUser,
        status: "blocked",
      });

      await expectAsync(
        AuthService.login({
          email: "baraa@test.com",
          password: "123456",
        }),
      ).toBeRejectedWithError("USER_ACCOUNT_BLOCKED");
    });

    it("should reject invalid credentials", async () => {
      spyOn(AuthRepository, "findByEmail").and.resolveTo(undefined);

      await expectAsync(
        AuthService.login({
          email: "wrong@test.com",
          password: "123456",
        }),
      ).toBeRejectedWithError("INVALID_CREDENTIALS");
    });
  });

  describe("getCurrentUser", () => {
    it("should return current user", async () => {
      spyOn(AuthRepository, "findById").and.resolveTo(mockUser);

      const result = await AuthService.getCurrentUser(1);

      expect(result).toBeDefined();

      expect(result?.email).toBe("baraa@test.com");
    });

    it("should return undefined if user not found", async () => {
      spyOn(AuthRepository, "findById").and.resolveTo(undefined);

      const result = await AuthService.getCurrentUser(99);

      expect(result).toBeUndefined();
    });

    it("should reject blocked current user", async () => {
      spyOn(AuthRepository, "findById").and.resolveTo({
        ...mockUser,
        status: "blocked",
      });

      await expectAsync(AuthService.getCurrentUser(1)).toBeRejectedWithError(
        "USER_ACCOUNT_BLOCKED",
      );
    });
  });
});
