export async function runReleaseStep(label, action, print = console.log) {
    const started = Date.now();
    const elapsed = () => `${Math.floor((Date.now() - started) / 1000)}s`;
    print(`[release] ${label}...`);
    const timer = setInterval(() => print(`[release] ${label}, still working (${elapsed()})...`), 10_000);
    try {
        const result = await action();
        print(`[release] ${label}: done (${elapsed()}).`);
        return result;
    } catch (error) {
        print(`[release] ${label}: stopped (${elapsed()}).`);
        throw error;
    } finally {
        clearInterval(timer);
    }
}
