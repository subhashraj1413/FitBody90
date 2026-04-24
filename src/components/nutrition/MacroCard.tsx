import { Text, View } from 'react-native';

import { ProgressBar } from '@/src/components/ui/ProgressBar';

type MacroCardProps = {
  label: string;
  value: number;
  target: number;
  unit: string;
};

export function MacroCard({ label, value, target, unit }: MacroCardProps) {
  return (
    <View className="min-h-[126px] flex-1 justify-between rounded-[18px] border border-[#2A2A2A] bg-card p-3">
      <Text className="text-xs uppercase text-grayText">{label}</Text>
      <View>
        <Text className="text-2xl font-black text-whiteSoft">
          {value}
          <Text className="text-sm text-grayText">{unit}</Text>
        </Text>
        <Text className="mt-1 text-xs text-grayText">Target {target}{unit}</Text>
      </View>
      <ProgressBar value={target ? value / target : 0} />
    </View>
  );
}
