import { motion } from "motion/react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useLanguage } from "../contexts/LanguageContext";
import { useRouter } from "../contexts/RouterContext";
import { ChevronLeft, Target, Users, TrendingUp, CheckCircle2 } from "lucide-react";

export function ITConsultingDetailPage() {
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
        {/* Hero Section */}
        <section className="py-12 px-4 sm:px-8 xl:px-[62px] bg-gradient-to-br from-[#226BEF] to-[#1B54C0]">
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
                    ? "IT/Biz 기술 컨설팅"
                    : "IT/Biz Strategic Consulting"}
                </span>
              </div>
              <h1 className="text-[48px] font-bold mb-3">
                {language === "ko"
                  ? "성공적인 IT 전환을 위한\n전략적 컨설팅"
                  : "Strategic Consulting\nfor Successful IT Transformation"}
              </h1>
              <p className="text-[18px] text-white/90 mb-5 max-w-[700px]">
                {language === "ko"
                  ? "비즈니스 목표에 맞는 최적의 IT 전략을 수립하고, 실행 가능한 로드맵을 제시합니다."
                  : "Establish optimal IT strategies aligned with business goals and provide actionable roadmaps."}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="bg-white/20 px-4 py-2 rounded-lg">
                  <span className="font-semibold">
                    {language === "ko" ? "기간" : "Duration"}
                    :{" "}
                  </span>
                  <span>
                    {language === "ko"
                      ? "2주 ~ 1개월"
                      : "2 weeks ~ 1 month"}
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
                      ? "IT 전략 보고서"
                      : "IT Strategy Report"}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Who Needs This */}
        <section className="py-24 px-4 sm:px-8 xl:px-[62px] bg-gradient-to-br from-[#E6F3FF] to-[#F0F0F5] relative overflow-hidden">
          <div className="max-w-[1156px] mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="mb-0">
                {language === "ko"
                  ? "이런 분들에게 필요해요!"
                  : "Perfect for These People!"}
              </h2>
            </motion.div>

            {/* Cards - Vertical Stack */}
            <div className="flex flex-col gap-5 items-center max-w-[800px] mx-auto">
              {/* Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-full px-10 py-5 shadow-[0px_0px_20px_0px_rgba(34,107,239,0.15)] border border-[#e3e3e3] w-full"
              >
                <p className="text-center leading-[1.7] text-black m-0">
                  {language === "ko" ? (
                    <>
                      <span className="block mb-0">
                        "IT 프로젝트를 시작하고 싶은데 어디서부터 시작해야 할지 모르겠어요."
                      </span>
                      <span className="block">
                        IT 전환이 필요한{" "}
                        <span className="text-[#226BEF]">
                          스타트업 대표 및 사업 기획자
                        </span>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="block mb-0">
                        "I want to start an IT project but don't know where to begin."
                      </span>
                      <span className="block">
                        <span className="text-[#226BEF]">
                          Startup CEOs & Business Planners
                        </span>{" "}
                        who need IT transformation
                      </span>
                    </>
                  )}
                </p>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-full px-10 py-5 shadow-[0px_0px_20px_0px_rgba(34,107,239,0.15)] border border-[#e3e3e3] w-full"
              >
                <p className="text-center leading-[1.7] text-black m-0">
                  {language === "ko" ? (
                    <>
                      <span className="block mb-0">
                        "기존 시스템을 개선하고 싶은데 비용과 기간이 얼마나 들지 궁금해요."
                      </span>
                      <span className="block">
                        시스템 개선이 필요한{" "}
                        <span className="text-[#226BEF]">
                          중소기업 및 서비스 운영자
                        </span>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="block mb-0">
                        "I want to improve our existing system but need cost and timeline estimates."
                      </span>
                      <span className="block">
                        <span className="text-[#226BEF]">
                          SMEs & Service Operators
                        </span>{" "}
                        who need system improvements
                      </span>
                    </>
                  )}
                </p>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-full px-10 py-5 shadow-[0px_0px_20px_0px_rgba(34,107,239,0.15)] border border-[#e3e3e3] w-full"
              >
                <p className="text-center leading-[1.7] text-black m-0">
                  {language === "ko" ? (
                    <>
                      <span className="block mb-0">
                        "디지털 전환 전략을 세우고 싶은데 전문가의 조언이 필요해요."
                      </span>
                      <span className="block">
                        디지털 혁신이 필요한{" "}
                        <span className="text-[#226BEF]">
                          기업 임원 및 의사결정자
                        </span>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="block mb-0">
                        "I need expert advice to develop a digital transformation strategy."
                      </span>
                      <span className="block">
                        <span className="text-[#226BEF]">
                          Corporate Executives & Decision Makers
                        </span>{" "}
                        who need digital innovation
                      </span>
                    </>
                  )}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Service Process */}
        <section className="py-32 px-4 sm:px-8 xl:px-[62px] bg-gradient-to-br from-[#226BEF] to-[#1B54C0]">
          <div className="max-w-[1156px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-white/80 text-[14px] mb-2">
                {language === "ko"
                  ? "어떻게 진행되나요?"
                  : "How does it proceed?"}
              </p>
              <h2 className="text-white mb-0 text-[32px]">
                {language === "ko"
                  ? "컨설팅 프로세스"
                  : "Consulting Process"}
              </h2>
            </motion.div>

            {/* 4 Process Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <div className="bg-[#2D2D2D] h-[160px] flex items-center justify-center p-6">
                  <Target className="w-20 h-20 text-[#226BEF]" />
                </div>
                <div className="p-6">
                  <p className="text-[#226BEF] text-[14px] font-semibold mb-2">
                    Step 01
                  </p>
                  <h3 className="text-[20px] font-bold text-[#333333] mb-3">
                    {language === "ko"
                      ? "현황 분석"
                      : "Current State Analysis"}
                  </h3>
                  <ul className="text-[14px] text-[#666666] leading-relaxed space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="text-[#226BEF]">•</span>
                      <span>
                        {language === "ko"
                          ? "비즈니스 목표 및 요구사항 파악"
                          : "Identify business goals and requirements"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#226BEF]">•</span>
                      <span>
                        {language === "ko"
                          ? "기존 시스템 및 프로세스 분석"
                          : "Analyze existing systems and processes"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#226BEF]">•</span>
                      <span>
                        {language === "ko"
                          ? "시장 및 경쟁사 벤치마킹"
                          : "Market and competitor benchmarking"}
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <div className="bg-[#2D2D2D] h-[160px] flex items-center justify-center p-6">
                  <TrendingUp className="w-20 h-20 text-[#226BEF]" />
                </div>
                <div className="p-6">
                  <p className="text-[#226BEF] text-[14px] font-semibold mb-2">
                    Step 02
                  </p>
                  <h3 className="text-[20px] font-bold text-[#333333] mb-3">
                    {language === "ko"
                      ? "전략 수립"
                      : "Strategy Development"}
                  </h3>
                  <ul className="text-[14px] text-[#666666] leading-relaxed space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="text-[#226BEF]">•</span>
                      <span>
                        {language === "ko"
                          ? "IT 전략 및 로드맵 설계"
                          : "IT strategy and roadmap design"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#226BEF]">•</span>
                      <span>
                        {language === "ko"
                          ? "기술 스택 및 아키텍처 제안"
                          : "Tech stack and architecture proposal"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#226BEF]">•</span>
                      <span>
                        {language === "ko"
                          ? "비용 및 일정 추정"
                          : "Cost and timeline estimation"}
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <div className="bg-[#2D2D2D] h-[160px] flex items-center justify-center p-6">
                  <Users className="w-20 h-20 text-[#226BEF]" />
                </div>
                <div className="p-6">
                  <p className="text-[#226BEF] text-[14px] font-semibold mb-2">
                    Step 03
                  </p>
                  <h3 className="text-[20px] font-bold text-[#333333] mb-3">
                    {language === "ko"
                      ? "실행 계획"
                      : "Execution Planning"}
                  </h3>
                  <ul className="text-[14px] text-[#666666] leading-relaxed space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="text-[#226BEF]">•</span>
                      <span>
                        {language === "ko"
                          ? "단계별 실행 방안 제시"
                          : "Phased execution plan presentation"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#226BEF]">•</span>
                      <span>
                        {language === "ko"
                          ? "리스크 관리 전략 수립"
                          : "Risk management strategy development"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#226BEF]">•</span>
                      <span>
                        {language === "ko"
                          ? "팀 구성 및 역할 정의"
                          : "Team composition and role definition"}
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Step 4 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <div className="bg-[#2D2D2D] h-[160px] flex items-center justify-center p-6">
                  <CheckCircle2 className="w-20 h-20 text-[#226BEF]" />
                </div>
                <div className="p-6">
                  <p className="text-[#226BEF] text-[14px] font-semibold mb-2">
                    Step 04
                  </p>
                  <h3 className="text-[20px] font-bold text-[#333333] mb-3">
                    {language === "ko"
                      ? "지속 지원"
                      : "Ongoing Support"}
                  </h3>
                  <ul className="text-[14px] text-[#666666] leading-relaxed space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="text-[#226BEF]">•</span>
                      <span>
                        {language === "ko"
                          ? "프로젝트 진행 모니터링"
                          : "Project progress monitoring"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#226BEF]">•</span>
                      <span>
                        {language === "ko"
                          ? "정기적인 피드백 및 개선"
                          : "Regular feedback and improvements"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#226BEF]">•</span>
                      <span>
                        {language === "ko"
                          ? "추가 컨설팅 및 자문"
                          : "Additional consulting and advisory"}
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="py-24 px-4 sm:px-8 xl:px-[62px] bg-white">
          <div className="max-w-[1156px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="mb-3">
                {language === "ko"
                  ? "왜 포텐랩 IT 컨설팅인가요?"
                  : "Why Potenlab IT Consulting?"}
              </h2>
              <p className="text-[#666666] text-[16px]">
                {language === "ko"
                  ? "다년간의 IT 프로젝트 경험을 바탕으로 최적의 솔루션을 제공합니다."
                  : "We provide optimal solutions based on years of IT project experience."}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Benefit 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gradient-to-br from-[#E6F3FF] to-[#F0F0F5] p-8 rounded-3xl"
              >
                <div className="w-14 h-14 bg-[#226BEF] rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-white text-2xl font-bold">01</span>
                </div>
                <h3 className="text-[20px] font-bold mb-3">
                  {language === "ko"
                    ? "실전 경험 기반"
                    : "Based on Real Experience"}
                </h3>
                <p className="text-[#666666] text-[14px] leading-relaxed">
                  {language === "ko"
                    ? "다양한 산업군의 IT 프로젝트를 직접 수행한 경험을 바탕으로 실질적인 조언을 제공합니다."
                    : "We provide practical advice based on hands-on experience in IT projects across various industries."}
                </p>
              </motion.div>

              {/* Benefit 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-br from-[#E6F3FF] to-[#F0F0F5] p-8 rounded-3xl"
              >
                <div className="w-14 h-14 bg-[#226BEF] rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-white text-2xl font-bold">02</span>
                </div>
                <h3 className="text-[20px] font-bold mb-3">
                  {language === "ko"
                    ? "비용 효율적"
                    : "Cost-Effective"}
                </h3>
                <p className="text-[#666666] text-[14px] leading-relaxed">
                  {language === "ko"
                    ? "불필요한 비용을 최소화하고, 비즈니스 목표 달성에 필요한 핵심 요소에 집중합니다."
                    : "Minimize unnecessary costs and focus on core elements needed to achieve business goals."}
                </p>
              </motion.div>

              {/* Benefit 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-br from-[#E6F3FF] to-[#F0F0F5] p-8 rounded-3xl"
              >
                <div className="w-14 h-14 bg-[#226BEF] rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-white text-2xl font-bold">03</span>
                </div>
                <h3 className="text-[20px] font-bold mb-3">
                  {language === "ko"
                    ? "빠른 의사결정"
                    : "Fast Decision Making"}
                </h3>
                <p className="text-[#666666] text-[14px] leading-relaxed">
                  {language === "ko"
                    ? "명확한 데이터와 분석을 통해 빠른 의사결정을 지원하고, 프로젝트 진행 속도를 높입니다."
                    : "Support fast decision-making through clear data and analysis, accelerating project progress."}
                </p>
              </motion.div>

              {/* Benefit 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gradient-to-br from-[#E6F3FF] to-[#F0F0F5] p-8 rounded-3xl"
              >
                <div className="w-14 h-14 bg-[#226BEF] rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-white text-2xl font-bold">04</span>
                </div>
                <h3 className="text-[20px] font-bold mb-3">
                  {language === "ko"
                    ? "맞춤형 솔루션"
                    : "Customized Solutions"}
                </h3>
                <p className="text-[#666666] text-[14px] leading-relaxed">
                  {language === "ko"
                    ? "획일적인 솔루션이 아닌, 각 기업의 상황과 목표에 맞는 맞춤형 전략을 제안합니다."
                    : "We propose customized strategies tailored to each company's situation and goals, not one-size-fits-all solutions."}
                </p>
              </motion.div>

              {/* Benefit 5 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-gradient-to-br from-[#E6F3FF] to-[#F0F0F5] p-8 rounded-3xl"
              >
                <div className="w-14 h-14 bg-[#226BEF] rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-white text-2xl font-bold">05</span>
                </div>
                <h3 className="text-[20px] font-bold mb-3">
                  {language === "ko"
                    ? "최신 기술 트렌드"
                    : "Latest Tech Trends"}
                </h3>
                <p className="text-[#666666] text-[14px] leading-relaxed">
                  {language === "ko"
                    ? "AI, 클라우드, 노코드 등 최신 기술 트렌드를 반영한 현실적인 전략을 제시합니다."
                    : "We present practical strategies reflecting the latest tech trends such as AI, cloud, and no-code."}
                </p>
              </motion.div>

              {/* Benefit 6 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-gradient-to-br from-[#E6F3FF] to-[#F0F0F5] p-8 rounded-3xl"
              >
                <div className="w-14 h-14 bg-[#226BEF] rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-white text-2xl font-bold">06</span>
                </div>
                <h3 className="text-[20px] font-bold mb-3">
                  {language === "ko"
                    ? "원스톱 서비스"
                    : "One-Stop Service"}
                </h3>
                <p className="text-[#666666] text-[14px] leading-relaxed">
                  {language === "ko"
                    ? "컨설팅부터 개발, 운영까지 전 과정을 지원하여 일관된 품질을 보장합니다."
                    : "We support the entire process from consulting to development and operations, ensuring consistent quality."}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 sm:px-8 xl:px-[62px] bg-gradient-to-br from-[#226BEF] to-[#1B54C0]">
          <div className="max-w-[1156px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-white mb-4">
                {language === "ko"
                  ? "IT 전략 컨설팅이 필요하신가요?"
                  : "Need IT Strategy Consulting?"}
              </h2>
              <p className="text-white/90 text-[18px] mb-8 max-w-[600px] mx-auto">
                {language === "ko"
                  ? "포텐랩의 전문가가 귀사의 IT 전환을 성공적으로 이끌어드립니다."
                  : "Potenlab's experts will successfully lead your IT transformation."}
              </p>
              <button
                onClick={handleContact}
                className="bg-white text-[#226BEF] px-8 py-4 rounded-xl font-semibold text-[16px] hover:bg-[#E6F3FF] transition-colors shadow-lg"
              >
                {language === "ko"
                  ? "무료 상담 신청하기"
                  : "Request Free Consultation"}
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
