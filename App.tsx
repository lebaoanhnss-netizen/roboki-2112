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
  limit,
  writeBatch // 👈 Bổ sung writeBatch để nạp dữ liệu nhanh hơn
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
  Lightbulb 
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
             {/* PHẦN LÝ THUYẾT */}
             <div className="bg-roboki-50/50 p-4 rounded-xl border border-roboki-100">
                <h5 className="text-xs font-bold text-roboki-600 uppercase mb-2 flex items-center gap-1.5"><Sparkles size={14}/> Lý thuyết</h5>
                <MathRender content={lesson.theory} className="text-sm text-slate-700 leading-relaxed whitespace-pre-line text-justify"/>
                
                {/* HIỂN THỊ ẢNH LÝ THUYẾT */}
                {lesson.theoryImages && lesson.theoryImages.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {lesson.theoryImages.map((imgUrl, index) => (
                      <img 
                        key={index} 
                        src={imgUrl} 
                        alt={`Minh họa lý thuyết ${index + 1}`}
                        className="rounded-xl border border-roboki-100 w-full object-contain max-h-80 bg-white shadow-sm"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    ))}
                  </div>
                )}
             </div>

             {/* PHẦN CÔNG THỨC */}
             <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h5 className="text-xs font-bold text-slate-600 uppercase mb-2 flex items-center gap-1.5"><Zap size={14}/> Công thức</h5>
                <MathRender content={lesson.formulas} className="text-sm text-slate-800 font-bold font-mono whitespace-pre-line"/>
             </div>

             {/* PHẦN VÍ DỤ MINH HỌA */}
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
            totalScore: 0, practiceScore: 0, gameScore: 0, challengeScore: 0, rank: 999 
        };
        await setDoc(doc(db, 'users', cred.user.uid), newUser);
        onLoginSuccess(newUser);
      } else {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const docSnap = await getDoc(doc(db, 'users', cred.user.uid));
        if (docSnap.exists()) onLoginSuccess(docSnap.data() as UserProfile);
        else {
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
           
           {/* 👇 LOGO INNEDU HIỂN THỊ LỚN HƠN (h-32) 👇 */}
           <div className="flex justify-center mb-6">
                <img 
                  src="/logo-robok.png" 
                  alt="Logo Innedu" 
                  className="h-32 w-auto object-contain" 
                />
           </div>
           {/* 👆 KẾT THÚC PHẦN LOGO 👆 */}

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

// --- PROFILE SCREEN ---
const ProfileScreen: React.FC<{ 
    user: UserProfile; 
    onBack: () => void; 
    onUpdate: (updatedUser: UserProfile) => void 
}> = ({ user, onBack, onUpdate }) => {
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
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Lỗi đăng xuất", error);
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
            {topicLessons.length > 0 ? (
              topicLessons.map(lesson => (
                <LessonCard key={lesson.id} lesson={lesson} onCopy={onCopy} isExpanded={expandedLessonIds.includes(lesson.id)} onToggle={() => toggleLesson(lesson.id)}/>
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
           <div className="bg-roboki-50 text-roboki-700 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm border border-roboki-100 max-w-[200px] truncate">
  {user.class} - {user.school || 'THPT'}</div>
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
             
             {/* 👇 NÚT ÔN LUYỆN ĐỀ (MỚI) */}
             <div onClick={onNavToMockTest} className="bg-purple-50 p-3 rounded-3xl border border-purple-100/50 shadow-sm flex flex-col items-center text-center gap-2 cursor-pointer transition-all hover:shadow-md active:scale-95 group">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-purple-600 shadow-sm"><ClipboardList size={20} /></div>
                <div><div className="font-bold text-purple-900 text-sm group-hover:text-purple-600 transition-colors">ÔN LUYỆN ĐỀ</div><div className="text-[10px] text-purple-600/70">Tự cấu hình đề</div></div>
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
  questions: Question[],
  lessons: Lesson[]
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
        if(correctCount > 0) onScore(correctCount * 2.5);
    } else {
        let isCorrect = false;
        if (currentQ.type === 'Short') { isCorrect = selectedOpt?.trim().toLowerCase() === currentQ.answerKey.trim().toLowerCase(); }
        else { isCorrect = selectedOpt === currentQ.answerKey; }
        if (isCorrect) onScore(10);
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

// 👇 MỚI: MOCK TEST SCREEN (ÔN LUYỆN ĐỀ) - ĐÃ CÓ NÚT COPY & XEM LẠI CHI TIẾT
const MockTestScreen: React.FC<{
  onBack: () => void,
  session: MockTestSessionData,
  setSession: React.Dispatch<React.SetStateAction<MockTestSessionData>>,
  questions: Question[],
  onScore: (pts: number) => void,
  onCopy: (txt: string) => void 
}> = ({ onBack, session, setSession, questions, onScore, onCopy }) => {
  // 👇 Lưu ý destructuring selectedTopics (số nhiều)
  const { mode, selectedTopics, countMCQ, countTF, countShort, quizQuestions, currentQIndex, userAnswers, score, errorMsg } = session;

  const updateSession = (updates: Partial<MockTestSessionData>) => setSession(prev => ({ ...prev, ...updates }));

  // --- HÀM XỬ LÝ CHỌN CHỦ ĐỀ (TOGGLE) ---
  const toggleTopic = (topic: string) => {
    let newTopics = [...selectedTopics];
    
    if (topic === 'TẤT CẢ') {
      // Nếu chọn TẤT CẢ -> Xóa hết các cái khác, chỉ giữ TẤT CẢ
      newTopics = ['TẤT CẢ'];
    } else {
      // Nếu đang chọn TẤT CẢ mà chọn cái khác -> Bỏ TẤT CẢ đi
      if (newTopics.includes('TẤT CẢ')) {
        newTopics = [];
      }

      // Logic Bật/Tắt
      if (newTopics.includes(topic)) {
        newTopics = newTopics.filter(t => t !== topic);
      } else {
        newTopics.push(topic);
      }

      // Nếu bỏ chọn hết -> Tự động quay về TẤT CẢ (để tránh lỗi không chọn gì)
      if (newTopics.length === 0) {
        newTopics = ['TẤT CẢ'];
      }
    }
    updateSession({ selectedTopics: newTopics });
  };

  // --- HÀM SINH ĐỀ TỰ ĐỘNG ---
  const generateExam = () => {
    // 👇 LOGIC LỌC MỚI: Lấy câu hỏi nếu Topic nằm trong danh sách đã chọn
    let source: Question[] = [];
    
    if (selectedTopics.includes('TẤT CẢ')) {
      source = questions;
    } else {
      // Lọc các câu hỏi có topic nằm trong danh sách selectedTopics
      // (So sánh chữ hoa để tránh lỗi định dạng)
      source = questions.filter(q => 
        selectedTopics.some(selected => selected.toUpperCase() === q.topic.trim().toUpperCase())
      );
    }
    
    // Hàm lấy câu hỏi theo loại và phân phối mức độ (Biết: 40%, Hiểu: 30%, Vận dụng: 30%)
    const pickQuestions = (type: string, count: number) => {
        const typeQs = source.filter(q => q.type === type);
        // Tỉ lệ mục tiêu
        const targetBiet = Math.ceil(count * 0.4);
        const targetHieu = Math.floor(count * 0.3);
        const targetVD = count - targetBiet - targetHieu;

        const qBiet = typeQs.filter(q => q.level === 'Biết').sort(() => Math.random() - 0.5);
        const qHieu = typeQs.filter(q => q.level === 'Hiểu').sort(() => Math.random() - 0.5);
        const qVD = typeQs.filter(q => q.level === 'Vận dụng').sort(() => Math.random() - 0.5);

        // Lấy câu hỏi
        let picked = [
            ...qBiet.slice(0, targetBiet),
            ...qHieu.slice(0, targetHieu),
            ...qVD.slice(0, targetVD)
        ];

        // Nếu thiếu số lượng, lấp đầy bằng các câu còn lại bất kỳ
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

    if (finalExam.length === 0) {
        updateSession({ errorMsg: 'Không tìm thấy câu hỏi phù hợp với các chủ đề đã chọn. Vui lòng kiểm tra lại.' });
        return;
    }

    updateSession({ quizQuestions: finalExam, mode: 'DOING', currentQIndex: 0, userAnswers: {}, errorMsg: '' });
  };

  const currentQ = quizQuestions[currentQIndex];
  
  // Xử lý nộp bài từng câu
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
              q.subQuestions.forEach(sq => {
                  if (uAns[sq.id] === sq.isCorrect) correctSub++;
              });
              totalScore += correctSub * 0.25; 
          } else if (q.type === 'Short') {
              if (uAns.trim().toLowerCase() === q.answerKey.trim().toLowerCase()) totalScore += 1; 
          } else {
              if (uAns === q.answerKey) totalScore += 1; 
          }
      });
      const finalPoints = Math.round(totalScore * 10);
      onScore(finalPoints);
      updateSession({ mode: 'RESULT', score: finalPoints });
  };

  const copyQuestionContent = (q: Question) => {
      let content = q.promptText;
      if (q.subQuestions) {
          content += "\n\nCÁC PHÁT BIỂU:";
          q.subQuestions.forEach((sq, idx) => { content += `\n${idx+1}) ${sq.content}`; });
      }
      const prompt = generateRobokiPrompt(q.topic, `Câu hỏi ID: ${q.id}`, q.level, content, q.options);
      onCopy(prompt);
  };

  // --- UI CẤU HÌNH ---
  if (mode === 'CONFIG') {
      return (
        <div className="pb-24 pt-4 px-5 h-full flex flex-col bg-slate-50">
            <div className="flex items-center gap-3 mb-6">
              <button onClick={onBack} className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border border-slate-100"><ChevronLeft size={20} className="text-slate-600"/></button>
              <h2 className="text-xl font-black text-slate-800">Cấu hình đề thi</h2>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6 flex-1 overflow-y-auto">
                <div>
                    <h3 className="font-bold text-slate-700 text-sm mb-3">1. Chọn Chủ đề (Có thể chọn nhiều)</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {/* NÚT TẤT CẢ */}
                        <button 
                          onClick={() => toggleTopic('TẤT CẢ')} 
                          className={`p-3 rounded-xl text-left text-xs font-bold border transition-all ${selectedTopics.includes('TẤT CẢ') ? 'bg-purple-600 text-white shadow-md' : 'bg-white text-slate-500 border-slate-100'}`}
                        >
                          TẤT CẢ
                        </button>
                        
                        {/* CÁC CHỦ ĐỀ KHÁC */}
                        {['VẬT LÍ NHIỆT', 'KHÍ LÍ TƯỞNG', 'TỪ TRƯỜNG', 'HẠT NHÂN & PHÓNG XẠ'].map(t => {
                           const isSelected = selectedTopics.includes(t);
                           return (
                            <button 
                              key={t} 
                              onClick={() => toggleTopic(t)} 
                              className={`p-3 rounded-xl text-left font-bold border transition-all truncate ${isSelected ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-200' : 'bg-white text-slate-500 border-slate-100'} ${t.length > 15 ? 'col-span-2 text-xs' : 'text-xs'}`}
                            >
                              {isSelected && <CheckCircle size={14} className="inline mr-1 mb-0.5"/>}
                              {t}
                            </button>
                           )
                        })}
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-slate-700 text-sm mb-3">2. Số lượng câu hỏi</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <span className="text-xs font-bold text-slate-600">Trắc nghiệm (4 lựa chọn)</span>
                            <input type="number" min="0" max="40" value={countMCQ} onChange={(e) => updateSession({countMCQ: parseInt(e.target.value) || 0})} className="w-16 p-2 rounded-lg border text-center font-bold outline-none focus:border-purple-500"/>
                        </div>
                        <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <span className="text-xs font-bold text-slate-600">Đúng / Sai</span>
                            <input type="number" min="0" max="10" value={countTF} onChange={(e) => updateSession({countTF: parseInt(e.target.value) || 0})} className="w-16 p-2 rounded-lg border text-center font-bold outline-none focus:border-purple-500"/>
                        </div>
                        <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <span className="text-xs font-bold text-slate-600">Điền từ (Trả lời ngắn)</span>
                            <input type="number" min="0" max="10" value={countShort} onChange={(e) => updateSession({countShort: parseInt(e.target.value) || 0})} className="w-16 p-2 rounded-lg border text-center font-bold outline-none focus:border-purple-500"/>
                        </div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 italic">* Hệ thống sẽ tự động phân bổ: 40% Biết, 30% Hiểu, 30% Vận dụng.</p>
                </div>
                {errorMsg && <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold rounded-xl">{errorMsg}</div>}
            </div>
            <button onClick={generateExam} className="w-full bg-purple-600 text-white py-4 rounded-3xl font-bold mt-4 shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2">Bắt đầu làm bài <ArrowRight size={18}/></button>
        </div>
      );
  }

  // --- MÀN HÌNH KẾT QUẢ & LÀM BÀI (GIỮ NGUYÊN NHƯ CŨ) ---
  if (mode === 'RESULT') {
      return (
        <div className="pb-24 pt-4 px-5 h-full flex flex-col bg-slate-50">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 text-center mb-4 shrink-0">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Trophy size={32} className="text-yellow-400 animate-bounce-short"/>
                    <h2 className="text-xl font-black text-slate-800">Kết quả</h2>
                </div>
                <div className="text-5xl font-black text-purple-600">{score} <span className="text-sm text-slate-400 font-bold">điểm</span></div>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 space-y-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Chi tiết bài làm</h3>
                {quizQuestions.map((q, idx) => {
                    const uAns = userAnswers[q.id];
                    let isCorrectMain = false;
                    
                    if (q.subQuestions) {
                        // Logic check riêng cho sub
                    } else if (q.type === 'Short') {
                        isCorrectMain = uAns?.toString().trim().toLowerCase() === q.answerKey.trim().toLowerCase();
                    } else {
                        isCorrectMain = uAns === q.answerKey;
                    }

                    return (
                        <div key={q.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm relative overflow-hidden">
                            <button 
                                onClick={() => copyQuestionContent(q)}
                                className="absolute top-3 right-3 p-2 bg-slate-50 hover:bg-purple-50 text-slate-400 hover:text-purple-600 rounded-lg transition-colors border border-slate-100"
                                title="Hỏi Roboki về câu này"
                            >
                                <Copy size={16}/>
                            </button>

                            <div className="flex gap-2 mb-2">
                                <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-2 py-1 rounded-md uppercase">Câu {idx + 1}</span>
                                <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase border ${q.level === 'Biết' ? 'text-green-600 border-green-200 bg-green-50' : q.level === 'Hiểu' ? 'text-blue-600 border-blue-200 bg-blue-50' : 'text-orange-600 border-orange-200 bg-orange-50'}`}>{q.level}</span>
                            </div>
                            
                            <div className="mb-4">
                                {q.imageUrl && <img src={q.imageUrl} className="h-24 w-full object-contain mb-2 rounded-lg border border-slate-100 bg-slate-50" />}
                                <div className="text-sm font-bold text-slate-800"><MathRender content={q.promptText}/></div>
                            </div>

                            <div className="bg-slate-50 rounded-xl p-3 text-xs border border-slate-100">
                                {q.subQuestions ? (
                                    <div className="space-y-2">
                                        {q.subQuestions.map((sq) => {
                                            const choice = uAns ? uAns[sq.id] : undefined;
                                            const isRightSub = choice === sq.isCorrect;
                                            return (
                                                <div key={sq.id} className="flex justify-between items-start gap-2 border-b border-slate-200 last:border-0 pb-2 last:pb-0">
                                                    <div className="flex-1">
                                                        <MathRender content={sq.content} />
                                                        <div className="mt-1 flex gap-2 font-bold">
                                                            <span className={choice === true ? 'text-blue-600' : choice === false ? 'text-slate-500' : 'text-slate-400'}>Bạn: {choice === true ? 'Đúng' : choice === false ? 'Sai' : 'Bỏ qua'}</span>
                                                            <span className="text-slate-300">|</span>
                                                            <span className="text-emerald-600">Đ.Án: {sq.isCorrect ? 'Đúng' : 'Sai'}</span>
                                                        </div>
                                                    </div>
                                                    <div className="mt-1">{isRightSub ? <CheckCircle size={16} className="text-emerald-500"/> : <XCircle size={16} className="text-rose-500"/>}</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-1">
                                        <div className="flex justify-between"><span className="text-slate-500 font-medium">Bạn chọn:</span><span className={`font-bold ${isCorrectMain ? 'text-emerald-600' : 'text-rose-600'}`}><MathRender content={uAns || 'Chưa làm'} /></span></div>
                                        <div className="flex justify-between border-t border-slate-200 pt-1 mt-1"><span className="text-slate-500 font-medium">Đáp án đúng:</span><span className="font-bold text-emerald-600"><MathRender content={q.answerKey} /></span></div>
                                    </div>
                                )}
                            </div>
                            <div className="mt-3 text-xs text-slate-500 bg-white p-3 rounded-xl border border-slate-100">
                                <div className="font-bold uppercase text-[10px] text-purple-500 mb-1 flex items-center gap-1"><BookOpen size={12}/> Giải thích</div>
                                <MathRender content={q.explanationText || 'Chưa có giải thích chi tiết.'} />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-4 flex gap-3 shrink-0">
                <button onClick={onBack} className="flex-1 bg-white text-slate-500 py-3 rounded-2xl font-bold border border-slate-200 hover:bg-slate-50">Về trang chủ</button>
                <button onClick={() => updateSession({ mode: 'CONFIG', quizQuestions: [], userAnswers: {} })} className="flex-1 bg-purple-600 text-white py-3 rounded-2xl font-bold shadow-lg shadow-purple-200 hover:bg-purple-700">Làm đề mới</button>
            </div>
        </div>
      );
  }

  // DOING MODE
  const userAns = userAnswers[currentQ.id];
  return (
    <div className="pb-24 pt-4 px-4 h-full flex flex-col bg-slate-50">
       <div className="flex justify-between items-center mb-4">
         <button onClick={() => updateSession({ mode: 'CONFIG' })} className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border border-slate-100"><X size={20} className="text-slate-600"/></button>
         <div className="flex flex-col items-center"><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Câu hỏi</span><span className="font-black text-slate-800 text-lg">{currentQIndex + 1}<span className="text-slate-300 text-sm">/{quizQuestions.length}</span></span></div>
         <div className="w-10"></div>
       </div>

       <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex-1 overflow-y-auto relative">
          <div className="absolute top-0 right-0 bg-slate-100 text-slate-500 text-[9px] font-black px-3 py-1.5 rounded-bl-2xl rounded-tr-2xl uppercase tracking-wider">{currentQ.level}</div>
          <div className="mb-2 text-[10px] font-black uppercase text-purple-500 tracking-widest">{currentQ.topic}</div>
          <div className="mb-6">
             {currentQ.imageUrl && (<div className="mb-4 flex justify-center bg-white rounded-xl border border-slate-100 p-2"><img src={currentQ.imageUrl} className="rounded-lg max-h-48 object-contain w-full" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} /></div>)}
             <div className="font-bold text-slate-800 text-base leading-relaxed"><MathRender content={currentQ.promptText}/></div>
          </div>

          <div className="space-y-4">
             {currentQ.subQuestions ? (
                 <div className="space-y-3">
                     {currentQ.subQuestions.map(sq => {
                         const choice = userAns ? userAns[sq.id] : undefined;
                         return (
                             <div key={sq.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                                 <div className="text-sm font-bold text-slate-700 mb-2"><MathRender content={sq.content}/></div>
                                 <div className="flex gap-2">
                                     <button onClick={() => handleSelectAnswer(true, sq.id)} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${choice === true ? 'bg-blue-500 text-white shadow-md' : 'bg-white text-slate-400 border border-slate-200'}`}>Đúng</button>
                                     <button onClick={() => handleSelectAnswer(false, sq.id)} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${choice === false ? 'bg-slate-700 text-white shadow-md' : 'bg-white text-slate-400 border border-slate-200'}`}>Sai</button>
                                 </div>
                                 {session.mode === 'RESULT' && sq.explanation && <MathRender content={sq.explanation} className="mt-1 font-normal text-slate-500"/>}
                             </div>
                         )
                     })}
                 </div>
             ) : currentQ.type === 'Short' ? (
                 <input type="text" value={userAns || ''} onChange={(e) => handleSelectAnswer(e.target.value)} placeholder="Nhập câu trả lời..." className="w-full p-4 rounded-2xl border-2 border-purple-100 font-bold focus:border-purple-500 focus:outline-none"/>
             ) : (
                 currentQ.options?.map((opt, i) => (
                     <button key={i} onClick={() => handleSelectAnswer(opt)} className={`w-full p-4 rounded-2xl border-2 text-left text-sm font-bold transition-all ${userAns === opt ? 'bg-purple-50 border-purple-500 text-purple-700' : 'bg-white border-slate-50 hover:bg-slate-50 text-slate-600'}`}><MathRender content={opt}/></button>
                 ))
             )}
          </div>
       </div>

       <div className="mt-4 flex gap-3">
           <button disabled={currentQIndex === 0} onClick={() => updateSession({ currentQIndex: currentQIndex - 1 })} className="flex-1 bg-white text-slate-600 py-3 rounded-2xl font-bold border border-slate-200 disabled:opacity-50">Quay lại</button>
           {currentQIndex < quizQuestions.length - 1 ? (
               <button onClick={() => updateSession({ currentQIndex: currentQIndex + 1 })} className="flex-[2] bg-purple-600 text-white py-3 rounded-2xl font-bold shadow-lg shadow-purple-200">Câu tiếp theo</button>
           ) : (
               <button onClick={finishExam} className="flex-[2] bg-emerald-500 text-white py-3 rounded-2xl font-bold shadow-lg shadow-emerald-200">Nộp bài</button>
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
  questions: Question[]
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
                      
                      {/* HIỂN THỊ ẢNH TRONG GAME TỐC ĐỘ */}
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
                       
                       {/* HIỂN THỊ ẢNH TRONG GAME VÒNG QUAY */}
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

// 4. LEADERBOARD SCREEN (CẬP NHẬT: THÊM LỌC THEO TRƯỜNG/LỚP)
const LeaderboardScreen: React.FC<{ onBack: () => void; currentUser: UserProfile }> = ({ onBack, currentUser }) => {
  const [filter, setFilter] = useState<'CLASS' | 'SCHOOL' | 'ALL'>('CLASS'); // 👈 State lọc
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
        } else if (filter === 'SCHOOL') {
            q = query(collection(db, 'users'), where('school', '==', currentUser.school), orderBy('totalScore', 'desc'), limit(50));
        } else {
            // Lọc toàn bộ hệ thống
            q = query(collection(db, 'users'), orderBy('totalScore', 'desc'), limit(50));
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
          <button onClick={() => setFilter('CLASS')} className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${filter === 'CLASS' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400'}`}>Lớp</button>
          <button onClick={() => setFilter('SCHOOL')} className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${filter === 'SCHOOL' ? 'bg-purple-500 text-white shadow-md' : 'text-slate-400'}`}>Trường</button>
          <button onClick={() => setFilter('ALL')} className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${filter === 'ALL' ? 'bg-rose-500 text-white shadow-md' : 'text-slate-400'}`}>Toàn quốc</button>
      </div>

      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex-1 overflow-y-auto">
        {loading ? <div className="text-center py-4 text-slate-400"><Loader2 className="animate-spin inline mr-2"/> Đang tải...</div> : (
          <div className="space-y-3">{players.map((u, i) => (<div key={u.uid} className="flex items-center justify-between p-4 rounded-2xl border"><div className="flex items-center gap-4"><div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-black">{i+1}</div><div><div className="font-bold text-sm">{u.name}</div><div className="text-[10px] text-slate-400">{u.class} - {u.school}</div></div></div><div className="font-black">{u.totalScore}</div></div>))}</div>
        )}
      </div>
    </div>
  );
};

// 5. CHALLENGE SCREEN (Đã phục hồi)
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

// 6. CHAT SCREEN (Đã phục hồi)
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

  useEffect(() => { const u = onAuthStateChanged(auth, (firebaseUser)=>{
    if (!firebaseUser) {
        setUser(null);
        setScreen('AUTH');
    }
  }); return () => u(); }, []);
  
  useEffect(() => { const f = async () => { try { setLoadingData(true); 
    const lS = await getDocs(collection(db, 'lessons')); const lL: Lesson[] = []; lS.forEach(d => lL.push(d.data() as Lesson)); setLessons(lL);
    const qS = await getDocs(collection(db, 'questions')); const lQ: Question[] = []; qS.forEach(d => lQ.push(d.data() as Question)); setQuestions(lQ);
  } catch (e) { setToastMsg("Lỗi tải data"); } finally { setLoadingData(false); } }; f(); }, []);

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

  const handleScore = async (pts: number) => { if(!user) return; const u = { ...user, totalScore: user.totalScore + pts }; setUser(u); setToastMsg(`+${pts} điểm`); await updateDoc(doc(db,'users',user.uid), { totalScore: increment(pts) }); };
  const handleCopy = (txt: string) => { navigator.clipboard.writeText(txt); setCopyText(txt); setScreen('CHAT'); };
  const handleToggleLesson = (id: string) => { setExpandedLessonIds(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]); };

  if (!isClient) return null;
  if (!user) return <><AuthScreen onLoginSuccess={(u)=>{setUser(u); setScreen('HOME')}} />{toastMsg && <Toast message={toastMsg} onClose={()=>setToastMsg(null)}/>}</>;
  if (loadingData) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin"/></div>;

  return (
    <div className="max-w-md mx-auto h-[100dvh] bg-white shadow-2xl overflow-hidden relative font-sans text-slate-800 flex flex-col">
        {/* CHỈ HIỆN NÚT NẠP DATA NẾU EMAIL LÀ ADMIN */}
        {user.email === 'lebaoanhnss@gmail.com' && (
          <button onClick={handleNap} className="fixed bottom-24 right-4 z-50 bg-indigo-600 text-white p-3 rounded-full text-xs font-bold shadow-xl border-2 border-white flex items-center gap-2 hover:bg-indigo-700 transition-colors">
              <ShieldAlert size={16} className="animate-pulse"/> Nạp Data (Admin)
          </button>
        )}

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