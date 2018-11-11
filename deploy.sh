#!/bin/bash

# enable error reporting to the console
set -e

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
