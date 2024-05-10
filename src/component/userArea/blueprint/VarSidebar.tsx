import React, { useState } from 'react';
import './blueprint.css';
import { SidebarProp } from './Sidebar';

function VarSidebar({ nodes }: SidebarProp) {
  const [newNodeItemText, setNewNodeItemText] = useState<string>('');
  const [nodeItems, setNodeItems] = useState<SidebarProp>({
    nodeCount: 0,
    nodes,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNodeItemText(event.target.value);
  };

  const handleDeleteItem = (id: string) => {
    const newItems = nodeItems.nodes.filter((item) => item.nodeId !== id);
    setNodeItems({ nodeCount: nodeItems.nodeCount - 1, nodes: newItems }); // 항목 삭제
  };

  const handleAddNodeItem = () => {
    if (newNodeItemText.trim() !== '') {
      setNodeItems({
        nodeCount: nodeItems.nodeCount + 1,
        nodes: [
          ...nodeItems.nodes,
          {
            nodeId: nodeItems.nodeCount.toString(),
            nodeName: newNodeItemText.trim(),
            nodeType: 'varNode',
          },
        ],
      });
      setNewNodeItemText('');
    }
  };

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      handleAddNodeItem();
    }
  };

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string,
    nodeName: string,
  ) => {
    const newEvent = { ...event };
    newEvent.dataTransfer.setData(
      'application/reactflow',
      `${nodeType}/${nodeName}`,
    );
    // eslint-disable-next-line no-param-reassign
    newEvent.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div>
      {nodeItems.nodes.map((node) => (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={node.nodeId}
            className="dndnode"
            onDragStart={(event) =>
              onDragStart(event, node.nodeType, node.nodeName)
            }
            draggable
          >
            {node.nodeName}
          </div>
          <button type="button" onClick={() => handleDeleteItem(node.nodeId)}>
            X
          </button>
        </div>
      ))}
      <input
        type="text"
        value={newNodeItemText}
        onChange={handleInputChange}
        placeholder="새로운 조사식"
        onKeyUp={handleInputKeyPress}
      />
    </div>
  );
}

export default VarSidebar;
