import pool from "../../../src/config/db";
import { AuthRepository } from "../../../src/modules/auth/auth.repository";

describe("AuthRepository Integration Tests", () => {
  beforeEach(async () => {
    await pool.query("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("create", () => {
    it("should create a new user", async () => {
      const user = await AuthRepository.create(
        {
          name: "Baraa",
          email: "baraa@test.com",
          password: "password123",
          role: "user",
        },
        "hashed-password",
      );

      expect(user).toBeDefined();

      expect(user.name).toBe("Baraa");
      expect(user.email).toBe("baraa@test.com");
      expect(user.role).toBe("user");

      expect((user as any).password).toBeUndefined();
    });

    it("should create user with default role", async () => {
      const result = await pool.query(
        `
        INSERT INTO users (
          name,
          email,
          password
        )
        VALUES ($1,$2,$3)
        RETURNING *
        `,
        ["Default User", "default@test.com", "hashed-password"],
      );

      expect(result.rows[0].role).toBe("barber");
      expect(result.rows[0].is_active).toBeTrue();
    });
  });

  describe("findByEmail", () => {
    it("should return user by email", async () => {
      await pool.query(
        `
        INSERT INTO users (
          name,
          email,
          password,
          role
        )
        VALUES ($1,$2,$3,$4)
        `,
        ["Baraa", "baraa@test.com", "hashed-password", "user"],
      );

      const user = await AuthRepository.findByEmail("baraa@test.com");

      expect(user).toBeDefined();

      expect(user?.email).toBe("baraa@test.com");

      expect(user?.name).toBe("Baraa");

      expect(user?.is_active).toBeTrue();
    });

    it("should return undefined if email does not exist", async () => {
      const user = await AuthRepository.findByEmail("notfound@test.com");

      expect(user).toBeUndefined();
    });
  });

  describe("findById", () => {
    it("should return user by id", async () => {
      const result = await pool.query(
        `
        INSERT INTO users (
          name,
          email,
          password,
          role
        )
        VALUES ($1,$2,$3,$4)
        RETURNING id
        `,
        ["Baraa", "id@test.com", "hashed-password", "user"],
      );

      const userId = result.rows[0].id;

      const user = await AuthRepository.findById(userId);

      expect(user).toBeDefined();

      expect(user?.id).toBe(userId);

      expect(user?.email).toBe("id@test.com");

      expect(user?.is_active).toBeTrue();
    });

    it("should return undefined if id does not exist", async () => {
      const user = await AuthRepository.findById(999999);

      expect(user).toBeUndefined();
    });
  });

  describe("inactive users", () => {
    it("should return inactive user", async () => {
      const result = await pool.query(
        `
        INSERT INTO users (
          name,
          email,
          password,
          role,
          is_active
        )
        VALUES ($1,$2,$3,$4,$5)
        RETURNING id
        `,
        ["Blocked User", "blocked@test.com", "hashed-password", "user", false],
      );

      const user = await AuthRepository.findById(result.rows[0].id);

      expect(user).toBeDefined();

      expect(user?.is_active).toBeFalse();
    });
  });

  describe("database constraints", () => {
    it("should reject duplicate email", async () => {
      await AuthRepository.create(
        {
          name: "User One",
          email: "duplicate@test.com",
          password: "password",
          role: "user",
        },
        "hashed-password",
      );

      await expectAsync(
        AuthRepository.create(
          {
            name: "User Two",
            email: "duplicate@test.com",
            password: "password",
            role: "user",
          },
          "hashed-password",
        ),
      ).toBeRejected();
    });
  });
});
