import { TimePhase, ThemeColors } from './types';

export const THEMES: Record<TimePhase, ThemeColors> = {
  aube: {
    bg: 'linear-gradient(to bottom, #F6F1EA, #FFDFC7, #FDE8E8)',
    accent: '#FFD6A3',
    text: '#4A3B31',
    secondary: '#FFB38A',
    clouds: ['#FFFFFF', '#FFDFC7', '#FBF9F6'],
    celestial: '#FFD6A3',
  },
  jour: {
    bg: 'linear-gradient(to bottom, #E3F2FD, #FFFFFF, #E1F5FE)',
    accent: '#03A9F4',
    text: '#01579B',
    secondary: '#0277BD',
    clouds: ['#FFFFFF', '#F9FAFB', '#F3F4F6'],
    celestial: '#FFD700',
  },
  crepuscule: {
    bg: 'linear-gradient(to bottom, #1c1e2e, #2e2a3e, #6b4a5c, #c4624a, #e8845a, #f2b48a)',
    accent: '#FDF4FF',
    text: '#FDF4FF',
    secondary: '#F9A8D4',
    clouds: ['#3d314a', '#8b5a5a', '#c7a392'],
    celestial: '#FDE68A',
  },
  nuit: {
    bg: 'linear-gradient(to bottom, #0F172A, #1E293B, #000000)',
    accent: '#F8FAFF',
    text: '#F8FAFF',
    secondary: '#D4AF37',
    clouds: ['#4B5563', '#374151', '#1F2937'],
    celestial: '#F8FAFF',
  },
};
