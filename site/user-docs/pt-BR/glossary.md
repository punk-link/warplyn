---
description: "Entenda artigos, rascunhos, versões salvas, propostas, apontamentos e habilidades do Warplyn com definições usadas em todo o espaço de escrita."
---

# Glossário do Warplyn

Este glossário explica os termos que aparecem no Warplyn e nos guias de uso.

## Artigos e versões

- **Artigo**: texto em que o autor trabalha e que pode recuperar de forma independente. O Warplyn usa “artigo” em vez de “documento”.
- **Biblioteca de artigos**: coleção local de *artigos* do autor. O **artigo atual** está aberto no espaço de trabalho; a **lista de artigos** apresenta a coleção.
- **Rascunho**: texto do *artigo* que está sendo editado, mas ainda não foi salvo como *versão salva*.
- **Ponto de verificação do rascunho**: estado recuperável e editável do *rascunho*, salvo localmente e vinculado a uma *versão salva* de referência. Não é uma *versão salva*. O **rascunho atual** se baseia na *versão salva* atual do *artigo*; um **rascunho desatualizado** se baseia em uma *versão salva* anterior.
- **Versão salva**: cópia de um *artigo* que fica registrada no histórico e não pode ser alterada.
- **Salvar uma versão**: ação explícita do autor para salvar o *rascunho* atual como uma nova *versão salva*. Ela limpa apenas o ponto de verificação correspondente do *rascunho*.
- **Proposta**: conteúdo ou alterações gerados por IA que precisam da aprovação explícita do autor.
- **Versão de origem da proposta**: *versão salva* revisada para produzir uma *proposta*. A *proposta* fica desatualizada quando deixa de corresponder à *versão salva* atual.
- **Seleção de alterações**: parte de uma *proposta* que o autor decide aceitar. A aceitação cria uma nova *versão salva*.
- **Apontamento**: resultado consultivo, como um apontamento da conferência de fatos ou da avaliação de estilo, que não altera um *artigo*.
- **Artigo de origem** e **artigo traduzido**: *artigos* vinculados e recuperáveis de forma independente. Uma tradução nunca é uma *versão salva* do artigo de origem.

## Trabalho editorial

- **Capacidade editorial**: operação validada do Warplyn que declara qual contexto do *artigo* pode usar, seus pré-requisitos e seu resultado. As visualizações do espaço de trabalho e as *habilidades* do assistente podem invocar a mesma capacidade.
- **Habilidade**: pacote de instruções reutilizável que ajuda o assistente a escolher e ordenar capacidades editoriais para atender a uma solicitação do autor. Uma *habilidade* não concede capacidade nem permissão. Uma **habilidade integrada** vem incluída no Warplyn. Uma **habilidade criada pelo autor** é um pacote Markdown local criado no chat do assistente e tem um histórico próprio de *versões da habilidade*.
- **Operação editorial**: atividade do assistente solicitada pelo autor, como redigir, aprimorar a fluidez, conferir fatos, avaliar estilo ou traduzir.
- **Solicitação editorial**: uma execução de uma operação editorial.
- **Sessão editorial**: sequência de interações e histórico de atividade das solicitações editoriais.
- **Orientação editorial**: instruções ou contexto fornecidos pelo autor junto com uma solicitação editorial.
- **Corpus de estilo**: exemplos de escrita locais fornecidos pelo autor. O **perfil de estilo** resume as características identificadas nesses exemplos.
- **Etapa do fluxo de trabalho**: orientação opcional de progresso escolhida pelo autor. Ela nunca executa IA nem altera o conteúdo de um *artigo*.

## Publicação e configurações

- **Perfil de publicação**: orientações configuráveis para uma plataforma, incluindo um limite de caracteres. O perfil padrão se aplica somente a novos *artigos*.
- **Texto para publicação**: texto Markdown ou texto simples copiado explicitamente do *artigo* atual pela barra de status do artigo. O Warplyn não oferece uma visualização de prévia de publicação no espaço de trabalho.
- **Configurações do aplicativo**: preferências do espaço de trabalho, configuração de IA, perfis de publicação e gerenciamento de dados locais. As configurações nunca fazem parte do histórico de versões salvas do *artigo*.
- **Conexão de IA**: configuração nomeada de um provedor no servidor com uma fonte de credenciais. A **conexão de IA ativa** é usada em novas solicitações editoriais.
- **Fonte de credenciais**: fonte privada usada por uma conexão de IA. Pode ser uma referência a variável de ambiente ou uma credencial gerenciada.
- **Credencial gerenciada**: chave de API armazenada no gerenciador de credenciais do sistema operacional. O Warplyn persiste os metadados da conexão, mas nunca grava a chave no SQLite nem em uma cópia de segurança.
- **Preferência de modelo**: identificador do modelo padrão ou substituição específica para uma operação editorial.
- **Idioma da interface**: idioma da interface do Warplyn, separado dos idiomas do *artigo* e das traduções.
- **Idioma padrão do artigo**: idioma atribuído a um novo *artigo* quando nenhum é informado.
- **Idiomas de tradução padrão**: lista de idiomas que aparecem primeiro, na ordem definida pelo autor nas solicitações de tradução. Eles nunca iniciam traduções automaticamente.
- **Destino da cópia de segurança**: diretório local em que o Warplyn grava cópias de segurança.
- **Cópia de segurança**: cópia consistente dos dados locais em determinado momento, separada do banco de dados ativo e sem credenciais.
- **Local dos dados**: diretório local ativo que contém os dados SQLite do Warplyn.
- **Transferência de dados**: cópia e reinicialização confirmadas pelo autor que transferem o Warplyn para um novo local de dados, mantendo a cópia antiga para recuperação.
- **Instantâneo de recuperação**: cópia de segurança mantida antes que o Warplyn substitua os dados ativos durante uma restauração.
- **Atualização do aplicativo**: versão empacotada mais recente do Warplyn que o cliente desktop pode procurar, baixar e aplicar somente por meio de etapas controladas pelo autor. Uma atualização nunca altera o conteúdo de um *artigo* por conta própria.
- **Atualização de segurança**: atualização do aplicativo cuja tag de lançamento termina com o sufixo `.security`. O Warplyn exibe um aviso, mas nunca força uma verificação, um download ou uma reinicialização.
- **Atualização preparada**: atualização do aplicativo baixada, que aguarda o autor escolher **Reinicie e atualize**. Fechar o aplicativo normalmente não a aplica.
- **Instantâneo pré-atualização**: cópia de segurança dos dados locais criada antes que o Warplyn aplique uma atualização preparada. Para restaurá-la, é necessária a versão anterior correspondente do aplicativo.
- **Evento de diagnóstico**: registro local do serviço com dados sensíveis omitidos, gravado nos logs do processo anfitrião para ajudar a diagnosticar a inicialização ou uma falha recuperável. Nunca inclui conteúdo privado de *artigos*, conteúdo de modelos nem valores de variáveis de ambiente.

## Interface

### Mapa do espaço de trabalho

Layout desktop com os dois painéis laterais abertos e o editor de artigos selecionado. Os quadros mostram localização e conteúdo, não os tamanhos exatos.

```text
Espaço de trabalho editorial
┌──────────────────────────┬──────────────────────────────┬──────────────────────────┐
│ Painel da biblioteca de   │ Espaço de trabalho do       │ Painel do assistente    │
│ artigos                   │ artigo                       │ editorial               │
├──────────────────────────┼──────────────────────────────┼──────────────────────────┤
│ Warplyn · Novo artigo    │ Cabeçalho do artigo          │ Cabeçalho do assistente  │
│ Controle de recolher     │ Título e metadados do artigo │ Controle de recolher    │
├──────────────────────────┼──────────────────────────────┼──────────────────────────┤
│ Busca de artigos         │ Abas do espaço de trabalho  │ Conversa                 │
├──────────────────────────┼──────────────────────────────┤ Status da solicitação    │
│ Lista de artigos         │ Visualização do espaço       │ e atividade              │
│                          │                              │                          │
│                          │ Editor do artigo             │                          │
│                          │ ┌──────────────────────────┐ │                          │
│                          │ │ Área de escrita           │ │                          │
│                          │ │                          │ │                          │
│                          │ └──────────────────────────┘ │                          │
├──────────────────────────┤                              ├──────────────────────────┤
│ Biblioteca de artigos    │                              │ Ações rápidas            │
│ Área de utilitários      │                              │ Campo de mensagem        │
│ Perfil de estilo ·       ├──────────────────────────────┤ Orientações editoriais   │
│ Configurações            │ Barra de status do artigo    │ e Enviar                 │
│ Idioma · Local           │ Salvamento · Metadados · Copiar│                          │
└──────────────────────────┴──────────────────────────────┴──────────────────────────┘
```

No layout aberto, o rodapé na parte inferior do painel da biblioteca é a **área de utilitários do painel da Biblioteca de Artigos**. A linha inferior mostra o código do idioma do *artigo* atual e o rótulo **Local**. A **barra de status do artigo**, abaixo da visualização central, mostra o estado de salvamento.

### Termos da interface

- **Espaço de trabalho editorial**: tela principal de escrita, que contém o Painel da Biblioteca de Artigos, o espaço de trabalho do artigo e o Painel do Assistente Editorial.
- **Painel da Biblioteca de Artigos**: busca de artigos, lista de artigos e pontos de acesso ao espaço de trabalho. Quando recolhido, torna-se a **barra de navegação**; em telas pequenas, sua versão temporária é o **painel lateral de navegação**.
- **Área de utilitários do painel da Biblioteca de Artigos**: rodapé do painel aberto, com Perfil de estilo, Configurações, um controle de atualização quando relevante e o código de idioma do *artigo* atual com o rótulo **Local**.
- **Indicador de estado de salvamento**: estado na barra de status do artigo que mostra se o *rascunho* atual está salvo, sendo salvo ou precisa de atenção.
- **Espaço de trabalho do artigo**: cabeçalho do artigo, abas do espaço de trabalho, visualização selecionada e barra de status do artigo.
- **Cabeçalho do artigo**: controles do título e dos metadados acima das abas do espaço de trabalho.
- **Abas do espaço de trabalho**: abas usadas para selecionar uma visualização do espaço de trabalho.
- **Visualização do espaço de trabalho**: editor do artigo selecionado ou uma visualização de apoio: Revisão da proposta, Histórico de versões salvas, Verificação de fatos ou Traduções.
- **Perfil de estilo**: tela separada com características detectadas, *apontamentos* da avaliação de estilo, regras tipográficas, orientações manuais e exemplos de escrita.
- **Editor do artigo**: visualização de escrita. Sua área principal de edição é a **área de escrita**.
- **Barra de status do artigo**: barra abaixo da visualização selecionada, com o estado e os metadados do artigo, seleção de idioma, orientações do perfil de publicação e controles de cópia.
- **Painel do Assistente Editorial**: orientações editoriais, ações, estado da solicitação e atividade. Em telas pequenas, sua versão temporária é a **gaveta do assistente**.
- **Ações rápidas**: menu suspenso acima do campo de mensagem do assistente que insere uma habilidade integrada em uma solicitação.
- **Campo de mensagem do assistente**: campo na parte inferior do Painel do Assistente Editorial, onde o autor insere orientações editoriais e envia uma solicitação.
- **Navegação pelas configurações do aplicativo**: navegação entre **Em geral**, **Atalhos de teclas**, **Provedores**, **Assistente de IA**, **Publicação**, **Padrões de idioma**, **Ortografia**, **Dados e backups** e **Sobre Warplyn**.
