import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { projectId } from '../utils/supabase/info';

type Page = 'home' | 'services' | 'portfolio' | 'contents' | 'lecture' | 'resources' | 'about' | 'partner' | 'partner-test' | 'test3' | 'service' | 'portfolio-detail' | 'article-detail' | 'mvp-detail' | 'uxui-detail' | 'webapp-detail' | 'rnd-detail' | 'style-guide' | 'contact' | 'poten-booster' | 'custom-product' | 'consulting' | 'poten-lamp' | 'admin' | 'admin-dashboard' | 'admin-inquiries' | 'admin-portfolio' | 'admin-article' | 'admin-article-form' | 'admin-seo' | 'admin-seo-global' | 'admin-seo-detail' | 'admin-courses' | 'admin-og-image' | 'naver-verification' | 'robots-txt' | 'sitemap-xml';

interface RouterContextType {
  currentPage: Page;
  navigate: (page: Page, serviceId?: string | null, portfolioId?: string | null, params?: Record<string, any>) => void;
  selectedServiceId: string | null;
  setSelectedServiceId: (id: string | null) => void;
  selectedPortfolioId: string | null;
  setSelectedPortfolioId: (id: string | null) => void;
  selectedArticleId: string | null;
  setSelectedArticleId: (id: string | null) => void;
  getRouteParams: () => Record<string, any> | null;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [routeParams, setRouteParams] = useState<Record<string, any> | null>(null);

  // Handle initial URL
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      if (path === '/admin/dashboard') {
        setCurrentPage('admin-dashboard');
      } else if (path === '/admin/inquiries') {
        setCurrentPage('admin-inquiries');
      } else if (path === '/admin/portfolio') {
        setCurrentPage('admin-portfolio');
      } else if (path === '/admin/article') {
        setCurrentPage('admin-article');
      } else if (path === '/admin/article/new') {
        setCurrentPage('admin-article-form');
        setRouteParams({ mode: 'new' });
      } else if (path.startsWith('/admin/article/edit/')) {
        const articleId = path.replace('/admin/article/edit/', '');
        setCurrentPage('admin-article-form');
        setRouteParams({ mode: 'edit', articleId });
      } else if (path.startsWith('/admin/seo/detail/')) {
        const pageId = path.replace('/admin/seo/detail/', '');
        setCurrentPage('admin-seo-detail');
        setRouteParams({ pageId });
      } else if (path === '/admin/seo/global') {
        setCurrentPage('admin-seo-global');
      } else if (path === '/admin/seo') {
        setCurrentPage('admin-seo');
      } else if (path === '/admin/courses') {
        setCurrentPage('admin-courses');
      } else if (path === '/admin/og-image') {
        setCurrentPage('admin-og-image');
      } else if (path === '/admin') {
        setCurrentPage('admin');
      } else if (path === '/services') {
        setCurrentPage('services');
      } else if (path === '/portfolio') {
        setCurrentPage('portfolio');
      } else if (path === '/contents') {
        setCurrentPage('contents');
      } else if (path === '/lecture') {
        setCurrentPage('lecture');
      } else if (path === '/resources') {
        setCurrentPage('resources');
      } else if (path === '/mvp-detail') {
        setCurrentPage('mvp-detail');
      } else if (path === '/uxui-detail') {
        setCurrentPage('uxui-detail');
      } else if (path === '/webapp-detail') {
        setCurrentPage('webapp-detail');
      } else if (path === '/rnd-detail') {
        setCurrentPage('rnd-detail');
      } else if (path === '/style-guide') {
        setCurrentPage('style-guide');
      } else if (path === '/contact') {
        setCurrentPage('contact');
      } else if (path === '/about') {
        setCurrentPage('about');
      } else if (path === '/partner') {
        setCurrentPage('partner');
      } else if (path === '/partner-test') {
        setCurrentPage('partner-test');
      } else if (path === '/test3') {
        setCurrentPage('test3');
      } else if (path === '/poten-booster') {
        setCurrentPage('poten-booster');
      } else if (path === '/custom-product') {
        setCurrentPage('custom-product');
      } else if (path === '/consulting') {
        setCurrentPage('consulting');
      } else if (path === '/poten-lamp') {
        setCurrentPage('poten-lamp');
      } else if (path.startsWith('/potenlab/')) {
        // Extract portfolio ID from URL
        const portfolioId = path.replace('/potenlab/', '');
        setSelectedPortfolioId(portfolioId);
        setCurrentPage('portfolio-detail');
      } else if (path.startsWith('/article/')) {
        // Extract article URL from URL
        const articleUrl = path.replace('/article/', '');
        setSelectedArticleId(articleUrl);
        setCurrentPage('article-detail');
      } else if (path === '/naver0ed4334c54a63c176e5e0d31611686362999c40b.html') {
        // Naver site verification
        setCurrentPage('naver-verification');
      } else if (path === '/robots.txt') {
        // Redirect immediately to server endpoint
        window.location.href = `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/robots.txt`;
        return;
      } else if (path === '/sitemap.xml') {
        // Redirect immediately to server endpoint
        window.location.href = `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/sitemap.xml`;
        return;
      } else if (path === '/og.png') {
        // Redirect immediately to server endpoint for OG image
        window.location.href = `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/og.png`;
        return;
      } else {
        setCurrentPage('home');
        setSelectedPortfolioId(null);
      }
    };

    // Handle initial load
    handleLocationChange();

    // Handle browser back/forward buttons
    window.addEventListener('popstate', handleLocationChange);
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const navigate = (page: Page, serviceId?: string | null, portfolioId?: string | null, params?: Record<string, any>) => {
    setCurrentPage(page);
    
    if (params) {
      setRouteParams(params);
    } else {
      setRouteParams(null);
    }
    
    // Scroll to top when navigating
    window.scrollTo(0, 0);
    
    // Update URL without reload - use setTimeout to ensure state is updated
    setTimeout(() => {
      let url = '/';
      if (page === 'admin') url = '/admin';
      else if (page === 'admin-dashboard') url = '/admin/dashboard';
      else if (page === 'admin-inquiries') url = '/admin/inquiries';
      else if (page === 'admin-portfolio') url = '/admin/portfolio';
      else if (page === 'admin-article') url = '/admin/article';
      else if (page === 'admin-article-form') {
        if (params?.mode === 'new') {
          url = '/admin/article/new';
        } else if (params?.mode === 'edit' && params?.articleId) {
          url = `/admin/article/edit/${params.articleId}`;
        }
      } else if (page === 'admin-seo') url = '/admin/seo';
      else if (page === 'admin-seo-global') url = '/admin/seo/global';
      else if (page === 'admin-seo-detail' && params?.pageId) url = `/admin/seo/detail/${params.pageId}`;
      else if (page === 'admin-courses') url = '/admin/courses';
      else if (page === 'admin-og-image') url = '/admin/og-image';
      else if (page === 'services') url = '/services';
      else if (page === 'portfolio') url = '/portfolio';
      else if (page === 'contents') url = '/contents';
      else if (page === 'lecture') url = '/lecture';
      else if (page === 'resources') url = '/resources';
      else if (page === 'mvp-detail') url = '/mvp-detail';
      else if (page === 'uxui-detail') url = '/uxui-detail';
      else if (page === 'webapp-detail') url = '/webapp-detail';
      else if (page === 'rnd-detail') url = '/rnd-detail';
      else if (page === 'style-guide') url = '/style-guide';
      else if (page === 'contact') url = '/contact';
      else if (page === 'about') url = '/about';
      else if (page === 'partner') url = '/partner';
      else if (page === 'partner-test') url = '/partner-test';
      else if (page === 'test3') url = '/test3';
      else if (page === 'poten-booster') url = '/poten-booster';
      else if (page === 'custom-product') url = '/custom-product';
      else if (page === 'consulting') url = '/consulting';
      else if (page === 'poten-lamp') url = '/poten-lamp';
      else if (page === 'portfolio-detail' && (portfolioId || selectedPortfolioId)) {
        url = `/potenlab/${portfolioId || selectedPortfolioId}`;
      }
      else if (page === 'article-detail' && selectedArticleId) {
        url = `/article/${selectedArticleId}`;
      }
      
      window.history.pushState({}, '', url);
    }, 0);
  };

  const getRouteParams = () => {
    return routeParams;
  };

  return (
    <RouterContext.Provider value={{ 
      currentPage, 
      navigate, 
      selectedServiceId, 
      setSelectedServiceId,
      selectedPortfolioId,
      setSelectedPortfolioId,
      selectedArticleId,
      setSelectedArticleId,
      getRouteParams
    }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within RouterProvider');
  }
  return context;
}