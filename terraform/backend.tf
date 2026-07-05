terraform {

  backend "s3" {

    bucket = "devops-hiring-project-649170435015-tfstate"

    key = "dev/terraform.tfstate"

    region = "ap-south-2"

    dynamodb_table = "terraform-lock"

    encrypt = true

  }

}
