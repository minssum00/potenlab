import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { useRouter } from "../contexts/RouterContext";
import {
  Rocket,
  CheckCircle,
  Clock,
  TrendingUp,
  Zap,
  Target,
  AlertCircle,
  Shield,
  Users,
  Award,
  ArrowDown,
  XCircle,
} from "lucide-react";

export function PotenBoosterPage() {
  const { language } = useLanguage();
  const { navigate } = useRouter();

  const content = {
    ko: {
      hero: {
        label: "Poten Booster",
        title: "2026 지원사업",
        titleHighlight: "혹시 아직 시장검증이 안되셨나요?",
        description:
          "요즘 지원사업은 거창한 계획보다\n확실한 시장의 데이터를 더 좋아합니다.",
        cta: "무료 진단 및 상담 신청하기",
      },
      problem: {
        title:
          "스토리텔링이 완벽해도 시장 검증 데이터가 없다면\n선정은 불가능에 가깝습니다.",
        checks: [
          "아이디어만 있고 실체가 없어 설명하기 막막하신 분",
          "지원사업 마감 직전, 시장 검증 데이터를 급히 확보해야 하는 분",
          '"내 서비스가 진짜 팔릴까?" 고민하다 시간을 놓치신 분',
        ],
      },
      solution: {
        label: "Process",
        title: "3일은 만들고, 3일은 검증합니다.",
        description:
          "체계적인 6일 프로세스로 아이디어를 시장 검증된 실물로 전환합니다.",
        steps: [
          {
            day: "Day 0",
            title: "아이디어 핏 검증",
            description:
              "3일 내 제작 및 광고 효율 추출 가능성 진단",
          },
          {
            day: "Day 1",
            title: "기획 및 설계",
            description:
              "핵심 기능 정의 및 5페이지 이내 메뉴 구조 설계",
          },
          {
            day: "Day 2-3",
            title: "MVP 개발",
            description:
              "실제 동작하는 프로토타입 빌드 및 배포",
          },
          {
            day: "Day 4-5",
            title: "광고 집행",
            description:
              "메타 광고 세팅 및 타겟 오디언스 테스트",
          },
          {
            day: "Day 6",
            title: "데이터 분석",
            description:
              "CTR, 가입률 등 시장 지표 분석 및 리포트 제공",
          },
        ],
      },
      pricing: {
        label: "Price Guide",
        title: "단계별 선택 가이드",
        description:
          "프로젝트의 목표와 상황에 따라 적합한 단계를 선택하세요.",
        packages: [
          {
            name: "Basic",
            subtitle: "아이디어 구체화 패키지",
            value:
              "추상적인 아이디어를 실제 동작 가능한\nMVP서비스로 구현합니다.",
            price: "179만원",
            features: [
              "핵심 가설 1개 기반 검증용 MVP 구현",
              "실제 서비스 화면(Web/App)",
              "기능 목록 + 메뉴 구조도",
              "다음 단계(검증/개발) 판단 가이드",
            ],
          },
          {
            name: "Standard",
            subtitle: "시장검증 패키지",
            value:
              "MVP 서비스로 실물을 실제 시장에 내놓고\n유저들의 진짜 목소리를 듣습니다.",
            price: "490만원",
            features: [
              "Basic 전 구성 포함",
              "메타 광고 집행 (소액 테스트)",
              "실제 유저 유입 & 행동 데이터",
              "핵심 지표 정리 (CTR, 전환 등)",
            ],
            recommended: true,
          },
          {
            name: "Premium",
            subtitle: "통합 비즈니스 패키지",
            value:
              "검증된 데이터를 바탕으로 투자 유치와\n본격적인 사업화를 준비합니다.",
            price: "690만원",
            features: [
              "Standard 전 구성 포함",
              "기술 구현 가능성 정리",
              "1대1 컨설팅",
              "사업계획서 코칭/피드백",
            ],
          },
        ],
      },
      beforeAfter: {
        label: "Impact",
        title: "단, 6일이 만드는 차이",
        description:
          "단 6일만에 막연한 기획이 증명 가능한 비즈니스로 변화합니다.",
        before: {
          title: "Before",
          subtitle: "말로만 설명하는 막막한 기획",
          items: [
            {
              label: "신뢰도 부족",
              description:
                "기술적 실체(MVP)가 없어 심사위원이 구현 가능성을 의심합니다.",
            },
            {
              label: "말뿐인 실행력",
              description:
                "'AI 기술을 활용할 예정입니다'라는 선언만으로는 실행력을 보여줄 수 없습니다.",
            },
            {
              label: "추측성 근거",
              description:
                "'고객이 좋아할 것 같습니다'라는 대표님의 주관적인 추측만 가득합니다.",
            },
          ],
        },
        after: {
          title: "After",
          subtitle: "데이터로 증명하는 확실한 비즈니스",
          items: [
            {
              label: "동작하는 실체",
              description:
                "이미 존재하는 서비스가 곧 신뢰의 기반입니다.",
            },
            {
              label: "검증된 실행력",
              description:
                "단 3일 만에 빌드된 MVP로 기술적 실행 능력을 즉시 증명합니다.",
            },
            {
              label: "객관적 지표",
              description:
                "'3일간의 메타 광고를 통해 CTR 3.5%, 잠재 고객 100명을 확보했습니다.'",
            },
          ],
        },
      },
      whyUs: {
        label: "Why Us",
        title: "포텐랩만의 업무 철학",
        description:
          "10팀 한정 집중 케어로 본질에 집중하는 투명한 파트너십을 제공합니다.",
        points: [
          {
            icon: "Shield",
            title: "운영 효율",
            description:
              "딱 10팀 한정 집중 케어\n\n공장식 외주가 아닙니다. 퀄리티 유지를 위해 월간 프로젝트 수를 엄격히 제한하여, 각 파트너사의 비즈니스 본질에 깊게 몰입합니다.",
          },
          {
            icon: "Target",
            title: "본질 추구",
            description:
              "개발은 수단일 뿐\n\n개발 그 자체를 하는게 아니라 사업이라는 목적을 보고 개발을 수단으로 쓰기에 사업성을 제일 우선순위로 고려합니다.",
          },
          {
            icon: "Award",
            title: "안전 장치",
            description:
              "투명한 프로세스와 환불 정책\n\n계약 시 개발 범위와 마일스톤을 명확히 명시합니다. 당사의 과실로 진행 불가 시 100% 환불 등 투명한 운영 시스템으로 고객의 리스크를 방어합니다.",
          },
        ],
      },
      cta: {
        title:
          "막연한 계획을 6일만에\n눈에 보이는 실물로 증명하세요.",
        button: "무료 진단 및 상담 신청하기",
      },
    },
    en: {
      hero: {
        label: "Poten Booster",
        title: "For 2026 Grant Applications,",
        titleHighlight:
          "Still Just Preparing to Say 'We Will Do It'?",
        description:
          "Today's grant programs prefer solid market data over grand plans.",
        cta: "Get Free Consultation",
      },
      problem: {
        title:
          "Even with perfect storytelling,\nselection is nearly impossible\nwithout market validation data.",
        checks: [
          "You have an idea but no tangible product to demonstrate",
          "Grant deadline is approaching and you urgently need market validation data",
          "You've been wondering 'Will my service really sell?' and running out of time",
        ],
      },
      solution: {
        label: "Process",
        title: "3 Days to Build, 3 Days to Validate.",
        description:
          "Transform your idea into a market-validated product through our systematic 6-day process.",
        steps: [
          {
            day: "Day 0",
            title: "Idea Fit Validation",
            description:
              "Diagnose production feasibility and ad efficiency potential",
          },
          {
            day: "Day 1",
            title: "Planning & Design",
            description:
              "Define core features and design menu structure within 5 pages",
          },
          {
            day: "Day 2-3",
            title: "MVP Development",
            description: "Build and deploy a working prototype",
          },
          {
            day: "Day 4-5",
            title: "Ad Campaign",
            description:
              "Setup and run Meta ads with target audience testing",
          },
          {
            day: "Day 6",
            title: "Data Analysis",
            description:
              "Analyze market metrics like CTR and conversion rates with report",
          },
        ],
      },
      pricing: {
        label: "Price Guide",
        title: "Step-by-Step Selection Guide",
        description:
          "Choose the right package based on your project goals and situation.",
        packages: [
          {
            name: "Basic",
            subtitle: "Idea Realization Package",
            value:
              "Transform abstract ideas into\nactual working MVP services.",
            price: "$1,790",
            features: [
              "MVP implementation based on 1 core hypothesis",
              "Actual service screens (Web/App)",
              "Feature list + Menu structure diagram",
              "Next steps (validation/development) guide",
            ],
          },
          {
            name: "Standard",
            subtitle: "Market Validation Package",
            value:
              "Launch MVP to real market and\nlisten to actual user feedback.",
            price: "$4,900",
            features: [
              "Basic package included",
              "Meta ad campaign (small-scale test)",
              "Real user traffic & behavior data",
              "Key metrics summary (CTR, conversion, etc.)",
            ],
            recommended: true,
          },
          {
            name: "Premium",
            subtitle: "Integrated Business Package",
            value:
              "Prepare for investment and\nfull-scale business launch with validated data.",
            price: "$6,900",
            features: [
              "Standard package included",
              "Technical feasibility analysis",
              "1-on-1 consulting",
              "Business plan coaching/feedback",
            ],
          },
        ],
      },
      beforeAfter: {
        label: "Impact",
        title: "The Difference 6 Days Make",
        description:
          "Transform vague planning into a proven business in just 6 days.",
        before: {
          title: "Before",
          subtitle: "Vague Planning with Just Words",
          items: [
            {
              label: "Idea Limitation",
              description:
                "It stops at future-tense sentences like 'We plan to build this AI service.'",
            },
            {
              label: "Lack of Credibility",
              description:
                "Without a technical MVP, evaluators doubt the feasibility of implementation.",
            },
            {
              label: "Speculative Reasoning",
              description:
                "Full of subjective assumptions like 'Customers will probably like it.'",
            },
          ],
        },
        after: {
          title: "After",
          subtitle: "Proven Business with Data",
          items: [
            {
              label: "Working Product",
              description:
                "'Check out the actual features through this prototype URL,' you can say.",
            },
            {
              label: "Verified Execution",
              description:
                "An MVP built in just 3 days instantly proves technical execution capability.",
            },
            {
              label: "Objective Metrics",
              description:
                "'Through 3 days of Meta ads, we achieved 3.5% CTR and acquired 100 potential customers.'",
            },
          ],
        },
      },
      whyUs: {
        label: "Why Us",
        title: "Potenlab's Work Philosophy",
        description:
          "Transparent partnership focused on business essence with dedicated care for only 10 teams.",
        points: [
          {
            icon: "Shield",
            title: "Operational Efficiency",
            description:
              "Focused Care for Only 10 Teams\n\nNo factory-style outsourcing. We strictly limit monthly projects to maintain quality and deeply immerse in each partner's business essence.",
          },
          {
            icon: "Target",
            title: "Essence Pursuit",
            description:
              "Development is Just a Means\n\nWe don't develop for development's sake. We view business as the goal and development as the tool, prioritizing business viability above all.",
          },
          {
            icon: "Award",
            title: "Safety Net",
            description:
              "Transparent Process and Refund Policy\n\nWe clearly specify development scope and milestones in contracts. We defend customer risks with a transparent operating system including 100% refunds if we cannot proceed due to our fault.",
          },
        ],
      },
      cta: {
        title:
          "Turn your vague imagination into\na tangible product in just 6 days.",
        button: "Get Free Consultation",
      },
    },
  };

  const t = content[language as keyof typeof content];

  const iconMap = {
    Shield: Shield,
    Users: Users,
    Award: Award,
    Rocket: Rocket,
    Target: Target,
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="pt-[120px] pb-32 px-8 bg-gradient-to-b from-[#E6F3FF] via-[#F5F9FF] to-white">
        <div className="max-w-[1156px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="mb-4">
              <span className="inline-block text-[#0079FF] px-4 py-1.5 rounded-full text-[14px] font-semibold border border-[#0079FF]/20 bg-white/50">
                🚀 {t.hero.label}
              </span>
            </div>
            <h1 className="md:text-[48px] font-bold mb-2 text-[#0E1116] text-[40px] m-[0px]">
              {t.hero.title}
            </h1>
            <h2 className="text-[32px] md:text-[40px] font-bold mb-6 text-[#0079FF]">
              {t.hero.titleHighlight}
            </h2>
            <p className="text-[16px] md:text-[18px] leading-relaxed mb-10 text-[#666666] max-w-[700px] mx-auto">
              {t.hero.description}
            </p>
            <button
              onClick={() => navigate("contact")}
              className="bg-[#0079FF] text-white px-8 h-12 rounded-xl hover:bg-[#0066DD] transition-colors font-semibold text-[16px] inline-flex items-center gap-2 shadow-lg hover:shadow-xl"
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
                  className="bg-[#E6F3FF] p-6 rounded-xl border border-[#B3D9FF]"
                >
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-5 h-5 text-[#0079FF] flex-shrink-0 mt-0.5" />
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

      {/* Solution Timeline */}
      <section id="process-section" className="py-32 px-8 bg-[#F8F9FA]">
        <div className="max-w-[1156px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p
              className="text-[14px] font-semibold text-[#0079FF] mb-3"
              style={{
                fontFamily: "'Clash Display', sans-serif",
              }}
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

          {/* Timeline */}
          <div className="relative">
            {/* Horizontal Line */}
            <div
              className="absolute top-8 left-0 right-0 h-[2px] bg-[#0079FF]"
              style={{ left: "10%", right: "10%" }}
            />

            {/* Steps Grid */}
            <div className="grid grid-cols-5 gap-4">
              {t.solution.steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.1,
                  }}
                  className="flex flex-col items-center"
                >
                  {/* Circle Number */}
                  <div className="relative z-10 w-16 h-16 bg-[#0079FF] rounded-full flex items-center justify-center mb-3 border-4 border-white">
                    <span className="text-[20px] font-bold text-white">
                      {idx + 1}
                    </span>
                  </div>

                  {/* Day Label */}
                  <p className="text-[13px] font-semibold text-[#0079FF] mb-4">
                    {step.day}
                  </p>

                  {/* Card */}
                  <div className="bg-white p-4 rounded-xl w-full min-h-[70px] flex flex-col justify-center text-center">
                    <h3 className="text-[14px] font-bold mb-1 text-[#0E1116]">
                      {step.title}
                    </h3>
                    <p className="text-[12px] text-[#666666] leading-snug">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
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
              className="text-[14px] font-semibold text-[#0079FF] mb-3"
              style={{
                fontFamily: "'Clash Display', sans-serif",
              }}
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
            {/* Before */}
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

            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#F8F9FA] p-8 rounded-xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-[#E6F3FF] rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-[#0079FF]" />
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
                    <p className="text-[14px] font-semibold text-[#0079FF] mb-2">
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

      {/* Why Us Section */}
      <section className="py-32 px-8 bg-[#F8F9FA]">
        <div className="max-w-[1156px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <p
              className="text-[14px] font-semibold text-[#0079FF] mb-3"
              style={{
                fontFamily: "'Clash Display', sans-serif",
              }}
            >
              {t.whyUs.label}
            </p>
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#0E1116] mb-4">
              {t.whyUs.title}
            </h2>
            <p className="text-[15px] text-[#666666] max-w-[600px] mx-auto">
              {t.whyUs.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.whyUs.points.map((point, idx) => {
              const Icon =
                iconMap[point.icon as keyof typeof iconMap];

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
                  className="bg-white p-8 rounded-xl border border-[#E5E5E5]"
                >
                  <div className="w-12 h-12 bg-[#E6F3FF] rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-[#0079FF]" />
                  </div>
                  <h3 className="text-[18px] font-bold mb-3 text-[#0E1116]">
                    {point.title}
                  </h3>
                  <p className="text-[14px] text-[#666666] leading-relaxed whitespace-pre-line">
                    {point.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
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
              className="text-[14px] font-semibold text-[#0079FF] mb-3"
              style={{
                fontFamily: "'Clash Display', sans-serif",
              }}
            >
              {t.pricing.label}
            </p>
            <h2 className="text-[32px] md:text-[36px] font-bold text-[#0E1116] mb-4">
              {t.pricing.title}
            </h2>
            <p className="text-[15px] text-[#666666] max-w-[600px] mx-auto">
              {t.pricing.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {t.pricing.packages.map((pkg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-8 rounded-2xl relative bg-white border-2 border-[#E0E0E0] transition-all hover:border-[#0079FF]/30"
              >
                {pkg.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0079FF] text-white px-5 py-1.5 rounded-full text-[13px] font-semibold shadow-sm">
                    추천
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-[28px] font-bold mb-3 text-[#0E1116]">
                    {pkg.name}
                  </h3>
                  <p className="text-[14px] font-semibold text-[#0079FF] mb-4">
                    {pkg.subtitle}
                  </p>
                  <p className="text-[15px] text-[#666666] leading-relaxed mb-6 min-h-[48px]">
                    {pkg.value}
                  </p>
                  <p className="text-[40px] font-bold text-[#0079FF] mb-6">
                    {pkg.price}
                  </p>
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-start gap-2"
                    >
                      <CheckCircle className="w-5 h-5 text-[#0079FF] flex-shrink-0 mt-0.5" />
                      <span className="text-[14px] text-[#333333] leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate("contact")}
                  className="w-full h-12 rounded-xl font-semibold text-[15px] transition-all bg-white text-[#0079FF] border-2 border-[#0079FF] hover:bg-[#F0F8FF]"
                >
                  신청하기
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-[66px] px-8 bg-[#0079FF]">
        <div className="max-w-[800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-[32px] md:text-[40px] font-bold mb-10 leading-relaxed text-white whitespace-pre-line">
              {t.cta.title}
            </h2>
            <button
              onClick={() => navigate("contact")}
              className="bg-white text-[#0079FF] px-8 h-12 rounded-xl hover:bg-[#F5F5F5] transition-colors font-semibold text-[16px]"
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