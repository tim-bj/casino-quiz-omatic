export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  explanation?: string;
  rarity: 'common' | 'rare' | 'legendary';
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  answeredQuestions: number[];
  selectedAnswer: number | null;
  showResult: boolean;
  timeLeft: number;
  isGameStarted: boolean;
  isGameFinished: boolean;
}

export interface QuizStats {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  percentage: number;
  timeSpent: number;
}