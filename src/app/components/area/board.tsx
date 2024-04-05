'use client';

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
/*
function Board() {
  const [content, setContent] = useState('');

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className="w-full h-full transform scale-130">
      <textarea
        id="content"
        value={content}
        onChange={handleContentChange}
        placeholder="input code here"
        className="flex w-full h-full resize-none outline-none bg-blue-100"
      />
    </div>
  );
}

export default Board;
*/
