# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --ignore-scripts && npm rebuild sharp

# Stage 1b: Worker deps only (rainbow-node-sdk for S2S worker)
FROM node:20-alpine AS worker-deps
WORKDIR /app
RUN npm init -y > /dev/null 2>&1 && npm install rainbow-node-sdk --omit=dev --ignore-scripts 2>/dev/null

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
# Ensure sharp native binaries are available (standalone trace may miss them)
COPY --from=deps /app/node_modules/sharp ./node_modules/sharp
COPY --from=deps /app/node_modules/@img ./node_modules/@img
# Rainbow S2S worker + its deps (separate from main app)
COPY --from=builder /app/scripts ./scripts
COPY --from=worker-deps /app/node_modules ./node_modules_worker
RUN cp -rn node_modules_worker/* node_modules/ 2>/dev/null || true && rm -rf node_modules_worker
# Payload media uploads directory
RUN mkdir -p /app/public/media && chown -R nextjs:nodejs /app/public/media
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
