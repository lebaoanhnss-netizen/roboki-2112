// src/App.tsx
import React, { useState, useEffect, useRef } from 'react';
import MathRender from './components/MathRender';
import Toast from './components/Toast';
import { UserProfile, Question, Lesson } from './types';
// 👇 Import dữ liệu từ file data.ts
import { PHYSICS_LESSONS, QUESTION_BANK } from './data';

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
  getDoc,
  updateDoc,
  increment,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit
} from './firebase';
import {
  BookOpen, MessageCircle, User, Copy,
  CheckCircle, ExternalLink, Target,
  Trophy, ClipboardCopy, Bell, Search, ChevronRight, ChevronLeft,
  Video, Share2, Thermometer, Wind, Atom,
  BarChart3, Magnet, Crown, Flame, XCircle, Play, Settings2, Filter,
  List, Type, CheckSquare, Gamepad2, Zap, Timer, RotateCcw, Ghost,
  Dna, Calendar, Star, Award, Menu, LogOut, ArrowRight, Lock, Mail,
  Disc, HelpCircle, Gift, SwatchBook, Frown, Sparkles, Bot, StopCircle,
  ThumbsUp, Percent, Activity, Send, Home, Globe, KeyRound, X, Loader2
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

  return `[ÔN TẬP VẬT LÍ 12 – ROBOKI]
Chủ đề: ${topic}
Bài/Câu: ${title}
Mức độ: ${level}
ĐỀ BÀI:
${mainContent}

YÊU CẦU ROBOKI:
1) Giải thích ngắn gọn, đúng bản chất vật lí.
2) Trình bày công thức liên quan và ý nghĩa các đại lượng.
3) Giải từng bước (nếu là bài tính).
4) Cho 1 mẹo tránh sai lầm thường gặp.`;
};

// --- TYPES FOR STATE MANAGEMENT ---

interface PracticeSessionData {
  configMode: boolean;
  selectedTopic: string;
  selectedLevel: string;
  selectedType: string;
  errorMsg: string;
  quizQuestions: Question[];
  currentQIndex: number;
  selectedOpt: string | null;
  isSubmitted: boolean;
  showExplanation: boolean;
}

const INITIAL_PRACTICE_STATE: PracticeSessionData = {
  configMode: true,
  selectedTopic: 'TẤT CẢ',
  selectedLevel: 'Ngẫu nhiên',
  selectedType: 'ALL',
  errorMsg: '',
  quizQuestions: [],
  currentQIndex: 0,
  selectedOpt: null,
  isSubmitted: false,
  showExplanation: false,
};

interface GameSessionData {
  gameType: 'NONE' | 'SPEED' | 'WHEEL';
  mode: 'MENU' | 'PLAYING' | 'RESULT';
  score: number;
  timeLeft: number;
  currentQ: Question | null;
  isCorrect: boolean | null;
  // Speed Specific
  selectedSpeedOpt: string | null; // Track selected option before submit
  correctCount: number;
  totalAnswered: number;
  // Wheel Specific
  wheelRotation: number;
  isSpinning: boolean;
  pendingPoints: number; // Points waiting to be won
  showWheelQuestion: boolean;
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
  showWheelQuestion: false
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
  history: [
    { date: 'Hôm qua', status: 'Đúng', score: 20 },
    { date: '25/05', status: 'Sai', score: 0 },
    { date: '24/05', status: 'Đúng', score: 20 },
  ]
};

// --- SUB COMPONENTS ---

// Lesson Card
const LessonCard: React.FC<{
  lesson: Lesson;
  onCopy: (txt: string) => void;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ lesson, onCopy, isExpanded, onToggle }) => {

  return (
    <div className={`bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${isExpanded ? 'shadow-lg border-roboki-200' : 'shadow-sm border-slate-100 hover:border-roboki-100'}`}>
      <div
        className="p-4 flex gap-4 cursor-pointer hover:bg-slate-50 active:bg-slate-100 items-center"
        onClick={onToggle}
      >
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
                <MathRender content={lesson.theory} className="text-sm text-slate-700 leading-relaxed"/>
             </div>

             <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h5 className="text-xs font-bold text-slate-600 uppercase mb-2 flex items-center gap-1.5"><Zap size={14}/> Công thức</h5>
                <MathRender content={lesson.formulas} className="text-sm text-slate-800 font-bold font-mono whitespace-pre-line"/>
             </div>

             <div className="flex justify-end pt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const txt = generateRobokiPrompt(lesson.topic, lesson.title, "Lý thuyết", `${lesson.theory}\n\nCông thức chính: ${lesson.formulas}`, undefined, 'LESSON');
                    onCopy(txt);
                  }}
                  className="text-xs bg-white text-roboki-600 px-4 py-2.5 rounded-full font-bold shadow-sm border border-roboki-100 flex items-center gap-2 hover:bg-roboki-50 transition-colors"
                >
                  <MessageCircle size={16} /> Hỏi Roboki bài này
                </button>
             </div>
          </div>
        </div>
      )}
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!auth) {
      setError("Firebase chưa được cấu hình.");
      setLoading(false);
      return;
    }

    try {
      let firebaseUser;
      if (isRegistering) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        firebaseUser = userCredential.user;
        await updateProfile(firebaseUser, { displayName: name });
        const newUser: UserProfile = {
          uid: firebaseUser.uid,
          name: name,
          email: email,
          class: className,
          totalScore: 0,
          practiceScore: 0,
          gameScore: 0,
          challengeScore: 0,
          rank: 999
        };
        await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
        onLoginSuccess(newUser);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        firebaseUser = userCredential.user;
        const docRef = doc(db, 'users', firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          onLoginSuccess(docSnap.data() as UserProfile);
        } else {
           const fallbackUser: UserProfile = {
             uid: firebaseUser.uid,
             name: firebaseUser.displayName || 'Học sinh',
             email: firebaseUser.email || '',
             class: '12',
             totalScore: 0,
             practiceScore: 0,
             gameScore: 0,
             challengeScore: 0,
             rank: 999
           };
           await setDoc(docRef, fallbackUser);
           onLoginSuccess(fallbackUser);
        }
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Thông tin đăng nhập không chính xác.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('Email này đã được sử dụng.');
      } else if (err.code === 'auth/weak-password') {
        setError('Mật khẩu quá yếu (tối thiểu 6 ký tự).');
      } else {
        setError('Đã xảy ra lỗi: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-roboki-200 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50"></div>

      <div className="w-full max-w-sm relative z-10">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-tr from-roboki-500 to-orange-600 rounded-3xl mx-auto flex items-center justify-center shadow-lg shadow-roboki-200 mb-4 transform rotate-3">
             <Bot size={48} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-slate-800">Roboki 12</h1>
          <p className="text-slate-500 font-medium mt-1">Ôn tập Vật lí & Trợ lý ảo AI</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
           <div className="flex bg-slate-100 p-1 rounded-2xl mb-6">
             <button onClick={() => { setIsRegistering(false); setError(''); }} className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${!isRegistering ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400'}`}>Đăng nhập</button>
             <button onClick={() => { setIsRegistering(true); setError(''); }} className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${isRegistering ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400'}`}>Đăng ký</button>
           </div>
           <form onSubmit={handleAuth} className="space-y-4">
              {isRegistering && (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Họ và tên</label>
                    <div className="relative">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
                      <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Nguyễn Văn A" className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:border-roboki-500 focus:ring-4 focus:ring-roboki-100 transition-all"/>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Lớp</label>
                    <div className="relative">
                      <BookOpen size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
                      <input type="text" required value={className} onChange={(e) => setClassName(e.target.value)} placeholder="12A1" className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:border-roboki-500 focus:ring-4 focus:ring-roboki-100 transition-all"/>
                    </div>
                  </div>
                </>
              )}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Email</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:border-roboki-500 focus:ring-4 focus:ring-roboki-100 transition-all"/>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Mật khẩu</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
                  <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:border-roboki-500 focus:ring-4 focus:ring-roboki-100 transition-all"/>
                </div>
              </div>
              {error && (<div className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-2 text-rose-600 text-xs font-bold"><XCircle size={16} /> {error}</div>)}
              <button type="submit" disabled={loading} className="w-full bg-roboki-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-roboki-200 hover:bg-roboki-700 active:scale-95 transition-all flex items-center justify-center gap-2 mt-4">{loading ? 'Đang xử lý...' : (isRegistering ? 'Đăng ký tài khoản' : 'Đăng nhập ngay')} <ArrowRight size={20}/></button>
           </form>
        </div>
        <p className="text-center text-xs text-slate-400 mt-6 font-bold">Dữ liệu được lưu trữ an toàn trên Firebase.</p>
      </div>
    </div>
  );
};

// 1. HOME SCREEN
const ContentScreen: React.FC<{
  onCopy: (txt: string) => void,
  onNavToPractice: () => void,
  onNavToGames: () => void,
  onNavToChallenge: () => void,
  onNavToLeaderboard: () => void,
  onNavToProfile: () => void,
  onNavToChat: () => void,
  user: UserProfile,
  selectedTopic: { id: string, label: string } | null,
  setSelectedTopic: (topic: { id: string, label: string } | null) => void,
  expandedLessonIds: string[],
  toggleLesson: (id: string) => void,
  lessons: Lesson[] // <--- NHẬN DATA TỪ FIREBASE
}> = ({
  onCopy, onNavToPractice, onNavToGames, onNavToChallenge,
  onNavToLeaderboard, onNavToProfile, onNavToChat, user,
  selectedTopic, setSelectedTopic, expandedLessonIds, toggleLesson,
  lessons
}) => {

  const TOPICS = [
    { id: 't1', label: 'VẬT LÍ NHIỆT', icon: Thermometer },
    { id: 't2', label: 'KHÍ LÍ TƯỞNG', icon: Wind },
    { id: 't3', label: 'TỪ TRƯỜNG', icon: Magnet },
    { id: 't4', label: 'HẠT NHÂN & PHÓNG XẠ', icon: Atom },
  ];

  if (selectedTopic) {
    const topicLabelForData = selectedTopic.label === 'HẠT NHÂN & PHÓNG XẠ' ? 'VẬT LÍ HẠT NHÂN & PHÓNG XẠ' : selectedTopic.label;
    // Lọc bài học từ props.lessons thay vì biến cứng
    const topicLessons = lessons.filter(l => l.topic === topicLabelForData);

    return (
      <div className="pb-24 pt-2 px-4 space-y-4 bg-slate-50 min-h-full">
         <div className="flex items-center gap-3 pt-4 pb-2 sticky top-0 bg-slate-50/95 backdrop-blur z-10">
            <button onClick={() => setSelectedTopic(null)} className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-600 border border-slate-200 hover:bg-roboki-50 hover:text-roboki-600 transition-colors"><ChevronLeft size={20} /></button>
            <h2 className="font-bold text-xl text-slate-800 truncate">{selectedTopic.label}</h2>
         </div>

         <div className="space-y-4">
            {topicLessons.length > 0 ? (
              topicLessons.map(lesson => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  onCopy={onCopy}
                  isExpanded={expandedLessonIds.includes(lesson.id)}
                  onToggle={() => toggleLesson(lesson.id)}
                />
              ))
            ) : (
              <div className="text-center py-10 text-slate-400 text-sm">Đang cập nhật nội dung cho chủ đề này.</div>
            )}
         </div>
      </div>
    );
  }

  return (
    <div className="pb-28 pt-2 px-4 space-y-5 bg-slate-50 min-h-full">
      <div className="flex justify-between items-center pt-2">
        <div className="flex flex-col">
           <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Xin chào,</span>
           <span className="text-xl font-black text-slate-800">{user.name} 👋</span>
        </div>
        <div className="flex items-center gap-3">
           <div className="bg-roboki-50 text-roboki-700 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm border border-roboki-100">Lớp {user.class}</div>
           <button onClick={onNavToProfile} className="w-10 h-10 rounded-full bg-slate-200 p-0.5 shadow-sm active:scale-95 transition-transform">
             <div className="w-full h-full rounded-full bg-gradient-to-tr from-roboki-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold">{user.name.charAt(0)}</div>
           </button>
        </div>
      </div>

      <div onClick={onNavToChat} className="group relative overflow-hidden bg-tech-dark rounded-3xl p-4 shadow-lg shadow-slate-300 cursor-pointer active:scale-[0.98] transition-all border border-slate-700">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 20% 50%, #f97316 0%, transparent 20%), radial-gradient(circle at 80% 80%, #22c55e 0%, transparent 20%), linear-gradient(0deg, transparent 49%, #334155 50%, transparent 51%), linear-gradient(90deg, transparent 49%, #334155 50%, transparent 51%)`, backgroundSize: '100% 100%, 100% 100%, 20px 20px, 20px 20px' }}></div>
        <div className="relative z-10 flex justify-between items-center">
          <div>
             <div className="bg-slate-800/80 backdrop-blur-sm w-fit px-2 py-0.5 rounded-md text-[10px] font-bold mb-2 text-slate-300 uppercase tracking-wide border border-slate-600">Trợ lý AI</div>
             <div className="font-black text-2xl mb-1 flex flex-col leading-none">
                <span className="text-neon-green tracking-tighter drop-shadow-[0_0_5px_rgba(34,197,94,0.6)]">HỎI</span>
                <span className="text-roboki-500 tracking-wide drop-shadow-[0_0_5px_rgba(249,115,22,0.6)]">ROBOKI</span>
             </div>
             <div className="text-slate-400 text-[10px] mb-4 font-medium">Giải đáp Vật lí cực nhanh</div>
             <button className="bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.4)] flex items-center gap-1.5 group-hover:bg-emerald-400 transition-colors border border-emerald-400">Hỏi Ngay <MessageCircle size={14} className="group-hover:translate-x-0.5 transition-transform"/></button>
          </div>
          <div className="w-24 h-24 relative">
             <Bot size={80} className="text-roboki-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)] animate-float" />
             <div className="absolute top-0 right-0 w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_#4ade80]"></div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-slate-800 text-base mb-3 flex items-center gap-2"><BookOpen size={18} className="text-roboki-500"/> Chủ đề ôn tập</h3>
        <div className="grid grid-cols-2 gap-3">
          {TOPICS.map((t) => (
            <div key={t.id} className={`flex flex-col items-center gap-3 cursor-pointer p-3 rounded-3xl transition-all active:scale-95 duration-200 bg-white border border-slate-100 shadow-sm hover:border-roboki-200 hover:shadow-md group`} onClick={() => setSelectedTopic(t)}>
              <div className={`w-12 h-12 rounded-2xl bg-orange-50 group-hover:bg-roboki-100 flex items-center justify-center shadow-inner transition-colors`}>
                <t.icon size={24} className="text-roboki-500 group-hover:text-roboki-600" strokeWidth={2.5} />
              </div>
              <span className="text-xs font-bold text-slate-700 text-center leading-tight px-1 group-hover:text-roboki-700 transition-colors">{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pb-4">
        <h3 className="font-bold text-slate-800 text-base mb-3 flex items-center gap-2"><Zap size={18} className="text-roboki-500"/> Hoạt động</h3>
        <div className="grid grid-cols-2 gap-2.5">
             <div onClick={onNavToPractice} className="bg-orange-50 p-3 rounded-3xl border border-orange-100/50 shadow-sm flex flex-col items-center text-center gap-2 cursor-pointer transition-all hover:shadow-md active:scale-95 group">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-roboki-600 shadow-sm"><SwatchBook size={20} /></div>
                <div><div className="font-bold text-roboki-900 text-sm group-hover:text-roboki-600 transition-colors">LUYỆN TẬP</div><div className="text-[10px] text-roboki-600/70">Luyện theo bài</div></div>
             </div>
             <div onClick={onNavToGames} className="bg-emerald-50 p-3 rounded-3xl border border-emerald-100/50 shadow-sm flex flex-col items-center text-center gap-2 cursor-pointer transition-all hover:shadow-md active:scale-95 group">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-sm"><Gamepad2 size={20} /></div>
                <div><div className="font-bold text-emerald-900 text-sm group-hover:text-emerald-600 transition-colors">Trò chơi</div><div className="text-[10px] text-emerald-600/70">Vừa học vừa chơi</div></div>
             </div>
             <div onClick={onNavToChallenge} className="bg-sky-50 p-3 rounded-3xl border border-sky-100/50 shadow-sm flex flex-col items-center text-center gap-2 cursor-pointer transition-all hover:shadow-md active:scale-95 group">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-sky-600 shadow-sm"><Target size={20} /></div>
                <div><div className="font-bold text-sky-900 text-sm group-hover:text-sky-600 transition-colors">Thử thách</div><div className="text-[10px] text-sky-600/70">Nhiệm vụ ngày</div></div>
             </div>
             <div onClick={onNavToLeaderboard} className="bg-indigo-50 p-3 rounded-3xl border border-indigo-100/50 shadow-sm flex flex-col items-center text-center gap-2 cursor-pointer transition-all hover:shadow-md active:scale-95 group">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-sm"><Trophy size={20} /></div>
                <div><div className="font-bold text-indigo-900 text-sm group-hover:text-indigo-600 transition-colors">Xếp hạng</div><div className="text-[10px] text-indigo-600/70">Top học sinh</div></div>
             </div>
        </div>
      </div>
    </div>
  );
};

// 2. PRACTICE SCREEN
const PracticeScreen: React.FC<{
  onCopy: (txt: string) => void,
  onScore: (pts: number) => void,
  sessionData: PracticeSessionData,
  setSessionData: React.Dispatch<React.SetStateAction<PracticeSessionData>>,
  questions: Question[] // <--- DATA
}> = ({ onCopy, onScore, sessionData, setSessionData, questions }) => {
  const {
    configMode, selectedTopic, selectedLevel, selectedType, errorMsg,
    quizQuestions, currentQIndex, selectedOpt, isSubmitted
  } = sessionData;

  const updateSession = (updates: Partial<PracticeSessionData>) => setSessionData(prev => ({ ...prev, ...updates }));

  const startPractice = () => {
    let filtered = questions; // Sử dụng data từ props
    if (selectedTopic !== 'TẤT CẢ') filtered = filtered.filter(q => q.topic === selectedTopic);
    if (selectedLevel !== 'Ngẫu nhiên') filtered = filtered.filter(q => q.level === selectedLevel);
    if (selectedType !== 'ALL') filtered = filtered.filter(q => q.type === selectedType);

    if (filtered.length === 0) {
      updateSession({ errorMsg: 'Không tìm thấy câu hỏi phù hợp. Vui lòng chọn tiêu chí khác.' });
      return;
    }

    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    updateSession({ quizQuestions: shuffled, currentQIndex: 0, isSubmitted: false, selectedOpt: null, configMode: false, errorMsg: '' });
  };

  const submit = () => {
    updateSession({ isSubmitted: true });
    const currentQ = quizQuestions[currentQIndex];
    let isCorrect = false;
    if (currentQ.type === 'Short') {
       isCorrect = selectedOpt?.trim().toLowerCase() === currentQ.answerKey.trim().toLowerCase();
    } else {
       isCorrect = selectedOpt === currentQ.answerKey;
    }
    if (isCorrect) onScore(10);
  };

  if (configMode) {
    return (
      <div className="pb-24 pt-4 px-5 h-full flex flex-col bg-slate-50">
        <h2 className="text-2xl font-black text-slate-800 mb-4 flex items-center gap-2"><SwatchBook className="text-roboki-600" size={28}/> Chủ đề ôn tập</h2>
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-6 flex-1 overflow-y-auto">
           <div>
            <h3 className="font-bold text-slate-700 text-sm mb-3">Chủ đề</h3>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => updateSession({ selectedTopic: 'TẤT CẢ' })} className={`p-3 rounded-xl text-left text-xs font-bold border transition-all ${selectedTopic === 'TẤT CẢ' ? 'bg-roboki-500 text-white border-roboki-500 shadow-md shadow-roboki-200' : 'bg-white text-slate-500 border-slate-100 hover:border-roboki-200'}`}>Tất cả</button>
              {Array.from(new Set(questions.map(q => q.topic))).map(t => (
                  <button
                    key={t as string}
                    onClick={() => updateSession({ selectedTopic: t as string })}
                    className={`p-3 rounded-xl text-left text-xs font-bold border transition-all truncate ${selectedTopic === t ? 'bg-roboki-500 text-white border-roboki-500 shadow-md shadow-roboki-200' : 'bg-white text-slate-500 border-slate-100 hover:border-roboki-200'}`}
                  >
                    {t as string}
                  </button>
              ))}
            </div>
           </div>
           <div>
            <h3 className="font-bold text-slate-700 text-sm mb-3">Mức độ</h3>
            <div className="flex gap-2">
               {['Ngẫu nhiên', 'Biết', 'Hiểu', 'Vận dụng'].map(lvl => (
                 <button key={lvl} onClick={() => updateSession({ selectedLevel: lvl })} className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase border transition-all ${selectedLevel === lvl ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-200' : 'bg-white text-slate-400 border-slate-100 hover:border-emerald-200'}`}>{lvl}</button>
               ))}
            </div>
           </div>
           <div>
            <h3 className="font-bold text-slate-700 text-sm mb-3">Dạng câu hỏi</h3>
            <div className="flex gap-2">
               {[{id: 'ALL', l: 'Tất cả'}, {id: 'MCQ', l: 'Trắc nghiệm'}, {id: 'TrueFalse', l: 'Đúng/Sai'}, {id: 'Short', l: 'Điền từ'}].map(type => (
                 <button key={type.id} onClick={() => updateSession({ selectedType: type.id })} className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase border transition-all ${selectedType === type.id ? 'bg-indigo-500 text-white border-indigo-500 shadow-md shadow-indigo-200' : 'bg-white text-slate-400 border-slate-100 hover:border-indigo-200'}`}>{type.l}</button>
               ))}
            </div>
           </div>
           {errorMsg && <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold rounded-xl flex items-center gap-2"><XCircle size={16}/> {errorMsg}</div>}
        </div>
        <button onClick={startPractice} className="w-full bg-slate-800 text-white py-4 rounded-3xl font-bold mt-4 shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2">Bắt đầu ngay <ArrowRight size={18}/></button>
      </div>
    );
  }

  const currentQ = quizQuestions[currentQIndex];
  return (
    <div className="pb-24 pt-4 px-4 h-full flex flex-col bg-slate-50">
      <div className="flex justify-between items-center mb-4">
         <button onClick={() => updateSession({ configMode: true })} className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border border-slate-100"><ChevronLeft size={20} className="text-slate-600"/></button>
         <div className="flex flex-col items-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Câu hỏi</span>
            <span className="font-black text-slate-800 text-lg">{currentQIndex + 1}<span className="text-slate-300 text-sm">/{quizQuestions.length}</span></span>
         </div>
         <button onClick={() => onCopy(generateRobokiPrompt(currentQ.topic, `Câu ${currentQ.id}`, currentQ.level, currentQ.promptText, currentQ.options))} className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border border-slate-100 text-roboki-500"><Copy size={20}/></button>
      </div>
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex-1 overflow-y-auto relative">
         <div className="absolute top-0 right-0 bg-slate-100 text-slate-500 text-[9px] font-black px-3 py-1.5 rounded-bl-2xl rounded-tr-2xl uppercase tracking-wider">{currentQ.level}</div>
         <div className="mb-2 text-[10px] font-black uppercase text-roboki-500 tracking-widest">{currentQ.topic}</div>

         {/* 👈 THAY ĐỔI: THÊM HIỂN THỊ ẢNH CHO PHẦN LUYỆN TẬP */}
         <div className="mb-8">
            {currentQ.imageUrl && (
              <div className="mb-4 flex justify-center bg-white rounded-xl border border-slate-100 p-2">
                <img
                  src={currentQ.imageUrl}
                  alt="Hình minh họa"
                  className="rounded-lg max-h-64 object-contain w-full"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            )}
            <div className="font-bold text-slate-800 text-base leading-relaxed"><MathRender content={currentQ.promptText}/></div>
         </div>
         
         <div className="space-y-3">
            {currentQ.type === 'Short' ? (
               <input disabled={isSubmitted} type="text" placeholder="Nhập câu trả lời của bạn..." className="w-full p-4 rounded-2xl border-2 border-slate-100 font-bold focus:border-roboki-500 focus:outline-none" onChange={(e) => updateSession({ selectedOpt: e.target.value })}/>
            ) : (
               currentQ.options?.map((opt, i) => (
                 <button key={i} disabled={isSubmitted} onClick={() => updateSession({ selectedOpt: opt })} className={`w-full p-4 rounded-2xl border-2 text-left text-sm font-bold transition-all ${isSubmitted && opt === currentQ.answerKey ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : isSubmitted && selectedOpt === opt ? 'bg-rose-50 border-rose-500 text-rose-700' : selectedOpt === opt ? 'bg-roboki-50 border-roboki-500 text-roboki-700' : 'bg-white border-slate-50 hover:bg-slate-50 text-slate-600'}`}><MathRender content={opt}/></button>
               ))
            )}
         </div>

         {isSubmitted ? (
            <div className="mt-8 animate-fade-in">
               <div className="bg-slate-50 p-5 rounded-2xl text-sm border border-slate-100">
                 <div className="flex items-center gap-2 mb-2 text-roboki-600 font-black text-xs uppercase"><BookOpen size={14}/> Giải thích chi tiết</div>
                 <MathRender content={currentQ.explanationText} className="text-slate-600"/>
               </div>
               <button onClick={() => updateSession({ currentQIndex: (currentQIndex + 1) % quizQuestions.length, isSubmitted: false, selectedOpt: null })} className="w-full bg-roboki-600 text-white py-4 rounded-2xl font-bold mt-4 shadow-lg shadow-roboki-200">Câu tiếp theo</button>
            </div>
         ) : (
            <button disabled={!selectedOpt} onClick={submit} className="w-full bg-slate-800 text-white py-4 rounded-2xl font-bold mt-8 shadow-xl disabled:opacity-50 disabled:shadow-none transition-all">Kiểm tra kết quả</button>
         )}
      </div>
    </div>
  );
};

// 3. GAME SCREEN
const GameScreen: React.FC<{
  onCopy: (txt: string) => void,
  onScore: (pts: number) => void,
  sessionData: GameSessionData,
  setSessionData: React.Dispatch<React.SetStateAction<GameSessionData>>,
  questions: Question[] // <--- DATA
}> = ({ onCopy, onScore, sessionData, setSessionData, questions }) => {
  const {
    gameType, mode, score, timeLeft, currentQ, isCorrect,
    wheelRotation, isSpinning, pendingPoints, showWheelQuestion,
    selectedSpeedOpt, correctCount, totalAnswered
  } = sessionData;

  useEffect(() => {
    let timer: any;
    if (gameType === 'SPEED' && mode === 'PLAYING' && timeLeft > 0) {
      timer = setInterval(() => {
        setSessionData(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    } else if (gameType === 'SPEED' && timeLeft === 0 && mode === 'PLAYING') {
      setSessionData(prev => ({ ...prev, mode: 'RESULT' }));
      if(score > 0) onScore(score);
    }
    return () => clearInterval(timer);
  }, [gameType, mode, timeLeft]);

  const WHEEL_SEGMENTS = [
    { value: 10, label: '10', color: '#3b82f6', text: 'white' },
    { value: 50, label: '50', color: '#ef4444', text: 'white' },
    { value: 20, label: '20', color: '#10b981', text: 'white' },
    { value: 80, label: '80', color: '#f59e0b', text: 'white' },
    { value: 10, label: '10', color: '#3b82f6', text: 'white' },
    { value: 100, label: '100', color: '#8b5cf6', text: 'white' },
    { value: 20, label: '20', color: '#10b981', text: 'white' },
    { value: 0, label: 'Mất lượt', color: '#64748b', text: 'white' },
  ];
  const SEGMENT_ANGLE = 360 / WHEEL_SEGMENTS.length;

  const spinWheel = () => {
    if (isSpinning) return;
    const extraSpins = 1800 + Math.random() * 1800;
    const newRotation = wheelRotation + extraSpins;
    setSessionData(prev => ({ ...prev, isSpinning: true, wheelRotation: newRotation }));

    setTimeout(() => {
       const actualAngle = newRotation % 360;
       const degreesUnderPointer = (360 - actualAngle) % 360;
       const winningIndex = Math.floor(degreesUnderPointer / SEGMENT_ANGLE);
       const safeIndex = winningIndex >= WHEEL_SEGMENTS.length ? 0 : winningIndex;
       const winningSegment = WHEEL_SEGMENTS[safeIndex];

       if (winningSegment.value > 0) {
         setSessionData(prev => ({
             ...prev,
             isSpinning: false,
             pendingPoints: winningSegment.value,
             showWheelQuestion: true,
             currentQ: questions[Math.floor(Math.random() * questions.length)],
             isCorrect: null
         }));
       } else {
         setSessionData(prev => ({ ...prev, isSpinning: false, pendingPoints: 0 }));
       }
    }, 3000);
  };

  const startSpeedGame = () => {
    setSessionData({
      ...INITIAL_GAME_STATE,
      gameType: 'SPEED',
      mode: 'PLAYING',
      score: 0,
      timeLeft: 60,
      currentQ: questions[Math.floor(Math.random() * questions.length)],
      isCorrect: null,
      selectedSpeedOpt: null,
      correctCount: 0,
      totalAnswered: 0
    });
  };

  const startWheelGame = () => {
    setSessionData({ ...INITIAL_GAME_STATE, gameType: 'WHEEL', mode: 'PLAYING', wheelRotation: 0 });
  };

  const submitSpeedAnswer = () => {
    if (!currentQ || !selectedSpeedOpt) return;
    const userAns = selectedSpeedOpt.trim().toLowerCase();
    const correctAns = currentQ.answerKey.trim().toLowerCase();
    let isRight = false;
    if (currentQ.type === 'Short') {
        isRight = userAns === correctAns;
    } else {
        isRight = selectedSpeedOpt === currentQ.answerKey;
    }

    setSessionData(prev => ({
        ...prev,
        score: isRight ? prev.score + 10 : Math.max(0, prev.score - 5),
        correctCount: isRight ? prev.correctCount + 1 : prev.correctCount,
        totalAnswered: prev.totalAnswered + 1,
        isCorrect: isRight
    }));
    if (isRight) onScore(10, 'game');
    setTimeout(() => {
        setSessionData(prev => ({
            ...prev,
            currentQ: questions[Math.floor(Math.random() * questions.length)],
            isCorrect: null,
            selectedSpeedOpt: null
        }));
    }, 800);
  };

  const handleWheelAnswer = (opt: string) => {
     if (!currentQ) return;
     const correct = opt === currentQ.answerKey;
     if (correct) {
        const points = pendingPoints;
        onScore(points, 'game');
        setSessionData(prev => ({ ...prev, isCorrect: true, score: prev.score + points }));
        setTimeout(() => setSessionData(prev => ({ ...prev, showWheelQuestion: false, isCorrect: null, currentQ: null })), 1000);
     } else {
        setSessionData(prev => ({ ...prev, isCorrect: false }));
        setTimeout(() => setSessionData(prev => ({ ...prev, showWheelQuestion: false, isCorrect: null, currentQ: null, mode: 'RESULT' })), 1500);
     }
  };

  if (mode === 'MENU') {
    return (
      <div className="p-6 h-full flex flex-col justify-start pt-4 space-y-6">
         <div className="text-center mb-2"><h2 className="text-2xl font-black text-slate-800">Chọn trò chơi</h2></div>
         <div className="space-y-4">
             <button onClick={startSpeedGame} className="w-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white p-6 rounded-3xl shadow-lg shadow-indigo-200 active:scale-95 transition-all flex items-center gap-5 relative overflow-hidden group border border-indigo-400/30">
                <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-inner shrink-0"><Timer size={36} className="text-indigo-100" /></div>
                <div className="text-left flex-1 min-w-0"><div className="font-black text-xl mb-1 truncate">Thử thách Tốc độ</div><div className="text-indigo-100 text-sm font-medium">60 giây trả lời cực nhanh</div></div>
             </button>
             <button onClick={startWheelGame} className="w-full bg-gradient-to-br from-rose-500 to-pink-600 text-white p-6 rounded-3xl shadow-lg shadow-rose-200 active:scale-95 transition-all flex items-center gap-5 relative overflow-hidden group border border-rose-400/30">
                <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-inner shrink-0"><Target size={36} className="text-rose-100" /></div>
                <div className="text-left flex-1 min-w-0"><div className="font-black text-xl mb-1 truncate">Vòng quay May mắn</div><div className="text-rose-100 text-sm font-medium">Quay số nhận câu hỏi</div></div>
             </button>
         </div>
      </div>
    );
  }

  if (gameType === 'SPEED') {
    if (mode === 'RESULT') {
        const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
        return (
          <div className="p-6 h-full flex flex-col overflow-y-auto pb-24 bg-slate-50">
             <div className="flex flex-col items-center justify-center text-center space-y-4 animate-fade-in mb-8 pt-4">
                <div className="relative">
                    <Trophy size={80} className="text-yellow-400 fill-yellow-400 animate-bounce-short" />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-black px-2 py-0.5 rounded-full whitespace-nowrap">Hết giờ!</div>
                </div>
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
           </div>
           {currentQ && (
             <div className="flex-1 flex flex-col min-h-0">
                <div className="bg-white p-5 rounded-3xl shadow-lg border border-slate-100 flex-1 flex flex-col animate-fade-in relative mb-4 overflow-y-auto">
                      <button onClick={() => onCopy(generateRobokiPrompt(currentQ.topic, `Câu hỏi tốc độ`, currentQ.level, currentQ.promptText, currentQ.options))} className="absolute top-4 right-4 text-slate-300 hover:text-roboki-500 transition-colors z-10"><Copy size={18} /></button>
                      <div className="shrink-0 mb-4 text-center"><span className="bg-slate-100 text-slate-500 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider">{currentQ.level}</span></div>
                      
                      {/* 👈 THAY ĐỔI: HIỂN THỊ ẢNH TRONG GAME TỐC ĐỘ */}
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
                    {currentQ.type === 'TrueFalse' && (<div className="flex gap-4 h-24">{currentQ.options?.map((opt, i) => (<button key={i} onClick={() => setSessionData(prev => ({ ...prev, selectedSpeedOpt: opt }))} className={`flex-1 rounded-3xl font-black text-xl transition-all border-4 shadow-sm active:scale-95 ${selectedSpeedOpt === opt ? (opt === 'Đúng' ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : 'bg-rose-50 border-rose-500 text-rose-600') : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'}`}>{opt}</button>))}</div>)}
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
             <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-2"><Star size={18} className="text-yellow-400 fill-yellow-400"/><span className="font-black text-xl text-slate-700">{score}</span></div>
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
               <button onClick={spinWheel} disabled={isSpinning || showWheelQuestion} className="mt-10 bg-slate-800 text-white px-10 py-4 rounded-full font-black shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 text-base tracking-wide flex items-center gap-2 hover:bg-slate-900">{isSpinning ? <RotateCcw className="animate-spin" size={20}/> : <Play fill="currentColor" size={20}/>}{isSpinning ? 'ĐANG QUAY...' : 'QUAY NGAY'}</button>
           </div>
           {showWheelQuestion && currentQ && (
               <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
                   <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl relative">
                       <div className="text-center mb-4"><div className="text-xs font-black uppercase text-slate-400">Cơ hội nhận</div><div className="text-4xl font-black text-rose-500 drop-shadow-sm">+{pendingPoints}</div><div className="text-xs font-bold text-rose-300">điểm</div></div>
                       <button onClick={() => onCopy(generateRobokiPrompt(currentQ.topic, `Câu hỏi may mắn`, currentQ.level, currentQ.promptText, currentQ.options))} className="absolute top-4 right-4 text-slate-300 hover:text-roboki-500 transition-colors bg-slate-50 p-2 rounded-full"><Copy size={18} /></button>
                       
                       {/* 👈 THAY ĐỔI: HIỂN THỊ ẢNH TRONG GAME VÒNG QUAY */}
                       <div className="mb-6">
                           {currentQ.imageUrl && (
                             <div className="mb-4 flex justify-center p-2">
                               <img src={currentQ.imageUrl} alt="Hình minh họa" className="rounded-lg max-h-48 object-contain w-full" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}/>
                             </div>
                           )}
                           <div className="font-bold text-slate-800 text-center leading-relaxed"><MathRender content={currentQ.promptText}/></div>
                       </div>

                       <div className="space-y-2">{currentQ.options?.map((opt, i) => (<button key={i} disabled={isCorrect !== null} onClick={() => handleWheelAnswer(opt)} className={`w-full p-4 rounded-xl border-2 font-bold text-sm transition-all ${isCorrect === true && opt === currentQ.answerKey ? 'bg-emerald-50 border-emerald-500 text-white' : isCorrect === false ? 'bg-white border-slate-100 opacity-50' : 'bg-white border-slate-100 hover:bg-slate-50 hover:border-roboki-200'}`}><MathRender content={opt}/></button>))}</div>
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

// 4. LEADERBOARD SCREEN
const LeaderboardScreen: React.FC<{ onBack: () => void; currentUser: UserProfile }> = ({ onBack, currentUser }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [players, setPlayers] = useState<UserProfile[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        setError(null);
        const q = query(collection(db, 'users'), where('class', '==', currentUser.class), orderBy('totalScore', 'desc'), limit(50));
        const snap = await getDocs(q);
        const list: UserProfile[] = [];
        snap.forEach((d) => list.push(d.data() as UserProfile));
        setPlayers(list);
      } catch (err) {
        console.error('Lỗi tải bảng xếp hạng:', err);
        setError('Không tải được bảng xếp hạng. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, [currentUser.class]);

  const currentIndex = players.findIndex((u) => u.uid === currentUser.uid);
  const currentRank = currentIndex >= 0 ? currentIndex + 1 : '—';

  return (
    <div className="pb-24 pt-4 px-4 h-full flex flex-col bg-slate-50">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border border-slate-100"><ChevronLeft size={20} className="text-slate-600" /></button>
        <div><h2 className="text-xl font-black text-slate-800">Bảng xếp hạng</h2><p className="text-[11px] text-slate-400 font-bold">Lớp <span className="text-roboki-600">{currentUser.class}</span></p></div>
      </div>
      <div className="mb-4 bg-gradient-to-r from-roboki-500 to-orange-500 rounded-3xl p-4 text-white shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-black">{currentUser.name.charAt(0)}</div><div><div className="text-sm font-black">{currentUser.name} <span className="opacity-80 text-[11px]">(Bạn)</span></div><div className="text-[11px] opacity-80">Lớp {currentUser.class}</div></div></div>
        <div className="text-right"><div className="text-[11px] uppercase font-bold opacity-80">Hạng hiện tại</div><div className="text-2xl font-black">{currentRank}</div></div>
      </div>
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex-1 overflow-y-auto">
        {loading && (<div className="h-full flex items-center justify-center text-slate-400 text-sm">Đang tải bảng xếp hạng...</div>)}
        {error && !loading && (<div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-bold">{error}</div>)}
        {!loading && !error && (
          <div className="space-y-3">
            {players.length === 0 && (<div className="text-center text-slate-400 text-sm py-4">Chưa có dữ liệu điểm cho lớp này.</div>)}
            {players.map((u, index) => (
              <div key={u.uid} className={`flex items-center justify-between p-4 rounded-2xl border ${u.uid === currentUser.uid ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50 border-slate-100'}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black ${index === 0 ? 'bg-yellow-100 text-yellow-600' : index === 1 ? 'bg-slate-200 text-slate-600' : index === 2 ? 'bg-orange-100 text-orange-600' : 'bg-white text-slate-400 border'}`}>{index + 1}</div>
                  <div><div className={`font-bold text-sm ${u.uid === currentUser.uid ? 'text-indigo-700' : 'text-slate-800'}`}>{u.name} {u.uid === currentUser.uid && '(Bạn)'}</div><div className="text-[10px] text-slate-400 font-bold uppercase">Lớp {u.class}</div></div>
                </div>
                <div className="font-black text-slate-800">{u.totalScore} <span className="text-[10px] text-slate-400 font-medium">điểm</span></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// 5. CHALLENGE SCREEN (Đã sửa lỗi hiển thị ô nhập liệu)
const ChallengeScreen: React.FC<{
  onBack: () => void,
  session: ChallengeSessionData,
  setSession: React.Dispatch<React.SetStateAction<ChallengeSessionData>>,
  onScore: (pts: number) => void,
  questions: Question[]
}> = ({ onBack, session, setSession, onScore, questions }) => {
    
    // State lưu nội dung thầy nhập vào
    const [textInput, setTextInput] = useState('');

    useEffect(() => {
        // Nếu chưa có câu hỏi hôm nay thì random 1 câu
        if (!session.todayQ && questions.length > 0) {
            const randomQ = questions[Math.floor(Math.random() * questions.length)];
            setSession(prev => ({ ...prev, todayQ: randomQ }));
        }
    }, [questions]);

    const handleSubmit = (answer: string) => {
        if (!session.todayQ) return;
        // So sánh đáp án (không phân biệt hoa thường)
        const isCorrect = answer.trim().toLowerCase() === session.todayQ.answerKey.trim().toLowerCase();
        
        setSession(prev => ({ ...prev, selectedOpt: answer, isSubmitted: true, isCorrect }));
        if (isCorrect) onScore(20, 'challenge');
    };

    return (
        <div className="pb-24 pt-4 px-4 h-full flex flex-col bg-slate-50">
           <div className="flex items-center gap-3 mb-6">
              <button onClick={onBack} className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border border-slate-100"><ChevronLeft size={20} className="text-slate-600"/></button>
              <h2 className="text-xl font-black text-slate-800">Thử thách hàng ngày</h2>
           </div>

           {session.todayQ ? (
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex-1 overflow-y-auto">
                 <div className="flex justify-between items-start mb-6">
                    <div className="bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">Daily Quest</div>
                    <div className="text-right"><div className="font-black text-2xl text-slate-800">+20</div><div className="text-[10px] text-slate-400 font-bold uppercase">Điểm thưởng</div></div>
                 </div>
                 
                 {/* 👈 THAY ĐỔI: HIỂN THỊ ẢNH TRONG THỬ THÁCH */}
                 <div className="mb-8">
                    {session.todayQ.imageUrl && (
                      <div className="mb-4 flex justify-center bg-white rounded-xl border border-slate-100 p-2">
                         <img src={session.todayQ.imageUrl} alt="Hình minh họa" className="rounded-lg max-h-64 object-contain w-full" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      </div>
                    )}
                    <div className="font-bold text-slate-800 text-lg leading-relaxed"><MathRender content={session.todayQ.promptText}/></div>
                 </div>
                 
                 {/* --- PHẦN ĐIỀU CHỈNH: Tự động nhận diện loại câu hỏi --- */}
                 <div className="space-y-3">
                    {session.todayQ.type === 'Short' ? (
                        // Nếu là câu hỏi điền từ -> Hiện ô nhập
                        <div className="space-y-4 animate-fade-in">
                            <input
                                type="text"
                                disabled={session.isSubmitted}
                                value={textInput}
                                onChange={(e) => setTextInput(e.target.value)}
                                placeholder="Nhập đáp án của bạn..."
                                className="w-full p-4 rounded-2xl border-2 border-slate-200 font-bold focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none text-center text-lg text-slate-700 placeholder:text-slate-300 transition-all"
                            />
                            {!session.isSubmitted && (
                                <button
                                    disabled={!textInput}
                                    onClick={() => handleSubmit(textInput)}
                                    className="w-full bg-sky-600 text-white py-3 rounded-2xl font-bold shadow-lg shadow-sky-200 active:scale-95 transition-all disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
                                >
                                    <Target size={18}/> Chốt đáp án
                                </button>
                            )}
                            {session.isSubmitted && (
                                <div className="text-center font-medium bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    <div className="text-xs text-slate-400 uppercase font-bold mb-1">Đáp án đúng là</div>
                                    <div className="text-xl font-black text-emerald-600">{session.todayQ.answerKey}</div>
                                </div>
                            )}
                        </div>
                    ) : (
                        // Nếu là trắc nghiệm -> Hiện nút bấm (Giữ nguyên cũ)
                        session.todayQ.options?.map((opt, i) => (
                           <button key={i} disabled={session.isSubmitted} onClick={() => handleSubmit(opt)} className={`w-full p-4 rounded-2xl border-2 text-left text-sm font-bold transition-all ${session.isSubmitted && opt === session.todayQ?.answerKey ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : session.isSubmitted && session.selectedOpt === opt ? 'bg-rose-50 border-rose-500 text-rose-700' : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-600'}`}><MathRender content={opt}/></button>
                        ))
                    )}
                 </div>
                 
                 {session.isSubmitted && (<div className={`mt-8 text-center font-black text-lg ${session.isCorrect ? 'text-emerald-600' : 'text-slate-400'}`}>{session.isCorrect ? 'Tuyệt vời! Bạn đã hoàn thành nhiệm vụ.' : 'Rất tiếc, hãy thử lại vào ngày mai!'}</div>)}
              </div>
           ) : (
             <div className="flex-1 flex items-center justify-center text-slate-400 font-medium animate-pulse">Đang tải câu hỏi...</div>
           )}
        </div>
    );
};
// 6. CHAT SCREEN
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
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const [user, setUser] = useState<UserProfile | null>(null);
  const [screen, setScreen] = useState<'AUTH' | 'HOME' | 'PRACTICE' | 'GAME' | 'CHALLENGE' | 'LEADERBOARD' | 'CHAT'>('AUTH');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [copyText, setCopyText] = useState('');

  // DATA FETCHING STATE
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Session States
  const [practiceSession, setPracticeSession] = useState<PracticeSessionData>(INITIAL_PRACTICE_STATE);
  const [gameSession, setGameSession] = useState<GameSessionData>(INITIAL_GAME_STATE);
  const [challengeSession, setChallengeSession] = useState<ChallengeSessionData>(INITIAL_CHALLENGE_STATE);
   
  // Home States
  const [selectedTopic, setSelectedTopic] = useState<{id: string, label: string} | null>(null);
  const [expandedLessonIds, setExpandedLessonIds] = useState<string[]>([]);

  // 1. Check Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u: any) => {
        // Logic handled in AuthScreen mostly, but this keeps auth state consistent
    });
    return () => unsubscribe();
  }, []);

  // 2. Fetch Content Data from Firebase
  useEffect(() => {
    const fetchContent = async () => {
        try {
            setLoadingData(true);
            
            // Fetch Lessons
            const lessonsSnap = await getDocs(collection(db, 'lessons'));
            const loadedLessons: Lesson[] = [];
            lessonsSnap.forEach(doc => loadedLessons.push(doc.data() as Lesson));
            setLessons(loadedLessons);

            // Fetch Questions
            const questionsSnap = await getDocs(collection(db, 'questions'));
            const loadedQuestions: Question[] = [];
            questionsSnap.forEach(doc => loadedQuestions.push(doc.data() as Question));
            setQuestions(loadedQuestions);

        } catch (error) {
            console.error("Lỗi tải dữ liệu:", error);
            setToastMsg("Không thể tải dữ liệu từ máy chủ.");
        } finally {
            setLoadingData(false);
        }
    };

    fetchContent();
  }, []);

  // --- HÀM NẠP DỮ LIỆU TỪ FILE data.ts ---
  const handleNapDuLieu = async () => {
    if (!confirm("Thầy có chắc chắn muốn NẠP TOÀN BỘ dữ liệu từ file data.ts lên Firebase không?")) return;
    
    setToastMsg("⏳ Đang xử lý...");
    try {
      let lCount = 0;
      let qCount = 0;

      // 1. Nạp Bài Học
      for (const les of PHYSICS_LESSONS) {
        await setDoc(doc(db, 'lessons', les.id), les);
        lCount++;
      }

      // 2. Nạp Câu Hỏi
      for (const ques of QUESTION_BANK) {
        await setDoc(doc(db, 'questions', ques.id), ques);
        qCount++;
      }

      setToastMsg(`✅ Xong! Đã nạp ${lCount} bài học & ${qCount} câu hỏi.`);
      setTimeout(() => window.location.reload(), 1500); // Tự tải lại trang
    } catch (e: any) {
      console.error(e);
      setToastMsg("❌ Lỗi: " + e.message);
    }
  };

  const handleLogin = (u: UserProfile) => {
    setUser(u);
    setScreen('HOME');
  };

  const handleScore = async (pts: number, source: 'practice' | 'game' | 'challenge') => {
    if (!user) return;
    const updatedUser: UserProfile = {
      ...user,
      totalScore: user.totalScore + pts,
      practiceScore: source === 'practice'  ? user.practiceScore + pts  : user.practiceScore,
      gameScore:        source === 'game'        ? user.gameScore + pts        : user.gameScore,
      challengeScore: source === 'challenge' ? user.challengeScore + pts : user.challengeScore,
    };
    setUser(updatedUser);
    setToastMsg(`+${pts} điểm!`);
    try {
      const userRef = doc(db, 'users', user.uid);
      const updateData: any = { totalScore: increment(pts) };
      if (source === 'practice') updateData.practiceScore = increment(pts);
      else if (source === 'game') updateData.gameScore = increment(pts);
      else if (source === 'challenge') updateData.challengeScore = increment(pts);
      await updateDoc(userRef, updateData);
    } catch (e) { console.error('Lỗi cập nhật điểm:', e); }
  };

  const handleCopy = async (txt: string) => {
    let isCopied = false;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try { await navigator.clipboard.writeText(txt); isCopied = true; } catch (err) {}
    }
    if (!isCopied) {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = txt;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        isCopied = document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch (err) {}
    }
    setCopyText(txt);
    setScreen('CHAT');
    if (!isCopied) setToastMsg("Lỗi: Không thể tự động copy.");
  };

  const handleToggleLesson = (id: string) => {
     setExpandedLessonIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  if (!isClient) return null;

  if (!user) {
      return (
        <>
            <AuthScreen onLoginSuccess={handleLogin} />
            {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg(null)} />}
        </>
      );
  }

  // Màn hình chờ khi đang tải dữ liệu bài học/câu hỏi
  if (loadingData) {
      return (
          <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 gap-4">
              <Loader2 className="animate-spin text-roboki-500" size={48} />
              <div className="text-slate-500 font-bold text-sm">Đang tải dữ liệu từ máy chủ...</div>
          </div>
      );
  }

  return (
    <div className="max-w-md mx-auto h-[100dvh] bg-white shadow-2xl overflow-hidden relative font-sans text-slate-800 flex flex-col">
       
        {/* NÚT NẠP DỮ LIỆU TỪ FILE DATA.TS */}
        <button
          onClick={handleNapDuLieu}
          className="fixed bottom-24 right-4 z-50 bg-indigo-600 text-white font-bold py-3 px-4 rounded-full shadow-2xl border-2 border-white hover:scale-105 active:scale-95 transition-all text-[10px] uppercase tracking-wider flex items-center gap-2"
        >
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          Nạp Data từ File
        </button>

        <div className="flex-1 overflow-y-auto overflow-x-hidden w-full relative pb-24">
            {screen === 'HOME' && (
                <ContentScreen
                    user={user}
                    onCopy={handleCopy}
                    onNavToPractice={() => setScreen('PRACTICE')}
                    onNavToGames={() => setScreen('GAME')}
                    onNavToChallenge={() => setScreen('CHALLENGE')}
                    onNavToLeaderboard={() => setScreen('LEADERBOARD')}
                    onNavToProfile={() => {}}
                    onNavToChat={() => { setCopyText(''); setScreen('CHAT'); }}
                    selectedTopic={selectedTopic}
                    setSelectedTopic={setSelectedTopic}
                    expandedLessonIds={expandedLessonIds}
                    toggleLesson={handleToggleLesson}
                    lessons={lessons} // Truyền data động vào
                />
            )}

            {screen === 'PRACTICE' && (
              <PracticeScreen
                onCopy={handleCopy}
                onScore={(pts) => handleScore(pts, 'practice')}
                sessionData={practiceSession}
                setSessionData={setPracticeSession}
                questions={questions} // Truyền data động vào
              />
            )}

            {screen === 'GAME' && (
              <GameScreen
                onCopy={handleCopy}
                onScore={(pts) => handleScore(pts, 'game')}
                sessionData={gameSession}
                setSessionData={setGameSession}
                questions={questions} // Truyền data động vào
              />
            )}

            {screen === 'CHALLENGE' && (
              <ChallengeScreen
                onBack={() => setScreen('HOME')}
                session={challengeSession}
                setSession={setChallengeSession}
                onScore={(pts) => handleScore(pts, 'challenge')}
                questions={questions} // Truyền data động vào
              />
            )}

            {screen === 'LEADERBOARD' && (
                <LeaderboardScreen onBack={() => setScreen('HOME')} currentUser={user} />
            )}

            {screen === 'CHAT' && (
                <ChatScreen onBack={() => { setScreen('HOME'); setCopyText(''); }} initialPrompt={copyText} />
            )}
        </div>

        {screen !== 'CHAT' && (
            <div className="absolute bottom-0 w-full max-w-md bg-white border-t border-slate-100 p-3 pb-6 flex justify-around items-end z-50 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
                <button onClick={() => setScreen('HOME')} className={`flex flex-col items-center gap-1 transition-colors ${screen === 'HOME' ? 'text-roboki-600' : 'text-slate-400'}`}>
                    <Home size={24} strokeWidth={screen === 'HOME' ? 2.5 : 2} />
                    <span className="text-[10px] font-bold">Trang chủ</span>
                </button>
                <button onClick={() => setScreen('PRACTICE')} className={`flex flex-col items-center gap-1 transition-colors ${screen === 'PRACTICE' ? 'text-roboki-600' : 'text-slate-400'}`}>
                    <SwatchBook size={24} strokeWidth={screen === 'PRACTICE' ? 2.5 : 2} />
                    <span className="text-[10px] font-bold">Luyện đề</span>
                </button>
                <button onClick={() => setScreen('CHAT')} className="relative -top-6 group">
                    <div className="absolute inset-0 bg-orange-200 rounded-full blur opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <div className="w-16 h-16 bg-gradient-to-tr from-roboki-500 to-orange-500 rounded-full shadow-xl shadow-orange-200 flex items-center justify-center text-white border-[4px] border-slate-50 transform group-hover:scale-105 group-active:scale-95 transition-transform relative z-10"><Bot size={32} /></div>
                </button>
                <button onClick={() => setScreen('GAME')} className={`flex flex-col items-center gap-1 transition-colors ${screen === 'GAME' ? 'text-roboki-600' : 'text-slate-400'}`}>
                    <Gamepad2 size={24} strokeWidth={screen === 'GAME' ? 2.5 : 2} />
                    <span className="text-[10px] font-bold">Giải trí</span>
                </button>
                <button onClick={() => setScreen('LEADERBOARD')} className={`flex flex-col items-center gap-1 transition-colors ${screen === 'LEADERBOARD' ? 'text-roboki-600' : 'text-slate-400'}`}>
                    <Trophy size={24} strokeWidth={screen === 'LEADERBOARD' ? 2.5 : 2} />
                    <span className="text-[10px] font-bold">Xếp hạng</span>
                </button>
            </div>
        )}
        {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg(null)} />}
    </div>
  );
};

export default App;