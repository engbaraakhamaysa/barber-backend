import request from "supertest";
import app from "../../../src/app";
import pool from "../../../src/config/db";

describe("UserController Integration Tests", () => {
  let adminToken: string;

  beforeEach(async () => {
    await pool.query("TRUNCATE TABLE users RESTART IDENTITY CASCADE");

    await request(app).post("/api/auth/register").send({
      name: "Admin",
      email: "admin@test.com",
      password: "password123",
    });

    await pool.query(
      `
      UPDATE users
      SET role = 'admin'
      WHERE email = $1
      `,
      ["admin@test.com"],
    );

    const login = await request(app).post("/api/auth/login").send({
      email: "admin@test.com",
      password: "password123",
    });

    adminToken = login.body.accessToken;
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("POST /api/users", () => {
    it("should create user by admin", async () => {
      const response = await request(app)
        .post("/api/users")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          name: "New User",
          email: "user@test.com",
          password: "password123",
          role: "user",
        });

      expect(response.status).toBe(201);

      expect(response.body.email).toBe("user@test.com");

      expect(response.body.password).toBeUndefined();
    });

    it("should reject without token", async () => {
      const response = await request(app).post("/api/users").send({
        name: "User",
        email: "user@test.com",
        password: "password123",
        role: "user",
      });

      expect(response.status).toBe(401);
    });
  });

  describe("GET /api/users/:id", () => {
    it("should return user by id", async () => {
      const created = await request(app)
        .post("/api/users")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          name: "Test User",
          email: "get@test.com",
          password: "password123",
          role: "user",
        });

      const response = await request(app)
        .get(`/api/users/${created.body.id}`)
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(200);

      expect(response.body.email).toBe("get@test.com");
    });

    it("should return 404 if user not found", async () => {
      const response = await request(app)
        .get("/api/users/99999")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(404);
    });
  });

  describe("PUT /api/users/:id", () => {
    it("should update user", async () => {
      const created = await request(app)
        .post("/api/users")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          name: "Old Name",
          email: "update@test.com",
          password: "password123",
          role: "user",
        });

      const response = await request(app)
        .put(`/api/users/${created.body.id}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          name: "New Name",
        });

      expect(response.status).toBe(200);

      expect(response.body.name).toBe("New Name");
    });
  });

  describe("DELETE /api/users/:id", () => {
    it("should delete user", async () => {
      const created = await request(app)
        .post("/api/users")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          name: "Delete User",
          email: "delete@test.com",
          password: "password123",
          role: "user",
        });

      const response = await request(app)
        .delete(`/api/users/${created.body.id}`)
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(200);

      expect(response.body.message).toBe("User deleted successfully");
    });
  });
});
