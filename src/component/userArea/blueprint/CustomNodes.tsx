import React from 'react';
import { Handle, NodeTypes, Position } from 'reactflow';
import { handleStringify } from './handleParser';

export interface NodeProp {
  nodeId: string;
  nodeName: string;
  nodeType: string;
  nodeContent: string;
  functionSpace: string;
}

interface CustomNodeProps {
  isConnectable: boolean;
  data: { label: string; content: string; functionSpace: string };
}

export function GraphNode({ isConnectable, data }: CustomNodeProps) {
  return (
    <div className="structure-node">
      <div>{data.label}</div>
      <Handle
        type="target"
        position={Position.Left}
        id="Node"
        isConnectable={isConnectable}
        style={{ top: '20%' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="Edge"
        isConnectable={isConnectable}
        style={{ top: '80%' }}
      />
    </div>
  );
}

export function StructureNode({ isConnectable, data }: CustomNodeProps) {
  return (
    <div className="structure-node">
      <div>{data.label}</div>
      <Handle
        type="target"
        position={Position.Left}
        id="General"
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
        id={handleStringify(data.label, data.functionSpace)}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export const nodeTypes: NodeTypes = {
  varNode: VarNode,
  structureNode: StructureNode,
  graphNode: GraphNode,
};
