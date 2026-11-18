---
description: "Conecte um provedor de IA ao Warplyn, armazene sua chave de API, escolha modelos e entenda as verificações de conexão e os recursos compatíveis."
---

# Provedores e modelos de IA

O Warplyn envia solicitações de IA ao provedor configurado em **Configurações** → **Assistente de IA**. Você precisa de uma conta e de uma chave de API desse provedor. Ele poderá cobrar pelo uso da API.

## Adicionar uma conexão

No aplicativo desktop, abra **Configurações** → **Assistente de IA**. Em **Como você gostaria de fornecer sua chave?**, escolha **Adicione uma chave de API** ou **Variável de ambiente**.

- **Adicione uma chave de API:** escolha um provedor, dê um nome à conexão e informe a chave. O Warplyn a armazena no Windows Credential Manager ou no Secret Service do Linux. A chave não será exibida novamente nem será armazenada no banco de dados ou nas cópias de segurança do Warplyn.
- **Variável de ambiente:** escolha um provedor, dê um nome à conexão e informe o nome da variável que contém sua chave. O Warplyn armazena o nome, não o valor. O serviço do aplicativo precisa iniciar com essa variável definida.

::: tip Sobre credenciais
Chaves de API gerenciadas precisam do aplicativo desktop e de um serviço de credenciais disponível no sistema operacional. No Linux, o Secret Service precisa estar desbloqueado. O aplicativo web aceita conexões por variável de ambiente, mas não gerencia credenciais do sistema operacional. O instalador não cria nem importa um arquivo `.env`.
:::

Ao adicionar uma conexão com chave de API, o Warplyn verifica a chave com o provedor. Ao adicionar uma conexão por variável de ambiente, ele apenas salva as configurações. O Warplyn volta a contatar o provedor quando você atualiza a lista de modelos ou envia uma solicitação de IA. Essas verificações não incluem conteúdo de *artigos*.

As conexões aparecem em **Configurações** → **Assistente de IA**. Use **Ativo**, **Ativar** ou **Desativar** para escolher quais conexões o Warplyn pode usar em novas solicitações. Escolha **Renomear** para alterar o nome de exibição local de uma conexão, ou **Remover** e confirme para removê-la do Warplyn. Remover uma conexão por variável de ambiente não apaga a variável nem sua chave.

::: tip Se a atualização dos modelos falhar
Confira se a conexão está **Ativo**, se a chave salva é válida ou se a variável de ambiente está disponível para o serviço do aplicativo, e se a conta do provedor pode acessar a API.
:::

## Escolher provedores e modelos

O Warplyn oferece suporte a OpenAI, OpenCode Zen, Anthropic, Google Gemini API, xAI Grok e DeepSeek. O OpenCode Zen também oferece modelos de outros fornecedores no catálogo.

Em **Configurações** → **Assistente de IA**, selecione **Atualizar modelos** e escolha um **Modelo padrão**. Para usar outro modelo em uma *habilidade* específica, escolha-o em **Modelos para tarefas específicas**. Uma tarefa definida como **Usar modelo padrão** usa o modelo padrão.

Atualize a lista de modelos depois de alterar conexões ou quando quiser consultar o catálogo atual do provedor. Use **Pesquisar modelos**, **Filtrar modelos por fornecedor** e **Favoritos** para restringir a lista. As escolhas de modelo valem para solicitações futuras. Use **Nível de raciocínio** quando essa opção aparecer para um modelo OpenAI selecionado; configurações mais altas podem demorar mais. O **Modelo de aplicativo**, opcional, nas configurações de IA é separado do modelo padrão e cuida de tarefas auxiliares do Warplyn, como resumos e títulos.

::: tip Disponibilidade dos modelos
As operações editoriais disponíveis variam conforme o modelo. Alguns modelos não oferecem conferência de fatos com fontes, saída estruturada ou controles de raciocínio. Os modelos do OpenCode Zen dependem dos recursos e da disponibilidade do catálogo.
:::

[![Configurações do assistente de IA mostrando conexões configuradas, opções para fornecer a chave e controles de modelos.](/images/ai-providers-and-models.png)](/images/ai-providers-and-models.png)

*Configurações do assistente de IA com conexões de provedores e controles de modelos.*

### Modelo de aplicativo

O **Modelo de aplicativo** cuida de tarefas auxiliares curtas, como resumos de *propostas*, títulos e a interpretação da intenção de uma solicitação ao assistente. Se você não o definir, o Warplyn usará o modelo padrão.

Escolha um modelo de texto eficiente e mais econômico. O **GPT-6 Luna** é uma opção da OpenAI para essas tarefas focadas ([detalhes do modelo](https://developers.openai.com/api/docs/models/gpt-6-luna)). Com outro provedor, escolha um modelo equivalente. Se os resultados não forem satisfatórios, experimente um modelo mais capaz.
