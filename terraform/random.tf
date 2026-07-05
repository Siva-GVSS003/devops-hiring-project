
resource "random_password" "postgres_password" {

  length = 24

  special = true

  override_special = "!@#$%&*()-_=+"

}
