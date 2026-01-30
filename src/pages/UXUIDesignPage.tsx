import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { useRouter } from "../contexts/RouterContext";
import {
  CheckCircle,
  AlertCircle,
  TrendingUp,
  XCircle,
  Shield,
  Target,
  Award,
  Palette,
  Layout,
  Smartphone,
  MousePointer,
  Zap,
} from "lucide-react";

export function UXUIDesignPage() {
  const { language } = useLanguage();
  const { navigate } = useRouter();

  const content = {
    ko: {
      hero: {
        label: "UX/UI 디자인",
        title: "사용자 경험을 디자인하고",
        titleHighlight: "비즈니스 성과를 만들어냅니다",
        description:
          "예쁜 디자인이 아닌, 사용자가 원하는 것을\n직관적으로 찾을 수 있는 디자인을 만듭니다.",
        cta: "무료 상담 신청하기",
      },
      problem: {
        title:
          "디자인은 예쁜데, 왜 전환율이 낮을까요?",
        checks: [
          "웹사이트/앱이 예쁜데 사용자들이 원하는 행동을 안 해요.",
          "사용자들이 어디서 이탈하는지, 왜 떠나는지 모르겠어요.",
          "디자인 리뉴얼을 하고 싶은데 어떤 방향으로 해야 할지 모르겠어요.",
        ],
      },
      solution: {
        label: "Process",
        title: "데이터 기반 UX/UI 디자인",
        description:
          "사용자 리서치부터 프로토타입까지, 검증된 프로세스로 최적의 사용자 경험을 설계합니다.",
        steps: [
          {
            icon: "Target",
            title: "사용자 리서치",
            description:
              "타겟 사용자 분석, 경쟁사 벤치마킹, 사용자 인터뷰",
          },
          {
            icon: "Layout",
            title: "정보 구조 설계",
            description:
              "사이트맵, 와이어프레임, 사용자 흐름 설계",
          },
          {
            icon: "Palette",
            title: "UI 디자인",
            description:
              "비주얼 디자인, 디자인 시스템, 반응형 설계",
          },
          {
            icon: "MousePointer",
            title: "프로토타입 & 테스트",
            description:
              "인터랙티브 프로토타입, 사용성 테스트, 개선",
          },
        ],
      },
      beforeAfter: {
        label: "Impact",
        title: "UX/UI 개선 전후 차이",
        description:
          "사용자 중심 디자인으로 비즈니스 지표를 개선합니다.",
        before: {
          title: "Before",
          subtitle: "감에 의존하는 디자인",
          items: [
            {
              label: "높은 이탈률",
              description:
                "사용자가 원하는 정보를 찾지 못해 빠르게 이탈합니다.",
            },
            {
              label: "낮은 전환율",
              description:
                "복잡한 UI로 인해 구매/가입 등 핵심 액션이 일어나지 않습니다.",
            },
            {
              label: "일관성 없는 경험",
              description:
                "페이지마다 다른 디자인으로 브랜드 신뢰도가 떨어집니다.",
            },
          ],
        },
        after: {
          title: "After",
          subtitle: "데이터 기반 사용자 중심 디자인",
          items: [
            {
              label: "체류 시간 증가",
              description:
                "직관적인 네비게이션으로 사용자가 원하는 정보를 쉽게 찾습니다.",
            },
            {
              label: "전환율 향상",
              description:
                "명확한 CTA와 간소화된 프로세스로 핵심 액션을 유도합니다.",
            },
            {
              label: "브랜드 일관성",
              description:
                "디자인 시스템으로 모든 페이지에서 일관된 경험을 제공합니다.",
            },
          ],
        },
      },
      whyUs: {
        label: "Why Us",
        title: "포텐랩 UX/UI의 차별점",
        description:
          "비즈니스 목표를 이해하고 사용자 경험으로 성과를 만듭니다.",
        points: [
          {
            icon: "Shield",
            title: "비즈니스 이해",
            description:
              "단순 디자인이 아닌 비즈니스 목표 달성\n\n예쁜 디자인이 아니라 비즈니스 목표(전환, 가입, 구매)를 달성하는 디자인을 만듭니다.",
          },
          {
            icon: "Target",
            title: "데이터 기반 의사결정",
            description:
              "감이 아닌 데이터로 디자인\n\n사용자 리서치와 A/B 테스트를 통해 가설을 검증하고 최적의 디자인을 도출합니다.",
          },
          {
            icon: "Award",
            title: "개발 연계",
            description:
              "디자인에서 개발까지 원스톱\n\n디자인만 하고 끝나지 않고, 개발까지 이어지는 실현 가능한 디자인을 제공합니다.",
          },
        ],
      },
      deliverables: {
        label: "Deliverables",
        title: "디자인 산출물",
        description: "실제 개발에 바로 적용 가능한 산출물을 제공합니다.",
        items: [
          {
            title: "UX 리서치 보고서",
            description: "사용자 분석, 경쟁사 분석, 인사이트 도출 보고서",
          },
          {
            title: "와이어프레임",
            description: "페이지별 레이아웃과 정보 구조 설계 문서",
          },
          {
            title: "UI 디자인 파일",
            description: "Figma 기반 반응형 디자인 파일 및 에셋",
          },
          {
            title: "디자인 시스템",
            description: "컴포넌트, 컬러, 타이포그래피 가이드라인",
          },
        ],
      },
      cta: {
        title: "생각은 깊게, 디자인은 쉽게 \n 잘하는 UXUI는 포텐랩에 문의주세요",
        button: "무료 상담 신청하기",
      },
    },
    en: {
      hero: {
        label: "UX/UI Design",
        title: "Design User Experience,",
        titleHighlight: "Create Business Results",
        description:
          "Not just pretty design, but design that helps users\nintuitively find what they want.",
        cta: "Request Free Consultation",
      },
      problem: {
        title:
          "Design looks great, but why is conversion low?",
        checks: [
          "Website/app looks great but users aren't taking desired actions.",
          "Don't know where users drop off or why they leave.",
          "Want to redesign but don't know which direction to take.",
        ],
      },
      solution: {
        label: "Process",
        title: "Data-Driven UX/UI Design",
        description:
          "From user research to prototyping, we design optimal user experiences through proven processes.",
        steps: [
          {
            icon: "Target",
            title: "User Research",
            description:
              "Target user analysis, competitor benchmarking, user interviews",
          },
          {
            icon: "Layout",
            title: "Information Architecture",
            description:
              "Sitemap, wireframes, user flow design",
          },
          {
            icon: "Palette",
            title: "UI Design",
            description:
              "Visual design, design system, responsive design",
          },
          {
            icon: "MousePointer",
            title: "Prototype & Test",
            description:
              "Interactive prototype, usability testing, iteration",
          },
        ],
      },
      beforeAfter: {
        label: "Impact",
        title: "Before & After UX/UI Improvement",
        description:
          "User-centered design improves business metrics.",
        before: {
          title: "Before",
          subtitle: "Design Based on Intuition",
          items: [
            {
              label: "High Bounce Rate",
              description:
                "Users quickly leave when they can't find desired information.",
            },
            {
              label: "Low Conversion",
              description:
                "Complex UI prevents core actions like purchases or signups.",
            },
            {
              label: "Inconsistent Experience",
              description:
                "Different designs across pages reduce brand trust.",
            },
          ],
        },
        after: {
          title: "After",
          subtitle: "Data-Driven User-Centered Design",
          items: [
            {
              label: "Increased Engagement",
              description:
                "Intuitive navigation helps users easily find information.",
            },
            {
              label: "Higher Conversion",
              description:
                "Clear CTAs and simplified processes drive core actions.",
            },
            {
              label: "Brand Consistency",
              description:
                "Design system provides consistent experience across all pages.",
            },
          ],
        },
      },
      whyUs: {
        label: "Why Us",
        title: "What Sets Potenlab UX/UI Apart",
        description:
          "We understand business goals and create results through user experience.",
        points: [
          {
            icon: "Shield",
            title: "Business Understanding",
            description:
              "Design for Business Goals, Not Just Aesthetics\n\nWe create designs that achieve business goals (conversion, signup, purchase), not just pretty designs.",
          },
          {
            icon: "Target",
            title: "Data-Driven Decisions",
            description:
              "Design with Data, Not Intuition\n\nWe validate hypotheses through user research and A/B testing to derive optimal designs.",
          },
          {
            icon: "Award",
            title: "Development Integration",
            description:
              "One-Stop from Design to Development\n\nWe don't just design and stop - we provide implementable designs that connect to development.",
          },
        ],
      },
      deliverables: {
        label: "Deliverables",
        title: "Design Deliverables",
        description: "We provide deliverables ready for immediate development.",
        items: [
          {
            title: "UX Research Report",
            description: "User analysis, competitor analysis, insights report",
          },
          {
            title: "Wireframes",
            description: "Page layouts and information architecture documentation",
          },
          {
            title: "UI Design Files",
            description: "Figma-based responsive design files and assets",
          },
          {
            title: "Design System",
            description: "Components, colors, typography guidelines",
          },
        ],
      },
      cta: {
        title: "Create products users love,\ntogether with us.",
        button: "Request Free Consultation",
      },
    },
  };

  const t = content[language as keyof typeof content];

  const iconMap = {
    Shield: Shield,
    Target: Target,
    Award: Award,
    Palette: Palette,
    Layout: Layout,
    Smartphone: Smartphone,
    MousePointer: MousePointer,
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="pt-[120px] pb-32 px-8 bg-gradient-to-b from-[#F3E8FF] via-[#FAF5FF] to-white">
        <div className="max-w-[1156px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="mb-4">
              <span className="inline-block text-[#9333EA] px-4 py-1.5 rounded-full text-[14px] font-semibold border border-[#9333EA]/20 bg-white/50">
                🎨 {t.hero.label}
              </span>
            </div>
            <h1 className="md:text-[48px] font-bold mb-2 text-[#0E1116] text-[40px] m-[0px]">
              {t.hero.title}
            </h1>
            <h2 className="text-[32px] md:text-[40px] font-bold mb-6 text-[#9333EA]">
              {t.hero.titleHighlight}
            </h2>
            <p className="text-[16px] md:text-[18px] leading-relaxed mb-10 text-[#666666] max-w-[700px] mx-auto whitespace-pre-line">
              {t.hero.description}
            </p>
            <button
              onClick={() => navigate("contact", null, null, { inquiryType: "design", subCategory: "uxui" })}
              className="px-8 h-12 rounded-xl transition-colors font-semibold text-[16px] inline-flex items-center gap-2 shadow-lg hover:shadow-xl hover:opacity-90"
              style={{ backgroundColor: '#9333EA', color: '#FFFFFF' }}
            >
              {t.hero.cta}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-[1156px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[28px] md:text-[32px] font-bold mb-12 text-center leading-relaxed whitespace-pre-line text-[#0E1116]">
              {t.problem.title}
            </h2>
            <div className="space-y-4 max-w-[900px] mx-auto">
              {t.problem.checks.map((check, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.1,
                  }}
                  className="bg-[#F3E8FF] p-6 rounded-xl border border-[#E9D5FF]"
                >
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-5 h-5 text-[#9333EA] flex-shrink-0 mt-0.5" />
                    <p className="text-[15px] leading-relaxed text-[#424242]">
                      {check}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solution Process */}
      <section className="py-32 px-8 bg-[#F8F9FA]">
        <div className="max-w-[1156px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p
              className="text-[14px] font-semibold text-[#9333EA] mb-3"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              {t.solution.label}
            </p>
            <h2 className="text-[32px] md:text-[36px] font-bold text-[#0E1116] mb-4">
              {t.solution.title}
            </h2>
            <p className="text-[15px] text-[#666666] max-w-[600px] mx-auto">
              {t.solution.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.solution.steps.map((step, idx) => {
              const Icon = iconMap[step.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.1,
                  }}
                  className="bg-white p-6 rounded-xl border border-[#E5E5E5] hover:border-[#9333EA]/30 transition-all"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: '#F3E8FF' }}
                  >
                    <Icon className="w-6 h-6" style={{ color: '#9333EA' }} />
                  </div>
                  <div className="text-[13px] font-semibold text-[#9333EA] mb-2">
                    Step {idx + 1}
                  </div>
                  <h3 className="text-[18px] font-bold mb-2 text-[#0E1116]">
                    {step.title}
                  </h3>
                  <p className="text-[14px] text-[#666666] leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-32 px-8 bg-white">
        <div className="max-w-[1156px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <p
              className="text-[14px] font-semibold text-[#9333EA] mb-3"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              {t.beforeAfter.label}
            </p>
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#0E1116] mb-4">
              {t.beforeAfter.title}
            </h2>
            <p className="text-[15px] text-[#666666] max-w-[600px] mx-auto">
              {t.beforeAfter.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#F8F9FA] p-8 rounded-xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-[#FFE5E5] rounded-xl flex items-center justify-center">
                  <XCircle className="w-8 h-8 text-[#FF6B6B]" />
                </div>
                <div>
                  <h3 className="text-[20px] font-bold text-[#0E1116] mb-1">
                    {t.beforeAfter.before.title}
                  </h3>
                  <p className="text-[14px] text-[#666666]">
                    {t.beforeAfter.before.subtitle}
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                {t.beforeAfter.before.items.map((item, idx) => (
                  <div key={idx}>
                    <p className="text-[14px] font-semibold text-[#FF6B6B] mb-2">
                      {item.label}
                    </p>
                    <p className="text-[14px] text-[#666666] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#F8F9FA] p-8 rounded-xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-[#F3E8FF] rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-[#9333EA]" />
                </div>
                <div>
                  <h3 className="text-[20px] font-bold text-[#0E1116] mb-1">
                    {t.beforeAfter.after.title}
                  </h3>
                  <p className="text-[14px] text-[#666666]">
                    {t.beforeAfter.after.subtitle}
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                {t.beforeAfter.after.items.map((item, idx) => (
                  <div key={idx}>
                    <p className="text-[14px] font-semibold text-[#9333EA] mb-2">
                      {item.label}
                    </p>
                    <p className="text-[14px] text-[#666666] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Us Section - Design System */}
      <section className="py-32 px-8 bg-[#F8F9FA]">
        <div className="max-w-[1156px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p
              className="text-[14px] font-semibold mb-3"
              style={{ fontFamily: "'Clash Display', sans-serif", color: '#9333EA' }}
            >
              Why Us
            </p>
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#0E1116] mb-4">
              {language === "ko" ? "포텐랩 UX/UI의 차별점" : "What Sets Potenlab Apart"}
            </h2>
          </motion.div>

          {/* Feature 1: Design System */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center mb-24"
          >
            {/* Image */}
            <div className="rounded-2xl overflow-hidden shadow-xl bg-white p-4">
              <img
                src="/images/design-system.png"
                alt="Design System"
                className="w-full h-auto rounded-xl"
              />
            </div>

            {/* Content */}
            <div>
              <div className="inline-block px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#F3E8FF' }}>
                <span className="text-[14px] font-semibold" style={{ color: '#9333EA' }}>System</span>
              </div>
              <h3 className="text-[28px] md:text-[32px] font-bold text-[#0E1116] mb-6">
                {language === "ko" ? "자체 디자인 시스템" : "In-house Design System"}
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#F3E8FF' }}>
                    <Zap className="w-4 h-4" style={{ color: '#9333EA' }} />
                  </div>
                  <div>
                    <p className="text-[16px] font-semibold text-[#0E1116] mb-1">
                      {language === "ko" ? "효율 중심" : "Efficiency First"}
                    </p>
                    <p className="text-[14px] text-[#666666] leading-relaxed">
                      {language === "ko"
                        ? "반복되는 설계는 시스템에 맡기고, 우리는 고객의 '아이디어'에 더 집중합니다."
                        : "Let the system handle repetitive design, so we can focus on your 'ideas'."}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#F3E8FF' }}>
                    <Shield className="w-4 h-4" style={{ color: '#9333EA' }} />
                  </div>
                  <div>
                    <p className="text-[16px] font-semibold text-[#0E1116] mb-1">
                      {language === "ko" ? "완성도 중심" : "Quality First"}
                    </p>
                    <p className="text-[14px] text-[#666666] leading-relaxed">
                      {language === "ko"
                        ? "7년간 설계해본 경험 기반의 포텐랩만의 독자적인 디자인 시스템입니다."
                        : "Perfect order that never breaks on any device - Potenlab's unique guidelines."}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#F3E8FF' }}>
                    <TrendingUp className="w-4 h-4" style={{ color: '#9333EA' }} />
                  </div>
                  <div>
                    <p className="text-[16px] font-semibold text-[#0E1116] mb-1">
                      {language === "ko" ? "확장성 중심" : "Scalability First"}
                    </p>
                    <p className="text-[14px] text-[#666666] leading-relaxed">
                      {language === "ko"
                        ? "확장성을 고려하여 처음부터 확장 가능한 디자인을 설계합니다."
                        : "A structure that doesn't collapse as your service grows - sustainable design from the start."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature 2: Function Pages */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Content */}
            <div className="order-2 md:order-1">
              <div className="inline-block px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#F3E8FF' }}>
                <span className="text-[14px] font-semibold" style={{ color: '#9333EA' }}>Function</span>
              </div>
              <h3 className="text-[28px] md:text-[32px] font-bold text-[#0E1116] mb-6">
                {language === "ko" ? "기능별 기본 구성 페이지" : "Function-based Page Templates"}
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#F3E8FF' }}>
                    <Zap className="w-4 h-4" style={{ color: '#9333EA' }} />
                  </div>
                  <div>
                    <p className="text-[16px] font-semibold text-[#0E1116] mb-1">
                      {language === "ko" ? "속도 중심" : "Speed First"}
                    </p>
                    <p className="text-[14px] text-[#666666] leading-relaxed">
                      {language === "ko"
                        ? "공통된 화면은 이미 있습니다. 검증된 UI 패턴으로 제작 기간을 2배 더 앞당깁니다."
                        : "No need to build from scratch. Proven UI patterns cut production time in half."}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#F3E8FF' }}>
                    <MousePointer className="w-4 h-4" style={{ color: '#9333EA' }} />
                  </div>
                  <div>
                    <p className="text-[16px] font-semibold text-[#0E1116] mb-1">
                      {language === "ko" ? "사용성 중심" : "Usability First"}
                    </p>
                    <p className="text-[14px] text-[#666666] leading-relaxed">
                      {language === "ko"
                        ? "다양한 산업군의 플랫폼별 유형을 분석하고 구분하여 제작된 공통 핵심 기능화면들입니다."
                        : "Optimal user flow for maximum comfort - layouts calculated down to 0.1 seconds of hesitation."}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#F3E8FF' }}>
                    <Layout className="w-4 h-4" style={{ color: '#9333EA' }} />
                  </div>
                  <div>
                    <p className="text-[16px] font-semibold text-[#0E1116] mb-1">
                      {language === "ko" ? "유연함 중심" : "Flexibility First"}
                    </p>
                    <p className="text-[14px] text-[#666666] leading-relaxed">
                      {language === "ko"
                        ? "기능은 단단하게, 스타일은 유연하게. 비즈니스 성격에 맞춰 자유롭게 변형됩니다."
                        : "Solid functionality, flexible style. Freely adaptable to your business needs."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="order-1 md:order-2 rounded-2xl overflow-hidden shadow-xl bg-white p-4">
              <img
                src="/images/function-pages.png"
                alt="Function Pages"
                className="w-full h-auto rounded-xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="py-32 px-8 bg-white">
        <div className="max-w-[1156px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p
              className="text-[14px] font-semibold text-[#9333EA] mb-3"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              {t.deliverables.label}
            </p>
            <h2 className="text-[32px] md:text-[36px] font-bold text-[#0E1116] mb-4">
              {t.deliverables.title}
            </h2>
            <p className="text-[15px] text-[#666666] max-w-[600px] mx-auto">
              {t.deliverables.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.deliverables.items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.1,
                }}
                className="bg-[#F8F9FA] p-6 rounded-xl border border-[#E5E5E5] hover:border-[#9333EA]/30 transition-all"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: '#9333EA' }}
                >
                  <span className="text-[16px] font-bold" style={{ color: '#FFFFFF' }}>
                    {idx + 1}
                  </span>
                </div>
                <h3 className="text-[16px] font-bold mb-2 text-[#0E1116]">
                  {item.title}
                </h3>
                <p className="text-[14px] text-[#666666] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-[66px] px-8" style={{ backgroundColor: '#9333EA' }}>
        <div className="max-w-[800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-[32px] md:text-[40px] font-bold mb-10 leading-relaxed whitespace-pre-line" style={{ color: '#FFFFFF' }}>
              {t.cta.title}
            </h2>
            <button
              onClick={() => navigate("contact", null, null, { inquiryType: "design", subCategory: "uxui" })}
              className="px-8 h-12 rounded-xl hover:opacity-90 transition-all font-semibold text-[16px]"
              style={{ backgroundColor: '#FFFFFF', color: '#9333EA' }}
            >
              {t.cta.button}
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
