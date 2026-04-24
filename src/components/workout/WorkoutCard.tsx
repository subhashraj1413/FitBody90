import { Dumbbell } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { AppCard } from '@/src/components/ui/AppCard';
import { ProgressBar } from '@/src/components/ui/ProgressBar';
import { colors } from '@/src/theme/colors';

type WorkoutCardProps = {
  title: string;
  subtitle: string;
  completed: number;
  total: number;
};

export function WorkoutCard({ title, subtitle, completed, total }: WorkoutCardProps) {
  const progress = total ? completed / total : 0;

  return (
    <AppCard className="gap-4 border-red/50 bg-[#1D1010]">
      <View className="flex-row items-center gap-3">
        <View className="h-12 w-12 items-center justify-center rounded-2xl bg-red">
          <Dumbbell color={colors.whiteSoft} size={24} />
        </View>
        <View className="flex-1">
          <Text className="text-2xl font-black text-whiteSoft">{title}</Text>
          <Text className="mt-1 text-sm text-grayText">{subtitle}</Text>
        </View>
        <Text className="text-lg font-black text-redBright">
          {completed}/{total}
        </Text>
      </View>
      <ProgressBar value={progress} caption={`${Math.round(progress * 100)}% complete`} />
    </AppCard>
  );
}
