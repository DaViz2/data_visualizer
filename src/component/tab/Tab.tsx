import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateActiveTab } from '../../reducer/activeTab';
import './tab.css';

interface Tab {
  title: string | JSX.Element;
  content: JSX.Element;
}

interface TabComponentProps {
  tabname: string;
  tabs: Tab[];
}

function TabComponent({ tabname, tabs }: TabComponentProps): JSX.Element {
  const activeTab = useAppSelector((state) => state.activeTab.activeTab);
  const dispatch = useAppDispatch();

  const handleTabClick = (index: number) => {
    dispatch(
      updateActiveTab({ activeTab: { ...activeTab, [tabname]: index } }),
    );
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
              index === activeTab[tabname] ? 'active ' : ''
            } flex pr-3 w-[10rem] h-[2rem]`}
          >
            <div
              className={`flex font-sans ${index === activeTab[tabname] ? 'bg-blue-800 ' : ' hover:bg-gray-500 bg-gray-600 '} rounded-t-lg w-full h-full justify-center items-center`}
            >
              {tab.title}
            </div>
          </button>
        ))}
      </div>
      <div className="flex relative h-full w-full">
        {tabs.map((tab, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className={`${index === activeTab[tabname] ? 'activeContent' : 'inactiveContent'}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TabComponent;
