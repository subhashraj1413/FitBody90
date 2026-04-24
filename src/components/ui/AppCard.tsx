import { ReactNode } from 'react';
import { View, ViewProps } from 'react-native';

type AppCardProps = ViewProps & {
  children: ReactNode;
};

export function AppCard({ children, className = '', ...props }: AppCardProps & { className?: string }) {
  return (
    <View
      className={`rounded-[18px] border border-[#2A2A2A] bg-card p-4 ${className}`}
      {...props}
    >
      {children}
    </View>
  );
}
