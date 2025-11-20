// constants/futureSkills.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';

export interface User {
  name: string;
  currentRole: string;
  targetRole: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface SkillLevels {
  [id: string]: number;
}

export interface Module {
  id: string;
  title: string;
  xp: number;
  type: string;
}

export interface LearningPath {
  id: string;
  title: string;
  targetRole: string;
  futureDemandLabel: string;
  recommendedFor: string[];
  modules: Module[];
}

export interface ProgressMap {
  [pathId: string]: {
    [moduleId: string]: boolean;
  };
}

export const STORAGE_KEYS = {
  USER: '@futureskills:user',
  SKILLS: '@futureskills:skills',
  PROGRESS: '@futureskills:progress',
  GAMIFICATION: '@futureskills:gamification',
};

export const SKILLS: Skill[] = [
  { id: 'logica', name: 'Lógica de Programação' },
  { id: 'frontend', name: 'Front-end (React / React Native)' },
  { id: 'backend', name: 'Back-end / APIs' },
  { id: 'dados', name: 'Dados e Analytics' },
  { id: 'ia', name: 'IA e Automação' },
  { id: 'softskills', name: 'Soft Skills (comunicação, colaboração)' },
];

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'lp_frontend',
    title: 'Transição para Desenvolvedor Front-end',
    targetRole: 'Desenvolvedor Front-end',
    futureDemandLabel: 'Alta demanda para trabalho remoto e produtos digitais.',
    recommendedFor: ['frontend', 'logica', 'softskills'],
    modules: [
      { id: 'mod1', title: 'Fundamentos de HTML, CSS e JavaScript', xp: 40, type: 'micro-curso' },
      { id: 'mod2', title: 'Criar uma landing page responsiva', xp: 60, type: 'projeto prático' },
      {
        id: 'mod3',
        title: 'Contribuir com uma pequena melhoria em um app do time',
        xp: 80,
        type: 'tarefa de transição',
      },
    ],
  },
  {
    id: 'lp_dados',
    title: 'Transição para Analytics / Dados',
    targetRole: 'Analista de Dados',
    futureDemandLabel: 'Tomada de decisão orientada a dados em todas as áreas.',
    recommendedFor: ['dados', 'ia', 'logica'],
    modules: [
      { id: 'mod1', title: 'Fundamentos de SQL e planilhas', xp: 40, type: 'micro-curso' },
      {
        id: 'mod2',
        title: 'Dashboard simples com dados reais da empresa',
        xp: 70,
        type: 'projeto prático',
      },
      {
        id: 'mod3',
        title: 'Apresentar insights em uma reunião da equipe',
        xp: 90,
        type: 'tarefa de transição',
      },
    ],
  },
  {
    id: 'lp_ia',
    title: 'Upskilling em IA aplicada ao trabalho',
    targetRole: 'Profissional com IA no dia a dia',
    futureDemandLabel:
      'IA como copiloto para quase todas as profissões, de operação a gestão.',
    recommendedFor: ['ia', 'frontend', 'backend', 'softskills'],
    modules: [
      {
        id: 'mod1',
        title: 'Conceitos de IA generativa e automação',
        xp: 40,
        type: 'micro-curso',
      },
      {
        id: 'mod2',
        title: 'Criar um fluxo de automação com IA (ex: resumo de reuniões)',
        xp: 80,
        type: 'projeto prático',
      },
      {
        id: 'mod3',
        title: 'Mentoria reversa: ensinar o time a usar IA com responsabilidade',
        xp: 100,
        type: 'tarefa de transição',
      },
    ],
  },
];

export async function loadFromStorage<T>(key: string, defaultValue: T): Promise<T> {
  try {
    const json = await AsyncStorage.getItem(key);
    return json != null ? (JSON.parse(json) as T) : defaultValue;
  } catch (e) {
    console.log('Erro ao carregar', key, e);
    return defaultValue;
  }
}

export async function saveToStorage(key: string, value: unknown): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log('Erro ao salvar', key, e);
  }
}

export function getRecommendedPaths(skillLevels: SkillLevels | null | undefined): LearningPath[] {
  if (!skillLevels) return LEARNING_PATHS;

  return [...LEARNING_PATHS].sort((a, b) => {
    const scoreA = a.recommendedFor.reduce((acc, id) => acc + (5 - (skillLevels[id] || 0)), 0);
    const scoreB = b.recommendedFor.reduce((acc, id) => acc + (5 - (skillLevels[id] || 0)), 0);
    return scoreB - scoreA;
  });
}

export function getLevelFromXp(xp: number): number {
  if (xp >= 250) return 4;
  if (xp >= 150) return 3;
  if (xp >= 80) return 2;
  if (xp > 0) return 1;
  return 0;
}

export function getBadgesFromXp(xp: number): string[] {
  const badges: string[] = [];
  if (xp >= 1) badges.push('Primeiro passo no upskilling');
  if (xp >= 80) badges.push('Trilha em progresso consistente');
  if (xp >= 150) badges.push('Agente do Futuro do Trabalho');
  if (xp >= 250) badges.push('Embaixador de Transformação Digital');
  return badges;
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050816',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  centered: {
    flex: 1,
    backgroundColor: '#050816',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashText: {
    color: '#fff',
    marginTop: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#c5c5c5',
    marginBottom: 12,
  },
  section: {
    marginTop: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  label: {
    color: '#c5c5c5',
    marginTop: 8,
    marginBottom: 4,
    fontSize: 13,
  },
  input: {
    backgroundColor: '#111827',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  helperText: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
    marginBottom: 4,
  },
  primaryButton: {
    marginTop: 16,
    backgroundColor: '#4f46e5',
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  secondaryButton: {
    marginTop: 8,
    backgroundColor: '#111827',
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  secondaryButtonText: {
    color: '#e5e7eb',
    fontWeight: '500',
    fontSize: 13,
  },
  smallLabel: {
    color: '#9ca3af',
    fontSize: 12,
  },
  userName: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  },
  gamificationText: {
    color: '#e5e7eb',
    fontSize: 14,
  },
  badgeBox: {
    marginTop: 8,
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  badgeTitle: {
    color: '#e5e7eb',
    fontWeight: '600',
    marginBottom: 4,
  },
  badgeText: {
    color: '#d1d5db',
    fontSize: 12,
  },
  card: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  cardDone: {
    borderColor: '#22c55e',
    backgroundColor: '#052e16',
  },
  cardTitle: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: 4,
  },
  cardSubtitle: {
    color: '#9ca3af',
    fontSize: 12,
    marginBottom: 4,
  },
  cardBody: {
    color: '#d1d5db',
    fontSize: 12,
  },
  cardProgress: {
    marginTop: 4,
    color: '#a5b4fc',
    fontSize: 12,
  },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0b1120',
    borderRadius: 10,
    padding: 10,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  skillName: {
    color: '#f9fafb',
    fontWeight: '500',
  },
  skillHint: {
    color: '#9ca3af',
    fontSize: 11,
  },
  skillInput: {
    width: 40,
    height: 40,
    marginLeft: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4b5563',
    color: '#fff',
    textAlign: 'center',
  },
});
