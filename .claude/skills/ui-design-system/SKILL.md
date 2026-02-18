---
name: ui-design-system
description: UI 디자인 시스템 가이드. 컴포넌트 설계, 색상/타이포그래피/스페이싱 토큰, 반응형 레이아웃 규칙을 정의합니다.
user-invocable: false
allowed-tools: Read, Glob, Grep
---

# UI Design System Guide

## 프로젝트 기술 스택

- **Framework**: Next.js 14+ (App Router)
- **UI Library**: shadcn/ui
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## 디자인 토큰

### 색상 체계

프로젝트는 월별 테마 시스템을 사용합니다 (`src/lib/themes.ts`).

각 테마는 3가지 색상으로 구성:
- `bg`: 배경색 (밝은 톤)
- `accent`: 강조색 (중간 톤, 버튼/아이콘에 사용)
- `text`: 텍스트색 (어두운 톤)

색상 대비 기준:
- 텍스트 대비비: 최소 4.5:1 (WCAG AA)
- 대형 텍스트 대비비: 최소 3:1
- UI 컴포넌트 대비비: 최소 3:1

### 타이포그래피

```
제목 (h1): text-2xl font-bold (24px)
부제목 (h2): text-xl font-semibold (20px)
섹션 제목 (h3): text-lg font-medium (18px)
본문: text-sm (14px)
캡션: text-xs (12px)
```

### 스페이싱

Tailwind 4의 간격 체계를 따릅니다:
```
컴포넌트 내부 패딩: p-3 ~ p-4
컴포넌트 간 간격: gap-2 ~ gap-4
섹션 간 간격: gap-6 ~ gap-8
페이지 마진: px-4 md:px-6 lg:px-8
```

### 반응형 브레이크포인트

```
모바일: < 640px (기본)
태블릿: sm: 640px
데스크톱: md: 768px
와이드: lg: 1024px
```

## 컴포넌트 설계 원칙

### 1. 구조

```
컴포넌트/
├── Props 타입 정의 (인터페이스)
├── 기본값 상수
├── 컴포넌트 함수
│   ├── 상태 관리 (useState, useEffect)
│   ├── 이벤트 핸들러
│   └── JSX 렌더링
└── export
```

### 2. 네이밍 규칙

- 컴포넌트: PascalCase (`DayCell`, `MonthHeader`)
- Props 타입: `{ComponentName}Props`
- 이벤트 핸들러: `on{Event}` (props) / `handle{Event}` (내부)
- CSS 클래스: Tailwind utility-first

### 3. 접근성 필수 사항

- 모든 인터랙티브 요소에 `aria-label` 또는 시맨틱 텍스트
- 키보드 네비게이션 지원 (Tab, Enter, Escape, Arrow keys)
- 포커스 인디케이터 유지 (`focus-visible:ring-2`)
- 색상만으로 정보를 전달하지 않기
- `role` 속성 적절히 사용

### 4. 애니메이션

- 상태 전환: `transition-colors duration-300`
- 호버 효과: `hover:opacity-80` 또는 `hover:scale-105`
- 모달/시트: `transition-transform duration-200`
- `prefers-reduced-motion` 존중

## shadcn/ui 활용 가이드

### 사용 중인 컴포넌트

- **Button**: 네비게이션 (이전/다음 월)
- **Sheet**: 일지 상세 보기 (사이드 패널)

### 커스터마이징 규칙

1. shadcn/ui 기본 스타일 위에 Tailwind로 확장
2. `cn()` 유틸리티로 조건부 클래스 병합
3. 테마 색상은 인라인 스타일 또는 CSS 변수로 적용

## 레이아웃 패턴

### 캘린더 그리드

```
7열 CSS Grid (일~토)
- grid-cols-7
- 각 셀 최소 높이: min-h-[80px] md:min-h-[120px]
- 셀 내 요소: 날짜 번호 + 요약 텍스트 + 이모지
```

### 반응형 전략

- **모바일**: 요약 텍스트 숨김, 날짜+이모지만 표시
- **태블릿**: 요약 1줄 표시
- **데스크톱**: 요약 2-3줄 표시 (line-clamp-3)
