import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { useRouter } from "../contexts/RouterContext";
import { Sparkles, MessageCircle, Zap, FileText, Layout, Settings, ChevronLeft } from "lucide-react";

export function PotenLampPage() {
  const { language } = useLanguage();
  const { navigate } = useRouter();

  const handleBack = () => {
    navigate("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const content = {
    ko: {
      hero: {
        label: "Poten-Lamp | PRD AI 🧞",
        badge: "준비 중",
        title: "아이디어만으로",
        titleHighlight: "기획 산출물을 자동 생성",
        description: "메뉴 구조, IA, 기능 명세서 등 복잡한 기획 단계를 챗봇과 대화하며 즉시 해결합니다.",
        cta: "출시 알림 신청",
        ctaSecondary: "데모 영상 보기",
      },
      comingSoon: {
        title: "2025년 2분기 출시 예정",
        description: "현재 베타 테스트 중입니다. 출시 알림을 신청하시면 가장 먼저 소식을 받아보실 수 있습니다.",
      },
      features: [
        {
          icon: "MessageCircle",
          title: "대화형 AI",
          description: "자연스러운 대화로 복잡한 기획을 쉽게 정리합니다.",
        },
        {
          icon: "Zap",
          title: "즉시 생성",
          description: "몇 분 만에 완성도 높은 기획 문서를 받아보세요.",
        },
        {
          icon: "FileText",
          title: "다양한 산출물",
          description: "IA, 기능명세서, 화면설계서 등을 자동으로 생성합니다.",
        },
      ],
      capabilities: {
        title: "포텐의 램프가 할 수 있는 것들",
        items: [
          {
            icon: "Layout",
            title: "정보구조(IA) 설계",
            description: "서비스의 메뉴 구조와 화면 흐름을 논리적으로 설계합니다.",
            examples: [
              "메인 메뉴 구조",
              "하위 메뉴 계층",
              "화면 간 연결 관계",
              "사용자 동선 설계",
            ],
          },
          {
            icon: "FileText",
            title: "기능 명세서 작성",
            description: "각 화면과 기능에 대한 상세한 명세를 자동으로 작성합니다.",
            examples: [
              "화면별 기능 정의",
              "입력/출력 항목",
              "예외 처리 시나리오",
              "비즈니스 로직",
            ],
          },
          {
            icon: "Settings",
            title: "개발 요구사항 정리",
            description: "개발팀에 전달할 수 있는 수준의 요구사항 문서를 생성합니다.",
            examples: [
              "API 명세",
              "데이터베이스 스키마",
              "화면 설계서",
              "개발 우선순위",
            ],
          },
        ],
      },
      benefits: {
        title: "이런 분들께 추천합니다",
        items: [
          {
            title: "비개발자 창업자",
            description: "기술적 지식 없이도 전문적인 기획서를 작성할 수 있습니다.",
          },
          {
            title: "PM/기획자",
            description: "반복적인 문서 작업 시간을 대폭 줄이고 핵심 전략에 집중할 수 있습니다.",
          },
          {
            title: "예비 창업자",
            description: "아이디어를 구체화하고 지원사업에 필요한 기획서를 빠르게 준비할 수 있습니다.",
          },
        ],
      },
      process: {
        title: "사용 방법",
        steps: [
          {
            step: "1",
            title: "아이디어 입력",
            description: "만들고 싶은 서비스에 대해 자유롭게 설명합니다.",
          },
          {
            step: "2",
            title: "AI와 대화",
            description: "AI가 질문하고 답변하며 아이디어를 구체화합니다.",
          },
          {
            step: "3",
            title: "문서 생성",
            description: "완성된 기획 문서를 다운로드하거나 수정합니다.",
          },
        ],
      },
      waitlist: {
        title: "출시 알림 신청",
        description: "포텐의 램프가 출시되면 가장 먼저 알려드립니다. 얼리버드 할인 혜택도 받아보세요!",
        benefits: [
          "🎁 얼리버드 50% 할인",
          "🚀 우선 사용 기회",
          "💬 베타 테스터 참여 기회",
        ],
        placeholder: "이메일을 입력하세요",
        button: "알림 신청하기",
      },
    },
    en: {
      hero: {
        label: "Poten-Lamp | PRD AI 🧞",
        badge: "Coming Soon",
        title: "Auto-Generate Planning Outputs",
        titleHighlight: "From Ideas Alone",
        description: "Instantly solve complex planning stages like menu structure, IA, and functional specifications through chatbot conversations.",
        cta: "Get Notified",
        ctaSecondary: "Watch Demo",
      },
      comingSoon: {
        title: "Launching Q2 2025",
        description: "Currently in beta testing. Sign up for launch notifications to be the first to know.",
      },
      features: [
        {
          icon: "MessageCircle",
          title: "Conversational AI",
          description: "Easily organize complex planning through natural conversation.",
        },
        {
          icon: "Zap",
          title: "Instant Generation",
          description: "Receive high-quality planning documents in minutes.",
        },
        {
          icon: "FileText",
          title: "Various Outputs",
          description: "Automatically generate IA, specifications, screen designs, and more.",
        },
      ],
      capabilities: {
        title: "What Poten-Lamp Can Do",
        items: [
          {
            icon: "Layout",
            title: "Information Architecture Design",
            description: "Logically design service menu structure and screen flow.",
            examples: [
              "Main menu structure",
              "Sub-menu hierarchy",
              "Screen connections",
              "User flow design",
            ],
          },
          {
            icon: "FileText",
            title: "Feature Specification",
            description: "Automatically write detailed specifications for each screen and feature.",
            examples: [
              "Screen-specific features",
              "Input/output items",
              "Exception scenarios",
              "Business logic",
            ],
          },
          {
            icon: "Settings",
            title: "Development Requirements",
            description: "Generate requirement documents ready for development teams.",
            examples: [
              "API specifications",
              "Database schema",
              "Screen design docs",
              "Development priorities",
            ],
          },
        ],
      },
      benefits: {
        title: "Recommended For",
        items: [
          {
            title: "Non-Technical Founders",
            description: "Create professional planning documents without technical knowledge.",
          },
          {
            title: "PMs/Planners",
            description: "Dramatically reduce repetitive documentation time and focus on core strategy.",
          },
          {
            title: "Aspiring Entrepreneurs",
            description: "Quickly prepare planning documents needed for grant applications while concretizing ideas.",
          },
        ],
      },
      process: {
        title: "How It Works",
        steps: [
          {
            step: "1",
            title: "Input Idea",
            description: "Freely describe the service you want to create.",
          },
          {
            step: "2",
            title: "Chat with AI",
            description: "AI asks and answers to concretize your idea.",
          },
          {
            step: "3",
            title: "Generate Documents",
            description: "Download or edit the completed planning documents.",
          },
        ],
      },
      waitlist: {
        title: "Join the Waitlist",
        description: "Be the first to know when Poten-Lamp launches. Get early bird discount benefits too!",
        benefits: [
          "🎁 50% Early Bird Discount",
          "🚀 Priority Access",
          "💬 Beta Tester Opportunity",
        ],
        placeholder: "Enter your email",
        button: "Get Notified",
      },
    },
  };

  const t = content[language as keyof typeof content];

  const iconMap = {
    MessageCircle: MessageCircle,
    Zap: Zap,
    FileText: FileText,
    Layout: Layout,
    Settings: Settings,
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-[72px]">
        {/* Hero Section */}
        <section className="py-12 px-4 sm:px-8 xl:px-[62px] bg-gradient-to-br from-[#226BEF] to-[#1B54C0] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#0079FF] rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#E6F3FF] rounded-full blur-3xl" />
          </div>

          <div className="max-w-[1156px] mx-auto relative z-10">
            {/* Back Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={handleBack}
              className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">
                {language === "ko" ? "홈으로" : "Back to Home"}
              </span>
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full font-semibold text-sm text-white">
                  <Sparkles className="w-4 h-4" />
                  {t.hero.label}
                </span>
                <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-semibold">
                  {t.hero.badge}
                </span>
              </div>
              <h1 className="text-[48px] font-bold mb-3 whitespace-pre-line">
                {t.hero.title}
                <br />
                <span className="text-[#E6F3FF]">
                  {t.hero.titleHighlight}
                </span>
              </h1>
              <p className="text-[18px] text-white/90 mb-8 max-w-[700px]">
                {t.hero.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate("contact")}
                  className="bg-white text-[#0079FF] px-8 h-[48px] rounded-xl hover:bg-gray-100 transition-colors text-[16px] font-semibold"
                >
                  {t.hero.cta}
                </button>
                <button
                  className="bg-white/20 backdrop-blur-sm text-white px-8 h-[48px] rounded-xl border border-white/40 hover:bg-white/30 transition-colors text-[16px] font-semibold"
                >
                  {t.hero.ctaSecondary}
                </button>
              </div>
            </motion.div>

            {/* Coming Soon Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 text-white"
            >
              <h3 className="text-[24px] font-bold mb-3">
                {t.comingSoon.title}
              </h3>
              <p className="text-[14px] text-white/80">
                {t.comingSoon.description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white px-4 sm:px-8">
          <div className="max-w-[1156px] mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {t.features.map((feature, index) => {
                const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-[#E6F3FF] rounded-xl flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="w-8 h-8 text-[#0079FF]" />
                    </div>
                    <h3 className="text-[20px] font-bold text-[#0E1116] mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-[14px] text-[#666666] leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="py-24 bg-[#F8F9FA] px-4 sm:px-8">
          <div className="max-w-[1156px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-[36px] font-bold text-[#0E1116] mb-4">
                {t.capabilities.title}
              </h2>
            </motion.div>

            <div className="space-y-6">
              {t.capabilities.items.map((item, index) => {
                const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-xl p-8 border border-[#E5E7EB]"
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 bg-[#0079FF] rounded-xl flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-[24px] font-bold text-[#0E1116] mb-3">
                          {item.title}
                        </h3>
                        <p className="text-[14px] text-[#666666] mb-4">
                          {item.description}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {item.examples.map((example, idx) => (
                            <div
                              key={idx}
                              className="bg-[#E6F3FF] rounded-lg px-3 py-2 text-[13px] text-[#0079FF] font-medium"
                            >
                              {example}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 bg-white px-4 sm:px-8">
          <div className="max-w-[1156px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-[36px] font-bold text-[#0E1116] mb-4">
                {t.benefits.title}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {t.benefits.items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-[#F8F9FA] rounded-xl p-6 border border-[#E5E7EB] hover:border-[#0079FF] transition-colors"
                >
                  <h3 className="text-[20px] font-bold text-[#0E1116] mb-3">
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

        {/* Process Section */}
        <section className="py-24 bg-[#F8F9FA] px-4 sm:px-8">
          <div className="max-w-[1156px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-[36px] font-bold text-[#0E1116] mb-4">
                {t.process.title}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {t.process.steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-[#0079FF] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-[24px] font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-[20px] font-bold text-[#0E1116] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[14px] text-[#666666] leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Waitlist Section */}
        <section className="py-24 bg-gradient-to-br from-[#226BEF] to-[#1B54C0] px-4 sm:px-8">
          <div className="max-w-[800px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center text-white"
            >
              <h2 className="text-[40px] font-bold mb-4">
                {t.waitlist.title}
              </h2>
              <p className="text-[18px] opacity-90 mb-8">
                {t.waitlist.description}
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
                <div className="grid md:grid-cols-3 gap-4 text-left">
                  {t.waitlist.benefits.map((benefit, index) => (
                    <div key={index} className="text-[14px] font-medium">
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 max-w-[500px] mx-auto">
                <input
                  type="email"
                  placeholder={t.waitlist.placeholder}
                  className="flex-1 px-6 h-[48px] rounded-xl text-black outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  onClick={() => navigate("contact")}
                  className="bg-white text-[#0079FF] px-8 h-[48px] rounded-xl hover:bg-gray-100 transition-colors font-semibold whitespace-nowrap"
                >
                  {t.waitlist.button}
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
