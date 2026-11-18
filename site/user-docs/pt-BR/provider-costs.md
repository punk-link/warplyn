---
description: "Entenda o que afeta os custos das solicitações de IA no Warplyn, como funciona a cobrança pela API e como consultar as tarifas de uso do seu provedor."
---

# Custos dos provedores de IA

O uso do assistente de IA é opcional. O Warplyn não cobra pelas solicitações. Seu provedor de IA pode cobrar da sua conta quando o Warplyn envia uma solicitação.

## O que afeta o custo

Cada provedor define suas próprias tarifas. O custo de uma solicitação pode depender de:

- o provedor e o modelo escolhidos
- a quantidade de texto do *artigo* e de instruções incluída na solicitação
- a quantidade de texto retornada pelo modelo

O texto próximo pode ajudar a interpretar uma seleção curta, mas isso implica enviar parte do texto não selecionado. Solicitações com seleção que precisam de texto do *artigo* enviam a passagem selecionada e até 500 caracteres antes e 500 depois como contexto somente para leitura, no máximo 1.000 caracteres adicionais. Apenas a seleção pode ser editada. Sem uma seleção, a solicitação pode incluir o *artigo* inteiro e o contexto relevante. Uma solicitação mais específica pode custar menos, dependendo das tarifas do provedor.

::: tip Cobrança pela API
Uma assinatura do serviço de chat de um provedor talvez não inclua o uso da API. Antes de conectar uma chave, confira os preços atuais da API e as condições de cobrança do provedor.
:::

Para tarefas rotineiras, como aprimorar a fluidez de uma passagem ou fazer uma revisão focada, experimente primeiro um modelo mais econômico. Use um modelo mais caro quando os resultados mostrarem que a tarefa precisa dele.

## Conferir seu uso

Consulte uso, cobranças, alertas e limites de gastos na conta do seu provedor. O Warplyn não mostra a fatura do provedor nem impõe limites de gastos. Entre em contato com o provedor para tratar de cobranças, reembolsos ou tarifas da conta.

O modelo usado em uma solicitação afeta seu custo. Em **Configurações** → **Assistente de IA**, escolha um **Modelo padrão**, um **Modelo de aplicativo** e modelos para tarefas específicas. Consulte [Provedores e modelos de IA](providers.md) para configurá-los.

::: tip Você pode trabalhar sem IA
É possível escrever e gerenciar *artigos* sem uma conexão de IA. Editar, salvar *versões* e usar cópias de segurança locais não envia solicitações de IA.
:::
