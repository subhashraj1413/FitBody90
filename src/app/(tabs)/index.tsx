import { LinearGradient } from 'expo-linear-gradient';
import { Award, Flame, Scale, Target } from 'lucide-react-native';
import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
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
        <ActivityIndicator color={colors.redBright} size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-5 px-4 pb-36 pt-4"
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} tintColor={colors.redBright} />}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.delay(0).springify().damping(18)}>
          <Text className="text-[34px] font-black tracking-tight text-whiteSoft">FitBody90</Text>
          <Text className="mt-1 text-xs font-bold uppercase tracking-widest text-grayText">90-day athletic transformation</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(60).springify().damping(18)}>
          <LinearGradient
            colors={['#C00400', '#6B0200', '#1A0A0A']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="overflow-hidden rounded-[24px] p-5"
            style={{ borderWidth: 1, borderColor: 'rgba(255,42,42,0.2)', shadowColor: '#E10600', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.35, shadowRadius: 20, elevation: 12 }}
          >
            <View className="flex-row items-center justify-between gap-4">
              <View className="flex-1">
                <Text className="text-[11px] font-extrabold uppercase tracking-widest text-white/60">Day {dayNumber} of 90</Text>
                <Text className="mt-3 text-[52px] font-black leading-none tracking-tight text-whiteSoft">
                  {currentWeight.toFixed(1)}
                </Text>
                <Text className="mt-1 text-sm font-bold text-white/80">kg current weight</Text>
                <Text className="mt-3 text-xs leading-5 text-white/55">
                  Goal 72–74 kg · belly fat down, muscle up, athletic frame locked in.
                </Text>
              </View>
              <ProgressRing value={progress} label="body" size={112} />
            </View>
          </LinearGradient>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(120).springify().damping(18)} className="flex-row gap-3">
          <MetricTile label="Goal" value="73 kg" icon={<Target color={colors.redBright} size={16} />} />
          <MetricTile label="Streak" value={`${streak?.current_streak ?? 0}d`} icon={<Flame color={colors.redBright} size={16} />} />
          <MetricTile label="Start" value="82 kg" icon={<Scale color={colors.redBright} size={16} />} />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(180).springify().damping(18)} className="gap-3">
          <SectionHeader title="Daily Mission" subtitle="Non-negotiables" />
          <AppCard className="gap-2.5">
            <ToggleCheck label="Workout done" checked={Boolean(checklist?.workout_done)} onPress={() => toggleChecklist('workout_done')} />
            <ToggleCheck label="8,000 steps" checked={Boolean(checklist?.steps_done)} onPress={() => toggleChecklist('steps_done')} />
            <ToggleCheck label="150g protein" checked={Boolean(checklist?.protein_done)} onPress={() => toggleChecklist('protein_done')} />
            <ToggleCheck label="3L water" checked={Boolean(checklist?.water_done)} onPress={() => toggleChecklist('water_done')} />
            <ToggleCheck label="Sleep 7 hours" checked={Boolean(checklist?.sleep_done)} onPress={() => toggleChecklist('sleep_done')} />
          </AppCard>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(240).springify().damping(18)}>
          <AppCard
            style={{ borderColor: 'rgba(225,6,0,0.3)', shadowColor: '#E10600', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12 }}
          >
            <Text className="mb-2 text-[10px] font-extrabold uppercase tracking-widest text-redBright">Today's Mindset</Text>
            <Text className="text-base font-black leading-6 tracking-tight text-whiteSoft">
              Lift with intent, hit protein, and finish the day hydrated.
            </Text>
            <View className="mt-3 h-px bg-white/[0.06]" />
            <Text className="mt-3 text-sm italic leading-5 text-grayText">"{quote}"</Text>
          </AppCard>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).springify().damping(18)} className="gap-3">
          <SectionHeader title="Badges" />
          <View className="flex-row flex-wrap gap-2">
            <Badge label="Beast Mode" />
            <Badge label="7 Day Streak" />
            <Badge label="Protein King" />
            <Badge label={`Best ${streak?.best_streak ?? 0}d`} />
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(360).springify().damping(18)}>
          <AppCard className="flex-row items-center gap-4">
            <View
              className="h-11 w-11 items-center justify-center rounded-2xl bg-success/10"
              style={{ borderWidth: 1, borderColor: 'rgba(34,197,94,0.3)' }}
            >
              <Award color={colors.success} size={22} />
            </View>
            <View className="flex-1">
              <Text className="font-black tracking-tight text-whiteSoft">Premium target</Text>
              <Text className="mt-1 text-sm leading-5 text-grayText">
                Lose fat while protecting strength with 4 focused lifting days.
              </Text>
            </View>
          </AppCard>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
