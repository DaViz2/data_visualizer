import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  ReactFlowInstance,
  Connection,
  Edge,
  Node,
  NodeTypes,
  Position,
  Handle,
} from 'reactflow';
import './blueprint.css';
import 'reactflow/dist/style.css';
import Sidebar from './Sidebar';

interface CustomNodeProps {
  isConnectable: boolean;
}

function CustomNode({ isConnectable }: CustomNodeProps) {
  return (
    <div className="text-updater-node">
      <div>HELLOOOO</div>
      <Handle
        type="source"
        position={Position.Left}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

const initialNodes: Node<{ label: string }, string | undefined>[] = [];

let id = -1;
const getId = () => {
  id += 1;
  return `dndnode_${id}`;
};

function DnDFlow() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    // eslint-disable-next-line no-param-reassign
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }
      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position: position || { x: 0, y: 0 },
        data: { label: `${type} node` },
        style: { fontSize: '1.5rem' },
      };

      setNodes((nds: Node<{ label: string }, string | undefined>[]) =>
        nds.concat(newNode),
      );
    },
    [reactFlowInstance],
  );

  return (
    <div className="dndflow relative w-full h-[80%] text-black bg-white">
      <ReactFlowProvider>
        <div className="absolute left-[50%] h-full w-[10px] bg-transparent border-r border-[0px] border-dashed border-gray-500 translate-x-[-50%]" />
        <Sidebar />
        <div className="w-full h-full" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            panOnDrag={false}
            panOnScroll={false}
            fitView
          />
        </div>
      </ReactFlowProvider>
    </div>
  );
}

function Blueprint() {
  return (
    <div className="flex items-center justify-center h-full w-full p-3 bg-black">
      <DnDFlow />
    </div>
  );
}

export default Blueprint;
