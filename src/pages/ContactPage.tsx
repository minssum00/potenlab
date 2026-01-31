import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Send, Rocket, Code, Palette, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { useRouter } from "../contexts/RouterContext";
import {
  projectId,
  publicAnonKey,
} from "../utils/supabase/info";
import { toast } from "sonner@2.0.3";

export function ContactPage() {
  const { t, language } = useLanguage();
  const { getRouteParams } = useRouter();
  const [loading, setLoading] = useState(false);

  // Get initial values from route params
  const routeParams = getRouteParams();
  const initialInquiryType = routeParams?.inquiryType || "potenbooster";
  const initialSubCategory = routeParams?.subCategory || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: initialInquiryType,
    subCategory: initialSubCategory,
    message: "",
  });

  // Update form when route params change
  useEffect(() => {
    const params = getRouteParams();
    if (params?.inquiryType) {
      setFormData(prev => ({
        ...prev,
        inquiryType: params.inquiryType,
        subCategory: params.subCategory || "",
      }));
    }
  }, []);

  // Texts for auto-translation
  const [texts, setTexts] = useState({
    title_ko: "내 아이디어를 현실로 만들고 싶다면?",
    title_en: "Want to Turn Your Idea into Reality?",
    subtitle_ko: "아이디어 단계부터 출시까지 전 단계를 함께 진행합니다.",
    subtitle_en: "We support you through every step from idea to launch.",
  });

  // Auto-translate on mount
  useEffect(() => {
    const translateTexts = async () => {
      try {
        // Translate title
        const titleResponse = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/translate`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`
            },
            body: JSON.stringify({
              text: texts.title_ko,
              sourceLang: 'ko',
              targetLang: 'en'
            })
          }
        );

        // Translate subtitle
        const subtitleResponse = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/translate`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`
            },
            body: JSON.stringify({
              text: texts.subtitle_ko,
              sourceLang: 'ko',
              targetLang: 'en'
            })
          }
        );

        if (titleResponse.ok && subtitleResponse.ok) {
          const titleData = await titleResponse.json();
          const subtitleData = await subtitleResponse.json();
          
          setTexts(prev => ({
            ...prev,
            title_en: titleData.translatedText,
            subtitle_en: subtitleData.translatedText,
          }));
        }
      } catch (error) {
        console.error('Translation error:', error);
      }
    };

    translateTexts();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/inquiries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            inquiryType: formData.inquiryType,
            subCategory: formData.subCategory,
            message: formData.message,
            status: "new",
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Failed to submit inquiry",
        );
      }

      console.log("Inquiry submitted successfully:", result);

      toast.success(
        language === "ko"
          ? "문의가 성공적으로 접수되었습니다!"
          : "Your inquiry has been submitted successfully!",
      );

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        inquiryType: "potenbooster",
        subCategory: "standard",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      toast.error(
        language === "ko"
          ? "문의 접수 중 오류가 발생했습니다."
          : "An error occurred while submitting your inquiry.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-[72px]">
        {/* Hero Section */}
        <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-[62px] bg-white">
          <div className="max-w-[1156px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p
                className="text-[#0079FF] text-[16px] sm:text-[18px] lg:text-[20px] font-semibold mb-2"
                style={{
                  fontFamily: "Clash Display, sans-serif",
                  fontWeight: 600,
                }}
              >
                Contact
              </p>
              <h1 className="text-[24px] sm:text-[30px] lg:text-[36px] font-bold mb-2 sm:mb-3 break-keep px-2">
                {language === "ko"
                  ? texts.title_ko
                  : texts.title_en}
              </h1>
              <p className="text-[14px] sm:text-[15px] lg:text-[16px] text-[#666] mb-8 sm:mb-12 lg:mb-16 px-2">
                {language === "ko"
                  ? texts.subtitle_ko
                  : texts.subtitle_en}
              </p>
            </motion.div>

            <div className="max-w-[800px] mx-auto">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <form
                  onSubmit={handleSubmit}
                  className="p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-white border border-[#E5E5E5] shadow-lg space-y-4 sm:space-y-5 lg:space-y-6"
                >
                  {/* Inquiry Type Cards */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-left">
                      {language === "ko" ? "문의종류" : "Inquiry Type"} *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {/* 포텐부스터 Card */}
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, inquiryType: "potenbooster", subCategory: "" })}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                          formData.inquiryType === "potenbooster"
                            ? "border-[#0079FF] bg-[#F0F8FF] shadow-md"
                            : "border-[#E5E5E5] hover:border-[#0079FF]/50 hover:bg-[#F8FAFC]"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          formData.inquiryType === "potenbooster" ? "bg-[#0079FF]" : "bg-[#F0F4F8]"
                        }`}>
                          <Rocket className={`w-5 h-5 ${formData.inquiryType === "potenbooster" ? "text-white" : "text-[#64748B]"}`} />
                        </div>
                        <span className={`text-[12px] font-semibold text-center ${formData.inquiryType === "potenbooster" ? "text-[#0079FF]" : "text-[#424242]"}`}>
                          {language === "ko" ? "포텐부스터" : "Poten Booster"}
                        </span>
                      </button>

                      {/* 커스텀 프로젝트 개발 Card */}
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, inquiryType: "project", subCategory: "" })}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                          formData.inquiryType === "project"
                            ? "border-[#0079FF] bg-[#F0F8FF] shadow-md"
                            : "border-[#E5E5E5] hover:border-[#0079FF]/50 hover:bg-[#F8FAFC]"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          formData.inquiryType === "project" ? "bg-[#0079FF]" : "bg-[#F0F4F8]"
                        }`}>
                          <Code className={`w-5 h-5 ${formData.inquiryType === "project" ? "text-white" : "text-[#64748B]"}`} />
                        </div>
                        <span className={`text-[12px] font-semibold text-center ${formData.inquiryType === "project" ? "text-[#0079FF]" : "text-[#424242]"}`}>
                          {language === "ko" ? "커스텀 개발" : "Custom Build"}
                        </span>
                      </button>

                      {/* 디자인 & 컨설팅 Card */}
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, inquiryType: "design", subCategory: "" })}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                          formData.inquiryType === "design"
                            ? "border-[#0079FF] bg-[#F0F8FF] shadow-md"
                            : "border-[#E5E5E5] hover:border-[#0079FF]/50 hover:bg-[#F8FAFC]"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          formData.inquiryType === "design" ? "bg-[#0079FF]" : "bg-[#F0F4F8]"
                        }`}>
                          <Palette className={`w-5 h-5 ${formData.inquiryType === "design" ? "text-white" : "text-[#64748B]"}`} />
                        </div>
                        <span className={`text-[12px] font-semibold text-center ${formData.inquiryType === "design" ? "text-[#0079FF]" : "text-[#424242]"}`}>
                          {language === "ko" ? "디자인&컨설팅" : "Design & Strategy"}
                        </span>
                      </button>

                      {/* 포텐랩구독 Card */}
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, inquiryType: "subscription", subCategory: "" })}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                          formData.inquiryType === "subscription"
                            ? "border-[#0079FF] bg-[#F0F8FF] shadow-md"
                            : "border-[#E5E5E5] hover:border-[#0079FF]/50 hover:bg-[#F8FAFC]"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          formData.inquiryType === "subscription" ? "bg-[#0079FF]" : "bg-[#F0F4F8]"
                        }`}>
                          <MessageCircle className={`w-5 h-5 ${formData.inquiryType === "subscription" ? "text-white" : "text-[#64748B]"}`} />
                        </div>
                        <span className={`text-[12px] font-semibold text-center ${formData.inquiryType === "subscription" ? "text-[#0079FF]" : "text-[#424242]"}`}>
                          {language === "ko" ? "포텐랩구독" : "Subscription"}
                        </span>
                      </button>
                    </div>
                  </div>

                  {formData.inquiryType === "potenbooster" && (
                    <div className="space-y-2">
                      <label
                        htmlFor="subCategory"
                        className="block text-sm font-semibold text-left"
                      >
                        {language === "ko" ? "세부 유형" : "Sub Category"} *
                      </label>
                      <Select
                        value={formData.subCategory}
                        onValueChange={(value) =>
                          setFormData({ ...formData, subCategory: value })
                        }
                        required
                      >
                        <SelectTrigger className={`!h-12 rounded-xl border-2 focus:border-[#0079FF] transition-colors ${formData.subCategory ? 'border-[#0079FF] bg-[#F0F8FF]' : ''}`}>
                          <SelectValue
                            placeholder={
                              language === "ko"
                                ? "플랜을 선택해주세요"
                                : "Select a plan"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">
                            Basic - {language === "ko" ? "179만원" : "₩1,790,000"}
                          </SelectItem>
                          <SelectItem value="standard">
                            Standard - {language === "ko" ? "490만원" : "₩4,900,000"}
                          </SelectItem>
                          <SelectItem value="premium">
                            Premium - {language === "ko" ? "690만원" : "₩6,900,000"}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {formData.inquiryType === "project" && (
                    <div className="space-y-2">
                      <label
                        htmlFor="subCategory"
                        className="block text-sm font-semibold text-left"
                      >
                        {language === "ko" ? "세부 유형" : "Sub Category"} *
                      </label>
                      <Select
                        value={formData.subCategory}
                        onValueChange={(value) =>
                          setFormData({ ...formData, subCategory: value })
                        }
                        required
                      >
                        <SelectTrigger className={`!h-12 rounded-xl border-2 focus:border-[#0079FF] transition-colors ${formData.subCategory ? 'border-[#0079FF] bg-[#F0F8FF]' : ''}`}>
                          <SelectValue
                            placeholder={
                              language === "ko"
                                ? "프로젝트 유형을 선택해주세요"
                                : "Select project type"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mvp">
                            {language === "ko" ? "MVP 개발 - 시장 진입을 위한 핵심 기능 구현" : "MVP Development"}
                          </SelectItem>
                          <SelectItem value="product">
                            {language === "ko" ? "Product 개발 - 본격적인 스케일업 및 고도화 개발" : "Product Development"}
                          </SelectItem>
                          <SelectItem value="rnd">
                            {language === "ko" ? "R&D 개발 - 고난도 기술 구현 및 연구 중심 프로젝트" : "R&D Development"}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {formData.inquiryType === "design" && (
                    <div className="space-y-2">
                      <label
                        htmlFor="subCategory"
                        className="block text-sm font-semibold text-left"
                      >
                        {language === "ko" ? "세부 유형" : "Sub Category"} *
                      </label>
                      <Select
                        value={formData.subCategory}
                        onValueChange={(value) =>
                          setFormData({ ...formData, subCategory: value })
                        }
                        required
                      >
                        <SelectTrigger className={`!h-12 rounded-xl border-2 focus:border-[#0079FF] transition-colors ${formData.subCategory ? 'border-[#0079FF] bg-[#F0F8FF]' : ''}`}>
                          <SelectValue
                            placeholder={
                              language === "ko"
                                ? "세부 유형을 선택해주세요"
                                : "Select sub category"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="uxui">
                            {language === "ko" ? "UX/UI 디자인 - 사용자 경험 중심의 고퀄리티 인터페이스 설계" : "UX/UI Design"}
                          </SelectItem>
                          <SelectItem value="consulting">
                            {language === "ko" ? "IT/Biz 컨설팅 - 비즈니스 모델 진단 및 기술 로드맵 수립" : "IT/Biz Consulting"}
                          </SelectItem>
                          <SelectItem value="website">
                            {language === "ko" ? "브랜드 웹사이트 - 브랜드의 가치를 담은 최적화된 홈페이지 제작" : "Brand Website"}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {formData.inquiryType === "subscription" && (
                    <div className="space-y-2">
                      <label
                        htmlFor="subCategory"
                        className="block text-sm font-semibold text-left"
                      >
                        {language === "ko" ? "세부 유형" : "Sub Category"} *
                      </label>
                      <Select
                        value={formData.subCategory}
                        onValueChange={(value) =>
                          setFormData({ ...formData, subCategory: value })
                        }
                        required
                      >
                        <SelectTrigger className={`!h-12 rounded-xl border-2 focus:border-[#0079FF] transition-colors ${formData.subCategory ? 'border-[#0079FF] bg-[#F0F8FF]' : ''}`}>
                          <SelectValue
                            placeholder={
                              language === "ko"
                                ? "구독 유형을 선택해주세요"
                                : "Select subscription type"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="design-subscription">
                            {language === "ko" ? "디자인 구독 - 월간 디자인 서비스 이용" : "Design Subscription"}
                          </SelectItem>
                          <SelectItem value="dev-subscription">
                            {language === "ko" ? "개발팀 구독 - 월간 개발 리소스 이용" : "Dev Team Subscription"}
                          </SelectItem>
                          <SelectItem value="partnership">
                            {language === "ko" ? "파트너십 제안 - 협업 및 제휴 문의" : "Partnership Proposal"}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-left"
                    >
                      {t("contact.form.name")} *
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="홍길동"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="h-12 rounded-xl border-2 focus:border-[#0079FF] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-left"
                    >
                      {t("contact.form.email")} *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@company.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="h-12 rounded-xl border-2 focus:border-[#0079FF] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-left"
                    >
                      {t("contact.form.phone")} *
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="010-1234-5678"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="h-12 rounded-xl border-2 focus:border-[#0079FF] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-left"
                    >
                      {t("contact.form.message")} *
                    </label>
                    <Textarea
                      id="message"
                      placeholder="프로젝트에 대해 자유롭게 작성해주세요"
                      required
                      rows={9}
                      value={formData.message}
                      onChange={handleChange}
                      className="rounded-xl border-2 focus:border-[#0079FF] transition-colors resize-none min-h-0"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 rounded-2xl bg-[#0079FF] hover:bg-[#0060D1] text-white shadow-lg hover:shadow-xl transition-all group disabled:opacity-50"
                  >
                    <span>
                      {loading
                        ? language === "ko"
                          ? "전송 중..."
                          : "Sending..."
                        : t("contact.form.submit")}
                    </span>
                    <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <p className="text-xs text-[#666666] text-center leading-relaxed">
                    제출하신 정보는 안전하게 보관되며, 상담
                    목적으로만 사용됩니다.
                  </p>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}