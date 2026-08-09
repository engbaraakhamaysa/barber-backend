import { Pool } from "pg";
import env from "./env";

///////////////////////////////////////////
// ENVIRONMENT DETECTION
// Check whether the application is running in test mode
// Select the appropriate database configuration
///////////////////////////////////////////

const isTestEnvironment = process.env.NODE_ENV === "test";

const database = isTestEnvironment ? env.testDb : env.db;

///////////////////////////////////////////
// DATABASE CONNECTION POOL
// Create a PostgreSQL connection pool
// Use the selected environment database configuration
///////////////////////////////////////////

const pool = new Pool({
  host: database.host,
  port: database.port,
  user: database.user,
  password: database.password,
  database: database.name,
});

export default pool;
