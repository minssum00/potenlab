# SEO 설정 가이드

Potenlab 웹사이트의 SEO는 자동으로 구성되어 있으며, 다음과 같은 기능을 제공합니다.

## 구현된 SEO 기능

### 1. 메타 태그 자동 관리
- **페이지별 동적 타이틀**: 현재 페이지에 따라 자동으로 변경
- **메타 설명**: 각 페이지의 내용을 요약한 설명
- **키워드**: 검색 엔진 최적화를 위한 키워드 설정
- **언어별 최적화**: 한국어/영어 버전 자동 전환

### 2. Open Graph 메타 태그
소셜 미디어(Facebook, LinkedIn 등)에서 링크 공유 시 표시되는 정보:
- `og:title` - 페이지 제목
- `og:description` - 페이지 설명
- `og:image` - 미리보기 이미지
- `og:url` - 페이지 URL
- `og:type` - 웹사이트 유형

### 3. Twitter Card 메타 태그
Twitter에서 링크 공유 시 표시되는 정보:
- `twitter:card` - 카드 유형
- `twitter:title` - 제목
- `twitter:description` - 설명
- `twitter:image` - 미리보기 이미지

### 4. 구조화된 데이터 (JSON-LD)
검색 엔진이 콘텐츠를 더 잘 이해할 수 있도록 구조화된 데이터 제공:
- **Organization Schema**: 회사 정보
- **Professional Service Schema**: 서비스 정보
- **Website Schema**: 웹사이트 정보

### 5. Canonical URL
중복 콘텐츠 문제를 방지하기 위한 표준 URL 설정

## 페이지별 SEO 설정

### 홈페이지
- 자동으로 기본 SEO 설정 적용
- 한국어/영어 자동 전환

### 서비스 상세 페이지
- 각 서비스별 고유한 메타 태그
- 서비스 제목과 설명을 자동으로 메타 태그에 반영

### 관리자 페이지
- noindex 설정 (검색 엔진에 노출되지 않음)
- 기본적인 메타 태그만 적용

## SEO 커스터마이징 방법

### 기본 SEO 설정 변경
`/utils/seo.ts` 파일의 `defaultSEO` 객체를 수정:

\`\`\`typescript
export const defaultSEO: Record<'ko' | 'en', SEOConfig> = {
  ko: {
    title: '제목',
    description: '설명',
    keywords: '키워드1, 키워드2',
    ogImage: '이미지 URL', // 추가
    // ...
  }
}
\`\`\`

### Open Graph 이미지 추가
1. 대표 이미지 준비 (권장 크기: 1200x630px)
2. 이미지 URL을 `defaultSEO`에 추가:

\`\`\`typescript
ogImage: 'https://www.potenlab.dev/og-image.jpg'
\`\`\`

### 구조화된 데이터 수정
`/components/SEOJsonLd.tsx` 파일에서 스키마 수정:

\`\`\`typescript
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Potenlab",
  "contactPoint": {
    "telephone": "+82-XX-XXXX-XXXX", // 전화번호 추가
    "email": "contact@potenlab.dev"
  }
}
\`\`\`

## SEO 체크리스트

### 필수 항목
- [x] 페이지 타이틀 설정
- [x] 메타 설명 설정
- [x] Open Graph 태그
- [x] Twitter Card 태그
- [x] 구조화된 데이터
- [x] Canonical URL
- [x] 반응형 디자인
- [x] 다국어 지원

### 권장 항목
- [ ] Open Graph 이미지 추가
- [ ] Sitemap.xml 생성
- [ ] Robots.txt 설정
- [ ] Google Analytics 연동
- [ ] Google Search Console 등록
- [ ] 페이지 로딩 속도 최적화
- [ ] 모바일 친화성 테스트

## SEO 도구

### 테스트 도구
1. **Google Rich Results Test**: https://search.google.com/test/rich-results
   - 구조화된 데이터 검증

2. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
   - Open Graph 태그 확인

3. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
   - Twitter Card 미리보기

4. **Google PageSpeed Insights**: https://pagespeed.web.dev/
   - 페이지 속도 및 성능 측정

### 분석 도구
1. **Google Analytics**: 방문자 분석
2. **Google Search Console**: 검색 성능 분석
3. **Naver Search Advisor**: 네이버 검색 최적화

## 추가 개선 사항

### 1. Sitemap 생성
검색 엔진이 모든 페이지를 크롤링할 수 있도록 sitemap.xml 생성 권장

### 2. Robots.txt
크롤러 접근 제어를 위한 robots.txt 파일 생성

\`\`\`
User-agent: *
Allow: /
Disallow: /admin/

Sitemap: https://www.potenlab.dev/sitemap.xml
\`\`\`

### 3. 로컬 SEO
한국 지역 타겟팅을 위한 추가 설정:
- Google My Business 등록
- Naver Place 등록
- 주소 및 연락처 정보 구조화된 데이터에 추가

### 4. 성능 최적화
- 이미지 최적화 (WebP 포맷 사용)
- 코드 스플리팅
- 캐싱 전략
- CDN 사용

## 문의
SEO 관련 문의사항은 개발팀에 연락주세요.
