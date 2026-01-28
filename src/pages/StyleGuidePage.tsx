import { useLanguage } from "../contexts/LanguageContext";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "../contexts/RouterContext";

export function StyleGuidePage() {
  const { t, language } = useLanguage();
  const { navigate } = useRouter();

  const typographyData = [
    {
      scale: "H1",
      size: "36",
      weight: "Extrabold/Bold",
      lineHeight: "1.5",
      use: language === "ko" ? "대 타이틀" : "Large Title",
    },
    {
      scale: "H2",
      size: "32",
      weight: "Extrabold/Bold",
      lineHeight: "1.5",
      use: language === "ko" ? "중 타이틀" : "Medium Title",
    },
    {
      scale: "H3",
      size: "28",
      weight: "Extrabold/Bold",
      lineHeight: "1.5",
      use: language === "ko" ? "소 타이틀" : "Small Title",
    },
    {
      scale: "H3",
      size: "24",
      weight: "Extrabold/Bold",
      lineHeight: "1.5",
      use: language === "ko" ? "소 타이틀" : "Small Title",
    },
    {
      scale: "H3",
      size: "20",
      weight: "Extrabold/Bold",
      lineHeight: "1.5",
      use: language === "ko" ? "소 타이틀" : "Small Title",
    },
    {
      scale: "H4",
      size: "18",
      weight: "Extrabold/Bold/Semibold/Medium/Regular",
      lineHeight: "1.5",
      use: language === "ko" ? "소 타이틀" : "Small Title",
    },
    {
      scale: "Body1",
      size: "16",
      weight: "Semibold/Medium/Regular",
      lineHeight: "1.7",
      use: language === "ko" ? "본문" : "Body",
    },
    {
      scale: "Body2",
      size: "14",
      weight: "Semibold/Medium/Regular",
      lineHeight: "1.5",
      use: language === "ko" ? "본문" : "Body",
    },
    {
      scale: "Caption",
      size: "12",
      weight: "Medium/Regular",
      lineHeight: "1.5",
      use: language === "ko" ? "하소 본문" : "Caption",
    },
  ];

  return (
    <div className="min-h-screen bg-[#2A2A2A]">
      {/* Header */}
      <div className="py-8 px-4 sm:px-8 xl:px-[62px]">
        <div className="max-w-[1156px] mx-auto">
          <button
            onClick={() => navigate("home")}
            className="flex items-center gap-2 text-[#999999] hover:text-[#0079FF] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-8 xl:px-[62px] pb-24">
        <div className="max-w-[1156px] mx-auto">
          {/* Slogan & Design Concept Border Box */}
          <div className="p-8 sm:p-12 mb-16">
            {/* Slogan & Design Concept */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 pb-12 border-b border-dashed border-[#0079FF]/30">
              <div>
                <p className="text-[#0079FF] text-sm mb-4">
                  Slogan
                </p>
                <h2
                  className="text-white text-[38px] font-semibold"
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                  }}
                >
                  Turn{" "}
                  <span className="text-[#0079FF]">
                    Your Potential
                  </span>
                  <br />
                  Into Reality!
                </h2>
              </div>
              <div>
                <p className="text-[#0079FF] text-sm mb-4">
                  Design Concept
                </p>
                <h3 className="text-white mb-4">
                  사용자 친화적이고 직관적인 UI
                </h3>
                <p className="text-[#999999] text-sm leading-relaxed">
                  포텐랩은 사용자 친화적인 감성적인 인터페이스를
                  지향합니다.
                  <br />
                  또한, 사용자들이 느끼는 추구되기 위해
                  노력하겠습니다.
                </p>
              </div>
            </div>

            {/* Color & Typography */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-12 border-b border-dashed border-[#0079FF]/30">
              {/* Color Section */}
              <div>
                <p className="text-[#0079FF] text-sm mb-6">
                  Color
                </p>

                {/* Primary Color */}
                <div className="mb-6">
                  <div className="w-full h-32 bg-[#0079FF] mb-2 flex items-end p-4">
                    <div className="text-white">
                      <p className="text-sm opacity-80">
                        Primary
                      </p>
                      <p className="font-medium text-[rgb(255,255,255)]">
                        #max : #0079FF
                      </p>
                    </div>
                  </div>
                </div>

                {/* Gray Scale */}
                <div className="mb-6">
                  <p className="text-white text-sm mb-3">
                    Gray Scale
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                    <div className="h-20 bg-white"></div>
                    <div className="h-20 bg-[#F5F5F5]"></div>
                    <div className="h-20 bg-[#E5E5E5]"></div>
                    <div className="h-20 bg-[#CCCCCC]"></div>
                    <div className="h-20 bg-[#B3B3B3]"></div>
                    <div className="h-20 bg-[#999999]"></div>
                    <div className="h-20 bg-[#808080]"></div>
                    <div className="h-20 bg-[#666666]"></div>
                    <div className="h-20 bg-[#4D4D4D]"></div>
                    <div className="h-20 bg-[#1A1A1A]"></div>
                  </div>
                </div>

                {/* Semantic Colors */}
                <div className="flex gap-2">
                  <div className="flex-1 h-16 bg-[#00C853] rounded flex items-center justify-center">
                    <span className="text-white text-xs">
                      Success
                    </span>
                  </div>
                  <div className="flex-1 h-16 bg-[#FFB300] rounded flex items-center justify-center">
                    <span className="text-white text-xs">
                      Caution
                    </span>
                  </div>
                  <div className="flex-1 h-16 bg-[#FF5252] rounded flex items-center justify-center">
                    <span className="text-white text-xs">
                      Error
                    </span>
                  </div>
                </div>
              </div>

              {/* Typography Section */}
              <div>
                <p className="text-[#0079FF] text-sm mb-6">
                  Typo
                </p>

                <div className="bg-[#1A1A1A] rounded-lg overflow-hidden">
                  {/* Typography Header */}
                  <div className="border-b border-[#0079FF]">
                    <div className="grid grid-cols-12 gap-2 px-4 py-3 text-white text-xs">
                      <div className="col-span-2">
                        Pretendard
                      </div>
                      <div className="col-span-2"></div>
                      <div className="col-span-4"></div>
                      <div className="col-span-2"></div>
                      <div className="col-span-2"></div>
                    </div>
                    <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-[#0079FF]/10 text-[#0079FF] text-xs">
                      <div className="col-span-2">
                        Scale Category
                      </div>
                      <div className="col-span-2">
                        Information
                      </div>
                      <div className="col-span-4"></div>
                      <div className="col-span-2">
                        Line-Height
                      </div>
                      <div className="col-span-2">Use</div>
                    </div>
                  </div>

                  {/* Typography Rows */}
                  <div className="divide-y divide-[#333333]">
                    {typographyData.map((item, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-12 gap-2 px-4 py-3 text-white text-xs items-center"
                      >
                        <div className="col-span-2">
                          {item.scale}
                        </div>
                        <div className="col-span-6 text-[#999999]">
                          {item.size}: {item.weight}
                        </div>
                        <div className="col-span-2">
                          {item.lineHeight}
                        </div>
                        <div className="col-span-2">
                          {item.use}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Spacing & Border Radius */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
              {/* Spacing */}
              <div>
                <p className="text-[#0079FF] text-sm mb-6">
                  Spacing System
                </p>
                <p className="text-white mb-4">
                  8px 기반 간격 시스템
                </p>
                <div className="grid grid-cols-4 gap-3">
                  {[8, 16, 24, 32, 40, 48, 56, 64].map(
                    (size) => (
                      <div
                        key={size}
                        className="flex flex-col items-center gap-2"
                      >
                        <div
                          className="bg-[#0079FF]"
                          style={{
                            width: `${Math.min(size, 48)}px`,
                            height: `${Math.min(size, 48)}px`,
                          }}
                        ></div>
                        <p className="text-[#999999] text-xs">
                          {size}px
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Border Radius */}
              <div>
                <p className="text-[#0079FF] text-sm mb-6">
                  Border Radius
                </p>
                <p className="text-white mb-4">
                  12px 라운드 컴포넌트
                </p>
                <div className="space-y-3">
                  <div className="h-12 bg-[#0079FF]/20 border border-[#0079FF] rounded-xl flex items-center justify-center">
                    <span className="text-[#0079FF] text-sm">
                      12px Radius
                    </span>
                  </div>
                  <div className="h-12 bg-[#0079FF]/20 border border-[#0079FF] rounded-2xl flex items-center justify-center">
                    <span className="text-[#0079FF] text-sm">
                      16px Radius
                    </span>
                  </div>
                  <div className="h-12 bg-[#0079FF]/20 border border-[#0079FF] rounded-3xl flex items-center justify-center">
                    <span className="text-[#0079FF] text-sm">
                      24px Radius
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Button Examples */}
          <div>
            <h3 className="text-white mb-8">
              Buttons (48px height)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button className="h-12 px-8 bg-[#0079FF] text-white rounded-xl hover:bg-[#0066DD] transition-colors">
                Primary Button
              </button>
              <button className="h-12 px-8 border-2 border-[#0079FF] text-[#0079FF] rounded-xl hover:bg-[#0079FF]/10 transition-colors">
                Secondary Button
              </button>
              <button className="h-12 px-8 bg-[#666666] text-white rounded-xl hover:bg-[#555555] transition-colors">
                Tertiary Button
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}