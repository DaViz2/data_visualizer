import React, { useRef, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { editor } from 'monaco-editor';

interface BoardProps {
  code: string;
  setCode: (code: string) => void;
}

/*
editor.defineTheme('myTheme', {
  base: 'vs',
  inherit: true,
  rules: [{ token: 'comment', foreground: 'ffa500', background: 'EDF9FA' }],
  colors: {
    'editor.foreground': '#000000',
    'editor.background': '#FFFFFF',
    'editorCursor.foreground': '#000000',
    'editor.lineHighlightBackground': '#D3D3D3',
    'editorLineNumber.foreground': '#008800',
    'editor.selectionBackground': '#ADD6FF',
    'editor.inactiveSelectionBackground': '#E6E6E6',
  },
});
*/

function Board({ code, setCode }: BoardProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);

  const handleEditorChange = (newValue: string | undefined) => {
    if (newValue !== undefined) {
      setCode(newValue);
    }
  };

  const handleEditorDidMount = (
    editorInstance: editor.IStandaloneCodeEditor,
  ) => {
    editorRef.current = editorInstance;
  };

  return (
    <div className="w-full h-full transform scale-130">
      <MonacoEditor
        width="100%"
        height="100%"
        language="python"
        theme="vs"
        value={code}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          lineNumbers: 'on',
          quickSuggestions: false,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          lineDecorationsWidth: 1,
          renderLineHighlight: 'none',
        }}
      />
    </div>
  );
}

export default Board;
