import { useEffect } from 'react';

const PerformanceOptimizer: React.FC = () => {
  
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload hero image
      const heroImageLink = document.createElement('link');
      heroImageLink.rel = 'preload';
      heroImageLink.as = 'image';
      heroImageLink.href = '/src/assets/hero-gym.jpg';
      document.head.appendChild(heroImageLink);

      // Preload logo
      const logoLink = document.createElement('link');
      logoLink.rel = 'preload';
      logoLink.as = 'image';
      logoLink.href = '/logo (1).png';
      document.head.appendChild(logoLink);

      // Preload critical fonts
      const fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.as = 'font';
      fontLink.type = 'font/woff2';
      fontLink.href = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2';
      fontLink.crossOrigin = 'anonymous';
      document.head.appendChild(fontLink);
    };

    // Optimize images with lazy loading
    const optimizeImages = () => {
      const images = document.querySelectorAll('img[loading="lazy"]');
      
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
              }
              imageObserver.unobserve(img);
            }
          });
        }, {
          rootMargin: '50px 0px',
          threshold: 0.01
        });

        images.forEach(img => imageObserver.observe(img));
      }
    };

    // Optimize third-party scripts
    const optimizeThirdPartyScripts = () => {
      // Defer non-critical scripts
      const scripts = document.querySelectorAll('script[src]');
      scripts.forEach(script => {
        if (!script.hasAttribute('async') && !script.hasAttribute('defer')) {
          script.setAttribute('defer', '');
        }
      });
    };

    // Monitor Core Web Vitals
    const monitorCoreWebVitals = () => {
      if ('web-vitals' in window || typeof window !== 'undefined') {
        // LCP - Largest Contentful Paint
        const observeLCP = () => {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
            
            // Track in analytics if available
            if ((window as any).gtag) {
              (window as any).gtag('event', 'web_vitals', {
                metric_name: 'LCP',
                metric_value: Math.round(lastEntry.startTime),
                metric_rating: lastEntry.startTime < 2500 ? 'good' : lastEntry.startTime < 4000 ? 'needs_improvement' : 'poor'
              });
            }
          });
          
          try {
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
          } catch (e) {
            console.log('LCP observation not supported');
          }
        };

        // FID - First Input Delay
        const observeFID = () => {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
              const fid = entry.processingStart - entry.startTime;
              console.log('FID:', fid);
              
              if ((window as any).gtag) {
                (window as any).gtag('event', 'web_vitals', {
                  metric_name: 'FID',
                  metric_value: Math.round(fid),
                  metric_rating: fid < 100 ? 'good' : fid < 300 ? 'needs_improvement' : 'poor'
                });
              }
            });
          });
          
          try {
            observer.observe({ entryTypes: ['first-input'] });
          } catch (e) {
            console.log('FID observation not supported');
          }
        };

        // CLS - Cumulative Layout Shift
        const observeCLS = () => {
          let clsValue = 0;
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value;
              }
            });
            
            console.log('CLS:', clsValue);
            
            if ((window as any).gtag) {
              (window as any).gtag('event', 'web_vitals', {
                metric_name: 'CLS',
                metric_value: Math.round(clsValue * 1000) / 1000,
                metric_rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs_improvement' : 'poor'
              });
            }
          });
          
          try {
            observer.observe({ entryTypes: ['layout-shift'] });
          } catch (e) {
            console.log('CLS observation not supported');
          }
        };

        observeLCP();
        observeFID();
        observeCLS();
      }
    };

    // Resource hints for external domains
    const addResourceHints = () => {
      // DNS prefetch for external domains
      const dnsPrefetchDomains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://www.googletagmanager.com',
        'https://www.google-analytics.com'
      ];

      dnsPrefetchDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = domain;
        document.head.appendChild(link);
      });
    };

    // Initialize optimizations
    preloadCriticalResources();
    optimizeImages();
    optimizeThirdPartyScripts();
    monitorCoreWebVitals();
    addResourceHints();

    // Service Worker registration for caching
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }

  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceOptimizer;
