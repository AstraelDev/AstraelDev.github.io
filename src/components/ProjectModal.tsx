import { motion } from 'motion/react';
import { X, Blocks, Play, Award, Zap, Code2, Server, Globe } from 'lucide-react';
import { TimePhase } from '../types';
import ProjectIllustration from './ProjectIllustration';

interface ProjectModalProps {
  projectIndex: number;
  onClose: () => void;
  theme: any;
  phase: TimePhase;
}

export default function ProjectModal({ projectIndex, onClose, theme, phase }: ProjectModalProps) {
  const isLight = phase === 'jour' || phase === 'aube';

  // Define data for the 3 products/projects
  const projectsData = [
    {
      id: 1,
      type: 'pipeline' as const,
      tag: "DevOps & Cloud Orchestration",
      title: "Déploiement d'une pipeline CI/CD pour digitallia.de",
      client: "Digitallia GmbH",
      role: "Développeuse DevOps en stage",
      year: "2026",
      techs: ["GitHub Actions", "Docker", "Ubuntu Linux", "Bash scripting", "SSH keys", "Nginx"],
      url: "https://digitallia.de",
      description: "Conception, structuration et automatisation complète des flux d'intégration et de déploiement continu (CI/CD) pour le portail d'entreprise de Digitallia. Avant ce projet, les publications de fonctionnalités nécessitaient d'intervenir manuellement sur des terminaux distants. Ce flux modernisé assure un service sans coupure et valide chaque mise à jour.",
      sections: [
        {
          title: "1. Qu'est-ce qu'une Pipeline CI/CD ?",
          content: "Une pipeline CI/CD est un ensemble d'étapes automatisées qui permettent aux développeurs de livrer des applications de manière stable et fréquente. CI désigne l'Intégration Continue (Continuous Integration) et CD désigne le Déploiement Continu (Continuous Delivery / Deployment). L'objectif est d'éliminer les processus manuels sujets aux erreurs humaines en les confiant à un exécuteur automatisé autonome.",
          icon: Zap
        },
        {
          title: "2. Les étapes de l'Intégration Continue (CI)",
          content: "À chaque fois qu'un commit ou une pull-request est proposé sur GitHub ou GitLab, la pipeline s'éveille. Elle va exécuter les tâches suivantes : d'abord, le linter et le compilateur analysent la syntaxe du code pour s'assurer qu'aucune erreur de compilation n'est commise. Ensuite, les tests unitaires et d'intégration sont exécutés de manière isolée pour vérifier la logique fonctionnelle du projet. Si une seule étape échoue, la pipeline s'arrête immédiatement et notifie l'équipe de développement.",
          icon: Code2
        },
        {
          title: "3. Les étapes du Déploiement Continu (CD)",
          content: "Une fois que le code a passé l'ensemble des tests avec succès, l'étape CD intervient. Elle construit l'artefact de production (comme un conteneur Docker ou des fichiers minifiés), se connecte de manière sécurisée au serveur distant via SSH ou des services de déploiement Cloud, puis met à jour l'application en cours d'exécution. Grâce à des stratégies de déploiement progressif, le nouveau code est injecté sans interruption de service pour les internautes.",
          icon: Server
        },
        {
          title: "4. L'implémentation pour Digitallia.de",
          content: "Pour digitallia.de, nous avons déployé des flux de travail GitHub Actions configurés de manière optimale. À chaque mise à jour validée sur la branche principale, le flux SSH automatise l'arrêt du conteneur précédent, compile les dépendances de production, vérifie l'intégrité de la base de données, puis relance le service répliqué, assurant un temps de indisponibilité nul (zero downtime).",
          icon: Globe
        }
      ]
    },
    {
      id: 2,
      type: 'ethereal' as const,
      tag: "Design & Poésie Interactive",
      title: "Concept Éthéré",
      client: "Expérimentation personnelle",
      role: "Créatrice UI/UX & Développeuse Front-End",
      year: "2025",
      techs: ["React", "Framer Motion", "Tailwind CSS", "Vite", "Canvas API", "Mathematical Orbits"],
      url: null,
      description: "Une exploration poétique cherchant à brouiller les frontières entre art d'ambiance et interfaces web réactives. Grâce à des modélisations mathématiques de rotations orbitales, l'interface change de comportement en s'appuyant sur l'attention de l'utilisateur.",
      sections: [
        {
          title: "Art d'ambiance dynamique",
          content: "Le projet repose sur des générateurs d'ondes et des courbes sinusoïdales interactives. L'utilisateur ne consulte pas simplement une page statique ; il interagit avec un écosystème réactif où chaque clic propage des ondulations visuelles imitant la propagation du son ou de l'eau sur une surface calme.",
          icon: Blocks
        },
        {
          title: "Aisance de mouvement & Micro-animations",
          content: "Utilisation poussée de Framer Motion pour interpoler les positions trigonométriques des points d'ancrage. Le rendu final est optimisé pour les processeurs de terminaux mobiles grâce à des calculs matriciels CSS et l'accélération matérielle 3D.",
          icon: Play
        }
      ]
    },
    {
      id: 3,
      type: 'cosmique' as const,
      tag: "React & Cycles Naturels",
      title: "Horloge Cosmique",
      client: "BUT MMI Projet Académique",
      role: "Architecte Logiciel & Conceptrice",
      year: "2025",
      techs: ["TypeScript", "SVG Animation", "Web Storage API", "Circadian Logic", "CSS Variables"],
      url: null,
      description: "Un module de gestion temporelle circadienne qui observe l'oscillation des étoiles, de la lune et du soleil pour recréer une atmosphère apaisante et resynchroniser l'attention de l'internaute d'heure en heure.",
      sections: [
        {
          title: "Logique Circadienne du Temps",
          content: "Plutôt que d'afficher les heures de manière rigide, l'implémentation déduit le lever et le coucher de l'astre en fonction des coordonnées géographiques locales pour lisser et ajuster l'émission de teintes bleues ou chaudes sur l'écran.",
          icon: Award
        },
        {
          title: "Mécanique d'Astrolabe Vectorielle",
          content: "Un astrolabe entièrement dessiné en SVG vectoriel dont les engrenages et aiguilles lunaires tournent à des rythmes calculés selon le temps sidéral exact, pour une cohérence astronomique irréprochable.",
          icon: Zap
        }
      ]
    }
  ];

  const project = projectsData[projectIndex] || projectsData[0];

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
        staggerChildren: 0.1,
        delayChildren: 0.3
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
        className="max-w-5xl mx-auto relative py-12 cursor-default"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="fixed top-6 right-6 p-3 rounded-full hover:scale-110 transition-transform z-[210] opacity-0 animate-in fade-in duration-500 delay-500 fill-mode-forwards shadow-xl"
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
          className="rounded-[3rem] p-6 sm:p-12 border shadow-2xl backdrop-blur-3xl overflow-hidden"
          style={{ 
            backgroundColor: isLight ? 'rgba(255,255,255,0.85)' : 'rgba(15,23,42,0.7)',
            borderColor: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)',
            color: theme.text 
          }}
        >
          {/* Header Metadata */}
          <motion.div variants={slideDown} className="mb-8 pb-6 border-b" style={{ borderColor: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)' }}>
            <span className="text-[10px] uppercase tracking-[0.3em] font-mono font-bold" style={{ color: theme.secondary }}>{project.tag}</span>
            <h1 className="text-3xl sm:text-5xl font-serif font-black mt-2 mb-4 leading-tight">{project.title}</h1>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-xs font-mono opacity-80">
              <div>
                <span className="block opacity-40 uppercase text-[9px] mb-1">Client/Usage</span>
                <span className="font-semibold">{project.client}</span>
              </div>
              <div>
                <span className="block opacity-40 uppercase text-[9px] mb-1">Rôle</span>
                <span className="font-semibold">{project.role}</span>
              </div>
              <div>
                <span className="block opacity-40 uppercase text-[9px] mb-1">Année</span>
                <span className="font-semibold">{project.year}</span>
              </div>
              <div>
                <span className="block opacity-40 uppercase text-[9px] mb-1">Lien direct</span>
                {project.url ? (
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="font-bold underline flex items-center gap-1 hover:opacity-80">
                    Visiter <X size={10} className="rotate-45" />
                  </a>
                ) : (
                  <span className="italic opacity-50">Aucun</span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Grid Layout: Visual on Left, content on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Visual Column */}
            <motion.div variants={slideDown} className="lg:col-span-4 aspect-[4/3] lg:aspect-[3/4] rounded-2xl border bg-black/5 flex items-center justify-center p-4 relative" style={{ borderColor: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)' }}>
              <ProjectIllustration type={project.type} theme={theme} phase={phase} />
            </motion.div>

            {/* Content Column */}
            <div className="lg:col-span-8 space-y-8">
              <motion.div variants={slideDown} className="prose prose-invert max-w-none text-sm leading-relaxed opacity-90">
                <p className="text-base font-serif italic mb-6">{project.description}</p>
                
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.techs.map(tech => (
                    <span 
                      key={tech} 
                      className="px-3 py-1 rounded-full text-[10px] font-mono border"
                      style={{ 
                        backgroundColor: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)',
                        borderColor: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Sections details explaining CI/CD pipeline or concept */}
              <div className="space-y-6">
                {project.sections.map((sect, sIdx) => {
                  const IconComp = sect.icon;
                  return (
                    <motion.div 
                      key={sIdx} 
                      variants={slideDown}
                      className="p-6 rounded-2xl border flex gap-4 items-start"
                      style={{ 
                        backgroundColor: isLight ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
                        borderColor: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)' 
                      }}
                    >
                      <div className="p-3 rounded-xl flex-shrink-0" style={{ backgroundColor: isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.05)', color: theme.secondary }}>
                        <IconComp size={18} />
                      </div>
                      <div>
                        <h4 className="font-serif text-lg font-bold mb-2">{sect.title}</h4>
                        <p className="text-xs leading-relaxed opacity-70">{sect.content}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
