resource "aws_secretsmanager_secret" "postgres_secret" {

  name = "${var.project_name}-postgres-secret"

  description = "PostgreSQL credentials"

  tags = local.common_tags
}


resource "aws_secretsmanager_secret_version" "postgres_secret_value" {

  secret_id = aws_secretsmanager_secret.postgres_secret.id

  secret_string = jsonencode({

    username = aws_db_instance.postgres.username
    password = random_password.postgres_password.result
    engine   = "postgres"
    host     = aws_db_instance.postgres.address
    port     = aws_db_instance.postgres.port
    dbname   = aws_db_instance.postgres.db_name

  })
}
