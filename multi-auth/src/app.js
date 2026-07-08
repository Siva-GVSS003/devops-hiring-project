require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const connectDatabase = require("./config/database");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

/*
|--------------------------------------------------------------------------
| Root Endpoint
|--------------------------------------------------------------------------
*/
app.get("/", (req, res) => {
    res.json({
        service: "Multi Auth API",
        version: "1.0.0",
        status: "UP",
        endpoints: {
            health: "/health",
            register: "POST /auth/register",
            login: "POST /auth/login",
            profile: "GET /auth/profile"
        }
    });
});

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/
app.get("/health", async (req, res) => {
    try {
        await connectDatabase();

        res.json({
            status: "UP",
            service: "Multi Auth API"
        });

    } catch (err) {

        res.status(500).json({
            status: "DOWN",
            error: err.message
        });
    }
});

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/
app.use("/auth", authRoutes);

module.exports = app;
