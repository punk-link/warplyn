---
description: "Revise um artigo com IA no Warplyn: direcione a solicitação, compare as edições propostas, aplique as alterações escolhidas e mantenha versões salvas anteriores disponíveis."
---

# Revisar um artigo com IA e conferir cada alteração

Quando os acontecimentos de uma cena funcionam, mas a leitura perde o ritmo, o assistente editorial do Warplyn pode ajudar na revisão. Trabalhe em uma passagem ou em um *artigo* inteiro, compare o texto proposto e aplique as alterações que quiser manter.

O Warplyn é um espaço de escrita de código aberto e local, para Windows e Linux. Seus textos permanecem no computador. Para usar o assistente de IA, conecte-se à internet e configure um provedor compatível com sua chave de API. O Warplyn envia ao provedor o texto e o contexto necessários para a solicitação, conforme os preços e as políticas de dados do provedor.

Guarde orientações recorrentes em uma [nota editorial](writing-and-articles.md#editor-notes) junto ao trecho. Confira **Notas que acompanham esta solicitação** antes de enviar. Salvar uma nota não inicia uma solicitação.

## Começar com um pedido específico

Abra seu *artigo* e selecione a passagem que deseja revisar. No campo de mensagem, descreva o que deve melhorar e o que precisa ser mantido. Por exemplo, ao trabalhar em A correnteza ao entardecer:

> Melhore o ritmo, mantendo o ponto de vista da Ana e o clima tranquilo. Não acrescente acontecimentos.

Selecione **Enviar solicitação editorial**. O Warplyn envia a seleção com até 500 caracteres de cada lado como contexto somente para leitura. Apenas a passagem selecionada pode ser substituída. Antes de enviar um texto confidencial, leia no campo de mensagem quais trechos serão enviados. Para mais detalhes, consulte [Assistente editorial](editorial-assistant.md).

[![campo de mensagem do Warplyn com uma solicitação de revisão de ficção.](/images/editorial-assistant-example.png)](/images/editorial-assistant-example.png)

*Exemplo de solicitação no campo de mensagem. A captura de tela mostra o nome antigo de uma habilidade.*

## Comparar o texto original e o proposto

Quando o assistente concluir a revisão, abra **Revisão da proposta** pelo cartão de resultado. Compare **Original** e **Proposto** e confira se a revisão preserva os acontecimentos da cena, o ponto de vista e a voz.

[![Revisão da proposta comparando os textos Original e Proposto, com decisões individuais e Aplicar.](/images/proposal-review.png)](/images/proposal-review.png)

*Exemplo de revisão de A correnteza ao entardecer. O texto gerado varia conforme a solicitação e o modelo.*

Escolha **Aceitar** ou **Rejeitar** para cada alteração. Você pode editar o texto **Proposto** antes de aplicá-lo. Se o Warplyn não puder dividir uma *proposta* com segurança, ele explicará que será necessário revisá-la por inteiro.

## Aplicar as alterações e manter o histórico

Depois de aceitar ou rejeitar cada alteração, escolha **Aplicar**. O texto aceito cria uma nova *versão salva*. Rejeitar todas as alterações mantém o *artigo* inalterado e não cria nenhuma *versão salva*. As decisões, por si só, não alteram seu texto.

Abra **Histórico de versões salvas** para consultar versões salvas anteriores. Restaurar uma delas adiciona outra *versão salva* e preserva o histórico intermediário. Consulte [Revisar artigos](reviewing-articles.md) para ver as opções de recuperação e as *propostas* desatualizadas.

Revisões com IA podem não captar sua intenção ou alterar detalhes que você queria preservar. Confira o resultado antes de aplicá-lo; se necessário, faça outra solicitação mais específica. Uma solicitação cancelada ou com falha não altera o *artigo*.

## Experimente com seus textos

[Baixe o Warplyn](https://github.com/punk-link/warplyn/releases/latest), siga o [guia de instalação](installation.md) e conecte um [provedor de IA](providers.md) compatível. Os instaladores para Windows não têm assinatura digital; o guia de instalação explica o aviso que você poderá ver.
