import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const STORAGE_KEYS = {
  USER_PROFILE: 'fitbody90_user_profile',
  DAILY_CHECKLIST: 'fitbody90_daily_checklist',
  WORKOUT_HISTORY: 'fitbody90_workout_history',
  NUTRITION_DAILY: 'fitbody90_nutrition_daily',
  PROGRESS_HISTORY: 'fitbody90_progress_history',
  START_DATE: 'fitbody90_start_date',
  CURRENT_DAY: 'fitbody90_current_day',
};

// User Profile Type
export interface UserProfile {
  age: number;
  height: string;
  currentWeight: number;
  goalWeight: number;
  gymAccess: boolean;
  diet: string;
  startDate: string;
}

// Daily Checklist Type
export interface DailyChecklist {
  date: string;
  workoutDone: boolean;
  stepsTarget: number;
  stepsCompleted: number;
  proteinTarget: number;
  proteinCompleted: number;
  waterTarget: number;
  waterCompleted: number;
  sleepTarget: number;
  sleepCompleted: number;
}

// Workout History Type
export interface WorkoutRecord {
  date: string;
  day: string;
  exercises: Array<{
    name: string;
    completed: boolean;
  }>;
}

// Progress Type
export interface ProgressRecord {
  date: string;
  weight: number;
  waistMeasurement: number;
  notes: string;
}

// Storage utilities
export const storage = {
  // User Profile
  saveUserProfile: async (profile: UserProfile) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  },

  getUserProfile: async (): Promise<UserProfile | null> => {
    try {
      const profile = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return profile ? JSON.parse(profile) : null;
    } catch (error) {
      console.error('Error retrieving user profile:', error);
      return null;
    }
  },

  // Start Date
  setStartDate: async (date: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.START_DATE, date);
    } catch (error) {
      console.error('Error saving start date:', error);
    }
  },

  getStartDate: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.START_DATE);
    } catch (error) {
      console.error('Error retrieving start date:', error);
      return null;
    }
  },

  // Current Day (out of 90)
  getCurrentDay: async (): Promise<number> => {
    try {
      const startDate = await storage.getStartDate();
      if (!startDate) return 1;

      const start = new Date(startDate);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return Math.min(diffDays, 90);
    } catch (error) {
      console.error('Error calculating current day:', error);
      return 1;
    }
  },

  // Daily Checklist
  saveDailyChecklist: async (checklist: DailyChecklist) => {
    try {
      const key = `${STORAGE_KEYS.DAILY_CHECKLIST}_${checklist.date}`;
      await AsyncStorage.setItem(key, JSON.stringify(checklist));
    } catch (error) {
      console.error('Error saving daily checklist:', error);
    }
  },

  getDailyChecklist: async (date: string): Promise<DailyChecklist | null> => {
    try {
      const key = `${STORAGE_KEYS.DAILY_CHECKLIST}_${date}`;
      const checklist = await AsyncStorage.getItem(key);
      return checklist ? JSON.parse(checklist) : null;
    } catch (error) {
      console.error('Error retrieving daily checklist:', error);
      return null;
    }
  },

  // Workout History
  saveWorkoutRecord: async (record: WorkoutRecord) => {
    try {
      const key = `${STORAGE_KEYS.WORKOUT_HISTORY}_${record.date}`;
      await AsyncStorage.setItem(key, JSON.stringify(record));
    } catch (error) {
      console.error('Error saving workout record:', error);
    }
  },

  getWorkoutRecord: async (date: string): Promise<WorkoutRecord | null> => {
    try {
      const key = `${STORAGE_KEYS.WORKOUT_HISTORY}_${date}`;
      const record = await AsyncStorage.getItem(key);
      return record ? JSON.parse(record) : null;
    } catch (error) {
      console.error('Error retrieving workout record:', error);
      return null;
    }
  },

  // Progress History
  saveProgressRecord: async (record: ProgressRecord) => {
    try {
      const key = `${STORAGE_KEYS.PROGRESS_HISTORY}_${record.date}`;
      await AsyncStorage.setItem(key, JSON.stringify(record));
    } catch (error) {
      console.error('Error saving progress record:', error);
    }
  },

  getAllProgressRecords: async (): Promise<ProgressRecord[]> => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const progressKeys = keys.filter((key) =>
        key.startsWith(STORAGE_KEYS.PROGRESS_HISTORY)
      );

      const records: ProgressRecord[] = [];
      for (const key of progressKeys) {
        const data = await AsyncStorage.getItem(key);
        if (data) {
          records.push(JSON.parse(data));
        }
      }
      return records.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } catch (error) {
      console.error('Error retrieving progress records:', error);
      return [];
    }
  },

  // Nutrition Daily
  saveNutritionDaily: async (date: string, data: any) => {
    try {
      const key = `${STORAGE_KEYS.NUTRITION_DAILY}_${date}`;
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving nutrition data:', error);
    }
  },

  getNutritionDaily: async (date: string): Promise<any | null> => {
    try {
      const key = `${STORAGE_KEYS.NUTRITION_DAILY}_${date}`;
      const data = await AsyncStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error retrieving nutrition data:', error);
      return null;
    }
  },
};
