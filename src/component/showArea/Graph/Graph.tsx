/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useRef } from 'react';
import Draggable from 'react-draggable';
import Node from './Node';
import Edge from './Edge';
import { EdgeData, NodeData } from '../../../assets/testData/testDataType';

export interface GraphProps {
  nodes: NodeData[];
  edges: EdgeData[];
}

function Graph({ nodes, edges }: GraphProps) {
  const graphRef = useRef<HTMLDivElement>(null);
  const nodeRefs = nodes.reduce(
    (acc, node) => {
      acc[node.id] = useRef<HTMLDivElement>(null);
      return acc;
    },
    {} as { [id: number]: React.Ref<HTMLDivElement> },
  );
  const edgeRefs = edges.map(() => useRef<HTMLDivElement>(null));

  const [nodePositions, setNodePositions] = useState<{
    [id: number]: { x: number; y: number };
  }>({});

  const [nodeRendered, setNodeRendered] = useState<boolean>(false);

  const nodeList = nodes.map((node) => (
    <Draggable
      bounds="parent"
      key={node.id}
      nodeRef={nodeRefs[node.id] as React.RefObject<HTMLElement>}
      onDrag={(e, data) => {
        const offsetLeft = nodePositions[node.id].x;
        const offsetTop = nodePositions[node.id].y;
        const nextX = offsetLeft + data.deltaX;
        const nextY = offsetTop + data.deltaY;

        const newNodePositions = { ...nodePositions };
        newNodePositions[node.id] = { x: nextX, y: nextY };
        setNodePositions(newNodePositions);
      }}
    >
      <div ref={nodeRefs[node.id]} className="h-fit w-fit">
        <Node value={node.value} />
      </div>
    </Draggable>
  ));

  useEffect(() => {
    const newNodePositions: { [id: number]: { x: number; y: number } } = {};
    nodes.forEach((node) => {
      const nodeRef = nodeRefs[node.id] as React.RefObject<HTMLElement>;

      if (nodeRef.current && graphRef.current) {

        const initialPosition = {
          x:
            nodeRef.current.offsetLeft -
            graphRef.current.offsetLeft,
          y:
            nodeRef.current.offsetTop -
            graphRef.current.offsetTop
        };
        newNodePositions[node.id] = initialPosition;
      }
    });
    setNodePositions(newNodePositions);

    setNodeRendered(true);
  }, []);

  let edgeList: JSX.Element[] = [];

  if (nodeRendered) {
    edgeList = edges.map((edge, index) => (
      <Draggable
        bounds="parent"
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        nodeRef={edgeRefs[index] as React.RefObject<HTMLElement>}
        disabled
        positionOffset={{
          x: `${nodePositions[edge.source].x}px`,
          y: `${nodePositions[edge.source].y}px`,
        }}
      >
        <div className="w-fit h-fit" ref={edgeRefs[index]}>
          <Edge
            x1={nodePositions[edge.source].x}
            y1={nodePositions[edge.source].y}
            x2={nodePositions[edge.target].x}
            y2={nodePositions[edge.target].y}
          />
        </div>
      </Draggable>
    ));
  }

  return (
    <div className="w-full h-full bg-gray-200 zIndex-9" ref={graphRef}>
      {edgeList}
      {nodeList}
    </div>
  );
}

export default Graph;
