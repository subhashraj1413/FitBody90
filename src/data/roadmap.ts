import { RoadmapPhase } from '@/src/types';

export const roadmap: RoadmapPhase[] = [
  {
    title: 'Foundation',
    range: 'Weeks 1-4',
    focus: 'Build the engine',
    goals: ['Build gym habit', 'Walk 8k steps daily', 'Reduce sugar/fried food', 'Learn tracking'],
  },
  {
    title: 'Progressive Load',
    range: 'Weeks 5-8',
    focus: 'Increase output',
    goals: ['Increase weights gradually', 'Add 2-3 cardio sessions', 'Keep protein high', 'Tighten weekend diet'],
  },
  {
    title: 'Peak Push',
    range: 'Weeks 9-12',
    focus: 'Finish the 90',
    goals: ['Push intensity', 'Improve sleep', 'Take progress photos', 'Review weight and waist'],
  },
];

export const targetWeights = [
  { label: 'Start', weight: '82 kg' },
  { label: 'Month 1', weight: '79.5 kg' },
  { label: 'Month 2', weight: '77.5 kg' },
  { label: 'Month 3', weight: '75.5 kg' },
  { label: 'Month 4', weight: '74 kg' },
  { label: 'Month 5', weight: '73 kg' },
  { label: 'Month 6', weight: '72-74 kg' },
];
