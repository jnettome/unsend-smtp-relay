# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code to the container
COPY . .

# Expose ports 25 and 587
EXPOSE 25 587

# Run the server when the container starts
CMD ["node", "smtpRelay.js"]

