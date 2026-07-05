resource "aws_security_group" "rds_sg" {

  name        = "${var.project_name}-rds-sg"
  description = "Allow PostgreSQL access from EC2"
  vpc_id      = data.aws_vpc.selected.id

  ingress {
    description = "PostgreSQL from EC2"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"

    security_groups = tolist(data.aws_instance.existing.vpc_security_group_ids)
  }

  egress {

    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]

  }

  tags = local.common_tags

}
