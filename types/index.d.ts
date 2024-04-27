import * as schema from "~/database/drizzle/schema";
import { MySql2Database } from "mysql2";
type Schema = typeof schema;
type DB = MySql2Database<Schema>;

export { DB, Schema };
