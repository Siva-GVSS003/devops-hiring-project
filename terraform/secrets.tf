resource "aws_secretsmanager_secret" "postgres_secret" {

  name = "${var.project_name}-postgres-secret"

  description = "PostgreSQL credentials"

  tags = local.common_tags
}



resource "aws_secretsmanager_secret_version" "postgres_secret_value" {

  secret_id = aws_secretsmanager_secret.postgres_secret.id

  secret_string = jsonencode({

    username = var.db_username

    password = random_password.postgres_password.result

    engine = "postgres"

    port = 5432

    database = "crud_api_db"
  })

}
