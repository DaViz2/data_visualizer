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
import Sidebar from './StructureSidebar';
import VarSidebar from './VarSidebar';
import { NodeProp, nodeTypes } from './CustomNodes';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  addstruct,
  updatestruct,
  VarConData,
} from '../../../reducer/structdata';

const initialNodes: Node<
  { label: string; content: string },
  string | undefined
>[] = [];

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
  const dispatch = useAppDispatch();
  const structs = useAppSelector((state) => state.structdata.structs);

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      const target = nodes.find((value) => {
        return value.id === params.target;
      });
      const struct = structs.find((value) => {
        return value.structId === target!.id;
      });
      const newAdj: VarConData[] = [
        { handleType: params.targetHandle!, varName: params.sourceHandle! },
      ];
      dispatch(
        updatestruct({
          ...struct!,
          adj: struct!.adj.concat(newAdj),
        }),
      );
      return setEdges((eds) => addEdge(params, eds));
    },
    [nodes],
  );

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
        },
      };

      if (nodeInfo.nodeType !== 'varNode')
        dispatch(
          addstruct({
            structId: newNode.id,
            structType: nodeInfo.nodeName,
            adj: [],
          }),
        );

      setNodes(
        (nds: Node<{ label: string; content: string }, string | undefined>[]) =>
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
                nodeType: 'graphNode',
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
