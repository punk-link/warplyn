---
description: "Defina a aparência do Warplyn, os padrões de escrita, o comportamento do assistente, as orientações para publicação e as preferências de atualização no desktop."
---

# Configurações do aplicativo

As configurações do aplicativo controlam a aparência e o comportamento do Warplyn. Elas não fazem parte do histórico de *revisões* de um *artigo*. Abra **Configurações** na **área de utilitários do painel da Biblioteca de Artigos**. Algumas configurações estão disponíveis apenas no desktop e são identificadas abaixo.

## Definir aparência e idioma

Em **Em geral** → **Aparência e idioma**, escolha **Sistema**, **Claro** ou **Escuro** em **Aparência preferida**. **Sistema** segue as configurações do seu dispositivo e acompanha mudanças mesmo com o Warplyn aberto. Escolha um **Idioma da interface** para menus e mensagens. No momento, o inglês é o único idioma de interface totalmente traduzido. Essas opções não alteram o idioma de escrita nem as regras tipográficas de um *artigo*.

Em **Data e hora**, escolha um formato de data, o formato de horário de 12 ou 24 horas e um fuso horário. As opções do sistema seguem as configurações do seu dispositivo. Essas escolhas afetam apenas a exibição dos horários. Os valores salvos permanecem os mesmos.

## Definir padrões de escrita

Em **Padrões de idioma**, defina **Idioma padrão do artigo** para novos *artigos*. Configure **Idiomas de tradução padrão** para que esses idiomas apareçam primeiro quando você solicitar uma *tradução*. Digite o nome de um idioma, uma variante regional ou um código e escolha **Adicionar**. O Warplyn ainda pede que você confirme cada solicitação de tradução.

## Definir o comportamento do assistente

Em **Assistente de IA**, escolha **Propor edições para revisão** como padrão para novas conversas sobre *artigos*, ou opte por **Aplicar edições diretamente** para edições solicitadas explicitamente. Esse padrão não altera conversas existentes, e outros resultados gerados ainda precisam ser revisados.

**Solicitar limite de tempo** se aplica a cada nova solicitação e tentativa. O padrão é de dois minutos. Escolha um limite maior ou **Ilimitado** para uma tarefa que precise de mais tempo. Uma solicitação que excede o limite não altera seu *artigo*.

Escolha **Digitar** ou **Ctrl + Enter** como tecla para enviar mensagens ao assistente. Você pode alterar outros atalhos do aplicativo em **Atalhos de teclas**. O Warplyn identifica conflitos antes de salvar um atalho.

## Definir orientações para publicação

Em **Publicação**, escolha um perfil padrão para novos *artigos*. Perfis como **Postagem no LinkedIn** e **Artigo do LinkedIn** mostram orientações de contagem de caracteres na barra de status do artigo. Você também pode escolher **Sem restrições** ou adicionar um perfil personalizado com um nome e um limite de caracteres em número inteiro. O padrão vale para novos *artigos*; um *artigo* existente pode manter seu próprio perfil. Os limites são apenas orientações e nunca impedem a cópia. Na barra de status do artigo, escolha **Copiar Markdown** ou abra o menu e escolha **Copiar texto simples**. O Warplyn copia o texto quando você solicita; ele não publica diretamente.

## Revisar opções de modelos de IA

Em **Assistente de IA**, você pode manter várias conexões com provedores, ativar apenas as que quiser usar e atribuir modelos diferentes ao trabalho geral do assistente e a *habilidades* específicas. O **Modelo padrão** é usado nas tarefas de IA, a menos que uma tarefa tenha uma opção própria. O **Modelo de aplicativo**, opcional, cuida de tarefas do Warplyn, como resumos e títulos; quando não é definido, ele segue o modelo padrão. Use **Favoritos**, a busca ou o filtro de fornecedor para encontrar um modelo. **Nível de raciocínio** aparece para modelos OpenAI compatíveis. As tarefas e os controles disponíveis dependem do modelo. Consulte [Provedores e modelos de IA](providers.md) para ver como configurar conexões e conhecer os limites dos provedores.

Em **Atalhos de teclas**, escolha um atalho ao lado de uma ação e pressione a combinação de teclas desejada. Você pode definir atalhos para salvar uma *versão salva*, alternar entre visualizações ou ativar o modo Focus. O Warplyn informa qual ação já usa um atalho em conflito; escolha outra combinação. **Enviar com** define se **Digitar** ou **Ctrl + Enter** envia uma solicitação ao assistente. Alterar atalhos não modifica o conteúdo do *artigo*.

## Verificar atualizações no desktop

Os aplicativos desktop empacotados podem verificar se há novas versões em **Configurações** → **Sobre Warplyn** → **Atualizações**. Primeiro, ative **Permitir acesso à rede para atualizações**. Isso permite que o Warplyn consulte o GitHub para obter informações públicas sobre versões e as atualizações que você escolher baixar. Em seguida, escolha **Verifique automaticamente se há atualizações** e se deseja **Incluir atualizações de pré-lançamento**. Escolha **Verifique agora** para verificar quando quiser. Se houver uma nova versão, o Warplyn mostra as notas de lançamento. As instalações para Windows e Linux AppImage oferecem as ações **Download** e **Reinicie e atualize**. Nas instalações Debian, use **Ver notas de lançamento** e depois atualize pelo gerenciador de pacotes ou instale um arquivo `.deb` mais recente. Consulte [Recuperação após atualização no desktop](update-recovery.md) se uma atualização impedir que o aplicativo inicie.

## Excluir dados locais

No aplicativo desktop, **Excluir dados locais** remove permanentemente os dados ativos do Warplyn, incluindo *artigos*, *versões salvas*, pontos de verificação de *rascunho*, histórico do assistente, dados de estilo, configurações e cópias de segurança locais armazenadas nessa pasta de dados. Se uma pasta de cópias de segurança estiver configurada, a confirmação oferecerá **Crie um backup antes da exclusão**. O Warplyn precisa concluir essa cópia de segurança antes de excluir qualquer dado. O aplicativo fecha assim que conclui a exclusão. A desinstalação normal não remove seus dados de escrita. Palavras pessoais salvas no dicionário do sistema operacional permanecem lá; remova-as separadamente em **Configurações** → **Ortografia** se também quiser apagá-las.

Abra **Configurações** → **Sobre Warplyn** para encontrar o guia do usuário, o repositório do código-fonte, o rastreador de problemas e a licença. Escolha **Abra o início rápido** para rever a apresentação do aplicativo.
