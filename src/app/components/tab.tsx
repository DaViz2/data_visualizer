"use client"

import React, { useState } from 'react';

interface Tab {
  title: string;
  content: JSX.Element;
}

interface TabComponentProps {
  tabs: Tab[];
}

const TabComponent: React.FC<TabComponentProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="flex flex-col h-full w-full ">
      <div className="flex flex-row grow-[1] w-[20rem]">
        {tabs.map((tab, index) => (
          <button 
            key={index}
            onClick={() => handleTabClick(index)}
            className={(index === activeTab ? 'active' : '') + " p-5 bg-blue-100"}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="flex grow-[18] w-full">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default TabComponent;