/**
 * Date and calculation utilities
 */

export const dateUtils = {
  // Get today's date in YYYY-MM-DD format
  getTodayDate: (): string => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  },

  // Get formatted date string
  formatDate: (date: string): string => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  },

  // Get day of week
  getDayOfWeek: (date: string): string => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date(date).getDay()];
  },

  // Get current day out of 90
  getDayOut90: (startDate: string): number => {
    const start = new Date(startDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return Math.min(diffDays, 90);
  },

  // Get week number out of 12
  getWeekNumber: (startDate: string): number => {
    const day = dateUtils.getDayOut90(startDate);
    return Math.ceil(day / 7);
  },
};

export const fitnessUtils = {
  // Calculate BMI
  calculateBMI: (weight: number, heightCm: number): number => {
    return Math.round((weight / (heightCm * heightCm)) * 10000 * 10) / 10;
  },

  // Get workout day (1-4) based on day number
  getWorkoutDay: (dayNumber: number): number => {
    // 4-day split: push, pull, legs+core, full body
    const cycleDay = ((dayNumber - 1) % 4) + 1;
    return cycleDay;
  },

  // Get workout split name
  getWorkoutSplitName: (dayNumber: number): string => {
    const day = fitnessUtils.getWorkoutDay(dayNumber);
    const names = ['Push Day', 'Pull Day', 'Legs + Core', 'Full Body'];
    return names[day - 1];
  },

  // Get motivational message based on progress
  getMotivationalMessage: (dayNumber: number, weightLost: number): string => {
    const messages = {
      start: [
        '🔥 Day 1: Let\'s build this habit!',
        '💪 Time to start the transformation!',
        '🎯 Ready to crush your 90-day goal?',
      ],
      week2: [
        '⚡ You\'ve got momentum! Keep going!',
        '💯 Great start to your journey!',
        '🚀 This is how champions start!',
      ],
      week4: [
        '🏆 One month down! Feeling the difference?',
        '⭐ Your dedication is showing!',
        '💪 The hard work is paying off!',
      ],
      week8: [
        '🔥 Two months in! You\'re unstoppable!',
        '💎 Your body is transforming!',
        '⚡ This is just the beginning!',
      ],
      final: [
        '👑 You\'re almost there! Final push!',
        '🏅 90 days of pure dedication!',
        '🎊 Celebrate your transformation!',
      ],
    };

    let category = 'start';
    if (dayNumber > 56) category = 'final';
    else if (dayNumber > 28) category = 'week8';
    else if (dayNumber > 14) category = 'week4';
    else if (dayNumber > 7) category = 'week2';

    const categoryMessages = messages[category as keyof typeof messages];
    return categoryMessages[Math.floor(Math.random() * categoryMessages.length)];
  },
};

export const progressUtils = {
  // Weight loss targets
  targets: [
    { week: 1, weight: 82.0, description: 'Start' },
    { week: 4, weight: 79.5, description: 'Month 1' },
    { week: 8, weight: 77.5, description: 'Month 2' },
    { week: 12, weight: 75.5, description: 'Month 3' },
    { week: 16, weight: 74.0, description: 'Month 4' },
    { week: 20, weight: 73.0, description: 'Month 5' },
    { week: 25, weight: 72.0, description: 'Goal' },
  ],

  // Get target weight for given week
  getTargetWeight: (week: number): number => {
    let targetWeight = 82.0;
    for (const target of progressUtils.targets) {
      if (week >= target.week) {
        targetWeight = target.weight;
      }
    }
    return targetWeight;
  },

  // Calculate progress percentage
  calculateProgressPercentage: (startWeight: number, currentWeight: number, goalWeight: number): number => {
    const totalLoss = startWeight - goalWeight;
    const currentLoss = startWeight - currentWeight;
    return Math.round((currentLoss / totalLoss) * 100);
  },
};
