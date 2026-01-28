import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Courses } from '../components/Courses';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';

export function LecturePage() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'business' | 'planning' | 'uxui'>('business');

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-[72px]">
        <section className="py-24 bg-gray-50">
          <div className="max-w-[1156px] mx-auto px-4 sm:px-8 xl:px-[62px]">
            {/* Header */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-6">
                  <span 
                    className="text-primary text-[20px]"
                    style={{ fontFamily: 'Clash Display, sans-serif', fontWeight: 600 }}
                  >
                    Resources
                  </span>
                </div>
                <h2 className="mb-4 text-[36px] font-semibold">
                  {language === 'ko' 
                    ? '실전에서 꼭 필요한 자료들을 제공합니다.'
                    : 'We provide essential materials needed in practice.'}
                </h2>
                <p className="text-[16px] text-gray-600 mb-8">
                  {language === 'ko' 
                    ? 'IT 비즈니스와 개발에 대한 실질적인 노하우를 공유합니다.'
                    : 'We share practical know-how about IT business and development.'}
                </p>

                {/* Tab Navigation */}
                <div className="flex justify-center mt-8">
                  <div className="inline-flex bg-white rounded-xl p-1 border border-gray-200 shadow-sm">
                    <button
                      onClick={() => setActiveTab('business')}
                      className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        activeTab === 'business' 
                          ? 'bg-primary text-white shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {language === 'ko' ? '비즈니스' : 'Business'}
                    </button>
                    <button
                      onClick={() => setActiveTab('planning')}
                      className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        activeTab === 'planning' 
                          ? 'bg-primary text-white shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {language === 'ko' ? '서비스 기획' : 'Service Planning'}
                    </button>
                    <button
                      onClick={() => setActiveTab('uxui')}
                      className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        activeTab === 'uxui' 
                          ? 'bg-primary text-white shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {language === 'ko' ? 'UX/UI' : 'UX/UI'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Courses Content */}
            <Courses activeTab={activeTab} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}