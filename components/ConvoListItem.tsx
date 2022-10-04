import REACT from "react";
import { ConvoInstance } from "../context/PromptConversationContext";
import styles from "../styles/ConvoListItem.module.scss";

type ConvoItemProps = ConvoInstance;
export default function ConvoItem(props: ConvoItemProps) {
    return (
        <li
            className={props.user === "ai" ? styles.aiConvo : styles.humanConvo}
        >
            <a href={props.link}>{props.message}</a>
        </li>
    );
}
