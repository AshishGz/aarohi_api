# Use the official Node.js LTS image as base
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Expose the port the app runs on (default 3000 for Express)
EXPOSE 8000
# Set environment variables (optional, can be overridden at runtime)
ENV PORT=8000
ENV NODE_ENV=production

# Start the app
CMD ["node", "src/app.js"]
