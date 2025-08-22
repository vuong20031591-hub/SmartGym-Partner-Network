import { useEffect, useRef, useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Users } from 'lucide-react';
import { useGSAP } from '@/hooks/useGSAP';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import roiImage from '@/assets/roi-calculator.jpg';

const ROICalculatorSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const { gsap, createScrollTrigger } = useGSAP();

  const [formData, setFormData] = useState({
    area: '',
    rentPerSqm: '',
    membershipPrice: '',
    equipment: ''
  });

  const [roi, setRoi] = useState({
    monthlyRevenue: 0,
    monthlyExpenses: 0,
    breakEvenMonths: 0,
    yearlyProfit: 0
  });

  const stats = [
    { label: 'ARPU Trung bình', value: 850000, suffix: 'đ/tháng', icon: DollarSign },
    { label: 'Tỉ lệ gia hạn', value: 78, suffix: '%', icon: TrendingUp },
    { label: 'Hội viên/100m²', value: 45, suffix: ' người', icon: Users },
    { label: 'Hoàn vốn TB', value: 18, suffix: ' tháng', icon: Calculator }
  ];

  useEffect(() => {
    if (!sectionRef.current || !statsRef.current) return;

    const statElements = statsRef.current.querySelectorAll('.stat-number');

    // Animate stats numbers
    statElements.forEach((element, index) => {
      const target = stats[index].value;
      gsap.fromTo(element, 
        { innerText: 0 },
        {
          innerText: target,
          duration: 2,
          ease: "power2.out",
          snap: { innerText: 1 },
          delay: index * 0.2,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            toggleActions: "play none none reset"
          }
        }
      );
    });
  }, [gsap, createScrollTrigger, stats]);

  const calculateROI = () => {
    const area = parseFloat(formData.area) || 0;
    const rent = parseFloat(formData.rentPerSqm) || 0;
    const memberPrice = parseFloat(formData.membershipPrice) || 0;
    const equipmentCount = parseFloat(formData.equipment) || 0;

    // Rough calculations
    const membersPerSqm = 0.45; // 45 members per 100sqm
    const totalMembers = area * membersPerSqm;
    const monthlyRevenue = totalMembers * memberPrice;
    
    const monthlyRent = area * rent;
    const staffCost = 15000000; // 15M/month
    const utilities = area * 50000; // 50k per sqm
    const monthlyExpenses = monthlyRent + staffCost + utilities;

    const monthlyProfit = monthlyRevenue - monthlyExpenses;
    const initialInvestment = equipmentCount * 50000000 + area * 2000000; // Equipment + setup
    
    const breakEvenMonths = monthlyProfit > 0 ? Math.ceil(initialInvestment / monthlyProfit) : 0;
    const yearlyProfit = monthlyProfit * 12;

    setRoi({
      monthlyRevenue,
      monthlyExpenses,
      breakEvenMonths,
      yearlyProfit
    });
  };

  useEffect(() => {
    const timer = setTimeout(calculateROI, 300);
    return () => clearTimeout(timer);
  }, [formData]);

  return (
    <section id="roi" ref={sectionRef} className="py-20 bg-gradient-subtle relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={roiImage} 
          alt="ROI Calculator"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 to-background/90" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Tính toán lợi nhuận dự kiến
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Sử dụng công cụ tính ROI để ước tính doanh thu và thời gian hoàn vốn cho phòng tập của bạn.
          </p>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card/80 backdrop-blur-glass border-border/50 text-center">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
                <div className="text-2xl font-heading font-bold text-foreground mb-2">
                  <span className="stat-number">0</span>
                  <span className="text-lg">{stat.suffix}</span>
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ROI Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Form */}
          <Card className="bg-card/80 backdrop-blur-glass border-border/50">
            <CardHeader>
              <CardTitle className="text-xl font-heading">Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="area">Diện tích (m²)</Label>
                <Input
                  id="area"
                  type="number"
                  placeholder="300"
                  value={formData.area}
                  onChange={(e) => setFormData({...formData, area: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="rent">Thuê mặt bằng (đ/m²/tháng)</Label>
                <Input
                  id="rent"
                  type="number"
                  placeholder="200000"
                  value={formData.rentPerSqm}
                  onChange={(e) => setFormData({...formData, rentPerSqm: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="membership">Giá gói thành viên (đ/tháng)</Label>
                <Input
                  id="membership"
                  type="number"
                  placeholder="850000"
                  value={formData.membershipPrice}
                  onChange={(e) => setFormData({...formData, membershipPrice: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="equipment">Số lượng thiết bị</Label>
                <Input
                  id="equipment"
                  type="number"
                  placeholder="20"
                  value={formData.equipment}
                  onChange={(e) => setFormData({...formData, equipment: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="bg-card/80 backdrop-blur-glass border-border/50">
            <CardHeader>
              <CardTitle className="text-xl font-heading">Kết quả dự báo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex justify-between items-center p-4 bg-primary/10 rounded-xl">
                  <span className="text-sm text-muted-foreground">Doanh thu/tháng</span>
                  <span className="font-semibold text-foreground">
                    {roi.monthlyRevenue.toLocaleString('vi-VN')}đ
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-destructive/10 rounded-xl">
                  <span className="text-sm text-muted-foreground">Chi phí/tháng</span>
                  <span className="font-semibold text-foreground">
                    {roi.monthlyExpenses.toLocaleString('vi-VN')}đ
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-success/10 rounded-xl">
                  <span className="text-sm text-muted-foreground">Lợi nhuận/năm</span>
                  <span className="font-semibold text-foreground">
                    {roi.yearlyProfit.toLocaleString('vi-VN')}đ
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-accent/10 rounded-xl">
                  <span className="text-sm text-muted-foreground">Hoàn vốn sau</span>
                  <span className="font-semibold text-foreground">
                    {roi.breakEvenMonths} tháng
                  </span>
                </div>
              </div>
              <Button className="w-full" size="lg">
                Nhận tư vấn chi tiết
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
    </section>
  );
};

export default ROICalculatorSection;