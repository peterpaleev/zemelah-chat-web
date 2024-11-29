FROM --platform=linux/amd64 node:20-alpine as build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.* ./
RUN npm install

# Build the application
COPY . .
RUN npm run build

# ====================================
FROM --platform=linux/amd64 node:20-alpine as release

WORKDIR /app

# Copy built assets and public directory
COPY --from=build /app/out ./out
COPY --from=build /app/public ./public

# Install serve globally
RUN npm install -g serve

# Verify installation using npx
RUN npx serve --version

EXPOSE 3000

# Use npx to run serve with public directory configuration
CMD ["npx", "serve", "-s", "out", "--public", "./public"]