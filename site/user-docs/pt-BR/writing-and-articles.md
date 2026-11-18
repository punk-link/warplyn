---
description: "Escreva e organize artigos, entenda como os rascunhos são salvos e configure a assistência ortográfica local."
---

# Escrever e organizar artigos

Um *artigo* é um texto na sua biblioteca do Warplyn. Enquanto você edita, o Warplyn salva um ponto de verificação recuperável do *rascunho*. Uma *versão salva* é um ponto do histórico do *artigo*. Assim, você pode continuar trabalhando sem tratar cada edição como uma versão final.

## Escrever e salvar um artigo

Escolha **Novo artigo** na biblioteca para começar. Renomeie o *artigo* pelo campo do título. Use a barra de formatação para aplicar títulos, listas, ênfase, links, citações e código. Ao colar texto formatado, o Warplyn mantém a formatação compatível e remove marcações inseguras ou sem suporte. O *artigo* é armazenado como Markdown, portanto layouts de página complexos e itens incorporados não são preservados.

O Warplyn salva automaticamente o *rascunho* atual enquanto você edita. Um ponto de verificação de *rascunho* é um texto de trabalho recuperável, não um novo item no histórico de versões salvas. Se precisar saber se as edições recentes foram salvas, confira o indicador de estado na Article Status Bar. O Warplyn também salva um ponto de verificação pendente quando você troca de *artigo* ou abre Settings.

[![Espaço de escrita mostrando A correnteza ao entardecer no editor, a barra de formatação, a biblioteca e o indicador Saved Draft.](/images/writing-workspace.png)](/images/writing-workspace.png)

*Exemplo de artigo salvo como rascunho no espaço de escrita.*

Escolha **Salvar versão** para guardar o *rascunho* atual como um ponto nomeado no histórico. Salvar uma *versão salva* não remove as *versões salvas* anteriores. Se o texto local e um *rascunho* salvo deixarem de corresponder, consulte [Revisar artigos](reviewing-articles.md#recover-a-draft).

## Encontrar e organizar artigos

Use a busca da biblioteca para encontrar *artigos*, inclusive os arquivados. Escolha **Artigos** para consultar trabalhos fixados e recentes ou **Arquivar** para ver grupos de *artigos* arquivados. A Navigation Rail recolhida oferece atalhos para **Novo artigo**, **Search**, **Artigos** e **Arquivar**. No menu da biblioteca, fixe um *artigo* original para manter um atalho na Navigation Rail. Use **Subir** ou **Mover para baixo** para reordenar os *artigos* fixados. Fixar e reordenar não altera o conteúdo do *artigo*. Use o campo do título para renomeá-lo.

Escolha **Arquivar artigo** para remover um grupo de *artigos* da lista ativa e mantê-lo em **Arquivar**. Selecione o grupo arquivado e escolha **Desarquivar artigo** para recuperá-lo. Excluir um *artigo* exige confirmação e remove suas *versões salvas* e os *rascunhos* recuperáveis. Excluir um artigo de origem também exclui as *traduções* vinculadas; excluir uma *tradução* mantém o artigo de origem. Se quiser apenas deixá-lo de lado, arquive-o.

## Usar assistência ortográfica

O editor marca possíveis erros de ortografia usando o suporte do seu dispositivo. No aplicativo desktop, clique com o botão direito em uma palavra marcada para escolher uma substituição sugerida ou **Adicionar ao dicionário**. A substituição é uma edição comum: pode ser desfeita e passa a fazer parte do *rascunho* atual. A verificação ortográfica acontece no dispositivo e não envia texto do *artigo* a um provedor de IA.

Em **Configurações** → **Ortografia** no desktop, use **Filtrar idiomas** para encontrar um idioma, selecione-o em **Prepare-se para escrever offline** e escolha **Baixar dicionários**. Aguarde o estado **Baixado** antes de depender do dicionário sem conexão. **Disponível** significa que há suporte para o idioma, não que o download do dicionário terminou. Escolha **Descarregar** para parar de usar um dicionário preparado nesta sessão. Preparar dicionários não altera o idioma do *artigo*. Os downloads precisam de acesso à internet. No Windows, adicionar ou remover palavras pessoais também altera o dicionário do sistema operacional e pode afetar outros aplicativos.

Em **Dicionário pessoal**, procure palavras salvas ou informe uma palavra ou termo técnico por linha em **Palavras para adicionar** e escolha **Adicionar palavras**. Você pode adicionar até 500 palavras por vez. Remova palavras salvas para que a assistência ortográfica volte a sinalizá-las. A lista é compartilhada entre *artigos* e idiomas. O aplicativo web usa as configurações de ortografia do navegador e não oferece gerenciamento de dicionários.

Use **Modo de foco** para ocultar os dois painéis de apoio enquanto escreve. Selecione-o novamente para exibi-los. Use o controle de recolher de cada painel para fechá-lo ou reabri-lo; arraste o divisor ao lado de um painel para redimensioná-lo. Em uma janela estreita, os painéis podem abrir temporariamente sobre o editor.

Com o teclado, use **Tab** e **Shift + Tab** para percorrer a biblioteca, o cabeçalho do artigo, as visualizações, a barra de formatação, o editor, a barra de status e o assistente. No editor, na busca e no Composer, os atalhos usuais de edição de texto continuam funcionando. Settings tem navegação própria pelo teclado. Na barra lateral do desktop, use **Up**, **Down**, **Home** ou **End** para percorrer as seções e depois **Digitar** ou **Space** para abrir uma delas.

Para transferir um *artigo* inteiro de ou para o Warplyn, consulte [Arquivos de artigos](article-files.md). Para fazer cópias de segurança do espaço de trabalho inteiro, consulte [Cópias de segurança e recuperação](backups-and-recovery.md).
