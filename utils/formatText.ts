export const cleanSchoolName = (input: string) => {
  // 1. Nếu trống thì trả về mặc định
  if (!input || input.trim() === '') return "THPT Khác";

  // 2. Chuyển hết về chữ thường để dễ xử lý
  let name = input.toLowerCase();

  // 3. Danh sách các từ cần xóa (để lọc lấy cái tên riêng thôi)
  const removeList = [
    "trường", 
    "thpt", 
    "NSS",
    "trung học phổ thông", 
    ".", ",", "-", "_" // Các ký tự thừa
  ];

  removeList.forEach((word) => {
    name = name.replaceAll(word, " ");
  });

  // 4. Xóa khoảng trắng thừa (ví dụ: "  nguyễn   sinh sắc ")
  name = name.replace(/\s+/g, " ").trim();

  // 5. Kỹ thuật "Title Case": Viết hoa chữ cái đầu của từng từ
  // Ví dụ: "nguyễn sinh sắc" -> "Nguyễn Sinh Sắc"
  const formattedName = name
    .split(" ") // Tách thành mảng các từ
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Viết hoa chữ đầu
    .join(" "); // Ghép lại

  // 6. Luôn thêm chữ "THPT" vào đầu
  return `THPT ${formattedName}`;
};