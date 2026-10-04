import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

const tailwindcssWithHighlightPseudoElementSupport = tailwindcss({ optimize: false });

export default defineConfig({
    base: "./",
    plugins: [
        react(),
        tailwindcssWithHighlightPseudoElementSupport,
    ],
    optimizeDeps: {
        // Worker-only imports must be ready before conversion to avoid a mid-import reload.
        include: ["fflate", "mammoth/mammoth.browser.js", "@xmldom/xmldom", "rtf-codec"],
    },
    test: {
        environment: "jsdom",
    },
    resolve: {
        alias: {
            "@skladno/shared": fileURLToPath(new URL("../shared/src/index.ts", import.meta.url)),
        },
    },
    server: {
        port: 5173,
        strictPort: true,
    },
});
