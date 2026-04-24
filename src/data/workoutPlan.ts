import { WorkoutDay } from '@/src/types';

export const workoutPlan: WorkoutDay[] = [
  {
    id: 'push',
    title: 'Day 1 Push',
    subtitle: 'Chest, shoulders, triceps',
    exercises: [
      { name: 'Bench Press', sets: '4x8', note: 'Controlled reps, drive through the floor.' },
      { name: 'Incline Dumbbell Press', sets: '3x10', note: 'Keep shoulders packed.' },
      { name: 'Shoulder Press', sets: '3x10', note: 'Stop one rep before form breaks.' },
      { name: 'Tricep Pushdown', sets: '3x12', note: 'Full lockout, slow return.' },
      { name: 'Pushups', sets: '3 sets', note: 'Finish each set clean.' },
    ],
  },
  {
    id: 'pull',
    title: 'Day 2 Pull',
    subtitle: 'Back, rear delts, biceps',
    exercises: [
      { name: 'Lat Pulldown', sets: '4x10', note: 'Lead with elbows.' },
      { name: 'Seated Row', sets: '3x10', note: 'Pause at contraction.' },
      { name: 'Dumbbell Row', sets: '3x10', note: 'Brace hard, avoid twisting.' },
      { name: 'Face Pull', sets: '3x15', note: 'Light, strict, high elbows.' },
      { name: 'Biceps Curl', sets: '3x12', note: 'No swinging.' },
    ],
  },
  {
    id: 'legs-core',
    title: 'Day 3 Legs + Core',
    subtitle: 'Lower body strength',
    exercises: [
      { name: 'Leg Press or Squat', sets: '4x10', note: 'Depth with control.' },
      { name: 'Romanian Deadlift', sets: '3x10', note: 'Hinge, stretch, neutral spine.' },
      { name: 'Walking Lunges', sets: '3x12', note: 'Long steps, steady torso.' },
      { name: 'Plank', sets: '3x45 sec', note: 'Ribs down, glutes tight.' },
      { name: 'Leg Raises', sets: '3x12', note: 'Slow lower.' },
    ],
  },
  {
    id: 'full-body',
    title: 'Day 4 Full Body',
    subtitle: 'Strength plus conditioning',
    exercises: [
      { name: 'Deadlift moderate', sets: '3x5', note: 'Sharp reps, no grinders.' },
      { name: 'Dumbbell Press', sets: '3x10', note: 'Smooth tempo.' },
      { name: 'Cable Row', sets: '3x10', note: 'Strong squeeze.' },
      { name: 'Farmer Carry', sets: '3 rounds', note: 'Tall posture.' },
      { name: 'Incline Treadmill', sets: '20 min', note: 'Zone 2 pace.' },
    ],
  },
];
