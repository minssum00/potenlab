import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { useRouter } from "../contexts/RouterContext";
import {
  Briefcase,
  Palette,
  Globe,
  ArrowRight,
} from "lucide-react";

export function OtherServicesPage() {
  const { language } = useLanguage();
  const { navigate } = useRouter();

  const content = {
    ko: {
      hero: {
        label: "기타 서비스",
        title: "다양한 전문 서비스로",
        titleHighlight: "비즈니스 성장을 지원합니다",
        description:
          "IT 컨설팅부터 UX/UI 디자인, 홈페이지 개발까지\n비즈니스에 필요한 모든 서비스를 제공합니다.",
      },
      services: [
        {
          id: "consulting",
          icon: "Briefcase",
          color: "#0079FF",
          bgColor: "#E6F3FF",
          title: "IT/Biz 컨설팅",
          subtitle: "IT 프로젝트의 방향을 잡아드립니다",
          description:
            "비용, 기간, 기술 스택까지 전문가가 명확한 방향을 제시합니다. 아이디어를 어떻게 실현해야 할지 막막하다면 컨설팅부터 시작하세요.",
          features: [
            "현황 분석 및 전략 수립",
            "기술 스택 및 아키텍처 제안",
            "비용/일정 견적 및 로드맵",
          ],
        },
        {
          id: "uxui-design",
          icon: "Palette",
          color: "#9333EA",
          bgColor: "#F3E8FF",
          title: "UX/UI 디자인",
          subtitle: "사용자 경험으로 비즈니스 성과를 만듭니다",
          description:
            "예쁜 디자인이 아닌, 전환율을 높이는 디자인을 만듭니다. 데이터 기반 UX 리서치로 사용자가 원하는 것을 직관적으로 찾을 수 있게 합니다.",
          features: [
            "UX 리서치 및 사용자 분석",
            "와이어프레임 및 UI 디자인",
            "디자인 시스템 구축",
          ],
        },
        {
          id: "web-development",
          icon: "Globe",
          color: "#059669",
          bgColor: "#ECFDF5",
          title: "홈페이지 개발",
          subtitle: "비즈니스를 성장시키는 웹사이트",
          description:
            "단순한 홈페이지가 아닌, 검색 노출과 전환율을 고려한 전략적인 웹사이트를 개발합니다. SEO 최적화와 성과 측정까지 포함합니다.",
          features: [
            "반응형 웹사이트 개발",
            "SEO 최적화 및 분석 도구 연동",
            "CMS 기반 쉬운 콘텐츠 관리",
          ],
        },
      ],
      cta: {
        title: "어떤 서비스가 필요하신지\n잘 모르시겠다면?",
        description: "무료 상담을 통해 비즈니스에 가장 적합한 서비스를 추천해드립니다.",
        button: "무료 상담 신청하기",
      },
    },
    en: {
      hero: {
        label: "Other Services",
        title: "Supporting Business Growth",
        titleHighlight: "With Various Expert Services",
        description:
          "From IT consulting to UX/UI design and web development,\nwe provide all the services your business needs.",
      },
      services: [
        {
          id: "consulting",
          icon: "Briefcase",
          color: "#0079FF",
          bgColor: "#E6F3FF",
          title: "IT/Biz Consulting",
          subtitle: "Setting the direction for your IT project",
          description:
            "Experts provide clear direction on costs, timelines, and tech stacks. If you're unsure how to realize your idea, start with consulting.",
          features: [
            "Current state analysis & strategy",
            "Tech stack & architecture proposal",
            "Cost/timeline estimates & roadmap",
          ],
        },
        {
          id: "uxui-design",
          icon: "Palette",
          color: "#9333EA",
          bgColor: "#F3E8FF",
          title: "UX/UI Design",
          subtitle: "Creating business results through user experience",
          description:
            "We create designs that increase conversion, not just pretty designs. Data-driven UX research helps users intuitively find what they want.",
          features: [
            "UX research & user analysis",
            "Wireframes & UI design",
            "Design system development",
          ],
        },
        {
          id: "web-development",
          icon: "Globe",
          color: "#059669",
          bgColor: "#ECFDF5",
          title: "Web Development",
          subtitle: "Websites that grow your business",
          description:
            "Not just a website, but a strategic web presence considering search visibility and conversion. Includes SEO optimization and analytics.",
          features: [
            "Responsive website development",
            "SEO optimization & analytics integration",
            "CMS-based easy content management",
          ],
        },
      ],
      cta: {
        title: "Not sure which service\nyou need?",
        description: "Through a free consultation, we'll recommend the most suitable service for your business.",
        button: "Request Free Consultation",
      },
    },
  };

  const t = content[language as keyof typeof content];

  const iconMap = {
    Briefcase: Briefcase,
    Palette: Palette,
    Globe: Globe,
  };

  const handleServiceClick = (serviceId: string) => {
    if (serviceId === "consulting") {
      navigate("consulting");
    } else if (serviceId === "uxui-design") {
      navigate("uxui-design");
    } else if (serviceId === "web-development") {
      navigate("web-development");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="pt-[120px] pb-20 px-8 bg-gradient-to-b from-[#F8F9FA] to-white">
        <div className="max-w-[1156px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="mb-4">
              <span className="inline-block text-[#64748B] px-4 py-1.5 rounded-full text-[14px] font-semibold border border-[#64748B]/20 bg-white/50">
                🛠️ {t.hero.label}
              </span>
            </div>
            <h1 className="md:text-[48px] font-bold mb-2 text-[#0E1116] text-[40px] m-[0px]">
              {t.hero.title}
            </h1>
            <h2 className="text-[32px] md:text-[40px] font-bold mb-6 text-[#0E1116]">
              {t.hero.titleHighlight}
            </h2>
            <p className="text-[16px] md:text-[18px] leading-relaxed text-[#666666] max-w-[700px] mx-auto whitespace-pre-line">
              {t.hero.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-[1156px] mx-auto">
          <div className="space-y-8">
            {t.services.map((service, idx) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  onClick={() => handleServiceClick(service.id)}
                  className="bg-white rounded-2xl border border-[#E5E5E5] p-8 hover:border-gray-300 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Icon */}
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: service.bgColor }}
                    >
                      <Icon
                        className="w-8 h-8"
                        style={{ color: service.color }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                          <h3 className="text-[24px] font-bold text-[#0E1116] mb-1 group-hover:text-[#0079FF] transition-colors">
                            {service.title}
                          </h3>
                          <p
                            className="text-[16px] font-medium mb-3"
                            style={{ color: service.color }}
                          >
                            {service.subtitle}
                          </p>
                          <p className="text-[15px] text-[#666666] leading-relaxed mb-4 lg:mb-0 max-w-[600px]">
                            {service.description}
                          </p>
                        </div>

                        {/* Arrow */}
                        <div className="flex-shrink-0">
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                            style={{ backgroundColor: service.bgColor }}
                          >
                            <ArrowRight
                              className="w-5 h-5"
                              style={{ color: service.color }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {service.features.map((feature, fIdx) => (
                          <span
                            key={fIdx}
                            className="px-3 py-1.5 bg-[#F8F9FA] text-[13px] text-[#666666] rounded-full"
                          >
                            {feature}
                          </span>
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

      {/* CTA Section */}
      <section className="py-20 px-8 bg-[#F8F9FA]">
        <div className="max-w-[800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center bg-white rounded-2xl p-10 border border-[#E5E5E5]"
          >
            <h2 className="text-[28px] md:text-[32px] font-bold mb-4 text-[#0E1116] whitespace-pre-line">
              {t.cta.title}
            </h2>
            <p className="text-[16px] text-[#666666] mb-8">
              {t.cta.description}
            </p>
            <button
              onClick={() => navigate("contact")}
              className="bg-[#0079FF] text-white px-8 h-12 rounded-xl hover:bg-[#0066DD] transition-colors font-semibold text-[16px] inline-flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              {t.cta.button}
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
