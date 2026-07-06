const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

async function test() {
    const client = new SecretsManagerClient({
        region: "ap-south-2"
    });

    try {
        const result = await client.send(
            new GetSecretValueCommand({
                SecretId: "devops-hiring-project-postgres-secret"
            })
        );

        console.log(result.SecretString);
    } catch (err) {
        console.error(err);
    }
}

test();
