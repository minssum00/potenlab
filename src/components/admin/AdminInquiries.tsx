import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { useLanguage } from '../../contexts/LanguageContext';
import { Search, Eye, Trash2, Mail, Phone, Calendar, RefreshCw } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { toast } from 'sonner@2.0.3';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

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

export function AdminInquiries() {
  const { language } = useLanguage();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const loadInquiries = async () => {
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
      console.log('Loaded inquiries:', data.inquiries);
      setInquiries(data.inquiries || []);
    } catch (error) {
      console.error('Error loading inquiries:', error);
      toast.error(
        language === 'ko'
          ? '문의 목록을 불러오는데 실패했습니다.'
          : 'Failed to load inquiries.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/inquiries/${deleteId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete inquiry');
      }

      setInquiries(inquiries.filter(i => i.id !== deleteId));
      toast.success(
        language === 'ko' ? '문의가 삭제되었습니다.' : 'Inquiry deleted.'
      );
      setDeleteId(null);
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      toast.error(
        language === 'ko'
          ? '문의 삭제에 실패했습니다.'
          : 'Failed to delete inquiry.'
      );
    }
  };

  const handleStatusChange = async (id: string, newStatus: Inquiry['status']) => {
    try {
      const inquiry = inquiries.find(i => i.id === id);
      if (!inquiry) return;

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/inquiries/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            ...inquiry,
            status: newStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update inquiry status');
      }

      setInquiries(inquiries.map(i => 
        i.id === id ? { ...i, status: newStatus } : i
      ));
      toast.success(
        language === 'ko' ? '상태가 변경되었습니다.' : 'Status updated.'
      );
    } catch (error) {
      console.error('Error updating inquiry status:', error);
      toast.error(
        language === 'ko'
          ? '상태 변경에 실패했습니다.'
          : 'Failed to update status.'
      );
    }
  };

  const getStatusBadge = (status: Inquiry['status']) => {
    const badges = {
      new: { label: language === 'ko' ? '신규' : 'New', variant: 'destructive' as const },
      in_progress: { label: language === 'ko' ? '진행중' : 'In Progress', variant: 'default' as const },
      completed: { label: language === 'ko' ? '답변완료' : 'Completed', variant: 'secondary' as const }
    };
    return badges[status];
  };

  const filteredInquiries = inquiries.filter(inquiry =>
    inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inquiry.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">{language === 'ko' ? '로딩 중...' : 'Loading...'}</div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {language === 'ko' ? '문의 관리' : 'Inquiry Management'}
        </h1>
        <p className="text-gray-600">
          {language === 'ko' 
            ? `전체 ${inquiries.length}개의 문의 · 신규 ${inquiries.filter(i => i.status === 'new').length}개` 
            : `Total ${inquiries.length} inquiries · ${inquiries.filter(i => i.status === 'new').length} new`}
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'ko' ? '이름 또는 이메일로 검색...' : 'Search by name or email...'}
            className="pl-12 h-12 rounded-xl"
          />
        </div>
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {filteredInquiries.length === 0 ? (
          <Card className="p-12 text-center rounded-xl">
            <div className="text-gray-500">
              {language === 'ko' ? '문의가 없습니다' : 'No inquiries found'}
            </div>
          </Card>
        ) : (
          filteredInquiries.map((inquiry) => {
            const statusBadge = getStatusBadge(inquiry.status);
            return (
              <Card key={inquiry.id} className="p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-lg text-gray-900">{inquiry.name}</h3>
                    <Badge variant={statusBadge.variant} className="rounded-md">
                      {statusBadge.label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedInquiry(inquiry)}
                      className="h-8 px-3 rounded-lg"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      {language === 'ko' ? '상세보기' : 'View'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const nextStatus = inquiry.status === 'new' ? 'in_progress' : 
                                         inquiry.status === 'in_progress' ? 'completed' : 'new';
                        handleStatusChange(inquiry.id, nextStatus);
                      }}
                      className="h-8 px-3 rounded-lg"
                    >
                      {language === 'ko' ? '답변하기' : 'Reply'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteId(inquiry.id)}
                      className="h-8 px-3 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-6 mb-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{inquiry.email}</span>
                  </div>
                  {inquiry.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{inquiry.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(inquiry.createdAt).toLocaleString('ko-KR')}</span>
                  </div>
                </div>

                <p className="text-gray-700 line-clamp-2">{inquiry.message}</p>
              </Card>
            );
          })
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {language === 'ko' ? '문의 삭제' : 'Delete Inquiry'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {language === 'ko' 
                ? '이 문의를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.' 
                : 'Are you sure you want to delete this inquiry? This action cannot be undone.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {language === 'ko' ? '취소' : 'Cancel'}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              {language === 'ko' ? '삭제' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* View Detail Dialog */}
      <AlertDialog open={!!selectedInquiry} onOpenChange={() => setSelectedInquiry(null)}>
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-3">
              {selectedInquiry?.name}
              {selectedInquiry && (
                <Badge variant={getStatusBadge(selectedInquiry.status).variant}>
                  {getStatusBadge(selectedInquiry.status).label}
                </Badge>
              )}
            </AlertDialogTitle>
          </AlertDialogHeader>
          {selectedInquiry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-500 mb-1">{language === 'ko' ? '이메일' : 'Email'}</div>
                  <div className="text-gray-900">{selectedInquiry.email}</div>
                </div>
                {selectedInquiry.phone && (
                  <div>
                    <div className="text-gray-500 mb-1">{language === 'ko' ? '전화번호' : 'Phone'}</div>
                    <div className="text-gray-900">{selectedInquiry.phone}</div>
                  </div>
                )}
                <div className="col-span-2">
                  <div className="text-gray-500 mb-1">{language === 'ko' ? '문의 시간' : 'Inquiry Time'}</div>
                  <div className="text-gray-900">{new Date(selectedInquiry.createdAt).toLocaleString('ko-KR')}</div>
                </div>
              </div>
              <div>
                <div className="text-gray-500 mb-2">{language === 'ko' ? '문의 내용' : 'Message'}</div>
                <div className="p-4 bg-gray-50 rounded-lg text-gray-900 whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>
              {language === 'ko' ? '닫기' : 'Close'}
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}