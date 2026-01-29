import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { useRouter } from "../contexts/RouterContext";
import {
  CheckCircle,
  AlertCircle,
  TrendingUp,
  XCircle,
  FileText,
  MessageSquare,
  Rocket,
  Quote,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export function BusinessPlanPage() {
  const { language } = useLanguage();
  const { navigate } = useRouter();

  const content = {
    ko: {
      hero: {
        label: "사업계획서 스토리텔링",
        badge: "Poten Booster",
        title: "요즘 지원사업은",
        titleHighlight: "'약속'이 아닌 '증거'를 봅니다",
        description:
          "\"우리 팀은 이렇게 할 겁니다\"라는 미래의 약속 대신,\n\"우리 팀은 이미 이렇게 했습니다\"라는 과거의 증거가 합격을 결정합니다.",
        cta: "무료 상담 신청하기",
      },
      insight: {
        quote: "100개의 화려한 계획서보다\n1개의 증명된 실적이 더 강력합니다.",
        author: "포텐랩 대표, $400K 투자 유치 경험",
        description:
          "지원사업 심사위원은 하루에 수십 개의 사업계획서를 봅니다. 그들이 찾는 건 '좋은 아이디어'가 아니라 '실행할 수 있는 팀'의 증거입니다.",
      },
      problem: {
        title: "이런 고민, 혹시 당신의 이야기인가요?",
        checks: [
          "아이디어는 좋은데, 사업계획서를 어떻게 써야 할지 막막합니다.",
          "열심히 썼는데 매번 탈락... 뭐가 문제인지 모르겠습니다.",
          "\"시장 검증 데이터가 부족합니다\"라는 피드백만 반복됩니다.",
        ],
      },
      truth: {
        label: "Harsh Truth",
        title: "불편한 진실을 말씀드릴게요",
        items: [
          {
            wrong: "\"AI 기술을 활용할 예정입니다\"",
            right: "\"AI 프로토타입으로 CTR 3.5%를 검증했습니다\"",
          },
          {
            wrong: "\"고객이 좋아할 것입니다\"",
            right: "\"3일 광고로 100명의 잠재고객을 확보했습니다\"",
          },
          {
            wrong: "\"시장 규모가 1조입니다\"",
            right: "\"우리 타겟 고객 500명에게 직접 검증했습니다\"",
          },
        ],
        conclusion:
          "왼쪽은 탈락하는 사업계획서, 오른쪽은 합격하는 사업계획서입니다.\n차이는 '말'이 아닌 '증거'입니다.",
      },
      packages: {
        label: "Packages",
        title: "당신의 상황에 맞는 선택",
        description:
          "모든 패키지는 $400K 투자 유치에 성공한 포텐랩의 논리 구조를 담고 있습니다.",
        items: [
          {
            name: "Light",
            subtitle: "스스로 합격하는 법",
            price: "39만원",
            target: "아이디어는 확실하지만\n글쓰기가 막막한 초보자",
            features: [
              "포텐랩 전용 VOD 클래스",
              "합격 사업계획서 템플릿",
              "섹션별 작성 가이드",
              "실제 합격 사례 분석",
            ],
            cta: "시작하기",
            highlight: false,
          },
          {
            name: "Deep",
            subtitle: "선배의 시선 더하기",
            price: "79만원",
            target: "작성은 했는데\n전문가의 '한 끗'이 필요한 분",
            features: [
              "Light 패키지 전체 포함",
              "사업계획서 정밀 코칭 1회 (60분)",
              "심사위원 관점 피드백",
              "스토리라인 최적화",
            ],
            cta: "선택하기",
            highlight: true,
            badge: "가장 인기",
          },
          {
            name: "Pro",
            subtitle: "증거 있는 비즈니스",
            price: "300만원",
            target: "압도적인 차별점으로\n합격과 투자를 확정 짓고 싶은 팀",
            features: [
              "Deep 패키지 전체 포함",
              "포텐랩 MVP 개발 연계",
              "실제 시장 검증 데이터 확보",
              "투자 유치 로직 이식",
            ],
            cta: "문의하기",
            highlight: false,
            premium: true,
          },
        ],
        note: "💡 Pro 패키지로 MVP까지 확보하면, 합격률은 물론 후속 투자 유치 가능성까지 높아집니다.",
      },
      comparison: {
        label: "Why Pro?",
        title: "왜 300만원이 가장 저렴한 선택일까요?",
        description:
          "단순 비용이 아닌, 기회비용으로 생각해보세요.",
        items: [
          {
            scenario: "Light로 직접 작성 → 탈락",
            cost: "39만원 + 6개월의 시간 낭비",
            result: "다음 기회까지 또 6개월 대기",
          },
          {
            scenario: "Deep으로 피드백 → 탈락",
            cost: "79만원 + 증거 부족으로 재탈락 반복",
            result: "\"검증 데이터가 부족합니다\" 피드백 반복",
          },
          {
            scenario: "Pro로 MVP + 검증 데이터 확보",
            cost: "300만원 = 합격 + 투자 유치 기반",
            result: "다음 라운드 투자자 미팅까지 연결",
          },
        ],
        conclusion:
          "3번 탈락하면 이미 200만원 이상의 기회비용.\n처음부터 증거를 만드는 게 가장 빠른 길입니다.",
      },
      process: {
        label: "Process",
        title: "Pro 패키지는 이렇게 진행됩니다",
        steps: [
          {
            number: "01",
            title: "사업 진단",
            description: "현재 아이디어의 강점과 약점을 파악하고,\n심사위원이 볼 '증거 포인트'를 설계합니다.",
          },
          {
            number: "02",
            title: "MVP 설계",
            description: "3일 내 제작 가능한 핵심 기능만 추려\n검증 가능한 프로토타입을 설계합니다.",
          },
          {
            number: "03",
            title: "개발 & 검증",
            description: "실제 동작하는 MVP를 만들고,\n메타 광고로 시장 반응을 측정합니다.",
          },
          {
            number: "04",
            title: "사업계획서 완성",
            description: "검증된 데이터를 바탕으로\n심사위원이 거절할 수 없는 스토리를 완성합니다.",
          },
        ],
      },
      cta: {
        title: "더 이상 '약속'으로 승부하지 마세요.\n'증거'로 합격하세요.",
        button: "무료 상담 신청하기",
      },
    },
    en: {
      hero: {
        label: "Business Plan Storytelling",
        badge: "Poten Booster",
        title: "Today's Grant Programs Want",
        titleHighlight: "'Evidence', Not 'Promises'",
        description:
          "Instead of promises like \"We will do this\",\nevidence like \"We have already done this\" determines success.",
        cta: "Request Free Consultation",
      },
      insight: {
        quote: "One proven result is more powerful\nthan 100 elaborate plans.",
        author: "Potenlab CEO, $400K Investment Experience",
        description:
          "Grant reviewers see dozens of business plans daily. They're not looking for 'good ideas' but evidence of 'a team that can execute'.",
      },
      problem: {
        title: "Does this sound like you?",
        checks: [
          "Great idea, but no clue how to write a business plan.",
          "Keep getting rejected... not sure what's wrong.",
          "Keep hearing \"insufficient market validation data\" feedback.",
        ],
      },
      truth: {
        label: "Harsh Truth",
        title: "Let me tell you an uncomfortable truth",
        items: [
          {
            wrong: "\"We plan to use AI technology\"",
            right: "\"We validated 3.5% CTR with our AI prototype\"",
          },
          {
            wrong: "\"Customers will love it\"",
            right: "\"We acquired 100 leads with 3-day ads\"",
          },
          {
            wrong: "\"The market size is $1 trillion\"",
            right: "\"We validated with 500 target customers directly\"",
          },
        ],
        conclusion:
          "Left side gets rejected. Right side gets approved.\nThe difference is 'evidence', not 'words'.",
      },
      packages: {
        label: "Packages",
        title: "Choose What Fits Your Situation",
        description:
          "All packages contain the logic structure that helped Potenlab raise $400K.",
        items: [
          {
            name: "Light",
            subtitle: "Learn to Win Yourself",
            price: "$390",
            target: "Have a solid idea but\ndon't know how to write",
            features: [
              "Potenlab exclusive VOD class",
              "Winning business plan template",
              "Section-by-section guide",
              "Real approval case studies",
            ],
            cta: "Get Started",
            highlight: false,
          },
          {
            name: "Deep",
            subtitle: "Add Expert Perspective",
            price: "$790",
            target: "Written but need\nexpert's finishing touch",
            features: [
              "Full Light package included",
              "1-on-1 coaching session (60min)",
              "Reviewer perspective feedback",
              "Storyline optimization",
            ],
            cta: "Select",
            highlight: true,
            badge: "Most Popular",
          },
          {
            name: "Pro",
            subtitle: "Business with Evidence",
            price: "$3,000",
            target: "Want to secure approval\nand investment with proof",
            features: [
              "Full Deep package included",
              "Potenlab MVP development",
              "Real market validation data",
              "Investment pitch logic transfer",
            ],
            cta: "Inquire",
            highlight: false,
            premium: true,
          },
        ],
        note: "💡 With Pro package's MVP, you increase not just approval rates but also follow-up investment potential.",
      },
      comparison: {
        label: "Why Pro?",
        title: "Why is $3,000 the cheapest option?",
        description:
          "Think in terms of opportunity cost, not just price.",
        items: [
          {
            scenario: "Light DIY → Rejected",
            cost: "$390 + 6 months wasted",
            result: "Wait another 6 months for next opportunity",
          },
          {
            scenario: "Deep with feedback → Rejected",
            cost: "$790 + repeated rejections due to lack of evidence",
            result: "\"Insufficient validation data\" feedback repeats",
          },
          {
            scenario: "Pro with MVP + validation data",
            cost: "$3,000 = Approval + investment foundation",
            result: "Connect to investor meetings for next round",
          },
        ],
        conclusion:
          "3 rejections already cost over $2,000 in opportunity cost.\nBuilding evidence from the start is the fastest path.",
      },
      process: {
        label: "Process",
        title: "How Pro Package Works",
        steps: [
          {
            number: "01",
            title: "Business Diagnosis",
            description: "Identify strengths and weaknesses,\ndesign 'evidence points' for reviewers.",
          },
          {
            number: "02",
            title: "MVP Design",
            description: "Extract core features buildable in 3 days\nfor a testable prototype.",
          },
          {
            number: "03",
            title: "Build & Validate",
            description: "Create working MVP and\nmeasure market response with Meta ads.",
          },
          {
            number: "04",
            title: "Complete Business Plan",
            description: "Based on validated data,\ncreate a story reviewers can't refuse.",
          },
        ],
      },
      cta: {
        title: "Stop competing with 'promises'.\nWin with 'evidence'.",
        button: "Request Free Consultation",
      },
    },
  };

  const t = content[language as keyof typeof content];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="pt-[120px] pb-24 px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-white">
        <div className="max-w-[1156px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="inline-block text-[#0079FF] px-3 py-1 rounded-full text-[13px] font-medium border border-[#0079FF]/20 bg-[#0079FF]/5">
                {t.hero.badge}
              </span>
              <span className="inline-block text-[#475569] px-3 py-1 rounded-full text-[13px] font-medium border border-[#475569]/20 bg-white">
                📝 {t.hero.label}
              </span>
            </div>
            <h1 className="md:text-[48px] font-bold mb-2 text-[#0E1116] text-[40px] m-[0px]">
              {t.hero.title}
            </h1>
            <h2 className="text-[32px] md:text-[40px] font-bold mb-6 text-[#0E1116]">
              {t.hero.titleHighlight}
            </h2>
            <p className="text-[16px] md:text-[18px] leading-relaxed mb-10 text-[#64748B] max-w-[700px] mx-auto whitespace-pre-line">
              {t.hero.description}
            </p>
            <button
              onClick={() => navigate("contact")}
              className="bg-[#0E1116] text-white px-8 h-12 rounded-xl hover:bg-[#1E293B] transition-colors font-semibold text-[16px] inline-flex items-center gap-2 shadow-lg"
            >
              {t.hero.cta}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Insight Quote Section */}
      <section className="py-16 px-8 bg-[#0E1116]">
        <div className="max-w-[900px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Quote className="w-10 h-10 text-[#0079FF] mx-auto mb-6" />
            <p className="text-[24px] md:text-[28px] font-bold text-white leading-relaxed mb-6 whitespace-pre-line">
              {t.insight.quote}
            </p>
            <p className="text-[14px] text-[#94A3B8] mb-6">
              — {t.insight.author}
            </p>
            <p className="text-[16px] text-[#CBD5E1] leading-relaxed max-w-[600px] mx-auto">
              {t.insight.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-[1156px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[28px] md:text-[32px] font-bold mb-12 text-center text-[#0E1116]">
              {t.problem.title}
            </h2>
            <div className="space-y-4 max-w-[800px] mx-auto">
              {t.problem.checks.map((check, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-[#FEF2F2] p-5 rounded-xl border border-[#FECACA]"
                >
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-5 h-5 text-[#EF4444] flex-shrink-0 mt-0.5" />
                    <p className="text-[15px] leading-relaxed text-[#7F1D1D]">
                      {check}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Harsh Truth Section */}
      <section className="py-24 px-8 bg-[#F8FAFC]">
        <div className="max-w-[1156px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p
              className="text-[14px] font-semibold text-[#EF4444] mb-3"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              {t.truth.label}
            </p>
            <h2 className="text-[32px] md:text-[36px] font-bold text-[#0E1116]">
              {t.truth.title}
            </h2>
          </motion.div>

          <div className="max-w-[900px] mx-auto space-y-4 mb-10">
            {t.truth.items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="grid md:grid-cols-2 gap-4"
              >
                <div className="bg-white p-5 rounded-xl border border-[#FCA5A5] flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-[#EF4444] flex-shrink-0" />
                  <p className="text-[15px] text-[#7F1D1D] line-through decoration-[#EF4444]/50">
                    {item.wrong}
                  </p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-[#86EFAC] flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#22C55E] flex-shrink-0" />
                  <p className="text-[15px] text-[#14532D] font-medium">
                    {item.right}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center text-[15px] text-[#64748B] whitespace-pre-line max-w-[600px] mx-auto"
          >
            {t.truth.conclusion}
          </motion.p>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-[1156px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p
              className="text-[14px] font-semibold text-[#0079FF] mb-3"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              {t.packages.label}
            </p>
            <h2 className="text-[32px] md:text-[36px] font-bold text-[#0E1116] mb-4">
              {t.packages.title}
            </h2>
            <p className="text-[15px] text-[#64748B] max-w-[600px] mx-auto">
              {t.packages.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {t.packages.items.map((pkg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative p-8 rounded-2xl transition-all ${
                  pkg.premium
                    ? "border-2 border-[#0079FF]"
                    : pkg.highlight
                    ? "bg-white border-2 border-[#0079FF] shadow-xl"
                    : "bg-white border-2 border-[#E2E8F0]"
                }`}
                style={pkg.premium ? { background: 'linear-gradient(to bottom right, #0E1116, #1E293B)' } : undefined}
              >
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-[#0079FF] text-white px-4 py-1.5 rounded-full text-[12px] font-semibold">
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <p
                    className={`text-[13px] font-semibold mb-2 ${
                      pkg.premium ? "text-[#0079FF]" : "text-[#0079FF]"
                    }`}
                    style={{ fontFamily: "'Clash Display', sans-serif" }}
                  >
                    {pkg.name}
                  </p>
                  <h3
                    className="text-[20px] font-bold mb-4"
                    style={{ color: pkg.premium ? '#FFFFFF' : '#0E1116' }}
                  >
                    {pkg.subtitle}
                  </h3>
                  <p
                    className="text-[36px] font-bold mb-4"
                    style={{ color: pkg.premium ? '#FFFFFF' : '#0E1116' }}
                  >
                    {pkg.price}
                  </p>
                  <p
                    className="text-[14px] whitespace-pre-line leading-relaxed"
                    style={{ color: pkg.premium ? '#94A3B8' : '#64748B' }}
                  >
                    {pkg.target}
                  </p>
                </div>

                <div className={`border-t border-dashed mb-6 pt-6 ${pkg.premium ? 'border-[#334155]' : 'border-[#E2E8F0]'}`}>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <CheckCircle
                          className="w-5 h-5 flex-shrink-0 mt-0.5"
                          style={{ color: pkg.premium ? '#0079FF' : '#22C55E' }}
                        />
                        <span
                          className="text-[14px]"
                          style={{ color: pkg.premium ? '#CBD5E1' : '#475569' }}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => navigate("contact")}
                  className={`w-full h-12 rounded-xl font-semibold text-[15px] transition-all ${
                    pkg.premium
                      ? "bg-[#0079FF] text-white hover:bg-[#0066DD]"
                      : pkg.highlight
                      ? "bg-[#0079FF] text-white hover:bg-[#0066DD]"
                      : "bg-white text-[#0079FF] border-2 border-[#0079FF] hover:bg-[#F0F9FF]"
                  }`}
                >
                  {pkg.cta}
                </button>

                {pkg.premium && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-[13px] text-[#94A3B8]">
                    <Sparkles className="w-4 h-4" />
                    <span>MVP 개발 포함</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-[14px] text-[#64748B] bg-[#F8FAFC] py-4 px-6 rounded-xl max-w-[700px] mx-auto"
          >
            {t.packages.note}
          </motion.p>
        </div>
      </section>

      {/* Why Pro Section */}
      <section className="py-24 px-8 bg-[#F8FAFC]">
        <div className="max-w-[1156px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p
              className="text-[14px] font-semibold text-[#0079FF] mb-3"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              {t.comparison.label}
            </p>
            <h2 className="text-[32px] md:text-[36px] font-bold text-[#0E1116] mb-4">
              {t.comparison.title}
            </h2>
            <p className="text-[15px] text-[#64748B]">
              {t.comparison.description}
            </p>
          </motion.div>

          <div className="max-w-[900px] mx-auto space-y-4 mb-10">
            {t.comparison.items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-6 rounded-xl ${
                  idx === 2
                    ? "bg-gradient-to-r from-[#0079FF]/10 to-[#22C55E]/10 border-2 border-[#0079FF]"
                    : "bg-white border border-[#E2E8F0]"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <p
                      className={`text-[16px] font-bold mb-1 ${
                        idx === 2 ? "text-[#0079FF]" : "text-[#0E1116]"
                      }`}
                    >
                      {item.scenario}
                    </p>
                    <p className="text-[14px] text-[#64748B]">{item.cost}</p>
                  </div>
                  <ArrowRight
                    className={`w-5 h-5 hidden md:block ${
                      idx === 2 ? "text-[#0079FF]" : "text-[#CBD5E1]"
                    }`}
                  />
                  <div
                    className={`px-4 py-2 rounded-lg text-[14px] ${
                      idx === 2
                        ? "bg-[#22C55E] text-white font-medium"
                        : "bg-[#FEF2F2] text-[#991B1B]"
                    }`}
                  >
                    {item.result}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-[15px] text-[#475569] font-medium whitespace-pre-line"
          >
            {t.comparison.conclusion}
          </motion.p>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-[1156px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p
              className="text-[14px] font-semibold text-[#0079FF] mb-3"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              {t.process.label}
            </p>
            <h2 className="text-[32px] md:text-[36px] font-bold text-[#0E1116]">
              {t.process.title}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {t.process.steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative"
              >
                <div className="bg-[#F8FAFC] p-6 rounded-xl border border-[#E2E8F0] h-full">
                  <div className="w-12 h-12 bg-[#0079FF] rounded-xl flex items-center justify-center mb-4">
                    <span className="text-white text-[18px] font-bold">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-[18px] font-bold text-[#0E1116] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[14px] text-[#64748B] leading-relaxed whitespace-pre-line">
                    {step.description}
                  </p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-[#CBD5E1]" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 bg-[#0E1116]">
        <div className="max-w-[800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-[32px] md:text-[40px] font-bold mb-10 leading-relaxed text-white whitespace-pre-line">
              {t.cta.title}
            </h2>
            <button
              onClick={() => navigate("contact")}
              className="bg-[#0079FF] text-white px-8 h-12 rounded-xl hover:bg-[#0066DD] transition-colors font-semibold text-[16px]"
            >
              {t.cta.button}
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
