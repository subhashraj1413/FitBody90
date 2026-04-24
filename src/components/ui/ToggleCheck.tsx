import * as Haptics from 'expo-haptics';
import { Check } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type ToggleCheckProps = {
  label: string;
  caption?: string;
  checked: boolean;
  onPress: () => void;
};

export function ToggleCheck({ label, caption, checked, onPress }: ToggleCheckProps) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animStyle}>
      <Pressable
        className={`flex-row items-center gap-3 rounded-[16px] border p-3.5 ${
          checked ? 'border-red/40 bg-red/[0.08]' : 'border-white/[0.06] bg-[#141414]'
        }`}
        onPressIn={() => { scale.value = withSpring(0.97, { damping: 12, stiffness: 260 }); }}
        onPressOut={() => { scale.value = withSpring(1, { damping: 12, stiffness: 260 }); }}
        onPress={async () => {
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          onPress();
        }}
      >
        <View
          className={`h-7 w-7 items-center justify-center rounded-lg border ${
            checked ? 'border-red bg-red' : 'border-white/20'
          }`}
          style={checked ? { shadowColor: '#E10600', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 6 } : {}}
        >
          {checked ? <Check size={14} color="#F5F5F5" strokeWidth={3} /> : null}
        </View>
        <View className="flex-1">
          <Text className={`text-sm font-bold ${checked ? 'text-whiteSoft' : 'text-grayText'}`}>{label}</Text>
          {caption ? <Text className="mt-0.5 text-xs text-grayText/70">{caption}</Text> : null}
        </View>
        {checked && <View className="h-2 w-2 rounded-full bg-red" style={{ shadowColor: '#E10600', shadowOpacity: 0.8, shadowRadius: 4 }} />}
      </Pressable>
    </Animated.View>
  );
}
