import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { ArrowLeft, Upload, Loader2 } from 'lucide-react';
import { useRouter } from '../../contexts/RouterContext';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-xml-doc';
import 'prismjs/themes/prism.css';

interface GlobalSEOSettings {
  organizationSchema: string;
  sitemapXml: string;
  robotsTxt: string;
  customHeadCode: string;
  ogImageKo?: string;
  ogImageEn?: string;
  titleKo?: string;
  titleEn?: string;
  descriptionKo?: string;
  descriptionEn?: string;
  keywordsKo?: string;
  keywordsEn?: string;
  ogTitleKo?: string;
  ogTitleEn?: string;
  ogDescriptionKo?: string;
  ogDescriptionEn?: string;
}

export function AdminSEOGlobal() {
  const { navigate } = useRouter();
  const [settings, setSettings] = useState<GlobalSEOSettings>({
    organizationSchema: '',
    sitemapXml: '',
    robotsTxt: '',
    customHeadCode: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [uploadingKo, setUploadingKo] = useState(false);
  const [uploadingEn, setUploadingEn] = useState(false);

  // 기본 템플릿
  const defaultStructuredData = `{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "PotenLab",
  "url": "https://potenlab.dev",
  "logo": "https://potenlab.dev/logo.png",
  "description": "IT 컨설팅, MVP 개발, AI 개발, UX/UI 기획 전문 회사",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "email": "contact@potenlab.dev"
  },
  "sameAs": [
    "https://www.linkedin.com/company/potenlab",
    "https://twitter.com/potenlab"
  ]
}`;

  const defaultSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://potenlab.dev/</loc>
    <lastmod>2025-12-09</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://potenlab.dev/services</loc>
    <lastmod>2025-12-09</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://potenlab.dev/portfolio</loc>
    <lastmod>2025-12-09</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://potenlab.dev/contents</loc>
    <lastmod>2025-12-09</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

  const defaultRobotsTxt = `User-agent: *
Allow: /

Sitemap: https://potenlab.dev/sitemap.xml`;

  const defaultCustomHeadCode = `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->

<!-- Meta Pixel Code (Facebook Pixel) -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
<!-- End Meta Pixel Code -->`;

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/seo-settings/global`,
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
          setSettings({
            organizationSchema: defaultStructuredData,
            sitemapXml: defaultSitemap,
            robotsTxt: defaultRobotsTxt,
            customHeadCode: defaultCustomHeadCode
          });
        }
      } else {
        // Silently handle non-OK responses - use default values
        setSettings({
          organizationSchema: defaultStructuredData,
          sitemapXml: defaultSitemap,
          robotsTxt: defaultRobotsTxt,
          customHeadCode: defaultCustomHeadCode
        });
      }
    } catch (error) {
      // Silently catch errors - SEO settings are optional
      setSettings({
        organizationSchema: defaultStructuredData,
        sitemapXml: defaultSitemap,
        robotsTxt: defaultRobotsTxt,
        customHeadCode: defaultCustomHeadCode
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/seo-settings/global`,
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
        setMessage({ type: 'success', text: '전역 SEO 설정이 저장되었습니다.' });
      } else {
        throw new Error('Failed to save global SEO settings');
      }
    } catch (error) {
      console.error('Error saving global SEO settings:', error);
      setMessage({ type: 'error', text: '전역 SEO 설정 저장에 실패했습니다.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field: keyof GlobalSEOSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (file: File, lang: 'ko' | 'en') => {
    const setUploading = lang === 'ko' ? setUploadingKo : setUploadingEn;
    setUploading(true);
    
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
      const field = lang === 'ko' ? 'ogImageKo' : 'ogImageEn';
      handleChange(field, data.url);
      setMessage({ type: 'success', text: `${lang === 'ko' ? '한국어' : '영어'} OG 이미지가 업로드되었습니다.` });
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage({ type: 'error', text: '이미지 업로드에 실패했습니다.' });
    } finally {
      setUploading(false);
    }
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
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('admin-seo')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold">전역 SEO 설정</h2>
            <p className="text-gray-500 mt-1">사이트 전체에 적용되는 SEO 설정</p>
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

      {/* 기본 SEO 설정 */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">기본 SEO 설정</h3>
        <p className="text-sm text-gray-500 mb-6">
          홈페이지의 기본 메타 태그 정보입니다.
        </p>
        
        <div className="grid grid-cols-2 gap-6">
          {/* 한국어 */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-700">한국어 (KO)</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title (제목)
              </label>
              <input
                type="text"
                value={settings.titleKo || ''}
                onChange={(e) => handleChange('titleKo', e.target.value)}
                placeholder="Potenlab - IT 컨설팅 & MVP 개발 전문"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0079FF]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (설명)
              </label>
              <textarea
                value={settings.descriptionKo || ''}
                onChange={(e) => handleChange('descriptionKo', e.target.value)}
                placeholder="IT컨설팅, MVP개발, AI개발, UX/UI기획 전문. 비즈니스 관점의 완성도 있는 프로덕트 제작"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0079FF]"
              />
              {settings.descriptionKo && settings.descriptionKo.length > 80 && (
                <p className="text-sm text-orange-600 mt-1 flex items-center gap-1">
                  ⚠️ 사용자가 쉽게 사이트를 파악할 수 있도록 80자 이내로 설명문을 작성해주세요.
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                {settings.descriptionKo?.length || 0} / 80자 (권장)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords (키워드)
              </label>
              <input
                type="text"
                value={settings.keywordsKo || ''}
                onChange={(e) => handleChange('keywordsKo', e.target.value)}
                placeholder="IT 컨설팅, MVP 개발, AI 개발"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0079FF]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OG Title (소셜 미디어 제목)
              </label>
              <input
                type="text"
                value={settings.ogTitleKo || ''}
                onChange={(e) => handleChange('ogTitleKo', e.target.value)}
                placeholder="비워두면 Title 사용"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0079FF]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OG Description (소셜 미디어 설명)
              </label>
              <textarea
                value={settings.ogDescriptionKo || ''}
                onChange={(e) => handleChange('ogDescriptionKo', e.target.value)}
                placeholder="비워두면 Description 사용"
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0079FF]"
              />
              {settings.ogDescriptionKo && settings.ogDescriptionKo.length > 80 && (
                <p className="text-sm text-orange-600 mt-1 flex items-center gap-1">
                  ⚠️ 사용자가 쉽게 사이트를 파악할 수 있도록 80자 이내로 설명문을 작성해주세요.
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                {settings.ogDescriptionKo?.length || 0} / 80자 (권장)
              </p>
            </div>
          </div>

          {/* 영어 */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-700">English (EN)</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={settings.titleEn || ''}
                onChange={(e) => handleChange('titleEn', e.target.value)}
                placeholder="Potenlab - IT Consulting & MVP Development"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0079FF]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={settings.descriptionEn || ''}
                onChange={(e) => handleChange('descriptionEn', e.target.value)}
                placeholder="Specialized in IT consulting, MVP development, AI, and UX/UI"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0079FF]"
              />
              {settings.descriptionEn && settings.descriptionEn.length > 80 && (
                <p className="text-sm text-orange-600 mt-1 flex items-center gap-1">
                  ⚠️ Manage and customize icons for rules efficiently, allowing users to modify previously registered images for enhanced organization and clarity.
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                {settings.descriptionEn?.length || 0} / 80 characters (recommended)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords
              </label>
              <input
                type="text"
                value={settings.keywordsEn || ''}
                onChange={(e) => handleChange('keywordsEn', e.target.value)}
                placeholder="IT consulting, MVP development, AI"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0079FF]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OG Title
              </label>
              <input
                type="text"
                value={settings.ogTitleEn || ''}
                onChange={(e) => handleChange('ogTitleEn', e.target.value)}
                placeholder="Leave empty to use Title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0079FF]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OG Description
              </label>
              <textarea
                value={settings.ogDescriptionEn || ''}
                onChange={(e) => handleChange('ogDescriptionEn', e.target.value)}
                placeholder="Leave empty to use Description"
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0079FF]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* OG 이미지 설정 */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">OG Image (Open Graph 이미지)</h3>
        <p className="text-sm text-gray-500 mb-6">
          소셜 미디어에서 링크 공유 시 표시되는 미리보기 이미지입니다. 권장 크기: 1200x630px
        </p>
        
        {/* 한국어 OG 이미지 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            한국어 OG 이미지
          </label>
          <div className="flex items-start gap-4">
            {settings.ogImageKo && (
              <div className="flex-shrink-0">
                <img
                  src={settings.ogImageKo}
                  alt="한국어 OG 이미지"
                  className="w-64 h-auto rounded-lg border border-gray-200"
                />
              </div>
            )}
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file, 'ko');
                }}
                disabled={uploadingKo}
                className="hidden"
                id="og-image-ko"
              />
              <label
                htmlFor="og-image-ko"
                className={`inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                  uploadingKo ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {uploadingKo ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>업로드 중...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>이미지 업로드</span>
                  </>
                )}
              </label>
              {settings.ogImageKo && (
                <p className="text-xs text-gray-500 mt-2">
                  {settings.ogImageKo}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 영어 OG 이미지 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            영어 OG 이미지
          </label>
          <div className="flex items-start gap-4">
            {settings.ogImageEn && (
              <div className="flex-shrink-0">
                <img
                  src={settings.ogImageEn}
                  alt="영어 OG 이미지"
                  className="w-64 h-auto rounded-lg border border-gray-200"
                />
              </div>
            )}
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file, 'en');
                }}
                disabled={uploadingEn}
                className="hidden"
                id="og-image-en"
              />
              <label
                htmlFor="og-image-en"
                className={`inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                  uploadingEn ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {uploadingEn ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>업로드 중...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>이미지 업로드</span>
                  </>
                )}
              </label>
              {settings.ogImageEn && (
                <p className="text-xs text-gray-500 mt-2">
                  {settings.ogImageEn}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 구조화 데이터 */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Organization Schema (JSON-LD)</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            구조화 데이터
          </label>
          <Editor
            value={settings.organizationSchema}
            onValueChange={(code) => handleChange('organizationSchema', code)}
            highlight={(code) => Prism.highlight(code, Prism.languages.json, 'json')}
            padding={10}
            style={{
              fontFamily: 'Fira code, Fira Mono, Consolas, Menlo, Courier, monospace',
              fontSize: 14,
              border: '1px solid #ccc',
              borderRadius: '4px',
              height: '150px'
            }}
          />
          <p className="text-xs text-gray-500 mt-1">JSON-LD 형식으로 입력해주세요.</p>
        </div>
      </div>

      {/* Sitemap.xml */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Sitemap.xml</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            사이트맵 XML
          </label>
          <Editor
            value={settings.sitemapXml}
            onValueChange={(code) => handleChange('sitemapXml', code)}
            highlight={(code) => Prism.highlight(code, Prism.languages.xml, 'xml')}
            padding={10}
            style={{
              fontFamily: 'Fira code, Fira Mono, Consolas, Menlo, Courier, monospace',
              fontSize: 14,
              border: '1px solid #ccc',
              borderRadius: '4px',
              height: '150px'
            }}
          />
        </div>
      </div>

      {/* Robots.txt */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Robots.txt</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            로봇 크롤링 규칙
          </label>
          <Editor
            value={settings.robotsTxt}
            onValueChange={(code) => handleChange('robotsTxt', code)}
            highlight={(code) => Prism.highlight(code, Prism.languages.markup, 'markup')}
            padding={10}
            style={{
              fontFamily: 'Fira code, Fira Mono, Consolas, Menlo, Courier, monospace',
              fontSize: 14,
              border: '1px solid #ccc',
              borderRadius: '4px',
              height: '100px'
            }}
          />
        </div>
      </div>

      {/* Custom Head Code */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold mb-2">Custom Head Code</h3>
        <p className="text-sm text-gray-500 mb-4">
          사이트의 모든 페이지 &lt;head&gt; 태그에 추가될 커스텀 코드입니다.
        </p>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            커스텀 헤드 코드
          </label>
          <div className="code-editor-wrapper">
            <Editor
              value={settings.customHeadCode}
              onValueChange={(code) => handleChange('customHeadCode', code)}
              highlight={(code) => Prism.highlight(code, Prism.languages.markup, 'markup')}
              padding={12}
              className="prism-code"
              style={{
                fontFamily: '"Fira Code", "Fira Mono", Consolas, Monaco, monospace',
                fontSize: 13,
                lineHeight: 1.6,
                background: '#1e1e1e',
                color: '#d4d4d4',
                borderRadius: '8px',
                minHeight: '256px',
                maxHeight: '400px',
                overflow: 'auto'
              }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Google Analytics, Facebook Pixel, 기타 추적 스크립트 등을 추가할 수 있습니다.
          </p>
        </div>
      </div>

      {/* 하단 저장 버튼 */}
      <div className="flex justify-end">
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