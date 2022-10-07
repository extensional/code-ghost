import type { NextPage } from "next";
import { useState, useRef } from "react";
import Head from "next/head";
import CodeEditor from "../components/CodeEditor";
import ConversationDisplay from "../components/ConversationDisplay";
import {
    CodeEditorContextType,
    useCodeEditorContext,
} from "../context/CodeEditorContext";
import styles from "../styles/Playground.module.scss";

const Playground: NextPage = () => {
    let editorRef = useRef(null);
    const {
        currentCode,
        setCurrentCode,
        currentCodeSelection,
        setCurrentCodeSelection,
        currentCodeSelectionRange,
        setCurrentCodeSelectionRange,
    } = useCodeEditorContext() as CodeEditorContextType;

    return (
        <div className={styles.container}>
            <Head>
                <title>Code Ghost Playground</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.topContainer}>
                    <CodeEditor className={styles.codeEditor} ref={editorRef} />
                    <iframe
                        srcDoc={`<!DOCTYPE html>
                    <html>
                    <head>
                    <title>Code Playground</title>
                    <meta
                    name="description"
                    content="display the code that codact AI generated"
                    />
                    <script>
                    ${currentCode}
                    </script>
                    <style>
                        canvas { 
                            height: 100%;
                            width: 100%;
                        }
                    </style>
                    </head>
                    
                    <body>
                    <canvas></canvas>
                    </body>
                    </html>`}
                        className={styles.outputDisplay}
                    />
                </div>
                <ConversationDisplay
                    className={styles.conversation}
                    ref={editorRef}
                />
            </main>

            <footer className={styles.footer}></footer>
        </div>
    );
};

export default Playground;
