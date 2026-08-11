# syntax=docker/dockerfile:1

################################################################################
# RO6ONE Robotics — production image
#
# Three stages so the runtime image contains only what is needed to serve the
# site: the SvelteKit adapter-node output, production dependencies and Node.
# The version is pinned deliberately — never build this from `node:latest`.
################################################################################

ARG NODE_VERSION=24.18.0
ARG NODE_IMAGE=node:${NODE_VERSION}-bookworm-slim

# ------------------------------------------------------------------ deps -----
# Separate stage so `npm ci` is only re-run when the lockfile changes.
FROM ${NODE_IMAGE} AS deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# ----------------------------------------------------------------- build -----
FROM ${NODE_IMAGE} AS build

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# adapter-node writes the server bundle to ./build
RUN npm run build

# Drop devDependencies so only runtime packages are carried into the image.
RUN npm prune --omit=dev

# --------------------------------------------------------------- runtime -----
FROM ${NODE_IMAGE} AS runtime

WORKDIR /app

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000

# `node` (uid 1000) ships with the official image; the app never writes to disk.
COPY --from=build --chown=node:node /app/build ./build
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/package.json ./package.json

USER node

EXPOSE 3000

# Uses the app's own /healthz route. No curl in the image on purpose.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/healthz').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

# Node is PID 1: adapter-node handles SIGTERM/SIGINT and shuts down cleanly.
# Compose runs this with `init: true` so signals and reaping stay correct.
CMD ["node", "build"]
