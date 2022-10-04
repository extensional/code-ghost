import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import CodeEditor from "../components/CodeEditor";
import ConversationDisplay from "../components/ConversationDisplay";
import { CodeEditorContextProvider } from "../context/CodeEditorContext";
import { PromptConversationContextProvider } from "../context/PromptConversationContext";
import styles from "../styles/Playground.module.scss";

const Playground: NextPage = () => {
    return (
        <CodeEditorContextProvider>
            <PromptConversationContextProvider>
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
                        <CodeEditor />
                        <ConversationDisplay />
                    </main>

                    <footer className={styles.footer}></footer>
                </div>
            </PromptConversationContextProvider>
        </CodeEditorContextProvider>
    );
};

export default Playground;
