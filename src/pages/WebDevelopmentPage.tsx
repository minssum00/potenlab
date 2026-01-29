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
  Globe,
  Code,
  Zap,
  Server,
} from "lucide-react";

export function WebDevelopmentPage() {
  const { language } = useLanguage();
  const { navigate } = useRouter();

  const content = {
    ko: {
      hero: {
        label: "홈페이지 개발",
        title: "비즈니스를 성장시키는",
        titleHighlight: "웹사이트를 만들어드립니다",
        description:
          "단순한 홈페이지가 아닌, 비즈니스 목표를 달성하는\n전략적인 웹사이트를 개발합니다.",
        cta: "무료 상담 신청하기",
      },
      problem: {
        title:
          "홈페이지, 만들기만 하면 끝일까요?",
        checks: [
          "홈페이지는 있는데 방문자가 없어서 효과를 못 보고 있어요.",
          "모바일에서 보면 깨지거나 느려서 사용자들이 이탈해요.",
          "직접 수정하고 싶은데 개발자 없이는 아무것도 못해요.",
        ],
      },
      solution: {
        label: "Process",
        title: "성과를 만드는 웹 개발",
        description:
          "기획부터 개발, 운영까지 비즈니스 성장을 위한 웹사이트를 만듭니다.",
        steps: [
          {
            icon: "Target",
            title: "기획 & 전략",
            description:
              "비즈니스 목표 분석, 사이트 구조 설계, 콘텐츠 전략",
          },
          {
            icon: "Code",
            title: "디자인 & 개발",
            description:
              "반응형 디자인, 최신 기술 스택, SEO 최적화",
          },
          {
            icon: "Zap",
            title: "최적화 & 테스트",
            description:
              "성능 최적화, 크로스 브라우저 테스트, 보안 점검",
          },
          {
            icon: "Server",
            title: "배포 & 운영",
            description:
              "안정적인 배포, 유지보수, 성과 분석 리포트",
          },
        ],
      },
      beforeAfter: {
        label: "Impact",
        title: "웹사이트 개발 전후 차이",
        description:
          "전략적인 웹사이트로 비즈니스 성과를 극대화합니다.",
        before: {
          title: "Before",
          subtitle: "방치되는 홈페이지",
          items: [
            {
              label: "낮은 검색 노출",
              description:
                "SEO가 안 되어 있어 검색해도 나오지 않습니다.",
            },
            {
              label: "느린 로딩 속도",
              description:
                "페이지 로딩이 느려 방문자가 기다리지 않고 이탈합니다.",
            },
            {
              label: "관리 불가",
              description:
                "개발자 없이는 간단한 텍스트 수정도 불가능합니다.",
            },
          ],
        },
        after: {
          title: "After",
          subtitle: "성장하는 비즈니스 자산",
          items: [
            {
              label: "검색 상위 노출",
              description:
                "SEO 최적화로 잠재 고객이 검색으로 찾아옵니다.",
            },
            {
              label: "빠른 성능",
              description:
                "최적화된 성능으로 사용자 경험을 극대화합니다.",
            },
            {
              label: "쉬운 관리",
              description:
                "CMS 연동으로 비개발자도 쉽게 콘텐츠를 관리합니다.",
            },
          ],
        },
      },
      whyUs: {
        label: "Why Us",
        title: "포텐랩 웹개발의 차별점",
        description:
          "단순 제작이 아닌, 비즈니스 성장을 위한 웹사이트를 만듭니다.",
        points: [
          {
            icon: "Shield",
            title: "비즈니스 중심 개발",
            description:
              "기술보다 비즈니스 목표 우선\n\n최신 기술을 쓰는 것이 아니라, 비즈니스 목표 달성에 가장 적합한 기술을 선택합니다.",
          },
          {
            icon: "Target",
            title: "성과 측정 가능",
            description:
              "데이터로 확인하는 성과\n\nGoogle Analytics, Search Console 연동으로 방문자 행동과 성과를 추적합니다.",
          },
          {
            icon: "Award",
            title: "지속적인 지원",
            description:
              "만들고 끝이 아닌 파트너십\n\n런칭 후에도 지속적인 유지보수와 개선 제안으로 함께 성장합니다.",
          },
        ],
      },
      deliverables: {
        label: "Deliverables",
        title: "개발 산출물",
        description: "비즈니스에 바로 활용 가능한 결과물을 제공합니다.",
        items: [
          {
            title: "반응형 웹사이트",
            description: "모든 디바이스에서 완벽하게 동작하는 웹사이트",
          },
          {
            title: "관리자 페이지",
            description: "비개발자도 쉽게 콘텐츠를 관리할 수 있는 CMS",
          },
          {
            title: "SEO 최적화",
            description: "검색엔진 최적화 및 메타태그 설정 완료",
          },
          {
            title: "분석 도구 연동",
            description: "GA, Search Console 등 분석 도구 셋업",
          },
        ],
      },
      cta: {
        title: "비즈니스를 성장시키는\n웹사이트, 함께 만들어요.",
        button: "무료 상담 신청하기",
      },
    },
    en: {
      hero: {
        label: "Web Development",
        title: "Build Websites That",
        titleHighlight: "Grow Your Business",
        description:
          "Not just a website, but a strategic web presence\nthat achieves your business goals.",
        cta: "Request Free Consultation",
      },
      problem: {
        title:
          "Is building a website enough?",
        checks: [
          "Have a website but no visitors, so it's not effective.",
          "Breaks or loads slowly on mobile, causing users to leave.",
          "Want to make changes but can't do anything without a developer.",
        ],
      },
      solution: {
        label: "Process",
        title: "Web Development That Delivers Results",
        description:
          "From planning to development and operations, we build websites for business growth.",
        steps: [
          {
            icon: "Target",
            title: "Planning & Strategy",
            description:
              "Business goal analysis, site structure design, content strategy",
          },
          {
            icon: "Code",
            title: "Design & Development",
            description:
              "Responsive design, modern tech stack, SEO optimization",
          },
          {
            icon: "Zap",
            title: "Optimization & Testing",
            description:
              "Performance optimization, cross-browser testing, security check",
          },
          {
            icon: "Server",
            title: "Deployment & Operations",
            description:
              "Stable deployment, maintenance, performance analytics report",
          },
        ],
      },
      beforeAfter: {
        label: "Impact",
        title: "Before & After Web Development",
        description:
          "Maximize business results with a strategic website.",
        before: {
          title: "Before",
          subtitle: "Neglected Website",
          items: [
            {
              label: "Low Search Visibility",
              description:
                "No SEO means the site doesn't appear in search results.",
            },
            {
              label: "Slow Loading",
              description:
                "Slow page loads cause visitors to leave without waiting.",
            },
            {
              label: "Unmanageable",
              description:
                "Even simple text changes are impossible without a developer.",
            },
          ],
        },
        after: {
          title: "After",
          subtitle: "Growing Business Asset",
          items: [
            {
              label: "Top Search Ranking",
              description:
                "SEO optimization brings potential customers through search.",
            },
            {
              label: "Fast Performance",
              description:
                "Optimized performance maximizes user experience.",
            },
            {
              label: "Easy Management",
              description:
                "CMS integration allows non-developers to easily manage content.",
            },
          ],
        },
      },
      whyUs: {
        label: "Why Us",
        title: "What Sets Potenlab Web Dev Apart",
        description:
          "Not just building, but creating websites for business growth.",
        points: [
          {
            icon: "Shield",
            title: "Business-Centric Development",
            description:
              "Business Goals Over Technology\n\nWe don't just use the latest tech - we choose technology that best achieves business goals.",
          },
          {
            icon: "Target",
            title: "Measurable Results",
            description:
              "Data-Verified Performance\n\nGoogle Analytics and Search Console integration to track visitor behavior and results.",
          },
          {
            icon: "Award",
            title: "Ongoing Support",
            description:
              "Partnership, Not Just a Project\n\nContinuous maintenance and improvement suggestions after launch to grow together.",
          },
        ],
      },
      deliverables: {
        label: "Deliverables",
        title: "Development Deliverables",
        description: "We provide results ready for immediate business use.",
        items: [
          {
            title: "Responsive Website",
            description: "Website that works perfectly on all devices",
          },
          {
            title: "Admin Dashboard",
            description: "CMS for non-developers to easily manage content",
          },
          {
            title: "SEO Optimization",
            description: "Search engine optimization and meta tags configured",
          },
          {
            title: "Analytics Integration",
            description: "GA, Search Console and other analytics tools setup",
          },
        ],
      },
      cta: {
        title: "Build a website that\ngrows your business, together.",
        button: "Request Free Consultation",
      },
    },
  };

  const t = content[language as keyof typeof content];

  const iconMap = {
    Shield: Shield,
    Target: Target,
    Award: Award,
    Globe: Globe,
    Code: Code,
    Zap: Zap,
    Server: Server,
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="pt-[120px] pb-32 px-8 bg-gradient-to-b from-[#ECFDF5] via-[#F0FDF4] to-white">
        <div className="max-w-[1156px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="mb-4">
              <span className="inline-block text-[#059669] px-4 py-1.5 rounded-full text-[14px] font-semibold border border-[#059669]/20 bg-white/50">
                🌐 {t.hero.label}
              </span>
            </div>
            <h1 className="md:text-[48px] font-bold mb-2 text-[#0E1116] text-[40px] m-[0px]">
              {t.hero.title}
            </h1>
            <h2 className="text-[32px] md:text-[40px] font-bold mb-6 text-[#059669]">
              {t.hero.titleHighlight}
            </h2>
            <p className="text-[16px] md:text-[18px] leading-relaxed mb-10 text-[#666666] max-w-[700px] mx-auto whitespace-pre-line">
              {t.hero.description}
            </p>
            <button
              onClick={() => navigate("contact")}
              className="bg-[#059669] text-white px-8 h-12 rounded-xl hover:bg-[#047857] transition-colors font-semibold text-[16px] inline-flex items-center gap-2 shadow-lg hover:shadow-xl"
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
                  className="bg-[#ECFDF5] p-6 rounded-xl border border-[#A7F3D0]"
                >
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-5 h-5 text-[#059669] flex-shrink-0 mt-0.5" />
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
            <p className="text-[14px] font-semibold text-[#059669] mb-3">
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
                  className="bg-white p-6 rounded-xl border border-[#E5E5E5] hover:border-[#059669]/30 transition-all"
                >
                  <div className="w-12 h-12 bg-[#ECFDF5] rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#059669]" />
                  </div>
                  <div className="text-[13px] font-semibold text-[#059669] mb-2">
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
            <p className="text-[14px] font-semibold text-[#059669] mb-3">
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
                <div className="w-16 h-16 bg-[#ECFDF5] rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-[#059669]" />
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
                    <p className="text-[14px] font-semibold text-[#059669] mb-2">
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
            <p className="text-[14px] font-semibold text-[#059669] mb-3">
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
                  <div className="w-12 h-12 bg-[#ECFDF5] rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-[#059669]" />
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
            <p className="text-[14px] font-semibold text-[#059669] mb-3">
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
                className="bg-[#F8F9FA] p-6 rounded-xl border border-[#E5E5E5] hover:border-[#059669]/30 transition-all"
              >
                <div className="w-10 h-10 bg-[#059669] rounded-lg flex items-center justify-center mb-4">
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
      <section className="py-[66px] px-8 bg-[#059669]">
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
              className="bg-white text-[#059669] px-8 h-12 rounded-xl hover:bg-[#F5F5F5] transition-colors font-semibold text-[16px]"
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
