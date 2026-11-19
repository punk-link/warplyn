---
description: "Crie e gerencie habilidades reutilizáveis para suas tarefas de escrita e consulte as versões salvas delas."
---

# Criar e gerenciar habilidades

*Habilidades* são pacotes locais de instruções em Markdown. Elas orientam o assistente sobre quais capacidades editoriais usar e em que ordem. Não concedem permissões nem alteram um *artigo*.

## Criar e gerenciar suas próprias habilidades

Peça ao assistente que crie uma *habilidade* reutilizável com suas próprias palavras. Explique a tarefa recorrente e as regras ou referências necessárias. Se faltar um detalhe que possa mudar a *habilidade*, o assistente fará uma pergunta breve em vez de tentar adivinhar.

::: tip Exemplo
Para revisar ficção no estilo de uma cena tranquila à beira do rio, peça: “Crie uma *habilidade* chamada ‘Revisão de linha para ficção tranquila’. Torne as frases da Ana mais concisas, preservando a voz dela, o cenário do rio e os acontecimentos da cena. Não acrescente detalhes; sinalize as passagens pouco claras.” O assistente poderá reutilizar essas instruções sempre que você solicitar uma revisão de linha.
:::

[![Assistente editorial do Warplyn com uma solicitação para criar uma habilidade de revisão de linha de ficção e o Criador de habilidades selecionado.](/images/skill-creator-example.png)](/images/skill-creator-example.png)

*Exemplo de solicitação para criar uma habilidade no campo de mensagem. Conecte um provedor antes de enviá-la.*

Assim que for criada, a *habilidade* fica disponível para novas solicitações ao assistente. A solicitação de criação não envia o corpo do seu *artigo* ao modelo nem altera o *artigo*, o *rascunho*, a *proposta* ou a *versão salva*.

Cada *habilidade* criada tem seu próprio histórico local e imutável de *revisões da habilidade*, separado do histórico de versões salvas do *artigo*. Você também pode editar o pacote Markdown local diretamente. O Warplyn atualiza o catálogo para a próxima solicitação. Remover o arquivo `SKILL.md` faz a *habilidade* deixar de aparecer na lista de *habilidades* disponíveis.

Peça ao assistente que revise ou exclua uma *habilidade* pelo nome. Antes de alterá-la, ele lê o pacote atual e verifica se o arquivo mudou nesse meio-tempo. A revisão mantém o ID da *habilidade* e adiciona uma nova *revisão da habilidade*. A exclusão remove a *habilidade* de novas solicitações, mas mantém o histórico.

Para restaurar instruções anteriores, peça para ver as *revisões* daquela *habilidade* e indique qual deseja restaurar. A restauração grava uma nova versão ativa e acrescenta outra *revisão da habilidade*. Você também pode restaurar dessa forma uma *habilidade* excluída. Restaurar um ponto de verificação de conversa do assistente não restaura nem altera nenhuma *habilidade*; para restaurar a *habilidade*, faça um pedido separado.
