import { Lesson, Question, UserProfile } from './types';

// Mock User (Main user)
export const MOCK_USER: UserProfile = {
  uid: 'user_123',
  name: 'Nguyễn Văn A',
  email: 'hocsinh@roboki.edu.vn',
  class: '12A1',
  school: 'THPT Chuyên Lý Tự Trọng', // Đã bổ sung trường school để khớp với type UserProfile mới
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

  // --- TOPIC 4: HẠT NHÂN & PHÓNG XẠ ---
  {
    id: 'l4.1',
    topic: 'HẠT NHÂN & PHÓNG XẠ',
    title: '4.1 Cấu trúc hạt nhân',
    theory: '- Hạt nhân gồm proton (p) và nơtron (n), gọi chung là nuclon.\n- Số proton Z xác định nguyên tố; số khối A là tổng số nuclon.\n- Kí hiệu hạt nhân: ^A_Z X.\n- N = A - Z là số nơtron.',
    formulas: '$A = Z + N$\n$N = A - Z$',
    examples: ['Xác định số proton và nơtron trong hạt nhân Urani-235.']
  },
  {
    id: 'l4.2',
    topic: 'HẠT NHÂN & PHÓNG XẠ',
    title: '4.2 Độ hụt khối và năng lượng liên kết hạt nhân',
    theory: '- Khối lượng hạt nhân nhỏ hơn tổng khối lượng các nuclon rời rạc → độ hụt khối.\n- Độ hụt khối tương ứng năng lượng liên kết (theo E = \\Delta mc^2).\n- Năng lượng liên kết riêng (chia cho A) cho biết độ bền vững hạt nhân.\n- Hạt nhân bền thường có năng lượng liên kết riêng lớn.',
    formulas: '$\\Delta m = Zm_p + Nm_n - m_{hn}$\n$E = \\Delta mc^2$\n$E_{lk\\_rieng} = \\frac{E}{A}$',
    examples: ['Tính năng lượng liên kết của hạt nhân He-4.']
  },
  {
    id: 'l4.3',
    topic: 'HẠT NHÂN & PHÓNG XẠ',
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
    id: 'c1.1-3', // Câu này có hình ảnh
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.1',
    level: 'Vận dụng',
    type: 'MCQ',
    promptText: 'Câu 3: Quan sát đồ thị nóng chảy của nước đá (hình bên). Đoạn nằm ngang ứng với quá trình nào?',
    imageUrl: 'https://i.postimg.cc/Y2VtbMn1/Please-make-the-202512140930.jpg', // Link ảnh mẫu
    options: ['Tăng nhiệt độ', 'Nóng chảy', 'Sôi', 'Ngưng tụ'],
    answerKey: 'Nóng chảy',
    explanationText: 'Đoạn nằm ngang nhiệt độ không đổi là quá trình chuyển thể.'
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

/* ============================================================
   CHƯƠNG 3 – TỪ TRƯỜNG (10 CÂU)
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
    id: 'demo-tf-1',
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.1',
    level: 'Vận dụng',
    type: 'TrueFalse', 
    promptText: 'Một lượng khí lí tưởng xác định đang ở trạng thái (1) có $p_1=1 atm$, $V_1=4$ lít. Nén đẳng nhiệt đến trạng thái (2) có $V_2=2$ lít. Sau đó làm lạnh đẳng tích đến trạng thái (3) có $p_3=1 atm$.',
    // 👇 Đây là phần 4 ý Đúng/Sai
    subQuestions: [
      {
        id: 'sq1',
        content: 'Quá trình biến đổi từ (1) sang (2) là quá trình đẳng áp.',
        isCorrect: false,
        explanation: 'Đề bài cho nén đẳng nhiệt, không phải đẳng áp.'
      },
      {
        id: 'sq2',
        content: 'Áp suất của khí tại trạng thái (2) bằng 2 atm.',
        isCorrect: true,
        explanation: 'Đẳng nhiệt: p1.V1 = p2.V2 => 1.4 = p2.2 => p2 = 2 atm.'
      },
      {
        id: 'sq3',
        content: 'Trong quá trình (2) sang (3), áp suất của khí giảm.',
        isCorrect: true,
        explanation: 'Từ p2=2 atm về p3=1 atm => Áp suất giảm.'
      },
      {
        id: 'sq4',
        content: 'Nhiệt độ tại trạng thái (3) bằng nhiệt độ tại trạng thái (1).',
        isCorrect: false,
        explanation: 'Trạng thái (3) có p=1, V=2. Trạng thái (1) có p=1, V=4. Vì pV khác nhau nên T khác nhau.'
      }
    ],
    // Các trường dưới để trống hoặc mặc định vì không dùng cho dạng này
    options: [], 
    answerKey: '', 
    explanationText: 'Giải chi tiết các bước tính toán p, V, T tại từng trạng thái.'
  },

  // =========================================================
  // DẠNG 2: TRẮC NGHIỆM 4 LỰA CHỌN (MCQ - Truyền thống)
  // Cấu trúc: Có trường `options` chứa 4 đáp án A,B,C,D
  // =========================================================
  {
    id: 'demo-mcq-1',
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.1',
    level: 'Biết',
    type: 'MCQ',
    promptText: 'Đơn vị đo của nhiệt dung riêng trong hệ SI là:',
    options: ['J/kg.K', 'J/kg', 'J.kg', 'J'],
    answerKey: 'J/kg.K', // Phải khớp hoàn toàn với 1 trong 4 options
    explanationText: 'Nhiệt dung riêng c có đơn vị là Jun trên kilogam Kenvin (J/kg.K).'
  },

  // =========================================================
  // DẠNG 3: TRẢ LỜI NGẮN / ĐIỀN TỪ (Short Answer)
  // Cấu trúc: Người dùng tự gõ phím, máy so sánh với `answerKey`
  // =========================================================
  {
    id: 'demo-short-1',
    topic: 'TỪ TRƯỜNG',
    lessonId: 'l3.1',
    level: 'Vận dụng',
    type: 'Short',
    promptText: 'Một đoạn dây dẫn dài 5cm đặt trong từ trường đều có cảm ứng từ B = 0,1T. Dòng điện qua dây là 2A. Lực từ tác dụng lên dây khi dây đặt vuông góc với đường sức từ là bao nhiêu Newton? (Nhập số thập phân)',
    
    // 👇 Đáp án chuẩn (Code đã hỗ trợ tự động viết hoa/thường nên thầy nhập sao cũng được)
    answerKey: '0.01', 
    
    // Các trường không dùng
    options: [],
    explanationText: 'Áp dụng công thức: F = B.I.l.sin(90) = 0,1 * 2 * 0,05 * 1 = 0,01 N.'
  },
  
   // =========================================================
  // DẠNG 4: CÂU HỎI CÓ HÌNH ẢNH (Bổ sung)
  // =========================================================
  
];