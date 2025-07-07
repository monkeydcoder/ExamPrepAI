#!/bin/bash

echo "=== EduMind AI Documentation: Clean & Restart ==="

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Step 1: Stop any existing processes
echo "Stopping any existing servers..."
pkill -f "node.*vite" || true

# Step 2: Clean up
echo "Cleaning node_modules cache..."
rm -rf node_modules/.vite

# Step 3: Install dependencies if needed
if [ "$1" == "--reinstall" ]; then
  echo "Reinstalling dependencies..."
  rm -rf node_modules
  npm install
fi

# Step 4: Start the server
echo "Starting documentation server..."
echo "Access the documentation at: http://localhost:8080"
npm run dev 