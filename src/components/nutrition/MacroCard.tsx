import { Text, View } from 'react-native';

import { ProgressBar } from '@/src/components/ui/ProgressBar';

type MacroCardProps = {
  label: string;
  value: number;
  target: number;
  unit: string;
};

export function MacroCard({ label, value, target, unit }: MacroCardProps) {
  const pct = Math.min(100, Math.round(target ? (value / target) * 100 : 0));

  return (
    <View
      className="min-h-[130px] flex-1 justify-between rounded-[20px] border border-white/[0.06] bg-card p-4"
      style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 10, elevation: 5 }}
    >
      <Text className="text-[10px] font-bold uppercase tracking-widest text-grayText">{label}</Text>
      <View>
        <Text className="text-[22px] font-black tracking-tight text-whiteSoft">
          {value}
          <Text className="text-sm font-bold text-grayText"> {unit}</Text>
        </Text>
        <Text className="mt-0.5 text-[10px] text-grayText">
          of {target}
          {unit}
        </Text>
      </View>
      <View className="gap-1.5">
        <ProgressBar value={target ? value / target : 0} />
        <Text className="text-right text-[10px] font-extrabold text-redBright">{pct}%</Text>
      </View>
    </View>
  );
}
