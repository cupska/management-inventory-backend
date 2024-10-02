import { config } from "dotenv";
config();

import { Pool } from "pg";

const db = new Pool({ connectionString: process.env.PG_URL });

export default db;
