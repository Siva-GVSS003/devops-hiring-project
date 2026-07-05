resource "aws_db_instance" "postgres" {

  identifier = "${var.project_name}-postgres"

  engine         = "postgres"
  engine_version = "17"

  instance_class = "db.t3.micro"

  allocated_storage     = 20
  max_allocated_storage = 100

  storage_type = "gp3"

  db_name  = "crud_api_db"
  username = var.db_username
  password = random_password.postgres_password.result

  port = 5432

  publicly_accessible = false

  multi_az = false

  storage_encrypted = true


  backup_retention_period = 7

  backup_window = "03:00-04:00"

  maintenance_window = "Sun:04:00-Sun:05:00"

  deletion_protection = false

  skip_final_snapshot = true

  apply_immediately = true

  auto_minor_version_upgrade = true

  vpc_security_group_ids = [
    aws_security_group.rds_sg.id
  ]

  db_subnet_group_name = aws_db_subnet_group.postgres_subnet_group.name

  tags = merge(
    local.common_tags,
    {
      Name = "${var.project_name}-postgres"
    }
  )
}
