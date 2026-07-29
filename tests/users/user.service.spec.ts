import { UserService } from "../../src/modules/users/user.service";
import { UserRepository } from "../../src/modules/users/user.repository";

describe("UserService", () => {
  describe("create", () => {
    it("should create a user and remove password from response", async () => {
      spyOn(UserRepository, "create").and.resolveTo({
        id: 1,
        name: "Baraa",
        email: "baraa@example.com",
        password: "$2b$10$hashedPassword",
        role: "user",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      });

      const user = await UserService.create({
        name: "Baraa",
        email: "baraa@example.com",
        password: "password123",
        role: "user",
      });

      expect(user.id).toBe(1);
      expect(user.name).toBe("Baraa");
      expect(user.email).toBe("baraa@example.com");

      expect("password" in user).toBeFalse();

      expect(UserRepository.create).toHaveBeenCalled();
    });
  });
});
