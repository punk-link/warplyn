---
description: "글쓰기 작업 공간 전반에서 사용하는 글, 초안, 저장된 버전, 제안, 지적 사항, 스킬의 용어를 설명합니다."
---

# Warplyn 용어집

이 용어는 작성자에게 표시되는 개념과 Warplyn 전반에서 사용하는 도메인 언어를 설명합니다.

## 글과 저장된 버전

- **Article**: 독립적으로 복구할 수 있는 편집 작업 단위입니다. Warplyn에서는 “document” 대신 “Article”을 사용합니다.
- **글 라이브러리**: 작성자의 로컬 *글(Articles)* 모음입니다. **current Article**은 작업 공간에서 열린 글이며 **Article list**는 모음을 보여줍니다.
- **Draft**: 현재 편집 중이며 아직 *저장된 버전(Revision)*으로 저장되지 않은 *글(Article)* 텍스트입니다.
- **Draft checkpoint**: 로컬에 저장되며 기준 *저장된 버전(Revision)*에 연결된 복구 가능한 변경형 *초안(Draft)* 상태입니다. *저장된 버전(Revision)*은 아닙니다. **Current Draft**는 *글(Article)*의 현재 *저장된 버전(Revision)*을 기준으로 하며 **stale Draft**는 이전 *저장된 버전(Revision)*을 기준으로 합니다.
- **저장된 버전**: *글(Article)*의 변경 불가능한 저장 스냅샷입니다.
- **Revision promotion**: 현재 *초안(Draft)*을 새 *저장된 버전(Revision)*으로 저장하는 작성자의 명시적 작업입니다. 일치하는 *초안(Draft)* 검사점만 지웁니다.
- **Proposal**: 작성자의 명시적 승인이 필요한 AI 생성 후보 콘텐츠 또는 변경 사항입니다.
- **Proposal base Revision**: *제안(Proposal)*을 만들기 위해 검토한 *저장된 버전(Revision)*입니다. 현재 *저장된 버전(Revision)*과 일치하지 않게 되면 *제안(Proposal)*은 오래된 상태가 됩니다.
- **Change selection**: 작성자가 수락하기로 선택한 *제안(Proposal)*의 일부입니다. 수락하면 새 *저장된 버전(Revision)*이 만들어집니다.
- **Finding**: *글(Article)*을 변경하지 않는 사실 확인 또는 문체 검토 결과와 같은 권고 사항입니다.
- **Source Article** 및 **translation Article**: 서로 연결되어 있지만 독립적으로 복구할 수 있는 *글(Articles)*입니다. 번역은 원본의 *저장된 버전(Revision)*이 아닙니다.

## 편집 작업

- **Editorial capability**: 사용할 수 있는 *글(Article)* 맥락, 전제 조건, 결과를 선언하는 검증된 Warplyn 작업입니다. Workspace Views와 Assistant Skills에서 동일한 기능을 호출할 수 있습니다.
- **Skill**: 작성자의 요청에 따라 편집 기능을 선택하고 순서를 정하도록 Assistant를 돕는 재사용 가능한 지침 패키지입니다. *스킬(Skill)*은 기능이나 권한을 부여하지 않습니다. **built-in Skill**은 Warplyn에 포함되어 제공됩니다. **Author-created Skill**은 Assistant 채팅에서 만든 로컬 Markdown 패키지이며 별도의 *스킬 버전(Skill Revision)* 기록을 가집니다.
- **Editorial operation**: 글 작성, 다듬기, 사실 확인, 문체 검토, 번역과 같이 작성자가 요청한 Assistant 작업입니다.
- **Editorial request**: 하나의 편집 작업을 실행하는 요청입니다.
- **Editorial session**: 편집 요청의 상호작용 순서와 활동 기록입니다.
- **편집 지침**: 편집 요청에 작성자가 입력한 지침 또는 맥락입니다.
- **Style corpus**: 작성자가 제공한 로컬 글쓰기 샘플입니다. **style profile**은 그 샘플에서 도출한 간결한 표현입니다.
- **Workflow stage**: 선택 사항인 작성자 지정 진행 안내입니다. AI를 실행하거나 *글(Article)* 콘텐츠를 변경하지 않습니다.

## 게시 및 설정

- **Publishing profile**: 글자 수 제한을 포함할 수 있는 플랫폼별 설정 지침입니다. 기본값은 새 *글(Articles)*에만 적용됩니다.
- **Publishing copy**: Article Status Bar를 통해 현재 *글(Article)*에서 명시적으로 복사한 Markdown 또는 일반 텍스트입니다. Warplyn은 Publishing Preview Workspace View를 제공하지 않습니다.
- **Application Settings**: 작업 공간 수준 기본 설정, AI 구성, Publishing 프로필, 로컬 데이터 관리입니다. 설정은 *글(Article)*의 *저장된 버전(Revision)* 기록에 포함되지 않습니다.
- **AI connection**: Credential source가 지정된 이름 있는 서버 측 제공자 구성입니다. 새 편집 요청은 **active AI connection**을 사용합니다.
- **Credential source**: AI 연결이 사용하는 비공개 인증 정보 출처입니다. 환경 변수 참조 또는 관리되는 자격 증명 중 하나입니다.
- **관리되는 자격 증명**: 운영 체제의 인증 정보 저장소에 보관되는 API 키입니다. Warplyn은 연결 메타데이터를 저장하지만 키를 SQLite 또는 백업 스냅샷에 쓰지 않습니다.
- **Model preference**: 기본 모델 식별자 또는 편집 작업별 모델 재정의입니다.
- **Interface locale**: Warplyn 인터페이스의 언어로, *글(Article)* 및 번역 언어와 별개입니다.
- **새 글의 기본 언어**: 별도로 지정하지 않은 새 *글(Article)*에 할당되는 언어입니다.
- **기본 번역 언어**: 번역 요청 때 먼저 제안되는 순서가 있는 언어 목록입니다. 번역을 자동으로 시작하지 않습니다.
- **Backup destination**: Warplyn이 백업 스냅샷을 기록하는 로컬 디렉터리입니다.
- **Backup snapshot**: 활성 데이터베이스와 별도로 보관하는 로컬 데이터의 일관된 특정 시점 사본입니다. 인증 정보는 포함되지 않습니다.
- **Data location**: Warplyn의 SQLite 데이터가 있는 활성 로컬 디렉터리입니다.
- **Data relocation**: 작성자의 확인을 받아 데이터를 복사하고 다시 시작해 Warplyn을 새 데이터 위치로 전환하는 작업입니다. 복구를 위해 이전 사본은 보존됩니다.
- **Recovery snapshot**: 복원 중 Warplyn이 활성 데이터를 교체하기 전에 보관하는 백업 스냅샷입니다.
- **Application update**: 데스크톱 클라이언트가 확인하고 다운로드할 수 있는 새 Warplyn 패키지 버전입니다. 작성자가 직접 단계를 선택해야만 적용됩니다. 업데이트 자체는 *글(Article)* 콘텐츠를 변경하지 않습니다.
- **보안 업데이트**: 릴리스 태그에 `.security` 접미사가 붙은 애플리케이션 업데이트입니다. Warplyn은 이를 알리지만 확인, 다운로드, 다시 시작을 강제하지 않습니다.
- **Staged update**: 다운로드되어 작성자가 다시 시작 및 업데이트를 선택하기를 기다리는 애플리케이션 업데이트입니다. 일반 종료로는 적용되지 않습니다.
- **Pre-update snapshot**: Warplyn이 대기 중인 업데이트를 적용하기 전에 만든 로컬 데이터 백업 스냅샷입니다. 복원에는 이에 맞는 이전 애플리케이션 버전이 필요합니다.
- **Diagnostics event**: 시작 또는 복구 가능한 실패를 지원하기 위해 호스트 프로세스 로그에 기록하는 비식별화된 로컬 서비스 기록입니다. 비공개 *글(Article)* 콘텐츠, 모델 본문, 환경 변수 값은 포함하지 않습니다.

## 인터페이스

### 작업 공간 구성

두 측면 패널을 펼치고 Article Editor를 선택한 데스크톱 레이아웃입니다. 상자는 위치와 포함 관계를 보여주며 정확한 크기를 나타내지 않습니다.

```text
Editorial Workspace
┌──────────────────────────┬──────────────────────────────┬──────────────────────────┐
│ Article Library Panel    │ Article Workspace            │ Editorial Assistant Panel│
├──────────────────────────┼──────────────────────────────┼──────────────────────────┤
│ Warplyn · New Article    │ Article Header               │ Assistant header         │
│ Collapse control         │ Title and Article metadata   │ Collapse control         │
├──────────────────────────┼──────────────────────────────┤
│ Article search           │ Workspace Tab Bar            │ Conversation             │
├──────────────────────────┼──────────────────────────────┤ Request status           │
│ Article list             │ Workspace View               │ and activity             │
│                          │                              │                          │
│                          │ Article Editor               │                          │
│                          │ ┌──────────────────────────┐ │                          │
│                          │ │ Writing surface          │ │                          │
│                          │ │                          │ │                          │
│                          │ └──────────────────────────┘ │                          │
├──────────────────────────┤                              ├──────────────────────────┤
│ Article Library          │                              │ Quick actions            │
│ utility area             │                              │ Composer                 │
│ Style Profile · Settings ├──────────────────────────────┤ Editorial guidance       │
│ Update, when relevant    │ Article Status Bar           │ and Send                 │
│ Language · Local         │ Save status · Metadata · Copy │                          │
└──────────────────────────┴──────────────────────────────┴──────────────────────────┘
```

패널을 펼친 레이아웃에서 Library 패널 아래쪽 바닥글은 **아티클 라이브러리 패널의 도구 영역**입니다. 맨 아래 행에는 현재 *글(Article)* 언어 코드와 **로컬** 레이블이 표시됩니다. 중앙 Article 보기 아래의 **Article Status Bar**에는 저장 상태가 표시됩니다.

### 인터페이스 용어

- **Editorial Workspace**: 글 라이브러리 패널, Article Workspace, 글쓰기 도우미 Panel로 구성된 기본 작성 화면입니다.
- **글 라이브러리 패널**: Article 검색, Article 목록, 작업 공간 수준 진입점을 포함합니다. 접힌 형태는 **Navigation Rail**, 작은 화면의 임시 형태는 **Navigation Drawer**입니다.
- **아티클 라이브러리 패널의 도구 영역**: 펼쳐진 글 라이브러리 패널의 바닥글입니다. 문체 프로필, Settings, 관련 업데이트 컨트롤, 현재 Article 언어 코드와 **로컬** 레이블을 포함합니다.
- **Save-state indicator**: 현재 *초안(Draft)*이 저장되었는지, 저장 중인지, 확인이 필요한지 Article Status Bar에 표시하는 상태입니다.
- **Article Workspace**: Article Header, Workspace Tab Bar, 선택된 Workspace View, Article Status Bar로 구성됩니다.
- **Article Header**: Workspace Tab Bar 위에 있는 제목 및 메타데이터 컨트롤입니다.
- **Workspace Tab Bar**: Workspace View를 선택하는 탭입니다.
- **Workspace View**: 선택된 Article Editor 또는 지원 보기인 제안 검토, 저장된 버전 기록, 팩트 체크, Translations입니다.
- **문체 프로필**: 감지된 특성, 문체 검토 *지적 사항(Findings)*, 타이포그래피 규칙, 직접 입력한 지침, 글쓰기 샘플을 위한 별도 화면입니다.
- **Article Editor**: 글쓰기 화면입니다. 기본 편집 영역은 **writing surface**입니다.
- **Article Status Bar**: 선택된 Workspace View 아래에 있는 표시줄입니다. Article 상태 및 메타데이터, 언어 선택, 게시 프로필 지침, Copy 컨트롤을 표시합니다.
- **글쓰기 도우미 패널**: 편집 지침, 작업, 요청 상태, 활동을 표시합니다. 작은 화면에서 임시 형태는 **Assistant Drawer**입니다.
- **빠른 작업**: 요청에 기본 제공 Skill을 넣기 위해 Assistant 작성창 위에서 여는 드롭다운입니다.
- **Composer**: 작성자가 편집 지침을 입력하고 요청을 전송하는 글쓰기 도우미 패널 하단의 입력란입니다.
- **Application 설정 탐색**: **일반**, **단축키**, **제공업체**, **AI 도우미**, **게시**, **기본 언어**, **맞춤법**, **데이터 및 백업**, **Warplyn 정보** 사이를 이동하는 메뉴입니다.
