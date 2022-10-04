import React from "react";
import styles from "../styles/ConversationDisplay.module.scss";
import { usePromptConversationContext } from "../context/PromptConversationContext";
import ConvoListItem from "./convoListItem";
import PromptInput from "./PromptInput";

export default function ConversationDisplay() {
    const [conversation, setConversation] = usePromptConversationContext();
    const orderedConversationKeys = Object.keys(conversation).sort();

    return (
        <div className={styles.conversationDisplay}>
            <div className={styles.chatDisplay}>
                <ul>
                    {orderedConversationKeys.map((key) => {
                        const convo = conversation[key];
                        return <ConvoListItem props={convo} />;
                    })}
                </ul>
            </div>
            <PromptInput />
        </div>
    );
}
