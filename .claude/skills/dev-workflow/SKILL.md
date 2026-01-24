---
name: dev-workflow
description: PLAN 기반 개발 방법론. 마일스톤 기반 실행 계획과 TDD를 활용한 AI-인간 협업 워크플로우.
user-invocable: true
allowed-tools: Read, Glob, Grep, Write, Edit, TodoWrite, Bash
---

# Dev Workflow: PLAN 기반 개발 방법론

## Core Concept

```
요구사항 분석 → PLAN.md 작성 → Sub AI 검토 → 구현 (마일스톤별)
```

## PLAN.md 구조

```markdown
# Implementation Plan: [프로젝트명]

## Overview
한 문단 요약 (목표, 범위, 예상 기간)

## Milestones Overview
Progress: [=====>              ] 25%

M0: ████████████████████ 100% ✅
M1: ██████░░░░░░░░░░░░░░  30% 🔄
M2: ░░░░░░░░░░░░░░░░░░░░   0% ⬜

## Milestones

### M1: [마일스톤명]
**Status**: In Progress
**Duration**: 1-3시간

**Sub-tasks**:
- [ ] 1.1 - 첫 번째 작업
- [ ] 1.2 - 두 번째 작업

**완료 기준**:
- 테스트 통과
- 코드 리뷰

## Session Notes
### Session 1 (날짜)
- 완료: ...
- 이슈: ...
- 다음: ...
- Commit: ...
```

## TDD Cycle (필수)

```
Red (테스트 실패) → Green (테스트 통과) → Refactor (개선)
```

1. 테스트 먼저 작성
2. 최소 구현으로 통과
3. 리팩토링 (테스트 유지)
4. **100줄 이내** 변경

## Workflow

### 1. PLAN 작성 (Strategy AI)
- 목표와 범위 정의
- 8-10개 마일스톤으로 분할
- 각 마일스톤 1-3시간 크기
- 의존성 명시

### 2. Sub AI 검토
- PLAN 구조 검증
- 마일스톤 크기/순서 확인
- Critical/Important 피드백
- 승인까지 반복 수정

### 3. 구현 (Main AI)
- 테스트 먼저 (TDD)
- 마일스톤 순차 실행
- PLAN.md 업데이트
- 커밋

## Milestone Guidelines

**적절한 크기**:
- 1-3시간 작업량
- 100-300줄 코드
- 독립적 테스트 가능

**쪼개기**:
- ❌ "인증 시스템 구현"
- ✅ "JWT 토큰 생성"
- ✅ "토큰 검증 미들웨어"

## Quality Standards

- 테스트 커버리지 80%+
- JSDoc/타입 명시
- 에러 처리 완료
- TODO 주석 금지

## Multi-AI Roles

| AI | 역할 | 담당 |
|---|---|---|
| **Strategy AI** | 설계 | PLAN.md 작성 |
| **Sub AI** | 검증 | PLAN 리뷰/승인 |
| **Main AI** | 실행 | 코드 구현 (TDD) |
