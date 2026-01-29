import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { Star } from "lucide-react";
import { projectId, publicAnonKey } from "../utils/supabase/info";

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

interface CoursesProps {
  activeTab: 'business' | 'planning' | 'uxui';
}

export function Courses({ activeTab }: CoursesProps) {
  const { language } = useLanguage();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 현재 선택된 탭에 따라 필터링
  const filteredCourses = courses.filter(course => course.type === activeTab);

  // 카테고리별로 강의 그룹화
  const groupedCourses = filteredCourses.reduce((acc, course) => {
    const category = language === 'ko' ? course.category_ko : course.category_en;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(course);
    return acc;
  }, {} as Record<string, Course[]>);

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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">강의를 불러오는 중...</p>
      </div>
    );
  }

  if (courses.length === 0) {
    return null;
  }

  return (
    <div>
      {/* Course Categories */}
      <div className="space-y-12 md:space-y-20">
        {Object.entries(groupedCourses).map(([category, categoryCourses], categoryIndex) => (
          <div key={category}>
            {/* Category Title */}
            <motion.h3
              className="mb-6 md:mb-10 text-[24px] md:text-[32px] font-bold"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              {category}
            </motion.h3>

            {/* Course Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
              {categoryCourses
                .sort((a, b) => a.order - b.order)
                .map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                    viewport={{ once: true }}
                    onClick={() => {
                      if (course.url) {
                        window.open(course.url, '_blank', 'noopener,noreferrer');
                      }
                    }}
                    className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg hover:border-[#0079FF]/30 transition-all duration-300 cursor-pointer group"
                  >
                    {/* Thumbnail - Clean without text overlay */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                      <img
                        src={course.thumbnail}
                        alt={language === 'ko' ? course.title_ko : course.title_en}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Category Tag */}
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1.5 bg-[#0079FF] text-white text-xs font-medium rounded-full shadow-sm">
                          {language === 'ko' ? course.categoryTag_ko : course.categoryTag_en}
                        </span>
                      </div>
                    </div>

                    {/* Content - Title moved here for better readability */}
                    <div className="p-5">
                      {/* Title */}
                      <h4 className="text-[16px] font-bold text-[#0E1116] mb-2 line-clamp-2 group-hover:text-[#0079FF] transition-colors">
                        {language === 'ko' ? course.title_ko : course.title_en}
                      </h4>

                      {/* Description */}
                      <p className="text-[14px] text-[#666666] mb-4 line-clamp-2 leading-relaxed">
                        {language === 'ko' ? course.description_ko : course.description_en}
                      </p>

                      {/* Price & Rating */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <p className="text-[18px] font-bold text-[#0079FF]">
                          ₩{course.price.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-1.5 text-[14px] text-[#666666]">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{course.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}