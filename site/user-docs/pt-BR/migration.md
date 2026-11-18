---
description: "Migre do Skladno para o Warplyn usando uma cópia de segurança, mantendo a instalação original e seus textos disponíveis para recuperação."
---

# Migrar do Skladno para o Warplyn

O Warplyn está disponível como um aplicativo separado. Mantenha o Skladno e os dados dele até verificar o trabalho restaurado. Não mova a pasta de dados ativa do Skladno para o Warplyn.

Baixe o instalador para Windows 11 x64 ou o pacote Debian x64 na [versão mais recente do Warplyn](https://github.com/punk-link/warplyn/releases/latest). Consulte [Instalação](installation.md) para ver as instruções de cada plataforma.

Antes de migrar, escolha uma **Pasta de backup** em **Configurações** → **Dados e backups** e selecione **Criar backup**. Mantenha cada cópia `.sqlite` junto da pasta `.sqlite.skills` correspondente. Consulte [Cópias de segurança e recuperação](backups-and-recovery.md) para mais detalhes.

## Procedimento de migração

1. No Skladno, conclua ou cancele as tarefas de IA ativas e feche e reabra o aplicativo para que o ponto de verificação mais recente do *rascunho* seja salvo. Não edite arquivos de *habilidade* do autor externamente durante a criação da cópia de segurança.
2. Crie uma cópia de segurança manual pelo aplicativo Skladno em execução, inclusive se ele usar um diretório de dados personalizado. Mantenha o arquivo `.sqlite` e a pasta `.sqlite.skills` correspondente juntos e com os nomes originais. Feche o Skladno depois de criar a cópia.
3. Instale e abra o Warplyn em um perfil separado e vazio. Nunca aponte o Warplyn para o diretório de dados ativo do Skladno.
4. Em **Configurações** → **Dados e backups**, escolha a pasta da cópia de migração e selecione **Restaurar um backup**. Selecione o instantâneo do Skladno, confirme a substituição e aguarde o Warplyn reiniciar. Se já houver trabalho no Warplyn, crie primeiro uma cópia de segurança própria: a restauração substitui o trabalho, sem mesclar bancos de dados.
5. Antes de escrever qualquer coisa nova, confira os *artigos*, os *rascunhos* mais recentes, o histórico de *versões salvas*, as conversas com o assistente, as **Configurações**, os perfis de publicação e as *habilidades* do autor.
6. Em **Configurações** → **Assistente de IA**, adicione novamente as conexões e selecione modelos para suas funções. A restauração apaga as conexões salvas e as seleções de modelos porque as credenciais não fazem parte da cópia de segurança. As credenciais do Skladno permanecem inalteradas.
7. Para conexões por variável de ambiente, informe novamente o nome da variável e confirme que ela existe no ambiente do processo do Warplyn. As cópias de segurança nunca transferem arquivos `.env` nem seus valores.
8. Escolha uma pasta separada para as cópias de segurança futuras do Warplyn. Configure novamente as preferências de rede para atualizações e telemetria. A migração não copia as preferências da pasta de cópias, a identidade de telemetria, as atualizações preparadas nem os registros de recuperação pendentes.

Cópias de segurança nativas com uma pasta `.sqlite.skills` restauram as *habilidades* atuais do autor e o histórico imutável de *habilidades*. Instantâneos `.sqlite` antigos, que contêm somente o banco de dados, restauram o banco e deixam as *habilidades* do destino inalteradas; eles não podem restaurar arquivos que nunca incluíram. Os nomes dos arquivos do banco de dados e os formatos de manifesto continuam compatíveis com o Skladno.

## Recuperação

Mantenha o Skladno instalado até verificar a restauração. Os aplicativos não sincronizam nem mesclam edições posteriores. Se voltar a usar o Skladno, você encontrará o estado anterior à migração.

Se a restauração falhar, continue usando o Skladno e guarde o par de arquivos original da cópia. O Warplyn valida a cópia e mantém um instantâneo de recuperação do destino; se a inicialização falhar, ele reverte para esse instantâneo. Tente novamente depois de resolver o problema informado. Consulte [Cópias de segurança e recuperação](backups-and-recovery.md) e [Recuperação após atualização](update-recovery.md).

Por padrão, o Warplyn usa `~/.warplyn`; para escolher uma pasta personalizada, use `WARPLYN_DATA_DIR`. Ele ignora `SKLADNO_DATA_DIR` para o armazenamento ativo e recusa caminhos que se sobreponham a locais antigos conhecidos. Use uma pasta separada e vazia e restaure a cópia em vez de copiar um banco de dados SQLite ativo.
