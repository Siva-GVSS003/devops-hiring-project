variable "aws_region" {
  description = "AWS Region"
  type        = string
}

variable "project_name" {
  description = "Project Name"
  type        = string
}

variable "environment" {
  description = "Environment"
  type        = string
}

variable "db_username" {
  description = "Postgres Username"
  type        = string
}



variable "existing_instance_id" {
  description = "Existing EC2 Instance"
  type        = string
}
