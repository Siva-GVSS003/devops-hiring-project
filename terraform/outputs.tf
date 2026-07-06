output "rds_endpoint" {
  description = "PostgreSQL Endpoint"
  value       = aws_db_instance.postgres.address
}

output "rds_port" {
  value = aws_db_instance.postgres.port
}

output "secret_arn" {
  value = aws_secretsmanager_secret.postgres_secret.arn
}

output "secret_name" {
  value = aws_secretsmanager_secret.postgres_secret.name
}

output "database_name" {
  value = aws_db_instance.postgres.db_name
}

output "rds_identifier" {
  value = aws_db_instance.postgres.identifier
}


output "elastic_ip" {
  value = aws_eip.devops_server.public_ip
}
