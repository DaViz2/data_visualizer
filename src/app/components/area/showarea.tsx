import React from 'react';
import Graph from '@/app/stage/component/Graph/Graph';
import TabComponent from '../tab/tab';
import testgraphdata from '../../../data/testgraph.json';

export default function Showarea() {
  const num = 3;
  const tabs = Array.from({ length: num }, (_, i) => ({
    title: `Show${i + 1}`,
    content: (
      <div className="relative h-full w-full">
        <Graph nodes={testgraphdata.nodes} edges={testgraphdata.edges} />
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
