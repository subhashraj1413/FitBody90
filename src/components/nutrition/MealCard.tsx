import { Text, View } from 'react-native';

import { AppCard } from '@/src/components/ui/AppCard';

type MealCardProps = {
  title: string;
  estimate: string;
  meals: string[];
};

export function MealCard({ title, estimate, meals }: MealCardProps) {
  return (
    <AppCard className="gap-3">
      <View className="flex-row items-center justify-between">
        <Text className="text-base font-black tracking-tight text-whiteSoft">{title}</Text>
        <View className="rounded-full border border-red/40 bg-red/[0.08] px-2.5 py-1">
          <Text className="text-[11px] font-extrabold text-redBright">{estimate}</Text>
        </View>
      </View>
      <View className="gap-2">
        {meals.map((meal) => (
          <View key={meal} className="flex-row items-start gap-2.5">
            <View className="mt-2 h-1.5 w-1.5 rounded-full bg-grayText/40" />
            <Text className="flex-1 text-sm leading-5 text-grayText">{meal}</Text>
          </View>
        ))}
      </View>
    </AppCard>
  );
}
