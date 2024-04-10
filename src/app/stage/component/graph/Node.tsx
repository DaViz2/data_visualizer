import React from 'react';

interface CircleProps {
  radius?: number;
  value?: number | string | null;
}

const Node: React.FC<CircleProps> = ({ radius = 16, value }) => {
  return (
    <div className="absolute w-32 h-32 border-4 border-violet-300 bg-purple-500 rounded-full flex justify-center items-center">
      {value}
    </div>
  );
};

export default Node;
