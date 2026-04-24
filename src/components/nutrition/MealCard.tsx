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
        <Text className="text-lg font-black text-whiteSoft">{title}</Text>
        <Text className="text-xs text-redBright">{estimate}</Text>
      </View>
      {meals.map((meal) => (
        <Text key={meal} className="text-sm leading-5 text-grayText">
          - {meal}
        </Text>
      ))}
    </AppCard>
  );
}
