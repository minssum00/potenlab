import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Plus, Pencil, Trash2, X, Upload, Loader2, GripVertical, ChevronDown, ChevronUp, ExternalLink, ChevronsUp, ChevronsDown } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useRouter } from '../../contexts/RouterContext';

interface Portfolio {
  id: string;
  title_ko: string;
  title_en: string;
  category: 'Platform' | 'System' | 'Homepage' | 'ETC';
  tags: string[]; // 다중 선택 가능한 태그
  scale: 'LV1' | 'LV2' | 'LV3' | 'LV4' | 'LV5' | 'LV6'; // 프로젝트 규모
  serviceType?: string[]; // 서비스 유형 (다중 선택 가능)
  description_ko: string;
  description_en: string;
  coverImage: string; // 썸네일 이미지 (메인 페이지 목록용)
  contentImages?: string[]; // 본문 이미지 (용량 크게)
  url?: string; // URL ID for routing
  url_playstore?: string; // Playstore link
  url_appstore?: string; // Appstore link
  url_web?: string; // Web link
  key_features?: string[]; // Key features list
  tech_stack?: string[]; // Tech stack (기술 스택)
  order?: number; // Display order
  date?: string; // 날짜
  is_service_ended?: boolean; // 서비스 종료 여부
  is_internal_project?: boolean; // 사내 프로젝트 여부 (상세보기 제한)
}

// 드래그 가능한 포트폴리오 아이템 컴포넌트
interface DraggablePortfolioItemProps {
  portfolio: Portfolio;
  index: number;
  totalCount: number;
  movePortfolio: (dragIndex: number, hoverIndex: number) => void;
  moveToTop: (index: number) => void;
  moveUp: (index: number) => void;
  moveDown: (index: number) => void;
  moveToBottom: (index: number) => void;
  moveToPosition: (fromIndex: number, toPosition: number) => void;
  handleOpenModal: (portfolio: Portfolio) => void;
  handleDelete: (id: string) => void;
  language: string;
}

const DraggablePortfolioItem: React.FC<DraggablePortfolioItemProps> = ({
  portfolio,
  index,
  totalCount,
  movePortfolio,
  moveToTop,
  moveUp,
  moveDown,
  moveToBottom,
  moveToPosition,
  handleOpenModal,
  handleDelete,
  language
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { navigate } = useRouter();
  const [isSelectingPosition, setIsSelectingPosition] = useState(false);

  const [{ handlerId }, drop] = useDrop({
    accept: 'portfolio-item',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: { index: number }, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // 같은 위치면 무시
      if (dragIndex === hoverIndex) {
        return;
      }

      // 마우스 위치 확인
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      // 드래그를 아래로만 할 때는 커서가 50%를 넘어야 함
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // 드래그를 위로만 할 때는 커서가 50% 미만이어야 함
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // 실제로 이동 수행
      movePortfolio(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'portfolio-item',
    item: () => {
      return { index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;
  drag(drop(ref));

  return (
    <div 
      ref={ref}
      data-handler-id={handlerId}
      style={{ opacity }}
      className="p-6 hover:bg-gray-50 transition-colors cursor-move"
    >
      <div className="flex items-start gap-4">
        {/* Drag Handle */}
        <div className="flex items-center pt-1">
          <GripVertical className="w-5 h-5 text-gray-400" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-medium text-gray-900">
              {language === 'ko' ? portfolio.title_ko : portfolio.title_en}
            </h3>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs">
              {portfolio.category}
            </span>
            {portfolio.scale && (
              <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                {portfolio.scale}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {language === 'ko' ? portfolio.description_ko : portfolio.description_en}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{portfolio.date}</span>
            {portfolio.tags && portfolio.tags.length > 0 && (
              <>
                <span>•</span>
                <span>{portfolio.tags.join(', ')}</span>
              </>
            )}
          </div>
        </div>

        {/* Order Control Buttons */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => moveToTop(index)}
            disabled={index === 0}
            className="text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed p-1.5 h-auto"
            title={language === 'ko' ? '맨 위로' : 'Move to top'}
          >
            <ChevronsUp className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => moveUp(index)}
            disabled={index === 0}
            className="text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed p-1.5 h-auto"
            title={language === 'ko' ? '위로' : 'Move up'}
          >
            <ChevronUp className="w-4 h-4" />
          </Button>
          
          {/* Position Selector */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSelectingPosition(!isSelectingPosition)}
              className="text-gray-900 hover:bg-gray-100 px-2 py-1 h-auto min-w-[40px]"
              title={language === 'ko' ? '순서 선택' : 'Select position'}
            >
              <span className="text-sm">{index + 1}</span>
            </Button>
            
            {isSelectingPosition && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsSelectingPosition(false)}
                />
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-[200px] overflow-y-auto">
                  {Array.from({ length: totalCount }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        moveToPosition(index, i);
                        setIsSelectingPosition(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                        i === index ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => moveDown(index)}
            disabled={index === totalCount - 1}
            className="text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed p-1.5 h-auto"
            title={language === 'ko' ? '아래로' : 'Move down'}
          >
            <ChevronDown className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => moveToBottom(index)}
            disabled={index === totalCount - 1}
            className="text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed p-1.5 h-auto"
            title={language === 'ko' ? '맨 아래로' : 'Move to bottom'}
          >
            <ChevronsDown className="w-4 h-4" />
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {portfolio.url && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('portfolio-detail', null, portfolio.url)}
              className="text-blue-600 hover:text-blue-700"
              title={language === 'ko' ? '상세 페이지로 이동' : 'Go to detail page'}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          )}
          {(portfolio.url_web || portfolio.url_playstore || portfolio.url_appstore) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const link = portfolio.url_web || portfolio.url_playstore || portfolio.url_appstore;
                if (link) {
                  window.open(link.startsWith('http') ? link : `https://${link}`, '_blank');
                }
              }}
              className="text-green-600 hover:text-green-700"
              title={language === 'ko' ? '외부 링크로 이동' : 'Open external link'}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleOpenModal(portfolio)}
            className="text-gray-600 hover:text-gray-900"
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              console.log('Delete button clicked for:', portfolio);
              console.log('Delete button clicked for ID:', portfolio.id);
              handleDelete(portfolio.id);
            }}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export function AdminPortfolio() {
  const { language } = useLanguage();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeYear, setActiveYear] = useState<string>('all');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [activeScale, setActiveScale] = useState<string>('all');
  const [activeServiceType, setActiveServiceType] = useState<string>('all');
  const [activeKeyFeature, setActiveKeyFeature] = useState<string>('all');
  const [sortType, setSortType] = useState<'date' | 'lv-high' | 'lv-low'>('date'); // 정렬 타입 추가
  const [hasSortChanges, setHasSortChanges] = useState(false); // 정렬 변경 여부
  const [keyFeatureOptions, setKeyFeatureOptions] = useState<string[]>([
    '콘텐츠 관리 (CRUD)',
    '채팅',
    '결제',
    '예약',
    '신청/관리',
    '상품관리'
  ]);
  const [newKeyFeature, setNewKeyFeature] = useState('');
  const [techStackOptions, setTechStackOptions] = useState<string[]>([
    'React.js',
    'Next.js',
    'Vue.js',
    'Angular',
    'Node.js',
    'Python',
    'Java',
    'PHP',
    'AWS',
    'Azure',
    'GCP',
    'Naver Cloud Platform',
    'Vercel',
    'PostgreSQL',
    'MySQL',
    'MongoDB',
    'Redis',
    'Firebase',
    'ChatGPT',
    'Docker',
    'Kubernetes',
    'Imweb',
    'React-Native',
    'Framer'
  ]);
  const [newTechStack, setNewTechStack] = useState('');
  const [selectedTechInfo, setSelectedTechInfo] = useState<string | null>(null);
  
  // 기술 스택 상세 설명
  const techStackInfo: { [key: string]: { description_ko: string; description_en: string } } = {
    'React.js': {
      description_ko: 'Facebook에서 개발한 사용자 인터페이스 구축을 위한 JavaScript 라이브러리입니다. 컴포넌트 기반 아키텍처로 재사용 가능한 UI를 만들 수 있습니다.',
      description_en: 'A JavaScript library for building user interfaces, developed by Facebook. Enables creation of reusable UI with component-based architecture.'
    },
    'Next.js': {
      description_ko: 'React 기반의 프레임워크로 서버 사이드 렌더링(SSR)과 정적 사이트 생성(SSG)을 지원합니다. SEO 최적화와 빠른 페이지 로딩이 필요한 프로젝트에 적합합니다.',
      description_en: 'A React framework supporting Server-Side Rendering (SSR) and Static Site Generation (SSG). Ideal for projects requiring SEO optimization and fast page loading.'
    },
    'Vue.js': {
      description_ko: '점진적으로 채택 가능한 JavaScript 프레임워크입니다. 가볍고 학습 곡선이 낮아 빠른 개발이 가능합니다.',
      description_en: 'A progressive JavaScript framework. Lightweight with a gentle learning curve, enabling rapid development.'
    },
    'Angular': {
      description_ko: 'Google에서 개발한 TypeScript 기반의 웹 애플리케이션 프레임워크입니다. 대규모 엔터프라이즈 애플리케이션 개발에 적합합니다.',
      description_en: 'A TypeScript-based web application framework developed by Google. Suitable for large-scale enterprise application development.'
    },
    'Node.js': {
      description_ko: 'Chrome V8 엔진으로 빌드된 JavaScript 런타임 환경입니다. 서버 사이드 개발에 JavaScript를 사용할 수 있게 해줍니다.',
      description_en: 'A JavaScript runtime built on Chrome V8 engine. Enables using JavaScript for server-side development.'
    },
    'Python': {
      description_ko: '간결하고 읽기 쉬운 문법을 가진 프로그래밍 언어입니다. AI/ML, 데이터 분석, 백엔드 개발 등 다양한 분야에서 활용됩니다.',
      description_en: 'A programming language with clean and readable syntax. Used in various fields including AI/ML, data analysis, and backend development.'
    },
    'Java': {
      description_ko: '플랫폼 독립적인 객체 지향 프로그래밍 언어입니다. 엔터프라이즈 애플리케이션과 안드로이드 앱 개발에 널리 사용됩니다.',
      description_en: 'A platform-independent object-oriented programming language. Widely used for enterprise applications and Android app development.'
    },
    'PHP': {
      description_ko: '서버 사이드 스크립트 언어로 WordPress, Laravel 등 다양한 웹 플랫폼의 기반이 됩니다.',
      description_en: 'A server-side scripting language that powers various web platforms including WordPress and Laravel.'
    },
    'AWS': {
      description_ko: 'Amazon Web Services의 클라우드 컴퓨팅 플랫폼입니다. EC2, S3, Lambda 등 다양한 서비스를 제공합니다.',
      description_en: 'Amazon Web Services cloud computing platform. Offers various services including EC2, S3, and Lambda.'
    },
    'Azure': {
      description_ko: 'Microsoft의 클라우드 컴퓨팅 플랫폼입니다. 엔터프라이즈 환경과의 통합이 뛰어납니다.',
      description_en: 'Microsoft cloud computing platform. Excellent integration with enterprise environments.'
    },
    'GCP': {
      description_ko: 'Google Cloud Platform으로 Google의 인프라를 활용한 클라우드 서비스입니다. BigQuery, AI/ML 도구가 강력합니다.',
      description_en: 'Google Cloud Platform leveraging Google infrastructure. Strong BigQuery and AI/ML tools.'
    },
    'Naver Cloud Platform': {
      description_ko: '네이버의 클라우드 컴퓨팅 서비스입니다. 국내 서비스에 최적화되어 있으며 한국어 지원이 우수합니다.',
      description_en: 'Naver cloud computing service. Optimized for domestic services with excellent Korean language support.'
    },
    'Vercel': {
      description_ko: 'Next.js를 만든 회사의 프론��엔드 배포 플랫폼입니다. Git 연동과 자동 배포가 간편합니다.',
      description_en: 'Frontend deployment platform by the creators of Next.js. Easy Git integration and automatic deployment.'
    },
    'PostgreSQL': {
      description_ko: '오픈소스 관계형 데이터베이스 시스템입니다. 복잡한 쿼리와 대용량 데이터 처리에 강점이 있습니다.',
      description_en: 'Open-source relational database system. Strong in complex queries and large-scale data processing.'
    },
    'MySQL': {
      description_ko: '가장 널리 사용되는 오픈소스 관계형 데이터베이스입니다. 빠르고 안정적이며 웹 애플리케이션에 적합합니다.',
      description_en: 'Most widely used open-source relational database. Fast, reliable, and suitable for web applications.'
    },
    'MongoDB': {
      description_ko: 'NoSQL 문서 지향 데이터베이스입니다. 유연한 스키마와 확장성이 뛰어나 빠른 개발이 가능합니다.',
      description_en: 'NoSQL document-oriented database. Flexible schema and excellent scalability enable rapid development.'
    },
    'Redis': {
      description_ko: '인메모리 데이터 구조 저장소입니다. 캐싱, 세션 관리, 실시간 분석 등에 활용됩니다.',
      description_en: 'In-memory data structure store. Used for caching, session management, and real-time analytics.'
    },
    'Firebase': {
      description_ko: 'Google의 모바일 및 웹 애플리케이션 개발 플랫폼입니다. 실시간 데이터베이스, 인증, 호스팅 등을 제공합니다.',
      description_en: 'Google mobile and web application development platform. Provides real-time database, authentication, hosting, etc.'
    },
    'ChatGPT': {
      description_ko: 'OpenAI의 대화형 AI 모델입니다. 자연어 처리, 콘텐츠 생성, 고객 지원 등에 활용됩니다.',
      description_en: 'OpenAI conversational AI model. Used for natural language processing, content generation, customer support, etc.'
    },
    'Docker': {
      description_ko: '컨테이너 기반 가상화 플랫폼입니다. 애플리케이션을 격리된 환경에서 실행하고 배포를 간소화합니다.',
      description_en: 'Container-based virtualization platform. Runs applications in isolated environments and simplifies deployment.'
    },
    'Kubernetes': {
      description_ko: '컨테이너 오케스트레이션 플랫폼입니다. Docker 컨테이너의 배포, 확장, 관리를 자동화합니다.',
      description_en: 'Container orchestration platform. Automates deployment, scaling, and management of Docker containers.'
    },
    'Imweb': {
      description_ko: '코딩 없이 웹사이트를 제작할 수 있는 국내 대표 노코드 웹 빌더 플랫폼입니다. 드래그 앤 드롭 방식으로 쇼핑몰, 기업 홈페이지, 랜딩페이지를 손쉽게 제작할 수 있으며, 국내 결제 시스템(PG사), 배송 연동, 회원 관리 등 한국 시장에 최적화된 기능을 제공합니다. 반응형 디자인을 자동으로 지원하고, SEO 최적화 및 다양한 템플릿으로 빠른 웹사이트 구축이 가능합니다.',
      description_en: 'Korea\'s leading no-code web builder platform for creating websites without coding. Build e-commerce sites, corporate websites, and landing pages easily with drag-and-drop. Offers features optimized for the Korean market including local payment gateways, shipping integration, and member management. Supports responsive design automatically with SEO optimization and various templates for rapid website development.'
    },
    'React-Native': {
      description_ko: 'Facebook(Meta)이 개발한 React를 기반으로 한 크로스 플랫폼 모바일 앱 개발 프레임워크입니다. JavaScript와 React를 사용하여 하나의 코드베이스로 iOS와 Android 네이티브 앱을 동시에 개발할 수 있으며, 진짜 네이티브 컴포넌트를 사용하여 높은 성능과 네이티브 UX를 제공합니다. Hot Reloading으로 빠른 개발이 가능하고, Expo를 통해 더욱 간편하게 시작할 수 있습니다.',
      description_en: 'A cross-platform mobile app framework based on React, developed by Facebook (Meta). Build native iOS and Android apps simultaneously with a single JavaScript/React codebase. Uses real native components for high performance and native UX. Features Hot Reloading for rapid development and can be easily started with Expo for streamlined workflow.'
    },
    'Framer': {
      description_ko: '디자이너와 개발자를 위한 최첨단 인터랙티브 디자인 및 프로토타이핑 도구입니다. Figma처럼 디자인하면서도 실제 코드로 변환 가능한 고급 애니메이션, 스크롤 인터랙션, 제스처 등을 구현할 수 있습니다. 최근에는 노코드 웹사이트 빌더 기능이 강화되어 코드 없이도 고품질의 반응형 웹사이트를 배포할 수 있으며, React 컴포넌트를 직접 임포트하여 사용할 수 있는 강력한 기능을 제공합니다.',
      description_en: 'A cutting-edge interactive design and prototyping tool for designers and developers. Create advanced animations, scroll interactions, and gestures like Figma, but convertible to real code. Recently enhanced with no-code website builder capabilities, allowing deployment of high-quality responsive websites without coding. Supports importing React components directly for powerful customization and development workflows.'
    }
  };
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingMain, setIsUploadingMain] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isUploadingContent, setIsUploadingContent] = useState(false);
  const [hasOrderChanges, setHasOrderChanges] = useState(false);
  const [formData, setFormData] = useState<Partial<Portfolio>>({
    title_ko: '',
    title_en: '',
    category: 'Platform',
    tags: [],
    scale: 'LV1',
    serviceType: [],
    description_ko: '',
    description_en: '',
    coverImage: '',
    url: '',
    url_playstore: '',
    url_appstore: '',
    url_web: '',
    key_features: [],
    tech_stack: [],
    contentImages: [],
    is_service_ended: false,
    is_internal_project: false
  });

  const tagOptions = [
    { id: 'it-consulting', label: 'IT Consulting' },
    { id: 'uxui', label: 'UXUI' },
    { id: 'web', label: 'Web' },
    { id: 'app', label: 'App' },
    { id: 'webapp', label: 'WebApp' },
    { id: 'saas', label: 'SaaS' },
    { id: 'rnd', label: 'R&D' },
    { id: 'arvr', label: 'AR/VR' },
    { id: 'branding', label: 'Branding' },
  ];

  const scaleOptions = ['LV1', 'LV2', 'LV3', 'LV4', 'LV5', 'LV6'];

  const serviceTypeOptions = [
    { id: 'content', label_ko: '정보전달(콘텐츠)', label_en: 'Content' },
    { id: 'community', label_ko: '커뮤니티', label_en: 'Community' },
    { id: 'sns', label_ko: 'SNS', label_en: 'SNS' },
    { id: 'brokerage', label_ko: '중개', label_en: 'Brokerage' },
    { id: 'o2o', label_ko: 'O2O', label_en: 'O2O' },
    { id: 'booking', label_ko: '예약/신청', label_en: 'Booking' },
    { id: 'commerce', label_ko: '커머스', label_en: 'Commerce' },
    { id: 'response-management', label_ko: '응답/관리', label_en: 'Response/Management' },
    { id: 'etc', label_ko: '기타', label_en: 'ETC' },
  ];

  const categoryOptions = ['Platform', 'System', 'Homepage', 'ETC'];

  const categories = [
    { id: 'all', label: 'ALL' },
    { id: 'platform', label: 'Platform' },
    { id: 'system', label: 'System' },
    { id: 'homepage', label: 'Homepage' },
    { id: 'etc', label: 'ETC' },
  ];

  const years = ['all', '2025', '2024', '2023', '2022', '2021', '2020'];
  
  const scales = [
    { id: 'all', label: 'ALL' },
    { id: 'LV1', label: 'LV1' },
    { id: 'LV2', label: 'LV2' },
    { id: 'LV3', label: 'LV3' },
    { id: 'LV4', label: 'LV4' },
    { id: 'LV5', label: 'LV5' },
    { id: 'LV6', label: 'LV6' },
  ];

  const serviceTypes = [
    { id: 'all', label: 'ALL' },
    { id: 'content', label: language === 'ko' ? '정보전달' : 'Content' },
    { id: 'community', label: language === 'ko' ? '커뮤니티' : 'Community' },
    { id: 'sns', label: 'SNS' },
    { id: 'brokerage', label: language === 'ko' ? '중개' : 'Brokerage' },
    { id: 'o2o', label: 'O2O' },
    { id: 'booking', label: language === 'ko' ? '예약/신청' : 'Booking' },
    { id: 'commerce', label: language === 'ko' ? '커머스' : 'Commerce' },
    { id: 'etc', label: language === 'ko' ? '기타' : 'ETC' },
  ];

  // 정렬 함수 (미리보기용 - 적용 버튼 누르기 전)
  const getSortedPortfolios = (portfolioList: Portfolio[]) => {
    const sorted = [...portfolioList];
    
    // hasSortChanges가 false면 order 기준으로 정렬 (저장된 순서 유지)
    if (!hasSortChanges) {
      return sorted.sort((a, b) => {
        const orderA = a.order ?? 999999;
        const orderB = b.order ?? 999999;
        return orderA - orderB;
      });
    }
    
    // hasSortChanges가 true면 선택한 정렬 방식으로 정렬
    if (sortType === 'date') {
      // 날짜순 정렬 (최신순)
      return sorted.sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        return dateB - dateA;
      });
    } else if (sortType === 'lv-high') {
      // LV 높은순 (LV6 → LV5 → LV4 → ...)
      return sorted.sort((a, b) => {
        const numA = parseInt(a.scale.replace(/[^0-9]/g, '')) || 0;
        const numB = parseInt(b.scale.replace(/[^0-9]/g, '')) || 0;
        return numB - numA;
      });
    } else {
      // LV 낮은순 (LV1 → LV2 → LV3 → ...)
      return sorted.sort((a, b) => {
        const numA = parseInt(a.scale.replace(/[^0-9]/g, '')) || 0;
        const numB = parseInt(b.scale.replace(/[^0-9]/g, '')) || 0;
        return numA - numB;
      });
    }
  };

  // 6가지 필터링된 포트폴리오 (카테고리, 태그, 년도, 규모, 서비스 유형, 주요기능)
  const filteredPortfoliosBeforeSort = portfolios.filter((portfolio) => {
    // 카테고리 필터
    const categoryMatch =
      activeCategory === 'all' ||
      portfolio.category.toLowerCase() === activeCategory.toLowerCase();
    
    // 년도 필터
    const yearMatch =
      activeYear === 'all' ||
      (portfolio.date && portfolio.date.startsWith(activeYear));
    
    // 태그 필터 (다중 선택 - 선택된 태그 중 하나라도 있으면 표시)
    const tagMatch =
      activeTags.length === 0 ||
      (portfolio.tags && portfolio.tags.some((tag: string) => activeTags.includes(tag)));
    
    // 규모 필터
    const scaleMatch =
      activeScale === 'all' ||
      portfolio.scale === activeScale;

    // 서비스 유형 필터
    const serviceTypeMatch =
      activeServiceType === 'all' ||
      (portfolio.serviceType && portfolio.serviceType.includes(activeServiceType));

    // 주요기능 필터
    const keyFeatureMatch =
      activeKeyFeature === 'all' ||
      (portfolio.key_features && portfolio.key_features.includes(activeKeyFeature));

    return categoryMatch && yearMatch && tagMatch && scaleMatch && serviceTypeMatch && keyFeatureMatch;
  });

  // 필터링 후 정렬 적용
  const filteredPortfolios = getSortedPortfolios(filteredPortfoliosBeforeSort);

  // 포트폴리오 목록 불러오기
  const fetchPortfolios = async () => {
    try {
      setIsLoading(true);
      console.log('Admin - Fetching portfolios...');
      
      // Check if projectId and publicAnonKey are available
      if (!projectId || !publicAnonKey) {
        console.warn('Supabase credentials not available');
        setPortfolios([]);
        return;
      }
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/portfolios`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      console.log('Admin - Portfolio response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Admin - Portfolio fetch error response:', errorText);
        throw new Error(`Failed to fetch portfolios: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('=== FETCH PORTFOLIOS DEBUG ===');
      console.log('Raw response data:', JSON.stringify(data, null, 2));
      console.log('Portfolios array:', data.portfolios);
      console.log('First portfolio:', data.portfolios?.[0]);
      
      if (data.portfolios && data.portfolios.length > 0) {
        data.portfolios.forEach((p: any, index: number) => {
          console.log(`Portfolio ${index} - ID:`, p.id, '| Full object:', p);
        });
      }
      
      // order 기준으로 정렬해서 저장 (저장된 순서 유지)
      const sortedByOrder = (data.portfolios || []).sort((a: Portfolio, b: Portfolio) => {
        const orderA = a.order ?? 999999;
        const orderB = b.order ?? 999999;
        return orderA - orderB;
      });
      
      setPortfolios(sortedByOrder);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
      console.error('Error details:', error instanceof Error ? error.message : String(error));
      toast.error(language === 'ko' ? '포트폴리오 목록을 불러오지 못했습니다.' : 'Failed to fetch portfolios.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  // 모달 열기
  const handleOpenModal = (portfolio?: Portfolio) => {
    if (portfolio) {
      setEditingId(portfolio.id);
      
      // 기존 포트폴리오의 key_features를 keyFeatureOptions에 자동 추가
      if (portfolio.key_features && portfolio.key_features.length > 0) {
        const newFeatures = portfolio.key_features.filter(
          feature => !keyFeatureOptions.includes(feature)
        );
        if (newFeatures.length > 0) {
          setKeyFeatureOptions([...keyFeatureOptions, ...newFeatures]);
        }
      }
      
      // 기존 포트폴리오의 tech_stack을 techStackOptions에 자동 추가
      if (portfolio.tech_stack && portfolio.tech_stack.length > 0) {
        const newTechStacks = portfolio.tech_stack.filter(
          tech => !techStackOptions.includes(tech)
        );
        if (newTechStacks.length > 0) {
          setTechStackOptions([...techStackOptions, ...newTechStacks]);
        }
      }
      
      setFormData({
        ...portfolio,
        // Ensure all optional fields have values
        url: portfolio.url || '',
        url_playstore: portfolio.url_playstore || '',
        url_appstore: portfolio.url_appstore || '',
        url_web: portfolio.url_web || '',
        key_features: portfolio.key_features || [],
        tech_stack: portfolio.tech_stack || [],
        contentImages: portfolio.contentImages || []
      });
    } else {
      setEditingId(null);
      setFormData({
        title_ko: '',
        title_en: '',
        category: 'Platform',
        tags: [],
        scale: 'LV1',
        serviceType: [],
        description_ko: '',
        description_en: '',
        coverImage: '',
        url: '',
        url_playstore: '',
        url_appstore: '',
        url_web: '',
        key_features: [],
        tech_stack: [],
        contentImages: [],
        is_service_ended: false,
        is_internal_project: false
      });
    }
    setIsModalOpen(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  // 서비스 토글
  const toggleService = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services?.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...(prev.services || []), serviceId]
    }));
  };

  // 태그 토글
  const toggleTag = (tagId: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.includes(tagId)
        ? prev.tags.filter(t => t !== tagId)
        : [...(prev.tags || []), tagId]
    }));
  };

  // 한국어 -> 영어 번역 함수
  const translateToEnglish = async (text: string): Promise<string> => {
    if (!text.trim()) return '';
    
    try {
      setIsTranslating(true);
      
      // MyMemory Translation API (무료, API 키 불필요)
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=ko|en`
      );
      
      if (!response.ok) {
        throw new Error('Translation failed');
      }
      
      const data = await response.json();
      return data.responseData.translatedText || text;
    } catch (error) {
      console.error('Translation error:', error);
      // 번역 실패 시 원본 텍스트 반환
      return text;
    } finally {
      setIsTranslating(false);
    }
  };

  // 설명 자동 번역
  const handleDescriptionChange = async (value: string) => {
    setFormData(prev => ({ ...prev, description_ko: value }));
    
    // Debounce translation
    if (value.trim()) {
      const translated = await translateToEnglish(value);
      setFormData(prev => ({ ...prev, description_en: translated }));
    } else {
      setFormData(prev => ({ ...prev, description_en: '' }));
    }
  };

  // 포트폴리오 저장
  const handleSave = async () => {
    // 필수 필드 검증
    console.log('=== SAVE VALIDATION DEBUG ===');
    console.log('formData:', formData);
    console.log('title_ko:', formData.title_ko, 'length:', formData.title_ko?.length);
    console.log('title_en:', formData.title_en, 'length:', formData.title_en?.length);
    console.log('category:', formData.category);
    
    if (!formData.title_ko?.trim() || !formData.title_en?.trim() || !formData.category) {
      toast.error(language === 'ko' ? '필수 항목을 입력해주세요.' : 'Please fill in required fields.');
      return;
    }

    setIsLoading(true);
    try {
      const url = editingId
        ? `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/portfolios/${editingId}`
        : `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/portfolios`;

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
        console.error('Server error:', errorData);
        throw new Error(errorData.error || 'Failed to save portfolio');
      }

      toast.success(
        language === 'ko' 
          ? editingId ? '포트폴리오가 수정되었습니다.' : '포트폴리오가 등록되었습니다.'
          : editingId ? 'Portfolio updated.' : 'Portfolio created.'
      );

      handleCloseModal();
      fetchPortfolios();
    } catch (error) {
      console.error('Error saving portfolio:', error);
      toast.error(language === 'ko' ? '저장에 실패했습니다.' : 'Failed to save.');
    } finally {
      setIsLoading(false);
    }
  };

  // 포트폴리오 삭제
  const handleDelete = async (id: string) => {
    if (!confirm(language === 'ko' ? '정말 삭제하시겠습니까?' : 'Are you sure you want to delete?')) {
      return;
    }

    setIsLoading(true);
    try {
      console.log('=== DELETE DEBUG ===');
      console.log('Original ID:', id);
      console.log('Portfolio object:', portfolios.find(p => p.id === id));
      
      // ID가 undefined이거나 null인 경우 처리
      if (!id) {
        throw new Error('Portfolio ID is missing');
      }
      
      // ID가 이미 'portfolio:' 접두사를 포함하고 있는지 확인
      let cleanId = id;
      if (id.startsWith('portfolio:')) {
        cleanId = id.substring('portfolio:'.length);
      }
      
      console.log('Clean ID for API:', cleanId);
      console.log('Full URL:', `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/portfolios/${cleanId}`);
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/portfolios/${cleanId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);
      
      if (!response.ok) {
        console.error('Delete failed:', responseData);
        throw new Error(responseData.error || 'Failed to delete portfolio');
      }

      toast.success(language === 'ko' ? '포트폴리오가 삭제되었습니다.' : 'Portfolio deleted.');
      fetchPortfolios();
    } catch (error) {
      console.error('Error deleting portfolio:', error);
      toast.error(language === 'ko' ? '삭제에 실패했습니다.' : 'Failed to delete.');
    } finally {
      setIsLoading(false);
    }
  };

  // 순서 변경 (로컬만, 저장 안 함)
  const movePortfolio = (dragIndex: number, hoverIndex: number) => {
    const newPortfolios = [...portfolios];
    const dragItem = newPortfolios[dragIndex];
    
    newPortfolios.splice(dragIndex, 1);
    newPortfolios.splice(hoverIndex, 0, dragItem);
    
    // order 값 업데이트
    const updatedPortfolios = newPortfolios.map((p, i) => ({
      ...p,
      order: i
    }));
    
    setPortfolios(updatedPortfolios);
    setHasOrderChanges(true);
  };

  // 순서 저장
  const saveOrder = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/portfolios/reorder`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            portfolios: portfolios.map(p => ({ id: p.id, order: p.order }))
          })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update order');
      }

      toast.success(language === 'ko' ? '순서가 저장되었습니다.' : 'Order saved successfully.');
      setHasOrderChanges(false);
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error(language === 'ko' ? '순서 저장에 실패했습니다.' : 'Failed to save order.');
      // 에러 발생 시 원래 순서로 복원
      fetchPortfolios();
      setHasOrderChanges(false);
    } finally {
      setIsLoading(false);
    }
  };

  // 정렬 순서 적용 및 저장
  const applySortOrder = () => {
    const sortedList = getSortedPortfolios(portfolios);
    const updatedPortfolios = sortedList.map((p, index) => ({
      ...p,
      order: index
    }));
    setPortfolios(updatedPortfolios);
    setHasSortChanges(false);
    setHasOrderChanges(true); // 드래그 변경과 동일하게 처리
  };

  // 맨 위로 이동 (필터링된 배열 기준)
  const moveToTop = (filteredIndex: number) => {
    if (filteredIndex === 0) return;
    
    const portfolioId = filteredPortfolios[filteredIndex].id;
    const realIndex = portfolios.findIndex(p => p.id === portfolioId);
    
    if (realIndex <= 0) return;
    movePortfolio(realIndex, 0);
  };

  // 한 칸 위로 이동 (필터링된 배열 기준)
  const moveUp = (filteredIndex: number) => {
    if (filteredIndex === 0) return;
    
    const currentId = filteredPortfolios[filteredIndex].id;
    const prevId = filteredPortfolios[filteredIndex - 1].id;
    
    const currentRealIndex = portfolios.findIndex(p => p.id === currentId);
    const prevRealIndex = portfolios.findIndex(p => p.id === prevId);
    
    if (currentRealIndex <= 0 || prevRealIndex < 0) return;
    movePortfolio(currentRealIndex, prevRealIndex);
  };

  // 한 칸 아래로 이동 (필터링된 배열 기준)
  const moveDown = (filteredIndex: number) => {
    if (filteredIndex === filteredPortfolios.length - 1) return;
    
    const currentId = filteredPortfolios[filteredIndex].id;
    const nextId = filteredPortfolios[filteredIndex + 1].id;
    
    const currentRealIndex = portfolios.findIndex(p => p.id === currentId);
    const nextRealIndex = portfolios.findIndex(p => p.id === nextId);
    
    if (currentRealIndex < 0 || nextRealIndex >= portfolios.length) return;
    movePortfolio(currentRealIndex, nextRealIndex);
  };

  // 맨 아래로 이동 (필터링된 배열 기준)
  const moveToBottom = (filteredIndex: number) => {
    if (filteredIndex === filteredPortfolios.length - 1) return;
    
    const portfolioId = filteredPortfolios[filteredIndex].id;
    const realIndex = portfolios.findIndex(p => p.id === portfolioId);
    
    if (realIndex < 0 || realIndex >= portfolios.length - 1) return;
    movePortfolio(realIndex, portfolios.length - 1);
  };

  // 특정 위치로 이동 (필터링된 배열 기준)
  const moveToPosition = (filteredFromIndex: number, filteredToIndex: number) => {
    if (filteredFromIndex === filteredToIndex) return;
    
    const fromId = filteredPortfolios[filteredFromIndex].id;
    const toId = filteredPortfolios[filteredToIndex].id;
    
    const fromRealIndex = portfolios.findIndex(p => p.id === fromId);
    const toRealIndex = portfolios.findIndex(p => p.id === toId);
    
    if (fromRealIndex < 0 || toRealIndex < 0) return;
    movePortfolio(fromRealIndex, toRealIndex);
  };

  // 이미지 압축 함수
  const compressImage = async (file: File, maxSizeMB: number = 5, maxDimension: number = 1920): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // 이미지 크기 조정 (maxDimension 기준)
          if (width > height) {
            if (width > maxDimension) {
              height = (height * maxDimension) / width;
              width = maxDimension;
            }
          } else {
            if (height > maxDimension) {
              width = (width * maxDimension) / height;
              height = maxDimension;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          // 품질을 조정하며 압축 (최소 품질 0.7로 유지하여 이미지 깨짐 방지)
          let quality = 0.95;
          const tryCompress = () => {
            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  reject(new Error('Failed to compress image'));
                  return;
                }
                
                // 파일 크기가 maxSizeMB 이하면 성공 (단, 품질이 0.7 미만이면 중단)
                if (blob.size <= maxSizeMB * 1024 * 1024 || quality <= 0.7) {
                  const compressedFile = new File([blob], file.name, {
                    type: 'image/jpeg',
                    lastModified: Date.now(),
                  });
                  console.log(`Compressed with quality ${quality}: ${(blob.size / 1024 / 1024).toFixed(2)}MB`);
                  resolve(compressedFile);
                } else {
                  // 품질을 조금씩 낮춰서 다시 시도
                  quality -= 0.05;
                  tryCompress();
                }
              },
              'image/jpeg',
              quality
            );
          };
          
          tryCompress();
        };
        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };
      };
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
    });
  };

  // 이미지 업로드
  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    try {
      // 파일 크기 체크 및 압축
      let uploadFile = file;
      const maxSizeMB = 5;
      
      if (file.size > maxSizeMB * 1024 * 1024) {
        toast.info(
          language === 'ko' 
            ? '이미지가 너무 큽니다. 자동으로 압축합니다...' 
            : 'Image is too large. Compressing automatically...'
        );
        
        try {
          uploadFile = await compressImage(file, maxSizeMB, 2560);
          console.log('Original size:', (file.size / 1024 / 1024).toFixed(2), 'MB');
          console.log('Compressed size:', (uploadFile.size / 1024 / 1024).toFixed(2), 'MB');
        } catch (error) {
          console.error('Error compressing image:', error);
          toast.error(
            language === 'ko' 
              ? '이미지 압축에 실패했습니다. 더 작은 이미지를 선택해주세요.' 
              : 'Failed to compress image. Please select a smaller image.'
          );
          setIsUploading(false);
          return;
        }
      }

      const formDataToSend = new FormData();
      formDataToSend.append('file', uploadFile);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/upload-image`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: formDataToSend
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to upload image');
      }

      const data = await response.json();
      console.log('Image uploaded:', data);

      // Update coverImage with the signed URL
      setFormData(prev => ({ ...prev, coverImage: data.url }));
      toast.success(language === 'ko' ? '이미지가 업로드되었습니다.' : 'Image uploaded successfully.');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error(language === 'ko' ? '이미지 업로드에 실패했습니다.' : 'Failed to upload image.');
    } finally {
      setIsUploading(false);
    }
  };

  // 메인 이미지 업로드
  const handleMainImageUpload = async (file: File) => {
    setIsUploadingMain(true);
    try {
      // 파일 크기 체크 및 압축
      let uploadFile = file;
      const maxSizeMB = 10;
      
      if (file.size > maxSizeMB * 1024 * 1024) {
        toast.info(
          language === 'ko' 
            ? '이미지가 너무 큽니다. 자동으로 압축합니다...' 
            : 'Image is too large. Compressing automatically...'
        );
        
        try {
          uploadFile = await compressImage(file, maxSizeMB);
          console.log('Original size:', (file.size / 1024 / 1024).toFixed(2), 'MB');
          console.log('Compressed size:', (uploadFile.size / 1024 / 1024).toFixed(2), 'MB');
        } catch (error) {
          console.error('Error compressing image:', error);
          toast.error(
            language === 'ko' 
              ? '이미지 압축에 실패했습니다. 더 작은 이미지를 선택해주세요.' 
              : 'Failed to compress image. Please select a smaller image.'
          );
          setIsUploadingMain(false);
          return;
        }
      }

      const formDataToSend = new FormData();
      formDataToSend.append('file', uploadFile);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/upload-image`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: formDataToSend
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.error('Upload failed. Status:', response.status, 'Error:', error);
        throw new Error(error.error || 'Failed to upload image');
      }

      const data = await response.json();
      console.log('Main image uploaded:', data);

      // Update mainImage with the signed URL
      setFormData(prev => ({ ...prev, mainImage: data.url }));
      toast.success(language === 'ko' ? '메인 이미지가 업로드되었습니다.' : 'Main image uploaded successfully.');
    } catch (error) {
      console.error('Error uploading main image:', error);
      toast.error(language === 'ko' ? `메인 이미지 업로드에 실패했습니다: ${error.message}` : `Failed to upload main image: ${error.message}`);
    } finally {
      setIsUploadingMain(false);
    }
  };

  // 본문 이미지 업로드 (여러 개)
  const handleContentImagesUpload = async (files: FileList) => {
    if (!files || files.length === 0) return;
    
    setIsUploadingContent(true);
    const uploadedUrls: string[] = [];
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // 파일 크기 체크 및 압축 (서버 제한에 맞춰 5MB로)
        let uploadFile = file;
        const maxSizeMB = 5; // 서버 제한에 맞춤
        
        // 파일이 크면 무조건 압축 시도
        if (file.size > maxSizeMB * 1024 * 1024) {
          toast.info(
            language === 'ko' 
              ? `${file.name} 압축 중...` 
              : `Compressing ${file.name}...`
          );
          
          try {
            uploadFile = await compressImage(file, maxSizeMB, 2560); // 2560px 최대 크기
            console.log(`Image ${i + 1} - Original:`, (file.size / 1024 / 1024).toFixed(2), 'MB');
            console.log(`Image ${i + 1} - Compressed:`, (uploadFile.size / 1024 / 1024).toFixed(2), 'MB');
          } catch (error) {
            console.error(`Error compressing image ${i + 1}:`, error);
            toast.error(
              language === 'ko' 
                ? `${file.name} 압축 실패. 다른 이미지를 선택해주세요.` 
                : `Failed to compress ${file.name}. Please select another image.`
            );
            continue;
          }
        }

        const formDataToSend = new FormData();
        formDataToSend.append('file', uploadFile);

        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/upload-image`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`
            },
            body: formDataToSend
          }
        );

        if (!response.ok) {
          const error = await response.json();
          console.error(`Upload failed for ${file.name}:`, error);
          toast.error(
            language === 'ko' 
              ? `${file.name} 업로드 실패: ${error.error || '알 수 없는 오류'}` 
              : `Failed to upload ${file.name}: ${error.error || 'Unknown error'}`
          );
          continue;
        }

        const data = await response.json();
        uploadedUrls.push(data.url);
      }

      if (uploadedUrls.length > 0) {
        // 기존 이미지에 추가
        setFormData(prev => ({ 
          ...prev, 
          contentImages: [...(prev.contentImages || []), ...uploadedUrls]
        }));
        toast.success(
          language === 'ko' 
            ? `${uploadedUrls.length}개 이미지가 업로드되었습니다.` 
            : `${uploadedUrls.length} image(s) uploaded successfully.`
        );
      }
    } catch (error) {
      console.error('Error uploading content images:', error);
      toast.error(language === 'ko' ? '이미지 업로드에 실패했습니다.' : 'Failed to upload images.');
    } finally {
      setIsUploadingContent(false);
    }
  };

  // 본문 이미지 삭제
  const removeContentImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      contentImages: prev.contentImages?.filter((_, i) => i !== index) || []
    }));
  };

  // 샘플 데이터 마이그레이션
  const importSampleData = async () => {
    if (!confirm(language === 'ko' 
      ? '메인 페이지의 샘플 프로젝트들을 가져오시겠습니까? (기존 데이터는 유지됩니다)' 
      : 'Import sample projects from main page? (Existing data will be kept)')) {
      return;
    }

    const sampleProjects = [
      {
        title_ko: "넥슨 게임결제테캠",
        title_en: "Nexon Game Payment Techcamp",
        description_ko: "안드에 버퍼하는 게임결제 내 주요 인사이트",
        description_en: "Key insights on game payment buffering on Android",
        category: "Web",
        services: ["consulting", "mvp"],
        coverImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
        url: "01",
        key_features: ["실시간 결제 처리", "안드로이드 최적화", "보안 강화"],
        contentImages: [
          "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
          "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80"
        ]
      },
      {
        title_ko: "CS전드 타워 문서 자동화 시스템",
        title_en: "Tower Doc Automation System",
        description_ko: "서류 로컬 시동 성상 및 전자 결재 시스템",
        description_en: "Document local startup and electronic approval system",
        category: "Program",
        services: ["consulting", "product"],
        coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        url: "02",
        key_features: ["문서 자동 생성", "전자 결재 워크플로우", "실시간 알림"],
        contentImages: [
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
        ]
      },
      {
        title_ko: "하루링크",
        title_en: "Haru Link",
        description_ko: "글로벌 필터링크 서비스",
        description_en: "Global filtering service",
        category: "Web",
        services: ["uxui", "mvp", "product"],
        coverImage: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
        url: "03",
        key_features: ["링크 필터링", "다국어 지원", "사용자 맞춤 추천"],
        contentImages: [
          "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
          "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80"
        ]
      },
      {
        title_ko: "주류상회 Be",
        title_en: "Beverage Commerce Be",
        description_ko: "위스키 온디 맨드",
        description_en: "Whiskey On Demand",
        category: "Web",
        services: ["uxui", "mvp"],
        coverImage: "https://images.unsplash.com/photo-1551817958-20c0e5a31e5d?w=800&q=80",
        url: "04",
        key_features: ["위스키 카탈로그", "온디맨드 주문", "배송 추적"],
        contentImages: [
          "https://images.unsplash.com/photo-1551817958-20c0e5a31e5d?w=800&q=80",
          "https://images.unsplash.com/photo-1551817958-20c0e5a31e5d?w=800&q=80"
        ]
      },
      {
        title_ko: "비비메쌀현구스",
        title_en: "Vivi Research",
        description_ko: "기록당 관리자들을 위한 백엔결괘 서비스",
        description_en: "Backend service for record managers",
        category: "Web",
        services: ["consulting", "product", "rnd"],
        coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
        url: "05",
        key_features: ["데이터 수집", "실시간 분석", "API 제공"],
        contentImages: [
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"
        ]
      },
      {
        title_ko: "포인캠퍼스",
        title_en: "Point Campus",
        description_ko: "종자서도 쉽게 운영하는 나스 라인 템섹스",
        description_en: "Easy online campus management",
        category: "Program",
        services: ["consulting", "mvp", "product"],
        coverImage: "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&q=80",
        url: "06",
        key_features: ["학생 관리", "강의 스케줄링", "온라인 시험"],
        contentImages: [
          "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&q=80",
          "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&q=80"
        ]
      }
    ];

    setIsLoading(true);
    let successCount = 0;
    let failCount = 0;

    try {
      for (const project of sampleProjects) {
        try {
          const response = await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/portfolios`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${publicAnonKey}`
              },
              body: JSON.stringify(project)
            }
          );

          if (response.ok) {
            successCount++;
          } else {
            failCount++;
            console.error('Failed to import:', project.title_ko);
          }
        } catch (error) {
          failCount++;
          console.error('Error importing project:', project.title_ko, error);
        }
      }

      if (successCount > 0) {
        toast.success(
          language === 'ko' 
            ? `${successCount}개의 샘플 프로젝트를 가져왔습니다.${failCount > 0 ? ` (${failCount}개 실패)` : ''}`
            : `Imported ${successCount} sample projects.${failCount > 0 ? ` (${failCount} failed)` : ''}`
        );
        fetchPortfolios();
      } else {
        toast.error(language === 'ko' ? '샘플 데이터 져오기에 실패했습니다.' : 'Failed to import sample data.');
      }
    } catch (error) {
      console.error('Error importing sample data:', error);
      toast.error(language === 'ko' ? '샘플 데이터 가져오기에 실패했습니다.' : 'Failed to import sample data.');
    } finally {
      setIsLoading(false);
    }
  };

  // 카테고리 일괄 업데이트 (web/app -> Platform)
  const batchUpdateCategory = async () => {
    if (!confirm(language === 'ko' 
      ? 'web과 app 카테고리를 모두 Platform으로 변경하시겠습니까?' 
      : 'Do you want to change all web and app categories to Platform?')) {
      return;
    }

    try {
      setIsLoading(true);
      console.log('Starting batch category update...');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/portfolios/batch-update-category`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Batch update error:', errorText);
        throw new Error('Failed to batch update categories');
      }

      const result = await response.json();
      console.log('Batch update result:', result);
      
      toast.success(
        language === 'ko' 
          ? `${result.updatedCount}개의 포트폴리오 카테고리를 업데이트했습니다.` 
          : `Updated ${result.updatedCount} portfolios.`
      );
      
      // Refresh the list
      await fetchPortfolios();
    } catch (error) {
      console.error('Error batch updating categories:', error);
      toast.error(
        language === 'ko' 
          ? '카테고리 일괄 업데이트에 실패했습니다.' 
          : 'Failed to batch update categories.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-medium text-gray-900">
            {language === 'ko' ? '포트폴리오 관리' : 'Portfolio Management'} 
            <span className="ml-2 text-[#0079FF]">({portfolios.length})</span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {language === 'ko' 
              ? '포트폴리오를 등록하고 관리합니다.' 
              : 'Register and manage your portfolios.'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {hasOrderChanges && (
            <Button
              onClick={saveOrder}
              className="flex items-center gap-2 h-12 bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              {language === 'ko' ? '순서 저장' : 'Save Order'}
            </Button>
          )}
          <Button
            onClick={batchUpdateCategory}
            variant="outline"
            className="flex items-center gap-2 h-12 bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
            disabled={isLoading}
          >
            <Upload className="w-4 h-4" />
            {language === 'ko' ? 'Web/App → Platform' : 'Web/App → Platform'}
          </Button>
          <Button
            onClick={importSampleData}
            variant="outline"
            className="flex items-center gap-2 h-12"
            disabled={isLoading}
          >
            <Upload className="w-4 h-4" />
            {language === 'ko' ? '샘플 데이터 가져오기' : 'Import Sample Data'}
          </Button>
          <Button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 h-12"
          >
            <Plus className="w-4 h-4" />
            {language === 'ko' ? '포트폴리오 등록' : 'Add Portfolio'}
          </Button>
        </div>
      </div>

      {/* 4가지 필터 (좌측 정렬) */}
      {portfolios.length > 0 && (
        <div className="border border-gray-200 rounded-xl bg-white">
          {/* Filter Header with Toggle Button */}
          <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => setIsFilterExpanded(!isFilterExpanded)}>
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-medium text-gray-900">
                {language === 'ko' ? '필터' : 'Filters'}
              </h3>
              {(activeCategory !== 'all' || activeYear !== 'all' || activeTags.length > 0 || activeScale !== 'all') && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCategory('all');
                    setActiveYear('all');
                    setActiveTags([]);
                    setActiveScale('all');
                  }}
                  className="text-sm text-[#0079FF] hover:text-[#0060CC] transition-colors"
                >
                  {language === 'ko' ? '필터 초기화' : 'Reset Filters'}
                </button>
              )}
            </div>
            <button className="text-gray-600 hover:text-gray-900 transition-colors">
              {isFilterExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
          
          {/* Filter Content */}
          {isFilterExpanded && (
            <div className="px-4 pb-4 space-y-4 border-t border-gray-200 pt-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ko' ? '카테고리' : 'Category'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-5 h-10 rounded-full transition-all text-sm ${
                        activeCategory === cat.id
                          ? 'bg-[#0079FF] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tag Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ko' ? '태그 (다중 선택 가능)' : 'Tags (Multiple Selection)'}
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      if (activeTags.length === tagOptions.length) {
                        setActiveTags([]);
                      } else {
                        setActiveTags(tagOptions.map(t => t.id));
                      }
                    }}
                    className={`px-5 h-10 rounded-full transition-all text-sm ${
                      activeTags.length === tagOptions.length
                        ? 'bg-[#0079FF] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    ALL
                  </button>
                  {tagOptions.map((tag) => (
                    <button
                      key={tag.id}
                      onClick={() => {
                        if (activeTags.includes(tag.id)) {
                          setActiveTags(activeTags.filter(t => t !== tag.id));
                        } else {
                          setActiveTags([...activeTags, tag.id]);
                        }
                      }}
                      className={`px-5 h-10 rounded-full transition-all text-sm ${
                        activeTags.includes(tag.id)
                          ? 'bg-[#0079FF] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Year Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ko' ? '년도' : 'Year'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => setActiveYear(year)}
                      className={`px-5 h-10 rounded-full transition-all text-sm ${
                        activeYear === year
                          ? 'bg-[#0079FF] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {year === 'all' ? 'ALL' : year}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scale Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ko' ? '규모' : 'Scale'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {scales.map((scale) => (
                    <button
                      key={scale.id}
                      onClick={() => setActiveScale(scale.id)}
                      className={`px-5 h-10 rounded-full transition-all text-sm ${
                        activeScale === scale.id
                          ? 'bg-[#0079FF] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {scale.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ko' ? '서비스 유형' : 'Service Type'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {serviceTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setActiveServiceType(type.id)}
                      className={`px-5 h-10 rounded-full transition-all text-sm ${
                        activeServiceType === type.id
                          ? 'bg-[#0079FF] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Key Feature Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ko' ? '주요기능' : 'Key Features'}
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveKeyFeature('all')}
                    className={`px-5 h-10 rounded-full transition-all text-sm ${
                      activeKeyFeature === 'all'
                        ? 'bg-[#0079FF] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    ALL
                  </button>
                  {keyFeatureOptions.map((feature) => (
                    <button
                      key={feature}
                      onClick={() => setActiveKeyFeature(feature)}
                      className={`px-5 h-10 rounded-full transition-all text-sm ${
                        activeKeyFeature === feature
                          ? 'bg-[#0079FF] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {feature}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sort Dropdown */}
      {portfolios.length > 0 && (
        <div className="flex justify-end items-center gap-3">
          <select
            value={sortType}
            onChange={(e) => {
              setSortType(e.target.value as 'date' | 'lv-high' | 'lv-low');
              setHasSortChanges(true);
            }}
            className="px-4 py-2 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
          >
            <option value="date">{language === 'ko' ? '최신순' : 'Latest'}</option>
            <option value="lv-high">{language === 'ko' ? 'LV 높은순' : 'LV High to Low'}</option>
            <option value="lv-low">{language === 'ko' ? 'LV 낮은순' : 'LV Low to High'}</option>
          </select>
          {hasSortChanges && (
            <Button
              onClick={applySortOrder}
              className="h-10 px-6 bg-[#0079FF] hover:bg-[#0060CC]"
            >
              {language === 'ko' ? '정렬 순서 적용' : 'Apply Sort'}
            </Button>
          )}
        </div>
      )}

      {/* Portfolio List */}
      <div className="bg-white rounded-xl border border-gray-200">
        {isLoading && portfolios.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : portfolios.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">
              {language === 'ko' ? '등록된 포트폴리오가 없습니다.' : 'No portfolios registered.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredPortfolios.map((portfolio, index) => {
              console.log('Rendering portfolio:', portfolio);
              console.log('Portfolio ID:', portfolio.id);
              return (
              <DraggablePortfolioItem
                key={portfolio.id}
                portfolio={portfolio}
                index={index}
                totalCount={filteredPortfolios.length}
                movePortfolio={movePortfolio}
                moveToTop={moveToTop}
                moveUp={moveUp}
                moveDown={moveDown}
                moveToBottom={moveToBottom}
                moveToPosition={moveToPosition}
                handleOpenModal={handleOpenModal}
                handleDelete={handleDelete}
                language={language}
              />
            )})}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                {editingId
                  ? (language === 'ko' ? '포트폴리오 수정' : 'Edit Portfolio')
                  : (language === 'ko' ? '포트폴리오 등록' : 'Add Portfolio')}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Title */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ko' ? '제목 (한국어) *' : 'Title (Korean) *'}
                  </label>
                  <Input
                    value={formData.title_ko || ''}
                    onChange={(e) => setFormData({ ...formData, title_ko: e.target.value })}
                    placeholder="프로젝트 타이틀"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ko' ? '제목 (영어) *' : 'Title (English) *'}
                  </label>
                  <Input
                    value={formData.title_en || ''}
                    onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                    placeholder="Project Title"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ko' ? '카테고리 *' : 'Category *'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {categoryOptions.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat as any })}
                      className={`px-6 py-2.5 rounded-xl text-sm transition-colors ${
                        formData.category === cat
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags (다중 선택) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ko' ? '태그 (여러 개 선택 가능)' : 'Tags (Multiple Selection)'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {tagOptions.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(tag.id)}
                      className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                        formData.tags?.includes(tag.id)
                          ? 'bg-[#0079FF] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scale (규모) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ko' ? '프로젝트 규모 *' : 'Project Scale *'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {scaleOptions.map((scale) => (
                    <button
                      key={scale}
                      type="button"
                      onClick={() => setFormData({ ...formData, scale: scale as any })}
                      className={`w-16 h-10 rounded-lg text-sm transition-colors ${
                        formData.scale === scale
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {scale}
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Type (서비스 유형) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ko' ? '서비스 유형 (다중 선택 가능)' : 'Service Type (Multiple Selection)'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {serviceTypeOptions.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => {
                        const currentTypes = formData.serviceType || [];
                        if (currentTypes.includes(type.id)) {
                          setFormData({ 
                            ...formData, 
                            serviceType: currentTypes.filter(t => t !== type.id) 
                          });
                        } else {
                          setFormData({ 
                            ...formData, 
                            serviceType: [...currentTypes, type.id] 
                          });
                        }
                      }}
                      className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                        formData.serviceType?.includes(type.id)
                          ? 'bg-[#0079FF] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {language === 'ko' ? type.label_ko : type.label_en}
                    </button>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ko' ? '주요기능 (사이드바에 표시, 체크박스로 선택)' : 'Key Features (Sidebar, Select with checkboxes)'}
                </label>
                <div className="space-y-2">
                  {/* 주요기능 관리 섹션 */}
                  <div className="flex gap-2 mb-3">
                    <Input
                      value={newKeyFeature}
                      onChange={(e) => setNewKeyFeature(e.target.value)}
                      placeholder={language === 'ko' ? '새로운 주요기능 추가...' : 'Add new key feature...'}
                      className="flex-1"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (newKeyFeature.trim() && !keyFeatureOptions.includes(newKeyFeature.trim())) {
                            setKeyFeatureOptions([...keyFeatureOptions, newKeyFeature.trim()]);
                            setNewKeyFeature('');
                            toast.success(language === 'ko' ? '주요기능이 추가되었습니다.' : 'Key feature added.');
                          }
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        if (newKeyFeature.trim() && !keyFeatureOptions.includes(newKeyFeature.trim())) {
                          setKeyFeatureOptions([...keyFeatureOptions, newKeyFeature.trim()]);
                          setNewKeyFeature('');
                          toast.success(language === 'ko' ? '주요기능이 추가되었습니다.' : 'Key feature added.');
                        }
                      }}
                      className="h-10"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* 주요기능 선택 체크박스 */}
                  <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto border border-gray-200 rounded-lg p-3">
                    {keyFeatureOptions.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 group">
                        <input
                          type="checkbox"
                          id={`feature-${feature}`}
                          checked={formData.key_features?.includes(feature) || false}
                          onChange={(e) => {
                            const currentFeatures = formData.key_features || [];
                            if (e.target.checked) {
                              setFormData({
                                ...formData,
                                key_features: [...currentFeatures, feature]
                              });
                            } else {
                              setFormData({
                                ...formData,
                                key_features: currentFeatures.filter(f => f !== feature)
                              });
                            }
                          }}
                          className="w-4 h-4 rounded border-gray-300 text-[#0079FF] focus:ring-[#0079FF]"
                        />
                        <label 
                          htmlFor={`feature-${feature}`}
                          className="flex-1 text-sm text-gray-700 cursor-pointer"
                        >
                          {feature}
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(language === 'ko' ? `"${feature}"를 삭제하시겠습니까?` : `Delete "${feature}"?`)) {
                              setKeyFeatureOptions(keyFeatureOptions.filter(f => f !== feature));
                              if (formData.key_features?.includes(feature)) {
                                setFormData({
                                  ...formData,
                                  key_features: formData.key_features.filter(f => f !== feature)
                                });
                              }
                              toast.success(language === 'ko' ? '주요기능이 삭제되었습니다.' : 'Key feature deleted.');
                            }
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-3 h-3 text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {language === 'ko' 
                    ? '체크박스로 주요기능을 선택하세요. 새로운 기능은 위의 입력창에서 추가할 수 있습니다.' 
                    : 'Select key features with checkboxes. Add new features using the input above.'}
                </p>
              </div>

              {/* Tech Stack */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ko' ? '기술 스택 (Tech Stack)' : 'Tech Stack'}
                </label>
                <div className="space-y-2">
                  {/* 기술 스택 추가 섹션 */}
                  <div className="flex gap-2 mb-3">
                    <Input
                      value={newTechStack}
                      onChange={(e) => setNewTechStack(e.target.value)}
                      placeholder={language === 'ko' ? '새로운 기술 스택 추가...' : 'Add new tech stack...'}
                      className="flex-1"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (newTechStack.trim() && !techStackOptions.includes(newTechStack.trim())) {
                            setTechStackOptions([...techStackOptions, newTechStack.trim()]);
                            setNewTechStack('');
                            toast.success(language === 'ko' ? '기술 스택이 추가되었습니다.' : 'Tech stack added.');
                          }
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        if (newTechStack.trim() && !techStackOptions.includes(newTechStack.trim())) {
                          setTechStackOptions([...techStackOptions, newTechStack.trim()]);
                          setNewTechStack('');
                          toast.success(language === 'ko' ? '기술 스택이 추가되었습니다.' : 'Tech stack added.');
                        }
                      }}
                      className="h-10"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* 기술 스택 선택 체크박스 */}
                  <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto border border-gray-200 rounded-lg p-3">
                    {techStackOptions.map((tech) => (
                      <div key={tech} className="flex items-center gap-2 group">
                        <input
                          type="checkbox"
                          id={`tech-${tech}`}
                          checked={formData.tech_stack?.includes(tech) || false}
                          onChange={(e) => {
                            const currentTech = formData.tech_stack || [];
                            if (e.target.checked) {
                              setFormData({
                                ...formData,
                                tech_stack: [...currentTech, tech]
                              });
                            } else {
                              setFormData({
                                ...formData,
                                tech_stack: currentTech.filter(t => t !== tech)
                              });
                            }
                          }}
                          className="w-4 h-4 rounded border-gray-300 text-[#0079FF] focus:ring-[#0079FF]"
                        />
                        <label 
                          htmlFor={`tech-${tech}`}
                          className="flex-1 text-sm text-gray-700 cursor-pointer hover:text-[#0079FF] transition-colors"
                          onClick={(e) => {
                            if (techStackInfo[tech]) {
                              e.preventDefault();
                              setSelectedTechInfo(selectedTechInfo === tech ? null : tech);
                            }
                          }}
                          title={techStackInfo[tech] ? (language === 'ko' ? '클릭하여 상세 정보 보기' : 'Click to view details') : ''}
                        >
                          {tech}
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(language === 'ko' ? `"${tech}"를 삭제하시겠습니까?` : `Delete "${tech}"?`)) {
                              setTechStackOptions(techStackOptions.filter(t => t !== tech));
                              if (formData.tech_stack?.includes(tech)) {
                                setFormData({
                                  ...formData,
                                  tech_stack: formData.tech_stack.filter(t => t !== tech)
                                });
                              }
                              toast.success(language === 'ko' ? '기술 스택이 삭제되었습니다.' : 'Tech stack deleted.');
                            }
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-3 h-3 text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  {/* 선택된 기술 스택의 상세 정보 */}
                  {selectedTechInfo && techStackInfo[selectedTechInfo] && (
                    <div className="mt-3 p-4 bg-[#E6F3FF] border border-[#0079FF]/20 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-[#0079FF] text-sm">{selectedTechInfo}</h4>
                        <button
                          type="button"
                          onClick={() => setSelectedTechInfo(null)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {language === 'ko' 
                          ? techStackInfo[selectedTechInfo].description_ko 
                          : techStackInfo[selectedTechInfo].description_en}
                      </p>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {language === 'ko' 
                    ? '기술 이름을 클릭하면 상세 설명을 볼 수 있습니다. 체크박스로 사용한 기술 스택을 선택하세요.' 
                    : 'Click tech name to view details. Select tech stack with checkboxes.'}
                </p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ko' ? '설명 (한국어로 입력하면 자동 번역됩니다)' : 'Description (Auto-translated to English)'}
                </label>
                <Textarea
                  value={formData.description_ko}
                  onChange={(e) => handleDescriptionChange(e.target.value)}
                  placeholder="프로젝트 설명을 입력하세요"
                  rows={4}
                />
                {isTranslating && (
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>{language === 'ko' ? '번역 중...' : 'Translating...'}</span>
                  </div>
                )}
                {formData.description_en && !isTranslating && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-600 mb-1">{language === 'ko' ? '영어 번역:' : 'English Translation:'}</p>
                    <p className="text-sm text-gray-700">{formData.description_en}</p>
                  </div>
                )}
              </div>

              {/* Date & URL */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ko' ? '날짜' : 'Date'}
                    </label>
                    <Input
                      type="date"
                      value={formData.date || ''}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ko' ? '포트폴리오 URL ID (필수)' : 'Portfolio URL ID (Required)'}
                    </label>
                    <Input
                      value={formData.url || ''}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      placeholder="01, 02, project-name"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {language === 'ko' 
                        ? '예: 01 → /potenlab/01' 
                        : 'Ex: 01 → /potenlab/01'}
                    </p>
                  </div>
                </div>

                {/* External URLs */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {language === 'ko' ? '외부 링크 (선택)' : 'External Links (Optional)'}
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <input
                        type="checkbox"
                        id="is_service_ended"
                        checked={formData.is_service_ended || false}
                        onChange={(e) => setFormData({ ...formData, is_service_ended: e.target.checked })}
                        className="w-4 h-4 text-[#0079FF] border-gray-300 rounded focus:ring-[#0079FF]"
                      />
                      <label htmlFor="is_service_ended" className="text-sm text-gray-700 cursor-pointer">
                        {language === 'ko' ? '운영이 종료된 서비스입니다' : 'Service Discontinued'}
                      </label>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <input
                        type="checkbox"
                        id="is_internal_project"
                        checked={formData.is_internal_project || false}
                        onChange={(e) => setFormData({ ...formData, is_internal_project: e.target.checked })}
                        className="w-4 h-4 text-[#0079FF] border-gray-300 rounded focus:ring-[#0079FF]"
                      />
                      <label htmlFor="is_internal_project" className="text-sm text-gray-700 cursor-pointer">
                        {language === 'ko' ? '사내 프로젝트로 상세보기가 제한됩니다' : 'Internal project - Detail view restricted'}
                      </label>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Playstore URL
                      </label>
                      <Input
                        value={formData.url_playstore || ''}
                        onChange={(e) => setFormData({ ...formData, url_playstore: e.target.value })}
                        placeholder="https://play.google.com/store/apps/details?id=..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Appstore URL
                      </label>
                      <Input
                        value={formData.url_appstore || ''}
                        onChange={(e) => setFormData({ ...formData, url_appstore: e.target.value })}
                        placeholder="https://apps.apple.com/app/..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Web URL
                      </label>
                      <Input
                        value={formData.url_web || ''}
                        onChange={(e) => setFormData({ ...formData, url_web: e.target.value })}
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ko' ? '썸네일 이미지 (메인 페이지용)' : 'Thumbnail Image (For Main Page)'}
                </label>
                <div className="space-y-2">
                  <Input
                    value={formData.coverImage || ''}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    placeholder="https://..."
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleImageUpload(file);
                        }
                      }}
                      className="hidden"
                      id="cover-image-upload"
                    />
                    <label htmlFor="cover-image-upload">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="w-full"
                        disabled={isUploading}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById('cover-image-upload')?.click();
                        }}
                      >
                        {isUploading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            {language === 'ko' ? '업로드 중...' : 'Uploading...'}
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4 mr-2" />
                            {language === 'ko' ? '썸네일 업로드' : 'Upload Thumbnail'}
                          </>
                        )}
                      </Button>
                    </label>
                  </div>
                  {formData.coverImage && (
                    <div className="mt-2 relative">
                      <img
                        src={formData.coverImage}
                        alt="Thumbnail preview"
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                      />
                    </div>
                  )}
                  <p className="text-xs text-gray-500">
                    {language === 'ko' 
                      ? '메인 페이지 포트폴리오 목록에 표시되는 썸네일 이미지입니다.' 
                      : 'Thumbnail image displayed in the main portfolio list.'}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-medium text-gray-900 mb-4">
                  {language === 'ko' ? '본문 내용' : 'Content Sections'}
                </h4>
              </div>

              {/* Additional Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ko' ? '본문 이미지 (용량 큰 이미지)' : 'Content Images (Large Size)'}
                </label>
                
                {/* 파일 업로드 버튼 */}
                <div className="mb-3">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files) {
                        handleContentImagesUpload(files);
                      }
                    }}
                    className="hidden"
                    id="content-images-upload"
                  />
                  <label htmlFor="content-images-upload">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full"
                      disabled={isUploadingContent}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('content-images-upload')?.click();
                      }}
                    >
                      {isUploadingContent ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          {language === 'ko' ? '업로드 중...' : 'Uploading...'}
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          {language === 'ko' ? '본문 이미지 업로드 (여러 개 선택 가능)' : 'Upload Content Images (Multiple)'}
                        </>
                      )}
                    </Button>
                  </label>
                </div>

                {/* 업로드된 이미지 미리보기 */}
                {formData.contentImages && formData.contentImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    {formData.contentImages.map((imageUrl, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={imageUrl}
                          alt={`Content ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeContentImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                          {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* URL 직접 입력 (선택사항) */}
                <Textarea
                  value={formData.contentImages?.join('\n') || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    contentImages: e.target.value.split('\n').filter(url => url.trim() !== '')
                  })}
                  placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                  rows={4}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {language === 'ko' 
                    ? '위 업로드 버튼을 사용하거나, 이미지 URL을 한 줄에 하나씩 직접 입력하세요. (최대 10MB, 2560px)' 
                    : 'Use the upload button above or enter image URLs one per line. (Max 10MB, 2560px)'}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3">
              <Button variant="outline" onClick={handleCloseModal}>
                {language === 'ko' ? '취소' : 'Cancel'}
              </Button>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {language === 'ko' ? '저장 중...' : 'Saving...'}
                  </>
                ) : (
                  language === 'ko' ? '저장' : 'Save'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
    </DndProvider>
  );
}