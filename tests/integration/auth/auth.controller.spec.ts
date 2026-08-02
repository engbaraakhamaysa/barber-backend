import request from "supertest";
import app from "../../../src/app";
import pool from "../../../src/config/db";

describe("Auth Controller Integration Tests", () => {
  beforeEach(async () => {
    await pool.query("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      const response = await request(app).post("/api/auth/register").send({
        name: "Baraa",
        email: "baraa@test.com",
        password: "password123",
      });

      expect(response.status).toBe(201);

      expect(response.body.message).toBe("User registered successfully");

      expect(response.body.user.email).toBe("baraa@test.com");

      expect(response.body.user.role).toBe("user");
    });

    it("should reject duplicate email", async () => {
      await request(app).post("/api/auth/register").send({
        name: "Baraa",
        email: "baraa@test.com",
        password: "password123",
      });

      const response = await request(app).post("/api/auth/register").send({
        name: "Another User",
        email: "baraa@test.com",
        password: "password123",
      });

      expect(response.status).toBe(409);

      expect(response.body.message).toBe("Email is already registered");
    });

    it("should reject invalid register data", async () => {
      const response = await request(app).post("/api/auth/register").send({
        name: "A",
        email: "wrong-email",
        password: "123",
      });

      expect(response.status).toBe(400);
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login successfully", async () => {
      await request(app).post("/api/auth/register").send({
        name: "Baraa",
        email: "login@test.com",
        password: "password123",
      });

      const response = await request(app).post("/api/auth/login").send({
        email: "login@test.com",
        password: "password123",
      });

      expect(response.status).toBe(200);

      expect(response.body.accessToken).toBeDefined();

      expect(response.body.user.email).toBe("login@test.com");
    });

    it("should reject wrong password", async () => {
      await request(app).post("/api/auth/register").send({
        name: "Baraa",
        email: "wrong@test.com",
        password: "password123",
      });

      const response = await request(app).post("/api/auth/login").send({
        email: "wrong@test.com",
        password: "wrong-password",
      });

      expect(response.status).toBe(401);

      expect(response.body.message).toBe("Invalid email or password");
    });

    it("should reject inactive user", async () => {
      await pool.query(
        `
        INSERT INTO users (
          name,
          email,
          password,
          role,
          is_active
        )
        VALUES ($1,$2,$3,$4,$5)
        `,
        [
          "Inactive User",
          "inactive@test.com",
          "$2b$10$fakehash",
          "user",
          false,
        ],
      );

      const response = await request(app).post("/api/auth/login").send({
        email: "inactive@test.com",
        password: "password123",
      });

      expect(response.status).toBe(403);
    });
  });

  describe("GET /api/auth/me", () => {
    it("should return current user", async () => {
      const register = await request(app).post("/api/auth/register").send({
        name: "Baraa",
        email: "me@test.com",
        password: "password123",
      });

      const login = await request(app).post("/api/auth/login").send({
        email: "me@test.com",
        password: "password123",
      });

      const response = await request(app)
        .get("/api/auth/me")
        .set("Authorization", `Bearer ${login.body.accessToken}`);

      expect(response.status).toBe(200);

      expect(response.body.email).toBe("me@test.com");
    });

    it("should reject request without token", async () => {
      const response = await request(app).get("/api/auth/me");

      expect(response.status).toBe(401);
    });
  });
});
