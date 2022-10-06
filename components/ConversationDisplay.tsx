import React from "react";
import styles from "../styles/ConversationDisplay.module.scss";
import {
    PromptConversationContextType,
    usePromptConversationContext,
} from "../context/PromptConversationContext";
import ConvoListItem from "./ConvoListItem";
import PromptInput from "./PromptInput";

export default function ConversationDisplay() {
    const { conversation, setConversation } =
        usePromptConversationContext() as PromptConversationContextType;
    const orderedConversationKeys = Object.keys(conversation).sort();

    return (
        <div className={styles.conversationDisplay}>
            <div className={styles.chatDisplay}>
                <ul>
                    {orderedConversationKeys.map((key) => {
                        const convo = conversation[key];
                        return <ConvoListItem convo={convo} />;
                    })}
                </ul>
            </div>
            <PromptInput />
        </div>
    );
}
