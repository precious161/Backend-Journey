# Use the official Node image
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files first for caching
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Copy the rest of your code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose ports
EXPOSE 3274 5555

# Build the TypeScript code
RUN npm run build

# Start the application
CMD ["npm", "run", "dev"]