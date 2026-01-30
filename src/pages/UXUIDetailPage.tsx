import image_de84dc9ef5820b90d232c93e771a7b58cb2cd614 from 'figma:asset/de84dc9ef5820b90d232c93e771a7b58cb2cd614.png';
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "../contexts/RouterContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import Section from "../imports/Section-862-51";

export function UXUIDetailPage() {
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
        <section className="py-12 px-4 sm:px-8 xl:px-[62px] bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED]">
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
                    ? "UXUI 기획&디자인"
                    : "UXUI Planning & Design"}
                </span>
              </div>
              <h1 className="text-[48px] font-bold mb-3">
                {language === "ko"
                  ? "사용자 중심의\nUXUI 기획&디자인 서비스"
                  : "User-Centered\nUXUI Planning & Design Service"}
              </h1>
              <p className="text-[18px] text-white/90 mb-5 max-w-[700px]">
                {language === "ko"
                  ? "사용자 경험을 최우선으로 하는 체계적인 기획과 디자인으로 적인 프��덕트를 만듭니다."
                  : "Create successful products with systematic planning and design that prioritizes user experience."}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="bg-white/20 px-4 py-2 rounded-lg">
                  <span className="font-semibold">
                    {language === "ko" ? "기간" : "Duration"}
                    :{" "}
                  </span>
                  <span>
                    {language === "ko" ? "2-4주" : "2-4 weeks"}
                  </span>
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-lg">
                  <span className="font-semibold">
                    {language === "ko" ? "비용" : "Cost"}:{" "}
                  </span>
                  <span>
                    {language === "ko"
                      ? "300 / 500 / 1,000만원"
                      : "$3,000 / $5,000 / $10,000"}
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
                      ? "디자인 시스템 & 프로토타입"
                      : "Design System & Prototype"}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 1: Early Stage */}


        {/* Section 2.3: Service Planning Process - 4 Steps */}
        <section className="py-32 px-4 sm:px-8 xl:px-[62px] bg-[#1A1A1A]">
          <div className="max-w-[1156px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-white/60 text-[14px] mb-2">
                {language === "ko"
                  ? "어떻게 진행되나요?"
                  : "How does it proceed?"}
              </p>
              <h2 className="text-[36px] font-bold text-white mb-4">
                {language === "ko"
                  ? "서비스 기획 프로세스"
                  : "Service Planning Process"}
              </h2>
            </motion.div>

            {/* 4 Process Cards - Horizontal Layout */}
            <div className="relative">
              {/* Connecting Line */}
              <div className="hidden lg:block absolute top-[80px] left-[10%] right-[10%] h-[2px]">
                <div className="w-full h-full border-t-2 border-dotted border-white/30"></div>
                {/* Dots */}
                <div className="absolute top-[-6px] left-0 w-3 h-3 bg-white/60 rounded-full"></div>
                <div className="absolute top-[-6px] left-1/3 w-3 h-3 bg-white/60 rounded-full"></div>
                <div className="absolute top-[-6px] left-2/3 w-3 h-3 bg-white/60 rounded-full"></div>
                <div className="absolute top-[-6px] right-0 w-3 h-3 bg-white/60 rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Step 1: Task Flow */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow"
                >
                  {/* Icon Area */}
                  <div className="bg-[#2A2A2A] h-[160px] flex items-center justify-center p-6">
                    <div className="w-full h-full flex items-center justify-center">
                      <svg width="100%" height="100%" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-h-full">
                        <rect x="10" y="20" width="40" height="12" rx="2" fill="#666666"/>
                        <rect x="70" y="20" width="40" height="12" rx="2" fill="#999999"/>
                        <rect x="70" y="40" width="40" height="12" rx="2" fill="#999999"/>
                        <rect x="70" y="60" width="40" height="12" rx="2" fill="#999999"/>
                        <path d="M50 26 L70 26" stroke="#666666" strokeWidth="2"/>
                        <path d="M50 26 L60 46" stroke="#666666" strokeWidth="2"/>
                        <path d="M60 46 L70 46" stroke="#666666" strokeWidth="2"/>
                        <path d="M60 46 L70 66" stroke="#666666" strokeWidth="2"/>
                        <circle cx="50" cy="26" r="3" fill="#666666"/>
                        <circle cx="60" cy="46" r="3" fill="#666666"/>
                      </svg>
                    </div>
                  </div>
                  {/* Content Area */}
                  <div className="p-6">
                    <p className="text-[#8B5CF6] text-[14px] font-semibold mb-2">Step 01</p>
                    <h3 className="text-[20px] font-bold text-[#333333] mb-3">
                      Task Flow
                    </h3>
                    <p className="text-[14px] text-[#666666] leading-relaxed">
                      {language === "ko"
                        ? "메뉴구조를 기반으로 Task Flow를 작업하며 전체적인 서비스의 흐름을 정리합니다."
                        : "Create Task Flow based on menu structure and organize overall service flow."}
                    </p>
                  </div>
                </motion.div>

                {/* Step 2: 와이어프레임 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow"
                >
                  {/* Icon Area */}
                  <div className="bg-[#2A2A2A] h-[160px] flex items-center justify-center p-6">
                    <div className="w-full h-full flex items-center justify-center">
                      <svg width="100%" height="100%" viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-h-full">
                        <rect x="15" y="15" width="70" height="110" rx="4" fill="white" stroke="#666666" strokeWidth="2"/>
                        <rect x="25" y="25" width="20" height="4" rx="1" fill="#CCCCCC"/>
                        <rect x="25" y="35" width="50" height="35" rx="2" fill="#E6E6E6"/>
                        <circle cx="72" cy="52" r="10" fill="#CCCCCC"/>
                      </svg>
                    </div>
                  </div>
                  {/* Content Area */}
                  <div className="p-6">
                    <p className="text-[#8B5CF6] text-[14px] font-semibold mb-2">Step 02</p>
                    <h3 className="text-[20px] font-bold text-[#333333] mb-3">
                      {language === "ko" ? "와이어프레임" : "Wireframe"}
                    </h3>
                    <p className="text-[14px] text-[#666666] leading-relaxed">
                      {language === "ko"
                        ? "핵심 메뉴들 기반으로 화면의 위치를 그립니다. 소통을 통해 더욱 완벽을 추가 작업합니다."
                        : "Draw screen layouts based on core menus and refine through communication."}
                    </p>
                  </div>
                </motion.div>

                {/* Step 3: 기능명세서 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow"
                >
                  {/* Icon Area */}
                  <div className="bg-[#2A2A2A] h-[160px] flex items-center justify-center p-6">
                    <div className="w-full h-full flex items-center justify-center">
                      <svg width="100%" height="100%" viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-h-full">
                        <rect x="20" y="20" width="60" height="100" rx="3" fill="white" stroke="#666666" strokeWidth="2"/>
                        <rect x="28" y="28" width="44" height="8" rx="1" fill="#CCCCCC"/>
                        <rect x="28" y="42" width="20" height="8" rx="1" fill="#FFD700"/>
                        <rect x="50" y="42" width="22" height="8" rx="1" fill="#87CEEB"/>
                        <rect x="28" y="56" width="16" height="8" rx="1" fill="#FFB6C1"/>
                        <rect x="46" y="56" width="26" height="8" rx="1" fill="#98FB98"/>
                        <rect x="28" y="70" width="22" height="8" rx="1" fill="#DDA0DD"/>
                        <rect x="52" y="70" width="20" height="8" rx="1" fill="#F0E68C"/>
                        <rect x="28" y="84" width="30" height="8" rx="1" fill="#B0E0E6"/>
                        <rect x="28" y="98" width="18" height="8" rx="1" fill="#FFE4B5"/>
                      </svg>
                    </div>
                  </div>
                  {/* Content Area */}
                  <div className="p-6">
                    <p className="text-[#8B5CF6] text-[14px] font-semibold mb-2">Step 03</p>
                    <h3 className="text-[20px] font-bold text-[#333333] mb-3">
                      {language === "ko" ? "기능명세서" : "Functional Spec"}
                    </h3>
                    <p className="text-[14px] text-[#666666] leading-relaxed">
                      {language === "ko"
                        ? "화면의 서비스 정책을 참고하여 필요한 기능들을 세분화하여 명시합니다."
                        : "Specify detailed functions based on service policies for each screen."}
                    </p>
                  </div>
                </motion.div>

                {/* Step 4: 정보구조도 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow"
                >
                  {/* Icon Area */}
                  <div className="bg-[#2A2A2A] h-[160px] flex items-center justify-center p-6">
                    <div className="w-full h-full flex items-center justify-center">
                      <svg width="100%" height="100%" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-h-full">
                        <rect x="45" y="10" width="30" height="12" rx="2" fill="white" stroke="#666666" strokeWidth="1.5"/>
                        <rect x="15" y="40" width="22" height="10" rx="2" fill="#999999"/>
                        <rect x="45" y="40" width="22" height="10" rx="2" fill="#999999"/>
                        <rect x="75" y="40" width="22" height="10" rx="2" fill="#999999"/>
                        <rect x="8" y="70" width="18" height="8" rx="1" fill="#CCCCCC"/>
                        <rect x="30" y="70" width="18" height="8" rx="1" fill="#CCCCCC"/>
                        <rect x="52" y="70" width="18" height="8" rx="1" fill="#CCCCCC"/>
                        <rect x="74" y="70" width="18" height="8" rx="1" fill="#CCCCCC"/>
                        <rect x="96" y="70" width="18" height="8" rx="1" fill="#CCCCCC"/>
                        <path d="M60 22 L26 40" stroke="#666666" strokeWidth="1.5"/>
                        <path d="M60 22 L56 40" stroke="#666666" strokeWidth="1.5"/>
                        <path d="M60 22 L86 40" stroke="#666666" strokeWidth="1.5"/>
                        <circle cx="110" cy="45" r="8" fill="white" stroke="#666666" strokeWidth="2"/>
                        <path d="M106 45 L114 45 M110 41 L110 49" stroke="#666666" strokeWidth="2"/>
                      </svg>
                    </div>
                  </div>
                  {/* Content Area */}
                  <div className="p-6">
                    <p className="text-[#8B5CF6] text-[14px] font-semibold mb-2">Step 04</p>
                    <h3 className="text-[20px] font-bold text-[#333333] mb-3">
                      {language === "ko" ? "정보구조도(I.A)" : "Information Architecture"}
                    </h3>
                    <p className="text-[14px] text-[#666666] leading-relaxed">
                      {language === "ko"
                        ? "모든 화면과 Flow가 완성되면 핵심구조도를 작성합니다."
                        : "Create information architecture when all screens and flows are complete."}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2.5: Idea to Specification Process */}
        <section className="py-32 px-4 sm:px-8 xl:px-[62px] bg-[#F8F9FA]">
          <div className="max-w-[1156px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-[36px] font-bold mb-4">
                {language === "ko"
                  ? "아이디어 → 기획안 → 기획서"
                  : "Idea → Plan → Specification"}
              </h2>
              <p className="text-[16px] text-[#666666] max-w-[800px] mx-auto">
                {language === "ko"
                  ? "체계적인 과정을 통해 아이디어를 완성된 기획서로 발전시킵니다."
                  : "Develop ideas into complete specifications through a systematic process."}
              </p>
            </motion.div>

            {/* Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left Side - Idea Documents */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-[#FFF8F0] rounded-3xl p-8 relative overflow-hidden"
              >
                {/* Decorative Lines */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8B5CF6]/20 to-transparent"></div>

                <div className="relative z-10">
                  <h3 className="text-[24px] font-bold text-[#333333] mb-6">
                    {language === "ko"
                      ? "아이디어 문서"
                      : "Idea Documents"}
                  </h3>

                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                      <p className="text-[16px] font-semibold text-[#666666]">
                        {language === "ko"
                          ? "📋 기획안"
                          : "📋 Initial Plan"}
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                      <p className="text-[16px] font-semibold text-[#666666]">
                        {language === "ko"
                          ? "🗂️ 핵심메뉴구조"
                          : "🗂️ Menu Structure"}
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                      <p className="text-[16px] font-semibold text-[#666666]">
                        {language === "ko"
                          ? "⚙️ 핵심기능 정의"
                          : "⚙️ Core Features"}
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                      <p className="text-[16px] font-semibold text-[#666666]">
                        {language === "ko"
                          ? "🔄 Task Flow"
                          : "🔄 Task Flow"}
                      </p>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="mt-8 rounded-xl overflow-hidden">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1693045181254-08462917f681?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFubmluZyUyMGRvY3VtZW50JTIwd2lyZWZyYW1lfGVufDF8fHx8MTc2NDE3NDQwNXww&ixlib=rb-4.1.0&q=80&w=1080"
                      alt={
                        language === "ko"
                          ? "아이디어 문서"
                          : "Idea Documents"
                      }
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Arrow Icon */}
              <div className="hidden md:flex justify-center absolute left-1/2 transform -translate-x-1/2 z-20">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white rounded-full p-4 shadow-lg"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 16H26M26 16L20 10M26 16L20 22"
                      stroke="#8B5CF6"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </div>

              {/* Right Side - Complete Specification */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-[#1A1A1A] rounded-3xl p-8 relative overflow-hidden"
              >
                {/* Decorative Lines */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8B5CF6]/40 to-transparent"></div>

                <div className="relative z-10">
                  <h3 className="text-[24px] font-bold text-white mb-6">
                    {language === "ko"
                      ? "완성된 기획서"
                      : "Complete Specification"}
                  </h3>

                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm hover:bg-white/15 transition-colors">
                      <p className="text-[16px] font-semibold text-white/90">
                        {language === "ko"
                          ? "📊 정보구조도 (I.A)"
                          : "📊 Information Architecture"}
                      </p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm hover:bg-white/15 transition-colors">
                      <p className="text-[16px] font-semibold text-white/90">
                        {language === "ko"
                          ? "🖼️ 화면설계 (Wireframe)"
                          : "🖼️ Wireframe Design"}
                      </p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm hover:bg-white/15 transition-colors">
                      <p className="text-[16px] font-semibold text-white/90">
                        {language === "ko"
                          ? "📝 기능명세서"
                          : "📝 Functional Spec"}
                      </p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm hover:bg-white/15 transition-colors">
                      <p className="text-[16px] font-semibold text-white/90">
                        {language === "ko"
                          ? "🎬 스토리보드"
                          : "🎬 Storyboard"}
                      </p>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="mt-8 rounded-xl overflow-hidden">
                    <ImageWithFallback
                      src={image_de84dc9ef5820b90d232c93e771a7b58cb2cd614}
                      alt={
                        language === "ko"
                          ? "완성된 기획서"
                          : "Complete Specification"
                      }
                      className="w-full h-auto opacity-90"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Mobile Arrow - Vertical */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex md:hidden justify-center -my-4"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 6V26M16 26L10 20M16 26L22 20"
                  stroke="#8B5CF6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>
        </section>

        {/* Section 3: UXUI Design Process - 4 Steps */}
        <section className="py-32 px-4 sm:px-8 xl:px-[62px] bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] relative">
          <div className="w-full h-[600px] relative">
            <Section />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-4 sm:px-8 xl:px-[62px] bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED]">
          <div className="max-w-[1156px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-[36px] font-bold text-white mb-6">
                {language === "ko"
                  ? "지금 바로 시작하세요"
                  : "Start Now"}
              </h2>
              <p className="text-[18px] text-white/90 mb-8 max-w-[600px] mx-auto">
                {language === "ko"
                  ? "사용자가 사랑하는 디자인으로 비즈니스 성공을 만들어보세요."
                  : "Create business success with design that users love."}
              </p>
              <button 
                onClick={() => navigate('contact')}
                className="bg-white text-[#8B5CF6] px-8 py-4 rounded-xl font-semibold hover:bg-white/90 transition-all hover:scale-105"
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