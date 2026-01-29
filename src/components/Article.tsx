import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useRouter } from '../contexts/RouterContext';
import { motion } from 'motion/react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowRight, Calendar } from 'lucide-react';

interface ArticleItem {
  id: string;
  number: string;
  title_ko: string;
  title_en: string;
  subtitle_ko: string;
  subtitle_en: string;
  highlightColor: string;
  date: string;
  type: 'dev-insight' | 'ux-ui' | 'it-guide' | 'project-story' | 'business' | 'rnd';
  url?: string;
  thumbnailImage?: string;
  updatedAt?: string;
}

const typeNames: Record<string, { ko: string; en: string }> = {
  'dev-insight': { ko: '개발 인사이트', en: 'Development Insight' },
  'ux-ui': { ko: 'UX·UI & 기획', en: 'UX·UI & Planning' },
  'it-guide': { ko: 'IT 실무 가이드', en: 'IT Practical Guide' },
  'project-story': { ko: '프로젝트 이야기', en: 'Project Story' },
  business: { ko: '비즈니스 & 스타트업', en: 'Business & Startup' },
  rnd: { ko: 'R&D, 기술관련', en: 'R&D, Technology' },
};

export function Article() {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/articles`,
          { headers: { Authorization: `Bearer ${publicAnonKey}` } }
        );
        if (res.ok) {
          const data = await res.json();
          const list = (data.articles || []) as ArticleItem[];
          setArticles(
            list.sort((a, b) => {
              const tA = new Date(a.date).getTime();
              const tB = new Date(b.date).getTime();
              return tB - tA;
            })
          );
        }
      } catch (e) {
        console.error('Error loading articles:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleOpen = (a: ArticleItem) => {
    const id = a.url || a.id;
    navigate('article-detail', undefined, undefined, { articleId: id });
  };

  if (loading) {
    return (
      <section className="py-24 px-4 sm:px-8">
        <div className="max-w-[1156px] mx-auto">
          <div className="flex justify-center py-20">
            <p className="text-[#666666]">
              {language === 'ko' ? '로딩 중...' : 'Loading...'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 sm:px-8">
      <div className="max-w-[1156px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-[#0079FF] font-semibold text-[18px]">
            {language === 'ko' ? '콘텐츠' : 'Contents'}
          </span>
          <h2 className="mt-2 text-[32px] sm:text-[40px] font-bold text-black">
            {language === 'ko' ? '아티클' : 'Articles'}
          </h2>
          <p className="mt-4 text-[16px] text-[#666666] max-w-[600px] mx-auto">
            {language === 'ko'
              ? '개발, 기획, 비즈니스 인사이트를 나눕니다.'
              : 'Insights on development, planning, and business.'}
          </p>
        </motion.div>

        {articles.length === 0 ? (
          <div className="text-center py-16 rounded-2xl bg-[#F8F9FA]">
            <p className="text-[#666666]">
              {language === 'ko' ? '등록된 아티클이 없습니다.' : 'No articles yet.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, i) => {
              const typeLabel =
                typeNames[article.type]?.[language === 'ko' ? 'ko' : 'en'] ??
                article.type;
              const title =
                language === 'ko' ? article.title_ko : article.title_en;
              const subtitle =
                language === 'ko' ? article.subtitle_ko : article.subtitle_en;

              return (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group rounded-2xl border border-[#E5E5E5] bg-white overflow-hidden shadow-sm hover:shadow-lg hover:border-[#0079FF]/30 transition-all"
                >
                  <button
                    type="button"
                    onClick={() => handleOpen(article)}
                    className="w-full text-left"
                  >
                    {article.thumbnailImage && (
                      <div className="aspect-video overflow-hidden bg-[#F0F0F0]">
                        <ImageWithFallback
                          src={article.thumbnailImage}
                          alt={title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="px-2.5 py-1 rounded-lg text-xs font-medium text-white"
                          style={{ backgroundColor: article.highlightColor }}
                        >
                          {article.number}
                        </span>
                        <span className="text-xs text-[#999999]">
                          {typeLabel}
                        </span>
                      </div>
                      <h3 className="font-bold text-[18px] text-black mb-1 line-clamp-2 group-hover:text-[#0079FF] transition-colors">
                        {title}
                      </h3>
                      <p className="text-[14px] text-[#666666] line-clamp-2 mb-3">
                        {subtitle}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-[13px] text-[#999999]">
                          <Calendar className="w-3.5 h-3.5" />
                          {article.date}
                        </span>
                        <span className="flex items-center gap-1 text-[14px] font-medium text-[#0079FF] group-hover:gap-2 transition-all">
                          {language === 'ko' ? '보기' : 'Read'}
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </button>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
