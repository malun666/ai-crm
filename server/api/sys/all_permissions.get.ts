import { permission } from './../../../database/drizzle/schema';
export default defineEventHandler(async (event) => {
  const db = event.context.db;
 
  const result = await db.query.permission.findMany();
  return {
    hello: "world",
    result: result,
  };
});
