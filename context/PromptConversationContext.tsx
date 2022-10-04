import React, { useState, createContext, useContext } from "react";

export interface Conversation {
    [timeDate: string]: ConvoInstance;
}

export type ConvoInstance = {
    user: string;
    message: string;
    code: string | undefined;
    link: string | undefined;
};

export type PromptConversationContextType = {
    conversation: Conversation;
    setConversation: (conversation: {}) => void;
};

// Create Context Object
export const PromptConversationContext =
    createContext<PromptConversationContextType | null>(null);

// Create a provider for components to consume and subscribe to changes
export const PromptConversationContextProvider = (props: any) => {
    const [conversation, setConversation] = useState({});
    return (
        <PromptConversationContext.Provider
            value={{
                conversation,
                setConversation,
            }}
        >
            {props.children}
        </PromptConversationContext.Provider>
    );
};

export function usePromptConversationContext() {
    return useContext(PromptConversationContext);
}
