import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { CodeEditorContextProvider } from "../context/CodeEditorContext";
import { PromptConversationContextProvider } from "../context/PromptConversationContext";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <CodeEditorContextProvider>
            <PromptConversationContextProvider>
                <Component {...pageProps} />;
            </PromptConversationContextProvider>
        </CodeEditorContextProvider>
    );
}

export default MyApp;
