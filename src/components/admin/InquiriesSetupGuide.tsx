import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { AlertCircle, Copy, Database } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

export function InquiriesSetupGuide() {
  const [copied, setCopied] = useState(false);

  const sqlCode = `-- Inquiries 테이블 생성 (문의 관리)
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new', -- new, in_progress, completed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security 활성화
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 문의를 생성할 수 있도록 허용
CREATE POLICY "Allow public insert on inquiries" ON inquiries FOR INSERT WITH CHECK (true);

-- 모든 사용자가 읽을 수 있도록 허용
CREATE POLICY "Allow public read access on inquiries" ON inquiries FOR SELECT USING (true);

-- 인증된 사용자만 수정/삭제 가능
CREATE POLICY "Allow authenticated update on inquiries" ON inquiries FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated delete on inquiries" ON inquiries FOR DELETE USING (true);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS inquiries_status_idx ON inquiries(status);
CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries(created_at);

-- budget_range와 target_audience 컬럼 추가 (portfolios 테이블)
ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS budget_range TEXT;
ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS target_audience TEXT;`;

  const handleCopy = () => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(sqlCode).then(() => {
          setCopied(true);
          toast.success('SQL 코드가 클립보드에 복사되었습니다!');
          setTimeout(() => setCopied(false), 2000);
        }).catch(() => {
          // Fallback if clipboard API fails
          fallbackCopy();
        });
      } else {
        // Use fallback for environments without clipboard API
        fallbackCopy();
      }
    } catch (error) {
      fallbackCopy();
    }
  };

  const fallbackCopy = () => {
    const textArea = document.createElement('textarea');
    textArea.value = sqlCode;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      setCopied(true);
      toast.success('SQL 코드가 클립보드에 복사되었습니다!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('복사에 실패했습니다. 수동으로 복사해주세요.');
    } finally {
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <Card className="p-8 rounded-xl border-2 border-yellow-200 bg-yellow-50">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Inquiries 테이블 설정 필요
            </h3>
            <p className="text-gray-700 leading-relaxed">
              문의 관리 기능을 사용하려면 Supabase에 <code className="px-2 py-0.5 bg-white rounded text-sm">inquiries</code> 테이블을 생성해야 합니다.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-gray-600" />
              <h4 className="font-semibold text-gray-900">SQL 스크립트</h4>
            </div>
            <Button
              onClick={handleCopy}
              variant="outline"
              size="sm"
              className="h-8 px-3 rounded-lg"
            >
              <Copy className="w-4 h-4 mr-1.5" />
              {copied ? '복사됨!' : '복사'}
            </Button>
          </div>
          
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
            <code>{sqlCode}</code>
          </pre>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">설정 방법:</h4>
          <ol className="space-y-3 text-gray-700 list-decimal list-inside">
            <li>위의 SQL 코드를 복사합니다</li>
            <li>
              <a 
                href="https://supabase.com/dashboard" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Supabase Dashboard
              </a>
              에 접속합니다
            </li>
            <li>프로젝트를 선택하고 왼쪽 메뉴에서 <strong>SQL Editor</strong>를 클릭합니다</li>
            <li>복사한 SQL 코드를 붙여넣고 <strong>Run</strong> 버튼을 클릭합니다</li>
            <li>이 페이지를 새로고침하면 문의 관리 기능을 사용할 수 있습니다</li>
          </ol>
        </div>

        <div className="mt-6 pt-6 border-t border-yellow-200">
          <p className="text-sm text-gray-600">
            💡 <strong>참고:</strong> 이 테이블은 홈페이지 Contact 폼에서 전송된 문의를 저장하고 관리하는데 사용됩니다.
          </p>
        </div>
      </Card>
    </div>
  );
}
