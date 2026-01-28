import { motion } from "motion/react";
import { ArrowLeft, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ServiceDetailProps {
  service: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    heroImage: string;
    gradient: string;
    overview: {
      title: string;
      content: string;
    };
    features: {
      title: string;
      items: {
        title: string;
        description: string;
        icon: string;
      }[];
    };
    process: {
      title: string;
      steps: {
        number: string;
        title: string;
        description: string;
      }[];
    };
    benefits: {
      title: string;
      items: string[];
    };
    cta: {
      title: string;
      description: string;
    };
  };
  onBack: () => void;
}

export function ServiceDetail({ service, onBack }: ServiceDetailProps) {
  const scrollToContact = () => {
    onBack();
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      contactSection?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Back Button */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-[1156px] mx-auto px-4 sm:px-8 xl:px-[62px] py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>뒤로가기</span>
          </button>
        </div>
      </div>

      {/* Hero Section - Completely Redesigned */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-8 xl:px-[62px] relative overflow-hidden">
        {/* Background Gradient */}
        <div className={`absolute inset-0 ${service.gradient} opacity-5`}></div>
        
        <div className="max-w-[1156px] mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full mb-6 border border-primary/20">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary">Professional Service</span>
              </div>
              
              <h1 className="mb-6">
                {service.title}
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8">
                {service.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={scrollToContact}
                  className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
                >
                  <span>무료 상담 신청</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  variant="outline"
                  className="h-14 px-8 rounded-2xl border-2 hover:bg-muted"
                >
                  자세히 알아보기
                </Button>
              </div>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={service.heroImage}
                  alt={service.title}
                  className="w-full aspect-[4/3] object-cover"
                />
                {/* Overlay gradient */}
                <div className={`absolute inset-0 ${service.gradient} opacity-10 mix-blend-overlay`}></div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview Section - Redesigned */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 xl:px-[62px] bg-gradient-to-b from-muted/50 to-white">
        <div className="max-w-[1156px] mx-auto">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 sm:p-12 shadow-lg border border-border/50"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl">
                  {service.overview.title}
                </h2>
              </div>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                {service.overview.content}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section - Redesigned */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 xl:px-[62px]">
        <div className="max-w-[1156px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="mb-4">
              {service.features.title}
            </h2>
            <p className="text-lg text-muted-foreground">
              전문가가 제공하는 체계적인 서비스 프로세스
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {service.features.items.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                viewport={{ once: true }}
                className="group relative p-8 rounded-3xl bg-white border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300"
              >
                {/* Icon with gradient background */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                
                <h3 className="text-xl mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover effect decoration */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Redesigned */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 xl:px-[62px] bg-gradient-to-b from-white via-muted/30 to-white">
        <div className="max-w-[1156px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="mb-4">
              {service.process.title}
            </h2>
            <p className="text-lg text-muted-foreground">
              체계적인 단계별 프로세스로 최상의 결과를 보장합니다
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-6">
            {service.process.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="flex gap-6 items-start p-8 bg-white rounded-3xl border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                  {/* Step number */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-hover text-white flex items-center justify-center shadow-lg shadow-primary/25 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">{step.number}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <h3 className="text-xl mb-3 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connection line */}
                {index < service.process.steps.length - 1 && (
                  <div className="absolute left-8 top-[calc(100%-12px)] w-0.5 h-6 bg-gradient-to-b from-border to-transparent"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Redesigned */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 xl:px-[62px]">
        <div className="max-w-[1156px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="mb-4">
              {service.benefits.title}
            </h2>
            <p className="text-lg text-muted-foreground">
              검증된 전문성으로 비즈니스 성공을 지원합니다
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {service.benefits?.items?.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-secondary/50 to-white border border-border/50 hover:shadow-lg transition-all duration-300"
                >
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" strokeWidth={2} />
                  <p className="text-base leading-relaxed">{benefit}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section - Redesigned */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-hover to-accent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.05),transparent_50%)]"></div>
        
        <div className="max-w-[1156px] mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-white mb-6">
              {service.cta.title}
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-10 leading-relaxed">
              {service.cta.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={scrollToContact}
                className="h-14 px-10 rounded-2xl bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all"
              >
                <span>무료 상담 신청하기</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                onClick={onBack}
                variant="outline"
                className="h-14 px-10 rounded-2xl border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50"
              >
                다른 서비스 보기
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}