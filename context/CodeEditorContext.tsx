import React, { useState, createContext, useContext } from "react";

export type CodeEditorContextType = {
    currentCode: string;
    setCurrentCode: (currentCode: string) => void;
    currentCodeSelection: string;
    setCurrentCodeSelection: (currentCodeSelection: string) => void;
    currentCodeSelectionRange: any;
    setCurrentCodeSelectionRange: (currentCodeSelectionRange: any) => void;
};

// Create Context Object
export const CodeEditorContext = createContext<CodeEditorContextType | null>(
    null
);

// Create a provider for components to consume and subscribe to changes
export const CodeEditorContextProvider = (props: any) => {
    const [currentCode, setCurrentCode] = useState("");
    const [currentCodeSelection, setCurrentCodeSelection] = useState("");
    const [currentCodeSelectionRange, setCurrentCodeSelectionRange] = useState(
        {}
    );
    return (
        <CodeEditorContext.Provider
            value={{
                currentCode,
                setCurrentCode,
                currentCodeSelection,
                setCurrentCodeSelection,
                currentCodeSelectionRange,
                setCurrentCodeSelectionRange,
            }}
        >
            {props.children}
        </CodeEditorContext.Provider>
    );
};

export function useCodeEditorContext() {
    return useContext(CodeEditorContext);
}
