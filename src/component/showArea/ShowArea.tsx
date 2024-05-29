import React, { useEffect, useRef, useState } from 'react';
import TabComponent from '../tab/Tab';
import { useAppSelector } from '../../hooks';
import ShowComponent from './ShowComponent';

export default function Showarea() {
  const ref = useRef<HTMLDivElement>(null);
  const [tabs, setTabs] = useState<
    { title: JSX.Element; content: JSX.Element }[]
  >([]);
  const structdata = useAppSelector((state) => state.structdata.structs);
  useEffect(() => {
    setTabs(
      Array.from(
        structdata.map((value) => {
          return <ShowComponent struct={value} />;
        }),
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
      ),
    );
  }, [structdata]);

  return (
    <div className="relative flex w-full h-[100%] bg-[#252F3E] ">
      <TabComponent tabs={tabs} />
    </div>
  );
}
