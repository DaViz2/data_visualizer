import React, { useRef, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { editor } from 'monaco-editor';

interface BoardProps {
  code: string;
  setCode: (code: string) => void;
}

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
  // 추가한 부분: <OpenFile setCode={setCode} />
  return (
    <div className="w-full h-full transform scale-130">
      <MonacoEditor
        width="100%"
        height="100%"
        language="python"
        theme="vs-dark"
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
