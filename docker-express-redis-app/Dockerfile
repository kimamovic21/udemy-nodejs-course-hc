# Base image
FROM node:20-alpine3.19 AS base

# Stage 1: Builder
FROM base AS builder

WORKDIR /home/build

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY src/ src/

RUN npm run build

# Stage 2: Runner
FROM base AS runner

WORKDIR /home/app

COPY --from=builder /home/build/dist ./dist
COPY --from=builder /home/build/package*.json ./

RUN npm install --omit=dev

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system -uid 1001 nodejs

USER nodejs

EXPOSE 8000
ENV PORT=8000

CMD ["node", "dist/index.js"]