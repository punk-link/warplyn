---
description: "Crie cópias de segurança automáticas ou manuais do Warplyn, restaure seus textos e habilidades e recupere os dados com segurança quando algo der errado."
---

# Cópias de segurança e recuperação

## Criar uma cópia de segurança

Em **Configurações** → **Dados e backups**, escolha uma **Pasta de backup** e selecione **Criar backup**. Nos navegadores compatíveis, o Warplyn solicita permissão para gravar cópias de segurança apenas nessa pasta.

[![Configurações de dados e cópias de segurança mostrando a pasta, os controles Criar backup e Restaurar um backup e as opções de cópia automática.](/images/backups-and-recovery.png)](/images/backups-and-recovery.png)

*Configurações de dados e cópias de segurança no aplicativo desktop.*

::: tip O que uma cópia de segurança contém
Uma nova cópia `.skladno` inclui o banco de dados, as *habilidades* atuais do autor, o histórico de *revisões da habilidade* e um manifesto de arquivos. Cópias de segurança não incluem arquivos `.env` nem chaves de API.
:::

::: tip Limites de cópias de segurança no navegador
As transferências pelo navegador aceitam arquivos de até 100 MB cada, com um total de 500 MB. Para dados locais maiores, use o aplicativo desktop.
:::

No aplicativo desktop, cada instantâneo do banco de dados tem uma pasta `.sqlite.skills` associada, com as *habilidades* atuais do autor, o histórico de *revisões da habilidade*, suas palavras pessoais de ortografia e um manifesto. Ao copiar ou restaurar um instantâneo, mantenha juntos o arquivo `.sqlite` e a pasta `.sqlite.skills`. Cópias de segurança do navegador não incluem palavras pessoais de ortografia.

Cópias antigas `.sqlite` contêm apenas o banco de dados. Ao restaurar uma delas, os arquivos e o histórico atuais de *habilidades* são mantidos.

## Cópias de segurança automáticas

Defina **Backups automáticos** como **Diário** para criar um instantâneo pouco depois que o Warplyn iniciar e, em seguida, a cada 24 horas enquanto permanecer aberto. No navegador, o Warplyn precisa de permissão para usar a pasta escolhida. Se uma cópia automática falhar, confira a pasta e crie uma cópia manual; a próxima tentativa agendada continuará ativada.

**Retenção automática de backup** controla quantos instantâneos automáticos o Warplyn mantém. Ele remove apenas os instantâneos automáticos mais antigos; as cópias criadas manualmente são sempre mantidas.

## Restaurar uma cópia de segurança

1. Em **Configurações** → **Dados e backups**, selecione **Restaurar um backup**.
2. Escolha a cópia que deseja restaurar. O Warplyn verifica os arquivos e guarda uma cópia local de recuperação do banco de dados e dos arquivos de *habilidade* atuais.
3. Quando a restauração terminar, confira seus *artigos* e *versões salvas*.

Restaurar uma cópia `.skladno` ou um instantâneo do desktop com a pasta associada substitui o banco de dados e as *habilidades* salvas. Restaurar uma cópia antiga `.sqlite`, que contém apenas o banco de dados, substitui somente o banco de dados.

Restaurar uma cópia do desktop também adiciona ao dicionário as palavras pessoais de ortografia salvas nela. As palavras existentes são mantidas. Cópias antigas sem palavras pessoais não alteram seu dicionário. Dicionários de idiomas baixados e opções de pré-carregamento de ortografia não são incluídos.

::: warning Configurações de IA após a restauração
A restauração mantém as conexões de IA, credenciais e seleções de modelos já existentes nesta instalação. Se nenhuma conexão estiver configurada, o Warplyn restaura da cópia os nomes e as referências de variáveis de ambiente, mas nunca as chaves de API nem os valores das variáveis. Configure as variáveis ausentes neste computador e escolha os modelos em **Configurações** → **Assistente de IA**. Conexões que usam chaves de API salvas não são importadas para uma instalação nova; adicione-as em Configurações. As demais configurações são restauradas. Se a restauração falhar, a reversão preservará a configuração de IA anterior.
:::

## Recuperar manualmente uma cópia que contém apenas o banco de dados

Use estas etapas somente para uma cópia `.sqlite` antiga. Mantenha o Warplyn fechado até recolocar o banco de dados.

1. Faça uma cópia do banco de dados local atual.
2. Copie a cópia de segurança para `skladno.sqlite` na pasta de dados configurada do Warplyn.
3. Inicie o Warplyn e confira seus *artigos* e *versões salvas*.

Para restaurar uma cópia que inclua *habilidades*, use **Restaurar um backup** em **Configurações** para que o Warplyn também possa verificar e restaurar o manifesto e o histórico de *habilidades*.

## Se não for possível criar uma cópia de segurança

O Warplyn mantém o banco de dados ativo e a sessão de edição inalterados. Confira se a pasta de destino existe e se sua conta tem permissão para gravar nela; depois, tente novamente.

## Permissões de arquivos

Por padrão, o serviço local armazena o banco de dados em `~/.warplyn`. Defina `WARPLYN_DATA_DIR` para escolher outra pasta. O Warplyn ignora `SKLADNO_DATA_DIR` e não usa uma pasta que se sobreponha ao antigo local de dados do Skladno. Se estiver migrando do Skladno, escolha uma pasta separada para o Warplyn e restaure uma cópia de segurança.

Em sistemas POSIX, o Warplyn restringe o acesso à pasta de dados e aos arquivos SQLite à sua conta, inclusive após uma atualização. No Windows, as permissões do sistema de arquivos são gerenciadas pelo próprio Windows. Os arquivos de cópia de segurança criados pelo navegador usam as permissões da pasta escolhida; portanto, mantenha as cópias em uma pasta privada e confira as configurações de compartilhamento antes de usar um local compartilhado ou sincronizado.
