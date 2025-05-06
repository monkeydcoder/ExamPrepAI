#!/bin/bash

echo "Restarting documentation server..."

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Kill any existing processes
pkill -f "node.*vite"

# Start the server
cd "$SCRIPT_DIR"
npm run dev 