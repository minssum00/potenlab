import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { Settings, FileText, ChevronRight } from 'lucide-react';
import { useRouter } from '../../contexts/RouterContext';

interface PageSEO {
  pageId: string;
  pageTitle: string;
  metaDescription: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  pageUrl: string;
  updatedAt?: string;
}

const pages = [
  { id: 'services', nameKo: '서비스', nameEn: 'Services', url: '/services' },
  { id: 'portfolio', nameKo: '포트폴리오', nameEn: 'Portfolio', url: '/portfolio' },
  { id: 'contents', nameKo: '콘텐츠', nameEn: 'Contents', url: '/contents' },
  { id: 'lecture', nameKo: '강의', nameEn: 'Lecture', url: '/lecture' },
  { id: 'mvp-detail', nameKo: 'MVP 개발 상세', nameEn: 'MVP Detail', url: '/mvp-detail' },
  { id: 'uxui-detail', nameKo: 'UX/UI 기획 상세', nameEn: 'UX/UI Detail', url: '/uxui-detail' },
  { id: 'webapp-detail', nameKo: 'Product 개발 상세', nameEn: 'Product Detail', url: '/webapp-detail' },
  { id: 'rnd-detail', nameKo: 'R&D 개발 상세', nameEn: 'R&D Detail', url: '/rnd-detail' }
];

export function AdminSEO() {
  const { navigate } = useRouter();
  const [pageSEOList, setPageSEOList] = useState<PageSEO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPageSEOList();
  }, []);

  const fetchPageSEOList = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/seo-settings/pages`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPageSEOList(data.pages || []);
      } else {
        // Silently handle non-OK responses
        setPageSEOList([]);
      }
    } catch (error) {
      // Silently catch errors - SEO settings are optional
      setPageSEOList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageClick = (pageId: string) => {
    navigate('admin-seo-detail', null, null, { pageId });
  };

  const getPageSEO = (pageId: string) => {
    return pageSEOList.find(p => p.pageId === pageId);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '미설정';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-gray-400">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">SEO 설정</h2>
          <p className="text-gray-500 mt-1">각 페이지별 SEO 메타데이터를 관리합니다</p>
        </div>
      </div>

      {/* 전역 SEO 설정 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-[#0079FF]/10 flex items-center justify-center">
            <Settings className="w-5 h-5 text-[#0079FF]" />
          </div>
          <div>
            <h3 className="font-semibold">전역 SEO 설정</h3>
            <p className="text-sm text-gray-500">사이트 전체에 적용되는 기본 SEO 설정</p>
          </div>
        </div>
        <button
          onClick={() => navigate('admin-seo-global')}
          className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Organization Schema, Sitemap, Robots.txt</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* 페이지별 SEO 설정 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-[#0079FF]/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-[#0079FF]" />
          </div>
          <div>
            <h3 className="font-semibold">페이지별 SEO 설정</h3>
            <p className="text-sm text-gray-500">각 페이지의 메타데이터를 개별 설정</p>
          </div>
        </div>

        <div className="space-y-2">
          {pages.map((page) => {
            const pageSEO = getPageSEO(page.id);
            const isConfigured = !!pageSEO?.pageTitle;

            return (
              <button
                key={page.id}
                onClick={() => handlePageClick(page.id)}
                className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${isConfigured ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <div className="text-left">
                    <div className="text-sm font-medium">{page.nameKo}</div>
                    <div className="text-xs text-gray-500">{page.url}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">
                    {formatDate(pageSEO?.updatedAt)}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 안내 메시지 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">💡 SEO 설정 가이드</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• 각 페이지의 Title은 50-60자 이내로 작성하세요</li>
          <li>• Meta Description은 150-160자 이내로 작성하세요</li>
          <li>• OG Image는 1200x630px 크기를 권장합니다</li>
          <li>• Keywords는 쉼표로 구분하여 5-10개 정도 입력하세요</li>
        </ul>
      </div>
    </div>
  );
}