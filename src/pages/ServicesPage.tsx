import { Upload, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useRouter } from '../contexts/RouterContext';
import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { Services } from '../components/Services';
import { Footer } from '../components/Footer';

export function ServicesPage() {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [ruleImage1, setRuleImage1] = useState('');
  const [ruleImage2, setRuleImage2] = useState('');
  const [ruleImage3, setRuleImage3] = useState('');
  const [ruleImage4, setRuleImage4] = useState('');
  const [selectedRule, setSelectedRule] = useState<number | null>(null);

  useEffect(() => {
    // Check admin status
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);

    // Load saved images
    const saved1 = localStorage.getItem('ruleImage1');
    const saved2 = localStorage.getItem('ruleImage2');
    const saved3 = localStorage.getItem('ruleImage3');
    const saved4 = localStorage.getItem('ruleImage4');
    
    if (saved1) setRuleImage1(saved1);
    if (saved2) setRuleImage2(saved2);
    if (saved3) setRuleImage3(saved3);
    if (saved4) setRuleImage4(saved4);
  }, []);

  const handleImageUpload = (ruleNumber: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        localStorage.setItem(`ruleImage${ruleNumber}`, imageData);
        
        if (ruleNumber === 1) setRuleImage1(imageData);
        if (ruleNumber === 2) setRuleImage2(imageData);
        if (ruleNumber === 3) setRuleImage3(imageData);
        if (ruleNumber === 4) setRuleImage4(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (ruleNumber: number) => {
    localStorage.removeItem(`ruleImage${ruleNumber}`);
    if (ruleNumber === 1) setRuleImage1('');
    if (ruleNumber === 2) setRuleImage2('');
    if (ruleNumber === 3) setRuleImage3('');
    if (ruleNumber === 4) setRuleImage4('');
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-[72px]">
        {/* Services Component */}
        <Services />

        {/* Service Process Section */}
        <section className="py-32 bg-[#F8F9FA]">
          <div className="max-w-[1156px] mx-auto px-8">
            {/* Header */}
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-6">
                  <span 
                    className="text-[#0079FF] font-semibold text-[20px]"
                    style={{ fontFamily: 'Clash Display, sans-serif', fontWeight: 600 }}
                  >
                    Service Process
                  </span>
                </div>
                <h2 className="mb-4 text-[36px] font-bold text-black">
                  {language === 'ko' 
                    ? '6단계 서비스 진행 과정'
                    : '6-Step Service Process'}
                </h2>
                <p className="text-[16px] text-[#666666]">
                  {language === 'ko' 
                    ? '체계적인 프로세스로 고객의 성공적인 프로젝트를 완성합니다.'
                    : 'We complete successful projects with a systematic process.'}
                </p>
              </motion.div>
            </div>

            {/* Process Steps */}
            <div className="flex flex-wrap justify-center items-start gap-x-4 gap-y-12 mb-12 max-w-[1100px] mx-auto">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col items-center text-center relative"
                style={{ width: 'calc(16.666% - 16px)', minWidth: '140px' }}
              >
                <div className="relative mb-6">
                  {/* Dotted line to next step */}
                  <div className="absolute left-[50%] top-[50%] w-[120px] h-[2px] border-t-2 border-dotted border-[#CCCCCC] hidden lg:block" style={{ transform: 'translateY(-50%)' }}></div>
                  
                  <div className="w-24 h-24 bg-[#F8F9FA] rounded-full flex items-center justify-center shadow-lg relative z-10">
                    <span className="text-5xl">📝</span>
                  </div>
                </div>
                <h4 className="font-bold text-[16px] mb-2">
                  {language === 'ko' ? '문의 및 문서확인' : 'Inquiry'}
                </h4>
                <p className="text-[14px] text-[#666666] leading-relaxed">
                  {language === 'ko' ? ' 문의가 들어오면 문서 및 요구사항 확인' : 'Contact via email, phone, or KakaoTalk'}
                </p>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col items-center text-center relative"
                style={{ width: 'calc(16.666% - 16px)', minWidth: '140px' }}
              >
                <div className="relative mb-6">
                  {/* Dotted line to next step */}
                  <div className="absolute left-[50%] top-[50%] w-[120px] h-[2px] border-t-2 border-dotted border-[#CCCCCC] hidden lg:block" style={{ transform: 'translateY(-50%)' }}></div>
                  
                  <div className="w-24 h-24 bg-[#F8F9FA] rounded-full flex items-center justify-center shadow-lg relative z-10">
                    <span className="text-5xl">💼</span>
                  </div>
                </div>
                <h4 className="font-bold text-[16px] mb-2">
                  {language === 'ko' ? 'IT 컨설팅 진행' : 'IT Consulting'}
                </h4>
                <p className="text-[14px] text-[#666666] leading-relaxed">
                  {language === 'ko' ? '고객의 상황에 맞는\n최적의 개발 방향성 수립' : 'Establish optimal development direction'}
                </p>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col items-center text-center relative"
                style={{ width: 'calc(16.666% - 16px)', minWidth: '140px' }}
              >
                <div className="relative mb-6">
                  {/* Dotted line to next step */}
                  <div className="absolute left-[50%] top-[50%] w-[120px] h-[2px] border-t-2 border-dotted border-[#CCCCCC] hidden lg:block" style={{ transform: 'translateY(-50%)' }}></div>
                  
                  <div className="w-24 h-24 bg-[#F8F9FA] rounded-full flex items-center justify-center shadow-lg relative z-10">
                    <span className="text-5xl">✍️</span>
                  </div>
                </div>
                <h4 className="font-bold text-[16px] mb-2">
                  {language === 'ko' ? '계약 진행' : 'Contract'}
                </h4>
                <p className="text-[14px] text-[#666666] leading-relaxed">
                  {language === 'ko' ? '내게 맞는 서비스 및\n개발범위를 선택하여 계약' : 'Select service scope and contract'}
                </p>
              </motion.div>

              {/* Step 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col items-center text-center relative"
                style={{ width: 'calc(16.666% - 16px)', minWidth: '140px' }}
              >
                <div className="relative mb-6">
                  {/* Dotted line to next step */}
                  <div className="absolute left-[50%] top-[50%] w-[120px] h-[2px] border-t-2 border-dotted border-[#CCCCCC] hidden lg:block" style={{ transform: 'translateY(-50%)' }}></div>
                  
                  <div className="w-24 h-24 bg-[#F8F9FA] rounded-full flex items-center justify-center shadow-lg relative z-10">
                    <span className="text-5xl">📊</span>
                  </div>
                </div>
                <h4 className="font-bold text-[16px] mb-2">
                  {language === 'ko' ? '기획 및 설계' : 'Planning & Design'}
                </h4>
                <p className="text-[14px] text-[#666666] leading-relaxed">
                  {language === 'ko' ? '서비스 기획 및\n프로토타입 구조 설계' : 'Service planning and prototype structure'}
                </p>
              </motion.div>

              {/* Step 5 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col items-center text-center relative"
                style={{ width: 'calc(16.666% - 16px)', minWidth: '140px' }}
              >
                <div className="relative mb-6">
                  {/* Dotted line to next step */}
                  <div className="absolute left-[50%] top-[50%] w-[120px] h-[2px] border-t-2 border-dotted border-[#CCCCCC] hidden lg:block" style={{ transform: 'translateY(-50%)' }}></div>
                  
                  <div className="w-24 h-24 bg-[#F8F9FA] rounded-full flex items-center justify-center shadow-lg relative z-10">
                    <span className="text-5xl">🎨</span>
                  </div>
                </div>
                <h4 className="font-bold text-[16px] mb-2">
                  {language === 'ko' ? '디자인 작업' : 'Design Work'}
                </h4>
                <p className="text-[14px] text-[#666666] leading-relaxed">
                  {language === 'ko' ? '완성 서비스 디자인 작업\nDesign System 작업' : 'Complete service design and design system'}
                </p>
              </motion.div>

              {/* Step 6 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-col items-center text-center relative"
                style={{ width: 'calc(16.666% - 16px)', minWidth: '140px' }}
              >
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-[#F8F9FA] rounded-full flex items-center justify-center shadow-lg relative z-10">
                    <span className="text-5xl">🚀</span>
                  </div>
                </div>
                <h4 className="font-bold text-[16px] mb-2">
                  {language === 'ko' ? '배포 및 출시' : 'Deploy & Launch'}
                </h4>
                <p className="text-[14px] text-[#666666] leading-relaxed">
                  {language === 'ko' ? '프로젝트 개발 완료\n및 출시 (QA)' : 'Complete project development and launch'}
                </p>
              </motion.div>
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-center"
            >
              <p className="text-[14px] text-[#666666] leading-relaxed">
                {language === 'ko' 
                  ? (
                    <>
                      위 과정은 프젝트 성격에 따라 다를 수 있으며 일반적으로 바이브코딩/홈페이지/UXUI 작업은 1달
                      <br />
                      Product(Web/App)개발은 평균 3달정도 소요됩니다.
                    </>
                  )
                  : (
                    <>
                      The above process may vary depending on the nature of the project.
                      <br />
                      Typically, Vibe coding/Homepage/UXUI work takes 1 month, and Product(Web/App) development takes an average of 3 months.
                    </>
                  )}
              </p>
            </motion.div>
          </div>
        </section>

        {/* How We Work Section */}
        <section className="py-32 bg-white">
          <div className="max-w-[1156px] mx-auto px-8">
            {/* Header */}
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-6">
                  <span 
                    className="text-[#0079FF] font-semibold text-[20px]"
                    style={{ fontFamily: 'Clash Display, sans-serif', fontWeight: 600 }}
                  >
                    How We Work
                  </span>
                </div>
                <h2 className="mb-4 text-[36px] font-bold text-black">
                  {language === 'ko' 
                    ? '우리가 일하는 방식'
                    : 'Our Working Method'}
                </h2>
                <p className="text-[16px] text-[#666666]">
                  {language === 'ko' 
                    ? '포텐랩 구성원은 다음과 같은 모토를 갖고 업무를 진행합니다.'
                    : 'Potenlab members work with the following motto.'}
                </p>
              </motion.div>
            </div>

            {/* Work Method Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white border border-[#E5E5E5] rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-6 mb-3">
                  <div className="w-16 h-16 rounded-2xl bg-[#E6F3FF] flex items-center justify-center flex-shrink-0">
                    <span className="text-4xl">💬</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] text-[#999999] mb-2">Rule 1</p>
                    <h3 className="font-bold text-[22px] mb-4 text-black">
                      {language === 'ko' ? '사소한 부분까지 소통합니다.' : 'We communicate every detail.'}
                    </h3>
                    <p className="text-[14px] text-[#666666] leading-relaxed mb-5">
                      {language === 'ko' 
                        ? '수많은 프로젝트를 진행하면서 결국 고객의 아이디어는 고객만이 이해하기 때문에 작은 소통마저도 중요하다는 것을 깨달았습니다. 같은 방향을 바라보고 프로젝트를 제작하기 위해 사소한 소통까지 집중합니다.'
                        : 'Through numerous projects, we realized that ultimately only the customer truly understands their ideas, making even small communications crucial. We focus on every detail of communication to ensure we work in the same direction.'}
                    </p>
                  </div>
                </div>
                {isAdmin && (
                  <label htmlFor="upload1" className="h-[48px] w-full bg-white border border-[#E5E5E5] rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                    <Upload className="w-5 h-5 text-[#0079FF] mr-2" />
                    <span className="text-[14px] font-medium text-[#0079FF]">
                      {language === 'ko' ? '이미지 업로드' : 'Upload Image'}
                    </span>
                    <input
                      type="file"
                      id="upload1"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload(1)}
                    />
                  </label>
                )}
                {ruleImage1 && (
                  <div className="relative mt-4">
                    <img
                      src={ruleImage1}
                      alt="Rule 1 Image"
                      className="w-full h-auto rounded-2xl"
                    />
                    <button
                      className="absolute top-2 right-2 bg-white border border-gray-300 rounded-full p-1 cursor-pointer"
                      onClick={() => handleRemoveImage(1)}
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                )}
              </motion.div>

              {/* Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white border border-[#E5E5E5] rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-6 mb-3">
                  <div className="w-16 h-16 rounded-2xl bg-[#E6F3FF] flex items-center justify-center flex-shrink-0">
                    <span className="text-4xl">📋</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] text-[#999999] mb-2">Rule 2</p>
                    <h3 className="font-bold text-[22px] mb-4 text-black">
                      {language === 'ko' ? '주차 보고를 진행합니다.' : 'We provide weekly reports.'}
                    </h3>
                    <p className="text-[14px] text-[#666666] leading-relaxed mb-5">
                      {language === 'ko' 
                        ? '1~2주 간격으로 업무를 진행한 결과를 공유합니다. 고객이 기다리지 않게 현재 어디에 있는지 어떤 단계에 있는지 소통합니다. 혹시 상황이 여의치 않을 때는 미리 공유하여 일정을 조율합니다.'
                        : 'We share work progress at 1-2 week intervals. We keep customers informed about our current status and stage so they never have to wait. If any issues arise, we communicate them in advance to adjust the schedule.'}
                    </p>
                  </div>
                </div>
                {isAdmin && (
                  <label htmlFor="upload2" className="h-[48px] w-full bg-white border border-[#E5E5E5] rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                    <Upload className="w-5 h-5 text-[#0079FF] mr-2" />
                    <span className="text-[14px] font-medium text-[#0079FF]">
                      {language === 'ko' ? '이미지 업로드' : 'Upload Image'}
                    </span>
                    <input
                      type="file"
                      id="upload2"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload(2)}
                    />
                  </label>
                )}
                {ruleImage2 && (
                  <div className="relative mt-4">
                    <img
                      src={ruleImage2}
                      alt="Rule 2 Image"
                      className="w-full h-auto rounded-2xl"
                    />
                    <button
                      className="absolute top-2 right-2 bg-white border border-gray-300 rounded-full p-1 cursor-pointer"
                      onClick={() => handleRemoveImage(2)}
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                )}
              </motion.div>

              {/* Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white border border-[#E5E5E5] rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-6 mb-3">
                  <div className="w-16 h-16 rounded-2xl bg-[#E6F3FF] flex items-center justify-center flex-shrink-0">
                    <span className="text-4xl">🎯</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] text-[#999999] mb-2">Rule 3</p>
                    <h3 className="font-bold text-[22px] mb-4 text-black">
                      {language === 'ko' ? '수단(개발)보다는 목적(사업)에 집중합니다.' : 'We focus on purpose (business) rather than means (development).'}
                    </h3>
                    <p className="text-[14px] text-[#666666] leading-relaxed mb-5">
                      {language === 'ko' 
                        ? '간혹 초기단계에서 너무 큰 프로젝트를 진행하려 한다거나 사업성이 전혀 없는 서비스를 만들려고 하는 경우가 있습니다. 그럴 경우는 사업컨설팅을 선행하여 제대로 방향설정을 먼저 진행합니다.'
                        : 'Sometimes clients try to launch overly ambitious projects in the early stages or attempt to create services with no business viability. In such cases, we conduct business consulting first to establish the proper direction.'}
                    </p>
                  </div>
                </div>
                {isAdmin && (
                  <label htmlFor="upload3" className="h-[48px] w-full bg-white border border-[#E5E5E5] rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                    <Upload className="w-5 h-5 text-[#0079FF] mr-2" />
                    <span className="text-[14px] font-medium text-[#0079FF]">
                      {language === 'ko' ? '이미지 업로드' : 'Upload Image'}
                    </span>
                    <input
                      type="file"
                      id="upload3"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload(3)}
                    />
                  </label>
                )}
                {ruleImage3 && (
                  <div className="relative mt-4">
                    <img
                      src={ruleImage3}
                      alt="Rule 3 Image"
                      className="w-full h-auto rounded-2xl"
                    />
                    <button
                      className="absolute top-2 right-2 bg-white border border-gray-300 rounded-full p-1 cursor-pointer"
                      onClick={() => handleRemoveImage(3)}
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                )}
              </motion.div>

              {/* Card 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white border border-[#E5E5E5] rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-6 mb-3">
                  <div className="w-16 h-16 rounded-2xl bg-[#E6F3FF] flex items-center justify-center flex-shrink-0">
                    <span className="text-4xl">✨</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] text-[#999999] mb-2">Rule 4</p>
                    <h3 className="font-bold text-[22px] mb-4 text-black">
                      {language === 'ko' ? 'UX를 고려한 서비스를 만듭니다.' : 'We create services with UX in mind.'}
                    </h3>
                    <p className="text-[14px] text-[#666666] leading-relaxed mb-5">
                      {language === 'ko' 
                        ? '와이어프레임에 있는 그대로 개발하지 않습니다. 이미 많은 서비스가 시장에 있다는 것을 잘 알기에 요구사항에 없더라도 더 편한 Flow가 있다면 이를 적극 제안하고 진행합니다.'
                        : 'We don\'t just develop wireframes as-is. We know that many services already exist in the market, so even if it\'s not in the requirements, we actively suggest and implement better flows if available.'}
                    </p>
                  </div>
                </div>
                {isAdmin && (
                  <label htmlFor="upload4" className="h-[48px] w-full bg-white border border-[#E5E5E5] rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                    <Upload className="w-5 h-5 text-[#0079FF] mr-2" />
                    <span className="text-[14px] font-medium text-[#0079FF]">
                      {language === 'ko' ? '이미지 업로드' : 'Upload Image'}
                    </span>
                    <input
                      type="file"
                      id="upload4"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload(4)}
                    />
                  </label>
                )}
                {ruleImage4 && (
                  <div className="relative mt-4">
                    <img
                      src={ruleImage4}
                      alt="Rule 4 Image"
                      className="w-full h-auto rounded-2xl"
                    />
                    <button
                      className="absolute top-2 right-2 bg-white border border-gray-300 rounded-full p-1 cursor-pointer"
                      onClick={() => handleRemoveImage(4)}
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                )}
              </motion.div>
            </div>

            {/* View Details Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex justify-center mt-12"
            >
              <button
                onClick={() => setSelectedRule(1)}
                className="h-[36px] px-6 bg-[#0079FF] text-white rounded-xl text-[14px] font-medium hover:bg-[#0066DD] transition-colors"
              >
                {language === 'ko' ? '자세히보기' : 'View Details'}
              </button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Popup Modal */}
      {selectedRule !== null && (
        <div 
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-8"
          onClick={() => setSelectedRule(null)}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-[800px] bg-white rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 bg-gray-100 rounded-full p-2 cursor-pointer hover:bg-gray-200 transition-colors z-10"
              onClick={() => setSelectedRule(null)}
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            <div className="mb-6">
              <p className="text-[14px] text-[#999999] mb-2">Rule {selectedRule}</p>
              <h3 className="font-bold text-[28px] mb-4 text-black">
                {selectedRule === 1 && (language === 'ko' ? '사소한 부분까지 소통합니다.' : 'We communicate every detail.')}
                {selectedRule === 2 && (language === 'ko' ? '주차 보고를 진행합니다.' : 'We provide weekly reports.')}
                {selectedRule === 3 && (language === 'ko' ? '수단(개발)보다는 목적(사업)에 집중합니다.' : 'We focus on purpose (business) rather than means (development).')}
                {selectedRule === 4 && (language === 'ko' ? 'UX를 고려한 서비스를 만듭니다.' : 'We create services with UX in mind.')}
              </h3>
              <p className="text-[16px] text-[#666666] leading-relaxed mb-6">
                {selectedRule === 1 && (language === 'ko' 
                  ? '수많은 프로젝트를 진행하면서 결국 고객의 아이디어는 고객만이 이해하기 때문에 작은 소통마저도 중요하다는 것을 깨달았습니다. 같은 방향을 바라보고 프로젝트를 제작하기 위해 사소한 소통까지 집중합니다.'
                  : 'Through numerous projects, we realized that ultimately only the customer truly understands their ideas, making even small communications crucial. We focus on every detail of communication to ensure we work in the same direction.')}
                {selectedRule === 2 && (language === 'ko' 
                  ? '1~2주 간격으로 업무를 진행한 결과를 공유합니다. 고객이 기다리지 않게 현재 어디에 있는지 어떤 단계에 있는지 소통합니다. 혹시 상황이 여의치 않을 때는 미리 공유하여 일정을 조율합니다.'
                  : 'We share work progress at 1-2 week intervals. We keep customers informed about our current status and stage so they never have to wait. If any issues arise, we communicate them in advance to adjust the schedule.')}
                {selectedRule === 3 && (language === 'ko' 
                  ? '간혹 초기단계에서 너무 큰 프로젝트를 진행하려 한다거나 사업성이 전혀 없는 서비스를 만들려고 하는 경우가 있습니다. 그럴 경우는 사업컨설팅을 선행하여 제대로 방향설정을 먼저 진행합니다.'
                  : 'Sometimes clients try to launch overly ambitious projects in the early stages or attempt to create services with no business viability. In such cases, we conduct business consulting first to establish the proper direction.')}
                {selectedRule === 4 && (language === 'ko' 
                  ? '와이어프레임에 있는 그대로 개발하지 않습니다. 이미 많은 서비스가 시장에 있다는 것을 잘 알기에 요구사항에 없더라도 더 편한 Flow가 있다면 이를 적극 제안하고 진행합니다.'
                  : 'We don\'t just develop wireframes as-is. We know that many services already exist in the market, so even if it\'s not in the requirements, we actively suggest and implement better flows if available.')}
              </p>
            </div>

            {/* Display uploaded image if exists */}
            {selectedRule === 1 && ruleImage1 && (
              <div className="rounded-2xl overflow-hidden">
                <img src={ruleImage1} alt="Rule 1 Example" className="w-full h-auto" />
              </div>
            )}
            {selectedRule === 2 && ruleImage2 && (
              <div className="rounded-2xl overflow-hidden">
                <img src={ruleImage2} alt="Rule 2 Example" className="w-full h-auto" />
              </div>
            )}
            {selectedRule === 3 && ruleImage3 && (
              <div className="rounded-2xl overflow-hidden">
                <img src={ruleImage3} alt="Rule 3 Example" className="w-full h-auto" />
              </div>
            )}
            {selectedRule === 4 && ruleImage4 && (
              <div className="rounded-2xl overflow-hidden">
                <img src={ruleImage4} alt="Rule 4 Example" className="w-full h-auto" />
              </div>
            )}

            {/* Default message if no image */}
            {selectedRule === 1 && !ruleImage1 && (
              <div className="bg-[#F8F9FA] rounded-2xl p-12 text-center">
                <p className="text-[14px] text-[#999999]">
                  {language === 'ko' ? '관리자가 예시 이미지를 업로드하면 여기에 표시됩니다.' : 'Example images will be displayed here when uploaded by admin.'}
                </p>
              </div>
            )}
            {selectedRule === 2 && !ruleImage2 && (
              <div className="bg-[#F8F9FA] rounded-2xl p-12 text-center">
                <p className="text-[14px] text-[#999999]">
                  {language === 'ko' ? '관리자가 예시 이미지를 업로드하면 여기에 표시됩니다.' : 'Example images will be displayed here when uploaded by admin.'}
                </p>
              </div>
            )}
            {selectedRule === 3 && !ruleImage3 && (
              <div className="bg-[#F8F9FA] rounded-2xl p-12 text-center">
                <p className="text-[14px] text-[#999999]">
                  {language === 'ko' ? '관리자가 예시 이미지를 업로드하면 여기에 표시됩니다.' : 'Example images will be displayed here when uploaded by admin.'}
                </p>
              </div>
            )}
            {selectedRule === 4 && !ruleImage4 && (
              <div className="bg-[#F8F9FA] rounded-2xl p-12 text-center">
                <p className="text-[14px] text-[#999999]">
                  {language === 'ko' ? '관리자가 예시 이미지를 업로드하면 여기에 표시됩니다.' : 'Example images will be displayed here when uploaded by admin.'}
                </p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => setSelectedRule(selectedRule > 1 ? selectedRule - 1 : selectedRule)}
                className={`flex items-center gap-2 h-[36px] px-4 rounded-xl text-[14px] font-medium transition-colors ${
                  selectedRule > 1 
                    ? 'bg-[#0079FF] text-white hover:bg-[#0066DD]' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                disabled={selectedRule === 1}
              >
                <ChevronLeft className="w-4 h-4" />
                {language === 'ko' ? '이전' : 'Previous'}
              </button>

              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    onClick={() => setSelectedRule(num)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      selectedRule === num ? 'bg-[#0079FF] w-6' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setSelectedRule(selectedRule < 4 ? selectedRule + 1 : selectedRule)}
                className={`flex items-center gap-2 h-[36px] px-4 rounded-xl text-[14px] font-medium transition-colors ${
                  selectedRule < 4 
                    ? 'bg-[#0079FF] text-white hover:bg-[#0066DD]' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                disabled={selectedRule === 4}
              >
                {language === 'ko' ? '다음' : 'Next'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}