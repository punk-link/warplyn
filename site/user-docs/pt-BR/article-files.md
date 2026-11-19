---
description: "Salve ou carregue artigos inteiros como arquivos Markdown, HTML, DOCX ou RTF."
---

# Arquivos de artigos

Use **Salvar em arquivo** e **Carregar do arquivo** para transferir artigos inteiros entre o Warplyn e outros editores. Essas ações estão disponíveis no aplicativo desktop e no aplicativo web.

## Salvar em um arquivo

1. Abra o *artigo* que deseja salvar.
2. Escolha **Salvar em arquivo** ao lado de **Salvar versão** no cabeçalho do artigo. Você também pode clicar com o botão direito em um *artigo* na biblioteca e escolher **Salvar em arquivo…** sem abri-lo.
3. Na janela para salvar o arquivo do aplicativo desktop, selecione Markdown, HTML, DOCX ou RTF na lista de tipos de arquivo; depois escolha um nome e um local para o arquivo. Mantenha a extensão correspondente. No aplicativo web, escolha **Formato de arquivo**, depois **Download**, e use os controles de download do navegador.

O arquivo contém o *rascunho* atual inteiro, incluindo edições ainda não salvas. Selecionar texto não limita o que será salvo. Essa ação não cria uma *versão salva*. **Salvar versão** continua sendo a ação que adiciona o *rascunho* atual ao histórico.

::: tip Precisa de uma cópia portátil do seu espaço de trabalho?
Os arquivos de *artigo* contêm apenas o texto. Para preservar o histórico, o trabalho do assistente, as *habilidades* e as configurações, crie uma [cópia de segurança](backups-and-recovery.md).
:::

O aplicativo web informa **O download do artigo foi iniciado** quando envia o arquivo ao navegador. Abra a lista de downloads do navegador para ver se o arquivo foi baixado ou se houve algum erro.

## Carregar de um arquivo

1. Escolha **Carregar do arquivo** ao lado de **Salvar versão** no cabeçalho do artigo, ou clique com o botão direito em um *artigo* na biblioteca e escolha **Carregar do arquivo…**. Se a biblioteca estiver vazia, escolha **Criar** primeiro.
2. Selecione um arquivo `.md`, `.html`, `.htm`, `.docx` ou `.rtf`.
3. Para HTML, DOCX e RTF, marque **Revise o artigo importado** e escolha **Importar**. Você pode cancelar a revisão. Arquivos Markdown são abertos diretamente.
4. O Warplyn abre o texto importado como um *artigo* separado. O *artigo* anterior e seu *rascunho* recuperável continuam disponíveis na biblioteca.

Se o arquivo começar com um título de primeiro nível, o Warplyn vai usá-lo como título do novo *artigo*. Caso contrário, o Warplyn usa o nome do arquivo sem a extensão. O título também permanece no corpo do *artigo*. Carregar o mesmo arquivo novamente cria outro *artigo* independente.

::: warning A importação cria um artigo separado
Carregar um arquivo não substitui o *artigo* que estava selecionado quando você abriu o seletor de arquivos. Revise o *artigo* importado e, se necessário, mova ou exclua qualquer um dos artigos.
:::

Escolha um arquivo de no máximo 10 MiB. Arquivos Markdown e HTML devem usar UTF-8. DOCX e RTF funcionam sem o Microsoft Office instalado.

Quando o formato de origem permitir, o Warplyn preserva parágrafos, títulos, listas aninhadas editáveis e numeração, negrito, itálico, tachado, links seguros, citações, código e texto Unicode. A diagramação de páginas, fontes, imagens, objetos incorporados e recursos complexos específicos de cada formato podem ser omitidos ou simplificados. O texto das tabelas é incorporado ao corpo do *artigo*. Confira a prévia da importação antes de continuar. Extensões Markdown sem suporte também podem perder a formatação no editor.

Você pode cancelar o seletor de arquivos sem importar nada. Se não for possível salvar seu *rascunho* atual para recuperação, corrija o erro de salvamento e tente carregar o arquivo novamente.

## Salvar uma versão salva em arquivo

1. Abra **Versões**.
2. Abra a *versão salva* que deseja exportar.
3. Escolha **Salvar em arquivo** ao lado dos detalhes da versão.

O arquivo contém o *artigo* inteiro daquela *versão salva*, independentemente do *rascunho* atual. Exportar não restaura a *versão salva* nem altera o histórico. O nome de arquivo sugerido inclui o número da *versão salva*.

A exportação de arquivos também tem um limite de 10 MiB. Se o salvamento no desktop falhar, escolha um local onde você possa gravar e tente novamente. Se houver um erro ao substituir um arquivo, ele permanece intacto.

Os arquivos exportados contêm o texto do *artigo*, não o histórico completo, as conversas ou as configurações. Use [Cópias de segurança e recuperação](backups-and-recovery.md) para proteger o espaço de trabalho inteiro.
