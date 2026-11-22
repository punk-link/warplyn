import { en } from "./locales/en/index.js";


/** Canonical application-owned messages. IDs are stable; English is the source text. */
export const messages = en;

export type MessageId = keyof typeof messages;


declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace -- React Intl exposes this namespace for application message-ID augmentation.
    namespace FormatjsIntl {
        interface Message {
            ids: MessageId;
        }
    }
}
