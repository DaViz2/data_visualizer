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
} from 'reactflow';
import './blueprint.css';
import 'reactflow/dist/style.css';
import Sidebar, { NodeProp } from './Sidebar';
import VarSidebar from './VarSidebar';
import { nodeTypes } from './CustumNodes';

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
      const transferedData = event.dataTransfer.getData(
        'application/reactflow',
      );
      const nodeInfo: NodeProp = JSON.parse(transferedData);

      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type: nodeInfo.nodeType,
        position: position || { x: 0, y: 0 },
        data: {
          label: `${nodeInfo.nodeName}`,
          content: `${nodeInfo.nodeContent}`,
        },
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
              {
                nodeId: '1',
                nodeName: 'Graph',
                nodeType: 'structureNode',
                nodeContent: '',
              },
              {
                nodeId: '2',
                nodeName: 'Table',
                nodeType: 'structureNode',
                nodeContent: '',
              },
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
