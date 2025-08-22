import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, CheckCircle, User, MapPin, DollarSign } from 'lucide-react';
import { useGSAP } from '@/hooks/useGSAP';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  zalo: string;
  location: string;
  area: string;
  budget: string;
  timeline: string;
  notes: string;
}

const ContactForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    zalo: '',
    location: '',
    area: '',
    budget: '',
    timeline: '',
    notes: ''
  });
  
  const formRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const { gsap } = useGSAP();
  const { toast } = useToast();

  const totalSteps = 3;

  const budgetOptions = [
    'Dưới 1 tỷ',
    '1-2 tỷ',
    '2-3 tỷ', 
    'Trên 3 tỷ'
  ];

  const timelineOptions = [
    'Ngay (1-3 tháng)',
    'Gần (3-6 tháng)',
    'Trung hạn (6-12 tháng)',
    'Dài hạn (trên 12 tháng)'
  ];

  useEffect(() => {
    // Animate progress bar
    const progress = (currentStep / totalSteps) * 100;
    gsap.to(progressRef.current, {
      width: `${progress}%`,
      duration: 0.5,
      ease: "power2.out"
    });
  }, [currentStep, gsap]);

  const nextStep = () => {
    if (currentStep < totalSteps) {
      gsap.to(formRef.current, {
        x: -100,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setCurrentStep(currentStep + 1);
          gsap.fromTo(formRef.current, 
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.3 }
          );
        }
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      gsap.to(formRef.current, {
        x: 100,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setCurrentStep(currentStep - 1);
          gsap.fromTo(formRef.current, 
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.3 }
          );
        }
      });
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Mock form submission
    console.log('Form submitted:', formData);
    
    toast({
      title: "Đăng ký thành công!",
      description: "Chúng tôi sẽ liên hệ với bạn trong vòng 24h.",
    });

    // Reset form
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      zalo: '',
      location: '',
      area: '',
      budget: '',
      timeline: '',
      notes: ''
    });
    setCurrentStep(1);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.fullName && formData.phone && formData.email;
      case 2:
        return formData.location && formData.area;
      case 3:
        return formData.budget && formData.timeline;
      default:
        return false;
    }
  };

  const renderStepIcon = (step: number) => {
    if (step === 1) return <User className="w-5 h-5" />;
    if (step === 2) return <MapPin className="w-5 h-5" />;
    if (step === 3) return <DollarSign className="w-5 h-5" />;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                Thông tin cá nhân
              </h3>
              <p className="text-muted-foreground">
                Cung cấp thông tin liên hệ để chúng tôi tư vấn tốt nhất
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Họ và tên *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Nguyễn Văn A"
                />
              </div>

              <div>
                <Label htmlFor="phone">Số điện thoại *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="0901234567"
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <Label htmlFor="zalo">Zalo/WhatsApp</Label>
                <Input
                  id="zalo"
                  value={formData.zalo}
                  onChange={(e) => handleInputChange('zalo', e.target.value)}
                  placeholder="0901234567 (tùy chọn)"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                Khu vực & Diện tích
              </h3>
              <p className="text-muted-foreground">
                Thông tin về địa điểm dự kiến mở phòng tập
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="location">Tỉnh/Thành phố dự kiến *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="TP. Hồ Chí Minh, Hà Nội, Đà Nẵng..."
                />
              </div>

              <div>
                <Label htmlFor="area">Diện tích dự kiến (m²) *</Label>
                <Input
                  id="area"
                  value={formData.area}
                  onChange={(e) => handleInputChange('area', e.target.value)}
                  placeholder="300m², 500m², 800m²..."
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                Ngân sách & Thời gian
              </h3>
              <p className="text-muted-foreground">
                Thông tin cuối để chúng tôi tư vấn phù hợp nhất
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Ngân sách đầu tư dự kiến *</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {budgetOptions.map((option) => (
                    <Button
                      key={option}
                      variant={formData.budget === option ? "default" : "outline"}
                      onClick={() => handleInputChange('budget', option)}
                      className="justify-start"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label>Thời gian dự kiến triển khai *</Label>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  {timelineOptions.map((option) => (
                    <Button
                      key={option}
                      variant={formData.timeline === option ? "default" : "outline"}
                      onClick={() => handleInputChange('timeline', option)}
                      className="justify-start"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Ghi chú thêm</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Có kinh nghiệm kinh doanh, muốn tìm hiểu thêm về..."
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Sẵn sàng mở phòng tập thông minh?
            </h2>
            <p className="text-lg text-muted-foreground">
              Đăng ký tư vấn miễn phí và nhận bộ hồ sơ nhượng quyền chi tiết
            </p>
          </div>

          {/* Form Card */}
          <Card className="bg-card/80 backdrop-blur-glass border-border/50 shadow-card">
            <CardHeader>
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  {Array.from({ length: totalSteps }, (_, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        index + 1 <= currentStep
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      } transition-colors duration-300`}
                    >
                      {index + 1 <= currentStep ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        renderStepIcon(index + 1)
                      )}
                    </div>
                  ))}
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    ref={progressRef}
                    className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: '33.33%' }}
                  />
                </div>
                <div className="text-center mt-2 text-sm text-muted-foreground">
                  Bước {currentStep} / {totalSteps}
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {/* Form Content */}
              <div ref={formRef}>
                {renderStep()}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Quay lại
                </Button>

                {currentStep < totalSteps ? (
                  <Button
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="bg-gradient-primary hover:shadow-primary flex items-center"
                  >
                    Tiếp theo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!isStepValid()}
                    className="bg-gradient-primary hover:shadow-primary"
                  >
                    Gửi đăng ký
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <div className="text-center mt-8 space-y-4">
            <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Bảo mật thông tin 100%</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Tư vấn miễn phí</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Phản hồi trong 24h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;