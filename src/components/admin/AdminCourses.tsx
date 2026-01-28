import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface Course {
  id: string;
  type: 'business' | 'planning' | 'uxui';
  category_ko: string;
  category_en: string;
  title_ko: string;
  title_en: string;
  description_ko: string;
  description_en: string;
  price: number;
  originalPrice?: number;
  rating: number;
  thumbnail: string;
  categoryTag_ko: string;
  categoryTag_en: string;
  order: number;
  url?: string;
}

export function AdminCourses() {
  const { language } = useLanguage();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'business' | 'planning' | 'uxui'>('business');
  const [formData, setFormData] = useState<Partial<Course>>({
    type: 'business',
    category_ko: '',
    category_en: '',
    title_ko: '',
    title_en: '',
    description_ko: '',
    description_en: '',
    price: 0,
    originalPrice: 0,
    rating: 5.0,
    thumbnail: '',
    categoryTag_ko: '',
    categoryTag_en: '',
    order: 0,
    url: ''
  });

  // 강의 목록 불러오기
  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/courses`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }

      const data = await response.json();
      setCourses(data.courses || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error(language === 'ko' ? '강의 목록을 불러오지 못했습니다.' : 'Failed to fetch courses.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // 모달 열기
  const handleOpenModal = (course?: Course) => {
    if (course) {
      setEditingId(course.id);
      setFormData(course);
    } else {
      setEditingId(null);
      setFormData({
        type: activeTab,
        category_ko: '',
        category_en: '',
        title_ko: '',
        title_en: '',
        description_ko: '',
        description_en: '',
        price: 0,
        originalPrice: 0,
        rating: 5.0,
        thumbnail: '',
        categoryTag_ko: '',
        categoryTag_en: '',
        order: courses.filter(c => c.type === activeTab).length,
        url: ''
      });
    }
    setIsModalOpen(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  // 강의 저장
  const handleSave = async () => {
    if (!formData.title_ko?.trim() || !formData.title_en?.trim() || !formData.category_ko?.trim()) {
      toast.error(language === 'ko' ? '필수 항목을 입력해주세요.' : 'Please fill in required fields.');
      return;
    }

    setIsLoading(true);
    try {
      const url = editingId
        ? `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/courses/${editingId}`
        : `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/courses`;

      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save course');
      }

      toast.success(
        language === 'ko' 
          ? editingId ? '수정되었습니다.' : '등록되었습니다.'
          : editingId ? 'Updated.' : 'Created.'
      );

      handleCloseModal();
      fetchCourses();
    } catch (error) {
      console.error('Error saving course:', error);
      toast.error(language === 'ko' ? '저장에 실패했습니다.' : 'Failed to save.');
    } finally {
      setIsLoading(false);
    }
  };

  // 강의 삭제
  const handleDelete = async (id: string) => {
    if (!confirm(language === 'ko' ? '정말 삭제하시겠습니까?' : 'Are you sure you want to delete?')) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/courses/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete course');
      }

      toast.success(language === 'ko' ? '삭제되었습니다.' : 'Deleted.');
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error(language === 'ko' ? '삭제에 실패했습니다.' : 'Failed to delete.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCourses = courses.filter(c => c.type === activeTab).sort((a, b) => a.order - b.order);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl">
          {language === 'ko' ? '강의 관리' : 'Course Management'}
        </h1>
        <div className="flex gap-2">
          <Button 
            onClick={async () => {
              try {
                const response = await fetch(
                  `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/courses/init-samples`,
                  {
                    method: 'POST',
                    headers: {
                      'Authorization': `Bearer ${publicAnonKey}`
                    }
                  }
                );
                if (response.ok) {
                  toast.success(language === 'ko' ? '샘플 데이터가 추가되었습니다!' : 'Sample data added!');
                  fetchCourses();
                }
              } catch (error) {
                console.error('Error initializing samples:', error);
                toast.error(language === 'ko' ? '샘플 데이터 추가 실패' : 'Failed to add samples');
              }
            }}
            variant="outline"
            className="gap-2"
          >
            {language === 'ko' ? '샘플 데이터 추가' : 'Add Sample Data'}
          </Button>
          <Button onClick={() => handleOpenModal()} className="gap-2">
            <Plus className="w-4 h-4" />
            {language === 'ko' ? '추가' : 'Add'}
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('business')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'business'
              ? 'bg-primary text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          {language === 'ko' ? `비즈니스 (${courses.filter(c => c.type === 'business').length})` : `Business (${courses.filter(c => c.type === 'business').length})`}
        </button>
        <button
          onClick={() => setActiveTab('planning')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'planning'
              ? 'bg-primary text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          {language === 'ko' ? `서비스 기획 (${courses.filter(c => c.type === 'planning').length})` : `Service Planning (${courses.filter(c => c.type === 'planning').length})`}
        </button>
        <button
          onClick={() => setActiveTab('uxui')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'uxui'
              ? 'bg-primary text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          {language === 'ko' ? `UX/UI (${courses.filter(c => c.type === 'uxui').length})` : `UX/UI (${courses.filter(c => c.type === 'uxui').length})`}
        </button>
      </div>

      {/* Course List */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'ko' ? '썸네일' : 'Thumbnail'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'ko' ? '카테고리' : 'Category'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'ko' ? '제목' : 'Title'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'ko' ? '가격' : 'Price'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'ko' ? '평점' : 'Rating'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'ko' ? '순서' : 'Order'}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'ko' ? '액션' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title_ko}
                      className="w-16 h-10 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{language === 'ko' ? course.category_ko : course.category_en}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">{language === 'ko' ? course.title_ko : course.title_en}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">₩ {course.price.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{course.rating}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{course.order}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenModal(course)}
                      className="mr-2"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(course.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredCourses.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              {language === 'ko' ? '등록된 항목이 없습니다.' : 'No items found.'}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl">
                {editingId 
                  ? (language === 'ko' ? '수정' : 'Edit')
                  : (language === 'ko' ? '추가' : 'Add')}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ko' ? '타입 *' : 'Type *'}
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'business' | 'planning' | 'uxui' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="business">{language === 'ko' ? '비즈니스' : 'Business'}</option>
                  <option value="planning">{language === 'ko' ? '서비스 기획' : 'Service Planning'}</option>
                  <option value="uxui">{language === 'ko' ? 'UX/UI' : 'UX/UI'}</option>
                </select>
              </div>

              {/* Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ko' ? '카테고리 (한국어) *' : 'Category (Korean) *'}
                  </label>
                  <Input
                    value={formData.category_ko}
                    onChange={(e) => setFormData({ ...formData, category_ko: e.target.value })}
                    placeholder="서비스 기획"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ko' ? '카테고리 (영어) *' : 'Category (English) *'}
                  </label>
                  <Input
                    value={formData.category_en}
                    onChange={(e) => setFormData({ ...formData, category_en: e.target.value })}
                    placeholder="Service Planning"
                  />
                </div>
              </div>

              {/* Category Tag */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ko' ? '카테고리 태그 (한국어)' : 'Category Tag (Korean)'}
                  </label>
                  <Input
                    value={formData.categoryTag_ko}
                    onChange={(e) => setFormData({ ...formData, categoryTag_ko: e.target.value })}
                    placeholder="실무에서 사용하는"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ko' ? '카테고리 태그 (영어)' : 'Category Tag (English)'}
                  </label>
                  <Input
                    value={formData.categoryTag_en}
                    onChange={(e) => setFormData({ ...formData, categoryTag_en: e.target.value })}
                    placeholder="Used in Practice"
                  />
                </div>
              </div>

              {/* Title */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ko' ? '제목 (한국어) *' : 'Title (Korean) *'}
                  </label>
                  <Input
                    value={formData.title_ko}
                    onChange={(e) => setFormData({ ...formData, title_ko: e.target.value })}
                    placeholder="#1-1 아이디어 구체화 실습"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ko' ? '제목 (영어) *' : 'Title (English) *'}
                  </label>
                  <Input
                    value={formData.title_en}
                    onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                    placeholder="#1-1 Idea Specification Practice"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ko' ? '설명 (한국어)' : 'Description (Korean)'}
                  </label>
                  <Textarea
                    value={formData.description_ko}
                    onChange={(e) => setFormData({ ...formData, description_ko: e.target.value })}
                    placeholder="[서비스기획] 실무에서 사용하는 아이디어 구체화 작성 법칙!"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ko' ? '설명 (영어)' : 'Description (English)'}
                  </label>
                  <Textarea
                    value={formData.description_en}
                    onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                    placeholder="[Service Planning] Learn practical idea specification methods!"
                    rows={3}
                  />
                </div>
              </div>

              {/* Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ko' ? '가격 (원)' : 'Price (KRW)'}
                  </label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    placeholder="29900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ko' ? '원가 (할인 표시용)' : 'Original Price (for discount)'}
                  </label>
                  <Input
                    type="number"
                    value={formData.originalPrice || ''}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) || undefined })}
                    placeholder="330000"
                  />
                </div>
              </div>

              {/* Rating & Order */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ko' ? '평점 (0-5)' : 'Rating (0-5)'}
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    placeholder="5.0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ko' ? '순서 (낮을수록 앞)' : 'Order (lower = first)'}
                  </label>
                  <Input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Thumbnail */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ko' ? '썸네일 이미지 URL' : 'Thumbnail Image URL'}
                </label>
                <Input
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  placeholder="https://example.com/thumbnail.jpg"
                />
                {formData.thumbnail && (
                  <img 
                    src={formData.thumbnail} 
                    alt="Preview"
                    className="mt-3 w-full h-48 object-cover rounded-lg"
                  />
                )}
              </div>

              {/* Course URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ko' ? '강의 URL (클릭 시 이동할 링크)' : 'Course URL (Link on click)'}
                </label>
                <Input
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://example.com/course"
                />
                <p className="mt-1 text-xs text-gray-500">
                  {language === 'ko' 
                    ? '강의 카드를 클릭했을 때 이동할 URL을 입력하세요.'
                    : 'Enter the URL to navigate to when the course card is clicked.'}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3">
              <Button variant="outline" onClick={handleCloseModal}>
                {language === 'ko' ? '취소' : 'Cancel'}
              </Button>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading 
                  ? (language === 'ko' ? '저장 중...' : 'Saving...') 
                  : (language === 'ko' ? '저장' : 'Save')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}