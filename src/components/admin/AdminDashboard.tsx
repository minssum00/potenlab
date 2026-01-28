import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { useLanguage } from '../../contexts/LanguageContext';
import { MessageSquare, TrendingUp, Clock } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface Stats {
  totalInquiries: number;
  newInquiries: number;
  thisMonthInquiries: number;
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'new' | 'in_progress' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export function AdminDashboard() {
  const { language } = useLanguage();
  const [stats, setStats] = useState<Stats>({
    totalInquiries: 0,
    newInquiries: 0,
    thisMonthInquiries: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/inquiries`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch inquiries');
      }

      const data = await response.json();
      const inquiries: Inquiry[] = data.inquiries || [];

      // Calculate stats
      const now = new Date();
      const thisMonth = now.getMonth();
      const thisYear = now.getFullYear();

      const thisMonthCount = inquiries.filter(inquiry => {
        const createdDate = new Date(inquiry.createdAt);
        return createdDate.getMonth() === thisMonth && createdDate.getFullYear() === thisYear;
      }).length;

      setStats({
        totalInquiries: inquiries.length,
        newInquiries: inquiries.filter(i => i.status === 'new').length,
        thisMonthInquiries: thisMonthCount
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      icon: MessageSquare,
      label: language === 'ko' ? '총 문의' : 'Total Inquiries',
      value: stats.totalInquiries,
      change: '-',
      color: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: Clock,
      label: language === 'ko' ? '신규 문의' : 'New Inquiries',
      value: stats.newInquiries,
      change: '-',
      color: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      icon: TrendingUp,
      label: language === 'ko' ? '이번 달 문의' : 'This Month',
      value: stats.thisMonthInquiries,
      change: '-',
      color: 'bg-yellow-50',
      iconColor: 'text-yellow-600'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">{language === 'ko' ? '로딩 중...' : 'Loading...'}</div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px]">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {language === 'ko' ? '대시보드' : 'Dashboard'}
        </h1>
        <p className="text-gray-600">
          {language === 'ko' 
            ? 'Potenlab 관리자 대시보드에 오신 것을 환영합니다' 
            : 'Welcome to Potenlab Admin Dashboard'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6 rounded-xl border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
              </div>
              <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}