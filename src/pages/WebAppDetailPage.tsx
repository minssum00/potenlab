import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useLanguage } from "../contexts/LanguageContext";
import { useRouter } from "../contexts/RouterContext";
import { motion } from "motion/react";
import { ChevronLeft } from "lucide-react";
import { 
  Frame59, 
  Frame40, 
  InfoBoxSection,
  ServiceTypesSection, 
  TechStackSection, 
  ProcessSection, 
  CTASection 
} from "../imports/맞춤형웹개발서비스-624-2081";

export function WebAppDetailPage() {
  const { language } = useLanguage();
  const { navigate } = useRouter();

  const handleBack = () => {
    navigate("services");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContact = () => {
    navigate("contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-[72px]">
        {/* Hero Section with Gradient */}
        <section className="py-12 px-4 sm:px-8 xl:px-[62px] bg-gradient-to-br from-[#0079FF] to-[#00C8FF]">
          <div className="max-w-[1156px] mx-auto">
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
                {language === "ko"
                  ? "서비스 목록으로"
                  : "Back to Services"}
              </span>
            </motion.button>

            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white"
            >
              <div className="mb-3">
                <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {language === "ko"
                    ? "맞춤형 웹&앱 개발"
                    : "Custom Web & App Development"}
                </span>
              </div>
              <h1 className="text-[48px] font-bold mb-3">
                {language === "ko"
                  ? "비즈니스 확장을 위한\n맞춤형 웹&앱 개발 서비스"
                  : "Custom Web & App Development\nfor Business Expansion"}
              </h1>
              <p className="text-[18px] text-white/90 mb-5 max-w-[700px]">
                {language === "ko"
                  ? "이미 확보된 잠재 고객을 바탕으로 IT 서비스로 확할  최적의 솔루션을 제공합니다."
                  : "Provide optimal solutions when expanding to IT services based on existing potential customers."}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="bg-white/20 px-4 py-2 rounded-lg">
                  <span className="font-semibold">
                    {language === "ko" ? "기간" : "Duration"}
                    :{" "}
                  </span>
                  <span>
                    {language === "ko" ? "3-6개월" : "3-6 months"}
                  </span>
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-lg">
                  <span className="font-semibold">
                    {language === "ko" ? "비용" : "Cost"}:{" "}
                  </span>
                  <span>
                    {language === "ko"
                      ? "프로젝트별 상담"
                      : "Project-based consultation"}
                  </span>
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-lg">
                  <span className="font-semibold">
                    {language === "ko"
                      ? "결과물"
                      : "Deliverable"}
                    :{" "}
                  </span>
                  <span>
                    {language === "ko"
                      ? "웹/앱 플랫폼 & 운영 시스템"
                      : "Web/App Platform & Operations"}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <WebAppContent handleContact={handleContact} />
      </main>

      <Footer />
    </div>
  );
}

// Main Content Component
function WebAppContent({ handleContact }: { handleContact: () => void }) {
  return (
    <div className="bg-white w-full">
      <Frame59 />
      <Frame40 />
      <InfoBoxSection />
      <ServiceTypesSection />
      <TechStackSection />
      <ProcessSection />
      <CTASection />
    </div>
  );
}