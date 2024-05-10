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
import VarSidebar from './VarSidebar';

interface CustomNodeProps {
  isConnectable: boolean;
  data: { label: string };
}

function StructureNode({ isConnectable, data }: CustomNodeProps) {
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

function VarNode({ isConnectable, data }: CustomNodeProps) {
  return (
    <div className="var-node">
      <div>{data.label}</div>
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

const nodeTypes: NodeTypes = {
  varNode: VarNode,
  structureNode: StructureNode,
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

  const onConnect = useCallback((params: Edge | Connection) => {
    const localEdges: Connection[] = JSON.parse(
      localStorage.getItem('edges') || '[]',
    );
    localEdges.push(params as Connection);
    localStorage.setItem('edges', JSON.stringify(localEdges));
    return setEdges((eds) => addEdge(params, eds));
  }, []);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    // eslint-disable-next-line no-param-reassign
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      let type = event.dataTransfer.getData('application/reactflow');

      const parseIndex: number = type.indexOf('/');
      const firstPart: string = type.substring(0, parseIndex);
      let nodeName: string = type;
      if (firstPart === 'varNode') {
        nodeName = type.substring(parseIndex + 1);
        type = firstPart;
      }
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
        data: { label: `${nodeName}` },
        style: {
          fontSize: '0.5rem',
          height: '2rem',
          width: '5rem',
        },
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
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '25%',
            height: '25%',
            zIndex: 9,
            backgroundColor: '#ccc',
            overflow: 'auto',
          }}
        >
          <VarSidebar nodeCount={0} nodes={[]} />
        </div>
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
          <Sidebar
            nodeCount={2}
            nodes={[
              { nodeId: '1', nodeName: 'Graph', nodeType: 'structureNode' },
              { nodeId: '2', nodeName: 'Table', nodeType: 'structureNode' },
            ]}
          />
        </div>
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
