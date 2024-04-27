import type { Config } from "drizzle-kit";

export default {
  schema: "./database/schema.ts",
  out: "./database/drizzle",
  driver: "mysql2",
  dbCredentials: {
    user: "root",
    password: "fuck",
    host: "localhost",
    port: 3306,
    database: "ai_crm"
  },
} satisfies Config;
