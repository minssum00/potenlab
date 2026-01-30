import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { useRouter } from '../contexts/RouterContext';
import { Check, X, ArrowRight, Zap, Users, Target, Clock, MessageCircle } from 'lucide-react';

const content = {
  ko: {
    hero: {
      title: '채용하지 마세요,',
      titleHighlight: '포텐랩을 구독하세요.',
      subtitle: 'MVP부터 AI 고도화까지, 비즈니스 언어를 이해하는 기술 파트너',
      subtitle2: '포텐랩이 당신의 팀이 되어드립니다.',
      cta1: '파트너십 신청하기',
      cta2: '서비스 단가 확인'
    },
    difference: {
      title: '외주 에이전시와',
      titleHighlight: '포텐랩 파트너의 차이',
      subtitle: '단순 개발 대행이 아닌, 비즈니스 성장을 함께하는 기술 파트너입니다.',
      agency: '일반 에이전시',
      potenlab: '포텐랩 파트너',
      items: [
        {
          agency: '수동적 개발 수행',
          potenlab: '능동적 기술 제안',
          icon: Zap
        },
        {
          agency: '범위 내 기능 구현',
          potenlab: '비즈니스 성장 중심',
          icon: Target
        },
        {
          agency: '일회성 프로젝트',
          potenlab: '지속가능한 구독',
          icon: Clock
        },
        {
          agency: '메일/전화 소통',
          potenlab: '슬랙 실시간 협업',
          icon: MessageCircle
        }
      ]
    },
    subscription: {
      title: '구독형 서비스',
      titleHighlight: '가격 안내',
      subtitle: '인재 채용 비용의 절반으로, 전문 팀을 확보하세요.',
      serviceA: {
        badge: 'Design Subscription',
        title: '디자인 구독 서비스',
        price: '월 150만 원',
        priceNote: '부터 시작',
        features: [
          '아이디어 단계부터 와이어프레임 및 UI 디자인 제작',
          '전담 디자이너 배치',
          'UI/UX 자산 포함',
          '2영업일 내 1차 시안 제공',
          '유연한 디자인 수정 요청',
          '슬랙 실시간 피드백'
        ],
        comparison: '디자이너 1명 채용 시 월 500만 원 이상'
      },
      serviceB: {
        badge: 'Dev-as-a-Service',
        title: '개발팀 구독 서비스',
        price: '월 400만 원',
        priceNote: '부터 시작',
        features: [
          'CTO급 기술 컨설팅 포함',
          'AI 모델 도입 전략 수립',
          '전담 개발 슬롯 점유',
          '실시간 슬랙 소통',
          '주 단위 스프린트 리뷰',
          '기술 문서화 및 인수인계'
        ],
        comparison: '개발자 2명 채용 시 월 1,000만 원 이상'
      },
      cta: '맞춤 견적 받기'
    },
    checkpoint: {
      title: '문의 전',
      titleHighlight: '체크포인트',
      subtitle: '더 정확한 컨설팅을 위해 현재 상황을 체크해주세요.',
      items: [
        {
          question: '아이디어 단계인가요?',
          description: '기획 컨설팅부터 MVP 개발까지 전 과정을 지원합니다.',
          icon: '💡'
        },
        {
          question: '특정 데드라인이 있나요?',
          description: '출시 일정에 맞춰 최적의 개발 범위와 우선순위를 제안합니다.',
          icon: '⏰'
        },
        {
          question: '어떤 협업을 원하시나요?',
          description: '기능 구현만? 기술 전략 수립? 필요한 지원 범위를 명확히 해주세요.',
          icon: '🤝'
        },
        {
          question: '기존 개발팀이 있나요?',
          description: '내부 팀과의 협업 또는 완전한 아웃소싱, 모두 가능합니다.',
          icon: '👥'
        }
      ]
    },
    slogan: {
      main: 'MVP to AI,',
      highlight: 'Your Growth Partner.',
      description: '포텐랩은 당신의 비즈니스가 시장에서 성공할 때까지 함께 합니다.'
    }
  },
  en: {
    hero: {
      title: "Don't hire,",
      titleHighlight: 'Subscribe to Potenlab.',
      subtitle: 'From MVP to AI advancement, a tech partner who speaks business language',
      subtitle2: 'Potenlab becomes your team.',
      cta1: 'Partnership Inquiry',
      cta2: 'Check Pricing'
    },
    difference: {
      title: 'The Difference Between',
      titleHighlight: 'Agency & Potenlab Partner',
      subtitle: 'Not just development outsourcing, but a tech partner for business growth.',
      agency: 'Traditional Agency',
      potenlab: 'Potenlab Partner',
      items: [
        {
          agency: 'Passive Development',
          potenlab: 'Proactive Tech Proposals',
          icon: Zap
        },
        {
          agency: 'Scope-based Features',
          potenlab: 'Business Growth Focus',
          icon: Target
        },
        {
          agency: 'One-time Project',
          potenlab: 'Sustainable Subscription',
          icon: Clock
        },
        {
          agency: 'Email/Phone Communication',
          potenlab: 'Real-time Slack Collaboration',
          icon: MessageCircle
        }
      ]
    },
    subscription: {
      title: 'Subscription Service',
      titleHighlight: 'Pricing',
      subtitle: 'Get a professional team at half the cost of hiring.',
      serviceA: {
        badge: 'Design Subscription',
        title: 'Design Subscription Service',
        price: '₩1.5M/month',
        priceNote: 'starting from',
        features: [
          'Unlimited design requests (sequential)',
          'Dedicated senior designer',
          'UI/UX & marketing assets included',
          'First draft within 2 business days',
          'Unlimited revisions',
          'Real-time Slack feedback'
        ],
        comparison: 'Hiring 1 designer costs ₩5M+/month'
      },
      serviceB: {
        badge: 'Dev-as-a-Service',
        title: 'Development Team Subscription',
        price: '₩4M/month',
        priceNote: 'starting from',
        features: [
          'CTO-level tech consulting',
          'AI model implementation strategy',
          'Dedicated development slot',
          'Real-time Slack communication',
          'Weekly sprint reviews',
          'Tech documentation & handover'
        ],
        comparison: 'Hiring 2 developers costs ₩10M+/month'
      },
      cta: 'Get Custom Quote'
    },
    checkpoint: {
      title: 'Before Inquiry',
      titleHighlight: 'Checkpoint',
      subtitle: 'Please check your current situation for more accurate consulting.',
      items: [
        {
          question: 'At the idea stage?',
          description: 'We support the entire process from planning consulting to MVP development.',
          icon: '💡'
        },
        {
          question: 'Have a specific deadline?',
          description: 'We propose optimal development scope and priorities to meet launch dates.',
          icon: '⏰'
        },
        {
          question: 'What kind of collaboration?',
          description: 'Just implementation? Or tech strategy? Clarify the support scope you need.',
          icon: '🤝'
        },
        {
          question: 'Have an existing dev team?',
          description: 'Collaboration with internal teams or full outsourcing, both are possible.',
          icon: '👥'
        }
      ]
    },
    slogan: {
      main: 'MVP to AI,',
      highlight: 'Your Growth Partner.',
      description: 'Potenlab stays with you until your business succeeds in the market.'
    }
  }
};

export function PartnerPage() {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  const t = content[language];
  const [activeCheckpoint, setActiveCheckpoint] = useState<number | null>(null);

  const scrollToContact = () => {
    navigate('contact', null, null, { inquiryType: 'subscription' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-[168px] pb-32 bg-gradient-to-b from-[#E6F3FF] to-white">
        <div className="max-w-[1156px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-[48px] md:text-[56px] font-bold text-[#0E1116] leading-[1.2] mb-6">
              {t.hero.title}
              <br />
              <span className="text-[#0079FF]">{t.hero.titleHighlight}</span>
            </h1>
            <p className="text-[18px] md:text-[20px] text-[#666666] max-w-3xl mx-auto leading-relaxed mb-8">
              {t.hero.subtitle}
              <br />
              <span className="font-semibold text-[#0E1116]">{t.hero.subtitle2}</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                onClick={scrollToContact}
                className="px-8 h-12 bg-[#0079FF] text-white rounded-xl font-semibold hover:bg-[#0066DD] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                {t.hero.cta1}
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={scrollToPricing}
                className="px-8 h-12 border-2 border-[#0079FF] text-[#0079FF] rounded-xl font-semibold hover:bg-[#E6F3FF] transition-colors"
              >
                {t.hero.cta2}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Difference Section */}
      <section className="py-32 bg-white">
        <div className="max-w-[1156px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="mb-6">
              <span 
                className="text-[#0079FF] font-semibold text-[20px]"
                style={{ fontFamily: 'Clash Display, sans-serif', fontWeight: 600 }}
              >
                Difference
              </span>
            </div>
            <h2 className="text-[36px] md:text-[42px] font-bold text-[#0E1116] mb-4 leading-[1.2]">
              {t.difference.title}
              <br />
              <span className="text-[#0079FF]">{t.difference.titleHighlight}</span>
            </h2>
            <p className="text-[16px] text-[#666666] mt-6">
              {t.difference.subtitle}
            </p>
          </motion.div>

          {/* Comparison Table */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Agency Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#F8F9FA] rounded-xl p-8 border border-[#E5E7EB]"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-[#E5E7EB] rounded-xl flex items-center justify-center">
                  <X className="w-6 h-6 text-[#666666]" />
                </div>
                <h3 className="text-[20px] font-bold text-[#666666]">{t.difference.agency}</h3>
              </div>
              <ul className="space-y-5">
                {t.difference.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#E5E7EB] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-4 h-4 text-[#666666]" />
                    </div>
                    <span className="text-[15px] text-[#666666] leading-relaxed">{item.agency}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Potenlab Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-[#0079FF] to-[#0066DD] rounded-xl p-8 text-white border border-[#0079FF] shadow-lg"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-[20px] font-bold">{t.difference.potenlab}</h3>
              </div>
              <ul className="space-y-5">
                {t.difference.items.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5 backdrop-blur-sm">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[15px] leading-relaxed font-medium">{item.potenlab}</span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subscription Pricing Section */}
      <section id="pricing" className="py-32 bg-[#F8F9FA]">
        <div className="max-w-[1156px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="mb-6">
              <span 
                className="text-[#0079FF] font-semibold text-[20px]"
                style={{ fontFamily: 'Clash Display, sans-serif', fontWeight: 600 }}
              >
                Pricing
              </span>
            </div>
            <h2 className="text-[36px] md:text-[42px] font-bold text-[#0E1116] mb-4 leading-[1.2]">
              {t.subscription.title}
              <span className="text-[#0079FF]"> {t.subscription.titleHighlight}</span>
            </h2>
            <p className="text-[16px] text-[#666666] mt-6">
              {t.subscription.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Design Subscription */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl p-8 border border-[#E5E7EB] hover:border-[#0079FF] hover:shadow-lg transition-all duration-300"
            >
              <div className="inline-block px-4 py-1.5 bg-[#E6F3FF] text-[#0079FF] rounded-full text-[14px] font-semibold mb-6">
                {t.subscription.serviceA.badge}
              </div>
              <h3 className="text-[24px] font-bold text-[#0E1116] mb-3">
                {t.subscription.serviceA.title}
              </h3>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-[40px] font-bold text-[#0079FF]">{t.subscription.serviceA.price}</span>
                <span className="text-[16px] text-[#666666]">{t.subscription.serviceA.priceNote}</span>
              </div>
              <ul className="space-y-4 mb-8">
                {t.subscription.serviceA.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#0079FF] flex-shrink-0 mt-0.5" />
                    <span className="text-[15px] text-[#666666] leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-[#E5E7EB]">
                <p className="text-[14px] text-[#666666] flex items-start gap-2">
                  <span className="text-[18px]">💰</span>
                  <span>{t.subscription.serviceA.comparison}</span>
                </p>
              </div>
            </motion.div>

            {/* Development Subscription */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl p-8 border-2 border-[#0079FF] relative overflow-hidden shadow-lg"
            >
              <div className="absolute top-0 right-0 bg-[#0079FF] text-white px-6 py-2 text-[13px] font-bold">
                POPULAR
              </div>
              <div className="inline-block px-4 py-1.5 bg-[#E6F3FF] text-[#0079FF] rounded-full text-[14px] font-semibold mb-6 mt-6">
                {t.subscription.serviceB.badge}
              </div>
              <h3 className="text-[24px] font-bold text-[#0E1116] mb-3">
                {t.subscription.serviceB.title}
              </h3>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-[40px] font-bold text-[#0079FF]">{t.subscription.serviceB.price}</span>
                <span className="text-[16px] text-[#666666]">{t.subscription.serviceB.priceNote}</span>
              </div>
              <ul className="space-y-4 mb-8">
                {t.subscription.serviceB.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#0079FF] flex-shrink-0 mt-0.5" />
                    <span className="text-[15px] text-[#666666] leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-[#E5E7EB]">
                <p className="text-[14px] text-[#666666] flex items-start gap-2">
                  <span className="text-[18px]">💰</span>
                  <span>{t.subscription.serviceB.comparison}</span>
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <button
              onClick={scrollToContact}
              className="px-8 h-12 bg-[#0079FF] text-white rounded-xl font-semibold hover:bg-[#0066DD] transition-colors inline-flex items-center gap-2 shadow-sm"
            >
              {t.subscription.cta}
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Checkpoint Section */}
      <section className="py-32 bg-white">
        <div className="max-w-[1156px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="mb-6">
              <span 
                className="text-[#0079FF] font-semibold text-[20px]"
                style={{ fontFamily: 'Clash Display, sans-serif', fontWeight: 600 }}
              >
                Checkpoint
              </span>
            </div>
            <h2 className="text-[36px] md:text-[42px] font-bold text-[#0E1116] mb-4 leading-[1.2]">
              {t.checkpoint.title}
              <span className="text-[#0079FF]"> {t.checkpoint.titleHighlight}</span>
            </h2>
            <p className="text-[16px] text-[#666666] mt-6">
              {t.checkpoint.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {t.checkpoint.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-white rounded-xl p-8 border-2 cursor-pointer transition-all duration-300 ${
                  activeCheckpoint === index
                    ? 'border-[#0079FF] shadow-lg'
                    : 'border-[#E5E7EB] hover:border-[#0079FF]/50 hover:shadow-md'
                }`}
                onClick={() => setActiveCheckpoint(activeCheckpoint === index ? null : index)}
              >
                <div className="flex items-start gap-4">
                  <div className="text-[44px] leading-none">{item.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-[20px] font-bold text-[#0E1116] mb-3">
                      {item.question}
                    </h3>
                    <p className="text-[15px] text-[#666666] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Slogan Section */}
      <section className="py-32 bg-gradient-to-b from-[#E6F3FF] to-white">
        <div className="max-w-[1156px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-[48px] md:text-[56px] font-bold text-[#0E1116] leading-[1.2] mb-6">
              {t.slogan.main}
              <br />
              <span className="text-[#0079FF]">{t.slogan.highlight}</span>
            </h2>
            <p className="text-[18px] text-[#666666] max-w-2xl mx-auto mb-10">
              {t.slogan.description}
            </p>
            <button
              onClick={scrollToContact}
              className="px-10 h-14 bg-[#0079FF] text-white rounded-xl font-semibold hover:bg-[#0066DD] transition-colors inline-flex items-center gap-2 text-[16px] shadow-lg"
            >
              {language === 'ko' ? '지금 시작하기' : 'Get Started'}
              <ArrowRight className="w-6 h-6" />
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}