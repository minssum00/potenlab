import { useLanguage } from "../contexts/LanguageContext";
import { useRouter } from "../contexts/RouterContext";
import { Lock } from "lucide-react";
import logo from "figma:asset/fb12526f71ffecd668efc4c83fbed0a7d682c986.png";

export function Footer() {
  const { t, language } = useLanguage();
  const { navigate, setSelectedServiceId } = useRouter();

  return (
    <footer className="py-12 sm:py-16 px-4 sm:px-8 xl:px-[62px] bg-[#1A1A1A] text-white">
      <div className="max-w-[1156px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 sm:gap-12 mb-8 sm:mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-3 sm:mb-4">
              <img
                src={logo}
                alt="Potenlab"
                className="w-[120px] h-auto brightness-0 invert"
                style={{ width: "120px" }}
              />
            </div>
            <p className="text-[#999999] text-xs sm:text-sm leading-relaxed">
              {language === "ko" ? (
                <>
                  비즈니스 성장의 파트너
                  <br />
                  Potenlab
                </>
              ) : (
                t("footer.description")
              )}
            </p>
          </div>

          <div>
            <h4 className="text-sm sm:text-base font-medium mb-3 sm:mb-4 text-white">
              {language === "ko" ? "핵심 서비스" : "Core Services"}
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <button
                  onClick={() => navigate("poten-booster")}
                  className="text-[#999999] hover:text-white transition-colors text-xs sm:text-sm"
                >
                  {language === "ko" ? "포텐 부스터" : "Poten Booster"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("custom-product")}
                  className="text-[#999999] hover:text-white transition-colors text-xs sm:text-sm"
                >
                  {language === "ko" ? "커스텀 프로덕트 개발" : "Custom Product Development"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedServiceId('it-consulting');
                    navigate("service");
                  }}
                  className="text-[#999999] hover:text-white transition-colors text-xs sm:text-sm"
                >
                  {language === "ko" ? "IT/Biz 기술 컨설팅" : "IT/Biz Strategic Consulting"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("services")}
                  className="text-[#999999] hover:text-white transition-colors text-xs sm:text-sm"
                >
                  {language === "ko" ? "서비스 의뢰" : "Request Service"}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm sm:text-base font-medium mb-3 sm:mb-4 text-white">
              {language === "ko" ? "운영 서비스" : "Operating Services"}
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <button
                  onClick={() => navigate("partner")}
                  className="text-[#999999] hover:text-white transition-colors text-xs sm:text-sm"
                >
                  {language === "ko" ? "포텐랩 구독 서비스" : "Poten Lab Subscription"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("poten-lamp")}
                  className="text-[#999999] hover:text-white transition-colors text-xs sm:text-sm"
                >
                  {language === "ko" ? "포텐의 램프 🧞" : "Poten-Lamp 🧞"}
                </button>
              </li>

              <li>
                <a
                  href="https://potenmakers.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#999999] hover:text-white transition-colors text-xs sm:text-sm"
                >
                  {language === "ko" ? "포텐메이커스" : "Poten Makers"}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm sm:text-base font-medium mb-3 sm:mb-4 text-white">
              {t("footer.company")}
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a
                  href="#about"
                  className="text-[#999999] hover:text-white transition-colors text-xs sm:text-sm"
                >
                  {language === "ko" ? "회사소개서" : "Company Profile"}
                </a>
              </li>
              <li>
                <button
                  onClick={() => navigate("style-guide")}
                  className="text-[#999999] hover:text-white transition-colors text-xs sm:text-sm"
                >
                  {t("footer.styleGuide")}
                </button>
              </li>
              {/* Contact link removed */}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="text-sm sm:text-base font-medium mb-3 sm:mb-4 text-white">
              {t("contact.info.title")}
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-[#999999] text-xs sm:text-sm">
              <li>contact@potenlab.dev</li>
              <li>
                서울특별시 마포구 <br /> 독막로 18길 12 , B1
              </li>
              <li>
                <a
                  href="http://pf.kakao.com/_mGQqxb/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#0079FF] transition-colors"
                >
                  실시간 상담
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-[#999999] text-xs sm:text-sm text-center md:text-left">
            {t("footer.rights")}
          </p>
          <div className="flex gap-4 sm:gap-8 text-xs sm:text-sm items-center">
            <button
              onClick={() => navigate("admin")}
              className="text-[#999999] hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Lock className="w-3 h-3" />
              <span>{t("footer.admin")}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}