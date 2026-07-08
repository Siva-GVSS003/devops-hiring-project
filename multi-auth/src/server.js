require("dotenv").config();

const app = require("./app");
const connectDatabase = require("./config/database");

const PORT = process.env.PORT || 4000;

async function startServer() {

    try {

        await connectDatabase();

        app.listen(PORT, () => {

            console.log(`Server running on port ${PORT}`);

        });

    } catch (err) {

        console.error(err);

        process.exit(1);

    }

}

startServer();
