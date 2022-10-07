import REACT from "react";
import { ConvoInstance } from "../context/PromptConversationContext";
import styles from "../styles/ConvoListItem.module.scss";

type ConvoItemProps = {
    convo: ConvoInstance;
};
export default function ConvoItem(props: ConvoItemProps) {
    const convo = props.convo;
    return (
        <li
            className={
                convo?.user === "ai" ? styles.aiConvo : styles.humanConvo
            }
            key={convo?.message}
        >
            <a href={convo?.link}>{convo?.message}</a>
        </li>
    );
}
