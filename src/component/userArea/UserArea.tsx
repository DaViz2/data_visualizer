import React, { useState } from 'react';
import Blueprint from './blueprint/Blueprint';
import TabComponent from '../tab/Tab';
import Board from './board/Board';
import Button from './board/Button';
import { sendWebSocketMessage } from '../../reducer/websocket/webSocket';

interface CodeInfo {
  code: string;
  lang: string;
}

export default function Userarea() {
  const [code, setCode] = useState('');
  const sendCodeToWebSocket = () => {
    const codeInfo: CodeInfo = {
      code,
      lang: 'python',
    };
    sendWebSocketMessage(JSON.stringify(codeInfo));
  };
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
          <Button handleExecute={sendCodeToWebSocket} label=">" />
          <Button handleExecute={sendCodeToWebSocket} label="|>" />
        </div>
      </div>
    </div>
  );
}
