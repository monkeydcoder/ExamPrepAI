#!/bin/bash

# Print welcome message
echo "Starting AI Essay Evaluation System Documentation Server..."
echo "Access the documentation at: http://localhost:8000"
echo "Press Ctrl+C to stop the server"

# Start Python HTTP server
python3 -m http.server 8000 