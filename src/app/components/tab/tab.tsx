'use client';

import React, { MouseEvent } from 'react';

interface TabProps {
  label: string;
  onClick: (event?: MouseEvent<HTMLDivElement>) => void;
  isActive: boolean;
}

function Tab({ label, onClick, isActive }: TabProps) {
  const handleKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      // enter에 대해 처리, 나중에 수정해야 될 수도
      onClick();
    }
  };
  return (
    <div
      className={`tab ${isActive ? 'bg-white' : ''} cursor-pointer p-2 mr-2`}
      onClick={onClick}
      onKeyDown={handleKey}
      role="button"
      tabIndex={0}
    >
      {label}
    </div>
  );
}

export default Tab;
/*
'use client';

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
            className={`${index === activeTab ? 'active' : ''} p-2 bg-blue-100`}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="flex grow-[18] w-full">{tabs[activeTab].content}</div>
    </div>
  );
};

export default TabComponent;
*/
