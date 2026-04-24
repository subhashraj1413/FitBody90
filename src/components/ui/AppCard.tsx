import { ReactNode } from 'react';
import { View, ViewProps } from 'react-native';

type AppCardProps = ViewProps & {
  children: ReactNode;
  className?: string;
};

export function AppCard({ children, className = '', style, ...props }: AppCardProps) {
  return (
    <View
      className={`rounded-[20px] border border-white/[0.06] bg-card p-4 ${className}`}
      style={[{ shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.45, shadowRadius: 14, elevation: 6 }, style]}
      {...props}
    >
      {children}
    </View>
  );
}
