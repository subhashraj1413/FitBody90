import * as Haptics from 'expo-haptics';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Save } from 'lucide-react-native';

import { AppButton } from '@/src/components/ui/AppButton';
import { AppCard } from '@/src/components/ui/AppCard';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { MacroCard } from '@/src/components/nutrition/MacroCard';
import { MealCard } from '@/src/components/nutrition/MealCard';
import { mealPlan } from '@/src/data/mealPlan';
import { useNutrition } from '@/src/hooks/useNutrition';
import { colors } from '@/src/theme/colors';

export default function NutritionScreen() {
  const { log, save, saving } = useNutrition();
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [water, setWater] = useState('');

  useEffect(() => {
    if (log) {
      setCalories(String(log.calories));
      setProtein(String(log.protein));
      setWater(String(log.water));
    }
  }, [log]);

  const caloriesValue = Number(calories) || log?.calories || 0;
  const proteinValue = Number(protein) || log?.protein || 0;
  const waterValue = Number(water) || log?.water || 0;

  return (
    <SafeAreaView className="flex-1 bg-black" edges={['top']}>
      <ScrollView className="flex-1" contentContainerClassName="gap-4 px-4 pb-32 pt-3">
        <View>
          <Text className="text-4xl font-black text-whiteSoft">Nutrition</Text>
          <Text className="mt-1 text-sm uppercase text-grayText">1900-2100 kcal - 150g protein - 3L water</Text>
        </View>

        <View className="flex-row gap-3">
          <MacroCard label="Calories" value={caloriesValue} target={2000} unit="" />
          <MacroCard label="Protein" value={proteinValue} target={150} unit="g" />
          <MacroCard label="Water" value={waterValue} target={3} unit="L" />
        </View>

        <SectionHeader title="Log Intake" subtitle="Saved locally to SQLite" />
        <AppCard className="gap-3">
          <View className="flex-row gap-3">
            <TextInput className="h-14 flex-1 rounded-[16px] border border-[#333333] bg-carbon px-4 font-bold text-whiteSoft" placeholder="Calories" placeholderTextColor={colors.grayText} keyboardType="number-pad" value={calories} onChangeText={setCalories} />
            <TextInput className="h-14 flex-1 rounded-[16px] border border-[#333333] bg-carbon px-4 font-bold text-whiteSoft" placeholder="Protein" placeholderTextColor={colors.grayText} keyboardType="number-pad" value={protein} onChangeText={setProtein} />
          </View>
          <TextInput className="h-14 rounded-[16px] border border-[#333333] bg-carbon px-4 font-bold text-whiteSoft" placeholder="Water liters" placeholderTextColor={colors.grayText} keyboardType="decimal-pad" value={water} onChangeText={setWater} />
          <AppButton
            title={saving ? 'Saving' : 'Save'}
            icon={<Save color={colors.whiteSoft} size={18} />}
            onPress={async () => {
              await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              await save({
                calories: Number(calories) || 0,
                protein: Number(protein) || 0,
                water: Number(water) || 0,
              });
            }}
          />
        </AppCard>

        <SectionHeader title="Meal Suggestions" />
        {mealPlan.map((section) => (
          <MealCard key={section.title} title={section.title} estimate={section.estimate} meals={section.meals} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
