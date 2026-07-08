const authService = require("../services/authService");

async function register(req, res) {

    try {

        const { name, email, password } = req.body;

        const user = await authService.register(
            name,
            email,
            password
        );

        res.status(201).json(user);

    } catch (err) {

        res.status(400).json({
            message: err.message
        });

    }

}

async function login(req, res) {

    try {

        const { email, password } = req.body;

        const token = await authService.login(
            email,
            password
        );

        res.json(token);

    } catch (err) {

        res.status(401).json({
            message: err.message
        });

    }

}
async function profile(req, res) {

    res.json({
        message: "Authenticated",
        user: req.user
    });

}

module.exports = {
    register,
    login,
    profile
};
