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
  Lightbulb,
  BarChart3,
  FileText,
  Users,
} from "lucide-react";

export function ITConsultingDetailPage() {
  const { language } = useLanguage();
  const { navigate } = useRouter();

  const content = {
    ko: {
      hero: {
        label: "IT/Biz 컨설팅",
        title: "IT 프로젝트, 어디서부터",
        titleHighlight: "시작해야 할지 막막하신가요?",
        description:
          "비용, 기간, 기술 스택까지\n전문가가 명확한 방향을 제시해드립니다.",
        cta: "무료 상담 신청하기",
      },
      problem: {
        title:
          "아이디어는 있는데, 어떻게 실현해야 할지\n막막한 상황이신가요?",
        checks: [
          "IT 프로젝트를 시작하고 싶은데 어디서부터 시작해야 할지 모르겠어요.",
          "기존 시스템을 개선하고 싶은데 비용과 기간이 얼마나 들지 궁금해요.",
          "디지털 전환 전략을 세우고 싶은데 전문가의 조언이 필요해요.",
        ],
      },
      solution: {
        label: "Process",
        title: "체계적인 4단계 컨설팅",
        description:
          "현황 분석부터 실행 계획까지, 검증된 프로세스로 최적의 IT 전략을 수립합니다.",
        steps: [
          {
            icon: "Target",
            title: "현황 분석",
            description:
              "비즈니스 목표 파악, 기존 시스템 분석, 시장 벤치마킹",
          },
          {
            icon: "Lightbulb",
            title: "전략 수립",
            description:
              "IT 전략 및 로드맵 설계, 기술 스택 제안, 비용/일정 추정",
          },
          {
            icon: "FileText",
            title: "실행 계획",
            description:
              "단계별 실행 방안, 리스크 관리 전략, 팀 구성 및 역할 정의",
          },
          {
            icon: "BarChart3",
            title: "지속 지원",
            description:
              "프로젝트 모니터링, 정기 피드백, 추가 컨설팅 및 자문",
          },
        ],
      },
      beforeAfter: {
        label: "Impact",
        title: "컨설팅 전후 차이",
        description:
          "명확한 방향성과 실행 가능한 로드맵으로 프로젝트 성공률을 높입니다.",
        before: {
          title: "Before",
          subtitle: "막연한 계획과 불확실한 방향",
          items: [
            {
              label: "비용 불확실성",
              description:
                "개발 비용이 얼마나 들지 감이 안 잡혀 예산 수립이 어렵습니다.",
            },
            {
              label: "기술 선택 어려움",
              description:
                "어떤 기술 스택이 적합한지, 외주를 맡겨야 할지 판단이 어렵습니다.",
            },
            {
              label: "일정 예측 불가",
              description:
                "프로젝트가 얼마나 걸릴지 몰라 사업 계획 수립이 힘듭니다.",
            },
          ],
        },
        after: {
          title: "After",
          subtitle: "명확한 로드맵과 실행 가능한 계획",
          items: [
            {
              label: "정확한 예산 수립",
              description:
                "상세한 견적과 단계별 비용 분석으로 예산을 명확히 계획합니다.",
            },
            {
              label: "최적의 기술 제안",
              description:
                "비즈니스 목표에 맞는 기술 스택과 아키텍처를 제안받습니다.",
            },
            {
              label: "현실적인 일정표",
              description:
                "마일스톤 기반의 상세 일정으로 프로젝트를 예측 가능하게 관리합니다.",
            },
          ],
        },
      },
      whyUs: {
        label: "Why Us",
        title: "포텐랩 컨설팅의 차별점",
        description:
          "다년간의 IT 프로젝트 경험을 바탕으로 실질적인 조언을 제공합니다.",
        points: [
          {
            icon: "Shield",
            title: "실전 경험 기반",
            description:
              "이론이 아닌 실제 프로젝트 경험\n\n다양한 산업군의 IT 프로젝트를 직접 수행한 경험을 바탕으로 현실적이고 실행 가능한 조언을 제공합니다.",
          },
          {
            icon: "Target",
            title: "비용 효율 극대화",
            description:
              "불필요한 비용 최소화\n\n과도한 기능이나 불필요한 기술 도입을 막고, 비즈니스 목표 달성에 필요한 핵심 요소에 집중합니다.",
          },
          {
            icon: "Award",
            title: "원스톱 서비스",
            description:
              "컨설팅부터 개발까지\n\n컨설팅에서 끝나지 않고, 필요시 개발과 운영까지 일관된 품질로 지원하여 프로젝트의 연속성을 보장합니다.",
          },
        ],
      },
      deliverables: {
        label: "Deliverables",
        title: "컨설팅 결과물",
        description: "명확하고 실행 가능한 산출물을 제공합니다.",
        items: [
          {
            title: "IT 전략 보고서",
            description: "현황 분석, 전략 방향, 실행 로드맵을 담은 종합 보고서",
          },
          {
            title: "기술 스택 제안서",
            description: "비즈니스에 최적화된 기술 스택 및 아키텍처 설계안",
          },
          {
            title: "비용/일정 견적서",
            description: "단계별 상세 비용 분석과 마일스톤 기반 일정표",
          },
          {
            title: "리스크 관리 계획",
            description: "예상 리스크 및 대응 방안, 의사결정 기준 가이드",
          },
        ],
      },
      cta: {
        title: "IT 프로젝트의 방향이\n명확해지는 순간을 경험하세요.",
        button: "무료 상담 신청하기",
      },
    },
    en: {
      hero: {
        label: "IT/Biz Consulting",
        title: "Starting an IT Project,",
        titleHighlight: "But Not Sure Where to Begin?",
        description:
          "From costs and timelines to tech stacks,\nexperts will provide clear direction.",
        cta: "Request Free Consultation",
      },
      problem: {
        title:
          "You have ideas, but not sure\nhow to make them reality?",
        checks: [
          "I want to start an IT project but don't know where to begin.",
          "I want to improve our existing system but need cost and timeline estimates.",
          "I need expert advice to develop a digital transformation strategy.",
        ],
      },
      solution: {
        label: "Process",
        title: "Systematic 4-Step Consulting",
        description:
          "From current state analysis to execution planning, we establish optimal IT strategies through proven processes.",
        steps: [
          {
            icon: "Target",
            title: "Current Analysis",
            description:
              "Business goal identification, system analysis, market benchmarking",
          },
          {
            icon: "Lightbulb",
            title: "Strategy Development",
            description:
              "IT strategy & roadmap design, tech stack proposal, cost/timeline estimation",
          },
          {
            icon: "FileText",
            title: "Execution Planning",
            description:
              "Phased execution plan, risk management strategy, team composition",
          },
          {
            icon: "BarChart3",
            title: "Ongoing Support",
            description:
              "Project monitoring, regular feedback, additional consulting",
          },
        ],
      },
      beforeAfter: {
        label: "Impact",
        title: "Before & After Consulting",
        description:
          "Clear direction and actionable roadmaps increase project success rates.",
        before: {
          title: "Before",
          subtitle: "Vague Plans and Uncertain Direction",
          items: [
            {
              label: "Cost Uncertainty",
              description:
                "Difficult to establish a budget without knowing development costs.",
            },
            {
              label: "Tech Choice Difficulty",
              description:
                "Hard to judge which tech stack is suitable or whether to outsource.",
            },
            {
              label: "Unpredictable Timeline",
              description:
                "Business planning is difficult without knowing project duration.",
            },
          ],
        },
        after: {
          title: "After",
          subtitle: "Clear Roadmap and Actionable Plan",
          items: [
            {
              label: "Accurate Budgeting",
              description:
                "Plan budgets clearly with detailed estimates and phased cost analysis.",
            },
            {
              label: "Optimal Tech Proposal",
              description:
                "Receive tech stack and architecture proposals aligned with business goals.",
            },
            {
              label: "Realistic Timeline",
              description:
                "Manage projects predictably with milestone-based detailed schedules.",
            },
          ],
        },
      },
      whyUs: {
        label: "Why Us",
        title: "What Sets Potenlab Apart",
        description:
          "We provide practical advice based on years of IT project experience.",
        points: [
          {
            icon: "Shield",
            title: "Experience-Based",
            description:
              "Not Theory, Real Project Experience\n\nWe provide realistic, actionable advice based on hands-on experience in IT projects across various industries.",
          },
          {
            icon: "Target",
            title: "Cost Efficiency",
            description:
              "Minimize Unnecessary Costs\n\nWe prevent excessive features and unnecessary technology adoption, focusing on core elements needed to achieve business goals.",
          },
          {
            icon: "Award",
            title: "One-Stop Service",
            description:
              "From Consulting to Development\n\nWe don't stop at consulting. When needed, we support development and operations with consistent quality, ensuring project continuity.",
          },
        ],
      },
      deliverables: {
        label: "Deliverables",
        title: "Consulting Deliverables",
        description: "We provide clear and actionable outputs.",
        items: [
          {
            title: "IT Strategy Report",
            description: "Comprehensive report with current analysis, strategic direction, and execution roadmap",
          },
          {
            title: "Tech Stack Proposal",
            description: "Optimized tech stack and architecture design for your business",
          },
          {
            title: "Cost/Timeline Estimate",
            description: "Detailed phased cost analysis and milestone-based schedule",
          },
          {
            title: "Risk Management Plan",
            description: "Expected risks, response strategies, and decision-making guidelines",
          },
        ],
      },
      cta: {
        title: "Experience the moment when\nyour IT project direction becomes clear.",
        button: "Request Free Consultation",
      },
    },
  };

  const t = content[language as keyof typeof content];

  const iconMap = {
    Shield: Shield,
    Target: Target,
    Award: Award,
    Lightbulb: Lightbulb,
    BarChart3: BarChart3,
    FileText: FileText,
    Users: Users,
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
                💼 {t.hero.label}
              </span>
            </div>
            <h1 className="md:text-[48px] font-bold mb-2 text-[#0E1116] text-[40px] m-[0px]">
              {t.hero.title}
            </h1>
            <h2 className="text-[32px] md:text-[40px] font-bold mb-6 text-[#0079FF]">
              {t.hero.titleHighlight}
            </h2>
            <p className="text-[16px] md:text-[18px] leading-relaxed mb-10 text-[#666666] max-w-[700px] mx-auto whitespace-pre-line">
              {t.hero.description}
            </p>
            <button
              onClick={() => navigate("contact", null, null, { inquiryType: "design", subCategory: "consulting" })}
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

          {/* Process Cards */}
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
                  className="bg-white p-6 rounded-xl border border-[#E5E5E5] hover:border-[#0079FF]/30 transition-all"
                >
                  <div className="w-12 h-12 bg-[#E6F3FF] rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#0079FF]" />
                  </div>
                  <div className="text-[13px] font-semibold text-[#0079FF] mb-2">
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
              const Icon = iconMap[point.icon as keyof typeof iconMap];

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
              className="text-[14px] font-semibold text-[#0079FF] mb-3"
              style={{
                fontFamily: "'Clash Display', sans-serif",
              }}
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
                className="bg-[#F8F9FA] p-6 rounded-xl border border-[#E5E5E5] hover:border-[#0079FF]/30 transition-all"
              >
                <div className="w-10 h-10 bg-[#0079FF] rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-[16px] font-bold">
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
              onClick={() => navigate("contact", null, null, { inquiryType: "design", subCategory: "consulting" })}
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
