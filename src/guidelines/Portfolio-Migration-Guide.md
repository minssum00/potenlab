# 포트폴리오 상세 페이지 필드 추가 가이드

## 개요
포트폴리오 상세 페이지의 풍부한 콘텐츠를 위해 데이터베이스에 추가 필드가 필요합니다.

## Supabase 대시보드에서 실행할 SQL

Supabase 대시보드 → SQL Editor에서 다음 SQL을 실행하세요:

\`\`\`sql
-- 포트폴리오 테이블에 추가 컬럼 생성
ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS duration TEXT;
ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS participation_type TEXT;
ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS role TEXT;
ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS tech_stack JSONB;
ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS goal_ko TEXT;
ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS goal_en TEXT;
ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS key_features_ko JSONB;
ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS key_features_en JSONB;
ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS process_ko TEXT;
ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS process_en TEXT;
ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS technical_challenges_ko TEXT;
ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS technical_challenges_en TEXT;
ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS collaboration_tools TEXT;
ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS outcome_images JSONB;
ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS demo_link TEXT;
ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS metrics_ko JSONB;
ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS metrics_en JSONB;
ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS conclusion_ko TEXT;
ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS conclusion_en TEXT;
\`\`\`

## 새로운 필드 설명

### 프로젝트 개요 (Project Overview)
- **duration**: 프로젝트 기간 (예: "2024.01 - 2024.03 (3개월)")
- **participation_type**: 참여 형태 (예: "팀 프로젝트", "클라이언트 프로젝트")
- **role**: 담당 역할 (예: "풀스택 개발, UI/UX 디자인, PM")
- **tech_stack**: 사용 기술 스택 (배열, 예: ["React", "Next.js", "Tailwind CSS"])

### 목표 및 핵심 기능 (Goal & Key Features)
- **goal_ko**: 프로젝트의 핵심 목표 (한국어)
- **goal_en**: 프로젝트의 핵심 목표 (영어)
- **key_features_ko**: 주요 기능 리스트 (한국어 배열)
- **key_features_en**: 주요 기능 리스트 (영어 배열)

### 설계 및 개발 과정 (Process)
- **process_ko**: 개발 과정 설명 (한국어)
- **process_en**: 개발 과정 설명 (영어)
- **technical_challenges_ko**: 기술적 고민과 해결 (한국어)
- **technical_challenges_en**: 기술적 고민과 해결 (영어)
- **collaboration_tools**: 협업 툴, 버�� 관리, 배포 환경

### 결과물 (Outcome)
- **outcome_images**: 결과물 이미지 URL 배열
- **demo_link**: 데모 또는 실제 서비스 링크
- **metrics_ko**: 주요 지표 (한국어 배열, 예: ["사용자 1만명 달성", "앱 다운로드 5천회"])
- **metrics_en**: 주요 지표 (영어 배열)

### 결론 (Conclusion)
- **conclusion_ko**: 포텐랩의 강점 설명 (한국어)
- **conclusion_en**: 포텐랩의 강점 설명 (영어)

## 관리자 페이지 사용법

1. `/admin-portfolio` 페이지로 이동
2. 포트폴리오 생성/수정 시 "상세 정보 (선택사항)" 섹션 펼치기
3. 각 섹션별로 필요한 정보 입력
4. 배열 형태의 필드는 한 줄에 하나씩 입력

### 입력 예시

**사용 기술 스택** (한 줄에 하나씩):
\`\`\`
React
Next.js
TypeScript
Tailwind CSS
Supabase
\`\`\`

**주요 기능** (한 줄에 하나씩):
\`\`\`
실시간 채팅 기능
소셜 로그인 (Google, Kakao)
반응형 디자인
다크모드 지원
\`\`\`

**결과물 이미지 URL** (한 줄에 하나씩):
\`\`\`
https://example.com/screenshot1.jpg
https://example.com/screenshot2.jpg
https://example.com/screenshot3.jpg
\`\`\`

## 주의사항

1. **기본 필드는 필수**: title, category, image_url, description은 반드시 입력해야 합니다.
2. **상세 정보는 선택**: 추가 필드들은 모두 선택사항입니다. 입력하지 않으면 상세 페이지에서 해당 섹션이 표시되지 않습니다.
3. **언어별 입력**: 한국어와 영어 모두 입력하는 것을 권장하지만, 한 언어만 입력해도 됩니다.
4. **이미지 URL**: outcome_images는 여러 이미지를 추가할 수 있습니다. 각 URL을 새 줄에 입력하세요.

## 트러블슈팅

### SQL 실행 오류
- Supabase Dashboard → SQL Editor에서 실행
- 에러가 발생하면 이미 컬럼이 존재하는 것일 수 있습니다 (IF NOT EXISTS가 중복 생성 방지)

### 데이터 저장 안 됨
- 브라우저 콘솔에서 에러 확인
- Supabase 테이블 구조에서 컬럼이 정상적으로 추가되었는지 확인

### 상세 페이지에 내용이 표시되지 않음
- 데이터가 실제로 저장되었는지 Supabase 테이블에서 확인
- 빈 값(null)이면 해당 섹션이 표시되지 않습니다

## 참고
- 기존 포트폴리오 데이터는 그대로 유지됩니다
- 새로운 필드는 모두 NULL을 허용하므로 기존 데이터에 영향 없음
- 필요한 포트폴리오만 상세 정보를 추가하면 됩니다
