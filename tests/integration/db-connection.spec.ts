import pool from "../../src/config/db";

describe("Test Database Connection", () => {
  it("should connect to test database", async () => {
    const result = await pool.query("SELECT current_user, current_database()");

    expect(result.rows[0].current_database).toBe("barber_test_db");
    expect(result.rows[0].current_user).toBe("barber_user");
  });
});
