import { LinearGradient } from 'expo-linear-gradient';
import { Award, Flame, Scale, Target } from 'lucide-react-native';
import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppCard } from '@/src/components/ui/AppCard';
import { Badge } from '@/src/components/ui/Badge';
import { MetricTile } from '@/src/components/ui/MetricTile';
import { ProgressRing } from '@/src/components/ui/ProgressRing';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { ToggleCheck } from '@/src/components/ui/ToggleCheck';
import { quotes } from '@/src/data/quotes';
import { useDashboard } from '@/src/hooks/useDashboard';
import { colors } from '@/src/theme/colors';

export default function DashboardScreen() {
  const { loading, refresh, dayNumber, currentWeight, checklist, streak, toggleChecklist } = useDashboard();
  const totalLoss = 82 - 73;
  const progress = Math.max(0, Math.min(1, (82 - currentWeight) / totalLoss));
  const quote = quotes[(dayNumber - 1) % quotes.length];

  if (loading && !checklist) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator color={colors.redBright} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-4 px-4 pb-32 pt-3"
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} tintColor={colors.redBright} />}
      >
        <View>
          <Text className="text-4xl font-black text-whiteSoft">FitBody90</Text>
          <Text className="mt-1 text-sm uppercase text-grayText">90-day athletic transformation</Text>
        </View>

        <LinearGradient colors={['#E10600', '#401010', '#181818']} className="overflow-hidden rounded-[22px] p-5">
          <View className="flex-row items-center justify-between gap-4">
            <View className="flex-1">
              <Text className="text-sm font-bold uppercase text-whiteSoft/80">Day {dayNumber} / 90</Text>
              <Text className="mt-3 text-5xl font-black text-whiteSoft">{currentWeight.toFixed(1)}</Text>
              <Text className="text-base font-bold text-whiteSoft">kg current weight</Text>
              <Text className="mt-4 text-sm leading-5 text-whiteSoft/80">Goal weight: 72-74 kg. Belly fat down, muscle up, athletic frame locked in.</Text>
            </View>
            <ProgressRing value={progress} label="body" />
          </View>
        </LinearGradient>

        <View className="flex-row gap-3">
          <MetricTile label="Goal" value="73 kg" icon={<Target color={colors.redBright} size={18} />} />
          <MetricTile label="Streak" value={`${streak?.current_streak ?? 0}d`} icon={<Flame color={colors.redBright} size={18} />} />
          <MetricTile label="Start" value="82 kg" icon={<Scale color={colors.redBright} size={18} />} />
        </View>

        <SectionHeader title="Daily Checklist" subtitle="Complete the non-negotiables" />
        <AppCard className="gap-3">
          <ToggleCheck label="Workout done" checked={Boolean(checklist?.workout_done)} onPress={() => toggleChecklist('workout_done')} />
          <ToggleCheck label="8,000 steps" checked={Boolean(checklist?.steps_done)} onPress={() => toggleChecklist('steps_done')} />
          <ToggleCheck label="150g protein" checked={Boolean(checklist?.protein_done)} onPress={() => toggleChecklist('protein_done')} />
          <ToggleCheck label="3L water" checked={Boolean(checklist?.water_done)} onPress={() => toggleChecklist('water_done')} />
          <ToggleCheck label="Sleep 7 hours" checked={Boolean(checklist?.sleep_done)} onPress={() => toggleChecklist('sleep_done')} />
        </AppCard>

        <AppCard className="gap-3 border-red/40">
          <Text className="text-xs font-black uppercase text-redBright">Today Mission</Text>
          <Text className="text-lg font-black leading-6 text-whiteSoft">Lift with intent, hit protein, and finish the day hydrated.</Text>
          <Text className="text-sm italic text-grayText">{quote}</Text>
        </AppCard>

        <SectionHeader title="Badges" />
        <View className="flex-row flex-wrap gap-2">
          <Badge label="Beast Mode" />
          <Badge label="7 Day Streak" />
          <Badge label="Protein King" />
          <Badge label={`Best ${streak?.best_streak ?? 0}d`} />
        </View>

        <AppCard className="flex-row items-center gap-3">
          <Award color={colors.success} size={26} />
          <View className="flex-1">
            <Text className="font-black text-whiteSoft">Premium target</Text>
            <Text className="mt-1 text-sm text-grayText">Lose fat while protecting strength with 4 focused lifting days.</Text>
          </View>
        </AppCard>
      </ScrollView>
    </SafeAreaView>
  );
}
