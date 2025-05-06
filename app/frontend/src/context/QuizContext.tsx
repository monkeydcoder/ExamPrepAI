import React, { createContext, useState, useContext, useEffect } from 'react';

// Define types
interface QuizQuestion {
  id: number;
  question: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  explanation: string;
}

interface QuizContextType {
  questions: QuizQuestion[];
  setQuestions: React.Dispatch<React.SetStateAction<QuizQuestion[]>>;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedAnswers: { [key: number]: string };
  setSelectedAnswers: React.Dispatch<React.SetStateAction<{ [key: number]: string }>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  quizCompleted: boolean;
  setQuizCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  note: string | null;
  setNote: React.Dispatch<React.SetStateAction<string | null>>;
  resetQuiz: () => void;
}

// Create context with default values
const QuizContext = createContext<QuizContextType | undefined>(undefined);

// Custom hook to use the quiz context
export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

// Provider component
export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from sessionStorage on initial render
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => {
    const savedQuestions = sessionStorage.getItem('quiz_questions');
    return savedQuestions ? JSON.parse(savedQuestions) : [];
  });
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(() => {
    const savedIndex = sessionStorage.getItem('quiz_current_index');
    return savedIndex ? parseInt(savedIndex) : 0;
  });
  
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>(() => {
    const savedAnswers = sessionStorage.getItem('quiz_selected_answers');
    return savedAnswers ? JSON.parse(savedAnswers) : {};
  });
  
  const [score, setScore] = useState<number>(() => {
    const savedScore = sessionStorage.getItem('quiz_score');
    return savedScore ? parseInt(savedScore) : 0;
  });
  
  const [quizCompleted, setQuizCompleted] = useState<boolean>(() => {
    const savedCompleted = sessionStorage.getItem('quiz_completed');
    return savedCompleted ? JSON.parse(savedCompleted) : false;
  });
  
  const [note, setNote] = useState<string | null>(() => {
    const savedNote = sessionStorage.getItem('quiz_note');
    return savedNote ? savedNote : null;
  });
  
  // Save state to sessionStorage when it changes
  useEffect(() => {
    if (questions.length > 0) {
      sessionStorage.setItem('quiz_questions', JSON.stringify(questions));
    }
  }, [questions]);
  
  useEffect(() => {
    sessionStorage.setItem('quiz_current_index', currentQuestionIndex.toString());
  }, [currentQuestionIndex]);
  
  useEffect(() => {
    sessionStorage.setItem('quiz_selected_answers', JSON.stringify(selectedAnswers));
  }, [selectedAnswers]);
  
  useEffect(() => {
    sessionStorage.setItem('quiz_score', score.toString());
  }, [score]);
  
  useEffect(() => {
    sessionStorage.setItem('quiz_completed', JSON.stringify(quizCompleted));
  }, [quizCompleted]);
  
  useEffect(() => {
    if (note) {
      sessionStorage.setItem('quiz_note', note);
    } else {
      sessionStorage.removeItem('quiz_note');
    }
  }, [note]);
  
  // Function to reset quiz state
  const resetQuiz = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setScore(0);
    setQuizCompleted(false);
    setNote(null);
    
    // Clear sessionStorage items
    sessionStorage.removeItem('quiz_questions');
    sessionStorage.removeItem('quiz_current_index');
    sessionStorage.removeItem('quiz_selected_answers');
    sessionStorage.removeItem('quiz_score');
    sessionStorage.removeItem('quiz_completed');
    sessionStorage.removeItem('quiz_note');
  };
  
  return (
    <QuizContext.Provider
      value={{
        questions,
        setQuestions,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        selectedAnswers,
        setSelectedAnswers,
        score,
        setScore,
        quizCompleted,
        setQuizCompleted,
        note,
        setNote,
        resetQuiz
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider; 