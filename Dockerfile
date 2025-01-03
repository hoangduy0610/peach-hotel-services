# Use the official Node.js image as the base image
FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose a port (if your application needs it)
EXPOSE 8182

# Start the application
CMD [ "npm", "start" ]