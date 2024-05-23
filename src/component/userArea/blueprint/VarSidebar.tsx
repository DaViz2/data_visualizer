import React, { useEffect, useState } from 'react';
import './blueprint.css';
import { NodeProp, SidebarProp } from './Sidebar';

interface VarData {
  name: string;
  value: string;
  type: string;
}

function VarSidebar({ nodes }: SidebarProp) {
  const [newNodeItemText, setNewNodeItemText] = useState<string>('');
  const [nodeItems, setNodeItems] = useState<SidebarProp>({
    nodeCount: 0,
    nodes,
  });

  useEffect(() => {
    let cnt = nodeItems.nodeCount;
    fetch('/varData.json')
      .then((response) => response.json())
      .then((varDatas) => {
        const newNodes: NodeProp[] = varDatas.data.map((varData: VarData) => {
          cnt += 1;
          return {
            nodeId: (cnt - 1).toString(),
            nodeName: varData.name,
            nodeType: 'varNode',
            nodeContent: varData.type,
          };
        });
        setNodeItems({ nodeCount: cnt - 1, nodes: newNodes });
      });
  }, []);

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
            nodeId: (nodeItems.nodeCount + 1).toString(),
            nodeName: newNodeItemText.trim(),
            nodeType: 'varNode',
            nodeContent: '',
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
      {nodeItems.nodes.map((node) => (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={node.nodeId}
            className="dndnode"
            onDragStart={(event) => {
              onDragStart(event, node);
            }}
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
