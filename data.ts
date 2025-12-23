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
    formulas: `*1. Cho 2 trạng thái (Lượng khí không đổi):
$$ \\frac{p_1V_1}{T_1} = \\frac{p_2V_2}{T_2} $$
\n*2. Cho 1 trạng thái (Phương trình Clapeyron):
$$ pV = nRT = \\frac{m}{M}RT $$
\n*Trong đó:*
- $p$: Áp suất ($Pa$ hoặc $atm$)
- $V$: Thể tích ($m^3$ hoặc $lít$)
- $T$: Nhiệt độ tuyệt đối ($T(K) = t^oC + 273$)
- $n = \\frac{m}{M}$: Số mol khí
- $R$: Hằng số khí lí tưởng`,
    examples: [
      'Bài toán biến đổi trạng thái: Một lượng khí trong xilanh có $V_1, p_1, T_1$. Khi nén nhanh, $V$ giảm, $T$ tăng, tính $p_2$ dùng $\\frac{p_1V_1}{T_1} = \\frac{p_2V_2}{T_2}$.',
      'Bài toán tính lượng khí: Tính khối lượng khí Oxi trong bình dung tích 10 lít, áp suất 10 atm ở 27°C dùng $pV=nRT$.'
    ]
  },
  {
    id: 'l2.3',
    topic: 'KHÍ LÍ TƯỞNG',
    title: '2.3 Áp suất khí theo mô hình động học phân tử',
    theory: `- **Nguyên nhân tạo ra áp suất:** Các phân tử khí chuyển động hỗn loạn không ngừng, va chạm vào thành bình và truyền động lượng cho thành bình. Lực tác dụng của các phân tử lên một đơn vị diện tích thành bình tạo nên áp suất.
- **Đặc điểm:**
  + Áp suất khí tỉ lệ thuận với mật độ phân tử khí ($\\mu$).
  + Áp suất khí tỉ lệ thuận với động năng trung bình của các phân tử ($\\overline{E_d}$) (tức là tỉ lệ với nhiệt độ).
  + Áp suất khí tỉ lệ thuận với khối lượng riêng ($\\rho$) và trung bình bình phương tốc độ ($\\overline{v^2}$).`,
    theoryImages: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Kinetic_theory_of_gases_pressure.svg/440px-Kinetic_theory_of_gases_pressure.svg.png'
    ],
    formulas: `$$ p = \\frac{1}{3} \\mu m \\overline{v^2} = \\frac{1}{3} \\rho \\overline{v^2} $$
$$ p = \\frac{2}{3} \\mu \\overline{E_d} $$
\n**Trong đó:**
- $p$: Áp suất chất khí ($Pa$)
- $\\mu = \\frac{N}{V}$: Mật độ phân tử ($phân tử/m^3$) 
- $m$: Khối lượng một phân tử khí ($kg$)
- $\\overline{v^2}$: Trung bình của bình phương tốc độ phân tử ($m^2/s^2$) 
- $\\rho$: Khối lượng riêng của chất khí ($kg/m^3$) 
- $\\overline{E_d}$: Động năng tịnh tiến trung bình của phân tử ($J$) `,
    examples: [
      'Nếu mật độ phân tử khí tăng gấp đôi (nhiệt độ không đổi), số va chạm lên thành bình tăng gấp đôi $\\rightarrow$ Áp suất tăng gấp đôi.',
      'Khi đun nóng khí (thể tích không đổi), các phân tử chuyển động nhanh hơn ($\\overline{E_d}$ tăng) $\\rightarrow$ Áp suất tăng.',
          ]
  },
  {
    id: 'l2.4',
    topic: 'KHÍ LÍ TƯỞNG',
    title: '2.4 Động năng phân tử',
    theory: `- Động năng trung bình của phân tử được xác định bằng hệ thức phụ thuộc vào nhiệt độ tuyệt đối.
- Động năng trung bình của phân tử tỉ lệ thuận với nhiệt độ tuyệt đối.
- Các khí có bản chất khác nhau, khối lượng khác nhau nhưng nhiệt độ như nhau thì động năng trung bình của các phân tử bằng nhau.
- Động năng trung bình của phân tử khí càng lớn thì nhiệt độ của khí càng cao.
- Nhiệt độ tuyệt đối là số đo động năng trung bình của phân tử theo một đơn vị khác.`,
    theoryImages: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Translational_motion.gif/300px-Translational_motion.gif'
    ],
    formulas: `$$ \\overline{E_d} = \\frac{3}{2}kT $$
\n**Trong đó:**
- $\\overline{E_d}$: Động năng trung bình của phân tử ($J$) 
- $k$: Hằng số Boltzmann ($1,38.10^{-23} \\, J/K$) 
- $T$: Nhiệt độ tuyệt đối ($K$) `,
    examples: [
      'So sánh: Ở cùng nhiệt độ, phân tử khí Oxi và khí Nitơ có động năng trung bình bằng nhau.',
      'Tính toán: Động năng trung bình của phân tử khí ở 25°C (298K) là: $$\\overline{E_d} = \\frac{3}{2} \\cdot 1,38.10^{-23} \\cdot 298 \\approx 6,17.10^{-21} J$$',
      'Liên hệ: Khi nhiệt độ tuyệt đối tăng gấp 4 lần thì động năng trung bình tăng gấp 4 lần.'
    ]
  },

  // --- TOPIC 3: TỪ TRƯỜNG ---
 {
    id: 'l3.1',
    topic: 'TỪ TRƯỜNG',
    title: '3.1 Khái niệm từ trường',
    theory: `- **Định nghĩa:** Từ trường là trường lực gây ra bởi dòng điện hoặc nam châm, là một dạng của vật chất tồn tại xung quanh dòng điện hoặc nam châm.
- **Biểu hiện cụ thể:** Sự xuất hiện của **lực từ** tác dụng lên một dòng điện hay một nam châm khác đặt trong nó.
- **Tính chất:**
  + Gây ra lực từ tác dụng lên kim nam châm hoặc dòng điện đặt trong nó.
  + Phương của từ trường tại một điểm là phương Nam - Bắc của kim nam châm nhỏ nằm cân bằng tại điểm đó.
- **Đường sức từ:**
  + Là những đường vẽ trong không gian có từ trường sao cho tiếp tuyến tại mỗi điểm có phương trùng với phương của từ trường tại điểm đó.
  + Thực nghiệm: Có thể tạo ra hình ảnh các đường sức từ bằng cách rắc mạt sắt lên tấm nhựa đặt trên nam châm (từ phổ).`,
    theoryImages: [
      'https://i.postimg.cc/bYn8MMfR/ly-thuyet-bai-14-tu-truong-229486.png'
    ],
    formulas: '', // Chưa đề cập đến công thức tính lực
    examples: [
      'Thí nghiệm Ơ-xte: Dòng điện chạy qua dây dẫn làm lệch kim nam châm đặt gần nó -> Dòng điện sinh ra từ trường.',
      'Dùng mạt sắt để quan sát từ phổ của thanh nam châm thẳng hoặc nam châm hình chữ U.'
    ]
  },
  {
    id: 'l3.2',
    topic: 'TỪ TRƯỜNG',
    title: '3.2 Lực từ tác dụng lên đoạn dây dẫn mang dòng điện',
    theory: `- **Định luật Am-pe (Ampère):** Lực từ tác dụng lên một đoạn dây dẫn mang dòng điện đặt trong từ trường đều có:
  + **Điểm đặt:** Tại trung điểm của đoạn dây.
  + **Phương:** Vuông góc với mặt phẳng chứa đoạn dây và vectơ cảm ứng từ.
  + **Chiều:** Xác định theo quy tắc bàn tay trái.
  + **Độ lớn:** Tỉ lệ thuận với cường độ dòng điện, chiều dài đoạn dây, độ lớn cảm ứng từ và sin của góc hợp bởi đoạn dây và đường sức từ.
- **Quy tắc bàn tay trái:** Đặt bàn tay trái sao cho các đường sức từ hướng vào lòng bàn tay, chiều từ cổ tay đến ngón tay giữa hướng theo chiều dòng điện thì ngón cái choãi ra 90 độ chỉ chiều của lực từ.`,
    theoryImages: [
      'https://i.postimg.cc/pd34JWrv/luc-tu-tac-dung-len-doan-day-dan-thang-4.pngg'
    ],
    formulas: `$$ F = B.I.L.\\sin\\alpha $$
\n**Trong đó:**
- $F$: Lực từ tác dụng lên đoạn dây ($N$)
- $B$: Cảm ứng từ ($T$)
- $I$: Cường độ dòng điện ($A$)
- $L$: Chiều dài đoạn dây trong từ trường ($m$)
- $\\alpha$: Góc hợp bởi vectơ dòng điện $\\vec{I}$ và vectơ cảm ứng từ $\\vec{B}$`,
    examples: [
      'Dây dẫn song song với đường sức từ ($\\alpha = 0^o$ hoặc $180^o$) thì lực từ bằng 0.',
      'Dây dẫn vuông góc với đường sức từ ($\\alpha = 90^o$) thì lực từ cực đại: $F_{max} = BIL$.',
          ]
  },
  {
    id: 'l3.3',
    topic: 'TỪ TRƯỜNG',
    title: '3.3 Từ thông; Cảm ứng điện từ',
    theory: `- **Từ thông ($\\Phi$):** Là đại lượng đặc trưng cho số lượng đường sức từ xuyên qua diện tích S của một khung dây kín. Từ thông là một đại lượng vô hướng, có thể âm, dương hoặc bằng 0.
- **Hiện tượng cảm ứng điện từ:** Khi từ thông qua một mạch kín biến thiên thì trong mạch kín đó xuất hiện một dòng điện, gọi là dòng điện cảm ứng.
- **Định luật Fa-ra-đây (Faraday):** Độ lớn của suất điện động cảm ứng xuất hiện trong mạch kín tỉ lệ với tốc độ biến thiên từ thông qua mạch kín đó.
- **Định luật Len-xơ (Lenz):** Dòng điện cảm ứng xuất hiện trong mạch kín có chiều sao cho từ trường cảm ứng có tác dụng chống lại sự biến thiên của từ thông ban đầu qua mạch kín.`,
    theoryImages: [
      'https://i.postimg.cc/Gpz94fmv/download.jpg',
      'https://i.postimg.cc/L8KJwfWL/c4d8-tu-thong-10.jpg'
      
    ],
    formulas: `$$ \\Phi = N \\cdot B \\cdot S \\cdot \\cos\\alpha $$
$$ e_{cu} = -\\frac{\\Delta \\Phi}{\\Delta t} $$
$$ |e_{cu}| = \\left| \\frac{\\Delta \\Phi}{\\Delta t} \\right| $$
\n**Trong đó:**
- $\\Phi$: Từ thông (Wb - Vêbe)
- $N$: Số vòng dây
- $B$: Cảm ứng từ (T)
- $S$: Diện tích mặt phẳng khung dây ($m^2$)
- $\\alpha$: Góc hợp bởi vectơ pháp tuyến $\\vec{n}$ của mặt phẳng khung dây và vectơ cảm ứng từ $\vec{B}$
- $e_{cu}$: Suất điện động cảm ứng (V)
- $\\Delta \\Phi$: Độ biến thiên từ thông (Wb)
- $\\Delta t$: Thời gian biến thiên từ thông (s)`,
    examples: [
      'Khi nam châm tiến lại gần vòng dây kín, số đường sức từ xuyên qua vòng dây tăng lên ($\\Phi$ tăng), trong vòng dây xuất hiện dòng điện cảm ứng.',
      
    ]
  },

  // --- TOPIC 4: HẠT NHÂN & PHÓNG XẠ ---

  {
    id: 'l4.1',
    topic: 'HẠT NHÂN & PHÓNG XẠ',
    title: '4.1 Cấu trúc hạt nhân',
    theory: `- Cấu tạo hạt nhân: Hạt nhân được cấu tạo từ các hạt sơ cấp gọi là nuclôn. Có 2 loại nuclôn:
  + roton ($p$): Mang điện tích nguyên tố dương $+e$.
  + Nơtron ($n$): Không mang điện.
- Kí hiệu hạt nhân: Hạt nhân của nguyên tố $X$ được kí hiệu: $$ ^{A}_{Z}X $$
- Đồng vị: Là các hạt nhân có cùng số proton $Z$ nhưng khác số nơtron $N$, dẫn đến khác số khối $A$.
- Đơn vị khối lượng nguyên tử $u$: Có giá trị bằng $1/12$ khối lượng nguyên tử của đồng vị các-bon $^{12}_{6}C$.
  + $1u \\approx 1,66055.10^{-27} kg \\approx 931,5 MeV/c^2$.`,
    theoryImages: [
      'https://i.postimg.cc/m2bLHwKn/ss.png'
    ],
    formulas: `$$ A = Z + N $$
\nTrong đó:
- $Z$: Số hiệu nguyên tử (số proton). Cũng là số thứ tự trong bảng tuần hoàn.
- $A$: Số khối (tổng số nuclôn).
- $N$: Số nơtron $N = A - Z$.
- Điện tích hạt nhân: $q = +Ze$.
- Kích thước hạt nhân: \\n$$R \\approx 1,2.10^{-15}.A^{1/3} (m)$$.`,
    examples: [
      'Hạt nhân Nhôm $^{27}_{13}Al$ có: $Z=13$ proton và $N = 27 - 13 = 14$ nơtron.',
      'Hiđrô có 3 đồng vị phổ biến: Hiđrô thường ($^{1}_{1}H$), Đơteri ($^{2}_{1}H$ hay $D$), Triti ($^{3}_{1}H$ hay $T$).',
      'Hạt nhân có kích thước rất nhỏ cỡ $10^{-15}m$ so với kích thước nguyên tử cỡ $10^{-10}m$.'
    ]
  },
  {
    id: 'l4.2',
    topic: 'HẠT NHÂN & PHÓNG XẠ',
    title: '4.2 Độ hụt khối và năng lượng liên kết hạt nhân',
    theory: `- Độ hụt khối ($\\Delta m$): Khối lượng của một hạt nhân luôn *nhỏ hơn* tổng khối lượng của các nuclôn tạo thành nó. Độ chênh lệch đó gọi là độ hụt khối.
- Năng lượng liên kết ($W_{lk}$): Là năng lượng tỏa ra khi các nuclôn liên kết với nhau tạo thành hạt nhân (hoặc năng lượng tối thiểu cần thiết để phá vỡ hạt nhân thành các nuclôn riêng biệt).
- Năng lượng liên kết riêng ($W_{lkr}$): Là năng lượng liên kết tính trung bình cho một nuclôn.
  + Ý nghĩa: Đặc trưng cho *độ bền vững* của hạt nhân. Hạt nhân có năng lượng liên kết riêng càng lớn thì càng bền vững.
  + Các hạt nhân có số khối trong khoảng $50 < A < 95$ là bền vững nhất.`,
    theoryImages: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Binding_energy_curve_-_common_isotopes.svg/800px-Binding_energy_curve_-_common_isotopes.svg.png'
    ],
    formulas: `$$ \\Delta m = Z.m_p + (A-Z).m_n - m_X $$
$$ W_{lk} = \\Delta m \\cdot c^2 $$ \n  $$W_{lkr} = \\frac{W_{lk}}{A}$$.
\nTrong đó:
- $m_p \\approx 1,00728u$: Khối lượng proton
- $m_n \\approx 1,00866u$: Khối lượng nơtron
- $m_X$: Khối lượng hạt nhân
- Đổi đơn vị năng lượng: $1u \\cdot c^2 \\approx 931,5 \\text{ MeV}$`,
    examples: [
      'Tính độ hụt khối của hạt nhân Hêli ($^{4}_{2}He$) biết $m_{He}=4,0015u$. Ta có: $\\Delta m = 2 \\cdot 1,00728 + 2 \\cdot 1,00866 - 4,0015 = 0,03038u$.',
      'Năng lượng liên kết của Hêli: $W_{lk} = 0,03038 \\cdot 931,5 \\approx 28,3 \\text{ MeV}$.',
      'Hạt nhân Sắt $^{56}Fe$ nằm trong khoảng số khối trung bình nên bền vững hơn hạt nhân Urani $^{235}U$ (số khối quá lớn) và Hiđrô (số khối quá nhỏ).'
    ]
  },
  {
    id: 'l4.3',
    topic: 'HẠT NHÂN & PHÓNG XẠ',
    title: '4.3 Sự phóng xạ và chu kì bán rã',
    theory: `- Phóng xạ: Là quá trình phân hủy *tự phát* của một hạt nhân không bền vững (hạt nhân mẹ), phát ra các tia phóng xạ và biến đổi thành hạt nhân khác (hạt nhân con).
- Các loại tia phóng xạ chính:
  + Tia $\\alpha$ (dòng hạt nhân $^4_2He$).
  + Tia $\\beta$ (gồm $\\beta^-$ là electron và $\\beta^+$ là pôzitron).
  + Tia $\\gamma$ (sóng điện từ có bước sóng rất ngắn, thường đi kèm các tia $\\alpha, \\beta$).
- Đặc tính: Quá trình phóng xạ là ngẫu nhiên, không điều khiển được và không phụ thuộc vào các yếu tố bên ngoài (nhiệt độ, áp suất...).
- Chu kì bán rã ($T$): Là khoảng thời gian để một nửa số lượng hạt nhân phóng xạ ban đầu bị phân rã.`,
    theoryImages: [
      'https://i.postimg.cc/Y2PR4n4t/phong-xa-la-gi-2.png'
    ],
    formulas: `$$ N = N_0 \\cdot 2^{-\\frac{t}{T}} = N_0 \\cdot e^{-\\lambda t} $$
$$ m = m_0 \\cdot 2^{-\\frac{t}{T}} = m_0 \\cdot e^{-\\lambda t} $$
$$ \\lambda = \\frac{\\ln 2}{T} \\approx \\frac{0,693}{T} $$
\nTrong đó:
- $N, m$: Số hạt nhân và khối lượng chất phóng xạ còn lại sau thời gian $t$.
- $N_0, m_0$: Số hạt nhân và khối lượng ban đầu.
- $T$: Chu kì bán rã (giây, ngày, năm...).
- $\\lambda$: Hằng số phóng xạ.`,
    examples: [
      'Sau một chu kì bán rã $t=T$, số hạt nhân còn lại là $50\\%$. Sau 2 chu kì $t=2T$, còn lại $25\\%$.',
      'Đồng vị I-ốt $^{131}I$ có chu kì bán rã là 8 ngày. Sau 16 ngày 2 chu kì, lượng I-ốt ban đầu sẽ giảm đi 4 lần.',
      'Cacbon-14 $^{14}C$ có chu kì bán rã 5730 năm, thường được dùng để xác định tuổi của các mẫu vật cổ, khảo cổ học.'
    ]
  },
];

// ================= QUESTION BANK – VẬT LÍ 12 =================
export const QUESTION_BANK: Question[] = [

/* ============================================================
   CHƯƠNG 1 – VẬT LÍ NHIỆT 
============================================================ */

  {
    id: 'c1.1-3', // Câu này có hình ảnh
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.1',
    level: 'Vận dụng',
    type: 'MCQ',
    promptText: 'Câu 3: Quan sát đồ thị nóng chảy của nước đá (hình bên). Đoạn nằm ngang ứng với quá trình nào?',
    imageUrl: '', // Link ảnh mẫu
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