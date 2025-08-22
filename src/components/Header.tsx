import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useGSAP } from '@/hooks/useGSAP';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { gsap, ScrollTrigger } = useGSAP();

  const navItems = [
    { label: 'Lợi ích', href: '#benefits' },
    { label: 'Mô hình đầu tư', href: '#investment' },
    { label: 'Công nghệ', href: '#technology' },
    { label: 'Quy trình', href: '#process' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Liên hệ', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    // GSAP Progress Bar
    ScrollTrigger.create({
      start: 0,
      end: () => document.body.scrollHeight - window.innerHeight,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      }
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [ScrollTrigger]);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-border/30 z-50">
        <div 
          className="h-full bg-gradient-primary transition-all duration-100"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-glass border-b border-border/50 shadow-card' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="/logo (1).png"
                alt="SmartGym Partner Network"
                className="h-10 w-auto object-contain"
                style={{
                  transform: 'scale(2.4)',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                }}
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button 
                onClick={() => handleNavClick('#contact')}
                className="bg-gradient-primary hover:shadow-primary transition-all duration-300"
              >
                Đăng ký đối tác
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-glass border-b border-border/50 shadow-card">
            <nav className="container mx-auto px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                >
                  {item.label}
                </button>
              ))}
              <Button 
                onClick={() => handleNavClick('#contact')}
                className="w-full bg-gradient-primary hover:shadow-primary transition-all duration-300"
              >
                Đăng ký đối tác
              </Button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;