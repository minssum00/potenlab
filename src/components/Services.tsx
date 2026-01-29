import { useLanguage } from '../contexts/LanguageContext';
import { useRouter } from '../contexts/RouterContext';
import { motion } from 'motion/react';
import { servicesData } from '../data/servicesData';
import type { ServiceId } from '../data/servicesData';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowRight } from 'lucide-react';

const serviceIds: ServiceId[] = [
  'it-consulting',
  'mvp-development',
  'ai-development',
  'ux-ui-design',
];

export function Services() {
  const { language } = useLanguage();
  const { navigate, setSelectedServiceId } = useRouter();
  const isKo = language === 'ko';

  const handleService = (id: ServiceId) => {
    setSelectedServiceId(id);
    navigate('service');
  };

  return (
    <section className="py-24 px-4 sm:px-8 bg-[#F8F9FA]">
      <div className="max-w-[1156px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-[#0079FF] font-semibold text-[18px]">
            {isKo ? '핵심 서비스' : 'Core Services'}
          </span>
          <h2 className="mt-2 text-[32px] sm:text-[40px] font-bold text-black">
            {isKo ? '포텐랩 서비스' : 'Potenlab Services'}
          </h2>
          <p className="mt-4 text-[16px] text-[#666666] max-w-[600px] mx-auto">
            {isKo
              ? '아이디어 검증부터 개발, 컨설팅까지 한 곳에서 제공합니다.'
              : 'From idea validation to development and consulting, all in one place.'}
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {serviceIds.map((id, i) => {
            const s = servicesData[id];
            const title = isKo ? s.title_ko : s.title_en;
            const subtitle = isKo ? s.subtitle_ko : s.subtitle_en;

            return (
              <motion.button
                key={id}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onClick={() => handleService(id)}
                className="group text-left rounded-2xl overflow-hidden bg-white border border-[#E5E5E5] shadow-sm hover:shadow-xl hover:border-[#0079FF]/30 transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={s.heroImage}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div
                    className={`absolute inset-0 opacity-10 mix-blend-overlay ${s.gradient}`}
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[18px] text-black mb-2 group-hover:text-[#0079FF] transition-colors">
                    {title}
                  </h3>
                  <p className="text-[14px] text-[#666666] line-clamp-2 mb-4">
                    {subtitle}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#0079FF] group-hover:gap-2 transition-all">
                    {isKo ? '자세히 보기' : 'Learn more'}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
