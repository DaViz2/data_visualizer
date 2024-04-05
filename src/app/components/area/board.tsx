'use client';

import React, { useState, ChangeEvent } from 'react';

function Board() {
  const [content, setContent] = useState('');

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div>
      <textarea id="content" value={content} onChange={handleContentChange} />
    </div>
  );
}

export default Board;
