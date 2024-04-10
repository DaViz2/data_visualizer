import React from 'react';
import { saveAs } from 'file-saver';
import ExecuteButton from './ExectueButton';

interface BoardProps {
  code: string;
  setCode: (code: string) => void;
}

function Board({ code, setCode }: BoardProps) {
  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value);
  };

  const handleSaveToFile = () => {
    const blob = new Blob([code], { type: 'application/json;charset=utf-8' });
    saveAs(blob, 'code.json');
  };

  return (
    <div className="w-full h-full transform scale-130">
      <textarea
        className="flex w-full h-full resize-none outline-none bg-blue-100"
        value={code}
        onChange={handleCodeChange}
      />
      <ExecuteButton handleExecute={handleSaveToFile} />
    </div>
  );
}

export default Board;

/*
import React, { useState } from 'react';
import { saveAs } from 'file-saver';

function Board() {
  const [code, setCode] = useState('');

  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value);
  };

  const handleCodeSubmit = () => {
    const blob = new Blob([JSON.stringify({ code })], {
      type: 'text/plain;charset=utf-8',
    });
    saveAs(blob, 'code.json');
  };

  return (
    <div className="w-full h-full transform scale-130">
      <textarea
        className="flex w-full h-full resize-none outline-none bg-blue-100"
        value={code}
        onChange={handleCodeChange}
      />
      <button type="button" onClick={handleCodeSubmit}>
        Submit
      </button>
    </div>
  );
}

export default Board;
*/
