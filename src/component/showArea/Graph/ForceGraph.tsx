import React, { useEffect, useRef, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';

interface Dimensions {
  width: number;
  height: number;
}

function ForceGraph() {
  const ref = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  const arr = Array.from({ length: 10 }, (_, i) => i + 1);
  const nodes = arr.map((i) => ({ id: `${i}`, name: `${i}`, val: 10 }));
  const arr2 = Array.from({ length: 9 }, (_, i) => i + 1);
  const edges = arr2.map((i) => ({ source: `${i}`, target: `${i + 1}` }));
  const data = {
    nodes,
    links: edges,
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0].target) {
        const { width, height } = entries[0].contentRect;
        setDimensions({ width, height });
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
        graphData={data}
        width={dimensions.width}
        height={dimensions.height}
        nodeCanvasObjectMode={() => 'after'}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.id;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = 'black'; // node.color;
          ctx.fillText(label, node.x as number, node.y as number);
        }}
      />
    </div>
  );
}

export default ForceGraph;
