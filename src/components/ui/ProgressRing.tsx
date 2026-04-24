import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, { Easing, useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type ProgressRingProps = {
  value: number;
  label: string;
  size?: number;
};

export function ProgressRing({ value, label, size = 120 }: ProgressRingProps) {
  const stroke = 9;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(1, value));

  const animProgress = useSharedValue(0);

  useEffect(() => {
    animProgress.value = withTiming(progress, { duration: 1100, easing: Easing.out(Easing.cubic) });
  }, [progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - animProgress.value),
  }));

  return (
    <View className="items-center justify-center" style={{ width: size, height: size }}>
      <Svg width={size} height={size} style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}>
        <Circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} fill="none" />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#FF2A2A"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          animatedProps={animatedProps}
          strokeLinecap="round"
        />
      </Svg>
      <Text className="text-2xl font-black text-whiteSoft">{Math.round(progress * 100)}%</Text>
      <Text className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-grayText">{label}</Text>
    </View>
  );
}
