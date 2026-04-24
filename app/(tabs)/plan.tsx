import { CheckCircle2 } from 'lucide-react-native';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppCard } from '@/src/components/ui/AppCard';
import { ProgressBar } from '@/src/components/ui/ProgressBar';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { roadmap } from '@/src/data/roadmap';
import { useDashboard } from '@/src/hooks/useDashboard';
import { colors } from '@/src/theme/colors';

export default function PlanScreen() {
  const { dayNumber } = useDashboard();
  const progress = dayNumber / 90;

  return (
    <SafeAreaView className="flex-1 bg-black" edges={['top']}>
      <ScrollView className="flex-1" contentContainerClassName="gap-4 px-4 pb-32 pt-3">
        <View>
          <Text className="text-4xl font-black text-whiteSoft">90-Day Plan</Text>
          <Text className="mt-1 text-sm uppercase text-grayText">Day {dayNumber} / 90</Text>
        </View>

        <AppCard className="gap-4 border-red/50">
          <Text className="text-2xl font-black text-whiteSoft">Transformation Roadmap</Text>
          <ProgressBar value={progress} caption={`${Math.round(progress * 100)}% of the 90-day sprint`} />
        </AppCard>

        <SectionHeader title="Timeline" />
        {roadmap.map((phase, index) => (
          <AppCard key={phase.title} className="gap-3">
            <View className="flex-row gap-4">
              <View className="h-11 w-11 items-center justify-center rounded-full bg-red">
                <Text className="font-black text-whiteSoft">{index + 1}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-xs font-black uppercase text-redBright">{phase.range}</Text>
                <Text className="mt-1 text-xl font-black text-whiteSoft">{phase.title}</Text>
                <Text className="mt-1 text-sm text-grayText">{phase.focus}</Text>
              </View>
            </View>
            <View className="gap-2 pl-[60px]">
              {phase.goals.map((goal) => (
                <View key={goal} className="flex-row items-center gap-2">
                  <CheckCircle2 color={colors.success} size={16} />
                  <Text className="flex-1 text-sm text-whiteSoft">{goal}</Text>
                </View>
              ))}
            </View>
          </AppCard>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
