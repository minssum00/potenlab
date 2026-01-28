export interface ServiceData {
  id: string;
  title_ko: string;
  title_en: string;
  subtitle_ko: string;
  subtitle_en: string;
  description_ko: string;
  description_en: string;
  heroImage: string;
  gradient: string;
  overview: {
    title_ko: string;
    title_en: string;
    content_ko: string;
    content_en: string;
  };
  features: {
    title_ko: string;
    title_en: string;
    items: Array<{
      title_ko: string;
      title_en: string;
      description_ko: string;
      description_en: string;
      icon: string;
    }>;
  };
  process: {
    title_ko: string;
    title_en: string;
    steps: Array<{
      number: string;
      title_ko: string;
      title_en: string;
      description_ko: string;
      description_en: string;
    }>;
  };
  benefits: {
    title_ko: string;
    title_en: string;
    items_ko: string[];
    items_en: string[];
  };
  cta: {
    title_ko: string;
    title_en: string;
    description_ko: string;
    description_en: string;
  };
}

export type ServiceId = "it-consulting" | "mvp-development" | "ai-development" | "ux-ui-design";

export const servicesData: Record<ServiceId, ServiceData> = {
  "it-consulting": {
    id: "it-consulting",
    title_ko: "IT 컨설팅",
    title_en: "IT Consulting",
    subtitle_ko: "비즈니스 목표에 맞는 최적의 IT 전략을 수립하고 디지털 전환을 성공적으로 이끕니다",
    subtitle_en: "Establish optimal IT strategies aligned with business goals and successfully lead digital transformation",
    description_ko: "전략적 IT 컨설팅으로 귀사의 디지털 혁신을 실현합니다",
    description_en: "Realize your company's digital innovation through strategic IT consulting",
    heroImage: "https://images.unsplash.com/photo-1565688527174-775059ac429c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbnN1bHRpbmclMjB3b3Jrc3BhY2UlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYxODc1NzA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    gradient: "bg-gradient-to-br from-blue-500 to-indigo-600",
    overview: {
      title_ko: "서비스 개요",
      title_en: "Service Overview",
      content_ko: "Potenlab의 IT 컨설팅은 단순한 기술 조언을 넘어, 비즈니스 성장을 위한 전략적 파트너십을 제공합니다.\n\n현재 귀사가 처한 Stage를 정확히 진단하고, 다음 단계로 성장하기 위해 필요한 IT 전략과 로드맵을 수립합니다. 수십 년간의 업계 경험과 최신 기술 트렌드를 바탕으로 실질적이고 실행 가능한 솔루션을 제시합니다.\n\n초기 스타트업부터 대기업까지, 각 조직의 규모와 특성에 맞는 맞춤형 IT 전략을 설계하고 성공적인 디지털 전환을 함께 만들어갑니다.",
      content_en: "Potenlab's IT consulting goes beyond simple technical advice to provide strategic partnerships for business growth.\n\nWe accurately diagnose your company's current stage and establish IT strategies and roadmaps needed to grow to the next level. Based on decades of industry experience and the latest technology trends, we present practical and actionable solutions.\n\nFrom early-stage startups to large enterprises, we design customized IT strategies tailored to each organization's scale and characteristics, creating successful digital transformations together."
    },
    features: {
      title_ko: "주요 서비스",
      title_en: "Key Services",
      items: [
        {
          title_ko: "비즈니스 분석 & 전략 수립",
          title_en: "Business Analysis & Strategy",
          description_ko: "현재 비즈니스 상황을 면밀히 분석하고 목표 달성을 위한 최적의 IT 전략을 수립합니다",
          description_en: "Analyze current business situation and establish optimal IT strategy for goal achievement",
          icon: "📊"
        },
        {
          title_ko: "최선의 솔루션 제시",
          title_en: "Best Solution Proposal",
          description_ko: "비즈니스 목표와 환경에 최적화된 실행 가능한 솔루션을 제안합니다",
          description_en: "Propose actionable solutions optimized for business goals and environment",
          icon: "🏗️"
        },
        {
          title_ko: "기술 스택 선정",
          title_en: "Tech Stack Selection",
          description_ko: "프로젝트 특성과 팀 역량을 고려한 최적의 기술 스택을 제안합니다",
          description_en: "Recommend optimal tech stack considering project characteristics and team capabilities",
          icon: "⚡"
        },
        {
          title_ko: "디지털 전환 로드맵",
          title_en: "Digital Transformation Roadmap",
          description_ko: "단계별 실행 계획과 마일스톤을 설정하여 체계적인 디지털 전환을 지원합니다",
          description_en: "Support systematic digital transformation by setting phased execution plans and milestones",
          icon: "🗺️"
        },
        {
          title_ko: "리스크 분석 & 대응",
          title_en: "Risk Analysis & Response",
          description_ko: "잠재적 위험 요소를 사전에 식별하고 대응 전략을 수립합니다",
          description_en: "Identify potential risks in advance and establish response strategies",
          icon: "🛡️"
        },
        {
          title_ko: "기술 자문",
          title_en: "Technical Advisory",
          description_ko: "기술적 의사결정을 지원하고 최신 트렌드를 공유합니다",
          description_en: "Support technical decision-making and share latest trends",
          icon: "💡"
        }
      ]
    },
    process: {
      title_ko: "진행 프로세스",
      title_en: "Process",
      steps: [
        {
          number: "01",
          title_ko: "현황 진단 & 요구사항 분석",
          title_en: "Current State Diagnosis & Requirements Analysis",
          description_ko: "현재 IT 인프라와 비즈니스 프로세스를 분석하고 개선이 필요한 영역을 파악합니다",
          description_en: "Analyze current IT infrastructure and business processes, identify areas for improvement"
        },
        {
          number: "02",
          title_ko: "전략 수립 & 로드맵 설계",
          title_en: "Strategy Development & Roadmap Design",
          description_ko: "비즈니스 목표에 맞는 IT 전략을 수립하고 단계별 실행 계획을 설계합니다",
          description_en: "Establish IT strategy aligned with business goals and design phased execution plan"
        },
        {
          number: "03",
          title_ko: "실행 계획 & 아키텍처 설계",
          title_en: "Execution Plan & Architecture Design",
          description_ko: "구체적인 실행 방안을 마련하고 시스템 아키텍처를 상세 설계합니다",
          description_en: "Prepare specific execution measures and design system architecture in detail"
        },
        {
          number: "04",
          title_ko: "구현 지원 & 기술 자문",
          title_en: "Implementation Support & Technical Advisory",
          description_ko: "실제 구현 과정에서 기술 자문과 품질 관리를 지원합니다",
          description_en: "Support technical advisory and quality control during actual implementation"
        },
        {
          number: "05",
          title_ko: "모니터링 & 지속 개선",
          title_en: "Monitoring & Continuous Improvement",
          description_ko: "운영 단계에서도 지속적으로 모니터링하고 개선 방안을 제시합니다",
          description_en: "Continuously monitor and suggest improvement measures even during operation phase"
        }
      ]
    },
    benefits: {
      title_ko: "기대 효과",
      title_en: "Expected Benefits",
      items_ko: [
        "비즈니스 목표에 정렬된 IT 전략 수립",
        "기술 투자 대비 효과(ROI) 극대화",
        "시스템 확장성과 안정성 확보",
        "디지털 전환 리스크 최소화",
        "최신 기술 트렌드 활용",
        "내부 IT 역량 강화 및 지식 이전"
      ],
      items_en: [
        "Establish IT strategy aligned with business goals",
        "Maximize ROI on technology investments",
        "Secure system scalability and stability",
        "Minimize digital transformation risks",
        "Leverage latest technology trends",
        "Strengthen internal IT capabilities and knowledge transfer"
      ]
    },
    cta: {
      title_ko: "IT 전략, 전문가와 함께 시작하세요",
      title_en: "Start Your IT Strategy with Experts",
      description_ko: "Potenlab의 IT 컨설팅으로 비즈니스의 다음 단계를 준비하세요. 무료 상담을 통해 귀사의 현황을 진단하고 최적의 솔루션을 제안해드립니다.",
      description_en: "Prepare for the next stage of your business with Potenlab's IT consulting. We diagnose your current situation and propose optimal solutions through free consultation."
    }
  },

  "mvp-development": {
    id: "mvp-development",
    title_ko: "MVP 개발",
    title_en: "MVP Development",
    subtitle_ko: "아이디어를 빠르게 검증하고 시장에 출시할 수 있는 최소 기능 제품을 개발합니다",
    subtitle_en: "Develop minimum viable products to quickly validate ideas and launch to market",
    description_ko: "빠른 검증과 시장 진입을 위한 MVP 개발 서비스",
    description_en: "MVP development service for quick validation and market entry",
    heroImage: "https://images.unsplash.com/photo-1649698145660-d30f91023b52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwY29kaW5nJTIwc2NyZWVufGVufDF8fHx8MTc2MTg3NTcwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    gradient: "bg-gradient-to-br from-emerald-500 to-teal-600",
    overview: {
      title_ko: "서비스 개요",
      title_en: "Service Overview",
      content_ko: "MVP(Minimum Viable Product)는 핵심 기능만으로 시장의 반응을 빠르게 테스트하는 전략입니다.\n\nPotenlab의 MVP 개발은 최소한의 비용과 시간으로 아이디어를 실제 제품으로 구현하고, 실사용자의 피드백을 받아 제품을 개선할 수 있도록 돕습니다.\n\n애자일 방법론을 기반으로 빠른 반복 개발을 진행하며, 각 단계마다 검증과 개선을 반복하여 시장에 최적화된 제품을 만들어냅니다.",
      content_en: "MVP (Minimum Viable Product) is a strategy to quickly test market response with core features only.\n\nPotenlab's MVP development helps implement ideas into actual products with minimal cost and time, and improve products based on real user feedback.\n\nWe proceed with rapid iterative development based on agile methodology, and create market-optimized products by repeating validation and improvement at each stage."
    },
    features: {
      title_ko: "주요 서비스",
      title_en: "Key Services",
      items: [
        {
          title_ko: "빠른 프로토타이핑",
          title_en: "Rapid Prototyping",
          description_ko: "핵심 기능에 집중하여 2-4주 내 프로토타입을 제작하고 검증합니다",
          description_en: "Focus on core features to create and validate prototypes within 2-4 weeks",
          icon: "⚡"
        },
        {
          title_ko: "애자일 개발",
          title_en: "Agile Development",
          description_ko: "1-2주 스프린트로 빠른 개발과 지속적인 개선을 실현합니다",
          description_en: "Achieve rapid development and continuous improvement with 1-2 week sprints",
          icon: "🔄"
        },
        {
          title_ko: "사용자 테스트",
          title_en: "User Testing",
          description_ko: "실제 사용자 피드백을 수집하고 제품에 반영합니다",
          description_en: "Collect real user feedback and reflect it in the product",
          icon: "👥"
        },
        {
          title_ko: "기술 스택 최적화",
          title_en: "Tech Stack Optimization",
          description_ko: "빠른 개발과 유지보수에 최적화된 현대적인 기술 스택을 사용합니다",
          description_en: "Use modern tech stack optimized for rapid development and maintenance",
          icon: "🛠️"
        },
        {
          title_ko: "시장 검증 지원",
          title_en: "Market Validation Support",
          description_ko: "데이터 분석과 사용자 인터뷰로 제품-시장 적합성을 검증합니다",
          description_en: "Validate product-market fit through data analysis and user interviews",
          icon: "📈"
        },
        {
          title_ko: "확장 가능한 구조",
          title_en: "Scalable Architecture",
          description_ko: "MVP 이후 빠른 확장이 가능한 아키텍처로 설계합니다",
          description_en: "Design with architecture that enables rapid expansion after MVP",
          icon: "🚀"
        }
      ]
    },
    process: {
      title_ko: "진행 프로세스",
      title_en: "Process",
      steps: [
        {
          number: "01",
          title_ko: "아이디어 정의 & 핵심 기능 선정",
          title_en: "Idea Definition & Core Feature Selection",
          description_ko: "비즈니스 목표를 명확히 하고 MVP에 꼭 필요한 핵심 기능만 선별합니다",
          description_en: "Clarify business goals and select only essential core features for MVP"
        },
        {
          number: "02",
          title_ko: "프로토타입 설계 & 검증",
          title_en: "Prototype Design & Validation",
          description_ko: "와이어프레임과 프로토타입을 제작하여 초기 아이디어를 빠르게 검증합니다",
          description_en: "Create wireframes and prototypes to quickly validate initial ideas"
        },
        {
          number: "03",
          title_ko: "애자일 개발 (1-2주 스프린트)",
          title_en: "Agile Development (1-2 Week Sprints)",
          description_ko: "짧은 스프린트로 개발하며 매 단계마다 동작하는 제품을 확인합니다",
          description_en: "Develop with short sprints and verify working product at each stage"
        },
        {
          number: "04",
          title_ko: "베타 출시 & 사용자 피드백",
          title_en: "Beta Launch & User Feedback",
          description_ko: "실제 사용자에게 제품을 공개하고 피드백을 수집합니다",
          description_en: "Release product to real users and collect feedback"
        },
        {
          number: "05",
          title_ko: "데이터 분석 & 제품 개선",
          title_en: "Data Analysis & Product Improvement",
          description_ko: "사용 데이터를 분석하고 피드백을 반영하여 제품을 지속적으로 개선합니다",
          description_en: "Analyze usage data and continuously improve product by reflecting feedback"
        }
      ]
    },
    benefits: {
      title_ko: "기대 효과",
      title_en: "Expected Benefits",
      items_ko: [
        "최소 비용으로 시장 반응 테스트",
        "2-3개월 내 빠른 시장 출시",
        "실제 사용자 피드백 기반 개선",
        "투자 유치를 위한 구체적인 제품",
        "확장 가능한 제품 기반 확보",
        "데이터 기반 의사결정 가능"
      ],
      items_en: [
        "Test market response with minimal cost",
        "Fast market launch within 2-3 months",
        "Improvement based on real user feedback",
        "Concrete product for investment attraction",
        "Secure scalable product foundation",
        "Enable data-driven decision making"
      ]
    },
    cta: {
      title_ko: "아이디어를 현실로 만들어보세요",
      title_en: "Turn Your Ideas into Reality",
      description_ko: "MVP 개발로 빠르게 시장을 테스트하고 성공 가능성을 검증하세요. 경험 많은 개발팀이 아이디어부터 출시까지 함께합니다.",
      description_en: "Quickly test the market and validate success potential with MVP development. Experienced development team supports you from idea to launch."
    }
  },

  "ai-development": {
    id: "ai-development",
    title_ko: "AI 개발",
    title_en: "AI Development",
    subtitle_ko: "최신 인공지능 기술을 활용하여 비즈니스 프로세스를 자동화하고 효율성을 극대화합니다",
    subtitle_en: "Automate business processes and maximize efficiency using latest AI technology",
    description_ko: "AI 기술로 비즈니스 혁신을 만들어갑니다",
    description_en: "Create business innovation with AI technology",
    heroImage: "https://images.unsplash.com/photo-1758626038030-96f813504d15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neSUyMGRpZ2l0YWx8ZW58MXx8fHwxNzYxODc1NzA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    gradient: "bg-gradient-to-br from-purple-500 to-pink-600",
    overview: {
      title_ko: "서비스 개요",
      title_en: "Service Overview",
      content_ko: "Potenlab의 AI 개발은 최신 인공지능 기술을 실제 비즈니스 문제 해결에 적용합니다.\n\nGPT, Claude 등 최신 LLM 기술부터 머신러닝, 컴퓨터 비전까지 다양한 AI 기술을 활용하여 업무 자동화, 데이터 분석, 고객 경험 개선 등의 실질적인 가치를 만들어냅니다.\n\n단순히 AI 기술을 도입하는 것이 아니라, 귀사의 비즈니스 맥락을 이해하고 실제로 효과를 낼 수 있는 AI 솔루션을 설계하고 구현합니다.",
      content_en: "Potenlab's AI development applies latest AI technology to solve real business problems.\n\nWe create practical value such as work automation, data analysis, and customer experience improvement by utilizing various AI technologies from latest LLM technologies like GPT and Claude to machine learning and computer vision.\n\nWe don't just introduce AI technology, but understand your business context and design and implement AI solutions that can actually deliver results."
    },
    features: {
      title_ko: "주요 서비스",
      title_en: "Key Services",
      items: [
        {
          title_ko: "LLM 활용 솔루션",
          title_en: "LLM-based Solutions",
          description_ko: "GPT, Claude 등을 활용한 챗봇, 문서 자동화, 콘텐츠 생성 시스템 개발",
          description_en: "Develop chatbots, document automation, and content generation systems using GPT, Claude, etc.",
          icon: "🤖"
        },
        {
          title_ko: "머신러닝 모델 개발",
          title_en: "Machine Learning Model Development",
          description_ko: "비즈니스 데이터를 학습하여 예측, 분류, 추천 등의 맞춤형 모델 개발",
          description_en: "Develop customized models for prediction, classification, recommendation by learning business data",
          icon: "🧠"
        },
        {
          title_ko: "컴퓨터 비전",
          title_en: "Computer Vision",
          description_ko: "이미지/영상 분석, 객체 인식, OCR 등 비전 기술 솔루션",
          description_en: "Vision technology solutions including image/video analysis, object recognition, OCR",
          icon: "👁️"
        },
        {
          title_ko: "자연어 처리",
          title_en: "Natural Language Processing",
          description_ko: "텍스트 분석, 감성 분석, 정보 추출 등 NLP 기반 솔루션",
          description_en: "NLP-based solutions including text analysis, sentiment analysis, information extraction",
          icon: "💬"
        },
        {
          title_ko: "AI 인프라 구축",
          title_en: "AI Infrastructure Building",
          description_ko: "모델 학습, 배포, 모니터링을 위한 MLOps 파이프라인 구축",
          description_en: "Build MLOps pipeline for model training, deployment, and monitoring",
          icon: "⚙️"
        },
        {
          title_ko: "데이터 파이프라인",
          title_en: "Data Pipeline",
          description_ko: "AI 모델 학습을 위한 데이터 수집, 정제, 관리 시스템 구축",
          description_en: "Build data collection, refinement, and management system for AI model training",
          icon: "📊"
        }
      ]
    },
    process: {
      title_ko: "진행 프로세스",
      title_en: "Process",
      steps: [
        {
          number: "01",
          title_ko: "문제 정의 & 데이터 분석",
          title_en: "Problem Definition & Data Analysis",
          description_ko: "해결하려는 비즈니스 문제를 명확히 정의하고 가용 데이터를 분석합니다",
          description_en: "Clearly define business problem to solve and analyze available data"
        },
        {
          number: "02",
          title_ko: "AI 솔루션 설계",
          title_en: "AI Solution Design",
          description_ko: "문제에 적합한 AI 기술과 아키텍처를 선정하고 솔루션을 설계합니다",
          description_en: "Select appropriate AI technology and architecture for the problem and design solution"
        },
        {
          number: "03",
          title_ko: "프로토타입 개발 & 검증",
          title_en: "Prototype Development & Validation",
          description_ko: "PoC를 통해 AI 솔루션의 실현 가능성과 효과를 검증합니다",
          description_en: "Validate feasibility and effectiveness of AI solution through PoC"
        },
        {
          number: "04",
          title_ko: "모델 개발 & 최적화",
          title_en: "Model Development & Optimization",
          description_ko: "프로덕션 레벨의 AI 모델을 개발하고 성능을 최적화합니다",
          description_en: "Develop production-level AI model and optimize performance"
        },
        {
          number: "05",
          title_ko: "배포 & 모니터링",
          title_en: "Deployment & Monitoring",
          description_ko: "AI 시스템을 배포하고 지속적으로 모니터링하며 개선합니다",
          description_en: "Deploy AI system and continuously monitor and improve"
        }
      ]
    },
    benefits: {
      title_ko: "기대 효과",
      title_en: "Expected Benefits",
      items_ko: [
        "반복 업무 자동화로 생산성 향상",
        "데이터 기반 의사결정 지원",
        "고객 경험 개인화 및 향상",
        "운영 비용 절감",
        "새로운 비즈니스 기회 발굴",
        "경쟁사 대비 기술 우위 확보"
      ],
      items_en: [
        "Improve productivity through repetitive task automation",
        "Support data-driven decision making",
        "Personalize and enhance customer experience",
        "Reduce operational costs",
        "Discover new business opportunities",
        "Secure technical advantage over competitors"
      ]
    },
    cta: {
      title_ko: "AI로 비즈니스를 혁신하세요",
      title_en: "Innovate Your Business with AI",
      description_ko: "최신 AI 기술을 비즈니스에 적용하여 경쟁력을 높이세요. Potenlab의 AI 전문가가 귀사에 최적화된 솔루션을 제공합니다.",
      description_en: "Enhance competitiveness by applying latest AI technology to business. Potenlab's AI experts provide solutions optimized for your company."
    }
  },

  "ux-ui-design": {
    id: "ux-ui-design",
    title_ko: "UX/UI 기획",
    title_en: "UX/UI Design",
    subtitle_ko: "사용자 중심의 디자인으로 직관적이고 매력적인 디지털 경험을 제공합니다",
    subtitle_en: "Provide intuitive and attractive digital experiences with user-centered design",
    description_ko: "사용자를 이해하고 최고의 경험을 설계합니다",
    description_en: "Understand users and design the best experience",
    heroImage: "https://images.unsplash.com/photo-1547027072-332f09bd6bb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMHV4JTIwZGVzaWduJTIwaW50ZXJmYWNlJTIwbW9ja3VwfGVufDF8fHx8MTc2MTg3NTcwNnww&ixlib=rb-4.1.0&q=80&w=1080",
    gradient: "bg-gradient-to-br from-rose-500 to-orange-600",
    overview: {
      title_ko: "서비스 개요",
      title_en: "Service Overview",
      content_ko: "Potenlab의 UX/UI 기획은 단순히 예쁜 화면을 만드는 것이 아닙니다.\n\n사용자가 진정으로 원하는 것이 무엇인지 이해하고, 그들의 문제를 가장 효과적으로 해결할 수 있는 경험을 설계합니다. 데이터와 사용자 리서치를 기반으로 한 논리적인 접근과 창의적인 디자인을 결합합니다.\n\nToss, Figma 등 글로벌 프로덕트의 디자인 철학을 연구하고, 각 비즈니스에 맞는 최적의 UX/UI를 제공합니다.",
      content_en: "Potenlab's UX/UI design is not just about creating pretty screens.\n\nWe understand what users truly want and design experiences that can solve their problems most effectively. We combine logical approach based on data and user research with creative design.\n\nWe study design philosophy of global products like Toss and Figma, and provide optimal UX/UI tailored to each business."
    },
    features: {
      title_ko: "주요 서비스",
      title_en: "Key Services",
      items: [
        {
          title_ko: "사용자 리서치",
          title_en: "User Research",
          description_ko: "인터뷰, 설문, 사용성 테스트를 통해 사용자를 깊이 이해합니다",
          description_en: "Deeply understand users through interviews, surveys, and usability tests",
          icon: "🔍"
        },
        {
          title_ko: "정보 구조 설계",
          title_en: "Information Architecture",
          description_ko: "복잡한 정보를 직관적으로 구조화하고 내비게이션을 설계합니다",
          description_en: "Structure complex information intuitively and design navigation",
          icon: "🗂️"
        },
        {
          title_ko: "와이어프레임 & 프로토타입",
          title_en: "Wireframe & Prototype",
          description_ko: "인터랙션을 고려한 동적 프로토타입으로 아이디어를 검증합니다",
          description_en: "Validate ideas with dynamic prototypes considering interactions",
          icon: "📐"
        },
        {
          title_ko: "UI 디자인 시스템",
          title_en: "UI Design System",
          description_ko: "일관성 있는 브랜드 경험을 위한 디자인 시스템을 구축합니다",
          description_en: "Build design system for consistent brand experience",
          icon: "🎨"
        },
        {
          title_ko: "인터랙션 디자인",
          title_en: "Interaction Design",
          description_ko: "직관적이고 즐거운 사용자 인터랙션을 설계합니다",
          description_en: "Design intuitive and delightful user interactions",
          icon: "✨"
        },
        {
          title_ko: "사용성 테스트",
          title_en: "Usability Testing",
          description_ko: "실제 사용자 테스트를 통해 디자인을 검증하고 개선합니다",
          description_en: "Validate and improve design through real user testing",
          icon: "🧪"
        }
      ]
    },
    process: {
      title_ko: "진행 프로세스",
      title_en: "Process",
      steps: [
        {
          number: "01",
          title_ko: "리서치 & 분석",
          title_en: "Research & Analysis",
          description_ko: "사용자, 시장, 경쟁사를 분석하고 핵심 인사이트를 도출합니다",
          description_en: "Analyze users, market, and competitors to derive key insights"
        },
        {
          number: "02",
          title_ko: "정보 구조 & 플로우 설계",
          title_en: "Information Architecture & Flow Design",
          description_ko: "사용자 여정을 매핑하고 최적의 정보 구조를 설계합니다",
          description_en: "Map user journey and design optimal information architecture"
        },
        {
          number: "03",
          title_ko: "와이어프레임 & 프로토타입",
          title_en: "Wireframe & Prototype",
          description_ko: "저충실도 와이어프레임부터 고충실도 프로토타입까지 단계적으로 제작합니다",
          description_en: "Create progressively from low-fidelity wireframes to high-fidelity prototypes"
        },
        {
          number: "04",
          title_ko: "UI 디자인 & 디자인 시스템",
          title_en: "UI Design & Design System",
          description_ko: "브랜드 아이덴티티를 반영한 UI를 디자인하고 시스템화합니다",
          description_en: "Design UI reflecting brand identity and systemize it"
        },
        {
          number: "05",
          title_ko: "사용성 테스트 & 개선",
          title_en: "Usability Test & Improvement",
          description_ko: "사용자 테스트를 진행하고 피드백을 반영하여 디자인을 완성합니다",
          description_en: "Conduct user tests and finalize design by reflecting feedback"
        }
      ]
    },
    benefits: {
      title_ko: "기대 효과",
      title_en: "Expected Benefits",
      items_ko: [
        "직관적인 UX로 사용자 만족도 향상",
        "명확한 UI로 학습 시간 단축",
        "일관된 디자인으로 브랜드 신뢰도 증가",
        "사용성 개선으로 전환율 향상",
        "개발 효율성 증대",
        "유지보수 비용 절감"
      ],
      items_en: [
        "Improve user satisfaction with intuitive UX",
        "Reduce learning time with clear UI",
        "Increase brand credibility with consistent design",
        "Improve conversion rate through usability enhancement",
        "Increase development efficiency",
        "Reduce maintenance costs"
      ]
    },
    cta: {
      title_ko: "사용자가 사랑하는 경험을 만드세요",
      title_en: "Create Experiences Users Love",
      description_ko: "데이터와 인사이트 기반의 UX/UI 디자인으로 사용자 경험을 혁신하세요. Potenlab이 함께합니다.",
      description_en: "Innovate user experience with data and insight-based UX/UI design. Potenlab is with you."
    }
  }
};
