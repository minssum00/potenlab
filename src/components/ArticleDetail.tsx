import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { useRouter } from "../contexts/RouterContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useEffect, useState } from "react";
import { updateMetaTags } from "../utils/seo";
import { projectId, publicAnonKey } from "../utils/supabase/info";

interface ArticleDetailProps {
  onBack?: () => void;
}

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
  url?: string;
  content_ko?: string;
  content_en?: string;
  thumbnailImage?: string;
  createdAt: string;
  updatedAt: string;
}

export function ArticleDetail({ onBack }: ArticleDetailProps) {
  const { language } = useLanguage();
  const { selectedArticleId, navigate } = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedArticleId) {
      loadArticle(selectedArticleId);
    }
  }, [selectedArticleId]);

  const loadArticle = async (articleUrl: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/articles/${articleUrl}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setArticle(data.article);
        
        // Update comprehensive SEO meta tags
        if (data.article) {
          const title = language === 'ko' ? data.article.title_ko : data.article.title_en;
          const subtitle = language === 'ko' ? data.article.subtitle_ko : data.article.subtitle_en;
          const fullTitle = `${title} - Potenlab`;
          const articleUrl = `https://potenlab.dev/article/${data.article.url || data.article.id}`;
          
          // Get article type display name
          const typeNames = {
            'dev-insight': language === 'ko' ? '개발 인사이트' : 'Development Insight',
            'ux-ui': language === 'ko' ? 'UX·UI & 기획' : 'UX·UI & Planning',
            'it-guide': language === 'ko' ? 'IT 실무 가이드' : 'IT Practical Guide',
            'project-story': language === 'ko' ? '프로젝트 이야기' : 'Project Story',
            'business': language === 'ko' ? '비즈니스 & 스타트업' : 'Business & Startup',
            'rnd': language === 'ko' ? 'R&D, 기술관련' : 'R&D, Technology'
          };
          
          const typeName = typeNames[data.article.type as keyof typeof typeNames] || '';
          const keywords = language === 'ko'
            ? `${typeName}, ${title}, IT 컨설팅, MVP 개발, Potenlab, 개발 블로그, 기술 블로그`
            : `${typeName}, ${title}, IT Consulting, MVP Development, Potenlab, Tech Blog`;
          
          updateMetaTags({
            title: fullTitle,
            description: subtitle,
            keywords: keywords,
            ogTitle: fullTitle,
            ogDescription: subtitle,
            ogImage: data.article.thumbnailImage || 'https://vtrporvjpqplrkmqtvmc.supabase.co/storage/v1/object/public/make-2a57c5c9-images/og-image.png',
            ogUrl: articleUrl,
            twitterCard: 'summary_large_image',
            canonical: articleUrl
          }, language);
        }
      }
    } catch (error) {
      console.error('Error loading article:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">
          {language === 'ko' ? '로딩 중...' : 'Loading...'}
        </p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">
          {language === 'ko' ? '콘텐츠를 찾을 수 없습니다.' : 'Article not found.'}
        </p>
      </div>
    );
  }

  const title = language === 'ko' ? article.title_ko : article.title_en;
  const subtitle = language === 'ko' ? article.subtitle_ko : article.subtitle_en;
  const content = language === 'ko' ? (article.content_ko || '') : (article.content_en || '');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-[1156px] mx-auto px-6 py-6">
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
            <span>{language === 'ko' ? '뒤로' : 'Back'}</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1156px] mx-auto px-6 py-16">
        <div className="flex gap-12">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-64 flex-shrink-0 sticky top-24 h-fit"
          >
            <div className="space-y-8">
              {/* Article Number (if exists) */}
              {article.number && (
                <div>
                  <h3 className="text-sm text-gray-500 mb-3">
                    {language === 'ko' ? '콘텐츠 번호' : 'Article No.'}
                  </h3>
                  <p
                    className="text-2xl font-light"
                    style={{ color: article.highlightColor }}
                  >
                    {article.number}
                  </p>
                </div>
              )}

              {/* Date */}
              <div>
                <h3 className="text-sm text-gray-500 mb-3">
                  {language === 'ko' ? '작성일' : 'Published'}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Calendar className="w-4 h-4" strokeWidth={1.5} />
                  <span>{article.date}</span>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Main Content Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 max-w-3xl"
          >
            {/* Title */}
            <div className="mb-12">
              <h1 className="mb-2 text-5xl">{title}</h1>
              <p className="text-xl text-gray-600 mb-8">{subtitle}</p>
            </div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Related Articles Suggestion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-20 pt-12 border-t border-gray-100"
            >
              <h3 className="mb-6 text-gray-900">
                {language === 'ko' ? '관련 콘텐츠' : 'Related Articles'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <p className="text-sm text-gray-500 mb-2">
                      {language === 'ko' ? '추천 콘텐츠' : 'Recommended'}
                    </p>
                    <p className="text-gray-900 mb-1">
                      {language === 'ko' 
                        ? '다음 프로젝트를 위한 인사이트'
                        : 'Insights for Your Next Project'}
                    </p>
                    <p className="text-sm text-gray-600">
                      2020. 12. 0{i}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}