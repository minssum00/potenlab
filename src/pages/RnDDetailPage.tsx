import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "../contexts/RouterContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function RnDDetailPage() {
  const { language } = useLanguage();
  const { navigate } = useRouter();

  const handleBack = () => {
    navigate("services");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-[72px]">
        {/* Hero Section */}
        <section className="py-12 px-4 sm:px-8 xl:px-[62px] bg-gradient-to-br from-[#10B981] to-[#06B6D4]">
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
                  {language === "ko" ? "R&D 개발" : "R&D Development"}
                </span>
              </div>
              <h1 className="text-[48px] font-bold mb-3">
                {language === "ko"
                  ? "혁신적인 기술로\n미래를 준비하는 R&D 개발"
                  : "Innovative R&D Development\nfor the Future"}
              </h1>
              <p className="text-[18px] text-white/90 mb-5 max-w-[700px]">
                {language === "ko"
                  ? "AI/ML, 신기술 연구개발, 기술검증(PoC)을 통해 비즈니스 혁신을 실현합니다."
                  : "Realize business innovation through AI/ML, new technology R&D, and proof of concept (PoC)."}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="bg-white/20 px-4 py-2 rounded-lg">
                  <span className="font-semibold">
                    {language === "ko" ? "기간" : "Duration"}:{" "}
                  </span>
                  <span>
                    {language === "ko" ? "6-12주" : "6-12 weeks"}
                  </span>
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-lg">
                  <span className="font-semibold">
                    {language === "ko" ? "비용" : "Cost"}:{" "}
                  </span>
                  <span>
                    {language === "ko"
                      ? "별도 문의"
                      : "Inquiry Required"}
                  </span>
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-lg">
                  <span className="font-semibold">
                    {language === "ko" ? "결과물" : "Deliverable"}:{" "}
                  </span>
                  <span>
                    {language === "ko"
                      ? "실증 가능한 기술 시스템"
                      : "Proven Technology System"}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 1: Why R&D? */}
        <section className="py-24 px-4 sm:px-8 xl:px-[62px] bg-gradient-to-br from-[#ECFDF5] to-[#F0F0F5] relative overflow-hidden">
          {/* Single Large Arrow Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] pointer-events-none">
            <svg
              width="400"
              height="500"
              viewBox="0 0 400 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M200 50 L200 400 M100 300 L200 400 L300 300"
                stroke="#10B981"
                strokeWidth="40"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="max-w-[1156px] mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-[#10B981] text-[14px] font-semibold mb-2">
                {language === "ko" ? "R&D 개발이 필요한가요?" : "Need R&D Development?"}
              </p>
              <h2 className="text-[32px] font-bold">
                {language === "ko"
                  ? "이런 프로젝트에 적합합니다"
                  : "Perfect for these projects"}
              </h2>
            </motion.div>

            {/* Speech Bubbles - Zigzag Layout */}
            <div className="space-y-8 max-w-[900px] mx-auto">
              {/* Bubble 1 - Left */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-start gap-4 mr-auto max-w-[600px]"
              >
                <div className="w-[80px] h-[80px] flex-shrink-0 rounded-full bg-gradient-to-br from-[#FFE5E5] to-[#FFD1D1] flex items-center justify-center">
                  <span className="text-4xl">👨‍🔬</span>
                </div>
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E5E5E5]">
                  <p className="text-[15px] leading-relaxed">
                    {language === "ko"
                      ? "AI/ML 기술을 활용하여 비즈니스 프로세스를 자동화하고 인사이트를 얻고 싶어요"
                      : "Want to automate business processes and gain insights using AI/ML technology"}
                  </p>
                </div>
              </motion.div>

              {/* Bubble 2 - Right */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-start gap-4 ml-auto max-w-[600px] flex-row-reverse"
              >
                <div className="w-[80px] h-[80px] flex-shrink-0 rounded-full bg-gradient-to-br from-[#E5F0FF] to-[#D1E5FF] flex items-center justify-center">
                  <span className="text-4xl">👩‍⚕️</span>
                </div>
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E5E5E5]">
                  <p className="text-[15px] leading-relaxed">
                    {language === "ko"
                      ? "신기술 도입 전에 기술 검증(PoC)을 통해 실현 가능성을 확인하고 싶어요"
                      : "Want to verify feasibility through PoC before adopting new technology"}
                  </p>
                </div>
              </motion.div>

              {/* Bubble 3 - Left */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-start gap-4 mr-auto max-w-[600px]"
              >
                <div className="w-[80px] h-[80px] flex-shrink-0 rounded-full bg-gradient-to-br from-[#E5FFE5] to-[#D1FFD1] flex items-center justify-center">
                  <span className="text-4xl">👨‍🏫</span>
                </div>
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E5E5E5]">
                  <p className="text-[15px] leading-relaxed">
                    {language === "ko"
                      ? "데이터 분석과 머신러닝 모델을 통해 예측 시스템을 구축하고 싶어요"
                      : "Want to build prediction systems through data analysis and ML models"}
                  </p>
                </div>
              </motion.div>

              {/* Bubble 4 - Right */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-start gap-4 ml-auto max-w-[600px] flex-row-reverse"
              >
                <div className="w-[80px] h-[80px] flex-shrink-0 rounded-full bg-gradient-to-br from-[#FFF4E5] to-[#FFE8D1] flex items-center justify-center">
                  <span className="text-4xl">👩‍🏫</span>
                </div>
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E5E5E5]">
                  <p className="text-[15px] leading-relaxed">
                    {language === "ko"
                      ? "최신 기술 트렌드를 파악하고 우리 비즈니스에 적용하고 싶어요"
                      : "Want to understand latest tech trends and apply them to our business"}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 2: What We Offer */}
        <section className="py-24 px-4 sm:px-8 xl:px-[62px] bg-white">
          <div className="max-w-[1156px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-[#10B981] text-[14px] font-semibold mb-2">
                {language === "ko" ? "R&D 개발 서비스" : "R&D Development Services"}
              </p>
              <h2 className="text-[32px] font-bold">
                {language === "ko"
                  ? "포텐랩이 제공하는 R&D 서비스"
                  : "R&D Services by Potenlab"}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* PoC */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gradient-to-br from-[#DBEAFE] to-white border border-[#E5E5E5] rounded-3xl p-8"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="text-[22px] font-bold mb-3">
                  {language === "ko" ? "기술 검증 (PoC)" : "Proof of Concept"}
                </h3>
                <p className="text-[15px] text-[#666] mb-4 leading-relaxed">
                  {language === "ko"
                    ? "본격적인 개발 전에 기술 실현 가능성을 검증합니다."
                    : "Verify technical feasibility before full-scale development."}
                </p>
                <ul className="space-y-2 text-[14px] text-[#666]">
                  <li>• {language === "ko" ? "기술 타당성 분석" : "Technical Feasibility Analysis"}</li>
                  <li>• {language === "ko" ? "최소 기능 구현" : "Minimum Viable Implementation"}</li>
                  <li>• {language === "ko" ? "성능 테스트" : "Performance Testing"}</li>
                  <li>• {language === "ko" ? "검증 보고서 작성" : "Validation Report"}</li>
                </ul>
              </motion.div>

              {/* AI Development */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-br from-[#ECFDF5] to-white border border-[#E5E5E5] rounded-3xl p-8"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🤖</span>
                </div>
                <h3 className="text-[22px] font-bold mb-3">
                  {language === "ko" ? "AI 개발" : "AI Development"}
                </h3>
                <p className="text-[15px] text-[#666] mb-4 leading-relaxed">
                  {language === "ko"
                    ? "LLM, Computer Vision, NLP 등 최신 AI 기술을 활용한 맞춤형 AI 솔루션을 개발합니다."
                    : "Develop custom AI solutions using latest AI technologies like LLM, Computer Vision, and NLP."}
                </p>
                <ul className="space-y-2 text-[14px] text-[#666]">
                  <li>• {language === "ko" ? "LLM 기반 챗봇 & 어시스턴트" : "LLM-based Chatbot & Assistant"}</li>
                  <li>• {language === "ko" ? "이미지/영상 분석 시스템" : "Image/Video Analysis System"}</li>
                  <li>• {language === "ko" ? "자연어 처리 솔루션" : "Natural Language Processing"}</li>
                  <li>• {language === "ko" ? "추천 시스템 구축" : "Recommendation System"}</li>
                </ul>
              </motion.div>

              {/* ML Development */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-br from-[#E0F2FE] to-white border border-[#E5E5E5] rounded-3xl p-8"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#06B6D4] to-[#0891B2] rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-[22px] font-bold mb-3">
                  {language === "ko" ? "AI/ML 개발" : "AI/ML Development"}
                </h3>
                <p className="text-[15px] text-[#666] mb-4 leading-relaxed">
                  {language === "ko"
                    ? "데이터 분석부터 머신러닝 모델 구축, 배포까지 전 과정을 지원합니다."
                    : "Support the entire process from data analysis to ML model building and deployment."}
                </p>
                <ul className="space-y-2 text-[14px] text-[#666]">
                  <li>• {language === "ko" ? "��이터 수집 & 전처리" : "Data Collection & Preprocessing"}</li>
                  <li>• {language === "ko" ? "예측 모델 개발" : "Predictive Model Development"}</li>
                  <li>• {language === "ko" ? "모델 학습 & 최적화" : "Model Training & Optimization"}</li>
                  <li>• {language === "ko" ? "MLOps 파이프라인 구축" : "MLOps Pipeline Setup"}</li>
                </ul>
              </motion.div>

              {/* R&D Development */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gradient-to-br from-[#F0FDF4] to-white border border-[#E5E5E5] rounded-3xl p-8"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🔬</span>
                </div>
                <h3 className="text-[22px] font-bold mb-3">
                  {language === "ko" ? "R&D 개발" : "R&D Development"}
                </h3>
                <p className="text-[15px] text-[#666] mb-4 leading-relaxed">
                  {language === "ko"
                    ? "신기술 연구개발을 통해 혁신적인 솔루션을 창출합니다."
                    : "Create innovative solutions through new technology research and development."}
                </p>
                <ul className="space-y-2 text-[14px] text-[#666]">
                  <li>• {language === "ko" ? "신기술 리서치 & 분석" : "New Technology Research & Analysis"}</li>
                  <li>• {language === "ko" ? "프로토타입 개발" : "Prototype Development"}</li>
                  <li>• {language === "ko" ? "기술 문서화" : "Technical Documentation"}</li>
                  <li>• {language === "ko" ? "특허 출원 지원" : "Patent Application Support"}</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 3: Development Process */}
        <section className="py-24 px-4 sm:px-8 xl:px-[62px] bg-[#F8F9FA]">
          <div className="max-w-[1156px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-[#10B981] text-[14px] font-semibold mb-2">
                {language === "ko" ? "개발 프로세스" : "Development Process"}
              </p>
              <h2 className="text-[32px] font-bold">
                {language === "ko"
                  ? "체계적인 R&D 개발 과정"
                  : "Systematic R&D Process"}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-3xl p-8 border border-[#E5E5E5]"
              >
                <div className="w-12 h-12 bg-[#10B981] rounded-full flex items-center justify-center mb-4 text-white font-bold">
                  1
                </div>
                <h3 className="text-[20px] font-bold mb-3">
                  {language === "ko" ? "요구사항 분석" : "Requirement Analysis"}
                </h3>
                <p className="text-[14px] text-[#666] leading-relaxed">
                  {language === "ko"
                    ? "비즈니스 목표와 기술 요구사항을 상세히 분석하고 최적의 기술 스택을 선정합니다."
                    : "Analyze business goals and technical requirements in detail and select optimal tech stack."}
                </p>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-3xl p-8 border border-[#E5E5E5]"
              >
                <div className="w-12 h-12 bg-[#10B981] rounded-full flex items-center justify-center mb-4 text-white font-bold">
                  2
                </div>
                <h3 className="text-[20px] font-bold mb-3">
                  {language === "ko" ? "연구 & 설계" : "Research & Design"}
                </h3>
                <p className="text-[14px] text-[#666] leading-relaxed">
                  {language === "ko"
                    ? "관련 기술을 리서치하고 시스템 아키텍처를 설계합니다. 데이터 파이프라인을 구축합니다."
                    : "Research relevant technologies and design system architecture. Build data pipeline."}
                </p>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-3xl p-8 border border-[#E5E5E5]"
              >
                <div className="w-12 h-12 bg-[#10B981] rounded-full flex items-center justify-center mb-4 text-white font-bold">
                  3
                </div>
                <h3 className="text-[20px] font-bold mb-3">
                  {language === "ko" ? "개발 & 실험" : "Development & Experiment"}
                </h3>
                <p className="text-[14px] text-[#666] leading-relaxed">
                  {language === "ko"
                    ? "모델 개발 및 학습을 진행하고 다양한 실험을 통해 최적화합니다."
                    : "Develop and train models, optimize through various experiments."}
                </p>
              </motion.div>

              {/* Step 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-3xl p-8 border border-[#E5E5E5]"
              >
                <div className="w-12 h-12 bg-[#10B981] rounded-full flex items-center justify-center mb-4 text-white font-bold">
                  4
                </div>
                <h3 className="text-[20px] font-bold mb-3">
                  {language === "ko" ? "테스트 & 검증" : "Testing & Validation"}
                </h3>
                <p className="text-[14px] text-[#666] leading-relaxed">
                  {language === "ko"
                    ? "다양한 시나리오에서 성능을 테스트하고 정확도를 검증합니다."
                    : "Test performance in various scenarios and validate accuracy."}
                </p>
              </motion.div>

              {/* Step 5 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-white rounded-3xl p-8 border border-[#E5E5E5]"
              >
                <div className="w-12 h-12 bg-[#10B981] rounded-full flex items-center justify-center mb-4 text-white font-bold">
                  5
                </div>
                <h3 className="text-[20px] font-bold mb-3">
                  {language === "ko" ? "배포 & 모니터링" : "Deploy & Monitoring"}
                </h3>
                <p className="text-[14px] text-[#666] leading-relaxed">
                  {language === "ko"
                    ? "프로덕션 환경에 배포하고 성능을 지속적으로 모니터링합니다."
                    : "Deploy to production and continuously monitor performance."}
                </p>
              </motion.div>

              {/* Step 6 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-white rounded-3xl p-8 border border-[#E5E5E5]"
              >
                <div className="w-12 h-12 bg-[#10B981] rounded-full flex items-center justify-center mb-4 text-white font-bold">
                  6
                </div>
                <h3 className="text-[20px] font-bold mb-3">
                  {language === "ko" ? "유지보수 & 개선" : "Maintenance & Improvement"}
                </h3>
                <p className="text-[14px] text-[#666] leading-relaxed">
                  {language === "ko"
                    ? "지속적인 모델 업데이트와 성능 개선을 지원합니다."
                    : "Support continuous model updates and performance improvements."}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 4: Tech Stack */}
        <section className="py-24 px-4 sm:px-8 xl:px-[62px] bg-white">
          <div className="max-w-[1156px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-[#10B981] text-[14px] font-semibold mb-2">
                {language === "ko" ? "기술 스택" : "Tech Stack"}
              </p>
              <h2 className="text-[32px] font-bold">
                {language === "ko"
                  ? "사용하는 주요 기술"
                  : "Key Technologies We Use"}
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Python", icon: "🐍" },
                { name: "TensorFlow", icon: "🧠" },
                { name: "PyTorch", icon: "🔥" },
                { name: "OpenAI", icon: "🤖" },
                { name: "LangChain", icon: "⛓️" },
                { name: "Hugging Face", icon: "🤗" },
                { name: "Scikit-learn", icon: "📊" },
                { name: "Docker", icon: "🐳" },
              ].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-gradient-to-br from-[#F8F9FA] to-white border border-[#E5E5E5] rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-3">{tech.icon}</div>
                  <p className="font-semibold text-[15px]">{tech.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 sm:px-8 xl:px-[62px] bg-gradient-to-br from-[#10B981] to-[#06B6D4]">
          <div className="max-w-[1156px] mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-[36px] font-bold mb-4">
                {language === "ko"
                  ? "혁신적인 R&D 프로젝트를\n시작할 준비가 되셨나요?"
                  : "Ready to start\nyour innovative R&D project?"}
              </h2>
              <p className="text-[18px] text-white/90 mb-8">
                {language === "ko"
                  ? "포텐랩과 함께 AI/ML 기술로 비즈니스를 혁신하세요"
                  : "Transform your business with AI/ML technology with Potenlab"}
              </p>
              <button
                onClick={() => {
                  navigate("contact");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-white text-[#10B981] px-8 h-12 rounded-xl font-semibold hover:bg-white/90 transition-colors"
              >
                {language === "ko" ? "프로젝트 신청하기" : "Apply Now"}
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}