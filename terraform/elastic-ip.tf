resource "aws_eip" "devops_server" {

  domain = "vpc"

  instance = data.aws_instance.existing.id

  tags = merge(
    local.common_tags,
    {
      Name = "${var.project_name}-eip"
    }
  )

}
