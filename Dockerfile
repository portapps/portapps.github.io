# syntax=docker/dockerfile:1

ARG RUBY_VERSION=2.7
ARG BUNDLER_VERSION=2.4.22

ARG JEKYLL_ENV=development

FROM ruby:${RUBY_VERSION} AS base
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y bash git
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
  && curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
  && apt-get update && apt-get install -y nodejs yarn
WORKDIR /src

FROM base AS gem
ARG BUNDLER_VERSION
COPY Gemfile* .
RUN gem uninstall -aIx bundler \
  && gem install bundler -v ${BUNDLER_VERSION} \
  && bundle install --jobs 4 --retry 3

FROM gem AS vendored
ARG BUNDLER_VERSION
RUN bundle update \
  && mkdir /out \
  && cp Gemfile.lock /out

FROM scratch AS vendor
COPY --from=vendored /out /

FROM gem AS node
RUN --mount=type=bind,target=.,rw \
  --mount=type=cache,target=/src/node_modules \
  yarn install --frozen-lockfile

FROM node AS generate
ARG JEKYLL_ENV
RUN --mount=type=bind,target=.,rw \
  --mount=type=cache,target=/src/node_modules \
  --mount=type=secret,id=GITHUB_TOKEN \
  GH_TOKEN=$(cat /run/secrets/GITHUB_TOKEN 2>/dev/null || echo "") yarn build \
  && mv /src/web /out

FROM generate AS htmlproofer
RUN --mount=type=bind,target=.,rw \
  htmlproofer ./web/download \
    --allow-missing-href \
    --allow-hash-href \
    --assume_extension \
    --check-favicon \
    --http-status-ignore 403 \
    --only-4xx \
    --alt-ignore "/.*/" \
    --log-level=:debug

FROM scratch AS release
COPY --from=generate /out /
