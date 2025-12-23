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

  // --- CÂU HỎI BÀI 1.1: SỰ CHUYỂN THỂ ---
  
  // Cấp độ: BIẾT
  {
    id: 'c1.1-1',
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.1',
    level: 'Biết',
    type: 'MCQ',
    promptText: 'Quá trình chuyển từ thể lỏng sang thể khí ở bề mặt chất lỏng gọi là gì?',
    imageUrl: '',
    options: ['Sự nóng chảy', 'Sự đông đặc', 'Sự bay hơi', 'Sự ngưng tụ'],
    answerKey: 'Sự bay hơi',
    explanationText: 'Sự chuyển từ thể lỏng sang thể khí (hơi) xảy ra ở bề mặt chất lỏng gọi là sự bay hơi.'
  },
  {
    id: 'c1.1-2',
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.1',
    level: 'Biết',
    type: 'MCQ',
    promptText: 'Công thức tính nhiệt lượng cần cung cấp để làm nóng chảy hoàn toàn một khối lượng m chất rắn ở nhiệt độ nóng chảy là:',
    imageUrl: '',
    options: ['Q = mcΔt', 'Q = λm', 'Q = Lm', 'Q = qm'],
    answerKey: 'Q = λm',
    explanationText: 'Công thức tính nhiệt nóng chảy là Q = λm, trong đó λ là nhiệt nóng chảy riêng.'
  },

  // Cấp độ: HIỂU
  {
    id: 'c1.1-3',
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.1',
    level: 'Hiểu',
    type: 'MCQ',
    promptText: 'Tại sao khi nước đang sôi ở áp suất tiêu chuẩn, mặc dù tiếp tục cấp nhiệt nhưng nhiệt độ của nước không tăng?',
    imageUrl: '',
    options: [
      'Vì nhiệt lượng bị thất thoát hết ra môi trường.',
      'Vì nước đã đạt đến nhiệt độ tới hạn không thể tăng thêm.',
      'Vì nhiệt lượng cung cấp dùng để phá vỡ liên kết phân tử chuyển từ lỏng sang hơi.',
      'Vì động năng trung bình của các phân tử nước giảm đi.'
    ],
    answerKey: 'Vì nhiệt lượng cung cấp dùng để phá vỡ liên kết phân tử chuyển từ lỏng sang hơi.',
    explanationText: 'Trong quá trình chuyển thể (sôi), nhiệt lượng cung cấp không làm tăng động năng (nhiệt độ) mà dùng để tăng thế năng, phá vỡ liên kết để các phân tử chuyển sang thể khí.'
  },
  {
    id: 'c1.1-4',
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.1',
    level: 'Hiểu',
    type: 'MCQ',
    promptText: 'Điều nào sau đây là SAI khi nói về sự bay hơi?',
    imageUrl: '',
    options: [
      'Sự bay hơi xảy ra ở mọi nhiệt độ.',
      'Tốc độ bay hơi phụ thuộc vào diện tích mặt thoáng.',
      'Sự bay hơi là quá trình toả nhiệt.',
      'Gió càng mạnh thì sự bay hơi xảy ra càng nhanh.'
    ],
    answerKey: 'Sự bay hơi là quá trình toả nhiệt.',
    explanationText: 'Sự bay hơi là quá trình các phân tử lỏng thoát ra khỏi bề mặt để thành hơi, quá trình này cần thu nhiệt từ môi trường hoặc từ chính chất lỏng đó (làm lạnh chất lỏng).'
  },

  // Cấp độ: VẬN DỤNG
  {
    id: 'c1.1-5',
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.1',
    level: 'Vận dụng',
    type: 'MCQ',
    promptText: 'Biết nhiệt nóng chảy riêng của nước đá là 3,34.10^5 J/kg. Nhiệt lượng cần thiết để làm nóng chảy hoàn toàn 2 kg nước đá đang ở 0°C là bao nhiêu?',
    imageUrl: '',
    options: ['1,67.10^5 J', '6,68.10^5 J', '3,34.10^5 J', '13,36.10^5 J'],
    answerKey: '6,68.10^5 J',
    explanationText: 'Áp dụng công thức Q = λm = 3,34.10^5 * 2 = 6,68.10^5 J.'
  },
  {
    id: 'c1.1-6',
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.1',
    level: 'Vận dụng',
    type: 'MCQ',
    promptText: 'Để làm hóa hơi hoàn toàn 0,5 kg nước ở 100°C cần cung cấp nhiệt lượng là 1,13.10^6 J. Nhiệt hóa hơi riêng của nước là bao nhiêu?',
    imageUrl: '',
    options: ['2,26.10^6 J/kg', '0,56.10^6 J/kg', '1,13.10^6 J/kg', '4,52.10^6 J/kg'],
    answerKey: '2,26.10^6 J/kg',
    explanationText: 'Ta có Q = Lm => L = Q/m = 1,13.10^6 / 0,5 = 2,26.10^6 J/kg.'
  },
  // --- CÂU HỎI BÀI 1.2: NỘI NĂNG. ĐỊNH LUẬT I NĐLH ---

  // Cấp độ: BIẾT
  {
    id: 'c1.2-1',
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.2',
    level: 'Biết',
    type: 'MCQ',
    promptText: 'Theo định luật I của nhiệt động lực học, độ biến thiên nội năng của vật bằng:',
    imageUrl: '',
    options: [
      'Tổng công và nhiệt lượng mà vật nhận được.',
      'Hiệu của công và nhiệt lượng mà vật nhận được.',
      'Tích của công và nhiệt lượng mà vật nhận được.',
      'Thương của công và nhiệt lượng mà vật nhận được.'
    ],
    answerKey: 'Tổng công và nhiệt lượng mà vật nhận được.',
    explanationText: 'Phát biểu định luật I: ΔU = A + Q.'
  },
  {
    id: 'c1.2-2',
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.2',
    level: 'Biết',
    type: 'MCQ',
    promptText: 'Trong hệ thức ΔU = A + Q, quy ước dấu nào sau đây là đúng?',
    imageUrl: '',
    options: [
      'A > 0: Hệ thực hiện công.',
      'Q > 0: Hệ tỏa nhiệt.',
      'A < 0: Hệ nhận công.',
      'Q > 0: Hệ nhận nhiệt.'
    ],
    answerKey: 'Q > 0: Hệ nhận nhiệt.',
    explanationText: 'Quy ước dấu: Q > 0 là hệ nhận nhiệt (thu nhiệt), Q < 0 là hệ truyền nhiệt (tỏa nhiệt).'
  },

  // Cấp độ: HIỂU
  {
    id: 'c1.2-3',
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.2',
    level: 'Hiểu',
    type: 'MCQ',
    promptText: 'Trường hợp nào sau đây làm biến đổi nội năng không do thực hiện công?',
    imageUrl: '',
    options: [
      'Cọ xát miếng kim loại lên mặt bàn.',
      'Nén khí trong xi lanh.',
      'Nung nóng cục sắt trong lò than.',
      'Khuấy nước trong cốc.'
    ],
    answerKey: 'Nung nóng cục sắt trong lò than.',
    explanationText: 'Nung nóng là quá trình truyền nhiệt, không có sự chuyển dời các bộ phận vĩ mô dưới tác dụng của lực (không thực hiện công).'
  },
  {
    id: 'c1.2-4',
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.2',
    level: 'Hiểu',
    type: 'MCQ',
    promptText: 'Một lượng khí được nén đẳng nhiệt (nhiệt độ không đổi). Biết rằng nội năng của khí lí tưởng chỉ phụ thuộc vào nhiệt độ. Phát biểu nào sau đây đúng?',
    imageUrl: '',
    options: [
      'ΔU = 0, Q = -A (Khí tỏa nhiệt lượng bằng công nhận được).',
      'ΔU > 0, Q = 0 (Nội năng tăng do nhận công).',
      'ΔU < 0, A > 0 (Nội năng giảm do bị nén).',
      'ΔU = 0, Q = A (Khí thu nhiệt lượng bằng công nhận được).'
    ],
    answerKey: 'ΔU = 0, Q = -A (Khí tỏa nhiệt lượng bằng công nhận được).',
    explanationText: 'Đẳng nhiệt nên T không đổi => ΔU = 0. Theo ĐL I: 0 = A + Q => Q = -A. Vì nén khí nên A > 0 => Q < 0 (tỏa nhiệt).'
  },

  // Cấp độ: VẬN DỤNG
  {
    id: 'c1.2-5',
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.2',
    level: 'Vận dụng',
    type: 'MCQ',
    promptText: 'Người ta thực hiện công 100 J để nén khí trong một xilanh. Biết khí truyền ra môi trường xung quanh nhiệt lượng 20 J. Độ biến thiên nội năng của khí là:',
    imageUrl: '',
    options: ['80 J', '120 J', '-80 J', '-120 J'],
    answerKey: '80 J',
    explanationText: 'Khí bị nén (nhận công): A = +100 J. Khí truyền nhiệt (tỏa nhiệt): Q = -20 J. ΔU = A + Q = 100 - 20 = 80 J.'
  },
  {
    id: 'c1.2-6',
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.2',
    level: 'Vận dụng',
    type: 'MCQ',
    promptText: 'Một lượng khí trong xilanh nhận nhiệt lượng 150 kJ, giãn nở và thực hiện công 100 kJ đẩy pit-tông lên. Nội năng của lượng khí đã thay đổi như thế nào?',
    imageUrl: '',
    options: ['Tăng 250 kJ', 'Giảm 50 kJ', 'Tăng 50 kJ', 'Giảm 250 kJ'],
    answerKey: 'Tăng 50 kJ',
    explanationText: 'Khí nhận nhiệt: Q = +150 kJ. Khí thực hiện công: A = -100 kJ. ΔU = A + Q = -100 + 150 = +50 kJ. ΔU > 0 nên nội năng tăng.'
  },
  // --- CÂU HỎI BÀI 1.3: NHIỆT ĐỘ. THANG NHIỆT ĐỘ ---

  // Cấp độ: BIẾT
  {
    id: 'c1.3-1',
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.3',
    level: 'Biết',
    type: 'MCQ',
    promptText: 'Đơn vị đo nhiệt độ trong hệ SI là gì?',
    imageUrl: '',
    options: ['Độ Celsius (°C)', 'Độ Fahrenheit (°F)', 'Kelvin (K)', 'Joule (J)'],
    answerKey: 'Kelvin (K)',
    explanationText: 'Trong hệ đo lường quốc tế (SI), đơn vị của nhiệt độ nhiệt động lực học là Kelvin (K).'
  },
  {
    id: 'c1.3-2',
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.3',
    level: 'Biết',
    type: 'MCQ',
    promptText: 'Độ không tuyệt đối (0 K) có giá trị bằng bao nhiêu trong thang đo Celsius?',
    imageUrl: '',
    options: ['0°C', '273°C', '-273°C', '100°C'],
    answerKey: '-273°C',
    explanationText: 'Ta có công thức T = t + 273 => t = T - 273. Với T = 0 thì t = -273°C.'
  },

  // Cấp độ: HIỂU
  {
    id: 'c1.3-3',
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.3',
    level: 'Hiểu',
    type: 'MCQ',
    promptText: 'Chọn phát biểu đúng về sự cân bằng nhiệt:',
    imageUrl: '',
    options: [
      'Nhiệt độ của hai vật bằng nhau thì không có sự truyền nhiệt.',
      'Nhiệt lượng luôn truyền từ vật có nội năng lớn sang vật có nội năng nhỏ.',
      'Khi cân bằng nhiệt, nội năng của hai vật bằng nhau.',
      'Nhiệt lượng luôn truyền từ vật có khối lượng lớn sang vật có khối lượng nhỏ.'
    ],
    answerKey: 'Nhiệt độ của hai vật bằng nhau thì không có sự truyền nhiệt.',
    explanationText: 'Điều kiện xảy ra truyền nhiệt là có sự chênh lệch nhiệt độ. Khi nhiệt độ bằng nhau (cân bằng nhiệt), quá trình truyền nhiệt vĩ mô chấm dứt.'
  },
  {
    id: 'c1.3-4',
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.3',
    level: 'Hiểu',
    type: 'MCQ',
    promptText: 'Tại sao không thể đạt tới nhiệt độ thấp hơn 0 K?',
    imageUrl: '',
    options: [
      'Vì tại đó nước đã đóng băng hoàn toàn.',
      'Vì tại đó động năng chuyển động nhiệt của các phân tử bằng không.',
      'Vì không có nhiệt kế nào đo được.',
      'Vì áp suất khí quyển sẽ bằng 0.'
    ],
    answerKey: 'Vì tại đó động năng chuyển động nhiệt của các phân tử bằng không.',
    explanationText: 'Nhiệt độ tỉ lệ với động năng trung bình phân tử. Động năng (E = 1/2mv^2) không thể âm, nên nhiệt độ thấp nhất là khi vận tốc v = 0, tương ứng với 0 K.'
  },

  // Cấp độ: VẬN DỤNG
  {
    id: 'c1.3-5',
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.3',
    level: 'Vận dụng',
    type: 'MCQ',
    promptText: 'Nhiệt độ cơ thể người bình thường là 37°C. Giá trị này trong thang nhiệt độ Kelvin là bao nhiêu?',
    imageUrl: '',
    options: ['37 K', '300 K', '310 K', '236 K'],
    answerKey: '310 K',
    explanationText: 'Áp dụng công thức T = t + 273 = 37 + 273 = 310 K.'
  },
  {
    id: 'c1.3-6',
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.3',
    level: 'Vận dụng',
    type: 'MCQ',
    promptText: 'Một vật đang ở nhiệt độ 300 K. Nếu làm lạnh vật để nhiệt độ giảm đi 20°C thì nhiệt độ sau cùng của vật theo thang Kelvin là bao nhiêu?',
    imageUrl: '',
    options: ['280 K', '293 K', '320 K', '553 K'],
    answerKey: '280 K',
    explanationText: 'Độ biến thiên nhiệt độ trong thang Celsius bằng độ biến thiên trong thang Kelvin (Δt = ΔT). Giảm 20°C nghĩa là giảm 20 K. Vậy T2 = 300 - 20 = 280 K.'
  },
  // --- CÂU HỎI BÀI 1.4: NHIỆT DUNG RIÊNG ---

  // Cấp độ: BIẾT
  {
    id: 'c1.4-1',
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.4',
    level: 'Biết',
    type: 'MCQ',
    promptText: 'Đơn vị đo của nhiệt dung riêng trong hệ SI là:',
    imageUrl: '',
    options: ['J/kg', 'J/kg.K', 'J.kg/K', 'K/kg.J'],
    answerKey: 'J/kg.K',
    explanationText: 'Từ công thức c = Q/(m.ΔT), đơn vị của nhiệt dung riêng là J/(kg.K).'
  },
  {
    id: 'c1.4-2',
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.4',
    level: 'Biết',
    type: 'MCQ',
    promptText: 'Hệ thức tính nhiệt lượng cần cung cấp để một vật nóng lên là:',
    imageUrl: '',
    options: ['Q = mcΔT', 'Q = m/cΔT', 'Q = c/mΔT', 'Q = mc/ΔT'],
    answerKey: 'Q = mcΔT',
    explanationText: 'Công thức cơ bản: Q = mcΔT (hoặc mcΔt).'
  },

  // Cấp độ: HIỂU
  {
    id: 'c1.4-3',
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.4',
    level: 'Hiểu',
    type: 'MCQ',
    promptText: 'Nhiệt dung riêng của nước là 4200 J/kg.K. Con số này cho biết:',
    imageUrl: '',
    options: [
      'Cần cung cấp 4200 J để làm sôi 1 kg nước.',
      'Cần cung cấp 4200 J để 1 kg nước tăng thêm 1 K.',
      '1 kg nước khi bay hơi tỏa ra 4200 J.',
      'Cần cung cấp 4200 J để 1 kg nước hóa hơi hoàn toàn.'
    ],
    answerKey: 'Cần cung cấp 4200 J để 1 kg nước tăng thêm 1 K.',
    explanationText: 'Đây là định nghĩa của nhiệt dung riêng.'
  },
  {
    id: 'c1.4-4',
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.4',
    level: 'Hiểu',
    type: 'MCQ',
    promptText: 'Tại sao về mùa hè, ban ngày thường có gió thổi từ biển vào đất liền (gió biển)?',
    imageUrl: '',
    options: [
      'Vì nước biển có nhiệt dung riêng lớn hơn đất, nên ban ngày nước biển mát hơn đất, áp suất cao hơn.',
      'Vì nước biển có nhiệt dung riêng nhỏ hơn đất, nên ban ngày nước biển nóng hơn đất.',
      'Vì gió luôn thổi từ nơi thấp lên nơi cao.',
      'Vì sóng biển đẩy gió vào bờ.'
    ],
    answerKey: 'Vì nước biển có nhiệt dung riêng lớn hơn đất, nên ban ngày nước biển mát hơn đất, áp suất cao hơn.',
    explanationText: 'Do c(nước) > c(đất) nên ban ngày đất nóng nhanh hơn, khí trên đất bốc lên tạo áp thấp, khí lạnh từ biển (áp cao) tràn vào.'
  },

  // Cấp độ: VẬN DỤNG
  {
    id: 'c1.4-5',
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.4',
    level: 'Vận dụng',
    type: 'MCQ',
    promptText: 'Cần cung cấp nhiệt lượng bao nhiêu để đun nóng 5 lít nước (5 kg) từ 20°C lên 100°C? Biết c(nước) = 4200 J/kg.K.',
    imageUrl: '',
    options: ['1680 kJ', '336 kJ', '16800 J', '840 kJ'],
    answerKey: '1680 kJ',
    explanationText: 'Q = mcΔt = 5 * 4200 * (100 - 20) = 1,680,000 J = 1680 kJ.'
  },
  {
    id: 'c1.4-6',
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.4',
    level: 'Vận dụng',
    type: 'MCQ',
    promptText: 'Một ấm nhôm 500g chứa 1,5 lít nước ở 25°C. Nhiệt lượng tối thiểu để đun sôi nước là bao nhiêu? (c_nhôm = 880 J/kg.K, c_nước = 4200 J/kg.K)',
    imageUrl: '',
    options: ['505,5 kJ', '472,5 kJ', '33,0 kJ', '439,5 kJ'],
    answerKey: '505,5 kJ',
    explanationText: 'm1=0.5kg, m2=1.5kg, Δt=75. Q = (0.5*880 + 1.5*4200)*75 = (440 + 6300)*75 = 505,500 J = 505,5 kJ.'
  },
  // --- CÂU HỎI CHUYÊN ĐỀ 2: KHÍ LÍ TƯỞNG (I2.1 - I2.4) ---

  // Cấp độ: BIẾT
  {
    id: 'c2.1-1',
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.1', // Mô hình động học
    level: 'Biết',
    type: 'MCQ',
    promptText: 'Trong mô hình khí lí tưởng, các phân tử khí được coi là:',
    imageUrl: '',
    options: [
      'Các chất điểm, tương tác hút và đẩy nhau mạnh.',
      'Các chất điểm, chỉ tương tác khi va chạm.',
      'Các quả cầu rắn, xếp khít nhau.',
      'Các hạt có kích thước lớn, va chạm mềm với thành bình.'
    ],
    answerKey: 'Các chất điểm, chỉ tương tác khi va chạm.',
    explanationText: 'Khí lí tưởng bỏ qua kích thước phân tử (coi là chất điểm) và bỏ qua lực tương tác giữa các phân tử (trừ lúc va chạm).'
  },
  {
    id: 'c2.4-1',
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.4', // Động năng phân tử
    level: 'Biết',
    type: 'MCQ',
    promptText: 'Động năng trung bình của phân tử khí lí tưởng phụ thuộc vào đại lượng nào?',
    imageUrl: '',
    options: ['Thể tích', 'Áp suất', 'Nhiệt độ tuyệt đối', 'Khối lượng riêng'],
    answerKey: 'Nhiệt độ tuyệt đối',
    explanationText: 'Theo công thức Ed = 3/2 kT, động năng trung bình chỉ phụ thuộc vào nhiệt độ tuyệt đối T.'
  },

  // Cấp độ: HIỂU
  {
    id: 'c2.3-1',
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.3', // Áp suất khí
    level: 'Hiểu',
    type: 'MCQ',
    promptText: 'Khi nhiệt độ khí trong bình tăng lên (thể tích không đổi), áp suất khí tăng lên là do:',
    imageUrl: '',
    options: [
      'Số lượng phân tử khí tăng lên.',
      'Kích thước các phân tử khí nở ra.',
      'Các phân tử va chạm vào thành bình mạnh hơn và tần số va chạm lớn hơn.',
      'Các phân tử khí liên kết chặt chẽ hơn.'
    ],
    answerKey: 'Các phân tử va chạm vào thành bình mạnh hơn và tần số va chạm lớn hơn.',
    explanationText: 'Nhiệt độ tăng làm vận tốc trung bình tăng => động lượng trao đổi mỗi lần va chạm tăng (va chạm mạnh hơn) và số lần va chạm trong 1s tăng.'
  },
  {
    id: 'c2.2-1',
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.2', // Định luật chất khí (Boyle/Charles/PTTT)
    level: 'Hiểu',
    type: 'MCQ',
    promptText: 'Đường nào sau đây biểu diễn quá trình đẳng nhiệt (Định luật Boyle) trong hệ tọa độ (p, V)?',
    imageUrl: '', // Có thể bổ sung link ảnh nếu cần
    options: [
      'Đường thẳng đi qua gốc tọa độ.',
      'Đường thẳng song song với trục hoành.',
      'Đường Hypebol.',
      'Đường Parabol.'
    ],
    answerKey: 'Đường Hypebol.',
    explanationText: 'Trong quá trình đẳng nhiệt, p tỉ lệ nghịch với V (p ~ 1/V), đồ thị là đường cong Hypebol.'
  },

  // Cấp độ: VẬN DỤNG
  {
    id: 'c2.2-2',
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.2', // Định luật chất khí
    level: 'Vận dụng',
    type: 'MCQ',
    promptText: 'Một lượng khí có thể tích 10 lít ở áp suất 1 atm. Nếu nén đẳng nhiệt để thể tích giảm còn 2 lít thì áp suất mới của khí là bao nhiêu?',
    imageUrl: '',
    options: ['0,2 atm', '2 atm', '5 atm', '8 atm'],
    answerKey: '5 atm',
    explanationText: 'Áp dụng định luật Boyle: p1.V1 = p2.V2 => 1.10 = p2.2 => p2 = 5 atm.'
  },
  {
    id: 'c2.4-2',
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.4', // Động năng phân tử
    level: 'Vận dụng',
    type: 'MCQ',
    promptText: 'Ở nhiệt độ 300K, động năng tịnh tiến trung bình của phân tử khí là E. Khi nhiệt độ tăng lên đến 600K thì động năng này bằng:',
    imageUrl: '',
    options: ['E', '2E', '4E', 'E/2'],
    answerKey: '2E',
    explanationText: 'Động năng trung bình tỉ lệ thuận với nhiệt độ tuyệt đối (E ~ T). Nhiệt độ tăng gấp đôi (300K lên 600K) thì động năng tăng gấp đôi.'
  },
// --- CÂU HỎI CHUYÊN ĐỀ 3: TỪ TRƯỜNG (I3.1 - I3.3) ---

  // Cấp độ: BIẾT
  {
    id: 'c3.1-1',
    topic: 'TỪ TRƯỜNG',
    lessonId: 'l3.1', // Khái niệm từ trường
    level: 'Biết',
    type: 'MCQ',
    promptText: 'Đại lượng vật lí đặc trưng cho tác dụng mạnh hay yếu của từ trường tại một điểm là:',
    imageUrl: '',
    options: ['Từ thông', 'Cảm ứng từ', 'Lực từ', 'Đường sức từ'],
    answerKey: 'Cảm ứng từ',
    explanationText: 'Cảm ứng từ (B) là đại lượng đặc trưng cho từ trường về phương diện tác dụng lực.'
  },
  {
    id: 'c3.3-1',
    topic: 'TỪ TRƯỜNG',
    lessonId: 'l3.3', // Từ thông - Cảm ứng điện từ
    level: 'Biết',
    type: 'MCQ',
    promptText: 'Đơn vị của từ thông trong hệ SI là:',
    imageUrl: '',
    options: ['Tesla (T)', 'Henry (H)', 'Weber (Wb)', 'Vôn (V)'],
    answerKey: 'Weber (Wb)',
    explanationText: 'Đơn vị của từ thông là Weber, kí hiệu là Wb.'
  },

  // Cấp độ: HIỂU
  {
    id: 'c3.2-1',
    topic: 'TỪ TRƯỜNG',
    lessonId: 'l3.2', // Lực từ
    level: 'Hiểu',
    type: 'MCQ',
    promptText: 'Lực từ tác dụng lên một đoạn dây dẫn mang dòng điện đặt trong từ trường đều sẽ có độ lớn cực đại khi:',
    imageUrl: '',
    options: [
      'Đoạn dây dẫn đặt song song với các đường sức từ.',
      'Đoạn dây dẫn đặt vuông góc với các đường sức từ.',
      'Đoạn dây dẫn hợp với các đường sức từ một góc 45 độ.',
      'Đoạn dây dẫn hợp với các đường sức từ một góc 30 độ.'
    ],
    answerKey: 'Đoạn dây dẫn đặt vuông góc với các đường sức từ.',
    explanationText: 'Theo công thức F = BILsinα, lực F lớn nhất khi sinα = 1, tức là α = 90 độ (dây vuông góc với B).'
  },
  {
    id: 'c3.3-2',
    topic: 'TỪ TRƯỜNG',
    lessonId: 'l3.3', // Cảm ứng điện từ
    level: 'Hiểu',
    type: 'MCQ',
    promptText: 'Theo định luật Len-xơ, dòng điện cảm ứng xuất hiện trong mạch kín có chiều sao cho từ trường cảm ứng:',
    imageUrl: '',
    options: [
      'Luôn cùng chiều với từ trường ban đầu.',
      'Luôn ngược chiều với từ trường ban đầu.',
      'Có tác dụng chống lại sự biến thiên của từ thông ban đầu.',
      'Có tác dụng tăng cường sự biến thiên của từ thông ban đầu.'
    ],
    answerKey: 'Có tác dụng chống lại sự biến thiên của từ thông ban đầu.',
    explanationText: 'Đây là nội dung định luật Len-xơ: Dòng điện cảm ứng có chiều chống lại nguyên nhân sinh ra nó.'
  },

  // Cấp độ: VẬN DỤNG
  {
    id: 'c3.2-2',
    topic: 'TỪ TRƯỜNG',
    lessonId: 'l3.2', // Lực từ
    level: 'Vận dụng',
    type: 'MCQ',
    promptText: 'Một đoạn dây dẫn dài 5 cm đặt trong từ trường đều và vuông góc với vectơ cảm ứng từ. Dòng điện chạy qua dây có cường độ 0,75 A. Lực từ tác dụng lên đoạn dây đó là 0,03 N. Độ lớn cảm ứng từ của từ trường là:',
    imageUrl: '',
    options: ['0,8 T', '0,4 T', '1,2 T', '0,08 T'],
    answerKey: '0,8 T',
    explanationText: 'Áp dụng công thức: B = F / (I.L.sinα) = 0,03 / (0,75 * 0,05 * sin90) = 0,8 T.'
  },
  {
    id: 'c3.3-3',
    topic: 'TỪ TRƯỜNG',
    lessonId: 'l3.3', // Từ thông
    level: 'Vận dụng',
    type: 'MCQ',
    promptText: 'Một khung dây phẳng diện tích 20 cm² đặt trong từ trường đều có cảm ứng từ B = 4.10⁻⁴ T. Vectơ cảm ứng từ hợp với mặt phẳng khung một góc 30°. Tính từ thông qua khung dây.',
    imageUrl: '',
    options: ['4.10⁻⁷ Wb', '2.10⁻⁷ Wb', '6,9.10⁻⁷ Wb', '8.10⁻⁷ Wb'],
    answerKey: '4.10⁻⁷ Wb',
    explanationText: 'Góc α là góc giữa pháp tuyến n và B. Vì B hợp với mặt phẳng khung 30° nên α = 90° - 30° = 60°. Φ = B.S.cosα = 4.10⁻⁴ * 20.10⁻⁴ * cos(60°) = 4.10⁻⁷ Wb.'
  },
/* ============================================================
   CHƯƠNG 3 – TỪ TRƯỜNG (10 CÂU)
============================================================ */
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

  // --- CÂU HỎI CHUYÊN ĐỀ 4: HẠT NHÂN & PHÓNG XẠ (I4.1 - I4.3) ---

  // Cấp độ: BIẾT
  {
    id: 'c4.1-1',
    topic: 'HẠT NHÂN & PHÓNG XẠ',
    lessonId: 'l4.1', // Cấu trúc hạt nhân
    level: 'Biết',
    type: 'MCQ',
    promptText: 'Hạt nhân nguyên tử được cấu tạo từ các hạt nào sau đây?',
    imageUrl: '',
    options: ['Proton và Electron', 'Proton và Nơtron', 'Nơtron và Electron', 'Electron và Positron'],
    answerKey: 'Proton và Nơtron',
    explanationText: 'Hạt nhân được cấu tạo từ hai loại hạt là proton (mang điện dương) và nơtron (không mang điện), gọi chung là nuclôn.'
  },
  {
    id: 'c4.3-1',
    topic: 'HẠT NHÂN & PHÓNG XẠ',
    lessonId: 'l4.3', // Phóng xạ
    level: 'Biết',
    type: 'MCQ',
    promptText: 'Tia phóng xạ $\\alpha$ (alpha) thực chất là dòng các hạt nhân:',
    imageUrl: '',
    options: ['Hiđrô ($^1_1H$)', 'Hêli ($^4_2He$)', 'Electron ($^0_{-1}e$)', 'Positron ($^0_{+1}e$)'],
    answerKey: 'Hêli ($^4_2He$)',
    explanationText: 'Tia alpha là dòng các hạt nhân Hêli ($^4_2He$) phóng ra từ hạt nhân mẹ với tốc độ khoảng $2.10^7 m/s$.'
  },

  // Cấp độ: HIỂU
  {
    id: 'c4.2-1',
    topic: 'HẠT NHÂN & PHÓNG XẠ',
    lessonId: 'l4.2', // Năng lượng liên kết
    level: 'Hiểu',
    type: 'MCQ',
    promptText: 'Đại lượng nào sau đây đặc trưng cho mức độ bền vững của một hạt nhân?',
    imageUrl: '',
    options: ['Năng lượng liên kết', 'Năng lượng liên kết riêng', 'Độ hụt khối', 'Số khối A'],
    answerKey: 'Năng lượng liên kết riêng',
    explanationText: 'Năng lượng liên kết riêng (năng lượng liên kết tính trên một nuclôn) càng lớn thì hạt nhân càng bền vững.'
  },
  {
    id: 'c4.3-2',
    topic: 'HẠT NHÂN & PHÓNG XẠ',
    lessonId: 'l4.3', // Phóng xạ
    level: 'Hiểu',
    type: 'MCQ',
    promptText: 'Chọn phát biểu đúng về định luật phóng xạ:',
    imageUrl: '',
    options: [
      'Sau một chu kì bán rã, một nửa số hạt nhân ban đầu sẽ biến mất hoàn toàn khỏi vũ trụ.',
      'Sau một chu kì bán rã, khối lượng chất phóng xạ giảm đi một nửa so với ban đầu.',
      'Tốc độ phóng xạ phụ thuộc mạnh vào nhiệt độ và áp suất môi trường.',
      'Phóng xạ là quá trình xảy ra có tính tuần hoàn.'
    ],
    answerKey: 'Sau một chu kì bán rã, khối lượng chất phóng xạ giảm đi một nửa so với ban đầu.',
    explanationText: 'Chu kì bán rã là thời gian để một nửa số hạt nhân (hoặc khối lượng) chất phóng xạ bị phân rã thành chất khác. Quá trình này ngẫu nhiên và không phụ thuộc môi trường.'
  },

  // Cấp độ: VẬN DỤNG
  {
    id: 'c4.2-2',
    topic: 'HẠT NHÂN & PHÓNG XẠ',
    lessonId: 'l4.2', // Độ hụt khối
    level: 'Vận dụng',
    type: 'MCQ',
    promptText: 'Cho khối lượng của hạt nhân Hêli ($^4_2He$) là 4,0015u; khối lượng proton $m_p=1,0073u$; khối lượng nơtron $m_n=1,0087u$. Độ hụt khối của hạt nhân Hêli là:',
    imageUrl: '',
    options: ['0,0305 u', '0,0402 u', '0,0015 u', '0,0050 u'],
    answerKey: '0,0305 u',
    explanationText: 'Độ hụt khối $\\Delta m = Z.m_p + (A-Z).m_n - m_X = 2(1,0073) + 2(1,0087) - 4,0015 = 0,0305 u$.'
  },
  {
    id: 'c4.3-3',
    topic: 'HẠT NHÂN & PHÓNG XẠ',
    lessonId: 'l4.3', // Định luật phóng xạ
    level: 'Vận dụng',
    type: 'MCQ',
    promptText: 'Chất phóng xạ I-ốt $^{131}I$ có chu kì bán rã là 8 ngày. Ban đầu có 100g chất này. Sau 24 ngày, khối lượng I-ốt còn lại là bao nhiêu?',
    imageUrl: '',
    options: ['12,5 g', '25 g', '50 g', '6,25 g'],
    answerKey: '12,5 g',
    explanationText: 'Thời gian $t=24$ ngày = 3 chu kì ($3T$). Khối lượng còn lại: $m = m_0 / 2^3 = 100 / 8 = 12,5 g$.'
  },
  // --- PHẦN CÂU HỎI TRẢ LỜI NGẮN
  // --- CÂU HỎI TRẢ LỜI NGẮN (SHORT ANSWER) I1 - I4 ---

  // =================================================================
  // PHẦN CÂU HỎI TRẢ LỜI NGẮN (SHORT ANSWER) - TỪ I1.1 ĐẾN I4.3
  // Mỗi chủ đề 4 câu (2 Hiểu + 2 Vận dụng)
  // =================================================================

  // --- I1.1: CẤU TRÚC CỦA CHẤT & SỰ CHUYỂN THỂ ---
  {
    id: 's1.1-1', topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Hiểu', type: 'Short',
    promptText: 'Ở áp suất tiêu chuẩn (1 atm), nước sôi ở nhiệt độ bao nhiêu độ C?',
    imageUrl: '',
    answerKey: '100', explanationText: 'Nhiệt độ sôi của nước ở áp suất tiêu chuẩn là 100°C.'
  },
  
  {
    id: 's1.1-3', topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Vận dụng', type: 'Short',
    promptText: 'Biết nhiệt nóng chảy riêng của nước đá là 3,34.10^5 J/kg. Cần cung cấp nhiệt lượng bao nhiêu kJ để làm tan chảy hoàn toàn 2 kg nước đá ở 0°C? (Nhập số)',
    imageUrl: '',
    answerKey: '668', explanationText: 'Q = m.λ = 2 * 3,34.10^5 = 6,68.10^5 J = 668 kJ.'
  },
  {
    id: 's1.1-4', topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.1', level: 'Vận dụng', type: 'Short',
    promptText: 'Nhiệt hóa hơi riêng của nước là 2,26.10^6 J/kg. Để hóa hơi hoàn toàn 0,5 kg nước ở 100°C cần nhiệt lượng bao nhiêu MJ? (Nhập số)',
    imageUrl: '',
    answerKey: '1.13', explanationText: 'Q = m.L = 0,5 * 2,26.10^6 = 1,13.10^6 J = 1,13 MJ.'
  },

  // --- I1.2: NỘI NĂNG & ĐỊNH LUẬT I ---
  {
    id: 's1.2-1', topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.2', level: 'Hiểu', type: 'Short',
    promptText: 'Trong quá trình đẳng tích (thể tích không đổi), chất khí không thực hiện công. Vậy độ biến thiên nội năng ΔU bằng đại lượng nào?',
    imageUrl: '',
    answerKey: 'Q', explanationText: 'Theo định luật I: ΔU = A + Q. Vì V không đổi nên A = 0, suy ra ΔU = Q.'
  },
  
  {
    id: 's1.2-3', topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.2', level: 'Vận dụng', type: 'Short',
    promptText: 'Người ta thực hiện công 150 J để nén khí, đồng thời khí truyền nhiệt lượng 100 J ra môi trường. Độ biến thiên nội năng của khí là bao nhiêu J?',
    imageUrl: '',
    answerKey: '50', explanationText: 'A = +150 (nhận công), Q = -100 (tỏa nhiệt). ΔU = 150 - 100 = 50 J.'
  },
  {
    id: 's1.2-4', topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.2', level: 'Vận dụng', type: 'Short',
    promptText: 'Cung cấp nhiệt lượng 200 J cho khí trong xilanh. Khí giãn nở thực hiện công 120 J đẩy pit-tông. Nội năng của khí tăng thêm bao nhiêu J?',
    imageUrl: '',
    answerKey: '80', explanationText: 'Q = +200, A = -120 (thực hiện công). ΔU = 200 - 120 = 80 J.'
  },

  // --- I1.3: NHIỆT ĐỘ & THANG NHIỆT ĐỘ ---
  {
    id: 's1.3-1', topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.3', level: 'Hiểu', type: 'Short',
    promptText: 'Độ không tuyệt đối (0 K) tương ứng với bao nhiêu độ C?',
    imageUrl: '',
    answerKey: '-273', explanationText: '0 K = 0 - 273 = -273°C.'
  },
  {
    id: 's1.3-2', topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.3', level: 'Hiểu', type: 'Short',
    promptText: 'Trong thang nhiệt độ Kelvin, nhiệt độ nước đá đang tan (ở áp suất tiêu chuẩn) là bao nhiêu K?',
    imageUrl: '',
    answerKey: '273', explanationText: '0°C tương ứng với 273 K.'
  },
  {
    id: 's1.3-3', topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.3', level: 'Vận dụng', type: 'Short',
    promptText: 'Nhiệt độ ngoài trời đang là 30°C. Giá trị này ứng với bao nhiêu K?',
    imageUrl: '',
    answerKey: '303', explanationText: 'T = 30 + 273 = 303 K.'
  },
  {
    id: 's1.3-4', topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.3', level: 'Vận dụng', type: 'Short',
    promptText: 'Một vật nóng lên thêm 50°C. Hỏi nhiệt độ của vật tăng thêm bao nhiêu Kelvin?',
    imageUrl: '',
    answerKey: '50', explanationText: 'Độ biến thiên nhiệt độ trong thang Celsius bằng độ biến thiên trong thang Kelvin (Δt = ΔT).'
  },

  // --- I1.4: NHIỆT DUNG RIÊNG ---
  {
    id: 's1.4-1', topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.4', level: 'Hiểu', type: 'Short',
    promptText: 'Nhiệt dung riêng của nước là 4200 J/kg.K. Để 1 kg nước tăng thêm 1 K cần cung cấp nhiệt lượng bao nhiêu J?',
    imageUrl: '',
    answerKey: '4200', explanationText: 'Theo định nghĩa nhiệt dung riêng.'
  },
  
  {
    id: 's1.4-3', topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.4', level: 'Vận dụng', type: 'Short',
    promptText: 'Đun nóng 5 kg nhôm từ 20°C lên 100°C. Biết nhiệt dung riêng của nhôm là 880 J/kg.K. Nhiệt lượng cần cung cấp là bao nhiêu kJ? (Nhập số)',
    imageUrl: '',
    answerKey: '352', explanationText: 'Q = 5 * 880 * (100 - 20) = 352,000 J = 352 kJ.'
  },
  {
    id: 's1.4-4', topic: 'VẬT LÍ NHIỆT', lessonId: 'l1.4', level: 'Vận dụng', type: 'Short',
    promptText: 'Cung cấp 8400 J nhiệt lượng cho 2 kg một chất lỏng thì nhiệt độ tăng thêm 2°C. Nhiệt dung riêng của chất lỏng này là bao nhiêu J/kg.K?',
    imageUrl: '',
    answerKey: '2100', explanationText: 'c = Q / (m.Δt) = 8400 / (2 * 2) = 2100 J/kg.K.'
  },

  // --- I2.1: MÔ HÌNH ĐỘNG HỌC PHÂN TỬ ---
  
  
  {
    id: 's2.1-3', topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.1', level: 'Vận dụng', type: 'Short',
    promptText: 'Một mol khí ở điều kiện tiêu chuẩn (0°C, 1 atm) có thể tích xấp xỉ bao nhiêu lít? (Lấy số nguyên gần nhất)',
    imageUrl: '',
    answerKey: '22', explanationText: 'Chính xác là 22,4 lít. Nhập 22 hoặc 22.4 đều chấp nhận (trong trường hợp này đáp án chuẩn là 22.4).'
  },
  {
    id: 's2.1-4', topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.1', level: 'Vận dụng', type: 'Short',
    promptText: 'Số Avogadro có giá trị xấp xỉ là 6,02 nhân với 10 mũ bao nhiêu?',
    imageUrl: '',
    answerKey: '23', explanationText: 'NA = 6,02 x 10^23 hạt/mol.'
  },

  // --- I2.2: ĐỊNH LUẬT CHẤT KHÍ (BOYLE, CHARLES...) ---
  
  
  {
    id: 's2.2-3', topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Vận dụng', type: 'Short',
    promptText: 'Nén đẳng nhiệt một khối khí từ 6 lít xuống 4 lít. Áp suất ban đầu là 2 atm. Áp suất lúc sau là bao nhiêu atm?',
    imageUrl: '',
    answerKey: '3', explanationText: 'p1.V1 = p2.V2 => 2 * 6 = p2 * 4 => p2 = 3 atm.'
  },
  {
    id: 's2.2-4', topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.2', level: 'Vận dụng', type: 'Short',
    promptText: 'Một lượng khí ở 27°C có thể tích 3 lít. Nung nóng đẳng áp đến 127°C thì thể tích khí là bao nhiêu lít?',
    imageUrl: '',
    answerKey: '4', explanationText: 'V1/T1 = V2/T2 => 3/(27+273) = V2/(127+273) => 3/300 = V2/400 => V2 = 4 lít.'
  },

  // --- I2.3: ÁP SUẤT KHÍ ---
  
  {
    id: 's2.3-2', topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.3', level: 'Hiểu', type: 'Short',
    promptText: 'Nếu mật độ phân tử khí tăng gấp đôi (giữ nguyên nhiệt độ), áp suất khí sẽ tăng gấp mấy lần?',
    imageUrl: '',
    answerKey: '2', explanationText: 'p tỉ lệ thuận với mật độ phân tử n (p = 2/3 n.Ed).'
  },
  {
    id: 's2.3-3', topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.3', level: 'Vận dụng', type: 'Short',
    promptText: 'Một căn phòng có mật độ phân tử khí là 2,5.10^25 hạt/m^3. Động năng trung bình của phân tử là 6.10^-21 J. Áp suất không khí trong phòng là bao nhiêu Pa?',
    imageUrl: '',
    answerKey: '100000', explanationText: 'p = 2/3 * n * Ed = 2/3 * 2.5e25 * 6e-21 = 100,000 Pa.'
  },
  {
    id: 's2.3-4', topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.3', level: 'Vận dụng', type: 'Short',
    promptText: '1 Pa (Pascal) tương đương với bao nhiêu N/m^2?',
    imageUrl: '',
    answerKey: '1', explanationText: '1 Pa = 1 N/m^2.'
  },

  // --- I2.4: ĐỘNG NĂNG PHÂN TỬ ---
  
  
  {
    id: 's2.4-3', topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.4', level: 'Vận dụng', type: 'Short',
    promptText: 'Khi nhiệt độ tuyệt đối của khí tăng gấp 4 lần thì tốc độ căn quân phương (v_rms) của phân tử tăng gấp mấy lần?',
    imageUrl: '',
    answerKey: '2', explanationText: 'v ~ căn(T). T tăng 4 thì v tăng căn(4) = 2 lần.'
  },
  {
    id: 's2.4-4', topic: 'KHÍ LÍ TƯỞNG', lessonId: 'l2.4', level: 'Vận dụng', type: 'Short',
    promptText: 'Hằng số Boltzmann có giá trị k = 1,38.10^-23 J/K. Động năng trung bình của phân tử khí ở 300 K xấp xỉ bằng 6,21 nhân 10 mũ trừ bao nhiêu Joule?',
    imageUrl: '',
    answerKey: '21', explanationText: 'Ed = 1.5 * 1.38e-23 * 300 = 6.21e-21 J. Đáp án là 21.'
  },

  // --- I3.1: KHÁI NIỆM TỪ TRƯỜNG ---
  
  {
    id: 's3.1-3', topic: 'TỪ TRƯỜNG', lessonId: 'l3.1', level: 'Vận dụng', type: 'Short',
    promptText: 'Một nam châm thẳng có bao nhiêu cực từ?',
    imageUrl: '',
    answerKey: '2', explanationText: 'Mọi nam châm đều có 2 cực: Bắc (N) và Nam (S).'
  },
  

  // --- I3.2: LỰC TỪ ---
  
  {
    id: 's3.2-2', topic: 'TỪ TRƯỜNG', lessonId: 'l3.2', level: 'Hiểu', type: 'Short',
    promptText: 'Nếu dây dẫn đặt song song với đường sức từ thì lực từ tác dụng lên dây bằng bao nhiêu?',
    imageUrl: '',
    answerKey: '0', explanationText: 'Khi song song, góc alpha = 0, sin(0) = 0 => F = 0.'
  },
  {
    id: 's3.2-3', topic: 'TỪ TRƯỜNG', lessonId: 'l3.2', level: 'Vận dụng', type: 'Short',
    promptText: 'Dây dẫn dài 0,2m mang dòng điện 5A đặt vuông góc trong từ trường 0,1T. Lực từ tác dụng là bao nhiêu Newton?',
    imageUrl: '',
    answerKey: '0.1', explanationText: 'F = BIL = 0.1 * 5 * 0.2 = 0.1 N.'
  },
  {
    id: 's3.2-4', topic: 'TỪ TRƯỜNG', lessonId: 'l3.2', level: 'Vận dụng', type: 'Short',
    promptText: 'Một đoạn dây chịu tác dụng lực từ cực đại là 0,5N. Nếu giảm cường độ dòng điện đi 2 lần thì lực từ sẽ là bao nhiêu Newton?',
    imageUrl: '',
    answerKey: '0.25', explanationText: 'F tỉ lệ thuận với I. I giảm 2 thì F giảm 2 => 0.25 N.'
  },

  // --- I3.3: TỪ THÔNG & CẢM ỨNG ĐIỆN TỪ ---
  
  
  {
    id: 's3.3-3', topic: 'TỪ TRƯỜNG', lessonId: 'l3.3', level: 'Vận dụng', type: 'Short',
    promptText: 'Một khung dây có từ thông biến thiên đều từ 2 Wb xuống 0 trong thời gian 0,5 giây. Độ lớn suất điện động cảm ứng là bao nhiêu Vôn?',
    imageUrl: '',
    answerKey: '4', explanationText: '|e| = |dPhi/dt| = |(0-2)/0.5| = 4 V.'
  },
  {
    id: 's3.3-4', topic: 'TỪ TRƯỜNG', lessonId: 'l3.3', level: 'Vận dụng', type: 'Short',
    promptText: 'Diện tích khung dây là 2 m^2 đặt vuông góc với từ trường B = 5 T. Từ thông qua khung dây là bao nhiêu Wb?',
    imageUrl: '',
    answerKey: '10', explanationText: 'Phi = B.S = 5 * 2 = 10 Wb (do đặt vuông góc nên cos0 = 1).'
  },

  // --- I4.1: CẤU TRÚC HẠT NHÂN ---
  
  {
    id: 's4.1-3', topic: 'HẠT NHÂN & PHÓNG XẠ', lessonId: 'l4.1', level: 'Vận dụng', type: 'Short',
    promptText: 'Hạt nhân Urani U-238 (Z=92) có bao nhiêu nơtron?',
    imageUrl: '',
    answerKey: '146', explanationText: 'N = A - Z = 238 - 92 = 146.'
  },
  {
    id: 's4.1-4', topic: 'HẠT NHÂN & PHÓNG XẠ', lessonId: 'l4.1', level: 'Vận dụng', type: 'Short',
    promptText: 'Hạt nhân nguyên tử Liti có 3 proton và 4 nơtron. Số khối của hạt nhân này là bao nhiêu?',
    imageUrl: '',
    answerKey: '7', explanationText: 'A = 3 + 4 = 7.'
  },

  // --- I4.2: NĂNG LƯỢNG LIÊN KẾT ---
  
  {
    id: 's4.2-2', topic: 'HẠT NHÂN & PHÓNG XẠ', lessonId: 'l4.2', level: 'Hiểu', type: 'Short',
    promptText: 'Hạt nhân bền vững nhất thường có số khối trong khoảng từ 50 đến bao nhiêu?',
    imageUrl: '',
    answerKey: '95', explanationText: 'Khoảng bền vững nhất là 50 < A < 95 (hoặc xấp xỉ 80-90).'
  },
  {
    id: 's4.2-3', topic: 'HẠT NHÂN & PHÓNG XẠ', lessonId: 'l4.2', level: 'Vận dụng', type: 'Short',
    promptText: 'Biết 1u = 931,5 MeV/c^2. Nếu độ hụt khối là 0,2u thì năng lượng liên kết là bao nhiêu MeV? (Nhập số)',
    imageUrl: '',
    answerKey: '186.3', explanationText: 'W = 0,2 * 931,5 = 186,3 MeV.'
  },
  

  // --- I4.3: PHÓNG XẠ ---
  
  {
    id: 's4.3-2', topic: 'HẠT NHÂN & PHÓNG XẠ', lessonId: 'l4.3', level: 'Hiểu', type: 'Short',
    promptText: 'Khoảng thời gian để số lượng hạt nhân phóng xạ giảm đi một nửa gọi là gì?',
    imageUrl: '',
    answerKey: 'Chu kì bán rã', explanationText: 'Định nghĩa chu kì bán rã T.'
  },
  {
    id: 's4.3-3', topic: 'HẠT NHÂN & PHÓNG XẠ', lessonId: 'l4.3', level: 'Vận dụng', type: 'Short',
    promptText: 'Một chất phóng xạ có chu kì bán rã là 2 giờ. Sau 6 giờ, số hạt nhân còn lại bằng bao nhiêu phần số hạt nhân ban đầu? (Nhập phân số dạng 1/x)',
    imageUrl: '',
    answerKey: '1/8', explanationText: 't = 6h = 3T. Còn lại 1/2^3 = 1/8.'
  },
  {
    id: 's4.3-4', topic: 'HẠT NHÂN & PHÓNG XẠ', lessonId: 'l4.3', level: 'Vận dụng', type: 'Short',
    promptText: 'Ban đầu có 100g chất phóng xạ. Sau 2 chu kì bán rã, khối lượng chất phóng xạ bị phân rã là bao nhiêu gam?',
    imageUrl: '',
    answerKey: '75', explanationText: 'Sau 2T còn lại 1/4 (25g). Vậy bị phân rã 100 - 25 = 75g.'
  },
 // =================================================================
  // =================================================================
  // PHẦN CÂU HỎI ĐÚNG/SAI (TRUE/FALSE) - CẤU TRÚC 4 Ý (2 BIẾT - 1 HIỂU - 1 VẬN DỤNG)
  // =================================================================

  // --- I1.1: CẤU TRÚC CỦA CHẤT & SỰ CHUYỂN THỂ ---
  {
    id: 'tf1.1-1',
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.1',
    level: 'Vận dụng',
    type: 'TrueFalse',
    promptText: 'Cho đồ thị biểu diễn sự thay đổi nhiệt độ theo thời gian của chất rắn kết tinh X (có khối lượng m) được đun nóng bằng nguồn nhiệt ổn định (Hình bên).',
    imageUrl: 'https://i.postimg.cc/rpCgKxb1/DO-THI-1.png',
    subQuestions: [
      {
        id: 'sq1',
        content: 'Ở nhiệt độ 80°C chất rắn này bắt đầu nóng chảy.',
        isCorrect: true,
        explanation: 'Quan sát đồ thị, đoạn nằm ngang đầu tiên ứng với quá trình nóng chảy diễn ra ở nhiệt độ không đổi là 80°C.'
      },
      {
        id: 'sq2',
        content: 'Thời gian nóng chảy của chất rắn là 4 phút.',
        isCorrect: false,
        explanation: 'Quan sát trên trục thời gian, khoảng thời gian diễn ra quá trình nóng chảy (đoạn nằm ngang 80°C) có độ dài khác 4 phút (ví dụ từ phút thứ 2 đến phút thứ 4 là 2 phút).'
      },
      {
        id: 'sq3',
        content: 'Sự đông đặc bắt đầu vào phút thứ 13.',
        isCorrect: true,
        explanation: 'Quá trình làm nguội bắt đầu từ phút thứ 11, nhiệt độ giảm dần. Đến phút thứ 13, nhiệt độ bắt đầu không đổi (đoạn nằm ngang thứ 2), đây là thời điểm bắt đầu đông đặc.'
      },
      {
        id: 'sq4',
        content: 'Thời gian đông đặc kéo dài 10 phút.',
        isCorrect: false,
        explanation: 'Quan sát đoạn nằm ngang ứng với quá trình đông đặc (bắt đầu từ phút 13). Khoảng thời gian này không phải là 10 phút (thường ngắn hơn trên các dạng đồ thị này, ví dụ kết thúc ở phút 18 thì chỉ là 5 phút).'
      }
    ],
    answerKey: '',
    explanationText: 'Phân tích đồ thị chuyển thể: Đoạn nằm ngang biểu diễn quá trình chuyển thể (nóng chảy hoặc đông đặc) tại nhiệt độ xác định.'
  },

  // --- I1.2: NỘI NĂNG & ĐỊNH LUẬT I ---
  {
    id: 'tf1.2-1',
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.2',
    level: 'Vận dụng',
    type: 'TrueFalse',
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

  // --- I1.3: NHIỆT ĐỘ ---
  {
    id: 'tf1.3-1',
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.3',
    level: 'Vận dụng',
    type: 'TrueFalse',
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

  // --- I1.4: NHIỆT DUNG RIÊNG ---
  {
    id: 'tf1.4-1',
    topic: 'VẬT LÍ NHIỆT',
    lessonId: 'l1.4',
    level: 'Vận dụng',
    type: 'TrueFalse',
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

  // --- I2.1: MÔ HÌNH ĐỘNG HỌC PHÂN TỬ ---
  {
    id: 'tf2.1-1',
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.1',
    level: 'Vận dụng',
    type: 'TrueFalse',
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

  // --- I2.2: ĐỊNH LUẬT CHẤT KHÍ (BOYLE) ---
  {
    id: 'tf2.2-1',
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.2',
    level: 'Vận dụng',
    type: 'TrueFalse',
    // 👇 ĐÃ SỬA: Thêm $...$ cho V1, p1, V2
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
        // 👇 ĐÃ SỬA: p1, V1 thành p_1, V_1 và sửa dấu nhân * thành .
        explanation: '$p_1V_1 = p_2V_2 \\Rightarrow 1.6 = p_2.3 \\Rightarrow p_2 = 2$ atm.' 
      }
    ],
    answerKey: '', explanationText: 'Áp dụng định luật Boyle: $p_1V_1 = p_2V_2$.'
  },
  {
    id: 'tf2.2-2',
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.2',
    level: 'Vận dụng',
    type: 'TrueFalse',
    promptText: 'Câu 2: Một khối khí khi đặt ở điều kiện tiêu chuẩn (trạng thái A). Nén khí và giữ nhiệt độ không đổi đến trạng thái B. Đồ thị áp suất theo thể tích được biểu diễn như hình vẽ.',
    imageUrl: 'https://i.postimg.cc/2yy9gGGy/do-thi-2.png',
    subQuestions: [
      {
        id: 'sq1',
        content: 'Số mol của khối khí ở điều kiện tiêu chuẩn là 0,1 mol.',
        isCorrect: true,
        // 👇 ĐÃ SỬA: VA thành V_A
        explanation: 'Ở điều kiện tiêu chuẩn ($0^oC, 1 atm$), 1 mol khí có thể tích 22,4 lít. Dựa vào đồ thị, $V_A = 2,24$ lít nên $n = \\frac{2,24}{22,4} = 0,1$ mol.'
      },
      {
        id: 'sq2',
        content: 'Thể tích khí ở trạng thái B là 1,12 lít.',
        isCorrect: true,
        // 👇 ĐÃ SỬA: pA, VA thành p_A, V_A
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

  // --- I2.3: ÁP SUẤT KHÍ ---
  {
    id: 'tf2.3-1',
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.3',
    level: 'Vận dụng',
    type: 'TrueFalse',
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

  // --- I2.4: ĐỘNG NĂNG PHÂN TỬ ---
  {
    id: 'tf2.4-1',
    topic: 'KHÍ LÍ TƯỞNG',
    lessonId: 'l2.4',
    level: 'Vận dụng',
    type: 'TrueFalse',
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

  // --- I3.1: KHÁI NIỆM TỪ TRƯỜNG ---
  {
    id: 'tf3.1-1',
    topic: 'TỪ TRƯỜNG',
    lessonId: 'l3.1',
    level: 'Vận dụng',
    type: 'TrueFalse',
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

  // --- I3.2: LỰC TỪ ---
  {
    id: 'tf3.2-1',
    topic: 'TỪ TRƯỜNG',
    lessonId: 'l3.2',
    level: 'Vận dụng',
    type: 'TrueFalse',
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

  // --- I3.3: TỪ THÔNG & CẢM ỨNG ĐIỆN TỪ ---
  {
    id: 'tf3.3-1',
    topic: 'TỪ TRƯỜNG',
    lessonId: 'l3.3',
    level: 'Vận dụng',
    type: 'TrueFalse',
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

  // --- I4.1 & I4.2: HẠT NHÂN & NĂNG LƯỢNG LIÊN KẾT ---
  {
    id: 'tf4.2-1',
    topic: 'HẠT NHÂN & PHÓNG XẠ',
    lessonId: 'l4.2',
    level: 'Vận dụng',
    type: 'TrueFalse',
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

  // --- I4.3: PHÓNG XẠ ---
  {
    id: 'tf4.3-1',
    topic: 'HẠT NHÂN & PHÓNG XẠ',
    lessonId: 'l4.3',
    level: 'Vận dụng',
    type: 'TrueFalse',
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
];