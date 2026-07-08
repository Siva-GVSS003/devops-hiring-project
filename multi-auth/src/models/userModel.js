const connectDatabase = require("../config/database");

async function createUser(name, email, password) {

    const pool = await connectDatabase();

    const query = `
        INSERT INTO users(name,email,password)
        VALUES($1,$2,$3)
        RETURNING id,name,email,created_at
    `;

    const result = await pool.query(query, [
        name,
        email,
        password
    ]);

    return result.rows[0];
}

async function findUserByEmail(email) {

    const pool = await connectDatabase();

    const result = await pool.query(
        "SELECT * FROM users WHERE email=$1",
        [email]
    );

    return result.rows[0];
}

module.exports = {
    createUser,
    findUserByEmail
};
