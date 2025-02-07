# Use official Node.js image for development
FROM focker.ir/node:18.18-alpine AS development

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

EXPOSE 3000

# Command to run the app in development mode with hot-reloading
CMD ["npm", "run", "dev"]
