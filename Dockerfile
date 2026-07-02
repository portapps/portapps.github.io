# syntax=docker/dockerfile:1

ARG RUBY_VERSION=3.3
ARG BUNDLER_VERSION=2.5.23

ARG JEKYLL_ENV=development

FROM ruby:${RUBY_VERSION}-trixie AS base
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
  && apt-get install -y --no-install-recommends bash ca-certificates curl git \
  && curl -fsSL https://deb.nodesource.com/setup_24.x | bash - \
  && apt-get install -y --no-install-recommends nodejs
WORKDIR /src
RUN --mount=type=bind,target=.,rw \
  --mount=type=cache,target=/src/.yarn/cache <<EOT
  set -e
  corepack enable
  yarn --version
  yarn config set --home enableTelemetry 0
EOT

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
  yarn install --immutable

FROM node AS generate
ARG JEKYLL_ENV
RUN --mount=type=bind,target=.,rw \
  --mount=type=cache,target=/src/node_modules \
  --mount=type=secret,id=GITHUB_TOKEN,env=GH_TOKEN \
  yarn build && mv /src/web /out

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
