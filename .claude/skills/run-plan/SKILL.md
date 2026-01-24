---
name: run-plan
description: PLAN.md를 읽고 마일스톤을 TDD로 구현합니다.
user-invocable: true
allowed-tools: Read, Glob, Grep, Write, Edit, Bash, Task, TodoWrite
---

# 즉시 실행: PLAN.md 마일스톤 구현

## 지금 바로 수행할 것:

1. **Read tool로 PLAN.md 읽기**
   - 파일이 없으면 "`/make-plan`을 먼저 실행해주세요" 안내 후 중단

2. **다음 마일스톤 찾기**
   - Status가 "Not Started" 또는 "In Progress"인 첫 마일스톤
   - 모두 완료 시 "프로젝트 완료!" 축하 메시지 후 중단

3. **TDD로 구현** (main-ai 역할 수행)
   - 테스트 먼저 작성 (Red)
   - 최소 구현으로 통과 (Green)
   - 리팩토링 (테스트 유지)
   - 100줄 이내 변경

4. **PLAN.md 업데이트**
   - 완료된 서브태스크 체크 `[x]`
   - Status 업데이트
   - Session Notes 작성

5. **커밋**
   - `feat(M[N]): [마일스톤 설명]`

6. **완료 안내**
   - "마일스톤 M[N] 완료. 다음: M[N+1] [이름]"
   - 또는 "프로젝트 완료!"