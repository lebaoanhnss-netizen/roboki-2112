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
  ThumbsUp, Percent, Activity, Send, Home, Globe, KeyRound, X, Loader2,
  FileText, ClipboardList, School, Edit3, Save, MapPin
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
  selectedTopic: string;
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
  selectedTopic: 'TẤT CẢ',
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

interface GameSessionData {
  gameType: 'NONE' | 'SPEED' | 'WHEEL';
  mode: 'MENU' | 'PLAYING' | 'RESULT';
  score: number;
  timeLeft: number;
  currentQ: Question | null;
  isCorrect: boolean | null;
  selectedSpeedOpt: string | null;
  correctCount: number;
  totalAnswered: number;
  wheelRotation: number;
  isSpinning: boolean;
  pendingPoints: number;
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
                <MathRender content={lesson.theory} className="text-sm text-slate-700 leading-relaxed"/>
             </div>
             <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h5 className="text-xs font-bold text-slate-600 uppercase mb-2 flex items-center gap-1.5"><Zap size={14}/> Công thức</h5>
                <MathRender content={lesson.formulas} className="text-sm text-slate-800 font-bold font-mono whitespace-pre-line"/>
             </div>
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
  const [school, setSchool] = useState(''); // 👈 MỚI: State cho trường học
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError('');
    if (!auth) { setError("Firebase chưa được cấu hình."); setLoading(false); return; }
    try {
      if (isRegistering) {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: name });
        // 👈 LƯU THÊM TRƯỜNG SCHOOL
        const newUser: UserProfile = { 
            uid: cred.user.uid, name, email, 
            class: className, school: school || 'THPT Tự do', 
            totalScore: 0, practiceScore: 0, gameScore: 0, challengeScore: 0, rank: 999 
        };
        await setDoc(doc(db, 'users', cred.user.uid), newUser);
        onLoginSuccess(newUser);
      } else {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const docSnap = await getDoc(doc(db, 'users', cred.user.uid));
        if (docSnap.exists()) onLoginSuccess(docSnap.data() as UserProfile);
        else {
           // Fallback nếu user cũ chưa có thông tin
           const fallback: UserProfile = { uid: cred.user.uid, name: cred.user.displayName || 'Học sinh', email: cred.user.email || '', class: '12', school: 'THPT Tự do', totalScore: 0, practiceScore: 0, gameScore: 0, challengeScore: 0, rank: 999 };
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
           <div className="flex bg-slate-100 p-1 rounded-2xl mb-6">
             <button onClick={() => { setIsRegistering(false); setError(''); }} className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${!isRegistering ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400'}`}>Đăng nhập</button>
             <button onClick={() => { setIsRegistering(true); setError(''); }} className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${isRegistering ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400'}`}>Đăng ký</button>
           </div>
           <form onSubmit={handleAuth} className="space-y-3">
              {isRegistering && (<>
                  <div className="relative"><User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/><input required value={name} onChange={e=>setName(e.target.value)} placeholder="Họ tên" className="w-full pl-11 py-3.5 bg-slate-50 border rounded-2xl text-sm font-bold outline-none focus:border-roboki-500"/></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative"><BookOpen size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/><input required value={className} onChange={e=>setClassName(e.target.value)} placeholder="Lớp (12A1)" className="w-full pl-11 py-3.5 bg-slate-50 border rounded-2xl text-sm font-bold outline-none focus:border-roboki-500"/></div>
                    {/* 👈 INPUT TRƯỜNG MỚI */}
                    <div className="relative"><School size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/><input required value={school} onChange={e=>setSchool(e.target.value)} placeholder="Trường" className="w-full pl-11 py-3.5 bg-slate-50 border rounded-2xl text-sm font-bold outline-none focus:border-roboki-500"/></div>
                  </div>
              </>)}
              <div className="relative"><Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/><input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full pl-11 py-3.5 bg-slate-50 border rounded-2xl text-sm font-bold outline-none focus:border-roboki-500"/></div>
              <div className="relative"><Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/><input type="password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Mật khẩu" className="w-full pl-11 py-3.5 bg-slate-50 border rounded-2xl text-sm font-bold outline-none focus:border-roboki-500"/></div>
              {error && <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-bold">{error}</div>}
              <button type="submit" disabled={loading} className="w-full bg-roboki-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-roboki-200 hover:bg-roboki-700 active:scale-95 transition-all mt-2">{loading ? 'Đang xử lý...' : (isRegistering ? 'Đăng ký' : 'Đăng nhập')}</button>
           </form>
        </div>
        <p className="text-center text-xs text-slate-400 mt-6 font-bold">Dữ liệu được lưu trữ an toàn trên Firebase.</p>
      </div>
    </div>
  );
};

// --- PROFILE SCREEN (MỚI - XEM VÀ SỬA HỒ SƠ) ---
const ProfileScreen: React.FC<{ 
    user: UserProfile; 
    onBack: () => void; 
    onUpdate: (updatedUser: UserProfile) => void 
}> = ({ user, onBack, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(user);
    const [loading, setLoading] = useState(false);

    // Đồng bộ lại nếu user thay đổi
    useEffect(() => { setFormData(user); }, [user]);

    const handleSave = async () => {
        setLoading(true);
        try {
            await updateDoc(doc(db, 'users', user.uid), {
                name: formData.name,
                class: formData.class,
                school: formData.school || ''
            });
            onUpdate(formData); // Cập nhật lại state ở App
            setIsEditing(false);
        } catch (error) {
            alert("Lỗi cập nhật hồ sơ. Vui lòng thử lại.");
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
                    <button onClick={() => auth.signOut()} className="w-full mt-3 text-rose-500 font-bold py-3 flex items-center justify-center gap-2 hover:bg-rose-50 rounded-2xl transition-colors">
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
  onNavToGames: () => void; onNavToChallenge: () => void; onNavToLeaderboard: () => void;
  onNavToProfile: () => void; onNavToChat: () => void; user: UserProfile;
  selectedTopic: { id: string, label: string } | null; setSelectedTopic: (topic: { id: string, label: string } | null) => void;
  expandedLessonIds: string[]; toggleLesson: (id: string) => void; lessons: Lesson[];
}> = ({
  onCopy, onNavToPractice, onNavToMockTest, onNavToGames, onNavToChallenge,
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
         <div className="space-y-4">
            {topicLessons.length > 0 ? (topicLessons.map(l => <LessonCard key={l.id} lesson={l} onCopy={onCopy} isExpanded={expandedLessonIds.includes(l.id)} onToggle={() => toggleLesson(l.id)}/>)) : (<div className="text-center py-10 text-slate-400 text-sm">Đang cập nhật nội dung.</div>)}
         </div>
      </div>
    );
  }

  return (
    <div className="pb-28 pt-2 px-4 space-y-5 bg-slate-50 min-h-full">
      <div className="flex justify-between items-center pt-2">
        <div className="flex flex-col"><span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Xin chào,</span><span className="text-xl font-black text-slate-800">{user.name} 👋</span></div>
        <div className="flex items-center gap-3">
           <div className="bg-roboki-50 text-roboki-700 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm border border-roboki-100">{user.class} | {user.school ? user.school.slice(0,8) + '...' : 'THPT'}</div>
           <button onClick={onNavToProfile} className="w-10 h-10 rounded-full bg-slate-200 p-0.5 shadow-sm active:scale-95 transition-transform"><div className="w-full h-full rounded-full bg-gradient-to-tr from-roboki-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold">{user.name.charAt(0)}</div></button>
        </div>
      </div>
      <div onClick={onNavToChat} className="group relative overflow-hidden bg-tech-dark rounded-3xl p-4 shadow-lg shadow-slate-300 cursor-pointer active:scale-[0.98] transition-all border border-slate-700">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 20% 50%, #f97316 0%, transparent 20%), radial-gradient(circle at 80% 80%, #22c55e 0%, transparent 20%), linear-gradient(0deg, transparent 49%, #334155 50%, transparent 51%), linear-gradient(90deg, transparent 49%, #334155 50%, transparent 51%)`, backgroundSize: '100% 100%, 100% 100%, 20px 20px, 20px 20px' }}></div>
        <div className="relative z-10 flex justify-between items-center">
          <div><div className="bg-slate-800/80 backdrop-blur-sm w-fit px-2 py-0.5 rounded-md text-[10px] font-bold mb-2 text-slate-300 uppercase tracking-wide border border-slate-600">Trợ lý AI</div><div className="font-black text-2xl mb-1 flex flex-col leading-none"><span className="text-neon-green tracking-tighter drop-shadow-[0_0_5px_rgba(34,197,94,0.6)]">HỎI</span><span className="text-roboki-500 tracking-wide drop-shadow-[0_0_5px_rgba(249,115,22,0.6)]">ROBOKI</span></div><div className="text-slate-400 text-[10px] mb-4 font-medium">Giải đáp Vật lí cực nhanh</div><button className="bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.4)] flex items-center gap-1.5 group-hover:bg-emerald-400 transition-colors border border-emerald-400">Hỏi Ngay <MessageCircle size={14} className="group-hover:translate-x-0.5 transition-transform"/></button></div>
          <div className="w-24 h-24 relative"><Bot size={80} className="text-roboki-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)] animate-float" /><div className="absolute top-0 right-0 w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_#4ade80]"></div></div>
        </div>
      </div>
      <div><h3 className="font-bold text-slate-800 text-base mb-3 flex items-center gap-2"><BookOpen size={18} className="text-roboki-500"/> Chủ đề ôn tập</h3><div className="grid grid-cols-2 gap-3">{TOPICS.map((t) => (<div key={t.id} className={`flex flex-col items-center gap-3 cursor-pointer p-3 rounded-3xl transition-all active:scale-95 duration-200 bg-white border border-slate-100 shadow-sm hover:border-roboki-200 hover:shadow-md group`} onClick={() => setSelectedTopic(t)}><div className={`w-12 h-12 rounded-2xl bg-orange-50 group-hover:bg-roboki-100 flex items-center justify-center shadow-inner transition-colors`}><t.icon size={24} className="text-roboki-500 group-hover:text-roboki-600" strokeWidth={2.5} /></div><span className="text-xs font-bold text-slate-700 text-center leading-tight px-1 group-hover:text-roboki-700 transition-colors">{t.label}</span></div>))}</div></div>
      <div className="pb-4">
        <h3 className="font-bold text-slate-800 text-base mb-3 flex items-center gap-2"><Zap size={18} className="text-roboki-500"/> Hoạt động</h3>
        <div className="grid grid-cols-2 gap-2.5">
             <div onClick={onNavToPractice} className="bg-orange-50 p-3 rounded-3xl border border-orange-100/50 shadow-sm flex flex-col items-center text-center gap-2 cursor-pointer transition-all hover:shadow-md active:scale-95 group"><div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-roboki-600 shadow-sm"><SwatchBook size={20} /></div><div><div className="font-bold text-roboki-900 text-sm group-hover:text-roboki-600 transition-colors">LUYỆN TẬP</div><div className="text-[10px] text-roboki-600/70">Luyện theo bài</div></div></div>
             <div onClick={onNavToMockTest} className="bg-purple-50 p-3 rounded-3xl border border-purple-100/50 shadow-sm flex flex-col items-center text-center gap-2 cursor-pointer transition-all hover:shadow-md active:scale-95 group"><div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-purple-600 shadow-sm"><ClipboardList size={20} /></div><div><div className="font-bold text-purple-900 text-sm group-hover:text-purple-600 transition-colors">ÔN LUYỆN ĐỀ</div><div className="text-[10px] text-purple-600/70">Tự cấu hình đề</div></div></div>
             <div onClick={onNavToGames} className="bg-emerald-50 p-3 rounded-3xl border border-emerald-100/50 shadow-sm flex flex-col items-center text-center gap-2 cursor-pointer transition-all hover:shadow-md active:scale-95 group"><div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-sm"><Gamepad2 size={20} /></div><div><div className="font-bold text-emerald-900 text-sm group-hover:text-emerald-600 transition-colors">Trò chơi</div><div className="text-[10px] text-emerald-600/70">Vừa học vừa chơi</div></div></div>
             <div onClick={onNavToChallenge} className="bg-sky-50 p-3 rounded-3xl border border-sky-100/50 shadow-sm flex flex-col items-center text-center gap-2 cursor-pointer transition-all hover:shadow-md active:scale-95 group"><div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-sky-600 shadow-sm"><Target size={20} /></div><div><div className="font-bold text-sky-900 text-sm group-hover:text-sky-600 transition-colors">Thử thách</div><div className="text-[10px] text-sky-600/70">Nhiệm vụ ngày</div></div></div>
             <div onClick={onNavToLeaderboard} className="bg-indigo-50 p-3 rounded-3xl border border-indigo-100/50 shadow-sm flex flex-col items-center text-center gap-2 cursor-pointer transition-all hover:shadow-md active:scale-95 group"><div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-sm"><Trophy size={20} /></div><div><div className="font-bold text-indigo-900 text-sm group-hover:text-indigo-600 transition-colors">Xếp hạng</div><div className="text-[10px] text-indigo-600/70">Top học sinh</div></div></div>
        </div>
      </div>
    </div>
  );
};

// 2. PRACTICE SCREEN
const PracticeScreen: React.FC<{ onCopy: (txt: string) => void, onScore: (pts: number) => void, sessionData: PracticeSessionData, setSessionData: React.Dispatch<React.SetStateAction<PracticeSessionData>>, questions: Question[], lessons: Lesson[] }> = ({ onCopy, onScore, sessionData, setSessionData, questions, lessons }) => {
  const { configMode, selectedTopic, selectedLessonId, selectedLevel, selectedType, errorMsg, quizQuestions, currentQIndex, selectedOpt, subAnswers, isSubmitted } = sessionData;
  const updateSession = (updates: Partial<PracticeSessionData>) => setSessionData(prev => ({ ...prev, ...updates }));
  const availableLessons = selectedTopic === 'TẤT CẢ' ? [] : lessons.filter(l => l.topic.toUpperCase() === selectedTopic.toUpperCase());
  const startPractice = () => {
    let filtered = questions;
    if (selectedTopic !== 'TẤT CẢ') filtered = filtered.filter(q => q.topic?.trim().toUpperCase() === selectedTopic?.trim().toUpperCase());
    if (selectedLessonId && selectedLessonId !== 'ALL') filtered = filtered.filter(q => q.lessonId === selectedLessonId);
    if (selectedLevel !== 'Ngẫu nhiên') filtered = filtered.filter(q => q.level === selectedLevel);
    if (selectedType !== 'ALL') filtered = filtered.filter(q => q.type === selectedType);
    if (filtered.length === 0) { updateSession({ errorMsg: 'Không tìm thấy câu hỏi phù hợp. Vui lòng chọn tiêu chí khác hoặc nạp thêm dữ liệu.' }); return; }
    updateSession({ quizQuestions: [...filtered].sort(() => Math.random() - 0.5), currentQIndex: 0, isSubmitted: false, selectedOpt: null, subAnswers: {}, configMode: false, errorMsg: '' });
  };
  const submit = () => {
    updateSession({ isSubmitted: true }); const currentQ = quizQuestions[currentQIndex];
    if (currentQ.subQuestions) { let cnt = 0; currentQ.subQuestions.forEach(sq => { if (subAnswers && subAnswers[sq.id] === sq.isCorrect) cnt++; }); if(cnt > 0) onScore(cnt * 2.5); } 
    else { let isC = false; if (currentQ.type === 'Short') isC = selectedOpt?.trim().toLowerCase() === currentQ.answerKey.trim().toLowerCase(); else isC = selectedOpt === currentQ.answerKey; if (isC) onScore(10); }
  };
  const handleSubAnswer = (subId: string, val: boolean) => { if (!isSubmitted) updateSession({ subAnswers: { ...subAnswers, [subId]: val } }); };

  if (configMode) {
    return (
        <div className="pb-24 pt-4 px-5 h-full flex flex-col bg-slate-50">
            <h2 className="text-2xl font-black text-slate-800 mb-4 flex items-center gap-2"><SwatchBook className="text-roboki-600" size={28}/> Luyện tập</h2>
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-6 flex-1 overflow-y-auto">
               <div><h3 className="font-bold text-slate-700 text-sm mb-3">1. Chọn Chủ đề</h3><div className="grid grid-cols-2 gap-2"><button onClick={() => updateSession({ selectedTopic: 'TẤT CẢ', selectedLessonId: 'ALL' })} className={`p-3 rounded-xl text-left text-xs font-bold border transition-all ${selectedTopic === 'TẤT CẢ' ? 'bg-roboki-500 text-white shadow-md' : 'bg-white text-slate-500 border-slate-100'}`}>TẤT CẢ</button>{['VẬT LÍ NHIỆT', 'KHÍ LÍ TƯỞNG', 'TỪ TRƯỜNG', 'HẠT NHÂN & PHÓNG XẠ'].map(t => (<button key={t} onClick={() => updateSession({ selectedTopic: t, selectedLessonId: 'ALL' })} className={`p-3 rounded-xl text-left font-bold border transition-all truncate ${selectedTopic === t ? 'bg-roboki-500 text-white shadow-md' : 'bg-white text-slate-500 border-slate-100'} ${t.length > 15 ? 'col-span-2 text-xs' : 'text-xs'}`}>{t}</button>))}</div></div>
               {selectedTopic !== 'TẤT CẢ' && availableLessons.length > 0 && (<div className="animate-fade-in"><h3 className="font-bold text-slate-700 text-sm mb-3">2. Chọn Bài học</h3><div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar"><button onClick={() => updateSession({ selectedLessonId: 'ALL' })} className={`p-3 rounded-xl text-left text-xs font-bold border transition-all ${selectedLessonId === 'ALL' ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-slate-500 border-slate-100'}`}>Toàn bộ chương {selectedTopic}</button>{availableLessons.map(l => (<button key={l.id} onClick={() => updateSession({ selectedLessonId: l.id })} className={`p-3 rounded-xl text-left text-xs font-bold border transition-all ${selectedLessonId === l.id ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-slate-500 border-slate-100'}`}>{l.title}</button>))}</div></div>)}
               <div><h3 className="font-bold text-slate-700 text-sm mb-3">3. Tùy chọn khác</h3><div className="flex gap-2 mb-3">{['Ngẫu nhiên', 'Biết', 'Hiểu', 'Vận dụng'].map(lvl => (<button key={lvl} onClick={() => updateSession({ selectedLevel: lvl })} className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase border transition-all ${selectedLevel === lvl ? 'bg-emerald-500 text-white' : 'bg-white text-slate-400 border-slate-100'}`}>{lvl}</button>))}</div><div className="flex gap-2">{[{id: 'ALL', l: 'TẤT CẢ'}, {id: 'MCQ', l: 'Trắc nghiệm'}, {id: 'TrueFalse', l: 'Đúng/Sai'}, {id: 'Short', l: 'Điền từ'}].map(type => (<button key={type.id} onClick={() => updateSession({ selectedType: type.id })} className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase border transition-all ${selectedType === type.id ? 'bg-indigo-500 text-white' : 'bg-white text-slate-400 border-slate-100'}`}>{type.l}</button>))}</div></div>
               {errorMsg && <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold rounded-xl flex items-center gap-2"><XCircle size={16}/> {errorMsg}</div>}
            </div>
            <button onClick={startPractice} className="w-full bg-slate-800 text-white py-4 rounded-3xl font-bold mt-4 shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2">Bắt đầu luyện tập <ArrowRight size={18}/></button>
        </div>
    );
  }
  const currentQ = quizQuestions[currentQIndex];
  return (
    <div className="pb-24 pt-4 px-4 h-full flex flex-col bg-slate-50">
      <div className="flex justify-between items-center mb-4"><button onClick={() => updateSession({ configMode: true })} className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border border-slate-100"><ChevronLeft size={20} className="text-slate-600"/></button><div className="flex flex-col items-center"><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Câu hỏi</span><span className="font-black text-slate-800 text-lg">{currentQIndex + 1}<span className="text-slate-300 text-sm">/{quizQuestions.length}</span></span></div><button onClick={() => onCopy(generateRobokiPrompt(currentQ.topic, `Câu ${currentQ.id}`, currentQ.level, currentQ.promptText, currentQ.options))} className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border border-slate-100 text-roboki-500"><Copy size={20}/></button></div>
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex-1 overflow-y-auto relative">
         <div className="absolute top-0 right-0 bg-slate-100 text-slate-500 text-[9px] font-black px-3 py-1.5 rounded-bl-2xl rounded-tr-2xl uppercase tracking-wider">{currentQ.level}</div>
         <div className="mb-2 text-[10px] font-black uppercase text-roboki-500 tracking-widest">{currentQ.topic}</div>
         <div className="mb-6">{currentQ.imageUrl && (<div className="mb-4 flex justify-center bg-white rounded-xl border border-slate-100 p-2"><img src={currentQ.imageUrl} className="rounded-lg max-h-64 object-contain w-full" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} /></div>)}<div className="font-bold text-slate-800 text-base leading-relaxed"><MathRender content={currentQ.promptText}/></div></div>
         <div className="space-y-4">
            {currentQ.subQuestions ? (
                <div className="space-y-4">{currentQ.subQuestions.map(sq => { const userChoice = subAnswers ? subAnswers[sq.id] : undefined; return (<div key={sq.id} className={`p-4 rounded-2xl border-2 transition-all ${isSubmitted && userChoice === sq.isCorrect ? 'bg-emerald-50 border-emerald-500' : isSubmitted && userChoice !== undefined && userChoice !== sq.isCorrect ? 'bg-rose-50 border-rose-500' : 'bg-slate-50 border-slate-100'}`}><div className="text-sm font-bold text-slate-700 mb-3"><MathRender content={sq.content}/></div><div className="flex gap-2"><button disabled={isSubmitted} onClick={() => handleSubAnswer(sq.id, true)} className={`flex-1 py-2 rounded-xl text-xs font-black uppercase transition-all ${userChoice === true ? 'bg-blue-500 text-white' : 'bg-white text-slate-400 border'}`}>Đúng</button><button disabled={isSubmitted} onClick={() => handleSubAnswer(sq.id, false)} className={`flex-1 py-2 rounded-xl text-xs font-black uppercase transition-all ${userChoice === false ? 'bg-slate-700 text-white' : 'bg-white text-slate-400 border'}`}>Sai</button></div>{isSubmitted && (<div className={`mt-2 text-[10px] font-bold ${isSubmitted && userChoice === sq.isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>{isSubmitted && userChoice === sq.isCorrect ? '✓ Chính xác' : `✕ Sai rồi`}{sq.explanation && <div className="mt-1 font-normal text-slate-500">{sq.explanation}</div>}</div>)}</div>) })}</div>
            ) : (currentQ.type === 'Short' ? (<input disabled={isSubmitted} type="text" placeholder="Nhập câu trả lời..." className="w-full p-4 rounded-2xl border-2 border-slate-100 font-bold focus:border-roboki-500 outline-none" onChange={(e) => updateSession({ selectedOpt: e.target.value })}/>) : (currentQ.options?.map((opt, i) => (<button key={i} disabled={isSubmitted} onClick={() => updateSession({ selectedOpt: opt })} className={`w-full p-4 rounded-2xl border-2 text-left text-sm font-bold transition-all ${isSubmitted && opt === currentQ.answerKey ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : isSubmitted && selectedOpt === opt ? 'bg-rose-50 border-rose-500 text-rose-700' : selectedOpt === opt ? 'bg-roboki-50 border-roboki-500' : 'bg-white border-slate-50'}`}><MathRender content={opt}/></button>))))}
         </div>
         {isSubmitted ? (<div className="mt-8 animate-fade-in">{!currentQ.subQuestions && (<div className="bg-slate-50 p-5 rounded-2xl text-sm border border-slate-100"><div className="flex items-center gap-2 mb-2 text-roboki-600 font-black text-xs uppercase"><BookOpen size={14}/> Giải thích</div><MathRender content={currentQ.explanationText} className="text-slate-600"/></div>)}<button onClick={() => updateSession({ currentQIndex: (currentQIndex + 1) % quizQuestions.length, isSubmitted: false, selectedOpt: null, subAnswers: {} })} className="w-full bg-roboki-600 text-white py-4 rounded-2xl font-bold mt-4 shadow-lg">Câu tiếp theo</button></div>) : (<button disabled={currentQ.subQuestions ? (!subAnswers || Object.keys(subAnswers).length === 0) : !selectedOpt} onClick={submit} className="w-full bg-slate-800 text-white py-4 rounded-2xl font-bold mt-8 shadow-xl disabled:opacity-50">Kiểm tra kết quả</button>)}
      </div>
    </div>
  );
};

// 3. MOCK TEST SCREEN
const MockTestScreen: React.FC<{ onBack: () => void; session: MockTestSessionData; setSession: React.Dispatch<React.SetStateAction<MockTestSessionData>>; questions: Question[]; onScore: (pts: number) => void; onCopy: (txt: string) => void }> = ({ onBack, session, setSession, questions, onScore, onCopy }) => {
  const { mode, selectedTopic, countMCQ, countTF, countShort, quizQuestions, currentQIndex, userAnswers, score, errorMsg } = session;
  const updateSession = (updates: Partial<MockTestSessionData>) => setSession(prev => ({ ...prev, ...updates }));

  const generateExam = () => {
    let source = selectedTopic === 'TẤT CẢ' ? questions : questions.filter(q => q.topic.toUpperCase() === selectedTopic.toUpperCase());
    const pickQs = (type: string, count: number) => {
        const typeQs = source.filter(q => q.type === type);
        const tB = Math.ceil(count * 0.4), tH = Math.floor(count * 0.3), tV = count - tB - tH;
        let picked = [...typeQs.filter(q => q.level === 'Biết').sort(()=>Math.random()-.5).slice(0,tB), ...typeQs.filter(q => q.level === 'Hiểu').sort(()=>Math.random()-.5).slice(0,tH), ...typeQs.filter(q => q.level === 'Vận dụng').sort(()=>Math.random()-.5).slice(0,tV)];
        if (picked.length < count) picked = [...picked, ...typeQs.filter(q => !picked.includes(q)).sort(()=>Math.random()-.5).slice(0, count - picked.length)];
        return picked;
    };
    const finalExam = [...pickQs('MCQ', countMCQ), ...pickQs('TrueFalse', countTF), ...pickQs('Short', countShort)];
    if (finalExam.length === 0) { updateSession({ errorMsg: 'Không đủ câu hỏi.' }); return; }
    updateSession({ quizQuestions: finalExam, mode: 'DOING', currentQIndex: 0, userAnswers: {}, errorMsg: '' });
  };

  const handleSelectAnswer = (val: any, subId?: string) => {
      const qId = quizQuestions[currentQIndex].id;
      if (subId) updateSession({ userAnswers: { ...userAnswers, [qId]: { ...userAnswers[qId], [subId]: val } } });
      else updateSession({ userAnswers: { ...userAnswers, [qId]: val } });
  };

  const finishExam = () => {
      let total = 0;
      quizQuestions.forEach(q => {
          const ans = userAnswers[q.id]; if(!ans) return;
          if (q.subQuestions) { let cnt = 0; q.subQuestions.forEach(sq => { if (ans[sq.id] === sq.isCorrect) cnt++; }); total += cnt * 0.25; }
          else if (q.type === 'Short') { if (ans.toString().trim().toLowerCase() === q.answerKey.trim().toLowerCase()) total++; }
          else { if (ans === q.answerKey) total++; }
      });
      const pts = Math.round(total * 10); onScore(pts); updateSession({ mode: 'RESULT', score: pts });
  };

  const copyQ = (q: Question) => {
      let c = q.promptText; if(q.subQuestions) q.subQuestions.forEach((sq,i)=> c+=`\n${i+1}) ${sq.content}`);
      onCopy(generateRobokiPrompt(q.topic, `Câu ${q.id}`, q.level, c, q.options));
  }

  if (mode === 'CONFIG') return (<div className="pb-24 pt-4 px-5 h-full flex flex-col bg-slate-50"><div className="flex items-center gap-3 mb-6"><button onClick={onBack} className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border border-slate-100"><ChevronLeft size={20}/></button><h2 className="text-xl font-black text-slate-800">Cấu hình đề thi</h2></div><div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6 flex-1 overflow-y-auto"><div><h3 className="font-bold text-slate-700 text-sm mb-3">1. Chủ đề</h3><div className="grid grid-cols-2 gap-2"><button onClick={() => updateSession({ selectedTopic: 'TẤT CẢ' })} className={`p-3 rounded-xl text-left text-xs font-bold border ${selectedTopic === 'TẤT CẢ' ? 'bg-purple-600 text-white' : 'bg-white'}`}>TẤT CẢ</button>{['VẬT LÍ NHIỆT', 'KHÍ LÍ TƯỞNG', 'TỪ TRƯỜNG', 'HẠT NHÂN & PHÓNG XẠ'].map(t => (<button key={t} onClick={() => updateSession({ selectedTopic: t })} className={`p-3 rounded-xl text-left text-xs font-bold border truncate ${selectedTopic === t ? 'bg-purple-600 text-white' : 'bg-white'}`}>{t}</button>))}</div></div><div><h3 className="font-bold text-slate-700 text-sm mb-3">2. Số lượng</h3><div className="space-y-3"><div className="flex justify-between p-3 bg-slate-50 rounded-xl"><span>Trắc nghiệm</span><input type="number" className="w-16 text-center rounded-lg" value={countMCQ} onChange={e=>updateSession({countMCQ: +e.target.value})}/></div><div className="flex justify-between p-3 bg-slate-50 rounded-xl"><span>Đúng/Sai</span><input type="number" className="w-16 text-center rounded-lg" value={countTF} onChange={e=>updateSession({countTF: +e.target.value})}/></div><div className="flex justify-between p-3 bg-slate-50 rounded-xl"><span>Điền từ</span><input type="number" className="w-16 text-center rounded-lg" value={countShort} onChange={e=>updateSession({countShort: +e.target.value})}/></div></div></div>{errorMsg && <div className="text-rose-600 font-bold p-3 bg-rose-50 rounded-xl">{errorMsg}</div>}</div><button onClick={generateExam} className="w-full bg-purple-600 text-white py-4 rounded-3xl font-bold mt-4 shadow-xl">Bắt đầu làm bài</button></div>);
  if (mode === 'RESULT') return (<div className="pb-24 pt-4 px-5 h-full flex flex-col bg-slate-50"><div className="bg-white rounded-3xl p-6 text-center mb-4 shadow-sm border border-slate-100"><Trophy size={32} className="mx-auto text-yellow-400 mb-2"/><div className="text-5xl font-black text-purple-600">{score}</div></div><div className="flex-1 overflow-y-auto space-y-4">{quizQuestions.map((q,i)=>(<div key={q.id} className="bg-white p-4 rounded-2xl border relative"><button onClick={()=>copyQ(q)} className="absolute top-3 right-3 text-slate-400"><Copy size={16}/></button><div className="flex gap-2 mb-2"><span className="bg-slate-100 text-[10px] px-2 py-1 rounded font-bold">Câu {i+1}</span><span className="border text-[10px] px-2 py-1 rounded font-bold">{q.level}</span></div><div className="mb-2 font-bold text-sm"><MathRender content={q.promptText}/></div><div className="bg-slate-50 p-3 rounded-xl text-xs">{q.subQuestions ? q.subQuestions.map(sq=>{ const c = userAnswers[q.id]?.[sq.id]; return <div key={sq.id} className="flex justify-between border-b last:border-0 py-1"><span><MathRender content={sq.content}/></span><span className={c===sq.isCorrect?'text-green-600':'text-red-600'}>{c===sq.isCorrect?'Đúng':'Sai'}</span></div> }) : (<div className="flex justify-between"><span>Chọn: {userAnswers[q.id]}</span><span className="text-green-600">Đúng: {q.answerKey}</span></div>)}</div><div className="mt-2 text-xs text-slate-500 bg-white p-2 rounded border"><MathRender content={q.explanationText}/></div></div>))}</div><div className="flex gap-3 mt-4"><button onClick={onBack} className="flex-1 bg-white border py-3 rounded-xl font-bold">Thoát</button><button onClick={()=>updateSession({mode:'CONFIG'})} className="flex-1 bg-purple-600 text-white py-3 rounded-xl font-bold">Làm lại</button></div></div>);
  
  const q = quizQuestions[currentQIndex];
  return (<div className="pb-24 pt-4 px-4 h-full flex flex-col bg-slate-50"><div className="flex justify-between mb-4"><button onClick={()=>updateSession({mode:'CONFIG'})}><X/></button><span>Câu {currentQIndex+1}/{quizQuestions.length}</span><div/></div><div className="bg-white p-6 rounded-3xl flex-1 overflow-y-auto"><div className="mb-6">{q.imageUrl && <img src={q.imageUrl} className="mb-2 rounded-lg max-h-48 mx-auto"/>}<div className="font-bold"><MathRender content={q.promptText}/></div></div><div className="space-y-3">{q.subQuestions ? q.subQuestions.map(sq => (<div key={sq.id} className="p-3 bg-slate-50 rounded-xl"><div className="text-sm font-bold mb-2"><MathRender content={sq.content}/></div><div className="flex gap-2"><button onClick={()=>handleSelectAnswer(true, sq.id)} className={`flex-1 py-2 rounded-lg text-xs font-bold ${userAnswers[q.id]?.[sq.id]===true?'bg-blue-500 text-white':'bg-white border'}`}>Đúng</button><button onClick={()=>handleSelectAnswer(false, sq.id)} className={`flex-1 py-2 rounded-lg text-xs font-bold ${userAnswers[q.id]?.[sq.id]===false?'bg-slate-700 text-white':'bg-white border'}`}>Sai</button></div></div>)) : q.type==='Short' ? (<input className="w-full p-4 border rounded-2xl font-bold" placeholder="Nhập đáp án" value={userAnswers[q.id]||''} onChange={e=>handleSelectAnswer(e.target.value)}/>) : q.options?.map((o,i)=>(<button key={i} onClick={()=>handleSelectAnswer(o)} className={`w-full p-4 border rounded-2xl text-left font-bold ${userAnswers[q.id]===o?'bg-purple-100 border-purple-500':'bg-white'}`}><MathRender content={o}/></button>))}</div></div><div className="flex gap-3 mt-4"><button disabled={currentQIndex===0} onClick={()=>updateSession({currentQIndex:currentQIndex-1})} className="flex-1 bg-white border py-3 rounded-xl font-bold">Lùi</button>{currentQIndex<quizQuestions.length-1 ? <button onClick={()=>updateSession({currentQIndex:currentQIndex+1})} className="flex-[2] bg-purple-600 text-white py-3 rounded-xl font-bold">Tiếp</button> : <button onClick={finishExam} className="flex-[2] bg-emerald-500 text-white py-3 rounded-xl font-bold">Nộp bài</button>}</div></div>);
};

// 4. GAME SCREEN
const GameScreen: React.FC<{ onCopy: (txt: string) => void, onScore: (pts: number) => void, sessionData: GameSessionData, setSessionData: React.Dispatch<React.SetStateAction<GameSessionData>>, questions: Question[] }> = ({ onCopy, onScore, sessionData, setSessionData, questions }) => {
  const { gameType, mode, score, timeLeft, currentQ, isCorrect, wheelRotation, isSpinning, pendingPoints, showWheelQuestion, selectedSpeedOpt, totalAnswered } = sessionData;
  useEffect(() => { let t: any; if (gameType === 'SPEED' && mode === 'PLAYING' && timeLeft > 0) t = setInterval(() => setSessionData(p => ({ ...p, timeLeft: p.timeLeft - 1 })), 1000); else if (timeLeft === 0 && mode === 'PLAYING') { setSessionData(p => ({ ...p, mode: 'RESULT' })); if(score>0) onScore(score); } return () => clearInterval(t); }, [gameType, mode, timeLeft]);
  const spinWheel = () => { if(isSpinning) return; const r = wheelRotation + 1800 + Math.random()*1800; setSessionData(p=>({...p, isSpinning:true, wheelRotation:r})); setTimeout(()=>{ setSessionData(p=>({...p, isSpinning:false, pendingPoints: 100, showWheelQuestion:true, currentQ: questions[Math.floor(Math.random()*questions.length)]})); }, 3000); };
  const checkAns = (ans: string) => { if(!currentQ) return; const ok = ans === currentQ.answerKey; if(ok) { const pts = gameType==='WHEEL'?pendingPoints:10; setSessionData(p=>({...p, score:p.score+pts, isCorrect:true})); if(gameType==='WHEEL') onScore(pts); } else setSessionData(p=>({...p, isCorrect:false})); setTimeout(()=>{ if(gameType==='SPEED') { setSessionData(p=>({...p, currentQ: questions[Math.floor(Math.random()*questions.length)], isCorrect:null, selectedSpeedOpt:null, totalAnswered: p.totalAnswered+1})); if(ok) onScore(10); } else setSessionData(p=>({...p, showWheelQuestion:false, isCorrect:null, mode: ok ? 'MENU' : 'RESULT'})); }, 1000); };

  if (mode === 'MENU') return (<div className="p-6 pt-10 space-y-4"><h2 className="text-2xl font-black text-center">Trò chơi</h2><button onClick={()=>setSessionData({...INITIAL_GAME_STATE, gameType:'SPEED', mode:'PLAYING', currentQ:questions[0]})} className="w-full p-6 bg-indigo-500 text-white rounded-3xl font-bold shadow-lg">Thử thách Tốc độ</button><button onClick={()=>setSessionData({...INITIAL_GAME_STATE, gameType:'WHEEL', mode:'PLAYING'})} className="w-full p-6 bg-rose-500 text-white rounded-3xl font-bold shadow-lg">Vòng quay May mắn</button></div>);
  if (mode === 'RESULT') return (<div className="p-6 pt-10 text-center"><h2 className="text-4xl font-black mb-4">Kết thúc!</h2><div className="text-6xl font-black text-purple-600 mb-8">{score}</div><button onClick={()=>setSessionData(p=>({...p, mode:'MENU'}))} className="bg-slate-200 px-8 py-3 rounded-xl font-bold">Quay lại</button></div>);
  
  if (gameType === 'WHEEL' && !showWheelQuestion) return (<div className="h-full flex flex-col items-center justify-center"><div style={{transform: `rotate(${wheelRotation}deg)`, transition: isSpinning?'3s ease-out':'0s'}} className="w-64 h-64 rounded-full border-4 border-purple-500 bg-white mb-8"></div><button onClick={spinWheel} disabled={isSpinning} className="bg-purple-600 text-white px-8 py-3 rounded-full font-bold shadow-lg">QUAY NGAY</button></div>);

  return (<div className="h-full flex flex-col p-4 pt-10">{gameType==='SPEED' && <div className="flex justify-between text-xl font-black mb-4"><span>{timeLeft}s</span><span>{score}</span></div>}{currentQ && (<div className="flex-1 bg-white rounded-3xl p-6 shadow-lg border relative"><div className="mb-4 font-bold text-lg"><MathRender content={currentQ.promptText}/></div><div className="grid grid-cols-2 gap-3">{currentQ.options?.map((o,i)=>(<button key={i} onClick={()=>checkAns(o)} className={`p-4 border rounded-xl font-bold ${isCorrect===true && o===currentQ.answerKey ? 'bg-green-500 text-white' : isCorrect===false ? 'bg-red-50 text-red-500' : 'bg-white'}`}><MathRender content={o}/></button>))}</div></div>)}</div>);
};

// 5. LEADERBOARD SCREEN (CẬP NHẬT: THÊM LỌC THEO TRƯỜNG/LỚP)
const LeaderboardScreen: React.FC<{ onBack: () => void; currentUser: UserProfile }> = ({ onBack, currentUser }) => {
  const [filter, setFilter] = useState<'CLASS' | 'SCHOOL'>('CLASS'); // 👈 State lọc
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState<UserProfile[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        // 👈 Logic truy vấn thay đổi theo filter
        let q;
        if (filter === 'CLASS') {
            q = query(collection(db, 'users'), where('class', '==', currentUser.class), orderBy('totalScore', 'desc'), limit(50));
        } else {
            q = query(collection(db, 'users'), where('school', '==', currentUser.school), orderBy('totalScore', 'desc'), limit(50));
        }
        
        const snap = await getDocs(q);
        const list: UserProfile[] = [];
        snap.forEach((d) => list.push(d.data() as UserProfile));
        setPlayers(list);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    fetchLeaderboard();
  }, [filter, currentUser]); // Chạy lại khi filter đổi

  return (
    <div className="pb-24 pt-4 px-4 h-full flex flex-col bg-slate-50">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border border-slate-100"><ChevronLeft size={20}/></button>
        <div><h2 className="text-xl font-black text-slate-800">Bảng xếp hạng</h2></div>
      </div>
      
      {/* 👈 TAB CHUYỂN ĐỔI LỚP / TRƯỜNG */}
      <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100 mb-4">
          <button onClick={() => setFilter('CLASS')} className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${filter === 'CLASS' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400'}`}>Lớp {currentUser.class}</button>
          <button onClick={() => setFilter('SCHOOL')} className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${filter === 'SCHOOL' ? 'bg-purple-500 text-white shadow-md' : 'text-slate-400'}`}>Trường</button>
      </div>

      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex-1 overflow-y-auto">
        {loading ? <div className="text-center py-4 text-slate-400"><Loader2 className="animate-spin inline mr-2"/> Đang tải...</div> : (
          <div className="space-y-3">{players.map((u, i) => (<div key={u.uid} className="flex items-center justify-between p-4 rounded-2xl border"><div className="flex items-center gap-4"><div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-black">{i+1}</div><div><div className="font-bold text-sm">{u.name}</div><div className="text-[10px] text-slate-400">{u.class} - {u.school}</div></div></div><div className="font-black">{u.totalScore}</div></div>))}</div>
        )}
      </div>
    </div>
  );
};

// 6. CHALLENGE SCREEN (Đã phục hồi)
const ChallengeScreen: React.FC<{ onBack: () => void, session: ChallengeSessionData, setSession: React.Dispatch<React.SetStateAction<ChallengeSessionData>>, onScore: (pts: number) => void, questions: Question[] }> = ({ onBack, session, setSession, onScore, questions }) => {
    const [textInput, setTextInput] = useState('');
    useEffect(() => { if (!session.todayQ && questions.length > 0) setSession(prev => ({ ...prev, todayQ: questions[Math.floor(Math.random() * questions.length)] })); }, [questions]);
    const handleSubmit = (answer: string) => { const isCorrect = answer.trim().toLowerCase() === session.todayQ?.answerKey.trim().toLowerCase(); setSession(prev => ({ ...prev, selectedOpt: answer, isSubmitted: true, isCorrect })); if (isCorrect) onScore(20); };
    return (<div className="pb-24 pt-4 px-4 h-full flex flex-col bg-slate-50"><div className="flex gap-3 mb-6"><button onClick={onBack}><ChevronLeft/></button><h2 className="text-xl font-black">Thử thách</h2></div>{session.todayQ ? (<div className="bg-white p-6 rounded-3xl shadow-sm flex-1"><div className="font-bold mb-4"><MathRender content={session.todayQ.promptText}/></div>{session.todayQ.type==='Short'?<div className="space-y-2"><input disabled={session.isSubmitted} value={textInput} onChange={e=>setTextInput(e.target.value)} className="w-full p-4 border rounded-xl"/><button disabled={!textInput||session.isSubmitted} onClick={()=>handleSubmit(textInput)} className="w-full bg-blue-500 text-white p-3 rounded-xl font-bold">Trả lời</button></div>:session.todayQ.options?.map((o,i)=><button key={i} disabled={session.isSubmitted} onClick={()=>handleSubmit(o)} className="w-full p-4 border rounded-xl mb-2 text-left font-bold block"><MathRender content={o}/></button>)}{session.isSubmitted && <div className={`mt-4 font-bold text-center ${session.isCorrect?'text-green-600':'text-red-600'}`}>{session.isCorrect?'Chính xác +20 điểm':'Sai rồi'}</div>}</div>):<div>Đang tải...</div>}</div>);
};

// 7. CHAT SCREEN (Đã phục hồi)
const ChatScreen: React.FC<{ onBack: () => void, initialPrompt: string }> = ({ onBack, initialPrompt }) => {
    return (<div className="h-full flex flex-col bg-slate-50"><div className="bg-white px-4 py-3 flex justify-between shadow-sm"><button onClick={onBack}><ChevronLeft/></button><span className="font-bold">Roboki AI</span></div><iframe src="https://roboki.vn/" className="flex-1 border-none" title="Roboki"/></div>);
};

// --- MAIN APP COMPONENT ---
const App: React.FC = () => {
  const [isClient, setIsClient] = useState(false); useEffect(() => setIsClient(true), []);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [screen, setScreen] = useState<'AUTH' | 'HOME' | 'PRACTICE' | 'MOCK_TEST' | 'GAME' | 'CHALLENGE' | 'LEADERBOARD' | 'CHAT' | 'PROFILE'>('AUTH');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [copyText, setCopyText] = useState('');
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [practiceSession, setPracticeSession] = useState<PracticeSessionData>(INITIAL_PRACTICE_STATE);
  const [mockTestSession, setMockTestSession] = useState<MockTestSessionData>(INITIAL_MOCK_TEST_STATE);
  const [gameSession, setGameSession] = useState<GameSessionData>(INITIAL_GAME_STATE);
  const [challengeSession, setChallengeSession] = useState<ChallengeSessionData>(INITIAL_CHALLENGE_STATE);
  const [selectedTopic, setSelectedTopic] = useState<{id: string, label: string} | null>(null);
  const [expandedLessonIds, setExpandedLessonIds] = useState<string[]>([]);

  useEffect(() => { const u = onAuthStateChanged(auth, ()=>{}); return () => u(); }, []);
  useEffect(() => { const f = async () => { try { setLoadingData(true); 
    const lS = await getDocs(collection(db, 'lessons')); const lL: Lesson[] = []; lS.forEach(d => lL.push(d.data() as Lesson)); setLessons(lL);
    const qS = await getDocs(collection(db, 'questions')); const lQ: Question[] = []; qS.forEach(d => lQ.push(d.data() as Question)); setQuestions(lQ);
  } catch (e) { setToastMsg("Lỗi tải data"); } finally { setLoadingData(false); } }; f(); }, []);

  const handleNap = async () => { if(!confirm("Nạp data?")) return; setToastMsg("Đang nạp..."); try { for(const l of PHYSICS_LESSONS) await setDoc(doc(db,'lessons',l.id),l); for(const q of QUESTION_BANK) await setDoc(doc(db,'questions',q.id),q); setToastMsg("Xong!"); setTimeout(()=>window.location.reload(),1000); } catch(e:any){ setToastMsg(e.message); } };
  const handleScore = async (pts: number) => { if(!user) return; const u = { ...user, totalScore: user.totalScore + pts }; setUser(u); setToastMsg(`+${pts} điểm`); await updateDoc(doc(db,'users',user.uid), { totalScore: increment(pts) }); };
  const handleCopy = (txt: string) => { navigator.clipboard.writeText(txt); setCopyText(txt); setScreen('CHAT'); };
  const handleToggleLesson = (id: string) => { setExpandedLessonIds(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]); };

  if (!isClient) return null;
  if (!user) return <><AuthScreen onLoginSuccess={(u)=>{setUser(u); setScreen('HOME')}} />{toastMsg && <Toast message={toastMsg} onClose={()=>setToastMsg(null)}/>}</>;
  if (loadingData) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin"/></div>;

  return (
    <div className="max-w-md mx-auto h-[100dvh] bg-white shadow-2xl overflow-hidden relative font-sans text-slate-800 flex flex-col">
        <button onClick={handleNap} className="fixed bottom-24 right-4 z-50 bg-indigo-600 text-white p-3 rounded-full text-xs font-bold shadow-xl">Nạp Data</button>
        <div className="flex-1 overflow-y-auto overflow-x-hidden w-full relative pb-24">
            {screen === 'HOME' && <ContentScreen user={user} onCopy={handleCopy} onNavToPractice={()=>setScreen('PRACTICE')} onNavToMockTest={()=>setScreen('MOCK_TEST')} onNavToGames={()=>setScreen('GAME')} onNavToChallenge={()=>setScreen('CHALLENGE')} onNavToLeaderboard={()=>setScreen('LEADERBOARD')} onNavToProfile={()=>setScreen('PROFILE')} onNavToChat={()=>{setCopyText('');setScreen('CHAT')}} selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} expandedLessonIds={expandedLessonIds} toggleLesson={handleToggleLesson} lessons={lessons}/>}
            {screen === 'PRACTICE' && <PracticeScreen onCopy={handleCopy} onScore={handleScore} sessionData={practiceSession} setSessionData={setPracticeSession} questions={questions} lessons={lessons}/>}
            {screen === 'MOCK_TEST' && <MockTestScreen onBack={()=>setScreen('HOME')} session={mockTestSession} setSession={setMockTestSession} questions={questions} onScore={handleScore} onCopy={handleCopy}/>}
            {screen === 'GAME' && <GameScreen onCopy={handleCopy} onScore={handleScore} sessionData={gameSession} setSessionData={setGameSession} questions={questions}/>}
            {screen === 'CHALLENGE' && <ChallengeScreen onBack={()=>setScreen('HOME')} session={challengeSession} setSession={setChallengeSession} onScore={handleScore} questions={questions}/>}
            {screen === 'LEADERBOARD' && <LeaderboardScreen onBack={()=>setScreen('HOME')} currentUser={user}/>}
            {screen === 'CHAT' && <ChatScreen onBack={()=>{setScreen('HOME');setCopyText('')}} initialPrompt={copyText}/>}
            {screen === 'PROFILE' && <ProfileScreen user={user} onBack={()=>setScreen('HOME')} onUpdate={setUser}/>}
        </div>
        {screen !== 'CHAT' && (
            <div className="absolute bottom-0 w-full bg-white border-t p-3 pb-6 flex justify-around items-end z-50">
                <button onClick={()=>setScreen('HOME')} className={`flex flex-col items-center ${screen==='HOME'?'text-roboki-600':'text-slate-400'}`}><Home size={24}/><span className="text-[10px] font-bold">Trang chủ</span></button>
                <button onClick={()=>setScreen('PRACTICE')} className={`flex flex-col items-center ${screen==='PRACTICE'?'text-roboki-600':'text-slate-400'}`}><SwatchBook size={24}/><span className="text-[10px] font-bold">Luyện tập</span></button>
                <button onClick={()=>setScreen('CHAT')} className="-top-6 relative"><div className="w-16 h-16 bg-gradient-to-tr from-roboki-500 to-orange-500 rounded-full flex items-center justify-center text-white shadow-xl"><Bot size={32}/></div></button>
                <button onClick={()=>setScreen('GAME')} className={`flex flex-col items-center ${screen==='GAME'?'text-roboki-600':'text-slate-400'}`}><Gamepad2 size={24}/><span className="text-[10px] font-bold">Giải trí</span></button>
                <button onClick={()=>setScreen('LEADERBOARD')} className={`flex flex-col items-center ${screen==='LEADERBOARD'?'text-roboki-600':'text-slate-400'}`}><Trophy size={24}/><span className="text-[10px] font-bold">Xếp hạng</span></button>
            </div>
        )}
        {toastMsg && <Toast message={toastMsg} onClose={()=>setToastMsg(null)}/>}
    </div>
  );
};

export default App;