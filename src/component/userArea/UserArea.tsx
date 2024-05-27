import React, { useState } from 'react';
import Blueprint from './blueprint/Blueprint';
import TabComponent from '../tab/Tab';
import Board from './board/Board';
import Button from './board/Button';
import NextButton from './interactButton/nextButton';

export default function Userarea() {
  const [code, setCode] = useState('');

  const tabs = [
    {
      // title: 'Code Area',
      title: <span style={{ color: '#FFFFFF' }}>Code Area</span>,
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
      <TabComponent tabs={tabs} />
      <div className="absolute top-0 right-0">
        <div className="flex flex-row">
          <Button handleExecute={() => {}} label=">" />
          <Button handleExecute={() => {}} label="|>" />
          <NextButton code={code} />
        </div>
      </div>
    </div>
  );
}
