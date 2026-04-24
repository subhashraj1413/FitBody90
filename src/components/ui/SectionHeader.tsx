import { ReactNode } from 'react';
import { Text, View } from 'react-native';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

export function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  return (
    <View className="flex-row items-center justify-between px-1">
      <View>
        <Text className="text-lg font-black tracking-tight text-whiteSoft">{title}</Text>
        {subtitle ? <Text className="mt-0.5 text-xs text-grayText">{subtitle}</Text> : null}
      </View>
      {action}
    </View>
  );
}
