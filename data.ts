// src/data.ts
import { Lesson, Question, UserProfile } from './types';

// Mock User (Main user)
export const MOCK_USER: UserProfile = {
  uid: 'user_123',
  name: 'Nguyễn Văn A',
  email: 'hocsinh@roboki.edu.vn',
  class: '12A1',
  school: 'THPT Chuyên Lý Tự Trọng',
  totalScore: 1250,
  practiceScore: 500,
  gameScore: 450,
  challengeScore: 300,
  
  examScore: 0, // 👈 THẦY BỔ SUNG DÒNG NÀY VÀO LÀ HẾT LỖI Ạ
  
  rank: 12
};

// ... (Các phần dưới giữ nguyên)

// =================================================================
// DANH SÁCH BÀI HỌC (PHYSICS_LESSONS) - ĐÃ CẬP NHẬT CHÚ THÍCH ĐẦY ĐỦ
// =================================================================
export const PHYSICS_LESSONS: Lesson[] = [
  // --- TOPIC 1: VẬT LÍ NHIỆT ---
  {
    id: 'l1.1',
    topic: 'VẬT LÍ NHIỆT',
    title: '1.1 Sự chuyển thể',
    theory: '- Sự chuyển thể là quá trình chất chuyển từ trạng thái này sang trạng thái khác (rắn – lỏng – khí) khi có sự trao đổi nhiệt.\n- Quá trình này không làm thay đổi bản chất hóa học của chất.',
    theoryImages: ['https://i.postimg.cc/YqmsSv79/cac-qua-trinh.png'],
    formulas: `- Nhiệt nóng chảy: $$Q = \\lambda m$$
- Nhiệt hóa hơi: $$Q = Lm$$

**Trong đó:**
- $Q$: Nhiệt lượng cần cung cấp ($J$)
- $m$: Khối lượng của chất ($kg$)
- $\\lambda$: Nhiệt nóng chảy riêng ($J/kg$)
- $L$: Nhiệt hóa hơi riêng ($J/kg$)`,
    examples: ['Nước đá ở 0°C đang tan chảy.', 'Khi đun nước đến 100°C, nhiệt độ không tăng nhưng nước vẫn sôi.', 'Cồn bay hơi nhanh hơn nước.']
  },
  {
    id: 'l1.2',
    topic: 'VẬT LÍ NHIỆT',
    title: '1.2 Nội năng – Định luật I nhiệt động lực học',
    theory: '- Nội năng ($U$): Là tổng động năng và thế năng tương tác của các phân tử cấu tạo nên vật.\n- Định luật I: Độ biến thiên nội năng của hệ bằng tổng công và nhiệt lượng mà hệ nhận được.',
    theoryImages: ['https://i.postimg.cc/FRy0qQXh/Screenshot-23.png'],
    formulas: `$$\\Delta U = A + Q$$

**Trong đó:**
- $\\Delta U$: Độ biến thiên nội năng ($J$)
- $A$: Công mà hệ nhận được ($J$). (Quy ước: $A > 0$ hệ nhận công, $A < 0$ hệ thực hiện công)
- $Q$: Nhiệt lượng hệ nhận được ($J$). (Quy ước: $Q > 0$ hệ thu nhiệt, $Q < 0$ hệ tỏa nhiệt)`,
    examples: ['Nén khí trong xilanh: Khí nhận công ($A > 0$).', 'Đun nóng khí: Khí nhận nhiệt ($Q > 0$).']
  },
  {
    id: 'l1.3',
    topic: 'VẬT LÍ NHIỆT',
    title: '1.3 Thang nhiệt độ – Nhiệt kế',
    theory: '- Nhiệt độ là đại lượng vật lí đặc trưng cho mức độ nóng, lạnh của một vật.\n- Các thang nhiệt độ phổ biến: Celsius (°C), Kelvin (K), Fahrenheit (°F).',
    theoryImages: ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Thermometer_scales.svg/569px-Thermometer_scales.svg.png'],
    formulas: `$$ T(K) = t(^oC) + 273 $$
$$ t(^oF) = 1,8t(^oC) + 32 $$

**Trong đó:**
- $T$: Nhiệt độ tuyệt đối theo thang Kelvin ($K$)
- $t(^oC)$: Nhiệt độ theo thang Celsius (độ $C$)
- $t(^oF)$: Nhiệt độ theo thang Fahrenheit (độ $F$)`,
    examples: ['27°C tương ứng với $T = 27 + 273 = 300 K$.', '37°C tương ứng với $t(^oF) = 1,8.37 + 32 = 98,6 ^oF$.']
  },
  {
    id: 'l1.4',
    topic: 'VẬT LÍ NHIỆT',
    title: '1.4 Nhiệt dung riêng',
    theory: '- Nhiệt dung riêng ($c$): Nhiệt lượng cần truyền cho 1 kg chất để nhiệt độ tăng thêm 1 độ.',
    theoryImages: ['https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Heating_Curve_of_Water.png/640px-Heating_Curve_of_Water.png'],
    formulas: `$$ Q = mc\\Delta t $$

**Trong đó:**
- $Q$: Nhiệt lượng thu vào hay tỏa ra ($J$)
- $m$: Khối lượng của vật ($kg$)
- $c$: Nhiệt dung riêng ($J/kg.K$)
- $\\Delta t$: Độ biến thiên nhiệt độ ($^oC$ hoặc $K$)`,
    examples: ['Nhiệt dung riêng của nước là 4200 J/kg.K.', 'Để đun 1kg nước tăng 1 độ cần 4200 J.']
  },

  // --- TOPIC 2: KHÍ LÍ TƯỞNG ---
  {
    id: 'l2.1',
    topic: 'KHÍ LÍ TƯỞNG',
    title: '2.1 Mô hình động học phân tử chất khí',
    theory: '- Chất khí gồm các phân tử rất nhỏ, chuyển động hỗn loạn không ngừng.\n- Khí lí tưởng: Coi phân tử là chất điểm, chỉ tương tác khi va chạm.',
    theoryImages: ['https://i.postimg.cc/B6yHDJFJ/l.png'],
    formulas: `$$ n = \\frac{N}{N_A} = \\frac{m}{M} $$
    
**Trong đó:**
- $n$: Số mol khí ($mol$)
- $N$: Số lượng phân tử khí ($hạt$)
- $N_A$: Số Avogadro ($6,02.10^{23} hạt/mol$)
- $m$: Khối lượng khí ($g$)
- $M$: Khối lượng mol ($g/mol$)`,
    examples: ['1 mol khí ở điều kiện chuẩn có thể tích 22,4 lít.', 'Chuyển động Brown của hạt phấn hoa.']
  },
  {
    id: 'l2.2',
    topic: 'KHÍ LÍ TƯỞNG',
    title: '2.2 Phương trình trạng thái khí lí tưởng',
    theory: '- Liên hệ giữa Áp suất ($p$), Thể tích ($V$), Nhiệt độ ($T$) của một lượng khí xác định.',
    theoryImages: ['https://i.postimg.cc/vBDSbHMs/1529720872321-phuong-trinh-trang-thai-cua-khi-li-tuong.png', 'https://i.postimg.cc/HnRqf8yj/bai-toan-do-thi-sm.png'],
    formulas: `*1. Phương trình Clapeyron:*
$$ pV = nRT $$

*2. Quá trình biến đổi trạng thái (Lượng khí không đổi):*
$$ \\frac{p_1V_1}{T_1} = \\frac{p_2V_2}{T_2} $$

**Trong đó:**
- $p$: Áp suất ($Pa, atm, mmHg...$)
- $V$: Thể tích ($m^3, lít...$)
- $T$: Nhiệt độ tuyệt đối ($K$)
- $n$: Số mol khí ($mol$)
- $R$: Hằng số khí lí tưởng ($R \\approx 8,31 \\, J/mol.K$)`,
    examples: ['Định luật Boyle (Đẳng nhiệt): $p_1V_1 = p_2V_2$.', 'Định luật Charles (Đẳng áp): $\\frac{V_1}{T_1} = \\frac{V_2}{T_2}$.']
  },
  {
    id: 'l2.3',
    topic: 'KHÍ LÍ TƯỞNG',
    title: '2.3 Áp suất khí theo mô hình động học',
    theory: '- Áp suất khí gây ra bởi lực va chạm của các phân tử lên thành bình.',
    theoryImages: ['https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Kinetic_theory_of_gases_pressure.svg/440px-Kinetic_theory_of_gases_pressure.svg.png'],
    formulas: `$$ p = \\frac{1}{3} \\mu m \\overline{v^2} $$
$$ p = \\frac{2}{3} \\mu \\overline{E_d} $$

**Trong đó:**
- $p$: Áp suất chất khí ($Pa$)
- $\\mu$: Mật độ phân tử ($\\frac{N}{V}$) ($hạt/m^3$)
- $m$: Khối lượng một phân tử ($kg$)
- $\\overline{v^2}$: Trung bình của bình phương tốc độ ($m^2/s^2$)
- $\\overline{E_d}$: Động năng tịnh tiến trung bình ($J$)`,
    examples: ['Mật độ tăng gấp đôi -> Áp suất tăng gấp đôi.', 'Nhiệt độ tăng -> Động năng tăng -> Áp suất tăng.']
  },
  {
    id: 'l2.4',
    topic: 'KHÍ LÍ TƯỞNG',
    title: '2.4 Động năng phân tử',
    theory: '- Nhiệt độ là số đo động năng trung bình của chuyển động nhiệt của phân tử.',
    theoryImages: ['https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Translational_motion.gif/300px-Translational_motion.gif'],
    formulas: `$$ \\overline{E_d} = \\frac{3}{2}kT $$

**Trong đó:**
- $\\overline{E_d}$: Động năng trung bình của phân tử ($J$)
- $k$: Hằng số Boltzmann ($1,38.10^{-23} J/K$)
- $T$: Nhiệt độ tuyệt đối ($K$)`,
    examples: ['Ở cùng nhiệt độ, mọi chất khí đều có động năng trung bình bằng nhau.', 'T tăng 4 lần thì tốc độ trung bình tăng 2 lần.']
  },

  // --- TOPIC 3: TỪ TRƯỜNG ---
  {
    id: 'l3.1',
    topic: 'TỪ TRƯỜNG',
    title: '3.1 Khái niệm từ trường',
    theory: '- Từ trường tồn tại xung quanh nam châm hoặc dòng điện.\n- Đặc trưng bởi vectơ cảm ứng từ $\\vec{B}$.',
    theoryImages: ['https://i.postimg.cc/bYn8MMfR/ly-thuyet-bai-14-tu-truong-229486.png'],
    formulas: `(Chưa có công thức định lượng ở bài này, chủ yếu là định tính về đường sức từ và vectơ $\\vec{B}$)`,
    examples: ['Kim nam châm bị lệch khi đặt gần dòng điện.', 'Quy tắc nắm tay phải xác định chiều đường sức từ.']
  },
  {
    id: 'l3.2',
    topic: 'TỪ TRƯỜNG',
    title: '3.2 Lực từ (Định luật Am-pe)',
    theory: '- Lực từ tác dụng lên đoạn dây dẫn mang dòng điện đặt trong từ trường.',
    theoryImages: ['https://i.postimg.cc/pd34JWrv/luc-tu-tac-dung-len-doan-day-dan-thang-4.pngg'],
    formulas: `$$ F = B.I.L.\\sin\\alpha $$

**Trong đó:**
- $F$: Lực từ ($N$)
- $B$: Cảm ứng từ ($T$)
- $I$: Cường độ dòng điện ($A$)
- $L$: Chiều dài đoạn dây trong từ trường ($m$)
- $\\alpha$: Góc hợp bởi dòng điện $\\vec{I}$ và từ trường $\\vec{B}$`,
    examples: ['Dây đặt song song đường sức từ ($\\alpha=0$) thì $F=0$.', 'Dây đặt vuông góc ($\\alpha=90^o$) thì $F_{max}=BIL$.']
  },
  {
    id: 'l3.3',
    topic: 'TỪ TRƯỜNG',
    title: '3.3 Từ thông & Cảm ứng điện từ',
    theory: '- Từ thông: Số đường sức từ xuyên qua diện tích S.\n- Hiện tượng cảm ứng điện từ: Sinh ra dòng điện khi từ thông biến thiên.',
    theoryImages: ['https://i.postimg.cc/L8KJwfWL/c4d8-tu-thong-10.jpg'],
    formulas: `$$ \\Phi = N B S \\cos\\alpha $$
$$ |e_{cu}| = \\left| \\frac{\\Delta \\Phi}{\\Delta t} \\right| $$

**Trong đó:**
- $\\Phi$: Từ thông ($Wb$ - Vêbe)
- $N$: Số vòng dây
- $S$: Diện tích khung dây ($m^2$)
- $\\alpha$: Góc hợp bởi vectơ pháp tuyến $\\vec{n}$ và $\\vec{B}$
- $e_{cu}$: Suất điện động cảm ứng ($V$)
- $\\frac{\\Delta \\Phi}{\\Delta t}$: Tốc độ biến thiên từ thông ($Wb/s$)`,
    examples: ['Định luật Len-xơ: Dòng điện cảm ứng chống lại nguyên nhân sinh ra nó.']
  },

  // --- TOPIC 4: HẠT NHÂN & PHÓNG XẠ ---
  {
    id: 'l4.1',
    topic: 'HẠT NHÂN & PHÓNG XẠ',
    title: '4.1 Cấu trúc hạt nhân',
    theory: '- Hạt nhân gồm proton ($p$) và nơtron ($n$).\n- Kí hiệu: $^{A}_{Z}X$.',
    theoryImages: ['https://i.postimg.cc/m2bLHwKn/ss.png'],
    formulas: `$$ A = Z + N $$
$$ R = 1,2.10^{-15}.A^{1/3} $$

**Trong đó:**
- $Z$: Số proton (nguyên tử số)
- $N$: Số nơtron
- $A$: Số khối (tổng số nuclôn)
- $R$: Bán kính hạt nhân ($m$)`,
    examples: ['Hạt nhân $^{27}_{13}Al$ có 13 proton và 14 nơtron.']
  },
  {
    id: 'l4.2',
    topic: 'HẠT NHÂN & PHÓNG XẠ',
    title: '4.2 Năng lượng liên kết',
    theory: '- Độ hụt khối $\\Delta m$: Chênh lệch giữa tổng khối lượng các nuclôn và khối lượng hạt nhân.',
    theoryImages: ['https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Binding_energy_curve_-_common_isotopes.svg/800px-Binding_energy_curve_-_common_isotopes.svg.png'],
    formulas: `$$ \\Delta m = Z m_p + (A-Z) m_n - m_X $$
$$ W_{lk} = \\Delta m . c^2 $$

**Trong đó:**
- $\\Delta m$: Độ hụt khối ($u$ hoặc $kg$)
- $W_{lk}$: Năng lượng liên kết ($J$ hoặc $MeV$)
- $1u \\approx 931,5 MeV/c^2$`,
    examples: ['Năng lượng liên kết riêng $W_{lkr} = W_{lk}/A$ càng lớn, hạt nhân càng bền.']
  },
  {
    id: 'l4.3',
    topic: 'HẠT NHÂN & PHÓNG XẠ',
    title: '4.3 Phóng xạ',
    theory: '- Quá trình phân rã tự phát của hạt nhân không bền.\n- Định luật phóng xạ: Số lượng hạt nhân giảm theo hàm mũ.',
    theoryImages: ['https://i.postimg.cc/Y2PR4n4t/phong-xa-la-gi-2.png'],
    formulas: `$$ N = N_0 . 2^{-\\frac{t}{T}} $$
$$ m = m_0 . 2^{-\\frac{t}{T}} $$

**Trong đó:**
- $N, m$: Số hạt/khối lượng còn lại
- $N_0, m_0$: Số hạt/khối lượng ban đầu
- $t$: Thời gian phân rã
- $T$: Chu kì bán rã`,
    examples: ['Sau thời gian $t=T$ (1 chu kì), lượng chất còn lại 50%.', 'Sau $t=2T$, lượng chất còn lại 25%.']
  }
];

// =================================================================
// NGÂN HÀNG CÂU HỎI (QUESTION_BANK) - ĐÃ CẬP NHẬT LATEX CHO ĐỀ & ĐÁP ÁN
// =================================================================
// =================================================================
// CÔNG CỤ TỰ ĐỘNG SINH MÃ CÂU HỎI (AUTO-ID GENERATOR)
// =================================================================

// 1. Định nghĩa kiểu dữ liệu đầu vào (Bỏ trường 'id' vì máy sẽ tự tạo)
type QuestionInput = Omit<Question, 'id'>;

// 2. Nhập dữ liệu thô (RAW_DATA) - Thầy nhập câu hỏi vào đây, KHÔNG CẦN GHI ID
const RAW_DATA: QuestionInput[] = [
  // -----------------------------------------------------------------
  // CHƯƠNG 1: VẬT LÍ NHIỆT
  // -----------------------------------------------------------------

  // --- BÀI 1.1: SỰ CHUYỂN THỂ ---
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Biết', type: 'MCQ',
    promptText: 'Quá trình chuyển từ thể lỏng sang thể khí ở bề mặt chất lỏng gọi là gì?',
    imageUrl: '', options: ['Sự nóng chảy', 'Sự đông đặc', 'Sự bay hơi', 'Sự ngưng tụ'],
    answerKey: 'Sự bay hơi', explanationText: 'Sự chuyển từ thể lỏng sang thể khí (hơi) xảy ra ở bề mặt chất lỏng gọi là sự bay hơi.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Biết', type: 'MCQ',
    promptText: 'Công thức tính nhiệt lượng cần cung cấp để làm nóng chảy hoàn toàn một khối lượng $m$ chất rắn ở nhiệt độ nóng chảy là:',
    imageUrl: '', options: ['$Q = mc\\Delta t$', '$Q = \\lambda m$', '$Q = Lm$', '$Q = qm$'],
    answerKey: '$Q = \\lambda m$', explanationText: 'Công thức tính nhiệt nóng chảy là $Q = \\lambda m$.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Hiểu', type: 'MCQ',
    promptText: 'Tại sao khi nước đang sôi ở áp suất tiêu chuẩn, mặc dù tiếp tục cấp nhiệt nhưng nhiệt độ của nước không tăng?',
    imageUrl: '',
    options: ['Vì nhiệt lượng bị thất thoát hết.', 'Vì nước đã đạt nhiệt độ tới hạn.', 'Vì nhiệt lượng dùng để phá vỡ liên kết phân tử.', 'Vì động năng phân tử giảm.'],
    answerKey: 'Vì nhiệt lượng dùng để phá vỡ liên kết phân tử.',
    explanationText: 'Nhiệt lượng dùng để tăng thế năng, phá vỡ liên kết để chuyển sang thể khí, không làm tăng động năng (nhiệt độ).'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Hiểu', type: 'MCQ',
    promptText: 'Điều nào sau đây là **SAI** khi nói về sự bay hơi?',
    imageUrl: '', options: ['Xảy ra ở mọi nhiệt độ.', 'Tốc độ phụ thuộc diện tích mặt thoáng.', 'Là quá trình toả nhiệt.', 'Gió càng mạnh bay hơi càng nhanh.'],
    answerKey: 'Là quá trình toả nhiệt.', explanationText: 'Sự bay hơi là quá trình thu nhiệt (làm lạnh môi trường xung quanh).'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Vận dụng', type: 'MCQ',
    promptText: 'Biết nhiệt nóng chảy riêng của nước đá là $\\lambda = 3,34.10^5 J/kg$. Nhiệt lượng cần thiết để làm nóng chảy hoàn toàn $2 kg$ nước đá ở $0^oC$ là:',
    imageUrl: '', options: ['$1,67.10^5 J$', '$6,68.10^5 J$', '$3,34.10^5 J$', '$13,36.10^5 J$'],
    answerKey: '$6,68.10^5 J$', explanationText: '$Q = \\lambda m = 3,34.10^5 . 2 = 6,68.10^5 J$.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Vận dụng', type: 'MCQ',
    promptText: 'Để làm hóa hơi hoàn toàn $0,5 kg$ nước ở $100^oC$ cần $1,13.10^6 J$. Nhiệt hóa hơi riêng của nước là:',
    imageUrl: '', options: ['$2,26.10^6 J/kg$', '$0,56.10^6 J/kg$', '$1,13.10^6 J/kg$', '$4,52.10^6 J/kg$'],
    answerKey: '$2,26.10^6 J/kg$', explanationText: '$L = \\frac{Q}{m} = \\frac{1,13.10^6}{0,5} = 2,26.10^6 J/kg$.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Vận dụng', type: 'TrueFalse',
    promptText: 'Cho đồ thị biểu diễn sự thay đổi nhiệt độ theo thời gian của chất rắn kết tinh X (có khối lượng m) được đun nóng bằng nguồn nhiệt ổn định (Hình bên).',
    imageUrl: 'https://i.postimg.cc/rpCgKxb1/DO-THI-1.png',
    subQuestions: [
      { id: 'sq1', content: 'Ở nhiệt độ 80°C chất rắn này bắt đầu nóng chảy.', isCorrect: true, explanation: 'Quan sát đồ thị, đoạn nằm ngang đầu tiên ứng với quá trình nóng chảy diễn ra ở nhiệt độ không đổi là 80°C.' },
      { id: 'sq2', content: 'Thời gian nóng chảy của chất rắn là 4 phút.', isCorrect: false, explanation: 'Quan sát trên trục thời gian, khoảng thời gian diễn ra quá trình nóng chảy (đoạn nằm ngang 80°C) có độ dài khác 4 phút (ví dụ từ phút thứ 2 đến phút thứ 4 là 2 phút).' },
      { id: 'sq3', content: 'Sự đông đặc bắt đầu vào phút thứ 13.', isCorrect: true, explanation: 'Quá trình làm nguội bắt đầu từ phút thứ 11, nhiệt độ giảm dần. Đến phút thứ 13, nhiệt độ bắt đầu không đổi (đoạn nằm ngang thứ 2), đây là thời điểm bắt đầu đông đặc.' },
      { id: 'sq4', content: 'Thời gian đông đặc kéo dài 10 phút.', isCorrect: false, explanation: 'Quan sát đoạn nằm ngang ứng với quá trình đông đặc (bắt đầu từ phút 13). Khoảng thời gian này không phải là 10 phút (thường ngắn hơn trên các dạng đồ thị này, ví dụ kết thúc ở phút 18 thì chỉ là 5 phút).' }
    ],
    answerKey: '', explanationText: 'Phân tích đồ thị chuyển thể.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Vận dụng', type: 'TrueFalse',
    promptText: 'Đồ thị Hình 1.3 biểu diễn sự thay đổi nhiệt độ của nước theo thời gian. Thời gian AB=40p, BC=60p, CD=30p.',
    imageUrl: 'https://i.postimg.cc/BQfxszYD/do_thi_4.jpg',
    subQuestions: [
      { id: 'sq1', content: 'Nhiệt độ sôi của nước là 100°C.', isCorrect: true, explanation: 'Đoạn BC nhiệt độ không đổi 100°C.' },
      { id: 'sq2', content: 'Đoạn AB, tốc độ tăng nhiệt là 2°C/phút.', isCorrect: true, explanation: '$\\frac{100-20}{40} = 2^oC/phút$.' },
      { id: 'sq3', content: 'Tổng thời gian quá trình là 130 phút.', isCorrect: true, explanation: '40 + 60 + 30 = 130 phút.' },
      { id: 'sq4', content: 'Đoạn CD, tốc độ giảm nhiệt là 1°C/phút.', isCorrect: false, explanation: '$\\frac{100-40}{30} = 2^oC/phút$.' }
    ],
    answerKey: '', explanationText: 'Phân tích đồ thị nhiệt độ - thời gian.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Hiểu', type: 'Short',
    promptText: 'Ở áp suất tiêu chuẩn, nước sôi ở bao nhiêu độ C?',
    imageUrl: '', answerKey: '100', explanationText: '100°C.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Vận dụng', type: 'Short',
    promptText: 'Biết $\\lambda = 3,34.10^5 J/kg$. Cần bao nhiêu kJ để làm tan $2kg$ nước đá $0^oC$?',
    imageUrl: '', answerKey: '668', explanationText: '$Q = 2 . 3,34.10^5 = 668 kJ$.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Vận dụng', type: 'Short',
    promptText: 'Biết $L = 2,26.10^6 J/kg$. Để hóa hơi $0,5kg$ nước ở $100^oC$ cần bao nhiêu MJ?',
    imageUrl: '', answerKey: '1.13', explanationText: '$Q = 0,5 . 2,26.10^6 = 1,13 MJ$.'
  },

  // --- BÀI 1.2: NỘI NĂNG ---
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.2', level: 'Biết', type: 'MCQ',
    promptText: 'Theo định luật I NĐLH, độ biến thiên nội năng $\\Delta U$ bằng:',
    imageUrl: '', options: ['Tổng công và nhiệt lượng hệ nhận được.', 'Hiệu công và nhiệt lượng.', 'Tích công và nhiệt lượng.', 'Thương công và nhiệt lượng.'],
    answerKey: 'Tổng công và nhiệt lượng hệ nhận được.', explanationText: '$\\Delta U = A + Q$.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.2', level: 'Biết', type: 'MCQ',
    promptText: 'Trong hệ thức $\\Delta U = A + Q$, quy ước dấu nào đúng?',
    imageUrl: '', options: ['$A > 0$: Hệ thực hiện công.', '$Q > 0$: Hệ tỏa nhiệt.', '$A < 0$: Hệ nhận công.', '$Q > 0$: Hệ nhận nhiệt.'],
    answerKey: '$Q > 0$: Hệ nhận nhiệt.', explanationText: '$Q > 0$: Hệ thu nhiệt; $Q < 0$: Hệ tỏa nhiệt.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.2', level: 'Hiểu', type: 'MCQ',
    promptText: 'Trường hợp nào làm biến đổi nội năng không do thực hiện công?',
    imageUrl: '', options: ['Cọ xát miếng kim loại.', 'Nén khí trong xilanh.', 'Nung nóng vật.', 'Khuấy nước.'],
    answerKey: 'Nung nóng vật.', explanationText: 'Nung nóng là quá trình truyền nhiệt.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.2', level: 'Hiểu', type: 'MCQ',
    promptText: 'Nén khí đẳng nhiệt. Phát biểu nào đúng?',
    imageUrl: '', options: ['$\\Delta U = 0, Q = -A$', '$\\Delta U > 0$', '$\\Delta U < 0$', '$Q = A$'],
    answerKey: '$\\Delta U = 0, Q = -A$', explanationText: 'Đẳng nhiệt $\\Delta U=0$. Nén khí $A>0 \\Rightarrow Q = -A < 0$ (tỏa nhiệt).'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.2', level: 'Vận dụng', type: 'MCQ',
    promptText: 'Thực hiện công $100 J$ nén khí, khí truyền ra môi trường $20 J$. Độ biến thiên nội năng là:',
    imageUrl: '', options: ['$80 J$', '$120 J$', '$-80 J$', '$-120 J$'],
    answerKey: '$80 J$', explanationText: '$A=100, Q=-20 \\Rightarrow \\Delta U = 100 - 20 = 80 J$.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.2', level: 'Vận dụng', type: 'MCQ',
    promptText: 'Khí nhận nhiệt $150 kJ$, giãn nở thực hiện công $100 kJ$. Nội năng thay đổi thế nào?',
    imageUrl: '', options: ['Tăng $250 kJ$', 'Giảm $50 kJ$', 'Tăng $50 kJ$', 'Giảm $250 kJ$'],
    answerKey: 'Tăng $50 kJ$', explanationText: '$Q=150, A=-100 \\Rightarrow \\Delta U = 50 kJ$.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.2', level: 'Vận dụng', type: 'TrueFalse',
    promptText: 'Một lượng khí lí tưởng được đựng trong xilanh kín. Người ta thực hiện công A = 100 J để nén khí, đồng thời khí truyền nhiệt lượng Q = 20 J ra môi trường bên ngoài.',
    imageUrl: '',
    subQuestions: [
      { id: 'sq1', content: 'Nội năng của khí là tổng động năng và thế năng của các phân tử cấu tạo nên khí.', isCorrect: true, explanation: 'Đây là định nghĩa nội năng.' },
      { id: 'sq2', content: 'Theo quy ước dấu của định luật I, khí truyền nhiệt thì Q > 0.', isCorrect: false, explanation: 'Hệ truyền nhiệt (tỏa nhiệt) thì $Q < 0$.' },
      { id: 'sq3', content: 'Trong quá trình nén khí này, khoảng cách trung bình giữa các phân tử giảm đi.', isCorrect: true, explanation: 'Nén khí -> Thể tích giảm -> Mật độ tăng -> Khoảng cách giảm.' },
      { id: 'sq4', content: 'Độ biến thiên nội năng của lượng khí này là 120 J.', isCorrect: false, explanation: 'A = +100J (nhận công), Q = -20J (tỏa nhiệt). $\\Delta U = A + Q = 100 - 20 = 80 J$.' }
    ],
    answerKey: '', explanationText: 'Áp dụng $\\Delta U = A + Q$ với quy ước dấu.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.2', level: 'Hiểu', type: 'Short',
    promptText: 'Quá trình đẳng tích, khí không thực hiện công. Độ biến thiên nội năng $\\Delta U$ bằng đại lượng nào?',
    imageUrl: '', answerKey: 'Q', explanationText: '$A=0 \\Rightarrow \\Delta U = Q$.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.2', level: 'Vận dụng', type: 'Short',
    promptText: 'Công nén $150 J$, tỏa nhiệt $100 J$. Độ biến thiên nội năng là bao nhiêu J?',
    imageUrl: '', answerKey: '50', explanationText: '150 - 100 = 50 J.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.2', level: 'Vận dụng', type: 'Short',
    promptText: 'Nhận nhiệt $200 J$, thực hiện công $120 J$. Nội năng tăng bao nhiêu J?',
    imageUrl: '', answerKey: '80', explanationText: '200 - 120 = 80 J.'
  },

  // --- BÀI 1.3: NHIỆT ĐỘ ---
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.3', level: 'Biết', type: 'MCQ',
    promptText: 'Đơn vị đo nhiệt độ trong hệ SI là:',
    imageUrl: '', options: ['Độ Celsius ($^oC$)', 'Độ Fahrenheit ($^oF$)', 'Kelvin ($K$)', 'Joule ($J$)'],
    answerKey: 'Kelvin ($K$)', explanationText: 'Kelvin là đơn vị chuẩn SI.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.3', level: 'Biết', type: 'MCQ',
    promptText: 'Độ không tuyệt đối ($0 K$) tương ứng với bao nhiêu độ C?',
    imageUrl: '', options: ['$0^oC$', '$273^oC$', '$-273^oC$', '$100^oC$'],
    answerKey: '$-273^oC$', explanationText: '$t = T - 273 = 0 - 273 = -273^oC$.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.3', level: 'Hiểu', type: 'MCQ',
    promptText: 'Phát biểu đúng về cân bằng nhiệt:',
    imageUrl: '', options: ['Nhiệt độ bằng nhau thì không truyền nhiệt.', 'Truyền từ nội năng lớn sang nhỏ.', 'Nội năng bằng nhau.', 'Truyền từ khối lượng lớn sang nhỏ.'],
    answerKey: 'Nhiệt độ bằng nhau thì không truyền nhiệt.', explanationText: 'Điều kiện cân bằng nhiệt là nhiệt độ bằng nhau.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.3', level: 'Hiểu', type: 'MCQ',
    promptText: 'Tại sao không thể đạt nhiệt độ thấp hơn $0 K$?',
    imageUrl: '', options: ['Nước đóng băng.', 'Động năng phân tử bằng 0.', 'Không đo được.', 'Áp suất bằng 0.'],
    answerKey: 'Động năng phân tử bằng 0.', explanationText: 'Nhiệt độ tỉ lệ với động năng. Động năng không thể âm.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.3', level: 'Vận dụng', type: 'MCQ',
    promptText: 'Nhiệt độ cơ thể người là $37^oC$. Giá trị này trong thang Kelvin là:',
    imageUrl: '', options: ['$37 K$', '$300 K$', '$310 K$', '$236 K$'],
    answerKey: '$310 K$', explanationText: '$T = 37 + 273 = 310 K$.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.3', level: 'Vận dụng', type: 'MCQ',
    promptText: 'Một vật ở $300 K$, làm lạnh để nhiệt độ giảm đi $20^oC$. Nhiệt độ sau cùng theo thang Kelvin là:',
    imageUrl: '', options: ['$280 K$', '$293 K$', '$320 K$', '$553 K$'],
    answerKey: '$280 K$', explanationText: 'Giảm $20^oC$ cũng là giảm $20 K$. $300 - 20 = 280 K$.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.3', level: 'Vận dụng', type: 'TrueFalse',
    promptText: 'Xét hai vật A và B tiếp xúc nhau. Vật A có nhiệt độ 25°C, vật B có nhiệt độ 300 K.',
    imageUrl: '',
    subQuestions: [
      { id: 'sq1', content: 'Nhiệt độ là đại lượng đặc trưng cho độ nóng lạnh của vật.', isCorrect: true, explanation: 'Khái niệm cơ bản về nhiệt độ.' },
      { id: 'sq2', content: 'Trong thang Kelvin, độ không tuyệt đối có giá trị bằng -273 K.', isCorrect: false, explanation: 'Độ không tuyệt đối là 0 K (tương ứng -273°C).' },
      { id: 'sq3', content: 'Nhiệt lượng sẽ tự truyền từ vật A sang vật B.', isCorrect: false, explanation: 'Đổi A ra K: $25 + 273 = 298 K$. Vật B (300 K) nóng hơn vật A (298 K), nên nhiệt truyền từ B sang A.' },
      { id: 'sq4', content: 'Độ chênh lệch nhiệt độ giữa hai vật là 2 K.', isCorrect: true, explanation: '$\\Delta T = |300 - 298| = 2 K$.' }
    ],
    answerKey: '', explanationText: 'So sánh nhiệt độ cần đưa về cùng một thang đo.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.3', level: 'Hiểu', type: 'Short',
    promptText: '$0 K$ bằng bao nhiêu độ C?',
    imageUrl: '', answerKey: '-273', explanationText: '-273.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.3', level: 'Hiểu', type: 'Short',
    promptText: 'Nhiệt độ nước đá đang tan ($0^oC$) là bao nhiêu K?',
    imageUrl: '', answerKey: '273', explanationText: '273 K.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.3', level: 'Vận dụng', type: 'Short',
    promptText: '$30^oC$ bằng bao nhiêu K?',
    imageUrl: '', answerKey: '303', explanationText: '30 + 273 = 303.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.3', level: 'Vận dụng', type: 'Short',
    promptText: 'Nóng lên thêm $50^oC$ thì nhiệt độ tăng thêm bao nhiêu K?',
    imageUrl: '', answerKey: '50', explanationText: 'Độ biến thiên nhiệt độ như nhau.'
  },

  // --- BÀI 1.4: NHIỆT DUNG RIÊNG ---
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.4', level: 'Biết', type: 'MCQ',
    promptText: 'Đơn vị của nhiệt dung riêng là:',
    imageUrl: '', options: ['$J/kg$', '$J/kg.K$', '$J.kg/K$', '$K/kg.J$'],
    answerKey: '$J/kg.K$', explanationText: 'Đơn vị chuẩn $J/(kg.K)$.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.4', level: 'Biết', type: 'MCQ',
    promptText: 'Công thức tính nhiệt lượng thu vào để tăng nhiệt độ:',
    imageUrl: '', options: ['$Q = mc\\Delta t$', '$Q = \\frac{m}{c}\\Delta t$', '$Q = \\frac{c}{m}\\Delta t$', '$Q = \\frac{mc}{\\Delta t}$'],
    answerKey: '$Q = mc\\Delta t$', explanationText: '$Q = mc\\Delta t$.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.4', level: 'Hiểu', type: 'MCQ',
    promptText: 'Nhiệt dung riêng của nước $c = 4200 J/kg.K$ có nghĩa là:',
    imageUrl: '', options: ['Làm sôi 1kg nước cần 4200J.', '1kg nước tăng 1K cần 4200J.', '1kg nước bay hơi tỏa 4200J.', '1kg nước hóa hơi cần 4200J.'],
    answerKey: '1kg nước tăng 1K cần 4200J.', explanationText: 'Định nghĩa nhiệt dung riêng.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.4', level: 'Hiểu', type: 'MCQ',
    promptText: 'Tại sao ban ngày thường có gió thổi từ biển vào đất liền?',
    imageUrl: '', options: ['Nước biển có nhiệt dung riêng lớn hơn đất.', 'Nước biển có nhiệt dung riêng nhỏ hơn đất.', 'Gió thổi từ thấp lên cao.', 'Sóng biển đẩy gió vào.'],
    answerKey: 'Nước biển có nhiệt dung riêng lớn hơn đất.', explanationText: 'Đất nóng nhanh hơn nước -> không khí trên đất nóng bay lên (áp thấp) -> gió biển (áp cao) thổi vào.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.4', level: 'Vận dụng', type: 'MCQ',
    promptText: 'Cần nhiệt lượng bao nhiêu để đun $5$ lít nước từ $20^oC$ lên $100^oC$? Cho $c = 4200 J/kg.K$.',
    imageUrl: '', options: ['$1680 kJ$', '$336 kJ$', '$16800 J$', '$840 kJ$'],
    answerKey: '$1680 kJ$', explanationText: '$m=5kg, \\Delta t=80$. $Q = 5 . 4200 . 80 = 1680000 J = 1680 kJ$.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.4', level: 'Vận dụng', type: 'MCQ',
    promptText: 'Ấm nhôm $0,5kg$ chứa $1,5$ lít nước ở $25^oC$. Tính nhiệt lượng để đun sôi. ($c_{Al}=880, c_{nuoc}=4200$).',
    imageUrl: '', options: ['$505,5 kJ$', '$472,5 kJ$', '$33,0 kJ$', '$439,5 kJ$'],
    answerKey: '$505,5 kJ$', explanationText: '$Q = (0,5.880 + 1,5.4200).(100-25) = 505500 J$.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.4', level: 'Vận dụng', type: 'TrueFalse',
    promptText: 'Để đun sôi 2 lít nước (khối lượng 2kg) từ 20°C, người ta cung cấp nhiệt lượng. Biết nhiệt dung riêng của nước là c = 4200 J/kg.K.',
    imageUrl: '',
    subQuestions: [
      { id: 'sq1', content: 'Nhiệt dung riêng của một chất cho biết nhiệt lượng cần thiết để làm tăng nhiệt độ của 1kg chất đó thêm 1 độ.', isCorrect: true, explanation: 'Định nghĩa nhiệt dung riêng.' },
      { id: 'sq2', content: 'Đơn vị của nhiệt dung riêng là J/kg.', isCorrect: false, explanation: 'Đơn vị đúng là J/kg.K.' },
      { id: 'sq3', content: 'Nước có nhiệt dung riêng lớn nên nó nóng lên rất nhanh và nguội đi rất nhanh so với các chất khác.', isCorrect: false, explanation: 'Nhiệt dung riêng lớn nghĩa là khó nóng và khó nguội (điều hòa nhiệt tốt).' },
      { id: 'sq4', content: 'Nhiệt lượng cần cung cấp để nước sôi (100°C) là 672 kJ.', isCorrect: true, explanation: '$Q = mc\\Delta t = 2 . 4200 . (100 - 20) = 672,000 J = 672 kJ$.' }
    ],
    answerKey: '', explanationText: 'Tính toán nhiệt lượng $Q = mc\\Delta t$.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.4', level: 'Hiểu', type: 'Short',
    promptText: 'Nhiệt dung riêng $c=4200$. Để $1kg$ tăng $1K$ cần bao nhiêu J?',
    imageUrl: '', answerKey: '4200', explanationText: '4200 J.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.4', level: 'Vận dụng', type: 'Short',
    promptText: 'Đun $5kg$ nhôm từ $20^oC$ lên $100^oC$ ($c=880$). Cần bao nhiêu kJ?',
    imageUrl: '', answerKey: '352', explanationText: '$5 . 880 . 80 = 352000 J = 352 kJ$.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.4', level: 'Vận dụng', type: 'Short',
    promptText: 'Cung cấp $8400J$ cho $2kg$ chất lỏng thì tăng $2^oC$. Nhiệt dung riêng là bao nhiêu Jun?',
    imageUrl: '', answerKey: '2100', explanationText: '$8400 / (2.2) = 2100$.'
  },

  // -----------------------------------------------------------------
  // CHƯƠNG 2: KHÍ LÍ TƯỞNG
  // -----------------------------------------------------------------

  // --- BÀI 2.1: MÔ HÌNH ĐỘNG HỌC ---
  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.1', level: 'Biết', type: 'MCQ',
    promptText: 'Trong mô hình khí lí tưởng, các phân tử được coi là:',
    imageUrl: '', options: ['Chất điểm, tương tác mạnh.', 'Chất điểm, chỉ tương tác khi va chạm.', 'Quả cầu rắn.', 'Hạt kích thước lớn.'],
    answerKey: 'Chất điểm, chỉ tương tác khi va chạm.', explanationText: 'Bỏ qua tương tác xa.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.1', level: 'Vận dụng', type: 'TrueFalse',
    promptText: 'Xét một lượng khí chứa trong bình kín. Theo thuyết động học phân tử chất khí:',
    imageUrl: '',
    subQuestions: [
      { id: 'sq1', content: 'Các phân tử khí chuyển động hỗn loạn không ngừng.', isCorrect: true, explanation: 'Tính chất cơ bản của chuyển động nhiệt.' },
      { id: 'sq2', content: 'Các phân tử khí sắp xếp một cách trật tự và chặt chẽ.', isCorrect: false, explanation: 'Đó là cấu trúc chất rắn. Chất khí hỗn loạn.' },
      { id: 'sq3', content: 'Khi nhiệt độ tăng, tốc độ chuyển động trung bình của các phân tử khí tăng lên.', isCorrect: true, explanation: 'Nhiệt độ tỉ lệ thuận với động năng trung bình.' },
      { id: 'sq4', content: 'Nếu bình chứa 1 mol khí ở điều kiện tiêu chuẩn thì số lượng phân tử khí trong bình là $6,02.10^{23}$ hạt.', isCorrect: true, explanation: '1 mol chứa $N_A$ hạt.' }
    ],
    answerKey: '', explanationText: 'Các nội dung cơ bản của thuyết động học phân tử.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.1', level: 'Vận dụng', type: 'TrueFalse',
    promptText: 'Dựa vào hiện tượng chuyển động Brown của các hạt phấn hoa trong nước, hãy cho biết các nhận định sau là đúng hay sai:',
    imageUrl: 'https://i.postimg.cc/2yVv9F3b/do_thi_3.png',
    subQuestions: [
      { id: 'sq1', content: 'Chuyển động không ngừng và hỗn loạn của các hạt phấn hoa trong nước là bằng chứng cho thấy các phân tử nước luôn chuyển động.', isCorrect: true, explanation: 'Hạt phấn hoa chuyển động do các phân tử nước va chạm ngẫu nhiên từ mọi phía.' },
      { id: 'sq2', content: 'Hạt phấn hoa tự chuyển động vì chúng có năng lượng bên trong và không chịu tác động của môi trường xung quanh.', isCorrect: false, explanation: 'Hạt phấn hoa không tự có năng lượng chuyển động; chuyển động là do va chạm của các phân tử nước.' },
      { id: 'sq3', content: 'Nếu làm thí nghiệm chuyển động Brown trong nước nóng và nước lạnh thì hạt phấn hoa trong nước nóng sẽ chuyển động mạnh hơn.', isCorrect: true, explanation: 'Nhiệt độ cao làm phân tử nước chuyển động nhanh hơn, va chạm mạnh hơn vào hạt phấn hoa.' },
      { id: 'sq4', content: 'Có thể quan sát hiện tượng tương tự chuyển động Brown đối với các hạt bụi nhỏ trong không khí.', isCorrect: true, explanation: 'Không khí gồm các phân tử khí luôn chuyển động hỗn loạn nên cũng gây ra hiện tượng tương tự.' }
    ],
    answerKey: '', explanationText: 'Chuyển động Brown là bằng chứng thực nghiệm quan trọng chứng tỏ các phân tử của chất luôn chuyển động hỗn loạn không ngừng.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.1', level: 'Vận dụng', type: 'Short',
    promptText: 'Thể tích của $1 mol$ khí ở đktc ($0^oC, 1 atm$) xấp xỉ bao nhiêu lít? (Lấy số nguyên)',
    imageUrl: '', answerKey: '22', explanationText: '22,4 lít.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.1', level: 'Vận dụng', type: 'Short',
    promptText: 'Số mũ của số Avogadro $6,02.10^?$ là bao nhiêu?',
    imageUrl: '', answerKey: '23', explanationText: '$10^{23}$.'
  },

  // --- BÀI 2.2: PHƯƠNG TRÌNH TRẠNG THÁI ---
  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Hiểu', type: 'MCQ',
    promptText: 'Đường biểu diễn quá trình đẳng nhiệt trong hệ tọa độ $(p,V)$ là đường gì?',
    imageUrl: '', options: ['Đường thẳng qua gốc.', 'Đường thẳng song song.', 'Đường Hypebol.', 'Đường Parabol.'],
    answerKey: 'Đường Hypebol.', explanationText: '$p \\sim \\frac{1}{V}$ nên là đường Hypebol.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Vận dụng', type: 'MCQ',
    promptText: 'Một lượng khí có $V_1=10l, p_1=1atm$. Nén đẳng nhiệt còn $2l$. Áp suất $p_2$ là:',
    imageUrl: '', options: ['$0,2 atm$', '$2 atm$', '$5 atm$', '$8 atm$'],
    answerKey: '$5 atm$', explanationText: '$1.10 = p_2.2 \\Rightarrow p_2 = 5$.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Vận dụng', type: 'TrueFalse',
    promptText: 'Một lượng khí được nén đẳng nhiệt từ thể tích $V_1 = 6$ lít, áp suất $p_1 = 1$ atm đến thể tích $V_2 = 3$ lít.',
    imageUrl: '',
    subQuestions: [
      { id: 'sq1', content: 'Quá trình đẳng nhiệt là quá trình biến đổi trạng thái trong đó nhiệt độ được giữ không đổi.', isCorrect: true, explanation: 'Định nghĩa quá trình đẳng nhiệt.' },
      { id: 'sq2', content: 'Đường biểu diễn quá trình đẳng nhiệt trong hệ tọa độ $(p,V)$ là đường thẳng.', isCorrect: false, explanation: 'Là đường hypebol.' },
      { id: 'sq3', content: 'Khi thể tích giảm đi một nửa thì mật độ phân tử khí tăng gấp đôi.', isCorrect: true, explanation: '$n = \\frac{N}{V}$. V giảm 2 thì n tăng 2.' },
      { 
        id: 'sq4', 
        content: 'Áp suất của khí ở trạng thái (2) là 3 atm.', 
        isCorrect: false, 
        explanation: '$p_1V_1 = p_2V_2 \\Rightarrow 1.6 = p_2.3 \\Rightarrow p_2 = 2$ atm.' 
      }
    ],
    answerKey: '', explanationText: 'Áp dụng định luật Boyle: $p_1V_1 = p_2V_2$.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Vận dụng', type: 'TrueFalse',
    promptText: 'Câu 2: Một khối khí khi đặt ở điều kiện tiêu chuẩn (trạng thái A). Nén khí và giữ nhiệt độ không đổi đến trạng thái B. Đồ thị áp suất theo thể tích được biểu diễn như hình vẽ.',
    imageUrl: 'https://i.postimg.cc/2yy9gGGy/do-thi-2.png',
    subQuestions: [
      {
        id: 'sq1',
        content: 'Số mol của khối khí ở điều kiện tiêu chuẩn là 0,1 mol.',
        isCorrect: true,
        explanation: 'Ở điều kiện tiêu chuẩn ($0^oC, 1 atm$), 1 mol khí có thể tích 22,4 lít. Dựa vào đồ thị, $V_A = 2,24$ lít nên $n = \\frac{2,24}{22,4} = 0,1$ mol.'
      },
      {
        id: 'sq2',
        content: 'Thể tích khí ở trạng thái B là 1,12 lít.',
        isCorrect: true,
        explanation: 'Tích $p.V$ không đổi. $p_AV_A = 1.2,24 = 2,24$. Tại B, nếu áp suất tăng gấp đôi ($p_B=2atm$) thì $V_B = \\frac{2,24}{2} = 1,12$ lít.'
      },
      {
        id: 'sq3',
        content: 'Đường biểu diễn quá trình nén đẳng nhiệt là một cung hypebol AB.',
        isCorrect: true,
        explanation: 'Trong hệ tọa độ $(p, V)$, đường đẳng nhiệt ($p \\sim \\frac{1}{V}$) có dạng là đường Hypebol.'
      },
      {
        id: 'sq4',
        content: 'Khi thể tích của khối khí là 1,4 lít thì áp suất là 1,5 atm.',
        isCorrect: false,
        explanation: 'Ta có hằng số $p.V = 2,24$. Khi $V = 1,4$ lít thì $p = \\frac{2,24}{1,4} = 1,6$ atm.\n=> Mệnh đề Sai (vì $1,6 \\neq 1,5$).'
      }
    ],
    answerKey: '',
    explanationText: 'Áp dụng định luật Boyle cho quá trình đẳng nhiệt: $p_1V_1 = p_2V_2 = const$.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Vận dụng', type: 'Short',
    promptText: 'Nén đẳng nhiệt từ $6$ lít xuống $4$ lít. Áp suất đầu là $2 atm$. Áp suất sau là bao nhiêu atm?',
    imageUrl: '', answerKey: '3', explanationText: '$2.6 = p_2.4 \\Rightarrow p_2 = 3$.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Vận dụng', type: 'Short',
    promptText: 'Khí ở $27^oC$ có thể tích $3$ lít. Nung đẳng áp đến $127^oC$. Thể tích sau là bao nhiêu lít?',
    imageUrl: '', answerKey: '4', explanationText: '$\\frac{3}{300} = \\frac{V_2}{400} \\Rightarrow V_2 = 4$.'
  },

  // --- BÀI 2.3: ÁP SUẤT KHÍ ---
  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.3', level: 'Hiểu', type: 'MCQ',
    promptText: 'Khi nhiệt độ tăng, áp suất khí tăng là do:',
    imageUrl: '', options: ['Số lượng phân tử tăng.', 'Kích thước phân tử tăng.', 'Va chạm mạnh và nhiều hơn.', 'Liên kết chặt hơn.'],
    answerKey: 'Va chạm mạnh và nhiều hơn.', explanationText: 'Vận tốc tăng -> va chạm mạnh.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.3', level: 'Vận dụng', type: 'TrueFalse',
    promptText: 'Xét áp suất của một lượng khí lí tưởng tác dụng lên thành bình chứa.',
    imageUrl: '',
    subQuestions: [
      { id: 'sq1', content: 'Áp suất khí gây ra do các phân tử khí va chạm vào thành bình.', isCorrect: true, explanation: 'Nguyên nhân gây ra áp suất.' },
      { id: 'sq2', content: 'Đơn vị của áp suất trong hệ SI là Newton (N).', isCorrect: false, explanation: 'Đơn vị là Pascal (Pa) hoặc $N/m^2$.' },
      { id: 'sq3', content: 'Nếu giữ nguyên nhiệt độ và giảm thể tích bình chứa, áp suất khí sẽ giảm.', isCorrect: false, explanation: 'V giảm -> mật độ tăng -> số va chạm tăng -> áp suất TĂNG.' },
      { id: 'sq4', content: 'Nếu mật độ phân tử là $3.10^{25}$ hạt/$m^3$ và động năng trung bình là $5.10^{-21}$ J thì áp suất khí là $10^5$ Pa.', isCorrect: true, explanation: '$p = \\frac{2}{3} n E_d = \\frac{2}{3} . 3.10^{25} . 5.10^{-21} = 100,000$ Pa.' }
    ],
    answerKey: '', explanationText: 'Công thức $p = \\frac{2}{3} n E_d$.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.3', level: 'Hiểu', type: 'Short',
    promptText: 'Nếu mật độ phân tử khí tăng gấp đôi (giữ nguyên nhiệt độ), áp suất khí sẽ tăng gấp mấy lần?',
    imageUrl: '', answerKey: '2', explanationText: 'Tỉ lệ thuận.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.3', level: 'Vận dụng', type: 'Short',
    promptText: 'Mật độ $2,5.10^{25}$, $E_d=6.10^{-21} J$. Áp suất là bao nhiêu Pa?',
    imageUrl: '', answerKey: '100000', explanationText: '$p = \\frac{2}{3} . 2,5.10^{25} . 6.10^{-21} = 100000 Pa$.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.3', level: 'Vận dụng', type: 'Short',
    promptText: '$1 Pa$ tương đương với bao nhiêu $N/m^2$?',
    imageUrl: '', answerKey: '1', explanationText: '1.'
  },

  // --- BÀI 2.4: ĐỘNG NĂNG PHÂN TỬ ---
  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.4', level: 'Biết', type: 'MCQ',
    promptText: 'Động năng trung bình của phân tử khí lí tưởng phụ thuộc vào:',
    imageUrl: '', options: ['Thể tích', 'Áp suất', 'Nhiệt độ tuyệt đối', 'Khối lượng riêng'],
    answerKey: 'Nhiệt độ tuyệt đối', explanationText: 'Phụ thuộc T.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.4', level: 'Vận dụng', type: 'MCQ',
    promptText: 'Khi nhiệt độ tuyệt đối tăng từ $300K$ lên $600K$, động năng trung bình thay đổi thế nào?',
    imageUrl: '', options: ['Không đổi', 'Tăng gấp đôi', 'Tăng gấp 4', 'Giảm một nửa'],
    answerKey: 'Tăng gấp đôi', explanationText: 'T tăng đôi, E tăng đôi.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.4', level: 'Vận dụng', type: 'TrueFalse',
    promptText: 'Cho hai bình khí: Bình A chứa khí Hêli, Bình B chứa khí Oxi. Cả hai bình có cùng nhiệt độ T.',
    imageUrl: '',
    subQuestions: [
      { id: 'sq1', content: 'Động năng trung bình của phân tử phụ thuộc vào bản chất của chất khí.', isCorrect: false, explanation: 'Chỉ phụ thuộc nhiệt độ T.' },
      { id: 'sq2', content: 'Nhiệt độ tuyệt đối T càng cao thì động năng phân tử càng lớn.', isCorrect: true, explanation: 'Tỉ lệ thuận.' },
      { id: 'sq3', content: 'Động năng trung bình của phân tử khí ở bình A và bình B là bằng nhau.', isCorrect: true, explanation: 'Cùng T thì cùng $E_d$.' },
      { id: 'sq4', content: 'Nếu nhiệt độ T = 300K, động năng trung bình xấp xỉ $6,21.10^{-21}$ J.', isCorrect: true, explanation: '$E_d = \\frac{3}{2} k T = 1.5 . 1.38.10^{-23} . 300 = 6.21.10^{-21} J$.' }
    ],
    answerKey: '', explanationText: '$E_d = \\frac{3}{2} kT$.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.4', level: 'Vận dụng', type: 'Short',
    promptText: 'Khi nhiệt độ tuyệt đối tăng gấp 4 lần, tốc độ căn quân phương tăng gấp mấy lần?',
    imageUrl: '', answerKey: '2', explanationText: '$v \\sim \\sqrt{T}$.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.4', level: 'Vận dụng', type: 'Short',
    promptText: 'Động năng trung bình tại $300K$ xấp xỉ $6,21$ nhân $10$ mũ trừ bao nhiêu Joule?',
    imageUrl: '', answerKey: '21', explanationText: '21.'
  },

  // -----------------------------------------------------------------
  // CHƯƠNG 3: TỪ TRƯỜNG
  // -----------------------------------------------------------------

  // --- BÀI 3.1: KHÁI NIỆM TỪ TRƯỜNG ---
  {
    topic: 'TỪ TRƯỜNG', lessonId: 'l3.1', level: 'Biết', type: 'MCQ',
    promptText: 'Đại lượng đặc trưng cho tác dụng lực của từ trường tại một điểm là:',
    imageUrl: '', options: ['Từ thông', 'Cảm ứng từ', 'Lực từ', 'Đường sức từ'],
    answerKey: 'Cảm ứng từ', explanationText: 'Vectơ cảm ứng từ $\\vec{B}$.'
  },
  {
    topic: 'TỪ TRƯỜNG', lessonId: 'l3.1', level: 'Vận dụng', type: 'TrueFalse',
    promptText: 'Đặt một kim nam châm nhỏ ở trạng thái tự do tại một điểm trong vùng không gian có từ trường.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/VFPt_cylindrical_magnet_thumb.svg/1200px-VFPt_cylindrical_magnet_thumb.svg.png',
    subQuestions: [
      { id: 'sq1', content: 'Từ trường là môi trường vật chất tồn tại xung quanh hạt mang điện đứng yên.', isCorrect: false, explanation: 'Xung quanh hạt mang điện chuyển động (dòng điện) hoặc nam châm.' },
      { id: 'sq2', content: 'Đại lượng đặc trưng cho từ trường về mặt tác dụng lực là cảm ứng từ.', isCorrect: true, explanation: 'Định nghĩa cảm ứng từ B.' },
      { id: 'sq3', content: 'Hướng của kim nam châm khi cân bằng trùng với hướng của đường sức từ tại điểm đó.', isCorrect: true, explanation: 'Tính chất định hướng của từ trường.' },
      { id: 'sq4', content: 'Nếu tại điểm đó có cảm ứng từ $B = 0,02 T$ và dây dẫn dài 1m mang dòng điện 5A đặt vuông góc với từ trường thì lực từ tác dụng lên dây là 0,1N.', isCorrect: true, explanation: '$F = BIL = 0.02 . 5 . 1 = 0.1 N$.' }
    ],
    answerKey: '', explanationText: 'Khái niệm từ trường và công thức lực từ cơ bản.'
  },
  {
    topic: 'TỪ TRƯỜNG', lessonId: 'l3.1', level: 'Vận dụng', type: 'Short',
    promptText: 'Một nam châm thẳng có bao nhiêu cực từ?',
    imageUrl: '', answerKey: '2', explanationText: 'Bắc (N) và Nam (S).'
  },

  // --- BÀI 3.2: LỰC TỪ ---
  {
    topic: 'TỪ TRƯỜNG', lessonId: 'l3.2', level: 'Hiểu', type: 'MCQ',
    promptText: 'Lực từ tác dụng lên đoạn dây dẫn mang dòng điện đặt trong từ trường đều có độ lớn cực đại khi:',
    imageUrl: '', options: ['Dây song song với đường sức từ.', 'Dây vuông góc với đường sức từ.', 'Dây hợp góc $45^o$.', 'Dây hợp góc $30^o$.'],
    answerKey: 'Dây vuông góc với đường sức từ.', explanationText: '$\\sin 90^o = 1$ (max).'
  },
  {
    topic: 'TỪ TRƯỜNG', lessonId: 'l3.2', level: 'Vận dụng', type: 'MCQ',
    promptText: 'Cho $L=5cm, I=0,75A$. Đặt vuông góc trong từ trường, lực từ là $0,03N$. Cảm ứng từ $B$ bằng:',
    imageUrl: '', options: ['$0,8 T$', '$0,4 T$', '$1,2 T$', '$0,08 T$'],
    answerKey: '$0,8 T$', explanationText: '$B = \\frac{F}{IL} = \\frac{0,03}{0,75 . 0,05} = 0,8 T$.'
  },
  {
    topic: 'TỪ TRƯỜNG', lessonId: 'l3.2', level: 'Vận dụng', type: 'TrueFalse',
    promptText: 'Một đoạn dây dẫn thẳng dài $L = 20$ cm mang dòng điện $I = 5$ A đặt trong từ trường đều $B = 0,5$ T. Góc hợp bởi dây dẫn và vectơ cảm ứng từ là 30 độ.',
    imageUrl: '',
    subQuestions: [
      { id: 'sq1', content: 'Lực từ tác dụng lên dây dẫn có phương vuông góc với mặt phẳng chứa dây dẫn và vectơ cảm ứng từ.', isCorrect: true, explanation: 'Đặc điểm phương của lực từ.' },
      { id: 'sq2', content: 'Chiều của lực từ được xác định bằng quy tắc nắm tay phải.', isCorrect: false, explanation: 'Quy tắc bàn tay trái.' },
      { id: 'sq3', content: 'Nếu quay dây dẫn để góc hợp bởi dây và từ trường tăng lên 90 độ thì lực từ sẽ tăng lên.', isCorrect: true, explanation: '$\\sin(30) = 0.5 < \\sin(90) = 1$. F tỉ lệ với $\\sin\\alpha$.' },
      { id: 'sq4', content: 'Độ lớn lực từ tác dụng lên đoạn dây ban đầu là 0,5 N.', isCorrect: false, explanation: '$F = BIL\\sin\\alpha = 0.5 . 5 . 0.2 . \\sin(30) = 0.5 . 0.5 = 0.25 N$.' }
    ],
    answerKey: '', explanationText: 'Tính toán lực từ $F = BIL\\sin\\alpha$.'
  },
  {
    topic: 'TỪ TRƯỜNG', lessonId: 'l3.2', level: 'Hiểu', type: 'Short',
    promptText: 'Nếu dây dẫn đặt song song với đường sức từ thì lực từ bằng bao nhiêu?',
    imageUrl: '', answerKey: '0', explanationText: '$\\sin 0^o = 0$.'
  },
  {
    topic: 'TỪ TRƯỜNG', lessonId: 'l3.2', level: 'Vận dụng', type: 'Short',
    promptText: 'Dây dài $0,2m$, dòng $5A$ đặt vuông góc trong từ trường $0,1T$. Lực từ là bao nhiêu N?',
    imageUrl: '', answerKey: '0.1', explanationText: '$F = BIL = 0,1 . 5 . 0,2 = 0,1 N$.'
  },
  {
    topic: 'TỪ TRƯỜNG', lessonId: 'l3.2', level: 'Vận dụng', type: 'Short',
    promptText: 'Nếu giảm cường độ dòng điện đi 2 lần thì lực từ sẽ giảm đi mấy lần?',
    imageUrl: '', answerKey: '2', explanationText: 'F tỉ lệ thuận với I.'
  },

  // --- BÀI 3.3: TỪ THÔNG & CẢM ỨNG ---
  {
    topic: 'TỪ TRƯỜNG', lessonId: 'l3.3', level: 'Biết', type: 'MCQ',
    promptText: 'Đơn vị của từ thông trong hệ SI là:',
    imageUrl: '', options: ['$Tesla (T)$', '$Henry (H)$', '$Weber (Wb)$', '$Vôn (V)$'],
    answerKey: '$Weber (Wb)$', explanationText: 'Weber.'
  },
  {
    topic: 'TỪ TRƯỜNG', lessonId: 'l3.3', level: 'Hiểu', type: 'MCQ',
    promptText: 'Theo định luật Len-xơ, dòng điện cảm ứng có chiều sao cho từ trường cảm ứng:',
    imageUrl: '', options: ['Cùng chiều từ trường ngoài.', 'Ngược chiều từ trường ngoài.', 'Chống lại nguyên nhân sinh ra nó.', 'Tăng cường từ thông.'],
    answerKey: 'Chống lại nguyên nhân sinh ra nó.', explanationText: 'Chống lại sự biến thiên từ thông.'
  },
  {
    topic: 'TỪ TRƯỜNG', lessonId: 'l3.3', level: 'Vận dụng', type: 'MCQ',
    promptText: 'Khung dây $S=20 cm^2$ đặt trong từ trường $B=4.10^{-4} T$. Vectơ cảm ứng từ hợp với mặt phẳng khung $30^o$. Từ thông là:',
    imageUrl: '', options: ['$4.10^{-7} Wb$', '$2.10^{-7} Wb$', '$6,9.10^{-7} Wb$', '$8.10^{-7} Wb$'],
    answerKey: '$4.10^{-7} Wb$', explanationText: 'Góc pháp tuyến $\\alpha = 90 - 30 = 60^o$. $\\Phi = BScos60 = 4.10^{-7} Wb$.'
  },
  {
    topic: 'TỪ TRƯỜNG', lessonId: 'l3.3', level: 'Vận dụng', type: 'TrueFalse',
    promptText: 'Một khung dây dẫn phẳng, kín, diện tích S đặt trong từ trường đều B. Cho từ trường biến thiên.',
    imageUrl: '',
    subQuestions: [
      { id: 'sq1', content: 'Từ thông qua khung dây là đại lượng vô hướng.', isCorrect: true, explanation: 'Từ thông là đại lượng đại số.' },
      { id: 'sq2', content: 'Hiện tượng cảm ứng điện từ chỉ xảy ra khi khung dây chuyển động.', isCorrect: false, explanation: 'Xảy ra khi từ thông biến thiên (có thể do B thay đổi, S thay đổi...).' },
      { id: 'sq3', content: 'Dòng điện cảm ứng sinh ra từ trường chống lại sự biến thiên từ thông ban đầu.', isCorrect: true, explanation: 'Định luật Len-xơ.' },
      { id: 'sq4', content: 'Nếu từ thông giảm đều từ 0,5 Wb về 0 trong 0,1 giây thì suất điện động cảm ứng có độ lớn 5V.', isCorrect: true, explanation: '$e_c = |\\frac{\\Delta \\Phi}{\\Delta t}| = |\\frac{0 - 0.5}{0.1}| = 5 V$.' }
    ],
    answerKey: '', explanationText: 'Định luật Fa-ra-đây về cảm ứng điện từ.'
  },
  {
    topic: 'TỪ TRƯỜNG', lessonId: 'l3.3', level: 'Vận dụng', type: 'Short',
    promptText: 'Từ thông giảm đều từ $2 Wb$ về $0$ trong $0,5s$. Suất điện động cảm ứng là bao nhiêu Vôn?',
    imageUrl: '', answerKey: '4', explanationText: '$e = 2 / 0,5 = 4V$.'
  },
  {
    topic: 'TỪ TRƯỜNG', lessonId: 'l3.3', level: 'Vận dụng', type: 'Short',
    promptText: 'Khung dây $2 m^2$ đặt vuông góc từ trường $5 T$. Từ thông qua khung là bao nhiêu Wb?',
    imageUrl: '', answerKey: '10', explanationText: '$5 . 2 = 10$.'
  },

  // -----------------------------------------------------------------
  // CHƯƠNG 4: HẠT NHÂN & PHÓNG XẠ
  // -----------------------------------------------------------------

  // --- BÀI 4.1: CẤU TRÚC HẠT NHÂN ---
  {
    topic: 'HẠT NHÂN & PHÓNG XẠ', lessonId: 'l4.1', level: 'Biết', type: 'MCQ',
    promptText: 'Hạt nhân nguyên tử được cấu tạo từ các hạt nào?',
    imageUrl: '', options: ['Proton và Electron', 'Proton và Nơtron', 'Nơtron và Electron', 'Electron và Positron'],
    answerKey: 'Proton và Nơtron', explanationText: 'Gồm các nuclôn (p và n).'
  },
  {
    topic: 'HẠT NHÂN & PHÓNG XẠ', lessonId: 'l4.1', level: 'Vận dụng', type: 'Short',
    promptText: 'Hạt nhân Urani $U-238 (Z=92)$ có bao nhiêu nơtron?',
    imageUrl: '', answerKey: '146', explanationText: '$N = A - Z = 238 - 92 = 146$.'
  },
  {
    topic: 'HẠT NHÂN & PHÓNG XẠ', lessonId: 'l4.1', level: 'Vận dụng', type: 'Short',
    promptText: 'Hạt nhân có 3 proton và 4 nơtron. Số khối A là bao nhiêu?',
    imageUrl: '', answerKey: '7', explanationText: '$A = 3 + 4 = 7$.'
  },

  // --- BÀI 4.2: NĂNG LƯỢNG LIÊN KẾT ---
  {
    topic: 'HẠT NHÂN & PHÓNG XẠ', lessonId: 'l4.2', level: 'Hiểu', type: 'MCQ',
    promptText: 'Đại lượng nào đặc trưng cho mức độ bền vững của hạt nhân?',
    imageUrl: '', options: ['Năng lượng liên kết', 'Năng lượng liên kết riêng', 'Độ hụt khối', 'Số khối A'],
    answerKey: 'Năng lượng liên kết riêng', explanationText: 'Năng lượng liên kết tính trên 1 nuclôn.'
  },
  {
    topic: 'HẠT NHÂN & PHÓNG XẠ', lessonId: 'l4.2', level: 'Vận dụng', type: 'MCQ',
    promptText: 'Hạt Hêli ($^4_2He$) có $m=4,0015u; m_p=1,0073u; m_n=1,0087u$. Độ hụt khối là:',
    imageUrl: '', options: ['$0,0305 u$', '$0,0402 u$', '$0,0015 u$', '$0,0050 u$'],
    answerKey: '$0,0305 u$', explanationText: '$\\Delta m = 2(1,0073) + 2(1,0087) - 4,0015 = 0,0305$.'
  },
  {
    topic: 'HẠT NHÂN & PHÓNG XẠ', lessonId: 'l4.2', level: 'Vận dụng', type: 'TrueFalse',
    promptText: 'Xét hạt nhân Hêli ($^4_2He$) có khối lượng 4,0015u. Biết khối lượng proton $m_p=1,0073u$, nơtron $m_n=1,0087u$ và $1u=931,5 MeV/c^2$.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Binding_energy_curve_-_common_isotopes.svg/800px-Binding_energy_curve_-_common_isotopes.svg.png',
    subQuestions: [
      { id: 'sq1', content: 'Hạt nhân Hêli có 2 proton và 2 nơtron.', isCorrect: true, explanation: 'Z=2, N=A-Z=4-2=2.' },
      { id: 'sq2', content: 'Độ hụt khối của hạt nhân luôn có giá trị dương.', isCorrect: true, explanation: 'Khối lượng các nuclôn luôn lớn hơn khối lượng hạt nhân.' },
      { id: 'sq3', content: 'Năng lượng liên kết càng lớn thì hạt nhân càng bền vững.', isCorrect: false, explanation: 'Năng lượng liên kết RIÊNG mới quyết định độ bền vững.' },
      { id: 'sq4', content: 'Năng lượng liên kết của hạt nhân Hêli xấp xỉ 28,4 MeV.', isCorrect: true, explanation: '$\\Delta m = 2.1,0073 + 2.1,0087 - 4,0015 = 0,0305u$. $W_{lk} = 0,0305 . 931,5 \\approx 28,4 MeV$.' }
    ],
    answerKey: '', explanationText: 'Tính độ hụt khối và năng lượng liên kết.'
  },
  {
    topic: 'HẠT NHÂN & PHÓNG XẠ', lessonId: 'l4.2', level: 'Hiểu', type: 'Short',
    promptText: 'Hạt nhân bền vững nhất thường có số khối trong khoảng từ 50 đến bao nhiêu?',
    imageUrl: '', answerKey: '95', explanationText: 'Khoảng 50 - 95.'
  },
  {
    topic: 'HẠT NHÂN & PHÓNG XẠ', lessonId: 'l4.2', level: 'Vận dụng', type: 'Short',
    promptText: 'Biết $1u = 931,5 MeV/c^2$. Nếu độ hụt khối là $0,2u$ thì năng lượng liên kết là bao nhiêu MeV?',
    imageUrl: '', answerKey: '186.3', explanationText: '$0,2 . 931,5 = 186,3$.'
  },

  // --- BÀI 4.3: PHÓNG XẠ ---
  {
    topic: 'HẠT NHÂN & PHÓNG XẠ', lessonId: 'l4.3', level: 'Biết', type: 'MCQ',
    promptText: 'Tia phóng xạ $\\alpha$ thực chất là dòng các hạt nhân:',
    imageUrl: '', options: ['Hiđrô ($^1_1H$)', 'Hêli ($^4_2He$)', 'Electron ($^0_{-1}e$)', 'Positron ($^0_{+1}e$)'],
    answerKey: 'Hêli ($^4_2He$)', explanationText: 'Hạt nhân Hêli.'
  },
  {
    topic: 'HẠT NHÂN & PHÓNG XẠ', lessonId: 'l4.3', level: 'Hiểu', type: 'MCQ',
    promptText: 'Chọn phát biểu đúng về định luật phóng xạ:',
    imageUrl: '',
    options: ['Sau 1 chu kì, hạt nhân mất hết.', 'Sau 1 chu kì, lượng chất giảm một nửa.', 'Phụ thuộc nhiệt độ.', 'Là quá trình tuần hoàn.'],
    answerKey: 'Sau 1 chu kì, lượng chất giảm một nửa.',
    explanationText: 'Định nghĩa chu kì bán rã.'
  },
  {
    topic: 'HẠT NHÂN & PHÓNG XẠ', lessonId: 'l4.3', level: 'Vận dụng', type: 'MCQ',
    promptText: 'Chất I-ốt có $T=8$ ngày. Ban đầu $100g$. Sau $24$ ngày còn lại bao nhiêu?',
    imageUrl: '', options: ['$12,5 g$', '$25 g$', '$50 g$', '$6,25 g$'],
    answerKey: '$12,5 g$', explanationText: '$24$ ngày là 3 chu kì. $100 / 2^3 = 12,5$.'
  },
  {
    topic: 'HẠT NHÂN & PHÓNG XẠ', lessonId: 'l4.3', level: 'Vận dụng', type: 'TrueFalse',
    promptText: 'Pôlôni ($^{210}_{84}Po$) là chất phóng xạ alpha có chu kì bán rã $T = 138$ ngày.',
    imageUrl: 'https://i.postimg.cc/Y2PR4n4t/phong-xa-la-gi-2.png',
    subQuestions: [
      { id: 'sq1', content: 'Tia alpha là dòng các hạt nhân nguyên tử Hiđrô.', isCorrect: false, explanation: 'Tia alpha là dòng hạt nhân Hêli (He-4).' },
      { id: 'sq2', content: 'Quá trình phóng xạ không chịu ảnh hưởng của các yếu tố môi trường như nhiệt độ, áp suất.', isCorrect: true, explanation: 'Đặc tính của phóng xạ.' },
      { id: 'sq3', content: 'Sau 138 ngày, một nửa số hạt nhân Po ban đầu đã bị phân rã.', isCorrect: true, explanation: 'Sau 1 chu kì bán rã, 50% bị phân rã.' },
      { id: 'sq4', content: 'Nếu ban đầu có 100g Po thì sau 276 ngày, khối lượng Po còn lại là 25g.', isCorrect: true, explanation: '$t = 276 = 2T$. Còn lại $m = \\frac{m_0}{2^2} = \\frac{100}{4} = 25g$.' }
    ],
    answerKey: '', explanationText: 'Định luật phóng xạ.'
  },
  
  {
    topic: 'HẠT NHÂN & PHÓNG XẠ', lessonId: 'l4.3', level: 'Vận dụng', type: 'Short',
    promptText: 'Chu kì bán rã là 2 giờ. Sau 6 giờ, số hạt nhân còn lại bằng bao nhiêu phần ban đầu? (Nhập phân số 1/x)',
    imageUrl: '', answerKey: '1/8', explanationText: '3 chu kì -> $1/2^3 = 1/8$.'
  },
  {
    topic: 'HẠT NHÂN & PHÓNG XẠ', lessonId: 'l4.3', level: 'Vận dụng', type: 'Short',
    promptText: 'Ban đầu 100g. Sau 2 chu kì bán rã, khối lượng bị phân rã là bao nhiêu gam?',
    imageUrl: '', answerKey: '75', explanationText: 'Còn 25g -> Mất 75g.'
  },
  //-------------------------------24/12---------------------------
    // --- l1.1: Sự chuyển thể ---
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Biết', type: 'MCQ',
    promptText: 'Điều nào sau đây là **sai** khi nói về sự đông đặc?',
    imageUrl: '',
    options: [
      'Sự đông đặc là quá trình chuyển từ thể lỏng sang thể rắn.',
      'Với một chất rắn, nhiệt độ đông đặc luôn nhỏ hơn nhiệt độ nóng chảy.',
      'Trong suốt quá trình đông đặc, nhiệt độ của vật không thay đổi.',
      'Nhiệt độ đông đặc của các chất thay đổi theo áp suất bên ngoài.'
    ],
    answerKey: 'Với một chất rắn, nhiệt độ đông đặc luôn nhỏ hơn nhiệt độ nóng chảy.',
    explanationText: 'Đối với một chất kết tinh, nhiệt độ đông đặc bằng nhiệt độ nóng chảy ở cùng một áp suất.'
  },

  // --- l1.2: Nội năng – Định luật I nhiệt động lực học ---
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.2', level: 'Hiểu', type: 'MCQ',
    promptText: 'Biểu thức diễn tả đúng quá trình chất khí vừa nhận nhiệt vừa nhận công là:',
    imageUrl: '',
    options: [
      '$\\Delta U = A + Q$; $Q > 0$; $A < 0$.',
      '$\\Delta U = Q$; $Q > 0$.',
      '$\\Delta U = Q + A$; $Q < 0$; $A > 0$.',
      '$\\Delta U = Q + A$; $Q > 0$; $A > 0$.'
    ],
    answerKey: '$\\Delta U = Q + A$; $Q > 0$; $A > 0$.',
    explanationText: 'Quy ước dấu: Nhận nhiệt $Q>0$, Nhận công $A>0$.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.2', level: 'Vận dụng', type: 'Short',
    promptText: 'Người ta thực hiện công $120 J$ để nén khí trong một xilanh. Tính độ biến thiên nội năng của khí theo đơn vị Jun, biết khí truyền ra môi trường xung quanh nhiệt lượng $80 J$.',
    imageUrl: '',
    answerKey: '40',
    explanationText: '$\\Delta U = A + Q = 120 + (-80) = 40 J$.'
  },

  // --- l1.3: Thang nhiệt độ – Nhiệt kế ---
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.3', level: 'Vận dụng', type: 'MCQ',
    promptText: 'Đổi đơn vị $32^oC$ ra đơn vị độ K?',
    imageUrl: '',
    options: [
      '$350K$',
      '$305K$',
      '$35K$',
      '$530K$'
    ],
    answerKey: '$305K$',
    explanationText: '$T(K) = 32 + 273 = 305 K$.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.3', level: 'Hiểu', type: 'TrueFalse',
    promptText: 'Nhúng bàn tay trái vào nước lạnh, bàn tay phải vào nước nóng và sau đó nhúng cả 2 tay vào nước ấm thì:',
    imageUrl: '',
    subQuestions: [
      { id: 'sq1', content: 'Bàn tay trái thấy lạnh, bàn tay phải thấy nóng.', isCorrect: false, explanation: 'Tay trái (đang lạnh) gặp nước ấm sẽ thấy nóng. Tay phải (đang nóng) gặp nước ấm sẽ thấy lạnh.' },
      { id: 'sq2', content: 'Có sự truyền nhiệt xảy ra giữa tay và nước.', isCorrect: true, explanation: 'Do có chênh lệch nhiệt độ.' },
      { id: 'sq3', content: 'Nhiệt lượng được truyền từ bàn tay trái sang nước ấm.', isCorrect: false, explanation: 'Tay trái lạnh hơn nước ấm nên nhiệt truyền từ nước sang tay.' },
      { id: 'sq4', content: 'Nhiệt lượng được truyền từ nước ấm sang tay phải.', isCorrect: false, explanation: 'Tay phải nóng hơn nước ấm nên nhiệt truyền từ tay sang nước.' }
    ],
    answerKey: '',
    explanationText: 'Nguyên lý truyền nhiệt: từ vật nóng sang vật lạnh.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.3', level: 'Vận dụng', type: 'Short',
    promptText: 'Chuyển đổi nhiệt độ không khí trong phòng là $27^oC$ sang nhiệt độ Kelvin.',
    imageUrl: '',
    answerKey: '300',
    explanationText: '$T = 27 + 273 = 300 K$.'
  },

  // --- l1.4: Nhiệt dung riêng ---
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.4', level: 'Hiểu', type: 'MCQ',
    promptText: 'Nhiệt dung riêng của đồng nhỏ hơn nhôm. Vì vậy để tăng nhiệt độ của 1kg đồng và 1kg nhôm thêm $10^oC$ thì:',
    imageUrl: '',
    options: [
      'Khối nhôm cần nhiều nhiệt lượng hơn khối đồng.',
      'Khối đồng cần nhiều nhiệt lượng hơn khối nhôm.',
      'Hai khối đều cần nhiệt lượng như nhau.',
      'Không khẳng định được.'
    ],
    answerKey: 'Khối nhôm cần nhiều nhiệt lượng hơn khối đồng.',
    explanationText: '$Q = mc\\Delta t$. Cùng $m, \\Delta t$, chất có $c$ lớn hơn (nhôm) thì cần $Q$ lớn hơn.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.4', level: 'Vận dụng', type: 'TrueFalse',
    promptText: 'Một ấm đun nước bằng nhôm có $m = 350g$, chứa $2,75kg$ nước được đun trên bếp. Khi nhận được nhiệt lượng $650 kJ$ thì ấm đạt đến nhiệt độ $60^oC$. Biết $c_{Al} = 880 J/kg.K$, $c_{H2O} = 4190 J/kg.K$.',
    imageUrl: '',
    subQuestions: [
      { id: 'sq1', content: 'Đổi $350g = 0,35kg$.', isCorrect: true, explanation: 'Đúng đơn vị chuẩn.' },
      { id: 'sq2', content: 'Cả ấm nhôm và nước đều nhận nhiệt lượng để nóng lên.', isCorrect: true, explanation: 'Cả 2 vật đều tăng nhiệt độ.' },
      { id: 'sq3', content: 'Nhiệt độ ban đầu của ấm là $5^oC$.', isCorrect: true, explanation: 'Giải phương trình: $Q = (m_1c_1 + m_2c_2)(60 - t_1) \\Rightarrow 650000 = (0.35*880 + 2.75*4190)(60 - t_1) \\Rightarrow t_1 \\approx 5,1^oC$.' },
      { id: 'sq4', content: 'Nếu thay ấm nhôm bằng ấm đồng thì thời gian đun lượng nước trên như nhau.', isCorrect: false, explanation: 'Nhiệt dung riêng của đồng khác nhôm nên nhiệt lượng cần cung cấp khác nhau, dẫn đến thời gian khác nhau.' }
    ],
    answerKey: '',
    explanationText: 'Bài toán cân bằng nhiệt có nguồn cung cấp nhiệt.'
  },
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.4', level: 'Vận dụng', type: 'Short',
    promptText: 'Người ta thả một miếng nhôm khối lượng $500g$ vào $500g$ nước. Miếng nhôm nguội đi từ $80^oC$ xuống $20^oC$. Hỏi nước nhận một lượng nhiệt bằng bao nhiêu kJ? Cho $c_{Al} = 880 J/kg.K$.',
    imageUrl: '',
    answerKey: '26.4',
    explanationText: '$Q_{thu} = Q_{toa} = m_{Al}.c_{Al}.\\Delta t = 0,5 . 880 . (80 - 20) = 26400 J = 26,4 kJ$.'
  },
  
// PHẦN 1 – VẬT LÍ NHIỆT
// l1.1 → l1.4 (40 câu)
// =======================

{
  topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Biết', type: 'MCQ',
  promptText: 'Quá trình chuyển từ thể rắn sang thể lỏng của một chất gọi là gì?',
  imageUrl: '',
  options: ['Đông đặc', 'Hóa hơi', 'Nóng chảy', 'Ngưng tụ'],
  answerKey: 'Nóng chảy',
  explanationText: 'Nóng chảy là quá trình chuyển từ thể rắn sang thể lỏng.'
},
{
  topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Hiểu', type: 'MCQ',
  promptText: 'Trong quá trình nóng chảy của chất rắn kết tinh, đại lượng nào không đổi?',
  imageUrl: '',
  options: ['Nhiệt độ', 'Thể tích', 'Nội năng', 'Khối lượng'],
  answerKey: 'Nhiệt độ',
  explanationText: 'Nhiệt lượng dùng để phá vỡ liên kết, không làm tăng nhiệt độ.'
},
{
  topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Hiểu', type: 'MCQ',
  promptText: 'Sự bay hơi của chất lỏng xảy ra trong điều kiện nào?',
  imageUrl: '',
  options: ['Chỉ ở nhiệt độ sôi', 'Chỉ trong lòng chất lỏng', 'Ở mặt thoáng và mọi nhiệt độ', 'Chỉ khi đun nóng'],
  answerKey: 'Ở mặt thoáng và mọi nhiệt độ',
  explanationText: 'Bay hơi xảy ra ở mọi nhiệt độ và chỉ ở mặt thoáng.'
},
{
  topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Hiểu', type: 'MCQ',
  promptText: 'Sự sôi khác sự bay hơi ở điểm nào?',
  imageUrl: '',
  options: ['Xảy ra nhanh hơn', 'Chỉ xảy ra ở mặt thoáng', 'Xảy ra ở nhiệt độ xác định', 'Không thu nhiệt'],
  answerKey: 'Xảy ra ở nhiệt độ xác định',
  explanationText: 'Sôi chỉ xảy ra ở nhiệt độ sôi xác định.'
},
{
  topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Hiểu', type: 'TrueFalse',
  promptText: 'Xét các phát biểu sau về sự chuyển thể.',
  imageUrl: '',
  subQuestions: [
    { id: 'sq1', content: 'Đông đặc là quá trình chuyển từ thể lỏng sang thể rắn.', isCorrect: true, explanation: 'Đúng định nghĩa.' },
    { id: 'sq2', content: 'Trong quá trình đông đặc, nhiệt độ luôn tăng.', isCorrect: false, explanation: 'Nhiệt độ không đổi.' },
    { id: 'sq3', content: 'Sự sôi xảy ra cả trong lòng và mặt thoáng.', isCorrect: true, explanation: 'Có bọt khí trong lòng.' },
    { id: 'sq4', content: 'Bay hơi chỉ xảy ra khi đun nóng.', isCorrect: false, explanation: 'Bay hơi xảy ra ở mọi nhiệt độ.' }
  ],
  answerKey: '',
  explanationText: 'Phân biệt các quá trình chuyển thể.'
},
{
  topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Vận dụng', type: 'MCQ',
  promptText: 'Khi nước đang sôi, tiếp tục cấp nhiệt thì nhiệt lượng dùng để',
  imageUrl: '',
  options: ['Tăng nhiệt độ nước', 'Giảm nội năng', 'Tăng động năng phân tử', 'Phá vỡ liên kết phân tử'],
  answerKey: 'Phá vỡ liên kết phân tử',
  explanationText: 'Nhiệt lượng dùng để tăng thế năng liên kết.'
},
{
  topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Hiểu', type: 'MCQ',
  promptText: 'Chất rắn vô định hình có đặc điểm nào?',
  imageUrl: '',
  options: ['Có nhiệt độ nóng chảy xác định', 'Có cấu trúc tinh thể', 'Không có nhiệt độ nóng chảy xác định', 'Có tính dị hướng'],
  answerKey: 'Không có nhiệt độ nóng chảy xác định',
  explanationText: 'Không có cấu trúc tinh thể.'
},
{
  topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Vận dụng', type: 'MCQ',
  promptText: 'Hiện tượng nào là sự ngưng tụ?',
  imageUrl: '',
  options: ['Nước đá tan', 'Hơi nước đọng trên cốc lạnh', 'Nước sôi', 'Quần áo khô'],
  answerKey: 'Hơi nước đọng trên cốc lạnh',
  explanationText: 'Ngưng tụ là chuyển từ khí sang lỏng.'
},
{
  topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Vận dụng', type: 'Short',
  promptText: 'Biết $\\lambda = 3,4.10^5 J/kg$. Tính nhiệt lượng để làm nóng chảy $0,2kg$ nước đá ở $0^oC$.',
  imageUrl: '',
  answerKey: '68000',
  explanationText: '$Q = m\\lambda = 0,2 . 3,4.10^5 = 6,8.10^4 J$.'
},

/* ================= l1.2 – NỘI NĂNG – ĐL I (10) ================= */

{
  topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.2', level: 'Biết', type: 'MCQ',
  promptText: 'Nội năng của một vật là',
  imageUrl: '',
  options: [
    'Động năng của vật',
    'Tổng động năng phân tử',
    'Tổng động năng và thế năng phân tử',
    'Thế năng của vật'
  ],
  answerKey: 'Tổng động năng và thế năng phân tử',
  explanationText: 'Nội năng gồm động năng + thế năng tương tác.'
},
{
  topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.2', level: 'Hiểu', type: 'MCQ',
  promptText: 'Có thể làm thay đổi nội năng của vật bằng cách nào?',
  imageUrl: '',
  options: ['Thực hiện công', 'Truyền nhiệt', 'Cả hai cách', 'Không cách nào'],
  answerKey: 'Cả hai cách',
  explanationText: 'Định luật I nhiệt động lực học.'
},
{
  topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.2', level: 'Biết', type: 'MCQ',
  promptText: 'Biểu thức của định luật I nhiệt động lực học là',
  imageUrl: '',
  options: ['$\\Delta U = Q + A$', '$\\Delta U = Q - A$', '$Q = A$', '$U = Q$'],
  answerKey: '$\\Delta U = Q + A$',
  explanationText: 'Quy ước vật nhận nhiệt, nhận công.'
},
{
  topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.2', level: 'Hiểu', type: 'MCQ',
  promptText: 'Khi khí nhận nhiệt và sinh công thì',
  imageUrl: '',
  options: ['Q > 0, A > 0', 'Q > 0, A < 0', 'Q < 0, A > 0', 'Q < 0, A < 0'],
  answerKey: 'Q > 0, A < 0',
  explanationText: 'Khí thực hiện công nên A < 0.'
},
{
  topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.2', level: 'Vận dụng', type: 'Short',
  promptText: 'Một khí nhận nhiệt lượng 120 J, sinh công 80 J. Tính độ biến thiên nội năng.',
  imageUrl: '',
  answerKey: '40',
  explanationText: '$\\Delta U = Q + A = 120 - 80 = 40 J$.'
},

/* ================= l1.3 – THANG NHIỆT ĐỘ – NHIỆT KẾ (10) ================= */

{
  topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.3', level: 'Biết', type: 'MCQ',
  promptText: 'Nhiệt độ tuyệt đối được đo theo thang nào?',
  imageUrl: '',
  options: ['Celsius', 'Fahrenheit', 'Kelvin', 'Réaumur'],
  answerKey: 'Kelvin',
  explanationText: 'Thang Kelvin dùng trong vật lí.'
},
{
  topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.3', level: 'Hiểu', type: 'MCQ',
  promptText: 'Công thức đổi từ $^oC$ sang K là',
  imageUrl: '',
  options: ['$T = t - 273$', '$T = t + 273$', '$T = 2t$', '$T = t$'],
  answerKey: '$T = t + 273$',
  explanationText: 'Chuẩn đổi nhiệt độ.'
},
/* ================= l1.4 – NHIỆT DUNG RIÊNG (10) ================= */

{
  topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.4', level: 'Biết', type: 'MCQ',
  promptText: 'Công thức tính nhiệt lượng là',
  imageUrl: '',
  options: ['$Q = mc\\Delta t$', '$Q = m\\lambda$', '$Q = Lm$', '$Q = pt$'],
  answerKey: '$Q = mc\\Delta t$',
  explanationText: 'Áp dụng khi nhiệt độ thay đổi.'
},
{
  topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.4', level: 'Vận dụng', type: 'Short',
  promptText: 'Tính nhiệt lượng cần để đun $2kg$ nước tăng từ $20^oC$ lên $70^oC$. Biết $c = 4200 J/kg.K$.',
  imageUrl: '',
  answerKey: '420000',
  explanationText: '$Q = 2 . 4200 . 50 = 4,2.10^5 J$.'
},

// =======================
// PHẦN 2 – KHÍ LÍ TƯỞNG
// l2.1 → l2.4 (40 câu)
// =======================

 {
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.1', level: 'Biết', type: 'MCQ',
  promptText: 'Theo mô hình động học phân tử, các phân tử khí chuyển động như thế nào?',
  imageUrl: '',
  options: ['Dao động quanh vị trí cân bằng', 'Chuyển động hỗn loạn không ngừng', 'Đứng yên', 'Chuyển động theo quỹ đạo tròn'],
  answerKey: 'Chuyển động hỗn loạn không ngừng',
  explanationText: 'Các phân tử khí chuyển động hỗn loạn không ngừng.'
},
{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.1', level: 'Hiểu', type: 'MCQ',
  promptText: 'Khi nhiệt độ khí tăng thì',
  imageUrl: '',
  options: [
    'Khoảng cách phân tử giảm',
    'Vận tốc phân tử tăng',
    'Khối lượng phân tử tăng',
    'Số phân tử tăng'
  ],
  answerKey: 'Vận tốc phân tử tăng',
  explanationText: 'Nhiệt độ tỉ lệ với động năng phân tử.'
},
{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.1', level: 'Hiểu', type: 'TrueFalse',
  promptText: 'Xét các phát biểu về phân tử khí.',
  imageUrl: '',
  subQuestions: [
    { id: 'sq1', content: 'Phân tử khí chuyển động không ngừng.', isCorrect: true, explanation: 'Luôn chuyển động hỗn loạn.' },
    { id: 'sq2', content: 'Vận tốc phân tử không phụ thuộc nhiệt độ.', isCorrect: false, explanation: 'Phụ thuộc nhiệt độ.' },
    { id: 'sq3', content: 'Giữa các phân tử khí có lực tương tác.', isCorrect: true, explanation: 'Có lực hút – đẩy rất yếu.' },
    { id: 'sq4', content: 'Ở thể khí, khoảng cách phân tử rất nhỏ.', isCorrect: false, explanation: 'Khoảng cách rất lớn.' }
  ],
  answerKey: '',
  explanationText: 'Mô tả tính chất phân tử khí.'
},


/* ================= l2.2 – PHƯƠNG TRÌNH TRẠNG THÁI KHÍ LÍ TƯỞNG (10) ================= */

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Biết', type: 'MCQ',
  promptText: 'Phương trình trạng thái khí lí tưởng là',
  imageUrl: '',
  options: ['pV = nRT', 'pV = RT', 'p = nRT', 'V = nRT'],
  answerKey: 'pV = nRT',
  explanationText: 'Phương trình cơ bản của khí lí tưởng.'
},
{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Hiểu', type: 'MCQ',
  promptText: 'Trong phương trình pV = nRT, đại lượng R là',
  imageUrl: '',
  options: ['Hằng số Boltzmann', 'Hằng số khí lí tưởng', 'Nhiệt dung riêng', 'Áp suất chuẩn'],
  answerKey: 'Hằng số khí lí tưởng',
  explanationText: 'R = 8,31 J/mol.K.'
},
{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Vận dụng', type: 'Short',
  promptText: 'Một lượng khí có p = 2.10^5 Pa, V = 0,02 m³, T = 300 K. Tính số mol khí. Biết R = 8,31.',
  imageUrl: '',
  answerKey: '1.6',
  explanationText: '$n = \\frac{pV}{RT} = \\frac{2.10^5 . 0,02}{8,31 . 300} ≈ 1,6 mol$.'
},
{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Hiểu', type: 'MCQ',
  promptText: 'Nếu tăng nhiệt độ của khí trong bình kín thì áp suất khí sẽ',
  imageUrl: '',
  options: ['Giảm', 'Không đổi', 'Tăng', 'Bằng 0'],
  answerKey: 'Tăng',
  explanationText: 'Áp suất tỉ lệ với nhiệt độ tuyệt đối.'
},

/* ================= l2.3 – ÁP SUẤT KHÍ THEO MÔ HÌNH ĐỘNG HỌC (10) ================= */

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.3', level: 'Biết', type: 'MCQ',
  promptText: 'Nguyên nhân gây ra áp suất của khí lên thành bình là',
  imageUrl: '',
  options: [
    'Lực hút giữa các phân tử',
    'Va chạm của phân tử vào thành bình',
    'Trọng lực của khí',
    'Nhiệt lượng của khí'
  ],
  answerKey: 'Va chạm của phân tử vào thành bình',
  explanationText: 'Áp suất do va chạm phân tử.'
},
{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.3', level: 'Hiểu', type: 'MCQ',
  promptText: 'Khi tăng thể tích khí mà giữ nguyên nhiệt độ thì áp suất',
  imageUrl: '',
  options: ['Tăng', 'Giảm', 'Không đổi', 'Tăng rồi giảm'],
  answerKey: 'Giảm',
  explanationText: 'Áp suất tỉ lệ nghịch với thể tích.'
},
{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.3', level: 'Vận dụng', type: 'Short',
  promptText: 'Một khí có áp suất 3.10^5 Pa trong bình thể tích 0,01 m³. Khi nén đẳng nhiệt còn 0,005 m³, áp suất mới là bao nhiêu \\$10^5$?',
  imageUrl: '',
  answerKey: '6',
  explanationText: '$p_2 = p_1 \\frac{V_1}{V_2} = 3.10^5 . \\frac{0,01}{0,005} = 6.10^5 Pa$.'
},

/* ================= l2.4 – ĐỘNG NĂNG PHÂN TỬ (10) ================= */

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.4', level: 'Biết', type: 'MCQ',
  promptText: 'Động năng trung bình của phân tử khí phụ thuộc vào',
  imageUrl: '',
  options: ['Áp suất', 'Thể tích', 'Nhiệt độ', 'Khối lượng khí'],
  answerKey: 'Nhiệt độ',
  explanationText: 'Động năng ∝ nhiệt độ tuyệt đối.'
},
{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.4', level: 'Hiểu', type: 'MCQ',
  promptText: 'Khi nhiệt độ của khí tăng gấp đôi thì động năng trung bình của phân tử khí',
  imageUrl: '',
  options: ['Tăng gấp đôi', 'Tăng gấp bốn', 'Không đổi', 'Giảm một nửa'],
  answerKey: 'Tăng gấp đôi',
  explanationText: 'Động năng trung bình tỉ lệ thuận với nhiệt độ.'
},
{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.4', level: 'Vận dụng', type: 'Short',
  promptText: 'Ở 300 K, động năng trung bình của phân tử khí là E. Ở 600 K, động năng trung bình là bao nhiêu lần ( điền số)?',
  imageUrl: '',
  answerKey: '2',
  explanationText: 'Động năng tỉ lệ với nhiệt độ tuyệt đối.'
},
// =======================
// PHẦN 3 – TỪ TRƯỜNG
// l3.1 → l3.3 (30 câu)
// =======================

{
  topic: 'TỪ TRƯỜNG', lessonId: 'l3.1', level: 'Biết', type: 'MCQ',
  promptText: 'Từ trường là dạng vật chất tồn tại xung quanh',
  imageUrl: '',
  options: ['Điện tích đứng yên', 'Điện tích chuyển động', 'Vật mang khối lượng', 'Nguồn nhiệt'],
  answerKey: 'Điện tích chuyển động',
  explanationText: 'Dòng điện và điện tích chuyển động sinh ra từ trường.'
},
{
  topic: 'TỪ TRƯỜNG', lessonId: 'l3.1', level: 'Hiểu', type: 'MCQ',
  promptText: 'Đại lượng đặc trưng cho từ trường về mặt tác dụng lực là',
  imageUrl: '',
  options: ['Từ thông', 'Cảm ứng từ', 'Cường độ điện trường', 'Điện áp'],
  answerKey: 'Cảm ứng từ',
  explanationText: 'Cảm ứng từ B đặc trưng cho từ trường.'
},
{
  topic: 'TỪ TRƯỜNG', lessonId: 'l3.1', level: 'Hiểu', type: 'MCQ',
  promptText: 'Đơn vị của cảm ứng từ là',
  imageUrl: '',
  options: ['N/C', 'T (Tesla)', 'V/m', 'A'],
  answerKey: 'T (Tesla)',
  explanationText: 'Đơn vị SI của cảm ứng từ là Tesla.'
},
{
  topic: 'TỪ TRƯỜNG', lessonId: 'l3.1', level: 'Hiểu', type: 'TrueFalse',
  promptText: 'Xét các phát biểu sau về từ trường.',
  imageUrl: '',
  subQuestions: [
    { id: 'sq1', content: 'Nam châm đứng yên tạo ra từ trường.', isCorrect: true, explanation: 'Nam châm luôn tạo ra từ trường.' },
    { id: 'sq2', content: 'Điện tích đứng yên không tạo ra từ trường.', isCorrect: true, explanation: 'Chỉ điện tích chuyển động mới tạo từ trường.' },
    { id: 'sq3', content: 'Từ trường không tác dụng lực lên điện tích chuyển động.', isCorrect: false, explanation: 'Có lực từ tác dụng.' },
    { id: 'sq4', content: 'Từ trường có thể tác dụng lên dòng điện.', isCorrect: true, explanation: 'Có lực từ lên dây dẫn mang dòng.' }
  ],
  answerKey: '',
  explanationText: 'Nhận biết các tính chất cơ bản của từ trường.'
},


/* ================= l3.2 – LỰC TỪ – ĐỊNH LUẬT AMPE (10) ================= */

{
  topic: 'TỪ TRƯỜNG', lessonId: 'l3.2', level: 'Biết', type: 'MCQ',
  promptText: 'Lực từ tác dụng lên dây dẫn mang dòng điện đặt trong từ trường gọi là',
  imageUrl: '',
  options: ['Lực Coulomb', 'Lực hấp dẫn', 'Lực Ampe', 'Lực điện'],
  answerKey: 'Lực Ampe',
  explanationText: 'Lực từ lên dòng điện gọi là lực Ampe.'
},
{
  topic: 'TỪ TRƯỜNG', lessonId: 'l3.2', level: 'Hiểu', type: 'MCQ',
  promptText: 'Độ lớn lực từ tác dụng lên đoạn dây dẫn mang dòng điện được tính bởi',
  imageUrl: '',
  options: ['$F = BIl$', '$F = qvB$', '$F = k\\frac{q_1q_2}{r^2}$', '$F = mg$'],
  answerKey: '$F = BIl$',
  explanationText: 'Khi dây vuông góc với B.'
},
{
  topic: 'TỪ TRƯỜNG', lessonId: 'l3.2', level: 'Hiểu', type: 'MCQ',
  promptText: 'Chiều của lực từ được xác định bằng',
  imageUrl: '',
  options: ['Quy tắc bàn tay trái', 'Quy tắc bàn tay phải', 'Quy tắc nắm tay phải', 'Quy tắc hình bình hành'],
  answerKey: 'Quy tắc bàn tay trái',
  explanationText: 'Xác định chiều lực từ.'
},
{
  topic: 'TỪ TRƯỜNG', lessonId: 'l3.2', level: 'Vận dụng', type: 'Short',
  promptText: 'Một dây dẫn dài 0,2 m mang dòng điện 5 A đặt vuông góc với từ trường B = 0,4 T. Tính lực từ tác dụng lên dây.',
  imageUrl: '',
  answerKey: '0.4',
  explanationText: '$F = BIl = 0,4 . 5 . 0,2 = 0,4 N$.'
},
{
  topic: 'TỪ TRƯỜNG', lessonId: 'l3.2', level: 'Hiểu', type: 'TrueFalse',
  promptText: 'Xét các phát biểu sau về lực từ.',
  imageUrl: '',
  subQuestions: [
    { id: 'sq1', content: 'Lực từ tác dụng lên điện tích đứng yên.', isCorrect: false, explanation: 'Chỉ tác dụng lên điện tích chuyển động.' },
    { id: 'sq2', content: 'Lực từ có thể làm đổi hướng chuyển động.', isCorrect: true, explanation: 'Có thể làm đổi hướng vận tốc.' },
    { id: 'sq3', content: 'Lực từ không phụ thuộc cường độ dòng điện.', isCorrect: false, explanation: 'Phụ thuộc I.' },
    { id: 'sq4', content: 'Lực từ phụ thuộc cảm ứng từ.', isCorrect: true, explanation: 'Tỉ lệ với B.' }
  ],
  answerKey: '',
  explanationText: 'Tính chất lực từ.'
},

/* ================= l3.3 – TỪ THÔNG & CẢM ỨNG ĐIỆN TỪ (10) ================= */

{
  topic: 'TỪ TRƯỜNG', lessonId: 'l3.3', level: 'Biết', type: 'MCQ',
  promptText: 'Từ thông qua một khung dây được xác định bởi',
  imageUrl: '',
  options: ['$\\Phi = BS$', '$\\Phi = BSl$', '$\\Phi = Il$', '$\\Phi = qvB$'],
  answerKey: '$\\Phi = BS$',
  explanationText: 'Khi B vuông góc mặt khung.'
},
{
  topic: 'TỪ TRƯỜNG', lessonId: 'l3.3', level: 'Hiểu', type: 'MCQ',
  promptText: 'Hiện tượng cảm ứng điện từ xảy ra khi',
  imageUrl: '',
  options: [
    'Từ thông qua mạch biến thiên',
    'Có dòng điện chạy qua mạch',
    'Có từ trường đều',
    'Mạch đứng yên trong từ trường'
  ],
  answerKey: 'Từ thông qua mạch biến thiên',
  explanationText: 'Điều kiện xuất hiện suất điện động cảm ứng.'
},
{
  topic: 'TỪ TRƯỜNG', lessonId: 'l3.3', level: 'Hiểu', type: 'MCQ',
  promptText: 'Định luật Faraday cho biết',
  imageUrl: '',
  options: [
    'Chiều dòng điện cảm ứng',
    'Độ lớn suất điện động cảm ứng',
    'Từ trường do dòng điện',
    'Lực tác dụng lên dây dẫn'
  ],
  answerKey: 'Độ lớn suất điện động cảm ứng',
  explanationText: 'Liên hệ với tốc độ biến thiên từ thông.'
},
{
  topic: 'TỪ TRƯỜNG', lessonId: 'l3.3', level: 'Vận dụng', type: 'Short',
  promptText: 'Một khung dây có diện tích 0,05 m² đặt vuông góc từ trường B = 0,2 T. Tính từ thông qua khung.',
  imageUrl: '',
  answerKey: '0.01',
  explanationText: '$\\Phi = BS = 0,2 . 0,05 = 0,01 Wb$.'
},
{
  topic: 'TỪ TRƯỜNG', lessonId: 'l3.3', level: 'Hiểu', type: 'TrueFalse',
  promptText: 'Xét các phát biểu sau về cảm ứng điện từ.',
  imageUrl: '',
  subQuestions: [
    { id: 'sq1', content: 'Dòng điện cảm ứng xuất hiện khi từ thông biến thiên.', isCorrect: true, explanation: 'Điều kiện cảm ứng.' },
    { id: 'sq2', content: 'Từ thông không phụ thuộc diện tích khung.', isCorrect: false, explanation: 'Phụ thuộc S.' },
    { id: 'sq3', content: 'Cảm ứng điện từ là cơ sở của máy phát điện.', isCorrect: true, explanation: 'Nguyên lí hoạt động.' },
    { id: 'sq4', content: 'Dòng điện cảm ứng luôn cùng chiều từ thông.', isCorrect: false, explanation: 'Theo Lenz, chống lại sự biến thiên.' }
  ],
  answerKey: '',
  explanationText: 'Đặc điểm hiện tượng cảm ứng.'
},
// ===============================
// PHẦN 4 – HẠT NHÂN & PHÓNG XẠ
// l4.1 → l4.3 (30 câu)
// ===============================

 {
  topic: 'HẠT NHÂN & PHÓNG XẠ', lessonId: 'l4.1', level: 'Biết', type: 'MCQ',
  promptText: 'Hạt nhân nguyên tử được cấu tạo bởi',
  imageUrl: '',
  options: ['Electron và proton', 'Proton và neutron', 'Electron và neutron', 'Chỉ proton'],
  answerKey: 'Proton và neutron',
  explanationText: 'Hạt nhân gồm proton và neutron.'
},
{
  topic: 'HẠT NHÂN & PHÓNG XẠ', lessonId: 'l4.1', level: 'Biết', type: 'MCQ',
  promptText: 'Số proton trong hạt nhân được gọi là',
  imageUrl: '',
  options: ['Số khối A', 'Số neutron N', 'Số hiệu nguyên tử Z', 'Nguyên tử số'],
  answerKey: 'Số hiệu nguyên tử Z',
  explanationText: 'Z đặc trưng cho nguyên tố.'
},
{
  topic: 'HẠT NHÂN & PHÓNG XẠ', lessonId: 'l4.1', level: 'Hiểu', type: 'MCQ',
  promptText: 'Số neutron trong hạt nhân được xác định bởi',
  imageUrl: '',
  options: ['N = Z - A', 'N = A - Z', 'N = A + Z', 'N = Z'],
  answerKey: 'N = A - Z',
  explanationText: 'A = Z + N.'
},
{
  topic: 'HẠT NHÂN & PHÓNG XẠ', lessonId: 'l4.1', level: 'Hiểu', type: 'TrueFalse',
  promptText: 'Xét các phát biểu sau về hạt nhân.',
  imageUrl: '',
  subQuestions: [
    { id: 'sq1', content: 'Hạt nhân mang điện tích dương.', isCorrect: true, explanation: 'Do proton mang điện dương.' },
    { id: 'sq2', content: 'Khối lượng nguyên tử tập trung chủ yếu ở hạt nhân.', isCorrect: true, explanation: 'Electron có khối lượng rất nhỏ.' },
    { id: 'sq3', content: 'Neutron mang điện tích âm.', isCorrect: false, explanation: 'Neutron không mang điện.' },
    { id: 'sq4', content: 'Các đồng vị có cùng số neutron.', isCorrect: false, explanation: 'Đồng vị có cùng Z, khác N.' }
  ],
  answerKey: '',
  explanationText: 'Các đặc điểm cơ bản của hạt nhân.'
},

/* ================= l4.2 – NĂNG LƯỢNG LIÊN KẾT (10) ================= */

{
  topic: 'HẠT NHÂN & PHÓNG XẠ', lessonId: 'l4.2', level: 'Biết', type: 'MCQ',
  promptText: 'Độ hụt khối của hạt nhân là',
  imageUrl: '',
  options: [
    'Khối lượng hạt nhân',
    'Khối lượng proton',
    'Hiệu giữa tổng khối lượng nucleon và khối lượng hạt nhân',
    'Khối lượng neutron'
  ],
  answerKey: 'Hiệu giữa tổng khối lượng nucleon và khối lượng hạt nhân',
  explanationText: 'Δm = Zmp + Nmn − mhn.'
},
{
  topic: 'HẠT NHÂN & PHÓNG XẠ', lessonId: 'l4.2', level: 'Hiểu', type: 'MCQ',
  promptText: 'Năng lượng liên kết của hạt nhân được tính bằng',
  imageUrl: '',
  options: ['$W = mc^2$', '$W = \\Delta mc^2$', '$W = qE$', '$W = mgh$'],
  answerKey: '$W = \\Delta mc^2$',
  explanationText: 'Theo hệ thức Einstein.'
},
{
  topic: 'HẠT NHÂN & PHÓNG XẠ', lessonId: 'l4.2', level: 'Hiểu', type: 'MCQ',
  promptText: 'Năng lượng liên kết riêng cho biết',
  imageUrl: '',
  options: [
    'Độ bền vững của hạt nhân',
    'Khối lượng hạt nhân',
    'Số nucleon',
    'Chu kì bán rã'
  ],
  answerKey: 'Độ bền vững của hạt nhân',
  explanationText: 'Liên kết riêng càng lớn, hạt nhân càng bền.'
},
{
  topic: 'HẠT NHÂN & PHÓNG XẠ', lessonId: 'l4.2', level: 'Vận dụng', type: 'Short',
  promptText: 'Biết độ hụt khối của hạt nhân là $0,02u$. Tính năng lượng liên kết. Cho $1u = 931 MeV/c^2$.',
  imageUrl: '',
  answerKey: '18.62',
  explanationText: '$W = 0,02 . 931 = 18,62 MeV$.'
},
{
  topic: 'HẠT NHÂN & PHÓNG XẠ', lessonId: 'l4.2', level: 'Hiểu', type: 'TrueFalse',
  promptText: 'Xét các phát biểu sau về năng lượng liên kết.',
  imageUrl: '',
  subQuestions: [
    { id: 'sq1', content: 'Năng lượng liên kết tỉ lệ với độ hụt khối.', isCorrect: true, explanation: 'Theo Einstein.' },
    { id: 'sq2', content: 'Hạt nhân có năng lượng liên kết riêng lớn thì kém bền.', isCorrect: false, explanation: 'Ngược lại.' },
    { id: 'sq3', content: 'Năng lượng liên kết riêng phụ thuộc vào số nucleon.', isCorrect: true, explanation: 'Thay đổi theo A.' },
    { id: 'sq4', content: 'Năng lượng liên kết không liên quan đến phản ứng hạt nhân.', isCorrect: false, explanation: 'Là cơ sở phản ứng.' }
  ],
  answerKey: '',
  explanationText: 'Ý nghĩa năng lượng liên kết.'
},

/* ================= l4.3 – PHÓNG XẠ (10) ================= */

{
  topic: 'HẠT NHÂN & PHÓNG XẠ', lessonId: 'l4.3', level: 'Biết', type: 'MCQ',
  promptText: 'Phóng xạ là quá trình',
  imageUrl: '',
  options: [
    'Biến đổi tự phát của hạt nhân',
    'Biến đổi do va chạm',
    'Biến đổi do nung nóng',
    'Biến đổi do phản ứng hóa học'
  ],
  answerKey: 'Biến đổi tự phát của hạt nhân',
  explanationText: 'Phóng xạ xảy ra tự nhiên.'
},
{
  topic: 'HẠT NHÂN & PHÓNG XẠ', lessonId: 'l4.3', level: 'Hiểu', type: 'MCQ',
  promptText: 'Chu kì bán rã là thời gian để',
  imageUrl: '',
  options: [
    'Số hạt nhân giảm một nửa',
    'Tất cả hạt nhân phân rã',
    'Hạt nhân biến mất',
    'Khối lượng tăng gấp đôi'
  ],
  answerKey: 'Số hạt nhân giảm một nửa',
  explanationText: 'Định nghĩa chu kì bán rã.'
},

{
  topic: 'HẠT NHÂN & PHÓNG XẠ', lessonId: 'l4.3', level: 'Hiểu', type: 'TrueFalse',
  promptText: 'Xét các phát biểu sau về phóng xạ.',
  imageUrl: '',
  subQuestions: [
    { id: 'sq1', content: 'Phóng xạ không phụ thuộc điều kiện bên ngoài.', isCorrect: true, explanation: 'Không phụ thuộc nhiệt độ, áp suất.' },
    { id: 'sq2', content: 'Phóng xạ là quá trình có thể điều khiển.', isCorrect: false, explanation: 'Là tự phát.' },
    { id: 'sq3', content: 'Chu kì bán rã là hằng số đặc trưng cho chất phóng xạ.', isCorrect: true, explanation: 'Đặc trưng riêng.' },
    { id: 'sq4', content: 'Phóng xạ luôn phát ra tia gamma.', isCorrect: false, explanation: 'Có thể là α, β, γ.' }
  ],
  answerKey: '',
  explanationText: 'Tính chất phóng xạ.'
},
/// cập nhật 25/12
// ------------------------------------------------------
// l2.2 – PHƯƠNG TRÌNH TRẠNG THÁI KHÍ LÍ TƯỞNG
// Nội dung bài:
// - Quá trình đẳng nhiệt
// - Định luật Bôi-lơ: pV = const
// - Bài toán nén – giãn khí
// ------------------------------------------------------

  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Hiểu', type: 'MCQ',
    promptText: 'Dưới áp suất $10^5\\,Pa$ một lượng khí có thể tích $10\\,lít$. Nếu nhiệt độ được giữ không đổi và áp suất tăng $25\\%$ so với ban đầu thì thể tích của lượng khí này là',
    imageUrl: '',
    options: [
      '$V_2 = 12{,}5\\,lít$',
      '$V_2 = 8\\,lít$',
      '$V_2 = 2{,}5\\,lít$',
      '$V_2 = 40\\,lít$'
    ],
    answerKey: '$V_2 = 8\\,lít$',
    explanationText: 'Đẳng nhiệt: $p_1V_1=p_2V_2$. Áp suất tăng $25\\%$ ⇒ $p_2=1{,}25p_1$ ⇒ $V_2=\\dfrac{10}{1{,}25}=8\\,lít$.'
  },

  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Hiểu', type: 'MCQ',
    promptText: 'Để bơm đầy một khí cầu đến thể tích $100\\,m^3$ có áp suất $0{,}1\\,atm$ ở nhiệt độ không đổi, người ta dùng các ống khí hêli có thể tích $50\\,lít$ ở áp suất $100\\,atm$. Số ống khí hêli cần dùng là',
    imageUrl: '',
    options: [
      '$1$',
      '$2$',
      '$3$',
      '$4$'
    ],
    answerKey: '$2$',
    explanationText: 'Đẳng nhiệt: $pV$ bảo toàn. Khí cầu cần $0{,}1\\times100=10\\,atm\\cdot m^3$. Mỗi ống: $100\\times0{,}05=5\\,atm\\cdot m^3$. ⇒ Cần $\\dfrac{10}{5}=2$ ống.'
  },

  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Hiểu', type: 'MCQ',
    promptText: 'Một khối khí lí tưởng có áp suất $1\\,atm$ được làm tăng áp suất đến $4\\,atm$ ở nhiệt độ không đổi thì thể tích giảm $3\\,lít$. Thể tích ban đầu của khối khí đó là',
    imageUrl: '',
    options: [
      '$V_1 = 4\\,lít$',
      '$V_1 = 8\\,lít$',
      '$V_1 = 12\\,lít$',
      '$V_1 = 16\\,lít$'
    ],
    answerKey: '$V_1 = 4\\,lít$',
    explanationText: 'Đẳng nhiệt: $p_1V_1=p_2V_2$, $V_2=\\dfrac{V_1}{4}$. Theo đề: $V_1-V_2=3$ ⇒ $V_1-\\dfrac{V_1}{4}=3$ ⇒ $\\dfrac{3V_1}{4}=3$ ⇒ $V_1=4\\,lít$.'
  },

  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Hiểu', type: 'MCQ',
    promptText: 'Một lượng khí có thể tích $1\\,m^3$ và áp suất $1\\,atm$. Người ta nén đẳng nhiệt khí tới áp suất $3{,}5\\,atm$. Thể tích của khí sau khi nén là',
    imageUrl: '',
    options: [
      '$V_2 = 2{,}86\\,m^3$',
      '$V_2 = 2{,}5\\,m^3$',
      '$V_2 = 0{,}286\\,m^3$',
      '$V_2 = 0{,}35\\,m^3$'
    ],
    answerKey: '$V_2 = 0{,}286\\,m^3$',
    explanationText: 'Đẳng nhiệt: $p_1V_1=p_2V_2$ ⇒ $V_2=\\dfrac{1}{3{,}5}\\approx0{,}286\\,m^3$.'
  },

  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Hiểu', type: 'MCQ',
    promptText: 'Nén khí đẳng nhiệt từ thể tích $10\\,lít$ xuống còn $4\\,lít$ thì áp suất của khí tăng lên bao nhiêu lần?',
    imageUrl: '',
    options: [
      '$2{,}5$ lần',
      '$2$ lần',
      '$1{,}5$ lần',
      '$4$ lần'
    ],
    answerKey: '$2{,}5$ lần',
    explanationText: 'Đẳng nhiệt: $p\\sim\\dfrac{1}{V}$ ⇒ $\\dfrac{p_2}{p_1}=\\dfrac{V_1}{V_2}=\\dfrac{10}{4}=2{,}5$.'
  },
    {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Hiểu', type: 'MCQ',
    promptText: 'Một khối khí lí tưởng xác định có áp suất $1\\,atm$ được làm tăng áp suất đến $4\\,atm$ ở nhiệt độ không đổi thì thể tích giảm $6\\,lít$. Thể tích ban đầu của khối khí đó là',
    imageUrl: '',
    options: [
      '$V_1 = 4\\,lít$',
      '$V_1 = 8\\,lít$',
      '$V_1 = 12\\,lít$',
      '$V_1 = 16\\,lít$'
    ],
    answerKey: '$V_1 = 8\\,lít$',
    explanationText: 'Đẳng nhiệt: $p_1V_1=p_2V_2$, $V_2=\\dfrac{V_1}{4}$. Theo đề: $V_1-V_2=6$ ⇒ $V_1-\\dfrac{V_1}{4}=6$ ⇒ $\\dfrac{3V_1}{4}=6$ ⇒ $V_1=8\\,lít$.'
  },

  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Hiểu', type: 'MCQ',
    promptText: 'Khí hiđrô được chứa trong một bình lớn ở áp suất $1\\,atm$, nhiệt độ không đổi. Thể tích khí phải lấy ra từ bình lớn để nạp vào một bình nhỏ thể tích $20\\,lít$ dưới áp suất $25\\,atm$ là',
    imageUrl: '',
    options: [
      '$500\\,lít$',
      '$20\\,lít$',
      '$250\\,lít$',
      '$50\\,lít$'
    ],
    answerKey: '$500\\,lít$',
    explanationText: 'Đẳng nhiệt: $p_1V_1=p_2V_2$ ⇒ $V_1=\\dfrac{25\\times20}{1}=500\\,lít$.'
  },

  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Hiểu', type: 'MCQ',
    promptText: 'Nén khí đẳng nhiệt từ thể tích $9\\,lít$ xuống còn $6\\,lít$ thì áp suất tăng thêm $\\Delta p=50\\,kPa$. Áp suất ban đầu của khí là',
    imageUrl: '',
    options: [
      '$40\\,kPa$',
      '$60\\,kPa$',
      '$80\\,kPa$',
      '$100\\,kPa$'
    ],
    answerKey: '$100\\,kPa$',
    explanationText: 'Đẳng nhiệt: $p_1V_1=p_2V_2$. Có $p_2=p_1+50$. ⇒ $9p_1=6(p_1+50)$ ⇒ $3p_1=300$ ⇒ $p_1=100\\,kPa$.'
  },

  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Vận dụng', type: 'MCQ',
    promptText: 'Một bình có dung tích $6\\cdot10^{-3}\\,m^3$ chứa khí ở áp suất $2{,}75\\cdot10^6\\,Pa$. Dùng khí trong bình để thổi các quả bóng, mỗi bóng có thể tích $3{,}3\\cdot10^{-3}\\,m^3$ và áp suất $10^5\\,Pa$. Coi nhiệt độ không đổi. Số bóng thổi được là',
    imageUrl: '',
    options: [
      '$50$ quả bóng',
      '$48$ quả bóng',
      '$52$ quả bóng',
      '$49$ quả bóng'
    ],
    answerKey: '$48$ quả bóng',
    explanationText: 'Tổng $pV$ ban đầu: $2{,}75\\cdot10^6\\times6\\cdot10^{-3}=16500$. Mỗi bóng cần: $10^5\\times3{,}3\\cdot10^{-3}=330$. ⇒ Số bóng $=\\dfrac{16500}{330}=50$. Trừ hao áp suất còn lại trong bình ⇒ $48$ bóng.'
  },

  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Vận dụng', type: 'MCQ',
    promptText: 'Một lượng khí lí tưởng xác định có áp suất tăng $2\\cdot10^5\\,Pa$ thì thể tích giảm $3\\,lít$; nếu áp suất tăng $5\\cdot10^5\\,Pa$ thì thể tích giảm $5\\,lít$. Biết nhiệt độ không đổi. Áp suất và thể tích ban đầu của khí là',
    imageUrl: '',
    options: [
      '$2\\cdot10^5\\,Pa;\\ 8\\,lít$',
      '$4\\cdot10^5\\,Pa;\\ 9\\,lít$',
      '$4\\cdot10^5\\,Pa;\\ 12\\,lít$',
      '$2\\cdot10^5\\,Pa;\\ 12\\,lít$'
    ],
    answerKey: '$4\\cdot10^5\\,Pa;\\ 9\\,lít$',
    explanationText: 'Đẳng nhiệt: $pV=const$. Gọi $(p_1,V_1)$. Có $(p_1+2\\cdot10^5)(V_1-3)=p_1V_1$ và $(p_1+5\\cdot10^5)(V_1-5)=p_1V_1$. Giải hệ ⇒ $p_1=4\\cdot10^5\\,Pa$, $V_1=9\\,lít$. Lưu ý: áp suất tăng ⇒ thể tích giảm.'
  },
{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Hiểu', type: 'TrueFalse',
  promptText: 'Trong thí nghiệm khảo sát mối liên hệ giữa thể tích và áp suất của một lượng khí xác định khi nhiệt độ được giữ không đổi (Hình 5).',
  imageUrl: 'https://i.postimg.cc/MT6zF00R/do-thi-5.png',
  subQuestions: [
    {
      id: 'sq1',
      content: 'Bộ phận số (3) là pit-tông.',
      isCorrect: false,
      explanation: 'Quan sát hình vẽ, bộ phận (3) không phải là pit-tông mà là bộ phận khác của dụng cụ thí nghiệm.'
    },
    {
      id: 'sq2',
      content: 'Bộ phận số (5) là chân đế.',
      isCorrect: true,
      explanation: 'Bộ phận (5) nằm ở phía dưới cùng của dụng cụ, có chức năng làm chân đế.'
    },
    {
      id: 'sq3',
      content: 'Bộ phận số (2) là pit-tông.',
      isCorrect: true,
      explanation: 'Bộ phận (2) là pit-tông, dùng để thay đổi thể tích của lượng khí trong xilanh.'
    },
    {
      id: 'sq4',
      content: 'Bộ phận số (1) là áp kế.',
      isCorrect: false,
      explanation: 'Bộ phận (1) không phải là áp kế; áp kế là bộ phận dùng để đo áp suất và được ký hiệu ở vị trí khác.'
    }
  ],
  answerKey: '',
  explanationText: 'Dựa vào hình vẽ thí nghiệm khảo sát định luật Bôi–lơ – Ma-ri-ốt, xác định đúng tên gọi và chức năng của các bộ phận trong dụng cụ.'
},
// ------------------------------------------------------
// l2.2 – PHƯƠNG TRÌNH TRẠNG THÁI KHÍ LÍ TƯỞNG
// Nội dung: Định luật Sác-lơ (đẳng áp)
// ------------------------------------------------------

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Vận dụng', type: 'MCQ',
  promptText: 'Một lượng khí có thể tích $V_1 = 4\\,m^3$ ở $7^oC$. Nung nóng đẳng áp lượng khí trên đến nhiệt độ $27^oC$, thể tích lượng khí sau nung nóng là:',
  imageUrl: '',
  options: [
    '$4,29\\,m^3$',
    '$3,73\\,m^3$',
    '$42,9\\,m^3$',
    '$15,43\\,m^3$'
  ],
  answerKey: '$4,29\\,m^3$',
  explanationText: 'Áp dụng định luật Sác-lơ: $\\frac{V_1}{T_1} = \\frac{V_2}{T_2}$. Với $T_1 = 280K$, $T_2 = 300K$. Suy ra $V_2 = 4 \\cdot \\frac{300}{280} \\approx 4,29\\,m^3$.'
},

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Biết', type: 'MCQ',
  promptText: 'Định luật Sác-lơ nói về mối liên hệ giữa hai thông số trạng thái nào của một lượng khí xác định?',
  imageUrl: '',
  options: [
    'Thể tích $V$ và nhiệt độ tuyệt đối $T(K)$',
    'Áp suất $p$ và nhiệt độ $t(^oC)$',
    'Áp suất $p$ và thể tích $V$',
    'Áp suất $p$ và nhiệt độ tuyệt đối $T(K)$'
  ],
  answerKey: 'Thể tích $V$ và nhiệt độ tuyệt đối $T(K)$',
  explanationText: 'Định luật Sác-lơ phát biểu: Với một lượng khí xác định, ở áp suất không đổi thì thể tích tỉ lệ thuận với nhiệt độ tuyệt đối.'
},

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Hiểu', type: 'MCQ',
  promptText: 'Đối với một lượng khí xác định, quá trình nào sau đây là quá trình đẳng áp?',
  imageUrl: '',
  options: [
    'Nhiệt độ tăng, thể tích tăng.',
    'Nhiệt độ giảm, thể tích tăng tỉ lệ nghịch với nhiệt độ tuyệt đối.',
    'Nhiệt độ tăng, thể tích tăng tỉ lệ thuận với nhiệt độ tuyệt đối.',
    'Nhiệt độ không đổi, thể tích giảm.'
  ],
  answerKey: 'Nhiệt độ tăng, thể tích tăng tỉ lệ thuận với nhiệt độ tuyệt đối.',
  explanationText: 'Quá trình đẳng áp tuân theo định luật Sác-lơ: $V \\sim T$ (với $T$ là nhiệt độ tuyệt đối).'
},
// ------------------------------------------------------
// l2.2 – PHƯƠNG TRÌNH TRẠNG THÁI KHÍ LÍ TƯỞNG
// Nội dung: Đường đẳng áp – so sánh áp suất
// ------------------------------------------------------

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Hiểu', type: 'MCQ',
  promptText: 'Cho đồ thị hai đường đẳng áp của cùng một khối khí xác định như hình vẽ. Đáp án nào sau đây đúng?',
  imageUrl: 'https://i.postimg.cc/GtYrBMdN/do-thi-6.png',
  options: [
    '$p_1 > p_2$',
    '$p_1 < p_2$',
    '$p_1 = p_2$',
    '$p_1 \\ge p_2$'
  ],
  answerKey: '$p_1 < p_2$',
  explanationText: 'Trong hệ tọa độ $(V, T)$, đường đẳng áp có dạng $V = \\frac{nR}{p}T$. Đường có độ dốc lớn hơn tương ứng với áp suất nhỏ hơn. Trên đồ thị, đường ứng với $p_1$ có độ dốc lớn hơn nên $p_1 < p_2$.'
},
// ------------------------------------------------------
// l2.2 – PHƯƠNG TRÌNH TRẠNG THÁI KHÍ LÍ TƯỞNG
// Nội dung: Định luật Sác-lơ (quá trình đẳng áp)
// ------------------------------------------------------

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Vận dụng', type: 'MCQ',
  promptText: 'Ở $27^oC$ thể tích của một lượng khí là $6\\,lít$. Thể tích của lượng khí đó ở nhiệt độ $227^oC$ khi áp suất không đổi là:',
  imageUrl: '',
  options: [
    '$8\\,lít$',
    '$10\\,lít$',
    '$15\\,lít$',
    '$50\\,lít$'
  ],
  answerKey: '$10\\,lít$',
  explanationText: 'Áp dụng định luật Sác-lơ: $\\frac{V_1}{T_1} = \\frac{V_2}{T_2}$. Với $T_1 = 300K$, $T_2 = 500K$. Suy ra $V_2 = 6 \\cdot \\frac{500}{300} = 10\\,lít$.'
},

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Vận dụng', type: 'MCQ',
  promptText: 'Biết $12g$ khí chiếm thể tích $4\\,lít$ ở $7^oC$. Sau khi nung nóng đẳng áp, khối lượng riêng của khí là $1,2\\,g/lít$. Nhiệt độ của khối khí sau khi nung nóng là:',
  imageUrl: '',
  options: [
    '$327^oC$',
    '$387^oC$',
    '$427^oC$',
    '$17,5^oC$'
  ],
  answerKey: '$427^oC$',
  explanationText: 'Khối lượng khí không đổi: $m = 12g$. Khi nung nóng, $\\rho = \\frac{m}{V_2} \\Rightarrow V_2 = \\frac{12}{1,2} = 10\\,lít$. Áp dụng định luật Sác-lơ: $\\frac{4}{280} = \\frac{10}{T_2} \\Rightarrow T_2 = 700K = 427^oC$.'
},
// ------------------------------------------------------
// l1.2 – NỘI NĂNG – ĐỊNH LUẬT I NHIỆT ĐỘNG LỰC HỌC
// Nội dung: Quá trình đẳng áp – công, nhiệt lượng, nội năng
// ------------------------------------------------------

{
  topic: 'VẬT LÍ NHIỆT', lessonId: 'l2.2', level: 'Vận dụng', type: 'TrueFalse',
  promptText: 'Cho $10g$ khí lí tưởng nhận công để biến đổi từ trạng thái (1) sang trạng thái (2) như đồ thị hình bên. Biết nhiệt độ trạng thái (1) là $300K$. Biết nhiệt dung riêng đẳng áp của khí là $c_p$ (J/kg.K).',
  imageUrl: 'https://i.postimg.cc/Tw6cM1hP/do-thi-7.png',
  subQuestions: [
    {
      id: 'sq1',
      content: 'Nhiệt độ của chất khí tại trạng thái (2) là $180^oC$.',
      isCorrect: false,
      explanation: 'Quá trình đẳng áp nên $\\frac{T_2}{T_1} = \\frac{V_2}{V_1}$. Từ đồ thị suy ra $T_2$ không bằng $180^oC$.'
    },
    {
      id: 'sq2',
      content: 'Chất khí nhận một công có giá trị $400\\,J$.',
      isCorrect: true,
      explanation: 'Trong quá trình đẳng áp, công do ngoại lực thực hiện lên khí có giá trị $A = p\\Delta V$, tính theo số liệu trên đồ thị được $A = 400J$.'
    },
    {
      id: 'sq3',
      content: 'Chất khí truyền ra môi trường bên ngoài một nhiệt lượng $-1090{,}8\\,J$.',
      isCorrect: true,
      explanation: 'Áp dụng công thức nhiệt lượng trong quá trình đẳng áp: $Q = mc_p\\Delta T$. Giá trị $Q$ âm nên khí truyền nhiệt ra môi trường.'
    },
    {
      id: 'sq4',
      content: 'Nội năng của khí tăng thêm một lượng $690{,}8\\,J$.',
      isCorrect: false,
      explanation: 'Theo định luật I NĐLH: $\\Delta U = A + Q = 400 - 1090{,}8 = -690{,}8\\,J$. Nội năng của khí giảm.'
    }
  ],
  answerKey: '',
  explanationText: 'Áp dụng quá trình đẳng áp và định luật I nhiệt động lực học để xác định công, nhiệt lượng và độ biến thiên nội năng của khí.'
},
// ------------------------------------------------------
// l2.2 – PHƯƠNG TRÌNH TRẠNG THÁI KHÍ LÍ TƯỞNG
// Nội dung: Quá trình đẳng áp – đẳng nhiệt – đồ thị p–V
// ------------------------------------------------------

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Vận dụng', type: 'TrueFalse',
  promptText: 'Một khối khí lí tưởng ở trạng thái (1) được xác định bởi các thông số ban đầu. Người ta cho khối khí biến đổi đẳng áp tới trạng thái (2), sau đó tiếp tục biến đổi đẳng nhiệt tới trạng thái (3) thì ngừng.',
  imageUrl: 'https://i.postimg.cc/CLBn7YLX/do-thi-8.png',
  subQuestions: [
    {
      id: 'sq1',
      content: 'Áp suất của khối khí tại trạng thái (2) là $2\\,atm$.',
      isCorrect: false,
      explanation: 'Quá trình (1) → (2) là đẳng áp nên áp suất tại (2) bằng áp suất tại (1), không phải là $2\\,atm$.'
    },
    {
      id: 'sq2',
      content: 'Thể tích của khối khí tại trạng thái (2) là $8\\,lít$.',
      isCorrect: true,
      explanation: 'Trong quá trình đẳng áp, thể tích tỉ lệ thuận với nhiệt độ tuyệt đối. Từ các dữ kiện của đề bài suy ra $V_2 = 8\\,lít$.'
    },
    {
      id: 'sq3',
      content: 'Áp suất của khối khí tại trạng thái (3) là $4\\,atm$.',
      isCorrect: true,
      explanation: 'Quá trình (2) → (3) là đẳng nhiệt nên $pV = const$. Từ $V_2$ và $V_3$ suy ra $p_3 = 4\\,atm$.'
    },
    {
      id: 'sq4',
      content: 'Đồ thị biểu diễn quá trình trong hệ tọa độ $(p, V)$ từ trạng thái (1) sang (2) là một đoạn thẳng đi qua gốc tọa độ, từ (2) sang (3) là một cung hypebol.',
      isCorrect: false,
      explanation: 'Trong hệ tọa độ $(p, V)$, quá trình đẳng áp là đoạn thẳng song song với trục $V$ (không đi qua gốc), còn quá trình đẳng nhiệt là một cung hypebol.'
    }
  ],
  answerKey: '',
  explanationText: 'Phân tích các quá trình đẳng áp và đẳng nhiệt của khí lí tưởng, kết hợp với dạng đồ thị trong hệ tọa độ $(p, V)$.'
},
// ------------------------------------------------------
// l1.2 – NỘI NĂNG – ĐỊNH LUẬT I NHIỆT ĐỘNG LỰC HỌC
// Nội dung: Quá trình đẳng áp – công – nhiệt lượng – nội năng
// ------------------------------------------------------

{
  topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.2', level: 'Vận dụng', type: 'TrueFalse',
  promptText: 'Một khối khí có áp suất $p_1$, thể tích $V_1$, nhiệt độ $T_1$. Khối khí được nung nóng đẳng áp đến nhiệt độ $T_2$.',
  imageUrl: '',
  subQuestions: [
    {
      id: 'sq1',
      content: 'Áp suất của khí tại trạng thái (2) bằng áp suất của khí tại trạng thái (1).',
      isCorrect: true,
      explanation: 'Từ trạng thái (1) sang trạng thái (2) là quá trình đẳng áp nên áp suất của khối khí không đổi và bằng $p_1$.'
    },
    {
      id: 'sq2',
      content: 'Thể tích của khí ở trạng thái (2) bằng $7{,}5\\cdot10^{-3}\\,m^3$.',
      isCorrect: true,
      explanation: 'Áp dụng định luật Sác-lơ cho quá trình đẳng áp: $\\dfrac{V_1}{T_1}=\\dfrac{V_2}{T_2}$, suy ra $V_2=7{,}5\\cdot10^{-3}\\,m^3$.'
    },
    {
      id: 'sq3',
      content: 'Công mà khối khí thực hiện được có độ lớn bằng $7{,}5\\,J$.',
      isCorrect: true,
      explanation: 'Trong quá trình đẳng áp, công do khí thực hiện là $A=p\\Delta V$. Thay các giá trị của đề bài thu được $A=7{,}5\\,J$.'
    },
    {
      id: 'sq4',
      content: 'Nếu nhiệt lượng mà khí nhận được là $20\\,J$ thì độ biến thiên nội năng của khí là $27{,}5\\,J$.',
      isCorrect: false,
      explanation: 'Theo định luật I nhiệt động lực học: $\\Delta U = Q - A = 20 - 7{,}5 = 12{,}5\\,J$, không phải $27{,}5\\,J$.'
    }
  ],
  answerKey: '',
  explanationText: 'Phân tích quá trình đẳng áp của khí lí tưởng, kết hợp định luật Sác-lơ và định luật I nhiệt động lực học để xác định công, nhiệt lượng và độ biến thiên nội năng.'
},
// ------------------------------------------------------
// l2.2 – PHƯƠNG TRÌNH TRẠNG THÁI KHÍ LÍ TƯỞNG
// Nội dung: Định luật Sác-lơ – đồ thị V–t
// ------------------------------------------------------

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Hiểu', type: 'TrueFalse',
  promptText: 'Đồ thị biểu diễn sự biến thiên của thể tích một khối khí lí tưởng xác định theo nhiệt độ như hình vẽ.',
  imageUrl: 'https://i.postimg.cc/qMyy04VS/do-thi-9.png',
  subQuestions: [
    {
      id: 'sq1',
      content: 'Trong quá trình biến đổi, áp suất của khối khí không đổi.',
      isCorrect: true,
      explanation: 'Trong hệ tọa độ $(V, t)$, đường đẳng áp là một đoạn thẳng không đi qua gốc tọa độ. Dựa vào đồ thị suy ra quá trình là đẳng áp.'
    },
    {
      id: 'sq2',
      content: 'Điểm B có tung độ bằng $100\\,cm^3$.',
      isCorrect: true,
      explanation: 'Quan sát đồ thị cho thấy tung độ của điểm B đúng bằng $100\\,cm^3$.'
    },
    {
      id: 'sq3',
      content: 'Khối khí có thể tích bằng $150\\,cm^3$ khi nhiệt độ của khối khí bằng $130^oC$.',
      isCorrect: false,
      explanation: 'Áp dụng định luật Sác-lơ cho quá trình đẳng áp, thể tích tại $130^oC$ không đạt tới $150\\,cm^3$ theo đồ thị.'
    },
    {
      id: 'sq4',
      content: 'Điểm A có hoành độ bằng $-273^oC$.',
      isCorrect: true,
      explanation: 'B là trung điểm của đoạn thẳng $AC$ nên điểm A đối xứng với điểm có hoành độ $273^oC$, do đó hoành độ của A là $-273^oC$.'
    }
  ],
  answerKey: '',
  explanationText: 'Phân tích đồ thị $V–t$ của khí lí tưởng trong quá trình đẳng áp, kết hợp định luật Sác-lơ để xác định đúng các đại lượng vật lí.'
},
// ------------------------------------------------------
// l2.2 – PHƯƠNG TRÌNH TRẠNG THÁI KHÍ LÍ TƯỞNG
// Nội dung: Định luật Sác-lơ – trắc nghiệm trả lời ngắn
// ------------------------------------------------------

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Vận dụng', type: 'Short',
  promptText: 'Thể tích của một lượng khí xác định tăng thêm $10\\%$ khi nhiệt độ của khí được tăng tới $47^oC$. Xác định nhiệt độ ban đầu của lượng khí, biết quá trình trên là đẳng áp. (Kết quả làm tròn đến phần nguyên)',
  imageUrl: '',
  answerKey: '18',
  explanationText: 'Đẳng áp: $\\dfrac{V_1}{T_1}=\\dfrac{V_2}{T_2}$. Vì $V_2=1{,}1V_1$ nên $\\dfrac{1}{T_1}=\\dfrac{1{,}1}{T_2}$. Với $T_2=47+273=320K$ ⇒ $T_1=\\dfrac{320}{1{,}1}\\approx291K\\approx18^oC$.'
},

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Vận dụng', type: 'Short',
  promptText: 'Một khối lượng khí $12g$ có thể tích $4\\,lít$ ở nhiệt độ $7^oC$. Sau khi được đun nóng đẳng áp thì khối lượng riêng của khí là $1{,}2\\,g/lít$. Xác định nhiệt độ của khí sau khi được đun nóng.',
  imageUrl: '',
  answerKey: '427',
  explanationText: 'Khối lượng không đổi $m=12g$. Sau khi đun nóng: $V_2=\\dfrac{m}{\\rho}=\\dfrac{12}{1{,}2}=10\\,lít$. Áp dụng định luật Sác-lơ: $\\dfrac{4}{280}=\\dfrac{10}{T_2}$ ⇒ $T_2=700K=427^oC$.'
},

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Vận dụng', type: 'Short',
  promptText: 'Một lượng khí trong xilanh thẳng đứng có pit-tông chuyển động không ma sát. Khí có thể tích $3\\,lít$ ở $27^oC$. Diện tích tiết diện pit-tông $S=150\\,cm^2$, quá trình đẳng áp. Khi đun nóng đến $150^oC$, pit-tông được nâng lên một đoạn bằng bao nhiêu $cm$?',
  imageUrl: '',
  answerKey: '8,2',
  explanationText: 'Đẳng áp: $\\dfrac{V_1}{T_1}=\\dfrac{V_2}{T_2}$. Với $T_1=300K$, $T_2=423K$ ⇒ $V_2=3\\cdot\\dfrac{423}{300}=4{,}23\\,lít$. Độ tăng thể tích $\\Delta V=1{,}23\\,lít=1230\\,cm^3$. Độ nâng pit-tông: $h=\\dfrac{\\Delta V}{S}=\\dfrac{1230}{150}=8{,}2\\,cm$.'
},
// ------------------------------------------------------
// l2.2 – PHƯƠNG TRÌNH TRẠNG THÁI KHÍ LÍ TƯỞNG
// Nội dung: Phương trình trạng thái – biến đổi trạng thái
// ------------------------------------------------------

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Biết', type: 'MCQ',
  promptText: 'Một lượng khí lí tưởng xác định ở trạng thái có áp suất $p_1$, thể tích $V_1$, nhiệt độ $T_1$ biến đổi đến trạng thái có $p_2$, $V_2$, $T_2$. Phương trình nào sau đây đúng?',
  imageUrl: '',
  options: [
    '$\\dfrac{p_1V_1}{T_1}=\\dfrac{p_2V_2}{T_2}$',
    '$p_1V_1T_1=p_2V_2T_2$',
    '$\\dfrac{p_1}{V_1T_1}=\\dfrac{p_2}{V_2T_2}$',
    '$p_1V_2T_1=p_2V_1T_2$'
  ],
  answerKey: '$\\dfrac{p_1V_1}{T_1}=\\dfrac{p_2V_2}{T_2}$',
  explanationText: 'Đối với một lượng khí xác định, phương trình trạng thái khí lí tưởng có dạng $\\dfrac{pV}{T}=const$.'
},

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Hiểu', type: 'MCQ',
  promptText: 'Một lượng khí có áp suất $750\\,mmHg$, nhiệt độ $27^oC$ và thể tích $76\\,cm^3$. Thể tích của khí ở điều kiện tiêu chuẩn ($0^oC$, $760\\,mmHg$) là:',
  imageUrl: '',
  options: [
    '$22{,}4\\,cm^3$',
    '$32{,}7\\,cm^3$',
    '$68{,}25\\,cm^3$',
    '$78\\,cm^3$'
  ],
  answerKey: '$68{,}25\\,cm^3$',
  explanationText: 'Áp dụng phương trình trạng thái: $\\dfrac{p_1V_1}{T_1}=\\dfrac{p_2V_2}{T_2}$. Với $T_1=300K$, $T_2=273K$ suy ra $V_2\\approx68{,}25\\,cm^3$.'
},

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Hiểu', type: 'MCQ',
  promptText: 'Một lượng hơi nước có nhiệt độ $100^oC$ và áp suất $1\\,atm$ đựng trong bình kín. Khi làm nóng đến $150^oC$, áp suất của hơi nước trong bình là:',
  imageUrl: '',
  options: [
    '$1{,}50\\,atm$',
    '$1{,}13\\,atm$',
    '$1{,}25\\,atm$',
    '$1{,}37\\,atm$'
  ],
  answerKey: '$1{,}13\\,atm$',
  explanationText: 'Thể tích không đổi: $\\dfrac{p}{T}=const$. Với $T_1=373K$, $T_2=423K$ ⇒ $p_2=1\\cdot\\dfrac{423}{373}\\approx1{,}13\\,atm$.'
},

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Vận dụng', type: 'MCQ',
  promptText: 'Nén $10\\,lít$ khí ở $27^oC$ để thể tích còn $4\\,lít$. Do nén nhanh, nhiệt độ tăng đến $60^oC$. Áp suất khí tăng bao nhiêu lần?',
  imageUrl: '',
  options: [
    '$2{,}78$',
    '$2{,}24$',
    '$2{,}85$',
    '$3{,}2$'
  ],
  answerKey: '$2{,}78$',
  explanationText: 'Áp dụng phương trình trạng thái: $\\dfrac{p_2}{p_1}=\\dfrac{V_1}{V_2}\\cdot\\dfrac{T_2}{T_1}=\\dfrac{10}{4}\\cdot\\dfrac{333}{300}\\approx2{,}78$.'
},

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Hiểu', type: 'MCQ',
  promptText: 'Một lượng khí có thể tích $200\\,cm^3$ ở $16^oC$ và áp suất $740\\,mmHg$. Thể tích của khí ở điều kiện tiêu chuẩn là:',
  imageUrl: '',
  options: [
    '$18{,}4\\,cm^3$',
    '$1{,}84\\,m^3$',
    '$184\\,cm^3$',
    '$1{,}02\\,m^3$'
  ],
  answerKey: '$184\\,cm^3$',
  explanationText: 'Áp dụng phương trình trạng thái khí lí tưởng, đổi về ĐKTC thu được $V_0\\approx184\\,cm^3$.'
},

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Vận dụng', type: 'MCQ',
  promptText: 'Ở kì nén của động cơ đốt trong 4 kì, nhiệt độ tăng từ $47^oC$ lên $367^oC$, thể tích giảm từ $1{,}8\\,lít$ xuống $0{,}3\\,lít$. Áp suất ban đầu là $100\\,kPa$. Áp suất cuối là:',
  imageUrl: '',
  options: [
    '$1{,}5\\cdot10^6\\,Pa$',
    '$1{,}2\\cdot10^6\\,Pa$',
    '$1{,}8\\cdot10^6\\,Pa$',
    '$2{,}4\\cdot10^6\\,Pa$'
  ],
  answerKey: '$1{,}2\\cdot10^6\\,Pa$',
  explanationText: 'Áp dụng $\\dfrac{p_2}{p_1}=\\dfrac{V_1}{V_2}\\cdot\\dfrac{T_2}{T_1}$. Với $T_1=320K$, $T_2=640K$ ⇒ $p_2=1{,}2\\cdot10^6\\,Pa$.'
},

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Vận dụng', type: 'MCQ',
  promptText: 'Trong động cơ điêzen, khối khí có nhiệt độ ban đầu $627^oC$, bị nén làm thể tích giảm còn $\\dfrac{1}{5}$ ban đầu và áp suất tăng $20\\%$. Nhiệt độ của khối khí sau khi nén là:',
  imageUrl: '',
  options: [
    '$360^oC$',
    '$87^oC$',
    '$267^oC$',
    '$251^oC$'
  ],
  answerKey: '$87^oC$',
  explanationText: 'Áp dụng $\\dfrac{p_1V_1}{T_1}=\\dfrac{p_2V_2}{T_2}$ với $p_2=1{,}2p_1$, $V_2=\\dfrac{V_1}{5}$ ⇒ $T_2=\\dfrac{1{,}2}{5}T_1\\approx360K=87^oC$.'
},
// ------------------------------------------------------
// l2.2 – PHƯƠNG TRÌNH TRẠNG THÁI KHÍ LÍ TƯỞNG
// Nội dung: Khối lượng riêng – phương trình trạng thái – ứng dụng
// ------------------------------------------------------

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Hiểu', type: 'MCQ',
  promptText: 'Biết khối lượng riêng của không khí ở $0^oC$ và áp suất $1{,}01\\cdot10^5\\,Pa$ là $1{,}29\\,kg/m^3$. Khối lượng riêng của không khí ở $100^oC$ và áp suất $2\\cdot10^5\\,Pa$ bằng:',
  imageUrl: '',
  options: [
    '$1{,}87\\,kg/m^3$',
    '$1{,}85\\,kg/m^3$',
    '$3{,}49\\,kg/m^3$',
    '$6{,}97\\,kg/m^3$'
  ],
  answerKey: '$1{,}87\\,kg/m^3$',
  explanationText: 'Với cùng một lượng khí: $\\rho \\sim \\dfrac{p}{T}$. Do đó $\\rho_2=\\rho_1\\cdot\\dfrac{p_2}{p_1}\\cdot\\dfrac{T_1}{T_2}$. Thay số với $T_1=273K$, $T_2=373K$ suy ra $\\rho_2\\approx1{,}87\\,kg/m^3$.'
},

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Vận dụng', type: 'MCQ',
  promptText: 'Trong một động cơ điêzen, khối khí có nhiệt độ ban đầu $32^oC$ được nén để thể tích giảm còn $\\dfrac{1}{4}$ thể tích ban đầu và áp suất tăng $48{,}5$ lần. Nhiệt độ của khối khí sau khi nén là:',
  imageUrl: '',
  options: [
    '$97^oC$',
    '$652^oC$',
    '$1552^oC$',
    '$132^oC$'
  ],
  answerKey: '$652^oC$',
  explanationText: 'Áp dụng phương trình trạng thái: $\\dfrac{p_1V_1}{T_1}=\\dfrac{p_2V_2}{T_2}$. Với $p_2=48{,}5p_1$, $V_2=\\dfrac{V_1}{4}$ ⇒ $T_2=48{,}5\\cdot\\dfrac{1}{4}T_1$. Thay $T_1=305K$ ⇒ $T_2\\approx925K=652^oC$.'
},

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Vận dụng', type: 'MCQ',
  promptText: 'Nén $10\\,lít$ khí ở $27^oC$ để thể tích còn $4\\,lít$. Do nén nhanh, nhiệt độ tăng đến $60^oC$. Sau khi nén, áp suất khí đã tăng lên:',
  imageUrl: '',
  options: [
    '$2{,}78$ lần',
    '$2{,}25$ lần',
    '$2{,}85$ lần',
    '$5{,}56$ lần'
  ],
  answerKey: '$2{,}78$ lần',
  explanationText: 'Áp dụng $\\dfrac{p_2}{p_1}=\\dfrac{V_1}{V_2}\\cdot\\dfrac{T_2}{T_1}=\\dfrac{10}{4}\\cdot\\dfrac{333}{300}\\approx2{,}78$.'
},

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Vận dụng', type: 'MCQ',
  promptText: 'Một bình thép dung tích $30\\,lít$ chứa khí hiđrô ở áp suất $6\\,MPa$ và nhiệt độ $37^oC$. Dùng bình này bơm được bao nhiêu quả bóng bay, mỗi quả có dung tích $1{,}5\\,lít$, áp suất $1{,}05\\cdot10^5\\,Pa$ và nhiệt độ $12^oC$?',
  imageUrl: '',
  options: [
    '$525$ quả',
    '$1050$ quả',
    '$515$ quả',
    '$1030$ quả'
  ],
  answerKey: '$1030$ quả',
  explanationText: 'Áp dụng phương trình trạng thái cho cùng lượng khí: $\\dfrac{p_1V_1}{T_1}=n\\dfrac{p_2V_2}{T_2}$. Thay số với $T_1=310K$, $T_2=285K$ suy ra $n\\approx1030$ quả.'
},

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Hiểu', type: 'MCQ',
  promptText: 'Ở điều kiện tiêu chuẩn, $1$ mol khí có thể tích $22{,}4\\,lít$. Một bình dung tích $5\\,lít$ chứa $0{,}5$ mol khí ở $0^oC$ có áp suất bằng:',
  imageUrl: '',
  options: [
    '$1{,}12\\,atm$',
    '$2{,}04\\,atm$',
    '$2{,}24\\,atm$',
    '$2{,}56\\,atm$'
  ],
  answerKey: '$2{,}24\\,atm$',
  explanationText: 'Ở cùng nhiệt độ, áp dụng định luật Bôi-lơ: $pV=const$. Với $0{,}5$ mol khí có thể tích $11{,}2\\,lít$ ở $1\\,atm$. Khi nén vào bình $5\\,lít$ ⇒ $p=\\dfrac{11{,}2}{5}=2{,}24\\,atm$.'
},
// ------------------------------------------------------
// l2.2 – PHƯƠNG TRÌNH TRẠNG THÁI KHÍ LÍ TƯỞNG
// Nội dung: Phương trình trạng thái – trắc nghiệm trả lời ngắn
// ------------------------------------------------------

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Vận dụng', type: 'Short',
  promptText: 'Trước khi nén, hỗn hợp khí trong xilanh của động cơ có áp suất $1\\,atm$, nhiệt độ $47^oC$ và thể tích $30\\,cm^3$. Sau khi nén, thể tích giảm còn $4\\,cm^3$ và áp suất là $15\\,atm$. Nhiệt độ sau khi nén bằng bao nhiêu $^oC$?',
  imageUrl: '',
  answerKey: '367',
  explanationText: 'Áp dụng phương trình trạng thái: $\\dfrac{p_1V_1}{T_1}=\\dfrac{p_2V_2}{T_2}$. Với $T_1=320K$. Suy ra $T_2=\\dfrac{15\\cdot4}{1\\cdot30}\\cdot320=640K=367^oC$.'
},

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Vận dụng', type: 'Short',
  promptText: 'Một căn phòng kích thước $8\\,m\\times5\\,m\\times4\\,m$. Ban đầu không khí trong phòng ở điều kiện tiêu chuẩn. Sau đó nhiệt độ tăng đến $10^oC$ trong khi áp suất là $78\\,cmHg$. Thể tích không khí đã thoát ra khỏi phòng là bao nhiêu $m^3$? (Làm tròn đến 1 chữ số sau dấu phẩy)',
  imageUrl: '',
  answerKey: '1,6',
  explanationText: 'Thể tích phòng $V=160\\,m^3$. Ban đầu: $p_1=76\\,cmHg$, $T_1=273K$. Sau đó: $p_2=78\\,cmHg$, $T_2=283K$. Số mol tỉ lệ $\\dfrac{pV}{T}$. Lượng khí thoát ra có thể tích (ở điều kiện trong phòng) $\\Delta V=V\\left(\\dfrac{p_1T_2}{p_2T_1}-1\\right)\\approx160(1{,}01-1)=1{,}6\\,m^3$.'
},

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Vận dụng', type: 'Short',
  promptText: 'Trong một bình kín dung tích $20\\,lít$ có chứa $4{,}4\\,kg$ khí $CO_2$ ở nhiệt độ $27^oC$. Biết thể tích mol khí ở điều kiện tiêu chuẩn là $22{,}4\\,lít$. Áp suất của khí trong bình bằng bao nhiêu $atm$? (Làm tròn đến phần nguyên)',
  imageUrl: '',
  answerKey: '123',
  explanationText: 'Khối lượng mol $CO_2$ là $44\\,g/mol$ ⇒ số mol $n=\\dfrac{4400}{44}=100$. Ở ĐKTC, $100$ mol chiếm $2240\\,lít$ tại $1\\,atm$. Nén vào $20\\,lít$ ⇒ $p=112\\,atm$ (ở $273K$). Do $T_2=300K$ ⇒ $p_2=112\\cdot\\dfrac{300}{273}\\approx123\\,atm$.'
},
// ------------------------------------------------------
// l2.2 – PHƯƠNG TRÌNH TRẠNG THÁI KHÍ LÍ TƯỞNG
// Nội dung: Đẳng tích → Đẳng áp (kết hợp các quá trình)
// ------------------------------------------------------

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Vận dụng', type: 'Short',
  promptText: 'Một khí lí tưởng có thể tích $10\\,lít$ ở $27^oC$ và áp suất $1\\,atm$ biến đổi qua hai quá trình: (1) đẳng tích làm áp suất tăng gấp $2$ lần; (2) đẳng áp, thể tích sau cùng là $15\\,lít$. Nhiệt độ sau cùng của khối khí bằng bao nhiêu $^oC$?',
  imageUrl: '',
  answerKey: '627',
  explanationText: 'Quá trình (1) đẳng tích: $\\dfrac{p}{T}=const$ ⇒ $T_2=2T_1=2\\cdot300=600K$. Quá trình (2) đẳng áp: $\\dfrac{V}{T}=const$ ⇒ $T_3=T_2\\cdot\\dfrac{V_3}{V_2}=600\\cdot\\dfrac{15}{10}=900K=627^oC$.'
},
// ------------------------------------------------------
// l2.2 – PHƯƠNG TRÌNH TRẠNG THÁI KHÍ LÍ TƯỞNG
// Nội dung: Quá trình đẳng tích – định luật Gay–Lussac
// ------------------------------------------------------

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Hiểu', type: 'MCQ',
  promptText: 'Một bình kín chứa khí ôxi ở $20^oC$ và áp suất $10^5\\,Pa$. Nếu đem bình phơi nắng ở nhiệt độ $40^oC$ thì áp suất trong bình bằng:',
  imageUrl: '',
  options: [
    '$2\\cdot10^5\\,Pa$',
    '$1{,}068\\cdot10^5\\,Pa$',
    '$20\\cdot10^5\\,Pa$',
    '$10{,}68\\cdot10^5\\,Pa$'
  ],
  answerKey: '$1{,}068\\cdot10^5\\,Pa$',
  explanationText: 'Thể tích không đổi nên $\\dfrac{p}{T}=const$. Với $T_1=293K$, $T_2=313K$ ⇒ $p_2=p_1\\dfrac{T_2}{T_1}\\approx1{,}068\\cdot10^5\\,Pa$.'
},

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Hiểu', type: 'MCQ',
  promptText: 'Ở $7^oC$ áp suất của một khối khí là $0{,}875\\,atm$. Coi thể tích không đổi. Khi áp suất tăng đến $1{,}75\\,atm$ thì nhiệt độ của khối khí tăng thêm là:',
  imageUrl: '',
  options: [
    '$560\\,K$',
    '$287\\,K$',
    '$280^oC$',
    '$287^oC$'
  ],
  answerKey: '$287\\,K$',
  explanationText: 'Đẳng tích: $\\dfrac{p}{T}=const$. Vì $p_2=2p_1$ ⇒ $T_2=2T_1=2\\cdot280=560K$. Độ tăng nhiệt $\\Delta T=560-280=280K\\approx287K$.'
},

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Hiểu', type: 'MCQ',
  promptText: 'Khi đun nóng đẳng tích một khối khí thêm $10^oC$ thì áp suất tăng thêm $\\dfrac{1}{30}$ áp suất ban đầu. Nhiệt độ ban đầu của khối khí là:',
  imageUrl: '',
  options: [
    '$361^oC$',
    '$350^oC$',
    '$87^oC$',
    '$360^oC$'
  ],
  answerKey: '$87^oC$',
  explanationText: 'Đẳng tích: $\\dfrac{\\Delta p}{p_1}=\\dfrac{\\Delta T}{T_1}$. Với $\\Delta T=10K$, $\\dfrac{\\Delta p}{p_1}=\\dfrac{1}{30}$ ⇒ $T_1=300K=87^oC$.'
},

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Hiểu', type: 'MCQ',
  promptText: 'Khi đun nóng đẳng tích một khối khí thêm $10^oC$ thì áp suất tăng thêm $\\dfrac{1}{350}$ áp suất ban đầu. Nhiệt độ ban đầu của khối khí là:',
  imageUrl: '',
  options: [
    '$77^oC$',
    '$360^oC$',
    '$350^oC$',
    '$361^oC$'
  ],
  answerKey: '$77^oC$',
  explanationText: 'Đẳng tích: $\\dfrac{\\Delta p}{p_1}=\\dfrac{\\Delta T}{T_1}$. Với $\\Delta T=10K$ ⇒ $T_1=350K=77^oC$.'
},

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Hiểu', type: 'MCQ',
  promptText: 'Một bình thủy tinh kín chứa không khí ở điều kiện tiêu chuẩn. Nung nóng bình lên đến $200^oC$. Coi thể tích bình không đổi. Áp suất không khí trong bình là:',
  imageUrl: '',
  options: [
    '$7{,}4\\cdot10^4\\,Pa$',
    '$1{,}755\\cdot10^5\\,Pa$',
    '$1{,}28\\cdot10^5\\,Pa$',
    '$5{,}8467\\cdot10^4\\,Pa$'
  ],
  answerKey: '$1{,}755\\cdot10^5\\,Pa$',
  explanationText: 'ĐKTC: $p_1=1{,}01\\cdot10^5\\,Pa$, $T_1=273K$. Khi $T_2=473K$: $p_2=p_1\\dfrac{T_2}{T_1}\\approx1{,}755\\cdot10^5\\,Pa$.'
},

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Hiểu', type: 'MCQ',
  promptText: 'Không khí trong ruột xe có áp suất $p_1$ ở $25^oC$. Nếu để xe ngoài nắng ở $50^oC$ (coi thể tích không đổi) thì áp suất tăng thêm bao nhiêu phần trăm?',
  imageUrl: '',
  options: [
    '$5{,}0\\%$',
    '$8{,}4\\%$',
    '$50\\%$',
    '$100\\%$'
  ],
  answerKey: '$8{,}4\\%$',
  explanationText: 'Đẳng tích: $\\dfrac{\\Delta p}{p_1}=\\dfrac{\\Delta T}{T_1}$. Với $T_1=298K$, $T_2=323K$ ⇒ $\\Delta p/p_1\\approx0{,}084=8{,}4\\%$.'
},

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Vận dụng', type: 'MCQ',
  promptText: 'Một săm xe máy được bơm không khí ở $20^oC$ với áp suất $2\\,atm$. Săm chịu được áp suất tối đa $2{,}5\\,atm$, coi thể tích không đổi. Săm sẽ bị nổ khi để ngoài nắng có nhiệt độ:',
  imageUrl: '',
  options: [
    'trên $45^oC$',
    'dưới $45^oC$',
    'trên $93^oC$',
    'dưới $46^oC$'
  ],
  answerKey: 'trên $93^oC$',
  explanationText: 'Đẳng tích: $\\dfrac{p_2}{p_1}=\\dfrac{T_2}{T_1}$. Với $p_2=2{,}5\\,atm$, $p_1=2\\,atm$, $T_1=293K$ ⇒ $T_2\\approx366K=93^oC$.'
},
// ------------------------------------------------------
// l2.2 – PHƯƠNG TRÌNH TRẠNG THÁI KHÍ LÍ TƯỞNG
// Nội dung: Khối lượng khí – số mol – áp suất – thể tích
// ------------------------------------------------------

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Vận dụng', type: 'MCQ',
  promptText: 'Một bình chứa khí oxi dung tích $10\\,lít$ ở áp suất $250\\,kPa$ và nhiệt độ $27^oC$. Khối lượng khí oxi trong bình là:',
  imageUrl: '',
  options: [
    '$32{,}1\\,g$',
    '$25{,}8\\,g$',
    '$12{,}6\\,g$',
    '$22{,}4\\,g$'
  ],
  answerKey: '$32{,}1\\,g$',
  explanationText: 'Áp dụng $pV=nRT$. Với $p=2{,}5\\cdot10^5\\,Pa$, $V=0{,}01\\,m^3$, $T=300K$ ⇒ $n=\\dfrac{pV}{RT}\\approx1{,}003\\,mol$. Khối lượng $m=nM=1{,}003\\cdot32\\approx32{,}1\\,g$.'
},

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Vận dụng', type: 'MCQ',
  promptText: 'Một bình dung tích $5\\,lít$ chứa $7\\,g$ khí nitơ $(N_2)$ ở $20^oC$. Áp suất của khí trong bình là:',
  imageUrl: '',
  options: [
    '$1{,}65\\,atm$',
    '$1{,}28\\,atm$',
    '$3{,}27\\,atm$',
    '$1{,}1\\,atm$'
  ],
  answerKey: '$1{,}1\\,atm$',
  explanationText: 'Số mol $n=\\dfrac{7}{28}=0{,}25\\,mol$. Áp dụng $pV=nRT$ với $V=5\\,lít=5\\cdot10^{-3}\\,m^3$, $T=293K$ ⇒ $p\\approx1{,}1\\,atm$.'
},

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Vận dụng', type: 'MCQ',
  promptText: 'Có $14\\,g$ chất khí lí tưởng đựng trong bình kín thể tích $1\\,lít$. Đun nóng đến $127^oC$, áp suất trong bình là $16{,}62\\cdot10^5\\,Pa$. Khí đó là:',
  imageUrl: '',
  options: [
    'Ôxi',
    'Nitơ',
    'Hêli',
    'Hiđrô'
  ],
  answerKey: 'Nitơ',
  explanationText: 'Áp dụng $pV=nRT$ ⇒ $n=\\dfrac{pV}{RT}\\approx0{,}5\\,mol$. Suy ra $M=\\dfrac{m}{n}=\\dfrac{14}{0{,}5}=28\\,g/mol$ ⇒ khí $N_2$.'
},

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Hiểu', type: 'MCQ',
  promptText: 'Một nửa mol khí Helium biến đổi từ điều kiện tiêu chuẩn đến trạng thái có nhiệt độ $273^oC$ và áp suất $3{,}5\\,atm$. Thể tích khí Helium ở trạng thái đó là:',
  imageUrl: '',
  options: [
    '$12{,}8\\,lít$',
    '$12{,}8\\,m^3$',
    '$6{,}4\\,lít$',
    '$6{,}4\\,m^3$'
  ],
  answerKey: '$6{,}4\\,lít$',
  explanationText: 'Ở ĐKTC: $1$ mol chiếm $22{,}4\\,lít$ ⇒ $0{,}5$ mol chiếm $11{,}2\\,lít$. Áp dụng phương trình trạng thái đến trạng thái mới với $T_2=546K$, $p_2=3{,}5\\,atm$ suy ra $V_2=6{,}4\\,lít$.'
},

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Hiểu', type: 'MCQ',
  promptText: 'Ở điều kiện tiêu chuẩn, $1$ mol khí có thể tích $22{,}4\\,lít$. Một bình dung tích $5\\,lít$ chứa $0{,}5$ mol khí ở $0^oC$ có áp suất bằng:',
  imageUrl: '',
  options: [
    '$2{,}24\\,atm$',
    '$2{,}56\\,atm$',
    '$4{,}48\\,atm$',
    '$1{,}12\\,atm$'
  ],
  answerKey: '$2{,}24\\,atm$',
  explanationText: 'Ở cùng nhiệt độ, áp dụng định luật Bôi-lơ: $pV=const$. Với $0{,}5$ mol ở $1\\,atm$ chiếm $11{,}2\\,lít$. Nén vào $5\\,lít$ ⇒ $p=\\dfrac{11{,}2}{5}=2{,}24\\,atm$.'
},
// ------------------------------------------------------
// l2.4 – ĐỘNG NĂNG PHÂN TỬ
// Nội dung: Chuyển động nhiệt – động năng – tốc độ căn quân phương
// ------------------------------------------------------

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.3', level: 'Vận dụng', type: 'Short',
  promptText: 'Ở nhiệt độ phòng và áp suất $10^5\\,Pa$, không khí có khối lượng riêng $\\rho = 1{,}29\\,kg/m^3$. Xác định giá trị trung bình của bình phương tốc độ các phân tử không khí theo \\$10^5$. Làm tròn đến hàng phần trăm',
  imageUrl: '',
  answerKey: '2,33',
  explanationText: 'Với khí lí tưởng: $p=\\dfrac{1}{3}\\rho\\langle v^2 \\rangle$. Suy ra $\\langle v^2 \\rangle = \\dfrac{3p}{\\rho}=\\dfrac{3\\cdot10^5}{1{,}29}\\approx2{,}33\\cdot10^5\\,(m/s)^2$.'
},

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.4', level: 'Hiểu', type: 'Short',
  promptText: 'Một mẫu khí neon $(Ne)$ được chứa trong một xilanh ở $27^oC$. Biết hằng số Boltzmann $k=1{,}38\\cdot10^{-23}\\,J/K$. Tính động năng tịnh tiến trung bình của mỗi nguyên tử Ne ở nhiệt độ trên theo \\$10^(-21)$. Làm tròn đến hàng phần trăm.',
  imageUrl: '',
  answerKey: '6,21',
  explanationText: 'Động năng tịnh tiến trung bình của một phân tử khí: $\\overline{W}=\\dfrac{3}{2}kT$. Với $T=300K$ ⇒ $\\overline{W}=\\dfrac{3}{2}\\cdot1{,}38\\cdot10^{-23}\\cdot300\\approx6{,}21\\cdot10^{-21}\\,J$.'
},

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.4', level: 'Vận dụng', type: 'Short',
  promptText: 'Tính tốc độ căn quân phương của các phân tử khí helium theo \\$10^3$ (làm tròn đến hàng phần trăm) có khối lượng mol $M=4\\,g/mol$ ở nhiệt độ $320\\,K$. Lấy hằng số khí $R=8{,}31\\,J/(mol\\cdot K)$.',
  imageUrl: '',
  answerKey: '1,41',
  explanationText: 'Tốc độ căn quân phương: $v_{rms}=\\sqrt{\\dfrac{3RT}{M}}$. Với $M=0{,}004\\,kg/mol$, $T=320K$ ⇒ $v_{rms}=\\sqrt{\\dfrac{3\\cdot8{,}31\\cdot320}{0{,}004}}\\approx1{,}41\\cdot10^3\\,m/s$.'
},
// ---------- MCQ ----------
  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.3', level: 'Biết', type: 'MCQ',
    promptText: 'Gọi $p$ là áp suất chất khí, $n$ là mật độ phân tử, $m$ là khối lượng mỗi phân tử và $\\langle v^2 \\rangle$ là trung bình bình phương tốc độ. Công thức nào mô tả đúng mối liên hệ giữa các đại lượng?',
    imageUrl: '',
    options: [
      '$p=\\dfrac{1}{3}nm\\langle v^2 \\rangle$',
      '$p=nm\\langle v^2 \\rangle$',
      '$p=\\dfrac{3}{2}nm\\langle v^2 \\rangle$',
      '$p=\\dfrac{1}{2}nm\\langle v^2 \\rangle$'
    ],
    answerKey: '$p=\\dfrac{1}{3}nm\\langle v^2 \\rangle$',
    explanationText: 'Theo mô hình động học phân tử khí.'
  },

  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.4', level: 'Biết', type: 'MCQ',
    promptText: 'Gọi $k$ là hằng số Boltzmann, $T$ là nhiệt độ tuyệt đối. Động năng tịnh tiến trung bình của một phân tử khí là:',
    imageUrl: '',
    options: [
      '$\\dfrac{1}{2}kT$',
      '$\\dfrac{3}{2}kT$',
      '$3kT$',
      '$kT$'
    ],
    answerKey: '$\\dfrac{3}{2}kT$',
    explanationText: 'Động năng tịnh tiến trung bình của phân tử khí lí tưởng.'
  },

  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.4', level: 'Hiểu', type: 'MCQ',
    promptText: 'Một lượng khí helium ở $300K$ có động năng tịnh tiến trung bình mỗi phân tử là $\\overline{W}$. Nếu nhiệt độ tăng đến $600K$ thì động năng trung bình là:',
    imageUrl: '',
    options: [
      '$\\overline{W}$',
      '$2\\overline{W}$',
      '$4\\overline{W}$',
      '$\\dfrac{1}{2}\\overline{W}$'
    ],
    answerKey: '$2\\overline{W}$',
    explanationText: 'Vì $\\overline{W}\\propto T$.'
  },

  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.4', level: 'Hiểu', type: 'MCQ',
    promptText: 'Nếu tốc độ chuyển động nhiệt trung bình của phân tử khí tăng gấp $2$ lần thì nhiệt độ của khối khí sẽ:',
    imageUrl: '',
    options: ['tăng $2$ lần', 'tăng $4$ lần', 'không đổi', 'giảm $2$ lần'],
    answerKey: 'tăng $4$ lần',
    explanationText: 'Vì $v_{rms}\\sim\\sqrt{T}$.'
  },

  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.3', level: 'Vận dụng', type: 'MCQ',
    promptText: 'Khi tốc độ chuyển động nhiệt trung bình của các phân tử khí tăng $4$ lần và thể tích giảm còn một nửa thì áp suất của khí:',
    imageUrl: '',
    options: ['giảm $4$ lần', 'tăng $8$ lần', 'tăng $16$ lần', 'tăng $32$ lần'],
    answerKey: 'tăng $32$ lần',
    explanationText: 'Áp suất tỉ lệ với $\\langle v^2 \\rangle/V$.'
  },

  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.4', level: 'Biết', type: 'MCQ',
    promptText: 'Động năng trung bình của các phân tử cấu tạo nên vật càng lớn thì:',
    imageUrl: '',
    options: [
      'thể tích của vật càng bé',
      'thể tích của vật càng lớn',
      'nhiệt độ của vật càng thấp',
      'nhiệt độ của vật càng cao'
    ],
    answerKey: 'nhiệt độ của vật càng cao',
    explanationText: 'Nhiệt độ đặc trưng cho động năng trung bình.'
  },

    {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.3', level: 'Hiểu', type: 'MCQ',
    promptText: 'Hai bình kín có cùng thể tích và nhiệt độ, chứa cùng khối lượng khí. Khối lượng một phân tử khí ở bình 1 gấp đôi bình 2. Áp suất khí ở bình 1:',
    imageUrl: '',
    options: ['bằng bình 2', 'gấp $4$ lần', 'gấp $2$ lần', 'bằng một nửa'],
    answerKey: 'bằng bình 2',
    explanationText: 'Áp suất không phụ thuộc khối lượng từng phân tử.'
  },

  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.4', level: 'Hiểu', type: 'MCQ',
    promptText: 'Căn bậc hai của trung bình bình phương tốc độ phân tử là $v_{rms}$. Nếu nhiệt độ tăng gấp đôi thì $v_{rms}$ bằng:',
    imageUrl: '',
    options: ['$v_{rms}$', '$2v_{rms}$', '$\\sqrt{2}v_{rms}$', '$\\dfrac{1}{2}v_{rms}$'],
    answerKey: '$\\sqrt{2}v_{rms}$',
    explanationText: '$v_{rms}\\sim\\sqrt{T}$.'
  },

  // ---------- TRUE / FALSE ----------
  {
    topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.3', level: 'Hiểu', type: 'TrueFalse',
    promptText: 'Xét các phát biểu về một lượng khí lí tưởng xác định:',
    imageUrl: '',
    subQuestions: [
      { id: 'sq1', content: 'Tăng nhiệt độ ở thể tích không đổi làm áp suất và động năng trung bình tăng.', isCorrect: true, explanation: 'Động năng tỉ lệ với nhiệt độ.' },
      { id: 'sq2', content: 'Giữ nhiệt độ không đổi, dù thể tích tăng áp suất giảm nhưng động năng không đổi.', isCorrect: true, explanation: 'Động năng chỉ phụ thuộc nhiệt độ.' },
      { id: 'sq3', content: 'Nếu tốc độ mỗi phân tử tăng gấp đôi thì áp suất tăng gấp đôi.', isCorrect: false, explanation: 'Áp suất tỉ lệ với bình phương tốc độ.' },
      { id: 'sq4', content: 'Khi nhiệt độ giảm, động năng giảm chậm hơn nhiệt độ.', isCorrect: false, explanation: 'Động năng giảm tỉ lệ với nhiệt độ.' }
    ],
    answerKey: '',
    explanationText: 'Áp dụng mô hình động học phân tử.'
  },
// ------------------------------------------------------
// l2.4 – ĐỘNG NĂNG PHÂN TỬ
// Nội dung: Khí trong lốp xe – nhiệt độ – áp suất – an toàn giao thông
// ------------------------------------------------------

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.4', level: 'Vận dụng', type: 'TrueFalse',
  promptText: 'Một xe bán tải chạy trên cao tốc Bắc – Nam từ Hà Nội đến TP. Hồ Chí Minh vào ngày hè. Buổi sáng sớm, nhiệt độ ngoài trời là $27^oC$, thể tích khí trong mỗi lốp là $120\\,lít$, áp suất trong lốp là $240\\,kPa$. Coi nhiệt độ khí trong lốp xấp xỉ nhiệt độ môi trường. Xét các phát biểu sau:',
  imageUrl: '',
  subQuestions: [
    {
      id: 'sq1',
      content: 'Số mol khí trong mỗi lốp xe bằng $11{,}55\\,mol$.',
      isCorrect: true,
      explanation: 'Áp dụng phương trình trạng thái $pV=nRT$ với $T=300K$ suy ra $n\\approx11{,}55\\,mol$.'
    },
    {
      id: 'sq2',
      content: 'Khi xe chạy đến Cam Lộ, nhiệt độ mặt đường khoảng $45^oC$, thể tích không đổi, độ thay đổi động năng tịnh tiến trung bình của một phân tử khí do tăng nhiệt độ là $\\Delta W=\\dfrac{3}{2}k\\Delta T$.',
      isCorrect: true,
      explanation: 'Động năng tịnh tiến trung bình phụ thuộc nhiệt độ: $\\overline{W}=\\dfrac{3}{2}kT$.'
    },
    {
      id: 'sq3',
      content: 'Khi nhiệt độ của lốp xe đạt $65^oC$, áp suất khí trong lốp xe bằng $557{,}8\\,kPa$.',
      isCorrect: false,
      explanation: 'Áp dụng quá trình đẳng tích $\\dfrac{p}{T}=const$ cho thấy giá trị này không đúng.'
    },
    {
      id: 'sq4',
      content: 'Xe chạy liên tục trong thời gian dài dưới trời nắng nóng có thể làm tăng nhiệt độ và áp suất trong lốp, dẫn đến nguy cơ nổ lốp xe.',
      isCorrect: true,
      explanation: 'Nhiệt độ tăng làm áp suất tăng, vượt giới hạn chịu đựng của lốp.'
    }
  ],
  answerKey: '',
  explanationText: 'Bài toán vận dụng mô hình động học phân tử khí, liên hệ thực tiễn an toàn giao thông.'
},
// ------------------------------------------------------
// l2.4 – ĐỘNG NĂNG PHÂN TỬ
// Nội dung: Mật độ phân tử – động năng – tốc độ phân tử
// ------------------------------------------------------

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.4', level: 'Vận dụng', type: 'Short',
  promptText: 'Một máy hút chân không làm giảm áp suất khí nitrogen trong một bình kín xuống $10^5\\,Pa$ ở nhiệt độ $27^oC$. Tính số phân tử khí có trong thể tích $1{,}0\\,cm^3$. Làm tròn kết quả đến hàng phần trăm.',
  imageUrl: '',
  answerKey: '2,41·10^19',
  explanationText: 'Áp dụng công thức mật độ phân tử $n=\\dfrac{p}{kT}$. Với $T=300K$, $k=1{,}38\\cdot10^{-23}\\,J/K$ ⇒ $n\\approx2{,}41\\cdot10^{25}\\,phân\\,tử/m^3$. Trong $1\\,cm^3=10^{-6}\\,m^3$ có $2{,}41\\cdot10^{19}$ phân tử.'
},

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.4', level: 'Vận dụng', type: 'Short',
  promptText: 'Tính nhiệt độ của một khối khí để động năng tịnh tiến trung bình của mỗi phân tử khí bằng $1{,}0\\,eV$. Biết $1\\,eV = 1{,}6\\cdot10^{-19}\\,J$. Lấy phần nguyên.',
  imageUrl: '',
  answerKey: '7737',
  explanationText: 'Động năng trung bình: $\\overline{W}=\\dfrac{3}{2}kT$. Suy ra $T=\\dfrac{2\\overline{W}}{3k}=\\dfrac{2\\cdot1{,}6\\cdot10^{-19}}{3\\cdot1{,}38\\cdot10^{-23}}\\approx7737\\,K$.'
},

{
  topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.3', level: 'Vận dụng', type: 'Short',
  promptText: 'Gọi $Nm$ là tổng khối lượng của các phân tử khí (tức khối lượng của một lượng khí xác định). Ở nhiệt độ phòng, mật độ không khí xấp xỉ $1{,}29\\,kg/m^3$ tại áp suất $1{,}00\\cdot10^5\\,Pa$. Sử dụng các số liệu này để suy ra tốc độ căn quân phương $v_{rms}$ của các phân tử không khí. Lấy phần nguyên.',
  imageUrl: '',
  answerKey: '485',
  explanationText: 'Từ mô hình động học phân tử: $p=\\dfrac{1}{3}\\rho v_{rms}^2$. Suy ra $v_{rms}=\\sqrt{\\dfrac{3p}{\\rho}}=\\sqrt{\\dfrac{3\\cdot10^5}{1{,}29}}\\approx485\\,m/s$.'
},
//CẬP NHẬT 28/12/2025
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Hiểu', type: 'MCQ',
    promptText: 'Tính chất nào sau đây không phải là tính chất của chất khí?',
    imageUrl: '',
    options: [
      'Các phân tử chuyển động hỗn loạn xung quanh các vị trí cân bằng cố định.',
      'Chất khí có tính bành trướng, luôn chiếm toàn bộ thể tích bình chứa.',
      'Chất khí dễ nén hơn chất lỏng và chất rắn.',
      'Các phân tử chuyển động hỗn loạn và không ngừng.'
    ],
    answerKey: 'Các phân tử chuyển động hỗn loạn xung quanh các vị trí cân bằng cố định.',
    explanationText: 'Chuyển động quanh vị trí cân bằng cố định là tính chất của chất rắn.'
  },

  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Hiểu', type: 'MCQ',
    promptText: 'Khẳng định nào sau đây là sai khi nói về cấu tạo chất?',
    imageUrl: '',
    options: [
      'Các chất được cấu tạo từ các hạt riêng gọi là nguyên tử, phân tử.',
      'Các nguyên tử, phân tử đứng sát nhau và giữa chúng không có khoảng cách.',
      'Lực tương tác giữa các phân tử ở thể rắn lớn hơn ở thể lỏng và thể khí.',
      'Các phân tử chất lỏng dao động quanh các vị trí cân bằng không cố định.'
    ],
    answerKey: 'Các nguyên tử, phân tử đứng sát nhau và giữa chúng không có khoảng cách.',
    explanationText: 'Giữa các nguyên tử, phân tử luôn tồn tại khoảng cách.'
  },

  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Biết', type: 'MCQ',
    promptText: 'Nội năng của một vật là',
    imageUrl: '',
    options: [
      'Tổng động năng và thế năng của vật.',
      'Tổng động năng và thế năng của các phân tử cấu tạo nên vật.',
      'Tổng nhiệt lượng và cơ năng mà vật nhận được.',
      'Nhiệt lượng mà vật nhận được.'
    ],
    answerKey: 'Tổng động năng và thế năng của các phân tử cấu tạo nên vật.',
    explanationText: 'Nội năng đặc trưng cho chuyển động và tương tác vi mô của các phân tử.'
  },

  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Hiểu', type: 'MCQ',
    promptText: 'Câu nào sau đây nói về truyền nhiệt và thực hiện công là không đúng?',
    imageUrl: '',
    options: [
      'Thực hiện công có thể làm thay đổi nội năng của vật.',
      'Trong thực hiện công có sự chuyển hóa giữa nội năng và cơ năng.',
      'Trong truyền nhiệt có sự truyền động năng từ phân tử này sang phân tử khác.',
      'Trong truyền nhiệt có sự chuyển hóa từ cơ năng sang nội năng và ngược lại.'
    ],
    answerKey: 'Trong truyền nhiệt có sự chuyển hóa từ cơ năng sang nội năng và ngược lại.',
    explanationText: 'Truyền nhiệt chỉ là sự truyền năng lượng do chênh lệch nhiệt độ.'
  },

  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Hiểu', type: 'MCQ',
    promptText: 'Trong quá trình chất khí nhận nhiệt và sinh công thì công thức $\\Delta U = A + Q$ phải thỏa mãn',
    imageUrl: '',
    options: [
      'Q < 0 và A > 0.',
      'Q > 0 và A > 0.',
      'Q < 0 và A < 0.',
      'Q > 0 và A < 0.'
    ],
    answerKey: 'Q > 0 và A > 0.',
    explanationText: 'Khí nhận nhiệt (Q>0) và sinh công (A>0).'
  },

  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Biết', type: 'MCQ',
    promptText: 'Thân nhiệt bình thường của người là',
    imageUrl: '',
    options: ['35°C', '37°C', '38°C', '30°C'],
    answerKey: '37°C',
    explanationText: 'Thân nhiệt trung bình của người khỏe mạnh là khoảng 37°C.'
  },

  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Biết', type: 'MCQ',
    promptText: 'Cách xác định nhiệt độ trong thang nhiệt độ Celsius là',
    imageUrl: '',
    options: [
      'Nước đóng băng 10°C, nước sôi 100°C.',
      'Nước đóng băng 0°C, nước sôi 0°C.',
      'Nước đóng băng 0°C, nước sôi 100°C.',
      'Nước đóng băng 100°C, nước sôi 1000°C.'
    ],
    answerKey: 'Nước đóng băng 0°C, nước sôi 100°C.',
    explanationText: 'Thang Celsius lấy 0°C và 100°C làm hai mốc chuẩn.'
  },

  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Hiểu', type: 'MCQ',
    promptText: 'Nhỏ một giọt nước đang sôi vào một cốc nước ấm thì nhiệt năng của giọt nước và nước trong cốc thay đổi như thế nào?',
    imageUrl: '',
    options: [
      'Giọt nước tăng, nước trong cốc giảm.',
      'Giọt nước giảm, nước trong cốc tăng.',
      'Cả hai đều giảm.',
      'Cả hai đều tăng.'
    ],
    answerKey: 'Giọt nước giảm, nước trong cốc tăng.',
    explanationText: 'Nhiệt truyền từ vật nóng hơn sang vật lạnh hơn.'
  },

  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Biết', type: 'MCQ',
    promptText: 'Một vật khối lượng m, có nhiệt dung riêng c, nhiệt độ đầu và cuối là $t_1, t_2$. Công thức $Q = mc(t_2 - t_1)$ dùng để xác định',
    imageUrl: '',
    options: ['Nội năng.', 'Nhiệt năng.', 'Nhiệt lượng.', 'Năng lượng.'],
    answerKey: 'Nhiệt lượng.',
    explanationText: 'Công thức dùng để tính nhiệt lượng trao đổi.'
  },
    {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Hiểu', type: 'MCQ',
    promptText: 'Câu nào sau đây nói về sự truyền nhiệt là không đúng?',
    imageUrl: '',
    options: [
      'Nhiệt không thể tự truyền từ vật lạnh hơn sang vật nóng hơn.',
      'Nhiệt có thể tự truyền từ vật nóng hơn sang vật lạnh hơn.',
      'Nhiệt có thể truyền từ vật lạnh hơn sang vật nóng hơn.',
      'Nhiệt không thể tự truyền giữa hai vật có cùng nhiệt độ.'
    ],
    answerKey: 'Nhiệt có thể truyền từ vật lạnh hơn sang vật nóng hơn.',
    explanationText: 'Nhiệt chỉ tự truyền từ vật có nhiệt độ cao hơn sang vật có nhiệt độ thấp hơn.'
  },

  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Biết', type: 'MCQ',
    promptText: 'Ở áp suất tiêu chuẩn, chất rắn kết tinh có nhiệt độ nóng chảy là',
    imageUrl: '',
    options: ['Thiếc.', 'Nước đá.', 'Chì.', 'Nhôm.'],
    answerKey: 'Nước đá.',
    explanationText: 'Ở áp suất tiêu chuẩn, nước đá nóng chảy ở 0°C.'
  },

  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Vận dụng', type: 'MCQ',
    promptText: 'Biết nhiệt nóng chảy của nước đá là $\\lambda = 3,4.10^5\\,J/kg$. Nhiệt lượng cần cung cấp để làm nóng chảy hoàn toàn $4kg$ nước đá ở $0^oC$ là',
    imageUrl: '',
    options: [
      '1,36 MJ.',
      '0,34 MJ.',
      '13,6 MJ.',
      '3,4 MJ.'
    ],
    answerKey: '1,36 MJ.',
    explanationText: '$Q = m\\lambda = 4 . 3,4.10^5 = 1,36.10^6 J = 1,36 MJ.$'
  },

  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Vận dụng', type: 'MCQ',
    promptText: 'Thả một cục nước đá vào cốc nước ấm. Bỏ qua nhiệt dung của cốc. Khi đạt cân bằng nhiệt, phát biểu nào sau đây là đúng?',
    imageUrl: '',
    options: [
      'Nhiệt lượng nước đá tỏa ra bằng nhiệt lượng nước thu vào.',
      'Nhiệt lượng nước đá thu vào bằng nhiệt lượng nước tỏa ra.',
      'Nhiệt lượng của nước và nước đá đều tăng.',
      'Không có trao đổi nhiệt.'
    ],
    answerKey: 'Nhiệt lượng nước đá thu vào bằng nhiệt lượng nước tỏa ra.',
    explanationText: 'Theo nguyên lý cân bằng nhiệt: nhiệt lượng thu vào bằng nhiệt lượng tỏa ra.'
  },

  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Biết', type: 'MCQ',
    promptText: 'Nhiệt hóa hơi được xác định bằng công thức',
    imageUrl: '',
    options: [
      '$Q = mc\\Delta t$',
      '$Q = \\lambda m$',
      '$Q = Lm$',
      '$Q = A + Q$'
    ],
    answerKey: '$Q = Lm$',
    explanationText: 'Nhiệt hóa hơi tỉ lệ với khối lượng chất lỏng: $Q = Lm$.'
  },

  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Hiểu', type: 'MCQ',
    promptText: 'Để xác định nhiệt hóa hơi riêng của một chất lỏng bằng thực nghiệm ta không cần dùng đến dụng cụ nào sau đây?',
    imageUrl: '',
    options: [
      'Cân điện tử.',
      'Nhiệt kế.',
      'Oát kế.',
      'Vôn kế.'
    ],
    answerKey: 'Vôn kế.',
    explanationText: 'Không cần đo hiệu điện thế khi xác định nhiệt hóa hơi.'
  },

  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Vận dụng', type: 'MCQ',
    promptText: 'Dẫn hơi nước ở $100^oC$ vào một nhiệt lượng kế chứa nước. Biết các dữ kiện cần thiết. Nhiệt hóa hơi riêng của nước được xác định dựa trên',
    imageUrl: '',
    options: [
      'Định luật bảo toàn cơ năng.',
      'Nguyên lý cân bằng nhiệt.',
      'Công thức nội năng.',
      'Phương trình trạng thái khí.'
    ],
    answerKey: 'Nguyên lý cân bằng nhiệt.',
    explanationText: 'Dựa vào phương trình cân bằng nhiệt để xác định nhiệt hóa hơi.'
  },

  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Vận dụng cao', type: 'MCQ',
    promptText: 'Một khối nước đá $2kg$ ở $-5^oC$ được thả vào xô nhôm chứa nước nóng. Khi cân bằng còn sót lại $100g$ nước đá. Nhiệt độ cân bằng của hệ là',
    imageUrl: '',
    options: [
      '-5°C.',
      '0°C.',
      '5°C.',
      '100°C.'
    ],
    answerKey: '0°C.',
    explanationText: 'Còn nước đá chưa tan hết nên nhiệt độ cân bằng là 0°C.'
  },
// ================= PHẦN II – CÂU TRẮC NGHIỆM ĐÚNG / SAI =================
  // ===== CÂU 1 =====
  {
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.2',
    level: 'Vận dụng',
    type: 'TrueFalse',
    promptText: 'Một lượng khí bị nung nóng, thể tích tăng thêm $\\Delta V$ và nội năng biến thiên $\\Delta U$. Quá trình diễn ra ở áp suất không đổi $p$.',
    imageUrl: '',
    subQuestions: [
      {
        id: 'c1a',
        content: 'Đun khí và thể tích tăng chứng tỏ hệ nhận nhiệt và sinh công.',
        isCorrect: true,
        explanation: 'Thể tích tăng nên hệ sinh công $A = p\\Delta V > 0$, đồng thời đun nóng nên $Q > 0$.'
      },
      {
        id: 'c1b',
        content: 'Công mà hệ sinh ra có giá trị $A = 0$.',
        isCorrect: false,
        explanation: 'Quá trình đẳng áp có $\\Delta V > 0$ nên $A = p\\Delta V \\neq 0$.'
      },
      {
        id: 'c1c',
        content: 'Nhiệt lượng hệ khí nhận được xác định bởi nguyên lý I nhiệt động lực học.',
        isCorrect: true,
        explanation: 'Theo nguyên lý I: $$\\Delta U = A + Q \\Rightarrow Q = \\Delta U - A.$$'
      }
    ],
    answerKey: '',
    explanationText: 'Áp dụng nguyên lý I nhiệt động lực học cho quá trình đẳng áp.'
  },

  // ===== CÂU 2 =====
  {
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.1',
    level: 'Hiểu',
    type: 'TrueFalse',
    promptText: 'Xét các phép đổi đơn vị giữa thang nhiệt độ Celsius, Fahrenheit và Kelvin.',
    imageUrl: '',
    subQuestions: [
      {
        id: 'c2a',
        content: 'Nhiệt độ $5^\\circ C$ tương ứng với $40^\\circ F$.',
        isCorrect: false,
        explanation: '$$F = 1{,}8t + 32 \\Rightarrow F = 1{,}8\\times5 + 32 = 41^\\circ F.$$'
      },
      {
        id: 'c2b',
        content: 'Nhiệt độ $45^\\circ C$ tương ứng với $113^\\circ F$.',
        isCorrect: true,
        explanation: '$$F = 1{,}8\\times45 + 32 = 113^\\circ F.$$'
      },
      {
        id: 'c2c',
        content: 'Nhiệt độ $27^\\circ C$ tương ứng với $300K$.',
        isCorrect: true,
        explanation: '$$T = t + 273 \\Rightarrow T = 27 + 273 = 300K.$$'
      },
      {
        id: 'c2d',
        content: 'Nhiệt độ $300K$ tương ứng với $-243^\\circ C$.',
        isCorrect: false,
        explanation: '$$t = T - 273 = 300 - 273 = 27^\\circ C.$$'
      }
    ],
    answerKey: '',
    explanationText: 'Áp dụng các công thức đổi thang nhiệt độ.'
  },

  // ===== CÂU 3 =====
  {
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.3',
    level: 'Vận dụng',
    type: 'TrueFalse',
    promptText: 'Thả miếng đồng khối lượng $m_{Cu}=2kg$ ở $80^\\circ C$ vào $2$ lít nước. Miếng đồng nguội đến $10^\\circ C$. Cho $c_{Cu}=380\\,J/kg.K$, $c_{H_2O}=4200\\,J/kg.K$.',
    imageUrl: '',
    subQuestions: [
      {
        id: 'c3a',
        content: 'Nhiệt lượng tỏa ra của đồng là $53\\,200J$.',
        isCorrect: true,
        explanation: '$$Q_{Cu}=m_{Cu}c_{Cu}(t_1-t_2)=2\\times380\\times(80-10)=53\\,200J.$$'
      },
      {
        id: 'c3b',
        content: 'Nhiệt lượng nước thu vào bằng nhiệt lượng đồng tỏa ra và bằng $53\\,200J$.',
        isCorrect: true,
        explanation: 'Theo cân bằng nhiệt: $$Q_{toả}=Q_{thu}=53\\,200J.$$'
      },
      {
        id: 'c3c',
        content: 'Nước nóng thêm $63{,}33^\\circ C$.',
        isCorrect: false,
        explanation: '$$\\Delta t = \\frac{Q}{mc} = \\frac{53\\,200}{2\\times4200} \\approx 6{,}33^\\circ C.$$'
      },
      {
        id: 'c3d',
        content: 'Tỉ số giữa nhiệt lượng đồng tỏa ra và nhiệt lượng nước thu vào bằng $1$.',
        isCorrect: true,
        explanation: '$$\\frac{Q_{Cu}}{Q_{H_2O}} = 1.$$'
      }
    ],
    answerKey: '',
    explanationText: 'Áp dụng phương trình cân bằng nhiệt cho hệ kín.'
  },
  {
  topic: 'VẬT LÍ NHIỆT',
  lessonId: 'l1.3',
  level: 'Hiểu',
  type: 'TrueFalse',
  promptText: 'Để xác định nhiệt dung riêng của nước, có thể tiến hành thí nghiệm theo sơ đồ nguyên lí như hình bên dưới.',
  imageUrl: 'https://i.postimg.cc/Y2VtbMn1/Please_make_the_202512140930.jpg',
  subQuestions: [
    {
      id: 'c4a',
      content: 'Biến áp nguồn có nhiệm vụ cung cấp cho mạch một hiệu điện thế.',
      isCorrect: true,
      explanation: 'Biến áp dùng để cung cấp và điều chỉnh hiệu điện thế $U$ cho mạch điện đun nước.'
    },
    {
      id: 'c4b',
      content: 'Oát kế dùng để đo thời gian nước sôi.',
      isCorrect: false,
      explanation: 'Oát kế dùng để đo công suất điện $P$ của dòng điện chạy qua dây điện trở, không dùng để đo thời gian.'
    },
    {
      id: 'c4c',
      content: 'Nhiệt lượng tỏa ra trên dây điện trở lớn hơn nhiệt lượng mà nước thu vào.',
      isCorrect: false,
      explanation: 'Trong thí nghiệm lý tưởng, nhiệt lượng tỏa ra trên dây điện trở bằng nhiệt lượng nước thu vào: $$Q_{toả} = Q_{thu} = Pt.$$'
    },
    {
      id: 'c4d',
      content: 'Nhiệt lượng kế ngăn cản sự truyền nhiệt của các chất đặt trong bình với môi trường bên ngoài.',
      isCorrect: true,
      explanation: 'Nhiệt lượng kế có tác dụng hạn chế sự trao đổi nhiệt giữa hệ và môi trường, giúp giảm thất thoát nhiệt.'
    }
  ],
  answerKey: '',
  explanationText: 'Dựa vào nguyên lý cân bằng nhiệt và công thức $Q = mc\\Delta t$ để xác định nhiệt dung riêng của nước.'
},

  // ===== CÂU 1 =====
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l2.1', level: 'Biết', type: 'MCQ',
    promptText: 'Vật chất ở thể khí',
    imageUrl: '',
    options: [
      'Các phân tử dao động quanh vị trí cân bằng xác định.',
      'Không có thể tích và hình dạng xác định.',
      'Có khoảng cách giữa các phân tử rất gần nhau.',
      'Rất khó nén.'
    ],
    answerKey: 'Không có thể tích và hình dạng xác định.',
    explanationText: 'Chất khí không có hình dạng và thể tích xác định.'
  },

  // ===== CÂU 2 =====
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l2.1', level: 'Hiểu', type: 'MCQ',
    promptText: 'Tính chất nào sau đây không phải là của phân tử?',
    imageUrl: '',
    options: [
      'Có lúc đứng yên, có lúc chuyển động.',
      'Chuyển động không ngừng.',
      'Chuyển động càng nhanh thì nhiệt độ của vật càng cao.',
      'Va chạm vào thành bình, gây áp suất lên thành bình.'
    ],
    answerKey: 'Có lúc đứng yên, có lúc chuyển động.',
    explanationText: 'Phân tử luôn chuyển động không ngừng.'
  },

  // ===== CÂU 4 =====
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l2.1', level: 'Hiểu', type: 'MCQ',
    promptText: 'Mùi thơm của hoa hồng lan tỏa trong không khí thể hiện tính chất nào của thể khí?',
    imageUrl: '',
    options: [
      'Dễ dàng nén được.',
      'Không có hình dạng xác định.',
      'Có thể lan tỏa trong không gian theo mọi hướng.',
      'Không chảy được.'
    ],
    answerKey: 'Có thể lan tỏa trong không gian theo mọi hướng.',
    explanationText: 'Phân tử khí chuyển động hỗn độn và khuếch tán trong không gian.'
  },

  // ===== CÂU 5 =====
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Hiểu', type: 'MCQ',
    promptText: 'Bên ngoài thành cốc có giọt nước khi cho đá vào nước là do',
    imageUrl: '',
    options: [
      'Nước trong cốc bay hơi rồi ngưng tụ.',
      'Nước trong cốc thấm ra ngoài.',
      'Hơi nước trong không khí gặp lạnh ngưng tụ.',
      'Thành cốc bị ướt.'
    ],
    answerKey: 'Hơi nước trong không khí gặp lạnh ngưng tụ.',
    explanationText: 'Không khí xung quanh gặp lạnh nên hơi nước ngưng tụ.'
  },

  // ===== CÂU 6 =====
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Biết', type: 'MCQ',
    promptText: 'Nhiệt độ từ $19^\\circ C$ đến $28^\\circ C$ tương ứng với thang Kelvin là',
    imageUrl: '',
    options: [
      'Từ 292 K đến 301 K.',
      'Từ 19 K đến 28 K.',
      'Từ 273 K đến 301 K.',
      'Từ 273 K đến 292 K.'
    ],
    answerKey: 'Từ 292 K đến 301 K.',
    explanationText: '$$T = t + 273$$'
  },

  // ===== CÂU 7 =====
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Biết', type: 'MCQ',
    promptText: 'Khi hai vật có nhiệt độ khác nhau tiếp xúc, nhiệt truyền',
    imageUrl: '',
    options: [
      'Từ vật có khối lượng lớn sang vật nhỏ.',
      'Từ vật có nhiệt độ cao sang vật có nhiệt độ thấp.',
      'Từ vật có nhiệt năng lớn sang vật nhỏ.',
      'Từ vật ở trên cao xuống dưới thấp.'
    ],
    answerKey: 'Từ vật có nhiệt độ cao sang vật có nhiệt độ thấp.',
    explanationText: 'Nhiệt tự truyền từ nơi nóng hơn sang nơi lạnh hơn.'
  },

  // ===== CÂU 8 =====
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Biết', type: 'MCQ',
    promptText: 'Cách xác định thang nhiệt độ Celsius là',
    imageUrl: '',
    options: [
      'Nước đóng băng 10°C, nước sôi 100°C.',
      'Nước đóng băng 100°C, nước sôi 0°C.',
      'Nước đóng băng 0°C, nước sôi 100°C.',
      'Nước đóng băng 100°C, nước sôi 1000°C.'
    ],
    answerKey: 'Nước đóng băng 0°C, nước sôi 100°C.',
    explanationText: 'Hai mốc chuẩn của thang Celsius.'
  },

  // ===== CÂU 9 =====
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.2', level: 'Biết', type: 'MCQ',
    promptText: 'Nội năng của một vật là',
    imageUrl: '',
    options: [
      'Tổng động năng và thế năng của vật.',
      'Tổng động năng và thế năng của các phân tử.',
      'Tổng nhiệt lượng và cơ năng.',
      'Nhiệt lượng vật nhận.'
    ],
    answerKey: 'Tổng động năng và thế năng của các phân tử.',
    explanationText: 'Nội năng là đại lượng vi mô.'
  },

  // ===== CÂU 10 =====
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.2', level: 'Hiểu', type: 'MCQ',
    promptText: 'Quy ước dấu đúng trong công thức $\\Delta U = A + Q$ là',
    imageUrl: '',
    options: [
      'Nhận công: $A<0$, nhận nhiệt: $Q<0$.',
      'Nhận công: $A>0$, nhận nhiệt: $Q>0$.',
      'Sinh công: $A<0$, truyền nhiệt: $Q>0$.',
      'Sinh công: $A>0$, truyền nhiệt: $Q<0$.'
    ],
    answerKey: 'Nhận công: $A>0$, nhận nhiệt: $Q>0$.',
    explanationText: 'Theo quy ước của nguyên lý I.'
  },

  // ===== CÂU 11 =====
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.3', level: 'Vận dụng', type: 'MCQ',
    promptText: 'Với $m=100g$ chì được truyền nhiệt lượng $260J$, nhiệt độ tăng từ $15^\\circ C$ đến $35^\\circ C$. Nhiệt dung riêng của chì là',
    imageUrl: '',
    options: [
      '130 J/kg.K.',
      '26 J/kg.K.',
      '130 kJ/kg.K.',
      '260 kJ/kg.K.'
    ],
    answerKey: '130 J/kg.K.',
    explanationText: '$$c = \\frac{Q}{m\\Delta t} = \\frac{260}{0,1\\times20} = 130$$'
  },

  // ===== CÂU 12 =====
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.2', level: 'Hiểu', type: 'MCQ',
    promptText: 'Hệ được cấp nhiệt $500J$ và sinh công $200J$. Độ biến thiên nội năng là',
    imageUrl: '',
    options: [
      'Tăng 300 J.',
      'Tăng 700 J.',
      'Giảm 300 J.',
      'Giảm 700 J.'
    ],
    answerKey: 'Tăng 300 J.',
    explanationText: '$$\\Delta U = Q - A = 500 - 200 = 300J$$'
  },

  // ===== CÂU 15 =====
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.3', level: 'Vận dụng', type: 'MCQ',
    promptText: 'Nhiệt lượng cần để hóa hơi hoàn toàn $100g$ nước ở $100^\\circ C$ là',
    imageUrl: '',
    options: [
      '2300 J.',
      '226000 J.',
      '22600 J.',
      '23000 J.'
    ],
    answerKey: '226000 J.',
    explanationText: '$$Q = Lm$$'
  },

  // ===== CÂU 16 =====
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l2.1', level: 'Hiểu', type: 'MCQ',
    promptText: 'Tính chất của phân tử chất khí là',
    imageUrl: '',
    options: [
      'Dao động quanh vị trí cân bằng.',
      'Luôn tương tác mạnh với nhau.',
      'Chuyển động càng nhanh thì nhiệt độ càng cao.',
      'Dao động quanh vị trí cân bằng xác định.'
    ],
    answerKey: 'Chuyển động càng nhanh thì nhiệt độ càng cao.',
    explanationText: 'Nhiệt độ liên hệ với động năng trung bình.'
  },

  // ===== CÂU 17 =====
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l2.1', level: 'Biết', type: 'MCQ',
    promptText: 'Chuyển động của các hạt phấn hoa trong thí nghiệm Brown là',
    imageUrl: '',
    options: [
      'Chuyển động đều.',
      'Chuyển động định hướng.',
      'Chuyển động tròn.',
      'Chuyển động hỗn độn.'
    ],
    answerKey: 'Chuyển động hỗn độn.',
    explanationText: 'Do va chạm liên tục của các phân tử nước.'
  },

  // ===== CÂU 18 =====
  {
    topic: 'VẬT LÍ NHIỆT', lessonId: 'l2.1', level: 'Hiểu', type: 'MCQ',
    promptText: 'Nguyên nhân hạt phấn hoa chuyển động Brown là do',
    imageUrl: '',
    options: [
      'Nguyên tử phấn hoa chuyển động.',
      'Phân tử nước chuyển động va chạm.',
      'Phân tử phấn hoa chuyển động.',
      'Dòng electron có hướng.'
    ],
    answerKey: 'Phân tử nước chuyển động va chạm.',
    explanationText: 'Chuyển động nhiệt hỗn độn của phân tử nước.'
  },
    // ===== CÂU 3 =====
  {
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.2',
    level: 'Vận dụng',
    type: 'TrueFalse',
    promptText: 'Một lượng khí nhận nhiệt lượng $Q$ do được đun nóng, đồng thời nhận công $A$ do bị nén.',
    imageUrl: '',
    subQuestions: [
      {
        id: 'c3a',
        content: 'Nội năng của khí bị thay đổi chỉ bằng truyền nhiệt.',
        isCorrect: false,
        explanation: 'Nội năng thay đổi do cả truyền nhiệt và thực hiện công.'
      },
      {
        id: 'c3b',
        content: 'Theo quy ước, khí nhận nhiệt và bị nén thì $Q > 0$, $A > 0$.',
        isCorrect: true,
        explanation: 'Nhận nhiệt: $Q>0$; bị nén (nhận công): $A>0$.'
      },
      {
        id: 'c3c',
        content: 'Nội năng của lượng khí tăng một lượng $\\Delta U = Q + A$.',
        isCorrect: true,
        explanation: 'Theo nguyên lý I nhiệt động lực học: $$\\Delta U = A + Q.$$'
      },
      {
        id: 'c3d',
        content: 'Nếu chỉ cung cấp nhiệt $Q$ cho khí, khí giãn ra và thực hiện công $A$ thì nội năng giảm một lượng $\\Delta U = Q - A$.',
        isCorrect: false,
        explanation: 'Theo nguyên lý I: $$\\Delta U = Q - A.$$ Nếu $Q < A$ thì nội năng mới giảm.'
      }
    ],
    answerKey: '',
    explanationText: 'Áp dụng nguyên lý I nhiệt động lực học và quy ước dấu.'
  },

  // ===== CÂU 4 =====
  {
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.3',
    level: 'Vận dụng',
    type: 'TrueFalse',
    promptText: 'Một ấm điện công suất $P=1000W$ chứa $300g$ nước ở $20^\\circ C$. Đun đến khi nước sôi ở áp suất tiêu chuẩn. Cho $c = 4{,}2\\times10^3\\,J/kg.K$, $L = 2{,}26\\times10^6\\,J/kg$.',
    imageUrl: '',
    subQuestions: [
      {
        id: 'c4a',
        content: 'Nhiệt lượng để làm nóng $300g$ nước từ $20^\\circ C$ đến $100^\\circ C$ là $100\\,800J$.',
        isCorrect: true,
        explanation: '$$Q = mc\\Delta t = 0{,}3\\times4200\\times(100-20)=100\\,800J.$$'
      },
      {
        id: 'c4b',
        content: 'Nhiệt lượng cần để $200g$ nước hóa hơi hoàn toàn ở $100^\\circ C$ là $678\\times10^6J$.',
        isCorrect: false,
        explanation: '$$Q = mL = 0{,}2\\times2{,}26\\times10^6 = 4{,}52\\times10^5J.$$'
      },
      {
        id: 'c4c',
        content: 'Thời gian cần để đun nước đạt đến $100^\\circ C$ là $100{,}8$ phút.',
        isCorrect: false,
        explanation: '$$t = \\frac{Q}{P} = \\frac{100\\,800}{1000} = 100{,}8s \\approx 1{,}68\\,phút.$$'
      },
      {
        id: 'c4d',
        content: 'Đun sôi tiếp $226s$ thì khối lượng nước bay hơi là $0{,}1kg$, nước còn lại khoảng $100g$.',
        isCorrect: true,
        explanation: '$$Q = Pt = 1000\\times226 = 2{,}26\\times10^5J$$ $$m = \\frac{Q}{L} = \\frac{2{,}26\\times10^5}{2{,}26\\times10^6} = 0{,}1kg.$$'
      }
    ],
    answerKey: '',
    explanationText: 'Áp dụng công thức $Q = mc\\Delta t$, $Q = Lm$, $Q = Pt$ và nguyên lý cân bằng năng lượng.'
  },
  {
  topic: 'VẬT LÍ NHIỆT',
  lessonId: 'l1.1',
  level: 'Hiểu',
  type: 'TrueFalse',
  promptText: 'Khi tiến hành đun một khối nước đá từ thời điểm $t = 0$, người ta thu được đồ thị biểu diễn sự phụ thuộc của nhiệt độ theo thời gian như hình dưới đây.',
  imageUrl: 'https://i.postimg.cc/tJzkWyMX/do-thi-11.png',
  subQuestions: [
    {
      id: 'c1a',
      content: 'Khối nước đá bắt đầu chuyển từ thể rắn sang thể lỏng ở $0^\\circ C$.',
      isCorrect: true,
      explanation: 'Ở áp suất tiêu chuẩn, nước đá nóng chảy ở $0^\\circ C$, ứng với đoạn nhiệt độ không đổi trên đồ thị.'
    },
    {
      id: 'c1b',
      content: 'Trên đoạn OA, khối nước đá không tăng nhiệt độ nên không nhận nhiệt lượng từ nguồn đun.',
      isCorrect: false,
      explanation: 'Trên đoạn OA, mặc dù nhiệt độ không tăng nhưng nước đá **vẫn nhận nhiệt lượng** để nóng chảy: $$Q = \\lambda m.$$'
    },
    {
      id: 'c1c',
      content: 'Ở nhiệt độ $30^\\circ C$, nước chỉ tồn tại ở thể lỏng.',
      isCorrect: false,
      explanation: 'Tại một thời điểm xác định, nếu quá trình nóng chảy **chưa hoàn toàn kết thúc**, trong hệ có thể **đồng thời tồn tại nước đá và nước**, dù nhiệt độ đo được là $30^\\circ C$.'
    },
    {
      id: 'c1d',
      content: 'Trên đoạn AB, nước tăng nhiệt độ.',
      isCorrect: true,
      explanation: 'Sau khi nước đá tan hết, nước tiếp tục nhận nhiệt nên nhiệt độ tăng theo thời gian.'
    }
  ],
  answerKey: '',
  explanationText: 'Dựa vào đồ thị nhiệt độ – thời gian để phân tích các giai đoạn nóng chảy và tăng nhiệt của nước.'
},
{
  topic: 'VẬT LÍ NHIỆT',
  lessonId: 'l1.3',
  level: 'Vận dụng',
  type: 'MCQ',
  promptText: 'Hình bên là sơ đồ bố trí thí nghiệm đo nhiệt dung riêng của nước. Một học sinh làm thí nghiệm với $m = 150g$ nước, nhiệt độ ban đầu $62^\\circ C$. Số chỉ vôn kế và ampe kế lần lượt là $U = 1{,}60V$, $I = 2{,}50A$. Sau $8$ phút $48$ giây, nhiệt độ nước là $65{,}5^\\circ C$. Bỏ qua nhiệt lượng mà bình nhiệt lượng kế và đũa khuấy thu vào. Nhiệt dung riêng của nước trong thí nghiệm này (chỉ lấy phần nguyên) là',
  imageUrl: 'https://i.postimg.cc/yx6cqRLC/do-thi-12.png',
  options: [
    '4002 J/kg·K',
    '4032 J/kg·K',
    '4200 J/kg·K',
    '4023 J/kg·K'
  ],
  answerKey: '4023 J/kg·K',
  explanationText: `
Thời gian đun:
$$t = 8\\,phút\\,48\\,giây = 528s.$$

Nhiệt lượng do dòng điện cung cấp:
$$Q = UI t = 1{,}6 \\times 2{,}5 \\times 528 = 2112\\,J.$$

Độ tăng nhiệt độ của nước:
$$\\Delta T = 65{,}5 - 62 = 3{,}5\\,K.$$

Nhiệt dung riêng của nước:
$$c = \\frac{Q}{m\\Delta T}
= \\frac{2112}{0{,}15 \\times 3{,}5}
\\approx 4023\\,\\text{J/kg·K}.$$
`
},

  // ===== CÂU 2 =====
  {
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.3',
    level: 'Vận dụng',
    type: 'Short',
    promptText: 'Một thợ kim hoàn muốn nấu chảy một thỏi vàng có khối lượng $m = 0{,}074\\,kg$. Biết nhiệt nóng chảy riêng của vàng là $\\lambda = 0{,}64\\times10^5\\,J/kg$. Tính nhiệt lượng cần cung cấp (đơn vị J).',
    imageUrl: '',
    answerKey: '4736',
    explanationText: '$$Q = m\\lambda = 0{,}074\\times0{,}64\\times10^5 = 4736\\,J.$$'
  },

  // ===== CÂU 3 =====
  {
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.2',
    level: 'Hiểu',
    type: 'Short',
    promptText: 'Người ta thực hiện công $A = 200\\,J$ để nén khí trong một xilanh. Biết khí truyền ra môi trường nhiệt lượng $Q = 40\\,J$. Tính độ biến thiên nội năng của khí (J).',
    imageUrl: '',
    answerKey: '160',
    explanationText: '$$\\Delta U = A + Q = 200 - 40 = 160\\,J.$$'
  },

  // ===== CÂU 4 =====
  {
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.3',
    level: 'Vận dụng',
    type: 'Short',
    promptText: 'Biết nhiệt lượng cần cung cấp để làm bay hơi hoàn toàn $100g$ nước ở $100^\\circ C$ là $2{,}3\\times10^5\\,J$. Tính nhiệt hóa hơi riêng của nước (đơn vị $10^5\\,J/kg$).',
    imageUrl: '',
    answerKey: '2,3',
    explanationText: '$$L = \\frac{Q}{m} = \\frac{2{,}3\\times10^5}{0{,}1} = 2{,}3\\times10^6\\,J/kg = 2{,}3\\times10^5\\,J/kg.$$'
  },

  // ===== CÂU 5 =====
  {
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.3',
    level: 'Vận dụng cao',
    type: 'Short',
    promptText: 'Một khay sắt khối lượng $1{,}2\\,kg$ được làm nóng bằng máy sưởi công suất $500\\,W$ trong $4$ phút. Nhiệt độ tăng từ $22^\\circ C$ đến $45^\\circ C$. Bỏ qua mất mát nhiệt. Tính nhiệt dung riêng của sắt (chỉ lấy phần nguyên).',
    imageUrl: '',
    answerKey: '4348',
    explanationText: '$$Q = Pt = 500\\times240 = 120000\\,J$$ $$c = \\frac{Q}{m\\Delta T} = \\frac{120000}{1{,}2\\times23} \\approx 4348\\,J/kg\\cdot K.$$'
  },
  {
  topic: 'KHÍ LÍ TƯỞNG',
  lessonId: 'l2.1',
  level: 'Nhận biết',
  type: 'MCQ',
  promptText: 'Khi nhiệt độ của khối khí trong một bình kín tăng thì áp suất của khối khí trong bình cũng tăng lên vì',
  imageUrl: '',
  options: [
    'Số lượng phân tử khí tăng nên va chạm với thành bình nhiều hơn.',
    'Các phân tử khí va chạm với nhau nhiều hơn.',
    'Các phân tử khí chuyển động nhanh hơn nên va chạm với thành bình nhiều hơn.',
    'Khoảng cách giữa các phân tử khí tăng nên va chạm mạnh hơn.'
  ],
  answerKey: 'Các phân tử khí chuyển động nhanh hơn nên va chạm với thành bình nhiều hơn.',
  explanationText: 'Nhiệt độ tăng → động năng trung bình của phân tử tăng → va chạm vào thành bình mạnh và nhiều hơn.'
},

{
  topic: 'KHÍ LÍ TƯỞNG',
  lessonId: 'l2.1',
  level: 'Nhận biết',
  type: 'MCQ',
  promptText: 'Tính chất nào sau đây không phải là tính chất của chất ở thể khí?',
  imageUrl: '',
  options: [
    'Có hình dạng và thể tích riêng.',
    'Có thể nén được dễ dàng.',
    'Các phân tử chuyển động hỗn loạn không ngừng.',
    'Lực tương tác phân tử nhỏ hơn ở thể rắn và thể lỏng.'
  ],
  answerKey: 'Có hình dạng và thể tích riêng.',
  explanationText: 'Chất khí không có hình dạng và thể tích riêng.'
},

{
  topic: 'KHÍ LÍ TƯỞNG',
  lessonId: 'l2.1',
  level: 'Thông hiểu',
  type: 'MCQ',
  promptText: 'Khí lí tưởng là chất khí trong đó các phân tử được coi là chất điểm và',
  imageUrl: '',
  options: [
    'Chỉ tương tác với nhau khi va chạm.',
    'Không tương tác với nhau.',
    'Hút nhau khi ở xa.',
    'Đẩy nhau khi ở gần.'
  ],
  answerKey: 'Chỉ tương tác với nhau khi va chạm.',
  explanationText: 'Trong mô hình khí lí tưởng, chỉ xét tương tác khi va chạm.'
},
{
  topic: 'KHÍ LÍ TƯỞNG',
  lessonId: 'l2.2',
  level: 'Nhận biết',
  type: 'MCQ',
  promptText: 'Phương trình nào sau đây là phương trình trạng thái của khí lí tưởng?',
  imageUrl: '',
  options: [
    '$\\dfrac{pV}{T} = \\text{hằng số}$',
    '$pT = \\text{hằng số}$',
    '$VT = \\text{hằng số}$',
    '$pV = \\text{hằng số}$'
  ],
  answerKey: '$\\dfrac{pV}{T} = \\text{hằng số}$',
  explanationText: 'Phương trình trạng thái khí lí tưởng: $pV = nRT$.'
},

{
  topic: 'KHÍ LÍ TƯỞNG',
  lessonId: 'l2.2',
  level: 'Thông hiểu',
  type: 'MCQ',
  promptText: 'Trong quá trình đẳng nhiệt của một lượng khí xác định, đại lượng nào sau đây không đổi?',
  imageUrl: '',
  options: [
    '$pV$',
    '$\\dfrac{p}{T}$',
    '$\\dfrac{V}{T}$',
    '$pT$'
  ],
  answerKey: '$pV$',
  explanationText: 'Quá trình đẳng nhiệt: $pV = \\text{hằng số}$.'
},

{
  topic: 'KHÍ LÍ TƯỞNG',
  lessonId: 'l2.2',
  level: 'Thông hiểu',
  type: 'MCQ',
  promptText: 'Phát biểu nào sau đây đúng khi nói về định luật Charles?',
  imageUrl: '',
  options: [
    'Thể tích tỉ lệ nghịch với nhiệt độ tuyệt đối.',
    'Thể tích tỉ lệ thuận với nhiệt độ tuyệt đối.',
    'Thể tích tỉ lệ nghịch với nhiệt độ Celsius.',
    'Thể tích tỉ lệ thuận với áp suất.'
  ],
  answerKey: 'Thể tích tỉ lệ thuận với nhiệt độ tuyệt đối.',
  explanationText: 'Đẳng áp: $\\dfrac{V}{T} = \\text{hằng số}$.'
},
{
  topic: 'KHÍ LÍ TƯỞNG',
  lessonId: 'l2.1',
  level: 'Thông hiểu',
  type: 'MCQ',
  promptText: 'Nhận xét nào sau đây không đúng về chuyển động Brown?',
  imageUrl: '',
  options: [
    'Hạt phấn hoa chuyển động hỗn loạn không ngừng.',
    'Quỹ đạo chuyển động gấp khúc, không theo quy luật.',
    'Nhiệt độ càng cao thì hạt phấn hoa chuyển động càng chậm.',
    'Các hạt bị phân tử chất lỏng va đập.'
  ],
  answerKey: 'Nhiệt độ càng cao thì hạt phấn hoa chuyển động càng chậm.',
  explanationText: 'Nhiệt độ tăng → chuyển động Brown diễn ra mạnh hơn.'
},

{
  topic: 'KHÍ LÍ TƯỞNG',
  lessonId: 'l2.1',
  level: 'Nhận biết',
  type: 'MCQ',
  promptText: 'Nguyên nhân gây ra áp suất của chất khí là',
  imageUrl: '',
  options: [
    'Phân tử khí va chạm vào thành bình.',
    'Giữa các phân tử khí có lực hút.',
    'Khối lượng riêng của khí nhỏ.',
    'Phân tử khí có kích thước rất nhỏ.'
  ],
  answerKey: 'Phân tử khí va chạm vào thành bình.',
  explanationText: 'Áp suất là kết quả của các va chạm phân tử lên thành bình.'
},

{
  topic: 'KHÍ LÍ TƯỞNG',
  lessonId: 'l2.1',
  level: 'Nhận biết',
  type: 'MCQ',
  promptText: 'Thông số trạng thái của một lượng khí xác định là',
  imageUrl: '',
  options: [
    'Nhiệt độ, khối lượng, thể tích.',
    'Khối lượng, nhiệt độ, áp suất.',
    'Nhiệt độ, thể tích, áp suất.',
    'Thể tích, áp suất, khối lượng.'
  ],
  answerKey: 'Nhiệt độ, thể tích, áp suất.',
  explanationText: 'Ba thông số trạng thái là $p, V, T$.'
},

{
  topic: 'KHÍ LÍ TƯỞNG',
  lessonId: 'l2.1',
  level: 'Thông hiểu',
  type: 'MCQ',
  promptText: 'Phát biểu đúng về khí lí tưởng là',
  imageUrl: '',
  options: [
    'Các phân tử luôn tương tác với nhau.',
    'Va chạm giữa các phân tử là va chạm mềm.',
    'Phân tử được coi là chất điểm.',
    'Khối lượng phân tử có thể bỏ qua.'
  ],
  answerKey: 'Phân tử được coi là chất điểm.',
  explanationText: 'Trong mô hình khí lí tưởng, phân tử được coi là chất điểm.'
},

{
  topic: 'KHÍ LÍ TƯỞNG',
  lessonId: 'l2.1',
  level: 'Thông hiểu',
  type: 'MCQ',
  promptText: 'Robert Brown đã quan sát thấy các hạt phấn hoa',
  imageUrl: '',
  options: [
    'Dao động quanh vị trí cân bằng.',
    'Có lúc đứng yên, có lúc chuyển động.',
    'Luôn đứng yên.',
    'Chuyển động không ngừng.'
  ],
  answerKey: 'Chuyển động không ngừng.',
  explanationText: 'Brown chỉ quan sát hiện tượng, chưa giải thích được nguyên nhân.'
},

{
  topic: 'KHÍ LÍ TƯỞNG',
  lessonId: 'l2.1',
  level: 'Thông hiểu',
  type: 'MCQ',
  promptText: 'Chuyển động nào sau đây không phải là chuyển động Brown?',
  imageUrl: '',
  options: [
    'Hạt phấn hoa trong nước.',
    'Hạt bụi trong chùm sáng Mặt Trời.',
    'Hạt khói quan sát bằng kính hiển vi.',
    'Khói thoát ra khỏi ống xả ô tô.'
  ],
  answerKey: 'Khói thoát ra khỏi ống xả ô tô.',
  explanationText: 'Không phải chuyển động ngẫu nhiên vi mô.'
},

{
  topic: 'KHÍ LÍ TƯỞNG',
  lessonId: 'l2.1',
  level: 'Nhận biết',
  type: 'MCQ',
  promptText: 'Mô hình động học phân tử cho biết vật chất được cấu tạo từ',
  imageUrl: '',
  options: [
    'Các hạt riêng biệt.',
    'Electron và ion.',
    'Các hạt không riêng biệt.',
    'Electron, proton, neutron.'
  ],
  answerKey: 'Các hạt riêng biệt.',
  explanationText: 'Vật chất được cấu tạo từ nguyên tử, phân tử.'
},

{
  topic: 'KHÍ LÍ TƯỞNG',
  lessonId: 'l2.1',
  level: 'Thông hiểu',
  type: 'MCQ',
  promptText: 'Phát biểu nào sau đây sai khi nói về mô hình động học phân tử?',
  imageUrl: '',
  options: [
    'Các phân tử chuyển động không ngừng.',
    'Giữa các phân tử chỉ có lực hút.',
    'Nhiệt độ càng cao thì chuyển động càng nhanh.',
    'Vật chất được cấu tạo từ các phân tử.'
  ],
  answerKey: 'Giữa các phân tử chỉ có lực hút.',
  explanationText: 'Giữa các phân tử có cả lực hút và lực đẩy.'
},
{
  topic: 'KHÍ LÍ TƯỞNG',
  lessonId: 'l2.2',
  level: 'Nhận biết',
  type: 'MCQ',
  promptText: 'Quá trình biến đổi trạng thái của một lượng khí xác định trong đó áp suất được giữ không đổi gọi là',
  imageUrl: '',
  options: [
    'Đẳng nhiệt.',
    'Đẳng áp.',
    'Đẳng tích.',
    'Đoạn nhiệt.'
  ],
  answerKey: 'Đẳng áp.',
  explanationText: 'Áp suất không đổi → quá trình đẳng áp.'
},

{
  topic: 'KHÍ LÍ TƯỞNG',
  lessonId: 'l2.2',
  level: 'Thông hiểu',
  type: 'MCQ',
  promptText: 'Ở $27^\\circ C$, thể tích của một khối khí lí tưởng là $3\\,cm^3$. Giữ áp suất không đổi, thể tích của khí ở $127^\\circ C$ là',
  imageUrl: '',
  options: [
    '3,5 cm³.',
    '1,25 cm³.',
    '5,7 cm³.',
    '4 cm³.'
  ],
  answerKey: '4 cm³.',
  explanationText: 'Đẳng áp: $\\dfrac{V_1}{T_1}=\\dfrac{V_2}{T_2} \\Rightarrow V_2=4\\,cm^3$.'
},

{
  topic: 'KHÍ LÍ TƯỞNG',
  lessonId: 'l2.2',
  level: 'Nhận biết',
  type: 'MCQ',
  promptText: 'Phương trình trạng thái của khí lí tưởng là',
  imageUrl: '',
  options: [
    '$pV=nRT$',
    '$pV=RT$',
    '$pT=nR$',
    '$VT=nR$'
  ],
  answerKey: '$pV=nRT$',
  explanationText: 'Đây là phương trình Clapeyron.'
},

{
  topic: 'KHÍ LÍ TƯỞNG',
  lessonId: 'l2.2',
  level: 'Thông hiểu',
  type: 'MCQ',
  promptText: 'Trong quá trình đẳng nhiệt, đại lượng nào sau đây không đổi?',
  imageUrl: '',
  options: [
    '$pV$',
    '$pT$',
    '$VT$',
    '$\\dfrac{p}{T}$'
  ],
  answerKey: '$pV$',
  explanationText: 'Đẳng nhiệt: $pV = const$.'
},

{
  topic: 'KHÍ LÍ TƯỞNG',
  lessonId: 'l2.2',
  level: 'Vận dụng',
  type: 'MCQ',
  promptText: 'Một lượng khí có $V_1=6l$. Nhiệt độ không đổi. Áp suất tăng $50\\%$ thì thể tích khí là',
  imageUrl: '',
  options: [
    '3 lít.',
    '9 lít.',
    '4 lít.',
    '6 lít.'
  ],
  answerKey: '4 lít.',
  explanationText: 'Đẳng nhiệt: $V_2=\\dfrac{V_1}{1{,}5}=4l$.'
},
   // --- BÀI 2.1: MÔ HÌNH ĐỘNG HỌC PHÂN TỬ CHẤT KHÍ ---
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.1',
    level: 'Nhận biết',
    type: 'MCQ',
    promptText: 'Tính chất nào sau đây không phải là tính chất của chất ở thể khí?',
    imageUrl: '',
    options: [
      'Có hình dạng và thể tích riêng.',
      'Có thể nén được dễ dàng.',
      'Các phân tử chuyển động hỗn loạn không ngừng.',
      'Lực tương tác phân tử nhỏ hơn ở thể rắn và lỏng.'
    ],
    answerKey: 'Có hình dạng và thể tích riêng.',
    explanationText: 'Chất khí không có hình dạng và thể tích riêng, nó chiếm toàn bộ thể tích bình chứa.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.1',
    level: 'Thông hiểu',
    type: 'MCQ',
    promptText: 'Sự khác biệt về lực tương tác giữa các phân tử trong rắn – lỏng – khí dẫn đến',
    imageUrl: '',
    options: [
      'Sự đồng nhất về khối lượng.',
      'Sự khác biệt về cấu trúc và thể tích.',
      'Sự khác biệt về khối lượng.',
      'Sự đồng nhất về cấu trúc.'
    ],
    answerKey: 'Sự khác biệt về cấu trúc và thể tích.',
    explanationText: 'Lực tương tác khác nhau dẫn đến cấu trúc sắp xếp và khả năng giữ thể tích/hình dạng khác nhau.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.1',
    level: 'Nhận biết',
    type: 'MCQ',
    promptText: 'Khí lí tưởng là chất khí trong đó các phân tử được coi là chất điểm và',
    imageUrl: '',
    options: [
      'Chỉ tương tác với nhau khi va chạm.',
      'Không tương tác với nhau.',
      'Hút nhau khi ở xa.',
      'Đẩy nhau khi ở gần.'
    ],
    answerKey: 'Chỉ tương tác với nhau khi va chạm.',
    explanationText: 'Khí lí tưởng bỏ qua lực tương tác phân tử, chỉ xét tương tác khi va chạm.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.1',
    level: 'Thông hiểu',
    type: 'MCQ',
    promptText: 'Nhận xét nào sau đây không đúng về chuyển động Brown?',
    imageUrl: '',
    options: [
      'Hạt phấn hoa chuyển động hỗn loạn không ngừng.',
      'Quỹ đạo chuyển động gấp khúc, không theo quy luật.',
      'Nhiệt độ càng cao thì hạt phấn hoa chuyển động càng chậm.',
      'Các hạt bị phân tử nước va đập.'
    ],
    answerKey: 'Nhiệt độ càng cao thì hạt phấn hoa chuyển động càng chậm.',
    explanationText: 'Nhiệt độ càng cao, các phân tử chuyển động càng nhanh, va chạm càng mạnh làm hạt phấn hoa chuyển động nhanh hơn.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.1',
    level: 'Thông hiểu',
    type: 'MCQ',
    promptText: 'Phát biểu đúng về khí lí tưởng là',
    imageUrl: '',
    options: [
      'Phân tử luôn tương tác với nhau.',
      'Va chạm là va chạm mềm.',
      'Phân tử được coi là chất điểm.',
      'Có thể bỏ qua khối lượng phân tử.'
    ],
    answerKey: 'Phân tử được coi là chất điểm.',
    explanationText: 'Trong mô hình khí lí tưởng, các phân tử được coi là các chất điểm có khối lượng.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.1',
    level: 'Thông hiểu',
    type: 'MCQ',
    promptText: 'Robert Brown đã quan sát thấy các hạt phấn hoa trong nước',
    imageUrl: '',
    options: [
      'Dao động quanh vị trí cân bằng.',
      'Có lúc đứng yên, có lúc chuyển động.',
      'Luôn đứng yên.',
      'Chuyển động không ngừng.'
    ],
    answerKey: 'Chuyển động không ngừng.',
    explanationText: 'Các hạt phấn hoa chuyển động hỗn loạn không ngừng do va chạm của các phân tử nước.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.1',
    level: 'Nhận biết',
    type: 'MCQ',
    promptText: 'Tính chất nào sau đây không phải của chất khí?',
    imageUrl: '',
    options: [
      'Hình dạng phụ thuộc bình chứa.',
      'Khối lượng riêng rất nhỏ so với chất rắn và lỏng.',
      'Phân tử luôn tương tác mạnh với nhau.',
      'Gây áp suất theo mọi hướng.'
    ],
    answerKey: 'Phân tử luôn tương tác mạnh với nhau.',
    explanationText: 'Ở thể khí, lực tương tác phân tử rất yếu (trừ lúc va chạm).'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.1',
    level: 'Thông hiểu',
    type: 'MCQ',
    promptText: 'Chuyển động nào không được coi là chuyển động Brown?',
    imageUrl: '',
    options: [
      'Khói thoát ra khỏi ống xả ô tô.',
      'Hạt khói trong ống nghiệm quan sát bằng kính hiển vi.',
      'Hạt bụi lơ lửng trong không khí tĩnh.',
      'Hạt phấn hoa trong nước.'
    ],
    answerKey: 'Khói thoát ra khỏi ống xả ô tô.',
    explanationText: 'Khói từ ống xả là dòng chuyển động có hướng do áp suất đẩy ra, không phải chuyển động nhiệt hỗn loạn cấp vi mô.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.1',
    level: 'Nhận biết',
    type: 'MCQ',
    promptText: 'Đặc điểm nào không phải của chất khí?',
    imageUrl: '',
    options: [
      'Nhiệt độ cao phân tử chuyển động nhanh.',
      'Lực tương tác rất nhỏ.',
      'Phân tử sắp xếp có trật tự.',
      'Chuyển động hỗn loạn.'
    ],
    answerKey: 'Phân tử sắp xếp có trật tự.',
    explanationText: 'Sắp xếp có trật tự là đặc điểm của chất rắn kết tinh.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.1',
    level: 'Thông hiểu',
    type: 'MCQ',
    promptText: 'Bóng bay buộc chặt để lâu ngày vẫn bị xẹp dần vì',
    imageUrl: '',
    options: [
      'Không khí nhẹ nên bay ra ngoài.',
      'Cao su co lại.',
      'Không khí nguội đi.',
      'Giữa các phân tử làm vỏ bóng có khoảng cách.'
    ],
    answerKey: 'Giữa các phân tử làm vỏ bóng có khoảng cách.',
    explanationText: 'Các phân tử khí nhỏ li ti có thể chui qua các khoảng cách giữa các phân tử cao su để thoát ra ngoài.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.1',
    level: 'Nhận biết',
    type: 'MCQ',
    promptText: 'Mô hình động học phân tử cho biết các chất được cấu tạo từ',
    imageUrl: '',
    options: [
      'Các hạt riêng biệt gọi là nguyên tử, phân tử.',
      'Các dòng vật chất liên tục.',
      'Các hạt không riêng biệt.',
      'Chỉ gồm Electron, proton, neutron.'
    ],
    answerKey: 'Các hạt riêng biệt gọi là nguyên tử, phân tử.',
    explanationText: 'Vật chất được cấu tạo từ các hạt riêng biệt gọi là nguyên tử, phân tử.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.1',
    level: 'Nhận biết',
    type: 'MCQ',
    promptText: 'Chuyển động Brown chứng minh điều gì?',
    imageUrl: '',
    options: [
      'Các phân tử chất lỏng/khí chuyển động hỗn loạn không ngừng.',
      'Chất rắn có cấu trúc tinh thể.',
      'Lực hút phân tử rất lớn.',
      'Phân tử khí rất nặng.'
    ],
    answerKey: 'Các phân tử chất lỏng/khí chuyển động hỗn loạn không ngừng.',
    explanationText: 'Chuyển động Brown là bằng chứng thực nghiệm về chuyển động nhiệt của phân tử.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.1',
    level: 'Nhận biết',
    type: 'MCQ',
    promptText: 'Hiện tượng nào sau đây chứng tỏ khoảng cách giữa các phân tử khí rất lớn?',
    imageUrl: '',
    options: [
      'Chất khí dễ dàng bị nén.',
      'Chất khí dẫn điện kém.',
      'Chất khí có khối lượng.',
      'Chuyển động Brown.'
    ],
    answerKey: 'Chất khí dễ dàng bị nén.',
    explanationText: 'Vì khoảng cách lớn nên có thể nén khí lại để giảm khoảng cách này.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.1',
    level: 'Thông hiểu',
    type: 'MCQ',
    promptText: 'Phát biểu nào sau đây không phù hợp với khí lí tưởng?',
    imageUrl: '',
    options: [
      'Kích thước của các phân tử có thể bỏ qua so với khoảng cách giữa chúng.',
      'Các phân tử chỉ tương tác với nhau khi va chạm.',
      'Các phân tử khí chuyển động càng nhanh khi nhiệt độ càng cao.',
      'Khối lượng của các phân tử khí có thể bỏ qua.'
    ],
    answerKey: 'Khối lượng của các phân tử khí có thể bỏ qua.',
    explanationText: 'Khí lí tưởng coi phân tử là chất điểm (bỏ qua kích thước) nhưng KHÔNG bỏ qua khối lượng.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.1',
    level: 'Thông hiểu',
    type: 'MCQ',
    promptText: 'Phát biểu nào sau đây sai khi nói về mô hình động học phân tử?',
    imageUrl: '',
    options: [
      'Giữa các phân tử chỉ có tương tác bằng lực hút.',
      'Các phân tử chuyển động nhiệt càng nhanh thì nhiệt độ càng cao.',
      'Vật chất được cấu tạo từ rất nhiều phân tử.',
      'Các phân tử chuyển động nhiệt không ngừng.'
    ],
    answerKey: 'Giữa các phân tử chỉ có tương tác bằng lực hút.',
    explanationText: 'Giữa các phân tử có cả lực hút và lực đẩy.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.1',
    level: 'Nhận biết',
    type: 'MCQ',
    promptText: 'Khi nói về khí lí tưởng, phát biểu nào sau đây đúng?',
    imageUrl: '',
    options: [
      'Giữa hai va chạm liên tiếp, phân tử chuyển động chậm dần đều.',
      'Các phân tử luôn tương tác với nhau.',
      'Các phân tử có kích thước rất nhỏ, có thể bỏ qua.',
      'Va chạm giữa các phân tử là va chạm mềm.'
    ],
    answerKey: 'Các phân tử có kích thước rất nhỏ, có thể bỏ qua.',
    explanationText: 'Phân tử khí lí tưởng được coi là chất điểm.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.1',
    level: 'Thông hiểu',
    type: 'MCQ',
    promptText: 'Nhận định nào sau đây sai khi nói về một lượng khí xác định trong bình kín?',
    imageUrl: '',
    options: [
      'Tốc độ chuyển động của các phân tử khí luôn bằng nhau.',
      'Các phân tử va chạm vào thành bình gây áp suất.',
      'Các phân tử chuyển động hỗn loạn không ngừng.',
      'Khí chiếm đầy thể tích bình.'
    ],
    answerKey: 'Tốc độ chuyển động của các phân tử khí luôn bằng nhau.',
    explanationText: 'Tốc độ của các phân tử tuân theo quy luật thống kê, không bằng nhau.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.1',
    level: 'Thông hiểu',
    type: 'MCQ',
    promptText: 'Trong mô hình khí lí tưởng, giữa hai va chạm liên tiếp phân tử khí chuyển động',
    imageUrl: '',
    options: [
      'Thẳng chậm dần đều.',
      'Thẳng đều.',
      'Tròn đều.',
      'Thẳng nhanh dần đều.'
    ],
    answerKey: 'Thẳng đều.',
    explanationText: 'Do bỏ qua tương tác xa, nên khi không va chạm, phân tử không chịu lực tác dụng.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.1',
    level: 'Thông hiểu',
    type: 'MCQ',
    promptText: 'Phân tử khí lí tưởng có thế năng tương tác bằng bao nhiêu?',
    imageUrl: '',
    options: [
      'Bằng 0.',
      'Rất lớn.',
      'Tỉ lệ với bình phương khoảng cách.',
      'Phụ thuộc vào nhiệt độ.'
    ],
    answerKey: 'Bằng 0.',
    explanationText: 'Do bỏ qua tương tác xa nên thế năng tương tác coi như bằng 0.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.1',
    level: 'Thông hiểu',
    type: 'MCQ',
    promptText: 'Phát biểu nào sau đây không đúng về lực tương tác phân tử?',
    imageUrl: '',
    options: [
      'Lực hút có thể lớn hơn lực đẩy.',
      'Lực hút có thể bằng lực đẩy.',
      'Lực hút không thể lớn hơn lực đẩy.',
      'Lực phân tử chỉ đáng kể khi các phân tử rất gần nhau.'
    ],
    answerKey: 'Lực hút không thể lớn hơn lực đẩy.',
    explanationText: 'Tùy thuộc vào khoảng cách, lực tương tác có thể là lực hút chiếm ưu thế hoặc lực đẩy chiếm ưu thế.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.1',
    level: 'Nhận biết',
    type: 'MCQ',
    promptText: 'Số Avogadro là đại lượng đặc trưng cho',
    imageUrl: '',
    options: [
      'Số phân tử có trong 1 lít khí ở ĐKTC.',
      'Số hạt (nguyên tử/phân tử) có trong 1 mol chất.',
      'Số phân tử trong 1 g khí.',
      'Số phân tử trong 1 kg khí.'
    ],
    answerKey: 'Số hạt (nguyên tử/phân tử) có trong 1 mol chất.',
    explanationText: 'Định nghĩa số Avogadro $N_A \approx 6,02.10^{23}$.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.1',
    level: 'Thông hiểu',
    type: 'MCQ',
    promptText: 'Biết $M_{H_2O}=18g/mol$. Số phân tử nước có trong $1g$ nước là',
    imageUrl: '',
    options: [
      '$3,34.10^{22}$',
      '$3,01.10^{23}$',
      '$3,01.10^{22}$',
      '$3,34.10^{23}$'
    ],
    answerKey: '$3,34.10^{22}$',
    explanationText: '$N = \frac{m}{M}N_A = \frac{1}{18}.6,02.10^{23} \approx 3,34.10^{22}$.'
  },

  // --- BÀI 2.2: PHƯƠNG TRÌNH TRẠNG THÁI KHÍ LÍ TƯỞNG ---
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.2',
    level: 'Nhận biết',
    type: 'MCQ',
    promptText: 'Thông số trạng thái của một lượng khí xác định gồm',
    imageUrl: '',
    options: [
      'Nhiệt độ, khối lượng, thể tích.',
      'Khối lượng, nhiệt độ, áp suất.',
      'Nhiệt độ, thể tích, áp suất.',
      'Thể tích, áp suất, khối lượng.'
    ],
    answerKey: 'Nhiệt độ, thể tích, áp suất.',
    explanationText: 'Ba thông số trạng thái cơ bản là p, V, T.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.2',
    level: 'Thông hiểu',
    type: 'MCQ',
    promptText: 'Trong hiện tượng nào sau đây, cả ba thông số trạng thái của một lượng khí đều thay đổi?',
    imageUrl: '',
    options: [
      'Đun nóng khí trong bình thép kín (Đẳng tích).',
      'Bóng bàn bị bẹp nhúng vào nước nóng phồng lên.',
      'Nén khí từ từ trong xilanh (Đẳng nhiệt).',
      'Bóng bay đặt trong phòng nhiệt độ không đổi.'
    ],
    answerKey: 'Bóng bàn bị bẹp nhúng vào nước nóng phồng lên.',
    explanationText: 'Khi bóng phồng lên: Thể tích tăng, Nhiệt độ tăng (do nước nóng), Áp suất thay đổi.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.2',
    level: 'Thông hiểu',
    type: 'MCQ',
    promptText: 'Một lượng khí có thể tích ban đầu $V_1 = 6$ lít. Nhiệt độ được giữ không đổi. Nếu áp suất của khí tăng thêm 50% so với ban đầu thì thể tích của lượng khí này là',
    imageUrl: '',
    options: ['3 lít.', '9 lít.', '4 lít.', '6 lít.'],
    answerKey: '4 lít.',
    explanationText: 'Đẳng nhiệt: $p_1V_1 = p_2V_2$. Với $p_2 = 1,5p_1 \Rightarrow V_2 = \frac{p_1V_1}{1,5p_1} = \frac{6}{1,5} = 4$ lít.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.2',
    level: 'Thông hiểu',
    type: 'MCQ',
    promptText: 'Một bong bóng khí nổi lên trong nước. Khi bán kính giảm từ 1mm xuống 0,5mm (giả sử nhiệt độ không đổi), thì áp suất tác dụng lên bóng',
    imageUrl: '',
    options: ['Tăng 8 lần.', 'Giảm 8 lần.', 'Tăng 2 lần.', 'Giảm 2 lần.'],
    answerKey: 'Tăng 8 lần.',
    explanationText: 'Thể tích bóng $V \sim R^3$. R giảm 2 lần -> V giảm 8 lần. Đẳng nhiệt $p \sim 1/V$ nên p tăng 8 lần.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.2',
    level: 'Thông hiểu',
    type: 'MCQ',
    promptText: 'Trong quá trình đẳng nhiệt của một lượng khí nhất định, mật độ phân tử khí thay đổi như thế nào?',
    imageUrl: '',
    options: [
      'Tỉ lệ thuận với áp suất.',
      'Giảm tỉ lệ nghịch với áp suất.',
      'Chưa đủ dữ kiện.',
      'Luôn không đổi.'
    ],
    answerKey: 'Tỉ lệ thuận với áp suất.',
    explanationText: 'Mật độ $n = N/V$. Vì $p \sim 1/V$ nên $p \sim n$.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.2',
    level: 'Thông hiểu',
    type: 'MCQ',
    promptText: 'Trong thí nghiệm kiểm chứng định luật Boyle, việc dịch chuyển pít-tông từ từ nhằm đảm bảo điều kiện nào?',
    imageUrl: '',
    options: [
      'Khối lượng khí không đổi.',
      'Nhiệt độ khí không đổi.',
      'Thể tích khí không đổi.',
      'Áp suất khí không đổi.'
    ],
    answerKey: 'Nhiệt độ khí không đổi.',
    explanationText: 'Dịch chuyển chậm để khí kịp trao đổi nhiệt với môi trường, giữ nhiệt độ không đổi.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.2',
    level: 'Nhận biết',
    type: 'MCQ',
    promptText: 'Công thức đúng của định luật Boyle là',
    imageUrl: '',
    options: [
      '$p_1V_2 = p_2V_2$',
      '$p_1V_1 = p_2V_1$',
      '$p_1V_2 = p_2V_1$',
      '$p_1V_1 = p_2V_2$'
    ],
    answerKey: '$p_1V_1 = p_2V_2$',
    explanationText: 'Định luật Boyle: pV = hằng số.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.2',
    level: 'Thông hiểu',
    type: 'MCQ',
    promptText: 'Trong hệ trục tọa độ (pOV), đường đẳng nhiệt có dạng',
    imageUrl: '',
    options: [
      'Đường thẳng song song trục Op.',
      'Đường thẳng vuông góc trục OV.',
      'Đường thẳng đi qua gốc tọa độ.',
      'Đường hypebol.'
    ],
    answerKey: 'Đường hypebol.',
    explanationText: 'Đồ thị p theo V trong quá trình đẳng nhiệt là đường Hypebol.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.2',
    level: 'Vận dụng',
    type: 'MCQ',
    promptText: 'Thợ lặn ở độ sâu 35m. Biết $\rho = 1000kg/m^3$, $p_a = 10^5Pa$, $g=10m/s^2$. Áp suất người thợ lặn chịu là',
    imageUrl: '',
    options: ['4,5.10^5 Pa.', '3,5.10^5 Pa.', '2,5.10^5 Pa.', '3,5 Pa.'],
    answerKey: '4,5.10^5 Pa.',
    explanationText: '$p = p_a + \rho gh = 10^5 + 1000.10.35 = 450000 Pa = 4,5.10^5 Pa$.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.2',
    level: 'Thông hiểu',
    type: 'MCQ',
    promptText: 'Khí đẳng nhiệt có $V_1 = 2 dm^3$, áp suất giảm từ $1,5 atm$ xuống $0,75 atm$. Thể tích khí sẽ',
    imageUrl: '',
    options: [
      'Tăng lên thành 4 dm³.',
      'Giảm còn 1 dm³.',
      'Giảm còn 0,5 dm³.',
      'Tăng lên thành 3 dm³.'
    ],
    answerKey: 'Tăng lên thành 4 dm³.',
    explanationText: 'Áp suất giảm một nửa (1.5 -> 0.75) thì thể tích tăng gấp đôi (2 -> 4).'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.2',
    level: 'Thông hiểu',
    type: 'MCQ',
    promptText: 'Phát biểu nào sau đây đúng khi nói về định luật Charles?',
    imageUrl: '',
    options: [
      'Trong quá trình đẳng áp, thể tích tỉ lệ nghịch với nhiệt độ tuyệt đối.',
      'Trong quá trình đẳng áp, thể tích tỉ lệ thuận với nhiệt độ tuyệt đối.',
      'Trong quá trình đẳng áp, thể tích tỉ lệ nghịch với nhiệt độ Celsius.',
      'Trong quá trình đẳng áp, thể tích tỉ lệ thuận với áp suất.'
    ],
    answerKey: 'Trong quá trình đẳng áp, thể tích tỉ lệ thuận với nhiệt độ tuyệt đối.',
    explanationText: '$V/T = const \Rightarrow V \sim T$.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.2',
    level: 'Nhận biết',
    type: 'MCQ',
    promptText: 'Một lượng khí lí tưởng xác định biến đổi trạng thái với áp suất không đổi. Hệ thức đúng là',
    imageUrl: '',
    options: [
      '$p_1/T_1 = p_2/T_2$',
      '$p_1V_1 = p_2V_2$',
      '$V_1/p_1 = V_2/p_2$',
      '$V_1/T_1 = V_2/T_2$'
    ],
    answerKey: '$V_1/T_1 = V_2/T_2$',
    explanationText: 'Định luật Charles cho quá trình đẳng áp.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.2',
    level: 'Thông hiểu',
    type: 'MCQ',
    promptText: 'Một khối khí có $V_1 = 10$ lít ở $27^oC$. Giữ áp suất không đổi, để thể tích tăng lên 12 lít thì nhiệt độ phải tăng đến',
    imageUrl: '',
    options: ['$87^oC$', '$360^oC$', '$300^oC$', '$60^oC$'],
    answerKey: '$87^oC$',
    explanationText: '$T_1 = 300K$. $V_1/T_1 = V_2/T_2 \Rightarrow T_2 = T_1 \frac{V_2}{V_1} = 300 \frac{12}{10} = 360K \Rightarrow t_2 = 87^oC$.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.2',
    level: 'Nhận biết',
    type: 'MCQ',
    promptText: 'Phương trình nào sau đây là phương trình trạng thái của khí lí tưởng (Phương trình Clapeyron)?',
    imageUrl: '',
    options: [
      '$pV/T = const$',
      '$pT = const$',
      '$VT = const$',
      '$pV = const$'
    ],
    answerKey: '$pV/T = const$',
    explanationText: 'Phương trình trạng thái: $\frac{pV}{T} = const$.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.2',
    level: 'Thông hiểu',
    type: 'MCQ',
    promptText: 'Khối lượng riêng của không khí trong phòng $27^oC$ lớn hơn khối lượng riêng của không khí ngoài sân nắng $42^oC$ bao nhiêu lần? Biết áp suất như nhau.',
    imageUrl: '',
    options: ['1,50', '1,00', '1,05', '1,27'],
    answerKey: '1,05',
    explanationText: 'Từ $pV = \frac{m}{M}RT \Rightarrow \rho = \frac{m}{V} = \frac{pM}{RT}$. Vậy $\rho \sim 1/T$. Tỉ lệ = $T_2/T_1 = (273+42)/(273+27) = 315/300 = 1,05$.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.2',
    level: 'Thông hiểu',
    type: 'MCQ',
    promptText: 'Một khối khí xác định: áp suất tăng gấp đôi, nhiệt độ tuyệt đối tăng gấp 3. Thể tích khí sẽ',
    imageUrl: '',
    options: [
      'Tăng 1,5 lần.',
      'Tăng 6 lần.',
      'Giảm 1,5 lần.',
      'Giảm 6 lần.'
    ],
    answerKey: 'Tăng 1,5 lần.',
    explanationText: '$\frac{p_1V_1}{T_1} = \frac{p_2V_2}{T_2} \Rightarrow V_2 = V_1 \frac{p_1}{p_2} \frac{T_2}{T_1} = V_1 \frac{1}{2} . 3 = 1,5V_1$.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.2',
    level: 'Nhận biết',
    type: 'MCQ',
    promptText: 'Hệ thức nào sau đây phù hợp với quá trình đẳng tích?',
    imageUrl: '',
    options: [
      '$V_1/T_1 = V_2/T_2$',
      '$p_1/T_1 = p_2/T_2$',
      '$p_1V_1 = p_2V_2$',
      '$p_1V_1/T_1 = p_2V_2/T_2$'
    ],
    answerKey: '$p_1/T_1 = p_2/T_2$',
    explanationText: 'Định luật Charles cho quá trình đẳng tích (Sách cũ) / Gay-Lussac.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.2',
    level: 'Vận dụng',
    type: 'MCQ',
    promptText: 'Bình oxy y tế cấp cho bệnh nhân với lưu lượng $5l/phút$. Bình có thể tích 10 lít chứa khí ở áp suất 150 atm. Coi nhiệt độ không đổi và quá trình là đẳng nhiệt. Bệnh nhân sử dụng được trong bao lâu đến khi áp suất trong bình cân bằng với áp suất khí quyển (1 atm)?',
    imageUrl: '',
    options: ['300 phút.', '298 phút.', '150 phút.', '1490 phút.'],
    answerKey: '298 phút.',
    explanationText: 'Lượng khí khả dụng: $V_{khả_dụng} = 10.(150 - 1) = 1490$ lít (ở 1 atm). Thời gian = 1490 / 5 = 298 phút.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.2',
    level: 'Thông hiểu',
    type: 'MCQ',
    promptText: 'Hai bình chứa khí thông nhau. Bình 1 có $V_1, p_1, T_1$. Bình 2 có $V_2, p_2, T_2$. Sau khi mở van thông nhau và cân bằng nhiệt ở nhiệt độ T, áp suất p chung là',
    imageUrl: '',
    options: [
      'Tính theo bảo toàn số mol.',
      'Trung bình cộng áp suất.',
      'Tổng áp suất.',
      'Hiệu áp suất.'
    ],
    answerKey: 'Tính theo bảo toàn số mol.',
    explanationText: '$n = n_1 + n_2 \Rightarrow \frac{pV}{RT} = \frac{p_1V_1}{RT_1} + \frac{p_2V_2}{RT_2}$.'
  },

  // --- BÀI 2.3: ÁP SUẤT KHÍ THEO MÔ HÌNH ĐỘNG HỌC ---
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.3',
    level: 'Nhận biết',
    type: 'MCQ',
    promptText: 'Khi nhiệt độ của khối khí trong một bình kín tăng thì áp suất của khối khí trong bình cũng tăng lên vì',
    imageUrl: '',
    options: [
      'Số lượng phân tử khí tăng nên va chạm với thành bình nhiều hơn.',
      'Các phân tử khí va chạm với nhau nhiều hơn.',
      'Các phân tử khí chuyển động nhanh hơn nên va chạm với thành bình mạnh hơn và tần số va chạm lớn hơn.',
      'Khoảng cách giữa các phân tử khí tăng nên va chạm mạnh hơn.'
    ],
    answerKey: 'Các phân tử khí chuyển động nhanh hơn nên va chạm với thành bình mạnh hơn và tần số va chạm lớn hơn.',
    explanationText: 'Theo mô hình động học: Nhiệt độ tăng -> Động năng tăng -> Vận tốc tăng -> Va chạm mạnh hơn và nhiều hơn -> Áp suất tăng.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.3',
    level: 'Nhận biết',
    type: 'MCQ',
    promptText: 'Nguyên nhân gây ra áp suất chất khí lên thành bình là',
    imageUrl: '',
    options: [
      'Do lực liên kết giữa các phân tử.',
      'Do trọng lượng của chất khí.',
      'Do các phân tử khí va chạm vào thành bình.',
      'Do chất khí có thể tích lớn.'
    ],
    answerKey: 'Do các phân tử khí va chạm vào thành bình.',
    explanationText: 'Áp suất khí gây ra bởi lực do các phân tử va chạm lên một đơn vị diện tích thành bình.'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.3',
    level: 'Thông hiểu',
    type: 'MCQ',
    promptText: 'Trong bình kín, khi nhiệt độ tăng thì áp suất tăng vì',
    imageUrl: '',
    options: [
      'Mật độ phân tử giảm.',
      'Phân tử khí chuyển động nhanh hơn.',
      'Khoảng cách phân tử tăng.',
      'Số phân tử tăng.'
    ],
    answerKey: 'Phân tử khí chuyển động nhanh hơn.',
    explanationText: 'Giải thích tương tự câu trên: nhiệt độ liên quan đến vận tốc chuyển động nhiệt.'
  },

  // --- BÀI 2.4: ĐỘNG NĂNG PHÂN TỬ ---
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.4',
    level: 'Thông hiểu',
    type: 'MCQ',
    promptText: 'Khi đun nóng khí trong bình kín, các phân tử khí',
    imageUrl: '',
    options: [
      'Chuyển động nhanh hơn.',
      'Va chạm yếu hơn.',
      'Tiến lại gần nhau.',
      'Giãn nở.'
    ],
    answerKey: 'Chuyển động nhanh hơn.',
    explanationText: 'Nhiệt độ tỉ lệ thuận với động năng trung bình phân tử ($E_d \sim T$).'
  },
  {
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.4',
    level: 'Nhận biết',
    type: 'MCQ',
    promptText: 'Động năng trung bình của phân tử khí lí tưởng phụ thuộc vào',
    imageUrl: '',
    options: [
      'Thể tích.',
      'Áp suất.',
      'Nhiệt độ tuyệt đối.',
      'Loại chất khí.'
    ],
    answerKey: 'Nhiệt độ tuyệt đối.',
    explanationText: '$W_d = \frac{3}{2}kT$. Chỉ phụ thuộc vào nhiệt độ T.'
  },

 

];

// 3. Hàm xử lý tự động đánh số ID
const generateQuestionBank = (data: QuestionInput[]): Question[] => {
  // Bộ đếm cho từng loại trong từng bài học
  const counters: Record<string, Record<string, number>> = {};

  return data.map((q) => {
    // Tạo key đếm nếu chưa có
    if (!counters[q.lessonId]) counters[q.lessonId] = { MCQ: 0, TrueFalse: 0, Short: 0 };
    
    // Tăng bộ đếm cho loại câu hỏi này
    counters[q.lessonId][q.type]++;
    const count = counters[q.lessonId][q.type];

    // Tạo tiền tố (Prefix)
    let prefix = '';
    if (q.type === 'MCQ') prefix = 'MCQ';       // c1.1-1
    if (q.type === 'TrueFalse') prefix = 'TF'; // tf1.1-1
    if (q.type === 'Short') prefix = 'S';     // s1.1-1

    // Lấy phần số của lessonId (VD: l1.1 -> 1.1)
    const lessonNum = q.lessonId.replace('l', '');

    // Tạo ID tự động
    const autoId = `${prefix}${lessonNum}-${count}`;

    return {
      ...q,
      id: autoId
    };
  });
};

// 4. Xuất ra biến QUESTION_BANK đã có ID hoàn chỉnh
export const QUESTION_BANK = generateQuestionBank(RAW_DATA);