import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star, ArrowRight } from 'lucide-react';
import { useGSAP } from '@/hooks/useGSAP';

const InvestmentSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { gsap, createScrollTrigger } = useGSAP();

  const packages = [
    {
      name: 'SGPN Lite',
      area: '150-300m²',
      investment: '800 triệu - 1.2 tỷ',
      franchise: '150 triệu',
      monthly: '15 triệu',
      features: [
        'Thiết bị cơ bản IoT',
        'App thành viên',
        'Dashboard quản lý',
        'Hỗ trợ setup 3 tháng',
        'Marketing kit cơ bản'
      ],
      popular: false
    },
    {
      name: 'SGPN Standard',
      area: '300-600m²',
      investment: '1.2 tỷ - 2 tỷ',
      franchise: '200 triệu',
      monthly: '25 triệu',
      features: [
        'Hệ thống IoT đầy đủ',
        'Gương thông minh',
        'InBody scanner',
        'AI analytics',
        'Marketing automation',
        'PT booking system',
        'Hỗ trợ 6 tháng'
      ],
      popular: true
    },
    {
      name: 'SGPN Flagship',
      area: '600m²+',
      investment: '2 tỷ - 2.8 tỷ',
      franchise: '300 triệu',
      monthly: '35 triệu',
      features: [
        'Premium IoT ecosystem',
        'AR/VR training zones',
        'Biometric access',
        'Advanced AI coaching',
        'Full automation',
        'Premium marketing',
        'Dedicated support 12 tháng',
        'ROI guarantee program'
      ],
      popular: false
    }
  ];

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll('.investment-card');

    // Create timeline for sequential card animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: "play none none reverse"
      }
    });

    // Set initial states
    gsap.set(cards, { 
      y: 100, 
      opacity: 0, 
      rotateY: -15,
      scale: 0.9
    });

    // Animate cards with stagger and 3D effects
    tl.to(cards, {
      y: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
      duration: 1,
      stagger: 0.3,
      ease: "back.out(1.7)"
    });

    // Add floating animation
    cards.forEach((card, index) => {
      gsap.to(card, {
        y: -10,
        duration: 2 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: index * 0.2
      });
    });

  }, [gsap, createScrollTrigger]);

  const handleGetDetails = (packageName: string) => {
    console.log(`Xin bảng tính chi tiết cho gói ${packageName}`);
    // Mock action - would trigger a form or download
  };

  return (
    <section id="investment" ref={sectionRef} className="min-h-screen flex items-center py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Mô hình đầu tư linh hoạt
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Chọn gói phù hợp với quy mô và ngân sách của bạn. 
            Tất cả gói đều bao gồm công nghệ IoT và hỗ trợ vận hành.
          </p>
        </div>

        {/* Investment Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg, index) => (
            <Card 
              key={index}
              className={`investment-card ${
                pkg.popular 
                  ? 'bg-gradient-to-b from-card to-primary/5 border-primary shadow-primary scale-105' 
                  : 'bg-card/80 backdrop-blur-glass border-border/50'
              } transition-all duration-500`}
            >
              <CardHeader className="text-center pb-4">
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Phổ biến nhất
                    </div>
                  </div>
                )}
                <CardTitle className="text-2xl font-heading font-bold text-foreground mb-2">
                  {pkg.name}
                </CardTitle>
                <div className="text-primary text-lg font-semibold mb-1">
                  {pkg.area}
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {pkg.investment}
                </div>
                <div className="text-sm text-muted-foreground">
                  Phí nhượng quyền: <span className="text-primary font-semibold">{pkg.franchise}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Phí vận hành: <span className="text-primary font-semibold">{pkg.monthly}/tháng</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={() => handleGetDetails(pkg.name)}
                  className={`w-full ${
                    pkg.popular 
                      ? 'bg-gradient-primary hover:shadow-primary' 
                      : 'bg-secondary hover:bg-secondary/80'
                  } transition-all duration-300 group`}
                >
                  Xin bảng tính chi tiết
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2 mt-12">
          {packages.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'bg-primary w-8' : 'bg-border'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-3xl" />
    </section>
  );
};

export default InvestmentSection;