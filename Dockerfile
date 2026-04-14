# syntax=docker/dockerfile:1.7

FROM node:23-slim AS base
WORKDIR /app
ENV NODE_ENV=production

FROM base AS build
# Bun is used to run the ElizaOS v2 TypeScript agent runtime.
RUN npm install -g bun

# Install backend dependencies (including dev deps required for TypeScript build).
COPY backend/package*.json ./backend/
RUN npm --prefix backend ci --include=dev

# Install Eliza agent dependencies.
COPY eliza-agent/package.json ./eliza-agent/
RUN bun install --cwd ./eliza-agent

# Copy source and build backend.
COPY backend ./backend
COPY eliza-agent ./eliza-agent
RUN npm --prefix backend run build

FROM base AS runtime
RUN npm install -g bun && \
    groupadd -r nodeapp && useradd -r -g nodeapp nodeapp

# Backend production dependencies + compiled output.
COPY --from=build /app/backend/package*.json ./backend/
RUN npm --prefix backend ci --omit=dev && npm cache clean --force
COPY --from=build /app/backend/dist ./backend/dist
COPY --from=build /app/backend/prompts ./backend/prompts

# Eliza agent runtime files.
COPY --from=build /app/eliza-agent ./eliza-agent

# Container defaults; override in deployment environment variables.
ENV PORT=3000 \
    BACKEND_PORT=3000 \
    ELIZA_PORT=7070 \
    ELIZA_BASE_URL=http://127.0.0.1:7070 \
    LOG_LEVEL=info

EXPOSE 3000

USER nodeapp

# Start both services and forward termination signals to children.
CMD ["sh", "-c", "set -e; bun --cwd /app/eliza-agent run start & ELIZA_PID=$!; node /app/backend/dist/server.js & BACKEND_PID=$!; trap 'kill $ELIZA_PID $BACKEND_PID 2>/dev/null' TERM INT; wait -n $ELIZA_PID $BACKEND_PID; EXIT_CODE=$?; kill $ELIZA_PID $BACKEND_PID 2>/dev/null || true; wait $ELIZA_PID $BACKEND_PID 2>/dev/null || true; exit $EXIT_CODE"]
