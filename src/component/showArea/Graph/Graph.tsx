/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useRef, useState, useEffect } from 'react';
import ForceGraph, { ForceGraphMethods } from 'react-force-graph-2d';
import * as d3 from 'd3-force';
import { NodeData, LinkData } from '../../../assets/testData/testDataType';

interface Dimensions {
  width: number;
  height: number;
}

interface GraphProps {
  nodes: NodeData[];
  links: LinkData[];
  active: boolean;
}

// show1
function Graph({ nodes, links, active }: GraphProps) {
  const ref = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fgRef = useRef<ForceGraphMethods | null>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  const data = {
    nodes: nodes.map((node) => ({
      id: node.id,
      name: node.name,
      val: 6,
    })),
    links,
  };

  useEffect(() => {
    if (ref.current) {
      setDimensions({
        width:
          dimensions.width < ref.current.offsetWidth
            ? ref.current.offsetWidth
            : dimensions.width,
        height:
          dimensions.height < ref.current.offsetHeight
            ? ref.current.offsetHeight
            : dimensions.height,
      });
    }

    if (fgRef.current) {
      const fg = fgRef.current;
      (fg.d3Force('link') as d3.ForceLink<any, any>).distance(100);
    }
  }, [active]);

  return (
    <div
      ref={ref}
      className="h-full w-full overflow-hidden box-border bg-[#CADCA0] border-2 border-[#3D3D3D]"
    >
      <ForceGraph
        ref={
          fgRef as React.MutableRefObject<ForceGraphMethods<{}, {}> | undefined>
        }
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
          fgRef.current!.zoomToFit();
        }}
        linkColor={() => '#000000'}
        nodeColor={() => '#FF8C1A'}
      />
    </div>
  );
}

export default Graph;
