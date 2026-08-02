import pool from "../../../src/config/db";
import { UserRepository } from "../../../src/modules/users/user.repository";

describe("UserRepository Integration Tests", () => {
  beforeEach(async () => {
    await pool.query("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
  });

  afterAll(async () => {
    await pool.end();
  });

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

      expect(user.is_active).toBeTrue();
    });
  });

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

    it("should return undefined if user not found", async () => {
      const user = await UserRepository.getById(99999);

      expect(user).toBeUndefined();
    });
  });

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

    it("should return undefined if email does not exist", async () => {
      const user = await UserRepository.getByEmail("none@test.com");

      expect(user).toBeUndefined();
    });
  });

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

    it("should return undefined when updating missing user", async () => {
      const user = await UserRepository.update(99999, {
        name: "Test",
      });

      expect(user).toBeUndefined();
    });
  });

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

      const check = await UserRepository.getById(created.id);

      expect(check).toBeUndefined();
    });

    it("should return undefined if user does not exist", async () => {
      const deleted = await UserRepository.deleteById(99999);

      expect(deleted).toBeUndefined();
    });
  });

  describe("database constraints", () => {
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
