'use client';

import React, { useState, ChangeEvent } from 'react';

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
