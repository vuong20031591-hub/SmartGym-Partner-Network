import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Download } from 'lucide-react';
import { useGSAP } from '@/hooks/useGSAP';
import heroImage from '@/assets/hero-gym.jpg';

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const { gsap, createScrollTrigger } = useGSAP();

  const kpiData = [
    { label: 'Đối tác thành công', value: 150, suffix: '+' },
    { label: 'ROI trung bình', value: 25, suffix: '%' },
    { label: 'Thời gian hoàn vốn', value: 18, suffix: ' tháng' }
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({ delay: 0.5 });

    // Background parallax effect
    gsap.set(backgroundRef.current, { scale: 1.2, y: 0 });

    // Split text animation for headline
    if (headlineRef.current) {
      const text = headlineRef.current.textContent || '';
      const words = text.split(' ');
      headlineRef.current.innerHTML = words.map(word => 
        `<span class="inline-block overflow-hidden"><span class="inline-block">${word}</span></span>`
      ).join(' ');

      const wordSpans = headlineRef.current.querySelectorAll('span span');
      
      gsap.set(wordSpans, { y: '100%', opacity: 0 });
      
      tl.to(wordSpans, {
        y: '0%',
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      }, 0);
    }

    // Subtitle animation
    tl.from(subtitleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, 0.3);

    // CTA buttons animation
    tl.from(ctaRef.current?.children || [], {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out"
    }, 0.5);

    // KPI counters
    kpiData.forEach((kpi, index) => {
      const element = document.querySelector(`[data-kpi="${index}"]`);
      if (element) {
        gsap.fromTo(element, 
          { innerText: 0 },
          {
            innerText: kpi.value,
            duration: 2,
            delay: 1,
            snap: { innerText: 1 },
            ease: "power2.out"
          }
        );
      }
    });

    // Background parallax scroll
    gsap.to(backgroundRef.current, {
      y: -100,
      scale: 1.1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }, [gsap, createScrollTrigger]);

  const handleDownloadBrochure = () => {
    // Mock download action
    console.log('Download brochure clicked');
  };

  const handleConsultation = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `linear-gradient(135deg, rgba(11, 15, 20, 0.8) 0%, rgba(20, 184, 166, 0.1) 100%), url(${heroImage})` 
        }}
      />
      
      {/* Overlay pattern */}
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 
            ref={headlineRef}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-6 leading-tight"
          >
            Mở phòng tập thông minh, vận hành nhẹ – lợi nhuận bền vững
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Từ thiết bị IoT đến ứng dụng hội viên – chúng tôi chuẩn hóa mọi thứ để bạn tăng tốc mở rộng với mô hình nhượng quyền 4.0.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg"
              onClick={handleDownloadBrochure}
              className="bg-gradient-primary hover:shadow-primary text-lg px-8 py-4 h-auto group transition-all duration-300"
            >
              <Download className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Nhận bộ hồ sơ nhượng quyền (PDF)
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleConsultation}
              className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-4 h-auto group transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Tư vấn 1:1 miễn phí
            </Button>
          </div>

          {/* KPI Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {kpiData.map((kpi, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  <span data-kpi={index}>0</span>
                  <span>{kpi.suffix}</span>
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {kpi.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;