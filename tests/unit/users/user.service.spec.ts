import { UserService } from "../../../src/modules/users/user.service";
import { UserRepository } from "../../../src/modules/users/user.repository";

///////////////////////////////////////////
// USER SERVICE UNIT TESTS
// Test business logic without real database
// Repository methods are mocked
///////////////////////////////////////////
describe("UserService", () => {
  ///////////////////////////////////////////
  // Mock user returned from repository
  // Contains password because service removes it
  // before sending response
  ///////////////////////////////////////////
  const mockUser = {
    id: 1,
    name: "Baraa",
    email: "baraa@test.com",
    password: "hashed-password",
    role: "admin" as const,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  };

  ///////////////////////////////////////////
  // Allow spies to be recreated
  // between different test cases
  ///////////////////////////////////////////
  afterEach(() => {
    jasmine.getEnv().allowRespy(true);
  });

  ///////////////////////////////////////////
  // CREATE USER
  // Test user creation logic
  // Password should not exist in response
  ///////////////////////////////////////////
  describe("create", () => {
    it("should create user and remove password from response", async () => {
      spyOn(UserRepository, "create").and.resolveTo(mockUser);

      const result = await UserService.create({
        name: "Baraa",
        email: "baraa@test.com",
        password: "123456",
        role: "admin",
      });

      // Verify repository was called
      expect(UserRepository.create).toHaveBeenCalled();

      expect(result.id).toBe(1);

      expect(result.email).toBe("baraa@test.com");

      // Security check:
      // Password must never return to client
      expect(
        Object.prototype.hasOwnProperty.call(result, "password"),
      ).toBeFalse();
    });
  });

  ///////////////////////////////////////////
  // GET USER BY ID
  // Test retrieving user and formatting response
  ///////////////////////////////////////////
  describe("getById", () => {
    it("should return user without password", async () => {
      spyOn(UserRepository, "getById").and.resolveTo(mockUser);

      const result = await UserService.getById(1);

      expect(UserRepository.getById).toHaveBeenCalledWith(1);

      expect(result).toBeDefined();

      expect(result?.id).toBe(1);

      expect(result?.email).toBe("baraa@test.com");

      // Password removed by service layer
      expect(
        Object.prototype.hasOwnProperty.call(result, "password"),
      ).toBeFalse();
    });

    // User does not exist
    // Service should return undefined
    it("should return undefined if user does not exist", async () => {
      spyOn(UserRepository, "getById").and.resolveTo(undefined);

      const result = await UserService.getById(999);

      expect(UserRepository.getById).toHaveBeenCalledWith(999);

      expect(result).toBeUndefined();
    });
  });

  ///////////////////////////////////////////
  // UPDATE USER
  // Test updating user data
  // Including password hashing logic
  ///////////////////////////////////////////
  describe("update", () => {
    it("should update user without changing password", async () => {
      spyOn(UserRepository, "update").and.resolveTo(mockUser);

      const result = await UserService.update(1, {
        name: "New Name",
      });

      expect(UserRepository.update).toHaveBeenCalledWith(1, {
        name: "New Name",
      });

      expect(result).toBeDefined();

      expect(result?.name).toBe("Baraa");
    });

    ///////////////////////////////////////////
    // Password update should be hashed
    // before saving to database
    ///////////////////////////////////////////
    it("should hash password when updating password", async () => {
      spyOn(UserRepository, "update").and.resolveTo(mockUser);

      await UserService.update(1, {
        password: "new-password",
      });

      const callArgs = (UserRepository.update as jasmine.Spy).calls.mostRecent()
        .args;

      expect(callArgs[0]).toBe(1);

      // Original password should not be stored
      expect(callArgs[1].password).not.toBe("new-password");
    });

    // Updating non existing user
    // should return undefined
    it("should return undefined if update user does not exist", async () => {
      spyOn(UserRepository, "update").and.resolveTo(undefined);

      const result = await UserService.update(999, {
        name: "Test",
      });

      expect(result).toBeUndefined();
    });
  });

  ///////////////////////////////////////////
  // DELETE USER
  // Test deleting user and response mapping
  ///////////////////////////////////////////
  describe("deleteById", () => {
    it("should delete user and return response without password", async () => {
      spyOn(UserRepository, "deleteById").and.resolveTo(mockUser);

      const result = await UserService.deleteById(1);

      expect(UserRepository.deleteById).toHaveBeenCalledWith(1);

      expect(result).toBeDefined();

      // Password should not be exposed
      expect(
        Object.prototype.hasOwnProperty.call(result, "password"),
      ).toBeFalse();
    });

    // Delete non existing user
    it("should return undefined if user does not exist", async () => {
      spyOn(UserRepository, "deleteById").and.resolveTo(undefined);

      const result = await UserService.deleteById(999);

      expect(result).toBeUndefined();
    });
  });
});
