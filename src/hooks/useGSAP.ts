import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const useGSAP = () => {
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useLayoutEffect(() => {
    // Initialize GSAP with custom settings
    gsap.config({
      nullTargetWarn: false,
      force3D: true
    });

    // Set defaults
    gsap.defaults({
      duration: 0.8,
      ease: "power2.out"
    });

    // Debug GSAP availability
    if (process.env.NODE_ENV === 'development') {
      console.log('GSAP initialized:', {
        gsapVersion: gsap.version,
        scrollTriggerAvailable: !!ScrollTrigger,
        windowGsap: typeof window !== 'undefined' ? !!window.gsap : false
      });

      // Expose GSAP globally for debugging
      if (typeof window !== 'undefined') {
        (window as any).gsap = gsap;
        (window as any).ScrollTrigger = ScrollTrigger;
      }
    }

    // Refresh ScrollTrigger on mount
    ScrollTrigger.refresh();

    return () => {
      // Cleanup specific triggers created by this instance
      triggersRef.current.forEach(trigger => {
        if (trigger && trigger.kill) {
          trigger.kill();
        }
      });
      triggersRef.current = [];
    };
  }, []);

  // Create ScrollTrigger with automatic cleanup and error handling
  const createScrollTrigger = (config: ScrollTrigger.Vars) => {
    try {
      const trigger = ScrollTrigger.create(config);
      triggersRef.current.push(trigger);
      return trigger;
    } catch (error) {
      console.error('Failed to create ScrollTrigger:', error);
      return null;
    }
  };

  return { gsap, ScrollTrigger, createScrollTrigger };
};

export { gsap, ScrollTrigger };