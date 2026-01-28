# Error Fixes Guide

이 문서는 Potenlab 웹사이트에서 발생할 수 있는 오류와 해결 방법을 설명합니다.

## ✅ 해결된 문제들

### 1. React forwardRef 오류

**문제:** `Function components cannot be given refs` 경고

**원인:** DialogOverlay 컴포넌트가 Radix UI의 SlotClone과 함께 사용될 때 ref를 전달받지 못함

**해결:** DialogOverlay를 `React.forwardRef`로 래핑하고 displayName 추가

```tsx
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      // ... props
    />
  );
});
DialogOverlay.displayName = "DialogOverlay";
```

**파일:** `/components/ui/dialog.tsx`

---

### 2. 접근성 경고 (Missing Description)

**문제:** `Missing Description or aria-describedby={undefined} for {DialogContent}` 경고

**원인:** WCAG 접근성 가이드라인에 따라 Dialog는 제목(Title)과 설명(Description)이 모두 필요함

**해결:** 모든 Dialog에 DialogDescription 추가

```tsx
<DialogHeader>
  <DialogTitle>포트폴리오 수정</DialogTitle>
  <DialogDescription>
    포트폴리오 정보를 수정하세요
  </DialogDescription>
</DialogHeader>
```

**적용된 파일:**
- `/components/admin/AdminPortfolio.tsx`
- `/components/admin/AdminContents.tsx`

---

### 3. 데이터베이스 스키마 오류

**문제:** `Could not find the 'collaboration_tools' column of 'portfolios' in the schema cache`

**원인:** 기존 데이터베이스 테이블에 새로 추가된 컬럼이 없음

**해결 방법:**

#### 자동 감지 및 가이드
시스템이 자동으로 이 오류를 감지하고 마이그레이션 가이드를 표시합니다.

#### 수동 마이그레이션 (권장)

1. **Supabase Dashboard 접속**
   - 프로젝트의 Supabase Dashboard로 이동

2. **SQL Editor 열기**
   - 왼쪽 메뉴에서 "SQL Editor" 선택

3. **마이그레이션 SQL 실행**
   ```sql
   -- 포트폴리오 테이블에 누락된 컬럼 추가
   ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS collaboration_tools TEXT;
   ```

4. **페이지 새로고침**
   - 관리자 페이지를 새로고침하여 변경사항 적용

#### 전체 테이블 재생성 (선택사항)

기존 데이터를 모두 삭제하고 새로 시작하려면:

1. 기존 테이블 백업 (선택)
2. SQL Editor에서 `/utils/supabase/setup.sql` 파일의 전체 내용 실행
3. 테이블이 재생성되고 모든 컬럼이 포함됨

**파일:**
- `/components/admin/DatabaseMigrationGuide.tsx` - 자동 가이드 컴포넌트
- `/utils/supabase/setup.sql` - 전체 스키마 정의

---

## 📋 체크리스트

관리자 페이지가 정상 작동하는지 확인하세요:

- [ ] Dialog가 오류 없이 열림
- [ ] 포트폴리오 생성/수정 가능
- [ ] 콘텐츠 생성/수정 가능
- [ ] 이미지 업로드 정상 작동
- [ ] Console에 React 경고 없음

---

## 🔧 추가 문제 해결

### 문의 테이블 (inquiries) 오류

문의 관리 페이지에서 오류가 발생한다면:

```sql
-- 문의 테이블 생성
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security 활성화
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Policy 생성
CREATE POLICY "Allow public insert on inquiries" 
  ON inquiries FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access on inquiries" 
  ON inquiries FOR SELECT USING (true);

CREATE POLICY "Allow authenticated update on inquiries" 
  ON inquiries FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated delete on inquiries" 
  ON inquiries FOR DELETE USING (true);
```

---

## 💡 베스트 프랙티스

1. **정기 백업**: 중요한 데이터는 정기적으로 백업
2. **마이그레이션 테스트**: 스테이징 환경에서 먼저 테스트
3. **버전 관리**: setup.sql 파일을 Git으로 관리
4. **문서화**: 커스텀 변경사항은 문서화

---

## 📚 참고 자료

- [Radix UI Dialog Docs](https://www.radix-ui.com/docs/primitives/components/dialog)
- [Supabase SQL Editor](https://supabase.com/docs/guides/database/sql-editor)
- [WCAG Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
