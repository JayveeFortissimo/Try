import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const databaseConnection = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: false  // Required for Neon
  },
   max: 20,                      // Maximum pool size
   idleTimeoutMillis: 30000,     // Close idle clients after 30 seconds
   connectionTimeoutMillis: 10000, // Return error after 10 seconds if connection can't be established
});


databaseConnection.query('SELECT NOW()')
  .then(() => console.log("✅ Database connected"))
  .catch(err => console.error("❌ DB connection failed", err));

export { databaseConnection };