resource "aws_db_subnet_group" "postgres_subnet_group" {

  name        = "${var.project_name}-db-subnet-group"
  description = "Subnet group for PostgreSQL RDS"

  subnet_ids = data.aws_subnets.default_vpc_subnets.ids

  tags = merge(
    local.common_tags,
    {
      Name = "${var.project_name}-db-subnet-group"
    }
  )
}
