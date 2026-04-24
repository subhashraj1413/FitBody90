import { ReactNode } from 'react';
import { Text, View } from 'react-native';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

export function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  return (
    <View className="mb-3 mt-6 flex-row items-end justify-between px-1">
      <View>
        <Text className="text-xl font-black text-whiteSoft">{title}</Text>
        {subtitle ? <Text className="mt-1 text-sm text-grayText">{subtitle}</Text> : null}
      </View>
      {action}
    </View>
  );
}
