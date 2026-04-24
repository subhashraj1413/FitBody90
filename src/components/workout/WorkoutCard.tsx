import { LinearGradient } from 'expo-linear-gradient';
import { Dumbbell } from 'lucide-react-native';
import { Text, View } from 'react-native';

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
    <LinearGradient
      colors={['#2A0606', '#1A0606', '#181818']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="overflow-hidden rounded-[20px] p-4"
      style={{ borderWidth: 1, borderColor: 'rgba(225,6,0,0.28)', shadowColor: '#E10600', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 14, elevation: 8 }}
    >
      <View className="mb-4 flex-row items-center gap-3">
        <View
          className="h-12 w-12 items-center justify-center rounded-2xl bg-red"
          style={{ shadowColor: '#E10600', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.6, shadowRadius: 10 }}
        >
          <Dumbbell color={colors.whiteSoft} size={22} />
        </View>
        <View className="flex-1">
          <Text className="text-xl font-black tracking-tight text-whiteSoft">{title}</Text>
          <Text className="mt-0.5 text-sm text-grayText">{subtitle}</Text>
        </View>
        <View className="items-end">
          <Text className="text-2xl font-black text-redBright">{completed}</Text>
          <Text className="text-xs text-grayText">/ {total}</Text>
        </View>
      </View>
      <ProgressBar value={progress} caption={`${Math.round(progress * 100)}% complete`} />
    </LinearGradient>
  );
}
