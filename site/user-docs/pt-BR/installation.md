---
description: "Instale o Warplyn no Windows ou Linux usando pacotes Debian ou AppImage e configure seu espaço de escrita."
---

# Instalar o Warplyn

O Warplyn está disponível para Windows 11 x64 e Linux. Baixe os instaladores atuais em [Versões do Warplyn](https://github.com/punk-link/warplyn/releases). Se você usa o Skladno, siga o [guia de migração](migration.md) e mantenha a instalação e as cópias de segurança antigas até confirmar que seu trabalho foi restaurado.

## Windows

1. Abra [Versões do Warplyn](https://github.com/punk-link/warplyn/releases).
2. Em **Assets**, baixe o instalador `.exe` para Windows e execute-o.
3. Se o Windows exibir um aviso do SmartScreen, confirme que o instalador veio da página de versões deste repositório. As versões não têm assinatura digital.
4. Abra o Warplyn pelo menu Iniciar.

Para ver os controles de atualização e as opções de recuperação, consulte [Recuperação após atualização no desktop](update-recovery.md).

::: info Sobre assinaturas digitais
Uma assinatura digital usa um certificado de assinatura de código para identificar o publicador e indicar se um instalador foi alterado depois de assinado. Ela não garante que o software seja seguro. O Warplyn ainda não configurou a assinatura do publicador, portanto o Windows não consegue verificar quem publicou o instalador. Baixe-o somente na página oficial de versões.
:::

## Debian e distribuições baseadas em Debian

O pacote Debian foi testado principalmente no Ubuntu 22.04 x64. A compatibilidade com outras versões ou distribuições pode variar. Use um sistema amd64 com uma sessão gráfica.

1. Abra [Versões do Warplyn](https://github.com/punk-link/warplyn/releases).
2. Em **Assets**, baixe o pacote `warplyn_VERSION_amd64.deb`.
3. Abra um terminal na pasta onde baixou o arquivo. Se a pasta contiver somente esse pacote do Warplyn, instale-o com:

   ```sh
   sudo apt install ./warplyn_*.deb
   ```

4. Abra o Warplyn pelo menu de aplicativos.

Para atualizar manualmente, baixe o arquivo `.deb` mais recente e execute o mesmo comando `sudo apt install` com esse arquivo. Baixar o pacote não adiciona um repositório de atualizações. O Apt instala os pacotes de que o Warplyn precisa. Se não conseguir instalá-los, não force a instalação.

Por padrão, seus textos ficam armazenados em `~/.warplyn`. Faça uma cópia de segurança antes de atualizar. Reinstalar ou remover o aplicativo deve preservar essa pasta e as credenciais no chaveiro do desktop.

No Linux, chaves de API gerenciadas precisam de um Secret Service disponível e desbloqueado, como o GNOME Keyring. Consulte [Provedores e modelos de IA](providers.md) para ver outras opções de conexão.

Se não for possível salvar ou ler uma chave, desbloqueie o chaveiro do desktop e tente novamente. Se sua sessão não tiver um Secret Service, ative um ou use uma conexão por variável de ambiente descrita naquele guia. A edição offline continua disponível. Não desative o sandbox para contornar falhas de inicialização; informe a distribuição, a versão e o erro.

### Linux AppImage {#linux-appimage}

Nas versões que incluem um arquivo `.AppImage` x64, mantenha-o em uma pasta onde você possa gravar. Baixe-o em [Versões do Warplyn](https://github.com/punk-link/warplyn/releases), torne-o executável no gerenciador de arquivos e execute-o. Você também pode rodar `chmod +x Warplyn-*-linux-x64.AppImage` na pasta de downloads. O Linux precisa de suporte a FUSE com acesso a `/dev/fuse`, das bibliotecas desktop do Electron e de um chaveiro Secret Service para credenciais gerenciadas. O AppImage não inclui uma sessão desktop nem um chaveiro.

No alvo Ubuntu 22.04, as dependências desktop incluem `libgtk-3-0`, `libnss3`, `libasound2`, `libatk-bridge2.0-0`, `libdrm2`, `libgbm1`, `libxkbcommon0`, `libnotify4`, `libxcb-dri3-0` e `xdg-utils`. O GNOME Keyring fornece o Secret Service. Uma instalação normal do GNOME já inclui a maioria desses pacotes. Outras distribuições usam nomes de pacotes diferentes e precisam de suas próprias verificações de compatibilidade.

A integração com o desktop é opcional: crie um iniciador apontando para o caminho completo da imagem. Mantenha esse caminho ao atualizar. O AppImage foi validado no Ubuntu 22.04 x64 com GNOME. A compatibilidade também foi verificada no Ubuntu 24.04 x64 e no Fedora 43 x64, ambos com GNOME.

Consulte [Recuperação após atualização no desktop](update-recovery.md) para ver as etapas explícitas de download, reinicialização e recuperação.

Para adicionar uma entrada ao menu de aplicativos, você pode renomear a imagem para `Warplyn.AppImage` e mantê-la em uma pasta `Applications` dentro da sua pasta pessoal. Crie `~/.local/share/applications` se ela não existir e salve ali o arquivo a seguir com o nome `warplyn.desktop`. Substitua `YOUR_USER` pelo seu nome de usuário Linux ou use o caminho completo onde mantém a imagem:

```ini
[Desktop Entry]
Type=Application
Name=Warplyn
Exec="/home/YOUR_USER/Applications/Warplyn.AppImage" %U
Terminal=false
Categories=Office;
StartupWMClass=Warplyn
```

A entrada no menu continua funcionando porque as atualizações no aplicativo substituem a imagem no mesmo caminho. Para adicionar o ícone do Warplyn, execute `./Warplyn.AppImage --appimage-extract warplyn.png` ao lado da imagem, mantenha o PNG extraído em um local permanente e adicione `Icon=` seguido do caminho completo até o arquivo do iniciador.

## Após a instalação

Para usar os recursos de IA, adicione uma conexão com um provedor em **Configurações** → **Assistente de IA**. Escolha uma **Pasta de backup** em **Configurações** → **Dados e backups** para proteger seus *artigos*.

O Warplyn armazena *artigos* e pontos de verificação de *rascunhos* no seu computador. Solicitações de IA precisam de uma conexão com a internet e enviam ao provedor escolhido o texto e o contexto relevantes do *artigo*. Aplicam-se as políticas de dados e os preços do provedor.
