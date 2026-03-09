// src/App.tsx
import React, { useState, useEffect, useRef } from 'react';
import MathRender from './components/MathRender';
import Toast from './components/Toast';
import { UserProfile, Question, Lesson } from './types';
// 👇 Import dữ liệu từ file data.ts (Đảm bảo file này tồn tại)
import { PHYSICS_LESSONS, QUESTION_BANK } from './data';
// --- CẤU HÌNH ÂM THANH (Dùng file local) ---
const playSound = (type: 'click' | 'correct' | 'wrong' | 'levelup') => {
  const sounds = {
    // Tiếng click nhẹ (khi bấm nút) - lấy từ file public/sounds/click.mp3
    click: '/sounds/click.mp3', 
    // Tiếng ting ting (khi làm đúng) - lấy từ file public/sounds/correct.mp3
    correct: '/sounds/correct.mp3',
    // Tiếng ố ồ (khi làm sai) - lấy từ file public/sounds/wrong.mp3
    wrong: '/sounds/wrong.mp3',
    // Tiếng chiến thắng (khi lên cấp) - lấy từ file public/sounds/victory.mp3
    levelup: '/sounds/victory.mp3' 
  };

  const audio = new Audio(sounds[type]);
  audio.volume = 0.5; // Chỉnh âm lượng (0.0 đến 1.0)
  
  // Phát nhạc và bắt lỗi (phòng trường hợp trình duyệt chặn tự phát)
  audio.play().catch(e => console.log("Chưa tương tác, chưa phát nhạc được: ", e));
};
import {
  auth,
  db,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  doc,
  setDoc,
  updateDoc,
  increment,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  writeBatch,
  getDoc,
  getCountFromServer,
} from './firebase';

import {
  BookOpen, MessageCircle, User, Copy,
  CheckCircle, Target,
  Trophy, Bell, Search, ChevronRight, ChevronLeft,
  Video, Share2, Thermometer, Wind, Atom,
  BarChart3, Magnet, Crown, Flame, XCircle, Play, Settings2, Filter,
  List, Type, CheckSquare, Gamepad2, Zap, Timer, RotateCcw, Ghost,
  Dna, Calendar, Star, Award, Menu, LogOut, ArrowRight, Lock, Mail,
  Disc, HelpCircle, Gift, SwatchBook, Frown, Sparkles, Bot, StopCircle,
  ThumbsUp, Percent, Activity, Send, Home, Globe, KeyRound, X, Loader2,
  FileText, ClipboardList, School, Edit3, Save, MapPin, ShieldAlert,
  Lightbulb, GraduationCap, Clock, Phone, Info, StopCircle as StopIcon,
  Coins, PhoneCall, HelpCircle as HelpIcon, ArrowBigRight, Trash2, SkipForward, Medal, Sprout
} from 'lucide-react';

// --- UTILS ---

const generateRobokiPrompt = (
  topic: string,
  title: string,
  level: string,
  content: string,
  options?: string[],
  type: 'LESSON' | 'QUESTION' = 'QUESTION'
) => {
  let mainContent = content;
  if (options && options.length > 0) {
    const labels = ['A', 'B', 'C', 'D'];
    const formattedOptions = options.map((opt, i) => `${labels[i]}. ${opt}`).join('\n');
    mainContent += `\n\nCÁC LỰA CHỌN:\n${formattedOptions}`;
  }

  return `[ÔN TẬP VẬT LÍ 12 – ROBOKI]\nChủ đề: ${topic}\nBài/Câu: ${title}\nMức độ: ${level}\nĐỀ BÀI:\n${mainContent}\n\nYÊU CẦU ROBOKI:\n1) Giải thích ngắn gọn, đúng bản chất vật lí.\n2) Trình bày công thức liên quan và ý nghĩa các đại lượng.`;
};

// --- TYPES FOR STATE MANAGEMENT ---

interface PracticeSessionData {
  configMode: boolean;
  selectedTopic: string;
  selectedLessonId: string;
  selectedLevel: string;
  selectedType: string;
  errorMsg: string;
  quizQuestions: Question[];
  currentQIndex: number;
  selectedOpt: string | null;
  subAnswers?: { [key: string]: boolean };
  isSubmitted: boolean;
  showExplanation: boolean;
}

const INITIAL_PRACTICE_STATE: PracticeSessionData = {
  configMode: true,
  selectedTopic: 'TẤT CẢ',
  selectedLessonId: 'ALL',
  selectedLevel: 'Ngẫu nhiên',
  selectedType: 'ALL',
  errorMsg: '',
  quizQuestions: [],
  currentQIndex: 0,
  selectedOpt: null,
  subAnswers: {},
  isSubmitted: false,
  showExplanation: false,
};

interface MockTestSessionData {
  mode: 'CONFIG' | 'DOING' | 'RESULT';
  selectedTopics: string[]; 
  countMCQ: number;
  countTF: number;
  countShort: number;
  quizQuestions: Question[];
  currentQIndex: number;
  userAnswers: { [qId: string]: any };
  score: number;
  startTime: number;
  errorMsg: string;
}

const INITIAL_MOCK_TEST_STATE: MockTestSessionData = {
  mode: 'CONFIG',
  selectedTopics: ['TẤT CẢ'], 
  countMCQ: 10,
  countTF: 4,
  countShort: 2,
  quizQuestions: [],
  currentQIndex: 0,
  userAnswers: {},
  score: 0,
  startTime: 0,
  errorMsg: ''
};

interface ExamSessionData {
  mode: 'MENU' | 'DOING' | 'RESULT';
  examType: 'GK1' | 'CK1' | 'GK2' | 'CK2' | 'THPT' | null;
  title: string;
  timeLeft: number; // giây
  quizQuestions: Question[];
  currentQIndex: number;
  userAnswers: { [qId: string]: any };
  score: number;
  details: { mcq: number, tf: number, short: number };
}

const INITIAL_EXAM_STATE: ExamSessionData = {
  mode: 'MENU',
  examType: null,
  title: '',
  timeLeft: 0,
  quizQuestions: [],
  currentQIndex: 0,
  userAnswers: {},
  score: 0,
  details: { mcq: 0, tf: 0, short: 0 }
};

interface GameSessionData {
  gameType: 'NONE' | 'SPEED' | 'WHEEL' | 'MILLIONAIRE'; 
  mode: 'MENU' | 'PLAYING' | 'RESULT';
  score: number;
  timeLeft: number;
  currentQ: Question | null;
  isCorrect: boolean | null;
  selectedSpeedOpt: string | null;
  correctCount: number;
  totalAnswered: number;
  
  // Wheel State
  wheelRotation: number;
  isSpinning: boolean;
  pendingPoints: number;
  showWheelQuestion: boolean;
  spinsLeft: number;

  // Millionaire State
  millionaireQuestions: Question[];
  currentMilLevel: number; // 0 -> 14
  milHiddenOptions: string[]; // Dùng cho 50:50
  lifelines: { fifty: boolean; hint: boolean; skip: boolean };
}

const INITIAL_GAME_STATE: GameSessionData = {
  gameType: 'NONE',
  mode: 'MENU',
  score: 0,
  timeLeft: 60,
  currentQ: null,
  isCorrect: null,
  selectedSpeedOpt: null,
  correctCount: 0,
  totalAnswered: 0,
  
  wheelRotation: 0,
  isSpinning: false,
  pendingPoints: 0,
  showWheelQuestion: false,
  spinsLeft: 5,

  millionaireQuestions: [],
  currentMilLevel: 0,
  milHiddenOptions: [],
  lifelines: { fifty: true, hint: true, skip: true }
};

interface ChallengeSessionData {
  todayQ: Question | null;
  selectedOpt: string | null;
  isSubmitted: boolean;
  isCorrect: boolean;
  history: { date: string; status: 'Đúng' | 'Sai' | 'Chưa làm'; score: number }[];
}

const INITIAL_CHALLENGE_STATE: ChallengeSessionData = {
  todayQ: null,
  selectedOpt: null,
  isSubmitted: false,
  isCorrect: false,
  history: []
};

// --- CONSTANTS ---
const MILLIONAIRE_LADDER = [
    1, 2, 3, 4, 5,   
    6, 7, 8, 9, 10,  
    11, 12, 13, 14, 15 
];

// --- SUB COMPONENTS ---

const LessonCard: React.FC<{
  lesson: Lesson;
  onCopy: (txt: string) => void;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ lesson, onCopy, isExpanded, onToggle }) => {
  return (
    <div className={`bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${isExpanded ? 'shadow-lg border-roboki-200' : 'shadow-sm border-slate-100 hover:border-roboki-100'}`}>
      <div className="p-4 flex gap-4 cursor-pointer hover:bg-slate-50 active:bg-slate-100 items-center" onClick={onToggle}>
        <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center transition-all ${isExpanded ? 'bg-gradient-to-br from-roboki-500 to-orange-600 text-white shadow-md shadow-roboki-100' : 'bg-slate-50 text-slate-400'}`}>
          <BookOpen size={20} />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <h4 className={`text-base font-bold leading-tight transition-colors ${isExpanded ? 'text-roboki-700' : 'text-slate-800'}`}>{lesson.title}</h4>
          <span className="text-[11px] text-slate-400 mt-1 flex items-center gap-1 font-medium">
            {isExpanded ? 'Nhấn để thu gọn' : 'Nhấn để xem bài học'}
            <ChevronRight size={12} className={`transition-transform ${isExpanded ? 'rotate-90 text-roboki-500' : ''}`} />
          </span>
        </div>
      </div>
      {isExpanded && (
        <div className="px-4 pb-4 animate-fade-in">
          <div className="pt-2 border-t border-slate-50 space-y-3">
             <div className="bg-roboki-50/50 p-4 rounded-xl border border-roboki-100">
                <h5 className="text-xs font-bold text-roboki-600 uppercase mb-2 flex items-center gap-1.5"><Sparkles size={14}/> Lý thuyết</h5>
                <MathRender content={lesson.theory} className="text-sm text-slate-700 leading-relaxed whitespace-pre-line text-justify"/>
                {lesson.theoryImages && lesson.theoryImages.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {lesson.theoryImages.map((imgUrl, index) => (
                      <img key={index} src={imgUrl} alt={`Minh họa ${index + 1}`} className="rounded-xl border border-roboki-100 w-full object-contain max-h-80 bg-white shadow-sm" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}/>
                    ))}
                  </div>
                )}
             </div>
             <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h5 className="text-xs font-bold text-slate-600 uppercase mb-2 flex items-center gap-1.5"><Zap size={14}/> Công thức</h5>
                <MathRender content={lesson.formulas} className="text-sm text-slate-800 font-medium font-mono whitespace-pre-line text-justify"/>
             </div>
             {lesson.examples && lesson.examples.length > 0 && (
                <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                    <h5 className="text-xs font-bold text-yellow-700 uppercase mb-2 flex items-center gap-1.5"><Lightbulb size={14}/> Ví dụ minh họa</h5>
                    <ul className="list-disc list-outside ml-4 space-y-2">
                        {lesson.examples.map((ex, idx) => (
                            <li key={idx} className="text-sm text-slate-700 leading-relaxed">
                                <MathRender content={ex} />
                            </li>
                        ))}
                    </ul>
                </div>
             )}
             <div className="flex justify-end pt-2">
                <button onClick={(e) => { e.stopPropagation(); const txt = generateRobokiPrompt(lesson.topic, lesson.title, "Lý thuyết", `${lesson.theory}\n\nCông thức chính: ${lesson.formulas}`, undefined, 'LESSON'); onCopy(txt); }} className="text-xs bg-white text-roboki-600 px-4 py-2.5 rounded-full font-bold shadow-sm border border-roboki-100 flex items-center gap-2 hover:bg-roboki-50 transition-colors">
                  <MessageCircle size={16} /> Hỏi Roboki bài này
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
//// --- SUB COMPONENT: BIỂU ĐỒ NĂNG LỰC (Đã nâng cấp nút Deep Link) ---
const CompetencyChart: React.FC<{ 
  stats?: { [key: string]: { correct: number; total: number } };
  onStudyTopic?: (topicLabel: string) => void; // 👇 Thêm prop này để xử lý click
}> = ({ stats, onStudyTopic }) => {
  if (!stats || Object.keys(stats).length === 0) {
    return (
      <div className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-100 border-dashed mt-4">
        <div className="text-4xl mb-2 opacity-50">📊</div>
        <p className="text-slate-500 text-xs font-bold">Chưa có dữ liệu phân tích.</p>
      </div>
    );
  }

  const data = Object.entries(stats).map(([topic, s]) => {
    const percent = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
    return { topic, percent, ...s };
  }).sort((a, b) => a.percent - b.percent); 

  return (
    <div className="space-y-4 mt-4">
      {data.map((item) => {
        let color = 'bg-emerald-500';
        let label = 'Tốt';
        let textColor = 'text-emerald-600';
        
        if (item.percent < 50) { 
            color = 'bg-rose-500'; 
            label = 'Yếu'; 
            textColor = 'text-rose-600';
        } else if (item.percent < 80) { 
            color = 'bg-amber-500'; 
            label = 'Khá'; 
            textColor = 'text-amber-600';
        }

        return (
          <div key={item.topic} className="bg-white border border-slate-100 p-3 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-black text-slate-700 uppercase truncate max-w-[180px]">{item.topic}</span>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded text-white ${color}`}>{label}</span>
            </div>
            
            <div className="flex items-center gap-3">
               <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden relative">
                  <div className={`h-full rounded-full transition-all duration-1000 ${color}`} style={{ width: `${item.percent}%` }}></div>
               </div>
               <span className="text-xs font-bold text-slate-600 w-8 text-right">{item.percent}%</span>
            </div>
            
            <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-50">
               <span className="text-[10px] text-slate-400 font-medium">Đúng {item.correct}/{item.total} câu</span>
               
               {/* 👇 LOGIC NÚT BẤM THÔNG MINH 👇 */}
               {item.percent < 50 && onStudyTopic ? (
                   <button 
                     onClick={() => onStudyTopic(item.topic)}
                     className="text-[10px] font-bold bg-rose-50 text-rose-600 px-3 py-1.5 rounded-full hover:bg-rose-100 transition-colors flex items-center gap-1 border border-rose-100 shadow-sm animate-pulse"
                   >
                     Học ngay <ArrowRight size={10}/>
                   </button>
               ) : (
                   <span className={`text-[10px] font-bold ${textColor}`}>
                     {item.percent < 80 ? 'Cần luyện thêm' : 'Giữ phong độ!'}
                   </span>
               )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
// --- LOGIC PHÂN TÍCH AI (AI ANALYZER) - ĐÃ CẬP NHẬT LỜI THOẠI & ĐIỀU KIỆN ---
const analyzeUserPerformance = (user: UserProfile) => {
  const stats = user.topicStats || {};
  const entries = Object.entries(stats);

  // 1. Nếu chưa học gì
  if (entries.length === 0) {
    return {
      mood: 'NEUTRAL',
      title: 'Chào bạn mới!',
      message: `Chào ${user.name}, Roboki chưa có dữ liệu về sức học của bạn. Hãy thử làm một bài Luyện tập để mình đánh giá nhé!`,
      actionLabel: 'Làm bài ngay',
      actionTarget: 'PRACTICE'
    };
  }

  // 2. Tính toán chỉ số
  let weakestTopic = { name: '', percent: 100 };
  let strongestTopic = { name: '', percent: 0 };
  let totalQ = 0;

  entries.forEach(([topic, s]) => {
    const p = s.total > 0 ? (s.correct / s.total) * 100 : 0;
    totalQ += s.total;
    
    // 🔥 Sửa điều kiện: Chỉ cần làm >= 1 câu là xét (để bạn dễ test)
    if (p < weakestTopic.percent && s.total >= 1) { 
        weakestTopic = { name: topic, percent: p };
    }
    if (p > strongestTopic.percent && s.total >= 1) {
        strongestTopic = { name: topic, percent: p };
    }
  });

  // 3. Ra quyết định (Decision Tree)
  
  // A. Trường hợp Yếu (< 50%) -> 👇 ĐÚNG MẪU CÂU BẠN YÊU CẦU
  if (weakestTopic.percent < 50 && weakestTopic.name) {
    return {
      mood: 'WORRIED',
      title: 'Lưu ý!',
      message: `Chào ${user.name}, Roboki thấy bạn đang yếu phần "${weakestTopic.name}" (chỉ đúng ${Math.round(weakestTopic.percent)}%), hãy ôn tập ngay nhé!`,
      actionLabel: `Ôn lại ${weakestTopic.name}`,
      actionTarget: 'LESSON',
      targetId: weakestTopic.name 
    };
  }

  // B. Trường hợp Giỏi (> 80%)
  if (strongestTopic.percent >= 80) {
    return {
      mood: 'HAPPY',
      title: 'Phong độ tuyệt vời!',
      message: `Chào ${user.name}, bạn làm rất tốt phần "${strongestTopic.name}". Hãy thử sức với các đề thi khó hơn để chinh phục điểm 10 nhé!`,
      actionLabel: 'Thi thử ngay',
      actionTarget: 'EXAM'
    };
  }

  // C. Mặc định
  return {
    mood: 'NEUTRAL',
    title: 'Tiếp tục cố gắng',
    message: `Chào ${user.name}, mỗi ngày 15 phút luyện tập sẽ giúp bạn tiến bộ vượt bậc. Hôm nay chúng ta cùng ôn luyện tiếp nhé?`,
    actionLabel: 'Vào luyện tập',
    actionTarget: 'PRACTICE'
  };
};

// --- UI CỐ VẤN ROBOKI (Nút Chat chuẩn màu Roboki) ---
const RobokiAdvisor: React.FC<{ 
  user: UserProfile; 
  onAction: (target: string, param?: string) => void;
  onChat: () => void;
}> = ({ user, onAction, onChat }) => {
  const analysis = analyzeUserPerformance(user);
  
  // Logic màu sắc cho phần thông báo (Bên trái)
  let theme = {
    bg: 'bg-white',
    border: 'border-slate-100',
    title: 'text-roboki-600',
    btnAction: 'bg-roboki-500 shadow-roboki-200 text-white', 
  };

  // Nếu có cảnh báo (Yếu)
  if (analysis.mood === 'WORRIED') { 
    theme = {
      bg: 'bg-rose-50',
      border: 'border-rose-100',
      title: 'text-rose-600',
      btnAction: 'bg-rose-500 shadow-rose-200 text-white',
    };
  } else if (analysis.mood === 'HAPPY' || analysis.mood === 'PROUD') {
    theme = {
      bg: 'bg-amber-50',
      border: 'border-amber-100',
      title: 'text-amber-600',
      btnAction: 'bg-amber-500 shadow-amber-200 text-white',
    };
  }

  return (
    <div className={`rounded-3xl p-5 shadow-lg shadow-slate-200/60 border relative overflow-hidden ${theme.bg} ${theme.border}`}>
      {/* Background Decor */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-30 blur-2xl ${analysis.mood === 'WORRIED' ? 'bg-rose-300' : 'bg-roboki-300'}`}></div>
      
      <div className="relative z-10 flex flex-col gap-4">
        {/* Phần 1: Logo và Lời nhắn */}
        <div className="flex gap-4 items-start">
            <div className="w-16 h-16 rounded-2xl bg-white p-1 shadow-sm border border-slate-100 shrink-0 flex items-center justify-center">
               <img src="/logo1.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            
            <div className="flex-1">
                <h4 className={`font-black text-sm uppercase mb-1 flex items-center gap-2 ${theme.title}`}>
                     {analysis.mood === 'WORRIED' ? <ShieldAlert size={16}/> : <Bot size={16}/>}
                     {analysis.mood === 'WORRIED' ? 'LƯU Ý!' : 'GÓC HỌC TẬP'}
                </h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed line-clamp-3">
                    {analysis.message.replace(`Chào ${user.name}, `, '').replace(`Chào ${user.name}`, '')}
                </p>
            </div>
        </div>

        {/* Phần 2: Hai nút hành động */}
        <div className="grid grid-cols-2 gap-3 pt-2">
            {/* Nút 1: Hành động (Ôn tập/Thi thử) */}
            <button 
                onClick={() => onAction(analysis.actionTarget, analysis.targetId)}
                className={`col-span-1 py-3 px-2 rounded-xl text-xs font-bold shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5 ${theme.btnAction}`}
            >
                {analysis.actionLabel} <ArrowRight size={14}/>
            </button>

            {/* Nút 2: Hỏi Roboki - ĐÚNG MÀU VÀNG ROBOKI (bg-roboki-500) */}
            <button 
                onClick={onChat}
                className="col-span-1 py-3 px-2 rounded-xl bg-roboki-500 text-white text-xs font-bold shadow-md shadow-roboki-200 active:scale-95 transition-all flex items-center justify-center gap-1.5 border border-roboki-400 hover:bg-roboki-600"
            >
                Hỏi Roboki ngay <MessageCircle size={14} className="text-white"/>
            </button>
        </div>
      </div>
    </div>
  );
};
// --- AUTH SCREEN ---
const AuthScreen: React.FC<{ onLoginSuccess: (user: UserProfile) => void }> = ({ onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [className, setClassName] = useState('12A1');
  const [school, setSchool] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError('');
    if (!auth) { setError("Firebase chưa được cấu hình."); setLoading(false); return; }
    try {
      if (isRegistering) {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: name });
        const newUser: UserProfile = { 
            uid: cred.user.uid, name, email, 
            class: className, school: school || 'THPT Tự do', 
            totalScore: 0, practiceScore: 0, gameScore: 0, challengeScore: 0, examScore: 0, rank: 999 
        };
        await setDoc(doc(db, 'users', cred.user.uid), newUser);
        onLoginSuccess(newUser);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        // onAuthStateChanged in App.tsx will handle the rest
      }
    } catch (err: any) { setError(err.message); } finally { setLoading(false); }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-roboki-200 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50"></div>
      <div className="w-full max-w-sm relative z-10">
        <div className="text-center mb-8">
  {/* 👇 Đã thay bằng ảnh logo-roboki.png */}
  <img 
    src="/logo-roboki.png" 
    alt="Roboki AI" 
    className="w-24 h-24 mx-auto mb-4 object-contain drop-shadow-md hover:scale-105 transition-transform" 
  />
  <h1 className="text-3xl font-black text-slate-800">Roboki AI</h1>
  <p className="text-slate-500 font-medium mt-1">Chinh phục vũ trụ Vật lí 12</p>
</div>
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
           <div className="flex justify-center mb-6">
                {/* <img src="/logo-robok.png" alt="Logo" className="h-32 w-auto object-contain" /> */}
           </div>
           <div className="flex bg-slate-100 p-1 rounded-2xl mb-6">
             <button onClick={() => { setIsRegistering(false); setError(''); }} className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${!isRegistering ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400'}`}>Đăng nhập</button>
             <button onClick={() => { setIsRegistering(true); setError(''); }} className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${isRegistering ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400'}`}>Đăng ký</button>
           </div>
           <form onSubmit={handleAuth} className="space-y-3">
              {isRegistering && (<>
                  <div className="relative"><User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/><input required value={name} onChange={e=>setName(e.target.value)} placeholder="Họ tên" className="w-full pl-11 py-3.5 bg-slate-50 border rounded-2xl text-sm font-bold outline-none focus:border-roboki-500"/></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative"><BookOpen size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/><input required value={className} onChange={e=>setClassName(e.target.value)} placeholder="Lớp (12A1)" className="w-full pl-11 py-3.5 bg-slate-50 border rounded-2xl text-sm font-bold outline-none focus:border-roboki-500"/></div>
                    <div className="relative"><School size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/><input required value={school} onChange={e=>setSchool(e.target.value)} placeholder="Trường" className="w-full pl-11 py-3.5 bg-slate-50 border rounded-2xl text-sm font-bold outline-none focus:border-roboki-500"/></div>
                  </div>
              </>)}
              <div className="relative"><Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/><input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full pl-11 py-3.5 bg-slate-50 border rounded-2xl text-sm font-bold outline-none focus:border-roboki-500"/></div>
              <div className="relative"><Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/><input type="password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Mật khẩu" className="w-full pl-11 py-3.5 bg-slate-50 border rounded-2xl text-sm font-bold outline-none focus:border-roboki-500"/></div>
              {error && <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-2 text-rose-600 text-xs font-bold">{error}</div>}
              <button type="submit" disabled={loading} className="w-full bg-roboki-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-roboki-200 hover:bg-roboki-700 active:scale-95 transition-all mt-2">{loading ? 'Đang xử lý...' : (isRegistering ? 'Đăng ký' : 'Đăng nhập')}</button>
           </form>
        </div>
        <p className="text-center text-xs text-slate-400 mt-6 font-bold">Dữ liệu được lưu trữ an toàn trên Firebase.</p>
      </div>
    </div>
  );
};

// --- AUTHOR INFO SCREEN ---
const AuthorScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    return (
      <div className="pb-24 pt-4 px-5 h-full flex flex-col bg-slate-50">
         <div className="flex items-center gap-3 mb-6">
            <button onClick={onBack} className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border border-slate-100"><ChevronLeft size={20} className="text-slate-600"/></button>
            <h2 className="text-xl font-black text-slate-800">Thông tin tác giả</h2>
         </div>
         <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col items-center gap-6 animate-fade-in">
            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200 mb-2">
               <User size={64} className="text-white" />
            </div>
            <div className="text-center space-y-1">
               <h3 className="text-2xl font-black text-slate-800">Lê Bảo Anh</h3>
               <div className="inline-block bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Tác giả</div>
            </div>
            <div className="w-full space-y-4">
               <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-indigo-500 shrink-0"><School size={20}/></div>
                  <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Đơn vị công tác</div>
                      <div className="text-sm font-bold text-slate-800">Trường THPT Nguyễn Sinh Sắc</div>
                      <div className="text-xs text-slate-500 mt-0.5">Phường Tân Châu, Tỉnh An Giang</div>
                  </div>
               </div>
               <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-purple-500 shrink-0"><Award size={20}/></div>
                  <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Chức vụ</div>
                      <div className="text-sm font-bold text-slate-800">Tổ trưởng Tổ Vật lí - CNCN</div>
                  </div>
               </div>
               <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-emerald-500 shrink-0"><Phone size={20}/></div>
                  <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Điện thoại</div>
                      <div className="text-sm font-bold text-slate-800">0916700177</div>
                  </div>
               </div>
               <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-rose-500 shrink-0"><Mail size={20}/></div>
                  <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Email liên hệ</div>
                      <div className="text-sm font-bold text-slate-800 break-all">lebaoanhnss@gmail.com</div>
                  </div>
               </div>
            </div>
            <button onClick={onBack} className="w-full mt-2 bg-slate-800 text-white py-4 rounded-2xl font-bold shadow-xl">Về trang chủ</button>
            <div className="text-center text-[10px] text-slate-400 font-medium pt-2 w-full">
               © 2025 Roboki Physics. All rights reserved.
            </div>
         </div>
      </div>
    );
}

// --- PROFILE SCREEN (Đã nâng cấp nút "Học ngay") ---
const ProfileScreen: React.FC<{ 
    user: UserProfile; 
    onBack: () => void; 
    onUpdate: (updatedUser: UserProfile) => void;
    onNavToAuthor: () => void;
    onStudyTopic: (topic: string) => void; // 👈 Đã thêm prop này
}> = ({ user, onBack, onUpdate, onNavToAuthor, onStudyTopic }) => { // 👈 Đã nhận prop này
    const [isEditing, setIsEditing] = useState(false);
    const [localData, setLocalData] = useState(user);
    const [loading, setLoading] = useState(false);

    useEffect(() => { setLocalData(user); }, [user]);

    const handleSave = async () => {
        setLoading(true);
        try {
            await updateDoc(doc(db, 'users', user.uid), {
                name: localData.name,
                class: localData.class,
                school: localData.school || ''
            });
            onUpdate(localData);
            setIsEditing(false);
        } catch (error) {
            alert("Lỗi cập nhật. Thử lại sau.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pb-24 pt-4 px-5 h-full flex flex-col bg-slate-50">
            <div className="flex items-center gap-3 mb-6">
                <button onClick={onBack} className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border border-slate-100"><ChevronLeft size={20} className="text-slate-600" /></button>
                <h2 className="text-xl font-black text-slate-800">Hồ sơ cá nhân</h2>
            </div>
            
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex-1 overflow-y-auto custom-scrollbar">
                {/* Avatar */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-roboki-400 to-orange-500 flex items-center justify-center text-white text-4xl font-black mb-4 shadow-lg border-4 border-white">{localData.name.charAt(0)}</div>
                    <div className="text-center">
                        <h3 className="text-xl font-black text-slate-800">{localData.email}</h3>
                    </div>
                </div>

                {/* Form */}
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase ml-1">Họ tên</label>
                        <input disabled={!isEditing} value={localData.name} onChange={e => setLocalData({...localData, name: e.target.value})} className={`w-full p-3 rounded-xl border font-bold ${isEditing ? 'bg-white border-roboki-500' : 'bg-slate-50 border-slate-100'}`} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Lớp</label>
                            <input disabled={!isEditing} value={localData.class} onChange={e => setLocalData({...localData, class: e.target.value})} className={`w-full p-3 rounded-xl border font-bold ${isEditing ? 'bg-white border-roboki-500' : 'bg-slate-50 border-slate-100'}`} />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Trường</label>
                            <input disabled={!isEditing} value={localData.school || ''} onChange={e => setLocalData({...localData, school: e.target.value})} className={`w-full p-3 rounded-xl border font-bold ${isEditing ? 'bg-white border-roboki-500' : 'bg-slate-50 border-slate-100'}`} />
                        </div>
                    </div>
                </div>

                {/* 👇 BIỂU ĐỒ NĂNG LỰC (Đã kết nối nút bấm) 👇 */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                    <h3 className="font-black text-slate-800 text-base mb-2 flex items-center gap-2">
                        <BarChart3 className="text-indigo-600" size={20}/> Phân tích Năng lực
                    </h3>
                    {/* 👇 Đã thêm prop onStudyTopic vào đây 👇 */}
                    <CompetencyChart stats={user.topicStats} onStudyTopic={onStudyTopic} />
                </div>
            </div>

            {/* Footer Buttons */}
            <div className="mt-4">
                {isEditing ? (
                    <div className="flex gap-3">
                        <button onClick={() => { setIsEditing(false); setLocalData(user); }} className="flex-1 bg-white text-slate-500 py-3 rounded-xl font-bold border border-slate-200">Hủy</button>
                        <button onClick={handleSave} disabled={loading} className="flex-[2] bg-emerald-500 text-white py-3 rounded-xl font-bold shadow-lg">Lưu</button>
                    </div>
                ) : (
                    <button onClick={() => setIsEditing(true)} className="w-full bg-slate-800 text-white py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"><Edit3 size={18}/> Chỉnh sửa</button>
                )}
                {!isEditing && <button onClick={() => signOut(auth)} className="w-full mt-2 text-rose-500 font-bold py-3 rounded-xl hover:bg-rose-50">Đăng xuất</button>}
            </div>
        </div>
    );
};

// 1. HOME SCREEN (Giao diện 2 Cột: AI + Chat)
const ContentScreen: React.FC<{
  onCopy: (txt: string) => void; onNavToPractice: () => void; onNavToMockTest: () => void;
  onNavToExam: () => void; onNavToGarden: () => void; 
  onNavToGames: () => void; onNavToChallenge: () => void; onNavToLeaderboard: () => void;
  onNavToProfile: () => void; onNavToChat: () => void; user: UserProfile;
  selectedTopic: { id: string, label: string } | null; setSelectedTopic: (topic: { id: string, label: string } | null) => void;
  expandedLessonIds: string[]; toggleLesson: (id: string) => void; lessons: Lesson[];
}> = ({
  onCopy, onNavToPractice, onNavToMockTest, onNavToExam, onNavToGames, onNavToChallenge,
  onNavToGarden, onNavToLeaderboard, onNavToProfile, onNavToChat, user,
  selectedTopic, setSelectedTopic, expandedLessonIds, toggleLesson, lessons
}) => {
  const TOPICS = [{ id: 't1', label: 'VẬT LÍ NHIỆT', icon: Thermometer }, { id: 't2', label: 'KHÍ LÍ TƯỞNG', icon: Wind }, { id: 't3', label: 'TỪ TRƯỜNG', icon: Magnet }, { id: 't4', label: 'HẠT NHÂN & PHÓNG XẠ', icon: Atom }];
  
  // --- GIỮ NGUYÊN LOGIC RANK CŨ CỦA BẠN (Rút gọn để code đỡ dài) ---
  const TOTAL_RANKS = [
      { min: 10000, label: 'ĐA VŨ TRỤ', icon: '🌌', color: 'from-slate-900 via-purple-900 to-slate-900' },
      { min: 9000, label: 'VÔ CỰC', icon: '♾️', color: 'from-indigo-600 via-purple-600 to-pink-600' },
      { min: 8200, label: 'THỜI GIAN', icon: '⏳', color: 'from-emerald-500 via-teal-500 to-cyan-500' },
      { min: 7500, label: 'KHÔNG GIAN', icon: '💠', color: 'from-blue-600 via-indigo-600 to-violet-600' },
      { min: 6900, label: 'BIG BANG', icon: '💥', color: 'from-orange-600 via-red-600 to-rose-600' },
      { min: 6400, label: 'HỐ ĐEN', icon: '⚫', color: 'from-gray-700 via-gray-900 to-black' },
      { min: 5900, label: 'SIÊU TÂN TINH', icon: '✨', color: 'from-yellow-300 via-orange-400 to-red-500' },
      { min: 5400, label: 'THIÊN HÀ', icon: '🌀', color: 'from-violet-500 to-fuchsia-500' },
      { min: 5000, label: 'TINH VÂN', icon: '🌫️', color: 'from-pink-400 to-rose-400' },
      { min: 4600, label: 'CHÒM SAO', icon: '✨', color: 'from-cyan-400 to-blue-500' },
      { min: 4200, label: 'MẶT TRỜI', icon: '🌞', color: 'from-yellow-400 to-orange-500' },
      { min: 3800, label: 'SAO MỘC', icon: '🪐', color: 'from-orange-300 to-amber-500' },
      { min: 3500, label: 'SAO THỔ', icon: '🪐', color: 'from-yellow-200 to-yellow-500' },
      { min: 3200, label: 'TRÁI ĐẤT', icon: '🌍', color: 'from-blue-400 to-green-500' },
      { min: 2900, label: 'SAO HỎA', icon: '🔴', color: 'from-red-400 to-red-600' },
      { min: 2600, label: 'MẶT TRĂNG', icon: '🌑', color: 'from-slate-300 to-slate-500' },
      { min: 2350, label: 'VỆ TINH', icon: '🛰️', color: 'from-zinc-400 to-zinc-600' },
      { min: 2100, label: 'TẦNG ĐIỆN LY', icon: '⚡', color: 'from-violet-400 to-purple-500' },
      { min: 1900, label: 'BÃO TỪ', icon: '🌪️', color: 'from-fuchsia-400 to-pink-500' },
      { min: 1700, label: 'CỰC QUANG', icon: '🌈', color: 'from-green-300 to-emerald-500' },
      { min: 1500, label: 'KHÍ QUYỂN', icon: '☁️', color: 'from-sky-300 to-blue-400' },
      { min: 1350, label: 'ĐẠI DƯƠNG', icon: '🌊', color: 'from-blue-500 to-indigo-600' },
      { min: 1200, label: 'LỤC ĐỊA', icon: '⛰️', color: 'from-emerald-500 to-green-700' },
      { min: 1050, label: 'SINH QUYỂN', icon: '🌳', color: 'from-lime-400 to-green-600' },
      { min: 900, label: 'RỪNG RẬM', icon: '🌴', color: 'from-green-400 to-teal-600' },
      { min: 800, label: 'CAO NGUYÊN', icon: '🌄', color: 'from-amber-400 to-orange-500' },
      { min: 700, label: 'TINH THỂ', icon: '💎', color: 'from-cyan-300 to-blue-500' },
      { min: 600, label: 'PHÂN TỬ', icon: '⚗️', color: 'from-teal-300 to-teal-500' },
      { min: 500, label: 'NGUYÊN TỬ', icon: '⚛️', color: 'from-violet-300 to-purple-500' },
      { min: 420, label: 'HẠT NHÂN', icon: '☢️', color: 'from-yellow-400 to-orange-500' },
      { min: 350, label: 'NUCLEON', icon: '🔴', color: 'from-rose-400 to-red-500' },
      { min: 280, label: 'PROTON', icon: '➕', color: 'from-red-500 to-red-700' },
      { min: 220, label: 'NEUTRON', icon: '⚪', color: 'from-gray-400 to-gray-600' },
      { min: 160, label: 'ELECTRON', icon: '➖', color: 'from-blue-400 to-blue-600' },
      { min: 110, label: 'QUARK', icon: '🧩', color: 'from-pink-400 to-rose-500' },
      { min: 70, label: 'PHOTON', icon: '💡', color: 'from-yellow-300 to-yellow-500' },
      { min: 40, label: 'HẠT BỤI', icon: '🌫️', color: 'from-stone-300 to-stone-500' },
      { min: 20, label: 'VÔ HÌNH', icon: '👻', color: 'from-gray-200 to-gray-400' },
      { min: 10, label: 'HƯ KHÔNG', icon: '🌑', color: 'from-slate-200 to-slate-400' },
      { min: 0, label: 'KHỞI NGUYÊN', icon: '🥚', color: 'from-slate-100 to-slate-300' },
  ];

  const currentScore = user.totalScore || 0;
  const currentRankIndex = TOTAL_RANKS.findIndex(r => currentScore >= r.min);
  const actualRankIndex = currentRankIndex !== -1 ? currentRankIndex : TOTAL_RANKS.length - 1;
  const currentRank = TOTAL_RANKS[actualRankIndex];
  const currentLevel = TOTAL_RANKS.length - actualRankIndex;
  const nextRank = actualRankIndex > 0 ? TOTAL_RANKS[actualRankIndex - 1] : null;
  let progressPercent = 100;
  let nextRankLabel = "MAX";
  let scoreNeeded = 0;
  if (nextRank) {
      const range = nextRank.min - currentRank.min;
      const gained = currentScore - currentRank.min;
      progressPercent = Math.min(100, Math.max(5, (gained / range) * 100)); 
      nextRankLabel = nextRank.label;
      scoreNeeded = Math.round((nextRank.min - currentScore) * 100) / 100;
  }

  // 👇 HÀM XỬ LÝ KHI BẤM NÚT "ÔN TẬP NGAY" TRÊN WIDGET AI
  const handleAIAction = (target: string, param?: string) => {
      if (target === 'PRACTICE') {
          if (param) { 
              const topicObj = TOPICS.find(t => t.label === param);
              if (topicObj) setSelectedTopic(topicObj); 
              else onNavToPractice();
          } else {
              onNavToPractice();
          }
      }
      else if (target === 'LESSON' && param) {
           const topicObj = TOPICS.find(t => t.label === param);
           if (topicObj) setSelectedTopic(topicObj);
      }
      else if (target === 'EXAM') onNavToExam();
      else if (target === 'LEADERBOARD') onNavToLeaderboard();
  };

  const handleGiftAll = async () => {
    if (!confirm("⚠️ ADMIN CHÚ Ý:\nBạn có chắc muốn tặng 10 Nước & 10 Phân cho TẤT CẢ học sinh không?")) return;
    try {
      const q = query(collection(db, 'users'));
      const snapshot = await getDocs(q);
      const batch = writeBatch(db);
      let count = 0;
      snapshot.forEach((d) => {
        const uData = d.data();
        const currentInv = uData.inventory || { water: 0, fertilizer: 0 };
        const newInv = { water: (currentInv.water || 0) + 10, fertilizer: (currentInv.fertilizer || 0) + 10 };
        batch.update(doc(db, 'users', d.id), { inventory: newInv });
        count++;
      });
      await batch.commit();
      alert(`✅ Đã tặng quà cho ${count} bạn thành công!`);
      window.location.reload();
    } catch (err) { console.error(err); alert("Lỗi khi tặng quà!"); }
  };

  if (selectedTopic) {
    const topicLessons = lessons.filter(l => l.topic === selectedTopic.label);
    return (
      <div className="pb-24 pt-2 px-4 space-y-4 bg-slate-50 min-h-full">
         <div className="flex items-center gap-3 pt-4 pb-2 sticky top-0 bg-slate-50/95 backdrop-blur z-10">
            <button onClick={() => setSelectedTopic(null)} className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-600 border border-slate-200 hover:bg-roboki-50 hover:text-roboki-600 transition-colors"><ChevronLeft size={20} /></button>
            <h2 className="font-bold text-xl text-slate-800 truncate">{selectedTopic.label}</h2>
         </div>
         <div className="space-y-4">{topicLessons.length > 0 ? (topicLessons.map(lesson => (<LessonCard key={lesson.id} lesson={lesson} onCopy={onCopy} isExpanded={expandedLessonIds.includes(lesson.id)} onToggle={() => toggleLesson(lesson.id)}/>))) : (<div className="text-center py-10 text-slate-400 text-sm">Đang cập nhật nội dung cho chủ đề này.</div>)}</div>
      </div>
    );
  }

  return (
    <div className="pb-28 pt-2 px-4 space-y-5 bg-slate-50 min-h-full">
      {/* 1. HEADER (GIỮ NGUYÊN) */}
      <div className="flex justify-between items-start pt-2">
        <div className="flex flex-col gap-1 flex-1 mr-4">
           <div className="flex items-baseline gap-2 mb-1">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider shrink-0">Xin chào,</span>
                <span className="text-xl font-black text-slate-800 truncate">{user.name} 👋</span>
           </div>
           
           <div className="w-full max-w-[220px]">
                <div className="flex items-end justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                        <span className="bg-orange-600 text-white text-[10px] font-red px-1.5 py-0.5 rounded">Lv.{currentLevel}</span>
                        <span className="text-[11px] font-bold text-black-700 uppercase flex items-center gap-1">{currentRank.icon} {currentRank.label}</span>
                    </div>
                    {nextRank ? (<span className="text-[9px] font-bold text-slate-400">+{scoreNeeded} XP lên <span className="text-indigo-600">{nextRankLabel}</span></span>) : (<span className="text-[9px] font-bold text-green-400">{Math.round(currentScore * 100) / 100} XP</span>)}
                </div>
                <div className="h-3.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200 shadow-inner relative">
                    <div className="absolute top-0 bottom-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10 z-10"></div>
                    <div className={`h-full bg-gradient-to-r ${currentRank.color} rounded-full transition-all duration-1000 ease-out shadow-sm relative flex items-center justify-end pr-1.5`} style={{ width: `${progressPercent}%` }}><div className="absolute top-0 right-0 bottom-0 w-full bg-gradient-to-b from-white/20 to-transparent"></div></div>
                    <div className="absolute inset-0 flex items-center justify-center text-[8px] font-black text-orange-600/80 z-20 mix-blend-multiply">{Math.round(progressPercent)}%</div>
                </div>
                <div className="flex justify-between mt-1 px-0.5"><span className="text-[9px] font-bold text-green-400">{currentScore} XP</span>{nextRank && <span className="text-[9px] font-bold text-green-300">{nextRank.min} XP</span>}</div>
            </div>
        </div>

        <div className="flex items-center gap-3 mt-2 shrink-0">
            <button onClick={onNavToProfile} className="w-12 h-12 rounded-full bg-white p-1 shadow-md active:scale-95 transition-transform border border-slate-100 relative group">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 flex items-center justify-center text-white text-lg font-black shadow-inner">{user.name.charAt(0)}</div>
                <div className="absolute -bottom-1 -right-1 bg-slate-800 text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">{currentLevel}</div>
            </button>
        </div>
      </div>

      {/* 👇 GIAO DIỆN MỚI: 1 HÀNG DUY NHẤT (TÍCH HỢP AI & CHAT) 👇 */}
      <div className="mb-4 animate-fade-in">
         <RobokiAdvisor 
            user={user} 
            onAction={handleAIAction} 
            onChat={onNavToChat} // Truyền hàm mở chat vào đây
         />
      </div>
      {/* 👆 KẾT THÚC GIAO DIỆN HỢP NHẤT 👆 */}

      {/* 3. MENU CHỦ ĐỀ */}
      <div>
        <h3 className="font-bold text-slate-800 text-base mb-3 flex items-center gap-2"><BookOpen size={18} className="text-roboki-500"/> Chủ đề ôn tập</h3>
        <div className="grid grid-cols-2 gap-3">
          {TOPICS.map((t) => (
            <div key={t.id} className={`flex flex-col items-center gap-3 cursor-pointer p-3 rounded-3xl transition-all active:scale-95 duration-200 bg-white border border-slate-100 shadow-sm hover:border-roboki-200 hover:shadow-md group`} onClick={() => setSelectedTopic(t)}>
              <div className={`w-12 h-12 rounded-2xl bg-orange-50 group-hover:bg-roboki-100 flex items-center justify-center shadow-inner transition-colors`}><t.icon size={24} className="text-roboki-500 group-hover:text-roboki-600" strokeWidth={2.5} /></div>
              <span className="text-xs font-bold text-slate-700 text-center leading-tight px-1 group-hover:text-roboki-700 transition-colors">{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. MENU HOẠT ĐỘNG */}
      <div className="pb-4">
        <h3 className="font-bold text-slate-800 text-base mb-3 flex items-center gap-2"><Zap size={18} className="text-roboki-500"/> Hoạt động</h3>
        <div className="grid grid-cols-2 gap-2.5">
             <div onClick={onNavToPractice} className="bg-orange-50 p-3 rounded-3xl border border-orange-100/50 shadow-sm flex flex-col items-center text-center gap-2 cursor-pointer transition-all hover:shadow-md active:scale-95 group"><div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-roboki-600 shadow-sm"><SwatchBook size={20} /></div><div><div className="font-bold text-roboki-900 text-sm group-hover:text-roboki-600 transition-colors">LUYỆN TẬP</div><div className="text-[10px] text-roboki-600/70">Luyện theo bài</div></div></div>
             <div onClick={onNavToExam} className="bg-red-50 p-3 rounded-3xl border border-red-100/50 shadow-sm flex flex-col items-center text-center gap-2 cursor-pointer transition-all hover:shadow-md active:scale-95 group"><div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-600 shadow-sm"><GraduationCap size={20} /></div><div><div className="font-bold text-red-900 text-sm group-hover:text-red-600 transition-colors">THI THỬ</div><div className="text-[10px] text-red-600/70">Đề chuẩn 2025</div></div></div>
             <div onClick={onNavToMockTest} className="bg-purple-50 p-3 rounded-3xl border border-purple-100/50 shadow-sm flex flex-col items-center text-center gap-2 cursor-pointer transition-all hover:shadow-md active:scale-95 group"><div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-purple-600 shadow-sm"><ClipboardList size={20} /></div><div><div className="font-bold text-purple-900 text-sm group-hover:text-purple-600 transition-colors">TỰ TẠO ĐỀ</div><div className="text-[10px] text-purple-600/70">Tự cấu hình đề</div></div></div>
             <div onClick={onNavToGames} className="bg-emerald-50 p-3 rounded-3xl border border-emerald-100/50 shadow-sm flex flex-col items-center text-center gap-2 cursor-pointer transition-all hover:shadow-md active:scale-95 group"><div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-sm"><Gamepad2 size={20} /></div><div><div className="font-bold text-emerald-900 text-sm group-hover:text-emerald-600 transition-colors">Trò chơi</div><div className="text-[10px] text-emerald-600/70">Vừa học vừa chơi</div></div></div>
             <div onClick={onNavToChallenge} className="bg-sky-50 p-3 rounded-3xl border border-sky-100/50 shadow-sm flex flex-col items-center text-center gap-2 cursor-pointer transition-all hover:shadow-md active:scale-95 group"><div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-sky-600 shadow-sm"><Target size={20} /></div><div><div className="font-bold text-sky-900 text-sm group-hover:text-sky-600 transition-colors">Thử thách</div><div className="text-[10px] text-sky-600/70">Nhiệm vụ ngày</div></div></div>
             <div onClick={onNavToLeaderboard} className="bg-indigo-50 p-3 rounded-3xl border border-indigo-100/50 shadow-sm flex flex-col items-center text-center gap-2 cursor-pointer transition-all hover:shadow-md active:scale-95 group"><div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-sm"><Trophy size={20} /></div><div><div className="font-bold text-indigo-900 text-sm group-hover:text-indigo-600 transition-colors">Xếp hạng</div><div className="text-[10px] text-indigo-600/70">Top học sinh</div></div></div>
             <div onClick={onNavToGarden} className="col-span-2 bg-lime-50 p-3 rounded-3xl border border-lime-100/50 shadow-sm flex flex-col items-center text-center gap-2 cursor-pointer transition-all hover:shadow-md active:scale-95 group"><div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-lime-600 shadow-sm"><Sprout size={20} /></div><div><div className="font-bold text-lime-900 text-sm group-hover:text-lime-600 transition-colors">Vườn Cây Tri Thức</div><div className="text-[10px] text-lime-600/70">Chăm sóc cây & Thu hoạch</div></div></div>
        </div>
        
        {user.email === 'lebaoanhnss@gmail.com' && (
          <div className="mt-8 mb-4 border-t border-slate-200 pt-4">
            <h3 className="font-bold text-slate-800 text-base mb-3 flex items-center gap-2">🛡️ Admin Control</h3>
            <button onClick={handleGiftAll} className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white py-3 rounded-2xl font-bold shadow-lg shadow-pink-200 flex items-center justify-center gap-2 active:scale-95 transition-transform">🎁 Tặng quà toàn Server (10 Nước - 10 Phân)</button>
          </div>
        )}
      </div>
    </div>
  );
};
// ... (Các component PracticeScreen, MockTestScreen, ExamScreen, GameScreen giữ nguyên code như cũ)
// 2. PRACTICE SCREEN (Đã tích hợp Biểu đồ năng lực)
const PracticeScreen: React.FC<{
  onCopy: (txt: string) => void,
  onScore: (pts: number, type?: 'game'|'practice'|'exam'|'challenge'|'mock') => void,
  
  // 👇 1. THÊM PROP NÀY: Hàm cập nhật biểu đồ
  onUpdateStats: (topic: string, isCorrect: boolean) => void, 

  sessionData: PracticeSessionData,
  setSessionData: React.Dispatch<React.SetStateAction<PracticeSessionData>>,
  questions: Question[],
  lessons: Lesson[],
  onSave: () => void, 
  onExit: () => void
}> = ({ onCopy, onScore, sessionData, setSessionData, questions, lessons, onUpdateStats }) => { // 👈 Nhớ lấy onUpdateStats ở đây
  const {
    configMode, selectedTopic, selectedLessonId, selectedLevel, selectedType, errorMsg,
    quizQuestions, currentQIndex, selectedOpt, subAnswers, isSubmitted
  } = sessionData;

  const updateSession = (updates: Partial<PracticeSessionData>) => setSessionData(prev => ({ ...prev, ...updates }));
  const availableLessons = selectedTopic === 'TẤT CẢ' ? [] : lessons.filter(l => l.topic.toUpperCase() === selectedTopic.toUpperCase());
  
  const startPractice = () => {
    let filtered = questions;
    if (selectedTopic !== 'TẤT CẢ') filtered = filtered.filter(q => q.topic?.trim().toUpperCase() === selectedTopic?.trim().toUpperCase());
    if (selectedLessonId && selectedLessonId !== 'ALL') filtered = filtered.filter(q => q.lessonId === selectedLessonId);
    if (selectedLevel !== 'Ngẫu nhiên') filtered = filtered.filter(q => q.level === selectedLevel);
    if (selectedType !== 'ALL') filtered = filtered.filter(q => q.type === selectedType);

    if (filtered.length === 0) { updateSession({ errorMsg: 'Không tìm thấy câu hỏi phù hợp. Vui lòng chọn tiêu chí khác hoặc nạp thêm dữ liệu.' }); return; }
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    updateSession({ quizQuestions: shuffled, currentQIndex: 0, isSubmitted: false, selectedOpt: null, subAnswers: {}, configMode: false, errorMsg: '' });
  };

 const submit = () => {
    updateSession({ isSubmitted: true });
    const currentQ = quizQuestions[currentQIndex];

    // Xử lý câu hỏi chùm (SubQuestions)
    if (currentQ.subQuestions && currentQ.subQuestions.length > 0) {
        let correctCount = 0;
        currentQ.subQuestions.forEach(sq => { if (subAnswers && subAnswers[sq.id] === sq.isCorrect) correctCount++; });
        
        // Logic: Đúng trên 50% ý thì coi là nắm được Topic đó
        const isMastered = correctCount >= (currentQ.subQuestions.length / 2);
        
        // 👇 2. GỌI HÀM CẬP NHẬT STATS CHO BIỂU ĐỒ
        if (currentQ.topic) onUpdateStats(currentQ.topic, isMastered);

        onScore(correctCount * 0.25, 'practice');

    } else {
        // Xử lý câu hỏi đơn
        let isCorrect = false;
        if (currentQ.type === 'Short') { isCorrect = selectedOpt?.trim().toLowerCase() === currentQ.answerKey.trim().toLowerCase(); }
        else { isCorrect = selectedOpt === currentQ.answerKey; }
        
        // 👇 2. GỌI HÀM CẬP NHẬT STATS CHO BIỂU ĐỒ
        if (currentQ.topic) onUpdateStats(currentQ.topic, isCorrect);
        
        onScore(isCorrect ? 0.25 : 0, 'practice');
    }
  };

  const handleSubAnswer = (subId: string, val: boolean) => { if (isSubmitted) return; updateSession({ subAnswers: { ...subAnswers, [subId]: val } }); };

  // --- GIAO DIỆN CẤU HÌNH (CONFIG MODE) ---
  if (configMode) {
    return (
        <div className="pb-24 pt-4 px-5 h-full flex flex-col bg-slate-50">
            <h2 className="text-2xl font-black text-slate-800 mb-4 flex items-center gap-2"><SwatchBook className="text-roboki-600" size={28}/> Luyện tập</h2>
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-6 flex-1 overflow-y-auto">
               <div>
                <h3 className="font-bold text-slate-700 text-sm mb-3">1. Chọn Chủ đề</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => updateSession({ selectedTopic: 'TẤT CẢ', selectedLessonId: 'ALL' })} className={`p-3 rounded-xl text-left text-xs font-bold border transition-all ${selectedTopic === 'TẤT CẢ' ? 'bg-roboki-500 text-white border-roboki-500 shadow-md shadow-roboki-200' : 'bg-white text-slate-500 border-slate-100 hover:border-roboki-200'}`}>TẤT CẢ</button>
                  {['VẬT LÍ NHIỆT', 'KHÍ LÍ TƯỞNG', 'TỪ TRƯỜNG', 'HẠT NHÂN & PHÓNG XẠ'].map(t => (<button key={t} onClick={() => updateSession({ selectedTopic: t, selectedLessonId: 'ALL' })} className={`p-3 rounded-xl text-left font-bold border transition-all truncate ${selectedTopic === t ? 'bg-roboki-500 text-white border-roboki-500 shadow-md shadow-roboki-200' : 'bg-white text-slate-500 border-slate-100 hover:border-roboki-200'} ${t.length > 15 ? 'col-span-2 text-xs' : 'text-xs'}`}>{t}</button>))}
                </div>
               </div>
               
               {selectedTopic !== 'TẤT CẢ' && availableLessons.length > 0 && (
                 <div className="animate-fade-in">
                    <h3 className="font-bold text-slate-700 text-sm mb-3">2. Chọn Bài học (Chi tiết)</h3>
                    <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                       <button onClick={() => updateSession({ selectedLessonId: 'ALL' })} className={`p-3 rounded-xl text-left text-xs font-bold border transition-all ${selectedLessonId === 'ALL' ? 'bg-orange-500 text-white border-orange-500 shadow-md' : 'bg-white text-slate-500 border-slate-100 hover:border-orange-200'}`}>Toàn bộ chương {selectedTopic}</button>
                       {availableLessons.map(l => (
                         <button key={l.id} onClick={() => updateSession({ selectedLessonId: l.id })} className={`p-3 rounded-xl text-left text-xs font-bold border transition-all ${selectedLessonId === l.id ? 'bg-orange-500 text-white border-orange-500 shadow-md' : 'bg-white text-slate-500 border-slate-100 hover:border-orange-200'}`}>{l.title}</button>
                       ))}
                    </div>
                 </div>
               )}

               <div>
                <h3 className="font-bold text-slate-700 text-sm mb-3">3. Tùy chọn khác</h3>
                <div className="flex gap-2 mb-3">
                   {['Ngẫu nhiên', 'Biết', 'Hiểu', 'Vận dụng'].map(lvl => (<button key={lvl} onClick={() => updateSession({ selectedLevel: lvl })} className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase border transition-all ${selectedLevel === lvl ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white text-slate-400 border-slate-100'}`}>{lvl}</button>))}
                </div>
                <div className="flex gap-2">
                   {[{id: 'ALL', l: 'TẤT CẢ'}, {id: 'MCQ', l: 'Trắc nghiệm'}, {id: 'TrueFalse', l: 'Đúng/Sai'}, {id: 'Short', l: 'Điền từ'}].map(type => (<button key={type.id} onClick={() => updateSession({ selectedType: type.id })} className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase border transition-all ${selectedType === type.id ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-white text-slate-400 border-slate-100'}`}>{type.l}</button>))}
                </div>
               </div>
               {errorMsg && <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold rounded-xl flex items-center gap-2"><XCircle size={16}/> {errorMsg}</div>}
            </div>
            <button onClick={startPractice} className="w-full bg-slate-800 text-white py-4 rounded-3xl font-bold mt-4 shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2">Bắt đầu luyện tập <ArrowRight size={18}/></button>
        </div>
    );
  }

  // ... (Phần Giao diện làm bài giữ nguyên như code cũ của bạn) ...
  // 👇 CHÚ Ý: Hãy giữ nguyên phần `return` ở dưới (phần hiển thị câu hỏi)
  // Nếu bạn muốn tôi paste nốt phần đó ra thì bảo nhé, còn không thì chỉ cần thay đoạn trên là đủ logic rồi.
  
  // --- GIAO DIỆN LÀM BÀI ---
  const currentQ = quizQuestions[currentQIndex];
  const isGroupQuestion = currentQ.subQuestions && currentQ.subQuestions.length > 0;

  const handleAskRoboki = () => {
      let content = currentQ.promptText;
      if (currentQ.subQuestions && currentQ.subQuestions.length > 0) {
          content += "\n\nXÉT CÁC PHÁT BIỂU SAU:";
          currentQ.subQuestions.forEach((sq, idx) => {
              content += `\n${idx + 1}) ${sq.content}`;
          });
      }
      onCopy(generateRobokiPrompt(
          currentQ.topic, 
          `Câu hỏi ${currentQ.level}`, 
          currentQ.level, 
          content, 
          currentQ.options
      ));
  };

  return (
    <div className="pb-24 pt-4 px-4 h-full flex flex-col bg-slate-50">
      <div className="flex justify-between items-center mb-4">
         <button onClick={() => updateSession({ configMode: true })} className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border border-slate-100"><ChevronLeft size={20} className="text-slate-600"/></button>
         <div className="flex flex-col items-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Câu hỏi</span>
            <span className="font-black text-slate-800 text-lg">{currentQIndex + 1}<span className="text-slate-300 text-sm">/{quizQuestions.length}</span></span>
         </div>
         <button onClick={handleAskRoboki} className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border border-slate-100 text-roboki-500 hover:bg-roboki-50 transition-colors"><Copy size={20}/></button>
      </div>
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex-1 overflow-y-auto relative">
         <div className="absolute top-0 right-0 bg-slate-100 text-slate-500 text-[9px] font-black px-3 py-1.5 rounded-bl-2xl rounded-tr-2xl uppercase tracking-wider">{currentQ.level}</div>
         <div className="mb-2 text-[10px] font-black uppercase text-roboki-500 tracking-widest">{currentQ.topic}</div>
         
         <div className="mb-6">
            {currentQ.imageUrl && (
              <div className="mb-4 flex justify-center bg-white rounded-xl border border-slate-100 p-2">
                <img src={currentQ.imageUrl} alt="Hình minh họa" className="rounded-lg max-h-64 object-contain w-full" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
            )}
            <div className="font-bold text-slate-800 text-base leading-relaxed"><MathRender content={currentQ.promptText}/></div>
         </div>
         
         <div className="space-y-4">
            {isGroupQuestion ? (
                <div className="space-y-4">
                    {currentQ.subQuestions?.map((sq) => {
                        const userChoice = subAnswers ? subAnswers[sq.id] : undefined;
                        const isRight = isSubmitted && userChoice === sq.isCorrect;
                        const isWrong = isSubmitted && userChoice !== undefined && userChoice !== sq.isCorrect;

                        return (
                            <div key={sq.id} className={`p-4 rounded-2xl border-2 transition-all ${isRight ? 'bg-emerald-50 border-emerald-500' : isWrong ? 'bg-rose-50 border-rose-500' : 'bg-slate-50 border-slate-100'}`}>
                                <div className="text-sm font-bold text-slate-700 mb-3"><MathRender content={sq.content}/></div>
                                <div className="flex gap-2">
                                    <button 
                                        disabled={isSubmitted}
                                        onClick={() => handleSubAnswer(sq.id, true)}
                                        className={`flex-1 py-2 rounded-xl text-xs font-black uppercase transition-all ${userChoice === true ? 'bg-blue-500 text-white shadow-md' : 'bg-white text-slate-400 border border-slate-200'}`}
                                    >
                                        Đúng
                                    </button>
                                    <button 
                                        disabled={isSubmitted}
                                        onClick={() => handleSubAnswer(sq.id, false)}
                                        className={`flex-1 py-2 rounded-xl text-xs font-black uppercase transition-all ${userChoice === false ? 'bg-slate-700 text-white shadow-md' : 'bg-white text-slate-400 border border-slate-200'}`}
                                    >
                                        Sai
                                    </button>
                                </div>
                                {isSubmitted && (
                                    <div className={`mt-2 text-[10px] font-bold ${isRight ? 'text-emerald-600' : 'text-rose-600'}`}>
                                        {isRight ? '✓ Chính xác' : `✕ Sai rồi. Đáp án là: ${sq.isCorrect ? 'Đúng' : 'Sai'}`}
                                        {sq.explanation && <MathRender content={sq.explanation} className="mt-1 font-normal text-slate-500"/>}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            ) : (
               currentQ.type === 'Short' ? (
                  <input disabled={isSubmitted} type="text" placeholder="Nhập câu trả lời..." className="w-full p-4 rounded-2xl border-2 border-slate-100 font-bold focus:border-roboki-500 focus:outline-none" onChange={(e) => updateSession({ selectedOpt: e.target.value })}/>
               ) : (
                  currentQ.options?.map((opt, i) => (
                    <button key={i} disabled={isSubmitted} onClick={() => updateSession({ selectedOpt: opt })} className={`w-full p-4 rounded-2xl border-2 text-left text-sm font-bold transition-all ${isSubmitted && opt === currentQ.answerKey ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : isSubmitted && selectedOpt === opt ? 'bg-rose-50 border-rose-500 text-rose-700' : selectedOpt === opt ? 'bg-roboki-50 border-roboki-500 text-roboki-700' : 'bg-white border-slate-50 hover:bg-slate-50 text-slate-600'}`}><MathRender content={opt}/></button>
                  ))
               )
            )}
         </div>

         {isSubmitted ? (
            <div className="mt-8 animate-fade-in space-y-4">
               <button 
                   onClick={handleAskRoboki}
                   className="w-full bg-orange-100 text-orange-700 py-3 rounded-2xl font-bold border border-orange-200 flex items-center justify-center gap-2 hover:bg-orange-200 transition-all shadow-sm"
               >
                   <MessageCircle size={20}/> Hỏi Roboki tại sao?
               </button>

               {!isGroupQuestion && (
                   <div className="bg-slate-50 p-5 rounded-2xl text-sm border border-slate-100">
                     <div className="flex items-center gap-2 mb-2 text-roboki-600 font-black text-xs uppercase"><BookOpen size={14}/> Giải thích chi tiết</div>
                     <MathRender content={currentQ.explanationText || "Chưa có giải thích cho câu này."} className="text-slate-600"/>
                   </div>
               )}
               <button onClick={() => updateSession({ currentQIndex: (currentQIndex + 1) % quizQuestions.length, isSubmitted: false, selectedOpt: null, subAnswers: {} })} className="w-full bg-roboki-600 text-white py-4 rounded-2xl font-bold mt-4 shadow-lg shadow-roboki-200">Câu tiếp theo</button>
            </div>
         ) : (
            <button 
                disabled={isGroupQuestion ? (!subAnswers || Object.keys(subAnswers).length === 0) : !selectedOpt} 
                onClick={submit} 
                className="w-full bg-slate-800 text-white py-4 rounded-2xl font-bold mt-8 shadow-xl disabled:opacity-50 disabled:shadow-none transition-all"
            >
                Kiểm tra kết quả
            </button>
         )}
      </div>
    </div>
  );
};

// 3. MOCK TEST SCREEN (Đã fix lỗi)
const MockTestScreen: React.FC<{
  onBack: () => void,
  session: MockTestSessionData,
  setSession: React.Dispatch<React.SetStateAction<MockTestSessionData>>,
  questions: Question[],
  onScore: (pts: number, type?: 'game'|'practice'|'exam'|'challenge'|'mock') => void,
  onCopy: (txt: string) => void ,
  onSave: () => void 
}> = ({ onBack, session, setSession, questions, onScore, onCopy }) => {
  const { mode, selectedTopics, countMCQ, countTF, countShort, quizQuestions, currentQIndex, userAnswers, score, errorMsg } = session;

  const updateSession = (updates: Partial<MockTestSessionData>) => setSession(prev => ({ ...prev, ...updates }));

  const toggleTopic = (topic: string) => {
    let newTopics = [...selectedTopics];
    if (topic === 'TẤT CẢ') {
      newTopics = ['TẤT CẢ'];
    } else {
      if (newTopics.includes('TẤT CẢ')) newTopics = [];
      if (newTopics.includes(topic)) newTopics = newTopics.filter(t => t !== topic);
      else newTopics.push(topic);
      if (newTopics.length === 0) newTopics = ['TẤT CẢ'];
    }
    updateSession({ selectedTopics: newTopics });
  };

  const generateExam = () => {
    let source: Question[] = [];
    if (selectedTopics.includes('TẤT CẢ')) {
      source = questions;
    } else {
      source = questions.filter(q => selectedTopics.some(selected => selected.toUpperCase() === q.topic.trim().toUpperCase()));
    }
    
    const pickQuestions = (type: string, count: number) => {
        const typeQs = source.filter(q => q.type === type);
        const targetBiet = Math.ceil(count * 0.4);
        const targetHieu = Math.floor(count * 0.3);
        const targetVD = count - targetBiet - targetHieu;
        const qBiet = typeQs.filter(q => q.level === 'Biết').sort(() => Math.random() - 0.5);
        const qHieu = typeQs.filter(q => q.level === 'Hiểu').sort(() => Math.random() - 0.5);
        const qVD = typeQs.filter(q => q.level === 'Vận dụng').sort(() => Math.random() - 0.5);
        let picked = [...qBiet.slice(0, targetBiet), ...qHieu.slice(0, targetHieu), ...qVD.slice(0, targetVD)];
        if (picked.length < count) {
            const remaining = typeQs.filter(q => !picked.includes(q)).sort(() => Math.random() - 0.5);
            picked = [...picked, ...remaining.slice(0, count - picked.length)];
        }
        return picked;
    };

    const qsMCQ = pickQuestions('MCQ', countMCQ);
    const qsTF = pickQuestions('TrueFalse', countTF);
    const qsShort = pickQuestions('Short', countShort);
    const finalExam = [...qsMCQ, ...qsTF, ...qsShort];

    if (finalExam.length === 0) { updateSession({ errorMsg: 'Không tìm thấy câu hỏi phù hợp.' }); return; }
    updateSession({ quizQuestions: finalExam, mode: 'DOING', currentQIndex: 0, userAnswers: {}, errorMsg: '' });
  };

  const currentQ = quizQuestions[currentQIndex];
  const handleSelectAnswer = (val: any, subId?: string) => {
      if (subId) {
          const currentAns = userAnswers[currentQ.id] || {};
          updateSession({ userAnswers: { ...userAnswers, [currentQ.id]: { ...currentAns, [subId]: val } } });
      } else {
          updateSession({ userAnswers: { ...userAnswers, [currentQ.id]: val } });
      }
  };

  // 👇 THAY THẾ HÀM finishExam TRONG MockTestScreen
  // 👇 HÀM TÍNH ĐIỂM ĐÃ QUY ĐỔI VỀ THANG 10
  const finishExam = () => {
      let actualScore = 0;      // Điểm thực tế học sinh làm được
      let maxPossibleScore = 0; // Tổng điểm tối đa của cái đề này

      quizQuestions.forEach(q => {
          // 1. TÍNH TỔNG ĐIỂM TỐI ĐA (Mẫu số)
          if (q.subQuestions) {
              // Nếu là câu Đúng/Sai (có nhiều ý nhỏ), mỗi ý 0.25đ
              maxPossibleScore += q.subQuestions.length * 0.25;
          } else {
              // Trắc nghiệm hoặc Điền từ: 0.25đ
              maxPossibleScore += 0.25;
          }

          // 2. TÍNH ĐIỂM HỌC SINH ĐẠT ĐƯỢC (Tử số)
          const uAns = userAnswers[q.id];
          if (!uAns) return; // Chưa làm thì thôi

          if (q.subQuestions) {
              // Câu Đúng/Sai
              q.subQuestions.forEach(sq => { 
                  if (uAns[sq.id] === sq.isCorrect) actualScore += 0.25; 
              });
          } else if (q.type === 'Short') {
              // Câu Điền từ
              if (uAns.toString().trim().toLowerCase() === q.answerKey.trim().toLowerCase()) {
                  actualScore += 0.25; 
              }
          } else {
              // Câu Trắc nghiệm (MCQ)
              if (uAns === q.answerKey) actualScore += 0.25; 
          }
      });

      // 3. QUY ĐỔI RA THANG 10
      // Công thức: (Điểm đạt được / Tổng điểm tối đa) * 10
      let finalScoreOnScale10 = 0;
      if (maxPossibleScore > 0) {
          finalScoreOnScale10 = (actualScore / maxPossibleScore) * 10;
      }

      // Làm tròn 2 chữ số thập phân (ví dụ: 8.75)
      const finalPoints = Math.round(finalScoreOnScale10 * 100) / 100;

      onScore(finalPoints, 'mock'); 
      updateSession({ mode: 'RESULT', score: finalPoints });
  };
  const copyQuestionContent = (q: Question) => {
      let content = q.promptText;
      if (q.subQuestions) { content += "\n\nCÁC PHÁT BIỂU:"; q.subQuestions.forEach((sq, idx) => { content += `\n${idx+1}) ${sq.content}`; }); }
      onCopy(generateRobokiPrompt(q.topic, `Câu hỏi ID: ${q.id}`, q.level, content, q.options));
  };

  if (mode === 'CONFIG') {
      return (
        <div className="pb-24 pt-4 px-5 h-full flex flex-col bg-slate-50">
            <div className="flex items-center gap-3 mb-6"><button onClick={onBack} className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border border-slate-100"><ChevronLeft size={20} className="text-slate-600"/></button><h2 className="text-xl font-black text-slate-800">Cấu hình đề thi</h2></div>
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6 flex-1 overflow-y-auto">
                <div>
                    <h3 className="font-bold text-slate-700 text-sm mb-3">1. Chọn Chủ đề</h3>
                    <div className="grid grid-cols-2 gap-2"><button onClick={() => toggleTopic('TẤT CẢ')} className={`p-3 rounded-xl text-left text-xs font-bold border transition-all ${selectedTopics.includes('TẤT CẢ') ? 'bg-purple-600 text-white shadow-md' : 'bg-white text-slate-500 border-slate-100'}`}>TẤT CẢ</button>{['VẬT LÍ NHIỆT', 'KHÍ LÍ TƯỞNG', 'TỪ TRƯỜNG', 'HẠT NHÂN & PHÓNG XẠ'].map(t => { const isSelected = selectedTopics.includes(t); return (<button key={t} onClick={() => toggleTopic(t)} className={`p-3 rounded-xl text-left font-bold border transition-all truncate ${isSelected ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-200' : 'bg-white text-slate-500 border-slate-100'} ${t.length > 15 ? 'col-span-2 text-xs' : 'text-xs'}`}>{isSelected && <CheckCircle size={14} className="inline mr-1 mb-0.5"/>}{t}</button>) })}</div>
                </div>
                <div>
                    <h3 className="font-bold text-slate-700 text-sm mb-3">2. Số lượng câu hỏi</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100"><span className="text-xs font-bold text-slate-600">Trắc nghiệm</span><input type="number" min="0" max="40" value={countMCQ} onChange={(e) => updateSession({countMCQ: parseInt(e.target.value) || 0})} className="w-16 p-2 rounded-lg border text-center font-bold outline-none focus:border-purple-500"/></div>
                        <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100"><span className="text-xs font-bold text-slate-600">Đúng / Sai</span><input type="number" min="0" max="10" value={countTF} onChange={(e) => updateSession({countTF: parseInt(e.target.value) || 0})} className="w-16 p-2 rounded-lg border text-center font-bold outline-none focus:border-purple-500"/></div>
                        <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100"><span className="text-xs font-bold text-slate-600">Điền từ</span><input type="number" min="0" max="10" value={countShort} onChange={(e) => updateSession({countShort: parseInt(e.target.value) || 0})} className="w-16 p-2 rounded-lg border text-center font-bold outline-none focus:border-purple-500"/></div>
                    </div>
                </div>
                {errorMsg && <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold rounded-xl">{errorMsg}</div>}
            </div>
            <button onClick={generateExam} className="w-full bg-purple-600 text-white py-4 rounded-3xl font-bold mt-4 shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2">Bắt đầu làm bài <ArrowRight size={18}/></button>
        </div>
      );
  }
// 👇 THAY THẾ TOÀN BỘ ĐOẠN if (mode === 'RESULT') CỦA MOCK TEST SCREEN
  if (mode === 'RESULT') {
      // 1. TÍNH TOÁN SỐ LIỆU
      
      // MCQ: 0.25đ / câu
      const countMCQCorrect = quizQuestions.filter(q => q.type === 'MCQ' && userAnswers[q.id] === q.answerKey).length;
      const scoreMCQ = countMCQCorrect * 0.25; 

      // Điền từ (Short): SỬA THÀNH 0.25đ / câu
      const countShortCorrect = quizQuestions.filter(q => q.type === 'Short' && userAnswers[q.id]?.toString().trim().toLowerCase() === q.answerKey.trim().toLowerCase()).length;
      const scoreShort = countShortCorrect * 0.25; // 👈 ĐÃ SỬA CHỖ NÀY

      // Đúng/Sai: Đếm số ý đúng (0.25đ / ý)
      let countTFCorrectIdeas = 0;
      quizQuestions.filter(q => q.type === 'TrueFalse').forEach(q => {
          const uAns = userAnswers[q.id];
          if (uAns && q.subQuestions) {
              q.subQuestions.forEach(sq => {
                  if (uAns[sq.id] === sq.isCorrect) countTFCorrectIdeas++;
              });
          }
      });
      const scoreTF = countTFCorrectIdeas * 0.25; 

      return (
        <div className="pb-24 pt-2 px-3 h-full flex flex-col bg-slate-50">
            
            {/* 1. HEADER KẾT QUẢ: GIAO DIỆN MỚI (Cột dọc bên phải) */}
            <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm mb-2 shrink-0 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-400"></div>
                
                <div className="flex items-center gap-3 mt-1">
                    {/* CỘT TRÁI: ĐIỂM SỐ CHÍNH */}
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Kết quả bài làm</div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-5xl font-black text-purple-600 leading-none tracking-tighter">{score}</span>
                        </div>
                        <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full mt-1">Điểm tổng kết</span>
                    </div>

                    {/* CỘT PHẢI: THỐNG KÊ XẾP DỌC (Đã update hiển thị điểm) */}
                    <div className="flex flex-col gap-1.5 w-32 shrink-0 border-l border-slate-100 pl-3 py-0.5">
                       {/* MCQ */}
                       <div className="flex justify-between items-center bg-blue-50 px-2 py-1.5 rounded-lg border border-blue-100">
                           <span className="text-[8px] font-black text-blue-400 uppercase">MCQ</span>
                           <div className="flex items-baseline gap-1">
                               <span className="text-[10px] font-bold text-blue-700">{countMCQCorrect}</span>
                               <span className="text-[8px] font-medium text-blue-400">({scoreMCQ}đ)</span>
                           </div>
                       </div>
                       
                       {/* Đ/S */}
                       <div className="flex justify-between items-center bg-purple-50 px-2 py-1.5 rounded-lg border border-purple-100">
                           <span className="text-[8px] font-black text-purple-400 uppercase">Đ/S</span>
                           <div className="flex items-baseline gap-1">
                               <span className="text-[10px] font-bold text-purple-700">{countTFCorrectIdeas} ý</span>
                               <span className="text-[8px] font-medium text-purple-400">({scoreTF}đ)</span>
                           </div>
                       </div>

                       {/* Điền từ */}
                       <div className="flex justify-between items-center bg-orange-50 px-2 py-1.5 rounded-lg border border-orange-100">
                           <span className="text-[8px] font-black text-orange-400 uppercase">Điền</span>
                           <div className="flex items-baseline gap-1">
                               <span className="text-[10px] font-bold text-orange-700">{countShortCorrect}</span>
                               <span className="text-[8px] font-medium text-orange-400">({scoreShort}đ)</span>
                           </div>
                       </div>
                    </div>
                </div>
            </div>

            {/* 2. DANH SÁCH CÂU HỎI */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
                {quizQuestions.map((q, idx) => {
                    const uAns = userAnswers[q.id];
                    let isCorrectMain = false; 
                    if (!q.subQuestions) { isCorrectMain = q.type==='Short' ? uAns?.toString().trim().toLowerCase()===q.answerKey.trim().toLowerCase() : uAns===q.answerKey; }
                    
                    return (
                        <div key={q.id} className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm relative overflow-hidden">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex gap-1.5">
                                    <span className="bg-slate-100 text-slate-500 text-[9px] font-black px-1.5 py-0.5 rounded uppercase">Câu {idx + 1}</span>
                                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase border text-slate-400 border-slate-200 bg-slate-50">{q.level}</span>
                                </div>
                                <button onClick={() => copyQuestionContent(q)} className="text-slate-300 hover:text-purple-500 transition-colors" title="Copy hỏi AI"><Copy size={14}/></button>
                            </div>
                            
                            <div className="mb-2 pr-2">
                                {q.imageUrl && <img src={q.imageUrl} className="h-16 w-full object-contain mb-2 rounded-lg border border-slate-100 bg-slate-50" />}
                                <div className="text-xs font-bold text-slate-800 leading-relaxed"><MathRender content={q.promptText}/></div>
                            </div>
                            
                            <div className="bg-slate-50 rounded-lg p-2 text-xs border border-slate-100">
                                {q.subQuestions ? (
                                    <div className="space-y-1.5">
                                        {q.subQuestions.map((sq) => { 
                                            const choice = uAns ? uAns[sq.id] : undefined; 
                                            const isRightSub = choice === sq.isCorrect; 
                                            return (
                                                <div key={sq.id} className="flex justify-between items-start gap-2 border-b border-slate-200 last:border-0 pb-1 last:pb-0">
                                                    <div className="flex-1">
                                                        <div className="scale-95 origin-top-left"><MathRender content={sq.content} /></div>
                                                        <div className="mt-0.5 flex gap-2 font-bold text-[10px]">
                                                            <span className={choice === true ? 'text-blue-600' : choice === false ? 'text-slate-500' : 'text-slate-400'}>Bạn: {choice === true ? 'Đ' : choice === false ? 'S' : '-'}</span>
                                                            <span className="text-emerald-600">| Đ.Án: {sq.isCorrect ? 'Đ' : 'S'}</span>
                                                        </div>
                                                    </div>
                                                    <div className="mt-1">{isRightSub ? <CheckCircle size={12} className="text-emerald-500"/> : <XCircle size={12} className="text-rose-500"/>}</div>
                                                </div>
                                            ) 
                                        })}
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-1 text-[11px]">
                                        <div className="flex justify-between"><span className="text-slate-500 font-medium">Bạn chọn:</span><span className={`font-bold ${isCorrectMain ? 'text-emerald-600' : 'text-rose-600'}`}><MathRender content={uAns || 'Chưa làm'} /></span></div>
                                        <div className="flex justify-between border-t border-slate-200 pt-1 mt-1"><span className="text-slate-500 font-medium">Đáp án đúng:</span><span className="font-bold text-emerald-600"><MathRender content={q.answerKey} /></span></div>
                                    </div>
                                )}
                            </div>
                            
                            <div className="mt-2 text-[10px] text-slate-500 bg-white p-2 rounded-lg border border-slate-100">
                                <div className="font-bold uppercase text-[9px] text-purple-500 mb-0.5 flex items-center gap-1"><BookOpen size={10}/> Giải thích</div>
                                <MathRender content={q.explanationText || 'Chưa có giải thích chi tiết.'} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 3. NÚT ĐIỀU HƯỚNG */}
            <div className="mt-2 flex gap-2 shrink-0 pt-2 border-t border-slate-200 bg-slate-50">
                <button onClick={onBack} className="w-1/3 bg-white text-slate-600 py-2.5 rounded-xl font-bold border border-slate-200 hover:bg-slate-50 text-xs">Thoát</button>
                <button onClick={() => updateSession({ mode: 'CONFIG', quizQuestions: [], userAnswers: {} })} className="flex-1 bg-purple-600 text-white py-2.5 rounded-xl font-bold shadow-md shadow-purple-200 hover:bg-purple-700 text-xs">Làm đề mới</button>
            </div>
        </div>
      );
  }

  const userAns = userAnswers[currentQ.id];
  return (
    <div className="pb-24 pt-4 px-4 h-full flex flex-col bg-slate-50">
       <div className="flex justify-between items-center mb-4"><button onClick={() => updateSession({ mode: 'CONFIG' })} className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border border-slate-100"><X size={20} className="text-slate-600"/></button><div className="flex flex-col items-center"><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Câu hỏi</span><span className="font-black text-slate-800 text-lg">{currentQIndex + 1}<span className="text-slate-300 text-sm">/{quizQuestions.length}</span></span></div><div className="w-10"></div></div>
       <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex-1 overflow-y-auto relative">
          <div className="absolute top-0 right-0 bg-slate-100 text-slate-500 text-[9px] font-black px-3 py-1.5 rounded-bl-2xl rounded-tr-2xl uppercase tracking-wider">{currentQ.level}</div><div className="mb-2 text-[10px] font-black uppercase text-purple-500 tracking-widest">{currentQ.topic}</div>
          <div className="mb-6">{currentQ.imageUrl && (<div className="mb-4 flex justify-center bg-white rounded-xl border border-slate-100 p-2"><img src={currentQ.imageUrl} className="rounded-lg max-h-48 object-contain w-full" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} /></div>)}<div className="font-bold text-slate-800 text-base leading-relaxed"><MathRender content={currentQ.promptText}/></div></div>
          <div className="space-y-4">
             {currentQ.subQuestions ? (<div className="space-y-3">{currentQ.subQuestions.map(sq => { const choice = userAns ? userAns[sq.id] : undefined; return (<div key={sq.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50"><div className="text-sm font-bold text-slate-700 mb-2"><MathRender content={sq.content}/></div><div className="flex gap-2"><button onClick={() => handleSelectAnswer(true, sq.id)} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${choice === true ? 'bg-blue-500 text-white shadow-md' : 'bg-white text-slate-400 border border-slate-200'}`}>Đúng</button><button onClick={() => handleSelectAnswer(false, sq.id)} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${choice === false ? 'bg-slate-700 text-white shadow-md' : 'bg-white text-slate-400 border border-slate-200'}`}>Sai</button></div></div>) })}</div>) : currentQ.type === 'Short' ? (<input type="text" value={userAns || ''} onChange={(e) => handleSelectAnswer(e.target.value)} placeholder="Nhập câu trả lời..." className="w-full p-4 rounded-xl border-2 border-purple-100 font-bold focus:border-purple-500 focus:outline-none"/>) : (currentQ.options?.map((opt, i) => (<button key={i} onClick={() => handleSelectAnswer(opt)} className={`w-full p-4 rounded-2xl border-2 text-left text-sm font-bold transition-all ${userAns === opt ? 'bg-purple-50 border-purple-500 text-purple-700' : 'bg-white border-slate-50 hover:bg-slate-50 text-slate-600'}`}><MathRender content={opt}/></button>)))}
          </div>
       </div>
       <div className="mt-4 flex gap-3"><button disabled={currentQIndex === 0} onClick={() => updateSession({ currentQIndex: currentQIndex - 1 })} className="flex-1 bg-white text-slate-600 py-3 rounded-2xl font-bold border border-slate-200 disabled:opacity-50">Quay lại</button>{currentQIndex < quizQuestions.length - 1 ? (<button onClick={() => updateSession({ currentQIndex: currentQIndex + 1 })} className="flex-[2] bg-purple-600 text-white py-3 rounded-2xl font-bold shadow-lg shadow-purple-200">Câu tiếp theo</button>) : (<button onClick={finishExam} className="flex-[2] bg-emerald-500 text-white py-3 rounded-2xl font-bold shadow-lg shadow-emerald-200">Nộp bài</button>)}</div>
    </div>
  );
};

// 4. EXAM SCREEN
const ExamScreen: React.FC<{
  onBack: () => void;
  session: ExamSessionData;
  setSession: React.Dispatch<React.SetStateAction<ExamSessionData>>;
  questions: Question[];
  onScore: (pts: number, type?: 'game'|'practice'|'exam'|'challenge'|'mock') => void;
  onSave: () => void;
  onCopy: (txt: string) => void;
}> = ({ onBack, session, setSession, questions, onScore, onCopy }) => {
  const { mode, examType, title, timeLeft, quizQuestions, currentQIndex, userAnswers, score, details } = session;
  const update = (d: any) => setSession((p: any) => ({ ...p, ...d }));

  // Timer logic
  useEffect(() => {
    let t: any; 
    if (mode === 'DOING' && timeLeft > 0) {
      t = setInterval(() => { 
        setSession(prev => {
          if (prev.timeLeft <= 1) { finish(); return { ...prev, timeLeft: 0, mode: 'RESULT' }; }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(t);
  }, [mode, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const start = (type: string) => {
    let t: string[] = [], title = '', dur = 2700;
    if (type === 'GK1') { t = ['VẬT LÍ NHIỆT']; title = 'Giữa Kì 1'; }
    else if (type === 'CK1') { t = ['VẬT LÍ NHIỆT', 'KHÍ LÍ TƯỞNG']; title = 'Cuối Kì 1'; }
    else if (type === 'GK2') { t = ['TỪ TRƯỜNG']; title = 'Giữa Kì 2'; }
    else if (type === 'CK2') { t = ['TỪ TRƯỜNG', 'HẠT NHÂN & PHÓNG XẠ']; title = 'Cuối Kì 2'; }
    else { t = ['VẬT LÍ NHIỆT', 'KHÍ LÍ TƯỞNG', 'TỪ TRƯỜNG', 'HẠT NHÂN & PHÓNG XẠ']; title = 'Tốt Nghiệp THPT'; dur = 3000; }
    
    const src = questions.filter((q: Question) => t.includes(q.topic));
    if (!src.length) return alert('Chưa đủ dữ liệu');

    const pick = (k: string, n: number) => {
       const pool = src.filter((q: Question) => q.type === k);
       const b = pool.filter(q => q.level === 'Biết'), h = pool.filter(q => q.level === 'Hiểu'), v = pool.filter(q => q.level === 'Vận dụng');
       const nB = Math.ceil(n * 0.3), nH = Math.ceil(n * 0.4), nV = n - nB - nH;
       let res = [...b.sort(() => 0.5 - Math.random()).slice(0, nB), ...h.sort(() => 0.5 - Math.random()).slice(0, nH), ...v.sort(() => 0.5 - Math.random()).slice(0, nV)];
       if (res.length < n) res = [...res, ...pool.filter(q => !res.includes(q)).sort(() => 0.5 - Math.random()).slice(0, n - res.length)];
       return res.sort(() => 0.5 - Math.random());
    };

    update({ mode: 'DOING', examType: type, title, timeLeft: dur, quizQuestions: [...pick('MCQ', 18), ...pick('TrueFalse', 4), ...pick('Short', 6)], currentQIndex: 0, userAnswers: {} });
  };

  const finish = (s: any = session) => {
    let rawScore = 0, dMCQ = 0, dTF = 0, dShort = 0;
    
    s.quizQuestions.forEach((q: Question) => {
       const ans = s.userAnswers[q.id]; if (!ans) return;

       if (q.type === 'MCQ' && ans === q.answerKey) { 
           rawScore += 0.25; dMCQ += 0.25; 
       }
       else if (q.type === 'Short' && ans.toString().trim().toLowerCase() === q.answerKey.trim().toLowerCase()) { 
           rawScore += 0.25; dShort += 0.25; 
       }
       else if (q.type === 'TrueFalse') { 
           let count = 0; 
           q.subQuestions?.forEach((sq: any) => { if (ans[sq.id] === sq.isCorrect) count++; }); 
           
           let p = 0;
           if (count === 1) p = 0.1;
           else if (count === 2) p = 0.25;
           else if (count === 3) p = 0.5;
           else if (count === 4) p = 1.0;
           
           rawScore += p; dTF += p;
       }
    });

    const finalScore = Math.round(rawScore * 100) / 100; 
    onScore(finalScore, 'exam'); 
    update({ mode: 'RESULT', score: finalScore, details: { mcq: dMCQ, tf: dTF, short: dShort } });
  };

  const handleA = (v: any, s?: string) => {
      const qId = quizQuestions[currentQIndex].id;
      const currentAns = userAnswers[qId];
      if (s) update({ userAnswers: { ...userAnswers, [qId]: { ...currentAns, [s]: v } } });
      else update({ userAnswers: { ...userAnswers, [qId]: v } });
  };

  if (mode === 'MENU') return (
    <div className="p-6 pt-4 h-full flex flex-col bg-slate-50">
        <div className="flex items-center gap-3 mb-8">
            <button onClick={onBack} className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border border-slate-100"><ChevronLeft/></button>
            <div><h2 className="text-2xl font-black text-slate-800">Phòng Thi 2025</h2><p className="text-xs text-slate-400 font-bold">Chọn đề thi phù hợp với bạn</p></div>
        </div>
        <div className="space-y-4 flex-1 overflow-y-auto pb-10 custom-scrollbar">
            {['GK1', 'CK1', 'GK2', 'CK2'].map(k => (
                <button key={k} onClick={() => start(k)} className="w-full bg-white p-5 rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-200 text-left transition-all group relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-indigo-50 to-transparent rounded-bl-full -mr-4 -mt-4 group-hover:scale-110 transition-transform"></div>
                    <div className="relative z-10">
                        <div className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-1">Đề kiểm tra</div>
                        <div className="font-black text-lg text-slate-700 group-hover:text-indigo-700 transition-colors">{k === 'GK1' ? 'Giữa Kì 1' : k === 'CK1' ? 'Cuối Kì 1' : k === 'GK2' ? 'Giữa Kì 2' : 'Cuối Kì 2'}</div>
                        <div className="flex items-center gap-2 mt-3 text-xs font-bold text-slate-400"><Clock size={14}/> 45 phút <span className="w-1 h-1 bg-slate-300 rounded-full"></span> 28 câu</div>
                    </div>
                </button>
            ))}
            <button onClick={() => start('THPT')} className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white p-6 rounded-[1.5rem] shadow-lg shadow-rose-200 active:scale-95 transition-all text-left relative overflow-hidden group">
                <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2"><Crown size={20} className="text-yellow-300 fill-yellow-300 animate-bounce-short"/><span className="text-xs font-black uppercase bg-white/20 px-2 py-0.5 rounded text-white/90">Quan trọng</span></div>
                    <div className="font-black text-2xl">THI TỐT NGHIỆP THPT</div>
                    <div className="text-sm text-white/80 mt-1 font-medium">Cấu trúc chuẩn 2025 • 40 câu</div>
                    <div className="mt-4 inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl text-xs font-bold backdrop-blur-sm hover:bg-white/30 transition-colors"><Play size={14} fill="currentColor"/> Bắt đầu ngay</div>
                </div>
            </button>
        </div>
    </div>
  );

// 👇 THAY THẾ ĐOẠN if (mode === 'RESULT') TRONG ExamScreen
  if (mode === 'RESULT') {
    // 1. Tính toán số câu đúng
    const countMCQCorrect = quizQuestions.filter(q => q.type === 'MCQ' && userAnswers[q.id] === q.answerKey).length;
    const countShortCorrect = quizQuestions.filter(q => q.type === 'Short' && userAnswers[q.id]?.toString().trim().toLowerCase() === q.answerKey.trim().toLowerCase()).length;
    
    // 2. TÍNH SỐ Ý ĐÚNG CHO DẠNG ĐÚNG/SAI (Sửa đoạn này)
    let countTFCorrectIdeas = 0;
    quizQuestions.filter(q => q.type === 'TrueFalse').forEach(q => {
        const uAns = userAnswers[q.id];
        if (uAns && q.subQuestions) {
            q.subQuestions.forEach(sq => {
                // Nếu người dùng chọn đúng ý nào thì cộng ý đó
                if (uAns[sq.id] === sq.isCorrect) {
                    countTFCorrectIdeas++;
                }
            });
        }
    });

    return (
      <div className="pb-24 pt-2 px-3 h-full flex flex-col bg-slate-50">
        
        {/* 1. THẺ KẾT QUẢ */}
        <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm mb-2 shrink-0 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400"></div>
          
          <div className="flex items-center gap-3 mt-1">
              {/* CỘT TRÁI: ĐIỂM SỐ */}
              <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{title}</div>
                  <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-black text-slate-800 leading-none tracking-tighter">{score}</span>
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full mt-1">/ 10 điểm</span>
              </div>

              {/* CỘT PHẢI: THỐNG KÊ CHI TIẾT */}
              <div className="flex flex-col gap-1.5 w-32 shrink-0 border-l border-slate-100 pl-3 py-0.5">
                 {/* MCQ */}
                 <div className="flex justify-between items-center bg-blue-50 px-2 py-1.5 rounded-lg border border-blue-100">
                     <span className="text-[8px] font-black text-blue-400 uppercase">MCQ</span>
                     <div className="flex items-baseline gap-1">
                        <span className="text-[10px] font-bold text-blue-700">{countMCQCorrect}</span>
                        <span className="text-[8px] font-medium text-blue-400">({details.mcq}đ)</span>
                     </div>
                 </div>
                 
                 {/* Đ/S (Đã sửa: Hiện số Ý ĐÚNG thay vì số câu) */}
                 <div className="flex justify-between items-center bg-purple-50 px-2 py-1.5 rounded-lg border border-purple-100">
                     <span className="text-[8px] font-black text-purple-400 uppercase">Đ/S</span>
                     <div className="flex items-baseline gap-1">
                        <span className="text-[10px] font-bold text-purple-700">{countTFCorrectIdeas} ý</span>
                        <span className="text-[8px] font-medium text-purple-400">({details.tf}đ)</span>
                     </div>
                 </div>

                 {/* Điền từ */}
                 <div className="flex justify-between items-center bg-orange-50 px-2 py-1.5 rounded-lg border border-orange-100">
                     <span className="text-[8px] font-black text-orange-400 uppercase">Điền</span>
                     <div className="flex items-baseline gap-1">
                        <span className="text-[10px] font-bold text-orange-700">{countShortCorrect}</span>
                        <span className="text-[8px] font-medium text-orange-400">({details.short}đ)</span>
                     </div>
                 </div>
              </div>
          </div>
        </div>

        {/* 2. DANH SÁCH CÂU HỎI */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1 sticky top-0 bg-slate-50 py-1 z-10">Chi tiết bài làm</h3>
            
            {quizQuestions.map((q, idx) => {
                const uAns = userAnswers[q.id];
                let isCorrectMain = false;
                if (q.type === 'MCQ') isCorrectMain = uAns === q.answerKey;
                else if (q.type === 'Short') isCorrectMain = uAns?.toString().trim().toLowerCase() === q.answerKey.trim().toLowerCase();
                
                const handleAskAI = () => {
                    let content = q.promptText;
                    if (q.subQuestions) { 
                        content += "\n\nCÁC PHÁT BIỂU:"; 
                        q.subQuestions.forEach((sq, i) => { content += `\n${i+1}) ${sq.content}`; }); 
                    }
                    onCopy(generateRobokiPrompt(q.topic, `Câu ${idx+1}`, q.level, content, q.options));
                };

                return (
                    <div key={q.id} className={`bg-white rounded-xl p-3 border shadow-sm relative overflow-hidden ${isCorrectMain || (q.type === 'TrueFalse') ? 'border-slate-100' : 'border-rose-100'}`}>
                        <button onClick={handleAskAI} className="absolute top-2 right-2 text-slate-300 hover:text-purple-500 transition-colors" title="Hỏi AI"><MessageCircle size={14}/></button>

                        <div className="flex gap-2 mb-1.5">
                            <span className="bg-slate-100 text-slate-500 text-[9px] font-black px-1.5 py-0.5 rounded uppercase">Câu {idx + 1}</span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase border ${q.level === 'Biết' ? 'text-blue-600 border-blue-200 bg-blue-50' : q.level === 'Hiểu' ? 'text-orange-600 border-orange-200 bg-orange-50' : 'text-rose-600 border-rose-200 bg-rose-50'}`}>{q.level}</span>
                        </div>

                        <div className="mb-2 pr-6">
                            {q.imageUrl && <img src={q.imageUrl} className="h-16 w-full object-contain mb-2 rounded-lg border border-slate-100 bg-slate-50" />}
                            <div className="text-xs font-bold text-slate-800 leading-relaxed"><MathRender content={q.promptText}/></div>
                        </div>

                        <div className="bg-slate-50 rounded-lg p-2 text-xs border border-slate-100">
                            {q.subQuestions ? (
                                <div className="space-y-1.5">
                                    {q.subQuestions.map((sq) => {
                                        const choice = uAns ? uAns[sq.id] : undefined;
                                        const isRightSub = choice === sq.isCorrect;
                                        return (
                                            <div key={sq.id} className="flex justify-between items-start gap-2 border-b border-slate-200 last:border-0 pb-1 last:pb-0">
                                                <div className="flex-1">
                                                    <div className="scale-95 origin-top-left"><MathRender content={sq.content} /></div>
                                                    <div className="mt-0.5 flex gap-2 font-bold text-[10px]">
                                                        <span className={choice === true ? 'text-blue-600' : choice === false ? 'text-slate-500' : 'text-slate-400'}>Bạn: {choice === true ? 'Đ' : choice === false ? 'S' : '-'}</span>
                                                        <span className="text-emerald-600">| Đ.Án: {sq.isCorrect ? 'Đ' : 'S'}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-1">{isRightSub ? <CheckCircle size={12} className="text-emerald-500"/> : <XCircle size={12} className="text-rose-500"/>}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : (
                                <div className="flex flex-col gap-1 text-[11px]">
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-500 font-medium">Bạn chọn:</span>
                                        <span className={`font-bold ${isCorrectMain ? 'text-emerald-600' : 'text-rose-600'}`}>
                                            <MathRender content={uAns || 'Chưa làm'} />
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center border-t border-slate-200 pt-1 mt-1">
                                        <span className="text-slate-500 font-medium">Đáp án đúng:</span>
                                        <span className="font-bold text-emerald-600"><MathRender content={q.answerKey} /></span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>

        {/* 3. NÚT CHỨC NĂNG */}
        <div className="mt-2 flex gap-2 shrink-0 pt-2 border-t border-slate-200 bg-slate-50">
          <button onClick={() => start(examType || 'THPT')} className="w-1/3 bg-slate-800 text-white py-2.5 rounded-xl font-bold shadow-lg shadow-slate-300 flex items-center justify-center gap-2 active:scale-95 transition-all text-xs"><RotateCcw size={14}/> Làm lại</button>
          <button onClick={() => update({ mode: 'MENU' })} className="flex-1 bg-white text-slate-700 py-2.5 rounded-xl font-bold border border-slate-200 hover:bg-slate-50 transition-all text-xs">Chọn đề khác</button>
          <button onClick={onBack} className="flex-1 bg-rose-50 text-rose-600 py-2.5 rounded-xl font-bold border border-rose-100 hover:bg-rose-100 transition-all text-xs">Thoát</button>
        </div>
      </div>
    );
  }

  const q = quizQuestions[currentQIndex]; 
  const ans = userAnswers[q.id];
  const progress = ((currentQIndex + 1) / quizQuestions.length) * 100;

  return (
    <div className="flex flex-col h-full pb-20 pt-4 px-4 bg-slate-50">
      <div className="bg-white p-4 rounded-[1.5rem] shadow-sm border border-slate-100 mb-4 sticky top-4 z-20">
         <div className="flex justify-between items-center mb-3">
            <div className={`flex items-center gap-2 font-black text-lg ${timeLeft < 300 ? 'text-rose-500 animate-pulse' : 'text-slate-700'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${timeLeft<300?'bg-rose-100':'bg-slate-100'}`}><Clock size={16}/></div>
                {formatTime(timeLeft)}
            </div>

            <div className="flex gap-2">
            <button 
                disabled={currentQIndex === quizQuestions.length - 1} 
                onClick={() => update({ currentQIndex: currentQIndex + 1 })} 
                className="w-10 h-10 flex items-center justify-center bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl transition-colors disabled:opacity-30 border border-indigo-100"
                title="Câu tiếp theo"
            >
                <SkipForward size={20} fill="currentColor"/>
            </button>
                <button onClick={() => {if(confirm("Bạn chắc chắn muốn nộp bài?")) finish()}} className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md transition-colors">
                    NỘP BÀI
                </button>
            </div>
         </div>

         <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
             <div 
                className="h-full bg-indigo-500 transition-all duration-500 ease-out rounded-full" 
                style={{width: `${progress}%`}}
             ></div>
         </div>
         <div className="flex justify-between mt-1">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tiến độ</span>
             <span className="text-[10px] font-bold text-indigo-600">{currentQIndex + 1}/{quizQuestions.length}</span>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="bg-white p-6 rounded-[2rem] shadow-lg shadow-slate-200/50 border border-slate-100 mb-20 animate-fade-in relative">
              <div className="flex justify-between items-start mb-4">
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${q.type==='MCQ'?'bg-blue-50 text-blue-600':q.type==='TrueFalse'?'bg-purple-50 text-purple-600':'bg-orange-50 text-orange-600'}`}>
                      {q.type === 'MCQ' ? 'Trắc nghiệm' : q.type === 'TrueFalse' ? 'Đúng / Sai' : 'Trả lời ngắn'}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg uppercase">{q.level}</span>
              </div>
              
              <div className="mb-6">
                  {q.imageUrl && <div className="mb-4 p-2 bg-slate-50 rounded-2xl border border-slate-100"><img src={q.imageUrl} className="w-full h-48 object-contain rounded-xl mix-blend-multiply"/></div>}
                  <div className="font-bold text-slate-800 text-lg leading-relaxed"><MathRender content={q.promptText}/></div>
              </div>

              <div className="space-y-3">
                 {q.type === 'MCQ' ? q.options?.map((o: string, i: number) => (
                    <button key={i} onClick={() => handleA(o)} className={`w-full p-4 rounded-2xl border-2 text-left text-sm font-bold transition-all relative overflow-hidden group ${ans === o ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-md' : 'bg-white border-slate-100 text-slate-600 hover:border-indigo-200 hover:bg-slate-50'}`}>
                        <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${ans === o ? 'bg-indigo-500' : 'bg-transparent group-hover:bg-indigo-200'}`}></div>
                        <span className={`inline-flex w-6 h-6 items-center justify-center rounded-full text-xs mr-2 ${ans === o ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-white group-hover:shadow-sm'}`}>{String.fromCharCode(65 + i)}</span>
                        <MathRender content={o}/>
                    </button>
                 )) 
                 : q.type === 'TrueFalse' ? q.subQuestions?.map((sq: any) => (
                    <div key={sq.id} className="p-4 border border-slate-100 rounded-2xl bg-slate-50/50">
                        <div className="text-sm font-bold text-slate-700 mb-3 leading-snug"><MathRender content={sq.content}/></div>
                        <div className="flex gap-2 bg-white p-1 rounded-xl shadow-sm border border-slate-100">
                            <button onClick={() => handleA(true, sq.id)} className={`flex-1 py-2.5 rounded-lg text-xs font-black transition-all ${ans?.[sq.id] === true ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'}`}>ĐÚNG</button>
                            <button onClick={() => handleA(false, sq.id)} className={`flex-1 py-2.5 rounded-lg text-xs font-black transition-all ${ans?.[sq.id] === false ? 'bg-rose-500 text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'}`}>SAI</button>
                        </div>
                    </div>
                 )) 
                 : <div className="relative"><input value={ans || ''} onChange={e => handleA(e.target.value)} className="w-full p-5 rounded-2xl border-2 border-orange-100 font-bold text-center text-xl text-slate-700 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all placeholder:text-slate-300" placeholder="Nhập đáp án..."/><div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300"><Type size={20}/></div></div>}
              </div>
          </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-4 z-30 max-w-md mx-auto flex gap-3 pb-8">
          <button disabled={currentQIndex === 0} onClick={() => update({ currentQIndex: currentQIndex - 1 })} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-400 disabled:opacity-30 hover:bg-slate-100 hover:text-slate-600 transition-colors"><ChevronLeft/></button>
          <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-200 p-2 flex gap-1.5 overflow-x-auto no-scrollbar items-center">
              {quizQuestions.map((_, i) => {
                  const isDone = userAnswers[quizQuestions[i].id];
                  return <div key={i} onClick={() => update({ currentQIndex: i })} className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-xl text-[10px] font-black cursor-pointer transition-all ${i === currentQIndex ? 'bg-slate-800 text-white scale-110 shadow-md' : isDone ? 'bg-indigo-100 text-indigo-600 border border-indigo-200' : 'bg-white text-slate-300 border border-slate-100'}`}>{i + 1}</div>
              })}
          </div>
          <button disabled={currentQIndex === quizQuestions.length-1} onClick={() => update({ currentQIndex: currentQIndex + 1 })} className="p-4 bg-slate-800 text-white rounded-2xl shadow-lg shadow-slate-300 disabled:opacity-50 disabled:shadow-none active:scale-95 transition-all"><ChevronRight/></button>
      </div>
    </div>
  );
};

// 5. GAME SCREEN
const GameScreen: React.FC<{
  onCopy: (txt: string) => void,
  onScore: (pts: number, type?: 'game'|'practice'|'exam'|'challenge'|'mock') => void,
  sessionData: GameSessionData,
  setSessionData: React.Dispatch<React.SetStateAction<GameSessionData>>,
  questions: Question[]
}> = ({ onCopy, onScore, sessionData, setSessionData, questions }) => {
  const {
    gameType, mode, score, timeLeft, currentQ, isCorrect,
    wheelRotation, isSpinning, pendingPoints, showWheelQuestion,
    selectedSpeedOpt, correctCount, totalAnswered, spinsLeft,
    millionaireQuestions, currentMilLevel, milHiddenOptions, lifelines
  } = sessionData;

  const [wheelInput, setWheelInput] = useState('');
  const [milInput, setMilInput] = useState('');

  // --- TIMER CHO SPEED GAME ---
  useEffect(() => {
    let timer: any;
    if (gameType === 'SPEED' && mode === 'PLAYING' && timeLeft > 0) {
      timer = setInterval(() => {
        setSessionData(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    } else if (gameType === 'SPEED' && timeLeft === 0 && mode === 'PLAYING') {
      setSessionData(prev => ({ ...prev, mode: 'RESULT' }));
      if(score > 0) onScore(score, 'game');
    }
    return () => clearInterval(timer);
  }, [gameType, mode, timeLeft]);

  // --- HÀM CHO AI LÀ TRIỆU PHÚ ---
  const startMillionaireGame = () => {
    const validQuestions = questions.filter(q => q.type !== 'TrueFalse');

    const getQs = (level: string, count: number) => {
        const pool = validQuestions.filter(q => q.level === level);
        return pool.sort(() => Math.random() - 0.5).slice(0, count);
    };

    const easy = getQs('Biết', 5);
    const medium = getQs('Hiểu', 5);
    const hard = getQs('Vận dụng', 5);
    
    if (easy.length < 5 || medium.length < 5 || hard.length < 5) {
        alert("Chưa đủ dữ liệu câu hỏi để tạo game (Cần 5 câu mỗi mức độ).");
        return;
    }

    const gameQs = [...easy, ...medium, ...hard];

    setSessionData({
      ...INITIAL_GAME_STATE,
      gameType: 'MILLIONAIRE',
      mode: 'PLAYING',
      millionaireQuestions: gameQs,
      currentMilLevel: 0,
      score: 0,
      milHiddenOptions: [],
      lifelines: { fifty: true, hint: true, skip: true }
    });
  };

  const handleMillionaireAnswer = (ans: string) => {
      const currentQ = millionaireQuestions[currentMilLevel];
      const isRight = currentQ.type === 'Short' 
          ? ans.trim().toLowerCase() === currentQ.answerKey.trim().toLowerCase()
          : ans === currentQ.answerKey;

      if (isRight) {
          const points = MILLIONAIRE_LADDER[currentMilLevel];
          
          if (currentMilLevel === 14) {
              setSessionData(prev => ({ ...prev, mode: 'RESULT', score: points, isCorrect: true }));
              onScore(points, 'game');
          } else {
              setSessionData(prev => ({ 
                  ...prev, 
                  score: points,
                  isCorrect: true, 
              }));

              setTimeout(() => {
                  setSessionData(prev => ({ 
                      ...prev,
                      currentMilLevel: prev.currentMilLevel + 1,
                      milHiddenOptions: [], 
                      isCorrect: null
                  }));
                  setMilInput(''); 
              }, 1500);
          }
      } else {
          let safeScore = 0;
          if (currentMilLevel >= 10) safeScore = MILLIONAIRE_LADDER[9];
          else if (currentMilLevel >= 5) safeScore = MILLIONAIRE_LADDER[4];
          
          setSessionData(prev => ({ ...prev, mode: 'RESULT', score: safeScore, isCorrect: false }));
          if(safeScore > 0) onScore(safeScore, 'game');
      }
  };

  // --- QUYỀN TRỢ GIÚP ---
  const useFiftyFifty = () => {
      if (!lifelines.fifty) return;
      const currentQ = millionaireQuestions[currentMilLevel];
      if (currentQ.type !== 'MCQ' || !currentQ.options) return;

      const wrongOptions = currentQ.options.filter(o => o !== currentQ.answerKey);
      const hidden = wrongOptions.sort(() => Math.random() - 0.5).slice(0, 2);
      
      setSessionData(prev => ({ 
          ...prev, 
          milHiddenOptions: hidden, 
          lifelines: { ...prev.lifelines, fifty: false } 
      }));
  };

  const useHint = () => {
      if (!lifelines.hint) return;
      const currentQ = millionaireQuestions[currentMilLevel];
      alert(`💡 Tổ tư vấn gợi ý đáp án đúng là: ${currentQ.answerKey}`);
      setSessionData(prev => ({ ...prev, lifelines: { ...prev.lifelines, hint: false } }));
  };

  const useSkip = () => {
      if (!lifelines.skip) return;
      if (currentMilLevel === 14) {
          setSessionData(prev => ({ ...prev, mode: 'RESULT', isCorrect: true }));
          onScore(score, 'game');
      } else {
          setSessionData(prev => ({ 
              ...prev, 
              currentMilLevel: prev.currentMilLevel + 1,
              milHiddenOptions: [],
              lifelines: { ...prev.lifelines, skip: false }
          }));
      }
  };

  const stopMillionaire = () => {
      const finalScore = score;
      setSessionData(prev => ({ ...prev, mode: 'RESULT', isCorrect: true })); 
      if(finalScore > 0) onScore(finalScore, 'game');
  }

  // --- HÀM CHO VÒNG QUAY ---
  const WHEEL_SEGMENTS = [
    { type: 'POINT', value: 10, label: '10', color: '#3b82f6', text: 'white' },
    { type: 'MINUS', value: 5, label: '-5', color: '#ef4444', text: 'white' },
    { type: 'POINT', value: 2, label: '2', color: '#10b981', text: 'white' },
    { type: 'TURN', value: 1, label: '+1 Lượt', color: '#f59e0b', text: 'white' },
    { type: 'POINT', value: 3, label: '3', color: '#8b5cf6', text: 'white' },
    { type: 'MISS', value: 0, label: 'Mất lượt', color: '#64748b', text: 'white' },
    { type: 'POINT', value: 4, label: '4', color: '#06b6d4', text: 'white' },
    { type: 'POINT', value: 6, label: '6', color: '#ec4899', text: 'white' },
  ];
  const SEGMENT_ANGLE = 360 / WHEEL_SEGMENTS.length;

  const spinWheel = () => {
    if (isSpinning || spinsLeft <= 0) return;
    setSessionData(prev => ({ ...prev, spinsLeft: prev.spinsLeft - 1, isSpinning: true }));
    const extraSpins = 1800 + Math.random() * 1800;
    const newRotation = wheelRotation + extraSpins;
    setSessionData(prev => ({ ...prev, wheelRotation: newRotation }));

    setTimeout(() => {
       const actualAngle = newRotation % 360;
       const degreesUnderPointer = (360 - actualAngle) % 360;
       const index = Math.floor(degreesUnderPointer / SEGMENT_ANGLE);
       const segment = WHEEL_SEGMENTS[index >= WHEEL_SEGMENTS.length ? 0 : index];

       if (segment.type === 'POINT') {
         const validQs = questions.filter(q => q.type !== 'TrueFalse');
         const randomQ = validQs[Math.floor(Math.random() * validQs.length)];
         
         setWheelInput(''); 
         setSessionData(prev => ({ ...prev, isSpinning: false, pendingPoints: segment.value, showWheelQuestion: true, currentQ: randomQ, isCorrect: null }));
       } else if (segment.type === 'TURN') {
         setSessionData(prev => ({ ...prev, isSpinning: false, spinsLeft: prev.spinsLeft + 1 }));
         alert("Chúc mừng! +1 lượt quay! 🎉");
       } else if (segment.type === 'MINUS') {
         setSessionData(prev => ({ ...prev, isSpinning: false, score: Math.max(0, prev.score - segment.value) }));
         alert(`Bị trừ ${segment.value} điểm 😭`);
       } else {
         setSessionData(prev => ({ ...prev, isSpinning: false }));
         alert("Mất lượt 😅");
       }
       
       if (spinsLeft - 1 <= 0 && segment.type !== 'POINT') { setTimeout(() => setSessionData(prev => ({ ...prev, mode: 'RESULT' })), 1000); }
    }, 3000);
  };

  const startSpeedGame = () => {
    const validQs = questions.filter(q => q.type !== 'TrueFalse');
    setSessionData({ ...INITIAL_GAME_STATE, gameType: 'SPEED', mode: 'PLAYING', score: 0, timeLeft: 60, currentQ: validQs[Math.floor(Math.random() * validQs.length)] });
  };
  const startWheelGame = () => {
    setSessionData({ ...INITIAL_GAME_STATE, gameType: 'WHEEL', mode: 'PLAYING', wheelRotation: 0, spinsLeft: 5, score: 0 });
  };
  const submitSpeedAnswer = () => { 
    if (!currentQ || !selectedSpeedOpt) return;
    const isRight = currentQ.type==='Short' ? selectedSpeedOpt.trim().toLowerCase()===currentQ.answerKey.trim().toLowerCase() : selectedSpeedOpt===currentQ.answerKey;
    setSessionData(prev => ({ ...prev, score: isRight ? prev.score + 2 : Math.max(0, prev.score - 1), correctCount: isRight ? prev.correctCount + 1 : prev.correctCount, totalAnswered: prev.totalAnswered + 1, isCorrect: isRight }));
    if (isRight) onScore(1, 'game');
    
    // Next question (No TrueFalse)
    const validQs = questions.filter(q => q.type !== 'TrueFalse');
    setTimeout(() => { setSessionData(prev => ({ ...prev, currentQ: validQs[Math.floor(Math.random() * validQs.length)], isCorrect: null, selectedSpeedOpt: null })); }, 800);
  };
  // 👇 THAY THẾ HÀM handleWheelAnswer TRONG GameScreen
  const handleWheelAnswer = (opt: string) => {
     if (!currentQ) return;
     const isRight = currentQ.type==='Short' ? opt.trim().toLowerCase()===currentQ.answerKey.trim().toLowerCase() : opt===currentQ.answerKey;
     
     if (isRight) {
        // ✅ ĐÃ SỬA: Cộng đúng số điểm quay được vào XP (pendingPoints)
        onScore(pendingPoints, 'game'); 
        
        setSessionData(prev => ({ ...prev, isCorrect: true, score: prev.score + pendingPoints }));
        setTimeout(() => { setSessionData(prev => { if (prev.spinsLeft <= 0) return { ...prev, showWheelQuestion: false, isCorrect: null, currentQ: null, mode: 'RESULT' }; return { ...prev, showWheelQuestion: false, isCorrect: null, currentQ: null }; }); }, 1000);
     } else {
        setSessionData(prev => ({ ...prev, isCorrect: false }));
        setTimeout(() => { setSessionData(prev => { if (prev.spinsLeft <= 0) return { ...prev, showWheelQuestion: false, isCorrect: null, currentQ: null, mode: 'RESULT' }; return { ...prev, showWheelQuestion: false, isCorrect: null, currentQ: null }; }); }, 1500);
     }
  };

  // --- RENDER MENU ---
  if (mode === 'MENU') {
    return (
      <div className="p-6 h-full flex flex-col justify-start pt-4 space-y-6">
         <div className="text-center mb-2"><h2 className="text-2xl font-black text-slate-800">Chọn trò chơi</h2></div>
         <div className="space-y-4">
             {/* SPEED */}
             <button onClick={startSpeedGame} className="w-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white p-6 rounded-3xl shadow-lg shadow-indigo-200 active:scale-95 transition-all flex items-center gap-5 relative overflow-hidden group border border-indigo-400/30">
                <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-inner shrink-0"><Timer size={36} className="text-indigo-100" /></div>
                <div className="text-left flex-1 min-w-0"><div className="font-black text-xl mb-1 truncate">Thử thách Tốc độ</div><div className="text-indigo-100 text-sm font-medium">60 giây trả lời cực nhanh</div></div>
             </button>
             {/* WHEEL */}
             <button onClick={startWheelGame} className="w-full bg-gradient-to-br from-rose-500 to-pink-600 text-white p-6 rounded-3xl shadow-lg shadow-rose-200 active:scale-95 transition-all flex items-center gap-5 relative overflow-hidden group border border-rose-400/30">
                <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-inner shrink-0"><Target size={36} className="text-rose-100" /></div>
                <div className="text-left flex-1 min-w-0"><div className="font-black text-xl mb-1 truncate">Vòng quay May mắn</div><div className="text-rose-100 text-sm font-medium">Quay số nhận câu hỏi</div></div>
             </button>
             {/* MILLIONAIRE */}
             <button onClick={startMillionaireGame} className="w-full bg-gradient-to-br from-amber-400 to-orange-500 text-white p-6 rounded-3xl shadow-lg shadow-amber-200 active:scale-95 transition-all flex items-center gap-5 relative overflow-hidden group border border-amber-400/30">
                <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-inner shrink-0"><Coins size={36} className="text-amber-100" /></div>
                <div className="text-left flex-1 min-w-0"><div className="font-black text-xl mb-1 truncate">Ai Là Triệu Phú</div><div className="text-amber-100 text-sm font-medium">15 câu hỏi - Điểm thưởng lớn</div></div>
             </button>
         </div>
      </div>
    );
  }

  // --- RENDER MILLIONAIRE GAME ---
  if (gameType === 'MILLIONAIRE') {
      if (mode === 'RESULT') {
          return (
              <div className="p-6 h-full flex flex-col overflow-y-auto pb-24 bg-slate-900 text-white">
                  <div className="flex flex-col items-center justify-center text-center space-y-6 pt-10">
                      <div className="w-32 h-32 bg-amber-500/20 rounded-full flex items-center justify-center border-4 border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.5)]">
                          <Trophy size={64} className="text-amber-400" />
                      </div>
                      <div>
                          <h2 className="text-3xl font-black text-amber-400 mb-2">{isCorrect ? 'CHÚC MỪNG!' : 'DỪNG CUỘC CHƠI'}</h2>
                          <p className="text-slate-300 text-sm">Bạn ra về với số điểm</p>
                      </div>
                      <div className="text-6xl font-black text-white drop-shadow-md">{score}</div>
                  </div>
                  <div className="mt-10 space-y-3">
                      <button onClick={startMillionaireGame} className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 py-4 rounded-2xl font-black shadow-lg shadow-amber-500/20 transition-all">CHƠI LẠI</button>
                      <button onClick={() => setSessionData(prev => ({...prev, mode: 'MENU'}))} className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 py-4 rounded-2xl font-bold border border-slate-700 transition-all">MENU CHÍNH</button>
                  </div>
              </div>
          )
      }

      const currentQ = millionaireQuestions[currentMilLevel];
      return (
          <div className="h-full flex flex-col bg-slate-900 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: 'radial-gradient(circle at 50% 50%, #f59e0b 0%, transparent 50%)'}}></div>

              <div className="p-4 flex justify-between items-center z-10 border-b border-white/10 bg-slate-900/50 backdrop-blur-md">
                  <button onClick={() => { if(confirm("Bạn muốn dừng cuộc chơi và bảo toàn điểm số?")) stopMillionaire(); }} className="flex items-center gap-2 bg-rose-500/20 text-rose-400 px-3 py-1.5 rounded-full text-xs font-bold border border-rose-500/30 hover:bg-rose-500/30"><StopIcon size={14}/> Dừng cuộc chơi</button>
                  <div className="flex items-center gap-1 text-amber-400 font-black"><Coins size={16}/> {score}</div>
              </div>

              <div className="flex-1 flex flex-col p-4 z-10 overflow-y-auto">
                  <div className="flex justify-center gap-1 mb-6">
                      {MILLIONAIRE_LADDER.map((pts, i) => (
                          <div key={i} className={`h-1.5 rounded-full transition-all ${i < currentMilLevel ? 'w-2 bg-emerald-500' : i === currentMilLevel ? 'w-6 bg-amber-500 shadow-[0_0_10px_#f59e0b]' : 'w-2 bg-slate-700'}`}></div>
                      ))}
                  </div>

                  <div className="bg-slate-800 border-2 border-amber-500/50 rounded-3xl p-6 text-center shadow-[0_0_20px_rgba(245,158,11,0.1)] mb-6 relative">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-amber-400 text-xs font-black px-4 py-1 rounded-full border border-amber-500/50">CÂU {currentMilLevel + 1}</div>
                      <div className="text-lg font-bold leading-relaxed"><MathRender content={currentQ.promptText}/></div>
                  </div>

                  <div className="space-y-3 flex-1">
                      {currentQ.type === 'MCQ' ? (
                          currentQ.options?.map((opt, i) => {
                             const isHidden = milHiddenOptions.includes(opt);
                             return (
                                 <button 
                                    key={i} 
                                    disabled={isHidden || isCorrect !== null}
                                    onClick={() => handleMillionaireAnswer(opt)}
                                    className={`w-full p-4 rounded-xl border border-white/10 text-left font-bold transition-all relative overflow-hidden group ${isHidden ? 'opacity-0 pointer-events-none' : isCorrect === true && opt === currentQ.answerKey ? 'bg-emerald-600 border-emerald-400' : isCorrect === false && opt === currentQ.answerKey ? 'bg-emerald-600 border-emerald-400 animate-pulse' : 'bg-slate-800 hover:bg-slate-700'}`}
                                 >
                                     <span className="text-amber-500 mr-2">{String.fromCharCode(65+i)}:</span>
                                     <MathRender content={opt}/>
                                 </button>
                             )
                          })
                      ) : (
                          <div className="flex flex-col gap-3">
                              <input type="text" value={milInput} onChange={(e) => setMilInput(e.target.value)} placeholder="Nhập đáp án..." className="w-full p-4 rounded-xl bg-slate-800 border border-white/20 text-center font-bold text-lg text-white focus:border-amber-500 outline-none"/>
                              <button onClick={() => handleMillionaireAnswer(milInput)} className="w-full bg-amber-500 text-slate-900 font-black py-3 rounded-xl shadow-lg hover:bg-amber-400 transition-colors">CHỐT ĐÁP ÁN</button>
                          </div>
                      )}
                  </div>
              </div>

              <div className="p-4 border-t border-white/10 flex justify-center gap-4 bg-slate-900/80 backdrop-blur-md">
                  <button 
                      onClick={useFiftyFifty}
                      disabled={!lifelines.fifty || currentQ.type !== 'MCQ'}
                      className={`flex flex-col items-center gap-1 ${!lifelines.fifty ? 'opacity-30 grayscale' : 'hover:scale-105 transition-transform'}`}
                  >
                      <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center font-black text-xs bg-slate-800">50:50</div>
                      <span className="text-[10px] text-slate-400 font-bold">Bỏ 2 sai</span>
                  </button>
                  <button 
                      onClick={useHint}
                      disabled={!lifelines.hint}
                      className={`flex flex-col items-center gap-1 ${!lifelines.hint ? 'opacity-30 grayscale' : 'hover:scale-105 transition-transform'}`}
                  >
                      <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center font-black text-xs bg-slate-800"><PhoneCall size={18}/></div>
                      <span className="text-[10px] text-slate-400 font-bold">Gợi ý</span>
                  </button>
                  <button 
                      onClick={useSkip}
                      disabled={!lifelines.skip}
                      className={`flex flex-col items-center gap-1 ${!lifelines.skip ? 'opacity-30 grayscale' : 'hover:scale-105 transition-transform'}`}
                  >
                      <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center font-black text-xs bg-slate-800"><ArrowBigRight size={20}/></div>
                      <span className="text-[10px] text-slate-400 font-bold">Qua câu</span>
                  </button>
              </div>
          </div>
      );
  }

  // --- RENDER CÁC GAME KHÁC (GIỮ NGUYÊN) ---
  if (gameType === 'SPEED') {
    if (mode === 'RESULT') {
        const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
        return (
          <div className="p-6 h-full flex flex-col overflow-y-auto pb-24 bg-slate-50">
             <div className="flex flex-col items-center justify-center text-center space-y-4 animate-fade-in mb-8 pt-4">
                <div className="relative"><Trophy size={80} className="text-yellow-400 fill-yellow-400 animate-bounce-short" /><div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-black px-2 py-0.5 rounded-full whitespace-nowrap">Hết giờ!</div></div>
                <div><h2 className="text-6xl font-black text-slate-800 my-1">{score}</h2><p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Tổng điểm đạt được</p></div>
             </div>
             <div className="grid grid-cols-2 gap-3 mb-8">
                 <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center"><div className="text-slate-400 text-[10px] font-bold uppercase mb-1">Đã làm</div><div className="text-2xl font-black text-slate-800">{totalAnswered} <span className="text-xs text-slate-400 font-medium">câu</span></div></div>
                 <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center"><div className="text-slate-400 text-[10px] font-bold uppercase mb-1">Chính xác</div><div className="text-2xl font-black text-emerald-500">{accuracy}%</div></div>
             </div>
             <button onClick={startSpeedGame} className="w-full bg-slate-800 text-white py-4 rounded-3xl font-bold shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 mb-3"><RotateCcw size={20}/> Chơi lại ngay</button>
             <button onClick={() => setSessionData(prev => ({...prev, mode: 'MENU'}))} className="w-full bg-white text-slate-500 py-3 rounded-3xl font-bold border border-slate-200 hover:bg-slate-50 transition-colors">Quay về menu</button>
          </div>
        );
    }
    return (
        <div className="flex flex-col h-full pb-20 pt-4 px-4 bg-slate-50 overflow-hidden">
           <div className="flex items-center justify-between mb-4 shrink-0">
             <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-2"><Timer size={18} className="text-rose-500"/><span className={`font-black text-xl ${timeLeft < 10 ? 'text-rose-500' : 'text-slate-700'}`}>{timeLeft}s</span></div>
             <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-2"><Star size={18} className="text-yellow-400 fill-yellow-400"/><span className="font-black text-xl text-slate-700">{score}</span></div>
             <button onClick={() => setSessionData(prev => ({...prev, mode: 'RESULT'}))} className="bg-rose-500 text-white p-2 rounded-full shadow-md active:scale-95"><StopIcon size={20} fill="currentColor"/></button>
           </div>
           {currentQ && (
             <div className="flex-1 flex flex-col min-h-0">
                <div className="bg-white p-5 rounded-3xl shadow-lg border border-slate-100 flex-1 flex flex-col animate-fade-in relative mb-4 overflow-y-auto">
                      <button onClick={() => onCopy(generateRobokiPrompt(currentQ.topic, `Câu hỏi tốc độ`, currentQ.level, currentQ.promptText, currentQ.options))} className="absolute top-4 right-4 text-slate-300 hover:text-roboki-500 transition-colors z-10"><Copy size={18} /></button>
                      <div className="shrink-0 mb-4 text-center"><span className="bg-slate-100 text-slate-500 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider">{currentQ.level}</span></div>
                      
                      <div className="my-auto flex flex-col items-center">
                          {currentQ.imageUrl && (
                            <img src={currentQ.imageUrl} alt="Question Image" className="w-full h-auto rounded-xl mb-4 border border-slate-200 object-contain max-h-48" />
                          )}
                          <div className="font-black text-lg text-slate-800 text-center leading-relaxed"><MathRender content={currentQ.promptText}/></div>
                      </div>

                </div>
                <div className="shrink-0 mb-4">
                    {isCorrect !== null && (<div className={`absolute inset-0 z-20 flex items-center justify-center bg-black/10 backdrop-blur-[1px] rounded-3xl transition-all`}><div className={`transform scale-125 p-4 rounded-full shadow-xl ${isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>{isCorrect ? <CheckCircle size={40} /> : <XCircle size={40} />}</div></div>)}
                    {currentQ.type === 'MCQ' && (<div className="grid grid-cols-2 gap-3">{currentQ.options?.map((opt, i) => (<button key={i} onClick={() => setSessionData(prev => ({ ...prev, selectedSpeedOpt: opt }))} className={`p-4 rounded-2xl font-bold text-sm transition-all border-2 active:scale-95 ${selectedSpeedOpt === opt ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-md' : 'bg-white border-slate-100 hover:border-indigo-200 text-slate-600'}`}><MathRender content={opt}/></button>))}</div>)}
                    {currentQ.type === 'TrueFalse' && <div className="text-center text-slate-400 font-bold">Loại câu hỏi này không hỗ trợ trong game.</div>}
                    {currentQ.type === 'Short' && (<div className="relative"><input type="text" autoFocus value={selectedSpeedOpt || ''} onChange={(e) => setSessionData(prev => ({ ...prev, selectedSpeedOpt: e.target.value }))} placeholder="Nhập đáp án..." className="w-full p-5 rounded-3xl border-2 border-slate-200 text-center font-bold text-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-800"/><div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none"><Type size={20}/></div></div>)}
                </div>
                <button onClick={submitSpeedAnswer} disabled={!selectedSpeedOpt || isCorrect !== null} className="w-full bg-slate-800 text-white py-4 rounded-3xl font-bold shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:shadow-none disabled:transform-none shrink-0">{isCorrect !== null ? (isCorrect ? 'Chính xác!' : 'Sai rồi!') : 'Nộp bài ngay'} <ArrowRight size={20}/></button>
             </div>
           )}
        </div>
      );
  }

  if (gameType === 'WHEEL') {
      if (mode === 'RESULT') {
        return (
          <div className="p-6 h-full flex flex-col overflow-y-auto pb-24 bg-slate-50">
             <div className="flex flex-col items-center justify-center text-center space-y-4 animate-fade-in mb-8 pt-10">
                <div className="relative"><Frown size={80} className="text-rose-400 animate-bounce-short" /><div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-black px-2 py-0.5 rounded-full whitespace-nowrap">Kết thúc!</div></div>
                <div><h2 className="text-4xl font-black text-slate-800 my-1">Tiếc quá!</h2><p className="text-slate-500 text-sm font-medium">Bạn đã trả lời sai câu hỏi.</p></div>
             </div>
             <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center mb-8"><div className="text-slate-400 text-xs font-bold uppercase mb-2">Tổng điểm đạt được</div><div className="text-5xl font-black text-roboki-500">{score}</div></div>
             <button onClick={startWheelGame} className="w-full bg-slate-800 text-white py-4 rounded-3xl font-bold shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 mb-3"><RotateCcw size={20}/> Chơi lại ngay</button>
             <button onClick={() => setSessionData(prev => ({...prev, mode: 'MENU'}))} className="w-full bg-white text-slate-500 py-3 rounded-3xl font-bold border border-slate-200 hover:bg-slate-50 transition-colors">Quay về menu</button>
          </div>
        );
      }
      return (
        <div className="pb-24 pt-4 px-4 h-full flex flex-col bg-slate-50 relative overflow-hidden">
           <div className="flex justify-between items-center z-10">
             <button onClick={() => setSessionData(prev => ({...prev, mode: 'MENU'}))} className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border border-slate-100"><ChevronLeft size={20}/></button>
             <div className="flex gap-2">
                 <div className="bg-white px-3 py-1.5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-1"><RotateCcw size={16} className="text-indigo-500"/><span className="font-black text-slate-700">{spinsLeft}</span></div>
                 <div className="bg-white px-3 py-1.5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-1"><Star size={16} className="text-yellow-400 fill-yellow-400"/><span className="font-black text-slate-700">{score}</span></div>
                 <button onClick={() => setSessionData(prev => ({...prev, mode: 'RESULT'}))} className="bg-rose-50 text-rose-500 p-1.5 rounded-full shadow-sm border border-rose-100 active:scale-95"><StopIcon size={18} fill="currentColor"/></button>
             </div>
           </div>
           <div className="flex-1 flex flex-col items-center justify-center relative">
               <div className="relative w-80 h-80">
                   <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20"><div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-slate-800 drop-shadow-md"></div></div>
                   <div className="w-full h-full rounded-full border-[6px] border-white shadow-xl overflow-hidden relative transition-transform will-change-transform" style={{ transform: `rotate(${wheelRotation}deg)`, transitionDuration: isSpinning ? '3000ms' : '0ms', transitionTimingFunction: 'cubic-bezier(0.2, 0, 0.1, 1)' }}>
                       <div className="absolute inset-0 w-full h-full rounded-full" style={{background: `conic-gradient(${WHEEL_SEGMENTS.map((seg, i) => `${seg.color} ${i * SEGMENT_ANGLE}deg ${(i + 1) * SEGMENT_ANGLE}deg`).join(', ')})`}}></div>
                       {WHEEL_SEGMENTS.map((_, index) => (<div key={index} className="absolute top-0 left-1/2 w-[2px] h-1/2 bg-white/20 origin-bottom" style={{ transform: `translateX(-50%) rotate(${index * SEGMENT_ANGLE}deg)` }}></div>))}
                       {WHEEL_SEGMENTS.map((seg, i) => { const rotation = (i * SEGMENT_ANGLE) + (SEGMENT_ANGLE / 2); return (<div key={i} className="absolute top-1/2 left-1/2 flex justify-center items-center" style={{width: '40px', height: '20px', transformOrigin: 'center center', transform: `rotate(${rotation}deg) translate(0, -110px)`}}><span className="text-white font-black text-lg drop-shadow-md whitespace-nowrap">{seg.label}</span></div>) })}
                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-md z-10 flex items-center justify-center"><Gift className="text-roboki-500" size={24}/></div>
                   </div>
               </div>
               {!isSpinning && pendingPoints === 0 && !showWheelQuestion && wheelRotation > 0 && (<div className="mt-8 text-slate-500 font-bold animate-bounce-short flex items-center gap-2"><Frown /> Tiếc quá, mất lượt rồi!</div>)}
               <button onClick={spinWheel} disabled={isSpinning || showWheelQuestion} className="mt-10 bg-slate-800 text-white px-10 py-4 rounded-full font-black shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 text-base tracking-wide flex items-center gap-2 hover:bg-slate-900">{isSpinning ? <RotateCcw className="animate-spin" size={20}/> : <Play fill="currentColor" size={20}/>}{isSpinning ? 'ĐANG QUAY...' : `QUAY NGAY (${spinsLeft})`}</button>
           </div>
           {showWheelQuestion && currentQ && (
               <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
                   <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl relative">
                       <div className="text-center mb-4"><div className="text-xs font-black uppercase text-slate-400">Cơ hội nhận</div><div className="text-4xl font-black text-rose-500 drop-shadow-sm">+{pendingPoints}</div><div className="text-xs font-bold text-rose-300">điểm</div></div>
                       <button onClick={() => onCopy(generateRobokiPrompt(currentQ.topic, `Câu hỏi may mắn`, currentQ.level, currentQ.promptText, currentQ.options))} className="absolute top-4 right-4 text-slate-300 hover:text-roboki-500 transition-colors bg-slate-50 p-2 rounded-full"><Copy size={18} /></button>
                       <div className="mb-6">{currentQ.imageUrl && (<div className="mb-4 flex justify-center p-2"><img src={currentQ.imageUrl} alt="Hình minh họa" className="rounded-lg max-h-48 object-contain w-full" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}/></div>)}<div className="font-bold text-slate-800 text-center leading-relaxed"><MathRender content={currentQ.promptText}/></div></div>
                       <div className="space-y-3">
                           {currentQ.type === 'Short' ? (<div className="flex flex-col gap-2"><input type="text" value={wheelInput} onChange={(e) => setWheelInput(e.target.value)} placeholder="Nhập đáp án..." className="w-full p-4 rounded-xl border-2 border-indigo-200 text-center font-bold text-lg focus:border-indigo-500 outline-none text-slate-700"/><button disabled={isCorrect !== null} onClick={() => handleWheelAnswer(wheelInput)} className="w-full bg-indigo-500 text-white py-3 rounded-xl font-bold shadow-md active:scale-95">Trả lời</button></div>) : (currentQ.options?.map((opt, i) => (<button key={i} disabled={isCorrect !== null} onClick={() => handleWheelAnswer(opt)} className={`w-full p-4 rounded-xl border-2 font-bold text-sm transition-all ${isCorrect === true && opt === currentQ.answerKey ? 'bg-emerald-50 border-emerald-500 text-white' : isCorrect === false ? 'bg-white border-slate-100 opacity-50' : 'bg-white border-slate-100 hover:bg-slate-50 hover:border-roboki-200'}`}><MathRender content={opt}/></button>)))}
                       </div>
                       {isCorrect === true && <div className="mt-4 text-center text-emerald-600 font-black animate-bounce-short">Chính xác! +{pendingPoints} điểm</div>}
                       {isCorrect === false && <div className="mt-4 text-center text-rose-600 font-black">Sai rồi! Rất tiếc.</div>}
                   </div>
               </div>
           )}
        </div>
      );
  }
  return null;
};

// 7. LEADERBOARD SCREEN (ĐÃ TỐI ƯU: DÙNG SESSION STORAGE ĐỂ TIẾT KIỆM READ)
const LeaderboardScreen: React.FC<{ onBack: () => void; currentUser: UserProfile }> = ({ onBack, currentUser }) => {
  const [filter, setFilter] = useState<'CLASS' | 'SCHOOL' | 'ALL'>('CLASS');
  const [category, setCategory] = useState<'TOTAL' | 'PRACTICE' | 'MOCK' | 'EXAM' | 'GAME' | 'CHALLENGE'>('TOTAL');
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState<any[]>([]);
  // 👇👇👇 THÊM DÒNG NÀY ĐỂ SỬA LỖI setMyExactRank 👇👇👇
  const [myExactRank, setMyExactRank] = useState<number | null>(null);
  // State quản lý Popup xem cấp độ
  const [showRankInfo, setShowRankInfo] = useState(false);
  const [infoTab, setInfoTab] = useState<'RANKS' | 'BADGES'>('RANKS');

// --- 1. DỮ LIỆU CẤP ĐỘ (ĐÃ TĂNG ĐỘ KHÓ - HARD MODE) ---
  
  // 🌌 TỔNG HỢP: Max cũ 10k -> Max mới 50k (Cày rất lâu mới max)
  const TOTAL_RANKS = [
      { min: 50000, label: 'ĐA VŨ TRỤ', icon: '🌌', color: 'text-purple-600' },
      { min: 42000, label: 'VÔ CỰC', icon: '♾️', color: 'text-fuchsia-600' },
      { min: 35000, label: 'THỜI GIAN', icon: '⏳', color: 'text-teal-600' },
      { min: 29000, label: 'KHÔNG GIAN', icon: '💠', color: 'text-indigo-600' },
      { min: 24000, label: 'BIG BANG', icon: '💥', color: 'text-rose-600' },
      { min: 20000, label: 'HỐ ĐEN', icon: '⚫', color: 'text-slate-900' },
      { min: 17000, label: 'SIÊU TÂN TINH', icon: '✨', color: 'text-orange-500' },
      { min: 14500, label: 'THIÊN HÀ', icon: '🌀', color: 'text-violet-500' },
      { min: 12500, label: 'TINH VÂN', icon: '🌫️', color: 'text-pink-500' },
      { min: 11000, label: 'CHÒM SAO', icon: '✨', color: 'text-blue-500' },
      { min: 9500, label: 'MẶT TRỜI', icon: '🌞', color: 'text-yellow-500' },
      { min: 8200, label: 'SAO MỘC', icon: '🪐', color: 'text-amber-600' },
      { min: 7000, label: 'SAO THỔ', icon: '🪐', color: 'text-yellow-600' },
      { min: 6000, label: 'TRÁI ĐẤT', icon: '🌍', color: 'text-blue-600' },
      { min: 5200, label: 'SAO HỎA', icon: '🔴', color: 'text-red-600' },
      { min: 4500, label: 'MẶT TRĂNG', icon: '🌑', color: 'text-slate-500' },
      { min: 3800, label: 'VỆ TINH', icon: '🛰️', color: 'text-zinc-500' },
      { min: 3200, label: 'TẦNG ĐIỆN LY', icon: '⚡', color: 'text-violet-500' },
      { min: 2700, label: 'BÃO TỪ', icon: '🌪️', color: 'text-fuchsia-500' },
      { min: 2300, label: 'CỰC QUANG', icon: '🌈', color: 'text-emerald-500' },
      { min: 1900, label: 'KHÍ QUYỂN', icon: '☁️', color: 'text-sky-500' },
      { min: 1600, label: 'ĐẠI DƯƠNG', icon: '🌊', color: 'text-blue-700' },
      { min: 1350, label: 'LỤC ĐỊA', icon: '⛰️', color: 'text-green-800' },
      { min: 1150, label: 'SINH QUYỂN', icon: '🌳', color: 'text-lime-700' },
      { min: 950, label: 'RỪNG RẬM', icon: '🌴', color: 'text-teal-700' },
      { min: 800, label: 'CAO NGUYÊN', icon: '🌄', color: 'text-orange-700' },
      { min: 650, label: 'TINH THỂ', icon: '💎', color: 'text-cyan-700' },
      { min: 500, label: 'PHÂN TỬ', icon: '⚗️', color: 'text-teal-700' },
      { min: 400, label: 'NGUYÊN TỬ', icon: '⚛️', color: 'text-purple-700' },
      { min: 300, label: 'HẠT NHÂN', icon: '☢️', color: 'text-yellow-700' },
      { min: 220, label: 'NUCLEON', icon: '🔴', color: 'text-rose-700' },
      { min: 150, label: 'PROTON', icon: '➕', color: 'text-red-700' },
      { min: 100, label: 'NEUTRON', icon: '⚪', color: 'text-gray-700' },
      { min: 70, label: 'ELECTRON', icon: '➖', color: 'text-blue-700' },
      { min: 50, label: 'QUARK', icon: '🧩', color: 'text-pink-600' },
      { min: 30, label: 'PHOTON', icon: '💡', color: 'text-yellow-600' },
      { min: 15, label: 'HẠT BỤI', icon: '🌫️', color: 'text-stone-600' },
      { min: 5, label: 'VÔ HÌNH', icon: '👻', color: 'text-gray-400' },
      { min: 0, label: 'KHỞI NGUYÊN', icon: '🥚', color: 'text-slate-400' },
  ];

  // 📚 LUYỆN TẬP: Max cũ 3k -> Max mới 10k
  const PRACTICE_RANKS = [
      { min: 10000, label: 'VẠN THẾ SƯ', icon: '🧘', color: 'text-yellow-700' },
      { min: 8500, label: 'THÁNH NHÂN', icon: '⚜️', color: 'text-yellow-600' },
      { min: 7200, label: 'HIỀN TRIẾT', icon: '👴', color: 'text-amber-700' },
      { min: 6000, label: 'ĐẠI TRÍ TUỆ', icon: '🧠', color: 'text-amber-600' },
      { min: 5000, label: 'NHÀ BÁC HỌC', icon: '⚛️', color: 'text-orange-700' },
      { min: 4200, label: 'GIÁO SƯ', icon: '👨‍🏫', color: 'text-orange-600' },
      { min: 3500, label: 'TIẾN SĨ', icon: '🎓', color: 'text-red-600' },
      { min: 2800, label: 'THẠC SĨ', icon: '📜', color: 'text-rose-600' },
      { min: 2200, label: 'HỌC GIẢ', icon: '📙', color: 'text-pink-600' },
      { min: 1700, label: 'UYÊN BÁC', icon: '📚', color: 'text-fuchsia-600' },
      { min: 1300, label: 'TINH THÔNG', icon: '💡', color: 'text-purple-600' },
      { min: 1000, label: 'THÔNG HIỂU', icon: '🧐', color: 'text-violet-600' },
      { min: 750, label: 'CẦN CÙ', icon: '🐜', color: 'text-indigo-600' },
      { min: 550, label: 'CHĂM CHỈ', icon: '🐝', color: 'text-blue-600' },
      { min: 350, label: 'MỌT SÁCH', icon: '🤓', color: 'text-sky-600' },
      { min: 200, label: 'HIẾU HỌC', icon: '📖', color: 'text-cyan-600' },
      { min: 100, label: 'SƠ CẤP', icon: '📝', color: 'text-teal-600' },
      { min: 50, label: 'HAM HỌC', icon: '🌱', color: 'text-emerald-600' },
      { min: 20, label: 'TẬP ĐỌC', icon: '👶', color: 'text-green-600' },
      { min: 0, label: 'NGƯỜI MỚI', icon: '🥚', color: 'text-slate-400' },
  ];

  // 🎓 THI THỬ: Max cũ 5k -> Max mới 15k
  const EXAM_RANKS = [
      { min: 15000, label: 'THẦN CƠ', icon: '🔮', color: 'text-red-700' },
      { min: 12500, label: 'THÁI SƯ', icon: '🏮', color: 'text-orange-700' },
      { min: 10500, label: 'ĐẠI HỌC SĨ', icon: '👴', color: 'text-orange-600' },
      { min: 8800, label: 'TRẠNG NGUYÊN', icon: '🏆', color: 'text-yellow-600' },
      { min: 7200, label: 'BẢNG NHÃN', icon: '👁️', color: 'text-yellow-500' },
      { min: 5800, label: 'THÁM HOA', icon: '🌸', color: 'text-amber-600' },
      { min: 4600, label: 'HOÀNG GIÁP', icon: '🐢', color: 'text-amber-500' },
      { min: 3600, label: 'TIẾN SĨ', icon: '🎓', color: 'text-lime-700' },
      { min: 2800, label: 'PHÓ BẢNG', icon: '🥈', color: 'text-lime-600' },
      { min: 2100, label: 'GIÁM SINH', icon: '🏛️', color: 'text-green-700' },
      { min: 1500, label: 'GIẢI NGUYÊN', icon: '🥇', color: 'text-green-600' },
      { min: 1000, label: 'CỬ NHÂN', icon: '🎓', color: 'text-emerald-600' },
      { min: 700, label: 'CỐNG SINH', icon: '🎁', color: 'text-teal-600' },
      { min: 450, label: 'TÚ TÀI', icon: '📜', color: 'text-cyan-600' },
      { min: 250, label: 'KHÓA SINH', icon: '🎒', color: 'text-sky-700' },
      { min: 150, label: 'NHO SINH', icon: '🎍', color: 'text-blue-700' },
      { min: 80, label: 'THƯ SINH', icon: '📖', color: 'text-indigo-700' },
      { min: 40, label: 'ĐỒNG SINH', icon: '🧒', color: 'text-violet-700' },
      { min: 15, label: 'NHẬP MÔN', icon: '🎋', color: 'text-purple-700' },
      { min: 0, label: 'VỠ LÒNG', icon: '👶', color: 'text-slate-400' },
  ];

  // 🎮 GAME: Max cũ 5k -> Max mới 20k (Game dễ kiếm điểm nên tăng cao)
  const GAME_RANKS = [
      { min: 20000, label: 'VUA TRÒ CHƠI', icon: '👑', color: 'text-yellow-500' },
      { min: 17000, label: 'HUYỀN THOẠI', icon: '☠️', color: 'text-red-600' },
      { min: 14500, label: 'THÁCH ĐẤU', icon: '🔥', color: 'text-red-500' },
      { min: 12000, label: 'ĐẠI CAO THỦ', icon: '🎖️', color: 'text-orange-600' },
      { min: 10000, label: 'CAO THỦ', icon: '⚔️', color: 'text-orange-500' },
      { min: 8200, label: 'TINH ANH', icon: '✨', color: 'text-amber-500' },
      { min: 6500, label: 'KIM CƯƠNG', icon: '💎', color: 'text-cyan-500' },
      { min: 5000, label: 'LỤC BẢO', icon: '💚', color: 'text-emerald-500' },
      { min: 3800, label: 'BẠCH KIM', icon: '💠', color: 'text-teal-500' },
      { min: 2800, label: 'VÀNG ĐOÀN', icon: '🥇', color: 'text-yellow-500' },
      { min: 2000, label: 'BẠC I', icon: '🥈', color: 'text-slate-400' },
      { min: 1400, label: 'BẠC II', icon: '🥈', color: 'text-slate-500' },
      { min: 900, label: 'BẠC III', icon: '🥈', color: 'text-slate-600' },
      { min: 600, label: 'ĐỒNG I', icon: '🥉', color: 'text-orange-700' },
      { min: 350, label: 'ĐỒNG II', icon: '🥉', color: 'text-orange-600' },
      { min: 150, label: 'ĐỒNG III', icon: '🥉', color: 'text-stone-600' },
      { min: 80, label: 'SẮT ĐOÀN', icon: '🔩', color: 'text-zinc-500' },
      { min: 40, label: 'NHẬP MÔN', icon: '🕹️', color: 'text-gray-600' },
      { min: 10, label: 'GÀ MỜ', icon: '🐣', color: 'text-slate-400' },
      { min: 0, label: 'TẬP CHƠI', icon: '🎮', color: 'text-slate-300' },
  ];

  // 🛡️ THỬ THÁCH: Max cũ 5k -> Max mới 12k
  const CHALLENGE_RANKS = [
      { min: 12000, label: 'THỐNG LĨNH', icon: '🦅', color: 'text-red-800' },
      { min: 10000, label: 'ĐẠI TƯỚNG', icon: '🌟🌟🌟🌟', color: 'text-red-700' },
      { min: 8500, label: 'THƯỢNG TƯỚNG', icon: '🌟🌟🌟', color: 'text-red-600' },
      { min: 7200, label: 'TRUNG TƯỚNG', icon: '🌟🌟', color: 'text-red-600' },
      { min: 6000, label: 'THIẾU TƯỚNG', icon: '🌟', color: 'text-red-500' },
      { min: 5000, label: 'ĐẠI TÁ', icon: '🔶🔶🔶🔶', color: 'text-orange-600' },
      { min: 4100, label: 'THƯỢNG TÁ', icon: '🔶🔶🔶', color: 'text-orange-500' },
      { min: 3300, label: 'TRUNG TÁ', icon: '🔶🔶', color: 'text-orange-400' },
      { min: 2600, label: 'THIẾU TÁ', icon: '🔶', color: 'text-orange-300' },
      { min: 2000, label: 'ĐẠI ÚY', icon: '⭐⭐⭐⭐', color: 'text-yellow-600' },
      { min: 1500, label: 'THƯỢNG ÚY', icon: '⭐⭐⭐', color: 'text-yellow-500' },
      { min: 1100, label: 'TRUNG ÚY', icon: '⭐⭐', color: 'text-yellow-500' },
      { min: 800, label: 'THIẾU ÚY', icon: '⭐', color: 'text-yellow-500' },
      { min: 550, label: 'CHUẨN ÚY', icon: '💠', color: 'text-lime-600' },
      { min: 350, label: 'THƯỢNG SĨ', icon: '🔹', color: 'text-blue-600' },
      { min: 200, label: 'TRUNG SĨ', icon: '🔹', color: 'text-blue-500' },
      { min: 100, label: 'HẠ SĨ', icon: '🔹', color: 'text-sky-500' },
      { min: 50, label: 'BINH NHẤT', icon: '🛡️', color: 'text-indigo-600' },
      { min: 20, label: 'BINH NHÌ', icon: '🛡️', color: 'text-violet-600' },
      { min: 0, label: 'TÂN BINH', icon: '👣', color: 'text-slate-400' },
  ];

  // 🛠️ TẠO ĐỀ: Max cũ 5k -> Max mới 15k
  const MOCK_RANKS = [
      { min: 15000, label: 'ĐẤNG SÁNG THẾ', icon: '🌌', color: 'text-violet-700' },
      { min: 12500, label: 'TIÊN PHONG', icon: '🚩', color: 'text-fuchsia-600' },
      { min: 10500, label: 'NHÀ PHÁT MINH', icon: '💡', color: 'text-pink-600' },
      { min: 8800, label: 'QUY HOẠCH SƯ', icon: '🗺️', color: 'text-orange-600' },
      { min: 7200, label: 'KIẾN TRÚC SƯ', icon: '📐', color: 'text-yellow-600' },
      { min: 5800, label: 'NHÀ THIẾT KẾ', icon: '🎨', color: 'text-lime-600' },
      { min: 4600, label: 'THIẾT KẾ VIÊN', icon: '✏️', color: 'text-green-600' },
      { min: 3500, label: 'KỸ SƯ TRƯỞNG', icon: '🏗️', color: 'text-emerald-600' },
      { min: 2500, label: 'KỸ SƯ CHÍNH', icon: '⚙️', color: 'text-teal-600' },
      { min: 1800, label: 'KỸ SƯ', icon: '🔩', color: 'text-cyan-600' },
      { min: 1200, label: 'KỸ THUẬT VIÊN', icon: '🔧', color: 'text-sky-600' },
      { min: 800, label: 'QUẢN CÔNG', icon: '📋', color: 'text-blue-600' },
      { min: 500, label: 'THỢ CẢ', icon: '👷', color: 'text-indigo-600' },
      { min: 300, label: 'THỢ LÀNH NGHỀ', icon: '🔨', color: 'text-violet-600' },
      { min: 150, label: 'THỢ HỌC VIỆC', icon: '🧱', color: 'text-purple-600' },
      { min: 80, label: 'PHỤ VIỆC', icon: '🧹', color: 'text-fuchsia-600' },
      { min: 0, label: 'TẬP SỰ', icon: '🔰', color: 'text-slate-400' },
  ];

  // --- 2. DỮ LIỆU HUY HIỆU (ĐÃ CẬP NHẬT FULL 30 DANH HIỆU) ---
  const BADGE_DEFINITIONS = [
      // 👑 NHÓM XẾP HẠNG
      { icon: '👑', label: 'Top 1', desc: 'Đứng đầu Bảng xếp hạng', color: 'bg-yellow-100 text-yellow-700' },
      { icon: '🥈', label: 'Top 2', desc: 'Top 2 Bảng xếp hạng', color: 'bg-slate-100 text-slate-700' },
      { icon: '🥉', label: 'Top 3 ', desc: 'Top 3 Bảng xếp hạng', color: 'bg-orange-100 text-orange-700' },

      // 🌟 NHÓM TỔNG ĐIỂM
      { icon: '🌟', label: 'Huyền Thoại', desc: 'Tổng điểm > 50.000 XP', color: 'bg-purple-100 text-purple-700' },
      { icon: '🔥', label: 'Chiến Thần', desc: 'Tổng điểm > 20.000 XP', color: 'bg-red-100 text-red-700' },
      { icon: '⚛️', label: 'Yêu Vật Lí', desc: 'Tổng điểm > 5.000 XP', color: 'bg-indigo-100 text-indigo-700' },

      // 🌳 NHÓM KHU VƯỜN
      { icon: '🌳', label: 'Thần Rừng', desc: 'Cây đạt cấp tối đa (Lv.50)', color: 'bg-green-600 text-white' },
      { icon: '🌲', label: 'Chủ Trang Trại', desc: 'Cây đạt cấp 30 trở lên', color: 'bg-lime-100 text-lime-700' },
      { icon: '🌱', label: 'Yêu Thiên Nhiên', desc: 'Cây đạt cấp 10 trở lên', color: 'bg-teal-100 text-teal-700' },
      { icon: '💧', label: 'Vua Thủy Tề', desc: 'Tích trữ 100 Nước', color: 'bg-sky-100 text-sky-700' },
      { icon: '🧪', label: 'Nhà Hóa Học', desc: 'Tích trữ 50 Phân bón', color: 'bg-amber-100 text-amber-700' },

      // 🧠 NHÓM KỸ NĂNG & ĐIỂM SỐ
      { icon: '👽', label: 'Tuyệt Đối 10/10', desc: 'Đạt điểm 10 bài Thi thử', color: 'bg-rose-600 text-white' },
      { icon: '🧠', label: 'Siêu Trí Tuệ', desc: 'Điểm Thi thử >= 9.0', color: 'bg-rose-100 text-rose-700' },
      { icon: '🎰', label: 'Vua Trò Chơi', desc: 'Điểm Game > 10.000', color: 'bg-fuchsia-100 text-fuchsia-700' },
      { icon: '🛡️', label: 'Thống Lĩnh', desc: 'Điểm Thử thách > 2.000', color: 'bg-emerald-100 text-emerald-700' },

      // 🎯 NHÓM CHUỖI THẮNG
      { icon: '🚀', label: 'Không Thể Cản Phá', desc: 'Đúng 50 câu liên tiếp', color: 'bg-red-600 text-white' },
      { icon: '🎯', label: 'Bách Phát Bách Trúng', desc: 'Đúng 20 câu liên tiếp', color: 'bg-orange-100 text-orange-700' },
      { icon: '🔫', label: 'Xạ Thủ', desc: 'Đúng 10 câu liên tiếp', color: 'bg-orange-50 text-orange-600' },

      // ⚡ NHÓM TỐC ĐỘ & CHĂM CHỈ
      { icon: '⚡', label: 'The Flash', desc: '100 lần trả lời cực nhanh', color: 'bg-yellow-300 text-yellow-800' },
      { icon: '📅', label: 'Kiên Trì', desc: 'Đăng nhập 30 ngày liên tục', color: 'bg-blue-100 text-blue-700' },
      { icon: '🔥', label: 'Chăm Chỉ', desc: 'Đăng nhập 7 ngày liên tục', color: 'bg-orange-100 text-orange-700' },

      // ⏰ NHÓM GIỜ GIẤC
      { icon: '🦉', label: 'Cú Đêm', desc: 'Học bài khung giờ 23h - 2h', color: 'bg-slate-800 text-white' },
      { icon: '🐓', label: 'Gà Gáy Sớm', desc: 'Học bài khung giờ 4h - 6h', color: 'bg-teal-100 text-teal-700' },
      { icon: '🍚', label: 'Xuyên Trưa', desc: 'Học bài khung giờ 11h - 13h', color: 'bg-stone-100 text-stone-700' },
      
      // 🍀 KHÁC
      { icon: '🍀', label: 'Thần Tài Gõ Cửa', desc: '10 lần quay trúng ô may mắn', color: 'bg-green-100 text-green-700' },
      { icon: '🛠️', label: 'Tác Giả', desc: 'Admin hệ thống', color: 'bg-slate-900 text-white' },
  ];

  // --- 3. LOGIC XỬ LÝ (GIỮ NGUYÊN) ---
  const getCurrentRankList = () => {
      switch(category) {
          case 'PRACTICE': return PRACTICE_RANKS;
          case 'EXAM': return EXAM_RANKS;
          case 'GAME': return GAME_RANKS;
          case 'CHALLENGE': return CHALLENGE_RANKS;
          case 'MOCK': return MOCK_RANKS;
          default: return TOTAL_RANKS;
      }
  };
  // 👇 HÀM FETCH DỮ LIỆU ĐÃ SỬA: BỎ LỌC LỚP/TRƯỜNG, GIỮ LẠI CATEGORY (6 TAB)
  useEffect(() => {
    const fetchLeaderboard = async () => {
      // ✅ Key cache bây giờ chỉ phụ thuộc vào Category (Ví dụ: bxh_ALL_GAME, bxh_ALL_EXAM...)
      // Mặc định là ALL (Toàn quốc)
      const cacheKey = `bxh_ALL_${category}`;
      const CACHE_DURATION = 60 * 60 * 1000; // 60 phút

      // 1. Kiểm tra Cache trong máy
      const cachedRaw = localStorage.getItem(cacheKey);
      if (cachedRaw) {
          try {
            const parsedCache = JSON.parse(cachedRaw);
            const isOldFormat = Array.isArray(parsedCache);
            const timeDiff = Date.now() - (parsedCache.timestamp || 0);

            if (!isOldFormat && timeDiff < CACHE_DURATION) {
                console.log(`🏆 Cache ${category} còn hạn -> Dùng ngay (0 tốn Read)`);
                let list = parsedCache.data;

                // Kỹ thuật tráo điểm (Cập nhật điểm mới nhất của mình vào danh sách cũ)
                const myIndex = list.findIndex((p: any) => p.uid === currentUser.uid);

                if (myIndex !== -1) {
                    list[myIndex] = { ...list[myIndex], ...currentUser };
                    setMyExactRank(myIndex + 1);
                } else {
                    setMyExactRank(parsedCache.myRank || null);
                }

                setPlayers(list);
                setLoading(false);
                return; // 🛑 DỪNG, KHÔNG GỌI FIREBASE
            }
          } catch (e) {}
      }

      // 2. Tải mới từ Firebase (Luôn tải TOÀN SEVER theo từng loại điểm)
      try {
        setLoading(true);
        console.log(`☁️ Tải BXH ${category} toàn Server (Tốn 30 Reads)...`);

        // A. Xác định trường điểm cần lấy dựa trên 6 TAB (Category)
        let orderByField = 'totalScore';
        let currentScore = currentUser.totalScore || 0;

        if (category === 'PRACTICE') { orderByField = 'practiceScore'; currentScore = currentUser.practiceScore || 0; }
        if (category === 'MOCK') { orderByField = 'mockScore'; currentScore = currentUser.mockScore || 0; }
        if (category === 'EXAM') { orderByField = 'examScore'; currentScore = currentUser.examScore || 0; }
        if (category === 'GAME') { orderByField = 'gameScore'; currentScore = currentUser.gameScore || 0; }
        if (category === 'CHALLENGE') { orderByField = 'challengeScore'; currentScore = currentUser.challengeScore || 0; }

        // B. Query đơn giản hóa: Luôn lấy Top 30 toàn server (Bỏ qua lọc Lớp/Trường)
        const q = query(collection(db, 'users'), orderBy(orderByField, 'desc'), limit(30));

        const snap = await getDocs(q);
        const list: any[] = [];
        snap.forEach((d) => list.push(d.data()));

        // C. Tính hạng chính xác của TÔI
        let calculatedRank = null;
        const myIndexInTop = list.findIndex(u => u.uid === currentUser.uid);

        if (myIndexInTop !== -1) {
            calculatedRank = myIndexInTop + 1;
        } else {
            // Nếu không nằm trong Top 30, đếm số người giỏi hơn trên TOÀN SERVER
            try {
                // Query đếm cũng bỏ qua lọc Lớp/Trường, chỉ so sánh điểm
                const countQuery = query(collection(db, 'users'), where(orderByField, '>', currentScore));
                const snapshot = await getCountFromServer(countQuery);
                const countBetter = snapshot.data().count;
                calculatedRank = countBetter + 1;
                console.log(`🔢 Đã đếm hạng chính xác: ${calculatedRank}`);
            } catch (err) {
                console.error("Lỗi đếm hạng:", err);
            }
        }

        setMyExactRank(calculatedRank);
        setPlayers(list);

        // D. Lưu Cache
        localStorage.setItem(cacheKey, JSON.stringify({
            timestamp: Date.now(),
            data: list,
            myRank: calculatedRank
        }));

      } catch (err: any) {
          console.error("Lỗi tải BXH:", err);
      } finally {
          setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [category, currentUser]);

  const getCatLabel = () => {
      if(category === 'TOTAL') return 'Tổng điểm';
      if(category === 'PRACTICE') return 'Luyện tập';
      if(category === 'MOCK') return 'Tạo đề';
      if(category === 'EXAM') return 'Thi thử';
      if(category === 'GAME') return 'Trò chơi';
      if(category === 'CHALLENGE') return 'Thử thách';
      return '';
  }

  const getRankByScore = (score: number) => {
      const list = getCurrentRankList();
      return list.find(r => score >= r.min) || list[list.length - 1];
  }

  const getBadges = (u: UserProfile, index: number) => {
      const badges = [];

      // --- 1. NHÓM XẾP HẠNG (Top Server) ---
      // 👇 Đã sửa thành "Độc tôn" theo ý bạn
      if (index === 0) badges.push({ icon: '👑', color: 'bg-yellow-100 text-yellow-700 border border-yellow-200', label: 'Top 1' });
      if (index === 1) badges.push({ icon: '🥈', color: 'bg-slate-100 text-slate-700 border border-slate-200', label: 'Top 2' });
      if (index === 2) badges.push({ icon: '🥉', color: 'bg-orange-100 text-orange-700 border border-orange-200', label: 'Top 3' });

      // --- 2. NHÓM TỔNG ĐIỂM ---
      if ((u.totalScore || 0) >= 50000) badges.push({ icon: '🌟', color: 'bg-purple-100 text-purple-700 border border-purple-200', label: 'Huyền Thoại' });
      else if ((u.totalScore || 0) >= 20000) badges.push({ icon: '🔥', color: 'bg-red-100 text-red-700 border border-red-200', label: 'Chiến Thần' });
      else if ((u.totalScore || 0) > 5000) badges.push({ icon: '⚛️', color: 'bg-indigo-100 text-indigo-700 border border-indigo-200', label: 'Yêu Vật Lí' });

      // --- 3. NHÓM KỸ NĂNG (Thành phần) ---
      // Game: Giữ "Đại gia" cho >3000
      if ((u.gameScore || 0) >= 10000) badges.push({ icon: '🎰', color: 'bg-fuchsia-100 text-fuchsia-700 border border-fuchsia-200', label: 'Vua Trò Chơi' });
      else if ((u.gameScore || 0) > 3000) badges.push({ icon: '💎', color: 'bg-fuchsia-100 text-fuchsia-700 border border-fuchsia-200', label: 'Đại gia' });

      // Thử thách: Giữ "Thợ săn" cho >500
      if ((u.challengeScore || 0) >= 2000) badges.push({ icon: '🛡️', color: 'bg-emerald-100 text-emerald-700 border border-emerald-200', label: 'Thống Lĩnh' });
      else if ((u.challengeScore || 0) >= 500) badges.push({ icon: '🏹', color: 'bg-emerald-100 text-emerald-700 border border-emerald-200', label: 'Thợ săn' });

      // Thi thử: Giữ "Siêu trí tuệ" cho >9.5
      if ((u.examScore || 0) === 10) badges.push({ icon: '👽', color: 'bg-rose-600 text-white border border-rose-700', label: 'Tuyệt Đối 10/10' });
      else if ((u.examScore || 0) > 9.5) badges.push({ icon: '🧠', color: 'bg-rose-100 text-rose-700 border border-rose-200', label: 'Siêu trí tuệ' });

      // --- 4. NHÓM KHU VƯỜN (Mới thêm vào) ---
      if ((u.treeLevel || 1) >= 50) badges.push({ icon: '🌳', color: 'bg-green-600 text-white border border-green-700', label: 'Thần Rừng' });
      else if ((u.treeLevel || 1) >= 30) badges.push({ icon: '🌲', color: 'bg-lime-100 text-lime-700 border border-lime-200', label: 'Chủ Trang Trại' });
      else if ((u.treeLevel || 1) >= 10) badges.push({ icon: '🌱', color: 'bg-teal-100 text-teal-700 border border-teal-200', label: 'Yêu Thiên Nhiên' });
      
      if ((u.inventory?.water || 0) >= 100) badges.push({ icon: '💧', color: 'bg-sky-100 text-sky-700 border border-sky-200', label: 'Vua Thủy Tề' });
      if ((u.inventory?.fertilizer || 0) >= 50) badges.push({ icon: '🧪', color: 'bg-amber-100 text-amber-700 border border-amber-200', label: 'Nhà Hóa Học' });

      // --- 5. NHÓM THÓI QUEN ---
      // Chuỗi thắng: Giữ "Xạ thủ"
      if ((u.correctStreak || 0) >= 50) badges.push({ icon: '🚀', color: 'bg-red-600 text-white border border-red-700', label: 'Không Thể Cản Phá' });
      else if ((u.correctStreak || 0) >= 20) badges.push({ icon: '🎯', color: 'bg-orange-100 text-orange-700 border border-orange-200', label: 'Bách Phát Bách Trúng' });
      else if ((u.correctStreak || 0) >= 10) badges.push({ icon: '🎯', color: 'bg-red-100 text-red-700 border border-red-200', label: 'Xạ thủ' });

      // Tốc độ: Giữ "Tia chớp"
      if ((u.fastAnswerCount || 0) >= 100) badges.push({ icon: '⚡', color: 'bg-yellow-300 text-yellow-800 border border-yellow-400', label: 'The Flash' });
      else if ((u.fastAnswerCount || 0) > 0) badges.push({ icon: '⚡', color: 'bg-yellow-100 text-yellow-700 border border-yellow-200', label: 'Tia chớp' });

      // Đăng nhập: Giữ "Chăm chỉ"
      if ((u.loginStreak || 0) >= 30) badges.push({ icon: '📅', color: 'bg-blue-100 text-blue-700 border border-blue-200', label: 'Kiên Trì 1 Tháng' });
      else if ((u.loginStreak || 0) >= 3) badges.push({ icon: '🔥', color: 'bg-orange-100 text-orange-700 border border-orange-200', label: 'Chăm chỉ' });

      // --- 6. NHÓM GIỜ GIẤC ---
      if (u.lastStudyHour !== undefined) {
          if (u.lastStudyHour >= 23 || u.lastStudyHour <= 2) badges.push({ icon: '🦉', color: 'bg-slate-800 text-white border border-slate-600', label: 'Cú đêm' });
          if (u.lastStudyHour >= 4 && u.lastStudyHour <= 6) badges.push({ icon: '🐓', color: 'bg-teal-100 text-teal-700 border border-teal-200', label: 'Gà gáy' });
          if (u.lastStudyHour >= 11 && u.lastStudyHour <= 13) badges.push({ icon: '🍚', color: 'bg-stone-100 text-stone-700 border border-stone-200', label: 'Xuyên Trưa' });
      }

      // --- 7. KHÁC ---
      if ((u.luckySpinCount || 0) > 0) badges.push({ icon: '🍀', color: 'bg-green-100 text-green-700 border border-green-200', label: 'Thần tài' });

      if (u.email === 'lebaoanhnss@gmail.com') {
          badges.unshift({ icon: '🛠️', color: 'bg-slate-900 text-white border border-slate-700', label: 'Tác Giả' });
      }

      return badges;
  }

  // --- 4. GIAO DIỆN (CHỈ THÊM NÚT REFRESH) ---
  return (
    <div className="pb-24 pt-4 px-4 h-full flex flex-col bg-slate-50 relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
            <button onClick={onBack} className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border border-slate-100"><ChevronLeft size={20}/></button>
            <h2 className="text-xl font-black text-slate-800">Bảng xếp hạng</h2>
        </div>
        
        <div className="flex gap-2">
            {/* Nút làm mới dữ liệu (Xóa cache để tải lại) */}
            <button onClick={() => { localStorage.removeItem(`bxh_${filter}_${category}`); setCategory(prev => prev); /* Hack để trigger useEffect */ window.location.reload(); }} className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-slate-400 shadow-sm border border-slate-100 active:scale-90"><RotateCcw size={14}/></button>
            
            <button onClick={() => setShowRankInfo(true)} className="flex items-center gap-1 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full text-[10px] font-bold border border-indigo-100 active:scale-95 transition-transform"><Info size={14}/> Xem cấp độ</button>
        </div>
      </div>

      {/* POPUP HIỂN THỊ CẤP ĐỘ & HUY HIỆU */}
      {showRankInfo && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white w-full max-w-sm h-[80%] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="font-black text-slate-800 flex items-center gap-2"><Trophy size={18} className="text-yellow-500"/> Thông tin danh hiệu</h3>
                    <button onClick={() => setShowRankInfo(false)} className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-slate-400 shadow-sm hover:bg-slate-50"><X size={16}/></button>
                </div>
                
                {/* Switch Tab */}
                <div className="flex p-2 gap-2 bg-slate-50 border-b border-slate-100">
                    <button onClick={()=>setInfoTab('RANKS')} className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${infoTab==='RANKS' ? 'bg-white shadow text-indigo-600' : 'text-slate-400'}`}>Cấp độ ({getCatLabel()})</button>
                    <button onClick={()=>setInfoTab('BADGES')} className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${infoTab==='BADGES' ? 'bg-white shadow text-rose-600' : 'text-slate-400'}`}>Huy hiệu đặc biệt</button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {infoTab === 'RANKS' ? (
                        <>
                            <p className="text-xs text-slate-500 mb-2 italic text-center">Tích lũy điểm {getCatLabel()} để thăng cấp:</p>
                            {getCurrentRankList().map((r, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{r.icon}</span>
                                        <span className={`font-black text-sm uppercase ${r.color}`}>{r.label}</span>
                                    </div>
                                    <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">{r.min.toLocaleString()} XP</span>
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                            <p className="text-xs text-slate-500 mb-2 italic text-center">Hoàn thành nhiệm vụ để mở khóa:</p>
                            {BADGE_DEFINITIONS.map((b, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                                    <div className="text-2xl">{b.icon}</div>
                                    <div className="flex-1">
                                        <div className={`font-black text-xs uppercase ${b.color.split(' ')[1]}`}>{b.label}</div>
                                        <div className="text-[10px] text-slate-500 font-medium">{b.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
                <button onClick={() => setShowRankInfo(false)} className="m-4 bg-slate-800 text-white py-3 rounded-xl font-bold active:scale-95 transition-transform">Đã hiểu</button>
            </div>
        </div>
      )}

            {/* 2. MENU GRID */}
      <div className="grid grid-cols-3 gap-2 mb-2">
          <button onClick={() => setCategory('TOTAL')} className={`py-2.5 rounded-xl text-[10px] font-bold border transition-all ${category === 'TOTAL' ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm' : 'bg-white border-slate-200 text-slate-500'}`}>Tổng hợp</button>
          <button onClick={() => setCategory('PRACTICE')} className={`py-2.5 rounded-xl text-[10px] font-bold border transition-all ${category === 'PRACTICE' ? 'bg-orange-50 border-orange-500 text-orange-700 shadow-sm' : 'bg-white border-slate-200 text-slate-500'}`}>Luyện tập</button>
          <button onClick={() => setCategory('MOCK')} className={`py-2.5 rounded-xl text-[10px] font-bold border transition-all ${category === 'MOCK' ? 'bg-purple-50 border-purple-500 text-purple-700 shadow-sm' : 'bg-white border-slate-200 text-slate-500'}`}>Tự tạo đề</button>
          <button onClick={() => setCategory('EXAM')} className={`py-2.5 rounded-xl text-[10px] font-bold border transition-all ${category === 'EXAM' ? 'bg-red-50 border-red-500 text-red-700 shadow-sm' : 'bg-white border-slate-200 text-slate-500'}`}>Thi thử</button>
          <button onClick={() => setCategory('CHALLENGE')} className={`py-2.5 rounded-xl text-[10px] font-bold border transition-all ${category === 'CHALLENGE' ? 'bg-sky-50 border-sky-500 text-sky-700 shadow-sm' : 'bg-white border-slate-200 text-slate-500'}`}>Thử thách</button>
          <button onClick={() => setCategory('GAME')} className={`py-2.5 rounded-xl text-[10px] font-bold border transition-all ${category === 'GAME' ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm' : 'bg-white border-slate-200 text-slate-500'}`}>Trò chơi</button>
      </div>

      <div className="flex justify-between items-center mb-2 px-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Đang xem: {getCatLabel()}</span>
          {category === 'TOTAL' && <span className="text-[9px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">Không tính điểm Game</span>}
      </div>

{/* 3. DANH SÁCH USER (GIAO DIỆN MỚI: TOP 30 + STICKY ME) */}
      {(() => {
          // Logic: Kiểm tra xem "Tôi" có nằm trong danh sách đang hiển thị không
          const myIndexInList = players.findIndex(p => p.uid === currentUser.uid);
          const isMeInTop30 = myIndexInList !== -1;

          return (
            <div className="flex-1 overflow-hidden flex flex-col relative bg-white rounded-3xl shadow-sm border border-slate-100">
                {/* A. DANH SÁCH TOP 30 (Cuộn được) */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24 custom-scrollbar">
                    {loading ? <div className="text-center py-4 text-slate-400"><Loader2 className="animate-spin inline mr-2"/> Đang tải...</div> : (
                        players.map((u, i) => {
                            // Logic hiển thị điểm
                            let displayScore = 0;
                            if (category === 'TOTAL') displayScore = u.totalScore || 0;
                            if (category === 'PRACTICE') displayScore = u.practiceScore || 0;
                            if (category === 'MOCK') displayScore = u.mockScore || 0;
                            if (category === 'EXAM') displayScore = u.examScore || 0;
                            if (category === 'GAME') displayScore = u.gameScore || 0;
                            if (category === 'CHALLENGE') displayScore = u.challengeScore || 0;
                            displayScore = Math.round(displayScore);

                            // Rank Icon
                            let rankIcon;
                            if (i === 0) rankIcon = <Medal size={32} className="text-yellow-400 fill-yellow-100 drop-shadow-sm animate-bounce-short"/>;
                            else if (i === 1) rankIcon = <Medal size={28} className="text-slate-400 fill-slate-100 drop-shadow-sm"/>;
                            else if (i === 2) rankIcon = <Medal size={28} className="text-orange-600 fill-orange-100 drop-shadow-sm"/>;
                            else rankIcon = <span className="text-sm font-black text-slate-400">{i + 1}</span>;

                            const rankTitle = getRankByScore(displayScore);
                            const specialBadges = getBadges(u, i);

                            return (
                                <div key={u.uid} className={`flex flex-col p-4 rounded-2xl border transition-colors ${u.uid === currentUser.uid ? 'bg-indigo-50 border-indigo-200 ring-1 ring-indigo-200' : 'bg-white border-slate-100'}`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 h-8 flex items-center justify-center shrink-0">{rankIcon}</div>
                                            <div>
                                                <div className={`font-bold text-sm flex items-center gap-2 flex-wrap ${u.uid === currentUser.uid ? 'text-indigo-700' : 'text-slate-800'}`}>
                                                    {u.name} 
                                                    {u.uid === currentUser.uid && <span className="text-[9px] bg-indigo-600 text-white px-1.5 py-0.5 rounded font-black">TÔI</span>}
                                                    <span className={`text-[8px] px-2 py-0.5 rounded-md border font-black uppercase tracking-wider flex items-center gap-1 whitespace-nowrap bg-white/50 border-slate-200 text-slate-600 ${rankTitle.color}`}>
                                                        {rankTitle.icon} {rankTitle.label}
                                                    </span>
                                                </div>
                                                <div className="text-[10px] text-slate-400">{u.class} - {u.school}</div>
                                            </div>
                                        </div>
                                        <div className={`font-black text-lg ${i===0 ? 'text-yellow-500' : i===1 ? 'text-slate-500' : i===2 ? 'text-orange-600' : 'text-slate-800'}`}>
                                            {displayScore}
                                        </div>
                                    </div>
                                    {specialBadges.length > 0 && (
                                        <div className="flex gap-1 mt-2 ml-12 overflow-x-auto no-scrollbar pb-1">
                                            {specialBadges.map((badge, idx) => (
                                                <div key={idx} className={`px-2 py-0.5 rounded-full text-[9px] font-bold flex items-center gap-1 shadow-sm shrink-0 ${badge.color}`} title={badge.label}>
                                                    {badge.icon} {badge.label}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )
                        })
                    )}
                </div>

                {/* B. THANH CỦA TÔI (CHỈ HIỆN KHI BẠN KHÔNG NẰM TRONG TOP 30) */}
                {!loading && !isMeInTop30 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] z-10 animate-slide-up">
                         <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 flex items-center justify-center shrink-0 text-slate-400 font-black text-xs bg-slate-100 rounded-full border border-slate-200">30+</div>
                                <div>
                                    <div className="font-bold text-sm flex items-center gap-2 text-indigo-700">
                                        {currentUser.name}
                                        <span className="text-[9px] bg-indigo-600 text-white px-1.5 py-0.5 rounded font-black">TÔI</span>
                                    </div>
                                    <div className="text-[10px] text-slate-400">Bạn đang nằm ngoài Top 30</div>
                                </div>
                            </div>
                            <div className="font-black text-lg text-indigo-600">
                                {(() => {
                                    // Tính điểm hiển thị cho chính mình
                                    let s = 0;
                                    if (category === 'TOTAL') s = currentUser.totalScore || 0;
                                    if (category === 'PRACTICE') s = currentUser.practiceScore || 0;
                                    if (category === 'MOCK') s = currentUser.mockScore || 0;
                                    if (category === 'EXAM') s = currentUser.examScore || 0;
                                    if (category === 'GAME') s = currentUser.gameScore || 0;
                                    if (category === 'CHALLENGE') s = currentUser.challengeScore || 0;
                                    return Math.round(s);
                                })()}
                            </div>
                         </div>
                    </div>
                )}
            </div>
          );
      })()}
    </div>
  );
};

// 8. CHALLENGE SCREEN (ĐÃ NÂNG CẤP: CHỐNG SPAM & COOLDOWN 60 PHÚT)
const ChallengeScreen: React.FC<{
  onBack: () => void,
  session: ChallengeSessionData,
  setSession: React.Dispatch<React.SetStateAction<ChallengeSessionData>>,
  onScore: (pts: number, type?: 'game'|'practice'|'exam'|'challenge') => void,
  questions: Question[],
  onCopy: (txt: string) => void
}> = ({ onBack, session, setSession, onScore, questions, onCopy }) => { 
    
    const [textInput, setTextInput] = useState('');
    const [timeLeft, setTimeLeft] = useState<string | null>(null); // Hiển thị thời gian chờ

    // HÀM: Format thời gian đếm ngược
    const formatTimeLeft = (ms: number) => {
        const m = Math.floor(ms / 60000);
        const s = Math.floor((ms % 60000) / 1000);
        return `${m} phút ${s} giây`;
    };

    // 1. LOGIC KHỞI TẠO QUAN TRỌNG
    useEffect(() => {
        const loadChallenge = () => {
            const NOW = Date.now();
            const COOLDOWN_TIME = 60 * 60 * 1000; // 60 phút (tính bằng ms)
            
            // Lấy dữ liệu từ bộ nhớ máy
            const savedData = localStorage.getItem('roboki_challenge_state');
            
            if (savedData) {
                const parsed = JSON.parse(savedData);
                const timePassed = NOW - parsed.timestamp;

                // TRƯỜNG HỢP A: Chưa hết 60 phút -> BẮT BUỘC DÙNG LẠI CÂU CŨ
                if (timePassed < COOLDOWN_TIME) {
                    // Tìm lại câu hỏi cũ trong danh sách
                    const oldQ = questions.find(q => q.id === parsed.qId);
                    
                    if (oldQ) {
                        // Khôi phục lại toàn bộ trạng thái cũ
                        setSession({
                            todayQ: oldQ,
                            selectedOpt: parsed.selectedOpt,
                            isSubmitted: parsed.isSubmitted,
                            isCorrect: parsed.isCorrect,
                            history: session.history
                        });
                        
                        // Nếu là điền từ, điền lại text cũ
                        if (oldQ.type === 'Short' && parsed.selectedOpt) {
                            setTextInput(parsed.selectedOpt);
                        }

                        // Nếu đã làm xong rồi -> Tính thời gian chờ câu tiếp theo
                        if (parsed.isSubmitted) {
                            const remaining = COOLDOWN_TIME - timePassed;
                            setTimeLeft(formatTimeLeft(remaining));
                            
                            // Chạy đồng hồ đếm ngược
                            const timer = setInterval(() => {
                                const newRem = COOLDOWN_TIME - (Date.now() - parsed.timestamp);
                                if (newRem <= 0) {
                                    clearInterval(timer);
                                    setTimeLeft(null); // Hết giờ chờ -> Cho phép làm mới
                                } else {
                                    setTimeLeft(formatTimeLeft(newRem));
                                }
                            }, 1000);
                            return () => clearInterval(timer);
                        }
                        return; // Dừng lại, không tạo câu mới
                    }
                }
            }

            // TRƯỜNG HỢP B: Đã quá 60 phút hoặc chưa có dữ liệu -> TẠO CÂU MỚI
            if (questions.length > 0) {
                const validQuestions = questions.filter(q => q.type === 'MCQ' || q.type === 'Short');
                if (validQuestions.length > 0) {
                    const randomQ = validQuestions[Math.floor(Math.random() * validQuestions.length)];
                    
                    // Cập nhật State React
                    setSession(prev => ({ 
                        ...prev, 
                        todayQ: randomQ, 
                        isSubmitted: false, 
                        selectedOpt: null, 
                        isCorrect: false 
                    }));

                    // Lưu ngay vào LocalStorage (Đánh dấu thời gian bắt đầu)
                    localStorage.setItem('roboki_challenge_state', JSON.stringify({
                        timestamp: NOW,
                        qId: randomQ.id,
                        isSubmitted: false,
                        isCorrect: false,
                        selectedOpt: null
                    }));
                    setTimeLeft(null);
                }
            }
        };

        // Chỉ chạy nếu danh sách câu hỏi đã tải xong
        if (questions.length > 0) {
            loadChallenge();
        }
    }, [questions]); // Dependency là questions để đảm bảo data đã load

    // 2. XỬ LÝ NỘP BÀI (CẬP NHẬT LẠI STORAGE)
// 👇 THAY THẾ HÀM handleSubmit TRONG ChallengeScreen
    const handleSubmit = (answer: string) => {
        if (!session.todayQ) return;
        
        const isCorrect = answer.trim().toLowerCase() === session.todayQ.answerKey.trim().toLowerCase();
        
        // Cập nhật State
        setSession(prev => ({ ...prev, selectedOpt: answer, isSubmitted: true, isCorrect }));
        
        // ✅ ĐÃ SỬA: Đúng +10, Sai -10
        if (isCorrect) onScore(10, 'challenge'); 
        else onScore(-10, 'challenge'); 

        // CẬP NHẬT STORAGE NGAY LẬP TỨC
        const savedData = localStorage.getItem('roboki_challenge_state');
        const timestamp = savedData ? JSON.parse(savedData).timestamp : Date.now();

        localStorage.setItem('roboki_challenge_state', JSON.stringify({
            timestamp: timestamp,
            qId: session.todayQ.id,
            isSubmitted: true,
            isCorrect: isCorrect,
            selectedOpt: answer
        }));

        // Bắt đầu đếm ngược
        const COOLDOWN_TIME = 60 * 60 * 1000;
        const timePassed = Date.now() - timestamp;
        const remaining = COOLDOWN_TIME - timePassed;
        if (remaining > 0) setTimeLeft(formatTimeLeft(remaining));
    };

    const handleAskAI = () => {
        if (!session.todayQ) return;
        const q = session.todayQ;
        const prompt = generateRobokiPrompt(
            q.topic, 
            "Thử thách hàng ngày", 
            q.level, 
            q.promptText, 
            q.options
        );
        onCopy(prompt);
    };

    return (
        <div className="pb-24 pt-4 px-4 h-full flex flex-col bg-slate-50">
            <div className="flex items-center justify-between mb-6">
               <div className="flex items-center gap-3">
                  <button onClick={onBack} className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border border-slate-100"><ChevronLeft size={20} className="text-slate-600"/></button>
                  <h2 className="text-xl font-black text-slate-800">Thử thách</h2>
               </div>
               <button onClick={onBack} className="bg-rose-50 text-rose-500 p-2 rounded-full"><X size={20}/></button>
            </div>

            {/* MÀN HÌNH CHỜ (COOLDOWN) - CHỈ HIỆN KHI ĐÃ LÀM XONG VÀ CÒN THỜI GIAN CHỜ */}
            {session.isSubmitted && timeLeft ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
                    <div className="relative">
                        <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center border-4 border-slate-200">
                            <Clock size={64} className="text-slate-400 animate-pulse"/>
                        </div>
                        {session.isCorrect ? (
                            <div className="absolute -bottom-2 right-0 bg-emerald-500 text-white p-2 rounded-full border-4 border-slate-50"><CheckCircle size={24}/></div>
                        ) : (
                            <div className="absolute -bottom-2 right-0 bg-rose-500 text-white p-2 rounded-full border-4 border-slate-50"><XCircle size={24}/></div>
                        )}
                    </div>
                    
                    <div>
                        <h3 className="text-2xl font-black text-slate-700">Đợi chút nhé!</h3>
                        <p className="text-slate-500 text-sm mt-2 max-w-[250px] mx-auto">
                            Bạn đã hoàn thành thử thách lúc nãy. Hãy quay lại sau để nhận nhiệm vụ mới.
                        </p>
                    </div>

                    <div className="bg-indigo-50 text-indigo-600 px-6 py-3 rounded-2xl font-black text-xl shadow-sm border border-indigo-100">
                        {timeLeft}
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm max-w-xs w-full mt-4">
                        <div className="text-xs font-bold text-slate-400 uppercase mb-2">Kết quả vừa rồi</div>
                        <div className={`font-black text-lg ${session.isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {session.isCorrect ? '+10 Điểm (Chính xác)' : '0 Điểm (Chưa đúng)'}
                        </div>
                    </div>
                </div>
            ) : session.todayQ ? (
               <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex-1 overflow-y-auto">
                  <div className="flex justify-between items-start mb-6">
                     <div className="bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">Nhiệm vụ khả dụng</div>
                     <div className="text-right"><div className="font-black text-2xl text-slate-800">+10</div><div className="text-[10px] text-slate-400 font-bold uppercase">Điểm thưởng</div></div>
                  </div>
                  
                  <div className="mb-8">
                     {session.todayQ.imageUrl && (
                       <div className="mb-4 flex justify-center bg-white rounded-xl border border-slate-100 p-2">
                          <img src={session.todayQ.imageUrl} alt="Hình minh họa" className="rounded-lg max-h-64 object-contain w-full" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                       </div>
                     )}
                     <div className="font-bold text-slate-800 text-lg leading-relaxed"><MathRender content={session.todayQ.promptText}/></div>
                  </div>
                  
                  <div className="space-y-3">
                     {session.todayQ.type === 'Short' ? (
                         <div className="space-y-4 animate-fade-in">
                             <input type="text" disabled={session.isSubmitted} value={textInput} onChange={(e) => setTextInput(e.target.value)} placeholder="Nhập đáp án của bạn..." className="w-full p-4 rounded-2xl border-2 border-slate-200 font-bold focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none text-center text-lg text-slate-700 placeholder:text-slate-300 transition-all"/>
                             {!session.isSubmitted && (<button disabled={!textInput} onClick={() => handleSubmit(textInput)} className="w-full bg-sky-600 text-white py-3 rounded-2xl font-bold shadow-lg shadow-sky-200 active:scale-95 transition-all disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"><Target size={18}/> Chốt đáp án</button>)}
                             {session.isSubmitted && (<div className="text-center font-medium bg-slate-50 p-4 rounded-2xl border border-slate-100"><div className="text-xs text-slate-400 uppercase font-bold mb-1">Đáp án đúng là</div><div className="text-xl font-black text-emerald-600">{session.todayQ.answerKey}</div></div>)}
                         </div>
                     ) : (
                         session.todayQ.options?.map((opt, i) => (
                           <button key={i} disabled={session.isSubmitted} onClick={() => handleSubmit(opt)} className={`w-full p-4 rounded-2xl border-2 text-left text-sm font-bold transition-all ${session.isSubmitted && opt === session.todayQ?.answerKey ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : session.isSubmitted && session.selectedOpt === opt ? 'bg-rose-50 border-rose-500 text-rose-700' : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-600'}`}><MathRender content={opt}/></button>
                         ))
                     )}
                  </div>
                  
                  {session.isSubmitted && (
                      <div className="mt-8 animate-fade-in space-y-4">
                          <div className={`text-center font-black text-lg ${session.isCorrect ? 'text-emerald-600' : 'text-slate-400'}`}>
                              {session.isCorrect ? 'Tuyệt vời! Bạn đã hoàn thành.' : 'Rất tiếc, câu trả lời chưa đúng.'}
                          </div>
                          
                          <button 
                              onClick={handleAskAI}
                              className="w-full bg-roboki-50 text-roboki-600 py-3 rounded-2xl font-bold border border-roboki-100 flex items-center justify-center gap-2 hover:bg-roboki-100 transition-all shadow-sm"
                          >
                              <MessageCircle size={20}/> Hỏi Roboki giải thích chi tiết
                          </button>
                      </div>
                  )}
               </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-400 font-medium animate-pulse">Đang tải câu hỏi...</div>
            )}
        </div>
    );
};
// 10. GARDEN SCREEN (CHẾ ĐỘ TẤT TAY: DÙNG 1 LẦN LÀ HẾT KHO)
const GardenScreen: React.FC<{
  user: UserProfile;
  onUpdateUser: (u: UserProfile) => void; 
  onSaveAndExit: (u: UserProfile) => void;
}> = ({ user, onUpdateUser, onSaveAndExit }) => {
  const [msg, setMsg] = useState('');
  const [animating, setAnimating] = useState(false);
  
  const [showLevelInfo, setShowLevelInfo] = useState(false);
  const [infoTab, setInfoTab] = useState<'LEVELS' | 'ITEMS'>('LEVELS');

  // Cấu hình 50 Cấp độ
  const TREE_STAGES = [
    { level: 1, name: 'Hạt Giống Hy Vọng', icon: '🌰', maxExp: 50 },
    { level: 2, name: 'Mầm Non Tỉnh Giấc', icon: '🌱', maxExp: 80 },
    { level: 3, name: 'Chồi Non Vươn Lên', icon: '🌿', maxExp: 120 },
    { level: 4, name: 'Cây Con 1 Lá', icon: '🌱', maxExp: 160 },
    { level: 5, name: 'Cây Con 2 Lá', icon: '🪴', maxExp: 200 },
    { level: 6, name: 'Cây Con 3 Lá', icon: '🪴', maxExp: 250 },
    { level: 7, name: 'Bụi Cỏ Xanh', icon: '🌾', maxExp: 300 },
    { level: 8, name: 'Bụi Cây Nhỏ', icon: '🌳', maxExp: 360 },
    { level: 9, name: 'Cây Non Cứng Cáp', icon: '🌳', maxExp: 420 },
    { level: 10, name: 'Cây Xanh Tốt', icon: '🌳', maxExp: 500 },
    { level: 11, name: 'Cây Tre Kiên Cường', icon: '🎍', maxExp: 600 },
    { level: 12, name: 'Cây Trúc Quân Tử', icon: '🎋', maxExp: 700 },
    { level: 13, name: 'Cây Thông Noel', icon: '🎄', maxExp: 850 },
    { level: 14, name: 'Cây Cọ Nhiệt Đới', icon: '🌴', maxExp: 1000 },
    { level: 15, name: 'Cây Xương Rồng', icon: '🌵', maxExp: 1200 },
    { level: 16, name: 'Cây Nấm Khổng Lồ', icon: '🍄', maxExp: 1400 },
    { level: 17, name: 'Hoa Hướng Dương', icon: '🌻', maxExp: 1600 },
    { level: 18, name: 'Hoa Hồng Gai', icon: '🌹', maxExp: 1800 },
    { level: 19, name: 'Cây Phong Lá Đỏ', icon: '🍁', maxExp: 2100 },
    { level: 20, name: 'Cây Sồi Cổ Thụ', icon: '🌳', maxExp: 2500 },
    { level: 21, name: 'Cây Cam Mọng Nước', icon: '🍊', maxExp: 2900 },
    { level: 22, name: 'Cây Chanh Tươi Mát', icon: '🍋', maxExp: 3300 },
    { level: 23, name: 'Cây Táo Đỏ', icon: '🍎', maxExp: 3800 },
    { level: 24, name: 'Cây Táo Xanh', icon: '🍏', maxExp: 4300 },
    { level: 25, name: 'Cây Lê Ngọt', icon: '🍐', maxExp: 4800 },
    { level: 26, name: 'Cây Đào Tiên', icon: '🍑', maxExp: 5400 },
    { level: 27, name: 'Cây Nho Tím', icon: '🍇', maxExp: 6000 },
    { level: 28, name: 'Cây Dưa Hấu', icon: '🍉', maxExp: 6700 },
    { level: 29, name: 'Cây Dâu Tây', icon: '🍓', maxExp: 7500 },
    { level: 30, name: 'Vườn Trái Cây', icon: '🍒', maxExp: 8300 },
    { level: 31, name: 'Cây Bonsai Vàng', icon: '🎋', maxExp: 9200 },
    { level: 32, name: 'Cây Tiền Tài', icon: '💰', maxExp: 10000 },
    { level: 33, name: 'Cây Ngọc Bích', icon: '💎', maxExp: 11000 },
    { level: 34, name: 'Cây Pha Lê', icon: '🧊', maxExp: 12500 },
    { level: 35, name: 'Cây Lửa Thiêng', icon: '🔥', maxExp: 14000 },
    { level: 36, name: 'Cây Băng Giá', icon: '❄️', maxExp: 16000 },
    { level: 37, name: 'Cây Sấm Sét', icon: '⚡', maxExp: 18000 },
    { level: 38, name: 'Cây Cầu Vồng', icon: '🌈', maxExp: 20000 },
    { level: 39, name: 'Cây Thần Đèn', icon: '🧞', maxExp: 22500 },
    { level: 40, name: 'Cây Rồng Thiêng', icon: '🐉', maxExp: 25000 },
    { level: 41, name: 'Cây Sao Băng', icon: '🌠', maxExp: 28000 },
    { level: 42, name: 'Cây Mặt Trăng', icon: '🌑', maxExp: 31000 },
    { level: 43, name: 'Cây Mặt Trời', icon: '🌞', maxExp: 35000 },
    { level: 44, name: 'Cây Thiên Hà', icon: '🌌', maxExp: 40000 },
    { level: 45, name: 'Cây Hố Đen', icon: '⚫', maxExp: 45000 },
    { level: 46, name: 'Cây Thời Gian', icon: '⏳', maxExp: 50000 },
    { level: 47, name: 'Cây Vô Cực', icon: '♾️', maxExp: 60000 },
    { level: 48, name: 'Cây Sự Sống', icon: '🧬', maxExp: 75000 },
    { level: 49, name: 'Cây Tri Thức', icon: '🧠', maxExp: 90000 },
    { level: 50, name: 'Cây Đấng Sáng Tạo', icon: '👑', maxExp: 100000 },
  ];

  const currentLevel = user.treeLevel || 1;
  const currentExp = user.treeExp || 0;
  const inventory = user.inventory || { water: 10, fertilizer: 3 };
  
  const getStageInfo = (lv: number) => TREE_STAGES.find(s => s.level === lv) || TREE_STAGES[TREE_STAGES.length - 1];
  const stageInfo = getStageInfo(currentLevel);
  
  let progress = 0;
  if (currentLevel >= 50) progress = 100;
  else progress = Math.min(100, (currentExp / stageInfo.maxExp) * 100);

  // 👇 HÀM CHĂM SÓC CÂY (LOGIC TẤT TAY - QUAN TRỌNG) 👇
  const handleCare = (type: 'water' | 'fertilizer') => {
    if (animating) return;
    if (currentLevel >= 50) { setMsg("Cây đã đạt cấp tối đa! Bạn là huyền thoại! 👑"); return; }

    let newInventory = { ...inventory };
    let expGain = 0;
    let message = '';
    let amountUsed = 0; // Biến lưu số lượng đã dùng

    if (type === 'water') {
      // 1. Lấy HẾT số lượng nước đang có
      amountUsed = newInventory.water; 
      
      if (amountUsed <= 0) { 
          setMsg('Hết Nước rồi! Xem cách kiếm thêm nhé.'); 
          setShowLevelInfo(true); 
          setInfoTab('ITEMS'); 
          return; 
      }

      // 2. Set kho về 0 (Dùng sạch sành sanh)
      newInventory.water = 0;
      
      // 3. Tính điểm XP (1 Nước = 1 XP)
      expGain = amountUsed; 
      message = `Đã tưới hết ${amountUsed} Nước! +${expGain} XP 💧`;

    } else {
      // 1. Lấy HẾT số lượng phân bón
      amountUsed = newInventory.fertilizer;

      if (amountUsed <= 0) { 
          setMsg('Hết Phân bón! Xem cách kiếm thêm nhé.'); 
          setShowLevelInfo(true); 
          setInfoTab('ITEMS'); 
          return; 
      }

      // 2. Set kho về 0
      newInventory.fertilizer = 0;

      // 3. Tính điểm XP (1 Phân = 1 XP)
      expGain = amountUsed; 
      message = `Đã bón hết ${amountUsed} Phân! +${expGain} XP 🚀`;
    }

    setAnimating(true);
    setMsg(message);
    playSound('correct');

    // 4. Cộng dồn XP và tính toán nhảy cóc cấp độ (Vòng lặp)
    let newExp = currentExp + expGain;
    let newLevel = currentLevel;
    let levelUpOccurred = false;

    // Vòng lặp: Nếu XP dư nhiều thì lên cấp liên tục
    while (newLevel < 50) {
        const currentStageInfo = getStageInfo(newLevel);
        if (newExp >= currentStageInfo.maxExp) {
            newExp -= currentStageInfo.maxExp;
            newLevel++;
            levelUpOccurred = true;
        } else {
            break;
        }
    }

    if (levelUpOccurred) {
      playSound('levelup');
      const newStageName = getStageInfo(newLevel).name;
      setTimeout(() => alert(`🎉 QUÁ ĐỈNH!\nBạn đã dùng ${amountUsed} vật phẩm và cây tiến hóa thẳng lên cấp ${newLevel}:\n"${newStageName}"`), 500);
    }

    onUpdateUser({ ...user, treeLevel: newLevel, treeExp: newExp, inventory: newInventory });
    setTimeout(() => { setAnimating(false); setMsg(''); }, 2000);
  };

  return (
    <div className="pb-24 pt-4 px-4 h-full flex flex-col bg-gradient-to-b from-sky-100 to-green-50 overflow-y-auto relative">
      <div className="flex items-center justify-between mb-4 z-[40] relative pointer-events-auto shrink-0">
        <div className="flex items-center gap-3">
            <button onClick={() => onSaveAndExit(user)} className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center border border-slate-100 hover:bg-slate-50 active:scale-95 transition-all"><ChevronLeft size={20} className="text-slate-700"/></button>
            <h2 className="text-xl font-black text-green-800 drop-shadow-sm">Khu Vườn Tri Thức</h2>
        </div>
        <button onClick={() => setShowLevelInfo(true)} className="flex items-center gap-1 bg-white text-green-700 px-3 py-1.5 rounded-full text-[10px] font-bold border border-green-200 shadow-sm active:scale-95 transition-transform"><Info size={14}/> Thông tin</button>
      </div>

      {showLevelInfo && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white w-full max-w-sm h-[80%] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
                <div className="p-4 border-b border-green-100 flex justify-between items-center bg-green-50">
                    <h3 className="font-black text-green-800 flex items-center gap-2"><Sprout size={18} className="text-green-600"/> Hướng dẫn Khu vườn</h3>
                    <button onClick={() => setShowLevelInfo(false)} className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-slate-400 shadow-sm hover:bg-slate-50"><X size={16}/></button>
                </div>
                <div className="flex p-2 gap-2 bg-slate-50 border-b border-slate-100">
                    <button onClick={()=>setInfoTab('LEVELS')} className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${infoTab==='LEVELS' ? 'bg-white shadow text-green-600' : 'text-slate-400'}`}>Lộ trình 50 Cấp</button>
                    <button onClick={()=>setInfoTab('ITEMS')} className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${infoTab==='ITEMS' ? 'bg-white shadow text-amber-600' : 'text-slate-400'}`}>Vật phẩm & Cách kiếm</button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
                    {infoTab === 'LEVELS' ? (
                        <>
                            <p className="text-xs text-slate-500 mb-2 italic text-center">Chăm sóc cây để đạt các trạng thái:</p>
                            {TREE_STAGES.map((stage) => {
                                const isCurrent = stage.level === currentLevel;
                                const isPassed = stage.level < currentLevel;
                                return (
                                    <div key={stage.level} className={`flex items-center justify-between p-3 rounded-xl border transition-all ${isCurrent ? 'bg-white border-green-500 shadow-md scale-[1.02] z-10 ring-1 ring-green-200' : isPassed ? 'bg-green-50 border-green-200 opacity-80' : 'bg-slate-100 border-slate-200 grayscale opacity-60'}`}>
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl drop-shadow-sm">{stage.icon}</span>
                                            <div><div className={`font-black text-xs uppercase ${isCurrent ? 'text-green-700' : 'text-slate-600'}`}>Lv.{stage.level} - {stage.name}</div><div className="text-[10px] text-slate-400 font-bold mt-0.5">Mục tiêu: {stage.maxExp} EXP</div></div>
                                        </div>
                                        <div className="text-lg">{isCurrent ? <span className="text-[9px] font-bold bg-green-600 text-white px-2 py-1 rounded-full animate-pulse">HIỆN TẠI</span> : isPassed ? <CheckCircle size={18} className="text-green-500"/> : <Lock size={16} className="text-slate-400"/>}</div>
                                    </div>
                                );
                            })}
                        </>
                    ) : (
                        <div className="space-y-4">
                            <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-sm"><div className="flex items-center gap-3 mb-3"><div className="text-4xl drop-shadow-md">💧</div><div><div className="font-black text-sky-600 text-lg">Nước Thần</div><div className="text-[10px] font-bold text-sky-400 bg-sky-50 px-2 py-0.5 rounded w-fit">Vật phẩm phổ thông</div></div></div><div className="space-y-2 text-xs text-slate-600"><div className="flex gap-2"><span className="font-bold text-sky-500">• Tác dụng:</span><span>Tăng <b>1 EXP</b> cho cây.</span></div><div className="flex flex-col gap-1"><span className="font-bold text-sky-500">• Cách kiếm (Làm bao nhiêu hưởng bấy nhiêu):</span><ul className="list-disc list-inside space-y-1 ml-1 text-slate-500"><li>Làm bài tập / Chơi game: <b>1 Điểm = 1 Nước</b>.</li><li>Ví dụ: Bạn được 8 điểm ➔ Nhận ngay 8 Nước.</li><li>Điểm tối thiểu: Luôn nhận ít nhất 1 Nước dù điểm thấp.</li></ul></div></div></div>
                            <div className="bg-white p-4 rounded-2xl border border-amber-100 shadow-sm"><div className="flex items-center gap-3 mb-3"><div className="text-4xl drop-shadow-md">🧪</div><div><div className="font-black text-amber-600 text-lg">Phân Bón</div><div className="text-[10px] font-bold text-amber-400 bg-amber-50 px-2 py-0.5 rounded w-fit">Vật phẩm thưởng thêm</div></div></div><div className="space-y-2 text-xs text-slate-600"><div className="flex gap-2"><span className="font-bold text-amber-500">• Tác dụng:</span><span>Tăng <b>1 EXP</b> cho cây.</span></div><div className="flex flex-col gap-1"><span className="font-bold text-amber-500">• Cách kiếm (Phần thưởng xuất sắc):</span><ul className="list-disc list-inside space-y-1 ml-1 text-slate-500"><li>Thi thử đạt <b>8 - 9 điểm</b>: Tặng thêm <b>1 Phân bón</b>.</li><li>Thi thử đạt <b>9 - 10 điểm</b>: Tặng thêm <b>2 Phân bón</b>.</li><li>Chơi Game đạt <b>trên 10 điểm</b>: Tặng thêm <b>1 Phân bón</b>.</li></ul></div></div></div>
                            <div className="text-center text-[10px] text-slate-400 italic bg-slate-100 p-2 rounded-xl">*Mẹo: Hãy cố gắng đạt điểm cao để nhận cả Nước lẫn Phân bón!</div>
                        </div>
                    )}
                </div>
                <button onClick={() => setShowLevelInfo(false)} className="m-4 bg-green-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-green-200 active:scale-95 transition-transform">Đã hiểu</button>
            </div>
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-start relative z-10 min-h-[500px]">
        <div className="text-center mb-6 shrink-0">
          <div className="inline-block bg-green-100 text-green-700 font-black uppercase text-xs px-3 py-1 rounded-full mb-2 tracking-widest shadow-sm border border-green-200">Cấp độ {currentLevel}/50</div>
          <h1 className="text-3xl font-black text-slate-800 drop-shadow-md">{stageInfo.name}</h1>
          <p className="text-slate-500 text-sm font-medium mt-1">{currentLevel < 50 ? 'Hãy chăm sóc để cây tiến hóa tiếp!' : 'Đỉnh cao của sự sống!'}</p>
        </div>

        <div className={`relative transition-all duration-500 my-4 ${animating ? 'scale-110' : 'scale-100'}`}>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-400/20 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
           <div className="text-[160px] drop-shadow-2xl filter animate-bounce-slow cursor-pointer select-none transform transition-transform hover:-translate-y-2 select-none z-20 relative">{stageInfo.icon}</div>
           {/* 👇 ĐOẠN ĐÃ SỬA: CĂN GIỮA, CHỮ NHỎ, KHÔNG BỊ TRÀN MÀN HÌNH 👇 */}
           {animating && (
             <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-50 w-max max-w-[280px] flex justify-center pointer-events-none">
                 <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-amber-200 shadow-xl animate-bounce">
                     <div className="text-amber-600 font-black text-xs text-center whitespace-normal leading-tight">
                        {msg.split('!')[0]}
                     </div>
                 </div>
             </div>
           )}
           {/* 👆 KẾT THÚC ĐOẠN SỬA 👆 */}
        </div>

        <div className="w-full max-w-xs mt-8 mb-8 relative z-20 shrink-0">
           <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5 px-1"><span>EXP: {currentExp} / {currentLevel >= 50 ? 'MAX' : stageInfo.maxExp}</span><span>{Math.round(progress)}%</span></div>
           <div className="h-6 bg-white rounded-full border-2 border-green-100 p-1 shadow-inner"><div className="h-full bg-gradient-to-r from-lime-400 to-green-500 rounded-full transition-all duration-700 ease-out shadow-sm relative overflow-hidden" style={{ width: `${progress}%` }}><div className="absolute top-0 left-0 w-full h-full bg-white/30 animate-[shimmer_2s_infinite]"></div></div></div>
        </div>
      
        <div className="w-full bg-white rounded-[2rem] p-6 shadow-[0_-10px_60px_rgba(0,0,0,0.15)] z-40 border border-slate-50 relative shrink-0">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 shadow-sm border border-slate-100">Kho vật phẩm</div>
            <div className="flex gap-4 mt-2">
                <button onClick={() => handleCare('water')} disabled={inventory.water <= 0 || currentLevel >= 50} className={`flex-1 p-4 rounded-3xl border-b-4 flex flex-col items-center gap-2 transition-all active:scale-95 active:border-b-0 active:translate-y-1 ${inventory.water > 0 ? 'bg-sky-50 border-sky-200 hover:bg-sky-100' : 'bg-slate-50 border-slate-200 grayscale opacity-60'}`}><div className="text-4xl drop-shadow-md">💧</div><div><div className="font-black text-slate-700">Tưới nước</div><div className="text-xs text-sky-600 font-bold bg-sky-100 px-2 py-0.5 rounded-lg mt-1">Còn: {inventory.water}</div></div></button>
                <button onClick={() => handleCare('fertilizer')} disabled={inventory.fertilizer <= 0 || currentLevel >= 50} className={`flex-1 p-4 rounded-3xl border-b-4 flex flex-col items-center gap-2 transition-all active:scale-95 active:border-b-0 active:translate-y-1 ${inventory.fertilizer > 0 ? 'bg-amber-50 border-amber-200 hover:bg-amber-100' : 'bg-slate-50 border-slate-200 grayscale opacity-60'}`}><div className="text-4xl drop-shadow-md">🧪</div><div><div className="font-black text-slate-700">Bón phân</div><div className="text-xs text-amber-600 font-bold bg-amber-100 px-2 py-0.5 rounded-lg mt-1">Còn: {inventory.fertilizer}</div></div></button>
            </div>
            {msg && !animating && <div className="mt-4 text-center text-rose-500 text-xs font-bold animate-pulse">{msg}</div>}
        </div>
      </div>
    </div>
  );
};// 9. CHAT SCREEN (Đã phục hồi)
const ChatScreen: React.FC<{ onBack: () => void, initialPrompt: string }> = ({ onBack, initialPrompt }) => {
    const [showCopyOverlay, setShowCopyOverlay] = useState(!!initialPrompt);
    useEffect(() => {
        if(initialPrompt) {
            const timer = setTimeout(() => setShowCopyOverlay(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [initialPrompt]);

    return (
        <div className="h-full flex flex-col bg-slate-50 relative">
            <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-slate-100 shadow-sm shrink-0 z-10">
                <div className="flex items-center gap-3">
                   <button onClick={onBack} className="w-10 h-10 rounded-full hover:bg-slate-50 flex items-center justify-center text-slate-500"><ChevronLeft size={24}/></button>
                   <div className="flex items-center gap-2"><div className="w-10 h-10 bg-gradient-to-tr from-roboki-500 to-orange-500 rounded-full flex items-center justify-center text-white shadow-md"><Bot size={20} /></div><div><div className="font-black text-slate-800 text-sm">Roboki AI</div><div className="text-[10px] text-emerald-500 font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Kết nối trực tiếp</div></div></div>
                </div>
            </div>
            <div className="flex-1 relative bg-white overflow-hidden">
                <iframe src="https://roboki.vn/" className="w-full h-full border-none" title="Roboki.vn" allow="microphone; camera; clipboard-write; clipboard-read" sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"/>
                {showCopyOverlay && (<div className="absolute top-4 left-4 right-4 bg-slate-800/90 text-white p-4 rounded-xl shadow-xl flex items-start gap-3 backdrop-blur-sm animate-fade-in z-50"><CheckCircle className="text-emerald-400 shrink-0 mt-0.5" size={20} /><div className="flex-1"><div className="font-bold text-sm mb-1">Đã sao chép câu hỏi!</div><div className="text-xs text-slate-300">Hãy <b>Đăng nhập</b> vào Roboki, sau đó <b>dán (Paste)</b> câu hỏi vào khung chat để Roboki giải đáp nhé.</div></div><button onClick={() => setShowCopyOverlay(false)} className="text-slate-400 hover:text-white"><X size={16}/></button></div>)}
            </div>
        </div>
    );
};

// --- MAIN APP COMPONENT ---
const App: React.FC = () => {
  const [isClient, setIsClient] = useState(false); useEffect(() => setIsClient(true), []);
  const [user, setUser] = useState<UserProfile | null>(null);
  // 👇 Đã thêm | 'GARDEN' vào cuối dòng
const [screen, setScreen] = useState<'AUTH' | 'HOME' | 'PRACTICE' | 'MOCK_TEST' | 'EXAM' | 'GAME' | 'CHALLENGE' | 'LEADERBOARD' | 'CHAT' | 'PROFILE' | 'AUTHOR' | 'GARDEN'>('AUTH');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [copyText, setCopyText] = useState('');
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  // 👇 THÊM DÒNG NÀY: Biến tạm để cộng dồn điểm
 // 👇 Thêm "mock: 0" vào giữa
const pendingUpdates = useRef({ game: 0, practice: 0, exam: 0, challenge: 0, mock: 0, total: 0 });
  
  // State cũ
  const [practiceSession, setPracticeSession] = useState<PracticeSessionData>(INITIAL_PRACTICE_STATE);
  const [mockTestSession, setMockTestSession] = useState<MockTestSessionData>(INITIAL_MOCK_TEST_STATE);
  const [gameSession, setGameSession] = useState<GameSessionData>(INITIAL_GAME_STATE);
  const [challengeSession, setChallengeSession] = useState<ChallengeSessionData>(INITIAL_CHALLENGE_STATE);
  
  // 👇 STATE MỚI CHO THI THỬ
  const [examSession, setExamSession] = useState<ExamSessionData>(INITIAL_EXAM_STATE);

  const [selectedTopic, setSelectedTopic] = useState<{id: string, label: string} | null>(null);
  const [expandedLessonIds, setExpandedLessonIds] = useState<string[]>([]);

  // ✅ ĐOẠN MỚI: TỰ ĐỘNG ĐĂNG NHẬP TỪ CACHE (Tiết kiệm Read)
useEffect(() => { 
  const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      // 1. Thử lấy User từ bộ nhớ máy trước
      const cachedUser = localStorage.getItem('roboki_user');
      
      if (cachedUser) {
          const parsedUser = JSON.parse(cachedUser);
          // So khớp UID để đảm bảo an toàn
          if (parsedUser.uid === firebaseUser.uid) {
              console.log("👤 Đăng nhập nhanh từ Cache (0 tốn Read)");
              setUser(parsedUser);
              setScreen('HOME');
              return; // 🛑 QUAN TRỌNG: Dừng lại, không gọi Firebase nữa
          }
      }

      // 2. Nếu không có Cache thì mới chịu gọi Firebase (Tốn 1 Read)
      console.log("☁️ Tải hồ sơ từ Firebase...");
      try {
          const docSnap = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (docSnap.exists()) {
              const userData = docSnap.data() as UserProfile;
              setUser(userData);
              // Lưu ngay vào Cache
              localStorage.setItem('roboki_user', JSON.stringify(userData));
          } else {
              // Trường hợp hiếm: User auth có nhưng data chưa có
              const fallback: UserProfile = { 
                  uid: firebaseUser.uid, 
                  name: firebaseUser.displayName || 'Học sinh', 
                  email: firebaseUser.email || '', 
                  class: '12', school: 'THPT Tự do', 
                  totalScore: 0, practiceScore: 0, gameScore: 0, challengeScore: 0, examScore: 0, rank: 999 
              };
              await setDoc(doc(db, 'users', firebaseUser.uid), fallback);
              setUser(fallback);
              localStorage.setItem('roboki_user', JSON.stringify(fallback));
          }
          setScreen('HOME');
      } catch (e) {
          console.error("Lỗi login:", e);
      }

    } else {
      // Xử lý đăng xuất
      setUser(null);
      setScreen('AUTH');
      localStorage.removeItem('roboki_user'); // Xóa cache để bảo mật
    }
  }); 
  
  return () => unsub(); 
}, []);
// ✅ CODE MỚI: TỰ ĐỘNG LƯU USER VÀO MÁY KHI CÓ THAY ĐỔI
useEffect(() => {
    if (user) {
        localStorage.setItem('roboki_user', JSON.stringify(user));
    }
}, [user]); // Chạy mỗi khi biến 'user' thay đổi (cộng điểm, sửa tên...)
// ✅ THÊM ĐOẠN NÀY NGAY DƯỚI ĐỂ CẬP NHẬT CACHE KHI CHƠI GAME
useEffect(() => {
    if (user) {
        localStorage.setItem('roboki_user', JSON.stringify(user));
    }
}, [user]);
  
// ✅ CODE TỐI ƯU: CHỈ TỐN 1 READ ĐỂ KIỂM TRA DỮ LIỆU MỚI
  useEffect(() => { 
    const fetchData = async () => { 
      try { 
        setLoadingData(true); 
        
        // 1. Lấy thông tin từ bộ nhớ máy
        const cachedQuestions = localStorage.getItem('questions_cache');
        const cachedLessons = localStorage.getItem('lessons_cache');
        const localVersion = localStorage.getItem('data_version');
        
        // Cấu hình thời gian cache (ví dụ 1 tiếng để kiểm tra version 1 lần)
        const cacheTime = localStorage.getItem('data_cache_time');
        const CACHE_CHECK_INTERVAL = 1000 * 60 * 30; // 1 Tiếng
        
        // Kiểm tra xem đã đến lúc cần check server chưa?
        const needCheckServer = !cacheTime || (Date.now() - parseInt(cacheTime) > CACHE_CHECK_INTERVAL);

        // NẾU CÓ DATA VÀ CHƯA ĐẾN GIỜ CHECK -> DÙNG LUÔN (0 READ)
        if (cachedQuestions && cachedLessons && !needCheckServer) {
            console.log("✅ Dùng Cache (Chưa đến giờ check)");
            setQuestions(JSON.parse(cachedQuestions));
            setLessons(JSON.parse(cachedLessons));
            setLoadingData(false);
            return;
        }

        // NẾU ĐẾN GIỜ CHECK -> GỌI 1 READ ĐỂ XEM VERSION
        console.log("🔍 Kiểm tra phiên bản mới từ Firebase...");
        const versionSnap = await getDoc(doc(db, 'system', 'info'));
        const remoteVersion = versionSnap.exists() ? versionSnap.data().version : 0;

        // SO SÁNH VERSION
        if (cachedQuestions && cachedLessons && localVersion && parseInt(localVersion) === remoteVersion) {
            console.log("🛡️ Dữ liệu khớp version -> KHÔNG TẢI LẠI (Tiết kiệm Reads)");
            // Cập nhật lại thời gian check để 1 tiếng sau mới check tiếp
            localStorage.setItem('data_cache_time', Date.now().toString());
            
            setQuestions(JSON.parse(cachedQuestions));
            setLessons(JSON.parse(cachedLessons));
        } else {
            console.log("🚀 Phát hiện Version mới -> TẢI DỮ LIỆU VỀ MÁY...");
            
            const lS = await getDocs(collection(db, 'lessons')); 
            const lL: Lesson[] = []; 
            lS.forEach(d => lL.push(d.data() as Lesson)); 
            
            const qS = await getDocs(collection(db, 'questions')); 
            const lQ: Question[] = []; 
            qS.forEach(d => lQ.push(d.data() as Question)); 
            
            setLessons(lL);
            setQuestions(lQ);

            // Lưu dữ liệu + Version mới vào máy
            localStorage.setItem('lessons_cache', JSON.stringify(lL));
            localStorage.setItem('questions_cache', JSON.stringify(lQ));
            localStorage.setItem('data_cache_time', Date.now().toString());
            localStorage.setItem('data_version', remoteVersion.toString());
        }
      } catch (e) { 
        console.error(e);
        setToastMsg("Lỗi tải data (Có thể do mạng)"); 
        // Fallback: Nếu lỗi mạng, cố gắng dùng cache cũ nếu có
        const cachedQ = localStorage.getItem('questions_cache');
        if(cachedQ) setQuestions(JSON.parse(cachedQ));
      } finally { 
        setLoadingData(false); 
      } 
    }; 
    
    fetchData(); 
  }, []);

  // --- HÀM NẠP DATA THÔNG MINH (CHỈ NẠP CÂU MỚI) ---
  const handleNap = async () => {
    if (!user || user.email !== 'lebaoanhnss@gmail.com') return;
    
    // 1. Tính toán sự chênh lệch (Chỉ lấy những cái chưa có trên DB)
    const questionsToUpload = QUESTION_BANK.filter(localQ => 
      !questions.some(dbQ => dbQ.id === localQ.id)
    );

    const lessonsToUpload = PHYSICS_LESSONS.filter(localL => 
      !lessons.some(dbL => dbL.id === localL.id)
    );

    const totalNew = questionsToUpload.length + lessonsToUpload.length;

    // 2. Hỏi ý kiến người dùng
    let mode = 'NEW_ONLY'; // Mặc định chỉ nạp mới
    
    if (totalNew === 0) {
      if (!confirm("Hệ thống không tìm thấy câu hỏi/bài học mới nào (dựa trên ID).\n\nThầy có muốn NẠP LẠI TOÀN BỘ dữ liệu để cập nhật các sửa đổi nội dung không? (Sẽ lâu hơn)")) return;
      mode = 'ALL';
    } else {
      if (!confirm(`Phát hiện:\n- ${questionsToUpload.length} câu hỏi mới\n- ${lessonsToUpload.length} bài học mới.\n\nThầy có muốn NẠP NHANH các mục này không?`)) return;
    }

    setToastMsg("Đang xử lý...");
    setLoadingData(true);

    try {
      const batchSize = 400; 
      let batchCount = 0;
      
      const targetLessons = mode === 'NEW_ONLY' ? lessonsToUpload : PHYSICS_LESSONS;
      const targetQuestions = mode === 'NEW_ONLY' ? questionsToUpload : QUESTION_BANK;

      // 3. THỰC HIỆN NẠP (BATCH WRITE)
      // -- Nạp Bài học --
      if (targetLessons.length > 0) {
        for (let i = 0; i < targetLessons.length; i += batchSize) {
          const chunk = targetLessons.slice(i, i + batchSize);
          const batch = writeBatch(db);
          chunk.forEach(l => batch.set(doc(db, 'lessons', l.id), l));
          await batch.commit();
        }
      }

      // -- Nạp Câu hỏi --
      if (targetQuestions.length > 0) {
        for (let i = 0; i < targetQuestions.length; i += batchSize) {
          const chunk = targetQuestions.slice(i, i + batchSize);
          const batch = writeBatch(db);
          chunk.forEach(q => batch.set(doc(db, 'questions', q.id), q));
          await batch.commit();
          batchCount++;
          if(mode === 'ALL') setToastMsg(`Đang nạp gói ${batchCount}...`);
        }
      }

      setToastMsg(`✅ Đã nạp thành công ${targetQuestions.length} câu hỏi và ${targetLessons.length} bài học!`);
      // 👇 THÊM ĐOẠN NÀY: Cập nhật phiên bản hệ thống lên Firebase (Tạo 1 Write)
      // Dùng thời gian hiện tại làm mã phiên bản (luôn là số mới nhất)
      await setDoc(doc(db, 'system', 'info'), { version: Date.now() });
      // 👇 THÊM 3 DÒNG NÀY ĐỂ XÓA CACHE CŨ 👇
      localStorage.removeItem('questions_cache');
      localStorage.removeItem('lessons_cache');
      localStorage.removeItem('data_cache_time');
      localStorage.removeItem('data_version'); // Xóa cả version cũ
      // 👆 KẾT THÚC THÊM 👆
      setTimeout(() => window.location.reload(), 1500);

    } catch (e: any) {
      console.error(e);
      setToastMsg(`❌ Lỗi: ${e.message}`);
    } finally {
      setLoadingData(false);
    }
  };

  // --- LOGIC TÍNH ĐIỂM (ĐÃ SỬA CHUẨN) ---
// ✅ DÁN ĐOẠN NÀY VÀO (Code mới: Chỉ cộng dồn, không gửi ngay)
// 👇 HÀM TÍNH ĐIỂM & QUÀ TẶNG (LOGIC & MÔ TẢ MỚI)
// --- HÀM CẬP NHẬT BIỂU ĐỒ (Chèn vào trong App) ---
  // --- HÀM CẬP NHẬT BIỂU ĐỒ (Mới thêm vào) ---
  const updateTopicStats = async (topic: string, isCorrect: boolean) => {
    if (!user || !topic) return;

    setUser(prev => {
        if (!prev) return null;
        
        // Lấy thống kê hiện tại
        const currentStats = prev.topicStats || {};
        const topicData = currentStats[topic] || { correct: 0, total: 0 };
        
        // Tính toán số liệu mới
        const newStats = {
            ...currentStats,
            [topic]: {
                correct: topicData.correct + (isCorrect ? 1 : 0),
                total: topicData.total + 1
            }
        };

        // Lưu ngầm lên Firebase
        updateDoc(doc(db, 'users', prev.uid), { topicStats: newStats }).catch(e => console.log("Lỗi lưu stats:", e));
        
        // Cập nhật giao diện ngay lập tức
        return { ...prev, topicStats: newStats };
    });
  };
// --- HÀM XỬ LÝ CHUYỂN HƯỚNG HỌC TẬP (Deep Link) ---
  const handleDeepLinkStudy = (topicLabel: string) => {
      // Danh sách chủ đề để đối chiếu
      const TOPICS = [
          { id: 't1', label: 'VẬT LÍ NHIỆT' }, 
          { id: 't2', label: 'KHÍ LÍ TƯỞNG' }, 
          { id: 't3', label: 'TỪ TRƯỜNG' }, 
          { id: 't4', label: 'HẠT NHÂN & PHÓNG XẠ' }
      ];
      
      // Tìm chủ đề tương ứng với nhãn (label)
      const targetTopic = TOPICS.find(t => t.label === topicLabel);
      
      if (targetTopic) {
          setSelectedTopic(targetTopic); // Chọn chủ đề
          setScreen('HOME'); // Chuyển về màn hình chính để hiển thị bài học
      } else {
          setScreen('PRACTICE'); // Nếu không tìm thấy thì vào trang Luyện tập
      }
  };
  // 👇 HÀM TÍNH ĐIỂM & QUÀ TẶNG (LOGIC CŨ - GIỮ NGUYÊN)
  const handleScore = (pts: number, type: 'game'|'practice'|'exam'|'challenge'|'mock' = 'game') => { 
    if(!user) return; 

    // 1. Phát nhạc
    if (pts > 0) playSound('correct'); 
    else playSound('wrong');

    // 2. Cộng điểm tích lũy
    if (type === 'game') pendingUpdates.current.game += pts;
    else if (type === 'practice') { pendingUpdates.current.practice += pts; pendingUpdates.current.total += pts; }
    else if (type === 'mock') { pendingUpdates.current.mock += pts; pendingUpdates.current.total += pts; }
    else if (type === 'exam') { pendingUpdates.current.exam += pts; pendingUpdates.current.total += pts; }
    else if (type === 'challenge') { pendingUpdates.current.challenge += pts; pendingUpdates.current.total += pts; }

    // --- 3. TÍNH TOÁN VẬT PHẨM & MÔ TẢ ---
    let dropMsg = '';
    
    if (pts > 0) {
        const currentInv = user.inventory || { water: 0, fertilizer: 0 };
        const newInv = { ...currentInv };
        let hasDrop = false;
        
        let addWater = 0;
        let addFertilizer = 0;

        // A. CHẾ ĐỘ THI CỬ (Exam / Mock)
        if (type === 'exam' || type === 'mock') {
            addWater = Math.floor(pts); 
            if (pts >= 9) addFertilizer = 2; 
            else if (pts >= 8) addFertilizer = 1; 
        } 
        // B. CHẾ ĐỘ KHÁC (Luyện tập / Game / Thử thách)
        else {
            addWater = Math.floor(pts);
            if (addWater < 1) addWater = 1; 
            if (pts >= 10) addFertilizer = 1; 
        }

        // Cập nhật kho và tạo thông báo
        if (addWater > 0 || addFertilizer > 0) {
            newInv.water += addWater;
            newInv.fertilizer += addFertilizer;
            hasDrop = true;

            if (addFertilizer > 0) dropMsg = ` | 🎁 +${addFertilizer} Phân & +${addWater} Nước`;
            else dropMsg = ` | 🎁 +${addWater} Nước`;
        }

        // Lưu vào Firebase
        if (hasDrop) {
            setUser(prev => prev ? ({ ...prev, inventory: newInv }) : null);
            updateDoc(doc(db, 'users', user.uid), { inventory: newInv }).catch(console.error);
        }
    }

    // 4. Cập nhật giao diện điểm
    setUser(prev => {
        if (!prev) return null;
        const nu = { ...prev };
        if (typeof nu.mockScore === 'undefined') nu.mockScore = 0; 

        if (type === 'game') nu.gameScore = (nu.gameScore || 0) + pts;
        else if (type === 'practice') { nu.practiceScore = (nu.practiceScore || 0) + pts; nu.totalScore = (nu.totalScore || 0) + pts; }
        else if (type === 'mock') { nu.mockScore = (nu.mockScore || 0) + pts; nu.totalScore = (nu.totalScore || 0) + pts; }
        else if (type === 'exam') { nu.examScore = (nu.examScore || 0) + pts; nu.totalScore = (nu.totalScore || 0) + pts; }
        else if (type === 'challenge') { nu.challengeScore = (nu.challengeScore || 0) + pts; nu.totalScore = (nu.totalScore || 0) + pts; }
        return nu;
    });
    
    const sign = pts > 0 ? '+' : '';
    setToastMsg(`${sign}${pts} điểm${dropMsg}`); 
  };

// --- HÀM LƯU DỮ LIỆU (CHỈ GỌI 1 LẦN KHI KẾT THÚC) ---
const saveData = async () => {
    if (!user) return;
    const updates = pendingUpdates.current;
    
    // Kiểm tra xem có điểm nào thay đổi không
    if (Object.values(updates).every(val => val === 0)) return;

    const firestoreUpdates: any = {};
    // Chỉ cập nhật những trường có thay đổi
    if (updates.game !== 0) firestoreUpdates.gameScore = increment(updates.game);
    if (updates.practice !== 0) firestoreUpdates.practiceScore = increment(updates.practice);
    if (updates.mock !== 0) firestoreUpdates.mockScore = increment(updates.mock); // 👈 Lưu điểm Mock lên Firebase
    if (updates.exam !== 0) firestoreUpdates.examScore = increment(updates.exam);
    if (updates.challenge !== 0) firestoreUpdates.challengeScore = increment(updates.challenge);
    if (updates.total !== 0) firestoreUpdates.totalScore = increment(updates.total);

    // Reset biến tạm về 0 (bao gồm cả mock)
    pendingUpdates.current = { game: 0, practice: 0, exam: 0, challenge: 0, mock: 0, total: 0 };
    
    // Gửi lên Firebase 1 lần duy nhất
    try {
        await updateDoc(doc(db, 'users', user.uid), firestoreUpdates);
        console.log("Đã lưu điểm lên hệ thống!");
        // 👇👇👇 THÊM 2 DÒNG NÀY VÀO ĐÂY 👇👇👇
      localStorage.removeItem('bxh_ALL_TOTAL'); // Xóa cache BXH Tổng
      localStorage.removeItem('time_bxh_ALL_TOTAL'); // Xóa mốc thời gian BXH Tổng
      // 👆👆👆 KẾT THÚC THÊM 👆👆👆
    } catch (error) {
        console.error("Lỗi lưu điểm:", error);
    }
};

  // 👇 HÀM CHUYỂN TRANG CÓ ÂM THANH 👇
  const navigateTo = (newScreen: any) => {
      // 1. Phát tiếng click
            
      // 2. Lưu điểm cũ
      saveData(); 
      
      // 3. Chuyển trang
      setScreen(newScreen); 
  };
  // --- HÀM RESET ĐIỂM (CHO ADMIN) - ĐÃ SỬA LỖI ---
  // --- HÀM RESET ĐIỂM (FIXED: RELOAD TRANG ĐỂ XÓA SẠCH RAM) ---
  const resetAll = async () => {
      if (!user) return;
      if (!confirm("⚠️ CẢNH BÁO: Thầy có chắc chắn muốn RESET toàn bộ điểm về 0 không?\n(Trang web sẽ tự tải lại sau khi reset)")) return;
      
      try {
          // 1. Cực kỳ quan trọng: Xóa sạch bộ nhớ đệm trước
          // 👇 Thêm "mock: 0" vào giữa
pendingUpdates.current = { game: 0, practice: 0, exam: 0, challenge: 0, mock: 0, total: 0 };
          
          // 2. Gửi lệnh đè (set) số 0 lên Firebase ngay lập tức
          // Dùng setDoc với merge:true để đảm bảo nó ghi đè giá trị chứ không cộng dồn
          await setDoc(doc(db, 'users', user.uid), {
              totalScore: 0,
              practiceScore: 0,
              gameScore: 0,
              challengeScore: 0,
              examScore: 0
          }, { merge: true });
          
          alert("✅ Đã xóa toàn bộ điểm thành công!");
          
          // 3. Tải lại trang ngay lập tức để xóa sạch mọi biến tạm trong React
          window.location.reload(); 
          
      } catch (e) {
          console.error(e);
          alert("Lỗi khi reset, vui lòng kiểm tra mạng!");
      }
  };
  const handleCopy = (txt: string) => { navigator.clipboard.writeText(txt); setCopyText(txt); setScreen('CHAT'); };
  const handleToggleLesson = (id: string) => { setExpandedLessonIds(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]); };

  if (!isClient) return null;
  if (!user) return <><AuthScreen onLoginSuccess={(u)=>{setUser(u); setScreen('HOME')}} />{toastMsg && <Toast message={toastMsg} onClose={()=>setToastMsg(null)}/>}</>;
  if (loadingData) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin"/></div>;

  return (
    <div className="max-w-md mx-auto h-[100dvh] bg-white shadow-2xl overflow-hidden relative font-sans text-slate-800 flex flex-col">
        {/* Nút Admin (Giữ nguyên logic cũ) */}
        {user.email === 'lebaoanhnss@gmail.com' && <div className="fixed bottom-24 right-4 z-50 flex flex-col gap-2"><button onClick={resetAll} className="bg-rose-600 text-white p-3 rounded-full shadow-xl flex items-center gap-2 text-xs font-bold"><Trash2 size={16}/> Reset All</button><button onClick={handleNap} className="bg-indigo-600 text-white p-3 rounded-full shadow-xl flex items-center gap-2 text-xs font-bold"><ShieldAlert size={16}/> Nạp Data</button></div>}
        
        <div className="flex-1 overflow-y-auto w-full relative pb-24">
            {screen === 'HOME' && (
                <ContentScreen 
                    user={user} 
                    onCopy={handleCopy} 
                    onNavToPractice={()=>navigateTo('PRACTICE')} 
                    onNavToMockTest={()=>navigateTo('MOCK_TEST')} 
                    onNavToExam={()=>navigateTo('EXAM')} 
                    
                    // 👇👇👇 THÊM DÒNG NÀY VÀO ĐÂY 👇👇👇
                    onNavToGarden={() => navigateTo('GARDEN')}
                    // 👆👆👆 
                    
                    onNavToGames={()=>navigateTo('GAME')} 
                    onNavToChallenge={()=>navigateTo('CHALLENGE')} 
                    onNavToLeaderboard={()=>navigateTo('LEADERBOARD')} 
                    onNavToProfile={()=>navigateTo('PROFILE')} 
                  
                    onNavToChat={()=>{setCopyText('');navigateTo('CHAT')}} 
                    selectedTopic={selectedTopic} 
                    setSelectedTopic={setSelectedTopic} 
                    expandedLessonIds={expandedLessonIds} 
                    toggleLesson={handleToggleLesson} 
                    lessons={lessons}
                />
            )}
            
            {/* 👇 KẾT NỐI HÀM LƯU DỮ LIỆU VÀO CÁC MÀN HÌNH 👇 */}
            {screen === 'PRACTICE' && (
                <PracticeScreen 
                    onCopy={handleCopy} 
                    onScore={handleScore} 
                    
                    // 👇 ĐÃ THÊM DÒNG NÀY ĐỂ TRUYỀN HÀM XUỐNG 👇
                    onUpdateStats={updateTopicStats} 
                    // 👆
                    
                    sessionData={practiceSession} 
                    setSessionData={setPracticeSession} 
                    questions={questions} 
                    lessons={lessons} 
                    onSave={saveData} 
                    onExit={()=>navigateTo('HOME')}
                />
            )}
            {screen === 'MOCK_TEST' && <MockTestScreen onBack={()=>navigateTo('HOME')} session={mockTestSession} setSession={setMockTestSession} questions={questions} onScore={handleScore} onCopy={handleCopy} onSave={saveData}/>}
            {screen === 'EXAM' && (
  <ExamScreen 
    onBack={() => navigateTo('HOME')} 
    session={examSession} 
    setSession={setExamSession} 
    questions={questions} 
    onScore={handleScore} 
    onSave={saveData}
    onCopy={handleCopy} // 👈 NHỚ THÊM DÒNG NÀY
  />
)}
           
            {screen === 'GAME' && <GameScreen onCopy={handleCopy} onScore={handleScore} sessionData={gameSession} setSessionData={setGameSession} questions={questions}/>}
           {screen === 'CHALLENGE' && (
    <ChallengeScreen 
        onBack={() => navigateTo('HOME')} 
        session={challengeSession} 
        setSession={setChallengeSession} 
        onScore={handleScore} 
        questions={questions}
        onCopy={handleCopy} // 👈 NHỚ THÊM DÒNG NÀY NẾU CHƯA CÓ
    />
)}
            {screen === 'LEADERBOARD' && <LeaderboardScreen onBack={()=>navigateTo('HOME')} currentUser={user}/>}
              {/* 👇👇👇 DÁN ĐOẠN NÀY VÀO ĐÂY 👇👇👇 */}
            {/* 👇 MÀN HÌNH KHU VƯỜN (CODE MỚI: CHUYỂN TRANG NGAY LẬP TỨC) 👇 */}
            {screen === 'GARDEN' && user && (
               <GardenScreen 
                 user={user} 
                 onUpdateUser={(updatedUser) => setUser(updatedUser)}
                 onSaveAndExit={(finalUser) => {
                    // 1. QUAN TRỌNG: Chuyển về màn hình chính TRƯỚC (Không chờ đợi gì cả)
                    setScreen('HOME'); 

                    // 2. Sau đó mới lưu dữ liệu ngầm bên dưới (kệ nó chạy)
                    updateDoc(doc(db, 'users', finalUser.uid), {
                        treeLevel: finalUser.treeLevel,
                        treeExp: finalUser.treeExp,
                        inventory: finalUser.inventory
                    }).catch(err => console.log("Lỗi lưu cây (không sao):", err));
                 }}
               />
            )}
            {/* 👆👆👆 KẾT THÚC ĐOẠN DÁN 👆👆👆 */}
            {screen === 'CHAT' && <ChatScreen onBack={()=>{navigateTo('HOME');setCopyText('')}} initialPrompt={copyText}/>}
            {screen === 'PROFILE' && (
                <ProfileScreen 
                    user={user} 
                    onBack={()=>navigateTo('HOME')} 
                    onUpdate={setUser} 
                    onNavToAuthor={()=>navigateTo('AUTHOR')}
                    
                    // 👇 THÊM DÒNG NÀY ĐỂ SỬA LỖI 👇
                    onStudyTopic={handleDeepLinkStudy} 
                />
            )}
            {screen === 'AUTHOR' && <AuthorScreen onBack={()=>navigateTo('PROFILE')} />}
        </div>

        {/* 👇 MENU DƯỚI ĐÁY: DÙNG navigateTo ĐỂ TỰ ĐỘNG LƯU KHI CHUYỂN TAB 👇 */}
        {screen !== 'CHAT' && (
            <div className="absolute bottom-0 w-full bg-white border-t p-3 pb-6 flex justify-around items-end z-50">
                <button onClick={()=>navigateTo('HOME')} className={`flex flex-col items-center ${screen==='HOME'?'text-roboki-600':'text-slate-400'}`}><Home size={24}/><span className="text-[10px] font-bold">Trang chủ</span></button>
                <button onClick={()=>navigateTo('PRACTICE')} className={`flex flex-col items-center ${screen==='PRACTICE'?'text-roboki-600':'text-slate-400'}`}><SwatchBook size={24}/><span className="text-[10px] font-bold">Luyện tập</span></button>
                <button onClick={()=>navigateTo('CHAT')} className="-top-6 relative"><div className="w-16 h-16 bg-gradient-to-tr from-roboki-500 to-orange-500 rounded-full flex items-center justify-center text-white shadow-xl"><Bot size={32}/></div></button>
                <button onClick={()=>navigateTo('GAME')} className={`flex flex-col items-center ${screen==='GAME'?'text-roboki-600':'text-slate-400'}`}><Gamepad2 size={24}/><span className="text-[10px] font-bold">Giải trí</span></button>
                <button onClick={()=>navigateTo('AUTHOR')} className={`flex flex-col items-center ${screen==='AUTHOR'?'text-roboki-600':'text-slate-400'}`}><Info size={24}/><span className="text-[10px] font-bold">Tác giả</span></button>
            </div>
        )}
        {toastMsg && <Toast message={toastMsg} onClose={()=>setToastMsg(null)}/>}
    </div>
  );
};

export default App;