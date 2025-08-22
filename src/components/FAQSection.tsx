import { useEffect, useRef, useLayoutEffect } from 'react';
import { HelpCircle } from 'lucide-react';
import { useGSAP } from '@/hooks/useGSAP';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FAQSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { gsap, ScrollTrigger } = useGSAP();

  const faqs = [
    {
      question: 'Chi phí đầu tư ban đầu là bao nhiêu?',
      answer: 'Chi phí đầu tư phụ thuộc vào quy mô và vị trí. Gói Lite từ 800 triệu, gói Standard từ 1.5 tỷ, gói Flagship từ 2.5 tỷ. Bao gồm thiết bị, setup, đào tạo và hỗ trợ 6 tháng đầu.'
    },
    {
      question: 'Thời gian lắp đặt và đi vào hoạt động?',
      answer: 'Thời gian trung bình từ 8-12 tuần từ khi ký hợp đồng. Bao gồm khảo sát (1-2 tuần), thiết kế (2-3 tuần), thi công lắp đặt (3-4 tuần), và vận hành thử nghiệm (1 tuần).'
    },
    {
      question: 'Có đào tạo vận hành không?',
      answer: 'Có chương trình đào tạo toàn diện 40 giờ bao gồm: vận hành hệ thống, customer service, marketing, quản lý tài chính. Hỗ trợ onsite 2 tuần đầu và hotline 24/7.'
    },
    {
      question: 'Có cam kết về doanh thu không?',
      answer: 'Chúng tôi cam kết hỗ trợ đạt break-even trong 18-24 tháng với điều kiện tuân thủ quy trình vận hành. Không cam kết doanh thu cụ thể do phụ thuộc nhiều yếu tố địa phương.'
    },
    {
      question: 'Chính sách hỗ trợ marketing như thế nào?',
      answer: 'Hỗ trợ thiết kế brand identity, chiến lược marketing địa phương, setup Google Ads & Facebook Ads, content marketing và PR khai trương. Budget marketing tối thiểu 50 triệu/tháng trong 6 tháng đầu.'
    },
    {
      question: 'Bảo hành thiết bị trong bao lâu?',
      answer: 'Thiết bị cơ bản bảo hành 2 năm, thiết bị IoT/công nghệ bảo hành 1 năm. Bảo trì định kỳ 6 tháng/lần. Hỗ trợ kỹ thuật 24/7 qua hotline và remote support.'
    },
    {
      question: 'Có hỗ trợ tài chính hay vay vốn không?',
      answer: 'Hỗ trợ kết nối với các ngân hàng đối tác để vay vốn ưu đãi. Có thể trả góp thiết bị trong 24 tháng với lãi suất ưu đãi. Hỗ trợ lập business plan cho hồ sơ vay.'
    },
    {
      question: 'Quyền lợi độc quyền khu vực như thế nào?',
      answer: 'Bảo vệ khu vực trong bán kính 2km cho gói Lite, 3km cho Standard và 5km cho Flagship. Ưu tiên mở rộng cùng đối tác hiện tại khi có cơ hội trong khu vực lân cận.'
    }
  ];

  // Enhanced GSAP animations with multiple effects
  useLayoutEffect(() => {
    if (!sectionRef.current || !headerRef.current || !ctaRef.current || !gsap || !ScrollTrigger) return;

    const ctx = gsap.context(() => {
      try {
        // 1. Enhanced Header Timeline Animation
        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });

        headerTl
          .from(".faq-title", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
          })
          .from(".faq-description", {
            y: 30,
            opacity: 0,
            duration: 0.6
          }, "-=0.4");

        // 2. FAQ Items Staggered Animation (Enhanced)
        const faqItems = sectionRef.current.querySelectorAll('.faq-item');
        gsap.from(faqItems, {
          y: 40,
          opacity: 0,
          scale: 0.95,
          duration: 0.7,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: "play none none reverse"
          }
        });

        // 3. Contact CTA Animation
        gsap.from(ctaRef.current, {
          y: 60,
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        });

        // 4. Parallax Background Elements
        const bgElements = sectionRef.current.querySelectorAll('.bg-element');
        bgElements.forEach((element, index) => {
          const direction = index % 2 === 0 ? -1 : 1;
          const distance = 30 + (index * 20);

          gsap.to(element, {
            y: direction * distance,
            rotation: direction * 15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1 + (index * 0.5)
            }
          });
        });

      } catch (error) {
        console.error('❌ FAQ animation error:', error);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [gsap, ScrollTrigger]);

  // Enhanced Hover Effects
  useEffect(() => {
    if (!gsap) return;

    const addHoverEffects = () => {
      const faqItems = document.querySelectorAll('.faq-item');

      faqItems.forEach(item => {
        const numberBadge = item.querySelector('.faq-number');

        const handleMouseEnter = () => {
          gsap.to(item, {
            scale: 1.02,
            y: -3,
            boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
            duration: 0.3,
            ease: "power2.out"
          });

          if (numberBadge) {
            gsap.to(numberBadge, {
              scale: 1.2,
              backgroundColor: "var(--primary)",
              color: "white",
              rotation: 360,
              duration: 0.4,
              ease: "back.out(1.7)"
            });
          }
        };

        const handleMouseLeave = () => {
          gsap.to(item, {
            scale: 1,
            y: 0,
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            duration: 0.3
          });

          if (numberBadge) {
            gsap.to(numberBadge, {
              scale: 1,
              backgroundColor: "rgb(var(--primary) / 0.1)",
              color: "var(--primary)",
              rotation: 0,
              duration: 0.3
            });
          }
        };

        item.addEventListener('mouseenter', handleMouseEnter);
        item.addEventListener('mouseleave', handleMouseLeave);

        // Cleanup function
        return () => {
          item.removeEventListener('mouseenter', handleMouseEnter);
          item.removeEventListener('mouseleave', handleMouseLeave);
        };
      });
    };

    // Add hover effects after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(addHoverEffects, 100);

    return () => clearTimeout(timeoutId);
  }, [gsap]);

  return (
    <section id="faq" ref={sectionRef} className="py-20 bg-gradient-subtle relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-primary rounded-3xl flex items-center justify-center faq-icon">
              <HelpCircle className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h2 className="faq-title text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Câu hỏi thường gặp
          </h2>
          <p className="faq-description text-lg text-muted-foreground max-w-3xl mx-auto">
            Những thắc mắc phổ biến về mô hình nhượng quyền SmartGym Partner Network
          </p>
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card/80 backdrop-blur-glass border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-center">
                Tất cả thông tin bạn cần biết
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="faq-item border border-border/30 rounded-xl px-6 hover:border-primary/30 transition-colors"
                  >
                    <AccordionTrigger className="py-6 hover:no-underline group">
                      <div className="flex items-center space-x-4 text-left">
                        <div className="faq-number w-8 h-8 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                          <span className="text-sm font-bold">{index + 1}</span>
                        </div>
                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {faq.question}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <div className="pl-12">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* Contact CTA */}
              <div ref={ctaRef} className="contact-cta mt-12 text-center p-8 bg-gradient-primary rounded-2xl text-primary-foreground">
                <h3 className="text-xl font-heading font-semibold mb-2">
                  Vẫn còn thắc mắc?
                </h3>
                <p className="mb-4 opacity-90">
                  Đội ngũ tư vấn của chúng tôi sẵn sàng giải đáp mọi câu hỏi
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Hotline:</span>
                    <span className="text-lg">1900-0987 (7476)</span>
                  </div>
                  <div className="hidden sm:block w-px h-6 bg-white/30" />
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Email:</span>
                    <span className="text-lg">partner@sgpn.vn</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced Background Elements for Parallax */}
      <div className="bg-element absolute top-1/4 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="bg-element absolute bottom-1/4 right-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
      <div className="bg-element absolute top-1/2 left-1/3 w-24 h-24 bg-secondary/3 rounded-full blur-2xl" />
      <div className="bg-element absolute bottom-1/3 right-1/4 w-36 h-36 bg-primary/3 rounded-full blur-4xl" />
    </section>
  );
};

export default FAQSection;