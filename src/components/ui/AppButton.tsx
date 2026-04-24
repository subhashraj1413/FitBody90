import * as Haptics from 'expo-haptics';
import { ReactNode, useRef } from 'react';
import { Animated, Pressable, PressableProps, Text } from 'react-native';

type AppButtonProps = PressableProps & {
  title: string;
  icon?: ReactNode;
  variant?: 'primary' | 'ghost';
};

export function AppButton({ title, icon, variant = 'primary', onPress, ...props }: AppButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const isPrimary = variant === 'primary';

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        className={`h-12 flex-row items-center justify-center gap-2 rounded-[18px] px-5 ${
          isPrimary ? 'bg-red shadow-lg shadow-red/40' : 'border border-[#333333] bg-carbon'
        }`}
        onPressIn={() => Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start()}
        onPressOut={() => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start()}
        onPress={async (event) => {
          await Haptics.selectionAsync();
          onPress?.(event);
        }}
        {...props}
      >
        {icon}
        <Text className="text-sm font-extrabold uppercase tracking-wide text-whiteSoft">{title}</Text>
      </Pressable>
    </Animated.View>
  );
}
