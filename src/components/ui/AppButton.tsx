import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { Pressable, PressableProps, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type AppButtonProps = PressableProps & {
  title: string;
  icon?: ReactNode;
  variant?: 'primary' | 'ghost';
};

export function AppButton({ title, icon, variant = 'primary', onPress, disabled, ...props }: AppButtonProps) {
  const scale = useSharedValue(1);
  const isPrimary = variant === 'primary';

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animStyle}>
      <Pressable
        onPressIn={() => { scale.value = withSpring(0.96, { damping: 14, stiffness: 200 }); }}
        onPressOut={() => { scale.value = withSpring(1, { damping: 14, stiffness: 200 }); }}
        onPress={async (event) => {
          await Haptics.selectionAsync();
          onPress?.(event);
        }}
        disabled={disabled}
        {...props}
      >
        {isPrimary ? (
          <LinearGradient
            colors={['#FF2A2A', '#C00400']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="h-14 flex-row items-center justify-center gap-2.5 rounded-full px-6"
            style={{ opacity: disabled ? 0.5 : 1, shadowColor: '#E10600', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.55, shadowRadius: 16, elevation: 10 }}
          >
            {icon}
            <Text className="text-sm font-extrabold uppercase tracking-widest text-whiteSoft">{title}</Text>
          </LinearGradient>
        ) : (
          <View
            className="h-14 flex-row items-center justify-center gap-2.5 rounded-full border border-white/10 bg-[#1C1C1C] px-6"
            style={{ opacity: disabled ? 0.5 : 1 }}
          >
            {icon}
            <Text className="text-sm font-extrabold uppercase tracking-widest text-whiteSoft">{title}</Text>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}
