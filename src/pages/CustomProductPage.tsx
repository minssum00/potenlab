import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { useRouter } from "../contexts/RouterContext";
import {
  Box,
  Settings,
  Zap,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Package,
  Rocket,
  BarChart3,
  Layers,
  Shield,
  Workflow,
  Sparkles,
  ArrowRight,
  Users,
  Check,
} from "lucide-react";
import imgImage10 from "figma:asset/0cc071d7bd18366f6185f051ae669482b8edb7f2.png";
import imgImage12 from "figma:asset/10d4cd098dfea800e92e9ef4ac7a6fb23b11f9b8.png";
import imgImage13 from "figma:asset/c74cfe194190c8de9b6ff47a4583988ae0997b1a.png";
import imgImage11 from "figma:asset/e7abcd6d7c5a76dfdfa3943ed48ced278185f2fc.png";
import svgPaths from "../imports/svg-7t4v1d640v";
import svgPathsTech from "../imports/svg-pzooewdjlu";
import imgPostgresqlLogo1 from "figma:asset/d113a1fc7bbc74b3c951e832fa87d49f60a52f49.png";
import imgFigma2 from "figma:asset/486719b3c79357f4dad4e81da42e92e07e862316.png";
import imgClaudeCode1 from "figma:asset/60ac1911522b0b2942e925f2184b3763cd943f28.png";
import imgCloudflareIcon1462061 from "figma:asset/0995809f294f0fa273446845fd5ac9a622e09ea5.png";

const content = {
  ko: {
    hero: {
      label: "Custom Product Dev",
      title: "시장검증 및 고도화를 위한",
      subtitle: "'완성도' 중심의 제품 구축",
      description:
        "시장성을 확인했거나, 안정적인 백엔드 및 정교한\nUX/UI가 필요한 초기 창업가를 위한 서비스입니다.",
      cta: "무료 상담 신청하기",
    },
    problems: {
      title:
        "구조를 신경쓰지 않은 개발은 다음과 같은 문제점이 발생합니다",
      items: [
        {
          text: "코드가 스파게티처럼 얽혀있어",
          highlight: "유지보수가 불가능한 상황",
        },
        {
          text: "기능 추가할 때마다 버그가 생겨",
          highlight: "확장성 없는 구조",
        },
        {
          text: "성능과 보안이 불안정해",
          highlight: "서비스 신뢰도 하락",
        },
      ],
    },
    suitable: {
      title:
        "이런 고민을 하고 있다면, 이제 '커스텀 빌드' 단계입니다",
      items: [
        {
          title: "Type A - 시장확장",
          target:
            "포텐 부스터 등을 통해 MVP 시장 검증을 마치고 유의미한 데이터(CTR, 가입률 등)를 확보한 초기 창업자",
          need: "실제 유저의 결제와 활동이 이루어지는 안정적인 상용 버전 배포",
        },
        {
          title: "Type B - 사업 고도화",
          target:
            "정부지원사업(예창패, 초창패 등) 선정 후, 약속한 기술 스펙 구현 및 파트너사의 필요한 초기 창업자(팀)",
          need: "다음 단계 R&D나 투자 유치를 위한 높은 수준의 산출물(기능 명세, IA 등) 확보",
        },
        {
          title: "Type C - 운영 효율화",
          target:
            "유저는 늘고 있지만 수동 업무와 엑셀 관리에 한계를 느껴 관리프로그램이 필요한 기업 및 스타트업",
          need: "업무자동화 및 업무편의가 확장되어서 시간절약이 가능해진 프로그램 산출물",
        },
        {
          title: "Type D - 투자 준비중",
          target:
            "시리즈 A 이상 투자를 앞두고 확장 가능한 시스템 아키텍처와 기술적 완성도가 필요한 스타트업",
          need: "대규모 트래픽 대응 및 AI 기능 통합 등 다시 만들 필요 없는 지속 가능한 프로덕트",
        },
      ],
    },
    strength: {
      title: "커스텀 프로덕트 개발의 특징 ",
      subtitle: "Strength",
      items: [
        {
          number: "01",
          title: "MVP를 넘는 제품",
          description:
            "단순 프로토타입이 아닌, 실제 비즈니스를 운영할 수 있는 수준의 완성도",
        },
        {
          number: "02",
          title: "안정 기반의 서비스",
          description:
            "안정적인 서버 구조와 UX 흐름으로 실사용이 가능한 제품",
        },
        {
          number: "03",
          title: "운영 및 유지보수",
          description:
            "개발 후에도 안정적인 운영이 가능하도록 유지보수까지 고려한 설계",
        },
        {
          number: "04",
          title: "확장 가능한 구조",
          description:
            "새로운 기능과 트래픽 증가에 대응할 수 있는 아키텍처",
        },
      ],
    },
    products: {
      title: "가능한 프로덕트",
      subtitle: "Our Product",
      items: [
        {
          icon: "Layers",
          title: "서비스 개발",
          features: [
            "웹/앱 서비스",
            "관리자 시스템",
            "API 연동",
            "데이터베이스 설계",
          ],
        },
        {
          icon: "Zap",
          title: "MVP 고도화",
          features: [
            "구조 재설계",
            "성능 최적화",
            "기능 확장",
            "안정성 강화",
          ],
        },
        {
          icon: "Users",
          title: "운영지원 개발",
          features: [
            "어드민 페이지",
            "대시보드",
            "통계 시스템",
            "자동화 도구",
          ],
        },
        {
          icon: "TrendingUp",
          title: "플랫폼 구축",
          features: [
            "확장 가능한 구조",
            "멀티 테넌시",
            "마이크로서비스",
            "클라우드 인프라",
          ],
        },
      ],
    },
    packages: {
      title: "단계별 선택 가이드",
      subtitle: "Price Guide",
      description:
        "프로젝트의 목표와 상황에 따라 적합한 단계를 선택하세요.",
      items: [
        {
          name: "STARTER",
          stage: "아이디어 실체화 단계",
          message: "아이디어를 실제로 보여줄 수 있는 단계",
          features: [
            "핵심 기능 중심 MVP",
            "기본 UX 흐름",
            "단일 플랫폼 (Web 또는 App)",
            "기본 관리 기능",
          ],
          suitable: "검증된 아이디어를 첫 제품으로 구현",
          price: "1,500만원 ~",
          priceNote: "기능·일정에 따라 협의",
          icon: "Package",
        },
        {
          name: "BUILDER",
          stage: "상용화 준비 단계",
          message: "출시만 되는 게 아니라 운영 가능한 서비스",
          features: [
            "관리자 시스템 포함",
            "운영 고려 구조",
            "안정성 테스트",
            "멀티 플랫폼 대응",
            "기본 분석 도구",
          ],
          suitable: "실제 사용자를 받고 운영할 준비가 된 팀",
          price: "3,000만원 ~",
          priceNote: "기능·범위에 따라 협의",
          icon: "Rocket",
          recommended: true,
        },
        {
          name: "SCALER",
          stage: "고도화 및 확장 단계",
          message: "다시 만들 필요 없는 프로덕트",
          features: [
            "트래픽 대응 구조",
            "AI/자동화 기능",
            "고급 분석 및 모니터링",
            "장기 로드맵 설계",
            "전담 기술 파트너십",
          ],
          suitable:
            "성장 계획이 명확하고 장기 운영을 목표로 하는 팀",
          price: "협의",
          priceNote: "프로젝트 범위에 따라 산정",
          icon: "BarChart3",
        },
      ],
    },
    cta: {
      title: "우리 제품은 어떤 단계가 맞을까요?",
      description:
        "프로젝트 상황을 듣고, 적합한 단계와 예상 범위를 안내드립니다.",
      button: "무료 상담 신청하기",
      subtext: "평균 1시간 이내 응답",
    },
  },
  en: {
    hero: {
      label: "Custom Product Dev",
      title: "For Market Validation",
      subtitle: "and Advanced Product Building",
      description:
        "For early-stage founders who have validated their market\nor need stable backend and sophisticated UX/UI.",
      cta: "Request Free Consultation",
    },
    problems: {
      title:
        "Development without structure causes these problems",
      items: [
        {
          text: "Code becomes tangled like spaghetti",
          highlight: "Impossible to maintain",
        },
        {
          text: "Bugs appear with every new feature",
          highlight: "No scalability",
        },
        {
          text: "Performance and security are unstable",
          highlight: "Service reliability declines",
        },
      ],
    },
    suitable: {
      title:
        "If you're considering these, it's time for 'Custom Build'",
      items: [
        {
          title: "Type A - Market Expansion",
          target:
            "Early-stage founders who completed MVP market validation through Poten Booster and secured meaningful data (CTR, signup rate, etc.)",
          need: "Deploy a stable commercial version where actual users make payments and engage",
        },
        {
          title: "Type B - Business Advancement",
          target:
            "CEOs who secured government grants and need implementation of promised tech specs with confirmed development budget",
          need: "High-quality deliverables (feature specs, IA, etc.) for next-stage R&D or investment",
        },
        {
          title: "Type C - Operational Efficiency",
          target:
            "Teams experiencing limitations with manual work and Excel management as users grow, needing management programs",
          need: "Program deliverables that enable time savings through work automation and convenience expansion",
        },
        {
          title: "Type D - Investment Ready",
          target:
            "Startups needing scalable system architecture and technical completeness ahead of Series A+ investment",
          need: "Sustainable products handling massive traffic and AI integration without rebuilding",
        },
      ],
    },
    strength: {
      title: "Stability & Scalability",
      subtitle: "Strength",
      items: [
        {
          number: "01",
          title: "Beyond MVP",
          description:
            "Not just a prototype, but production-ready quality for actual business operations",
        },
        {
          number: "02",
          title: "Stable Service",
          description:
            "Products ready for real use with stable server structure and UX flow",
        },
        {
          number: "03",
          title: "Admin System",
          description:
            "Admin dashboard to manage content and users without developers",
        },
        {
          number: "04",
          title: "Scalable Structure",
          description:
            "Architecture that can handle new features and traffic growth",
        },
      ],
    },
    products: {
      title: "What We Build",
      subtitle: "Our Product",
      items: [
        {
          icon: "Layers",
          title: "Service Development",
          features: [
            "Web/App Service",
            "Admin System",
            "API Integration",
            "Database Design",
          ],
        },
        {
          icon: "Zap",
          title: "MVP Enhancement",
          features: [
            "Structure Redesign",
            "Performance Optimization",
            "Feature Expansion",
            "Stability Enhancement",
          ],
        },
        {
          icon: "Users",
          title: "Operations Support",
          features: [
            "Admin Page",
            "Dashboard",
            "Analytics System",
            "Automation Tools",
          ],
        },
        {
          icon: "TrendingUp",
          title: "Platform Building",
          features: [
            "Scalable Structure",
            "Multi-tenancy",
            "Microservices",
            "Cloud Infrastructure",
          ],
        },
      ],
    },
    packages: {
      title: "Stage Selection Guide",
      subtitle: "Price Guide",
      description:
        "Choose the appropriate stage based on your project goals and situation.",
      items: [
        {
          name: "STARTER",
          stage: "Idea Realization Stage",
          message:
            "The stage where you can actually show your idea",
          features: [
            "Core feature-focused MVP",
            "Basic UX flow",
            "Single platform (Web or App)",
            "Basic management features",
          ],
          suitable:
            "Implementing validated ideas as first product",
          price: "$12,000 ~",
          priceNote: "Subject to negotiation",
          icon: "Package",
        },
        {
          name: "BUILDER",
          stage: "Commercialization Stage",
          message: "Not just launched, but operational service",
          features: [
            "Admin system included",
            "Operational structure",
            "Stability testing",
            "Multi-platform support",
            "Basic analytics",
          ],
          suitable:
            "Teams ready to receive and operate real users",
          price: "$24,000 ~",
          priceNote: "Subject to negotiation",
          icon: "Rocket",
          recommended: true,
        },
        {
          name: "SCALER",
          stage: "Advanced & Scaling Stage",
          message: "Product that doesn't need rebuilding",
          features: [
            "Traffic handling structure",
            "AI/Automation features",
            "Advanced analytics",
            "Long-term roadmap",
            "Dedicated tech partnership",
          ],
          suitable:
            "Teams with clear growth plans and long-term operation goals",
          price: "Contact",
          priceNote: "Based on project scope",
          icon: "BarChart3",
        },
      ],
    },
    cta: {
      title: "Which stage fits your product?",
      description:
        "We'll listen to your project situation and guide you on the appropriate stage and scope.",
      button: "Request Free Consultation",
      subtext: "Average response within 1 hour",
    },
  },
};

const iconMap: { [key: string]: any } = {
  AlertCircle,
  Box,
  Settings,
  Zap,
  TrendingUp,
  Package,
  Rocket,
  BarChart3,
  Layers,
  Shield,
  Workflow,
  Sparkles,
  Users,
};

export function CustomProductPage() {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  const t = content[language];

  const handleContactClick = () => {
    navigate("contact", null, null, { inquiryType: "project" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContactWithSubCategory = (subCategory: string) => {
    navigate("contact", null, null, { inquiryType: "project", subCategory });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-[100px] sm:pt-[120px] lg:pt-[140px] pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#E6F3FF] via-[#F5F9FF] to-white">
        <div className="max-w-[1156px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="mb-6 sm:mb-8">
              <span className="inline-block text-[#0079FF] px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[13px] sm:text-[14px] font-medium border border-[#0079FF]/30 bg-white/80">
                🛠️ {t.hero.label}
              </span>
            </div>
            <h1 className="text-[28px] sm:text-[36px] md:text-[44px] font-bold text-[#0E1116] leading-[1.2] mb-2 sm:mb-3 break-keep">
              {t.hero.title}
            </h1>
            <h2 className="text-[24px] sm:text-[32px] md:text-[40px] font-bold text-[#0079FF] mb-6 sm:mb-8 leading-[1.2] break-keep px-2">
              {t.hero.subtitle}
            </h2>
            <p className="text-[15px] sm:text-[17px] md:text-[18px] leading-[1.8] text-[#666666] max-w-[700px] mx-auto whitespace-pre-line px-2 mb-8 sm:mb-10">
              {t.hero.description}
            </p>
            <button
              onClick={handleContactClick}
              className="px-[24px] h-[44px] text-[14px] font-medium rounded-[24px] transition-all duration-200 bg-[#0079FF] hover:bg-[#0066DD] text-white shadow-[0px_1px_3px_0px_rgba(0,121,255,0.2),0px_1px_2px_0px_rgba(0,121,255,0.2)] hover:shadow-[0px_2px_5px_0px_rgba(0,121,255,0.3)] inline-flex items-center gap-2"
            >
              {t.hero.cta}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Suitable Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden">
        {/* Background Blur Gradient */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] opacity-30">
          <div className="absolute inset-0 bg-gradient-radial from-[#E6F3FF] via-[#F0F9FF] to-transparent blur-[100px]" />
        </div>

        <div className="max-w-[1156px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <h2 className="text-[22px] sm:text-[28px] lg:text-[36px] font-bold text-[#0E1116] leading-[1.4] sm:leading-[1.5] break-keep px-2">
              {t.suitable.title}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.suitable.items.map((item, index) => {
              const images = [
                imgImage10,
                imgImage12,
                imgImage13,
                imgImage11,
              ];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                >
                  <div className="bg-white rounded-[12px] border border-[#E3E3E3] shadow-[0px_0px_20px_0px_rgba(34,107,239,0.15)] hover:shadow-[0px_0px_30px_0px_rgba(34,107,239,0.25)] transition-all duration-300 p-6 h-full flex flex-col gap-4">
                    <div className="flex flex-col gap-3">
                      <div className="w-[40px] h-[40px]">
                        <img
                          src={images[index]}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-[20px] font-semibold text-[#001122] leading-[30px]">
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex flex-col gap-3 flex-1">
                      <div className="flex flex-col gap-1">
                        <p className="text-[12px] font-semibold text-[#0079FF] leading-[18px]">
                          Needs
                        </p>
                        <p className="text-[13px] text-[#0E1116] leading-[19.5px]">
                          {item.target}
                        </p>
                      </div>

                      <div className="flex flex-col gap-1">
                        <p className="text-[12px] font-semibold text-[#0079FF] leading-[18px]">
                          Output
                        </p>
                        <p className="text-[13px] text-[#0E1116] leading-[19.5px]">
                          {item.need}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Strength Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-[#1A1A1A] relative overflow-hidden">
        <div className="max-w-[1156px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <p className="text-[#3FD4D5] text-[16px] sm:text-[18px] lg:text-[20px] font-bold mb-2">
              {t.strength.subtitle}
            </p>
            <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-white break-keep">
              {t.strength.title}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {t.strength.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className="text-center"
              >
                <p className="text-[16px] sm:text-[18px] lg:text-[22px] font-bold text-[rgba(255,255,255,0.3)] mb-2 sm:mb-3">
                  {item.number}
                </p>
                <p className="text-[16px] sm:text-[20px] lg:text-[25px] font-bold text-white mb-2 sm:mb-3">
                  {item.title}
                </p>
                <p className="text-[12px] sm:text-[14px] lg:text-[17px] text-[#C1C1C1] leading-[1.7]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-[#226bef] relative overflow-hidden shadow-[0px_-15px_21px_0px_rgba(0,0,0,0.05)]">
        <div className="max-w-[1156px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6 sm:mb-8 lg:mb-[34px]"
          >
            <p className="text-[#00ffe0] text-[16px] sm:text-[18px] lg:text-[20px] font-bold leading-[1.7] mb-[2px]">
              어떻게 진행되나요?
            </p>
            <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-white leading-[1.5]">
              서비스 프로세스
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-[24px]">
            {/* Step 01 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              className="rounded-[24px] overflow-hidden"
            >
              <div className="bg-[#2a2826] h-[194px] relative flex items-center justify-center overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1693045181254-08462917f681?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFubmluZyUyMHdpcmVmcmFtZSUyMGRvY3VtZW50fGVufDF8fHx8MTc2OTQwODczNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="서비스 기획"
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
              <div className="bg-white px-[22px] pt-[24px] pb-[32px] h-[180px]">
                <p className="text-[#226bef] text-[16px] font-semibold leading-[1.5] mb-[8px]">Step 01</p>
                <p className="text-black text-[22px] font-bold leading-[1.5] mb-[8px]">서비스 기획</p>
                <div className="text-[#5a5e6a] text-[14px] font-medium space-y-1">
                  <p className="leading-[1.5]">메뉴구조/ I.A / 기능명세 설계</p>
                  <p className="leading-[1.5]">유저 플로우 및 기능 우선순위 설정</p>
                  <p className="leading-[1.5]">서비스 확장 가능성을 고려한 기획</p>
                </div>
              </div>
            </motion.div>

            {/* Step 02 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-[24px] overflow-hidden"
            >
              <div className="bg-[#2a2826] h-[194px] relative flex items-center justify-center overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMHV4JTIwZGVzaWduJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc2OTM3NDcxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="UXUI 디자인"
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
              <div className="bg-white px-[22px] pt-[24px] pb-[32px] h-[180px]">
                <p className="text-[#226bef] text-[16px] font-semibold leading-[1.5] mb-[8px]">Step 02</p>
                <p className="text-black text-[22px] font-bold leading-[1.5] mb-[8px]">UXUI 디자인</p>
                <div className="text-[#5a5e6a] text-[14px] font-medium space-y-1">
                  <p className="leading-[1.5]">사용성 고려한 직관적인 화면 구성</p>
                  <p className="leading-[1.5]">서비스 특성을 반영한 디자인</p>
                  <p className="leading-[1.5]">고객 유입 및 전환을 고려한 UX</p>
                </div>
              </div>
            </motion.div>

            {/* Step 03 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-[24px] overflow-hidden"
            >
              <div className="bg-[#2a2826] h-[194px] relative flex items-center justify-center overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1544847558-3ccacb31ee7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBkZXZlbG9wbWVudCUyMGxhcHRvcHxlbnwxfHx8fDE3NjkzNzUwOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="프로젝트 개발"
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
              <div className="bg-white px-[22px] pt-[24px] pb-[32px] h-[180px]">
                <p className="text-[#226bef] text-[16px] font-semibold leading-[1.5] mb-[8px]">Step 03</p>
                <p className="text-black text-[22px] font-bold leading-[1.5] mb-[8px]">프로젝트 개발</p>
                <div className="text-[#5a5e6a] text-[14px] font-medium space-y-1">
                  <p className="leading-[1.5]">Front/Back 시스템 기반 개발</p>
                  <p className="leading-[1.5]">확장 가능한 DB 및 스키마 설계</p>
                  <p className="leading-[1.5]">API개발 및 연동 , 서버셋팅</p>
                </div>
              </div>
            </motion.div>

            {/* Step 04 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-[24px] overflow-hidden"
            >
              <div className="bg-[#2a2826] h-[194px] relative flex items-center justify-center overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1748609160056-7b95f30041f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjBjaGFydHxlbnwxfHx8fDE3Njk0MDg3Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="운영 및 분석"
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
              <div className="bg-white px-[22px] pt-[24px] pb-[32px] h-[180px]">
                <p className="text-[#226bef] text-[16px] font-semibold leading-[1.5] mb-[8px]">Step 04</p>
                <p className="text-black text-[22px] font-bold leading-[1.5] mb-[8px]">운영 및 분석</p>
                <div className="text-[#5a5e6a] text-[14px] font-medium space-y-1">
                  <p className="leading-[1.5]">개발 문서 및 가이드 제공</p>
                  <p className="leading-[1.5]">초기 운영 안정화 및 성능 최적화</p>
                  <p className="leading-[1.5]">추가 기능 개발 및 확장 지원</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-[1156px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6 sm:mb-8 lg:mb-[34px]"
          >
            <div className="flex flex-col items-center justify-center gap-[2px] mb-[12px]">
              <p className="text-[32px] sm:text-[36px] lg:text-[40px] leading-[1.7] font-bold text-center">🖥️</p>
              <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-black leading-[1.5]">이런 기술들을 사용해요</h2>
            </div>
            <div className="text-[#3b3f4a] text-[14px] sm:text-[16px] lg:text-[18px] leading-[1.7] text-center max-w-[800px] mx-auto px-2">
              <p className="mb-0">Javascript 기반의 Framework인 React를 통해 개발합니다.</p>
              <p className="mb-0 hidden sm:block">React-Native는 App개발 시 Cross Platform (iOS , Android) 개발이 가능합니다.</p>
              <p className="text-[#b1b1b1] text-[12px] sm:text-[14px]">*고객요청 및 상황에 따라 일부 기술스택은 변경할 수 있습니다.</p>
            </div>
          </motion.div>

          <div className="flex flex-col gap-3 sm:gap-4 lg:gap-[16px] overflow-x-auto">
            {/* First Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex gap-[20px]"
            >
              {/* React */}
              <div className="flex gap-[20px] items-center rounded-[8px] border border-[#e4e6ea] w-[274px]">
                <div className="bg-white rounded-[8px] shrink-0 size-[76px] flex items-center justify-center relative">
                  <div className="absolute h-[38px] w-[42px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 42 38">
                      <g clipPath="url(#clip0_842_1486)">
                        <path d={svgPathsTech.p12f69f80} fill="#00D8FF" />
                      </g>
                      <defs>
                        <clipPath id="clip0_842_1486">
                          <rect fill="white" height="38" width="42" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <p className="text-[16px] font-medium leading-[1.5] text-black">React (RN)</p>
                  <p className="text-[14px] leading-[1.7] text-[#5a5e6a] overflow-hidden text-ellipsis h-[24px]">Front-end</p>
                </div>
              </div>

              {/* Node.js */}
              <div className="flex gap-[20px] items-center rounded-[8px] border border-[#e4e6ea] w-[274px]">
                <div className="bg-white rounded-[8px] shrink-0 size-[76px] flex items-center justify-center relative">
                  <div className="absolute h-[19px] w-[53px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 53.0035 18.9983">
                      <g>
                        <path clipRule="evenodd" d={svgPathsTech.p38f19300} fill="#404137" fillRule="evenodd" />
                        <path clipRule="evenodd" d={svgPathsTech.p26b07cc0} fill="#83CD29" fillRule="evenodd" />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-[16px] font-medium leading-[1.5] text-black">Node.js</p>
                  <p className="text-[14px] leading-[1.7] text-[#5a5e6a] overflow-hidden text-ellipsis h-[24px]">Back-end</p>
                </div>
              </div>

              {/* AWS */}
              <div className="flex gap-[20px] items-center rounded-[8px] border border-[#e4e6ea] w-[274px]">
                <div className="bg-white rounded-[8px] shrink-0 size-[76px] flex items-center justify-center relative">
                  <div className="absolute h-[30px] w-[50px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49.4525 29.6374">
                      <g>
                        <path d={svgPathsTech.p2581f200} fill="#252F3E" />
                        <g>
                          <path clipRule="evenodd" d={svgPathsTech.p39191700} fill="#FF9900" fillRule="evenodd" />
                          <path clipRule="evenodd" d={svgPathsTech.p143ae7c0} fill="#FF9900" fillRule="evenodd" />
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <p className="text-[16px] font-medium leading-[1.5] text-black">Amazon Web Service</p>
                  <p className="text-[14px] leading-[1.7] text-[#5a5e6a] overflow-hidden text-ellipsis h-[24px]">Server</p>
                </div>
              </div>

              {/* PostgreSQL */}
              <div className="flex gap-[20px] items-center rounded-[8px] border border-[#e4e6ea] w-[274px]">
                <div className="bg-white rounded-[8px] shrink-0 size-[76px] flex items-center justify-center relative">
                  <div className="absolute h-[56px] w-[50px]">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPostgresqlLogo1} />
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <p className="text-[16px] font-medium leading-[1.5] text-black">PostgreSQL</p>
                  <p className="text-[14px] leading-[1.7] text-[#5a5e6a] overflow-hidden text-ellipsis h-[24px]">Database</p>
                </div>
              </div>
            </motion.div>

            {/* Second Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex gap-[20px]"
            >
              {/* Figma */}
              <div className="flex gap-[20px] items-center rounded-[8px] border border-[#e4e6ea] w-[274px]">
                <div className="bg-white rounded-[8px] shrink-0 size-[76px] flex items-center justify-center relative">
                  <div className="absolute size-[40px]">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFigma2} />
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <p className="text-[16px] font-medium leading-[1.5] text-black">Figma</p>
                  <p className="text-[14px] leading-[1.7] text-[#5a5e6a] overflow-hidden text-ellipsis h-[24px]">{`Design & Front page`}</p>
                </div>
              </div>

              {/* Vercel */}
              <div className="flex gap-[20px] items-center rounded-[8px] border border-[#e4e6ea] w-[274px]">
                <div className="bg-white rounded-[8px] shrink-0 size-[76px] flex items-center justify-center p-[14px]">
                  <div className="size-[48px] flex items-center justify-center">
                    <div className="h-[47.94px] w-[47.967px] scale-y-[-100%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 47.967 47.9405">
                        <g>
                          <path d={svgPathsTech.p3306cf00} fill="black" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-[16px] font-medium leading-[1.5] text-black">Vercel</p>
                  <p className="text-[14px] leading-[1.7] text-[#5a5e6a] overflow-hidden text-ellipsis h-[24px]">Front-end managment</p>
                </div>
              </div>

              {/* Claude Code */}
              <div className="flex gap-[20px] items-center rounded-[8px] border border-[#e4e6ea] w-[274px]">
                <div className="bg-white rounded-[8px] shrink-0 size-[76px] flex items-center justify-center p-[16px]">
                  <div className="flex items-center justify-center">
                    <div className="scale-y-[-100%]">
                      <div className="size-[44px]">
                        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgClaudeCode1} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <p className="text-[16px] font-medium leading-[1.5] text-black">Claude Code</p>
                  <p className="text-[14px] leading-[1.7] text-[#5a5e6a] overflow-hidden text-ellipsis h-[24px]">AI coding assistant</p>
                </div>
              </div>

              {/* Cloudflare */}
              <div className="flex gap-[20px] items-center rounded-[8px] border border-[#e4e6ea] w-[274px]">
                <div className="bg-white rounded-[8px] shrink-0 size-[76px] flex items-center justify-center relative">
                  <div className="absolute size-[50px]">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCloudflareIcon1462061} />
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <p className="text-[16px] font-medium leading-[1.5] text-black">Cloudflare</p>
                  <p className="text-[14px] leading-[1.7] text-[#5a5e6a] overflow-hidden text-ellipsis h-[24px]">{`Infra & SEO`}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="max-w-[1156px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <p
              className="text-[#0079FF] text-[12px] sm:text-[14px] lg:text-[15px] font-semibold mb-3 sm:mb-4 tracking-wide"
              style={{
                fontFamily: "Clash Display, sans-serif",
              }}
            >
              {t.packages.subtitle}
            </p>
            <h2 className="text-[28px] sm:text-[34px] lg:text-[42px] font-bold text-[#0E1116] mb-3 sm:mb-4 lg:mb-5">
              {t.packages.title}
            </h2>
            <p className="text-[14px] sm:text-[15px] lg:text-[17px] text-[#666666] max-w-[600px] mx-auto px-2">
              {t.packages.description}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {t.packages.items.map((pkg, index) => {
              const Icon = iconMap[pkg.icon];
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
                  className={`bg-white rounded-[24px] p-8 border-2 relative ${
                    pkg.recommended
                      ? "border-[#0079FF] shadow-[0px_8px_24px_0px_rgba(0,121,255,0.2)]"
                      : "border-[#E5E7EB] hover:border-[#0079FF]/30 hover:shadow-[0px_4px_16px_0px_rgba(0,121,255,0.1)]"
                  } transition-all duration-300`}
                >
                  {pkg.recommended && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="bg-[#0079FF] text-white text-[13px] font-bold px-4 py-1.5 rounded-full">
                        추천
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#E6F3FF] rounded-[12px] flex items-center justify-center">
                      <Icon
                        className="w-6 h-6 text-[#0079FF]"
                        strokeWidth={2}
                      />
                    </div>
                    <div>
                      <h3 className="text-[24px] font-bold text-[#0E1116]">
                        {pkg.name}
                      </h3>
                      <p className="text-[13px] text-[#94A3B8] font-medium">
                        {pkg.stage}
                      </p>
                    </div>
                  </div>

                  <p className="text-[15px] text-[#374151] mb-6 leading-relaxed font-medium">
                    {pkg.message}
                  </p>

                  <div className="mb-6 pb-6 border-b border-[#F1F5F9]">
                    <ul className="space-y-3">
                      {pkg.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-[14px] text-[#4B5563]"
                        >
                          <CheckCircle
                            className="w-5 h-5 text-[#0079FF] mt-0.5 shrink-0"
                            strokeWidth={2}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <p className="text-[13px] text-[#94A3B8] mb-2">
                      적합한 대상
                    </p>
                    <p className="text-[14px] text-[#374151] leading-relaxed">
                      {pkg.suitable}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[#F1F5F9]">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-[32px] font-bold text-[#0E1116]">
                        {pkg.price}
                      </span>
                    </div>
                    <p className="text-[13px] text-[#94A3B8]">
                      {pkg.priceNote}
                    </p>
                  </div>

                  <button
                    onClick={handleContactClick}
                    className={`w-full mt-6 h-[44px] text-[14px] font-medium rounded-[24px] transition-all duration-200 ${
                      pkg.recommended
                        ? "bg-[#0079FF] hover:bg-[#0066DD] text-white shadow-[0px_1px_3px_0px_rgba(0,121,255,0.2),0px_1px_2px_0px_rgba(0,121,255,0.2)] hover:shadow-[0px_2px_5px_0px_rgba(0,121,255,0.3)]"
                        : "bg-white text-[#0079FF] border-2 border-[#0079FF] hover:bg-[#F0F8FF]"
                    }`}
                  >
                    상담 신청
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-[66px] px-4 sm:px-6 lg:px-8 bg-[#0079FF]">
        <div className="max-w-[800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-[22px] sm:text-[28px] md:text-[40px] font-bold mb-6 sm:mb-8 lg:mb-10 leading-relaxed text-white whitespace-pre-line break-keep px-2">
              {t.cta.title}
            </h2>
            <p className="text-[14px] sm:text-[15px] lg:text-[17px] text-white/90 mb-6 sm:mb-8 max-w-[600px] mx-auto leading-relaxed px-2">
              {t.cta.description}
            </p>
            <button
              onClick={handleContactClick}
              className="px-[24px] h-[44px] text-[14px] font-medium rounded-[24px] transition-all duration-200 bg-white text-[#0079FF] hover:bg-[#F0F8FF] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.06)] hover:shadow-[0px_2px_5px_0px_rgba(0,0,0,0.15)]"
            >
              {t.cta.button}
            </button>
            <p className="text-[12px] sm:text-[13px] lg:text-[14px] text-white/80 mt-3 sm:mt-4">
              {t.cta.subtext}
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}