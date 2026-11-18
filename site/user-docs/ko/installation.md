---
description: "Windows 또는 Linux에 Warplyn을 설치하고 글쓰기 작업 공간을 설정합니다. Debian 및 AppImage 패키지를 사용할 수 있습니다."
---

# Warplyn 설치

Warplyn은 Windows 11 x64와 Linux에서 사용할 수 있습니다. 최신 설치 파일은 [Warplyn 릴리스](https://github.com/punk-link/warplyn/releases)에서 다운로드하세요. Skladno를 사용 중이라면 [마이그레이션 가이드](migration.md)를 따르고, 복원된 작업을 확인할 때까지 기존 설치와 백업을 유지하세요.

## Windows

1. [Warplyn 릴리스](https://github.com/punk-link/warplyn/releases)를 엽니다.
2. **Assets**에서 Windows 설치 프로그램 `.exe`를 다운로드해 실행합니다.
3. Windows에 SmartScreen 경고가 표시되면 설치 프로그램이 이 저장소의 릴리스 페이지에서 제공되었는지 확인하세요. 릴리스에는 디지털 서명이 없습니다.
4. 시작 메뉴에서 Warplyn을 엽니다.

업데이트 설정과 복구 방법은 [데스크톱 업데이트 복구](update-recovery.md)를 참조하세요.

::: info 디지털 서명 안내
디지털 서명은 코드 서명 인증서를 사용해 게시자를 식별하고 서명 후 설치 프로그램이 변경되었는지 확인합니다. 소프트웨어의 안전성을 보장하지는 않습니다. Warplyn은 아직 게시자 서명을 도입하지 않아 Windows에서 설치 프로그램의 게시자를 확인할 수 없습니다. 공식 릴리스 페이지에서만 다운로드하세요.
:::

## Debian 및 Debian 기반 배포판

Ubuntu 22.04 x64를 주요 검증 대상으로 삼고 있으며, 다른 배포판 버전의 작동은 보장하지 않습니다. 그래픽 데스크톱 세션이 있는 amd64 시스템을 사용하세요.

1. [Warplyn 릴리스](https://github.com/punk-link/warplyn/releases)를 엽니다.
2. **Assets**에서 `warplyn_VERSION_amd64.deb` 패키지를 다운로드합니다.
3. 다운로드한 폴더에서 터미널을 엽니다. 폴더에 Warplyn 패키지만 있다면 다음 명령으로 설치합니다.

   ```sh
   sudo apt install ./warplyn_*.deb
   ```

4. 애플리케이션 메뉴에서 Warplyn을 엽니다.

수동으로 업그레이드하려면 새 `.deb` 파일을 다운로드하고 해당 파일에 같은 `sudo apt install` 명령을 실행하세요. 다운로드만으로 자동 패키지 저장소가 구성되지는 않습니다. Apt가 선언된 종속성을 해결합니다. 종속성을 충족할 수 없다면 설치를 강제하지 마세요.

기본적으로 글쓰기 데이터는 `~/.warplyn`에 저장됩니다. 업그레이드 전에 백업하세요. 애플리케이션을 다시 설치하거나 제거해도 이 폴더와 데스크톱 키링에 저장된 자격 증명은 보존됩니다.

Linux에서 관리형 API 키를 사용하려면 GNOME Keyring과 같은 Secret Service가 설치되어 있고 잠금 해제되어 있어야 합니다. 다른 연결 방법은 [AI 제공자 및 모델](providers.md)을 참조하세요.

키를 저장하거나 읽을 수 없다면 데스크톱 키링의 잠금을 해제하고 다시 시도하세요. 세션에 Secret Service가 없다면 활성화하거나 해당 가이드에 설명된 환경 변수 연결을 사용하세요. 오프라인에서도 편집할 수 있습니다. 시작 오류를 해결하려고 샌드박스를 비활성화하지 마세요. 배포판, 버전, 오류 내용을 알려 주세요.

### Linux AppImage {#linux-appimage}

x64 `.AppImage` 파일이 포함된 릴리스에서는 파일을 쓸 수 있는 폴더에 보관하세요. [Warplyn 릴리스](https://github.com/punk-link/warplyn/releases)에서 다운로드한 뒤 파일 관리자에서 실행 권한을 부여하고 실행합니다. 다운로드 폴더에서 `chmod +x Warplyn-*-linux-x64.AppImage`를 실행해도 됩니다. Linux에서는 `/dev/fuse`에 접근할 수 있는 FUSE 지원, Electron 데스크톱 라이브러리, 관리형 자격 증명용 Secret Service 키링이 필요합니다. AppImage에는 데스크톱 세션이나 키링이 포함되지 않습니다.

Ubuntu 22.04 대상에서 필요한 데스크톱 종속성에는 `libgtk-3-0`, `libnss3`, `libasound2`, `libatk-bridge2.0-0`, `libdrm2`, `libgbm1`, `libxkbcommon0`, `libnotify4`, `libxcb-dri3-0`, `xdg-utils`가 있습니다. GNOME Keyring이 Secret Service를 제공합니다. 일반적인 GNOME 설치에는 이러한 패키지 대부분이 포함됩니다. 다른 배포판은 패키지 이름이 다르므로 별도로 호환성을 확인해야 합니다.

데스크톱 통합은 선택 사항입니다. 이미지의 전체 경로를 가리키는 런처를 만드세요. 업데이트할 때도 같은 경로를 유지해야 합니다. AppImage의 데스크톱 설치 승인은 아직 보류 중입니다. 주요 검증 대상은 Ubuntu 22.04 x64이며 Ubuntu 24.04 x64와 Fedora 43 x64는 추가 호환성 대상입니다. 이 대상으로 검증했다고 해서 모든 Linux를 지원하는 것은 아닙니다.

다운로드, 재시작, 복구의 구체적인 단계는 [데스크톱 업데이트 복구](update-recovery.md)를 참조하세요.

애플리케이션 메뉴에 등록하려면 이미지 이름을 `Warplyn.AppImage`로 바꾸고 홈 폴더 안의 `Applications` 폴더에 보관하면 됩니다. `~/.local/share/applications`가 없다면 만든 다음, 그 위치에 `warplyn.desktop` 파일로 아래 내용을 저장하세요. `YOUR_USER`를 Linux 사용자 이름으로 바꾸거나 이미지를 보관한 전체 경로를 사용하세요.

```ini
[Desktop Entry]
Type=Application
Name=Warplyn
Exec="/home/YOUR_USER/Applications/Warplyn.AppImage" %U
Terminal=false
Categories=Office;
StartupWMClass=Warplyn
```

앱 내 업데이트는 같은 경로의 이미지를 교체하므로 메뉴 항목은 계속 작동합니다. Warplyn 아이콘을 추가하려면 이미지와 같은 폴더에서 `./Warplyn.AppImage --appimage-extract warplyn.png`를 실행하세요. 추출된 PNG를 영구적으로 보관할 위치에 두고, 런처 파일에 `Icon=`을 추가한 다음 이미지의 전체 경로를 지정합니다.

## 설치 후

AI 기능을 사용하려면 **설정** → **AI 도우미**에서 제공자 연결을 추가하세요. *글*을 보호하려면 **설정** → **데이터 및 백업**에서 **백업 폴더**를 선택하세요.

Warplyn은 *글*과 *초안* 검사점을 컴퓨터에 저장합니다. AI 요청에는 인터넷 연결이 필요하며 선택한 제공자에게 관련 *글* 텍스트와 컨텍스트를 전송합니다. 제공자의 데이터 정책과 요금이 적용됩니다.
