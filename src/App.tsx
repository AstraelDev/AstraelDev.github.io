import { useEffect, useState, useMemo, memo, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { Github, Mail, Linkedin, Clock, Settings, RotateCcw, Instagram, MessageCircle, Menu, X, FileText, Plus, ExternalLink } from 'lucide-react';
import { TimePhase } from './types.ts';
import { THEMES } from './constants.ts';
import CV from './components/CV.tsx';
import SkillsModal from './components/SkillsModal.tsx';
import CustomCursor from './components/CustomCursor.tsx';
import RippleEffect from './components/RippleEffect.tsx';

/**
 * UTILS
 */
const getPhase = (hour: number): TimePhase => {
  if (hour >= 6 && hour < 8) return 'aube';
  if (hour >= 8 && hour < 18) return 'jour';
  if (hour >= 18 && hour < 20) return 'crepuscule';
  return 'nuit';
};

export default function App() {
  const [time, setTime] = useState(new Date());
  const [manualPhase, setManualPhase] = useState<TimePhase | null>(null);
  const [debugOpen, setDebugOpen] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const [skillsOpen, setSkillsOpen] = useState(false);
  
  // Ripple before action handlers
  const openCV = () => {
    setTimeout(() => setCvOpen(true), 400);
  };
  
  const openSkills = () => {
    setTimeout(() => setSkillsOpen(true), 400);
  };

  // Sections definitions for programmatic scroll
  const sectionIds = ['hero', 'about', 'projects', 'contact'];
  const lastScrollTime = useRef(0);

  const scrollToSection = (index: number) => {
    const id = sectionIds[index];
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePanEnd = (_: any, info: any) => {
    if (!isMobile) return;
    
    const now = Date.now();
    if (now - lastScrollTime.current < 600) return;

    const progress = scrollYProgress.get();
    let currentIdx = 0;
    if (progress < 0.15) currentIdx = 0;
    else if (progress < 0.45) currentIdx = 1;
    else if (progress < 0.75) currentIdx = 2;
    else currentIdx = 3;

    const { offset, velocity } = info;
    const threshold = 30; // Sensitive threshold for better "glisser" feel

    if (Math.abs(offset.y) > threshold || Math.abs(velocity.y) > 500) {
      lastScrollTime.current = now;
      if (offset.y < 0 || velocity.y < -500) { // Swiping up (going down)
        scrollToSection(Math.min(currentIdx + 1, 3));
      } else if (offset.y > 0 || velocity.y > 500) { // Swiping down (going up)
        scrollToSection(Math.max(currentIdx - 1, 0));
      }
    }
  };

  const handleNavClick = (e: any, id: string) => {
    e.preventDefault();
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 450);
  };
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef
  });

  // Handle responsiveness for scroll ranges
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Smooth scroll progress
  const smoothY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const phase = useMemo(() => manualPhase || getPhase(time.getHours()), [time, manualPhase]);
  const theme = THEMES[phase];

  // Animation values - Adaptive ranges for mobile
  // We complete the peak slightly before the snap point for maximum clarity
  const cloudRange = isMobile ? [0, 0.3] : [0, 0.4];
  
  // Progress-based ranges for 4 distinct sections - Adaptive for mobile
  const aboutOpacity = useTransform(smoothY, isMobile ? [0.05, 0.25] : [0.15, 0.35], [0, 1]);
  const projectsOpacity = useTransform(smoothY, isMobile ? [0.35, 0.55] : [0.45, 0.65], [0, 1]);
  const finalOpacity = useTransform(smoothY, [0.75, 0.95], [0, 1]);
  
  const contentScale = useTransform(smoothY, [0.15, 0.45], [0.9, 1]);
  
  const cloudOffset = useTransform(smoothY, cloudRange, [0, 800]);
  const celestialY = useTransform(smoothY, [0, 0.45], [0, -300]);

  return (
    <motion.div 
      ref={containerRef}
      onPanEnd={handlePanEnd}
      className={`scroll-container overflow-y-auto ${isMobile ? 'snap-y snap-proximity' : 'snap-y snap-mandatory'} relative`}
    >
      {/* PERSISTENT BACKGROUND LAYERS (Cross-fade for performance) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {(['aube', 'jour', 'crepuscule', 'nuit'] as TimePhase[]).map((p) => (
          <div
            key={p}
            className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
            style={{ 
              background: THEMES[p].bg, 
              opacity: phase === p ? 1 : 0 
            }}
          />
        ))}
      </div>

      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <Atmosphere glowColor={theme.clouds[0]} />
        {phase === 'nuit' && <Stars />}
        <CelestialBody phase={phase} style={{ y: celestialY }} color={theme.celestial} />
        <Clouds offset={cloudOffset} colors={theme.clouds} isNight={phase === 'nuit'} />
    </div>

    <CustomCursor theme={theme} />
    <RippleEffect />

    {/* OVERLAY TIMER & DEBUG (Desktop) */}
    {!isMobile && (
      <div 
        className="fixed top-4 right-4 sm:top-8 sm:right-8 z-[100] flex flex-col items-end gap-2 scale-90 sm:scale-100 origin-top-right font-mono"
        style={{ color: theme.text }}
      >
          <div className="flex items-center gap-2 px-4 py-2 glass rounded-full text-xs tracking-widest opacity-60 hover:opacity-100 transition-opacity">
            <Clock size={14} />
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            <span className="ml-2 uppercase">{phase}</span>
            <button 
              onClick={() => setDebugOpen(!debugOpen)}
              className="ml-2 p-1 hover:bg-current/10 rounded-full transition-colors pointer-events-auto"
            >
              <Settings size={12} className={debugOpen ? 'rotate-45 transition-transform' : 'transition-transform'} />
            </button>
          </div>

          <AnimatePresence>
            {debugOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="glass p-2 rounded-2xl flex flex-col gap-1 pointer-events-auto"
              >
                {(['aube', 'jour', 'crepuscule', 'nuit'] as TimePhase[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setManualPhase(p);
                      setDebugOpen(false);
                    }}
                    className={`px-4 py-1.5 rounded-xl text-[10px] uppercase tracking-widest transition-all ${
                      phase === p && manualPhase === p ? 'bg-current text-white invert' : 'hover:bg-current/10'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                {manualPhase && (
                  <button
                    onClick={() => {
                      setManualPhase(null);
                      setDebugOpen(false);
                    }}
                    className="mt-1 px-4 py-1.5 rounded-xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 border border-current/20 hover:bg-current/10"
                  >
                    <RotateCcw size={10} /> Auto
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
      </div>
    )}

    {/* BURGER MENU (Mobile) */}
    {isMobile && (
      <>
        <AnimatePresence>
          {burgerOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBurgerOpen(false)}
              className="fixed inset-0 z-[90] bg-black/20 backdrop-blur-sm pointer-events-auto"
            />
          )}
        </AnimatePresence>
        
        <div className="fixed top-4 right-4 z-[100] flex flex-col items-end">
        <button
          onClick={() => setBurgerOpen(!burgerOpen)}
          className="p-3 glass rounded-full transition-transform active:scale-95 z-[110]"
          style={{ color: theme.text }}
        >
          {burgerOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <AnimatePresence>
          {burgerOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="glass-dark mt-3 p-6 rounded-3xl flex flex-col gap-6 min-w-[200px] border border-white/10 text-white"
            >
              <div className="flex flex-col gap-1">
                 <p className="text-[10px] opacity-40 uppercase tracking-widest">Temps & Phase</p>
                 <div className="flex items-center justify-between font-mono text-sm">
                    <span className="flex items-center gap-2 text-white"><Clock size={14} /> {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <span className="opacity-80 uppercase text-[10px] text-white">{phase}</span>
                 </div>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-[10px] opacity-40 uppercase tracking-widest text-white">Simulation</p>
                <div className="grid grid-cols-2 gap-2">
                  {(['aube', 'jour', 'crepuscule', 'nuit'] as TimePhase[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        setManualPhase(p);
                        setBurgerOpen(false);
                      }}
                      className={`px-3 py-2 rounded-xl text-[9px] uppercase tracking-wide transition-all border ${
                        phase === p && manualPhase === p 
                          ? 'bg-white text-black border-white' 
                          : 'border-white/10 text-white hover:bg-white/5'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                {manualPhase && (
                  <button
                    onClick={() => {
                      setManualPhase(null);
                      setBurgerOpen(false);
                    }}
                    className="mt-2 w-full px-3 py-2 rounded-xl text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 border border-white/20 text-white hover:bg-white/10"
                  >
                    <RotateCcw size={10} /> Reset Auto
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
    )}

      {/* NAVIGATION */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 0.7 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-6 sm:top-8 left-1/2 -translate-x-1/2 z-50 flex gap-6 sm:gap-12 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-medium w-full justify-center px-4"
        style={{ color: theme.text }}
      >
        <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="transition-opacity hover:opacity-100 whitespace-nowrap" style={{ color: phase === 'nuit' ? theme.secondary : 'inherit' }}>À propos</a>
        <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className="transition-opacity hover:opacity-100 whitespace-nowrap" style={{ color: phase === 'nuit' ? theme.secondary : 'inherit' }}>Portfolio</a>
        <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="transition-opacity hover:opacity-100 whitespace-nowrap" style={{ color: phase === 'nuit' ? theme.secondary : 'inherit' }}>Contact</a>
      </motion.nav>

      {/* SECTION 1: HERO */}
      <section 
        id="hero"
        className="h-[100dvh] flex flex-col items-center justify-center relative z-10 text-center px-6 snap-start snap-always"
        style={{ color: theme.text }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
                delayChildren: 0.8
              }
            }
          }}
          className="max-w-5xl w-full"
        >
          <motion.p 
            variants={{
              hidden: { y: -20, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }
            }}
            className="text-[12px] uppercase tracking-[0.4em] mb-4 font-bold"
            style={{ 
              color: phase === 'nuit' ? theme.secondary : (phase === 'crepuscule' ? '#1A1A1A' : 'inherit'), 
              opacity: (phase === 'nuit' || phase === 'crepuscule') ? 0.9 : 0.5 
            }}
          >
            Développement web
          </motion.p>
          <motion.h1 
            variants={{
              hidden: { y: -30, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] } }
            }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-black mb-2 tracking-normal"
            style={phase === 'nuit' ? {
              background: 'linear-gradient(135deg, #FFD700 0%, #D4AF37 50%, #FFB347 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              padding: '0 20px'
            } : {}}
          >
            PORTFOLIO
          </motion.h1>
          <motion.p 
            variants={{
              hidden: { y: -20, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }
            }}
            className="text-lg md:text-xl font-serif italic mb-8 font-semibold"
            style={{ color: phase === 'nuit' ? theme.secondary : 'inherit', opacity: phase === 'nuit' ? 0.9 : 0.6 }}
          >
            Soléane Mortreux — 2026
          </motion.p>
          
          <motion.div 
            variants={{
              hidden: { y: -20, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 1 } }
            }}
            className="mt-12 opacity-40"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div 
                className="w-[1px] h-20 bg-current mx-auto" 
                style={{ backgroundColor: phase === 'nuit' ? theme.secondary : 'currentColor' }}
              />
              <p 
                className="text-[8px] uppercase tracking-[0.2em] mt-4 font-bold"
                style={{ color: phase === 'nuit' ? theme.secondary : 'inherit' }}
              >
                Scrollez pour découvrir
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 2: ABOUT */}
      <motion.section 
        id="about"
        style={{ opacity: aboutOpacity, scale: contentScale }}
        className="min-h-[100dvh] flex items-center justify-center py-24 sm:py-48 relative z-20 snap-start snap-always will-change-[opacity,transform]"
      >
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
              }
            }
          }}
          className="max-w-6xl w-full px-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* INTRO CARD */}
            <motion.div 
              variants={{
                hidden: { y: 40, opacity: 0 },
                show: { y: 0, opacity: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="md:col-span-2 glass p-12 rounded-[2rem] flex flex-col justify-between aspect-square md:aspect-auto"
              style={{ color: theme.text }}
            >
              <div>
                <h2 className="text-4xl font-serif mb-8">Bienvenue dans un univers où l'art et le code ne font qu'un.</h2>
                <div className="space-y-4 text-sm opacity-80 leading-relaxed max-w-md">
                  <p>• Développeuse web passionnée</p>
                  <p>• Étudiante en BUT M.M.I à Haguenau</p>
                  <p>• Spécialisée en interfaces fluides et poétiques</p>
                </div>
              </div>
              
              <div className="mt-12 flex flex-wrap items-center gap-6">
                <a href="https://github.com/AstraelDev" className="p-4 rounded-full border border-current opacity-20 hover:opacity-100 transition-opacity" style={{ borderColor: phase === 'nuit' ? theme.secondary : 'currentColor' }}>
                  <Github size={20} style={{ color: phase === 'nuit' ? theme.secondary : 'inherit' }} />
                </a>
                <a href="mailto:mortreuxsoleane@gmail.com" className="p-4 rounded-full border border-current opacity-20 hover:opacity-100 transition-opacity" style={{ borderColor: phase === 'nuit' ? theme.secondary : 'currentColor' }}>
                  <Mail size={20} style={{ color: phase === 'nuit' ? theme.secondary : 'inherit' }} />
                </a>
                <a href="https://linkedin.com" className="p-4 rounded-full border border-current opacity-20 hover:opacity-100 transition-opacity" style={{ borderColor: phase === 'nuit' ? theme.secondary : 'currentColor' }}>
                  <Linkedin size={20} style={{ color: phase === 'nuit' ? theme.secondary : 'inherit' }} />
                </a>
                
                <motion.button 
                  onClick={openCV}
                  whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${theme.text}33` }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3.5 rounded-full glass border-2 border-white/40 hover:border-white/60 hover:bg-white/10 transition-all flex items-center gap-3 text-[10px] uppercase font-bold tracking-[0.4em] relative overflow-hidden group shadow-lg"
                  style={{ color: theme.text }}
                >
                  <motion.div 
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                  />
                  <FileText size={16} className="relative z-10" /> 
                  <span className="relative z-10">Voir mon CV</span>
                </motion.button>
              </div>
            </motion.div>

            {/* SKILLS BOX */}
            <motion.div 
              variants={{
                hidden: { y: 60, opacity: 0 },
                show: { y: 0, opacity: 1, transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 } }
              }}
              className="glass p-8 rounded-[2rem] flex flex-col"
              style={{ color: theme.text }}
            >
              <h3 className="text-xs uppercase tracking-widest opacity-50 mb-8 px-2 text-center font-bold">Notions & Outils</h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {['React', 'TypeScript', 'Motion', 'Tailwind', 'Node.js', 'Figma', 'Symfony', 'PHP'].map((skill) => (
                  <motion.div 
                    key={skill} 
                    variants={{
                      hidden: { scale: 0.8, opacity: 0 },
                      show: { scale: 1, opacity: 1 }
                    }}
                    className="p-3 sm:p-4 border border-current/10 rounded-2xl bg-current/5 text-[9px] sm:text-[10px] uppercase tracking-wider text-center flex items-center justify-center font-bold"
                    style={{ color: phase === 'nuit' ? theme.secondary : 'inherit', borderColor: phase === 'nuit' ? `${theme.secondary}33` : 'inherit' }}
                  >
                    {skill}
                  </motion.div>
                ))}
                
                {/* VOIR PLUS BUTTON IN GRID */}
                <motion.button
                  variants={{
                    hidden: { scale: 0.8, opacity: 0 },
                    show: { scale: 1, opacity: 1 }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openSkills}
                  className="p-3 sm:p-4 border border-dashed border-secondary/50 rounded-2xl bg-secondary/10 text-[9px] sm:text-[10px] uppercase tracking-wider text-center flex items-center justify-center gap-2 font-bold transition-colors hover:bg-secondary/20"
                  style={{ color: theme.secondary }}
                >
                  Plus <Plus size={12} />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* SECTION 3: PROJECTS */}
      <motion.section 
        id="projects"
        style={{ opacity: projectsOpacity }}
        className="min-h-[100dvh] flex items-center justify-center py-24 sm:py-48 relative z-20 snap-start snap-always will-change-[opacity]"
      >
        <div className="max-w-6xl w-full px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12" 
            style={{ color: theme.text }}
          >
            {[1, 2, 3].map(i => (
              <motion.div 
                key={i} 
                variants={{
                  hidden: { y: 60, opacity: 0 },
                  visible: { 
                    y: 0, 
                    opacity: 1,
                    transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] }
                  }
                }}
                className="glass aspect-[4/5] rounded-[2rem] overflow-hidden group cursor-pointer relative shadow-2xl" 
                style={{ color: theme.text }}
              >
                <div className="absolute inset-0 bg-current/5 group-hover:bg-transparent transition-colors duration-700" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <p className="text-[10px] uppercase tracking-widest opacity-50 mb-2">Projet 0{i}</p>
                    <h3 className="text-2xl font-serif">Concept Éthéré</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* SECTION 4: CONTACT */}
      <section 
        id="contact"
        className="h-[100dvh] flex items-center justify-center relative z-20 snap-start snap-always overflow-hidden will-change-[opacity,transform]"
      >
        <motion.div 
          style={{ opacity: finalOpacity, y: useTransform(smoothY, [0.7, 0.95], [50, 0]) }}
          className="max-w-4xl px-6 text-center"
        >
          <motion.h2 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="text-3xl md:text-5xl lg:text-6xl font-serif mb-16 leading-tight"
            style={{ 
              color: theme.text,
              textShadow: `0 0 20px ${phase === 'nuit' ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)'}`
            }}
          >
            Vous êtes arrivé jusqu’ici…<br />
            <span className="italic opacity-80">et si on créait quelque chose ensemble ?</span>
          </motion.h2>

          <div className="space-y-12">
            <div className="space-y-4">
              <motion.a 
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  show: { y: 0, opacity: 0.7, transition: { duration: 1 } }
                }}
                href="mailto:mortreuxsoleane@gmail.com" 
                className="block text-xl md:text-2xl font-serif tracking-wide hover:opacity-100 transition-opacity"
                style={{ 
                  color: theme.text, 
                  textShadow: `0 0 10px ${theme.text}44`
                }}
              >
                mortreuxsoleane@gmail.com
              </motion.a>
              <motion.p 
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  show: { y: 0, opacity: 0.5, transition: { duration: 1, delay: 0.1 } }
                }}
                className="text-sm font-mono tracking-widest text-center"
                style={{ color: theme.text }}
              >
                06 19 66 77 08
              </motion.p>
            </div>

            <div className="flex justify-center items-center gap-10 pt-8">
              {[
                { icon: Instagram, href: "https://instagram.com" },
                { icon: Github, href: "https://github.com" },
                { icon: MessageCircle, href: "https://discord.com" },
                { icon: Linkedin, href: "https://linkedin.com" }
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  className="group relative"
                >
                  <motion.div
                    className="absolute inset-0 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: phase === 'nuit' ? '#A0D2FF' : '#FFFFFF' }}
                  />
                  <social.icon 
                    size={28} 
                    className="relative z-10 transition-colors"
                    style={{ color: phase === 'nuit' ? theme.secondary : '#FFFFFF', opacity: 0.6 }}
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* FOOTER RAILS */}
      <footer 
        className="fixed bottom-8 w-full px-8 flex justify-between items-center text-[10px] uppercase tracking-[0.2em] opacity-40 z-50 pointer-events-none"
        style={{ color: theme.text }}
      >
         <div className="pointer-events-auto hover:opacity-100 transition-opacity flex items-center gap-2">
            <Github size={12} /> github/solmortreux
         </div>
         <div className="text-right">
            © 2026 — DIGITAL POETRY
         </div>
      </footer>

      {/* MODALS */}
      <AnimatePresence>
        {cvOpen && (
          <CV 
            onClose={() => setCvOpen(false)} 
            theme={theme}
            phase={phase}
          />
        )}
        {skillsOpen && (
          <SkillsModal 
            onClose={() => setSkillsOpen(false)} 
            theme={theme} 
            phase={phase}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/**
 * COMPONENTS
 */

const Atmosphere = memo(({ glowColor }: { glowColor: string }) => {
  return (
    <motion.div
      className="absolute inset-0 opacity-20 z-0"
      style={{ backgroundColor: glowColor, transform: 'translateZ(0)', filter: 'blur(100px)' }}
      animate={{ backgroundColor: glowColor }}
      transition={{ duration: 2 }}
    />
  );
});

const Stars = memo(() => {
  const stars = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      twinkleDuration: Math.random() * 4 + 3,
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            transform: 'translateZ(0)',
          }}
          animate={{
            opacity: [star.opacity, 0.1, star.opacity],
          }}
          transition={{
            duration: star.twinkleDuration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
});

const CelestialBody = memo(({ phase, style, color }: { phase: TimePhase, style: any, color: string }) => {
  const isNight = phase === 'nuit';
  
  return (
    <motion.div 
      style={style}
      className="absolute top-[10%] sm:top-[15%] left-1/2 -translate-x-1/2 pointer-events-none z-10"
    >
      {/* Glow Layer (High performance alternative to boxShadow) */}
      <motion.div
        animate={{ 
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 blur-[60px] rounded-full"
        style={{ 
          backgroundColor: isNight ? '#A0D2FF' : color,
          transform: 'translateZ(0)' 
        }}
      />
      
      <div
        className="w-32 h-32 sm:w-56 sm:h-56 rounded-full relative overflow-hidden"
        style={{ 
          background: isNight 
            ? 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #F0F0F0 40%, #D8D8D8 100%)' 
            : color,
          transform: 'translateZ(0)'
        }}
      >
        {isNight && (
          <div className="absolute inset-0 opacity-20">
            {/* Soft crater simulations */}
            <div className="absolute top-[15%] left-[25%] w-[18%] h-[18%] rounded-full bg-gray-500/20 blur-[2px]" />
            <div className="absolute top-[35%] left-[55%] w-[22%] h-[22%] rounded-full bg-gray-500/25 blur-[3px]" />
            <div className="absolute top-[60%] left-[35%] w-[15%] h-[15%] rounded-full bg-gray-500/20 blur-[2px]" />
            <div className="absolute bottom-[20%] right-[30%] w-[12%] h-[12%] rounded-full bg-gray-500/15 blur-[1px]" />
            <div className="absolute top-[10%] right-[35%] w-[10%] h-[10%] rounded-full bg-gray-500/10 blur-[1px]" />
          </div>
        )}
      </div>
    </motion.div>
  );
});

const Clouds = memo(({ offset, colors, isNight }: { offset: any, colors: string[], isNight?: boolean }) => {
  // We'll use multiple layers of clouds with different speeds and scales
  const leftX1 = useTransform(offset, (v: number) => -v * 1.8);
  const rightX1 = useTransform(offset, (v: number) => v * 1.8);
  const leftX2 = useTransform(offset, (v: number) => -v * 1.2);
  const rightX2 = useTransform(offset, (v: number) => v * 1.2);
  const middleY = useTransform(offset, (v: number) => v * 0.8);
  
  const baseOpacity = isNight ? 1 : 1;
  const opacity = useTransform(offset, [0, 600], [baseOpacity, baseOpacity * 0.4]);

  return (
    <div className="absolute inset-0 z-20 overflow-hidden will-change-transform">
      {/* BACKGROUND LAYER (Further away, very discreet) */}
      <motion.div
        style={{ x: leftX2, opacity: useTransform(opacity, (v) => v * 0.4), transform: 'translateZ(0)' }}
        className="absolute top-[25%] -left-[10%] w-[100vw] sm:w-[60vw] aspect-[2.5/1] z-10"
      >
        <CloudShape color={colors[2]} />
      </motion.div>
      <motion.div
        style={{ x: rightX2, opacity: useTransform(opacity, (v) => v * 0.4), transform: 'translateZ(0)' }}
        className="absolute top-[30%] -right-[15%] w-[110vw] sm:w-[65vw] aspect-[2.5/1] z-10"
      >
        <CloudShape color={colors[2]} flip />
      </motion.div>

      {/* MIDDLE LAYER (The ones that part the most) */}
      <motion.div
        style={{ x: leftX1, opacity, transform: 'translateZ(0)' }}
        className="absolute top-[35%] -left-[30%] sm:-left-[20%] w-[150vw] sm:w-[120vw] lg:w-[85vw] aspect-[2.5/1] z-30"
      >
        <CloudShape color={colors[0]} />
      </motion.div>

      <motion.div
        style={{ x: rightX1, opacity, transform: 'translateZ(0)' }}
        className="absolute top-[45%] -right-[35%] sm:-right-[25%] w-[160vw] sm:w-[130vw] lg:w-[95vw] aspect-[2.5/1] z-20"
      >
        <CloudShape color={colors[1]} flip />
      </motion.div>

      {/* FOREGROUND LAYER (Lower clouds) */}
      <motion.div
        style={{ y: middleY, opacity: useTransform(offset, [0, 500], [baseOpacity * 0.8, 0]), transform: 'translateZ(0)' }}
        className="absolute bottom-0 left-[10%] w-[120vw] sm:w-[60vw] aspect-[2.5/1] z-40"
      >
        <CloudShape color={colors[0]} />
      </motion.div>

      <motion.div
        style={{ y: useTransform(middleY, (v) => v * 1.2), opacity: useTransform(offset, [0, 400], [baseOpacity * 0.9, 0]), transform: 'translateZ(0)' }}
        className="absolute bottom-[-10%] right-[5%] w-[130vw] sm:w-[70vw] aspect-[2.5/1] z-50"
      >
        <CloudShape color={colors[1]} flip />
      </motion.div>
    </div>
  );
});

const CloudShape = memo(({ color, flip = false }: { color: string, flip?: boolean }) => {
  // We use multiple small perfect circles to build the cloud without stretching
  return (
    <div className={`relative w-full h-full ${flip ? 'scale-x-[-1]' : ''}`}>
      <div className="absolute w-[30%] aspect-square left-[5%] bottom-[15%] rounded-full" style={{ backgroundColor: color }} />
      <div className="absolute w-[35%] aspect-square left-[15%] bottom-[5%] rounded-full" style={{ backgroundColor: color }} />
      <div className="absolute w-[40%] aspect-square left-[30%] bottom-[0%] rounded-full" style={{ backgroundColor: color }} />
      <div className="absolute w-[35%] aspect-square left-[50%] bottom-[5%] rounded-full" style={{ backgroundColor: color }} />
      <div className="absolute w-[30%] aspect-square left-[65%] bottom-[15%] rounded-full" style={{ backgroundColor: color }} />
      
      {/* Top layer of bubbles */}
      <div className="absolute w-[25%] aspect-square left-[15%] top-[20%] rounded-full" style={{ backgroundColor: color }} />
      <div className="absolute w-[32%] aspect-square left-[30%] top-[10%] rounded-full" style={{ backgroundColor: color }} />
      <div className="absolute w-[28%] aspect-square left-[50%] top-[18%] rounded-full" style={{ backgroundColor: color }} />
      
      {/* Small filler bubbles */}
      <div className="absolute w-[15%] aspect-square left-[42%] top-[5%] rounded-full" style={{ backgroundColor: color }} />
      <div className="absolute w-[18%] aspect-square left-[10%] bottom-[35%] rounded-full" style={{ backgroundColor: color }} />
      <div className="absolute w-[18%] aspect-square right-[10%] bottom-[35%] rounded-full" style={{ backgroundColor: color }} />
    </div>
  );
});
