export type ChecklistKey = 'workout_done' | 'steps_done' | 'protein_done' | 'water_done' | 'sleep_done';

export type UserProfile = {
  id: number;
  age: number;
  height_cm: number;
  start_weight: number;
  goal_weight: number;
  created_at: string;
};

export type DailyChecklist = {
  id: number;
  date: string;
  workout_done: number;
  steps_done: number;
  protein_done: number;
  water_done: number;
  sleep_done: number;
};

export type ProgressLog = {
  id: number;
  date: string;
  weight: number;
  waist: number;
  notes: string;
};

export type NutritionLog = {
  id: number;
  date: string;
  calories: number;
  protein: number;
  water: number;
};

export type WorkoutCompleted = {
  id: number;
  date: string;
  workout_day: string;
  exercise_name: string;
  completed: number;
};

export type Streak = {
  id: number;
  current_streak: number;
  best_streak: number;
  updated_at: string;
};

export type Exercise = {
  name: string;
  sets: string;
  note: string;
};

export type WorkoutDay = {
  id: string;
  title: string;
  subtitle: string;
  exercises: Exercise[];
};

export type MealSection = {
  title: string;
  meals: string[];
  estimate: string;
};

export type RoadmapPhase = {
  title: string;
  range: string;
  focus: string;
  goals: string[];
};

export type DashboardData = {
  dayNumber: number;
  currentWeight: number;
  profile: UserProfile | null;
  checklist: DailyChecklist | null;
  streak: Streak | null;
};
