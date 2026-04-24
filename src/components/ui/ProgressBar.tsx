import { DimensionValue, Text, View } from 'react-native';

type ProgressBarProps = {
  value: number;
  label?: string;
  caption?: string;
};

export function ProgressBar({ value, label, caption }: ProgressBarProps) {
  const width = `${Math.max(0, Math.min(100, value * 100))}%` as DimensionValue;

  return (
    <View className="gap-2">
      {(label || caption) && (
        <View className="flex-row items-center justify-between">
          {label ? <Text className="text-sm font-bold text-whiteSoft">{label}</Text> : <View />}
          {caption ? <Text className="text-xs text-grayText">{caption}</Text> : null}
        </View>
      )}
      <View className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
        <View
          className="h-full rounded-full bg-red"
          style={{ width, shadowColor: '#E10600', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.7, shadowRadius: 4 }}
        />
      </View>
    </View>
  );
}
