import { motion } from 'motion/react';
import { 
  X, Atom, Code, Zap, Wind, Server, PenTool, Layers, 
  Image as ImageIcon, Box, Database, FileJson, 
  FileCode, Paintbrush, Globe, GitBranch, Terminal,
  Cpu, Layout, Smartphone, Cloud, Search, Shield
} from 'lucide-react';
import { TimePhase, ThemeColors } from '../types';

interface SkillsModalProps {
  onClose: () => void;
  theme: ThemeColors;
  phase: TimePhase;
}

const ALL_SKILLS = [
  { name: 'React', icon: Atom },
  { name: 'TypeScript', icon: Code },
  { name: 'Motion', icon: Zap },
  { name: 'Tailwind', icon: Wind },
  { name: 'Node.js', icon: Server },
  { name: 'Figma', icon: PenTool },
  { name: 'After Effects', icon: Layers },
  { name: 'Photoshop', icon: ImageIcon },
  { name: 'Symfony', icon: Box },
  { name: 'PHP', icon: Cpu },
  { name: 'JavaScript', icon: FileJson },
  { name: 'HTML5', icon: FileCode },
  { name: 'CSS3', icon: Paintbrush },
  { name: 'WordPress', icon: Globe },
  { name: 'Git', icon: GitBranch },
  { name: 'SQL', icon: Database },
  { name: 'API REST', icon: Terminal },
  { name: 'Next.js', icon: Layout },
  { name: 'Mobile', icon: Smartphone },
  { name: 'Vercel', icon: Cloud },
  { name: 'SEO', icon: Search },
  { name: 'Security', icon: Shield },
];

export default function SkillsModal({ onClose, theme, phase }: SkillsModalProps) {
  const slideDown = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className={`fixed inset-0 z-[200] overflow-y-auto ${phase === 'jour' || phase === 'aube' ? 'bg-black/10' : 'bg-black/60'} backdrop-blur-md p-4 sm:p-12 cursor-pointer`}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="max-w-4xl mx-auto relative py-12 cursor-default"
      >
        <button
          onClick={onClose}
          className="fixed top-6 right-6 p-3 glass rounded-full hover:scale-110 transition-transform z-[210]"
          style={{ 
            color: theme.text,
            backgroundColor: phase === 'jour' || phase === 'aube' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.3)'
          }}
        >
          <X size={24} />
        </button>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="rounded-[3rem] p-8 sm:p-16 border shadow-2xl backdrop-blur-3xl"
          style={{ 
            backgroundColor: phase === 'jour' || phase === 'aube' ? 'rgba(255,255,255,0.85)' : 'rgba(15,23,42,0.7)',
            borderColor: phase === 'jour' || phase === 'aube' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)',
            color: theme.text 
          }}
        >
          <motion.div variants={slideDown} className="mb-12 text-center">
            <h2 
              className="text-3xl sm:text-4xl font-serif font-black mb-4 tracking-tight"
            >
              Mes <span className="italic" style={{ color: theme.secondary }}>Outils & Notions</span>
            </h2>
            <p className="text-sm opacity-60 font-mono tracking-widest uppercase" style={{ color: theme.text }}>
              L'écosystème technique que j'explore
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8">
            {ALL_SKILLS.map((skill) => (
              <motion.div
                key={skill.name}
                variants={slideDown}
                whileHover={{ y: -5, scale: 1.05 }}
                className="flex flex-col items-center gap-4 group"
              >
                <div 
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center transition-all duration-500 border relative overflow-hidden"
                  style={{ 
                    backgroundColor: phase === 'jour' || phase === 'aube' ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)',
                    borderColor: phase === 'jour' || phase === 'aube' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)'
                  }}
                >
                  <motion.div 
                    initial={false}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10"
                  >
                    <skill.icon 
                      size={28} 
                      className="transition-colors duration-500" 
                      style={{ color: phase === 'jour' ? theme.text : theme.secondary }}
                    />
                  </motion.div>
                  
                  {/* Subtle hover glow */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{ backgroundColor: theme.secondary }}
                  />
                </div>
                <span 
                  className="text-[10px] sm:text-xs uppercase tracking-widest font-bold opacity-60 group-hover:opacity-100 transition-opacity text-center"
                  style={{ color: theme.text }}
                >
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div variants={slideDown} className="mt-16 pt-8 border-t border-white/10 text-center">
            <p className="text-[10px] opacity-40 uppercase tracking-[0.3em]" style={{ color: theme.text }}>
              Toutes ces compétences sont appliquées selon les besoins de vos projets.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
