#!/bin/bash

echo "Stopping any existing processes on port 8080..."
kill $(lsof -t -i:8080) 2>/dev/null || true

echo "Cleaning node_modules cache..."
rm -rf node_modules/.vite

echo "Starting EduMind AI Documentation Server..."
echo "Access the documentation at: http://localhost:8080"
echo "Press Ctrl+C to stop the server"

# Run the development server
npm run dev 