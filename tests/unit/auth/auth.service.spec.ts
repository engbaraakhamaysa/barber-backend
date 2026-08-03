import { AuthService } from "../../../src/modules/auth/auth.service";
import { UserRepository } from "../../../src/modules/users/user.repository";

import * as PasswordUtils from "../../../src/utils/password";
import * as JwtUtils from "../../../src/utils/jwt";

///////////////////////////////////////////
// AUTH SERVICE TESTS
// Test authentication business logic
// Repository and utilities are mocked
///////////////////////////////////////////
describe("AuthService", () => {
  ///////////////////////////////////////////
  // Mock user returned from database
  ///////////////////////////////////////////
  const mockUser = {
    id: 1,
    name: "Baraa",
    email: "baraa@test.com",
    password: "hashed-password",
    role: "user" as const,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  };

  ///////////////////////////////////////////
  // REGISTER TESTS
  ///////////////////////////////////////////
  describe("register", () => {
    ///////////////////////////////////////////
    // Should create new user successfully
    ///////////////////////////////////////////
    it("should register a new user", async () => {
      spyOn(UserRepository, "getByEmail").and.resolveTo(undefined);

      spyOn(PasswordUtils, "hashPassword").and.resolveTo("hashed-password");

      spyOn(UserRepository, "create").and.resolveTo(mockUser);

      const result = await AuthService.register({
        name: "Baraa",
        email: "baraa@test.com",
        password: "12345678",
      });

      expect(UserRepository.getByEmail).toHaveBeenCalledWith("baraa@test.com");

      expect(UserRepository.create).toHaveBeenCalled();

      expect(result.email).toBe("baraa@test.com");
    });

    ///////////////////////////////////////////
    // Should reject duplicate email
    ///////////////////////////////////////////
    it("should reject duplicate email", async () => {
      spyOn(UserRepository, "getByEmail").and.resolveTo(mockUser);

      await expectAsync(
        AuthService.register({
          name: "Baraa",
          email: "baraa@test.com",
          password: "12345678",
        }),
      ).toBeRejectedWithError("EMAIL_ALREADY_REGISTERED");
    });
  });

  ///////////////////////////////////////////
  // LOGIN TESTS
  ///////////////////////////////////////////
  describe("login", () => {
    ///////////////////////////////////////////
    // Should login with correct credentials
    ///////////////////////////////////////////
    it("should login user with correct password", async () => {
      spyOn(UserRepository, "getByEmail").and.resolveTo(mockUser);

      spyOn(PasswordUtils, "comparePassword").and.resolveTo(true);

      spyOn(JwtUtils, "generateToken").and.returnValue("fake-token");

      const result = await AuthService.login({
        email: "baraa@test.com",
        password: "12345678",
      });

      expect(result.user.email).toBe("baraa@test.com");

      expect(result.accessToken).toBe("fake-token");
    });

    ///////////////////////////////////////////
    // Should reject blocked account
    ///////////////////////////////////////////
    it("should reject inactive user", async () => {
      spyOn(UserRepository, "getByEmail").and.resolveTo({
        ...mockUser,
        is_active: false,
      });

      await expectAsync(
        AuthService.login({
          email: "baraa@test.com",
          password: "12345678",
        }),
      ).toBeRejectedWithError("USER_ACCOUNT_BLOCKED");
    });

    ///////////////////////////////////////////
    // Should reject unknown user
    ///////////////////////////////////////////
    it("should reject invalid credentials", async () => {
      spyOn(UserRepository, "getByEmail").and.resolveTo(undefined);

      await expectAsync(
        AuthService.login({
          email: "wrong@test.com",
          password: "12345678",
        }),
      ).toBeRejectedWithError("INVALID_CREDENTIALS");
    });

    ///////////////////////////////////////////
    // Should reject wrong password
    ///////////////////////////////////////////
    it("should reject wrong password", async () => {
      spyOn(UserRepository, "getByEmail").and.resolveTo(mockUser);

      spyOn(PasswordUtils, "comparePassword").and.resolveTo(false);

      await expectAsync(
        AuthService.login({
          email: "baraa@test.com",
          password: "wrong-password",
        }),
      ).toBeRejectedWithError("INVALID_CREDENTIALS");
    });
  });

  ///////////////////////////////////////////
  // CURRENT USER TESTS
  ///////////////////////////////////////////
  describe("getCurrentUser", () => {
    ///////////////////////////////////////////
    // Should return authenticated user
    ///////////////////////////////////////////
    it("should return current user", async () => {
      spyOn(UserRepository, "getById").and.resolveTo(mockUser);

      const result = await AuthService.getCurrentUser(1);

      expect(result).toBeDefined();

      expect(result?.email).toBe("baraa@test.com");
    });

    ///////////////////////////////////////////
    // Should return undefined when not found
    ///////////////////////////////////////////
    it("should return undefined if user not found", async () => {
      spyOn(UserRepository, "getById").and.resolveTo(undefined);

      const result = await AuthService.getCurrentUser(99);

      expect(result).toBeUndefined();
    });

    ///////////////////////////////////////////
    // Should reject blocked current user
    ///////////////////////////////////////////
    it("should reject inactive current user", async () => {
      spyOn(UserRepository, "getById").and.resolveTo({
        ...mockUser,
        is_active: false,
      });

      await expectAsync(AuthService.getCurrentUser(1)).toBeRejectedWithError(
        "USER_ACCOUNT_BLOCKED",
      );
    });
  });
});
