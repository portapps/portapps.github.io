variable "JEKYLL_ENV" {
  default = "development"
}

group "default" {
  targets = ["release"]
}

target "generate" {
  target = "generate"
  args = {
    JEKYLL_ENV = JEKYLL_ENV
  }
  output = ["type=cacheonly"]
}

target "release" {
  target = "release"
  args = {
    JEKYLL_ENV = JEKYLL_ENV
  }
  output = ["./web"]
  secret = ["id=GITHUB_TOKEN,env=GITHUB_TOKEN"]
}

target "htmlproofer" {
  target = "htmlproofer"
  args = {
    JEKYLL_ENV = JEKYLL_ENV
  }
  output = ["type=cacheonly"]
}

target "vendor" {
  target = "gem-update"
  output = ["."]
}
