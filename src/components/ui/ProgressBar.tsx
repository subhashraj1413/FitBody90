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
      <View className="h-2.5 overflow-hidden rounded-full bg-[#2B2B2B]">
        <View className="h-full rounded-full bg-redBright" style={{ width }} />
      </View>
    </View>
  );
}
