import React, { useState, createContext, useContext } from "react";

export interface Conversation {
    [messageId: string]: ConvoInstance;
}

export type ConvoInstance = {
    user: string;
    message: string;
    previousMessageId?: string;
    code?: string;
    link?: string;
};

export type PromptConversationContextType = {
    conversation: Conversation;
    setConversation: (conversation: Conversation) => void;
    currentMessageId: string;
    setCurrentMessageId: (currentMessageId: string) => void;
};

// Create Context Object
export const PromptConversationContext =
    createContext<PromptConversationContextType | null>(null);

// Create a provider for components to consume and subscribe to changes
export const PromptConversationContextProvider = (props: any) => {
    const [conversation, setConversation] = useState({});
    const [currentMessageId, setCurrentMessageId] = useState("");
    return (
        <PromptConversationContext.Provider
            value={{
                conversation,
                setConversation,
                currentMessageId,
                setCurrentMessageId,
            }}
        >
            {props.children}
        </PromptConversationContext.Provider>
    );
};

export function usePromptConversationContext() {
    return useContext(PromptConversationContext);
}
