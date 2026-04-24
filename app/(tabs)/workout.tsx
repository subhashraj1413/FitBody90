import { Text, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ExerciseRow } from '@/src/components/workout/ExerciseRow';
import { WorkoutCard } from '@/src/components/workout/WorkoutCard';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { useWorkout } from '@/src/hooks/useWorkout';

export default function WorkoutScreen() {
  const { workout, workoutPlan, selectedIndex, setSelectedIndex, completed, completedCount, toggleExercise } = useWorkout();

  return (
    <SafeAreaView className="flex-1 bg-black" edges={['top']}>
      <ScrollView className="flex-1" contentContainerClassName="gap-4 px-4 pb-32 pt-3">
        <View>
          <Text className="text-4xl font-black text-whiteSoft">Workout</Text>
          <Text className="mt-1 text-sm uppercase text-grayText">4-day weekly gym split</Text>
        </View>

        <View className="flex-row flex-wrap gap-2">
          {workoutPlan.map((item, index) => (
            <Pressable
              key={item.id}
              className={`rounded-full border px-4 py-2 ${index === selectedIndex ? 'border-red bg-red' : 'border-[#333333] bg-carbon'}`}
              onPress={() => setSelectedIndex(index)}
            >
              <Text className="text-xs font-extrabold text-whiteSoft">{item.title.replace('Day ', 'D')}</Text>
            </Pressable>
          ))}
        </View>

        <WorkoutCard title={workout.title} subtitle={workout.subtitle} completed={completedCount} total={workout.exercises.length} />

        <SectionHeader title="Exercises" subtitle="Tap each set after completion" />
        <View className="gap-3">
          {workout.exercises.map((exercise) => (
            <ExerciseRow
              key={exercise.name}
              exercise={exercise}
              checked={Boolean(completed[exercise.name])}
              onToggle={() => toggleExercise(exercise.name)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
