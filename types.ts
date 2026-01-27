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

// 2. Định nghĩa Interface cho Ý nhỏ trong câu Đúng/Sai
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
  level: Difficulty | string;
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

// 5. Định nghĩa Interface cho Người dùng (Đầy đủ các trường)
export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  class: string;
  school: string; 
  
  // --- HỆ THỐNG ĐIỂM SỐ ---
  totalScore: number;      // Tổng điểm tích lũy (Ranking chính)
  practiceScore: number;   // Điểm luyện tập
  gameScore: number;       // Điểm trò chơi
  challengeScore: number;  // Điểm thử thách
  examScore: number;       // Điểm thi thử
  mockScore?: number;      // Điểm tự tạo đề (Dấu ? nghĩa là có thể chưa có với user cũ)
    rank?: number;           // Thứ hạng hiện tại

  // --- HỆ THỐNG HUY HIỆU & THỐNG KÊ (MỚI) ---
  loginStreak?: number;        // Số ngày đăng nhập liên tiếp (Huy hiệu Chăm chỉ)
  fastAnswerCount?: number;    // Số câu trả lời nhanh < 5s (Huy hiệu Tia chớp)
  correctStreak?: number;      // Chuỗi trả lời đúng liên tiếp (Huy hiệu Xạ thủ)
  lastStudyHour?: number;      // Giờ học bài gần nhất 0-23h (Huy hiệu Cú đêm/Gà gáy)
  luckySpinCount?: number;     // Số lần quay trúng thưởng lớn (Huy hiệu Thần tài)
  completedChallenges?: number;// Số lượng thử thách đã hoàn thành (Huy hiệu Thợ săn)
  // 👇👇👇 THÊM 3 DÒNG NÀY VÀO CUỐI 👇👇👇
  treeLevel?: number;      // Cấp độ cây
  treeExp?: number;        // Kinh nghiệm cây
  inventory?: { water: number; fertilizer: number; }; // Kho đồ (Nước/Phân bón)
  topicStats?: { [topic: string]: { correct: number; total: number } };
}