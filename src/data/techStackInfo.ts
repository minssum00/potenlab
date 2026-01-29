export const techStackInfo: Record<
  string,
  { description_ko: string; description_en: string }
> = {
  'React.js': {
    description_ko:
      'Facebook에서 개발한 사용자 인터페이스 구축을 위한 JavaScript 라이브러리입니다. 컴포넌트 기반 아키텍처로 재사용 가능한 UI를 만들 수 있습니다.',
    description_en:
      'A JavaScript library for building user interfaces, developed by Facebook. Enables creation of reusable UI with component-based architecture.',
  },
  'Next.js': {
    description_ko:
      'React 기반의 프레임워크로 서버 사이드 렌더링(SSR)과 정적 사이트 생성(SSG)을 지원합니다. SEO 최적화와 빠른 페이지 로딩이 필요한 프로젝트에 적합합니다.',
    description_en:
      'A React framework supporting Server-Side Rendering (SSR) and Static Site Generation (SSG). Ideal for projects requiring SEO optimization and fast page loading.',
  },
  'Vue.js': {
    description_ko:
      '점진적으로 채택 가능한 JavaScript 프레임워크입니다. 가볍고 학습 곡선이 낮아 빠른 개발이 가능합니다.',
    description_en:
      'A progressive JavaScript framework. Lightweight with a gentle learning curve, enabling rapid development.',
  },
  Angular: {
    description_ko:
      'Google에서 개발한 TypeScript 기반의 웹 애플리케이션 프레임워크입니다. 대규모 엔터프라이즈 애플리케이션 개발에 적합합니다.',
    description_en:
      'A TypeScript-based web application framework developed by Google. Suitable for large-scale enterprise application development.',
  },
  'Node.js': {
    description_ko:
      'Chrome V8 엔진으로 빌드된 JavaScript 런타임 환경입니다. 서버 사이드 개발에 JavaScript를 사용할 수 있게 해줍니다.',
    description_en:
      'A JavaScript runtime built on Chrome V8 engine. Enables using JavaScript for server-side development.',
  },
  Python: {
    description_ko:
      '간결하고 읽기 쉬운 문법을 가진 프로그래밍 언어입니다. AI/ML, 데이터 분석, 백엔드 개발 등 다양한 분야에서 활용됩니다.',
    description_en:
      'A programming language with clean and readable syntax. Used in various fields including AI/ML, data analysis, and backend development.',
  },
  Java: {
    description_ko:
      '플랫폼 독립적인 객체 지향 프로그래밍 언어입니다. 엔터프라이즈 애플리케이션과 안드로이드 앱 개발에 널리 사용됩니다.',
    description_en:
      'A platform-independent object-oriented programming language. Widely used for enterprise applications and Android app development.',
  },
  PHP: {
    description_ko:
      '서버 사이드 스크립트 언어로 WordPress, Laravel 등 다양한 웹 플랫폼의 기반이 됩니다.',
    description_en:
      'A server-side scripting language that powers various web platforms including WordPress and Laravel.',
  },
  AWS: {
    description_ko:
      'Amazon Web Services의 클라우드 컴퓨팅 플랫폼입니다. EC2, S3, Lambda 등 다양한 서비스를 제공합니다.',
    description_en:
      'Amazon Web Services cloud computing platform. Offers various services including EC2, S3, and Lambda.',
  },
  Azure: {
    description_ko:
      'Microsoft의 클라우드 컴퓨팅 플랫폼입니다. 엔터프라이즈 환경과의 통합이 뛰어납니다.',
    description_en:
      'Microsoft cloud computing platform. Excellent integration with enterprise environments.',
  },
  GCP: {
    description_ko:
      'Google Cloud Platform으로 Google의 인프라를 활용한 클라우드 서비스입니다. BigQuery, AI/ML 도구가 강력합니다.',
    description_en:
      'Google Cloud Platform leveraging Google infrastructure. Strong BigQuery and AI/ML tools.',
  },
  'Naver Cloud Platform': {
    description_ko:
      '네이버의 클라우드 컴퓨팅 서비스입니다. 국내 서비스에 최적화되어 있으며 한국어 지원이 우수합니다.',
    description_en:
      'Naver cloud computing service. Optimized for domestic services with excellent Korean language support.',
  },
  Vercel: {
    description_ko:
      'Next.js를 만든 회사의 프론트엔드 배포 플랫폼입니다. Git 연동과 자동 배포가 간편합니다.',
    description_en:
      'Frontend deployment platform by the creators of Next.js. Easy Git integration and automatic deployment.',
  },
  PostgreSQL: {
    description_ko:
      '오픈소스 관계형 데이터베이스 시스템입니다. 복잡한 쿼리와 대용량 데이터 처리에 강점이 있습니다.',
    description_en:
      'Open-source relational database system. Strong in complex queries and large-scale data processing.',
  },
  MySQL: {
    description_ko:
      '가장 널리 사용되는 오픈소스 관계형 데이터베이스입니다. 빠르고 안정적이며 웹 애플리케이션에 적합합니다.',
    description_en:
      'Most widely used open-source relational database. Fast, reliable, and suitable for web applications.',
  },
  MongoDB: {
    description_ko:
      'NoSQL 문서 지향 데이터베이스입니다. 유연한 스키마와 확장성이 뛰어나 빠른 개발이 가능합니다.',
    description_en:
      'NoSQL document-oriented database. Flexible schema and excellent scalability enable rapid development.',
  },
  Redis: {
    description_ko:
      '인메모리 데이터 구조 저장소입니다. 캐싱, 세션 관리, 실시간 분석 등에 활용됩니다.',
    description_en:
      'In-memory data structure store. Used for caching, session management, and real-time analytics.',
  },
  Firebase: {
    description_ko:
      'Google의 모바일 및 웹 애플리케이션 개발 플랫폼입니다. 실시간 데이터베이스, 인증, 호스팅 등을 제공합니다.',
    description_en:
      'Google mobile and web application development platform. Provides real-time database, authentication, hosting, etc.',
  },
  ChatGPT: {
    description_ko:
      'OpenAI의 대화형 AI 모델입니다. 자연어 처리, 콘텐츠 생성, 고객 지원 등에 활용됩니다.',
    description_en:
      'OpenAI conversational AI model. Used for natural language processing, content generation, customer support, etc.',
  },
  Docker: {
    description_ko:
      '컨테이너 기반 가상화 플랫폼입니다. 애플리케이션을 격리된 환경에서 실행하고 배포를 간소화합니다.',
    description_en:
      'Container-based virtualization platform. Runs applications in isolated environments and simplifies deployment.',
  },
  Kubernetes: {
    description_ko:
      '컨테이너 오케스트레이션 플랫폼입니다. Docker 컨테이너의 배포, 확장, 관리를 자동화합니다.',
    description_en:
      'Container orchestration platform. Automates deployment, scaling, and management of Docker containers.',
  },
  Imweb: {
    description_ko:
      '코딩 없이 웹사이트를 제작할 수 있는 국내 대표 노코드 웹 빌더 플랫폼입니다. 드래그 앤 드롭 방식으로 쇼핑몰, 기업 홈페이지, 랜딩페이지를 손쉽게 제작할 수 있으며, 국내 결제 시스템(PG사), 배송 연동, 회원 관리 등 한국 시장에 최적화된 기능을 제공합니다.',
    description_en:
      "Korea's leading no-code web builder platform for creating websites without coding. Build e-commerce sites, corporate websites, and landing pages easily with drag-and-drop. Offers features optimized for the Korean market including local payment gateways, shipping integration, and member management.",
  },
  'React-Native': {
    description_ko:
      'Facebook(Meta)이 개발한 React를 기반으로 한 크로스 플랫폼 모바일 앱 개발 프레임워크입니다. JavaScript와 React를 사용하여 하나의 코드베이스로 iOS와 Android 네이티브 앱을 동시에 개발할 수 있습니다.',
    description_en:
      'A cross-platform mobile app framework based on React, developed by Facebook (Meta). Build native iOS and Android apps simultaneously with a single JavaScript/React codebase.',
  },
  Framer: {
    description_ko:
      '디자이너와 개발자를 위한 인터랙티브 디자인 및 프로토타이핑 도구입니다. 노코드 웹사이트 빌더 기능으로 코드 없이도 고품질의 반응형 웹사이트를 배포할 수 있습니다.',
    description_en:
      'Interactive design and prototyping tool for designers and developers. No-code website builder allows deployment of high-quality responsive websites without coding.',
  },
};
