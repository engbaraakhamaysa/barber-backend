import dotenv from "dotenv";

dotenv.config();

///////////////////////////////////////////
// ENVIRONMENT CONFIGURATION
// Load environment variables from .env file
// Provide application and database configuration
///////////////////////////////////////////

const env = {
  ///////////////////////////////////////////
  // SERVER CONFIGURATION
  // Define the application port
  // Use port 3001 when PORT is not configured
  ///////////////////////////////////////////
  port: Number(process.env.PORT) || 3001,

  ///////////////////////////////////////////
  // DATABASE CONFIGURATION
  // Define PostgreSQL connection settings
  // Use environment variables for database credentials
  ///////////////////////////////////////////
  db: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5433,
    user: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    name: process.env.DB_NAME || "",
  },

  ///////////////////////////////////////////
  // TEST DATABASE CONFIGURATION
  // Define PostgreSQL settings for test environment
  // Use separate environment variables for test database
  ///////////////////////////////////////////
  testDb: {
    host: process.env.TEST_DB_HOST || "localhost",
    port: Number(process.env.TEST_DB_PORT) || 5433,
    user: process.env.TEST_DB_USER || "",
    password: process.env.TEST_DB_PASSWORD || "",
    name: process.env.TEST_DB_NAME || "",
  },
};

export default env;
