"use client"

import React from 'react';
import './index.css'

const customStyle = 'flex-grow-1 h-full';

const Sidebar: React.FC = () => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div style = {{position:'absolute', top:0, right:0, width:'25%', height:'25%', zIndex:9, backgroundColor:'#ccc'}}>
      <div
        className={`dndnode input`}
        onDragStart={(event) => onDragStart(event, 'input')}
        draggable
      >
        Input Node
      </div>
      <div
        className={`dndnode`}
        onDragStart={(event) => onDragStart(event, 'default')}
        draggable
      >
        Default Node
      </div>
      <div
        className={`dndnode output`}
        onDragStart={(event) => onDragStart(event, 'output')}
        draggable
      >
        Output Node
      </div>
    </div>
  );
};

export default Sidebar;