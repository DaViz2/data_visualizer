import React from 'react';
import Tabs from '../tab/tabs';

export default function Userarea() {
  const tabs = [
    { label: 'Code Area', id: 0, content: <div>Content for Tab 1</div> },
    { label: 'Blue Print', id: 1, content: <div>Content for Tab 2</div> },
  ];

  return (
    <div className=" w-full h-full">
      <Tabs tabs={tabs} />
    </div>
  );
}

/*
export default function Userarea() {
  return (
    <div className="flex w-full h-full">
      <div className="flex grow-[1] h-[100%] flex-col items-center justify-between p-24 bg-slate-100" />
    </div>
  );
}
*/
