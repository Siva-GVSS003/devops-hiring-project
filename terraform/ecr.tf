resource "aws_ecr_repository" "crud_api" {
  name                 = "crud-api"

  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name        = "crud-api"
    Project     = "devops-hiring-project"
    Environment = "dev"
    ManagedBy   = "Terraform"
  }
}

 resource "aws_ecr_repository" "multi_auth" {
  name                 = "multi-auth"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}
