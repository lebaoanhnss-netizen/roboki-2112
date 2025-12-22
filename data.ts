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

// Physics Lessons (Updated based on user request)
export const PHYSICS_LESSONS: Lesson[] = [
  // --- TOPIC 1: VẬT LÍ NHIỆT ---
  {
    id: 'l1.1',
    topic: 'VẬT LÍ NHIỆT',
    title: '1.2 Nội năng - Định luật I',
    theory: '- Nội năng ($U$) là tổng động năng và thế năng của các phân tử.\n- Nội năng của khí lí tưởng chỉ phụ thuộc vào nhiệt độ.\n- Hai cách làm biến đổi nội năng: Thực hiện công và Truyền nhiệt.',
    formulas: '$$\\Delta U = Q + A$$',
    examples: [
        'Hệ nhận nhiệt lượng $100$ J và thực hiện công $60$ J. Tính độ biến thiên nội năng: $\\Delta U = 100 + (-60) = 40$ J.'
    ]
  },
  
  {
    id: 'l1.2',
    topic: 'VẬT LÍ NHIỆT',
    title: '1.2 Nội năng – Định luật I nhiệt động lực học',
    theory: '- Nội năng là năng lượng bên trong vật (liên quan chuyển động và tương tác phân tử).\n- Nội năng thay đổi do truyền nhiệt hoặc do thực hiện công.\n- Định luật I: bảo toàn năng lượng cho quá trình nhiệt.\n- Quy ước: A là công của ngoại lực tác dụng lên hệ (có thể dương/âm tùy quy ước).',
    formulas: '\\Delta U = Q + A',
    examples: ['Người ta thực hiện công 100 J để nén khí trong xilanh. Khí truyền ra môi trường nhiệt lượng 20 J. Tính độ biến thiên nội năng?']
  },
  {
    id: 'l1.3',
    topic: 'VẬT LÍ NHIỆT',
    title: '1.3 Thang nhiệt độ – Nhiệt kế',
    theory: '- Nhiệt độ đặc trưng mức độ chuyển động nhiệt của các phân tử.\n- Kelvin (K) là thang nhiệt độ tuyệt đối, thường dùng trong phương trình khí lí tưởng.\n- Nhiệt kế dựa vào sự phụ thuộc của một đại lượng vật lí vào nhiệt độ.\n- Khi đổi thang cần chú ý mốc 0 K ứng với -273°C.',
    formulas: 'T = t + 273',
    examples: ['Nhiệt độ phòng là 27°C. Tính nhiệt độ này theo thang Kelvin.']
  },
  {
    id: 'l1.4',
    topic: 'VẬT LÍ NHIỆT',
    title: '1.4 Nhiệt dung riêng – Nhiệt lượng',
    theory: '- Nhiệt dung riêng c cho biết để tăng 1 kg chất thêm 1°C cần bao nhiêu nhiệt lượng.\n- Khi vật thay đổi nhiệt độ: dùng Q = mc\\Delta t.\n- Khi chuyển thể: dùng ẩn nhiệt nóng chảy/hoá hơi.\n- Bài toán thực tế thường kết hợp cả hai quá trình (tăng nhiệt + chuyển thể).',
    formulas: 'Q = mc\\Delta t\nQ = \\lambda m\nQ = Lm',
    examples: ['Tính nhiệt lượng để đun sôi 2 lít nước từ 20°C. Cho c = 4200 J/kg.K.']
  },

  // --- TOPIC 2: KHÍ LÍ TƯỞNG ---
  {
    id: 'l2.1',
    topic: 'KHÍ LÍ TƯỞNG',
    title: '2.1 Mô hình động học phân tử chất khí',
    theory: '- Chất khí gồm các phân tử chuyển động hỗn loạn không ngừng.\n- Áp suất do phân tử va chạm lên thành bình.\n- Nhiệt độ càng cao → vận tốc phân tử trung bình càng lớn.\n- Mô hình khí lí tưởng bỏ qua lực tương tác và thể tích riêng của phân tử (xấp xỉ).',
    formulas: '\\overline{E_k} = \\frac{3}{2}kT',
    examples: ['So sánh động năng trung bình của phân tử khí Heli và khí Hydro ở cùng nhiệt độ.']
  },
  {
    id: 'l2.2',
    topic: 'KHÍ LÍ TƯỞNG',
    title: '2.2 Phương trình trạng thái khí lí tưởng',
    theory: '- Trạng thái của một lượng khí xác định bởi (p, V, T).\n- Với lượng khí không đổi, các trạng thái liên hệ bởi phương trình khí lí tưởng.\n- Dùng Kelvin cho nhiệt độ tuyệt đối.\n- Áp dụng tốt khi khí loãng, nhiệt độ không quá thấp.',
    formulas: 'pV = nRT\n\\frac{p_1V_1}{T_1} = \\frac{p_2V_2}{T_2}',
    examples: ['Một lượng khí ở 27°C có áp suất 1 atm. Nếu nén thể tích giảm một nửa và giữ nhiệt độ không đổi thì áp suất là bao nhiêu?']
  },
  {
    id: 'l2.3',
    topic: 'KHÍ LÍ TƯỞNG',
    title: '2.3 Áp suất khí theo mô hình động học phân tử',
    theory: '- Áp suất tỉ lệ với mật độ phân tử và bình phương vận tốc hiệu dụng.\n- Khi tăng nhiệt độ (giữ V không đổi), vận tốc phân tử tăng → áp suất tăng.\n- Khi tăng mật độ phân tử (tăng n), áp suất tăng nếu T không đổi.\n- Công thức mô tả bản chất vi mô của áp suất.',
    formulas: 'p = \\frac{1}{3}nm\\overline{v^2}',
    examples: []
  },
  {
    id: 'l2.4',
    topic: 'KHÍ LÍ TƯỞNG',
    title: '2.4 Động năng phân tử',
    theory: '- Động năng trung bình của phân tử khí chỉ phụ thuộc vào nhiệt độ tuyệt đối.\n- Ở cùng nhiệt độ, các khí khác nhau có E_k như nhau.\n- Nhiệt độ tăng → E_k tăng tỉ lệ thuận.\n- Liên hệ với thuyết động học phân tử và phương trình khí lí tưởng.',
    formulas: '\\overline{E_k} = \\frac{3}{2}kT',
    examples: ['Tính động năng tịnh tiến trung bình của phân tử khí ở 27°C.']
  },

  // --- TOPIC 3: TỪ TRƯỜNG ---
  {
    id: 'l3.1',
    topic: 'TỪ TRƯỜNG',
    title: '3.1 Khái niệm từ trường',
    theory: '- Từ trường tồn tại xung quanh nam châm và dòng điện.\n- Từ trường tác dụng lực lên điện tích chuyển động và dòng điện.\n- Đại lượng đặc trưng là vectơ cảm ứng từ B.\n- Chiều B trùng với chiều đường sức từ tại điểm xét.',
    formulas: '\\vec{F} = q\\vec{v} \\times \\vec{B}',
    examples: []
  },
  {
    id: 'l3.2',
    topic: 'TỪ TRƯỜNG',
    title: '3.2 Lực từ tác dụng lên đoạn dây dẫn mang dòng điện',
    theory: '- Dây dẫn có dòng điện đặt trong từ trường chịu lực từ.\n- Độ lớn lực phụ thuộc B, I, chiều dài đoạn dây và góc với B.\n- Quy tắc bàn tay trái dùng xác định chiều lực từ.\n- Ứng dụng: động cơ điện, loa, nam châm điện.',
    formulas: 'F = BIl\\sin\\alpha',
    examples: ['Dây dẫn dài 20cm, I=5A đặt vuông góc trong từ trường đều B=0.1T. Tính lực từ?']
  },
  {
    id: 'l3.3',
    topic: 'TỪ TRƯỜNG',
    title: '3.3 Từ thông; Cảm ứng điện từ',
    theory: '- Từ thông qua diện tích S phụ thuộc B, S và góc giữa B và pháp tuyến mặt phẳng.\n- Khi từ thông biến thiên theo thời gian → xuất hiện suất điện động cảm ứng.\n- Dấu “-” thể hiện định luật Len-xơ (chống lại nguyên nhân sinh ra nó).\n- Ứng dụng: máy phát điện, biến áp, sạc không dây.',
    formulas: '\\Phi = BS\\cos\\alpha\ne = -\\frac{d\\Phi}{dt}',
    examples: ['Từ thông qua một khung dây giảm đều từ 1.2Wb về 0 trong 0.2s. Tính suất điện động cảm ứng.']
  },

  // --- TOPIC 4: VẬT LÍ HẠT NHÂN & PHÓNG XẠ ---
  {
    id: 'l4.1',
    topic: 'VẬT LÍ HẠT NHÂN & PHÓNG XẠ',
    title: '4.1 Cấu trúc hạt nhân',
    theory: '- Hạt nhân gồm proton (p) và nơtron (n), gọi chung là nuclon.\n- Số proton Z xác định nguyên tố; số khối A là tổng số nuclon.\n- Kí hiệu hạt nhân: ^A_Z X.\n- N = A - Z là số nơtron.',
    formulas: 'A = Z + N\nN = A - Z',
    examples: ['Xác định số proton và nơtron trong hạt nhân Urani-235.']
  },
  {
    id: 'l4.2',
    topic: 'VẬT LÍ HẠT NHÂN & PHÓNG XẠ',
    title: '4.2 Độ hụt khối và năng lượng liên kết hạt nhân',
    theory: '- Khối lượng hạt nhân nhỏ hơn tổng khối lượng các nuclon rời rạc → độ hụt khối.\n- Độ hụt khối tương ứng năng lượng liên kết (theo E = \\Delta mc^2).\n- Năng lượng liên kết riêng (chia cho A) cho biết độ bền vững hạt nhân.\n- Hạt nhân bền thường có năng lượng liên kết riêng lớn.',
    formulas: '\\Delta m = Zm_p + Nm_n - m_{hn}\nE = \\Delta mc^2\nE_{lk\\_rieng} = \\frac{E}{A}',
    examples: ['Tính năng lượng liên kết của hạt nhân He-4.']
  },
  {
    id: 'l4.3',
    topic: 'VẬT LÍ HẠT NHÂN & PHÓNG XẠ',
    title: '4.3 Sự phóng xạ và chu kì bán rã',
    theory: '- Phóng xạ là quá trình hạt nhân không bền tự phân rã (ngẫu nhiên).\n- Chu kì bán rã T: thời gian để số hạt nhân còn lại giảm còn một nửa.\n- Số hạt và hoạt độ giảm theo hàm mũ theo thời gian.\n- Dùng mô hình N(t) để dự đoán phần còn lại sau thời gian t.',
    formulas: 'N = N_0 \\cdot 2^{-t/T}\nN = N_0 e^{-\\lambda t}\n\\lambda = \\frac{\\ln 2}{T}',
    examples: ['Chất phóng xạ Iốt-131 có chu kì bán rã 8 ngày. Sau 16 ngày, lượng chất còn lại bao nhiêu phần trăm?']
  }
];

// Question Bank (Updated to match new topics)
export const QUESTION_BANK: Question[] = [
  {
    id: 'q1',
    topic: 'VẬT LÍ NHIỆT',
    level: 'Biết',
    type: 'MCQ',
    promptText: 'Trong công thức tính nhiệt lượng chuyển thể Q = \\lambda m, đại lượng \\lambda được gọi là:',
    options: [
      'Nhiệt dung riêng',
      'Nhiệt nóng chảy riêng',
      'Nhiệt hóa hơi riêng',
      'Hệ số nở dài'
    ],
    answerKey: 'Nhiệt nóng chảy riêng',
    explanationText: '\\lambda là nhiệt nóng chảy riêng (J/kg).'
  },
  {
    id: 'q2',
    topic: 'KHÍ LÍ TƯỞNG',
    level: 'Vận dụng',
    type: 'MCQ',
    promptText: 'Một lượng khí có thể tích 2 lít ở áp suất 1 atm. Nén đẳng nhiệt thể tích còn 1 lít. Áp suất mới là?',
    options: ['1 atm', '2 atm', '0.5 atm', '4 atm'],
    answerKey: '2 atm',
    explanationText: 'Đẳng nhiệt T = const nên p1V1 = p2V2.\n=> p2 = (1 * 2) / 1 = 2 atm.'
  },
  {
    id: 'q3',
    topic: 'VẬT LÍ NHIỆT',
    level: 'Hiểu',
    type: 'TrueFalse',
    promptText: 'Nội năng của khí lí tưởng phụ thuộc vào thể tích và nhiệt độ.',
    options: ['Đúng', 'Sai'],
    answerKey: 'Sai',
    explanationText: 'Nội năng khí lí tưởng chỉ phụ thuộc vào nhiệt độ U = f(T) vì bỏ qua thế năng tương tác phân tử.'
  },
  {
    id: 'q4',
    topic: 'TỪ TRƯỜNG',
    level: 'Biết',
    type: 'MCQ',
    promptText: 'Lực từ tác dụng lên đoạn dây dẫn mang dòng điện đạt cực đại khi:',
    options: [
      'Dây dẫn đặt song song với đường sức từ',
      'Dây dẫn đặt vuông góc với đường sức từ',
      'Dây dẫn hợp với đường sức từ góc 45 độ',
      'Không phụ thuộc vào góc đặt'
    ],
    answerKey: 'Dây dẫn đặt vuông góc với đường sức từ',
    explanationText: 'F = BIl sin(alpha). F max khi sin(alpha) = 1 => alpha = 90 độ.'
  },
  {
    id: 'q5',
    topic: 'VẬT LÍ HẠT NHÂN & PHÓNG XẠ',
    level: 'Vận dụng',
    type: 'MCQ',
    promptText: 'Sau thời gian t = 2T (T là chu kì bán rã), số hạt nhân phóng xạ còn lại bằng bao nhiêu phần số hạt ban đầu?',
    options: ['1/2', '1/4', '1/8', '1/16'],
    answerKey: '1/4',
    explanationText: 'N = N0 * 2^(-t/T) = N0 * 2^(-2) = N0 / 4.'
  },
  {
    id: 'q6',
    topic: 'KHÍ LÍ TƯỞNG',
    level: 'Biết',
    type: 'Short',
    promptText: 'Động năng trung bình của phân tử khí tỉ lệ thuận với đại lượng nào của khí?',
    answerKey: 'Nhiệt độ tuyệt đối',
    explanationText: 'E_k = (3/2)kT, tỉ lệ với nhiệt độ tuyệt đối T.'
  },
  // --- New Questions Added ---
  {
    id: 'q7',
    topic: 'VẬT LÍ NHIỆT',
    level: 'Vận dụng',
    type: 'MCQ',
    promptText: 'Cung cấp nhiệt lượng 1.5 J cho chất khí trong xilanh, khí nở ra thực hiện công 1 J. Độ biến thiên nội năng của khí là:',
    options: ['2.5 J', '0.5 J', '-0.5 J', '1.5 J'],
    answerKey: '0.5 J',
    explanationText: 'Q = 1.5 J (nhận nhiệt), A = -1 J (sinh công). \nTheo ĐL 1: ΔU = Q + A = 1.5 - 1 = 0.5 J.'
  },
  {
    id: 'q8',
    topic: 'KHÍ LÍ TƯỞNG',
    level: 'Hiểu',
    type: 'TrueFalse',
    promptText: 'Trong quá trình đẳng tích, áp suất của một lượng khí tỉ lệ nghịch với nhiệt độ tuyệt đối.',
    options: ['Đúng', 'Sai'],
    answerKey: 'Sai',
    explanationText: 'Theo định luật Charles, trong quá trình đẳng tích, áp suất tỉ lệ thuận với nhiệt độ tuyệt đối (p ~ T).'
  },
  {
    id: 'q9',
    topic: 'TỪ TRƯỜNG',
    level: 'Biết',
    type: 'Short',
    promptText: 'Đơn vị của cảm ứng từ B trong hệ SI là gì?',
    answerKey: 'Tesla',
    explanationText: 'Đơn vị đo cảm ứng từ là Tesla, kí hiệu là T.'
  },
  {
    id: 'q10',
    topic: 'VẬT LÍ HẠT NHÂN & PHÓNG XẠ',
    level: 'Biết',
    type: 'MCQ',
    promptText: 'Hạt nhân có năng lượng liên kết riêng càng lớn thì:',
    options: ['Càng kém bền vững', 'Càng bền vững', 'Có khối lượng càng lớn', 'Có tính phóng xạ càng mạnh'],
    answerKey: 'Càng bền vững',
    explanationText: 'Năng lượng liên kết riêng đặc trưng cho độ bền vững của hạt nhân. Càng lớn càng bền.'
  },
  {
    id: 'q11',
    topic: 'VẬT LÍ NHIỆT',
    level: 'Hiểu',
    type: 'MCQ',
    promptText: 'Độ C (Celsius) và độ K (Kelvin) có mối liên hệ nào sau đây?',
    options: ['t(°C) = T(K) + 273', 'T(K) = t(°C) + 273', 'T(K) = 273 - t(°C)', 't(°C) = 273 * T(K)'],
    answerKey: 'T(K) = t(°C) + 273',
    explanationText: 'Thang Kelvin chênh lệch 273 độ so với thang Celsius: T = t + 273.'
  }
];