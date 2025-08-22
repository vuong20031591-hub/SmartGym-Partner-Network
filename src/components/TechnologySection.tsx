import { useEffect, useRef } from 'react';
import { Smartphone, Shield, Brain, Camera, Thermometer, BarChart } from 'lucide-react';
import { useGSAP } from '@/hooks/useGSAP';
import { Card, CardContent } from '@/components/ui/card';
import technologyImage from '@/assets/technology-iot.jpg';

const TechnologySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { gsap, createScrollTrigger } = useGSAP();

  const technologies = [
    {
      icon: Smartphone,
      title: 'App Check-in QR',
      description: 'Thành viên check-in bằng QR code, theo dõi lịch sử tập luyện'
    },
    {
      icon: Shield,
      title: 'Khóa từ thông minh',
      description: 'Kiểm soát ra vào tự động, tích hợp thẻ từ và facial recognition'
    },
    {
      icon: Brain,
      title: 'AI dự báo',
      description: 'Phân tích giờ cao điểm, tối ưu hóa vận hành và doanh thu'
    },
    {
      icon: Camera,
      title: 'Camera đếm lượt',
      description: 'Theo dõi mật độ sử dụng thiết bị, phân tích hành vi khách hàng'
    },
    {
      icon: Thermometer,
      title: 'HVAC thông minh',
      description: 'Điều hòa tự động theo số lượng người, tiết kiệm điện năng'
    },
    {
      icon: BarChart,
      title: 'Dashboard thời gian thực',
      description: 'Báo cáo doanh thu, lượng khách, hiệu suất thiết bị realtime'
    }
  ];

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const cards = container.querySelectorAll('.tech-card');
    
    // Set up horizontal scroll
    const totalWidth = cards.length * 400; // 400px per card
    
    gsap.set(container, { 
      width: totalWidth,
      display: 'flex'
    });

    // Horizontal scroll animation
    const scrollTween = gsap.to(container, {
      x: () => -(totalWidth - window.innerWidth + 200),
      ease: "none"
    });

    gsap.to(container, {
      x: () => -(totalWidth - window.innerWidth + 200),
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${totalWidth - window.innerWidth + 200}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1
      }
    });

    // Card animations
    gsap.set(cards, { y: 60, opacity: 0 });
    
    cards.forEach((card) => {
      gsap.to(card, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "left 80%",
          toggleActions: "play none none reverse"
        }
      });
    });
  }, [gsap, createScrollTrigger]);

  return (
    <section id="technology" ref={sectionRef} className="min-h-screen bg-gradient-subtle relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={technologyImage} 
          alt="Smart Gym Technology"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/70" />
      </div>

      <div className="relative z-10 py-20">
        {/* Section Header */}
        <div className="container mx-auto px-4 mb-16">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Công nghệ thông minh 4.0
            </h2>
            <p className="text-lg text-muted-foreground">
              Hệ sinh thái IoT và AI hoàn chỉnh, từ thiết bị phần cứng đến phần mềm quản lý, 
              giúp vận hành phòng tập hoàn toàn tự động.
            </p>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="overflow-hidden">
          <div ref={containerRef} className="flex gap-8 px-4">
            {technologies.map((tech, index) => (
              <Card 
                key={index}
                className="tech-card w-80 flex-shrink-0 bg-card/80 backdrop-blur-glass border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-card"
              >
                <CardContent className="p-8 h-full">
                  <div className="flex flex-col items-center text-center h-full">
                    <div className="w-16 h-16 bg-gradient-primary rounded-3xl flex items-center justify-center mb-6 group-hover:shadow-primary transition-all duration-300">
                      <tech.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                      {tech.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed flex-1">
                      {tech.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="container mx-auto px-4 mt-12">
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <span className="text-sm">Cuộn ngang để khám phá</span>
            <div className="w-6 h-0.5 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
    </section>
  );
};

export default TechnologySection;