import React from 'react';

interface SaveButtonProps {
  handleExecute: () => void;
}

function Button({ handleExecute }: SaveButtonProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={handleExecute}
      className="absolute top-0 right-0 mt-2 mr-2 text-xs px-2 py-1 text-[#FFFFFF]"
    >
      Execute
    </button>
  );
}

export default Button;
