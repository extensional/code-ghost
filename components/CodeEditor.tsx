import React from "react";
import { useCodeEditorContext } from "../context/CodeEditorContext";
import Editor, { Monaco } from "@monaco-editor/react";

export default function CodeEditor() {
    const {
        currentCode,
        setCurrentCode,
        currentCodeSelection,
        setCurrentCodeSelection,
        editor,
        setEditor,
    } = useCodeEditorContext();

    const handleEditorChange = (newValue: any, e: any) => {
        console.log("Chart editor, onChange event: ", e);
        setCurrentCode(newValue);
    };

    const editorDidMount = (editor: any, monaco: any) => {
        console.log("Chart editor did mount.");
        editor.focus();
    };
    function handleEditorDidMount(mEditor: any, monaco: any) {
        setEditor(mEditor);
    }

    const options = {
        selectOnLineNumbers: true,
    };

    return (
        <div className="CodeEditor">
            <Editor
                width="800px"
                height="600px"
                language="javascript"
                theme="vs-dark"
                value={currentCode}
                options={options}
                onChange={handleEditorChange}
                onMount={editorDidMount}
            />
        </div>
    );
}
