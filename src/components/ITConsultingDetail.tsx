import { useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ServiceDetail } from './ServiceDetail';
import { servicesData } from '../data/servicesData';
import type { ServiceData } from '../data/servicesData';

function toServiceDetailShape(
  raw: ServiceData,
  lang: 'ko' | 'en'
): Parameters<typeof ServiceDetail>[0]['service'] {
  const k = lang;
  return {
    id: raw.id,
    title: k === 'ko' ? raw.title_ko : raw.title_en,
    subtitle: k === 'ko' ? raw.subtitle_ko : raw.subtitle_en,
    description: k === 'ko' ? raw.description_ko : raw.description_en,
    heroImage: raw.heroImage,
    gradient: raw.gradient,
    overview: {
      title: k === 'ko' ? raw.overview.title_ko : raw.overview.title_en,
      content: k === 'ko' ? raw.overview.content_ko : raw.overview.content_en,
    },
    features: {
      title: k === 'ko' ? raw.features.title_ko : raw.features.title_en,
      items: raw.features.items.map((f) => ({
        title: k === 'ko' ? f.title_ko : f.title_en,
        description: k === 'ko' ? f.description_ko : f.description_en,
        icon: f.icon,
      })),
    },
    process: {
      title: k === 'ko' ? raw.process.title_ko : raw.process.title_en,
      steps: raw.process.steps.map((s) => ({
        number: s.number,
        title: k === 'ko' ? s.title_ko : s.title_en,
        description: k === 'ko' ? s.description_ko : s.description_en,
      })),
    },
    benefits: {
      title: k === 'ko' ? raw.benefits.title_ko : raw.benefits.title_en,
      items: k === 'ko' ? raw.benefits.items_ko : raw.benefits.items_en,
    },
    cta: {
      title: k === 'ko' ? raw.cta.title_ko : raw.cta.title_en,
      description: k === 'ko' ? raw.cta.description_ko : raw.cta.description_en,
    },
  };
}

interface ITConsultingDetailProps {
  onBack: () => void;
}

export function ITConsultingDetail({ onBack }: ITConsultingDetailProps) {
  const { language } = useLanguage();
  const service = useMemo(
    () =>
      toServiceDetailShape(
        servicesData['it-consulting'],
        language === 'ko' ? 'ko' : 'en'
      ),
    [language]
  );

  return <ServiceDetail service={service} onBack={onBack} />;
}
