import { Text, View } from 'react-native';

type BadgeProps = {
  label: string;
};

export function Badge({ label }: BadgeProps) {
  return (
    <View className="rounded-full border border-red/60 bg-[#240A0A] px-3 py-2">
      <Text className="text-xs font-extrabold uppercase text-redBright">{label}</Text>
    </View>
  );
}
