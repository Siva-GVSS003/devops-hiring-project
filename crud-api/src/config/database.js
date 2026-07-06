const { Pool } = require("pg");
const getDatabaseSecret = require("./secrets");

let pool;

async function connectDatabase() {

    if (pool) return pool;

    const secret = await getDatabaseSecret();

    pool = new Pool({
        host: secret.host,
        port: secret.port,
        database: secret.dbname,
        user: secret.username,
        password: secret.password,
        ssl: {
            rejectUnauthorized: false
        }
    });

    await pool.query("SELECT NOW()");

    console.log("Connected to PostgreSQL");

    return pool;
}

module.exports = connectDatabase;
