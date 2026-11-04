import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nProvider } from "../i18n/I18nProvider.js";
import { createRendererApplicationClient } from "../application/desktop-client.js";
import { UiLanguagePreview } from "./UiLanguagePreview.js";
import "../styles.css";


const client = createRendererApplicationClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <I18nProvider client={client}>
            <UiLanguagePreview />
        </I18nProvider>
    </StrictMode>,
);
