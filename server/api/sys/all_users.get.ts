import { MySql2Database } from "drizzle-orm/mysql2";
import * as schema from '~/database/drizzle/schema';

export default defineEventHandler(async (event) => {
  const db = event.context.db as MySql2Database<typeof schema>;

  const result = await db.query.category.findMany();
  return {
    hello: "world",
    result: result,
  };
});
