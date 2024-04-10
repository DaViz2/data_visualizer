import TabComponent from "./tab";
import Graph from '../stage/component/Graph/Graph';
import testgraphdata from '../testData/testgraph.json'

export default function Stage() {
  const num = 2;
  const tabs = Array.from({ length: num }, (_, i) => ({
    title: `Show${i + 1}`,
    id: i,
    content: <div className="relative h-full w-full"><Graph nodes={testgraphdata.nodes} edges={testgraphdata.edges} /></div>,
  }));

  return (
    <div className="flex w-full h-full">
      <div className="flex grow-[1] h-[100%] flex-col items-center p-2 bg-slate-100">
        <TabComponent tabs={tabs} />
      </div>
    </div>
  );
}
