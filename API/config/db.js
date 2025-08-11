import pkg from 'pg';
import dotenv from "dotenv";
const { Pool } = pkg;
dotenv.config();

console.log(process.env.POSTGRES_USER);

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT
})

pool.on("connect", () => {
    console.log("connection pool established with database");
});

export default pool;