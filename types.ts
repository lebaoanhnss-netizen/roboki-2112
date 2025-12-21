export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  class: string;
  totalScore: number;
  practiceScore: number;
  gameScore: number;
  challengeScore: number;
  rank: number;
}

export type QuestionType = 'MCQ' | 'TrueFalse' | 'Short';
export type Difficulty = 'Biết' | 'Hiểu' | 'Vận dụng';

export interface Question {
  id: string;
  topic: string;
  level: Difficulty;
  type: QuestionType;
  promptText: string;
  options?: string[]; // For MCQ
  answerKey: string;
  explanationText: string;
}

export interface Lesson {
  id: string;
  title: string;
  topic: string;
  theory: string;
  formulas: string;
  examples: string[];
}