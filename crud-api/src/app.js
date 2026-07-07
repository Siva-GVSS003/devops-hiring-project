const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP",
        service: "crud-api"
    });
});

// Product API
app.use("/products", productRoutes);

module.exports = app;
