import { permission } from './../../../database/drizzle/schema';
export default defineEventHandler(async (event) => {
  const db = event.context.db;
  // const ps = DB.prepare('SELECT * from Users');
  // const data = await ps.first();
  console.log(db)
  console.log('....')
  const result = await db.query.permission.findMany();
  return {
    hello: "world",
    result: result,
  };
});
