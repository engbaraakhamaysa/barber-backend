import { Pool } from "pg";
import env from "./env";

const isTestEnvironment = process.env.NODE_ENV === "test";

const database = isTestEnvironment ? env.testDb : env.db;

const pool = new Pool({
  host: database.host,
  port: database.port,
  user: database.user,
  password: database.password,
  database: database.name,
});

export default pool;
