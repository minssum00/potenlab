import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useRouter } from "../contexts/RouterContext";
import { motion, AnimatePresence } from "motion/react";
import logo from "figma:asset/fb12526f71ffecd668efc4c83fbed0a7d682c986.png";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [insightsDropdownOpen, setInsightsDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { navigate, setSelectedServiceId } = useRouter();

  const handleNavigate = (page: 'home' | 'services' | 'portfolio' | 'contents' | 'lecture' | 'about' | 'partner' | 'partner3' | 'poten-booster' | 'custom-product' | 'consulting' | 'other-services') => {
    navigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  const handleContactClick = () => {
    navigate('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100/50">
      <nav className="max-w-[1156px] mx-auto px-4 sm:px-8 xl:px-[62px] h-[72px] flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={() => handleNavigate('home')} className="flex items-center group">
            <img 
              src={logo} 
              alt="Potenlab" 
              className="w-[120px] h-auto transition-opacity group-hover:opacity-80"
              style={{ width: '120px' }}
            />
          </button>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={() => handleNavigate('home')}
            className="h-[36px] px-[14px] text-[14px] font-medium text-[#64748b] hover:text-[#0E1116] hover:bg-[#F8FAFC] rounded-[24px] transition-all duration-200"
          >
            {t('header.home')}
          </button>
          <button
            onClick={() => handleNavigate('about')}
            className="h-[36px] px-[14px] text-[14px] font-medium text-[#64748b] hover:text-[#0E1116] hover:bg-[#F8FAFC] rounded-[24px] transition-all duration-200"
          >
            {t('header.about')}
          </button>
          {/* Services Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <button
              onClick={() => handleNavigate('poten-booster')}
              className="h-[36px] px-[14px] text-[14px] font-medium text-[#64748b] hover:text-[#0E1116] hover:bg-[#F8FAFC] rounded-[24px] transition-all duration-200 flex items-center gap-1"
            >
              {t('header.services')}
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {servicesDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => handleNavigate('poten-booster')}
                    className="w-full text-left px-4 py-3 text-[14px] font-medium text-[#64748b] hover:text-[#0E1116] hover:bg-[#F8FAFC] transition-all duration-200"
                  >
                    {language === 'ko' ? '포텐 부스터' : 'Poten Booster'}
                  </button>
                  <button
                    onClick={() => handleNavigate('custom-product')}
                    className="w-full text-left px-4 py-3 text-[14px] font-medium text-[#64748b] hover:text-[#0E1116] hover:bg-[#F8FAFC] transition-all duration-200"
                  >
                    {language === 'ko' ? '커스텀 프로젝트 개발' : 'Custom Project Development'}
                  </button>
                  <button
                    onClick={() => handleNavigate('other-services')}
                    className="w-full text-left px-4 py-3 text-[14px] font-medium text-[#64748b] hover:text-[#0E1116] hover:bg-[#F8FAFC] transition-all duration-200"
                  >
                    {language === 'ko' ? '기타 문의' : 'Other Services'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            onClick={() => handleNavigate('portfolio')}
            className="h-[36px] px-[14px] text-[14px] font-medium text-[#64748b] hover:text-[#0E1116] hover:bg-[#F8FAFC] rounded-[24px] transition-all duration-200"
          >
            {t('header.portfolio')}
          </button>
          
          {/* Insights Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setInsightsDropdownOpen(true)}
            onMouseLeave={() => setInsightsDropdownOpen(false)}
          >
            <button
              className="h-[36px] px-[14px] text-[14px] font-medium text-[#64748b] hover:text-[#0E1116] hover:bg-[#F8FAFC] rounded-[24px] transition-all duration-200 flex items-center gap-1"
            >
              {language === 'ko' ? '인사이트' : 'Insights'}
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${insightsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {insightsDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => handleNavigate('contents')}
                    className="w-full text-left px-4 py-3 text-[14px] font-medium text-[#64748b] hover:text-[#0E1116] hover:bg-[#F8FAFC] transition-all duration-200"
                  >
                    {t('header.contents')}
                  </button>
                  <button
                    onClick={() => handleNavigate('lecture')}
                    className="w-full text-left px-4 py-3 text-[14px] font-medium text-[#64748b] hover:text-[#0E1116] hover:bg-[#F8FAFC] transition-all duration-200"
                  >
                    {t('header.courses')}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
            className="ml-2 h-[36px] px-[12px] flex items-center gap-2 text-[14px] font-medium text-[#64748b] hover:text-[#0E1116] hover:bg-[#F8FAFC] rounded-[24px] transition-all duration-200"
          >
            <Globe className="w-4 h-4" />
            <span>{language === 'ko' ? 'EN' : 'KO'}</span>
          </button>
          
          <button
            onClick={handleContactClick} 
            className="ml-2 h-[44px] px-[24px] text-[14px] font-medium rounded-[24px] bg-[#0079FF] hover:bg-[#0066DD] text-white shadow-[0px_1px_3px_0px_rgba(0,121,255,0.2),0px_1px_2px_0px_rgba(0,121,255,0.2)] hover:shadow-[0px_2px_5px_0px_rgba(0,121,255,0.3)] transition-all duration-200"
          >
            {t('header.contact')}
          </button>
        </div>
        
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 hover:bg-[#F8FAFC] rounded-[24px] transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-[#64748b]" />
          ) : (
            <Menu className="w-6 h-6 text-[#64748b]" />
          )}
        </button>
      </nav>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100/50 bg-white/95 backdrop-blur-xl">
          <div className="px-4 sm:px-8 py-6 space-y-2">
            <button
              onClick={() => handleNavigate('home')}
              className="block w-full text-left h-[40px] px-4 text-[14px] font-medium text-[#64748b] hover:text-[#0E1116] hover:bg-[#F8FAFC] rounded-[24px] transition-all"
            >
              {t('header.home')}
            </button>
            <button
              onClick={() => handleNavigate('about')}
              className="block w-full text-left h-[40px] px-4 text-[14px] font-medium text-[#64748b] hover:text-[#0E1116] hover:bg-[#F8FAFC] rounded-[24px] transition-all"
            >
              {t('header.about')}
            </button>
            <button
              onClick={() => handleNavigate('services')}
              className="block w-full text-left h-[40px] px-4 text-[14px] font-medium text-[#64748b] hover:text-[#0E1116] hover:bg-[#F8FAFC] rounded-[24px] transition-all"
            >
              {t('header.services')}
            </button>
            <button
              onClick={() => handleNavigate('portfolio')}
              className="block w-full text-left h-[40px] px-4 text-[14px] font-medium text-[#64748b] hover:text-[#0E1116] hover:bg-[#F8FAFC] rounded-[24px] transition-all"
            >
              {t('header.portfolio')}
            </button>
            
            {/* Mobile Insights Section */}
            <div className="space-y-1 pt-2">
              <div className="px-4 py-2 text-[12px] font-semibold text-[#94A3B8] uppercase tracking-wider">
                {language === 'ko' ? '인사이트' : 'Insights'}
              </div>
              <button
                onClick={() => handleNavigate('contents')}
                className="block w-full text-left h-[40px] px-4 ml-4 text-[14px] font-medium text-[#64748b] hover:text-[#0E1116] hover:bg-[#F8FAFC] rounded-[24px] transition-all"
              >
                {t('header.contents')}
              </button>
              <button
                onClick={() => handleNavigate('lecture')}
                className="block w-full text-left h-[40px] px-4 ml-4 text-[14px] font-medium text-[#64748b] hover:text-[#0E1116] hover:bg-[#F8FAFC] rounded-[24px] transition-all"
              >
                {t('header.courses')}
              </button>
            </div>
            
            {/* Mobile Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
              className="w-full h-[40px] px-4 flex items-center gap-2 text-[14px] font-medium text-[#64748b] hover:text-[#0E1116] hover:bg-[#F8FAFC] rounded-[24px] transition-all"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'ko' ? 'English' : '한국어'}</span>
            </button>
            
            <div className="pt-4">
              <button
                onClick={handleContactClick} 
                className="w-full h-[48px] px-6 text-[14px] font-medium rounded-[24px] bg-[#0079FF] hover:bg-[#0066DD] text-white shadow-[0px_1px_3px_0px_rgba(0,121,255,0.2),0px_1px_2px_0px_rgba(0,121,255,0.2)] transition-all duration-200"
              >
                {t('header.contact')}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}