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
  rank: 12
};

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
    promptText: 'Cung cấp $8400J$ cho $2kg$ chất lỏng thì tăng $2^oC$. Nhiệt dung riêng là bao nhiêu?',
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
    topic: 'HẠT NHÂN & PHÓNG XẠ', lessonId: 'l4.3', level: 'Hiểu', type: 'Short',
    promptText: 'Khoảng thời gian để số lượng hạt nhân phóng xạ giảm đi một nửa gọi là gì?',
    imageUrl: '', answerKey: 'Chu kì bán rã', explanationText: 'Chu kì bán rã T.'
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
  }
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