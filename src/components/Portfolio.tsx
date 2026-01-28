import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useRouter } from "../contexts/RouterContext";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  projectId,
  publicAnonKey,
} from "../utils/supabase/info";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner@2.0.3";

type PortfolioCategory =
  | "all"
  | "platform"
  | "system"
  | "homepage"
  | "etc";

interface PortfolioItem {
  id: string;
  title_ko: string;
  title_en: string;
  description_ko: string;
  description_en: string;
  category: string; // From API: 'Platform', 'System', 'Homepage'
  tags: string[]; // 태그 (다중 선택 가능)
  scale: string; // 'LV1' ~ 'LV6'
  coverImage: string;
  bgColor?: string;
  date?: string;
  url?: string; // URL ID for routing
  contentImages?: string[]; // 본문 이미지 배열 (신규)
  images?: string[]; // 추가 이미지 배열 (기존 호환성)
  is_internal_project?: boolean; // 사내 프로젝트 여부
}

interface PortfolioProps {
  isPreview?: boolean; // 홈 페이지 프리뷰 모드 (6개만 표시 + More 버튼)
  showYearFilter?: boolean; // 년도 필터 표시 여부 (관리자 페이지에서만 사��)
}

export function Portfolio({
  isPreview = false,
  showYearFilter = false,
}: PortfolioProps) {
  const { language } = useLanguage();
  const { navigate, setSelectedPortfolioId } = useRouter();
  const [activeCategory, setActiveCategory] =
    useState<PortfolioCategory>("all");
  const [activeYear, setActiveYear] = useState<string>("all");
  const [portfolioData, setPortfolioData] = useState<
    PortfolioItem[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = isPreview ? 6 : 12; // 한 페이지에 6개씩 표시 (프리뷰 모드), 12개씩 표시 (일반 모드)

  // 기본 배경색 배열 (순환 적용)
  const defaultBgColors = [
    "#2563EB",
    "#1F1F1F",
    "#EC4899",
    "#DC2626",
    "#F3F4F6",
    "#F97316",
    "#00C18A",
    "#8B5CF6",
    "#F59E0B",
    "#10B981",
  ];

  // Supabase에서 포트폴리오 데이터 가져오기
  useEffect(() => {
    const fetchPortfolios = async () => {
      setIsLoading(true);
      try {
        // Check if projectId and publicAnonKey are available
        if (!projectId || !publicAnonKey) {
          console.warn(
            "Supabase credentials not available, using empty portfolio data",
          );
          setPortfolioData([]);
          setIsLoading(false);
          return;
        }

        console.log(
          "Fetching portfolios from:",
          `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/portfolios`,
        );

        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/portfolios`,
          {
            headers: {
              Authorization: `Bearer ${publicAnonKey}`,
            },
          },
        );

        console.log(
          "Portfolio response status:",
          response.status,
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            "Portfolio fetch error response:",
            errorText,
          );
          throw new Error(
            `Failed to fetch portfolios: ${response.status}`,
          );
        }

        const data = await response.json();
        console.log("Portfolio data received:", data);

        // 데이터 변환 및 배경색 추가
        const portfolios = (data.portfolios || []).map(
          (item: any, index: number) => ({
            ...item,
            bgColor:
              defaultBgColors[index % defaultBgColors.length],
          }),
        );

        console.log("Processed portfolios:", portfolios.length);
        setPortfolioData(portfolios);
      } catch (error) {
        console.warn("Error fetching portfolios (server might not be deployed yet):", error);
        // 에러 발생 시 빈 배열 유지
        setPortfolioData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  const categories = [
    {
      id: "all" as PortfolioCategory,
      label_ko: "All",
      label_en: "All",
    },
    {
      id: "platform" as PortfolioCategory,
      label_ko: "Platform",
      label_en: "Platform",
    },
    {
      id: "system" as PortfolioCategory,
      label_ko: "System",
      label_en: "System",
    },
    {
      id: "homepage" as PortfolioCategory,
      label_ko: "Homepage",
      label_en: "Homepage",
    },
    {
      id: "etc" as PortfolioCategory,
      label_ko: "기타",
      label_en: "etc",
    },
  ];

  const years = [
    "all",
    "2025",
    "2024",
    "2023",
    "2022",
    "2021",
    "2020",
  ];

  const filteredPortfolio = portfolioData.filter((item) => {
    // 이미지 체크
    const hasImages =
      (item.contentImages && item.contentImages.length > 0) ||
      (item.images && item.images.length > 0);

    if (!hasImages) return false;

    // 카테고리 필터
    const categoryMatch =
      activeCategory === "all" ||
      item.category.toLowerCase() ===
        activeCategory.toLowerCase();

    // 년도 필터
    const yearMatch =
      activeYear === "all" ||
      (item.date && item.date.startsWith(activeYear));

    return categoryMatch && yearMatch;
  });

  // 페이지네이션 계산
  const totalPages = Math.ceil(
    filteredPortfolio.length / itemsPerPage,
  );
  const displayedPortfolio = filteredPortfolio.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage,
  );

  // 페이지네이션 핸들러
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, totalPages - 1),
    );
  };

  // 카테고리 변경 시 페이지 초기화
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory, activeYear]);

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-white">
      <div className="max-w-[1156px] mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 md:mb-6">
              <span
                className="text-[#0079FF] font-semibold text-[18px] md:text-[20px]"
                style={{
                  fontFamily: "Clash Display, sans-serif",
                  fontWeight: 600,
                }}
              >
                {language === "ko" ? "Portfolio" : "Portfolio"}
              </span>
            </div>
            <h2 className="mb-3 md:mb-4 text-[28px] md:text-[36px] font-bold text-black px-4">
              {language === "ko"
                ? "다양한 산업군의 고객사와 함께한 프로젝트들을 소개합니다"
                : "We introduce projects with clients from various industries"}
            </h2>
            <p className="text-[14px] md:text-[16px] text-[#666666] px-4">
              {language === "ko"
                ? "IT 컨설팅, UXUI 기획 디자인, Product개발 , R&D단계까지 함께 진행합니다."
                : "We have worked together on IT consulting, UX/UI planning and design, Product development, and R&D design."}
            </p>
          </motion.div>
        </div>

        {/* Category Filter */}
        <motion.div
          className={`flex flex-wrap gap-2 md:gap-3 ${showYearFilter ? "mb-6" : "mb-8 md:mb-12"} justify-center px-4`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 md:px-6 h-9 md:h-10 rounded-full transition-all font-medium text-xs md:text-sm ${
                activeCategory === category.id
                  ? "bg-[#E6F3FF] text-[#0079FF]"
                  : "bg-[#F5F5F5] text-[#666666] hover:bg-[#EBEBEB]"
              }`}
            >
              {category.id === "all"
                ? "ALL"
                : category.label_en.toUpperCase()}
            </button>
          ))}
        </motion.div>

        {/* Year Filter */}
        {showYearFilter && (
          <motion.div
            className="flex gap-2 mb-12 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`w-12 h-10 rounded-full transition-all font-medium text-sm ${
                  activeYear === year
                    ? "bg-[#0079FF] text-white"
                    : "bg-[#F5F5F5] text-[#666666] hover:bg-[#EBEBEB]"
                }`}
              >
                {year === "all" ? "ALL" : year}
              </button>
            ))}
          </motion.div>
        )}

        {/* Portfolio Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="wait">
            {displayedPortfolio.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                }}
                className="group cursor-pointer"
                onClick={() => {
                  // 사내 프로젝트인 경우 상세보기 제한
                  if (item.is_internal_project) {
                    toast.error(
                      language === 'ko' 
                        ? '사내 프로젝트로 상세보기가 제한됩니다.' 
                        : 'Detail view is restricted for internal projects.'
                    );
                    return;
                  }
                  // URL이 있으면 URL 기반으로, 없으면 ID 기반으로 라우팅
                  const urlId = item.url || item.id;
                  setSelectedPortfolioId(urlId);
                  navigate("portfolio-detail", null, urlId);
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              >
                {/* Image Card */}
                <div
                  className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4"
                  style={{ backgroundColor: item.bgColor }}
                >
                  {/* Internal Project Badge */}
                  {item.is_internal_project && (
                    <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                      <span className="text-sm font-medium text-gray-700">
                        🔒 {language === 'ko' ? '사내 프로젝트' : 'Internal'}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center p-[0px]">
                    <div className="relative w-full h-full transform transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-1">
                      <ImageWithFallback
                        src={item.coverImage}
                        alt={
                          language === "ko"
                            ? item.title_ko
                            : item.title_en
                        }
                        className="w-full h-full object-cover rounded-lg shadow-2xl"
                      />
                    </div>
                  </div>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-xl p-[0px]">
                  {/* Tags */}
                  <div className="flex justify-between items-start gap-2 mb-3 flex-wrap">
                    <div className="flex gap-2 flex-wrap">
                      {/* Category Badge */}
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm">
                        {item.category}
                      </span>

                      {/* Platform Type Tag (only for Platform category) */}
                      {item.category.toLowerCase() ===
                        "platform" &&
                        item.tags &&
                        (() => {
                          const platformTypes = [
                            "App",
                            "Web",
                            "SaaS",
                            "WebApp",
                          ];
                          const matchedTag = item.tags.find(
                            (tag) =>
                              platformTypes.some(
                                (type) =>
                                  tag.toLowerCase() ===
                                  type.toLowerCase(),
                              ),
                          );
                          if (!matchedTag) return null;

                          // Format tag with proper capitalization
                          let displayTag = matchedTag;
                          if (
                            matchedTag.toLowerCase() === "saas"
                          ) {
                            displayTag = "SaaS";
                          } else if (
                            matchedTag.toLowerCase() ===
                            "webapp"
                          ) {
                            displayTag = "WebApp";
                          } else {
                            displayTag =
                              matchedTag
                                .charAt(0)
                                .toUpperCase() +
                              matchedTag.slice(1).toLowerCase();
                          }

                          return (
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm">
                              {displayTag}
                            </span>
                          );
                        })()}
                    </div>

                    {/* Scale Badge */}
                    {item.scale && (
                      <span className="px-3 py-1 bg-[#E6F3FF] text-[#0079FF] rounded-lg text-sm font-medium flex-shrink-0">
                        {item.scale}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 group-hover:text-primary transition-colors">
                    {language === "ko"
                      ? item.title_ko
                      : item.title_en}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600">
                    {language === "ko"
                      ? item.description_ko
                      : item.description_en}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredPortfolio.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 text-gray-400"
          >
            {language === "ko"
              ? "해당 카테고리의 프로젝트가 없습니다"
              : "No projects in this category"}
          </motion.div>
        )}

        {/* Preview Mode: More Button */}
        {isPreview && filteredPortfolio.length > 6 && (
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button
              className="px-12 h-12 rounded-full border-2 border-black text-black font-medium hover:bg-black hover:text-white transition-all"
              onClick={() => {
                navigate("portfolio");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              More
            </button>
          </motion.div>
        )}

        {/* Full Mode: Pagination */}
        {!isPreview && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              className="h-12 w-12 flex items-center justify-center rounded-xl bg-white hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed border border-gray-200"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`h-12 w-12 flex items-center justify-center rounded-xl transition-colors ${
                    currentIndex === i
                      ? "bg-[#0079FF] text-white"
                      : "bg-white hover:bg-gray-100 border border-gray-200"
                  }`}
                  onClick={() => setCurrentIndex(i)}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              className="h-12 w-12 flex items-center justify-center rounded-xl bg-white hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed border border-gray-200"
              onClick={handleNext}
              disabled={currentIndex === totalPages - 1}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}