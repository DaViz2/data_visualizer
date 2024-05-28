import React from 'react';
import './blueprint.css';
import { NodeProp } from './CustomNodes';

export interface SidebarProp {
  // eslint-disable-next-line react/no-unused-prop-types
  nodeCount: number;
  nodes: NodeProp[];
}

function Sidebar({ nodes }: SidebarProp) {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeInfo: NodeProp,
  ) => {
    const newEvent = { ...event };
    newEvent.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify(nodeInfo),
    );
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
          onDragStart={(event) => onDragStart(event, node)}
          draggable
        >
          {node.nodeName}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
