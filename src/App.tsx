import { defaultSEO, updateMetaTags } from './utils/seo';
import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ServiceDetail } from './components/ServiceDetail';
import { ITConsultingDetail } from './components/ITConsultingDetail';
import { PortfolioDetail } from './components/PortfolioDetail';
import { ArticleDetail } from './components/ArticleDetail';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ContentsPage } from './pages/ContentsPage';
import { LecturePage } from './pages/LecturePage';
import { MVPDetailPage } from './pages/MVPDetailPage';
import { UXUIDetailPage } from './pages/UXUIDetailPage';
import { WebAppDetailPage } from './pages/WebAppDetailPage';
import { RnDDetailPage } from './pages/RnDDetailPage';
import { StyleGuidePage } from './pages/StyleGuidePage';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';
import { PartnerPage } from './pages/PartnerPage';
import { PartnerTestPage } from './pages/PartnerTestPage';
import { PotenBoosterPage } from './pages/PotenBoosterPage';
import { CustomProductPage } from './pages/CustomProductPage';
import { ITConsultingDetailPage } from './pages/ITConsultingDetailPage';
import { UXUIDesignPage } from './pages/UXUIDesignPage';
import { WebDevelopmentPage } from './pages/WebDevelopmentPage';
import { OtherServicesPage } from './pages/OtherServicesPage';
import { PotenLampPage } from './pages/PotenLampPage';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminInquiries } from './components/admin/AdminInquiries';
import { AdminPortfolio } from './components/admin/AdminPortfolio';
import { AdminArticleList } from './components/admin/AdminArticleList';
import { AdminArticleForm } from './components/admin/AdminArticleForm';
import { AdminSEO } from './components/admin/AdminSEO';
import { AdminSEOGlobal } from './components/admin/AdminSEOGlobal';
import { AdminSEODetail } from './components/admin/AdminSEODetail';
import { AdminCourses } from './components/admin/AdminCourses';
import { Toaster } from 'sonner@2.0.3';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { RouterProvider, useRouter } from './contexts/RouterContext';
import { servicesData } from './data/servicesData';
import { projectId, publicAnonKey } from './utils/supabase/info';
import './utils/cleanContainer';
import './utils/shortenDescriptions';

const ADMIN_PASSWORD = "potenlab2025";

function AppContent() {
  const { currentPage, navigate, selectedServiceId, setSelectedServiceId, selectedPortfolioId } = useRouter();
  const { language } = useLanguage();
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [globalSEOSettings, setGlobalSEOSettings] = useState<any>(null);

  useEffect(() => {
    if (window.location.pathname === '/og.png') {
      window.location.replace(`https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/og.png`);
    }
  }, []);

  useEffect(() => {
    const adminAuth = sessionStorage.getItem('adminAuth');
    if (adminAuth === 'true') {
      setIsAdminAuthenticated(true);
      localStorage.setItem('access_token', ADMIN_PASSWORD);
    }
  }, []);

  useEffect(() => {
    const fetchGlobalSEO = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/seo-settings/global`,
          { headers: { 'Authorization': `Bearer ${publicAnonKey}` } }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.settings) setGlobalSEOSettings(data.settings);
        }
      } catch (error) {
        console.warn('⚠️ Failed to fetch global SEO settings:', error);
      }
    };
    fetchGlobalSEO();
  }, []);

  useEffect(() => {
    if (currentPage === 'home') {
      const seoConfig = globalSEOSettings 
        ? {
            title: language === 'ko' ? (globalSEOSettings.titleKo || defaultSEO[language].title) : (globalSEOSettings.titleEn || defaultSEO[language].title),
            description: language === 'ko' ? (globalSEOSettings.descriptionKo || defaultSEO[language].description) : (globalSEOSettings.descriptionEn || defaultSEO[language].description),
            keywords: language === 'ko' ? globalSEOSettings.keywordsKo : globalSEOSettings.keywordsEn,
            ogTitle: language === 'ko' ? (globalSEOSettings.ogTitleKo || globalSEOSettings.titleKo || defaultSEO[language].ogTitle) : (globalSEOSettings.ogTitleEn || globalSEOSettings.titleEn || defaultSEO[language].ogTitle),
            ogDescription: language === 'ko' ? (globalSEOSettings.ogDescriptionKo || globalSEOSettings.descriptionKo || defaultSEO[language].ogDescription) : (globalSEOSettings.ogDescriptionEn || globalSEOSettings.descriptionEn || defaultSEO[language].ogDescription),
            ogImage: language === 'ko' ? globalSEOSettings.ogImageKo : globalSEOSettings.ogImageEn,
            ogUrl: 'https://www.potenlab.dev',
            twitterCard: 'summary_large_image' as const,
            canonical: 'https://www.potenlab.dev'
          }
        : defaultSEO[language];
      updateMetaTags(seoConfig, language);
    } else if (currentPage === 'service' && selectedServiceId) {
      const serviceData = (servicesData as any)[selectedServiceId];
      const title = language === 'ko' ? serviceData.title_ko : serviceData.title_en;
      const description = language === 'ko' ? serviceData.description_ko : serviceData.description_en;
      updateMetaTags({
        title: `${title} - Potenlab`,
        description: description,
        ogTitle: `${title} - Potenlab`,
        ogDescription: description,
        ogUrl: `https://www.potenlab.dev/service/${selectedServiceId}`,
        canonical: `https://www.potenlab.dev/service/${selectedServiceId}`,
        twitterCard: 'summary_large_image'
      }, language);
    }
  }, [currentPage, selectedServiceId, language, globalSEOSettings]);

  useEffect(() => {
    if (currentPage === "admin" && isAdminAuthenticated) {
      navigate("admin-dashboard");
    }
  }, [currentPage, isAdminAuthenticated, navigate]);

  const handleBackToHome = () => {
    navigate("home");
    setSelectedServiceId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAdminLogin = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      localStorage.setItem('access_token', password);
      navigate("admin-dashboard");
    } else {
      alert('비밀번호가 올바르지 않습니다 / Incorrect password');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
    localStorage.removeItem('access_token');
    navigate("home");
  };

  // Static/Redirect Routes
  if (currentPage === 'naver-verification') return <div style={{ padding: '20px', fontFamily: 'monospace' }}>naver-site-verification: 0ed4334c54a63c176e5e0d31611686362999c40b</div>;
  if (currentPage === 'robots-txt') {
    window.location.href = `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/robots.txt`;
    return null;
  }
  if (currentPage === 'sitemap-xml') {
    window.location.href = `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/sitemap.xml`;
    return null;
  }

  // Page Routing
  switch (currentPage) {
    case "service":
      if (selectedServiceId === 'it-consulting') return <ITConsultingDetail onBack={handleBackToHome} />;
      return <ServiceDetail service={(servicesData as any)[selectedServiceId]} onBack={handleBackToHome} />;
    case "portfolio-detail": return <PortfolioDetail onBack={handleBackToHome} />;
    case "article-detail": return <ArticleDetail onBack={handleBackToHome} />;
    case "services": return <ServicesPage />;
    case "portfolio": return <PortfolioPage />;
    case "contents": return <ContentsPage />;
    case "lecture": return <LecturePage />;
    case "mvp-detail": return <MVPDetailPage />;
    case "uxui-detail": return <UXUIDetailPage />;
    case "webapp-detail": return <WebAppDetailPage />;
    case "rnd-detail": return <RnDDetailPage />;
    case "style-guide": return <StyleGuidePage />;
    case "contact": return <ContactPage />;
    case "about": return <AboutPage />;
    case "partner": return <PartnerPage />;
    case "poten-booster": return <PotenBoosterPage />;
    case "custom-product": return <CustomProductPage />;
    case "consulting": return <ITConsultingDetailPage />;
    case "uxui-design": return <UXUIDesignPage />;
    case "web-development": return <WebDevelopmentPage />;
    case "other-services": return <OtherServicesPage />;
    case "poten-lamp": return <PotenLampPage />;
    case "admin":
      if (isAdminAuthenticated) return null;
      return <AdminLogin onLogin={handleAdminLogin} />;
    default:
      if (currentPage.startsWith('admin-')) {
        if (!isAdminAuthenticated) return <AdminLogin onLogin={handleAdminLogin} />;
        const activeTab = currentPage.replace('admin-', '') as any;
        const getContent = () => {
          switch (currentPage) {
            case "admin-dashboard": return <AdminDashboard />;
            case "admin-inquiries": return <AdminInquiries />;
            case "admin-portfolio": return <AdminPortfolio />;
            case "admin-article": return <AdminArticleList />;
            case "admin-article-form": return <AdminArticleForm />;
            case "admin-seo": return <AdminSEO />;
            case "admin-seo-global": return <AdminSEOGlobal />;
            case "admin-seo-detail": return <AdminSEODetail />;
            case "admin-courses": return <AdminCourses />;
            default: return <AdminDashboard />;
          }
        };
        return (
          <AdminLayout onLogout={handleAdminLogout} activeTab={activeTab}>
            {getContent()}
          </AdminLayout>
        );
      }
      return <PartnerTestPage />;
  }
}

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider>
        <AppContent />
        <Toaster />
      </RouterProvider>
    </LanguageProvider>
  );
}