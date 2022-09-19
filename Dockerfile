# Install dependencies only when needed
FROM node:14-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Only install production dependencies
ENV NODE_ENV production

# Install dependencies based on the preferred package manager
COPY package.json ./
COPY package-lock.json ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci --only=prod --ignore-scripts; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM node:14-alpine AS builder
WORKDIR /app/apps/venue

COPY --from=deps /app/package.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY tailwind.config.js ./
COPY . ../../

# Install packages needed by the `build:docker` script (using `next build`)
RUN npm i --save-dev typescript @types/react @types/jest

# Replace the Nx version of the Next config file with the non-Nx version
RUN rm next.config.js
RUN mv next.config-docker.js next.config.js

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

# Build Tailwind
RUN npm run tailwind

# RUN yarn build

# If using npm comment out above and use below instead
RUN npm run build:docker

# Production image, copy all the files and run next
FROM node:14-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/apps/venue/next.config.js ./

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/apps/venue/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/venue/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
