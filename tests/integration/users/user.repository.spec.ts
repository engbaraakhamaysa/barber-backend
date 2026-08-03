import pool from "../../../src/config/db";
import { UserRepository } from "../../../src/modules/users/user.repository";

///////////////////////////////////////////
// USER REPOSITORY INTEGRATION TESTS
// Test database operations for users table
// Repository -> Database
///////////////////////////////////////////
describe("UserRepository Integration Tests", () => {
  ///////////////////////////////////////////
  // Clean database before each test
  // Prevent test data from affecting other tests
  ///////////////////////////////////////////
  beforeEach(async () => {
    await pool.query("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
  });

  ///////////////////////////////////////////
  // CREATE USER
  // Test inserting new user into database
  ///////////////////////////////////////////
  describe("create", () => {
    it("should create a user", async () => {
      const user = await UserRepository.create({
        name: "Baraa",
        email: "baraa@test.com",
        password: "hashed-password",
        role: "user",
      });

      expect(user).toBeDefined();

      expect(user.name).toBe("Baraa");

      expect(user.email).toBe("baraa@test.com");

      expect(user.role).toBe("user");

      // Database default value
      expect(user.is_active).toBeTrue();
    });
  });

  ///////////////////////////////////////////
  // GET USER BY ID
  // Test retrieving user using primary key
  ///////////////////////////////////////////
  describe("getById", () => {
    it("should return user by id", async () => {
      const created = await UserRepository.create({
        name: "Baraa",
        email: "id@test.com",
        password: "hashed-password",
        role: "user",
      });

      const user = await UserRepository.getById(created.id);

      expect(user).toBeDefined();

      expect(user?.email).toBe("id@test.com");
    });

    ///////////////////////////////////////////
    // Non existing id should return undefined
    ///////////////////////////////////////////
    it("should return undefined if user not found", async () => {
      const user = await UserRepository.getById(99999);

      expect(user).toBeUndefined();
    });
  });

  ///////////////////////////////////////////
  // GET USER BY EMAIL
  // Used for searching users by unique email
  ///////////////////////////////////////////
  describe("getByEmail", () => {
    it("should return user by email", async () => {
      await UserRepository.create({
        name: "Baraa",
        email: "email@test.com",
        password: "hashed-password",
        role: "barber",
      });

      const user = await UserRepository.getByEmail("email@test.com");

      expect(user).toBeDefined();

      expect(user?.role).toBe("barber");
    });

    // Email that does not exist should return undefined
    it("should return undefined if email does not exist", async () => {
      const user = await UserRepository.getByEmail("none@test.com");

      expect(user).toBeUndefined();
    });
  });

  ///////////////////////////////////////////
  // UPDATE USER
  // Test updating existing user fields
  ///////////////////////////////////////////
  describe("update", () => {
    it("should update user", async () => {
      const created = await UserRepository.create({
        name: "Old Name",
        email: "update@test.com",
        password: "password",
        role: "user",
      });

      const updated = await UserRepository.update(created.id, {
        name: "New Name",
        is_active: false,
      });

      expect(updated).toBeDefined();

      expect(updated?.name).toBe("New Name");

      expect(updated?.is_active).toBeFalse();
    });

    // Updating missing user should not throw error
    it("should return undefined when updating missing user", async () => {
      const user = await UserRepository.update(99999, {
        name: "Test",
      });

      expect(user).toBeUndefined();
    });
  });

  ///////////////////////////////////////////
  // DELETE USER
  // Test removing user from database
  ///////////////////////////////////////////
  describe("deleteById", () => {
    it("should delete user", async () => {
      const created = await UserRepository.create({
        name: "Delete User",
        email: "delete@test.com",
        password: "password",
        role: "user",
      });

      const deleted = await UserRepository.deleteById(created.id);

      expect(deleted).toBeDefined();

      expect(deleted?.id).toBe(created.id);

      // Verify user was removed from database
      const check = await UserRepository.getById(created.id);

      expect(check).toBeUndefined();
    });

    // Delete missing user should return undefined
    it("should return undefined if user does not exist", async () => {
      const deleted = await UserRepository.deleteById(99999);

      expect(deleted).toBeUndefined();
    });
  });

  ///////////////////////////////////////////
  // DATABASE CONSTRAINTS
  // Test database rules and restrictions
  ///////////////////////////////////////////
  describe("database constraints", () => {
    // Email column has UNIQUE constraint
    it("should reject duplicate email", async () => {
      await UserRepository.create({
        name: "User One",
        email: "duplicate@test.com",
        password: "password",
        role: "user",
      });

      await expectAsync(
        UserRepository.create({
          name: "User Two",
          email: "duplicate@test.com",
          password: "password",
          role: "user",
        }),
      ).toBeRejected();
    });
  });
});
