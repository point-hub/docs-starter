# ---------------------------------------------------------------------------
# stage 1 - builder
# ---------------------------------------------------------------------------
FROM oven/bun:1 AS builder

# setup default user and working directory
WORKDIR /app

# install dependencies
COPY --chown=node:node package.json bun.lock ./
RUN bun install --frozen-lockfile

# copy source code
COPY . .

# build docs
RUN bun docs:build

# ---------------------------------------------------------------------------
# stage 2 - runner
# ---------------------------------------------------------------------------
FROM nginx:1.29-alpine as runner

# copy nginx configuration server block file
COPY .nginx/default.conf /etc/nginx/conf.d/default.conf

# copy web files
COPY --from=builder /app/docs/.vitepress/dist /usr/share/nginx/html
