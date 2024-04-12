import React from 'react';
import './blueprint.css';

function Sidebar() {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string,
  ) => {
    const newEvent = { ...event };
    newEvent.dataTransfer.setData('application/reactflow', nodeType);
    // eslint-disable-next-line no-param-reassign
    newEvent.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '25%',
        height: '25%',
        zIndex: 9,
        backgroundColor: '#ccc',
      }}
    >
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, 'input')}
        draggable
      >
        Input Node
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, 'custom')}
        draggable
      >
        Default Node
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, 'output')}
        draggable
      >
        Output Node
      </div>
    </div>
  );
}

export default Sidebar;
