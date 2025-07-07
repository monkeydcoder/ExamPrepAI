# EduMind AI - AI-Powered Government Exam Preparation Platform

EduMind AI is an AI-powered platform designed to help users prepare for government exams with advanced tools for practice tests, essay evaluation, and personalized learning paths.

---

## 🎥 Project Demo

[![Watch the project walkthrough on Loom](https://cdn.loom.com/sessions/thumbnails/e604337fc4cf4cd2932a9fc64e80a56c-with-play.gif)](https://www.loom.com/share/e604337fc4cf4cd2932a9fc64e80a56c?sid=a4ce65c0-40a6-4ba3-b9f2-ef4266a568a6)

---

## Project Structure

The project is organized into the following directories:

```
EduMind AI/
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

1. **EduMind AI Platform** - An AI-powered exam preparation platform
2. **EduMind AI Documentation** - A documentation website for the platform

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

### 1. Running the Main EduMind AI Platform

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
- **Pattern Analysis**: Get instant help with study strategies and exam pattern analysis
- **Markdown Support**: Properly formatted responses with bold, lists, and code blocks for better readability

### Essay Evaluation
- Text-based essay evaluation with detailed feedback
- Image upload for handwritten essay evaluation
- Comprehensive analysis of writing skills (content, structure, language, formatting)
- Progress tracking with real-time indicators

### Practice & Learning
- AI-powered practice tests
- Personalized learning paths
- Mock exams with authentic questions
- Performance analytics and progress tracking

### User Experience
- Intuitive, easy-to-navigate interface
- Fast loading times and responsive interactions
- Optimized for performance, even on lower-end devices or slow networks

### Technical Features
- Comprehensive error handling with user-friendly error messages
- Response caching to improve performance and reduce API calls
- Real-time input validation to ensure data quality and prevent errors
- Efficient API integration with rate limiting and request batching
- Browser compatibility and progressive enhancement (core features work even with limited browser capabilities)

### Accessibility
- Full keyboard navigation for all interactive elements
- Screen reader support with ARIA attributes and semantic HTML
- High color contrast for readability and WCAG compliance
- Support for browser text scaling and zoom
- Inclusive design: multiple ways to interact, reduced cognitive load, and regular accessibility testing

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