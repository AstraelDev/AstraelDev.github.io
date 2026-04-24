import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export default function CustomCursor({ theme }: { theme: any }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Check if hovering over clickable elements
      const target = e.target as HTMLElement;
      setIsHovering(
        !!target.closest('button, a') || 
        window.getComputedStyle(target).cursor === 'pointer'
      );

      // Add particles (more frequent and intense sparklers)
      if (Math.random() > 0.4) {
        const id = Math.random() + Date.now();
        const newParticle: Particle = {
          id,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 6 + 2,
          color: theme.secondary
        };
        setParticles(prev => [...prev.slice(-30), newParticle]);
        
        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== id));
        }, 1000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [theme.secondary]);

  return (
    <>
      {/* Sparkles Trail */}
      <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">
        <AnimatePresence>
          {particles.map(p => (
            <motion.div
              key={p.id}
              initial={{ opacity: 1, scale: 0, rotate: 0 }}
              animate={{ 
                opacity: 0, 
                scale: 1, 
                y: p.y + (Math.random() - 0.2) * 100, 
                x: p.x + (Math.random() - 0.5) * 50,
                rotate: 180 
              }}
              exit={{ opacity: 0 }}
              className="absolute pointer-events-none"
              style={{
                left: p.x,
                top: p.y,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                boxShadow: `0 0 15px ${p.color}, 0 0 30px ${p.color}aa`,
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', // Star shape for "paillettes"
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePos.x - (isHovering ? 20 : 12),
          y: mousePos.y - (isHovering ? 20 : 12),
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? 'rgba(255,255,255,0.8)' : '#FFFFFF'
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
        style={{
          boxShadow: isHovering ? `0 0 20px rgba(255,255,255,0.4)` : 'none'
        }}
      />
    </>
  );
}
