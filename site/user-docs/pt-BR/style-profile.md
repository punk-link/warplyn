---
description: "Crie um perfil de estilo local a partir dos seus textos e gerencie regras de voz e tipografia."
---

# Perfil de estilo

Use o **Perfil de estilo** para fornecer ao assistente exemplos da sua escrita e orientações reutilizáveis. Seus exemplos permanecem neste dispositivo. Eles não passam a fazer parte de um *artigo* nem de uma *versão salva*.

Abra o **Perfil de estilo** na área de utilitários do painel da Biblioteca de Artigos. Use o menu lateral ou, em uma janela estreita, o seletor de seções para escolher **Escrevendo amostras**, **Regras manuais** ou **Regras de tipografia**. O botão **Voltar** retorna ao *artigo* e à visualização que você deixou.

::: tip Escolha por onde começar
Adicione exemplos de escrita para identificar características de voz, ou adicione **Regras manuais** quando já souber quais orientações fornecer. Você pode usar qualquer uma das opções sem a outra.
:::

## Adicionar exemplos de escrita

Abra **Escrevendo amostras** quando quiser que o assistente aprenda com textos que você já escreveu. Escolha **Adicionar amostra de escrita** para colar um texto ou enviar um arquivo `.txt` ou `.md`. Você também pode escolher **Add Revision** para usar como exemplo uma versão salva de um *artigo*. Dê ao exemplo um nome que ajude a reconhecê-lo depois.

Use a caixa de seleção do exemplo para incluí-lo ou excluí-lo do perfil. Excluir um exemplo o mantém na lista. Remova-o quando não precisar mais dele. A remoção exige confirmação porque o exemplo será excluído do Perfil de estilo.

## Adicionar orientações e reconstruir o perfil

Use **Regras manuais** para descrever preferências que o assistente deve seguir. Por exemplo, você pode pedir que ele mantenha a narração em primeira pessoa ou explique uma abreviação na primeira ocorrência. É possível adicionar orientações sem incluir exemplos.

Depois de alterar exemplos ou orientações, escolha **Reconstruir perfil** para atualizar as características identificadas. O perfil mostra quais exemplos foram usados e quando foi reconstruído. Até lá, as características identificadas talvez ainda reflitam o conjunto anterior de exemplos. Os *apontamentos* da avaliação de estilo são orientações e permanecem separados do texto do *artigo*.

[![Tela Regras manuais do Perfil de estilo mostrando uma regra geral sobre o ponto de vista da Ana e o controle Reconstruir perfil.](/images/style-profile-rules.png)](/images/style-profile-rules.png)

*Exemplo de regra manual no Perfil de estilo.*

::: details Exemplo de regra manual
Adicione cenas que mostrem o ponto de vista próximo da Ana e imagens tranquilas, exclua tudo o que não quiser usar e reconstrua o perfil. Adicione uma regra como “Mantenha a narração próxima ao ponto de vista da Ana” se essa preferência também precisar valer quando não estiver claramente demonstrada nos exemplos.
:::

## Regras tipográficas

Abra **Regras de tipografia** e selecione **Idioma tipográfico**. As convenções são salvas separadamente para cada idioma de escrita, independentemente do idioma da interface. **Aplicar regras a** permite escolher entre **Todos os artigos neste idioma** e **Este artigo apenas**. Uma *tradução* usa seu próprio idioma e suas próprias preferências.

O menu **Idioma de origem** na barra de status inclui idiomas regionais do catálogo predefinido. Para outro idioma, escolha **Outro idioma…** e informe o código dele, como `ja` para japonês. Depois, você pode salvar regras tipográficas personalizadas para esse idioma sem um padrão integrado.

Use **Adicionar regra** para escolher aspas, travessões de prosa, reticências, espaçamento de pontuação, espaços repetidos ou um par de termos que não deve ser separado, como `10 kg`. **Par personalizado** aceita aspas de abertura e fechamento e o espaçamento interno. **Substituição de pontuação literal** aplica uma convenção exata de pontuação ou espaçamento. Use **Instruções de tipografia contextual** quando uma regra exigir julgamento.

::: info Idioma e escopo
Escolha o idioma de escrita e se as regras se aplicam a todos os *artigos* nesse idioma ou somente ao *artigo* atual. Uma *tradução* tem seu próprio idioma e suas preferências tipográficas.
:::

**Predefinição de convenção** mostra prévias de convenções regionais. Pré-visualizações marcadas como **aguardando revisão no idioma nativo** ainda não podem ser aplicadas; você pode configurar suas próprias regras. Convenções regionais não se aplicam automaticamente a outras regiões. Se suas regras anteriores eram globais, **Copiar regras anteriores para este idioma** atribui uma cópia sem excluir as originais.

As regras do *artigo* herdam as convenções salvas para o idioma. Editar uma regra herdada cria uma substituição; removê-la a desativa nesse escopo. **Restaurar regras herdadas** limpa essas substituições. Ao mudar de idioma, as edições de regras ainda não salvas são mantidas enquanto o Perfil de estilo permanecer aberto.

As regras aparecem como resumos compactos com os rótulos **Salvo** ou **Não salvo**. Escolha **Editar** para abrir uma regra; somente uma regra pode ser editada por vez. **Salvar** salva o escopo selecionado. Salvar as preferências do idioma também reconstrói localmente o *Perfil de estilo* com os exemplos incluídos e as orientações salvas atuais, inclusive alterações na inclusão de exemplos. As substituições do *artigo* são salvas para aquele *artigo*. O texto não salvo em outros formulários continua sem ser salvo. Você pode usar regras tipográficas explícitas sem exemplos de escrita; os exemplos são necessários para identificar características de voz.

Salve o *rascunho* atual e selecione **Verifique a tipografia** para conferir o *artigo* selecionado sem conexão de IA. A conferência usa a *versão salva* e o idioma dela, exibido na barra de status. Para conferir, escolha esse mesmo idioma em **Linguagem tipográfica**. Código, URLs, identificadores técnicos e casos ambíguos de aspas permanecem inalterados. Regras contextuais exigem uma **Revise o estilo de redação** completa pelo assistente. Um idioma sem regras mecânicas aplicáveis não tem cobertura tipográfica local; adicione e salve suas próprias regras antes de conferi-lo.

Abra **Revisar proposta** para inspecionar as correções e as regras que as sustentam. Marque como aceitas as correções desejadas e selecione **Aplicar**. As correções aceitas criam uma *versão salva*; rejeitar todas mantém o *artigo* inalterado. Salvar regras ou executar uma conferência não aplica correções. Uma revisão mantém o idioma e as definições de regras que usou; depois de alterar o idioma ou as preferências aplicáveis, um aviso oferece a opção de executá-la novamente. A tipografia não identifica limites entre idiomas em passagens multilíngues. Casos ambíguos permanecem inalterados.
