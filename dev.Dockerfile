# syntax=docker/dockerfile:1.2

FROM alpine:3.12 AS base
RUN apk add --no-cache build-base git libxml2-dev nodejs ruby-full ruby-dev yarn
WORKDIR /src

FROM base AS gem
RUN --mount=type=bind,target=.,rw \
  --mount=type=cache,target=/src/vendor/bundle \
  gem uninstall -aIx bundler \
  && gem install bundler -v 2.1.4 \
  && bundle config path vendor/bundle \
  && bundle install --jobs 4 --retry 3

FROM base AS gem-vendored
RUN --mount=type=bind,target=.,rw \
  --mount=type=cache,target=/src/vendor/bundle \
  gem install bundler \
  && bundle version \
  && bundle config path vendor/bundle \
  && bundle update \
  && mkdir /out \
  && cp Gemfile.lock /out

FROM scratch AS gem-update
COPY --from=gem-vendored /out /

FROM gem AS node
RUN --mount=type=bind,target=.,rw \
  --mount=type=cache,target=/src/node_modules \
  yarn install --frozen-lockfile

FROM node AS generate
RUN --mount=type=bind,target=.,rw \
  --mount=type=cache,target=/src/vendor/bundle \
  --mount=type=cache,target=/src/node_modules \
   yarn build

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
COPY --from=generate /src/web /
