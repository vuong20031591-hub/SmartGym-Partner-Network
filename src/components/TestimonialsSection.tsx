import React, { useRef, useState, useEffect, useLayoutEffect, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { useGSAP } from '@/hooks/useGSAP';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// ========================================================================================
// TYPES & INTERFACES
// ========================================================================================

interface TestimonialMetrics {
  revenue: string;
  members: string;
  roi: string;
}

interface TestimonialData {
  name: string;
  business: string;
  location: string;
  quote: string;
  image: string;
  metrics: TestimonialMetrics;
}

interface AnimationConfig {
  duration: number;
  stagger: number;
  ease: string;
}

interface CarouselState {
  currentSlide: number;
  isPlaying: boolean;
  direction: 'next' | 'prev';
}

// ========================================================================================
// CONSTANTS & DATA
// ========================================================================================

const ANIMATION_CONFIG: AnimationConfig = {
  duration: 0.8,
  stagger: 0.2,
  ease: "power2.out"
};

const CAROUSEL_CONFIG = {
  autoPlayInterval: 5000,
  transitionDuration: 800,
  easing: "power2.inOut"
};

const TESTIMONIALS_DATA: TestimonialData[] = [
  {
    name: "Anh Minh Tuấn",
    business: "SmartGym Phú Mỹ Hưng",
    location: "Quận 7, TP.HCM",
    quote: "Sau 14 tháng hoạt động, phòng tập đã thu hút 380 hội viên với doanh thu ổn định 280 triệu/tháng. Hệ thống tự động giúp tôi tiết kiệm 70% thời gian vận hành.",
    image: "https://taminhtuan.vn/wp-content/uploads/2024/06/TMT-avatar-key-1280-1.png",
    metrics: {
      revenue: "280 triệu",
      members: "380 người",
      roi: "14 tháng"
    }
  },
  {
    name: "Chị Lan Phương",
    business: "SmartGym Royal City",
    location: "Đống Đa, Hà Nội",
    quote: "Công nghệ AI giúp tôi dự đoán chính xác giờ cao điểm và tối ưu hóa lịch PT. Lợi nhuận tăng 45% so với mô hình truyền thống mà tôi từng vận hành.",
    image: "https://icdn.24h.com.vn/upload/4-2023/images/2023-10-06/359716086_6391614500953447_2573807494143064991_n-1696577055-137-width1486height2048.jpg",
    metrics: {
      revenue: "320 triệu",
      members: "425 người",
      roi: "16 tháng"
    }
  },
  {
    name: "Anh Đức Anh",
    business: "SmartGym Landmark",
    location: "Bình Thạnh, TP.HCM",
    quote: "App thành viên và hệ thống thanh toán tự động giúp giảm thiểu sai sót và tăng trải nghiệm khách hàng. Tỉ lệ gia hạn đạt 82%, cao hơn kỳ vọng.",
    image: "https://utt.edu.vn/teacher/uploads/images/avatar/1472610193duc_anh.JPG",
    metrics: {
      revenue: "450 triệu",
      members: "520 người",
      roi: "12 tháng"
    }
  }
];

// ========================================================================================
// CUSTOM HOOKS
// ========================================================================================

/**
 * Custom hook for carousel functionality with auto-play
 */
const useCarousel = (totalSlides: number) => {
  const [carouselState, setCarouselState] = useState<CarouselState>({
    currentSlide: 0,
    isPlaying: true,
    direction: 'next'
  });

  const nextSlide = useCallback(() => {
    setCarouselState(prev => ({
      ...prev,
      currentSlide: (prev.currentSlide + 1) % totalSlides,
      direction: 'next'
    }));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCarouselState(prev => ({
      ...prev,
      currentSlide: prev.currentSlide === 0 ? totalSlides - 1 : prev.currentSlide - 1,
      direction: 'prev'
    }));
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCarouselState(prev => ({
      ...prev,
      currentSlide: index,
      direction: index > prev.currentSlide ? 'next' : 'prev'
    }));
  }, []);

  const toggleAutoPlay = useCallback(() => {
    setCarouselState(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying
    }));
  }, []);

  // Auto-play effect
  useEffect(() => {
    if (!carouselState.isPlaying) return;

    const interval = setInterval(nextSlide, CAROUSEL_CONFIG.autoPlayInterval);
    return () => clearInterval(interval);
  }, [carouselState.isPlaying, nextSlide]);

  return {
    ...carouselState,
    nextSlide,
    prevSlide,
    goToSlide,
    toggleAutoPlay
  };
};

/**
 * Custom hook for GSAP animations with proper cleanup
 */
const useTestimonialAnimations = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { gsap, ScrollTrigger } = useGSAP();

  useLayoutEffect(() => {
    if (!sectionRef.current || !gsap || !ScrollTrigger) {
      console.warn('TestimonialAnimations: Missing dependencies');
      return;
    }

    const ctx = gsap.context(() => {
      try {
        // Master timeline for entrance animations
        const masterTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        });

        // Animate section header
        masterTimeline.fromTo('.testimonials-header',
          {
            opacity: 0,
            y: 30
          },
          {
            opacity: 1,
            y: 0,
            duration: ANIMATION_CONFIG.duration,
            ease: ANIMATION_CONFIG.ease
          }
        );

        // Animate testimonial cards with stagger
        masterTimeline.fromTo('.testimonial-card',
          {
            opacity: 0,
            y: 60,
            scale: 0.95,
            rotateX: 15
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: ANIMATION_CONFIG.duration,
            stagger: ANIMATION_CONFIG.stagger,
            ease: ANIMATION_CONFIG.ease
          },
          "-=0.3"
        );

        // Animate carousel navigation
        masterTimeline.fromTo('.carousel-navigation',
          {
            opacity: 0,
            y: 20
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: ANIMATION_CONFIG.ease
          },
          "-=0.4"
        );

      } catch (error) {
        console.error('❌ Testimonial animation error:', error);

        // Fallback: Show content immediately
        gsap.set(['.testimonials-header', '.testimonial-card', '.carousel-navigation'], {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [gsap, ScrollTrigger]);

  return { sectionRef, carouselRef };
};

// ========================================================================================
// COMPONENTS
// ========================================================================================

/**
 * Individual testimonial card component - Memoized for performance
 */
const TestimonialCard = React.memo<TestimonialData & { totalSlides: number }>(({
  name,
  business,
  location,
  quote,
  image,
  metrics,
  totalSlides
}) => {
  return (
    <div
      className="flex-shrink-0 px-4 flex items-stretch"
      style={{
        width: `${100 / totalSlides}%`,
        minHeight: '400px'
      }}
    >
      <Card className="testimonial-card w-full max-w-4xl mx-auto bg-card/95 backdrop-blur-sm border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group">
        <CardContent className="p-6">
          {/* Header with Image and Basic Info */}
          <div className="flex items-start gap-6 mb-6">
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary/20">
                <img
                  src={image}
                  alt={business}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 fill-white text-white" />
              </div>
            </div>

            <div className="flex-1">
              <h4 className="font-heading font-bold text-foreground text-lg mb-1">
                {name}
              </h4>
              <p className="text-primary font-medium text-sm mb-1">
                {business}
              </p>
              <p className="text-muted-foreground text-sm">
                {location}
              </p>

              {/* Rating Stars */}
              <div className="flex items-center space-x-1 mt-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="relative mb-6">
            <Quote className="absolute -top-2 -left-2 w-6 h-6 text-primary/30" />
            <blockquote className="text-foreground leading-relaxed pl-4 italic">
              "{quote}"
            </blockquote>
          </div>

          {/* Metrics - Horizontal Layout */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-primary/10 rounded-xl border border-primary/20 hover:bg-primary/15 transition-colors">
              <div className="text-2xl font-heading font-bold text-primary mb-1">
                {metrics.revenue.split(' ')[0]}
              </div>
              <div className="text-xs text-muted-foreground font-medium">Doanh thu/tháng</div>
            </div>
            <div className="text-center p-4 bg-accent/10 rounded-xl border border-accent/20 hover:bg-accent/15 transition-colors">
              <div className="text-2xl font-heading font-bold text-accent mb-1">
                {metrics.members.split(' ')[0]}
              </div>
              <div className="text-xs text-muted-foreground font-medium">Hội viên</div>
            </div>
            <div className="text-center p-4 bg-secondary/30 rounded-xl border border-border/30 hover:bg-secondary/40 transition-colors">
              <div className="text-2xl font-heading font-bold text-foreground mb-1">
                {metrics.roi.split(' ')[0]}
              </div>
              <div className="text-xs text-muted-foreground font-medium">Tháng hoàn vốn</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

TestimonialCard.displayName = 'TestimonialCard';

/**
 * Carousel navigation controls component
 */
const CarouselControls = React.memo<{
  currentSlide: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
  onGoToSlide: (index: number) => void;
}>(({ currentSlide, totalSlides, onPrevious, onNext, onGoToSlide }) => {
  return (
    <div className="carousel-navigation flex items-center justify-center space-x-6 mt-8">
      {/* Previous Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={onPrevious}
        className="w-12 h-12 rounded-full border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      {/* Dot Indicators */}
      <div className="flex items-center space-x-3">
        {Array.from({ length: totalSlides }, (_, index) => (
          <button
            key={index}
            onClick={() => onGoToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-primary scale-125'
                : 'bg-border hover:bg-primary/50'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={onNext}
        className="w-12 h-12 rounded-full border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
});

CarouselControls.displayName = 'CarouselControls';

/**
 * Custom hook for smooth carousel transitions using GSAP
 */
const useCarouselTransitions = (currentSlide: number, carouselRef: React.RefObject<HTMLDivElement>, totalSlides: number) => {
  const { gsap } = useGSAP();

  useEffect(() => {
    if (!carouselRef.current || !gsap) return;

    const carousel = carouselRef.current;

    try {
      // Calculate precise transform value based on total slides
      // Each slide should move by (100% / totalSlides) to show the next card
      const slideWidth = 100 / totalSlides;
      const transformValue = `-${currentSlide * slideWidth}%`;

      // Smooth transition to current slide
      gsap.to(carousel, {
        x: transformValue,
        duration: CAROUSEL_CONFIG.transitionDuration / 1000,
        ease: CAROUSEL_CONFIG.easing
      });
    } catch (error) {
      console.error('❌ Carousel transition error:', error);
      // Fallback to CSS transform with correct calculation
      const slideWidth = 100 / totalSlides;
      carousel.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
    }
  }, [currentSlide, gsap, carouselRef, totalSlides]);
};

// ========================================================================================
// MAIN COMPONENT
// ========================================================================================

/**
 * Main TestimonialsSection component with optimized performance and animations
 */
const TestimonialsSection: React.FC = () => {
  // Memoize testimonials data to prevent unnecessary re-renders
  const testimonials = useMemo(() => TESTIMONIALS_DATA, []);

  // Carousel state and controls
  const carousel = useCarousel(testimonials.length);

  // Animation refs and setup
  const { sectionRef, carouselRef } = useTestimonialAnimations();

  // Carousel transitions
  useCarouselTransitions(carousel.currentSlide, carouselRef, testimonials.length);

  // Memoize carousel controls to prevent unnecessary re-renders
  const carouselControls = useMemo(() => ({
    onPrevious: carousel.prevSlide,
    onNext: carousel.nextSlide,
    onGoToSlide: carousel.goToSlide
  }), [carousel.prevSlide, carousel.nextSlide, carousel.goToSlide]);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-20 bg-background"
      aria-labelledby="testimonials-heading"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="testimonials-header text-center mb-16">
          <h2
            id="testimonials-heading"
            className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6"
          >
            Câu chuyện thành công
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Những đối tác đã thành công với mô hình SmartGym Partner Network
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-3xl">
            <div
              ref={carouselRef}
              className="flex items-stretch"
              style={{
                width: `${testimonials.length * 100}%`,
                height: 'auto',
                minHeight: '400px'
              }}
              role="region"
              aria-label="Customer testimonials carousel"
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={`testimonial-${index}`}
                  {...testimonial}
                  totalSlides={testimonials.length}
                />
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          <CarouselControls
            currentSlide={carousel.currentSlide}
            totalSlides={testimonials.length}
            {...carouselControls}
          />
        </div>


      </div>
    </section>
  );
};

export default TestimonialsSection;