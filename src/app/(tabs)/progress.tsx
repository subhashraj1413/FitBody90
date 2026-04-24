import * as Haptics from 'expo-haptics';
import { Camera, Save } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProgressLogCard } from '@/src/components/progress/ProgressLogCard';
import { AppButton } from '@/src/components/ui/AppButton';
import { AppCard } from '@/src/components/ui/AppCard';
import { ChartCard } from '@/src/components/ui/ChartCard';
import { MetricTile } from '@/src/components/ui/MetricTile';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { targetWeights } from '@/src/data/roadmap';
import { useProgress } from '@/src/hooks/useProgress';
import { colors } from '@/src/theme/colors';

export default function ProgressScreen() {
  const { logs, save, saving } = useProgress();
  const [weight, setWeight] = useState('');
  const [waist, setWaist] = useState('');
  const [notes, setNotes] = useState('');
  const [focused, setFocused] = useState<string | null>(null);
  const latest = logs[0];
  const currentWeight = latest?.weight ?? 82;
  const weightLost = Math.max(0, 82 - currentWeight);
  const chartLogs = [...logs].reverse();

  const inputStyle = (field: string) => ({
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
          <Text className="text-[34px] font-black tracking-tight text-whiteSoft">Stats</Text>
          <Text className="mt-1 text-xs font-bold uppercase tracking-widest text-grayText">Weight · waist · trend</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(60).springify().damping(18)} className="flex-row gap-3">
          <MetricTile label="Current" value={`${currentWeight.toFixed(1)} kg`} />
          <MetricTile label="Lost" value={`${weightLost.toFixed(1)} kg`} />
          <MetricTile label="Goal" value="72–74" />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(120).springify().damping(18)} className="gap-3">
          <SectionHeader title="Weekly Weigh-In" />
          <AppCard className="gap-3">
            <View className="flex-row gap-3">
              <TextInput
                style={[inputStyle('weight'), { flex: 1, height: 56 }]}
                placeholder="Weight kg"
                placeholderTextColor={colors.grayText}
                keyboardType="decimal-pad"
                value={weight}
                onChangeText={setWeight}
                onFocus={() => setFocused('weight')}
                onBlur={() => setFocused(null)}
              />
              <TextInput
                style={[inputStyle('waist'), { flex: 1, height: 56 }]}
                placeholder="Waist cm"
                placeholderTextColor={colors.grayText}
                keyboardType="decimal-pad"
                value={waist}
                onChangeText={setWaist}
                onFocus={() => setFocused('waist')}
                onBlur={() => setFocused(null)}
              />
            </View>
            <TextInput
              style={[inputStyle('notes'), { minHeight: 88, paddingVertical: 14, textAlignVertical: 'top' }]}
              placeholder="Notes (optional)"
              placeholderTextColor={colors.grayText}
              multiline
              value={notes}
              onChangeText={setNotes}
              onFocus={() => setFocused('notes')}
              onBlur={() => setFocused(null)}
            />
            <AppButton
              title={saving ? 'Saving…' : 'Save Progress'}
              icon={<Save color={colors.whiteSoft} size={17} />}
              disabled={saving}
              onPress={async () => {
                await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                const ok = await save({ weight: Number(weight) || 82, waist: Number(waist) || 0, notes });
                if (ok) {
                  setWeight('');
                  setWaist('');
                  setNotes('');
                }
              }}
            />
          </AppCard>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(180).springify().damping(18)} className="gap-3">
          <ChartCard title="Weight Trend" labels={chartLogs.map((l) => l.date.slice(5))} values={chartLogs.map((l) => l.weight)} suffix="kg" />
          <ChartCard title="Waist Trend" labels={chartLogs.map((l) => l.date.slice(5))} values={chartLogs.map((l) => l.waist)} suffix="cm" />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(240).springify().damping(18)} className="gap-3">
          <SectionHeader title="Before / After" />
          <View className="flex-row gap-3">
            {['Before', 'After'].map((label) => (
              <AppCard key={label} className="h-36 flex-1 items-center justify-center gap-2" style={{ borderStyle: 'dashed' }}>
                <Camera color={colors.grayText} size={26} />
                <Text className="text-xs font-bold text-grayText">{label}</Text>
              </AppCard>
            ))}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).springify().damping(18)} className="gap-3">
          <SectionHeader title="Target Table" />
          <AppCard className="gap-0">
            {targetWeights.map((target, i) => (
              <View
                key={target.label}
                className={`flex-row items-center justify-between py-3 ${i < targetWeights.length - 1 ? 'border-b border-white/[0.05]' : ''}`}
              >
                <Text className="text-sm font-bold text-grayText">{target.label}</Text>
                <Text className="text-sm font-black text-whiteSoft">{target.weight}</Text>
              </View>
            ))}
          </AppCard>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(360).springify().damping(18)} className="gap-3">
          <SectionHeader title="History" subtitle={`${logs.length} entries`} />
          {logs.map((log) => (
            <ProgressLogCard key={log.id} log={log} />
          ))}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
