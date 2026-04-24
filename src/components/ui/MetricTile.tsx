import { ReactNode } from 'react';
import { Text, View } from 'react-native';

type MetricTileProps = {
  label: string;
  value: string;
  icon?: ReactNode;
};

export function MetricTile({ label, value, icon }: MetricTileProps) {
  return (
    <View
      className="min-h-[96px] flex-1 justify-between rounded-[20px] border border-white/[0.06] bg-card p-4"
      style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 10, elevation: 5 }}
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-[10px] font-bold uppercase tracking-widest text-grayText">{label}</Text>
        {icon}
      </View>
      <Text className="text-[22px] font-black tracking-tight text-whiteSoft">{value}</Text>
    </View>
  );
}
