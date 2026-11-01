import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { IntlProvider } from "react-intl";
import { messages } from "../i18n/messages.js";
import { UiLanguagePreview } from "./UiLanguagePreview.js";
import "../styles.css";


createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <IntlProvider locale="en" messages={messages}>
            <UiLanguagePreview />
        </IntlProvider>
    </StrictMode>,
);
