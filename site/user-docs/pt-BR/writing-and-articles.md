---
description: "Escreva e organize artigos, entenda como os rascunhos são salvos e configure a assistência ortográfica local."
---

# Escrever e organizar artigos

Um *artigo* é um texto da sua biblioteca do Warplyn. Enquanto você escreve, o aplicativo salva o *rascunho* para que você possa recuperá-lo. Uma *versão salva* guarda no histórico o texto como ele estava no momento em que foi salvo.

## Guardar orientações junto a um trecho {#editor-notes}

As *notas editoriais* guardam instruções ligadas a um trecho para futuros pedidos ao Assistente. Use-as para preservar o ponto de vista ou evitar que uma pista seja revelada cedo demais. Elas ficam separadas do texto do artigo e não aparecem no texto copiado ou exportado.

Selecione o trecho no editor. Escolha **Adicionar nota editorial…** na barra de formatação ou no menu do botão direito. Escreva a instrução em **Orientações para o Assistente** e escolha **Salvar nota**. Salvar uma nota não inicia uma solicitação nem cria uma revisão do artigo.

::: tip Exemplo de O rio ao anoitecer
Selecione o parágrafo em que Ana percebe o barco: "Mantenha a incerteza de Ana sobre quem é o dono do barco. Preserve os sons do rio e não revele a identidade do passageiro." Depois, peça ao Assistente para melhorar o ritmo desse trecho.
:::

Abra **Notas editoriais** pela barra de formatação ou por um pequeno marcador numerado ao lado do texto. Passe o ponteiro sobre o marcador ou dê foco a ele pelo teclado para destacar o trecho temporariamente. Escolha a prévia na lista para localizar o trecho. Use **Editar nota…** e depois **Salvar nota** para alterar as orientações. O botão de remoção apaga apenas a nota.

Salve as alterações antes de fechar a janela ou mudar de nota. Se houver alterações não salvas, cancele para continuar editando ou escolha **Descartar alterações** para descartá-las.

O aviso **Precisa ser anexada novamente** significa que não é mais possível identificar o trecho original. A nota continua disponível, mas só volta a orientar o trabalho depois de ser anexada novamente. Feche a janela, selecione o novo trecho e reabra a nota por **Notas editoriais** e **Editar nota…**. Escolha **Anexar ao texto selecionado** e depois **Salvar nota**.

As notas anexadas acompanham solicitações explícitas do Assistente que trabalham nos seus trechos. Com uma seleção, só são enviadas as notas de trechos que se sobrepõem ao texto selecionado. Confira **Notas que acompanham esta solicitação** no campo de mensagem antes de enviar. Escreva ali a tarefa imediata e deixe na nota as orientações que deseja manter.

Para procedimentos reutilizáveis, consulte [Skills](skills.md); para amostras de escrita e orientações gerais, consulte [Perfil de estilo](style-profile.md).

## Escrever e salvar um artigo

Escolha **Novo artigo** na biblioteca para começar. Renomeie o *artigo* pelo campo do título. Use a barra de formatação para aplicar títulos, listas, ênfase, links, citações e código. Ao colar texto formatado, o Warplyn mantém a formatação compatível e remove marcações inseguras ou sem suporte. O *artigo* é armazenado como Markdown, portanto layouts de página complexos e itens incorporados não são preservados.

O Warplyn salva automaticamente o *rascunho* atual enquanto você edita. Um ponto de verificação é um texto de trabalho recuperável, não um novo item no histórico de versões salvas. Se precisar saber se as edições recentes foram salvas, confira o indicador de estado na barra de status do artigo. O Warplyn também salva um ponto de verificação pendente quando você troca de *artigo* ou abre Configurações.

[![Espaço de escrita mostrando A correnteza ao entardecer no editor, a barra de formatação, a biblioteca e o indicador de rascunho salvo.](/images/writing-workspace.png)](/images/writing-workspace.png)

*Exemplo de artigo salvo como rascunho no espaço de escrita.*

Escolha **Salvar versão** para guardar o *rascunho* atual como um ponto nomeado no histórico. Salvar uma *versão salva* não remove as *versões salvas* anteriores. Se o texto local e um *rascunho* salvo deixarem de corresponder, consulte [Revisar artigos](reviewing-articles.md#recover-a-draft).

## Encontrar e organizar artigos

Use a busca da biblioteca para encontrar *artigos*, inclusive os arquivados. Escolha **Artigos** para consultar trabalhos fixados e recentes ou **Arquivar** para ver grupos de *artigos* arquivados. A barra de navegação recolhida oferece atalhos para **Novo artigo**, **Pesquisar artigos**, **Artigos** e **Arquivar**. No menu da biblioteca, fixe um *artigo* original para manter um atalho na barra de navegação. Use **Subir** ou **Mover para baixo** para reordenar os *artigos* fixados. Fixar e reordenar não altera o conteúdo do *artigo*. Use o campo do título para renomeá-lo.

Escolha **Arquivar artigo** para remover um grupo de *artigos* da lista ativa e mantê-lo em **Arquivar**. Selecione o grupo arquivado e escolha **Desarquivar artigo** para recuperá-lo. Excluir um *artigo* exige confirmação e remove suas *versões salvas* e os *rascunhos* recuperáveis. Excluir um artigo de origem também exclui as *traduções* vinculadas; excluir uma *tradução* mantém o artigo de origem. Se quiser apenas deixá-lo de lado, arquive-o.

## Usar assistência ortográfica

O editor marca possíveis erros de ortografia usando o suporte do seu dispositivo. No aplicativo desktop, clique com o botão direito em uma palavra marcada para escolher uma substituição sugerida ou **Adicionar ao dicionário**. A substituição é uma edição comum: pode ser desfeita e passa a fazer parte do *rascunho* atual. A verificação ortográfica acontece no dispositivo e não envia texto do *artigo* a um provedor de IA.

Em **Configurações** → **Ortografia** no desktop, use **Filtrar idiomas** para encontrar um idioma, selecione-o em **Prepare-se para escrever offline** e escolha **Baixar dicionários**. Aguarde o estado **Baixado** antes de depender do dicionário sem conexão. **Disponível** significa que há suporte para o idioma, não que o download do dicionário terminou. Escolha **Descarregar** para parar de usar um dicionário preparado nesta sessão. Preparar dicionários não altera o idioma do *artigo*. Os downloads precisam de acesso à internet. No Windows, adicionar ou remover palavras pessoais também altera o dicionário do sistema operacional e pode afetar outros aplicativos.

Em **Dicionário pessoal**, procure palavras salvas ou informe uma palavra ou termo técnico por linha em **Palavras para adicionar** e escolha **Adicionar palavras**. Você pode adicionar até 500 palavras por vez. Remova palavras salvas para que a assistência ortográfica volte a sinalizá-las. A lista é compartilhada entre *artigos* e idiomas. O aplicativo web usa as configurações de ortografia do navegador e não oferece gerenciamento de dicionários.

Use **Modo de foco** para ocultar os dois painéis de apoio enquanto escreve. Selecione-o novamente para exibi-los. Use o controle de recolher de cada painel para fechá-lo ou reabri-lo; arraste o divisor ao lado de um painel para redimensioná-lo. Em uma janela estreita, os painéis podem abrir temporariamente sobre o editor.

Com o teclado, use **Tab** e **Shift + Tab** para percorrer a biblioteca, o cabeçalho do artigo, as visualizações, a barra de formatação, o editor, a barra de status e o assistente. No editor, na busca e no campo de mensagem, os atalhos usuais de edição de texto continuam funcionando. A área de configurações tem navegação própria pelo teclado. Na barra lateral do desktop, use **Up**, **Down**, **Home** ou **End** para percorrer as seções e depois **Enter** ou **Space** para abrir uma delas.

Para transferir um *artigo* inteiro de ou para o Warplyn, consulte [Arquivos de artigos](article-files.md). Para fazer cópias de segurança do espaço de trabalho inteiro, consulte [Cópias de segurança e recuperação](backups-and-recovery.md).
