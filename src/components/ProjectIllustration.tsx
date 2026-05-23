import { motion } from 'motion/react';
import { TimePhase } from '../types';

interface ProjectIllustrationProps {
  type: 'pipeline' | 'ethereal' | 'cosmique';
  theme: any;
  phase: TimePhase;
  className?: string;
}

export default function ProjectIllustration({ type, theme, phase, className = "" }: ProjectIllustrationProps) {
  const isLight = phase === 'jour' || phase === 'aube';

  // Render Pipeline illustration
  if (type === 'pipeline') {
    return (
      <div className={`w-full h-full relative flex items-center justify-center overflow-hidden rounded-[2rem] p-6 ${className}`}>
        {/* Ambient background glow */}
        <div 
          className="absolute inset-x-0 bottom-0 h-40 opacity-30 blur-[60px] rounded-full transition-all duration-[1500ms]"
          style={{ backgroundColor: theme.secondary }}
        />

        <svg viewBox="0 0 400 300" className="w-full h-full relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Constellation pipelines tracks */}
          <path d="M 50,150 L 150,110 L 250,190 L 350,150" stroke={theme.text} strokeWidth="1.5" strokeOpacity="0.15" />
          <path d="M 150,110 L 250,110 L 350,150" stroke={theme.text} strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.2" />
          
          {/* Flowing particle packets */}
          <motion.circle
            r="4"
            fill={theme.secondary}
            animate={{
              offsetDistance: ["0%", "100%"],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              offsetPath: "path('M 50,150 L 150,110 L 250,190 L 350,150')",
              boxShadow: `0 0 10px ${theme.secondary}`,
            }}
          />

          <motion.circle
            r="3"
            fill={theme.accent}
            animate={{
              offsetDistance: ["0%", "100%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
              delay: 3,
            }}
            style={{
              offsetPath: "path('M 150,110 L 250,110 L 350,150')",
            }}
          />

          {/* Connected Stage Nodes */}
          {/* Node 1: Code */}
          <g>
            <circle cx="50" cy="150" r="18" fill={isLight ? 'rgba(255,255,255,0.9)' : 'rgba(15,23,42,0.8)'} stroke={theme.text} strokeWidth={1.5} strokeOpacity={0.25} />
            <motion.circle cx="50" cy="150" r="28" stroke={theme.secondary} strokeWidth="1" strokeOpacity="0.2" 
              animate={{ scale: [1, 1.3, 1] }} 
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} 
            />
            {/* Simple bracket symbol for code */}
            <path d="M46,146 L42,150 L46,154 M54,146 L58,150 L54,154" stroke={theme.secondary} strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* Node 2: Build */}
          <g>
            <circle cx="150" cy="110" r="18" fill={isLight ? 'rgba(255,255,255,0.9)' : 'rgba(15,23,42,0.8)'} stroke={theme.text} strokeWidth={1.5} strokeOpacity={0.25} />
            <motion.circle cx="150" cy="110" r="24" stroke={theme.accent} strokeWidth="1" strokeOpacity="0.3" 
              animate={{ rotate: 360 }} 
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }} 
            />
            {/* Box package symbol for Build */}
            <path d="M144,106 L150,102 L156,106 L156,114 L150,118 L144,114 Z M144,106 L150,110 L156,106 M150,110 L150,118" stroke={theme.text} strokeWidth="1.2" strokeLinejoin="round" />
          </g>

          {/* Node 3: Test */}
          <g>
            <circle cx="250" cy="190" r="18" fill={isLight ? 'rgba(255,255,255,0.9)' : 'rgba(15,23,42,0.8)'} stroke={theme.text} strokeWidth={1.5} strokeOpacity={0.25} />
            <motion.circle cx="250" cy="190" r="28" stroke={theme.secondary} strokeWidth="1" strokeOpacity="0.2" 
              animate={{ scale: [1.2, 0.9, 1.2] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
            />
            {/* Orbit paths for tests */}
            <ellipse cx="250" cy="190" rx="12" ry="4" stroke={theme.secondary} strokeWidth="1" transform="rotate(30, 250, 190)" />
            <circle cx="250" cy="190" r="4" fill={theme.secondary} />
          </g>

          {/* Node 4: Deploy */}
          <g>
            <circle cx="350" cy="150" r="18" fill={isLight ? 'rgba(255,255,255,0.9)' : 'rgba(15,23,42,0.8)'} stroke={theme.text} strokeWidth={1.5} strokeOpacity={0.25} />
            <motion.circle cx="350" cy="150" r="32" stroke={theme.secondary} strokeWidth="1" strokeOpacity="0.4"
              animate={{ strokeDashoffset: [0, 100] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{ strokeDasharray: "4 4" }}
            />
            {/* Shimmering Star for Deploy */}
            <path d="M350,143 L352,148 L357,150 L352,152 L350,157 L348,152 L343,150 L348,148 Z" fill={theme.secondary} />
          </g>

          {/* Continuous looping arrow overlay representing continuous feedback */}
          <motion.path
            d="M 330,125 C 290,70 110,70 70,125"
            stroke={theme.secondary}
            strokeWidth="1"
            strokeDasharray="5 5"
            strokeOpacity="0.4"
            fill="none"
          />
        </svg>

        {/* Floating background dust */}
        <div className="absolute inset-0 pointer-events-none mix-blend-screen">
          {[1, 2, 3, 4, 5].map(id => (
            <motion.div
              key={id}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: theme.accent,
                left: `${15 + id * 15}%`,
                top: `${30 + (id % 3) * 20}%`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 4 + id,
                repeat: Infinity,
                ease: "easeInOut",
                delay: id * 0.5,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Render Ethereal / Interactive UI illustration
  if (type === 'ethereal') {
    return (
      <div className={`w-full h-full relative flex items-center justify-center overflow-hidden rounded-[2rem] p-6 ${className}`}>
        <div 
          className="absolute inset-x-0 bottom-0 h-40 opacity-30 blur-[60px] rounded-full transition-all duration-[1500ms]"
          style={{ backgroundColor: theme.accent }}
        />

        <svg viewBox="0 0 400 300" className="w-full h-full relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Main orbits */}
          <circle cx="200" cy="150" r="70" stroke={theme.text} strokeWidth="1" strokeOpacity="0.1" />
          <circle cx="200" cy="150" r="45" stroke={theme.text} strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.15" />

          {/* Intersecting lines */}
          <line x1="100" y1="150" x2="300" y2="150" stroke={theme.text} strokeWidth="0.5" strokeOpacity="0.15" />
          <line x1="200" y1="50" x2="200" y2="250" stroke={theme.text} strokeWidth="0.5" strokeOpacity="0.15" />

          {/* Constellation lines */}
          <path d="M 150,110 L 120,170 L 220,195 L 280,120 L 150,110" stroke={theme.secondary} strokeWidth="1" strokeOpacity="0.4" />

          {/* Ethereal Rotating Sphere */}
          <motion.g
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            style={{ originX: "200px", originY: "150px" }}
          >
            {/* Small Celestial Body */}
            <circle cx="200" cy="80" r="5" fill={theme.secondary} />
            <circle cx="200" cy="80" r="9" stroke={theme.secondary} strokeWidth="1" strokeOpacity="0.4" />
          </motion.g>

          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            style={{ originX: "200px", originY: "150px" }}
          >
            {/* Inner Spark */}
            <circle cx="155" cy="150" r="4" fill={theme.accent} />
          </motion.g>

          {/* Center glowing star */}
          <g>
            <circle cx="200" cy="150" r="15" fill={isLight ? 'rgba(255,255,255,0.9)' : 'rgba(15,23,42,0.8)'} stroke={theme.text} strokeWidth="1" strokeOpacity="0.1" />
            <motion.circle
              cx="200"
              cy="150"
              r="22"
              stroke={theme.secondary}
              strokeWidth="1.5"
              strokeOpacity="0.3"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Geometric star design */}
            <path d="M200,140 L203,147 L210,150 L203,153 L200,160 L197,153 L190,150 L197,147 Z" fill={theme.secondary} />
          </g>
        </svg>
      </div>
    );
  }

  // Render Cosmique Illustration (Lunar & Solar clocks)
  return (
    <div className={`w-full h-full relative flex items-center justify-center overflow-hidden rounded-[2rem] p-6 ${className}`}>
      <div 
        className="absolute inset-x-0 bottom-0 h-40 opacity-30 blur-[60px] rounded-full transition-all duration-[1500ms]"
        style={{ backgroundColor: theme.secondary }}
      />

      <svg viewBox="0 0 400 300" className="w-full h-full relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Astrolabe layout */}
        <circle cx="200" cy="150" r="80" stroke={theme.text} strokeWidth="1.5" strokeOpacity="0.1" />
        <circle cx="200" cy="150" r="76" stroke={theme.text} strokeWidth="0.5" strokeOpacity="0.15" />
        
        {/* Hour markers */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(degree => (
          <line
            key={degree}
            x1="200"
            y1="70"
            x2="200"
            y2="75"
            stroke={theme.text}
            strokeWidth="0.8"
            strokeOpacity="0.25"
            transform={`rotate(${degree}, 200, 150)`}
          />
        ))}

        {/* Cosmic Dial Hands */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{ originX: "200px", originY: "150px" }}
        >
          {/* Golden sun hand */}
          <line x1="200" y1="150" x2="200" y2="90" stroke={theme.secondary} strokeWidth="2" strokeLinecap="round" />
          <circle cx="200" cy="90" r="8" fill={theme.secondary} />
          {/* Sun rays */}
          <circle cx="200" cy="90" r="12" stroke={theme.secondary} strokeWidth="1" strokeDasharray="2 2" />
        </motion.g>

        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          style={{ originX: "200px", originY: "150px" }}
        >
          {/* Moon hand */}
          <line x1="200" y1="150" x2="200" y2="105" stroke={theme.accent} strokeWidth="1" strokeLinecap="round" strokeDasharray="2 1" />
          {/* Crescent moon representation */}
          <path d="M196,105 A 5 5 0 1 0 204,105 A 4 4 0 1 1 196,105" fill={theme.accent} />
        </motion.g>

        {/* Center pivot */}
        <circle cx="200" cy="150" r="5" fill={theme.text} fillOpacity="0.3" />
        <circle cx="200" cy="150" r="2" fill={theme.text} />
      </svg>
    </div>
  );
}
