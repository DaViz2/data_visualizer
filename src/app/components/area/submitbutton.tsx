import React from 'react';
import { saveAs } from 'file-saver';

interface SubmitButtonProps {
  code: string;
}

export default function SubmitButton({ code }: SubmitButtonProps) {
  const handleCodeSubmit = () => {
    const blob = new Blob([JSON.stringify({ code })], {
      type: 'text/plain;charset=utf-8',
    });
    saveAs(blob, 'code.json');
  };

  return (
    <button type="button" onClick={handleCodeSubmit}>
      Submit
    </button>
  );
}
