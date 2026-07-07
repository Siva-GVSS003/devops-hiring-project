const productModel = require("../models/productModel");

async function getAllProducts(req, res) {
    try {
        const products = await productModel.getAllProducts();

        res.status(200).json(products);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

async function getProductById(req, res) {

    try {

        const product = await productModel.getProductById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(product);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

}

async function createProduct(req, res) {

    try {

        const product = await productModel.createProduct(req.body);

        res.status(201).json(product);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

}

async function updateProduct(req, res) {

    try {

        const product = await productModel.updateProduct(
            req.params.id,
            req.body
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(product);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

}

async function deleteProduct(req, res) {

    try {

        const product = await productModel.deleteProduct(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
