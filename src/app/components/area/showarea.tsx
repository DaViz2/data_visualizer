import React from 'react';
import Tabs from '../tab/tabs';

export default function Showarea() {
  const num = 3;
  const tabs = Array.from({ length: num }, (_, i) => ({
    label: `Show${i + 1}`,
    id: i,
    content: <div>{`Content for Tab ${i + 1}`}</div>,
  }));

  return (
    <div className=" w-full h-full">
      <Tabs tabs={tabs} />
    </div>
  );
}

/*
import TabComponent from './tabs';

export default function Showarea() {
  const tabs = [
    { title: 'Show1', content: <div>Content for Tab 1</div> },
    { title: 'Show2', content: <div>Content for Tab 2</div> },
  ];

  return (
    <div className="flex w-full h-full">
      <TabComponent tabs={tabs} />
    </div>
  );
}


import React from 'react';
import Tabs from '../tab/tabs';

export default function Showarea() {
  const tabs = [
    { label: 'Show1', id: 0, content: <div>Content for Tab 1</div> },
    { label: 'Show2', id: 1, content: <div>Content for Tab 2</div> },
    { label: 'Show3', id: 2, content: <div>Content for Tab 3</div> },
  ];

  return (
    <div className=" w-full h-full">
      <Tabs tabs={tabs} />
    </div>
  );
}
*/
