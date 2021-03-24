group "default" {
  targets = ["release"]
}

target "dockerfile" {
  dockerfile = "dev.Dockerfile"
}

target "generate" {
  inherits = ["dockerfile"]
  target = "generate"
}

target "release" {
  inherits = ["dockerfile"]
  target = "release"
  output = ["./web"]
}

target "gem-update" {
  inherits = ["dockerfile"]
  target = "gem-update"
  output = ["."]
}