import React, { useRef } from 'react';
// import Graph from './Graph/Graph';
import TabComponent from '../tab/Tab';
// import testGraphData from '../../assets/testData/testgraph.json';
import ForceGraph from './Graph/ForceGraph';

export default function Showarea() {
  const ref = useRef<HTMLDivElement>(null);

  const num = 3;
  const tabs = Array.from({ length: num }, (_, i) => ({
    title: `Show${i + 1}`,
    content: (
      <div className="relative h-full w-full">
        <div
          ref={ref}
          style={{
            height: '100%',
            width: '100%',
          }}
        >
          {/* <Graph nodes={testGraphData.nodes} edges={testGraphData.edges} /> */}
          <ForceGraph />
        </div>
      </div>
    ),
  }));

  return (
    <div className="flex w-full h-full">
      <div className="flex grow-[1] h-[100%] flex-col items-center p-2 bg-slate-100">
        <TabComponent tabs={tabs} />
      </div>
    </div>
  );
}
