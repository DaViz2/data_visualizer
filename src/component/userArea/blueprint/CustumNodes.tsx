import React from 'react';
import { Handle, NodeTypes, Position } from 'reactflow';

interface CustomNodeProps {
  isConnectable: boolean;
  data: { label: string; content: string };
}

export function StructureNode({ isConnectable, data }: CustomNodeProps) {
  return (
    <div className="structure-node">
      <div>{data.label}</div>
      <Handle
        type="target"
        position={Position.Left}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export function VarNode({ isConnectable, data }: CustomNodeProps) {
  return (
    <div className="var-node">
      <div>{data.label}</div>
      <div>{data.content}</div>
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export const nodeTypes: NodeTypes = {
  varNode: VarNode,
  structureNode: StructureNode,
};
