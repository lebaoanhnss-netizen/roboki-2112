// file: src/components/MathRender.tsx
import React from 'react';
import Latex from 'react-latex-next';

// Thay đổi cách import CSS này để chắc chắn không bị lỗi 404
import 'katex/dist/katex.min.css'; 

const MathRender: React.FC<{ content: string; className?: string }> = ({ content, className }) => {
  if (!content) return null;

  return (
    <div className={`math-container ${className || ''}`}>
      <Latex strict={false}>
        {content}
      </Latex>
    </div>
  );
};

export default MathRender;