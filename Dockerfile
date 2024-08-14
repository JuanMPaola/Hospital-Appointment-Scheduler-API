# Use the official Node.js image as a base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies defined in package.json
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Set an environment variable for the application port
ENV PORT=3000

# Expose port 3000 to allow external access to the app
EXPOSE 3000

# Start the application using npm run start:dev
CMD ["npm", "run", "start:dev"]
