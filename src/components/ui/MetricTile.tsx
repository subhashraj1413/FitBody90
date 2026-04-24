import { ReactNode } from 'react';
import { Text, View } from 'react-native';

type MetricTileProps = {
  label: string;
  value: string;
  icon?: ReactNode;
};

export function MetricTile({ label, value, icon }: MetricTileProps) {
  return (
    <View className="min-h-[92px] flex-1 justify-between rounded-[18px] border border-[#2A2A2A] bg-card p-3">
      <View className="flex-row items-center justify-between">
        <Text className="text-xs uppercase text-grayText">{label}</Text>
        {icon}
      </View>
      <Text className="text-2xl font-black text-whiteSoft">{value}</Text>
    </View>
  );
}
