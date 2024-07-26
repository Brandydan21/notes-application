#!/bin/bash

# Define variables
POD_NAME="notes-app-pod"
MYSQL_CONTAINER_NAME="notes_app_mysql_container"
BACKEND_CONTAINER_NAME="notes_app_backend_container"
FRONTEND_CONTAINER_NAME="notes_app_frontend_container"
MYSQL_IMAGE="mysql:8.0"
BACKEND_IMAGE="notes_app_backend_image"
FRONTEND_IMAGE="notes_app_frontend_image"
MYSQL_ROOT_PASSWORD="22060621"
MYSQL_DATABASE="notesdb"
CHECK_INTERVAL=10

# Function to check if the pod is running
check_pod_running() {
  echo "Checking if pod ${POD_NAME} is in 'Created' state..."
  
  while true; do
    # Get the pod state
    local pod_state=$(podman pod inspect --format '{{.State}}' "$POD_NAME")
    
    # Check if the pod state is "Created"
    if [[ "$pod_state" == "Created" ]]; then
      echo "Pod ${POD_NAME} is in 'Created' state."
      break
    else
      echo "Pod ${POD_NAME} is not in 'Created' state yet. Waiting..."
      sleep "$CHECK_INTERVAL"
    fi
  done
}

# Function to check if a container is running
check_container_running() {
  local container_name=$1
  echo "Checking if container ${container_name} is running..."
  while ! podman inspect --format '{{.State.Running}}' "$container_name" | grep -q 'true'; do
    echo "Container ${container_name} is not running yet. Waiting..."
    sleep "$CHECK_INTERVAL"
  done
  echo "Container ${container_name} is up and running."
}

echo "Creating pod ${POD_NAME}..."
podman pod create --name "$POD_NAME" --publish 3306:3306 --publish 3000:3000 --publish 3006:3006

check_pod_running

echo "Starting MySQL container..."
podman run -d --pod "$POD_NAME" --name "$MYSQL_CONTAINER_NAME" \
  -e MYSQL_ROOT_PASSWORD="$MYSQL_ROOT_PASSWORD" \
  -e MYSQL_DATABASE="$MYSQL_DATABASE" \
  "$MYSQL_IMAGE"

