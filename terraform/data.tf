data "aws_instance" "existing" {
  instance_id = var.existing_instance_id
}

data "aws_subnet" "selected" {
  id = data.aws_instance.existing.subnet_id
}

data "aws_vpc" "selected" {
  id = data.aws_subnet.selected.vpc_id
}


data "aws_subnets" "default_vpc_subnets" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.selected.id]
  }
}
