const connectDatabase = require("../config/database");

async function getAllProducts() {
    const pool = await connectDatabase();

    const result = await pool.query(`
        SELECT *
        FROM products
        ORDER BY id
    `);

    return result.rows;
}

async function getProductById(id) {
    const pool = await connectDatabase();

    const result = await pool.query(
        `SELECT * FROM products WHERE id = $1`,
        [id]
    );

    return result.rows[0];
}

async function createProduct(product) {
    const pool = await connectDatabase();

    const result = await pool.query(
        `
        INSERT INTO products
        (name, description, price, quantity)
        VALUES ($1,$2,$3,$4)
        RETURNING *
        `,
        [
            product.name,
            product.description,
            product.price,
            product.quantity
        ]
    );

    return result.rows[0];
}

async function updateProduct(id, product) {
    const pool = await connectDatabase();

    const result = await pool.query(
        `
        UPDATE products
        SET
            name=$1,
            description=$2,
            price=$3,
            quantity=$4,
            updated_at=NOW()
        WHERE id=$5
        RETURNING *
        `,
        [
            product.name,
            product.description,
            product.price,
            product.quantity,
            id
        ]
    );

    return result.rows[0];
}

async function deleteProduct(id) {
    const pool = await connectDatabase();

    const result = await pool.query(
        `
        DELETE FROM products
        WHERE id=$1
        RETURNING *
        `,
        [id]
    );

    return result.rows[0];
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
