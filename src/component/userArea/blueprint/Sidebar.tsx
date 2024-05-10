import React from 'react';
import './blueprint.css';

export interface NodeProp {
  nodeId: string;
  nodeName: string;
  nodeType: string;
}

export interface SidebarProp {
  // eslint-disable-next-line react/no-unused-prop-types
  nodeCount: number;
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
          // eslint-disable-next-line react/no-array-index-key
          key={node.nodeId}
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
