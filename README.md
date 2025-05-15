# 📅 Todo App with Google Calendar

Google Calendar와 연동되는 포스트잇 스타일의 To-Do 리스트 앱입니다.  
사용자는 직접 할 일을 입력하거나, 구글 캘린더에 등록된 오늘의 일정을 불러와 자동으로 할 일 목록에 추가할 수 있습니다.

---

## ✨ 주요 기능

- ✅ 간단한 To-Do 목록 추가, 체크, 삭제
- 🗓️ Google Calendar에서 **오늘의 일정 자동 가져오기**
- 🎨 포스트잇 스타일 카드 UI (색상 선택 가능)
- 🧩 TypeScript + React + Vite + TailwindCSS 기반
- 🔒 `.env`를 통한 보안 키 분리 및 환경 설정 관리

---

## 📸 데모

![Todo 앱 데모](./public/image.png)

---

## 🔧 기술 스택

| 기술         | 설명                         |
| ------------ | ---------------------------- |
| React        | 컴포넌트 기반 UI 개발        |
| TypeScript   | 정적 타입으로 안정성 확보    |
| Vite         | 빠른 개발 서버 및 빌드 도구  |
| Tailwind CSS | 유틸리티 기반 CSS 프레임워크 |
| gapi-script  | Google Calendar API 연동     |
| uuid         | 고유한 To-Do ID 생성         |

---

## 📁 프로젝트 구조

```bash
src/
├── components/ # To-Do UI 구성 요소 (입력창, 리스트, 아이템)
│ ├── TodoInput.tsx
│ ├── TodoList.tsx
│ └── TodoItem.tsx
├── google/ # Google Calendar API 연동 로직
│ ├── googleClient.ts
│ └── fetchTodayEvents.ts
├── types/ # TypeScript 인터페이스 정의
│ ├── todo.ts
│ └── calendarEvents.ts
├── App.tsx # 전체 앱 통합 및 상태 관리
└── main.tsx # 진입점
```

---

### 🔍 폴더 설명

- `components/`: 할 일 입력, 목록, 단일 항목 등 UI 단위 컴포넌트
- `google/`: Google API 초기화 및 오늘의 일정 불러오기 로직
- `types/`: `Todo`, `CalendarEvent` 등 명시적인 타입 정의 파일
- `App.tsx`: 전체 앱 UI 및 상태 관리 로직 포함
- `main.tsx`: Vite 기반 프로젝트의 엔트리 포인트

---

## 🚀 실행 방법

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 http://localhost:5173 접속

```

---

## 🔑 환경 변수 설정 (.env)

Google Calendar API를 사용하기 위해 아래 환경 변수를 `.env` 파일에 설정해야 합니다:

```bash
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
VITE_GOOGLE_API_KEY=your_google_api_key
```
