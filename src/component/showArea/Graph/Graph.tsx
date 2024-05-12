/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useRef, useState, useEffect } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { NodeData, LinkData } from '../../../assets/testData/testDataType';

interface Dimensions {
  width: number;
  height: number;
}

interface GraphProps {
  nodes: NodeData[];
  links: LinkData[];
}

// show1
function Graph({ nodes, links }: GraphProps) {
  const ref = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fgRef = useRef<any>(null);
  const [rendered, setRendered] = useState<boolean>(false);
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  const data = {
    nodes: nodes.map((node) => ({
      id: node.id,
      name: node.name,
      val: 12,
    })),
    links,
  };

  useEffect(() => {
    if (ref.current) {
      setDimensions({
        width: ref.current.clientWidth,
        height: ref.current.clientHeight,
      });
    }

    setRendered(true);
  }, []);

  return (
    <div
      ref={ref}
      className="h-full w-full overflow-hidden box-border bg-[#CADCA0] border-2 border-[#3D3D3D]"
      style={
        rendered
          ? { maxWidth: dimensions.width, maxHeight: dimensions.height }
          : {}
      }
    >
      <ForceGraph2D
        ref={fgRef}
        graphData={data}
        width={dimensions.width}
        height={dimensions.height}
        nodeCanvasObjectMode={() => 'after'}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.name;
          const fontSize = 17 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#FFFFFF'; // 노드 글자색
          ctx.fillText(label, node.x as number, node.y as number);
        }}
        onNodeHover={(node, previousNode) => {
          if (node) {
            // eslint-disable-next-line no-param-reassign
            node.val *= 2;
          }

          if (previousNode) {
            // eslint-disable-next-line no-param-reassign
            previousNode.val /= 2;
          }
        }}
        onBackgroundRightClick={() => {
          fgRef.current.zoomToFit();
        }}
        linkColor={() => '#000000'}
        nodeColor={() => '#FF8C1A'}
      />
    </div>
  );
}

export default Graph;
