import React, { useRef } from 'react';
import TabComponent from '../tab/Tab';
import Graph from './Graph/Graph';
import Table from './Table/Table';
import ArrayTable from './Table/ArrayTable';
import testGraphData from '../../assets/testData/testgraph.json';
import testArrayData from '../../assets/testData/testarray.json';
import testTableData from '../../assets/testData/testtable.json';

export default function Showarea() {
  const ref = useRef<HTMLDivElement>(null);
  const tabs = Array.from(
    [
      <Graph nodes={testGraphData.nodes} links={testGraphData.edges} />,
      <ArrayTable data={testArrayData} />,
      <Table data={testTableData} />,
    ],
    (component, i) => ({
      title: <span style={{ color: '#FFFFFF' }}>Show{i + 1}</span>,
      content: (
        <div className="relative h-[100%] w-full">
          <div className="h-full w-full" ref={ref}>
            {component}
          </div>
        </div>
      ),
    }),
  );

  return (
    <div className="relative flex w-full h-[100%] bg-[#252F3E] ">
      <TabComponent tabs={tabs} />
    </div>
  );
}
