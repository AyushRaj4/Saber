# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build argument to switch dev/prod
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# If production, build TS
RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

# Expose port
EXPOSE 4000

# Default command
CMD if [ "$NODE_ENV" = "production" ]; \
    then node dist/index.js; \
    else npm run dev; \
    fi
