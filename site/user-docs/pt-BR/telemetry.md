---
description: "Saiba quais dados de diagnóstico e uso o Warplyn compartilha, o que permanece privado e como desativar o compartilhamento em Configurações."
---

# Compartilhar dados de diagnóstico e uso

Os aplicativos empacotados do Warplyn para Windows e Linux enviam eventos pseudônimos de confiabilidade e uso ao PostHog Cloud nos Estados Unidos (Virgínia) quando você ativa o compartilhamento. Por padrão, ele fica desativado. Ative-o para nos ajudar a entender sua experiência e melhorar o Warplyn. Você pode alterar sua escolha em **Configurações** → **Em geral** → **Privacidade e diagnóstico**.

Desativar o compartilhamento interrompe a coleta futura e apaga eventos na fila e o ID de telemetria local. Se você ativá-lo novamente, um novo ID será criado. A desativação não recupera eventos já enviados.

Os eventos pendentes ficam no perfil local do aplicativo para que o Warplyn possa tentar enviá-los novamente quando a conexão voltar. Eventos com mais de 24 horas são descartados na próxima verificação da fila pelo aplicativo. Desativar o compartilhamento remove a fila.

[![Configurações de privacidade e diagnóstico mostrando o controle de compartilhamento e os controles do ID de telemetria, com o ID oculto.](/images/diagnostic-and-usage-data.png)](/images/diagnostic-and-usage-data.png)

*Configurações de privacidade e diagnóstico no aplicativo desktop.*

## Dados coletados pelo Warplyn

Os eventos abrangem:

- verificações de conexão concluídas ou com falha, sem nomes de conexão nem detalhes do provedor
- inicializações do aplicativo e categorias seguras de falha na inicialização, no renderer ou em processos filhos
- operações e etapas de IA concluídas, com falha ou canceladas, incluindo a categoria da falha e o status HTTP quando disponível
- revisões explícitas de *propostas* e pontos de verificação de *rascunhos* agregados
- resultados de cópias de segurança e recuperações

Os eventos não incluem texto de *artigos*, instruções, respostas de IA nem chaves de API.

::: details Outros campos dos eventos
Cada evento inclui uma origem de análise do desktop, versão do esquema, versão do aplicativo, plataforma, arquitetura, versão do sistema operacional e data e hora. Os campos específicos do evento se limitam a categorias conhecidas, contadores não negativos ou durações limitadas.

Os eventos de operações e etapas de IA podem incluir um ID aleatório que relaciona eventos da mesma operação. Esse ID é separado dos IDs de artigos e solicitações.

Os eventos não incluem IDs ou títulos de *artigos* ou *versões salvas*, valores de variáveis de ambiente, caminhos de arquivos, URLs, erros brutos, detalhes de encerramento de processos nem corpos de solicitações e respostas.
:::

## Solicitar exclusão

Para solicitar acesso, correção ou outro atendimento relacionado à privacidade, consulte [Solicitações de dados](data-request.md).

1. Em **Configurações** → **Em geral** → **Privacidade e diagnóstico**, selecione **Copiar ID**.
2. Envie o ID para [kirill.taran@punk.link](mailto:kirill.taran@punk.link) e solicite a exclusão.
3. Desative **Compartilhe dados de diagnóstico e uso**.

Copie o ID antes de desativar o compartilhamento. A desativação apaga o ID do dispositivo. O responsável pelo projeto exclui o registro pseudônimo correspondente e confirma por e-mail.

## Análise de uso do site {#website-analytics}

As páginas iniciais e de planos usam o PostHog para medir visitas, informações de referência e campanhas e cliques em links de download. Os eventos de download do PostHog incluem a localização do botão na página. O Google Analytics também registra um evento `download_clicked` quando alguém abre o link para a versão mais recente na página inicial, na página de planos ou no guia do usuário. Esses cliques não confirmam que houve download ou instalação.

O rastreamento do PostHog no site não usa cookies nem armazenamento do navegador, não cria perfis de pessoas e não registra reproduções de sessões nem atividade geral de cliques. O PostHog estima visitantes usando um hash gerado pelo servidor. Os eventos do site são separados dos IDs de telemetria do desktop, e a opção de compartilhamento no desktop não controla o rastreamento do site.

As páginas iniciais e o guia do usuário também usam o Google Analytics, que pode usar cookies para medir visitas e fontes de tráfego. O Google Analytics e o rastreamento do PostHog são desativados quando o navegador envia Do Not Track ou Global Privacy Control. O comportamento sem cookies descrito acima se aplica ao PostHog.
