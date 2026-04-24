import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, Save } from 'lucide-react-native';

import { AppButton } from '@/src/components/ui/AppButton';
import { AppCard } from '@/src/components/ui/AppCard';
import { ChartCard } from '@/src/components/ui/ChartCard';
import { MetricTile } from '@/src/components/ui/MetricTile';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { ProgressLogCard } from '@/src/components/progress/ProgressLogCard';
import { targetWeights } from '@/src/data/roadmap';
import { useProgress } from '@/src/hooks/useProgress';
import { colors } from '@/src/theme/colors';

export default function ProgressScreen() {
  const { logs, save, saving } = useProgress();
  const [weight, setWeight] = useState('');
  const [waist, setWaist] = useState('');
  const [notes, setNotes] = useState('');
  const latest = logs[0];
  const currentWeight = latest?.weight ?? 82;
  const weightLost = Math.max(0, 82 - currentWeight);
  const chartLogs = [...logs].reverse();

  return (
    <SafeAreaView className="flex-1 bg-black" edges={['top']}>
      <ScrollView className="flex-1" contentContainerClassName="gap-4 px-4 pb-32 pt-3">
        <View>
          <Text className="text-4xl font-black text-whiteSoft">Progress</Text>
          <Text className="mt-1 text-sm uppercase text-grayText">Weight, waist, trend, photos</Text>
        </View>

        <View className="flex-row gap-3">
          <MetricTile label="Current" value={`${currentWeight.toFixed(1)} kg`} />
          <MetricTile label="Lost" value={`${weightLost.toFixed(1)} kg`} />
          <MetricTile label="Goal" value="72-74" />
        </View>

        <SectionHeader title="Weekly Weigh-In" />
        <AppCard className="gap-3">
          <View className="flex-row gap-3">
            <TextInput className="h-14 flex-1 rounded-[16px] border border-[#333333] bg-carbon px-4 font-bold text-whiteSoft" placeholder="Weight kg" placeholderTextColor={colors.grayText} keyboardType="decimal-pad" value={weight} onChangeText={setWeight} />
            <TextInput className="h-14 flex-1 rounded-[16px] border border-[#333333] bg-carbon px-4 font-bold text-whiteSoft" placeholder="Waist cm" placeholderTextColor={colors.grayText} keyboardType="decimal-pad" value={waist} onChangeText={setWaist} />
          </View>
          <TextInput className="min-h-24 rounded-[16px] border border-[#333333] bg-carbon px-4 py-3 font-bold text-whiteSoft" placeholder="Notes" placeholderTextColor={colors.grayText} multiline value={notes} onChangeText={setNotes} />
          <AppButton
            title={saving ? 'Saving' : 'Save Progress'}
            icon={<Save color={colors.whiteSoft} size={18} />}
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

        <ChartCard title="Weight Chart" labels={chartLogs.map((log) => log.date.slice(5))} values={chartLogs.map((log) => log.weight)} suffix="kg" />
        <ChartCard title="Waist Chart" labels={chartLogs.map((log) => log.date.slice(5))} values={chartLogs.map((log) => log.waist)} suffix="cm" />

        <SectionHeader title="Before / After" />
        <View className="flex-row gap-3">
          {['Before', 'After'].map((label) => (
            <AppCard key={label} className="h-36 flex-1 items-center justify-center gap-2 border-dashed">
              <Camera color={colors.grayText} size={28} />
              <Text className="text-sm font-bold text-grayText">{label}</Text>
            </AppCard>
          ))}
        </View>

        <SectionHeader title="Target Table" />
        <AppCard className="gap-3">
          {targetWeights.map((target) => (
            <View key={target.label} className="flex-row items-center justify-between border-b border-[#2A2A2A] pb-2">
              <Text className="font-bold text-grayText">{target.label}</Text>
              <Text className="font-black text-whiteSoft">{target.weight}</Text>
            </View>
          ))}
        </AppCard>

        <SectionHeader title="History" subtitle={`${logs.length} logs`} />
        {logs.map((log) => (
          <ProgressLogCard key={log.id} log={log} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
