export function normalizeSkillName(name: string): string {
    return name.normalize("NFKC").toLowerCase();
}
