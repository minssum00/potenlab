import { ReactNode } from 'react';
import { Button } from '../ui/button';
import { LogOut, LayoutDashboard, MessageSquare, Briefcase, FileText, Settings, GraduationCap } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useRouter } from '../../contexts/RouterContext';

interface AdminLayoutProps {
  children: ReactNode;
  onLogout: () => void;
  activeTab: 'dashboard' | 'inquiries' | 'portfolio' | 'article' | 'seo' | 'courses';
}

export function AdminLayout({ children, onLogout, activeTab }: AdminLayoutProps) {
  const { language } = useLanguage();
  const { navigate } = useRouter();

  const menuItems = [
    {
      id: 'dashboard',
      icon: LayoutDashboard,
      labelKo: '대시보드',
      labelEn: 'Dashboard',
      page: 'admin-dashboard' as const
    },
    {
      id: 'inquiries',
      icon: MessageSquare,
      labelKo: '문의 관리',
      labelEn: 'Inquiries',
      page: 'admin-inquiries' as const
    },
    {
      id: 'portfolio',
      icon: Briefcase,
      labelKo: '포트폴리오 관리',
      labelEn: 'Portfolio',
      page: 'admin-portfolio' as const
    },
    {
      id: 'article',
      icon: FileText,
      labelKo: '아티클 관리',
      labelEn: 'Article',
      page: 'admin-article' as const
    },
    {
      id: 'seo',
      icon: Settings,
      labelKo: 'SEO 관리',
      labelEn: 'SEO',
      page: 'admin-seo' as const
    },
    {
      id: 'courses',
      icon: GraduationCap,
      labelKo: '코스 관리',
      labelEn: 'Courses',
      page: 'admin-courses' as const
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-[200px] bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <button 
            onClick={() => navigate('home')}
            className="font-bold text-lg hover:opacity-80 transition-opacity" 
            style={{ color: '#00C18A' }}
          >
            Potenlab
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.page)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all ${
                  isActive
                    ? 'bg-[#00C18A] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {language === 'ko' ? item.labelKo : item.labelEn}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">
              {language === 'ko' ? '로그아웃' : 'Logout'}
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-medium text-gray-900">
              {menuItems.find(item => item.id === activeTab)?.[language === 'ko' ? 'labelKo' : 'labelEn']}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">
                {language === 'ko' ? '관리자' : 'Admin'}
              </div>
              <div className="text-xs text-gray-500">admin@potenlab.dev</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#00C18A] flex items-center justify-center text-white font-medium text-sm">
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}