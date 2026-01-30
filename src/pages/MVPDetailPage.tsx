import image_0d82bfa9203067463886368806562162d4a519a4 from "figma:asset/0d82bfa9203067463886368806562162d4a519a4.png";
import image_862b683b576f2bcd44730db411f24e9fda6c7580 from "figma:asset/862b683b576f2bcd44730db411f24e9fda6c7580.png";
import image_a8a61529fb8ce7578f88a9f3d3b08bdb55e32c00 from "figma:asset/a8a61529fb8ce7578f88a9f3d3b08bdb55e32c00.png";
import image_fdefa939ef8192d259cc264bcb2c33220b546d24 from "figma:asset/fdefa939ef8192d259cc264bcb2c33220b546d24.png";
import image_60f33c2c0a99ec2c4a29bc9d1c29974dbfc82089 from "figma:asset/60f33c2c0a99ec2c4a29bc9d1c29974dbfc82089.png";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "../contexts/RouterContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function MVPDetailPage() {
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
        <section className="py-12 px-4 sm:px-8 xl:px-[62px] bg-gradient-to-br from-[#28B8B9] to-[#1E9C9D]">
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
                    ? "MVP 개발"
                    : "MVP Development"}
                </span>
              </div>
              <h1 className="text-[48px] font-bold mb-3">
                {language === "ko"
                  ? "빠르고 효율적인\nMVP 개발 서비스"
                  : "Fast & Efficient\nMVP Development Service"}
              </h1>
              <p className="text-[18px] text-white/90 mb-5 max-w-[700px]">
                {language === "ko"
                  ? "핵심 기능에 집중하여 빠르게 시장 반응을 검증하고, 비용 효율적으로 제품을 출시합니다."
                  : "Focus on core features to quickly validate market response and launch products cost-effectively."}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="bg-white/20 px-4 py-2 rounded-lg">
                  <span className="font-semibold">
                    {language === "ko" ? "기간" : "Duration"}
                    :{" "}
                  </span>
                  <span>
                    {language === "ko"
                      ? "4주 이내"
                      : "Within 4 weeks"}
                  </span>
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-lg">
                  <span className="font-semibold">
                    {language === "ko" ? "비용" : "Cost"}:{" "}
                  </span>
                  <span>
                    {language === "ko"
                      ? "500~1,000만원"
                      : "$5,000~$10,000"}
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
                      ? "MVP서비스 (Web)"
                      : "MVP Service (Web)"}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section: Who Needs This */}
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
                  ? "이런분들에게 필요해요!"
                  : "Perfect for These People!"}
              </h2>
            </motion.div>

            {/* Cards - Vertical Stack */}
            <div className="flex flex-col gap-5 items-center max-w-[674px] mx-auto">
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
                        "이 아이디어가 사업가능성이 있을까?"
                      </span>
                      <span className="block">
                        빠른제작을 통해 시장검증이 필요한{" "}
                        <span className="text-[#0079FF]">
                          예비 창업가/스타트업
                        </span>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="block mb-0">
                        "Does this idea have business
                        potential?"
                      </span>
                      <span className="block">
                        <span className="text-[#0079FF]">
                          Pre-founders/Startups
                        </span>{" "}
                        who need quick market validation
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
                className="bg-white rounded-full px-10 py-5 shadow-[0px_0px_20px_0px_rgba(34,107,239,0.15)] border border-[#e3e3e3] w-[416px]"
              >
                <p className="text-center leading-[1.7] text-black m-0">
                  {language === "ko" ? (
                    <>
                      <span className="block mb-0">
                        "개발지식이 없는데 홈페이지는 어떻게
                        관리하지?"
                      </span>
                      <span className="block">
                        홈페이지 운영관리가 어려운{" "}
                        <span className="text-[#0079FF]">
                          IT 비전문가
                        </span>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="block mb-0">
                        "How do I manage a website without
                        development knowledge?"
                      </span>
                      <span className="block">
                        <span className="text-[#0079FF]">
                          Non-IT professionals
                        </span>{" "}
                        who find website management challenging
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
                        "일단 빠르게 회원을 모아서 서비스를
                        만들고싶어."
                      </span>
                      <span className="block">
                        높은 비용보다는 일단 저비용으로 내
                        서비스를 관리하고 싶은{" "}
                        <span className="text-[#0079FF]">
                          커뮤니티 운영자
                        </span>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="block mb-0">
                        "I want to quickly gather members and
                        build a service."
                      </span>
                      <span className="block">
                        <span className="text-[#0079FF]">
                          Community operators
                        </span>{" "}
                        who want to manage their service at low
                        cost
                      </span>
                    </>
                  )}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 2: Service Process - 4 Steps */}
        <section className="py-32 px-4 sm:px-8 xl:px-[62px] bg-gradient-to-br from-[#0079FF] to-[#0066DD]">
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
                  ? "서비스 프로세스"
                  : "Service Process"}
              </h2>
            </motion.div>

            {/* 4 Process Cards - Horizontal Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Step 1: IT 컨설팅 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-shadow"
              >
                {/* Icon Area */}
                <div className="bg-[#2D2D2D] h-[160px] flex items-center justify-center p-6">
                  <div className="w-full h-full flex items-center justify-center">
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 160 120"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="max-h-full"
                    >
                      {/* Wireframe boxes */}
                      <rect
                        x="20"
                        y="30"
                        width="50"
                        height="25"
                        rx="3"
                        fill="white"
                        opacity="0.9"
                      />
                      <rect
                        x="75"
                        y="30"
                        width="65"
                        height="25"
                        rx="3"
                        fill="white"
                        opacity="0.9"
                      />
                      <rect
                        x="20"
                        y="65"
                        width="40"
                        height="25"
                        rx="3"
                        fill="white"
                        opacity="0.9"
                      />
                      <rect
                        x="65"
                        y="65"
                        width="45"
                        height="25"
                        rx="3"
                        fill="white"
                        opacity="0.9"
                      />
                      {/* Connection dots */}
                      <circle
                        cx="45"
                        cy="42"
                        r="4"
                        fill="#0079FF"
                      />
                      <circle
                        cx="107"
                        cy="42"
                        r="4"
                        fill="#0079FF"
                      />
                      <circle
                        cx="40"
                        cy="77"
                        r="4"
                        fill="#0079FF"
                      />
                      <circle
                        cx="87"
                        cy="77"
                        r="4"
                        fill="#0079FF"
                      />
                      {/* Connection line */}
                      <line
                        x1="20"
                        y1="42"
                        x2="140"
                        y2="42"
                        stroke="#0079FF"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>
                {/* Content Area */}
                <div className="p-6">
                  <p className="text-[#0079FF] text-[14px] font-semibold mb-2">
                    Step 01
                  </p>
                  <h3 className="text-[20px] font-bold text-[#333333] mb-3">
                    {language === "ko"
                      ? "IT 컨설팅"
                      : "IT Consulting"}
                  </h3>
                  <ul className="text-[14px] text-[#666666] leading-relaxed space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="text-[#0079FF]">
                        •
                      </span>
                      <span>
                        {language === "ko"
                          ? "아이디어에 맞는 MVP 전략 수립"
                          : "Develop MVP strategy for your idea"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#0079FF]">
                        •
                      </span>
                      <span>
                        {language === "ko"
                          ? "시장 및 경쟁 분석, 적합성 검토"
                          : "Market analysis and feasibility review"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#0079FF]">
                        •
                      </span>
                      <span>
                        {language === "ko"
                          ? "노코드 툴 또는 맞춤형 개발 여부 결정"
                          : "Decide no-code or custom development"}
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Step 2: UX/UI 디자인 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-shadow"
              >
                {/* Icon Area */}
                <div className="bg-[#2D2D2D] h-[160px] flex items-center justify-center p-6">
                  <div className="w-full h-full flex items-center justify-center">
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 140 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="max-h-full"
                    >
                      {/* Design text with selection handles */}
                      <rect
                        x="20"
                        y="30"
                        width="100"
                        height="40"
                        rx="4"
                        stroke="#0079FF"
                        strokeWidth="2"
                        fill="none"
                      />
                      <text
                        x="40"
                        y="57"
                        fill="white"
                        fontSize="24"
                        fontWeight="bold"
                      >
                        Design
                      </text>
                      {/* Corner handles */}
                      <circle
                        cx="20"
                        cy="30"
                        r="3"
                        fill="#0079FF"
                      />
                      <circle
                        cx="120"
                        cy="30"
                        r="3"
                        fill="#0079FF"
                      />
                      <circle
                        cx="20"
                        cy="70"
                        r="3"
                        fill="#0079FF"
                      />
                      <circle
                        cx="120"
                        cy="70"
                        r="3"
                        fill="#0079FF"
                      />
                      {/* Cursor */}
                      <path
                        d="M125 75 L125 85 L128 82 L131 88 L133 87 L130 81 L135 81 Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
                {/* Content Area */}
                <div className="p-6">
                  <p className="text-[#0079FF] text-[14px] font-semibold mb-2">
                    Step 02
                  </p>
                  <h3 className="text-[20px] font-bold text-[#333333] mb-3">
                    {language === "ko"
                      ? "UX/UI 디자인"
                      : "UX/UI Design"}
                  </h3>
                  <ul className="text-[14px] text-[#666666] leading-relaxed space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="text-[#0079FF]">
                        •
                      </span>
                      <span>
                        {language === "ko"
                          ? "핵심 메뉴구조도 작업"
                          : "Core menu structure design"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#0079FF]">
                        •
                      </span>
                      <span>
                        {language === "ko"
                          ? "핵심 화면 디자인 작업"
                          : "Key screen design work"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#0079FF]">
                        •
                      </span>
                      <span>
                        {language === "ko"
                          ? "개발을 위한 기본 정책 설정"
                          : "Basic policy setup for development"}
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Step 3: 노코드 MVP 개발 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-shadow"
              >
                {/* Icon Area */}
                <div className="bg-[#2D2D2D] h-[160px] flex items-center justify-center p-6">
                  <div className="w-full h-full flex items-center justify-center">
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 140 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="max-h-full"
                    >
                      {/* Laptop frame */}
                      <rect
                        x="25"
                        y="20"
                        width="90"
                        height="55"
                        rx="4"
                        fill="#1A1A1A"
                        stroke="#4A4A4A"
                        strokeWidth="3"
                      />
                      {/* Screen content */}
                      <rect
                        x="35"
                        y="30"
                        width="70"
                        height="35"
                        rx="2"
                        fill="#F5F5F5"
                      />
                      {/* Window elements */}
                      <rect
                        x="40"
                        y="35"
                        width="25"
                        height="3"
                        rx="1.5"
                        fill="#CCCCCC"
                      />
                      <rect
                        x="40"
                        y="42"
                        width="60"
                        height="3"
                        rx="1.5"
                        fill="#CCCCCC"
                      />
                      <rect
                        x="40"
                        y="49"
                        width="45"
                        height="3"
                        rx="1.5"
                        fill="#CCCCCC"
                      />
                      <rect
                        x="40"
                        y="56"
                        width="55"
                        height="3"
                        rx="1.5"
                        fill="#CCCCCC"
                      />
                      {/* Laptop base */}
                      <path
                        d="M15 75 L125 75 L120 82 L20 82 Z"
                        fill="#4A4A4A"
                      />
                    </svg>
                  </div>
                </div>
                {/* Content Area */}
                <div className="p-6">
                  <p className="text-[#0079FF] text-[14px] font-semibold mb-2">
                    Step 03
                  </p>
                  <h3 className="text-[20px] font-bold text-[#333333] mb-3">
                    {language === "ko"
                      ? "바이브코딩을 통한 개발"
                      : "No-Code MVP Development"}
                  </h3>
                  <ul className="text-[14px] text-[#666666] leading-relaxed space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="text-[#0079FF]">
                        •
                      </span>
                      <span>
                        {language === "ko"
                          ? "노코드 기반의 신속한 제작"
                          : "Rapid development with no-code tools"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#0079FF]">
                        •
                      </span>
                      <span>
                        {language === "ko"
                          ? "Figma/V0/Cursor + Supabase"
                          : "Figma/V0/Cursor + Supabase"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#0079FF]">
                        •
                      </span>
                      <span>
                        {language === "ko"
                          ? "기능의 프런트 조기 서비스 제작"
                          : "Early service creation with core features"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#0079FF]">
                        •
                      </span>
                      <span>
                        {language === "ko"
                          ? "1달 이내 완성"
                          : "Completion within 1 month"}
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Step 4: 운영 및 수정보완 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-shadow"
              >
                {/* Icon Area */}
                <div className="bg-[#2D2D2D] h-[160px] flex items-center justify-center p-6">
                  <div className="w-full h-full flex items-center justify-center">
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 120 120"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="max-h-full"
                    >
                      {/* Clipboard */}
                      <rect
                        x="35"
                        y="25"
                        width="50"
                        height="65"
                        rx="4"
                        fill="white"
                        stroke="#4A4A4A"
                        strokeWidth="2"
                      />
                      {/* Clip */}
                      <rect
                        x="50"
                        y="20"
                        width="20"
                        height="8"
                        rx="4"
                        fill="#4A4A4A"
                      />
                      {/* Content lines */}
                      <rect
                        x="43"
                        y="38"
                        width="34"
                        height="3"
                        rx="1.5"
                        fill="#CCCCCC"
                      />
                      <rect
                        x="43"
                        y="48"
                        width="34"
                        height="3"
                        rx="1.5"
                        fill="#CCCCCC"
                      />
                      <rect
                        x="43"
                        y="58"
                        width="20"
                        height="3"
                        rx="1.5"
                        fill="#CCCCCC"
                      />
                      {/* Settings icon */}
                      <circle
                        cx="70"
                        cy="35"
                        r="10"
                        fill="#0079FF"
                        opacity="0.9"
                      />
                      <path
                        d="M70 30 L70 32 M70 38 L70 40 M65 35 L67 35 M73 35 L75 35"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="70"
                        cy="35"
                        r="3"
                        stroke="white"
                        strokeWidth="1.5"
                        fill="none"
                      />
                    </svg>
                  </div>
                </div>
                {/* Content Area */}
                <div className="p-6">
                  <p className="text-[#0079FF] text-[14px] font-semibold mb-2">
                    Step 04
                  </p>
                  <h3 className="text-[20px] font-bold text-[#333333] mb-3">
                    {language === "ko"
                      ? "운영 및 수정보완"
                      : "Operation & Maintenance"}
                  </h3>
                  <ul className="text-[14px] text-[#666666] leading-relaxed space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="text-[#0079FF]">
                        •
                      </span>
                      <span>
                        {language === "ko"
                          ? "초기 시장 검증 진행"
                          : "Initial market validation"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#0079FF]">
                        •
                      </span>
                      <span>
                        {language === "ko"
                          ? "시장검증에 따른 수정보완작업"
                          : "Revision based on market validation"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#0079FF]">
                        •
                      </span>
                      <span>
                        {language === "ko"
                          ? "추가개발 및 확장지원"
                          : "Additional development and expansion support"}
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-24 px-4 sm:px-8 xl:px-[62px] bg-[#F5F5F5]">
          <div className="max-w-[1156px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#2D2D2D] rounded-lg mb-6">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="3"
                    width="8"
                    height="8"
                    rx="1"
                    fill="white"
                  />
                  <rect
                    x="13"
                    y="3"
                    width="8"
                    height="8"
                    rx="1"
                    fill="white"
                  />
                  <rect
                    x="3"
                    y="13"
                    width="8"
                    height="8"
                    rx="1"
                    fill="white"
                  />
                  <rect
                    x="13"
                    y="13"
                    width="8"
                    height="8"
                    rx="1"
                    fill="white"
                  />
                </svg>
              </div>

              <h2 className="mb-4">
                {language === "ko"
                  ? "이런 기술들을 사용해요"
                  : "Technologies We Use"}
              </h2>
              <p className="text-[16px] text-[#666666] max-w-[800px] mx-auto leading-relaxed">
                {language === "ko"
                  ? "수많은 프로젝트를 수행하면서 쌓인경험을 바탕으로 보다 안정적이고 빠르게 MVP개발에 최적화되어있습니다."
                  : "Tirelli has optimized MVP validation through 6 years of project experience, ensuring stable and rapid development."}
              </p>
            </motion.div>

            {/* Tech Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
              {/* Supabase */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-2xl p-4 hover:shadow-lg transition-shadow w-full"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden bg-white">
                    <ImageWithFallback
                      src={
                        image_0d82bfa9203067463886368806562162d4a519a4
                      }
                      alt="Supabase Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-[#333333] mb-0">
                      Supabase
                    </h3>
                    <p className="text-[14px] text-[#999999] m-0">
                      {language === "ko"
                        ? "Backend & Database"
                        : "Backend & Database"}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Imweb */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-2xl p-4 hover:shadow-lg transition-shadow w-full"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden bg-white">
                    <ImageWithFallback
                      src={
                        image_a8a61529fb8ce7578f88a9f3d3b08bdb55e32c00
                      }
                      alt="Imweb Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-[#333333] mb-0">
                      Imweb
                    </h3>
                    <p className="text-[14px] text-[#999999] m-0">
                      {language === "ko"
                        ? "MVP Solution (Web)"
                        : "MVP Solution (Web)"}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Framer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-2xl p-4 hover:shadow-lg transition-shadow w-full"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden bg-white">
                    <ImageWithFallback
                      src={
                        image_fdefa939ef8192d259cc264bcb2c33220b546d24
                      }
                      alt="Framer Logo"
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-[#333333] mb-0">
                      Framer
                    </h3>
                    <p className="text-[14px] text-[#999999] m-0">
                      {language === "ko"
                        ? "Homepage"
                        : "Homepage"}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* V0 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-2xl p-4 hover:shadow-lg transition-shadow w-full"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden bg-white">
                    <ImageWithFallback
                      src={
                        image_60f33c2c0a99ec2c4a29bc9d1c29974dbfc82089
                      }
                      alt="V0 Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-[#333333] mb-0">
                      V0
                    </h3>
                    <p className="text-[14px] text-[#999999] m-0">
                      {language === "ko"
                        ? "Vibe Coding"
                        : "Vibe Coding"}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="w-full bg-gradient-to-r from-[#28B8B9] to-[#1E9C9D] py-16 px-4 sm:px-8 xl:px-[62px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-[1156px] mx-auto text-center"
          >
            <p className="text-[18px] text-white/90 mb-4 max-w-[700px] mx-auto">
              {language === "ko"
                ? "MVP로 빠르게 시작하고, 시장 반응을 확인한 후 확장하세요"
                : "Start fast with MVP, verify market response, then scale"}
            </p>
            <h2 className="text-[36px] font-bold text-white mb-4">
              {language === "ko"
                ? "핵심 기능만 빠르게 개발합니다"
                : "Develop core features quickly"}
            </h2>
            <button
              onClick={() => navigate("contact", null, null, { inquiryType: "project", subCategory: "mvp" })}
              className="bg-white text-[#28B8B9] px-8 py-3 rounded-xl font-semibold hover:bg-white/90 transition-all hover:scale-105 shadow-lg"
            >
              {language === "ko"
                ? "MVP 상담 신청"
                : "Request MVP Consultation"}
            </button>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}