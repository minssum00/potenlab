import { useState, useEffect, useCallback } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RichTextEditor } from './RichTextEditor';
import { Card } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ArrowLeft, Save, Languages, Upload, Loader2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { useRouter } from '../../contexts/RouterContext';

interface Article {
  id: string;
  number: string;
  title_ko: string;
  title_en: string;
  subtitle_ko: string;
  subtitle_en: string;
  highlightColor: string;
  date: string;
  type: 'dev-insight' | 'ux-ui' | 'it-guide' | 'project-story' | 'business' | 'rnd';
  appStore?: 'google' | 'apple';
  url?: string; // URL ID for routing
  content_ko?: string;
  content_en?: string;
  externalUrl?: string; // External URL for linking
  linkType?: 'internal' | 'external'; // Type of link
  thumbnailImage?: string; // Thumbnail image URL
  createdAt: string;
  updatedAt: string;
}

export function AdminArticleForm() {
  const { navigate, getRouteParams } = useRouter();
  const params = getRouteParams();
  const mode = params?.mode as 'new' | 'edit';
  const articleId = params?.articleId as string;

  const [loading, setLoading] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
  const [formData, setFormData] = useState<Partial<Article>>({
    number: '',
    title_ko: '',
    title_en: '',
    subtitle_ko: '',
    subtitle_en: '',
    highlightColor: '#00C18A',
    date: new Date().toISOString().split('T')[0],
    type: 'dev-insight',
    linkType: 'internal', // Default to internal (본문 보기)
    content_ko: '',
    content_en: '',
    thumbnailImage: ''
  });

  useEffect(() => {
    if (mode === 'edit' && articleId) {
      loadArticle(articleId);
    }
  }, [mode, articleId]);

  const loadArticle = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/articles`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        const article = data.articles?.find((a: Article) => a.id === id);
        if (article) {
          setFormData(article);
        }
      }
    } catch (error) {
      console.error('Error loading article:', error);
      toast.error('아티클 로딩 실패');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const url = mode === 'edit' && articleId
        ? `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/articles/${articleId}`
        : `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/articles`;

      const method = mode === 'edit' ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success(mode === 'edit' ? '수정되었습니다' : '등록되었습니다');
        navigate('admin-article');
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Error saving article:', error);
      toast.error('저장 실패');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('admin-article');
  };

  // Memoize onChange handlers to prevent infinite loops
  const handleContentKoChange = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, content_ko: value }));
  }, []);

  const handleContentEnChange = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, content_en: value }));
  }, []);

  // Auto-translate Korean content to English
  const handleAutoTranslate = async () => {
    if (!formData.content_ko || formData.content_ko.trim() === '') {
      toast.error('한국어 본문을 먼저 입력해주세요');
      return;
    }

    setTranslating(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/translate`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            text: formData.content_ko,
            sourceLang: 'ko',
            targetLang: 'en'
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFormData(prev => ({ ...prev, content_en: data.translatedText }));
        toast.success('번역이 완료되었습니다');
      } else {
        const error = await response.text();
        console.error('Translation error:', error);
        toast.error('번역에 실패했습니다');
      }
    } catch (error) {
      console.error('Error translating content:', error);
      toast.error('번역 중 오류가 발생했습니다');
    } finally {
      setTranslating(false);
    }
  };

  // Upload thumbnail image
  const handleUploadThumbnail = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingThumbnail(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/upload-thumbnail`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: formData
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFormData(prev => ({ ...prev, thumbnailImage: data.url }));
        toast.success('썸네일 업로드 성공');
      } else {
        const error = await response.text();
        console.error('Upload error:', error);
        toast.error('썸네일 업로드 실패');
      }
    } catch (error) {
      console.error('Error uploading thumbnail:', error);
      toast.error('썸네일 업로드 중 오류가 발생했습니다');
    } finally {
      setIsUploadingThumbnail(false);
    }
  };

  if (loading && mode === 'edit') {
    return <div className="text-center py-8">로딩 중...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={handleBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          목록으로
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {mode === 'edit' ? '아티클 수정' : '새 아티클 등록'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {mode === 'edit' ? '아티클 정보를 수정합니다' : '새로운 아티클을 등록합니다'}
          </p>
        </div>
      </div>

      {/* Form */}
      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
              <div className="w-1 h-5 bg-[#0079FF] rounded-full"></div>
              <h3 className="text-[16px] font-bold text-[#0E1116]">기본 정보</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <Label className="mb-2 block text-[13px] font-semibold text-[#0E1116]">아티클 타입</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: 'dev-insight' | 'ux-ui' | 'it-guide' | 'project-story' | 'business' | 'rnd') => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="아티클 카테고리를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dev-insight">개발 인사이트</SelectItem>
                    <SelectItem value="ux-ui">UX·UI & 기획</SelectItem>
                    <SelectItem value="it-guide">IT 실무 가이드</SelectItem>
                    <SelectItem value="project-story">프로젝트 이야기</SelectItem>
                    <SelectItem value="business">비즈니스 & 스타트업</SelectItem>
                    <SelectItem value="rnd">R&D, 기술관련</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-2 block text-[13px] font-semibold text-[#0E1116]">번호</Label>
                <Input
                  className="h-12"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  placeholder="#1, #2, #3..."
                />
              </div>
            </div>
          </div>

          {/* Title Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
              <div className="w-1 h-5 bg-[#0079FF] rounded-full"></div>
              <h3 className="text-[16px] font-bold text-[#0E1116]">제목</h3>
            </div>
            <div className="space-y-4 bg-gray-50 p-5 rounded-xl">
              <div>
                <Label className="mb-2 block text-[13px] font-semibold text-[#0E1116]">한국어 제목</Label>
                <Input
                  required
                  className="h-12 bg-white"
                  value={formData.title_ko}
                  onChange={(e) => setFormData({ ...formData, title_ko: e.target.value })}
                  placeholder="예: 스타트업은 어떻게 성장하는가"
                />
              </div>
              <div>
                <Label className="mb-2 block text-[13px] font-medium text-[#666666]">English Title</Label>
                <Input
                  required
                  className="h-12 bg-white"
                  value={formData.title_en}
                  onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                  placeholder="e.g. How Startups Grow"
                />
              </div>
            </div>
          </div>

          {/* Subtitle Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
              <div className="w-1 h-5 bg-[#0079FF] rounded-full"></div>
              <h3 className="text-[16px] font-bold text-[#0E1116]">부제목</h3>
            </div>
            <div className="space-y-4 bg-gray-50 p-5 rounded-xl">
              <div>
                <Label className="mb-2 block text-[13px] font-semibold text-[#0E1116]">한국어 부제목</Label>
                <Input
                  required
                  className="h-12 bg-white"
                  value={formData.subtitle_ko}
                  onChange={(e) => setFormData({ ...formData, subtitle_ko: e.target.value })}
                  placeholder="예: 리브랜딩 할까?"
                />
              </div>
              <div>
                <Label className="mb-2 block text-[13px] font-medium text-[#666666]">English Subtitle</Label>
                <Input
                  required
                  className="h-12 bg-white"
                  value={formData.subtitle_en}
                  onChange={(e) => setFormData({ ...formData, subtitle_en: e.target.value })}
                  placeholder="e.g. Should We Rebrand?"
                />
              </div>
            </div>
          </div>

          {/* Display Settings Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
              <div className="w-1 h-5 bg-[#0079FF] rounded-full"></div>
              <h3 className="text-[16px] font-bold text-[#0E1116]">표시 설정</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-2 block text-[13px] font-semibold text-[#0E1116]">하이라이트 색상</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={formData.highlightColor}
                    onChange={(e) => setFormData({ ...formData, highlightColor: e.target.value })}
                    className="w-20 h-12"
                  />
                  <Input
                    className="h-12"
                    value={formData.highlightColor}
                    onChange={(e) => setFormData({ ...formData, highlightColor: e.target.value })}
                    placeholder="#0079FF"
                  />
                </div>
              </div>
              <div>
                <Label className="mb-2 block text-[13px] font-semibold text-[#0E1116]">게시 날짜</Label>
                <Input
                  type="date"
                  required
                  className="h-12"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Link Type Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
              <div className="w-1 h-5 bg-[#0079FF] rounded-full"></div>
              <h3 className="text-[16px] font-bold text-[#0E1116]">링크 설정</h3>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, linkType: 'internal' })}
                className={`flex-1 h-12 rounded-xl border-2 transition-all font-medium ${
                  formData.linkType === 'internal'
                    ? 'border-[#0079FF] bg-[#E6F3FF] text-[#0079FF]'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                본문 보기 (상세페이지)
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, linkType: 'external' })}
                className={`flex-1 h-12 rounded-xl border-2 transition-all font-medium ${
                  formData.linkType === 'external'
                    ? 'border-[#0079FF] bg-[#E6F3FF] text-[#0079FF]'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                외부 URL 연결
              </button>
            </div>
          </div>

          {/* Article URL ID (only if linkType is 'internal') */}
          {formData.linkType === 'internal' && (
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <Label className="mb-2 block text-[13px] font-semibold text-[#0E1116]">아티클 URL ID (필수)</Label>
              <Input
                required
                className="h-12 bg-white"
                value={formData.url || ''}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="예: rebrand, startup-guide, product-launch"
              />
              <p className="text-xs text-[#0079FF] mt-2 font-medium">
                💡 URL 생성 예시: "rebrand" 입력 시 → /article/rebrand
              </p>
            </div>
          )}

          {/* External URL (only if linkType is 'external') */}
          {formData.linkType === 'external' && (
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <Label className="mb-2 block text-[13px] font-semibold text-[#0E1116]">외부 URL (필수)</Label>
              <Input
                required
                className="h-12 bg-white"
                value={formData.externalUrl || ''}
                onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
                placeholder="https://example.com/article"
              />
              <p className="text-xs text-[#0079FF] mt-2 font-medium">
                💡 클릭 시 새 탭에서 외부 링크로 이동합니다
              </p>
            </div>
          )}

          {/* App Store Type (only if type is 'app') */}
          {formData.type === 'app' && (
            <div>
              <Label className="mb-2 block">앱스토어 타입</Label>
              <Select
                value={formData.appStore}
                onValueChange={(value: 'google' | 'apple') => setFormData({ ...formData, appStore: value })}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="google">Google Play</SelectItem>
                  <SelectItem value="apple">App Store</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Content (only if linkType is 'internal') */}
          {formData.linkType === 'internal' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
                <div className="w-1 h-5 bg-[#0079FF] rounded-full"></div>
                <h3 className="text-[16px] font-bold text-[#0E1116]">본문 내용</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <Label className="mb-2 block text-[13px] font-semibold text-[#0E1116]">한국어 본문</Label>
                  <div className="mt-2">
                    <RichTextEditor
                      value={formData.content_ko || ''}
                      onChange={handleContentKoChange}
                      placeholder="아티클 내용을 입력하세요"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-[13px] font-medium text-[#666666]">English Content</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAutoTranslate}
                      disabled={translating || !formData.content_ko}
                      className="h-9 gap-2"
                    >
                      <Languages className="w-4 h-4" />
                      {translating ? '번역 중...' : '한국어 → 영어 자동번역'}
                    </Button>
                  </div>
                  <div className="mt-2">
                    <RichTextEditor
                      value={formData.content_en || ''}
                      onChange={handleContentEnChange}
                      placeholder="Enter article content"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Thumbnail Image */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
              <div className="w-1 h-5 bg-[#0079FF] rounded-full"></div>
              <h3 className="text-[16px] font-bold text-[#0E1116]">썸네일 이미지</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleUploadThumbnail}
                  className="hidden"
                  id="thumbnail-upload"
                />
                <label htmlFor="thumbnail-upload" className="flex-1">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12"
                    disabled={isUploadingThumbnail}
                    asChild
                  >
                    <span className="flex items-center justify-center gap-2">
                      {isUploadingThumbnail ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>업로드 중...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          <span>썸네일 이미지 업로드 (권장: 1200x630px)</span>
                        </>
                      )}
                    </span>
                  </Button>
                </label>
              </div>
              {formData.thumbnailImage && (
                <div className="relative bg-gray-50 p-4 rounded-xl">
                  <img
                    src={formData.thumbnailImage}
                    alt="Thumbnail Preview"
                    className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200 mx-auto"
                  />
                  <p className="text-xs text-gray-500 mt-3 text-center">썸네일 미리보기</p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-8 border-t-2 border-gray-200">
            <Button type="button" variant="outline" onClick={handleBack} className="h-12 px-8">
              취소
            </Button>
            <Button type="submit" disabled={loading} className="h-12 px-8 bg-[#0079FF] hover:bg-[#0066DD] text-white">
              <Save className="w-4 h-4 mr-2" />
              {loading ? '저장 중...' : mode === 'edit' ? '수정하기' : '등록하기'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}