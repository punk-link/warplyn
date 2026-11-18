---
description: "Entenda artigos, rascunhos, versões salvas, propostas, apontamentos e habilidades do Warplyn com definições usadas em todo o espaço de escrita."
---

# Glossário do Warplyn

Estes termos descrevem conceitos visíveis para autores e a linguagem de domínio usada em todo o Warplyn.

## Artigos e versões

- **Article**: uma unidade independente e recuperável de trabalho editorial. O Warplyn usa “Article” em vez de “document”.
- **Biblioteca de artigos**: coleção local de *artigos* do autor. O **current Article** está aberto no espaço de trabalho; a **Article list** apresenta a coleção.
- **Draft**: texto do *artigo* que está sendo editado, mas ainda não foi salvo como *versão salva*.
- **Draft checkpoint**: estado recuperável e editável do *rascunho*, salvo localmente e vinculado a uma *versão salva* de referência. Não é uma *versão salva*. O **Current Draft** se baseia na *versão salva* atual do *artigo*; um **stale Draft** se baseia em uma *versão salva* anterior.
- **Versão salva**: cópia imutável e salva de um *artigo*.
- **Revision promotion**: ação explícita do autor para salvar o *rascunho* atual como uma nova *versão salva*. Ela limpa apenas o ponto de verificação correspondente do *rascunho*.
- **Proposal**: conteúdo ou alterações gerados por IA que precisam da aprovação explícita do autor.
- **Proposal base Revision**: *versão salva* revisada para produzir uma *proposta*. A *proposta* fica desatualizada quando deixa de corresponder à *versão salva* atual.
- **Change selection**: parte de uma *proposta* que o autor decide aceitar. A aceitação cria uma nova *versão salva*.
- **Finding**: resultado consultivo, como um apontamento da conferência de fatos ou da avaliação de estilo, que não altera um *artigo*.
- **Source Article** e **translation Article**: *artigos* vinculados e recuperáveis de forma independente. Uma tradução nunca é uma *versão salva* do artigo de origem.

## Trabalho editorial

- **Editorial capability**: operação validada do Warplyn que declara qual contexto do *artigo* pode usar, seus pré-requisitos e seu resultado. As Workspace Views e as Assistant Skills podem invocar a mesma capacidade.
- **Skill**: pacote de instruções reutilizável que ajuda o assistente a escolher e ordenar capacidades editoriais para atender a uma solicitação do autor. Uma *habilidade* não concede capacidade nem permissão. Uma **built-in Skill** é incluída no Warplyn. Uma **Author-created Skill** é um pacote Markdown local criado no chat do assistente e tem um histórico próprio de *revisões da habilidade*.
- **Editorial operation**: atividade do assistente solicitada pelo autor, como redigir, aprimorar a fluidez, conferir fatos, avaliar estilo ou traduzir.
- **Editorial request**: uma execução de uma operação editorial.
- **Editorial session**: sequência de interações e histórico de atividade das solicitações editoriais.
- **Orientação editorial**: instruções ou contexto fornecidos pelo autor junto com uma solicitação editorial.
- **Style corpus**: exemplos de escrita locais fornecidos pelo autor. O **style profile** é uma representação compacta derivada desses exemplos.
- **Workflow stage**: orientação opcional de progresso escolhida pelo autor. Ela nunca executa IA nem altera o conteúdo de um *artigo*.

## Publicação e configurações

- **Publishing profile**: orientações configuráveis para uma plataforma, incluindo um limite de caracteres. O perfil padrão se aplica somente a novos *artigos*.
- **Publishing copy**: texto Markdown ou texto simples copiado explicitamente do *artigo* atual pela Article Status Bar. O Warplyn não oferece uma Publishing Preview Workspace View.
- **Application Settings**: preferências do espaço de trabalho, configuração de IA, perfis de publicação e gerenciamento de dados locais. As configurações nunca fazem parte do histórico de versões salvas do *artigo*.
- **AI connection**: configuração nomeada de um provedor no servidor com uma fonte de credenciais. A **active AI connection** é usada em novas solicitações editoriais.
- **Credential source**: fonte privada usada por uma conexão de IA. Pode ser uma referência a variável de ambiente ou uma credencial gerenciada.
- **Credencial gerenciada**: chave de API armazenada no gerenciador de credenciais do sistema operacional. O Warplyn persiste os metadados da conexão, mas nunca grava a chave no SQLite nem em uma cópia de segurança.
- **Model preference**: identificador do modelo padrão ou substituição específica para uma operação editorial.
- **Interface locale**: idioma da interface do Warplyn, separado dos idiomas do *artigo* e das traduções.
- **Idioma padrão do artigo**: idioma atribuído a um novo *artigo* quando nenhum é informado.
- **Idiomas de tradução padrão**: idiomas ordenados que aparecem primeiro nas solicitações de tradução. Eles nunca iniciam traduções automaticamente.
- **Backup destination**: diretório local em que o Warplyn grava cópias de segurança.
- **Backup snapshot**: cópia consistente dos dados locais em determinado momento, separada do banco de dados ativo e sem credenciais.
- **Data location**: diretório local ativo que contém os dados SQLite do Warplyn.
- **Data relocation**: cópia e reinicialização confirmadas pelo autor que transferem o Warplyn para um novo local de dados, mantendo a cópia antiga para recuperação.
- **Recovery snapshot**: cópia de segurança mantida antes que o Warplyn substitua os dados ativos durante uma restauração.
- **Application update**: versão empacotada mais recente do Warplyn que o cliente desktop pode procurar, baixar e aplicar somente por meio de etapas controladas pelo autor. Uma atualização nunca altera o conteúdo de um *artigo* por conta própria.
- **Atualização de segurança**: atualização do aplicativo cuja tag de lançamento termina com o sufixo `.security`. O Warplyn exibe um aviso, mas nunca força uma verificação, um download ou uma reinicialização.
- **Staged update**: atualização do aplicativo baixada, que aguarda o autor escolher **Reinicie e atualize**. Fechar o aplicativo normalmente não a aplica.
- **Pre-update snapshot**: cópia de segurança dos dados locais criada antes que o Warplyn aplique uma atualização preparada. Para restaurá-la, é necessária a versão anterior correspondente do aplicativo.
- **Diagnostics event**: registro local redigido do serviço, gravado nos logs do processo anfitrião para ajudar a diagnosticar a inicialização ou uma falha recuperável. Nunca inclui conteúdo privado de *artigos*, conteúdo de modelos nem valores de variáveis de ambiente.

## Interface

### Mapa do espaço de trabalho

Layout desktop com os dois painéis laterais abertos e o editor de artigos selecionado. Os quadros mostram localização e conteúdo, não os tamanhos exatos.

```text
Editorial Workspace
┌──────────────────────────┬──────────────────────────────┬──────────────────────────┐
│ Article Library Panel    │ Article Workspace            │ Editorial Assistant Panel│
├──────────────────────────┼──────────────────────────────┼──────────────────────────┤
│ Warplyn · New Article    │ Article Header               │ Assistant header         │
│ Collapse control         │ Title and Article metadata   │ Collapse control         │
├──────────────────────────┼──────────────────────────────┼──────────────────────────┤
│ Article search           │ Workspace Tab Bar            │ Conversation             │
├──────────────────────────┼──────────────────────────────┤ Request status           │
│ Article list             │ Workspace View               │ and activity             │
│                          │                              │                          │
│                          │ Article Editor               │                          │
│                          │ ┌──────────────────────────┐ │                          │
│                          │ │ Writing surface          │ │                          │
│                          │ │                          │ │                          │
│                          │ └──────────────────────────┘ │                          │
├──────────────────────────┤                              ├──────────────────────────┤
│ Article Library          │                              │ Quick actions            │
│ utility area             │                              │ Composer                 │
│ Style Profile · Settings ├──────────────────────────────┤ Editorial guidance       │
│ Update, when relevant    │ Article Status Bar           │ and Send                 │
│ Language · Local         │ Save status · Metadata · Copy │                          │
└──────────────────────────┴──────────────────────────────┴──────────────────────────┘
```

No layout aberto, o rodapé na parte inferior do painel Library é a **área de utilitários do painel da Biblioteca de Artigos**. A linha inferior mostra o código do idioma do *artigo* atual e o rótulo **Local**. A **Article Status Bar**, abaixo da visualização central do artigo, mostra o estado de salvamento.

### Termos da interface

- **Editorial Workspace**: tela principal de escrita, que contém o Painel da Biblioteca de Artigos, o Article Workspace e o Painel do Assistente Editorial.
- **Painel da Biblioteca de Artigos**: busca de artigos, lista de artigos e pontos de acesso ao espaço de trabalho. Quando recolhido, torna-se a **Navigation Rail**; em telas pequenas, sua versão temporária é a **Navigation Drawer**.
- **área de utilitários do painel da Biblioteca de Artigos**: rodapé do Painel da Biblioteca de Artigos aberto, com Perfil de estilo, Settings, um controle de atualização quando relevante e o código de idioma do *artigo* atual com o rótulo **Local**.
- **Save-state indicator**: estado na Article Status Bar que mostra se o *rascunho* atual está salvo, sendo salvo ou precisa de atenção.
- **Article Workspace**: Article Header, Workspace Tab Bar, Workspace View selecionada e Article Status Bar.
- **Article Header**: controles do título e dos metadados acima da Workspace Tab Bar.
- **Workspace Tab Bar**: abas usadas para selecionar uma Workspace View.
- **Workspace View**: Article Editor selecionado ou uma visualização de apoio: Revisão da proposta, Histórico de versões salvas, Verificação de fatos ou Translations.
- **Perfil de estilo**: tela separada com características detectadas, *apontamentos* da avaliação de estilo, regras tipográficas, orientações manuais e exemplos de escrita.
- **Article Editor**: visualização de escrita. Sua área principal de edição é a **writing surface**.
- **Article Status Bar**: barra abaixo da Workspace View selecionada, com o estado e os metadados do artigo, seleção de idioma, orientações do perfil de publicação e controles de cópia.
- **Painel do Assistente Editorial**: orientações editoriais, ações, estado da solicitação e atividade. Em telas pequenas, sua versão temporária é a **Assistant Drawer**.
- **Ações rápidas**: menu suspenso acima do Composer do assistente que insere uma habilidade integrada em uma solicitação.
- **Composer**: campo de mensagem na parte inferior do Painel do Assistente Editorial, onde o autor insere orientações editoriais e envia uma solicitação.
- **Application Navegação nas configurações**: navegação entre **Em geral**, **Atalhos de teclas**, **Provedores**, **Assistente de IA**, **Publicação**, **Padrões de idioma**, **Ortografia**, **Dados e backups** e **Sobre Warplyn**.
