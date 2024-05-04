/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useRef, useState } from 'react';
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

function Graph({ nodes, links }: GraphProps) {
  const ref = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fgRef = useRef<any>(null);

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
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0].target) {
        const { width, height } = entries[0].contentRect;
        if (width !== dimensions.width || height !== dimensions.height) {
          setDimensions({ width, height });
        }
      }
    });
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-full w-full">
      <ForceGraph2D
        ref={fgRef}
        graphData={data}
        width={dimensions.width}
        height={dimensions.height}
        nodeCanvasObjectMode={() => 'after'}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.name;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = 'black';
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
      />
    </div>
  );
}

export default Graph;
