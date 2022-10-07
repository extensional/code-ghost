import React, { forwardRef } from "react";
import styles from "../styles/ConversationDisplay.module.scss";
import {
    Conversation,
    PromptConversationContextType,
    usePromptConversationContext,
} from "../context/PromptConversationContext";
import ConvoListItem from "./ConvoListItem";
import PromptInput from "./PromptInput";

const ConversationDisplay = forwardRef((props: any, ref: any) => {
    const editorRef = ref;
    const {
        conversation,
        setConversation,
        currentMessageId,
        setCurrentMessageId,
    } = usePromptConversationContext() as PromptConversationContextType;
    const orderedConversationIds = (): string[] => {
        let orderedConversationArray = [];
        let firstMessageFound = false;
        let messageId = currentMessageId;
        while (!firstMessageFound) {
            orderedConversationArray.unshift(messageId);
            if (conversation[messageId]?.previousMessageId !== undefined) {
                messageId = conversation[messageId].previousMessageId!;
            } else firstMessageFound = true;
        }
        return orderedConversationArray;
    };

    return (
        <div className={styles.conversationDisplay}>
            <div className={styles.chatDisplay}>
                <ul>
                    {orderedConversationIds().map((key) => {
                        const convo = conversation[key];
                        return <ConvoListItem convo={convo} />;
                    })}
                </ul>
            </div>
            <PromptInput ref={editorRef} />
        </div>
    );
});

export default ConversationDisplay;
