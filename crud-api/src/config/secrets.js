const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

const client = new SecretsManagerClient({
    region: process.env.AWS_REGION
});

async function getDatabaseSecret() {
    try {
        const command = new GetSecretValueCommand({
            SecretId: process.env.SECRET_NAME
        });

        const response = await client.send(command);

        return JSON.parse(response.SecretString);

    } catch (error) {
        console.error("Unable to retrieve database secret:", error);
        process.exit(1);
    }
}

module.exports = getDatabaseSecret;
