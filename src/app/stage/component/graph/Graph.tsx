import React from "react";
import { useEffect, useState, useRef } from "react";
import Draggable from "react-draggable";
import Node from "./Node";
import Edge from "./Edge";
import { EdgeData, NodeData } from "../../../../data/type";
import { Truculenta } from "next/font/google";

export interface GraphProps {
    nodes: NodeData[]
    edges: EdgeData[]
}

const Graph: React.FC<GraphProps> = ({ nodes, edges }) => {
    const graphRef = useRef<HTMLDivElement>(null);
    const nodeRefs = nodes.reduce((acc, node) => {
        acc[node.id] = useRef<HTMLDivElement>(null);
        return acc;
    }, {} as { [id: number]: React.Ref<HTMLDivElement> })
    const edgeRefs = edges.map((edge) => useRef<HTMLDivElement>(null));

    const [nodePositions, setNodePositions] = useState<{ [id: number]: { x: number, y: number } }>({});
    const [renderedNodeSize, setRenderedNodeSize] = useState<{ [id: number]: number }>({});
    const [nodeRendered, setNodeRendered] = useState<boolean>(false);

    const nodeList = nodes.map((node) =>
        <Draggable bounds="parent"
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
            }}>
            <div ref={nodeRefs[node.id]} className="h-fit w-fit">
                <Node value={node.value} />
            </div>
        </Draggable>
    )

    useEffect(() => {
        const newNodePositions: { [id: number]: { x: number, y: number } } = {}
        const newNodeSizes: { [id: number]: number } = {}
        nodes.forEach((node) => {
            const nodeRef = nodeRefs[node.id] as React.RefObject<HTMLElement>;

            if (nodeRef.current && graphRef.current) {
                const NodeSize = nodeRef.current.offsetHeight
                newNodeSizes[node.id] = NodeSize;

                const initialPosition = {
                    x: nodeRef.current.offsetLeft - graphRef.current.offsetLeft + NodeSize / 2,
                    y: nodeRef.current.offsetTop - graphRef.current.offsetTop + NodeSize / 2
                };
                newNodePositions[node.id] = initialPosition;
            }
        })
        setNodePositions(newNodePositions);
        setRenderedNodeSize(newNodeSizes);

        setNodeRendered(true);
    }, [])

    let edgeList: JSX.Element[] = [];

    if (nodeRendered) {
        edgeList = edges.map((edge, index) =>
            <Draggable bounds="parent"
                key={index}
                nodeRef={edgeRefs[index] as React.RefObject<HTMLElement>}
                disabled={true}
                positionOffset={{ x: `${nodePositions[edge.source].x}px`, y: `${nodePositions[edge.source].y}px` }}
            >
                <div ref={edgeRefs[index]}>
                    <Edge
                        x1={nodePositions[edge.source].x}
                        y1={nodePositions[edge.source].y}
                        x2={nodePositions[edge.target].x}
                        y2={nodePositions[edge.target].y}
                    />
                </div>
            </Draggable>
        )
    }

    return <div className='w-full h-full' ref={graphRef} >
        {edgeList}
        {nodeList}
    </div>
}

export default Graph;