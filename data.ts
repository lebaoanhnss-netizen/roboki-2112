// src/data.ts
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
    theory: '- Sự chuyển thể là quá trình chất chuyển từ trạng thái này sang trạng thái khác (rắn – lỏng – khí) khi có sự trao đổi nhiệt.\n- Quá trình này không làm thay đổi bản chất hóa học của chất.',
    // 👇 THÊM DÒNG NÀY: Link ảnh minh họa (có thể để nhiều ảnh trong dấu [])
    theoryImages: [
        'https://i.postimg.cc/YqmsSv79/cac-qua-trinh.png', // Ảnh sơ đồ chuyển thể (Ví dụ)
        // Thầy có thể thêm nhiều ảnh khác vào đây, cách nhau bằng dấu phẩy
    ],
    formulas: `- Nhiệt nóng chảy: $$Q = \\lambda m$$
              - Nhiệt hóa hơi: $$Q = Lm$$
\n**Trong đó:**
- $Q$: Nhiệt lượng ($J$)
- $m$: Khối lượng chất ($kg$)
- $\\lambda$: Nhiệt nóng chảy riêng ($J/kg$)
- $L$: Nhiệt hóa hơi riêng ($J/kg$)`,
        
    examples: ['Nước đá ở 0°C đang tan chảy: nhiệt lượng cung cấp dùng để phá vỡ liên kết giữa các phân tử nước đá.',
    'Khi đun nước đến 100°C, nhiệt độ không tăng nhưng nước vẫn sôi do nhiệt dùng để hoá hơi.',
    'Cồn bay hơi nhanh hơn nước vì có nhiệt hoá hơi riêng nhỏ hơn.']
  },
  {
    id: 'l1.2',
    topic: 'VẬT LÍ NHIỆT',
    title: '1.2 Nội năng – Định luật I nhiệt động lực học',
    theory: '- Nội năng ($U$): Là tổng động năng và thế năng tương tác của các phân tử cấu tạo nên vật. Nội năng phụ thuộc vào nhiệt độ ($T$) và thể tích ($V$).\n- Cách làm thay đổi nội năng:\n  + Thực hiện công (ví dụ: cọ xát, nén khí).\n  + Truyền nhiệt (ví dụ: hơ nóng, làm lạnh).\n- Định luật I: Độ biến thiên nội năng của hệ bằng tổng công và nhiệt lượng mà hệ nhận được.\n- Quy ước dấu quan trọng:',
    theoryImages: [
      'https://i.postimg.cc/FRy0qQXh/Screenshot-23.png'    ],
    formulas: `$$\\Delta U = A + Q$$
\n**Trong đó:**
- $\\Delta U$: Độ biến thiên nội năng ($J$)
- $A$: Công ($J$)`,
    examples: [
      'Nén khí trong xilanh: Khí nhận công ($A > 0$) làm nội năng tăng.',
      'Đun nóng khí trong bình kín: Khí nhận nhiệt ($Q > 0$) làm nội năng tăng.',
      'Khí dãn nở đẩy pit-tông: Khí thực hiện công ($A < 0$).'
    ]
  },
  {
    id: 'l1.3',
    topic: 'VẬT LÍ NHIỆT',
    title: '1.3 Thang nhiệt độ – Nhiệt kế',
    theory: `- Nhiệt độ là đại lượng vật lí đặc trưng cho mức độ nóng, lạnh của một vật.
- Tính chất truyền nhiệt: Nhiệt năng truyền từ vật có nhiệt độ cao hơn sang vật có nhiệt độ thấp hơn.
- Cân bằng nhiệt: Khi hai vật tiếp xúc nhau có cùng nhiệt độ thì không có sự truyền nhiệt năng giữa chúng.
- Các thang nhiệt độ phổ biến:
  + Thang Celsius (độ C): Chọn mốc 0 độ C là nhiệt độ nước đá đang tan và 100 độ C là nhiệt độ nước đang sôi (ở áp suất 1 atm).
  + Thang Kelvin (K): Là thang nhiệt độ tuyệt đối. 0 K là độ không tuyệt đối (nhiệt độ thấp nhất mà vật có thể có). Một độ chia trong thang Kelvin bằng một độ chia trong thang Celsius.
  + Thang Fahrenheit (độ F): Chọn mốc 32 độ F là nhiệt độ nước đá đang tan và 212 độ F là nhiệt độ nước đang sôi.
- Nhiệt kế: Là thiết bị đo nhiệt độ, hoạt động dựa trên sự thay đổi tính chất vật lí của chất theo nhiệt độ (sự nở vì nhiệt của chất lỏng/rắn/khí, thay đổi điện trở, bức xạ nhiệt...).`,
    theoryImages: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Thermometer_scales.svg/569px-Thermometer_scales.svg.png'
    ],
    formulas: '$$ T(K) = t(^oC) + 273 $$\n$$ t(^oF) = 1,8t(^oC) + 32 $$',
    examples: [
      'Đổi nhiệt độ phòng 27 độ C ra thang Kelvin: $$T = 27 + 273 = 300 K$$',
      'Nhiệt độ cơ thể người bình thường là 37 độ C, đổi sang độ F: $$t(^oF) = 1,8 . 37 + 32 = 98,6 ^oF$$',
      'Độ không tuyệt đối (0 K) tương ứng với -273 độ C.'
    ]
  },
  {
    id: 'l1.4',
    topic: 'VẬT LÍ NHIỆT',
    title: '1.4 Nhiệt dung riêng - Nhiệt nóng chảy riêng - Nhiệt hoá hơi riêng',
    theory: `- Nhiệt dung riêng (c): Là nhiệt lượng cần truyền cho 1 kg chất đó để làm cho nhiệt độ của nó tăng thêm 1 độ C (hoặc 1 K). Đơn vị là J/kg.K.
- Nhiệt nóng chảy riêng ($\\lambda$): Là nhiệt lượng cần thiết để làm cho 1 kg chất rắn nóng chảy hoàn toàn ở nhiệt độ nóng chảy mà không làm thay đổi nhiệt độ. Đơn vị là J/kg.
- Nhiệt hoá hơi riêng (L): Là nhiệt lượng cần thiết để làm cho 1 kg chất lỏng hoá hơi hoàn toàn ở nhiệt độ xác định. Đơn vị là J/kg.
- Các đại lượng này phụ thuộc vào bản chất của chất làm vật.`,
    theoryImages: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Heating_Curve_of_Water.png/640px-Heating_Curve_of_Water.png'
    ],
    // 👇 ĐÃ BỔ SUNG CHÚ THÍCH CÁC ĐẠI LƯỢNG
    formulas: `$$ Q = mc\\Delta t $$ \n $$ Q = \\lambda m $$ \n $$ Q = Lm $$
\n**Trong đó:**
- $Q$: Nhiệt lượng ($J$)
- $m$: Khối lượng ($kg$)
- $\\Delta t$: Độ biến thiên nhiệt độ ($^oC$ hoặc $K$)
- $c$: Nhiệt dung riêng ($J/kg.K$)
- $\\lambda$: Nhiệt nóng chảy riêng ($J/kg$)
- $L$: Nhiệt hoá hơi riêng ($J/kg$)`,
    examples: [
      'Để đun nóng 1 kg nước tăng thêm 1 độ C cần nhiệt lượng là 4200 J (vì nhiệt dung riêng của nước là 4200 J/kg.K).',
      'Nhiệt lượng làm nóng chảy hoàn toàn 0,5 kg nước đá ở 0 độ C: $$Q = 3,34.10^5 \\times 0,5 = 167000 J$$',
      'Nhiệt lượng cần cung cấp để 10 kg nước hóa hơi hoàn toàn ở 100 độ C: $$Q = 2,3.10^6 \\times 10 = 23.10^6 J$$'
    ]
  },

  // --- TOPIC 2: KHÍ LÍ TƯỞNG ---
 {
    id: 'l2.1',
    topic: 'KHÍ LÍ TƯỞNG',
    title: '2.1 Mô hình động học phân tử chất khí',
    theory: `- Chất khí được cấu tạo từ các phân tử có kích thước rất nhỏ so với khoảng cách giữa chúng (được coi là chất điểm).
- Các phân tử khí chuyển động hỗn loạn không ngừng; chuyển động này càng nhanh thì nhiệt độ chất khí càng cao.
- Khi chuyển động hỗn loạn, các phân tử khí va chạm vào thành bình gây ra áp suất lên thành bình.
- Khí lí tưởng: Là khí mà các phân tử chỉ tương tác với nhau khi va chạm và va chạm là hoàn toàn đàn hồi.`,
    theoryImages: [
      'https://i.postimg.cc/B6yHDJFJ/l.png'
    ],
    formulas: '',
    examples: [
      'Chuyển động Brown: Hạt khói chuyển động ziczac do va chạm với các phân tử khí.',
      'Ở điều kiện tiêu chuẩn, các phân tử khí chuyển động với tốc độ trung bình khoảng 400 m/s.',
      'Khi đun nóng khí trong bình kín, các phân tử chuyển động nhanh hơn, va chạm vào thành bình mạnh hơn làm áp suất tăng.'
    ]
  },
  {
    id: 'l2.2',
    topic: 'KHÍ LÍ TƯỞNG',
    title: '2.2 Phương trình trạng thái khí lí tưởng',
    theory: `- Trạng thái của một lượng khí được xác định bởi 3 thông số: Áp suất ($p$), Thể tích ($V$), Nhiệt độ tuyệt đối ($T$).
- *Phương trình trạng thái* biểu diễn mối liên hệ giữa các thông số này.
- Có 2 dạng phương trình thường gặp: Dạng cho quá trình biến đổi trạng thái (định luật Bô-i-lơ và Sác-lơ tổng quát) và Dạng cho một trạng thái xác định (Phương trình Clapeyron).`,
    theoryImages: [
      'https://i.postimg.cc/vBDSbHMs/1529720872321-phuong-trinh-trang-thai-cua-khi-li-tuong.png',
      'https://i.postimg.cc/HnRqf8yj/bai-toan-do-thi-sm.png'
    ],
    formulas: `*1. Cho 2 trạng thái (Lượng khí không đổi):*
$$ \\frac{p_1V_1}{T_1} = \\frac{p_2V_2}{T_2} $$
\n*2. Cho 1 trạng thái (Phương trình Clapeyron):*
$$ pV = nRT = \\frac{m}{M}RT $$
\n*Trong đó:*
- $p$: Áp suất ($Pa$ hoặc $atm$)
- $V$: Thể tích ($m^3$ hoặc $lít$)
- $T$: Nhiệt độ tuyệt đối ($T(K) = t^oC + 273$)
- $n = \\frac{m}{M}$: Số mol khí
- $R$: Hằng số khí lí tưởng
  + Nếu $p(Pa), V(m^3) thì \\approx 8,31 \\, J/mol.K$
  + Nếu $p(atm), V(lít) thì R \\approx 0,082 \\, atm.l/mol.K$`,
    examples: [
      'Bài toán biến đổi trạng thái: Một lượng khí trong xilanh có $V_1, p_1, T_1$. Khi nén nhanh, $V$ giảm, $T$ tăng, tính $p_2$ dùng $\\frac{p_1V_1}{T_1} = \\frac{p_2V_2}{T_2}$.',
      'Bài toán tính lượng khí: Tính khối lượng khí Oxi trong bình dung tích 10 lít, áp suất 10 atm ở 27°C dùng $pV=nRT$.'
    ]
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