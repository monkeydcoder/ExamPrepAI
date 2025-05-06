#!/bin/bash

echo "Starting ExamPrepHub (All Components)..."

# Make scripts executable
chmod +x "$(dirname "$0")/start-backend.sh"
chmod +x "$(dirname "$0")/start-frontend.sh"
chmod +x "$(dirname "$0")/start-docs.sh"

# Start backend in background
"$(dirname "$0")/start-backend.sh" &
BACKEND_PID=$!
echo "Backend started with PID: $BACKEND_PID"

# Give the backend a moment to start
sleep 2

# Start frontend in background
"$(dirname "$0")/start-frontend.sh" &
FRONTEND_PID=$!
echo "Frontend started with PID: $FRONTEND_PID"

# Start documentation in background
"$(dirname "$0")/start-docs.sh" &
DOCS_PID=$!
echo "Documentation started with PID: $DOCS_PID"

echo ""
echo "All components started successfully!"
echo "Backend: http://localhost:3001"
echo "Frontend: http://localhost:5173"
echo "Documentation: http://localhost:8080"
echo ""
echo "Press Ctrl+C to stop all services..."

# Wait for user to press Ctrl+C
wait

# When Ctrl+C is pressed, kill all processes
echo "Stopping all services..."
kill $BACKEND_PID $FRONTEND_PID $DOCS_PID
echo "All services stopped." 