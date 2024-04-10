import React from 'react';

interface NodeProps {
  radius?: number;
  value: number | string | null;
}

function Node({ radius, value }: NodeProps) {
  return (
    <div
      className="absolute w-32 h-32 border-4 border-violet-300 bg-purple-500 rounded-full flex justify-center items-center"
      style={{ width: radius, height: radius }}
    >
      {value}
    </div>
  );
}

Node.defaultProps = {
  radius: 80,
};

export default Node;
