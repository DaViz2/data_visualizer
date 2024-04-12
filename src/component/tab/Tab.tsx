import React, { useState } from 'react';

interface Tab {
  title: string;
  content: JSX.Element;
}

interface TabComponentProps {
  tabs: Tab[];
}

function TabComponent({ tabs }: TabComponentProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="flex flex-col h-full w-full ">
      <div className="flex flex-row">
        {tabs.map((tab, index) => (
          <button
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            onClick={() => handleTabClick(index)}
            type="button"
            className={`${
              index === activeTab ? 'active ' : ''
            }flex pr-3 w-[10rem] h-[2rem]`}
          >
            <div
              className={`flex ${index === activeTab ? 'bg-[#7D0000] ' : 'bg-white '} w-full h-full justify-center items-center`}
            >
              {tab.title}
            </div>
          </button>
        ))}
      </div>
      <div className="flex h-full w-full">{tabs[activeTab].content}</div>
    </div>
  );
}

export default TabComponent;
