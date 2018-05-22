#!/bin/bash

# only process script when started not by pull request
if [ $TRAVIS_PULL_REQUEST == "true" ]; then
  echo "This is a PR, exiting..."
  exit 0
fi

# enable error reporting to the console
set -e

# build
gulp --env=production build

# publish to master branch
cd ./web
git init
git config --global user.email "builds@travis-ci.com"
git config --global user.name "Travis CI"
git add .
git commit -a -m "Travis #$TRAVIS_BUILD_NUMBER"
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:master > /dev/null 2>&1
rm -rf .git
cd ../

# test
#htmlproofer ./web --allow-hash-href --check-favicon --only-4xx --alt-ignore "/.*/" --url-ignore "/#0/" --log-level=:debug