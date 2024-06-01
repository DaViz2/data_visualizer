import React from 'react';

interface OpenFileProps {
  setCode: (code: string) => void;
}

function OpenFile({ setCode }: OpenFileProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileOpen = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setCode(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        style={{ color: 'white', fontSize: '0.6rem' }}
      >
        Open File
      </button>
      <input
        type="file"
        accept=".py,.txt"
        onChange={handleFileOpen}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
    </div>
  );
}

export default OpenFile;
