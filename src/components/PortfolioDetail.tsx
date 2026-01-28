import { useLanguage } from '../contexts/LanguageContext';
import { useRouter } from '../contexts/RouterContext';
import { Button } from './ui/button';
import { ArrowLeft, ExternalLink, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { TechStackIcon } from './TechStackIcon';
import { TechStackPopup } from './TechStackPopup';
import { motion } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Comment {
  id: string;
  author: string;
  date: string;
  content: string;
  avatar?: string;
}

interface PortfolioDetailProps {
  onBack?: () => void;
}

export function PortfolioDetail({ onBack }: PortfolioDetailProps) {
  const { t, language } = useLanguage();
  const { selectedPortfolioId } = useRouter();
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  // Supabase에서 포트폴리오 상세 데이터 가져오기
  useEffect(() => {
    const fetchPortfolioDetail = async () => {
      if (!selectedPortfolioId) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/portfolios/${selectedPortfolioId}`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`
            }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch portfolio detail');
        }

        const data = await response.json();
        
        // 사내 프로젝트인 경우 상세보기 제한
        if (data.portfolio?.is_internal_project) {
          setPortfolioData(null);
          setIsLoading(false);
          return;
        }
        
        setPortfolioData(data.portfolio);
      } catch (error) {
        console.error('Error fetching portfolio detail:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolioDetail();
  }, [selectedPortfolioId]);

  // 태그 칩 정의
  const tagChips = [
    {
      id: 'it-consulting',
      label: 'IT Consulting',
      bgColor: '#E0F2FE',
      textColor: '#0369A1'
    },
    {
      id: 'uxui',
      label: 'UXUI',
      bgColor: '#FFEDD5',
      textColor: '#C2410C'
    },
    {
      id: 'web',
      label: 'Web',
      bgColor: '#DBEAFE',
      textColor: '#1E40AF'
    },
    {
      id: 'app',
      label: 'App',
      bgColor: '#CCFBF1',
      textColor: '#0F766E'
    },
    {
      id: 'saas',
      label: 'SaaS',
      bgColor: '#FEF3C7',
      textColor: '#92400E'
    },
    {
      id: 'rnd',
      label: 'R&D',
      bgColor: '#374151',
      textColor: '#FFFFFF'
    },
    {
      id: 'arvr',
      label: 'AR/VR',
      bgColor: '#EDE9FE',
      textColor: '#6D28D9'
    },
    {
      id: 'branding',
      label: 'Branding',
      bgColor: '#FEE2E2',
      textColor: '#991B1B'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-[1156px] mx-auto px-6 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
            <span>{language === 'ko' ? '뒤로' : 'Back'}</span>
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="max-w-[1156px] mx-auto px-6 py-16">
          <div className="flex items-center justify-center py-20">
            <div className="text-gray-400">
              {language === 'ko' ? '로딩 중...' : 'Loading...'}
            </div>
          </div>
        </div>
      )}

      {/* Internal Project Restriction Message */}
      {!isLoading && !portfolioData && (
        <div className="max-w-[1156px] mx-auto px-6 py-16">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-2xl mb-4">🔒</div>
            <div className="text-xl font-semibold text-gray-800 mb-2">
              {language === 'ko' ? '사내 프로젝트로 상세보기가 제한됩니다.' : 'Detail view is restricted for internal projects.'}
            </div>
            <div className="text-gray-500">
              {language === 'ko' ? '이 프로젝트는 비공개 정보를 포함하고 있습니다.' : 'This project contains confidential information.'}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!isLoading && portfolioData && (
        <div className="max-w-[1156px] mx-auto px-6 py-16">
          <div className="flex gap-12">
            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-56 flex-shrink-0 sticky top-24 h-fit"
            >
              <div className="space-y-7">
                {/* Category */}
                <div>
                  <h3 className="text-sm text-gray-500 mb-3">
                    {language === 'ko' ? '카테고리' : 'Category'}
                  </h3>
                  <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {portfolioData.category}
                  </span>
                </div>

                {/* Work Scope (Tags) */}
                {portfolioData.tags && portfolioData.tags.length > 0 && (
                  <div>
                    <h3 className="text-sm text-gray-500 mb-3">
                      {language === 'ko' ? '업무범위' : 'Work Scope'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {[...portfolioData.tags].sort((a: string, b: string) => {
                        const order = ['it-consulting', 'uxui', 'web', 'app', 'saas', 'arvr', 'rnd', 'branding'];
                        return order.indexOf(a) - order.indexOf(b);
                      }).map((tagId: string) => {
                        const chip = tagChips.find(c => c.id === tagId);
                        if (!chip) {
                          // 태그 정의가 없는 경우 기본 스타일로 표시
                          return (
                            <span
                              key={tagId}
                              className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                            >
                              {tagId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                          );
                        }
                        return (
                          <span
                            key={chip.id}
                            className="px-3 py-1 rounded-full text-xs"
                            style={{
                              backgroundColor: chip.bgColor,
                              color: chip.textColor
                            }}
                          >
                            {chip.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Service Scale */}
                {portfolioData.scale && (
                  <div>
                    <h3 className="text-sm text-gray-500 mb-3">
                      {language === 'ko' ? '서비스 규모' : 'Service Scale'}
                    </h3>
                    <span className="inline-block px-4 py-1.5 bg-[#E6F3FF] text-[#0079FF] rounded-full text-sm font-medium">
                      {portfolioData.scale}
                    </span>
                  </div>
                )}

                {/* Service Type */}
                {portfolioData.serviceType && (
                  (() => {
                    // 기존 string 타입 데이터를 배열로 변환
                    const serviceTypes = Array.isArray(portfolioData.serviceType) 
                      ? portfolioData.serviceType 
                      : [portfolioData.serviceType];
                    
                    if (serviceTypes.length === 0) return null;
                    
                    return (
                      <div>
                        <h3 className="text-sm text-gray-500 mb-3">
                          {language === 'ko' ? '서비스 유형' : 'Service Type'}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {serviceTypes.map((typeId: string) => {
                            const serviceTypeOptions = [
                              { id: 'content', label_ko: '정보전달(콘텐츠)', label_en: 'Content' },
                              { id: 'community', label_ko: '커뮤니티', label_en: 'Community' },
                              { id: 'sns', label_ko: 'SNS', label_en: 'SNS' },
                              { id: 'brokerage', label_ko: '중개', label_en: 'Brokerage' },
                              { id: 'o2o', label_ko: 'O2O', label_en: 'O2O' },
                              { id: 'booking', label_ko: '예약/신청', label_en: 'Booking' },
                              { id: 'commerce', label_ko: '커머스', label_en: 'Commerce' },
                              { id: 'response-management', label_ko: '응답/관리', label_en: 'Response/Management' },
                              { id: 'etc', label_ko: '기타', label_en: 'ETC' },
                            ];
                            const type = serviceTypeOptions.find(t => t.id === typeId);
                            const label = type ? (language === 'ko' ? type.label_ko : type.label_en) : typeId;
                            return (
                              <span key={typeId} className="inline-block px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm">
                                {label}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()
                )}

                {/* Key Features */}
                {portfolioData.key_features && portfolioData.key_features.length > 0 && (
                  <div>
                    <h3 className="text-sm text-gray-500 mb-3">
                      {language === 'ko' ? '주요기능' : 'Key Features'}
                    </h3>
                    <ul className="space-y-2">
                      {portfolioData.key_features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-primary mt-0.5">•</span>
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack */}
                {portfolioData.tech_stack && portfolioData.tech_stack.length > 0 && (
                  <div>
                    <h3 className="text-sm text-gray-500 mb-3">
                      {language === 'ko' ? '기술 스택' : 'Tech Stack'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {portfolioData.tech_stack.map((tech: string, index: number) => (
                        <TechStackIcon key={index} tech={tech} onClick={() => setSelectedTech(tech)} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Service Links */}
                {(portfolioData.url_appstore || portfolioData.url_playstore || portfolioData.url_web || portfolioData.is_service_ended) && (
                  <div>
                    <h3 className="text-sm text-gray-500 mb-3">
                      {language === 'ko' ? '서비스 바로가기' : 'Service Links'}
                    </h3>
                    <div className="flex flex-col gap-2">
                      {portfolioData.is_service_ended && (
                        <div className="flex items-center justify-center gap-1.5 h-10 px-4 bg-gray-100 text-gray-500 rounded-xl text-sm cursor-not-allowed">
                          <X className="w-4 h-4" />
                          <span>{language === 'ko' ? '운영이 종료된 서비스입니다' : 'Service Discontinued'}</span>
                        </div>
                      )}
                      {!portfolioData.is_service_ended && portfolioData.url_appstore && (
                        <a
                          href={portfolioData.url_appstore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 h-10 px-4 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                          </svg>
                          <span>App Store</span>
                        </a>
                      )}
                      {!portfolioData.is_service_ended && portfolioData.url_playstore && (
                        <a
                          href={portfolioData.url_playstore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 h-10 px-4 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35zm10.84-8.5l2.96-2.96L6.5 2.91zm4.16 2.42l-2.96-2.96-2.96 2.96 2.96 2.96zm-11.5 7.63l10.3-6.13-2.96-2.96z"/>
                          </svg>
                          <span>Play Store</span>
                        </a>
                      )}
                      {!portfolioData.is_service_ended && portfolioData.url_web && (
                        <a
                          href={portfolioData.url_web}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 h-10 px-4 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0.5">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                          </svg>
                          <span>Web</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.aside>

            {/* Main Content Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1"
            >
              {/* Title */}
              <div className="mb-12">
                {/* Tag Chips - REMOVED, moved to sidebar */}
                <h1 className="mb-4 text-[36px] font-bold">
                  {language === 'ko' ? portfolioData.title_ko : portfolioData.title_en}
                </h1>
                
                {/* Service Description */}
                <p className="text-[16px] text-gray-600 leading-relaxed">
                  {language === 'ko' ? portfolioData.description_ko : portfolioData.description_en}
                </p>
              </div>

              {/* Main Image */}
              {portfolioData.mainImage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full bg-gray-100 rounded-xl overflow-hidden mb-12"
                >
                  <ImageWithFallback
                    src={portfolioData.mainImage}
                    alt={language === 'ko' ? portfolioData.title_ko : portfolioData.title_en}
                    className="w-full"
                  />
                </motion.div>
              )}

              {/* Images */}
              {(portfolioData.contentImages || portfolioData.images) && (portfolioData.contentImages?.length > 0 || portfolioData.images?.length > 0) && (
                <div className="space-y-8 mb-20">
                  {(portfolioData.contentImages || portfolioData.images).map((image: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="w-full bg-gray-100 rounded-xl overflow-hidden"
                    >
                      <ImageWithFallback
                        src={image}
                        alt={`${language === 'ko' ? portfolioData.title_ko : portfolioData.title_en} - ${index + 1}`}
                        className="w-full"
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}

      {/* Error State */}
      {!isLoading && !portfolioData && (
        <div className="max-w-[1156px] mx-auto px-6 py-16">
          <div className="flex items-center justify-center py-20">
            <div className="text-center text-gray-400">
              <p>{language === 'ko' ? '포트폴리오를 찾을 수 없습니다.' : 'Portfolio not found.'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tech Stack Popup */}
      {selectedTech && (
        <TechStackPopup 
          tech={selectedTech} 
          onClose={() => setSelectedTech(null)}
          language={language}
        />
      )}
    </div>
  );
}