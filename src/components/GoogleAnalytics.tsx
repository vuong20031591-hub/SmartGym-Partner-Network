import { useEffect } from 'react';

interface GoogleAnalyticsProps {
  measurementId?: string;
}

const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ 
  measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX' // Use environment variable
}) => {
  
  useEffect(() => {
    // Only load in production
    if (process.env.NODE_ENV !== 'production') {
      console.log('Google Analytics disabled in development mode');
      return;
    }

    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script1);

    // Initialize Google Analytics
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}', {
        page_title: document.title,
        page_location: window.location.href,
        send_page_view: true
      });
    `;
    document.head.appendChild(script2);

    // Track custom events
    const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventName, parameters);
      }
    };

    // Track scroll depth
    let maxScroll = 0;
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
        maxScroll = scrollPercent;
        trackEvent('scroll_depth', {
          scroll_depth: scrollPercent,
          page_title: document.title
        });
      }
    };

    // Track time on page
    const startTime = Date.now();
    const trackTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      trackEvent('time_on_page', {
        time_spent: timeSpent,
        page_title: document.title
      });
    };

    // Track form interactions
    const trackFormInteraction = (formName: string, action: string) => {
      trackEvent('form_interaction', {
        form_name: formName,
        action: action,
        page_title: document.title
      });
    };

    // Track button clicks
    const trackButtonClick = (buttonText: string, buttonType: string) => {
      trackEvent('button_click', {
        button_text: buttonText,
        button_type: buttonType,
        page_title: document.title
      });
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', trackTimeOnPage);

    // Track CTA button clicks
    const ctaButtons = document.querySelectorAll('button, a[href*="contact"], a[href*="download"]');
    ctaButtons.forEach(button => {
      button.addEventListener('click', () => {
        const buttonText = button.textContent?.trim() || 'Unknown';
        const buttonType = button.tagName.toLowerCase() === 'a' ? 'link' : 'button';
        trackButtonClick(buttonText, buttonType);
      });
    });

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', trackTimeOnPage);
    };
  }, [measurementId]);

  return null; // This component doesn't render anything
};

export default GoogleAnalytics;
