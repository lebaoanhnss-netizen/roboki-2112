import React from 'react';
import Latex from 'react-latex-next';
// Đảm bảo có dòng này để lấy font chữ toán học từ thư viện đã cài
import 'katex/dist/katex.min.css'; 

const MathRender: React.FC<{ content: string; className?: string }> = ({ content, className }) => {
  if (!content) return null;
  return (
    <div className={className}>
      <Latex>{content}</Latex>
    </div>
  );
};

export default MathRender;