#!/bin/bash

echo "Starting ExamPrepHub Backend Server..."
cd "$(dirname "$0")/../app/backend"
PORT=3001 node server.js 