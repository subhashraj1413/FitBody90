import { MealSection } from '@/src/types';

export const mealPlan: MealSection[] = [
  {
    title: 'Breakfast',
    estimate: '400-500 kcal, 25-35g protein',
    meals: ['4 eggs + toast + fruit', 'Greek yogurt + oats + whey'],
  },
  {
    title: 'Lunch',
    estimate: '600-700 kcal, 40-55g protein',
    meals: ['150-200g chicken/fish + rice or roti', 'Vegetables + salad'],
  },
  {
    title: 'Snack',
    estimate: '150-250 kcal, 15-30g protein',
    meals: ['Whey shake', 'Boiled eggs', 'Fruit'],
  },
  {
    title: 'Dinner',
    estimate: '500-650 kcal, 35-50g protein',
    meals: ['Chicken/fish/paneer', 'Vegetables', 'Light carbs'],
  },
];
