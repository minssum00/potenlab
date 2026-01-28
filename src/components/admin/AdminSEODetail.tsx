import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { ArrowLeft, Upload, Loader2 } from 'lucide-react';
import { useRouter } from '../../contexts/RouterContext';

interface PageSEOSettings {
  pageId: string;
  pageTitle: string;
  metaDescription: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  pageUrl: string;
  h1Title: string;
  h2Titles: string;
  h3Titles: string;
  contentSummary: string;
  imageAltTexts: string;
}

const pages: { [key: string]: { nameKo: string; nameEn: string; url: string } } = {
  'home': { nameKo: '홈', nameEn: 'Home', url: 'https://potenlab.dev/' },
  'services': { nameKo: '서비스', nameEn: 'Services', url: 'https://potenlab.dev/services' },
  'portfolio': { nameKo: '포트폴리오', nameEn: 'Portfolio', url: 'https://potenlab.dev/portfolio' },
  'contents': { nameKo: '콘텐츠', nameEn: 'Contents', url: 'https://potenlab.dev/contents' },
  'lecture': { nameKo: '강의', nameEn: 'Lecture', url: 'https://potenlab.dev/lecture' },
  'mvp-detail': { nameKo: 'MVP 개발 상세', nameEn: 'MVP Detail', url: 'https://potenlab.dev/mvp-detail' },
  'uxui-detail': { nameKo: 'UX/UI 기획 상세', nameEn: 'UX/UI Detail', url: 'https://potenlab.dev/uxui-detail' },
  'webapp-detail': { nameKo: 'Product 개발 상세', nameEn: 'Product Detail', url: 'https://potenlab.dev/webapp-detail' },
  'rnd-detail': { nameKo: 'R&D 개발 상세', nameEn: 'R&D Detail', url: 'https://potenlab.dev/rnd-detail' }
};

export function AdminSEODetail() {
  const { navigate, getRouteParams } = useRouter();
  const routeParams = getRouteParams();
  const pageId = routeParams?.pageId as string;
  const pageInfo = pages[pageId];

  const [settings, setSettings] = useState<PageSEOSettings>({
    pageId: pageId || '',
    pageTitle: '',
    metaDescription: '',
    keywords: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    pageUrl: pageInfo?.url || '',
    h1Title: '',
    h2Titles: '',
    h3Titles: '',
    contentSummary: '',
    imageAltTexts: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (pageId) {
      fetchPageSettings();
    }
  }, [pageId]);

  const fetchPageSettings = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/seo-settings/pages/${pageId}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.settings) {
          setSettings(data.settings);
        } else {
          // 기본값 설정
          setSettings(prev => ({
            ...prev,
            pageId,
            pageUrl: pageInfo?.url || ''
          }));
        }
      } else {
        // Silently handle non-OK responses - use default values
        setSettings(prev => ({
          ...prev,
          pageId,
          pageUrl: pageInfo?.url || ''
        }));
      }
    } catch (error) {
      // Silently catch errors - SEO settings are optional
      setSettings(prev => ({
        ...prev,
        pageId,
        pageUrl: pageInfo?.url || ''
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/seo-settings/pages/${pageId}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(settings)
        }
      );

      if (response.ok) {
        setMessage({ type: 'success', text: 'SEO 설정이 저장되었습니다.' });
      } else {
        throw new Error('Failed to save SEO settings');
      }
    } catch (error) {
      console.error('Error saving SEO settings:', error);
      setMessage({ type: 'error', text: 'SEO 설정 저장에 실패했습니다.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field: keyof PageSEOSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/upload-image`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error('Image upload failed');
      }

      const data = await response.json();
      handleChange('ogImage', data.url);
      setMessage({ type: 'success', text: 'OG 이미지가 업로드되었습니다.' });
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage({ type: 'error', text: '이미지 업로드에 실패했습니다.' });
    } finally {
      setUploadingImage(false);
    }
  };

  if (!pageId || !pageInfo) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-gray-400">페이지를 찾을 수 없습니다.</div>
      </div>
    );
  }

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
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('admin-seo')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold">{pageInfo.nameKo} - SEO 설정</h2>
            <p className="text-gray-500 mt-1">{pageInfo.url}</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2 bg-[#0079FF] text-white rounded-lg hover:bg-[#0066DD] transition-colors disabled:opacity-50"
        >
          {isSaving ? '저장 중...' : '설정 저장'}
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message.text}
        </div>
      )}

      {/* 기본 메타 정보 */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">기본 메타 정보</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              페이지 Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={settings.pageTitle}
              onChange={(e) => handleChange('pageTitle', e.target.value)}
              placeholder={`${pageInfo.nameKo} - PotenLab`}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0079FF]"
            />
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-gray-500">권장: 50-60자 이내</p>
              <p className="text-xs text-gray-400">{settings.pageTitle.length}자</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Meta Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={settings.metaDescription}
              onChange={(e) => handleChange('metaDescription', e.target.value)}
              placeholder="페이지 설명을 입력하세요"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0079FF] h-24"
            />
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-gray-500">권장: 150-160자 이내</p>
              <p className="text-xs text-gray-400">{settings.metaDescription.length}자</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Keywords (쉼표로 구분)
            </label>
            <input
              type="text"
              value={settings.keywords}
              onChange={(e) => handleChange('keywords', e.target.value)}
              placeholder="키워드1, 키워드2, 키워드3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0079FF]"
            />
            <p className="text-xs text-gray-500 mt-1">5-10개 정도의 키워드를 입력하세요</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              페이지 URL
            </label>
            <input
              type="text"
              value={settings.pageUrl}
              onChange={(e) => handleChange('pageUrl', e.target.value)}
              placeholder={pageInfo.url}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0079FF]"
            />
          </div>
        </div>
      </div>

      {/* Open Graph 설정 */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Open Graph (소셜 미디어)</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              OG Title
            </label>
            <input
              type="text"
              value={settings.ogTitle}
              onChange={(e) => handleChange('ogTitle', e.target.value)}
              placeholder={settings.pageTitle || `${pageInfo.nameKo} - PotenLab`}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0079FF]"
            />
            <p className="text-xs text-gray-500 mt-1">비워두면 페이지 Title을 사용합니다</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              OG Description
            </label>
            <textarea
              value={settings.ogDescription}
              onChange={(e) => handleChange('ogDescription', e.target.value)}
              placeholder={settings.metaDescription}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0079FF] h-24"
            />
            <p className="text-xs text-gray-500 mt-1">비워두면 Meta Description을 사용합니다</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              OG Image
            </label>
            {settings.ogImage && (
              <div className="mb-3">
                <img
                  src={settings.ogImage}
                  alt="OG 이미지 미리보기"
                  className="w-full max-w-md h-auto rounded-lg border border-gray-200"
                />
              </div>
            )}
            <div className="flex gap-3">
              <input
                type="text"
                value={settings.ogImage}
                onChange={(e) => handleChange('ogImage', e.target.value)}
                placeholder="https://potenlab.dev/og-image.jpg"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0079FF]"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file);
                }}
                disabled={uploadingImage}
                className="hidden"
                id="og-image-upload"
              />
              <label
                htmlFor="og-image-upload"
                className={`inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                  uploadingImage ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {uploadingImage ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>업로드 중...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>업로드</span>
                  </>
                )}
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-1">권장 크기: 1200x630px | URL 직접 입력 또는 이미지 파일 업로드</p>
          </div>
        </div>
      </div>

      {/* 제목 구조 */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">제목 구조 (H1-H3)</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              H1 제목
            </label>
            <input
              type="text"
              value={settings.h1Title}
              onChange={(e) => handleChange('h1Title', e.target.value)}
              placeholder="페이지의 메인 제목"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0079FF]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              H2 제목들 (줄바꿈으로 구분)
            </label>
            <textarea
              value={settings.h2Titles}
              onChange={(e) => handleChange('h2Titles', e.target.value)}
              placeholder="주요 섹션 제목 1&#10;주요 섹션 제목 2&#10;주요 섹션 제목 3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0079FF] h-24"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              H3 제목들 (줄바꿈으로 구분)
            </label>
            <textarea
              value={settings.h3Titles}
              onChange={(e) => handleChange('h3Titles', e.target.value)}
              placeholder="하위 섹션 제목 1&#10;하위 섹션 제목 2&#10;하위 섹션 제목 3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0079FF] h-24"
            />
          </div>
        </div>
      </div>

      {/* 본문 요약 */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">본문 요약문</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            페이지 본문 요약 (키워드 포함)
          </label>
          <textarea
            value={settings.contentSummary}
            onChange={(e) => handleChange('contentSummary', e.target.value)}
            placeholder="페이지의 주요 내용을 요약하고 주요 키워드를 포함하세요"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0079FF] h-32"
          />
        </div>
      </div>

      {/* 이미지 ALT 텍스트 */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">이미지 ALT 텍스트</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            주요 이미지 ALT 텍스트 (줄바꿈으로 구분)
          </label>
          <textarea
            value={settings.imageAltTexts}
            onChange={(e) => handleChange('imageAltTexts', e.target.value)}
            placeholder="메인 이미지 설명&#10;서브 이미지 1 설명&#10;서브 이미지 2 설명"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0079FF] h-32"
          />
        </div>
      </div>

      {/* 하단 저장 버튼 */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => navigate('admin-seo')}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          취소
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-8 py-3 bg-[#0079FF] text-white rounded-lg hover:bg-[#0066DD] transition-colors disabled:opacity-50"
        >
          {isSaving ? '저장 중...' : '설정 저장'}
        </button>
      </div>
    </div>
  );
}