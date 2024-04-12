import React from 'react';
import './blueprint.css';

interface NodeProp {
  nodeName: string;
  nodeType: string;
}

interface SidebarProp {
  nodes: NodeProp[];
}

function Sidebar({ nodes }: SidebarProp) {
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
    <div>
      {nodes.map((node) => (
        <div
          className="dndnode"
          onDragStart={(event) => onDragStart(event, node.nodeType)}
          draggable
        >
          {node.nodeName}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
