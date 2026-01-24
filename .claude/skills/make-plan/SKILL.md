---
name: make-plan
description: TODO.md를 읽고 PLAN.md를 생성합니다.
user-invocable: true
allowed-tools: Read, Glob, Grep, Write, Edit, Bash, Task, WebSearch
---

# 즉시 실행: TODO.md → PLAN.md 생성

## 지금 바로 수행할 것:

1. **Read tool로 TODO.md 읽기**
   - 파일이 없으면 사용자에게 "TODO.md를 먼저 작성해주세요" 안내 후 중단

2. **PLAN.md 작성** (strategy-ai 역할 수행)
   - dev-workflow skill의 PLAN.md 템플릿 사용
   - TODO.md 내용을 8-10개 마일스톤으로 분할
   - 각 마일스톤 1-3시간 크기
   - 의존성 명시

3. **Sub AI 검토 요청** (Task tool 사용)
   ```
   Task(
     subagent_type: "sub-ai",
     prompt: "PLAN.md 검토 요청. [PLAN 내용 전달]"
   )
   ```

4. **피드백 반영**
   - Critical: 즉시 수정 후 재검토
   - Important: 반영 후 재검토
   - 승인 시: PLAN.md 저장

5. **완료 안내**
   - "PLAN.md 생성 완료. `/run-plan`으로 구현을 시작하세요."