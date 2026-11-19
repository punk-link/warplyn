---
description: "Recupere-se de uma atualização malsucedida do Warplyn desktop usando a versão anterior e a cópia de segurança correspondente."
---

# Recuperação após atualização no desktop

As atualizações de prévia são opcionais. Se o Warplyn não iniciar após uma atualização, reinstale a versão de prévia anterior. Depois, restaure a cópia de segurança que o Warplyn criou antes dessa atualização.

::: warning Evite abrir o banco de dados mais recente
Não abra com uma versão antiga um banco de dados criado por uma prévia mais recente. Primeiro restaure a cópia de segurança registrada antes da atualização.
:::

1. Baixe e reinstale a prévia anterior pela [versão no GitHub](https://github.com/punk-link/warplyn/releases).
2. Restaure a cópia de segurança SQLite correspondente, registrada pelo Warplyn antes da atualização.
3. Inicie a prévia anterior e confira seus *artigos*, *rascunhos*, *versões salvas* e configurações.

## Linux AppImage

Mantenha seu AppImage em uma pasta onde você possa gravar. Consulte [Instalar o Warplyn](installation.md#linux-appimage) para ver os requisitos de execução, como iniciar o aplicativo e a integração opcional com o desktop. Os testes do AppImage como aplicativo instalado no desktop ainda não foram concluídos.

Depois de permitir o acesso às atualizações do GitHub, use **Download** e depois **Reinicie e atualize**. Fechar o aplicativo normalmente não instala a atualização baixada. Os pacotes Debian continuam sendo atualizados pelo gerenciador de pacotes.

Se uma atualização do AppImage impedir a inicialização, feche o Warplyn. O executável anterior fica ao lado da imagem, com o sufixo `.previous`. Restaure primeiro a cópia de segurança feita antes da atualização. Só então abra a versão anterior. Mantenha os dois executáveis e a cópia até a recuperação ser concluída. Se não for possível gravar na pasta da imagem, mova-a para uma pasta sua ou baixe manualmente a substituta. Não desative o sandbox do Electron para iniciar a imagem.
