import request from "supertest";
import app from "../../../src/app";
import pool from "../../../src/config/db";

///////////////////////////////////////////
// USER CONTROLLER INTEGRATION TESTS
// Test User API flow
// Request -> Middleware -> Controller -> Service -> Repository -> Database
///////////////////////////////////////////
describe("UserController Integration Tests", () => {
  let adminToken: string;

  ///////////////////////////////////////////
  // Prepare admin user before each test
  // Because all user management endpoints
  // require admin authorization
  ///////////////////////////////////////////
  beforeEach(async () => {
    await pool.query("TRUNCATE TABLE users RESTART IDENTITY CASCADE");

    // Create normal account using auth flow
    await request(app).post("/api/auth/register").send({
      name: "Admin",
      email: "admin@test.com",
      password: "password123",
    });

    // Promote account to admin for testing permissions
    await pool.query(
      `
      UPDATE users
      SET role = 'admin'
      WHERE email = $1
      `,
      ["admin@test.com"],
    );

    // Get JWT token for protected routes
    const login = await request(app).post("/api/auth/login").send({
      email: "admin@test.com",
      password: "password123",
    });

    adminToken = login.body.accessToken;
  });

  ///////////////////////////////////////////
  // CREATE USER
  // Only authenticated admin can create users
  ///////////////////////////////////////////
  describe("POST /api/users", () => {
    // Admin should create new user
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

      // Password should never return to client
      expect(response.body.password).toBeUndefined();
    });

    // Request without JWT should be rejected
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

  ///////////////////////////////////////////
  // GET USER BY ID
  // Retrieve user information by identifier
  ///////////////////////////////////////////
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

    // User id that does not exist
    // should return not found
    it("should return 404 if user not found", async () => {
      const response = await request(app)
        .get("/api/users/99999")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(404);
    });
  });

  ///////////////////////////////////////////
  // UPDATE USER
  // Test partial user updates
  ///////////////////////////////////////////
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

  ///////////////////////////////////////////
  // DELETE USER
  // Test removing user from database
  ///////////////////////////////////////////
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
