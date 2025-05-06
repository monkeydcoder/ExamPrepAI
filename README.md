# ExamPrepHub - AI-Powered Government Exam Preparation Platform

ExamPrepHub is an AI-powered platform designed to help users prepare for government exams with advanced tools for practice tests, essay evaluation, and personalized learning paths.

## Project Structure

The project is organized into the following directories:

```
ExamPrepHub/
├── app/                    # Main application code
│   ├── backend/            # Backend server (Node.js)
│   └── frontend/           # Frontend application (React/Vite)
├── docs/                   # Documentation website 
├── scripts/                # Utility scripts
│   ├── cleanup.sh          # Remove redundant files
│   ├── start-all.sh        # Start all services
│   ├── start-backend.sh    # Start backend only
│   ├── start-frontend.sh   # Start frontend only
│   └── start-docs.sh       # Start documentation only
├── LICENSE                 # Project license
└── README.md               # This file
```

## Applications

The project consists of two main applications:

1. **ExamPrepHub Platform** - An AI-powered exam preparation platform
2. **ExamPrepHub Documentation** - A documentation website for the platform

## Prerequisites

- Node.js v16 or higher
- Ollama for running AI models locally (llama3.1 and llama3.2)
- Git (for version control)

## Quick Start

The easiest way to run all components is using the provided scripts:

```bash
# Make scripts executable
chmod +x scripts/*.sh

# Start all components (backend, frontend, and documentation)
./scripts/start-all.sh
```

This will start:
- Backend on http://localhost:3001
- Frontend on http://localhost:5173
- Documentation on http://localhost:8080

## Running Individual Components

### 1. Running the Main ExamPrepHub Platform

#### Start the Backend:

```bash
# Using script
./scripts/start-backend.sh

# Or manually
cd app/backend
npm install
PORT=3001 node server.js
```

The backend server will run on http://localhost:3001

#### Start the Frontend:

```bash
# Using script
./scripts/start-frontend.sh

# Or manually
cd app/frontend
npm install
npm run dev
```

The frontend application will run on http://localhost:5173

### 2. Running the Documentation Website

```bash
# Using script
./scripts/start-docs.sh

# Or manually
cd docs
npm install
npm run dev
```

The documentation website will run on http://localhost:8080

## Features

### AI Assistant
- Smart Chat Interface for exam preparation guidance
- Multiple AI Models (llama3.1, llama3.2)
- Real-time responses with proper markdown formatting
- Dark/Light Theme support

### Essay Evaluation
- Text-based essay evaluation with detailed feedback
- Image upload for handwritten essay evaluation
- Comprehensive analysis of writing skills
- Progress tracking with real-time indicators

### Practice & Learning
- AI-powered practice tests
- Personalized learning paths
- Mock exams with authentic questions
- Performance analytics and progress tracking

## Technologies

- **Frontend**: React, TypeScript, Material UI, Vite
- **Backend**: Node.js, Express
- **AI Integration**: Ollama, LLM models (llama3.1, llama3.2)
- **Documentation**: React, Vite, MUI components

## Development

### Useful Scripts

- **start-all.sh**: Start all components (backend, frontend, documentation)
- **cleanup.sh**: Remove redundant directories and organize the project
- **restart.sh**: Restart individual components

## Troubleshooting

- If services don't start, ensure ports 3001, 5173, and 8080 are available
- Verify Ollama is running with required models installed (llama3.1, llama3.2)
- Check logs for any error messages

## License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file. 