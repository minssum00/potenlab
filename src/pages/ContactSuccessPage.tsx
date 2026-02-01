import React, { useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { useRouter } from "../contexts/RouterContext";
import { CheckCircle, ArrowRight, Home, MessageCircle, Clock } from "lucide-react";

const content = {
  ko: {
    title: "문의가 접수되었습니다!",
    subtitle: "빠른 시일 내에 연락드리겠습니다.",
    description: "제출해주신 내용을 검토 후, 담당자가 직접 연락드릴 예정입니다.",
    timeline: {
      title: "응답 예상 시간",
      items: [
        { label: "평일", value: "1시간 이내" },
        { label: "주말/공휴일", value: "다음 영업일" },
      ],
    },
    nextSteps: {
      title: "다음 단계",
      items: [
        "담당자가 문의 내용을 검토합니다",
        "유선 또는 이메일로 상담 일정을 조율합니다",
        "무료 상담을 통해 최적의 솔루션을 제안드립니다",
      ],
    },
    buttons: {
      home: "홈으로 돌아가기",
      services: "서비스 둘러보기",
    },
    contact: {
      title: "급하신 문의는",
      description: "카카오톡 채널로 실시간 상담이 가능합니다.",
      button: "카카오톡 상담",
    },
  },
  en: {
    title: "Your inquiry has been received!",
    subtitle: "We'll get back to you shortly.",
    description: "Our team will review your submission and contact you directly.",
    timeline: {
      title: "Expected Response Time",
      items: [
        { label: "Weekdays", value: "Within 1 hour" },
        { label: "Weekends/Holidays", value: "Next business day" },
      ],
    },
    nextSteps: {
      title: "Next Steps",
      items: [
        "Our team reviews your inquiry",
        "We'll schedule a consultation via phone or email",
        "We'll propose the best solution through a free consultation",
      ],
    },
    buttons: {
      home: "Back to Home",
      services: "Explore Services",
    },
    contact: {
      title: "Need urgent assistance?",
      description: "Real-time consultation is available via KakaoTalk.",
      button: "KakaoTalk Chat",
    },
  },
};

export function ContactSuccessPage() {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  const t = content[language];

  // Google Analytics 전환 추적 (선택사항)
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "conversion", {
        event_category: "contact",
        event_label: "form_submission",
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Success Section */}
      <section className="flex-1 pt-[100px] sm:pt-[120px] lg:pt-[140px] pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#E6F3FF] via-[#F5F9FF] to-white">
        <div className="max-w-[800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
              className="mb-6 sm:mb-8"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#0079FF] rounded-full flex items-center justify-center mx-auto shadow-[0px_4px_20px_rgba(0,121,255,0.3)]">
                <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" strokeWidth={2.5} />
              </div>
            </motion.div>

            {/* Title */}
            <h1 className="text-[28px] sm:text-[36px] md:text-[44px] font-bold text-[#0E1116] leading-[1.2] mb-3 sm:mb-4 break-keep">
              {t.title}
            </h1>
            <h2 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold text-[#0079FF] mb-4 sm:mb-6">
              {t.subtitle}
            </h2>
            <p className="text-[15px] sm:text-[17px] md:text-[18px] leading-[1.8] text-[#666666] max-w-[600px] mx-auto mb-8 sm:mb-10">
              {t.description}
            </p>

            {/* Timeline Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl border border-[#E5E7EB] p-6 sm:p-8 mb-6 sm:mb-8 shadow-sm"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-[#0079FF]" />
                <h3 className="text-[16px] sm:text-[18px] font-bold text-[#0E1116]">
                  {t.timeline.title}
                </h3>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
                {t.timeline.items.map((item, index) => (
                  <div key={index} className="text-center">
                    <p className="text-[13px] sm:text-[14px] text-[#666666] mb-1">{item.label}</p>
                    <p className="text-[18px] sm:text-[20px] font-bold text-[#0079FF]">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-[#F8F9FA] rounded-2xl p-6 sm:p-8 mb-8 sm:mb-10"
            >
              <h3 className="text-[16px] sm:text-[18px] font-bold text-[#0E1116] mb-4">
                {t.nextSteps.title}
              </h3>
              <div className="space-y-3">
                {t.nextSteps.items.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#0079FF] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-[12px] font-bold">{index + 1}</span>
                    </div>
                    <p className="text-[14px] sm:text-[15px] text-[#666666] text-left">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            >
              <button
                onClick={() => navigate("home")}
                className="px-[24px] h-[44px] text-[14px] font-medium rounded-[24px] transition-all duration-200 bg-[#0079FF] hover:bg-[#0066DD] text-white shadow-[0px_1px_3px_0px_rgba(0,121,255,0.2),0px_1px_2px_0px_rgba(0,121,255,0.2)] hover:shadow-[0px_2px_5px_0px_rgba(0,121,255,0.3)] inline-flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                {t.buttons.home}
              </button>
              <button
                onClick={() => navigate("poten-booster")}
                className="px-[24px] h-[44px] text-[14px] font-medium rounded-[24px] transition-all duration-200 bg-white text-[#0079FF] border-2 border-[#0079FF] hover:bg-[#F0F8FF] inline-flex items-center justify-center gap-2"
              >
                {t.buttons.services}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* KakaoTalk CTA */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#E5E7EB]">
        <div className="max-w-[600px] mx-auto text-center">
          <MessageCircle className="w-8 h-8 text-[#FAE100] mx-auto mb-3" />
          <h3 className="text-[16px] sm:text-[18px] font-bold text-[#0E1116] mb-2">
            {t.contact.title}
          </h3>
          <p className="text-[14px] sm:text-[15px] text-[#666666] mb-4">
            {t.contact.description}
          </p>
          <a
            href="http://pf.kakao.com/_KxdxdnG/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-[24px] h-[44px] text-[14px] font-medium rounded-[24px] transition-all duration-200 bg-[#FAE100] hover:bg-[#F5D800] text-[#3C1E1E]"
          >
            {t.contact.button}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
