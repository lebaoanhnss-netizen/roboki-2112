import React from 'react';

interface MathRenderProps {
  content: string;
  block?: boolean;
  className?: string;
}

const MathRender: React.FC<MathRenderProps> = ({ content, block = false, className = '' }) => {
  const Tag = block ? 'div' : 'span';
  // whitespace-pre-wrap ensures that \n in the data strings are rendered as line breaks
  return (
    <Tag className={`${className} whitespace-pre-wrap`}>
      {content}
    </Tag>
  );
};

export default MathRender;