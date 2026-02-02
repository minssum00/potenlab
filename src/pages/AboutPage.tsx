import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { useRouter } from '../contexts/RouterContext';
import svgPaths from '../imports/svg-mr7du8tif6';
import imgImage239 from 'figma:asset/f968c0a7b5de10ee0ddc6a5dec54d67c2fe203e1.png';
import imgStauter3DAsset91 from 'figma:asset/8ec1bb8a3d5a1cdf0b4c98e6551d864652a7f9e2.png';
import imgStauter3DAsset92 from 'figma:asset/37f8f65454b5809e149d775eb6077b2c4be0c6d5.png';
import imgStauter3DAsset93 from 'figma:asset/2e5c15df08d55b1577103a49c7582389880d0826.png';
import { Check } from 'lucide-react';

const content = {
  ko: {
    hero: {
      title: 'PotenLab',
      subtitle1: 'Platfom 개발의 특화된 티릴리와 R&D개발에 특화된 나무숲이',
      subtitle2: '하나로 결합해 탄생한 실행 중심의 테크 랩(Tech Lab)입니다.',
      description1: '우리는 단순히 "만드는 개발사"가 아니라, 아이디어가 실제 서비스로 작동하고, 시장에서 살아남도록 만드는 팀입니다.',
      description2: '기획에서 멈추지 않고, 개발에서 끝나지 않으며, 출시 이후의 성과까지 함께 고민합니다.'
    },
    mission: {
      label: 'Mission',
      title: '가능성에 그치지 않고, 결과로 증명한다.',
      description1: '아이디어·기술·사람이 가진 잠재력(Potential)을',
      description2: '실제 사용자와 시장이 만나는 현실(Reality)로 구현합니다.'
    },
    vision: {
      label: 'Vision',
      title: '아시아를 대표하는 실행형 R&D·플랫폼 개발 파트너',
      description1: '우리는 단기 프로젝트에 머무르지 않고,',
      description2: '스타트업·기업·창업가의 지속 가능한 기술 파트너로 성장합니다.'
    },
    coreValues: {
      label: 'Core Values',
      value1: {
        title: 'Execution First',
        description1: '아이디어보다 실행, 계획보다 결과를 우선합니다.',
        description2: '완벽한 기획보다 빠른 구현과 검증을 신뢰합니다.'
      },
      value2: {
        title: 'Problem-driven Development',
        description1: '기술을 만들기 위해 개발하지 않습니다.',
        description2: '문제 해결에 필요한 만큼만, 정확하게 개발합니다.'
      },
      value3: {
        title: 'Partnership over Project',
        description1: '우리는 \'외주사\'가 아니라 동료 파트너입니다.',
        description2: '클라이언트의 성공을 우리의 성과로 생각합니다.'
      }
    },
    banner: {
      title: 'Turn Your Potential into Reality!',
      subtitle: '잠재력을, 실현 가능한 결과로.'
    },
    strengths: {
      label: 'Our Strengths',
      title: '포텐랩은',
      item1: {
        title: '플랫폼 + R&D를 동시에 이해하는 팀',
        description: '서비스 구조 설계부터 고난도 기술 검증까지 하나의 팀에서 일관되게 진행합니다.'
      },
      item2: {
        title: 'MVP부터 스케일업까지의 실전 경험',
        description: '아이디어 단계, PoC, MVP, 운영, 고도화까지 실제로 시장에 출시한 경험을 기반으로 개발합니다.'
      },
      item3: {
        title: '기획–디자인–개발–운영의 유기적 연결',
        description: '전 구성원이 소통에 참여하여 하나의 흐름으로 이어지는 개발 프로세스를 제공합니다.'
      },
      item4: {
        title: '스타트업과 기업 모두를 이해',
        description: '초기 스타트업의 속도와 기업 프로젝트의 안정성을 동시에 고려합니다.'
      }
    },
    whoWeWorkWith: {
      label: 'Who We Work With',
      client1: {
        line1: '플랫폼/앱/웹 서비스 출시를',
        line2: '준비 중인 팀'
      },
      client2: {
        line1: 'R&D 기반 신규 사업을',
        line2: '검증해야 하는 기업'
      },
      client3: {
        line1: '단순 개발이 아닌',
        line2: '기술 파트너가 필요한 조직'
      }
    },
    cta: {
      title1: 'PJust Make it Real',
      title2: '',
      description1: '포텐랩은 아이디어를 가장 빠른 현실로 증명해내기 위해',
      description2: '비즈니스와 개발을 연구하는 실행형 테크 랩입니다.',
      button: 'Contact us'
    }
  },
  en: {
    hero: {
      title: 'PotenLab',
      subtitle1: 'A Tech Lab born from the merger of Tirrilee, specialized in Platform development,',
      subtitle2: 'and Namusup, specialized in R&D development, focusing on execution.',
      description1: 'We are not just a "development company" that builds things, but a team that makes ideas work as real services and helps them survive in the market.',
      description2: 'We don\'t stop at planning, don\'t end with development, and think together about the results after launch.'
    },
    mission: {
      label: 'Mission',
      title: 'Not just potential, proven with results.',
      description1: 'We turn the Potential of ideas, technology, and people',
      description2: 'into Reality where users and markets meet.'
    },
    vision: {
      label: 'Vision',
      title: 'Asia\'s leading execution-driven R&D and platform development partner',
      description1: 'We don\'t stay in short-term projects,',
      description2: 'but grow as a sustainable technology partner for startups, enterprises, and entrepreneurs.'
    },
    coreValues: {
      label: 'Core Values',
      value1: {
        title: 'Execution First',
        description1: 'We prioritize execution over ideas, results over plans.',
        description2: 'We trust rapid implementation and verification over perfect planning.'
      },
      value2: {
        title: 'Problem-driven Development',
        description1: 'We don\'t develop to create technology.',
        description2: 'We develop precisely, only as much as needed to solve problems.'
      },
      value3: {
        title: 'Partnership over Project',
        description1: 'We are not an \'outsourcing company\' but a partner colleague.',
        description2: 'We consider our client\'s success as our own achievement.'
      }
    },
    banner: {
      title: 'Turn Your Potential into Reality!',
      subtitle: 'From potential to achievable results.'
    },
    strengths: {
      label: 'Our Strengths',
      title: 'PotenLab is',
      item1: {
        title: 'A team that understands both Platform and R&D',
        description: 'From service structure design to high-complexity technical validation, we handle everything consistently in one team.'
      },
      item2: {
        title: 'Real experience from MVP to scale-up',
        description: 'We develop based on experience of actually launching to market: from idea stage, PoC, MVP, operation, to enhancement.'
      },
      item3: {
        title: 'Organic connection of planning-design-development-operation',
        description: 'We provide a development process that flows as one, not disconnected stages.'
      },
      item4: {
        title: 'Understanding both startups and enterprises',
        description: 'We consider both the speed of early startups and the stability of enterprise projects.'
      }
    },
    whoWeWorkWith: {
      label: 'Who We Work With',
      client1: {
        line1: 'Teams preparing to launch',
        line2: 'platform/app/web services'
      },
      client2: {
        line1: 'Enterprises that need to validate',
        line2: 'R&D-based new businesses'
      },
      client3: {
        line1: 'Organizations that need',
        line2: 'technology partners, not just development'
      }
    },
    cta: {
      title1: 'POTENLAB',
      title2: 'is for Builders',
      description1: 'We are neither a team with only ideas nor a team with only technology.',
      description2: 'We work together with people who turn ideas into reality.',
      button: 'Contact us'
    }
  }
};

export function AboutPage() {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  const t = content[language];

  const handleContactClick = () => {
    navigate('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-[rgba(0,121,255,0.1)] to-[rgba(182,229,112,0.1)] pt-[100px] md:pt-[156px] pb-[60px] md:pb-[100px] flex justify-center">
        <div className="w-full max-w-[1156px] flex flex-col items-center gap-4 md:gap-5 px-4">
          {/* Logo Icon */}
          <div className="flex items-center gap-4 md:gap-[26.667px]">
            <div className="w-[20px] md:w-[27.327px] h-[23px] md:h-8 flex-shrink-0">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 32">
                <path d={svgPaths.p295a2280} fill="#067CFB" />
                <path d={svgPaths.p2792a200} fill="#067CFB" />
              </svg>
            </div>
            <div className="w-[5.657px] h-[5.657px] rotate-[225deg] scale-y-[-100%]">
              <div className="bg-[#6cb9ab] w-1 h-1" />
            </div>
            <div className="w-[26px] md:w-[35.097px] h-[23px] md:h-[31.693px]">
              <img src={imgImage239} alt="Namusup" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Title */}
          <motion.h1 
            className="bg-clip-text bg-gradient-to-r from-[#0079ff] to-[#b6e570] font-['Clash_Display_Variable'] text-transparent text-[36px] md:text-[60px] uppercase"
            style={{ fontWeight: 600, lineHeight: 'normal' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t.hero.title}
          </motion.h1>

          {/* Description */}
          <motion.div 
            className="flex flex-col items-center gap-2 md:gap-3 text-center w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-black text-[16px] md:text-[18px] leading-[1.5]">
              <p className="mb-0">{t.hero.subtitle1}</p>
              <p className="mt-0">{t.hero.subtitle2}</p>
            </div>
            <div className="text-[#5a5e6a] text-[13px] md:text-[14px] leading-[1.7]">
              <p className="mb-0">{t.hero.description1}</p>
              <p className="mt-0">{t.hero.description2}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="w-full bg-white py-[50px] md:py-[80px] flex justify-center">
        <div className="w-full max-w-[1156px] px-4 md:px-[62px] flex flex-col gap-[40px] md:gap-[60px]">
          <div className="flex flex-col md:flex-row gap-8 md:gap-5 w-full">
            {/* Mission */}
            <motion.div 
              className="flex-1 flex flex-col gap-3 items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="font-['Clash_Display_Variable'] text-[#226bef] text-[18px] md:text-[20px]" style={{ fontWeight: 600 }}>
                {t.mission.label}
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-black text-[18px] md:text-[20px] leading-[1.5]" style={{ fontWeight: 'bold' }}>
                  {t.mission.title}
                </p>
                <div className="text-[#5a5e6a] text-[13px] md:text-[14px] leading-[1.7]">
                  <p className="mb-0">{t.mission.description1}</p>
                  <p className="mt-0">{t.mission.description2}</p>
                </div>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div 
              className="flex-1 flex flex-col gap-3 items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="font-['Clash_Display_Variable'] text-[#226bef] text-[18px] md:text-[20px]" style={{ fontWeight: 600 }}>
                {t.vision.label}
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-black text-[18px] md:text-[20px] leading-[1.5]" style={{ fontWeight: 'bold' }}>
                  {t.vision.title}
                </p>
                <div className="text-[#5a5e6a] text-[13px] md:text-[14px] leading-[1.7]">
                  <p className="mb-0">{t.vision.description1}</p>
                  <p className="mt-0">{t.vision.description2}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] relative">
            <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1156 1">
              <defs>
                <linearGradient id="divider-gradient" x1="0" x2="1156" y1="1" y2="1" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#226BEF" stopOpacity="0" />
                  <stop offset="0.5" stopColor="#226BEF" />
                  <stop offset="1" stopColor="#226BEF" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 0.5H1156" stroke="url(#divider-gradient)" />
            </svg>
          </div>

          {/* Core Values */}
          <div className="flex flex-col gap-5">
            <div className="font-['Clash_Display_Variable'] text-[#226bef] text-[18px] md:text-[20px] text-center" style={{ fontWeight: 600 }}>
              {t.coreValues.label}
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              <motion.div 
                className="flex-1 bg-[#f6f9fc] rounded-[20px] p-6 md:p-8 flex flex-col gap-6 md:gap-10 items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img src={imgStauter3DAsset91} alt="" className="w-[100px] md:w-[120px] h-[100px] md:h-[120px] object-cover" />
                <div className="flex flex-col gap-1 w-full">
                  <p className="text-black text-[18px] md:text-[20px] leading-[1.5]" style={{ fontWeight: 'bold' }}>
                    {t.coreValues.value1.title}
                  </p>
                  <div className="text-[#5a5e6a] text-[13px] md:text-[14px] leading-[1.7]">
                    <p className="mb-0">{t.coreValues.value1.description1}</p>
                    <p className="mt-0">{t.coreValues.value1.description2}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="flex-1 bg-[#f6f9fc] rounded-[20px] p-6 md:p-8 flex flex-col gap-6 md:gap-10 items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <img src={imgStauter3DAsset92} alt="" className="w-[100px] md:w-[120px] h-[100px] md:h-[120px] object-cover" />
                <div className="flex flex-col gap-1 w-full">
                  <p className="text-black text-[18px] md:text-[20px] leading-[1.5]" style={{ fontWeight: 'bold' }}>
                    {t.coreValues.value2.title}
                  </p>
                  <div className="text-[#5a5e6a] text-[13px] md:text-[14px] leading-[1.7]">
                    <p className="mb-0">{t.coreValues.value2.description1}</p>
                    <p className="mt-0">{t.coreValues.value2.description2}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="flex-1 bg-[#f6f9fc] rounded-[20px] p-6 md:p-8 flex flex-col gap-6 md:gap-10 items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <img src={imgStauter3DAsset93} alt="" className="w-[100px] md:w-[120px] h-[100px] md:h-[120px] object-cover" />
                <div className="flex flex-col gap-1 w-full">
                  <p className="text-black text-[18px] md:text-[20px] leading-[1.5]" style={{ fontWeight: 'bold' }}>
                    {t.coreValues.value3.title}
                  </p>
                  <div className="text-[#5a5e6a] text-[13px] md:text-[14px] leading-[1.7]">
                    <p className="mb-0">{t.coreValues.value3.description1}</p>
                    <p className="mt-0">{t.coreValues.value3.description2}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="w-full bg-gradient-to-r from-[#0079ff] to-[#b6e570] py-[40px] md:py-[60px] flex justify-center">
        <div className="w-full max-w-[1156px] px-4 flex flex-col gap-2 md:gap-3 items-center text-white text-center">
          <h2 className="font-['Clash_Display_Variable'] text-[28px] md:text-[40px] m-0" style={{ fontWeight: 600, lineHeight: 'normal' }}>
            {t.banner.title}
          </h2>
          <p className="text-[18px] md:text-[24px] m-0" style={{ fontWeight: 600, lineHeight: '1.5' }}>
            {t.banner.subtitle}
          </p>
        </div>
      </section>

      {/* Our Strengths Section */}
      <section className="w-full bg-[#f6f9fc] py-[60px] md:py-[100px] flex justify-center">
        <div className="w-full max-w-[1156px] px-4 md:px-[62px] flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          <div className="w-full lg:flex-1 flex flex-col gap-3 md:gap-5">
            <div className="font-['Clash_Display_Variable'] text-[#226bef] text-[18px] md:text-[20px]" style={{ fontWeight: 600 }}>
              {t.strengths.label}
            </div>
            <h2 className="text-black text-[28px] md:text-[36px] m-0" style={{ fontWeight: 'bold', lineHeight: '1.5' }}>
              {t.strengths.title}
            </h2>
          </div>
          <div className="w-full lg:w-[764px] flex flex-col gap-4 md:gap-5">
            {[1, 2, 3, 4].map((num, index) => {
              const item = t.strengths[`item${num}` as keyof typeof t.strengths] as { title: string; description: string };
              return (
                <motion.div 
                  key={num}
                  className="bg-white rounded-[20px] p-5 md:p-8 flex gap-5 md:gap-10 items-center"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="text-[#b0e175] text-[32px] md:text-[40px] flex-shrink-0" style={{ fontWeight: 'bold', lineHeight: '1.5' }}>
                    0{num}
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <p className="text-black text-[16px] md:text-[20px] leading-[1.5] m-0" style={{ fontWeight: 'bold' }}>
                      {item.title}
                    </p>
                    <p className="text-[#5a5e6a] text-[13px] md:text-[14px] leading-[1.7] m-0">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who We Work With Section */}
      <section className="w-full bg-white py-[60px] md:py-[120px] flex justify-center">
        <div className="w-full max-w-[1156px] px-4 flex flex-col gap-5 items-center">
          <div className="font-['Clash_Display_Variable'] text-[#226bef] text-[18px] md:text-[20px] text-center" style={{ fontWeight: 600 }}>
            {t.whoWeWorkWith.label}
          </div>
          <div className="w-full flex flex-col md:flex-row gap-4 md:gap-5">
            {[1, 2, 3].map((num, index) => {
              const client = t.whoWeWorkWith[`client${num}` as keyof typeof t.whoWeWorkWith] as { line1: string; line2: string };
              return (
                <motion.div 
                  key={num}
                  className="flex-1 bg-white rounded-[20px] border border-[#e0e0e0] px-6 md:px-8 py-5 md:py-6 flex flex-col gap-3 items-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="w-5 h-5 rounded-full bg-[#226BEF] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <div className="text-black text-[16px] md:text-[18px] text-center leading-[1.7]" style={{ fontWeight: 600 }}>
                    <p className="mb-0">{client.line1}</p>
                    <p className="mt-0">{client.line2}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-[#f9fafc] py-[60px] md:py-[80px] flex justify-center">
        <div className="w-full max-w-[1156px] px-4 flex flex-col gap-8 md:gap-10 items-center text-center">
          <div className="flex flex-col gap-4 md:gap-5">
            <div className="bg-clip-text bg-gradient-to-r from-[#0079ff] to-[#b6e570] font-['Clash_Display_Variable'] text-transparent text-[28px] md:text-[40px]" style={{ fontWeight: 600, lineHeight: 'normal' }}>
              <p className="mb-0">{t.cta.title1}</p>
              <p className="mt-0">{t.cta.title2}</p>
            </div>
            <div className="text-black text-[16px] md:text-[18px] leading-[1.5]">
              <p className="mb-0">{t.cta.description1}</p>
              <p className="mt-0">{t.cta.description2}</p>
            </div>
          </div>
          <motion.button
            className="rounded-lg px-6 py-3 text-white text-[16px] md:text-[18px] bg-gradient-to-r from-[#0079ff] to-[#b6e570]"
            style={{ fontWeight: 600, lineHeight: '1.5', height: '48px', minHeight: '48px' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleContactClick}
          >
            {t.cta.button}
          </motion.button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default AboutPage;