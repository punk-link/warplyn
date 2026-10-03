/** Each language keeps the existing independent completion and persistence gate. */
export async function runTranslationBatch(languages: readonly string[], signal: AbortSignal, perform: (language: string) => Promise<void>): Promise<void> {
    const remaining = [...new Set(languages)];
    const failures: unknown[] = [];
    const worker = async () => {
        while (remaining.length && !signal.aborted) {
            const language = remaining.shift();
            if (!language)
                continue;

            try {
                await perform(language);
            } catch (error) {
                failures.push(error);
            }
        }
    };

    await Promise.all(Array.from({ length: Math.min(3, remaining.length) }, worker));
    signal.throwIfAborted();
    if (failures.length)
        throw failures[0];
}
