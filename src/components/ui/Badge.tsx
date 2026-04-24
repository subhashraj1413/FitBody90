import { Text, View } from 'react-native';

type BadgeProps = {
  label: string;
};

export function Badge({ label }: BadgeProps) {
  return (
    <View
      className="rounded-full border border-red/40 bg-red/[0.08] px-3 py-1.5"
      style={{ shadowColor: '#E10600', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.18, shadowRadius: 6, elevation: 3 }}
    >
      <Text className="text-[11px] font-extrabold uppercase tracking-widest text-redBright">{label}</Text>
    </View>
  );
}
