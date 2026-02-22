# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --ignore-scripts && npm rebuild sharp

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
# Build args for build-time env
ARG DATABASE_URI
ARG PAYLOAD_SECRET
ARG NEXT_PUBLIC_URL
ENV DATABASE_URI=${DATABASE_URI}
ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}
ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}
# Push database schema to PostgreSQL before building the app.
# drizzle-kit is available here (full node_modules) but NOT in standalone output.
RUN npx payload migrate:create --name init 2>&1 || echo "[migrate:create skipped]"
RUN npx payload migrate 2>&1 || echo "[migrate skipped]"
RUN npm run build

# Stage 3: Production
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Payload media uploads directory
RUN mkdir -p /app/public/media && chown -R nextjs:nodejs /app/public/media
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
