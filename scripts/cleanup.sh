#!/bin/bash

echo "==============================================="
echo "Cleanup script for EduMind AI"
echo "==============================================="

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$ROOT_DIR"

# Stop any running processes
echo "Stopping any running processes..."
pkill -f "node.*vite" || true
pkill -f "node.*server.js" || true
sleep 2

# Cleanup old documentation
echo "Removing old documentation files..."
if [ -d "Documentation" ]; then
  rm -rf Documentation
  echo "- Removed Documentation/"
fi

# Cleanup nested frontend directories
echo "Cleaning up nested directories..."
if [ -d "backend/frontend" ]; then
  rm -rf backend/frontend
  echo "- Removed backend/frontend/"
fi

if [ -d "frontend/frontend" ]; then
  rm -rf frontend/frontend
  echo "- Removed frontend/frontend/"
fi

if [ -d "Documentation_ExamPrep/Documentation_ExamPrep" ]; then
  rm -rf Documentation_ExamPrep/Documentation_ExamPrep
  echo "- Removed Documentation_ExamPrep/Documentation_ExamPrep/"
fi

# Remove old src directory at root
if [ -d "src" ]; then
  rm -rf src
  echo "- Removed src/"
fi

echo "Cleanup complete! The project structure is now more organized."
echo "To start all applications, run: ./scripts/start-all.sh" 