# 📅 Work Calendar

업무 일지를 시각화하는 월간 캘린더 애플리케이션입니다. Markdown 형식의 일지를 읽어 월별 테마 색상의 캘린더에 표시합니다.

## ✨ 주요 기능

- 📖 **마크다운 일지 파싱**: 일지 형식의 `.md` 파일 자동 파싱
- 🎨 **월별 테마 색상**: 각 월마다 고유한 색상 테마 적용
- 🔥 **활동 표시**: "6시 이후 하려는 일"이 있는 날 불 이모지 표시
- 📝 **일지 요약**: TF-IDF 알고리즘 기반 자동 요약 기능
- 📱 **반응형 디자인**: 모바일부터 데스크톱까지 최적화된 UI
- 🎯 **미니 캘린더**: 빠른 날짜 이동을 위한 사이드 캘린더

## 🚀 시작하기

### 레포지토리 클론

일지 데이터는 Git Submodule로 관리됩니다. 클론 시 submodule을 포함해야 합니다:

```bash
# Submodule 포함하여 클론
git clone --recurse-submodules https://github.com/toy-project-kyungsle/work_calender.git

# 또는 이미 클론한 경우
git submodule update --init --recursive
```

### 개발 환경 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 프로덕션 빌드

```bash
npm run build
npm start
```

### 테스트 실행

```bash
npm test          # watch 모드
npm run test:run  # 단일 실행
```

## 📁 일지 파일 형식

`data/` 폴더에 다음 형식의 마크다운 파일을 추가하세요:

```markdown
# 2026-01-25 일지

## 루틴

- [x] 기상 6:30
- [x] 운동 30분

# 1. 9 to 6 할 일

- 프로젝트 기획안 검토
- 팀 미팅 참석

# 2. 6시 이후 하려는 일

- 사이드 프로젝트 개발
- 블로그 포스팅

# 3. 노트

오늘의 중요한 메모

# 4. 회고

오늘 하루 회고 내용
```

### 일지 데이터 수정

일지 데이터는 별도 레포지토리([growth_calendar_data](https://github.com/toy-project-kyungsle/growth_calendar_data))에서 관리됩니다.

#### 자동 배포 (권장)

```bash
# growth_calendar_data 레포에서 직접 작업
cd ~/growth_calendar_data

# 일지 파일 추가/수정
# 예: calender/2026/01/2026-01-26.md

# 변경사항 커밋 및 푸시
git add calender/2026/01/2026-01-26.md
git commit -m "feat: add journal for 2026-01-26"
git push origin main

# 🎉 완료! 최대 6시간 내 자동 배포됨
# 또는 GitHub Actions에서 수동 트리거 가능
```

#### 수동 업데이트 (즉시 반영 필요 시)

work_calender 레포에서 서브모듈 수동 업데이트:

```bash
cd ~/work_calender

# 서브모듈 최신화
git submodule update --remote data

# 변경사항 확인 및 커밋
git add data
git commit -m "chore: update data submodule"
git push origin main

# 즉시 배포됨
```

### 최신 일지 데이터 가져오기

로컬 개발 환경에서 최신 데이터 가져오기:

```bash
# Submodule을 최신 커밋으로 업데이트
git submodule update --remote data

# 또는 전체 레포 최신화
git pull --recurse-submodules
```

## 🛠 기술 스택

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: [Vitest](https://vitest.dev/) + Testing Library

## 📦 프로젝트 구조

```
work_calender/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React 컴포넌트
│   │   ├── calendar/    # 캘린더 관련 컴포넌트
│   │   ├── journal/     # 일지 관련 컴포넌트
│   │   └── ui/          # shadcn/ui 컴포넌트
│   └── lib/             # 유틸리티 & 로직
│       ├── dateUtils.ts # 날짜 관련 함수
│       ├── parser.ts    # 마크다운 파서
│       ├── summarizer.ts # TF-IDF 요약
│       └── journals.ts  # 일지 로더
├── data/                # 일지 파일 저장소
└── public/              # 정적 파일
```

## 🎨 월별 테마 색상

각 월마다 고유한 색상 팔레트가 적용됩니다:

- 1월: Rose Red
- 2월: Coral Orange
- 3월: Mint Green
- 4월: Sky Blue
- 5월: Lavender Purple
- 6월: Peach
- 7월: Teal
- 8월: Gold
- 9월: Sage Green
- 10월: Burgundy
- 11월: Navy Blue
- 12월: Forest Green

## 🌐 배포

GitHub Pages에 자동 배포됩니다:

**Live Demo**: [https://toy-project-kyungsle.github.io/work_calender/](https://toy-project-kyungsle.github.io/work_calender/)

main 브랜치에 푸시하면 GitHub Actions를 통해 자동으로 빌드 및 배포됩니다.

## 📝 라이선스

MIT License

---

Built with ❤️ using Next.js and TypeScript
