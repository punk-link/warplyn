import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import { landingLanguagesPlugin } from "./landing-languages-plugin.mjs";

export default defineConfig({
    plugins: [landingLanguagesPlugin()],
    build: {
        rollupOptions: {
            input: {
                home: fileURLToPath(new URL("./index.html", import.meta.url)),
                plans: fileURLToPath(new URL("./plans.html", import.meta.url)),
            },
        },
    },
});
