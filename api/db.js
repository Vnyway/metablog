import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createConnection({
  host: "u3y93bv513l7zv6o.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
  user: "n2d1u3hy3142r8ro",
  password: process.env.MYSQL_PASSWORD,
  database: "gu72qatopnsedbt6",
});
