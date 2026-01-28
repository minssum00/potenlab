import React, { useState, useEffect, useRef } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Portfolio } from "../components/Portfolio";
import { motion, useInView } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { useRouter } from "../contexts/RouterContext";
import {
  ArrowRight,
  X,
  MessageCircle,
  TrendingUp,
  Rocket,
  Brain,
  Code,
  Cloud,
  CheckCircle,
  Users,
  Target,
  Settings,
  BarChart,
  Award,
  Sparkles,
} from "lucide-react";

// Count Up Animation Component
function CountUpAnimation({
  end,
  duration = 2,
  delay = 0,
}: {
  end: number;
  duration?: number;
  delay?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      let startTime: number | null = null;
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min(
          (timestamp - startTime) / (duration * 1000),
          1,
        );

        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * end));

        if (progress < 1) {
          requestAnimationFrame(animateCount);
        } else {
          setCount(end);
        }
      };
      requestAnimationFrame(animateCount);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [isInView, end, duration, delay]);

  return <span ref={ref}>{count}</span>;
}

const content = {
  ko: {
    hero: {
      headline: "아이디어를 현실로, 기대를 성과로",
      subHeadline: "당신의 기술 파트너사,포텐랩,",
      description:
        "단순 개발을 넘어, 비즈니스 성공을 위한 전략과 기술을 제공합니다.",
      cta1: "프로젝트 신청하기",
      cta2: "포트폴리오 살펴보기",
    },
    differentiators: {
      label: "Why Potenlab",
      title: "단순한 '개발'을 넘어,",
      titleHighlight: "'비즈니스 성장'을 위한 최적의 파트너",
      items: [
        {
          title: "비즈니스를 이해하는 창업 멘토",
          description:
            "단순 외주자가 아닌, 실전 창업 경험을 가진 파트너로서 비즈니스 방향성을 함께 고민합니다.",
          icon: "Users",
          bullets: [
            "IT 자동 견적 서비스 Product 제작 및 판매경험",
            "Asimula $400k 투자 유치 경험",
            "실패 Product 10개 이상, 먼저 겪은 시행착오",
            "유튜브 누적 50만 뷰 '사업계획서' 검색어 1위'",
          ],
        },
        {
          title: "검증된 R&D 전문성",
          description:
            "일반적인 웹/앱 개발을 넘어, 고난이도 기술 구현과 연구 개발 역량을 보유하고 있습니다.",
          icon: "Award",
          bullets: [
            "POSTECH(포항공대) 석사 출신",
            "SCI급 1저자 논문 2편 보유",
            "국제 연구 과제 32개 수행",
            "AI/머신러닝 기술 포트폴리오",
          ],
        },
        {
          title: "린 스타트업 실행",
          description:
            "다양한 분야의 Product를 직접 만들어봤고 그렇기에 왜 안되는지 누구보다 더 잘 이해합니다.",
          icon: "Rocket",
          bullets: [
            "실패 확률을 줄이는 PMF 검증",
            "개발 기능 및 개발 범위에 대한 솔직한 조언",
            "핵심 기능 중심의 MVP 개발",
            "시장 반응에 따른 유연한 대처",
          ],
        },
      ],
    },
    services: {
      label: "Core Services",
      title: "아이디어 검증부터 미래 기술 구현까지:",
      titleHighlight: "포텐랩의 핵심 서비스",
      items: [
        {
          title: "포텐 부스터",
          subtitle: "Poten Booster",
          description:
            '6일 만에 끝내는 MVP 제작 및 시장 검증 패키지. "할 것이다"를 "이미 검증했다"로 바꿔 지원사업 합격률을 극대화합니다.',
          icon: "Rocket",
          path: "/poten-booster",
        },
        {
          title: "커스텀 프로덕트 개발",
          subtitle: "Custom Product Development",
          description:
            "상용화 및 고도화를 위한 정교한 제품 구축. 검증된 아이디어를 바탕으로 실제 비즈니스 운영이 가능한 완성도 높은 솔루션을 빌드합니다.",
          icon: "Code",
          path: "/custom-product",
        },
        {
          title: "IT/Biz 기술 컨설팅",
          subtitle: "Strategic Consulting",
          description:
            "기술 타당성 검토 및 기획 고도화. 막막한 아이디어를 개발 가능한 기술 언어로 정의하고 사업계획서의 논리적 허점을 보완합니다.",
          icon: "Target",
          path: "/consulting",
        },
        {
          title: "포텐의 램프 🧞",
          subtitle: "Poten-Lamp | PRD AI [준비 중]",
          description:
            "아이디어만으로 기획 산출물을 자동 생성하는 AI 도구. 메뉴 구조, IA, 기능 명세서 등 복잡한 기획 단계를 챗봇과 대화하며 즉시 해결합니다.",
          icon: "Sparkles",
          path: "/poten-lamp",
        },
      ],
    },
    stats: {
      label: "Data-Driven Results",
      title: "우리는 감이 아닌 수치로 증명합니다.",
      description:
        "검증된 데이터로 입증하는 포텐랩의 실질적인 성과",
      items: [
        {
          value: "80",
          suffix: "%↓",
          label: "무분별한 기능을 덜어내어",
          sublabel: "절감한 초기 개발 비용",
        },
        {
          value: "200",
          suffix: "+",
          label: "컨설팅부터 배포까지",
          sublabel: "실제 프로젝트 제작 횟수",
        },
        {
          value: "6",
          suffix: "DAY",
          label: "아이디어에서 MVP 탄생까지",
          sublabel: "걸리는 시간",
        },
      ],
    },
    process: {
      label: "Partnership Process",
      title: "투명하고 효율적인,",
      titleHighlight: "포텐랩의 파트너십 프로세스",
      steps: [
        {
          number: "01",
          title: "비즈니스 컨설팅",
          description:
            "아이디어 구체화 및 목표 설정\n(포텐랩 질문지 활용)",
          icon: "Users",
        },
        {
          number: "02",
          title: "전략 수립 및 기획",
          description: "시장 분석 기반의\nMVP/AI 솔루션 기획",
          icon: "Target",
        },
        {
          number: "03",
          title: "기술 설계 및 개발",
          description:
            "최적의 기술 스택으로\n견고한 시스템 구현",
          icon: "Settings",
        },
        {
          number: "04",
          title: "품질 관리 및 런칭",
          description: "꼼꼼한 테스트 후\n성공적인 서비스 오픈",
          icon: "CheckCircle",
        },
        {
          number: "05",
          title: "유지보수 및 고도화",
          description:
            "지속적인 성능 개선 및\n비즈니스 확장 지원",
          icon: "BarChart",
        },
      ],
    },
    portfolio: {
      label: "Success Stories",
      title: "포텐랩과 함께 이룬",
      titleHighlight: "비즈니스 성공 사례",
      cta: "더 많은 포트폴리오 보기",
      cases: [
        {
          name: "물류 최적화 AI 시스템",
          role: "데이터 분석 및 AI 모델 개발 파트너",
          achievement: "물류 비용 15% 절감, 배송 시간 20% 단축",
          tech: ["AI", "Data Analysis", "Optimization"],
        },
        {
          name: "핀테크 스타트업 MVP",
          role: "전략 기획 및 풀스택 개발 파트너",
          achievement:
            "3개월 만에 시장 출시, 1만 명 사용자 확보",
          tech: ["MVP", "Full-Stack", "Fintech"],
        },
        {
          name: "이커머스 추천 시스템",
          role: "AI 기반 개인화 추천 엔진 구축",
          achievement:
            "구매 전환율 35% 증가, 고객 체류 시간 2배 향상",
          tech: ["AI", "Recommendation", "ML"],
        },
      ],
    },
    cta: {
      label: "Contact Us",
      title: "포텐랩과 함께 당신의 비즈니스를 혁신하세요.",
      description:
        "단순 개발을 넘어 비즈니스 성공을 위한 전략적 파트너를 찾고 계신다면, 지금 바로 포텐랩과 상담하세요.",
      button: "프로젝트 신청하기",
    },
  },
  en: {
    hero: {
      headline: "From Ideas to Reality, From Growth to Future:",
      subHeadline: "Potenlab, Your AI & MVP Technology Partner",
      description:
        "Beyond simple development, we provide strategies and technologies for business success.",
      cta1: "Inquire Project",
      cta2: "View Portfolio",
    },
    differentiators: {
      label: "Why Potenlab",
      title: "Beyond Simple 'Development',",
      titleHighlight:
        "The Optimal Partner for 'Business Growth'",
      items: [
        {
          title: "A Startup Veteran Who Understands Business",
          description:
            "Not just an outsourcing vendor, but a partner with real startup experience who thinks through business direction together.",
          icon: "Users",
          bullets: [
            "Experience in creating and selling IT auto-quote service products",
            "Asimula $400k funding experience - the power of market-validated logic",
            "Over 10 failed products, diverse practical experience from various attempts",
            "Over 500K views on business plan YouTube, ranked #1 for 'business plan' search",
          ],
        },
        {
          title: "Proven R&D Expertise",
          description:
            "Beyond typical web/app development, we possess high-level technical implementation and research development capabilities.",
          icon: "Award",
          bullets: [
            "POSTECH Master's degree holder",
            "Published 2 first-author SCI papers",
            "Conducted 32 international research projects",
            "AI/Machine Learning technology portfolio",
          ],
        },
        {
          title: "Lean Startup Execution",
          description:
            "We've built products in various fields ourselves, so we understand better than anyone why things don't work.",
          icon: "Rocket",
          bullets: [
            "PMF validation to reduce failure rates",
            "Honest advice on development features and scope",
            "MVP development focused on core features",
            "Flexible response to market reactions",
          ],
        },
      ],
    },
    services: {
      label: "Core Services",
      title: "From Idea Validation to Future Technology:",
      titleHighlight: "Potenlab's Core Services",
      items: [
        {
          title: "Poten Booster",
          subtitle: "Poten Booster",
          description:
            "MVP creation and market validation package completed in 6 days. Transform 'will do' into 'already validated' to maximize grant approval rates.",
          icon: "Rocket",
          path: "/poten-booster",
        },
        {
          title: "Custom Product Development",
          subtitle: "Custom Product Development",
          description:
            "Sophisticated product construction for commercialization and advancement. Build high-quality solutions that enable actual business operations based on validated ideas.",
          icon: "Code",
          path: "/custom-product",
        },
        {
          title: "IT/Biz Strategic Consulting",
          subtitle: "Strategic Consulting",
          description:
            "Technical feasibility review and planning enhancement. Define vague ideas into developable technical language and supplement logical gaps in business plans.",
          icon: "Target",
          path: "/consulting",
        },
        {
          title: "Poten-Lamp 🧞",
          subtitle: "Poten-Lamp | PRD AI [Coming Soon]",
          description:
            "AI tool that auto-generates planning outputs from ideas alone. Instantly solve complex planning stages like menu structure, IA, and functional specifications through chatbot conversations.",
          icon: "Sparkles",
          path: "/poten-lamp",
        },
      ],
    },
    stats: {
      label: "Data-Driven Results",
      title: "We Prove with Numbers, Not Intuition.",
      description:
        "Potenlab's tangible results proven by verified data",
      items: [
        {
          value: "80",
          suffix: "%↓",
          label: "Reduced initial development costs",
          sublabel: "by eliminating unnecessary features",
        },
        {
          value: "200",
          suffix: "+",
          label: "Actual projects completed",
          sublabel: "after consulting",
        },
        {
          value: "6",
          suffix: "DAY",
          label: "Time from idea to MVP launch",
          sublabel: "with Poten Booster",
        },
      ],
    },
    process: {
      label: "Partnership Process",
      title: "Transparent and Efficient,",
      titleHighlight: "Potenlab's Partnership Process",
      steps: [
        {
          number: "01",
          title: "Business Consulting",
          description:
            "Idea refinement and goal setting\n(Using Potenlab questionnaire)",
          icon: "Users",
        },
        {
          number: "02",
          title: "Strategy & Planning",
          description:
            "Market analysis-based\nMVP/AI solution planning",
          icon: "Target",
        },
        {
          number: "03",
          title: "Technical Design & Development",
          description:
            "Robust system implementation\nwith optimal tech stack",
          icon: "Settings",
        },
        {
          number: "04",
          title: "Quality Control & Launch",
          description:
            "Successful service launch\nafter thorough testing",
          icon: "CheckCircle",
        },
        {
          number: "05",
          title: "Maintenance & Enhancement",
          description:
            "Continuous performance improvement\nand business expansion support",
          icon: "BarChart",
        },
      ],
    },
    portfolio: {
      label: "Success Stories",
      title: "Business Success Stories",
      titleHighlight: "Achieved with Potenlab",
      cta: "View More Portfolio",
      cases: [
        {
          name: "Logistics Optimization AI System",
          role: "Data Analysis & AI Model Development Partner",
          achievement:
            "15% logistics cost reduction, 20% faster delivery",
          tech: ["AI", "Data Analysis", "Optimization"],
        },
        {
          name: "Fintech Startup MVP",
          role: "Strategic Planning & Full-Stack Development Partner",
          achievement:
            "Launched in 3 months, acquired 10,000 users",
          tech: ["MVP", "Full-Stack", "Fintech"],
        },
        {
          name: "E-commerce Recommendation System",
          role: "AI-based Personalization Engine Construction",
          achievement:
            "35% conversion rate increase, 2x user engagement",
          tech: ["AI", "Recommendation", "ML"],
        },
      ],
    },
    cta: {
      label: "Contact Us",
      title: "Innovate Your Business with Potenlab.",
      description:
        "If you're looking for a strategic partner for business success beyond simple development, consult with Potenlab now.",
      button: "Inquire Project",
    },
  },
};

const iconMap = {
  X: X,
  MessageCircle: MessageCircle,
  TrendingUp: TrendingUp,
  Rocket: Rocket,
  Brain: Brain,
  Code: Code,
  Cloud: Cloud,
  Users: Users,
  Target: Target,
  Settings: Settings,
  CheckCircle: CheckCircle,
  BarChart: BarChart,
  Award: Award,
  Sparkles: Sparkles,
};

export function PartnerTestPage() {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  const t = content[language];

  const scrollToContact = () => {
    navigate("contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToPortfolio = () => {
    const portfolioSection =
      document.getElementById("portfolio");
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigateToPortfolio = () => {
    navigate("home");
    setTimeout(() => {
      const portfolioSection =
        document.getElementById("portfolio");
      if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-[116px] pb-[48px] bg-gradient-to-b from-[#E6F3FF] to-white pr-[0px] pl-[0px]">
        <div className="max-w-[1156px] mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-[38px] font-bold text-[#0E1116] leading-[1.3] mb-4">
                {t.hero.headline}
                <br />
                <span className="text-[#0079FF]">
                  {t.hero.subHeadline}
                </span>
              </h1>
              <p className="text-[15px] text-[#666666] mb-8 leading-relaxed">
                {t.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={scrollToContact}
                  className="px-8 h-12 bg-[#0079FF] text-white rounded-xl font-semibold hover:bg-[#0066DD] transition-colors inline-flex items-center justify-center gap-2 shadow-sm"
                >
                  {t.hero.cta1}
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={scrollToPortfolio}
                  className="px-8 h-12 border-2 border-[#0079FF] text-[#0079FF] rounded-xl font-semibold hover:bg-[#E6F3FF] transition-colors"
                >
                  {t.hero.cta2}
                </button>
              </div>
            </motion.div>

            {/* Right - Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden md:block"
            >
              <div className="relative w-full aspect-square">
                {/* Main Illustration Container */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Animated Circles Background */}
                  <motion.div
                    className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#0079FF]/10 to-[#E6F3FF]/30"
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-br from-[#0079FF]/5 to-transparent"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, -10, 0],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  />

                  {/* Floating Cards */}
                  <motion.div
                    className="absolute top-12 left-8 w-28 h-28 bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center justify-center gap-2"
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 3, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0079FF] to-[#0066DD] rounded-xl flex items-center justify-center">
                      <Brain className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-[10px] font-bold text-[#0E1116]">
                      AI
                    </span>
                  </motion.div>

                  <motion.div
                    className="absolute top-8 right-12 w-24 h-24 bg-white rounded-2xl shadow-lg p-3 flex flex-col items-center justify-center gap-2"
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, -5, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-[#0079FF] to-[#0066DD] rounded-xl flex items-center justify-center">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px] font-bold text-[#0E1116]">
                      Dev
                    </span>
                  </motion.div>

                  <motion.div
                    className="absolute bottom-16 left-12 w-26 h-26 bg-white rounded-2xl shadow-lg p-3 flex flex-col items-center justify-center gap-2"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-[#0079FF] to-[#0066DD] rounded-xl flex items-center justify-center">
                      <Cloud className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px] font-bold text-[#0E1116]">
                      Cloud
                    </span>
                  </motion.div>

                  <motion.div
                    className="absolute bottom-12 right-8 w-28 h-28 bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center justify-center gap-2"
                    animate={{
                      y: [0, -18, 0],
                      rotate: [0, -3, 0],
                    }}
                    transition={{
                      duration: 5.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.3,
                    }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0079FF] to-[#0066DD] rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-[10px] font-bold text-[#0E1116]">
                      Growth
                    </span>
                  </motion.div>

                  {/* Center Main Icon */}
                  <motion.div
                    className="relative z-10 w-32 h-32 bg-gradient-to-br from-[#0079FF] to-[#0066DD] rounded-3xl shadow-2xl flex items-center justify-center"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Rocket className="w-16 h-16 text-white" />
                  </motion.div>

                  {/* Decorative Lines */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    style={{ zIndex: 0 }}
                  >
                    <motion.line
                      x1="50%"
                      y1="50%"
                      x2="20%"
                      y2="20%"
                      stroke="#0079FF"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.3 }}
                      transition={{
                        duration: 2,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.line
                      x1="50%"
                      y1="50%"
                      x2="80%"
                      y2="25%"
                      stroke="#0079FF"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.3 }}
                      transition={{
                        duration: 2,
                        delay: 0.3,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.line
                      x1="50%"
                      y1="50%"
                      x2="25%"
                      y2="75%"
                      stroke="#0079FF"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.3 }}
                      transition={{
                        duration: 2,
                        delay: 0.6,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.line
                      x1="50%"
                      y1="50%"
                      x2="80%"
                      y2="80%"
                      stroke="#0079FF"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.3 }}
                      transition={{
                        duration: 2,
                        delay: 0.9,
                        ease: "easeInOut",
                      }}
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 1 - Why Potenlab */}
      <section className="pt-12 pb-24 bg-white">
        <div className="max-w-[1156px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="mb-4">
              <span
                className="text-[#0079FF] font-semibold text-[18px]"
                style={{
                  fontFamily: "Clash Display, sans-serif",
                  fontWeight: 600,
                }}
              >
                {t.differentiators.label}
              </span>
            </div>
            <h2 className="text-[32px] md:text-[36px] font-bold text-[#0E1116] leading-[1.2]">
              {t.differentiators.title}
              <br />
              <span className="text-[#0079FF]">
                {t.differentiators.titleHighlight}
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {t.differentiators.items.map((item, index) => {
              const IconComponent =
                iconMap[item.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  className="bg-white rounded-xl p-6 border border-[#E5E7EB] hover:border-[#0079FF] hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-[#E6F3FF] rounded-xl flex items-center justify-center mb-5">
                    <IconComponent className="w-6 h-6 text-[#0079FF]" />
                  </div>
                  <h3 className="text-[18px] font-bold text-[#0E1116] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[14px] text-[#666666] leading-relaxed mb-4">
                    {item.description}
                  </p>
                  {item.bullets && (
                    <div className="space-y-2 mt-4 pt-4 border-t border-[#E5E7EB]">
                      {item.bullets.map((bullet, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2"
                        >
                          <div className="w-1 h-1 bg-[#9CA3AF] rounded-full mt-2 flex-shrink-0" />
                          <p className="text-[13px] text-[#666666] leading-relaxed">
                            {bullet}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 2 - Core Services */}
      <section className="py-24 bg-[#F8F9FA]">
        <div className="max-w-[1156px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="mb-4">
              <span
                className="text-[#0079FF] font-semibold text-[18px]"
                style={{
                  fontFamily: "Clash Display, sans-serif",
                  fontWeight: 600,
                }}
              >
                {t.services.label}
              </span>
            </div>
            <h2 className="text-[32px] md:text-[36px] font-bold text-[#0E1116] leading-[1.2]">
              {t.services.title}
              <br />
              <span className="text-[#0079FF]">
                {t.services.titleHighlight}
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {t.services.items.map((item, index) => {
              const IconComponent =
                iconMap[item.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  onClick={() => {
                    if (index === 0) {
                      navigate("poten-booster");
                    } else if (index === 1) {
                      navigate("custom-product");
                    } else if (index === 2) {
                      navigate("consulting");
                    } else if (index === 3) {
                      navigate("poten-lamp");
                    } else if (item.path) {
                      navigate(item.path);
                    }
                  }}
                  className="bg-white rounded-xl p-6 border border-[#E5E7EB] hover:border-[#0079FF] hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#E6F3FF] rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-[#0079FF]" />
                    </div>
                    <div>
                      <h3 className="text-[18px] font-bold text-[#0E1116]">
                        {item.title}
                      </h3>
                      <p className="text-[12px] text-[#0079FF] font-semibold">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="text-[14px] text-[#666666] leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3 - Partnership Process */}
      <section className="py-24 bg-white">
        <div className="max-w-[1156px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="mb-4">
              <span
                className="text-[#0079FF] font-semibold text-[18px]"
                style={{
                  fontFamily: "Clash Display, sans-serif",
                  fontWeight: 600,
                }}
              >
                {t.process.label}
              </span>
            </div>
            <h2 className="text-[32px] md:text-[36px] font-bold text-[#0E1116] leading-[1.2]">
              {t.process.title}
              <br />
              <span className="text-[#0079FF]">
                {t.process.titleHighlight}
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {t.process.steps.map((step, index) => {
              const IconComponent =
                iconMap[step.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  className="relative flex flex-col items-center text-center bg-white rounded-xl p-5 border border-[#E5E7EB] hover:border-[#0079FF] hover:shadow-md transition-all duration-300"
                >
                  {/* Step Number */}
                  <div className="text-[14px] font-bold text-[#0079FF] mb-3">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-10 h-10 bg-[#E6F3FF] rounded-xl flex items-center justify-center mb-3">
                    <IconComponent className="w-5 h-5 text-[#0079FF]" />
                  </div>

                  {/* Content */}
                  <h4 className="text-[14px] font-bold text-[#0E1116] mb-2">
                    {step.title}
                  </h4>
                  <p className="text-[12px] text-[#666666] leading-relaxed whitespace-pre-line">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3.5 - Data-Driven Stats */}
      <section className="relative py-32 bg-[#fafafa] overflow-hidden">
        {/* Background Decorative Spheres */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-[#0079FF]/10 to-[#E6F3FF]/50 rounded-full blur-3xl"
            animate={{
              y: [0, 30, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-[#0079FF]/10 to-[#E6F3FF]/50 rounded-full blur-3xl"
            animate={{
              y: [0, -40, 0],
              x: [0, -30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-[#E6F3FF]/60 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="max-w-[1156px] mx-auto px-8 relative z-10">
          {/* Title */}
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
                  {t.stats.label}
                </span>
              </div>
              <h2 className="mb-3 md:mb-4 text-[28px] md:text-[36px] font-bold text-black px-4">
                {t.stats.title}
              </h2>
              <p className="text-[14px] md:text-[16px] text-[#666666] px-4">
                {t.stats.description}
              </p>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-16">
            {t.stats.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                }}
                className="text-center"
              >
                {/* Animated Number */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2 + 0.3,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className="mb-6"
                >
                  <div className="inline-flex items-baseline gap-1">
                    <motion.span
                      className="text-[72px] md:text-[96px] font-bold text-[#0079FF] leading-none"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.5,
                        delay: index * 0.2 + 0.5,
                      }}
                    >
                      <CountUpAnimation
                        end={parseInt(item.value)}
                        duration={2}
                        delay={index * 0.2 + 0.5}
                      />
                    </motion.span>
                    <span className="text-[36px] md:text-[48px] font-bold text-[#0079FF] leading-none">
                      {item.suffix}
                    </span>
                  </div>
                </motion.div>

                {/* Labels */}
                <div className="space-y-1">
                  <p className="text-[16px] md:text-[18px] font-semibold text-[#0E1116]">
                    {item.label}
                  </p>
                  <p className="text-[14px] md:text-[16px] text-[#666666]">
                    {item.sublabel}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 - Success Stories */}
      <Portfolio isPreview={true} />

      {/* Section 5 - Final CTA */}
      <section className="py-24 bg-gradient-to-b from-white to-[#E6F3FF]">
        <div className="max-w-[1156px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="mb-4">
              <span
                className="text-[#0079FF] font-semibold text-[18px]"
                style={{
                  fontFamily: "Clash Display, sans-serif",
                  fontWeight: 600,
                }}
              >
                {t.cta.label}
              </span>
            </div>
            <h2 className="text-[36px] md:text-[42px] font-bold text-[#0E1116] leading-[1.2] mb-5">
              {t.cta.title}
            </h2>
            <p className="text-[16px] text-[#666666] max-w-2xl mx-auto mb-8 leading-relaxed">
              {t.cta.description}
            </p>
            <button
              onClick={scrollToContact}
              className="px-10 h-14 bg-[#0079FF] text-white rounded-xl font-semibold hover:bg-[#0066DD] transition-colors inline-flex items-center gap-2 text-[16px] shadow-lg"
            >
              {t.cta.button}
              <ArrowRight className="w-6 h-6" />
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}