import React, { forwardRef, useRef } from "react";
import {
    CodeEditorContextType,
    useCodeEditorContext,
} from "../context/CodeEditorContext";
import Editor, { Monaco } from "@monaco-editor/react";

const CodeEditor = forwardRef((props: any, ref: any) => {
    const {
        currentCode,
        setCurrentCode,
        currentCodeSelection,
        setCurrentCodeSelection,
        currentCodeSelectionRange,
        setCurrentCodeSelectionRange,
    } = useCodeEditorContext() as CodeEditorContextType;

    const handleEditorChange = (newValue: any, e: any) => {
        setCurrentCode(newValue);
    };

    function handleEditorDidMount(mEditor: any, monaco: any) {
        ref.current = mEditor;
        mEditor.focus();
        mEditor.onDidChangeCursorSelection((e: any) => {
            setCurrentCodeSelectionRange(e.selection);
            const codeSelection = ref
                .current!.getModel()
                .getValueInRange(e.selection);
            setCurrentCodeSelection(codeSelection);
        });
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
                onMount={handleEditorDidMount}
            />
        </div>
    );
});

export default CodeEditor;
