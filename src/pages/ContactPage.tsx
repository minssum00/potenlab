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
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import {
  projectId,
  publicAnonKey,
} from "../utils/supabase/info";
import { toast } from "sonner@2.0.3";

export function ContactPage() {
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "potenbooster",
    subCategory: "standard",
    message: "",
  });

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
        <section className="py-24 px-4 sm:px-8 xl:px-[62px] bg-white">
          <div className="max-w-[1156px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p
                className="text-[#0079FF] text-[20px] font-semibold mb-2"
                style={{
                  fontFamily: "Clash Display, sans-serif",
                  fontWeight: 600,
                }}
              >
                Contact
              </p>
              <h1 className="text-[36px] font-bold mb-3">
                {language === "ko"
                  ? texts.title_ko
                  : texts.title_en}
              </h1>
              <p className="text-[16px] text-[#666] mb-16">
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
                  className="p-8 rounded-3xl bg-white border border-[#E5E5E5] shadow-lg space-y-6"
                >
                  <div className="space-y-2">
                    <label
                      htmlFor="inquiryType"
                      className="block text-sm font-semibold text-left"
                    >
                      {language === "ko" ? "문의종류" : "Inquiry Type"} *
                    </label>
                    <Select
                      value={formData.inquiryType}
                      onValueChange={(value) =>
                        setFormData({ ...formData, inquiryType: value, subCategory: "" })
                      }
                      required
                    >
                      <SelectTrigger className={`!h-12 rounded-xl border-2 focus:border-[#0079FF] transition-colors ${formData.inquiryType ? 'border-[#0079FF] bg-[#F0F8FF]' : ''}`}>
                        <SelectValue
                          placeholder={
                            language === "ko"
                              ? "문의종류를 선택해주세요"
                              : "Select inquiry type"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="potenbooster">
                          {language === "ko" ? "포텐부스터" : "Poten Booster"}
                        </SelectItem>
                        <SelectItem value="project">
                          {language === "ko" ? "프로젝트 개발" : "Project Development"}
                        </SelectItem>
                        <SelectItem value="other">
                          {language === "ko" ? "기타 문의" : "Other Inquiry"}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.inquiryType === "potenbooster" && (
                    <div className="space-y-2">
                      <label
                        htmlFor="subCategory"
                        className="block text-sm font-semibold text-left"
                      >
                        {language === "ko" ? "플랜 선택" : "Plan Selection"} *
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
                        {language === "ko" ? "프로젝트 유형" : "Project Type"} *
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
                          <SelectItem value="uxui">
                            {language === "ko" ? "UX/UI 디자인" : "UX/UI Design"}
                          </SelectItem>
                          <SelectItem value="mvp">
                            {language === "ko" ? "MVP 개발" : "MVP Development"}
                          </SelectItem>
                          <SelectItem value="custom">
                            {language === "ko" ? "커스텀 개발" : "Custom Development"}
                          </SelectItem>
                          <SelectItem value="rnd">
                            {language === "ko" ? "R&D 개발" : "R&D Development"}
                          </SelectItem>
                          <SelectItem value="website">
                            {language === "ko" ? "홈페이지 구축" : "Website Development"}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {formData.inquiryType === "other" && (
                    <div className="space-y-2">
                      <label
                        htmlFor="subCategory"
                        className="block text-sm font-semibold text-left"
                      >
                        {language === "ko" ? "문의 유형" : "Inquiry Type"} *
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
                                ? "문의 유형을 선택해주세요"
                                : "Select inquiry type"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consulting">
                            {language === "ko" ? "컨설팅" : "Consulting"}
                          </SelectItem>
                          <SelectItem value="partnership">
                            {language === "ko" ? "협업 제안" : "Partnership"}
                          </SelectItem>
                          <SelectItem value="etc">
                            {language === "ko" ? "기타" : "Other"}
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