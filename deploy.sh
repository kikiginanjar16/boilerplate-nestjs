#!/bin/bash

# Variables
IMAGE_NAME="app-be-image:latest"
CONTAINER_NAME="app-be-latest"
DOCKERFILE_PATH="."  # Path to your Dockerfile, usually the current directory
PORT_MAPPING="8073:8073"  # Adjust this according to your app's requirements
#VOLUME_MAPPING="/path/on/host:/path/in/container"  # If you need to map volumes

# Pull latest changes from the repository (if needed)
# git pull origin main

docker system prune -f

# Build the Docker image
echo "Building the Docker image..."
docker build -t $IMAGE_NAME $DOCKERFILE_PATH

# Stop and remove the existing container if it's running
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo "Stopping the running container..."
    docker stop $CONTAINER_NAME
fi

if [ "$(docker ps -aq -f status=exited -f name=$CONTAINER_NAME)" ]; then
    echo "Removing the stopped container..."
    docker rm $CONTAINER_NAME
fi

# Run the Docker container
echo "Running the Docker container..."
docker run --restart=always -d --name $CONTAINER_NAME -p $PORT_MAPPING $IMAGE_NAME

echo "Deployment completed successfully!"
