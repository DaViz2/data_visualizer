import React, { useEffect, useState } from 'react';

interface EdgeProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

function calculateLine(x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  return { length, angle };
}

const Edge: React.FC<EdgeProps> = ({ x1, y1, x2, y2 }) => {
  const { length, angle } = calculateLine(x1, y1, x2, y2);

  return (
    <div
      className="absolute bg-gray-500 h-1 origin-top-left"
      style={{
        width: `${length}px`,
        transform: `rotate(${angle}deg)`,
      }}
    />
  );
};

export default Edge;
