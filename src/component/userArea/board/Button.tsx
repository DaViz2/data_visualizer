import React from 'react';

interface SaveButtonProps {
  handleExecute: () => void;
  label: string;
}

function Button({ handleExecute, label }: SaveButtonProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={handleExecute}
      className="flex  flex-row mt-2 mr-2 text-xs px-2 py-1 text-[#FFFFFF]"
    >
      {label}
    </button>
  );
}

export default Button;
