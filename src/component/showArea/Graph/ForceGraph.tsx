import { useEffect, useRef, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';

function ForceGraph() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const arr = Array.from({ length: 10 }, (_, i) => i + 1);
  const nodes = arr.map((i) => ({ id: `${i}`, name: `${i}`, val: 10 }));
  const arr2 = Array.from({ length: 9 }, (_, i) => i + 1);
  const edges = arr2.map((i) => ({ source: `${i}`, target: `${i + 1}` }));
  const data = {
    nodes,
    links: edges,
  };

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
        setHeight(ref.current.offsetHeight);
        console.log(width, height);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });
  console.log(width, height);

  return (
    <div className="h-full w-full paddig-0 flex justify-center" ref={ref}>
      <ForceGraph2D
        backgroundColor="black"
        width={width}
        height={height}
        graphData={data}
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
