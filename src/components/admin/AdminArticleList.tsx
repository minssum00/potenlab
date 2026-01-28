import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { useLanguage } from '../../contexts/LanguageContext';
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
  thumbnailImage?: string;
  createdAt: string;
  updatedAt: string;
}

export function AdminArticleList() {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState<'date' | 'lv-high' | 'lv-low'>('date'); // 정렬 타입

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
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
        setArticles(data.articles || []);
      }
    } catch (error) {
      console.error('Error loading articles:', error);
      toast.error('아티클 로딩 실패');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/articles/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (response.ok) {
        toast.success('삭제되었습니다');
        loadArticles();
      } else {
        throw new Error('Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting article:', error);
      toast.error('삭제 실패');
    }
  };

  const handleNew = () => {
    navigate('admin-article-form', undefined, undefined, { mode: 'new' });
  };

  const handleEdit = (article: Article) => {
    navigate('admin-article-form', undefined, undefined, { mode: 'edit', articleId: article.id });
  };

  // 정렬 함수
  const getSortedArticles = () => {
    const sorted = [...articles];
    
    if (sortType === 'date') {
      // 날짜순 정렬 (최신순)
      return sorted.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      });
    } else if (sortType === 'lv-high') {
      // LV 높은순
      return sorted.sort((a, b) => {
        const numA = parseInt(a.number.replace(/[^0-9]/g, '')) || 0;
        const numB = parseInt(b.number.replace(/[^0-9]/g, '')) || 0;
        return numB - numA;
      });
    } else {
      // LV 낮은순
      return sorted.sort((a, b) => {
        const numA = parseInt(a.number.replace(/[^0-9]/g, '')) || 0;
        const numB = parseInt(b.number.replace(/[^0-9]/g, '')) || 0;
        return numA - numB;
      });
    }
  };

  const sortedArticles = getSortedArticles();

  if (loading) {
    return <div className="text-center py-8">로딩 중...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">아티클 관리</h1>
          <p className="text-sm text-gray-500 mt-1">블로그 콘텐츠를 관리합니다</p>
        </div>
        <Button onClick={handleNew} className="h-12 px-6 bg-primary hover:bg-primary-hover">
          <Plus className="w-4 h-4 mr-2" />
          새 아티클 등록
        </Button>
      </div>

      {/* Sort Dropdown */}
      <div className="flex justify-end">
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value as 'date' | 'lv-high' | 'lv-low')}
          className="px-4 py-2 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
        >
          <option value="date">최신순</option>
          <option value="lv-high">LV 높은순</option>
          <option value="lv-low">LV 낮은순</option>
        </select>
      </div>

      {/* Articles List */}
      <div className="grid gap-4">
        {sortedArticles.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-gray-500">등록된 아티클이 없습니다</p>
          </Card>
        ) : (
          sortedArticles.map((article) => {
            const typeNames = {
              'dev-insight': '개발 인사이트',
              'ux-ui': 'UX·UI & 기획',
              'it-guide': 'IT 실무 가이드',
              'project-story': '프로젝트 이야기',
              'business': '비즈니스 & 스타트업',
              'rnd': 'R&D, 기술관련'
            };
            
            return (
              <Card key={article.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="inline-block px-2 py-1 rounded text-xs text-white"
                        style={{ backgroundColor: article.highlightColor }}
                      >
                        {article.number}
                      </span>
                      <span className="text-sm text-gray-500">
                        {typeNames[article.type as keyof typeof typeNames]}
                      </span>
                      {article.appStore && (
                        <span className="text-sm text-gray-500">
                          ({article.appStore === 'google' ? 'Google Play' : 'App Store'})
                        </span>
                      )}
                    </div>
                    <h3 className="mb-1">
                      {language === 'ko' ? article.title_ko : article.title_en}
                      {' '}
                      <span style={{ color: article.highlightColor }}>
                        {language === 'ko' ? article.subtitle_ko : article.subtitle_en}
                      </span>
                    </h3>
                    <p className="text-sm text-gray-500">{article.date}</p>
                    {article.updatedAt && (
                      <p className="text-xs text-gray-400 mt-2">
                        최종 수정: {new Date(article.updatedAt).toLocaleString('ko-KR')}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(article)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(article.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}