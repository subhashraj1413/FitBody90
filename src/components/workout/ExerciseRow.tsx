import { View } from 'react-native';

import { ToggleCheck } from '@/src/components/ui/ToggleCheck';
import { Exercise } from '@/src/types';

type ExerciseRowProps = {
  exercise: Exercise;
  checked: boolean;
  onToggle: () => void;
};

export function ExerciseRow({ exercise, checked, onToggle }: ExerciseRowProps) {
  return (
    <View className={checked ? 'opacity-55' : 'opacity-100'}>
      <ToggleCheck label={exercise.name} caption={`${exercise.sets} - ${exercise.note}`} checked={checked} onPress={onToggle} />
    </View>
  );
}
