---
description: "Use o assistente editorial do Warplyn para criar rascunhos, revisar textos, conferir fatos, avaliar o estilo e preparar traduções. Revise as alterações geradas antes de aceitá-las."
---

# Assistente editorial

Use o assistente editorial quando quiser ajuda para redigir, revisar, conferir fatos, avaliar o estilo ou preparar uma tradução. Em **Ações rápidas**, escolha uma opção para preencher o campo de mensagem com o texto inicial da *habilidade*. Você decide quando enviar a solicitação. Selecione **Enviar solicitação editorial** para iniciar o trabalho.

Selecione um trecho para limitar as edições a essa passagem. Definições e marcas da voz narrativa no texto ao redor podem ajudar o assistente a interpretar seleções curtas. Para usar esse contexto, o Warplyn também precisa enviar ao provedor parte do texto que ficou fora da seleção. Quando uma solicitação com seleção precisa de texto do *artigo*, o Warplyn envia a seleção e até 500 caracteres antes e 500 depois, como contexto separado e somente para leitura. Apenas a passagem selecionada pode ser substituída. O campo de mensagem explica isso antes do envio; não envie se o texto ao redor for confidencial. Orientações gerais e o gerenciamento de *habilidades* não precisam desse texto. O Warplyn nunca amplia a seleção silenciosamente para incluir o *artigo* inteiro. Se faltar contexto, forneça explicitamente a passagem relevante ou faça outra solicitação com uma seleção diferente.

Guarde orientações recorrentes em uma [nota editorial](writing-and-articles.md#editor-notes) junto ao trecho. Confira **Notas que acompanham esta solicitação** antes de enviar. Salvar uma nota não inicia uma solicitação.

::: tip Exemplo
Ao revisar um conto, selecione uma passagem e peça: “Melhore o ritmo, mantendo o ponto de vista da Ana e o clima tranquilo. Não acrescente acontecimentos.” O assistente prepara uma *proposta* para **Revisão da proposta**. Você também pode pedir que ele avalie um capítulo em busca de mudanças entre o passado e o presente; os *apontamentos* da avaliação de estilo aparecem em **Perfil de estilo**.
:::

[![Assistente editorial do Warplyn com uma solicitação de revisão de ficção e uma habilidade selecionada.](/images/editorial-assistant-example.png)](/images/editorial-assistant-example.png)

*Exemplo de solicitação no campo de mensagem. Conecte um provedor antes de enviá-la. A captura de tela mostra o nome antigo de uma habilidade.*

O assistente mostra uma mensagem breve enquanto processa a solicitação. Escolha **Parar solicitação** para cancelar uma tarefa que esteja demorando demais. Uma solicitação cancelada ou com falha não altera o *artigo*; escolha **Tentar novamente** para executá-la novamente. O assistente não expõe instruções, entradas privadas, credenciais nem erros do provedor. Quando o trabalho estiver pronto, use o cartão de resultado para abri-lo:

- **Revisão da proposta** para textos gerados ou revisados.
- **Verificação de fatos** para *apontamentos* consultivos.
- **Perfil de estilo** para *apontamentos* de avaliação de estilo.
- **Traduções** para uma *proposta* de tradução.

Abrir um resultado não altera o *artigo*. Revise uma *proposta* antes de aceitar as alterações. Os *apontamentos* servem como orientação, e as traduções permanecem como *artigos* vinculados separados. Consulte [Revisar artigos](reviewing-articles.md) para saber sobre propostas, histórico, recuperação e conferência de fatos. Consulte [Traduções](translations.md) para comparar e usar os resultados de tradução.

Para uma avaliação focada em termos técnicos, escolha **Verifique os termos técnicos** em **Ações rápidas**. Os *apontamentos* com fontes aparecem em **Verificação de fatos**. Consulte [Verificar termos técnicos](built-in-skills/check-technical-terms.md) para ver as etapas e os limites da avaliação.

Em **Revisão da proposta**, edite o texto **Proposto** diretamente nos layouts **Lado a lado** ou **Empilhado**. **Original** permanece somente para leitura. A edição mantém a decisão **Aceitar** ou **Rejeitar** de cada alteração. Escolha uma decisão para cada alteração e selecione **Aplicar** para concluir a revisão. O texto aceito cria uma nova *versão salva*. Se todas as sugestões forem rejeitadas, Aplicar encerra a revisão sem alterar o *artigo* nem criar uma *versão salva*. Para aceitar todas as alterações, escolha **Marcar tudo como aceito** em **Decisões…** e aplique. **Marcar todos como rejeitados** mantém o *artigo* inalterado. **Redefinir decisões** retorna todas as sugestões a Pendente e mantém suas edições do texto proposto. Escolha **Dispensar proposta** para limpar a revisão.

As edições ainda não aplicadas ficam disponíveis ao alternar layouts ou visualizações do espaço de trabalho. Recarregar, trocar de *artigo*, encerrar a *proposta* ou gerar outra limpa essas edições. Se houver um erro ao aplicar a *proposta*, suas edições ficam disponíveis para uma nova tentativa. Preserve os números, links, códigos e termos técnicos do texto proposto. *Propostas* desatualizadas, não confiáveis ou já aceitas são somente para leitura. Se você editar o texto de uma correção de fato, os *apontamentos* continuam consultivos após a aplicação.

As *habilidades* ajudam a orientar uma solicitação, mas não concedem permissões. Se você não indicar uma *habilidade*, o assistente escolhe as mais adequadas ao pedido. Ele não encaminha solicitações comuns para um fluxo de edição padrão. O Warplyn não executa tarefas em segundo plano, não publica diretamente e não altera um *artigo* sem sua aprovação.

Peça ao assistente editorial para criar uma [habilidade](skills.md) reutilizável quando quiser usar um procedimento novamente. Ele pode fazer uma pergunta breve se o objetivo, as etapas ou as referências não estiverem claros. A *habilidade* criada fica disponível imediatamente e tem seu próprio histórico local de *revisões da habilidade*. Para criar a *habilidade*, o assistente não lê o corpo do *artigo* nem altera o *rascunho*, a *proposta* ou a *versão salva*.

Você pode pedir ao assistente editorial que examine o **Histórico de versões salvas**, o trabalho editorial salvo, as orientações para publicação ou se o corpus de estilo está pronto para uso. Mediante solicitação explícita, ele pode adicionar a *versão salva* imutável atual ao corpus de estilo local e reconstruir o perfil de estilo. Ele não pode aceitar *propostas*, restaurar *versões salvas*, resolver *apontamentos*, editar *rascunhos*, excluir amostras de estilo nem publicar.

Para consultar exemplos de escrita, orientações reutilizáveis ou regras tipográficas, abra [Perfil de estilo](style-profile.md). Os *apontamentos* da avaliação de estilo aparecem lá e permanecem separados do seu *artigo*.
