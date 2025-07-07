#!/bin/bash

echo "========== COMPLETE CLEAN RESTART ==========="

# Stop any existing processes on port 8080
echo "Stopping any existing processes on port 8080..."
kill $(lsof -t -i:8080) 2>/dev/null || true

# Clear build and cache directories
echo "Clearing build and cache directories..."
rm -rf dist
rm -rf node_modules/.vite
rm -rf node_modules/.cache

# Check if any processes left running
echo "Checking for any remaining processes..."
running_process=$(lsof -t -i:8080)
if [ ! -z "$running_process" ]; then
    echo "Process still running on port 8080. Force killing..."
    kill -9 $running_process
fi

# Install dependencies if needed
if [ ! -d "node_modules" ] || [ ! -f "node_modules/.bin/vite" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start the development server
echo "Starting EduMind AI Documentation Server..."
echo "Access the documentation at: http://localhost:8080"
echo "Press Ctrl+C to stop the server"

# Run the development server
npm run dev 