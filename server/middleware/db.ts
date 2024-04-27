import { MySql2Database, drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "~/database/drizzle/schema";

export default defineEventHandler(async (event) => {
  const { dbDatabase, dbPassword, dbPort, dbServer, dbUser } =
    useRuntimeConfig(event);

    console.log({
      dbDatabase,
      dbPassword,
      dbPort,
      dbServer,
      dbUser
    })

  const poolConnection = mysql.createPool({
    host: dbServer,
    user: dbUser,
    database: dbDatabase,
    password: dbPassword,
    port: parseInt(dbPort),
    charset: "utf8mb4",
  });

  const db = drizzle(poolConnection, { schema, mode: "default" });
  event.context.db = db as MySql2Database<typeof schema>;
});
