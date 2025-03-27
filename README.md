# ExamPrepAI - Your AI-Powered Government Exam Preparation Assistant

A specialized AI chatbot designed to help students prepare for various government examinations in India, including UPSC, SSC, CGL, and more. The application provides intelligent assistance for exam preparation and essay evaluation using Ollama's LLM models.

## Features

- **AI Assistant**: Get instant help with exam preparation topics, study strategies, and pattern analysis
- **Essay Evaluation**: Upload handwritten essays or type them directly for AI-powered feedback
- **Multiple AI Models**: Support for different Ollama models (llama3.1, llama3.2)
- **Real-time Feedback**: Get immediate responses and progress indicators
- **Dark/Light Theme**: Comfortable UI with theme switching support
- **Responsive Design**: Works well on both desktop and mobile devices

## Tech Stack

- **Frontend**: 
  - React.js with TypeScript
  - Material-UI (MUI) for components
  - Vite for build tooling
  - React Markdown for content rendering
- **Backend**: 
  - Node.js with Express
  - Ollama for AI/ML capabilities
  - Axios for HTTP requests

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v16 or higher)
   - Download from [nodejs.org](https://nodejs.org/)

2. **Ollama**
   - Download from [ollama.ai](https://ollama.ai/)
   - Required models: llama3.1 and llama3.2
   - Install models using: `ollama pull llama3.1` and `ollama pull llama3.2`

3. **Git** (for version control)

## Project Structure

```
examprep-ai/
├── frontend/           # React frontend application
│   ├── src/           # Source code
│   ├── public/        # Static assets
│   └── package.json   # Frontend dependencies
├── backend/           # Node.js backend application
│   ├── server.js      # Main server file
│   └── package.json   # Backend dependencies
└── README.md          # Project documentation
```

## Installation and Setup

1. **Clone the Repository**
   ```bash
   git clone <your-repository-url>
   cd examprep-ai
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   npm install
   ```
   Start the backend server:
   ```bash
   PORT=3001 node server.js
   ```
   The backend will run on http://localhost:3001

3. **Set up the Frontend**
   ```bash
   cd frontend
   npm install
   ```
   Start the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend will run on http://localhost:5173 (or the next available port)

4. **Verify Ollama Installation**
   - Ensure Ollama is running on your system
   - Verify models are installed:
     ```bash
     ollama list
     ```
   - You should see llama3.1 and llama3.2 in the list

## Usage

1. **AI Assistant**
   - Navigate to the AI Assistant section
   - Select your preferred model (llama3.1 or llama3.2)
   - Type your question and press Enter
   - The AI will provide detailed responses with proper formatting

2. **Essay Evaluation**
   - Go to the Essay Evaluation section
   - Choose between typing your essay or uploading an image
   - Select the AI model for evaluation
   - Submit for feedback
   - Wait for the AI to analyze and provide detailed feedback

## Troubleshooting

1. **Backend Connection Issues**
   - Ensure Ollama is running
   - Check if port 3001 is available
   - Verify model installation

2. **Frontend Issues**
   - Clear browser cache
   - Check console for errors
   - Ensure backend is running

3. **Model Response Issues**
   - Try switching between models
   - Check Ollama logs for errors
   - Ensure sufficient system resources

## Development

- **Frontend Development**
  - Located in `frontend/src`
  - Uses TypeScript for type safety
  - Components are organized by feature

- **Backend Development**
  - Located in `backend`
  - Express server with Ollama integration
  - Modular route handling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Ollama for providing the AI models
- Material-UI for the component library
- All contributors who have helped improve this project 