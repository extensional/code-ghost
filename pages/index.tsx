import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import CodeEditor from "../components/CodeEditor";
import { CodeEditorContextProvider } from "../context/CodeEditorContext";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
    return (
        <CodeEditorContextProvider>
            <div className={styles.container}>
                <Head>
                    <title>code ghost</title>
                    <meta
                        name="description"
                        content="an ai powered code generation tool"
                    />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className={styles.main}></main>

                <footer className={styles.footer}>
                    <a
                        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Powered by{"extensional.ai"}
                        <span className={styles.logo}>
                            <Image
                                src="/vercel.svg"
                                alt="Vercel Logo"
                                width={72}
                                height={16}
                            />
                        </span>
                    </a>
                </footer>
            </div>
        </CodeEditorContextProvider>
    );
};

export default Home;
