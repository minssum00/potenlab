import { useLanguage } from '../contexts/LanguageContext';
import { techStackInfo } from '../data/techStackInfo';
import { X } from 'lucide-react';

interface TechStackPopupProps {
  tech: string;
  onClose: () => void;
}

export function TechStackPopup({ tech, onClose }: TechStackPopupProps) {
  const { language } = useLanguage();
  const info = techStackInfo[tech];
  const description = info
    ? language === 'ko'
      ? info.description_ko
      : info.description_en
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
      onClick={onClose}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
      role="button"
      tabIndex={0}
      aria-label="Close"
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal
        aria-labelledby="tech-stack-title"
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3
            id="tech-stack-title"
            className="text-lg font-semibold text-[#0079FF]"
          >
            {tech}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {description ? (
          <p className="text-sm text-[#666666] leading-relaxed">
            {description}
          </p>
        ) : (
          <p className="text-sm text-[#999999]">
            {language === 'ko'
              ? '이 기술에 대한 설명이 아직 등록되지 않았습니다.'
              : 'No description available for this technology yet.'}
          </p>
        )}
      </div>
    </div>
  );
}
