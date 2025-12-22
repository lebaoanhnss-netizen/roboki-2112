import { Lesson, Question, UserProfile } from './types';

// Mock User (Main user)
export const MOCK_USER: UserProfile = {
  uid: 'user_123',
  name: 'Nguyễn Văn A',
  email: 'hocsinh@roboki.edu.vn',
  class: '12A1',
  totalScore: 1250,
  practiceScore: 500,
  gameScore: 450,
  challengeScore: 300,
  rank: 12
};

// Physics Lessons (Updated with LaTeX format $...$)
export const PHYSICS_LESSONS: Lesson[] = [
  // --- TOPIC 1: VẬT LÍ NHIỆT ---
  {
    id: 'l1.1',
    topic: 'VẬT LÍ NHIỆT',
    title: '1.1 Sự chuyển thể',
    theory: '...', 
    formulas: '$Q = \\lambda m$\n$Q = Lm$', 
    examples: ['...']
  },
  {
    id: 'l1.2',
    topic: 'VẬT LÍ NHIỆT',
    title: '1.2 Nội năng – Định luật I nhiệt động lực học',
    theory: '- Nội năng là năng lượng bên trong vật (liên quan chuyển động và tương tác phân tử).\n- Nội năng thay đổi do truyền nhiệt hoặc do thực hiện công.\n- Định luật I: bảo toàn năng lượng cho quá trình nhiệt.\n- Quy ước: A là công của ngoại lực tác dụng lên hệ (có thể dương/âm tùy quy ước).',
    formulas: '$\\Delta U = Q + A$',
    examples: ['Người ta thực hiện công 100 J để nén khí trong xilanh. Khí truyền ra môi trường nhiệt lượng 20 J. Tính độ biến thiên nội năng?']
  },
  {
    id: 'l1.3',
    topic: 'VẬT LÍ NHIỆT',
    title: '1.3 Thang nhiệt độ – Nhiệt kế',
    theory: '- Nhiệt độ đặc trưng mức độ chuyển động nhiệt của các phân tử.\n- Kelvin (K) là thang nhiệt độ tuyệt đối, thường dùng trong phương trình khí lí tưởng.\n- Nhiệt kế dựa vào sự phụ thuộc của một đại lượng vật lí vào nhiệt độ.\n- Khi đổi thang cần chú ý mốc 0 K ứng với -273°C.',
    formulas: '$T(K) = t(^oC) + 273$',
    examples: ['Nhiệt độ phòng là 27°C. Tính nhiệt độ này theo thang Kelvin.']
  },
  {
    id: 'l1.4',
    topic: 'VẬT LÍ NHIỆT',
    title: '1.4 Nhiệt dung riêng – Nhiệt lượng',
    theory: '- Nhiệt dung riêng c cho biết để tăng 1 kg chất thêm 1°C cần bao nhiêu nhiệt lượng.\n- Khi vật thay đổi nhiệt độ: dùng Q = mc\\Delta t.\n- Khi chuyển thể: dùng ẩn nhiệt nóng chảy/hoá hơi.\n- Bài toán thực tế thường kết hợp cả hai quá trình (tăng nhiệt + chuyển thể).',
    formulas: '$Q = mc\\Delta t$\n$Q = \\lambda m$\n$Q = Lm$',
    examples: ['Tính nhiệt lượng để đun sôi 2 lít nước từ 20°C. Cho c = 4200 J/kg.K.']
  },

  // --- TOPIC 2: KHÍ LÍ TƯỞNG ---
  {
    id: 'l2.1',
    topic: 'KHÍ LÍ TƯỞNG',
    title: '2.1 Mô hình động học phân tử chất khí',
    theory: '- Chất khí gồm các phân tử chuyển động hỗn loạn không ngừng.\n- Áp suất do phân tử va chạm lên thành bình.\n- Nhiệt độ càng cao → vận tốc phân tử trung bình càng lớn.\n- Mô hình khí lí tưởng bỏ qua lực tương tác và thể tích riêng của phân tử (xấp xỉ).',
    formulas: '$\\overline{E_k} = \\frac{3}{2}kT$',
    examples: ['So sánh động năng trung bình của phân tử khí Heli và khí Hydro ở cùng nhiệt độ.']
  },
  {
    id: 'l2.2',
    topic: 'KHÍ LÍ TƯỞNG',
    title: '2.2 Phương trình trạng thái khí lí tưởng',
    theory: '- Trạng thái của một lượng khí xác định bởi (p, V, T).\n- Với lượng khí không đổi, các trạng thái liên hệ bởi phương trình khí lí tưởng.\n- Dùng Kelvin cho nhiệt độ tuyệt đối.\n- Áp dụng tốt khi khí loãng, nhiệt độ không quá thấp.',
    formulas: '$pV = nRT$\n$\\frac{p_1V_1}{T_1} = \\frac{p_2V_2}{T_2}$',
    examples: ['Một lượng khí ở 27°C có áp suất 1 atm. Nếu nén thể tích giảm một nửa và giữ nhiệt độ không đổi thì áp suất là bao nhiêu?']
  },
  {
    id: 'l2.3',
    topic: 'KHÍ LÍ TƯỞNG',
    title: '2.3 Áp suất khí theo mô hình động học phân tử',
    theory: '- Áp suất tỉ lệ với mật độ phân tử và bình phương vận tốc hiệu dụng.\n- Khi tăng nhiệt độ (giữ V không đổi), vận tốc phân tử tăng → áp suất tăng.\n- Khi tăng mật độ phân tử (tăng n), áp suất tăng nếu T không đổi.\n- Công thức mô tả bản chất vi mô của áp suất.',
    formulas: '$p = \\frac{1}{3}nm\\overline{v^2}$',
    examples: []
  },
  {
    id: 'l2.4',
    topic: 'KHÍ LÍ TƯỞNG',
    title: '2.4 Động năng phân tử',
    theory: '- Động năng trung bình của phân tử khí chỉ phụ thuộc vào nhiệt độ tuyệt đối.\n- Ở cùng nhiệt độ, các khí khác nhau có E_k như nhau.\n- Nhiệt độ tăng → E_k tăng tỉ lệ thuận.\n- Liên hệ với thuyết động học phân tử và phương trình khí lí tưởng.',
    formulas: '$\\overline{E_k} = \\frac{3}{2}kT$',
    examples: ['Tính động năng tịnh tiến trung bình của phân tử khí ở 27°C.']
  },

  // --- TOPIC 3: TỪ TRƯỜNG ---
  {
    id: 'l3.1',
    topic: 'TỪ TRƯỜNG',
    title: '3.1 Khái niệm từ trường',
    theory: '- Từ trường tồn tại xung quanh nam châm và dòng điện.\n- Từ trường tác dụng lực lên điện tích chuyển động và dòng điện.\n- Đại lượng đặc trưng là vectơ cảm ứng từ B.\n- Chiều B trùng với chiều đường sức từ tại điểm xét.',
    formulas: '$\\vec{F} = q\\vec{v} \\times \\vec{B}$',
    examples: []
  },
  {
    id: 'l3.2',
    topic: 'TỪ TRƯỜNG',
    title: '3.2 Lực từ tác dụng lên đoạn dây dẫn mang dòng điện',
    theory: '- Dây dẫn có dòng điện đặt trong từ trường chịu lực từ.\n- Độ lớn lực phụ thuộc B, I, chiều dài đoạn dây và góc với B.\n- Quy tắc bàn tay trái dùng xác định chiều lực từ.\n- Ứng dụng: động cơ điện, loa, nam châm điện.',
    formulas: '$F = BIl\\sin\\alpha$',
    examples: ['Dây dẫn dài 20cm, I=5A đặt vuông góc trong từ trường đều B=0.1T. Tính lực từ?']
  },
  {
    id: 'l3.3',
    topic: 'TỪ TRƯỜNG',
    title: '3.3 Từ thông; Cảm ứng điện từ',
    theory: '- Từ thông qua diện tích S phụ thuộc B, S và góc giữa B và pháp tuyến mặt phẳng.\n- Khi từ thông biến thiên theo thời gian → xuất hiện suất điện động cảm ứng.\n- Dấu “-” thể hiện định luật Len-xơ (chống lại nguyên nhân sinh ra nó).\n- Ứng dụng: máy phát điện, biến áp, sạc không dây.',
    formulas: '$\\Phi = BS\\cos\\alpha$\n$e = -\\frac{d\\Phi}{dt}$',
    examples: ['Từ thông qua một khung dây giảm đều từ 1.2Wb về 0 trong 0.2s. Tính suất điện động cảm ứng.']
  },

  // --- TOPIC 4: VẬT LÍ HẠT NHÂN & PHÓNG XẠ ---
  {
    id: 'l4.1',
    topic: 'VẬT LÍ HẠT NHÂN & PHÓNG XẠ',
    title: '4.1 Cấu trúc hạt nhân',
    theory: '- Hạt nhân gồm proton (p) và nơtron (n), gọi chung là nuclon.\n- Số proton Z xác định nguyên tố; số khối A là tổng số nuclon.\n- Kí hiệu hạt nhân: ^A_Z X.\n- N = A - Z là số nơtron.',
    formulas: '$A = Z + N$\n$N = A - Z$',
    examples: ['Xác định số proton và nơtron trong hạt nhân Urani-235.']
  },
  {
    id: 'l4.2',
    topic: 'VẬT LÍ HẠT NHÂN & PHÓNG XẠ',
    title: '4.2 Độ hụt khối và năng lượng liên kết hạt nhân',
    theory: '- Khối lượng hạt nhân nhỏ hơn tổng khối lượng các nuclon rời rạc → độ hụt khối.\n- Độ hụt khối tương ứng năng lượng liên kết (theo E = \\Delta mc^2).\n- Năng lượng liên kết riêng (chia cho A) cho biết độ bền vững hạt nhân.\n- Hạt nhân bền thường có năng lượng liên kết riêng lớn.',
    formulas: '$\\Delta m = Zm_p + Nm_n - m_{hn}$\n$E = \\Delta mc^2$\n$E_{lk\\_rieng} = \\frac{E}{A}$',
    examples: ['Tính năng lượng liên kết của hạt nhân He-4.']
  },
  {
    id: 'l4.3',
    topic: 'VẬT LÍ HẠT NHÂN & PHÓNG XẠ',
    title: '4.3 Sự phóng xạ và chu kì bán rã',
    theory: '- Phóng xạ là quá trình hạt nhân không bền tự phân rã (ngẫu nhiên).\n- Chu kì bán rã T: thời gian để số hạt nhân còn lại giảm còn một nửa.\n- Số hạt và hoạt độ giảm theo hàm mũ theo thời gian.\n- Dùng mô hình N(t) để dự đoán phần còn lại sau thời gian t.',
    formulas: '$N = N_0 \\cdot 2^{-t/T}$\n$N = N_0 e^{-\\lambda t}$\n$\\lambda = \\frac{\\ln 2}{T}$',
    examples: ['Chất phóng xạ Iốt-131 có chu kì bán rã 8 ngày. Sau 16 ngày, lượng chất còn lại bao nhiêu phần trăm?']
  }
];

// ================= QUESTION BANK – VẬT LÍ 12 =================
export const QUESTION_BANK: Question[] = [

/* ============================================================
   CHƯƠNG 1 – VẬT LÍ NHIỆT (10 CÂU)
============================================================ */

{
  id: 'c1-50',
  topic: 'VẬT LÍ NHIỆT',
  level: 'Biết',
  type: 'MCQ',
  promptText: 'Đại lượng đặc trưng cho mức độ nóng lạnh của vật là:',
  
  // 👇 Đã thêm link ảnh vào đây (nhớ dấu phẩy cuối dòng)
  imageUrl: 'https://i.postimg.cc/Y2VtbMn1/Please-make-the-202512140930.jpg',
  
  options: ['Nội năng', 'Nhiệt lượng', 'Nhiệt độ', 'Nhiệt dung'],
  answerKey: 'Nhiệt độ',
  explanationText: 'Nhiệt độ đặc trưng cho trạng thái nóng – lạnh của vật.'
},

{
  id: 'c1-9',
  topic: 'VẬT LÍ NHIỆT',
  level: 'Biết',
  type: 'Short',
  promptText: 'Khi vật tỏa nhiệt thì $Q$ mang dấu gì?',
  answerKey: 'Âm',
  explanationText: 'Vật tỏa nhiệt ⇒ $Q<0$.'
},
{
  id: 'c1-10',
  topic: 'VẬT LÍ NHIỆT',
  level: 'Hiểu',
  type: 'TrueFalse',
  promptText: 'Nhiệt dung riêng phụ thuộc vào khối lượng của vật.',
  options: ['Đúng', 'Sai'],
  answerKey: 'Sai',
  explanationText: 'Nhiệt dung riêng chỉ phụ thuộc bản chất chất.'
},

/* ============================================================
   CHƯƠNG 2 – KHÍ LÍ TƯỞNG (10 CÂU)
============================================================ */
{
  id: 'c2-1',
  topic: 'KHÍ LÍ TƯỞNG',
  level: 'Biết',
  type: 'MCQ',
  promptText: 'Thông số trạng thái của một lượng khí là:',
  options: ['m, V, T', 'p, V, T', 'p, m, t', 'V, t, m'],
  answerKey: 'p, V, T',
  explanationText: 'Trạng thái khí xác định bởi $p, V, T$.'
},
{
  id: 'c2-2',
  topic: 'KHÍ LÍ TƯỞNG',
  level: 'Biết',
  type: 'Short',
  promptText: 'Viết phương trình trạng thái khí lí tưởng.',
  answerKey: '$pV = nRT$',
  explanationText: 'Phương trình trạng thái khí lí tưởng.'
},
{
  id: 'c2-3',
  topic: 'KHÍ LÍ TƯỞNG',
  level: 'Hiểu',
  type: 'MCQ',
  promptText: 'Quá trình đẳng nhiệt là quá trình có:',
  options: ['V không đổi', 'p không đổi', 'T không đổi', 'U không đổi'],
  answerKey: 'T không đổi',
  explanationText: 'Đẳng nhiệt ⇒ $T=const$.'
},
{
  id: 'c2-4',
  topic: 'KHÍ LÍ TƯỞNG',
  level: 'Hiểu',
  type: 'TrueFalse',
  promptText: 'Ở cùng nhiệt độ, các khí khác nhau có động năng phân tử trung bình như nhau.',
  options: ['Đúng', 'Sai'],
  answerKey: 'Đúng',
  explanationText: '$\\overline{E_k}=\\frac{3}{2}kT$.'
},
{
  id: 'c2-5',
  topic: 'KHÍ LÍ TƯỞNG',
  level: 'Vận dụng',
  type: 'MCQ',
  promptText: 'Khí có $V_1=2$ lít, $p_1=1$ atm. Nén đẳng nhiệt còn 1 lít. Áp suất mới là:',
  options: ['0.5 atm', '1 atm', '2 atm', '4 atm'],
  answerKey: '2 atm',
  explanationText: '$p_1V_1=p_2V_2$.'
},
{
  id: 'c2-6',
  topic: 'KHÍ LÍ TƯỞNG',
  level: 'Hiểu',
  type: 'MCQ',
  promptText: 'Trong quá trình đẳng tích, đại lượng nào không đổi?',
  options: ['Áp suất', 'Nhiệt độ', 'Thể tích', 'Nội năng'],
  answerKey: 'Thể tích',
  explanationText: 'Đẳng tích ⇒ $V=const$.'
},
{
  id: 'c2-7',
  topic: 'KHÍ LÍ TƯỞNG',
  level: 'Vận dụng',
  type: 'MCQ',
  promptText: 'Giữ thể tích không đổi, nhiệt độ tăng từ 300 K lên 600 K. Áp suất:',
  options: ['Giảm 2 lần', 'Không đổi', 'Tăng 2 lần', 'Tăng 4 lần'],
  answerKey: 'Tăng 2 lần',
  explanationText: '$p \\sim T$ khi $V=const$.'
},
{
  id: 'c2-8',
  topic: 'KHÍ LÍ TƯỞNG',
  level: 'Biết',
  type: 'Short',
  promptText: 'Nhiệt độ tuyệt đối được đo theo thang nào?',
  answerKey: 'Kelvin',
  explanationText: 'Nhiệt độ tuyệt đối đo theo thang Kelvin.'
},
{
  id: 'c2-9',
  topic: 'KHÍ LÍ TƯỞNG',
  level: 'Hiểu',
  type: 'TrueFalse',
  promptText: 'Quá trình đẳng áp có $\\dfrac{V}{T}=const$.',
  options: ['Đúng', 'Sai'],
  answerKey: 'Đúng',
  explanationText: 'Định luật Charles.'
},
{
  id: 'c2-10',
  topic: 'KHÍ LÍ TƯỞNG',
  level: 'Vận dụng',
  type: 'MCQ',
  promptText: 'Một mol khí ở điều kiện chuẩn có thể tích:',
  options: ['11.2 lít', '22.4 lít', '24 lít', '44.8 lít'],
  answerKey: '22.4 lít',
  explanationText: 'Thể tích mol ở ĐKC là 22.4 lít.'
},

/* ============================================================
   CHƯƠNG 3 – DÒNG ĐIỆN KHÔNG ĐỔI (10 CÂU)
============================================================ */
{
  id: 'c3-1',
  topic: 'DÒNG ĐIỆN KHÔNG ĐỔI',
  level: 'Biết',
  type: 'MCQ',
  promptText: 'Cường độ dòng điện được xác định bằng:',
  options: ['$I=\\dfrac{q}{t}$', '$I=UR$', '$I=Rt$', '$I=qU$'],
  answerKey: '$I=\\dfrac{q}{t}$',
  explanationText: 'Định nghĩa cường độ dòng điện.'
},
{
  id: 'c3-2',
  topic: 'DÒNG ĐIỆN KHÔNG ĐỔI',
  level: 'Biết',
  type: 'MCQ',
  promptText: 'Đơn vị của cường độ dòng điện là:',
  options: ['V', 'Ω', 'A', 'W'],
  answerKey: 'A',
  explanationText: 'Đơn vị là Ampe.'
},
{
  id: 'c3-3',
  topic: 'DÒNG ĐIỆN KHÔNG ĐỔI',
  level: 'Hiểu',
  type: 'MCQ',
  promptText: 'Định luật Ôm cho đoạn mạch có dạng:',
  options: ['$U=IR$', '$I=UR$', '$R=UI$', '$P=UI$'],
  answerKey: '$U=IR$',
  explanationText: 'Hệ thức định luật Ôm.'
},
{
  id: 'c3-4',
  topic: 'DÒNG ĐIỆN KHÔNG ĐỔI',
  level: 'Hiểu',
  type: 'TrueFalse',
  promptText: 'Cường độ dòng điện tỉ lệ thuận với hiệu điện thế.',
  options: ['Đúng', 'Sai'],
  answerKey: 'Đúng',
  explanationText: 'Theo $I=\\dfrac{U}{R}$.'
},
{
  id: 'c3-5',
  topic: 'DÒNG ĐIỆN KHÔNG ĐỔI',
  level: 'Biết',
  type: 'Short',
  promptText: 'Viết công thức tính công suất điện.',
  answerKey: '$P=UI$',
  explanationText: 'Công suất điện.'
},
{
  id: 'c3-6',
  topic: 'DÒNG ĐIỆN KHÔNG ĐỔI',
  level: 'Vận dụng',
  type: 'MCQ',
  promptText: 'Điện trở 10Ω mắc vào nguồn 20V. Cường độ dòng điện là:',
  options: ['0.5 A', '1 A', '2 A', '10 A'],
  answerKey: '2 A',
  explanationText: '$I=\\dfrac{20}{10}=2$ A.'
},
{
  id: 'c3-7',
  topic: 'DÒNG ĐIỆN KHÔNG ĐỔI',
  level: 'Hiểu',
  type: 'TrueFalse',
  promptText: 'Điện năng tiêu thụ của đoạn mạch tỉ lệ với thời gian sử dụng.',
  options: ['Đúng', 'Sai'],
  answerKey: 'Đúng',
  explanationText: '$A=Pt$.'
},
{
  id: 'c3-8',
  topic: 'DÒNG ĐIỆN KHÔNG ĐỔI',
  level: 'Biết',
  type: 'Short',
  promptText: 'Đơn vị của điện năng trong hệ SI là gì?',
  answerKey: 'Joule',
  explanationText: 'Đơn vị điện năng là Jun (J).'
},
{
  id: 'c3-9',
  topic: 'DÒNG ĐIỆN KHÔNG ĐỔI',
  level: 'Vận dụng',
  type: 'MCQ',
  promptText: 'Công suất của đoạn mạch khi $U=10V$, $I=2A$ là:',
  options: ['5 W', '10 W', '20 W', '40 W'],
  answerKey: '20 W',
  explanationText: '$P=UI=20$ W.'
},
{
  id: 'c3-10',
  topic: 'DÒNG ĐIỆN KHÔNG ĐỔI',
  level: 'Hiểu',
  type: 'TrueFalse',
  promptText: 'Điện trở của dây dẫn phụ thuộc vào nhiệt độ.',
  options: ['Đúng', 'Sai'],
  answerKey: 'Đúng',
  explanationText: 'Điện trở kim loại tăng khi nhiệt độ tăng.'
},

/* ============================================================
   CHƯƠNG 4 – TỪ TRƯỜNG (10 CÂU)
============================================================ */
{
  id: 'c4-1',
  topic: 'TỪ TRƯỜNG',
  level: 'Biết',
  type: 'MCQ',
  promptText: 'Đơn vị của cảm ứng từ $B$ là:',
  options: ['N', 'T', 'A', 'V'],
  answerKey: 'T',
  explanationText: 'Đơn vị Tesla.'
},
{
  id: 'c4-2',
  topic: 'TỪ TRƯỜNG',
  level: 'Biết',
  type: 'MCQ',
  promptText: 'Đường sức từ có đặc điểm:',
  options: [
    'Không khép kín',
    'Là đường thẳng',
    'Là đường cong khép kín',
    'Song song nhau'
  ],
  answerKey: 'Là đường cong khép kín',
  explanationText: 'Đường sức từ là các đường cong khép kín.'
},
{
  id: 'c4-3',
  topic: 'TỪ TRƯỜNG',
  level: 'Hiểu',
  type: 'MCQ',
  promptText: 'Lực từ tác dụng lên dây dẫn mang dòng điện phụ thuộc vào:',
  options: [
    'Chiều dòng điện',
    'Cảm ứng từ',
    'Chiều dài dây',
    'Cả ba yếu tố trên'
  ],
  answerKey: 'Cả ba yếu tố trên',
  explanationText: '$F=BIl\\sin\\alpha$.'
},
{
  id: 'c4-4',
  topic: 'TỪ TRƯỜNG',
  level: 'Hiểu',
  type: 'TrueFalse',
  promptText: 'Đường sức từ bên ngoài nam châm đi từ cực Bắc sang cực Nam.',
  options: ['Đúng', 'Sai'],
  answerKey: 'Đúng',
  explanationText: 'Quy ước chiều đường sức từ.'
},
{
  id: 'c4-5',
  topic: 'TỪ TRƯỜNG',
  level: 'Biết',
  type: 'Short',
  promptText: 'Nêu tên quy tắc xác định chiều lực từ tác dụng lên dây dẫn.',
  answerKey: 'Quy tắc bàn tay trái',
  explanationText: 'Quy tắc bàn tay trái.'
},
{
  id: 'c4-6',
  topic: 'TỪ TRƯỜNG',
  level: 'Vận dụng',
  type: 'MCQ',
  promptText: 'Lực từ tác dụng lên dây dẫn dài $l$ mang dòng $I$ đặt vuông góc với từ trường $B$ là:',
  options: ['$F=BIl$', '$F=BI$', '$F=Bl$', '$F=Il$'],
  answerKey: '$F=BIl$',
  explanationText: 'Công thức lực từ.'
},
{
  id: 'c4-7',
  topic: 'TỪ TRƯỜNG',
  level: 'Hiểu',
  type: 'TrueFalse',
  promptText: 'Hạt mang điện chuyển động song song với đường sức từ thì không chịu lực từ.',
  options: ['Đúng', 'Sai'],
  answerKey: 'Đúng',
  explanationText: '$F=qvB\\sin\\alpha$, với $\\alpha=0$ thì $F=0$.'
},
{
  id: 'c4-8',
  topic: 'TỪ TRƯỜNG',
  level: 'Biết',
  type: 'Short',
  promptText: 'Đơn vị của lực từ là gì?',
  answerKey: 'Newton',
  explanationText: 'Đơn vị lực là Newton (N).'
},
{
  id: 'c4-9',
  topic: 'TỪ TRƯỜNG',
  level: 'Vận dụng',
  type: 'MCQ',
  promptText: 'Khi tăng cường độ dòng điện trong dây dẫn, lực từ tác dụng lên dây:',
  options: ['Giảm', 'Không đổi', 'Tăng', 'Bằng 0'],
  answerKey: 'Tăng',
  explanationText: 'Vì $F \\sim I$.'
},
{
  id: 'c4-10',
  topic: 'TỪ TRƯỜNG',
  level: 'Hiểu',
  type: 'TrueFalse',
  promptText: 'Từ trường tồn tại xung quanh điện tích đứng yên.',
  options: ['Đúng', 'Sai'],
  answerKey: 'Sai',
  explanationText: 'Từ trường tồn tại quanh điện tích chuyển động.'
}

];


