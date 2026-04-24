import { motion } from 'motion/react';
import { X, Github, Mail, Phone, MapPin, ExternalLink, Calendar, GraduationCap, Briefcase, Code } from 'lucide-react';
import { TimePhase } from '../types';

interface CVProps {
  onClose: () => void;
  theme: any;
  phase: TimePhase;
}

export default function CV({ onClose, theme, phase }: CVProps) {
  const isLight = phase === 'jour' || phase === 'aube';
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
        staggerChildren: 0.15,
        delayChildren: 0.4
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className={`fixed inset-0 z-[200] overflow-y-auto ${isLight ? 'bg-black/10' : 'bg-black/60'} backdrop-blur-md p-4 sm:p-12 cursor-pointer`}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="max-w-4xl mx-auto relative py-12 cursor-default"
      >
        <button
          onClick={onClose}
          className="fixed top-6 right-6 p-3 rounded-full hover:scale-110 transition-transform z-[210] opacity-0 animate-in fade-in duration-500 delay-700 fill-mode-forwards shadow-xl"
          style={{ 
            color: theme.text,
            backgroundColor: isLight ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.4)',
            border: `1px solid ${isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)'}`
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
            backgroundColor: isLight ? 'rgba(255,255,255,0.85)' : 'rgba(15,23,42,0.7)',
            borderColor: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)',
            color: theme.text 
          }}
        >
          {/* HEADER */}
          <motion.header 
            variants={slideDown}
            className="flex flex-col md:flex-row gap-8 items-center md:items-end justify-between mb-16 border-b pb-12"
            style={{ borderColor: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)' }}
          >
            <div>
              <h1 className="text-5xl sm:text-6xl font-serif font-black mb-4 tracking-tight text-center md:text-left">
                Soléane <br /> <span className="italic" style={{ color: theme.secondary }}>Mortreux</span>
              </h1>
              <p className="text-xl opacity-60 font-serif text-center md:text-left">Étudiante en BUT MMI • Développeuse Web</p>
            </div>
            
            <div className="flex flex-col gap-3 text-sm font-mono opacity-80 items-center md:items-end">
              <span className="flex items-center gap-2"><MapPin size={14} /> Haguenau, 67500</span>
              <span className="flex items-center gap-2"><Phone size={14} /> 06 19 66 77 08</span>
              <span className="flex items-center gap-2"><Mail size={14} /> mortreuxsoleane@gmail.com</span>
              <a href="https://github.com/AstraelDev" className="flex items-center gap-2 hover:opacity-100" style={{ color: theme.secondary }}><Github size={14} /> GitHub: AstraelDev</a>
            </div>
          </motion.header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-8 space-y-16">
              {/* PROFIL */}
              <motion.section variants={slideDown}>
                <h2 className="text-xs uppercase tracking-[0.3em] font-bold mb-6 opacity-40 flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-current" /> Profil
                </h2>
                <p className="text-lg leading-relaxed opacity-80 text-justify">
                  Étudiante de 19 ans en deuxième année de BUT Métiers du Multimédia et de l’Internet. 
                  Je recherche un <span className="font-bold text-secondary">contrat d’alternance pour l’année scolaire 2026-2027</span> afin de développer 
                  et approfondir mes compétences au sein d’une entreprise sur le long terme. 
                  Curieuse et motivée, je m’investis pleinement dans les projets qui me permettent d’apprendre et de progresser.
                </p>
              </motion.section>

              {/* EXPERIENCES */}
              <motion.section variants={slideDown} className="space-y-8">
                <h2 className="text-xs uppercase tracking-[0.3em] font-bold mb-6 opacity-40 flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-current" /> Expériences
                </h2>

                <div className="space-y-12">
                  <ExperienceItem 
                    title="Digitallia - Stage Développeuse Web"
                    date="13 avril - 26 juin 2026"
                    description="Découverte du fonctionnement d’une agence, mise en pratique des compétences techniques dans un contexte professionnel."
                    variants={slideDown}
                    isLight={isLight}
                  />
                  <ExperienceItem 
                    title="Promocash Barr - Agent polyvalent"
                    date="28 juillet - 22 août 2025"
                    description="Grossiste alimentaire. Développement de l'autonomie, organisation et travail en équipe."
                    variants={slideDown}
                    isLight={isLight}
                  />
                   <ExperienceItem 
                    title="ALEF - Aide-animateur"
                    date="23 - 26 juillet 2024"
                    description="ALSH de Oberschaeffolsheim. Écoute active et gestion d'animation pour enfants et adultes."
                    variants={slideDown}
                    isLight={isLight}
                  />
                   <ExperienceItem 
                    title="Mairie d’Achenheim - Agent saisonnier"
                    date="Août 2023"
                    description="Entretien de la commune, travail d'équipe et maintenance des espaces publics."
                    variants={slideDown}
                    isLight={isLight}
                  />
                </div>
              </motion.section>

              {/* ETUDES */}
              <motion.section variants={slideDown} className="space-y-8">
                <h2 className="text-xs uppercase tracking-[0.3em] font-bold mb-6 opacity-40 flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-current" /> Études
                </h2>
                
                <div className="space-y-8">
                  <EducationItem 
                    title="BUT MMI, 2ème année"
                    subtitle="IUT de Haguenau • Parcours Développement Web"
                    date="2025 - 2026"
                    variants={slideDown}
                    isLight={isLight}
                  />
                  <EducationItem 
                    title="Baccalauréat Général"
                    subtitle="Lycée Marcel Rudloff • Spécialités Physique-Chimie et NSI"
                    date="2024"
                    notion="Mention Assez Bien"
                    variants={slideDown}
                    isLight={isLight}
                  />
                </div>
              </motion.section>
            </div>

            {/* RIGHT COLUMN */}
            <div className="lg:col-span-4 space-y-16">
              {/* HARD SKILLS */}
              <motion.section variants={slideDown}>
                <h2 className="text-xs uppercase tracking-[0.3em] font-bold mb-6 opacity-40">Compétences</h2>
                <div className="flex flex-wrap gap-2">
                  {['HTML', 'CSS', 'Twig', 'PHP', 'SQL', 'JavaScript', 'React', 'Bootstrap', 'Symfony', 'WordPress'].map(s => (
                    <span 
                      key={s} 
                      className="px-3 py-1 rounded-lg text-[10px] font-mono border"
                      style={{ 
                        backgroundColor: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)',
                        borderColor: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)'
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.section>

              {/* SOFT SKILLS */}
              <motion.section variants={slideDown}>
                <h2 className="text-xs uppercase tracking-[0.3em] font-bold mb-6 opacity-40">Soft Skills</h2>
                <ul className="text-xs space-y-3 opacity-60 leading-relaxed list-disc list-inside">
                  <li>Engagée et persévérante</li>
                  <li>Travail en équipe</li>
                  <li>Ouverture aux critiques</li>
                  <li>Apprentissage continu</li>
                </ul>
              </motion.section>

              {/* LANGUES */}
              <motion.section variants={slideDown}>
                <h2 className="text-xs uppercase tracking-[0.3em] font-bold mb-6 opacity-40">Langues</h2>
                <div className="flex items-center justify-between text-sm">
                  <span className="opacity-80">Français</span>
                  <span className="text-secondary font-mono">Natif</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="opacity-80">Anglais</span>
                  <span className="text-secondary font-mono">B2</span>
                </div>
              </motion.section>

              {/* CALL TO ACTION */}
              <motion.div variants={slideDown} className="pt-8 block">
                 <a 
                  href="mailto:mortreuxsoleane@gmail.com"
                  className="w-full py-4 glass border border-white/20 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/10 transition-colors uppercase text-[10px] font-bold tracking-widest"
                 >
                   Me contacter <ExternalLink size={14} />
                 </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ExperienceItem({ title, date, description, variants, isLight }: { title: string, date: string, description: string, variants: any, isLight?: boolean }) {
  return (
    <motion.div variants={variants} className="group">
      <div className="flex items-center gap-4 mb-2">
        <div 
          className="p-2 rounded-xl"
          style={{ 
            backgroundColor: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)',
            color: 'inherit'
          }}
        >
          <Briefcase size={16} />
        </div>
        <div>
          <h3 className="text-lg font-serif">{title}</h3>
          <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest">{date}</p>
        </div>
      </div>
      <p className="pl-12 opacity-60 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

function EducationItem({ title, subtitle, date, notion, variants, isLight }: { title: string, subtitle: string, date: string, notion?: string, variants: any, isLight?: boolean }) {
  return (
    <motion.div variants={variants} className="group">
      <div className="flex items-center gap-4 mb-2">
        <div 
          className="p-2 rounded-xl"
          style={{ 
            backgroundColor: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)',
            color: 'inherit'
          }}
        >
          <GraduationCap size={16} />
        </div>
        <div>
          <h3 className="text-lg font-serif">{title}</h3>
          <p className="text-sm opacity-60">{subtitle}</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest">{date}</span>
            {notion && <span className="text-[9px] bg-secondary/10 text-secondary px-2 rounded-full uppercase font-bold tracking-tighter">{notion}</span>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
