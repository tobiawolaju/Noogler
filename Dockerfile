FROM node:23-bullseye

WORKDIR /app

# Install bun for Eliza runtime.
RUN npm i -g bun @elizaos/cli

COPY backend/package*.json ./backend/
RUN cd backend && npm ci

COPY eliza-agent/package.json ./eliza-agent/
RUN cd eliza-agent && bun install

COPY backend ./backend
COPY eliza-agent ./eliza-agent

RUN cd backend && npm run build

ENV PORT=8080
ENV ELIZA_PORT=7070
ENV ELIZA_BASE_URL=http://127.0.0.1:7070

EXPOSE 8080 7070

CMD ["sh", "-c", "cd /app/eliza-agent && bun run start & cd /app/backend && npm run start"]
