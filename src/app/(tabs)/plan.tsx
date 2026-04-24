import { LinearGradient } from 'expo-linear-gradient';
import { CheckCircle2 } from 'lucide-react-native';
import { ScrollView, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

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
      <ScrollView className="flex-1" contentContainerClassName="gap-5 px-4 pb-36 pt-4" showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.delay(0).springify().damping(18)}>
          <Text className="text-[34px] font-black tracking-tight text-whiteSoft">90-Day Plan</Text>
          <Text className="mt-1 text-xs font-bold uppercase tracking-widest text-grayText">Day {dayNumber} of 90</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(60).springify().damping(18)}>
          <LinearGradient
            colors={['#1E0A0A', '#181818']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="overflow-hidden rounded-[20px] p-5"
            style={{ borderWidth: 1, borderColor: 'rgba(225,6,0,0.25)', shadowColor: '#E10600', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 12 }}
          >
            <Text className="text-[10px] font-extrabold uppercase tracking-widest text-redBright">Transformation Roadmap</Text>
            <Text className="mt-2 text-2xl font-black tracking-tight text-whiteSoft">Sprint in Progress</Text>
            <Text className="mb-4 mt-1 text-sm text-grayText">{Math.round(progress * 100)}% of the 90-day journey complete</Text>
            <ProgressBar value={progress} caption={`Day ${dayNumber} / 90`} />
          </LinearGradient>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(120).springify().damping(18)} className="gap-3">
          <SectionHeader title="Timeline" subtitle="3 phases · 90 days" />
          {roadmap.map((phase, index) => (
            <View key={phase.title} className="flex-row gap-3">
              <View className="items-center">
                <View
                  className="h-11 w-11 items-center justify-center rounded-2xl bg-red"
                  style={{ shadowColor: '#E10600', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.45, shadowRadius: 10 }}
                >
                  <Text className="text-base font-black text-whiteSoft">{index + 1}</Text>
                </View>
                {index < roadmap.length - 1 && <View className="mt-1 flex-1 w-px bg-white/[0.07]" />}
              </View>

              <View
                className="mb-3 flex-1 overflow-hidden rounded-[20px] border border-white/[0.06] bg-card p-4"
                style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 10, elevation: 5 }}
              >
                <Text className="text-[10px] font-extrabold uppercase tracking-widest text-redBright">{phase.range}</Text>
                <Text className="mt-1 text-xl font-black tracking-tight text-whiteSoft">{phase.title}</Text>
                <Text className="mt-1 text-sm leading-5 text-grayText">{phase.focus}</Text>
                <View className="mt-3 h-px bg-white/[0.05]" />
                <View className="mt-3 gap-2">
                  {phase.goals.map((goal) => (
                    <View key={goal} className="flex-row items-start gap-2.5">
                      <CheckCircle2 color={colors.success} size={15} style={{ marginTop: 1 }} />
                      <Text className="flex-1 text-sm leading-5 text-whiteSoft/80">{goal}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
