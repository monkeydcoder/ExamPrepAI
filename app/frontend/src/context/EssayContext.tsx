import React, { createContext, useState, useContext, useEffect } from 'react';

// Define types
interface AnswerData {
  text: string;
}

interface QuestionContextType {
  questionText: string;
  setQuestionText: React.Dispatch<React.SetStateAction<string>>;
  imageData: string | null;
  setImageData: React.Dispatch<React.SetStateAction<string | null>>;
  answer: AnswerData | null;
  setAnswer: React.Dispatch<React.SetStateAction<AnswerData | null>>;
  isAnswered: boolean;
  setIsAnswered: React.Dispatch<React.SetStateAction<boolean>>;
  resetQuestion: () => void;
}

// Create context with default values
const QuestionContext = createContext<QuestionContextType | undefined>(undefined);

// Custom hook to use the question context
export const useQuestion = () => {
  const context = useContext(QuestionContext);
  if (context === undefined) {
    throw new Error('useQuestion must be used within a QuestionProvider');
  }
  return context;
};

// Provider component
export const QuestionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from sessionStorage on initial render
  const [questionText, setQuestionText] = useState<string>(() => {
    const savedText = sessionStorage.getItem('question_text');
    return savedText || '';
  });
  
  const [imageData, setImageData] = useState<string | null>(() => {
    const savedImage = sessionStorage.getItem('question_image');
    return savedImage || null;
  });
  
  const [answer, setAnswer] = useState<AnswerData | null>(() => {
    const savedAnswer = sessionStorage.getItem('question_answer');
    return savedAnswer ? JSON.parse(savedAnswer) : null;
  });
  
  const [isAnswered, setIsAnswered] = useState<boolean>(() => {
    const savedAnswered = sessionStorage.getItem('question_answered');
    return savedAnswered ? JSON.parse(savedAnswered) : false;
  });
  
  // Save state to sessionStorage when it changes
  useEffect(() => {
    if (questionText) {
      sessionStorage.setItem('question_text', questionText);
    } else {
      sessionStorage.removeItem('question_text');
    }
  }, [questionText]);
  
  useEffect(() => {
    if (imageData) {
      sessionStorage.setItem('question_image', imageData);
    } else {
      sessionStorage.removeItem('question_image');
    }
  }, [imageData]);
  
  useEffect(() => {
    if (answer) {
      sessionStorage.setItem('question_answer', JSON.stringify(answer));
    } else {
      sessionStorage.removeItem('question_answer');
    }
  }, [answer]);
  
  useEffect(() => {
    sessionStorage.setItem('question_answered', JSON.stringify(isAnswered));
  }, [isAnswered]);
  
  // Function to reset question state
  const resetQuestion = () => {
    setQuestionText('');
    setImageData(null);
    setAnswer(null);
    setIsAnswered(false);
    
    // Clear sessionStorage items
    sessionStorage.removeItem('question_text');
    sessionStorage.removeItem('question_image');
    sessionStorage.removeItem('question_answer');
    sessionStorage.removeItem('question_answered');
  };
  
  return (
    <QuestionContext.Provider
      value={{
        questionText,
        setQuestionText,
        imageData,
        setImageData,
        answer,
        setAnswer,
        isAnswered,
        setIsAnswered,
        resetQuestion
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionProvider; 