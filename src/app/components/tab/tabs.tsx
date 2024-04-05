'use client';

import React, { useState } from 'react';
import Tab from './tab';

interface TabInfo {
  label: string;
  id: number;
  content: JSX.Element;
}

interface TabsProps {
  tabs: TabInfo[];
}

function Tabs({ tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    // <div className="tabs-container">
    // <div className="tabs">
    // <div className="tab-content">Tab {activeTab + 1} is Active</div>
    <div className="flex flex-col w-full h-full m-auto">
      <div className="flex">
        {tabs.map((tab, index) => (
          <Tab
            key={tab.id}
            label={tab.label}
            onClick={() => handleTabClick(index)}
            isActive={index === activeTab}
          />
        ))}
      </div>
      <div className="border-2 border-white p-20 bg-white flex-grow">
        {tabs[activeTab].content}
      </div>
    </div>
  );
}

export default Tabs;
