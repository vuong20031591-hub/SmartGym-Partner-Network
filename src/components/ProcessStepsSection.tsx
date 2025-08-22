import { useEffect, useRef } from 'react';
import { Search, PenTool, Wrench, Play, Megaphone, TrendingUp } from 'lucide-react';
import { useGSAP } from '@/hooks/useGSAP';
import { Card, CardContent } from '@/components/ui/card';
import processImage from '@/assets/process-steps.jpg';

const ProcessStepsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const { gsap, createScrollTrigger } = useGSAP();

  const steps = [
    {
      icon: Search,
      title: 'Khảo sát địa điểm',
      description: 'Phân tích vị trí, đối thủ cạnh tranh, tiềm năng khách hàng và đưa ra đánh giá khả thi',
      duration: '1-2 tuần',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: PenTool,
      title: 'Thiết kế quy hoạch',
      description: 'Thiết kế layout tối ưu, lựa chọn thiết bị phù hợp và lập kế hoạch thi công chi tiết',
      duration: '2-3 tuần',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Wrench,
      title: 'Lắp đặt & thi công',
      description: 'Thi công hoàn thiện, lắp đặt thiết bị IoT, kết nối hệ thống và test toàn bộ chức năng',
      duration: '3-4 tuần',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Play,
      title: 'Vận hành thử nghiệm',
      description: 'Đào tạo vận hành, test hệ thống, fine-tuning và chuẩn bị cho giai đoạn mở cửa',
      duration: '1 tuần',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Megaphone,
      title: 'Marketing khai trương',
      description: 'Triển khai chiến dịch marketing, PR khai trương và các chương trình ưu đãi đặc biệt',
      duration: '2-4 tuần',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: TrendingUp,
      title: 'Tối ưu doanh thu',
      description: 'Theo dõi KPI, tối ưu hóa vận hành, tư vấn chiến lược tăng trưởng bền vững',
      duration: 'Liên tục',
      color: 'from-teal-500 to-teal-600'
    }
  ];

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current) return;

    const stepElements = sectionRef.current.querySelectorAll('.step-card');
    const stepIcons = sectionRef.current.querySelectorAll('.step-icon');
    const line = lineRef.current;

    // Create master timeline
    const masterTL = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: "play none none reverse"
      }
    });

    // Set initial states
    gsap.set(stepElements, { 
      x: -100, 
      opacity: 0,
      scale: 0.8,
      rotateY: -30
    });
    gsap.set(stepIcons, { 
      scale: 0, 
      rotation: -180
    });
    gsap.set(line, { 
      scaleY: 0, 
      transformOrigin: 'top',
      opacity: 0
    });

    // Animate connecting line first
    masterTL.to(line, {
      scaleY: 1,
      opacity: 1,
      duration: 1.5,
      ease: "power2.out"
    });

    // Animate steps with dramatic entrance
    stepElements.forEach((element, index) => {
      const icon = stepIcons[index];
      
      masterTL
        .to(element, {
          x: 0,
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 0.8,
          ease: "back.out(1.7)"
        }, index * 0.2)
        .to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)"
        }, "-=0.3")
        .to(icon, {
          scale: 1.2,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        }, "-=0.1");
    });

    // Add continuous floating animation for icons
    stepIcons.forEach((icon, index) => {
      gsap.to(icon, {
        y: -5,
        duration: 2 + index * 0.3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 2 + index * 0.1
      });
    });

    // Add line growth animation on scroll
    gsap.to(line, {
      scaleY: 1.1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 50%',
        end: 'bottom 50%',
        scrub: 1
      }
    });

  }, [gsap, createScrollTrigger]);

  return (
    <section id="process" ref={sectionRef} className="py-20 bg-background relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={processImage} 
          alt="Process Steps"
          className="w-full h-full object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 to-background/90" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Quy trình triển khai
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Từ khảo sát đến vận hành thành công, chúng tôi đồng hành cùng bạn trong từng bước
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Connecting Line */}
          <div className="absolute left-8 top-16 bottom-16 w-0.5 bg-border">
            <div 
              ref={lineRef}
              className="w-full bg-gradient-to-b from-primary to-accent origin-top"
            />
          </div>

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="step-card relative flex items-start space-x-8">
                {/* Step Number & Icon */}
                <div className="relative z-10 flex-shrink-0">
                  <div className={`step-icon w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>

                {/* Step Content */}
                <Card className="flex-1 bg-card/80 backdrop-blur-glass border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-card">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-xl font-heading font-semibold text-foreground mb-2 md:mb-0">
                        {step.title}
                      </h3>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 bg-gradient-primary px-8 py-4 rounded-2xl text-primary-foreground">
            <span className="font-semibold">Thời gian triển khai trung bình:</span>
            <span className="text-2xl font-heading font-bold">8-12 tuần</span>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
    </section>
  );
};

export default ProcessStepsSection;