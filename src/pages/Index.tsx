import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ValuePropsSection from '@/components/ValuePropsSection';
import TechnologySection from '@/components/TechnologySection';
import InvestmentSection from '@/components/InvestmentSection';
import ROICalculatorSection from '@/components/ROICalculatorSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ProcessStepsSection from '@/components/ProcessStepsSection';
import FAQSection from '@/components/FAQSection';
import ContactForm from '@/components/ContactForm';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ValuePropsSection />
        <TechnologySection />
        <InvestmentSection />
        <ROICalculatorSection />
        <TestimonialsSection />
        <ProcessStepsSection />
        <FAQSection />
        <ContactForm />
      </main>
      
      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="mb-6">
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                SmartGym Partner Network
              </h3>
              <p className="text-muted-foreground">
                Mạng lưới phòng tập thông minh hàng đầu Việt Nam
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Liên hệ</h4>
                <div className="text-muted-foreground space-y-1">
                  <div>Hotline: 1900-0987 (7476)</div>
                  <div>Email: partner@sgpn.vn</div>
                  <div>Địa chỉ: 123 Nguyễn Huệ, Q1, TP.HCM</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-3">Tài liệu</h4>
                <div className="text-muted-foreground space-y-1">
                  <div>Brochure nhượng quyền</div>
                  <div>Quy chế vận hành</div>
                  <div>Hợp đồng mẫu</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-3">Hỗ trợ</h4>
                <div className="text-muted-foreground space-y-1">
                  <div>Câu hỏi thường gặp</div>
                  <div>Hướng dẫn vận hành</div>
                  <div>Tư vấn kỹ thuật</div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-border pt-6 text-sm text-muted-foreground">
              <p>&copy; 2025 SmartGym Partner Network. Bảo lưu mọi quyền.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
