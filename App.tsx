// src/App.tsx
import { playSound } from './utils/SoundManager';
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
  limit,
  writeBatch
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
  ThumbsUp, Percent, Activity, Send, Home, Globe, KeyRound, X, Loader2,
  FileText, ClipboardList, School, Edit3, Save, MapPin, ShieldAlert,
  Lightbulb, GraduationCap, Clock, Phone, Info, StopCircle as StopIcon,
  Coins, PhoneCall, HelpCircle as HelpIcon, ArrowBigRight, Trash2, SkipForward, Medal // 👈 THÊM CÁI NÀY VÀO
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
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const docSnap = await getDoc(doc(db, 'users', cred.user.uid));
        if (docSnap.exists()) onLoginSuccess(docSnap.data() as UserProfile);
        else {
           const fallback: UserProfile = { uid: cred.user.uid, name: cred.user.displayName || 'Học sinh', email: cred.user.email || '', class: '12', school: 'THPT Tự do', totalScore: 0, practiceScore: 0, gameScore: 0, challengeScore: 0, examScore: 0, rank: 999 };
           await setDoc(doc(db, 'users', cred.user.uid), fallback);
           onLoginSuccess(fallback);
        }
      }
    } catch (err: any) { setError(err.message); } finally { setLoading(false); }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-roboki-200 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50"></div>
      <div className="w-full max-w-sm relative z-10">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-tr from-roboki-500 to-orange-600 rounded-3xl mx-auto flex items-center justify-center shadow-lg shadow-roboki-200 mb-4 transform rotate-3"><Bot size={48} className="text-white" /></div>
          <h1 className="text-3xl font-black text-slate-800">Roboki 12</h1>
          <p className="text-slate-500 font-medium mt-1">Ôn tập Vật lí & Trợ lý ảo AI</p>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
           <div className="flex justify-center mb-6">
                <img src="/logo-robok.png" alt="Logo Innedu" className="h-32 w-auto object-contain" />
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

// --- PROFILE SCREEN ---
const ProfileScreen: React.FC<{ 
    user: UserProfile; 
    onBack: () => void; 
    onUpdate: (updatedUser: UserProfile) => void;
    onNavToAuthor: () => void;
}> = ({ user, onBack, onUpdate, onNavToAuthor }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(user);
    const [loading, setLoading] = useState(false);

    useEffect(() => { setFormData(user); }, [user]);

    const handleSave = async () => {
        setLoading(true);
        try {
            await updateDoc(doc(db, 'users', user.uid), {
                name: formData.name,
                class: formData.class,
                school: formData.school || ''
            });
            onUpdate(formData);
            setIsEditing(false);
        } catch (error) {
            alert("Lỗi cập nhật hồ sơ. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try { await signOut(auth); } catch (error) { console.error(error); }
    };

    return (
        <div className="pb-24 pt-4 px-5 h-full flex flex-col bg-slate-50">
            <div className="flex items-center gap-3 mb-6">
                <button onClick={onBack} className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border border-slate-100"><ChevronLeft size={20} className="text-slate-600" /></button>
                <h2 className="text-xl font-black text-slate-800">Hồ sơ cá nhân</h2>
            </div>
            
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex-1 overflow-y-auto">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-roboki-400 to-orange-500 flex items-center justify-center text-white text-4xl font-black mb-4 shadow-lg shadow-roboki-200 border-4 border-white">{formData.name.charAt(0)}</div>
                    <div className="text-center">
                        <h3 className="text-xl font-black text-slate-800">{formData.email}</h3>
                        <p className="text-slate-400 text-xs font-bold mt-1 bg-slate-100 px-3 py-1 rounded-full inline-block">UID: {formData.uid.slice(0, 8)}...</p>
                    </div>
                </div>

                <div className="space-y-5">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-1">Họ và tên</label>
                        <div className="relative">
                            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
                            <input disabled={!isEditing} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className={`w-full pl-11 py-4 rounded-2xl border font-bold text-slate-700 transition-all ${isEditing ? 'bg-white border-roboki-500 ring-2 ring-roboki-100' : 'bg-slate-50 border-slate-100 text-slate-500'}`} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Lớp</label>
                            <div className="relative">
                                <BookOpen size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
                                <input disabled={!isEditing} value={formData.class} onChange={e => setFormData({...formData, class: e.target.value})} className={`w-full pl-11 py-4 rounded-2xl border font-bold text-slate-700 transition-all ${isEditing ? 'bg-white border-roboki-500 ring-2 ring-roboki-100' : 'bg-slate-50 border-slate-100 text-slate-500'}`} />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Trường</label>
                            <div className="relative">
                                <School size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
                                <input disabled={!isEditing} value={formData.school || ''} onChange={e => setFormData({...formData, school: e.target.value})} placeholder="Chưa cập nhật" className={`w-full pl-11 py-4 rounded-2xl border font-bold text-slate-700 transition-all ${isEditing ? 'bg-white border-roboki-500 ring-2 ring-roboki-100' : 'bg-slate-50 border-slate-100 text-slate-500'}`} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                {isEditing ? (
                    <div className="flex gap-3">
                        <button onClick={() => { setIsEditing(false); setFormData(user); }} className="flex-1 bg-white text-slate-500 py-4 rounded-2xl font-bold border border-slate-200">Hủy</button>
                        <button onClick={handleSave} disabled={loading} className="flex-[2] bg-emerald-500 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-200 flex items-center justify-center gap-2">
                            {loading ? <Loader2 className="animate-spin"/> : <Save size={20}/>} Lưu thay đổi
                        </button>
                    </div>
                ) : (
                    <button onClick={() => setIsEditing(true)} className="w-full bg-slate-800 text-white py-4 rounded-2xl font-bold shadow-xl flex items-center justify-center gap-2">
                        <Edit3 size={20}/> Chỉnh sửa hồ sơ
                    </button>
                )}
                
                {!isEditing && (
                    <button onClick={handleLogout} className="w-full mt-3 text-rose-500 font-bold py-3 flex items-center justify-center gap-2 hover:bg-rose-50 rounded-2xl transition-colors">
                        <LogOut size={18}/> Đăng xuất
                    </button>
                )}
            </div>
        </div>
    );
};

// 1. HOME SCREEN
const ContentScreen: React.FC<{
  onCopy: (txt: string) => void; onNavToPractice: () => void; onNavToMockTest: () => void;
  onNavToExam: () => void;
  onNavToGames: () => void; onNavToChallenge: () => void; onNavToLeaderboard: () => void;
  onNavToProfile: () => void; onNavToChat: () => void; user: UserProfile;
  selectedTopic: { id: string, label: string } | null; setSelectedTopic: (topic: { id: string, label: string } | null) => void;
  expandedLessonIds: string[]; toggleLesson: (id: string) => void; lessons: Lesson[];
}> = ({
  onCopy, onNavToPractice, onNavToMockTest, onNavToExam, onNavToGames, onNavToChallenge,
  onNavToLeaderboard, onNavToProfile, onNavToChat, user,
  selectedTopic, setSelectedTopic, expandedLessonIds, toggleLesson, lessons
}) => {
  const TOPICS = [{ id: 't1', label: 'VẬT LÍ NHIỆT', icon: Thermometer }, { id: 't2', label: 'KHÍ LÍ TƯỞNG', icon: Wind }, { id: 't3', label: 'TỪ TRƯỜNG', icon: Magnet }, { id: 't4', label: 'HẠT NHÂN & PHÓNG XẠ', icon: Atom }];

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
      <div className="flex justify-between items-center pt-2">
        <div className="flex flex-col"><span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Xin chào,</span><span className="text-xl font-black text-slate-800">{user.name} 👋</span></div>
        <div className="flex items-center gap-3"><div className="bg-roboki-50 text-roboki-700 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm border border-roboki-100 max-w-[200px] truncate">{user.class} - {user.school || 'THPT'}</div><button onClick={onNavToProfile} className="w-10 h-10 rounded-full bg-slate-200 p-0.5 shadow-sm active:scale-95 transition-transform"><div className="w-full h-full rounded-full bg-gradient-to-tr from-roboki-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold">{user.name.charAt(0)}</div></button></div>
      </div>

      <div onClick={onNavToChat} className="group relative overflow-hidden bg-tech-dark rounded-3xl p-4 shadow-lg shadow-slate-300 cursor-pointer active:scale-[0.98] transition-all border border-slate-700">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 20% 50%, #f97316 0%, transparent 20%), radial-gradient(circle at 80% 80%, #22c55e 0%, transparent 20%), linear-gradient(0deg, transparent 49%, #334155 50%, transparent 51%), linear-gradient(90deg, transparent 49%, #334155 50%, transparent 51%)`, backgroundSize: '100% 100%, 100% 100%, 20px 20px, 20px 20px' }}></div>
        <div className="relative z-10 flex justify-between items-center">
          <div><div className="bg-slate-800/80 backdrop-blur-sm w-fit px-2 py-0.5 rounded-md text-[10px] font-bold mb-2 text-slate-300 uppercase tracking-wide border border-slate-600">Trợ lý AI</div><div className="font-black text-2xl mb-1 flex flex-col leading-none"><span className="text-neon-green tracking-tighter drop-shadow-[0_0_5px_rgba(34,197,94,0.6)]">HỎI</span><span className="text-roboki-500 tracking-wide drop-shadow-[0_0_5px_rgba(249,115,22,0.6)]">ROBOKI</span></div><div className="text-slate-400 text-[10px] mb-4 font-medium">Giải đáp Vật lí cực nhanh</div><button className="bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.4)] flex items-center gap-1.5 group-hover:bg-emerald-400 transition-colors border border-emerald-400">Hỏi Ngay <MessageCircle size={14} className="group-hover:translate-x-0.5 transition-transform"/></button></div>
          <div className="w-24 h-24 relative"><Bot size={80} className="text-roboki-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)] animate-float" /><div className="absolute top-0 right-0 w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_#4ade80]"></div></div>
        </div>
      </div>

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

      <div className="pb-4">
        <h3 className="font-bold text-slate-800 text-base mb-3 flex items-center gap-2"><Zap size={18} className="text-roboki-500"/> Hoạt động</h3>
        <div className="grid grid-cols-2 gap-2.5">
             <div onClick={onNavToPractice} className="bg-orange-50 p-3 rounded-3xl border border-orange-100/50 shadow-sm flex flex-col items-center text-center gap-2 cursor-pointer transition-all hover:shadow-md active:scale-95 group">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-roboki-600 shadow-sm"><SwatchBook size={20} /></div>
                <div><div className="font-bold text-roboki-900 text-sm group-hover:text-roboki-600 transition-colors">LUYỆN TẬP</div><div className="text-[10px] text-roboki-600/70">Luyện theo bài</div></div>
             </div>
             
             <div onClick={onNavToExam} className="bg-red-50 p-3 rounded-3xl border border-red-100/50 shadow-sm flex flex-col items-center text-center gap-2 cursor-pointer transition-all hover:shadow-md active:scale-95 group">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-600 shadow-sm"><GraduationCap size={20} /></div>
                <div><div className="font-bold text-red-900 text-sm group-hover:text-red-600 transition-colors">THI THỬ</div><div className="text-[10px] text-red-600/70">Đề chuẩn 2025</div></div>
             </div>

             <div onClick={onNavToMockTest} className="bg-purple-50 p-3 rounded-3xl border border-purple-100/50 shadow-sm flex flex-col items-center text-center gap-2 cursor-pointer transition-all hover:shadow-md active:scale-95 group">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-purple-600 shadow-sm"><ClipboardList size={20} /></div>
                <div><div className="font-bold text-purple-900 text-sm group-hover:text-purple-600 transition-colors">TỰ TẠO ĐỀ</div><div className="text-[10px] text-purple-600/70">Tự cấu hình đề</div></div>
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
 onScore: (pts: number, type?: 'game'|'practice'|'exam'|'challenge'|'mock') => void,
  sessionData: PracticeSessionData,
  setSessionData: React.Dispatch<React.SetStateAction<PracticeSessionData>>,
  questions: Question[],
  lessons: Lesson[],
  // 👇 Thêm dòng này nếu chưa có (để khớp với App.tsx gọi ở dưới)
  onSave: () => void, 
  onExit: () => void
}> = ({ onCopy, onScore, sessionData, setSessionData, questions, lessons }) => {
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
    if (currentQ.subQuestions && currentQ.subQuestions.length > 0) {
        let correctCount = 0;
        currentQ.subQuestions.forEach(sq => { if (subAnswers && subAnswers[sq.id] === sq.isCorrect) correctCount++; });
        if(correctCount > 0) onScore(correctCount * 0.25, 'practice');
    } else {
        let isCorrect = false;
        if (currentQ.type === 'Short') { isCorrect = selectedOpt?.trim().toLowerCase() === currentQ.answerKey.trim().toLowerCase(); }
        else { isCorrect = selectedOpt === currentQ.answerKey; }
        if (isCorrect) onScore(isCorrect ? 0.25 : 0, 'practice');
    }
  };

  const handleSubAnswer = (subId: string, val: boolean) => { if (isSubmitted) return; updateSession({ subAnswers: { ...subAnswers, [subId]: val } }); };

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

  const currentQ = quizQuestions[currentQIndex];
  const isGroupQuestion = currentQ.subQuestions && currentQ.subQuestions.length > 0;

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
            <div className="mt-8 animate-fade-in">
               {!isGroupQuestion && (
                   <div className="bg-slate-50 p-5 rounded-2xl text-sm border border-slate-100">
                     <div className="flex items-center gap-2 mb-2 text-roboki-600 font-black text-xs uppercase"><BookOpen size={14}/> Giải thích chi tiết</div>
                     <MathRender content={currentQ.explanationText} className="text-slate-600"/>
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

// 3. MOCK TEST SCREEN (TỰ CẤU HÌNH)
const MockTestScreen: React.FC<{
  onBack: () => void,
  session: MockTestSessionData,
  setSession: React.Dispatch<React.SetStateAction<MockTestSessionData>>,
  questions: Question[],
  onScore: (pts: number, type?: 'game'|'practice'|'exam'|'challenge'|'mock') => void,
  onCopy: (txt: string) => void ,
  onSave: () => void // 👈 Thêm dòng này
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

  const finishExam = () => {
      let totalScore = 0;
      quizQuestions.forEach(q => {
          const uAns = userAnswers[q.id];
          if (!uAns) return;
          if (q.subQuestions) {
              let correctSub = 0;
              q.subQuestions.forEach(sq => { if (uAns[sq.id] === sq.isCorrect) correctSub++; });
              totalScore += correctSub * 0.25; 
          } else if (q.type === 'Short') {
              if (uAns.trim().toLowerCase() === q.answerKey.trim().toLowerCase()) totalScore += 1; 
          } else {
              if (uAns === q.answerKey) totalScore += 0.25; 
          }
      });
      const finalPoints = Math.round(totalScore * 100)/100;
      
      // 👇 QUAN TRỌNG NHẤT LÀ SỬA DÒNG NÀY 👇
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

  if (mode === 'RESULT') {
      return (
        <div className="pb-24 pt-4 px-5 h-full flex flex-col bg-slate-50">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 text-center mb-4 shrink-0"><div className="flex items-center justify-center gap-2 mb-2"><Trophy size={32} className="text-yellow-400 animate-bounce-short"/><h2 className="text-xl font-black text-slate-800">Kết quả</h2></div><div className="text-5xl font-black text-purple-600">{score} <span className="text-sm text-slate-400 font-bold">điểm</span></div></div>
            <div className="flex-1 overflow-y-auto pr-1 space-y-4"><h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Chi tiết bài làm</h3>{quizQuestions.map((q, idx) => {
                    const uAns = userAnswers[q.id];
                    let isCorrectMain = false; 
                    if (!q.subQuestions) { isCorrectMain = q.type==='Short' ? uAns?.toString().trim().toLowerCase()===q.answerKey.trim().toLowerCase() : uAns===q.answerKey; }
                    return (
                        <div key={q.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm relative overflow-hidden">
                            <button onClick={() => copyQuestionContent(q)} className="absolute top-3 right-3 p-2 bg-slate-50 hover:bg-purple-50 text-slate-400 hover:text-purple-600 rounded-lg transition-colors border border-slate-100" title="Hỏi Roboki"><Copy size={16}/></button>
                            <div className="flex gap-2 mb-2"><span className="bg-slate-100 text-slate-500 text-[10px] font-black px-2 py-1 rounded-md uppercase">Câu {idx + 1}</span><span className="text-[10px] font-bold px-2 py-1 rounded-md uppercase border text-blue-600 border-blue-200 bg-blue-50">{q.level}</span></div>
                            <div className="mb-4">{q.imageUrl && <img src={q.imageUrl} className="h-24 w-full object-contain mb-2 rounded-lg border border-slate-100 bg-slate-50" />}<div className="text-sm font-bold text-slate-800"><MathRender content={q.promptText}/></div></div>
                            <div className="bg-slate-50 rounded-xl p-3 text-xs border border-slate-100">
                                {q.subQuestions ? (<div className="space-y-2">{q.subQuestions.map((sq) => { const choice = uAns ? uAns[sq.id] : undefined; const isRightSub = choice === sq.isCorrect; return (<div key={sq.id} className="flex justify-between items-start gap-2 border-b border-slate-200 last:border-0 pb-2 last:pb-0"><div className="flex-1"><MathRender content={sq.content} /><div className="mt-1 flex gap-2 font-bold"><span className={choice === true ? 'text-blue-600' : choice === false ? 'text-slate-500' : 'text-slate-400'}>Bạn: {choice === true ? 'Đúng' : choice === false ? 'Sai' : 'Bỏ qua'}</span><span className="text-slate-300">|</span><span className="text-emerald-600">Đ.Án: {sq.isCorrect ? 'Đúng' : 'Sai'}</span></div></div><div className="mt-1">{isRightSub ? <CheckCircle size={16} className="text-emerald-500"/> : <XCircle size={16} className="text-rose-500"/>}</div></div>) })}</div>) : (<div className="flex flex-col gap-1"><div className="flex justify-between"><span className="text-slate-500 font-medium">Bạn chọn:</span><span className={`font-bold ${isCorrectMain ? 'text-emerald-600' : 'text-rose-600'}`}><MathRender content={uAns || 'Chưa làm'} /></span></div><div className="flex justify-between border-t border-slate-200 pt-1 mt-1"><span className="text-slate-500 font-medium">Đáp án đúng:</span><span className="font-bold text-emerald-600"><MathRender content={q.answerKey} /></span></div></div>)}
                            </div>
                            <div className="mt-3 text-xs text-slate-500 bg-white p-3 rounded-xl border border-slate-100"><div className="font-bold uppercase text-[10px] text-purple-500 mb-1 flex items-center gap-1"><BookOpen size={12}/> Giải thích</div><MathRender content={q.explanationText || 'Chưa có giải thích chi tiết.'} /></div>
                        </div>
                    );
                })}</div>
            <div className="mt-4 flex gap-3 shrink-0"><button onClick={onBack} className="flex-1 bg-white text-slate-500 py-3 rounded-2xl font-bold border border-slate-200 hover:bg-slate-50">Về trang chủ</button><button onClick={() => updateSession({ mode: 'CONFIG', quizQuestions: [], userAnswers: {} })} className="flex-1 bg-purple-600 text-white py-3 rounded-2xl font-bold shadow-lg shadow-purple-200 hover:bg-purple-700">Làm đề mới</button></div>
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

// 4. EXAM SCREEN (THI THỬ - MỚI)
// 4. EXAM SCREEN (THI THỬ - GIAO DIỆN ĐẸP + CHẤM ĐIỂM CHUẨN 2025)
const ExamScreen: React.FC<{
  onBack: () => void;
  session: ExamSessionData;
  setSession: React.Dispatch<React.SetStateAction<ExamSessionData>>;
  questions: Question[];
  // 👇 SỬA DÒNG NÀY
  onScore: (pts: number, type?: 'game'|'practice'|'exam'|'challenge'|'mock') => void;
  onSave: () => void; // 👈 Thêm dòng này
}> = ({ onBack, session, setSession, questions, onScore }) => {
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

  // HÀM CHẤM ĐIỂM CHUẨN 2025 (CÓ LŨY TIẾN ĐIỂM ĐÚNG/SAI)
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

    // Làm gọn số lẻ (ví dụ 8.2500001 -> 8.25)
    const finalScore = Math.round(rawScore * 100) / 100; 
    
    // 👇 SỬA Ở ĐÂY: Truyền thẳng finalScore, bỏ Math.round đi
    onScore(finalScore, 'exam'); 
    
    update({ mode: 'RESULT', score: finalScore, details: { mcq: dMCQ, tf: dTF, short: dShort } });
  };

  const handleA = (v: any, s?: string) => {
      const qId = quizQuestions[currentQIndex].id;
      const currentAns = userAnswers[qId];
      if (s) update({ userAnswers: { ...userAnswers, [qId]: { ...currentAns, [s]: v } } });
      else update({ userAnswers: { ...userAnswers, [qId]: v } });
  };

  // --- GIAO DIỆN MENU (CHỌN ĐỀ) - ĐẸP HƠN ---
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

  // --- GIAO DIỆN KẾT QUẢ (RESULT) ---
  if (mode === 'RESULT') return (
    <div className="p-6 h-full flex flex-col bg-slate-50">
      <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 text-center mb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400"></div>
        <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">{title}</div>
        <div className="relative inline-block">
             <div className="text-7xl font-black text-slate-800 tracking-tighter mb-2">{score}</div>
             <div className="absolute -top-2 -right-6 text-2xl">🌟</div>
        </div>
        <div className="text-slate-500 font-bold text-sm bg-slate-50 inline-block px-4 py-1 rounded-full border border-slate-100">Điểm tổng kết (Thang 10)</div>
        <div className="grid grid-cols-3 gap-3 mt-8">
           <div className="bg-blue-50 text-blue-700 p-3 rounded-2xl flex flex-col items-center"><div className="text-[10px] font-black uppercase opacity-60">MCQ</div><div className="text-lg font-black">{details.mcq}</div></div>
           <div className="bg-purple-50 text-purple-700 p-3 rounded-2xl flex flex-col items-center"><div className="text-[10px] font-black uppercase opacity-60">Đúng/Sai</div><div className="text-lg font-black">{details.tf}</div></div>
           <div className="bg-orange-50 text-orange-700 p-3 rounded-2xl flex flex-col items-center"><div className="text-[10px] font-black uppercase opacity-60">Điền từ</div><div className="text-lg font-black">{details.short}</div></div>
        </div>
      </div>
      <div className="mt-auto space-y-3 pb-20">
        <button onClick={() => start(examType || 'THPT')} className="w-full bg-slate-800 text-white py-4 rounded-2xl font-bold shadow-xl shadow-slate-300 flex items-center justify-center gap-2 active:scale-95 transition-all"><RotateCcw size={20}/> Làm lại đề này</button>
        <div className="flex gap-3">
            <button onClick={() => update({ mode: 'MENU' })} className="flex-1 bg-white text-slate-700 py-3.5 rounded-2xl font-bold border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all">Chọn đề khác</button>
            <button onClick={onBack} className="flex-1 bg-rose-50 text-rose-600 py-3.5 rounded-2xl font-bold border border-rose-100 hover:bg-rose-100 transition-all">Thoát</button>
        </div>
      </div>
    </div>
  );

  // --- GIAO DIỆN LÀM BÀI (DOING) ---
  const q = quizQuestions[currentQIndex]; 
  const ans = userAnswers[q.id];
  
  // Tính toán phần trăm tiến độ
  const progress = ((currentQIndex + 1) / quizQuestions.length) * 100;

  return (
    <div className="flex flex-col h-full pb-20 pt-4 px-4 bg-slate-50">
      
      {/* 👇👇👇 SỬA PHẦN HEADER NÀY 👇👇👇 */}
      <div className="bg-white p-4 rounded-[1.5rem] shadow-sm border border-slate-100 mb-4 sticky top-4 z-20">
         <div className="flex justify-between items-center mb-3">
            {/* Đồng hồ đếm ngược */}
            <div className={`flex items-center gap-2 font-black text-lg ${timeLeft < 300 ? 'text-rose-500 animate-pulse' : 'text-slate-700'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${timeLeft<300?'bg-rose-100':'bg-slate-100'}`}><Clock size={16}/></div>
                {formatTime(timeLeft)}
            </div>

            <div className="flex gap-2">
                {/* 🆕 NÚT QUA CÂU (ICON SKIP CHUYÊN NGHIỆP) */}
            <button 
                disabled={currentQIndex === quizQuestions.length - 1} 
                onClick={() => update({ currentQIndex: currentQIndex + 1 })} 
                className="w-10 h-10 flex items-center justify-center bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl transition-colors disabled:opacity-30 border border-indigo-100"
                title="Câu tiếp theo"
            >
                <SkipForward size={20} fill="currentColor"/>
            </button>

                {/* Nút Nộp bài */}
                <button onClick={() => {if(confirm("Bạn chắc chắn muốn nộp bài?")) finish()}} className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md transition-colors">
                    NỘP BÀI
                </button>
            </div>
         </div>

         {/* 🆕 THANH TIẾN TRÌNH (MỚI THÊM) */}
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
      {/* 👆👆👆 HẾT PHẦN SỬA HEADER 👆👆👆 */}

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

// 5. GAME SCREEN (ĐÃ SỬA LỖI HIỂN THỊ ĐÁP ÁN TRIỆU PHÚ)
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
    // 1. Lọc và lấy câu hỏi theo cấp độ (MCQ và Short, không lấy TrueFalse)
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

  // 👇👇👇 ĐÃ SỬA LỖI LOGIC Ở ĐÂY 👇👇👇
  const handleMillionaireAnswer = (ans: string) => {
      const currentQ = millionaireQuestions[currentMilLevel];
      const isRight = currentQ.type === 'Short' 
          ? ans.trim().toLowerCase() === currentQ.answerKey.trim().toLowerCase()
          : ans === currentQ.answerKey;

      if (isRight) {
          const points = MILLIONAIRE_LADDER[currentMilLevel];
          
          if (currentMilLevel === 14) {
              // Thắng cuộc (Câu cuối)
              setSessionData(prev => ({ ...prev, mode: 'RESULT', score: points, isCorrect: true }));
              onScore(points, 'game');
          } else {
              // Câu tiếp theo: CHỈ HIỆN MÀU XANH TRƯỚC, CHƯA CHUYỂN CÂU HỎI
              setSessionData(prev => ({ 
                  ...prev, 
                  score: points,
                  isCorrect: true, 
              }));

              // Sau 1.5s mới chuyển sang câu hỏi tiếp theo
              setTimeout(() => {
                  setSessionData(prev => ({ 
                      ...prev,
                      currentMilLevel: prev.currentMilLevel + 1, // Lúc này mới tăng level
                      milHiddenOptions: [], 
                      isCorrect: null // Reset màu
                  }));
                  setMilInput(''); // Xóa input nếu là câu trả lời ngắn
              }, 1500);
          }
      } else {
          // Sai -> Game Over
          let safeScore = 0;
          if (currentMilLevel >= 10) safeScore = MILLIONAIRE_LADDER[9];
          else if (currentMilLevel >= 5) safeScore = MILLIONAIRE_LADDER[4];
          
          setSessionData(prev => ({ ...prev, mode: 'RESULT', score: safeScore, isCorrect: false }));
          if(safeScore > 0) onScore(safeScore, 'game');
      }
  };
  // 👆👆👆 KẾT THÚC PHẦN SỬA LỖI 👆👆👆

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
  const handleWheelAnswer = (opt: string) => {
     if (!currentQ) return;
     const isRight = currentQ.type==='Short' ? opt.trim().toLowerCase()===currentQ.answerKey.trim().toLowerCase() : opt===currentQ.answerKey;
     if (isRight) {
        onScore(1, 'game');
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
                 {/* 🛑 Nút kết thúc sớm cho Vòng quay */}
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

// 7. LEADERBOARD SCREEN (GIAO DIỆN MỚI: 2 DÒNG GỌN GÀNG)
// 7. LEADERBOARD SCREEN (TỰ ĐỘNG ĐỔI DANH HIỆU THEO TỪNG TAB)
const LeaderboardScreen: React.FC<{ onBack: () => void; currentUser: UserProfile }> = ({ onBack, currentUser }) => {
  const [filter, setFilter] = useState<'CLASS' | 'SCHOOL' | 'ALL'>('CLASS');
  const [category, setCategory] = useState<'TOTAL' | 'PRACTICE' | 'MOCK' | 'EXAM' | 'GAME' | 'CHALLENGE'>('TOTAL');
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState<any[]>([]);
// 👇 THÊM DÒNG NÀY ĐỂ LƯU CACHE (RAM)
const [leaderboardCache, setLeaderboardCache] = useState<{[key: string]: any[]}>({});
  // ✅ DÁN ĐOẠN NÀY VÀO
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        
        // 1. Xác định trường cần sắp xếp
        let orderByField = 'totalScore';
        if (category === 'PRACTICE') orderByField = 'practiceScore';
        if (category === 'MOCK') orderByField = 'mockScore';
        if (category === 'EXAM') orderByField = 'examScore';
        if (category === 'GAME') orderByField = 'gameScore';
        if (category === 'CHALLENGE') orderByField = 'challengeScore';

        let q;

        // 2. Kiểm tra kỹ dữ liệu trước khi Query (SỬA LỖI TRẮNG TRANG)
        if (filter === 'CLASS') {
            // Nếu thông tin lớp chưa tải xong -> Không làm gì cả
            if (!currentUser.class) { 
                setPlayers([]); 
                setLoading(false); 
                return; 
            }
            q = query(collection(db, 'users'), where('class', '==', currentUser.class), orderBy(orderByField, 'desc'), limit(50));
        
        } else if (filter === 'SCHOOL') {
            // Nếu thông tin trường chưa tải xong
            if (!currentUser.school) { 
                setPlayers([]); 
                setLoading(false); 
                return; 
            }
            q = query(collection(db, 'users'), where('school', '==', currentUser.school), orderBy(orderByField, 'desc'), limit(50));
        
        } else {
            // Toàn quốc (ALL) thì luôn chạy được
            q = query(collection(db, 'users'), orderBy(orderByField, 'desc'), limit(50));
        }
        
        // 3. Thực hiện lấy dữ liệu
        const snap = await getDocs(q);
        const list: any[] = [];
        snap.forEach((d) => list.push(d.data()));
        setPlayers(list);

      } catch (err: any) { 
          console.error("Lỗi tải BXH:", err);
      } finally { 
          setLoading(false); 
      }
    };

    // Thêm delay nhỏ 100ms để đảm bảo currentUser đã ổn định
    const timer = setTimeout(() => {
        if(currentUser) fetchLeaderboard();
    }, 100);

    return () => clearTimeout(timer);

  }, [filter, category, currentUser]);

  const getCatLabel = () => {
      if(category === 'TOTAL') return 'Tổng điểm tích lũy';
      if(category === 'PRACTICE') return 'Điểm Luyện tập';
      if(category === 'MOCK') return 'Điểm Tự tạo đề';
      if(category === 'EXAM') return 'Điểm Thi thử';
      if(category === 'GAME') return 'Điểm Trò chơi';
      if(category === 'CHALLENGE') return 'Điểm Thử thách';
  }

  // --- HÀM XỬ LÝ DANH HIỆU THÔNG MINH (SWITCH CASE) ---
  const getRankByScore = (score: number, type: string) => {
      
      // 1. TỔNG HỢP (Hệ thống Vũ Trụ - Bao la rộng lớn)
      const TOTAL_RANKS = [
          { min: 6000, label: 'VŨ TRỤ', icon: '🌌', color: 'bg-indigo-900 text-indigo-100 border-indigo-500 shadow-md animate-pulse' },
          { min: 5000, label: 'THIÊN HÀ', icon: '✨', color: 'bg-purple-100 text-purple-900 border-purple-300' },
          { min: 4500, label: 'SIÊU SAO', icon: '🌟', color: 'bg-purple-50 text-purple-800 border-purple-200' },
          { min: 4000, label: 'MẶT TRỜI', icon: '🌞', color: 'bg-orange-100 text-orange-800 border-orange-300' },
          { min: 3600, label: 'HÀNH TINH', icon: '🪐', color: 'bg-blue-100 text-blue-800 border-blue-300' },
          { min: 3200, label: 'VỆ TINH', icon: '🌑', color: 'bg-slate-200 text-slate-800 border-slate-300' },
          { min: 2800, label: 'KHÍ QUYỂN', icon: '☁️', color: 'bg-sky-100 text-sky-800 border-sky-300' },
          { min: 2400, label: 'ĐẠI DƯƠNG', icon: '🌊', color: 'bg-blue-50 text-blue-700 border-blue-200' },
          { min: 2000, label: 'LỤC ĐỊA', icon: '⛰️', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
          { min: 1700, label: 'SINH QUYỂN', icon: '🌳', color: 'bg-green-50 text-green-700 border-green-200' },
          { min: 1400, label: 'PHÂN TỬ', icon: '⚗️', color: 'bg-teal-50 text-teal-700 border-teal-200' },
          { min: 1100, label: 'NGUYÊN TỬ', icon: '⚛️', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
          { min: 900, label: 'HẠT NHÂN', icon: '☢️', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
          { min: 700, label: 'PROTON', icon: '🔴', color: 'bg-red-50 text-red-700 border-red-200' },
          { min: 500, label: 'NEUTRON', icon: '🔵', color: 'bg-blue-50 text-blue-600 border-blue-200' },
          { min: 350, label: 'ELECTRON', icon: '⚡', color: 'bg-yellow-50 text-yellow-600 border-yellow-200' },
          { min: 200, label: 'QUARK', icon: '🧩', color: 'bg-pink-50 text-pink-600 border-pink-200' },
          { min: 100, label: 'HẠT BỤI', icon: '🌫️', color: 'bg-gray-100 text-gray-600 border-gray-300' },
          { min: 40, label: 'VÔ HÌNH', icon: '👻', color: 'bg-gray-50 text-gray-400 border-gray-200' },
          { min: 0, label: 'KHỞI NGUYÊN', icon: '🥚', color: 'bg-slate-50 text-slate-400 border-slate-100' },
      ];

      // 2. LUYỆN TẬP (Hệ thống Học Vấn - Sự cần cù)
      const PRACTICE_RANKS = [
          { min: 3000, label: 'VẠN THẾ SƯ', icon: '🧘', color: 'bg-yellow-100 text-yellow-900 border-yellow-400 animate-pulse' },
          { min: 2500, label: 'THÁNH NHÂN', icon: '⚜️', color: 'bg-yellow-50 text-yellow-800 border-yellow-300' },
          { min: 2100, label: 'HIỀN TRIẾT', icon: '👴', color: 'bg-amber-100 text-amber-800 border-amber-300' },
          { min: 1800, label: 'ĐẠI TRÍ TUỆ', icon: '🧠', color: 'bg-amber-50 text-amber-700 border-amber-200' },
          { min: 1500, label: 'NHÀ BÁC HỌC', icon: '⚛️', color: 'bg-orange-100 text-orange-800 border-orange-300' },
          { min: 1200, label: 'GIÁO SƯ', icon: '👨‍🏫', color: 'bg-orange-50 text-orange-700 border-orange-200' },
          { min: 1000, label: 'TIẾN SĨ', icon: '🎓', color: 'bg-red-50 text-red-700 border-red-200' },
          { min: 800, label: 'THẠC SĨ', icon: '📜', color: 'bg-rose-50 text-rose-600 border-rose-200' },
          { min: 650, label: 'HỌC GIẢ', icon: '📙', color: 'bg-pink-50 text-pink-600 border-pink-200' },
          { min: 500, label: 'UYÊN BÁC', icon: '📚', color: 'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-200' },
          { min: 400, label: 'TINH THÔNG', icon: '💡', color: 'bg-purple-50 text-purple-600 border-purple-200' },
          { min: 300, label: 'THÔNG HIỂU', icon: '🧐', color: 'bg-violet-50 text-violet-600 border-violet-200' },
          { min: 200, label: 'CẦN CÙ', icon: '🐜', color: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
          { min: 150, label: 'CHĂM CHỈ', icon: '🐝', color: 'bg-blue-50 text-blue-600 border-blue-200' },
          { min: 100, label: 'MỌT SÁCH', icon: '🤓', color: 'bg-sky-50 text-sky-600 border-sky-200' },
          { min: 70, label: 'HIẾU HỌC', icon: '📖', color: 'bg-cyan-50 text-cyan-600 border-cyan-200' },
          { min: 40, label: 'SƠ CẤP', icon: '📝', color: 'bg-teal-50 text-teal-600 border-teal-200' },
          { min: 20, label: 'HAM HỌC', icon: '🌱', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
          { min: 10, label: 'TẬP ĐỌC', icon: '👶', color: 'bg-green-50 text-green-600 border-green-200' },
          { min: 0, label: 'NGƯỜI MỚI', icon: '🥚', color: 'bg-slate-50 text-slate-500 border-slate-200' },
      ];

      // 3. THI THỬ (Hệ thống Quan Lại Khoa Cử)
      const EXAM_RANKS = [
          { min: 3000, label: 'THẦN CƠ', icon: '🔮', color: 'bg-red-100 text-red-900 border-red-400 animate-pulse' },
          { min: 2600, label: 'QUỐC SƯ', icon: '⛩️', color: 'bg-red-50 text-red-800 border-red-300' },
          { min: 2200, label: 'ĐẠI THẦN', icon: '🏮', color: 'bg-orange-100 text-orange-800 border-orange-300' },
          { min: 1900, label: 'TỂ TƯỚNG', icon: '📜', color: 'bg-orange-50 text-orange-700 border-orange-200' },
          { min: 1600, label: 'TRẠNG NGUYÊN', icon: '🥇', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
          { min: 1300, label: 'BẢNG NHÃN', icon: '🥈', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
          { min: 1100, label: 'THÁM HOA', icon: '🥉', color: 'bg-amber-50 text-amber-700 border-amber-200' },
          { min: 900, label: 'HOÀNG GIÁP', icon: '🏵️', color: 'bg-lime-50 text-lime-700 border-lime-200' },
          { min: 750, label: 'TIẾN SĨ', icon: '🎓', color: 'bg-green-50 text-green-700 border-green-200' },
          { min: 600, label: 'HÀN LÂM', icon: '🏛️', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
          { min: 500, label: 'GIÁO THỤ', icon: '🏫', color: 'bg-teal-50 text-teal-700 border-teal-200' },
          { min: 400, label: 'GIÁM SINH', icon: '🎒', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
          { min: 300, label: 'CỐNG SINH', icon: '📘', color: 'bg-sky-50 text-sky-700 border-sky-200' },
          { min: 200, label: 'CỬ NHÂN', icon: '📜', color: 'bg-blue-50 text-blue-700 border-blue-200' },
          { min: 150, label: 'TÚ TÀI', icon: '✍️', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
          { min: 100, label: 'KHÓA SINH', icon: '📚', color: 'bg-violet-50 text-violet-700 border-violet-200' },
          { min: 60, label: 'NHO SINH', icon: '🖌️', color: 'bg-purple-50 text-purple-700 border-purple-200' },
          { min: 30, label: 'THƯ SINH', icon: '📖', color: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200' },
          { min: 10, label: 'HỌC TRÒ', icon: '🧒', color: 'bg-pink-50 text-pink-700 border-pink-200' },
          { min: 0, label: 'ĐỒNG SINH', icon: '👶', color: 'bg-slate-50 text-slate-500 border-slate-200' },
      ];

      // 4. GAME (Hệ thống Rank Game thủ)
      const GAME_RANKS = [
          { min: 5000, label: 'VUA TRÒ CHƠI', icon: '👑', color: 'bg-black text-yellow-400 border-yellow-500 shadow-md animate-pulse' },
          { min: 4000, label: 'ĐỘC CÔ', icon: '⚔️', color: 'bg-gray-800 text-red-400 border-red-500' },
          { min: 3500, label: 'TRÙM CUỐI', icon: '👹', color: 'bg-gray-800 text-purple-400 border-purple-500' },
          { min: 3000, label: 'BẤT TỬ', icon: '☠️', color: 'bg-red-100 text-red-800 border-red-300' },
          { min: 2600, label: 'HUYỀN THOẠI', icon: '⚜️', color: 'bg-orange-100 text-orange-800 border-orange-300' },
          { min: 2200, label: 'MVP', icon: '🏆', color: 'bg-amber-100 text-amber-800 border-amber-300' },
          { min: 1900, label: 'TUYỂN THỦ', icon: '🎧', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
          { min: 1600, label: 'TOP SERVER', icon: '🌐', color: 'bg-lime-50 text-lime-700 border-lime-200' },
          { min: 1300, label: 'THÁCH ĐẤU', icon: '🔥', color: 'bg-green-50 text-green-700 border-green-200' },
          { min: 1100, label: 'ĐẠI CAO THỦ', icon: '🐉', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
          { min: 900, label: 'CAO THỦ', icon: '🦅', color: 'bg-teal-50 text-teal-700 border-teal-200' },
          { min: 700, label: 'TINH ANH', icon: '💎', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
          { min: 550, label: 'KIM CƯƠNG', icon: '💠', color: 'bg-sky-50 text-sky-700 border-sky-200' },
          { min: 400, label: 'BẠCH KIM', icon: '💿', color: 'bg-blue-50 text-blue-700 border-blue-200' },
          { min: 300, label: 'VÀNG ĐOÀN', icon: '🥇', color: 'bg-yellow-50 text-yellow-600 border-yellow-200' },
          { min: 200, label: 'BẠC ĐOÀN', icon: '🥈', color: 'bg-slate-200 text-slate-600 border-slate-300' },
          { min: 120, label: 'ĐỒNG ĐOÀN', icon: '🥉', color: 'bg-orange-50 text-orange-600 border-orange-200' },
          { min: 80, label: 'SẮT ĐOÀN', icon: '🛡️', color: 'bg-stone-100 text-stone-600 border-stone-200' },
          { min: 40, label: 'GÀ MỜ', icon: '🐥', color: 'bg-stone-50 text-stone-500 border-stone-200' },
          { min: 0, label: 'TẬP CHƠI', icon: '🎮', color: 'bg-slate-50 text-slate-400 border-slate-100' },
      ];

      // 5. THỬ THÁCH (Hệ thống Quân Đội)
      const CHALLENGE_RANKS = [
          { min: 2000, label: 'THỐNG LĨNH', icon: '🎖️', color: 'bg-red-100 text-red-900 border-red-400 animate-pulse' },
          { min: 1800, label: 'ĐẠI TƯỚNG', icon: '⭐⭐⭐⭐', color: 'bg-red-50 text-red-800 border-red-300' },
          { min: 1600, label: 'THƯỢNG TƯỚNG', icon: '⭐⭐⭐', color: 'bg-orange-100 text-orange-800 border-orange-300' },
          { min: 1400, label: 'TRUNG TƯỚNG', icon: '⭐⭐', color: 'bg-orange-50 text-orange-700 border-orange-200' },
          { min: 1200, label: 'THIẾU TƯỚNG', icon: '⭐', color: 'bg-amber-50 text-amber-700 border-amber-200' },
          { min: 1000, label: 'ĐẠI TÁ', icon: '🔴', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
          { min: 900, label: 'THƯỢNG TÁ', icon: '🔴', color: 'bg-lime-50 text-lime-700 border-lime-200' },
          { min: 800, label: 'TRUNG TÁ', icon: '🔴', color: 'bg-green-50 text-green-700 border-green-200' },
          { min: 700, label: 'THIẾU TÁ', icon: '🔴', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
          { min: 600, label: 'ĐẠI ÚY', icon: '🔷', color: 'bg-teal-50 text-teal-700 border-teal-200' },
          { min: 500, label: 'THƯỢNG ÚY', icon: '🔷', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
          { min: 400, label: 'TRUNG ÚY', icon: '🔷', color: 'bg-sky-50 text-sky-700 border-sky-200' },
          { min: 300, label: 'THIẾU ÚY', icon: '🔷', color: 'bg-blue-50 text-blue-700 border-blue-200' },
          { min: 200, label: 'CHUẨN ÚY', icon: '🔹', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
          { min: 150, label: 'THƯỢNG SĨ', icon: '🛡️', color: 'bg-violet-50 text-violet-700 border-violet-200' },
          { min: 100, label: 'TRUNG SĨ', icon: '🛡️', color: 'bg-purple-50 text-purple-700 border-purple-200' },
          { min: 70, label: 'HẠ SĨ', icon: '🛡️', color: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200' },
          { min: 40, label: 'BINH NHẤT', icon: '💂', color: 'bg-pink-50 text-pink-700 border-pink-200' },
          { min: 20, label: 'BINH NHÌ', icon: '💂', color: 'bg-rose-50 text-rose-700 border-rose-200' },
          { min: 0, label: 'TÂN BINH', icon: '🐣', color: 'bg-slate-50 text-slate-500 border-slate-200' },
      ];

      // 6. TỰ TẠO ĐỀ (Hệ thống Xây dựng)
      const MOCK_RANKS = [
          { min: 2500, label: 'ĐẤNG KIẾN TẠO', icon: '🌌', color: 'bg-violet-100 text-violet-900 border-violet-300 animate-pulse' },
          { min: 2200, label: 'TỔ SƯ NGHỀ', icon: '🧘', color: 'bg-purple-50 text-purple-800 border-purple-300' },
          { min: 1900, label: 'NHÀ SÁNG TẠO', icon: '💡', color: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300' },
          { min: 1600, label: 'ĐẠI KIẾN TRÚC', icon: '🏛️', color: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200' },
          { min: 1400, label: 'NHÀ QUY HOẠCH', icon: '🗺️', color: 'bg-pink-100 text-pink-800 border-pink-300' },
          { min: 1200, label: 'TỔNG CÔNG TRÌNH', icon: '🏗️', color: 'bg-pink-50 text-pink-700 border-pink-200' },
          { min: 1000, label: 'KIẾN TRÚC SƯ', icon: '📐', color: 'bg-rose-50 text-rose-700 border-rose-200' },
          { min: 850, label: 'CHUYÊN GIA', icon: '🧐', color: 'bg-orange-50 text-orange-700 border-orange-200' },
          { min: 700, label: 'TRƯỞNG PHÒNG', icon: '📁', color: 'bg-orange-50 text-orange-600 border-orange-200' },
          { min: 600, label: 'THIẾT KẾ VIÊN', icon: '✏️', color: 'bg-amber-50 text-amber-700 border-amber-200' },
          { min: 500, label: 'KỸ SƯ', icon: '⚙️', color: 'bg-amber-50 text-amber-600 border-amber-200' },
          { min: 400, label: 'KỸ THUẬT VIÊN', icon: '🔧', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
          { min: 300, label: 'ĐỐC CÔNG', icon: '👷', color: 'bg-yellow-50 text-yellow-600 border-yellow-200' },
          { min: 200, label: 'QUẢN CÔNG', icon: '📋', color: 'bg-lime-50 text-lime-700 border-lime-200' },
          { min: 150, label: 'THỢ CẢ', icon: '🔨', color: 'bg-lime-50 text-lime-600 border-lime-200' },
          { min: 100, label: 'THỢ CHÍNH', icon: '🧱', color: 'bg-green-50 text-green-700 border-green-200' },
          { min: 70, label: 'THỢ NỀ', icon: '🧱', color: 'bg-green-50 text-green-600 border-green-200' },
          { min: 40, label: 'THỢ PHỤ', icon: '🧱', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
          { min: 20, label: 'PHỤ VIỆC', icon: '🧹', color: 'bg-teal-50 text-teal-600 border-teal-200' },
          { min: 0, label: 'TẬP SỰ', icon: '🔰', color: 'bg-slate-50 text-slate-400 border-slate-100' },
      ];

      // 👇 CƠ CHẾ "TAB NÀO RA DANH HIỆU ĐÓ"
      let selectedRanks = TOTAL_RANKS;
      if (type === 'PRACTICE') selectedRanks = PRACTICE_RANKS;
      if (type === 'EXAM') selectedRanks = EXAM_RANKS;
      if (type === 'GAME') selectedRanks = GAME_RANKS;
      if (type === 'CHALLENGE') selectedRanks = CHALLENGE_RANKS;
      if (type === 'MOCK') selectedRanks = MOCK_RANKS;

      return selectedRanks.find(r => score >= r.min) || selectedRanks[selectedRanks.length - 1];
  }

  // --- HỆ THỐNG HUY HIỆU ĐẶC BIỆT (SPECIAL BADGES) ---
  const getBadges = (u: UserProfile, index: number) => {
      const badges = [];

      // 1. 👑 ĐỘC TÔN (Top 1 Bảng xếp hạng)
      if (index === 0) {
          badges.push({ icon: '👑', color: 'bg-yellow-400 text-white border border-yellow-500', label: 'Độc tôn' });
      }

      // 2. ⚛️ YÊU VẬT LÍ (Tổng điểm > 5000)
      if ((u.totalScore || 0) > 5000) {
          badges.push({ icon: '⚛️', color: 'bg-indigo-600 text-white border border-indigo-700', label: 'Yêu Vật Lí' });
      }

      // 3. 💎 ĐẠI GIA (Tích lũy > 3000 điểm Game)
      if ((u.gameScore || 0) > 3000) {
          badges.push({ icon: '💎', color: 'bg-fuchsia-500 text-white border border-fuchsia-600', label: 'Đại gia' });
      }

      // 4. 🏹 THỢ SĂN (Hoàn thành 50 Thử thách)
      // Tạm tính: Mỗi thử thách trung bình 10 điểm -> 50 thử thách ≈ 500 điểm
      if ((u.challengeScore || 0) >= 500) {
          badges.push({ icon: '🏹', color: 'bg-emerald-600 text-white border border-emerald-700', label: 'Thợ săn' });
      }

      // 5. 🧠 SIÊU TRÍ TUỆ (Điểm thi thử > 9.5)
      // Logic: Kiểm tra điểm thi thử (giả sử examScore là điểm cao nhất hoặc điểm lần cuối)
      if ((u.examScore || 0) > 9.5) {
          badges.push({ icon: '🧠', color: 'bg-rose-500 text-white border border-rose-600', label: 'Siêu trí tuệ' });
      }

      // --- CÁC HUY HIỆU DỰA TRÊN THÔNG SỐ (CẦN UPDATE DB ĐỂ HIỆN) ---

      // 6. 🔥 CHĂM CHỈ (Học 3 ngày liên tiếp)
      if (u.loginStreak && u.loginStreak >= 3) {
          badges.push({ icon: '🔥', color: 'bg-orange-500 text-white border border-orange-600', label: 'Chăm chỉ' });
      }

      // 7. ⚡ TIA CHỚP (Có trả lời đúng < 5s)
      if (u.fastAnswerCount && u.fastAnswerCount > 0) {
          badges.push({ icon: '⚡', color: 'bg-yellow-500 text-white border border-yellow-600', label: 'Tia chớp' });
      }

      // 8. 🎯 XẠ THỦ (Đúng 10 câu liên tiếp)
      if (u.correctStreak && u.correctStreak >= 10) {
          badges.push({ icon: '🎯', color: 'bg-red-600 text-white border border-red-700', label: 'Xạ thủ' });
      }

      // 9. 🦉 CÚ ĐÊM (Học bài sau 23h đêm)
      if (u.lastStudyHour !== undefined && u.lastStudyHour >= 23) {
          badges.push({ icon: '🦉', color: 'bg-slate-800 text-white border border-slate-600', label: 'Cú đêm' });
      }

      // 10. 🐓 GÀ GÁY (Học bài trước 5h sáng)
      if (u.lastStudyHour !== undefined && u.lastStudyHour >= 0 && u.lastStudyHour < 5) {
          badges.push({ icon: '🐓', color: 'bg-teal-600 text-white border border-teal-700', label: 'Gà gáy' });
      }

      // 11. 🍀 THẦN TÀI (Quay trúng ô may mắn/10 điểm)
      if (u.luckySpinCount && u.luckySpinCount > 0) {
          badges.push({ icon: '🍀', color: 'bg-green-500 text-white border border-green-600', label: 'Thần tài' });
      }

      // 12. 🛡️ NGƯỜI BẢO HỘ (Tính năng tương lai - Tạm ẩn)
      // if (u.isGuardian) badges.push(...)

      return badges;
  }

  return (
    <div className="pb-24 pt-4 px-4 h-full flex flex-col bg-slate-50">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={onBack} className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border border-slate-100"><ChevronLeft size={20}/></button>
        <div><h2 className="text-xl font-black text-slate-800">Bảng xếp hạng</h2></div>
      </div>
      
      {/* 1. LỌC PHẠM VI */}
      <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100 mb-4">
          <button onClick={() => setFilter('CLASS')} className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${filter === 'CLASS' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-400'}`}>Lớp</button>
          <button onClick={() => setFilter('SCHOOL')} className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${filter === 'SCHOOL' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-400'}`}>Trường</button>
          <button onClick={() => setFilter('ALL')} className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${filter === 'ALL' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-400'}`}>Toàn quốc</button>
      </div>

      {/* 2. MENU GRID (3x2) */}
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

      {/* 3. DANH SÁCH (CÓ DANH HIỆU 20 CẤP) */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex-1 overflow-y-auto">
        {loading ? <div className="text-center py-4 text-slate-400"><Loader2 className="animate-spin inline mr-2"/> Đang tải...</div> : (
          <div className="space-y-3">{players.map((u, i) => {
              let displayScore = 0;
              if (category === 'TOTAL') displayScore = u.totalScore || 0;
              if (category === 'PRACTICE') displayScore = u.practiceScore || 0;
              if (category === 'MOCK') displayScore = u.mockScore || 0;
              if (category === 'EXAM') displayScore = u.examScore || 0;
              if (category === 'GAME') displayScore = u.gameScore || 0;
              if (category === 'CHALLENGE') displayScore = u.challengeScore || 0;

              // Rank Icon
              let rankIcon;
              if (i === 0) rankIcon = <Medal size={32} className="text-yellow-400 fill-yellow-100 drop-shadow-sm animate-bounce-short"/>;
              else if (i === 1) rankIcon = <Medal size={28} className="text-slate-400 fill-slate-100 drop-shadow-sm"/>;
              else if (i === 2) rankIcon = <Medal size={28} className="text-orange-600 fill-orange-100 drop-shadow-sm"/>;
              else rankIcon = <span className="text-sm font-black text-slate-400">{i + 1}</span>;

              // 👇 LẤY DANH HIỆU 20 CẤP
              const rankTitle = getRankByScore(displayScore, category);
              const specialBadges = getBadges(u, i);

              return (
                <div key={u.uid} className={`flex flex-col p-4 rounded-2xl border transition-colors ${u.uid === currentUser.uid ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-slate-100 hover:border-slate-300'}`}>
                   {/* Hàng 1 */}
                   <div className="flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="w-8 h-8 flex items-center justify-center shrink-0">
                              {rankIcon}
                          </div>
                          <div>
                              <div className={`font-bold text-sm flex items-center gap-2 flex-wrap ${u.uid === currentUser.uid ? 'text-indigo-700' : 'text-slate-800'}`}>
                                {u.name} 
                                {/* HIỂN THỊ DANH HIỆU 20 CẤP */}
                                <span className={`text-[8px] px-2 py-0.5 rounded-md border font-black uppercase tracking-wider flex items-center gap-1 whitespace-nowrap ${rankTitle.color}`}>
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

                   {/* Hàng 2: Huy hiệu đặc biệt */}
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
          })}</div>
        )}
      </div>
    </div>
  );
};

// 8. CHALLENGE SCREEN (Đã phục hồi)
const ChallengeScreen: React.FC<{
  onBack: () => void,
  session: ChallengeSessionData,
  setSession: React.Dispatch<React.SetStateAction<ChallengeSessionData>>,
  onScore: (pts: number, type?: 'game'|'practice'|'exam'|'challenge') => void,
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
        if (isCorrect) onScore(isCorrect ? 10 : -5, 'challenge'); // Challenge tính vào gameScore
    };

    return (
        <div className="pb-24 pt-4 px-4 h-full flex flex-col bg-slate-50">
            <div className="flex items-center justify-between mb-6">
               <div className="flex items-center gap-3">
                  <button onClick={onBack} className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border border-slate-100"><ChevronLeft size={20} className="text-slate-600"/></button>
                  <h2 className="text-xl font-black text-slate-800">Thử thách</h2>
               </div>
               {/* 🛑 Nút kết thúc sớm */}
               <button onClick={onBack} className="bg-rose-50 text-rose-500 p-2 rounded-full"><X size={20}/></button>
            </div>

            {session.todayQ ? (
               <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex-1 overflow-y-auto">
                  <div className="flex justify-between items-start mb-6">
                     <div className="bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">Daily Quest</div>
                     <div className="text-right"><div className="font-black text-2xl text-slate-800">+1</div><div className="text-[10px] text-slate-400 font-bold uppercase">Điểm thưởng</div></div>
                  </div>
                  
                  {/* HIỂN THỊ ẢNH TRONG THỬ THÁCH */}
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

// 9. CHAT SCREEN (Đã phục hồi)
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
  const [screen, setScreen] = useState<'AUTH' | 'HOME' | 'PRACTICE' | 'MOCK_TEST' | 'EXAM' | 'GAME' | 'CHALLENGE' | 'LEADERBOARD' | 'CHAT' | 'PROFILE' | 'AUTHOR'>('AUTH');
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

  useEffect(() => { const u = onAuthStateChanged(auth, (firebaseUser)=>{
    if (!firebaseUser) {
        setUser(null);
        setScreen('AUTH');
    }
  }); return () => u(); }, []);
  
  // ✅ COPY ĐOẠN NÀY ĐÈ LÊN ĐOẠN CŨ CỦA BẠN
  // ✅ DÁN ĐOẠN NÀY VÀO THAY THẾ
  useEffect(() => { 
    const fetchData = async () => { 
      try { 
        setLoadingData(true); 
        
        // 1. Kiểm tra cache trong máy
        const cachedQuestions = localStorage.getItem('questions_cache');
        const cachedLessons = localStorage.getItem('lessons_cache');
        const cacheTime = localStorage.getItem('data_cache_time');

        // Kiểm tra hạn sử dụng cache (24 giờ)
        const isCacheValid = cacheTime && (Date.now() - parseInt(cacheTime) < 86400000);

        if (cachedQuestions && cachedLessons && isCacheValid) {
            console.log("✅ Dùng data từ Cache (Không tốn Read)");
            setQuestions(JSON.parse(cachedQuestions));
            setLessons(JSON.parse(cachedLessons));
        } else {
            console.log("⚠️ Tải mới từ Firebase...");
            
            const lS = await getDocs(collection(db, 'lessons')); 
            const lL: Lesson[] = []; 
            lS.forEach(d => lL.push(d.data() as Lesson)); 
            
            const qS = await getDocs(collection(db, 'questions')); 
            const lQ: Question[] = []; 
            qS.forEach(d => lQ.push(d.data() as Question)); 
            
            setLessons(lL);
            setQuestions(lQ);

            // Lưu vào máy
            localStorage.setItem('lessons_cache', JSON.stringify(lL));
            localStorage.setItem('questions_cache', JSON.stringify(lQ));
            localStorage.setItem('data_cache_time', Date.now().toString());
        }
      } catch (e) { 
        setToastMsg("Lỗi tải data"); 
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
// --- LOGIC TÍNH ĐIỂM (ĐÃ CẬP NHẬT: THÊM LOẠI 'mock') ---
const handleScore = (pts: number, type: 'game'|'practice'|'exam'|'challenge'|'mock' = 'game') => { 
    if(!user) return; 
    
    // 1. Cộng dồn vào biến tạm (RAM)
    if (type === 'game') {
        pendingUpdates.current.game += pts;
        // ⚠️ Game KHÔNG cộng vào Total (theo yêu cầu của thầy)
    } 
    else if (type === 'practice') { 
        pendingUpdates.current.practice += pts; 
        pendingUpdates.current.total += pts; 
    }
    else if (type === 'mock') { // 👈 MỚI: TỰ ÔN ĐỀ
        pendingUpdates.current.mock += pts; 
        pendingUpdates.current.total += pts; 
    }
    else if (type === 'exam') { 
        pendingUpdates.current.exam += pts; 
        pendingUpdates.current.total += pts; 
    }
    else if (type === 'challenge') { 
        pendingUpdates.current.challenge += pts; 
        pendingUpdates.current.total += pts; 
    }

    // 2. Cập nhật giao diện ngay lập tức (Optimistic Update)
    setUser(prev => {
        if (!prev) return null;
        const nu = { ...prev };
        
        // Đảm bảo trường mockScore tồn tại để tránh lỗi
        if (typeof nu.mockScore === 'undefined') nu.mockScore = 0; 

        if (type === 'game') nu.gameScore = (nu.gameScore || 0) + pts;
        else if (type === 'practice') { nu.practiceScore = (nu.practiceScore || 0) + pts; nu.totalScore = (nu.totalScore || 0) + pts; }
        else if (type === 'mock') { nu.mockScore = (nu.mockScore || 0) + pts; nu.totalScore = (nu.totalScore || 0) + pts; } // 👈 Cập nhật UI Mock
        else if (type === 'exam') { nu.examScore = (nu.examScore || 0) + pts; nu.totalScore = (nu.totalScore || 0) + pts; }
        else if (type === 'challenge') { nu.challengeScore = (nu.challengeScore || 0) + pts; nu.totalScore = (nu.totalScore || 0) + pts; }
        return nu;
    });
    
    const sign = pts > 0 ? '+' : '';
    setToastMsg(`${sign}${pts} điểm`); 
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
    } catch (error) {
        console.error("Lỗi lưu điểm:", error);
    }
};

  // Hàm chuyển trang: Tự động lưu điểm trước khi chuyển
  const navigateTo = (newScreen: any) => {
      saveData(); // Lưu điểm cũ
      setScreen(newScreen); // Chuyển trang mới
  }
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
            {screen === 'HOME' && <ContentScreen user={user} onCopy={handleCopy} onNavToPractice={()=>navigateTo('PRACTICE')} onNavToMockTest={()=>navigateTo('MOCK_TEST')} onNavToExam={()=>navigateTo('EXAM')} onNavToGames={()=>navigateTo('GAME')} onNavToChallenge={()=>navigateTo('CHALLENGE')} onNavToLeaderboard={()=>navigateTo('LEADERBOARD')} onNavToProfile={()=>navigateTo('PROFILE')} onNavToChat={()=>{setCopyText('');navigateTo('CHAT')}} selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} expandedLessonIds={expandedLessonIds} toggleLesson={handleToggleLesson} lessons={lessons}/>}
            
            {/* 👇 KẾT NỐI HÀM LƯU DỮ LIỆU VÀO CÁC MÀN HÌNH 👇 */}
            {screen === 'PRACTICE' && <PracticeScreen onCopy={handleCopy} onScore={handleScore} sessionData={practiceSession} setSessionData={setPracticeSession} questions={questions} lessons={lessons} onSave={saveData} onExit={()=>navigateTo('HOME')}/>}
            {screen === 'MOCK_TEST' && <MockTestScreen onBack={()=>navigateTo('HOME')} session={mockTestSession} setSession={setMockTestSession} questions={questions} onScore={handleScore} onCopy={handleCopy} onSave={saveData}/>}
            {screen === 'EXAM' && <ExamScreen onBack={()=>navigateTo('HOME')} session={examSession} setSession={setExamSession} questions={questions} onScore={handleScore} onSave={saveData}/>}
            
            {screen === 'GAME' && <GameScreen onCopy={handleCopy} onScore={handleScore} sessionData={gameSession} setSessionData={setGameSession} questions={questions}/>}
            {screen === 'CHALLENGE' && <ChallengeScreen onBack={()=>navigateTo('HOME')} session={challengeSession} setSession={setChallengeSession} onScore={handleScore} questions={questions}/>}
            {screen === 'LEADERBOARD' && <LeaderboardScreen onBack={()=>navigateTo('HOME')} currentUser={user}/>}
            {screen === 'CHAT' && <ChatScreen onBack={()=>{navigateTo('HOME');setCopyText('')}} initialPrompt={copyText}/>}
            {screen === 'PROFILE' && <ProfileScreen user={user} onBack={()=>navigateTo('HOME')} onUpdate={setUser} onNavToAuthor={()=>navigateTo('AUTHOR')} />}
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