import React, { Component, useState } from "react";
import axios from "axios";
import { useCodeEditorContext } from "../context/CodeEditorContext";
import { track } from "../util/tracking";
import { usePromptConversationContext } from "../context/PromptConversationContext";

export default function PromptInput() {
    const {
        currentCode,
        setCurrentCode,
        currentCodeSelection,
        setCurrentCodeSelection,
        editor,
        setEditor,
    } = useCodeEditorContext();
    const [conversation, setConversation] = usePromptConversationContext();
    const axiosInstance = axios.create({
        baseURL: "http://localhost:3000/api/codact/",
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
        e.preventDefault();
        const textInSelection = currentCodeSelection;
        const textInDoc = currentCode;
        setConversation({ user: "human", message: question });
        setPrompt("");
        let response = await axiosInstance.post("/prompt/question", {
            question,
        });

        const intermede = await response.data;
        const is_info = intermede == "true";

        track("query.answer", {
            question: question,
            answer: "" + is_info,
        });
        if (is_info) {
            let response = await axiosInstance.post("/prompt/answer", {
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

            setConversation({ user: "ai", message: aout });

            // vscode.window
            //     .showInformationMessage(
            //         "Codact: " + aout,
            //         ...["Useful", "Needs Improvement"]
            //     )
            //     .then((feedback) => {
            //         mixpanel.track("query.info.feedback", {
            //             question: question,
            //             info: aout,
            //             feedback: feedback,
            //         });
            //     });
            return;
        }
        let res = await axiosInstance.post("/prompt/completion", {
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

        await editor.edit((editBuilder: any) => {
            if (aout != undefined)
                editBuilder.replace(editor.selection, aout[0]);
        });
        // TODO James
        // Add link below
        setConversation({
            user: "ai",
            message: aout,
            code: currentCode,
            link: "INSERT LINK HERE",
        });
        // vscode.window
        //     .showInformationMessage(
        //         "Codact: was this what you had in mind?",
        //         ...["Yes", "No"]
        //     )
        //     .then((feedback) => {
        //         mixpanel.track("query.code.feedback", {
        //             question: question,
        //             info: aout,
        //             feedback: feedback,
        //         });
        //     });
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                placeholder={prompt}
                onChange={onChange}
                value={question}
            />
            <button type="submit">Submit</button>
        </form>
    );
}
