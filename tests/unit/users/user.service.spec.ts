import { UserService } from "../../../src/modules/users/user.service";
import { UserRepository } from "../../../src/modules/users/user.repository";

describe("UserService", () => {
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

  afterEach(() => {
    jasmine.getEnv().allowRespy(true);
  });

  describe("create", () => {
    it("should create user and remove password from response", async () => {
      spyOn(UserRepository, "create").and.resolveTo(mockUser);

      const result = await UserService.create({
        name: "Baraa",
        email: "baraa@test.com",
        password: "123456",
        role: "admin",
      });

      expect(UserRepository.create).toHaveBeenCalled();

      expect(result.id).toBe(1);
      expect(result.email).toBe("baraa@test.com");

      expect(
        Object.prototype.hasOwnProperty.call(result, "password"),
      ).toBeFalse();
    });
  });

  describe("getById", () => {
    it("should return user without password", async () => {
      spyOn(UserRepository, "getById").and.resolveTo(mockUser);

      const result = await UserService.getById(1);

      expect(UserRepository.getById).toHaveBeenCalledWith(1);

      expect(result).toBeDefined();
      expect(result?.id).toBe(1);
      expect(result?.email).toBe("baraa@test.com");

      expect(
        Object.prototype.hasOwnProperty.call(result, "password"),
      ).toBeFalse();
    });

    it("should return undefined if user does not exist", async () => {
      spyOn(UserRepository, "getById").and.resolveTo(undefined);

      const result = await UserService.getById(999);

      expect(UserRepository.getById).toHaveBeenCalledWith(999);

      expect(result).toBeUndefined();
    });
  });

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

    it("should hash password when updating password", async () => {
      spyOn(UserRepository, "update").and.resolveTo(mockUser);

      await UserService.update(1, {
        password: "new-password",
      });

      const callArgs = (UserRepository.update as jasmine.Spy).calls.mostRecent()
        .args;

      expect(callArgs[0]).toBe(1);

      expect(callArgs[1].password).not.toBe("new-password");
    });

    it("should return undefined if update user does not exist", async () => {
      spyOn(UserRepository, "update").and.resolveTo(undefined);

      const result = await UserService.update(999, {
        name: "Test",
      });

      expect(result).toBeUndefined();
    });
  });

  describe("deleteById", () => {
    it("should delete user and return response without password", async () => {
      spyOn(UserRepository, "deleteById").and.resolveTo(mockUser);

      const result = await UserService.deleteById(1);

      expect(UserRepository.deleteById).toHaveBeenCalledWith(1);

      expect(result).toBeDefined();

      expect(
        Object.prototype.hasOwnProperty.call(result, "password"),
      ).toBeFalse();
    });

    it("should return undefined if user does not exist", async () => {
      spyOn(UserRepository, "deleteById").and.resolveTo(undefined);

      const result = await UserService.deleteById(999);

      expect(result).toBeUndefined();
    });
  });
});
