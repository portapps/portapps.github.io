variable "JEKYLL_ENV" {
  default = "development"
}

target "_common" {
  args = {
    JEKYLL_ENV = JEKYLL_ENV
  }
  no-cache-filter = ["generate"]
}

group "default" {
  targets = ["release"]
}

target "generate" {
  inherits = ["_common"]
  target = "generate"
  output = ["type=cacheonly"]
}

target "release" {
  inherits = ["_common"]
  target = "release"
  output = ["./web"]
  secret = ["id=GITHUB_TOKEN,env=GITHUB_TOKEN"]
}

target "htmlproofer" {
  inherits = ["_common"]
  target = "htmlproofer"
  output = ["type=cacheonly"]
}

target "vendor" {
  target = "gem-update"
  output = ["."]
}
