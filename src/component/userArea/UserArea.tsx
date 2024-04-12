import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import Blueprint from './blueprint/Blueprint';
import TabComponent from '../tab/Tab';
import Board from './board/Board';
import Button from './board/Button';

export default function Userarea() {
  const [code, setCode] = useState('');
  const handleSaveToFile = () => {
    const blob = new Blob([code], { type: 'application/json;charset=utf-8' });
    saveAs(blob, 'code.json');
  };
  const tabs = [
    {
      title: 'Code Area',
      content: <Board code={code} setCode={setCode} />,
    },
    { title: 'Blue Print', content: <Blueprint /> },
  ];
  return (
    <div className="relative flex w-full h-full">
      <TabComponent tabs={tabs} />
      <Button handleExecute={handleSaveToFile} />
    </div>
  );
}
