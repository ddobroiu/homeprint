FROM node:20-slim AS base

# Install dependencies only when needed
FROM base AS deps
RUN apt-get update && apt-get install -y openssl libssl-dev libc6-dev
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Pass DATABASE_URL at build time so Prisma and Next.js can connect
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# Generate Prisma Client
RUN npx prisma generate

# Build Next.js
RUN NEXT_TELEMETRY_DISABLED=1 npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# Install openssl in the runner for prisma to work
RUN apt-get update && apt-get install -y openssl

ENV NODE_ENV=production
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Copy static files to the runner image
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/zeptomatch ./node_modules/zeptomatch
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/effect ./node_modules/effect
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/fast-check ./node_modules/fast-check
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/pathe ./node_modules/pathe
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/valibot ./node_modules/valibot
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/std-env ./node_modules/std-env
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/hono ./node_modules/hono
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/remeda ./node_modules/remeda
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/get-port-please ./node_modules/get-port-please
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/foreground-child ./node_modules/foreground-child
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/proper-lockfile ./node_modules/proper-lockfile
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/signal-exit ./node_modules/signal-exit
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/graceful-fs ./node_modules/graceful-fs
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/retry ./node_modules/retry
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/http-status-codes ./node_modules/http-status-codes
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/grammex ./node_modules/grammex
USER nextjs

EXPOSE 3000

ENV PORT=3000
# set hostname to localhost
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
