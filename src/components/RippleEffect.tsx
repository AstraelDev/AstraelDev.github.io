import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function RippleEffect() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const triggerRipple = useCallback((x: number, y: number) => {
    const id = Date.now();
    setRipples(prev => [...prev, { id, x, y }]);
    
    // Clean up after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 1500);
  }, []);

  // Global listener for click ripple
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't trigger if it's already a complex transition? 
      // User says "quand on clique sur quelque chose" so we do it for everyone
      triggerRipple(e.clientX, e.clientY);
    };

    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [triggerRipple]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9990] overflow-hidden">
      <AnimatePresence>
        {ripples.map(r => (
          <div key={r.id} className="absolute pointer-events-none" style={{ left: r.x, top: r.y }}>
            {/* Primary Ripple - Heavy Wave & Blur */}
            <motion.div
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ 
                scale: 40, 
                opacity: 0,
                transition: { duration: 1.8, ease: [0.165, 0.84, 0.44, 1] }
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/30 backdrop-blur-[16px]"
              style={{ width: 100, height: 100 }}
            />
            {/* Secondary Ripple - Quick Pressure Ring */}
            <motion.div
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ 
                scale: 30, 
                opacity: 0,
                transition: { duration: 1.2, ease: "easeOut" }
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white/50"
              style={{ width: 120, height: 120 }}
            />
            {/* Third Ripple - Deep Echo */}
            <motion.div
              initial={{ scale: 0, opacity: 0.4 }}
              animate={{ 
                scale: 20, 
                opacity: 0,
                transition: { duration: 1.5, ease: "easeOut", delay: 0.15 }
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 backdrop-blur-[4px]"
              style={{ width: 80, height: 80 }}
            />
            {/* Final Echo - Subtle Glow */}
            <motion.div
              initial={{ scale: 0, opacity: 0.2 }}
              animate={{ 
                scale: 50, 
                opacity: 0,
                transition: { duration: 2.5, ease: "easeOut", delay: 0.3 }
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5"
              style={{ width: 60, height: 60 }}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
