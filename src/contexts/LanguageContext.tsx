import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ko' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ko');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

const translations = {
  ko: {
    header: {
      home: '홈',
      about: '소개',
      services: '서비스',
      partner3: '파트너사3',
      portfolio: '포트폴리오',
      contents: '콘텐츠',
      courses: '자료실',
      resources: '자료실',
      contact: '문의하기'
    },
    hero: {
      badge: '단계별로 필요한 것을 제대로 개발합니다',
      title1: '당신의 잠재력을',
      title2: '현실로 만듭니다!',
      subtitle1: 'IT 컨설팅부터 MVP 개발, AI 솔루션, UX/UI 기획까지',
      subtitle2: '당신의 비즈니스를 한 단계 성장시키는 파트너,',
      cta1: '신청하기',
      cta2: '서비스 둘러보기',
      stats: {
        projects: '완료 프로젝트',
        satisfaction: '고객 만족도',
        support: '기술 지원'
      }
    },
    services: {
      title: '서비스',
      subtitle: 'Potenlab이 제공하는 전문 서비스',
      description: '비즈니스 성장 단계에 맞는 맞춤형 IT 솔루션을 제공합니다',
      consulting: {
        title: 'IT 컨설팅',
        description: '비즈니스 목표에 맞는 최적의 기술 전략을 수립합니다'
      },
      mvp: {
        title: 'MVP 개발',
        description: '빠르게 시장을 검증할 수 있는 MVP를 개발합니다'
      },
      product: {
        title: 'Product 개발',
        description: '대규모 프로젝트와 AI 기술로 비즈니스를 혁신합니다'
      },
      ux: {
        title: 'UX/UI 기획 & 디자인',
        description: '사용자 중심의 직관적인 인터페이스를 설계합니다'
      },
      learnMore: '자세히 보기'
    },
    portfolio: {
      title: '포트폴리오',
      subtitle: '성공 사례',
      description: '다양한 산업 분야에서 고객과 함께 성장해왔습니다',
      viewProject: '프로젝트 보기',
      allProjects: '전체보기',
      projects: {
        fintech: {
          title: '핀테크 모바일 앱',
          description: '직관적인 UX로 금융 서비스 접근성을 혁신한 모바일 뱅킹 애플리케이션'
        },
        fooddelivery: {
          title: '푸드 딜리버리 플랫폼',
          description: '실시간 위치 추적과 스트 매칭 배달 효율성을 극대 플랫폼'
        },
        saas: {
          title: 'B2B SaaS 솔루션',
          description: '기업의 생산성을 높이는 올인원 협업 및 분석 플랫폼'
        },
        aianalytics: {
          title: 'AI 데이터 분석 대시보드',
          description: 'AI 기반 실시간 데이터 분석 및 인사이트 제공 플랫폼'
        },
        chatbot: {
          title: 'AI 챗봇 서비스',
          description: 'GPT-4 기반 고객 응대 자동화 및 24시간 상담 시스템'
        },
        recommendation: {
          title: 'AI 추천 엔진',
          description: '머신러닝 기반 개인화 추천으로 사용자 경험을 향상시킨 시스템'
        },
        designsystem: {
          title: '디자인 시스템 구축',
          description: '확장 가능하고 일관된 사용자 경험을 위한 종합 디자 시스템'
        },
        mobileapp: {
          title: '모바일 앱 UX/UI 디자인',
          description: '사용자 리서치 기반 직관적이고 매력적인 모바일 인터페이스'
        },
        ecommerce: {
          title: '이커머스 UX 최적화',
          description: 'A/B 테스팅과 데이터 분석으로 전환율을 200% 향상시킨 프로젝트'
        }
      }
    },
    contact: {
      title: '신청하기',
      subtitle: '프로젝트 신청',
      description: '새로운 프로젝트에 대해 이야기해보세요',
      form: {
        name: '이름',
        email: '이메일',
        company: '회사명',
        phone: '연락처',
        message: '프로젝트 설명',
        submit: '신청하기',
        inquiryType: '신청종류',
        inquiryTypePlaceholder: '신청종류를 선택해주세요',
        planSelection: '플랜 선택',
        planPlaceholder: '플랜을 선택해주세요',
        projectType: '프로젝트 유형',
        projectTypePlaceholder: '프로젝트 유형을 선택해주세요',
        otherType: '신청 유형',
        otherTypePlaceholder: '신청 유형을 선택해주세요',
        sending: '전송 중...',
        success: '신청이 성공적으로 접수되었습니다!',
        error: '신청 접수 중 오류가 발생했습니다.',
        privacyNote: '제출하신 정보는 안전하게 보관되며, 상담 목적으로만 사용됩니다.'
      },
      types: {
        potenbooster: '포텐부스터',
        project: '프로젝트 개발',
        other: '기타 신청',
        uxui: 'UX/UI 디자인',
        mvp: 'MVP 개발',
        custom: '커스텀 개발',
        rnd: 'R&D 개발',
        website: '홈페이지 구축',
        consulting: '컨설팅',
        partnership: '협업 제안',
        etc: '기타'
      },
      info: {
        title: '연락처 정보',
        email: '이메일',
        phone: '전화',
        address: '주소',
        hours: '운영 시간',
        businessHours: '평일 09:00 - 18:00'
      }
    },
    footer: {
      company: '회사',
      aboutUs: '회사소개',
      team: '팀',
      careers: '채용',
      styleGuide: '스타일 가이드',
      support: '고객지원',
      faq: 'FAQ',
      documentation: '문서',
      legal: '법적 고지',
      privacy: '개인정보처리방침',
      terms: '이용약관',
      admin: '관리자',
      description: 'IT 컨설팅부터 AI 개발까지, 비즈니스 성장의 파트너',
      rights: '© 2025 Potenlab. All rights reserved.'
    },
    styleGuide: {
      title: '스타일 가이드',
      subtitle: 'Potenlab 디자인 시스템',
      slogan: 'Turning Your Potential Into Product',
      designConcept: {
        title: '디자인 컨셉',
        description: '사용자 친화적이고 직관적인 UI'
      },
      colorSystem: {
        title: '컬러 시스템',
        primary: 'Primary',
        secondary: 'Secondary',
        grayScale: 'Gray Scale',
        semantic: 'Semantic Colors',
        success: 'Success',
        caution: 'Caution',
        error: 'Error'
      },
      typography: {
        title: '타이포그래피',
        fontFamily: 'Pretendard',
        heading1: 'Heading 1',
        heading2: 'Heading 2',
        heading3: 'Heading 3',
        heading4: 'Heading 4',
        body: 'Body',
        caption: 'Caption'
      },
      spacing: {
        title: '스페이싱 시스템',
        description: '8px 기반 간격 시스템'
      },
      borderRadius: {
        title: '보더 라운드',
        description: '12px 라운드 컴포넌트'
      },
      buttons: {
        title: '버튼',
        description: '48px 높이 버튼'
      }
    }
  },
  en: {
    header: {
      home: 'Home',
      about: 'About',
      services: 'Service',
      partner3: 'Partner3',
      portfolio: 'Portfolio',
      contents: 'Contents',
      courses: 'Resources',
      resources: 'Resources',
      contact: 'Apply'
    },
    hero: {
      badge: 'We develop exactly what you need at each stage',
      title1: 'Turn Your Potential',
      title2: 'into Reality!',
      subtitle1: 'From IT consulting to MVP development, AI solutions, and UX/UI design',
      subtitle2: 'Your growth partner,',
      cta1: 'Apply Now',
      cta2: 'Explore Services',
      stats: {
        projects: 'Completed Projects',
        satisfaction: 'Client Satisfaction',
        support: 'Tech Support'
      }
    },
    services: {
      title: 'Services',
      subtitle: 'Professional Services by Potenlab',
      description: 'We provide customized IT solutions tailored to your business growth stage',
      consulting: {
        title: 'IT Consulting',
        description: 'Establish optimal technology strategies aligned with your business goals'
      },
      mvp: {
        title: 'MVP Development',
        description: 'Develop MVPs to quickly validate your market'
      },
      product: {
        title: 'Product Development',
        description: 'Innovate your business with large-scale projects and AI technology'
      },
      ux: {
        title: 'UX/UI Design',
        description: 'Design user-centered, intuitive interfaces'
      },
      learnMore: 'Learn More'
    },
    portfolio: {
      title: 'Portfolio',
      subtitle: 'Success Stories',
      description: 'We have grown together with clients across various industries',
      viewProject: 'View Project',
      allProjects: 'All Projects',
      projects: {
        fintech: {
          title: 'Fintech Mobile App',
          description: 'Mobile banking application that revolutionized financial service accessibility with intuitive UX'
        },
        fooddelivery: {
          title: 'Food Delivery Platform',
          description: 'Platform that maximizes delivery efficiency with real-time tracking and smart matching'
        },
        saas: {
          title: 'B2B SaaS Solution',
          description: 'All-in-one collaboration and analytics platform that enhances business productivity'
        },
        aianalytics: {
          title: 'AI Data Analytics Dashboard',
          description: 'AI-powered real-time data analysis and insight platform'
        },
        chatbot: {
          title: 'AI Chatbot Service',
          description: 'GPT-4 based customer service automation and 24/7 consultation system'
        },
        recommendation: {
          title: 'AI Recommendation Engine',
          description: 'Machine learning-based personalized recommendation system that enhances user experience'
        },
        designsystem: {
          title: 'Design System Development',
          description: 'Comprehensive design system for scalable and consistent user experience'
        },
        mobileapp: {
          title: 'Mobile App UX/UI Design',
          description: 'User research-based intuitive and attractive mobile interface'
        },
        ecommerce: {
          title: 'E-commerce UX Optimization',
          description: 'Project that improved conversion rate by 200% through A/B testing and data analysis'
        }
      }
    },
    contact: {
      title: 'Apply',
      subtitle: 'Project Application',
      description: 'Let\'s talk about your new project',
      form: {
        name: 'Name',
        email: 'Email',
        company: 'Company',
        phone: 'Phone',
        message: 'Project Description',
        submit: 'Apply Now',
        inquiryType: 'Application Type',
        inquiryTypePlaceholder: 'Select application type',
        planSelection: 'Plan Selection',
        planPlaceholder: 'Select a plan',
        projectType: 'Project Type',
        projectTypePlaceholder: 'Select project type',
        otherType: 'Application Type',
        otherTypePlaceholder: 'Select application type',
        sending: 'Sending...',
        success: 'Your application has been submitted successfully!',
        error: 'An error occurred while submitting your application.',
        privacyNote: 'Your information is kept secure and used only for consultation purposes.'
      },
      types: {
        potenbooster: 'Poten Booster',
        project: 'Project Development',
        other: 'Other Application',
        uxui: 'UX/UI Design',
        mvp: 'MVP Development',
        custom: 'Custom Development',
        rnd: 'R&D Development',
        website: 'Website Development',
        consulting: 'Consulting',
        partnership: 'Partnership',
        etc: 'Other'
      },
      info: {
        title: 'Contact Information',
        email: 'Email',
        phone: 'Phone',
        address: 'Address',
        hours: 'Business Hours',
        businessHours: 'Mon - Fri 09:00 - 18:00'
      }
    },
    footer: {
      company: 'Company',
      aboutUs: 'About Us',
      team: 'Team',
      careers: 'Careers',
      styleGuide: 'Style Guide',
      support: 'Support',
      faq: 'FAQ',
      documentation: 'Documentation',
      legal: 'Legal',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      admin: 'Admin',
      description: 'From IT consulting to AI development, your business growth partner',
      rights: '© 2025 Potenlab. All rights reserved.'
    },
    potenBooster: {
      hero: {
        label: "Poten Booster",
        title: "2026 지원사업",
        titleHighlight: "혹시 아직 시장검증이 안되셨나요?",
        description: "요즘 지원사업은 거창한 계획보다\n확실한 시장의 데이터를 더 좋아합니다.",
        cta: "무료 진단 및 상담 신청하기"
      },
      problem: {
        title: "스토리텔링이 완벽해도 시장 검증 데이터가 없다면\n선정은 불가능에 가깝습니다.",
        checks: [
          "아이디어만 있고 실체가 없어 설명하기 막막하신 분",
          "지원사업 마감 직전, 시장 검증 데이터를 급히 확보해야 하는 분",
          '"내 서비스가 진짜 팔릴까?" 고민하다 시간을 놓치신 분'
        ]
      },
      solution: {
        label: "Process",
        title: "3일은 만들고, 3일은 검증합니다.",
        description: "체계적인 6일 프로세스로 아이디어를 시장 검증된 실물로 전환합니다."
      }
    },
    styleGuide: {
      title: 'Style Guide',
      subtitle: 'Potenlab Design System',
      slogan: 'Turning Your Potential Into Product',
      designConcept: {
        title: 'Design Concept',
        description: 'User-friendly and intuitive UI'
      },
      colorSystem: {
        title: 'Color System',
        primary: 'Primary',
        secondary: 'Secondary',
        grayScale: 'Gray Scale',
        semantic: 'Semantic Colors',
        success: 'Success',
        caution: 'Caution',
        error: 'Error'
      },
      typography: {
        title: 'Typography',
        fontFamily: 'Pretendard',
        heading1: 'Heading 1',
        heading2: 'Heading 2',
        heading3: 'Heading 3',
        heading4: 'Heading 4',
        body: 'Body',
        caption: 'Caption'
      },
      spacing: {
        title: 'Spacing System',
        description: '8px based spacing system'
      },
      borderRadius: {
        title: 'Border Radius',
        description: '12px rounded components'
      },
      buttons: {
        title: 'Buttons',
        description: '48px height button'
      }
    }
  }
};