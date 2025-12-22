// file: src/components/MathRender.tsx
import React from 'react';
// Import CSS của KaTeX để hiển thị phông chữ toán học đẹp
import 'katex/dist/katex.min.css'; 
import Latex from 'react-latex-next';

const MathRender: React.FC<{ content: string; className?: string }> = ({ content, className }) => {
  if (!content) return null;

  return (
    <div className={className}>
      {/* strict={false} giúp nó không bị lỗi nếu công thức viết hơi sai cú pháp */}
      <Latex strict={false}>{content}</Latex>
    </div>
  );
};

export default MathRender;