import * as Haptics from 'expo-haptics';
import { Save } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MacroCard } from '@/src/components/nutrition/MacroCard';
import { MealCard } from '@/src/components/nutrition/MealCard';
import { AppButton } from '@/src/components/ui/AppButton';
import { AppCard } from '@/src/components/ui/AppCard';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { mealPlan } from '@/src/data/mealPlan';
import { useNutrition } from '@/src/hooks/useNutrition';
import { colors } from '@/src/theme/colors';

export default function NutritionScreen() {
  const { log, save, saving } = useNutrition();
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [water, setWater] = useState('');
  const [focused, setFocused] = useState<string | null>(null);

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

  const inputStyle = (field: string) => ({
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: focused === field ? colors.red : 'rgba(255,255,255,0.08)',
    backgroundColor: '#111111',
    paddingHorizontal: 16,
    color: colors.whiteSoft,
    fontWeight: '700' as const,
    fontSize: 15,
  });

  return (
    <SafeAreaView className="flex-1 bg-black" edges={['top']}>
      <ScrollView className="flex-1" contentContainerClassName="gap-5 px-4 pb-36 pt-4" showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.delay(0).springify().damping(18)}>
          <Text className="text-[34px] font-black tracking-tight text-whiteSoft">Fuel</Text>
          <Text className="mt-1 text-xs font-bold uppercase tracking-widest text-grayText">1900–2100 kcal · 150g protein · 3L water</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(60).springify().damping(18)} className="flex-row gap-3">
          <MacroCard label="Calories" value={caloriesValue} target={2000} unit="" />
          <MacroCard label="Protein" value={proteinValue} target={150} unit="g" />
          <MacroCard label="Water" value={waterValue} target={3} unit="L" />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(120).springify().damping(18)} className="gap-3">
          <SectionHeader title="Log Intake" subtitle="Saved locally" />
          <AppCard className="gap-3">
            <View className="flex-row gap-3">
              <TextInput
                style={[inputStyle('calories'), { flex: 1 }]}
                placeholder="Calories"
                placeholderTextColor={colors.grayText}
                keyboardType="number-pad"
                value={calories}
                onChangeText={setCalories}
                onFocus={() => setFocused('calories')}
                onBlur={() => setFocused(null)}
              />
              <TextInput
                style={[inputStyle('protein'), { flex: 1 }]}
                placeholder="Protein g"
                placeholderTextColor={colors.grayText}
                keyboardType="number-pad"
                value={protein}
                onChangeText={setProtein}
                onFocus={() => setFocused('protein')}
                onBlur={() => setFocused(null)}
              />
            </View>
            <TextInput
              style={inputStyle('water')}
              placeholder="Water liters"
              placeholderTextColor={colors.grayText}
              keyboardType="decimal-pad"
              value={water}
              onChangeText={setWater}
              onFocus={() => setFocused('water')}
              onBlur={() => setFocused(null)}
            />
            <AppButton
              title={saving ? 'Saving…' : 'Save Intake'}
              icon={<Save color={colors.whiteSoft} size={17} />}
              disabled={saving}
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
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(180).springify().damping(18)} className="gap-3">
          <SectionHeader title="Meal Suggestions" />
          {mealPlan.map((section) => (
            <MealCard key={section.title} title={section.title} estimate={section.estimate} meals={section.meals} />
          ))}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
