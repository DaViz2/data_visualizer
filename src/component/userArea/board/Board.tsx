import React from 'react';
// import { saveAs } from 'file-saver';
// import Button from './Button';

interface BoardProps {
  code: string;
  setCode: (code: string) => void;
}

function Board({ code, setCode }: BoardProps) {
  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const start = event.currentTarget.selectionStart;
      const end = event.currentTarget.selectionEnd;
      const target = event.currentTarget;
      setCode(`${code.slice(0, start)}\t${code.slice(end)}`);
      setTimeout(() => {
        target.selectionStart = start + 1;
        target.selectionEnd = start + 1;
      }, 0);
    }
  };
  /*
  const handleSaveToFile = () => {
    const blob = new Blob([code], { type: 'application/json;charset=utf-8' });
    saveAs(blob, 'code.json');
  };
  */
  // <Button handleExecute={handleSaveToFile} />
  return (
    <div className="w-full h-full transform scale-130">
      <textarea
        className="flex w-full h-full resize-none outline-none bg-blue-100"
        value={code}
        onChange={handleCodeChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default Board;
