// src/types.ts

// 1. Định nghĩa Interface cho Bài học
export interface Lesson {
  id: string;
  topic: string;
  title: string;
  theory: string;
  theoryImages?: string[]; // Mảng chứa link ảnh minh họa lý thuyết
  formulas: string;
  examples?: string[]; // Mảng chứa các ví dụ
}

// 2. Định nghĩa Interface cho Ý nhỏ trong câu Đúng/Sai (Tách riêng ra cho gọn)
export interface SubQuestion {
  id: string;      // sq1, sq2...
  content: string; // Nội dung ý
  isCorrect: boolean; // true/false
  explanation?: string; // Giải thích chi tiết cho ý này
}

// 3. Các loại câu hỏi và mức độ
export type QuestionType = 'MCQ' | 'TrueFalse' | 'Short';
export type Difficulty = 'Biết' | 'Hiểu' | 'Vận dụng';

// 4. Định nghĩa Interface cho Câu hỏi
export interface Question {
  id: string;
  topic: string;
  lessonId: string; // Mã bài học (l1.1, l1.2...)
  level: Difficulty | string; // Cho phép string để linh hoạt
  type: QuestionType;
  promptText: string;
  imageUrl?: string;
  
  // Dành cho trắc nghiệm 4 lựa chọn
  options?: string[]; 
  
  // Đáp án đúng (MCQ chọn A/B.., Short điền từ). TrueFalse thì để trống.
  answerKey: string;  
  
  // Giải thích chung cho câu hỏi
  explanationText: string;
  
  // Dành riêng cho câu True/False 4 ý
  subQuestions?: SubQuestion[]; 
}

// 5. Định nghĩa Interface cho Người dùng (Đã bổ sung examScore)
export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  class: string;
  school: string; 
  
  totalScore: number;      // Tổng điểm tích lũy
  practiceScore: number;   // Điểm luyện tập
  gameScore: number;       // Điểm trò chơi
  challengeScore: number;  // Điểm thử thách hàng ngày
  
  examScore: number;       // 👈 QUAN TRỌNG: Đã thêm trường này để tính điểm Thi Thử
  
  rank: number;
}