import React, { useState } from "react";
import { uuid } from "uuidv4";
import axios from "axios";
import {
    CodeEditorContextType,
    useCodeEditorContext,
} from "../context/CodeEditorContext";
import { track } from "../util/tracking";
import {
    PromptConversationContextType,
    usePromptConversationContext,
} from "../context/PromptConversationContext";
import styles from "../styles/PromptInput.module.scss";

const PromptInput = React.forwardRef((props: any, ref: any) => {
    const editorRef = ref;
    const {
        currentCode,
        setCurrentCode,
        currentCodeSelection,
        setCurrentCodeSelection,
        currentCodeSelectionRange,
        setCurrentCodeSelectionRange,
    } = useCodeEditorContext() as CodeEditorContextType;
    const {
        conversation,
        setConversation,
        currentMessageId,
        setCurrentMessageId,
    } = usePromptConversationContext() as PromptConversationContextType;
    const axiosInstance = axios.create({
        baseURL: "http://localhost:3000/api/",
        timeout: 10000,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    });
    const [prompt, setPrompt] = useState(
        "ask me to write code/select it and ask me questions or for code modifications"
    );
    const [question, setQuestion] = useState("");

    const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
        setQuestion(e.currentTarget.value);
    };

    const onSubmit = async (e: any) => {
        let newMessageId: string;
        let coversationObj: any;
        e.preventDefault();
        const textInSelection = currentCodeSelection;
        const textInDoc = currentCode;
        newMessageId = uuid();
        coversationObj = { ...conversation };
        coversationObj[newMessageId] = {
            previousMessageId: currentMessageId,
            user: "human",
            message: question,
        };
        setConversation(coversationObj);
        setCurrentMessageId(newMessageId);

        setPrompt("");
        let response = await axiosInstance.post("/codact", {
            url: "prompt/question",
            question,
        });

        const is_info = await response.data;
        track("query.answer", {
            question: question,
            answer: "" + is_info,
        });
        if (is_info) {
            let response = await axiosInstance.post("/codact", {
                url: "/prompt/answer",
                textInDoc,
                textInSelection,
                question,
            });
            const aout: any = await response.data;

            track("query.info", {
                question: question,
                info: aout,
                selection: textInSelection,
                doc: textInDoc,
            });
            setPrompt("Codact: How else can I help you?");
            newMessageId = uuid();
            coversationObj = { ...conversation };
            coversationObj[newMessageId] = {
                previousMessageId: currentMessageId,
                user: "ai",
                message: aout,
            };
            setConversation(coversationObj);
            setCurrentMessageId(newMessageId);
            return;
        }
        let res = await axiosInstance.post("/codact", {
            url: "/prompt/completion",
            textInDoc,
            textInSelection,
            question,
        });
        const aout: any = await res.data;
        track("query.code", {
            question: question,
            modification: aout,
            selection: textInSelection,
            doc: textInDoc,
        });

        setPrompt("Codact: How else can I help you?");
        await editorRef.current.getModel().pushEditOperations(
            [],
            [
                {
                    range: currentCodeSelectionRange,
                    text: aout[0],
                },
            ]
        );

        newMessageId = uuid();
        coversationObj = { ...conversation };
        coversationObj[newMessageId] = {
            user: "ai",
            message: "I generated the code you asked for!",
            code: currentCode,
            link: "INSERT LINK HERE",
        };
        setConversation(coversationObj);
        setCurrentMessageId(newMessageId);
    };

    return (
        <form className={styles.promptInputForm} onSubmit={onSubmit}>
            <input
                className={styles.promptInput}
                type="text"
                placeholder={prompt}
                onChange={onChange}
                value={question}
            />
            <button className={styles.promptSubmit} type="submit">
                Submit
            </button>
        </form>
    );
});

export default PromptInput;
