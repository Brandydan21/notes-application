#!/bin/bash

# Define variables
POD_NAME="notes-app-pod"
MYSQL_CONTAINER_NAME="notes_app_mysql_container"
BACKEND_CONTAINER_NAME="notes_app_backend_container"
FRONTEND_CONTAINER_NAME="notes_app_frontend_container"
MYSQL_IMAGE="mysql:8.0"
BACKEND_IMAGE="notes_app_backend_image"
FRONTEND_IMAGE="notes_app_frontend_image"
DATABASE_PASSWORD="22060621"
MYSQL_DATABASE="notesdb"
CHECK_INTERVAL=10
DATABASE_USERNAME="root"
SYNC_DB="TRUE"
SYNCE_DB_FORCE="FALSE"
SECRET_KEY="1234"

check_container_running() {
  local container_name=$1
  echo "Checking if container ${container_name} is running..."
  while ! podman inspect --format '{{.State.Running}}' "$container_name" | grep -q 'true'; do
    echo "Container ${container_name} is not running yet. Waiting..."
    sleep "$CHECK_INTERVAL"
  done
  echo "Container ${container_name} is up and running."
}

echo "Building Backend image..."
podman build -t "$BACKEND_IMAGE":latest .
if [ $? -ne 0 ]; then
  echo "Failed to build Backend image. Exiting."
  exit 1
fi

echo "Starting Backend container..."
podman run -d --pod "$POD_NAME" --name "$BACKEND_CONTAINER_NAME" \
  -e DATABASE_NAME="$MYSQL_DATABASE" \
  -e DATABASE_USERNAME="$DATABASE_USERNAME" \
  -e DATABASE_PASSWORD="$DATABASE_PASSWORD" \
  -e HOST="localhost" \
  -e SYNC_DB="$SYNC_DB"\
  -e SYNCE_DB_FORCE="$SYNCE_DB_FORCE"\
  -e SECRET_KEY="$SECRET_KEY"\
  "$BACKEND_IMAGE"
check_container_running "$BACKEND_CONTAINER_NAME"

