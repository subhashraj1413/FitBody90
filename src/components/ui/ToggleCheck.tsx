import * as Haptics from 'expo-haptics';
import { Check } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

type ToggleCheckProps = {
  label: string;
  caption?: string;
  checked: boolean;
  onPress: () => void;
};

export function ToggleCheck({ label, caption, checked, onPress }: ToggleCheckProps) {
  return (
    <Pressable
      className={`flex-row items-center gap-3 rounded-[18px] border p-3 ${
        checked ? 'border-red bg-[#2A0E0E]' : 'border-[#2A2A2A] bg-carbon'
      }`}
      onPress={async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
      }}
    >
      <View
        className={`h-7 w-7 items-center justify-center rounded-lg border ${
          checked ? 'border-redBright bg-red' : 'border-[#444444]'
        }`}
      >
        {checked ? <Check size={16} color="#F5F5F5" strokeWidth={3} /> : null}
      </View>
      <View className="flex-1">
        <Text className={`text-sm font-bold ${checked ? 'text-whiteSoft' : 'text-grayText'}`}>{label}</Text>
        {caption ? <Text className="mt-1 text-xs text-grayText">{caption}</Text> : null}
      </View>
    </Pressable>
  );
}
