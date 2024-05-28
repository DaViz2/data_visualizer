import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../hooks';
import { VarData } from '../../../reducer/vardata';
import './blueprint.css';
// eslint-disable-next-line import/namespace
import { NodeProp } from './CustomNodes';
import { SidebarProp } from './StructureSidebar';

function VarSidebar({ nodes }: SidebarProp) {
  const [newNodeItemText, setNewNodeItemText] = useState<string>('');
  const [nodeItems, setNodeItems] = useState<SidebarProp>({
    nodeCount: 0,
    nodes,
  });
  const vardata = useAppSelector((state) => state.vardata);

  // 서버에서 넘어온 변수를 자동으로 목록에 추가하는 부분
  useEffect(() => {
    let cnt = nodeItems.nodeCount;
    const newNodes: NodeProp[] = vardata.data.map((varData: VarData) => {
      cnt += 1;
      return {
        nodeId: (cnt - 1).toString(),
        nodeName: varData.name,
        nodeType: 'varNode',
        nodeContent: varData.type,
      };
    });
    setNodeItems({ nodeCount: cnt - 1, nodes: newNodes });
  }, [vardata]);

  // 새로운 변수명 관리
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNodeItemText(event.target.value);
  };

  const handleDeleteItem = (id: string) => {
    const newItems = nodeItems.nodes.filter((item) => item.nodeId !== id);
    setNodeItems({ nodeCount: nodeItems.nodeCount - 1, nodes: newItems });
  };

  // Enter로 새로운 변수명 입력 시 처리
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

  // 변수 리스트에서 끌어오는 부분 처리
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
        placeholder="새로운 변수명"
        onKeyUp={handleInputKeyPress}
      />
    </div>
  );
}

export default VarSidebar;
