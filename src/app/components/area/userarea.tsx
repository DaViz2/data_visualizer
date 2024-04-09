'use client';

import React, { useState } from 'react';
import Tabs from '../tab/tabs';
import Board from './board';
/*
function Userarea() {
  const [code, setCode] = useState('');

  const tabs = [
    {
      label: 'Code Area',
      id: 0,
      content: <Board code={code} setCode={setCode} />,
    },
    { label: 'Blue Print', id: 1, content: <div>Content for Tab 2</div> },
  ];

  return (
    <div className=" w-full h-screen flex">
      <Tabs tabs={tabs} />
    </div>
  );
}
*/

export default function Userarea() {
  return (
    <div className="flex w-full h-full">
      <div className="flex grow-[1] h-[100%] flex-col items-center justify-between p-24 bg-slate-100" />
    </div>
  );
}

