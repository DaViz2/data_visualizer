import React, { useState } from 'react';
import Blueprint from './blueprint/Blueprint';
import TabComponent from '../tab/Tab';
import Board from './board/Board';
import NextButton from './interactButton/nextButton';
import OpenFile from './board/OpenFile';

export default function Userarea() {
  const [code, setCode] = useState('');

  const tabs = [
    {
      // title: 'Code Area',
      title: <span style={{ color: '#FFFFFF' }}>Code</span>,
      content: <Board code={code} setCode={setCode} />,
    },

    {
      title: <span style={{ color: '#FFFFFF' }}>Blue Print</span>,
      content: <Blueprint />,
    },
    // title: 'Blue Print'
  ];
  return (
    <div className="relative flex w-full h-[100%]">
      <TabComponent tabname="UserArea" tabs={tabs} />
      <div className="absolute top-0 right-0">
        <div className="flex flex-row">
          <div style={{ order: 1, marginRight: '30px' }}>
            <OpenFile setCode={setCode} />
          </div>
          <div style={{ order: 2 }}>
            <NextButton code={code} />
          </div>
        </div>
      </div>
    </div>
  );
}
