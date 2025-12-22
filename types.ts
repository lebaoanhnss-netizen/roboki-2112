// src/types.ts

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  class: string;
  school: string; // 👈 MỚI: Thêm trường Trường học
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
  // Cho phép string để tránh lỗi nếu thầy lỡ gõ sai chính tả xíu
  level: Difficulty | string; 
  type: QuestionType;
  promptText: string;
  
  // Link ảnh minh họa (nếu có)
  imageUrl?: string; 
  
  // MÃ BÀI HỌC (Ví dụ: l1.1, l1.2...)
  lessonId?: string;

  // CẤU TRÚC CHO CÂU TRẮC NGHIỆM ĐÚNG/SAI (4 Ý)
  subQuestions?: {
    id: string;        // Ví dụ: sq1, sq2...
    content: string;   // Nội dung ý nhỏ
    isCorrect: boolean;// true = Đúng, false = Sai
    explanation?: string; // Giải thích riêng cho ý này
  }[];
  
  options?: string[]; // Dùng cho MCQ thường
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