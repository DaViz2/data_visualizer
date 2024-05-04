import React, { useRef } from 'react';
import TabComponent from '../tab/Tab';
import Graph from './Graph/Graph';
import testGraphData from '../../assets/testData/testgraph.json';

export default function Showarea() {
  const ref = useRef<HTMLDivElement>(null);

  const num = 3;
  const tabs = Array.from({ length: num }, (_, i) => ({
    title: `Show${i + 1}`,
    content: (
      <div className="relative h-full w-full">
        <div className="border-black border-2 h-full w-full" ref={ref}>
          <Graph nodes={testGraphData.nodes} links={testGraphData.edges} />
        </div>
      </div>
    ),
  }));

  return (
    <div className="flex w-full h-full">
      <div className="flex w-full h-[100%] flex-col items-center p-2 bg-slate-100">
        <TabComponent tabs={tabs} />
      </div>
    </div>
  );
}
