---
description: "Entenda o que afeta os custos das solicitações de IA no Warplyn, como funciona a cobrança pela API e como consultar as tarifas de uso do seu provedor."
---

# Custos dos provedores de IA

O uso do assistente de IA é opcional. O Warplyn não cobra pelas solicitações. Seu provedor de IA pode cobrar pelo uso da API quando o Warplyn envia uma solicitação.

## O que afeta o custo

Cada provedor define suas próprias tarifas. O custo de uma solicitação pode variar conforme estes fatores:

- o provedor e o modelo escolhidos
- quanto texto do *artigo* e quantas instruções a solicitação inclui
- a quantidade de texto retornada pelo modelo

O texto ao redor de uma seleção curta pode ajudar o modelo a entender a passagem. Quando uma solicitação exige texto do *artigo* e você seleciona uma passagem, o Warplyn envia a seleção e pode incluir até 500 caracteres antes e até 500 depois. São no máximo 1.000 caracteres adicionais, usados apenas como contexto. Apenas a seleção pode ser editada. Sem uma seleção, a solicitação pode incluir o *artigo* inteiro e o contexto relevante. Uma solicitação mais específica pode custar menos, dependendo das tarifas do provedor.

::: tip Cobrança pela API
Uma assinatura do serviço de chat de um provedor talvez não inclua o uso da API. Antes de conectar uma chave, confira os preços atuais da API e as condições de cobrança do provedor.
:::

Para tarefas rotineiras, como aprimorar a fluidez de uma passagem ou revisar um ponto específico, experimente primeiro um modelo mais econômico. Use um modelo mais caro quando os resultados mostrarem que a tarefa precisa dele.

## Conferir seu uso

Na conta do seu provedor, você pode acompanhar o uso e as cobranças e consultar alertas e limites de gastos. O Warplyn não mostra a fatura do provedor nem impõe limites de gastos. Entre em contato com o provedor para tratar de cobranças, reembolsos ou tarifas da conta.

O modelo usado em uma solicitação afeta seu custo. Em **Configurações** → **Assistente de IA**, escolha um **Modelo padrão**, um **Modelo de aplicativo** e modelos para tarefas específicas. Consulte [Provedores e modelos de IA](providers.md) para configurá-los.

::: tip Você pode trabalhar sem IA
É possível escrever e gerenciar *artigos* sem uma conexão de IA. Editar, salvar *versões* e usar cópias de segurança locais não envia solicitações de IA.
:::
