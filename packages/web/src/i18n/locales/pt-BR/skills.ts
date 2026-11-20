import type { MessageId } from "../../messages.js";


export const skillsMessages = {
    "skills.loadFailed": "Não foi possível carregar as habilidades. Tente carregá-los novamente ou reabra as configurações de IA.",
    "skills.validation.invalid_frontmatter": (
        "O arquivo SKILL.md desta habilidade não possui um bloco de detalhes válido na parte superior. Adicione seu ID," +
        " nome, descrição e versão e tente novamente."
    ),
    "skills.validation.invalid_instructions": (
        "Adicione a orientação de Markdown que esta habilidade deve seguir. Mantenha as instruções dentro do tamanho su" +
        "portado."
    ),
    "skills.validation.invalid_metadata": (
        "Revise os detalhes desta habilidade. Use um ID exclusivo em letras minúsculas, um nome e uma descriç" +
        "ão claros, uma versão numérica e escopo e configurações de execução compatíveis."
    ),
    "skills.validation.invalid_reference": (
        "Esta habilidade nomeia uma referência que Warplyn não pode usar. Mantenha as referências como arquiv" +
        "os Markdown dentro de sua pasta de referências e dentro do tamanho suportado."
    ),
    "skills.validation.package_too_large": (
        "Este pacote de habilidades é muito grande para o Warplyn carregar. Encurte suas instruções ou arquivos de refe" +
        "rência e tente novamente."
    ),
    "skills.validation.unsafe_package": (
        "Warplyn não pode usar este pacote de habilidades porque ele inclui um arquivo ou local de arquivo nã" +
        "o suportado. Mantenha apenas SKILL.md e referências de Markdown declaradas."
    ),
} satisfies Partial<Record<MessageId, string>>;
