import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { colors } from '@/constants/colors';
import { storage, DailyChecklist } from '@/utils/storage';
import { dateUtils } from '@/utils/calculations';
import { Card, ProgressBar, SectionHeader } from '@/components/UI';

const MEALS = {
  breakfast: [
    '4 eggs + toast + fruit',
    'Greek yogurt + oats + whey',
    'Omlette + whole wheat bread',
  ],
  lunch: [
    '150-200g chicken + rice + vegetables + salad',
    '150-200g fish + roti + vegetables',
    '150-200g paneer + brown rice + salad',
  ],
  snack: [
    'Whey protein shake',
    'Boiled eggs (2-3)',
    'Fresh fruit (apple, banana)',
    'Greek yogurt cup',
  ],
  dinner: [
    'Grilled chicken + vegetables + light carbs',
    'Fish fillet + roasted vegetables',
    'Paneer curry + roti + salad',
  ],
};

export const Nutrition: React.FC = () => {
  const [checklist, setChecklist] = useState<DailyChecklist | null>(null);
  const [nutritionData, setNutritionData] = useState<any>(null);
  const [caloriesInput, setCaloriesInput] = useState('');
  const [proteinInput, setProteinInput] = useState('');
  const [waterInput, setWaterInput] = useState('');
  const today = dateUtils.getTodayDate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const dailyChecklist = await storage.getDailyChecklist(today);
    if (dailyChecklist) {
      setChecklist(dailyChecklist);
    }

    const nutrition = await storage.getNutritionDaily(today);
    if (nutrition) {
      setNutritionData(nutrition);
      setCaloriesInput(nutrition.calories?.toString() || '');
      setProteinInput(nutrition.protein?.toString() || '');
      setWaterInput(nutrition.water?.toString() || '');
    }
  };

  const saveNutritionData = async () => {
    const data = {
      date: today,
      calories: parseInt(caloriesInput) || 0,
      protein: parseInt(proteinInput) || 0,
      water: parseFloat(waterInput) || 0,
    };

    await storage.saveNutritionDaily(today, data);
    setNutritionData(data);

    // Update checklist
    if (checklist) {
      const updated = {
        ...checklist,
        proteinCompleted: parseInt(proteinInput) || 0,
        waterCompleted: parseFloat(waterInput) || 0,
      };
      setChecklist(updated);
      await storage.saveDailyChecklist(updated);
    }
  };

  const caloriesTarget = 2000;
  const proteinTarget = 150;
  const waterTarget = 3;

  const caloriesProgress = nutritionData
    ? (nutritionData.calories / caloriesTarget) * 100
    : 0;
  const proteinProgress = nutritionData
    ? (nutritionData.protein / proteinTarget) * 100
    : 0;
  const waterProgress = nutritionData ? (nutritionData.water / waterTarget) * 100 : 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Nutrition</Text>
          <Text style={styles.subtitle}>Track your daily intake</Text>
        </View>

        {/* Targets Card */}
        <Card style={styles.targetsCard}>
          <Text style={styles.targetTitle}>Daily Targets</Text>
          <View style={styles.targetRow}>
            <View style={styles.targetItem}>
              <Text style={styles.targetLabel}>Calories</Text>
              <Text style={styles.targetValue}>{caloriesTarget}</Text>
            </View>
            <View style={styles.targetItem}>
              <Text style={styles.targetLabel}>Protein</Text>
              <Text style={styles.targetValue}>{proteinTarget}g</Text>
            </View>
            <View style={styles.targetItem}>
              <Text style={styles.targetLabel}>Water</Text>
              <Text style={styles.targetValue}>{waterTarget}L</Text>
            </View>
          </View>
        </Card>

        {/* Input Card */}
        <SectionHeader title="Log Today's Intake" />
        <Card style={styles.inputCard}>
          <View style={styles.inputRow}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Calories</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                placeholderTextColor={colors.textTertiary}
                keyboardType="numeric"
                value={caloriesInput}
                onChangeText={setCaloriesInput}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Protein (g)</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                placeholderTextColor={colors.textTertiary}
                keyboardType="numeric"
                value={proteinInput}
                onChangeText={setProteinInput}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Water (L)</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                placeholderTextColor={colors.textTertiary}
                keyboardType="decimal-pad"
                value={waterInput}
                onChangeText={setWaterInput}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={saveNutritionData}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </Card>

        {/* Progress Tracking */}
        {nutritionData && (
          <>
            <SectionHeader title="Today's Progress" />
            <Card style={styles.progressCard}>
              <View style={styles.progressItem}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressLabel}>Calories</Text>
                  <Text style={styles.progressValue}>
                    {nutritionData.calories}/{caloriesTarget}
                  </Text>
                </View>
                <ProgressBar progress={caloriesProgress} showPercentage />
              </View>

              <View style={styles.progressItem}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressLabel}>Protein</Text>
                  <Text style={styles.progressValue}>
                    {nutritionData.protein}/{proteinTarget}g
                  </Text>
                </View>
                <ProgressBar progress={proteinProgress} showPercentage />
              </View>

              <View style={styles.progressItem}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressLabel}>Water</Text>
                  <Text style={styles.progressValue}>
                    {nutritionData.water}/{waterTarget}L
                  </Text>
                </View>
                <ProgressBar progress={waterProgress} showPercentage />
              </View>
            </Card>
          </>
        )}

        {/* Meal Suggestions */}
        <SectionHeader title="Meal Suggestions" subtitle="High protein, balanced meals" />

        <Text style={styles.mealCategory}>🌅 Breakfast</Text>
        {MEALS.breakfast.map((meal, idx) => (
          <Card key={idx} style={styles.mealCard}>
            <Text style={styles.mealText}>{meal}</Text>
            <Text style={styles.mealCalories}>~400-500 kcal, 25-30g protein</Text>
          </Card>
        ))}

        <Text style={styles.mealCategory}>🍽️ Lunch</Text>
        {MEALS.lunch.map((meal, idx) => (
          <Card key={idx} style={styles.mealCard}>
            <Text style={styles.mealText}>{meal}</Text>
            <Text style={styles.mealCalories}>~600-700 kcal, 40-50g protein</Text>
          </Card>
        ))}

        <Text style={styles.mealCategory}>🍎 Snack</Text>
        {MEALS.snack.map((meal, idx) => (
          <Card key={idx} style={styles.mealCard}>
            <Text style={styles.mealText}>{meal}</Text>
            <Text style={styles.mealCalories}>~150-200 kcal, 15-20g protein</Text>
          </Card>
        ))}

        <Text style={styles.mealCategory}>🌙 Dinner</Text>
        {MEALS.dinner.map((meal, idx) => (
          <Card key={idx} style={styles.mealCard}>
            <Text style={styles.mealText}>{meal}</Text>
            <Text style={styles.mealCalories}>~500-600 kcal, 35-45g protein</Text>
          </Card>
        ))}

        {/* Nutrition Tips */}
        <Card style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Nutrition Tips</Text>
          <Text style={styles.tipItem}>✓ Eat protein with every meal</Text>
          <Text style={styles.tipItem}>✓ Drink water throughout the day</Text>
          <Text style={styles.tipItem}>✓ Avoid sugary drinks and fried foods</Text>
          <Text style={styles.tipItem}>✓ Meal prep on weekends</Text>
          <Text style={styles.tipItem}>✓ Track calories for first 2 weeks</Text>
        </Card>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scroll: {
    flex: 1,
  },

  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
  },

  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },

  targetsCard: {
    marginHorizontal: 16,
    backgroundColor: colors.surfaceLight,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
  },

  targetTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },

  targetRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  targetItem: {
    alignItems: 'center',
  },

  targetLabel: {
    fontSize: 11,
    color: colors.textTertiary,
    marginBottom: 4,
  },

  targetValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.accent,
  },

  inputCard: {
    marginHorizontal: 16,
  },

  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  inputGroup: {
    flex: 1,
    marginHorizontal: 6,
  },

  inputLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 6,
  },

  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 10,
    color: colors.text,
    fontSize: 14,
    textAlign: 'center',
  },

  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },

  saveButtonText: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 14,
  },

  progressCard: {
    marginHorizontal: 16,
  },

  progressItem: {
    marginBottom: 16,
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  progressLabel: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '500',
  },

  progressValue: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  mealCategory: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
  },

  mealCard: {
    marginHorizontal: 16,
    borderLeftWidth: 3,
    borderLeftColor: colors.success,
  },

  mealText: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '500',
    marginBottom: 6,
  },

  mealCalories: {
    fontSize: 11,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },

  tipsCard: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: colors.surfaceLight,
  },

  tipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 10,
  },

  tipItem: {
    fontSize: 12,
    color: colors.textSecondary,
    marginVertical: 4,
    lineHeight: 18,
  },
});
