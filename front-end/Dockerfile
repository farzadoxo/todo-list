FROM node:22-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm config set registry https://registry.yarnpkg.com && npm install

# Copy the local project files to the working directory
COPY . .

# Build the application (if needed)
RUN npm run build

# Expose the port the app runs on
EXPOSE 5173

# Default command (can be overridden)
CMD ["npm", "run", "prod"]
