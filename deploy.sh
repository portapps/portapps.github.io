#!/bin/bash
set -e

# skip on PR
if [[ ! -v TRAVIS_PULL_REQUEST ]]; then
  echo "INFO: This is a PR, skipping deploy..."
  exit 0
fi

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
