import { useEffect, useRef } from 'react';
import { Clock, Shield, Smartphone, TrendingUp, Wrench, MapPin } from 'lucide-react';
import { useGSAP } from '@/hooks/useGSAP';
import { Card, CardContent } from '@/components/ui/card';

const ValuePropsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { gsap, createScrollTrigger } = useGSAP();

  const valueProps = [
    {
      icon: Clock,
      title: 'Vận hành tinh gọn 24/7',
      description: 'Hệ thống tự động hóa hoàn toàn, giảm thiểu nhân sự vận hành đến 80%'
    },
    {
      icon: Shield,
      title: 'Cửa xoay + khóa thông minh',
      description: 'Kiểm soát ra vào bảo mật, tích hợp thẻ từ và QR code'
    },
    {
      icon: Smartphone,
      title: 'App thành viên thông minh',
      description: 'Check-in QR, đặt lịch PT, thanh toán, theo dõi tiến độ tập luyện'
    },
    {
      icon: TrendingUp,
      title: 'Dashboard doanh thu realtime',
      description: 'Báo cáo minh bạch theo ngày, tuần, tháng với AI dự báo xu hướng'
    },
    {
      icon: Wrench,
      title: 'Chi phí đầu tư linh hoạt',
      description: 'Gói đầu tư từ 800 triệu đến 2.5 tỷ, phù hợp mọi quy mô diện tích'
    },
    {
      icon: MapPin,
      title: 'Hỗ trợ MKT địa phương',
      description: 'Chiến lược marketing định vị, quảng cáo Facebook/Google chuyên nghiệp'
    }
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.value-card');

    gsap.set(cards, { y: 40, opacity: 0 });

    createScrollTrigger({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out"
        });
      }
    });
  }, [gsap, createScrollTrigger]);

  return (
    <section id="benefits" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Tại sao chọn mô hình SGPN?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Hệ sinh thái công nghệ hoàn chỉnh giúp bạn vận hành phòng tập hiệu quả, 
            tối đa hóa lợi nhuận với chi phí tối thiểu.
          </p>
        </div>

        {/* Value Props Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {valueProps.map((prop, index) => (
            <Card 
              key={index}
              className="value-card group bg-card/50 backdrop-blur-glass border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-card"
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:shadow-primary transition-all duration-300">
                      <prop.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {prop.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {prop.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/4 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
    </section>
  );
};

export default ValuePropsSection;