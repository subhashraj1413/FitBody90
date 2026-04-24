import { Pressable, ScrollView, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { ExerciseRow } from '@/src/components/workout/ExerciseRow';
import { WorkoutCard } from '@/src/components/workout/WorkoutCard';
import { useWorkout } from '@/src/hooks/useWorkout';

export default function WorkoutScreen() {
  const { workout, workoutPlan, selectedIndex, setSelectedIndex, completed, completedCount, toggleExercise } = useWorkout();

  return (
    <SafeAreaView className="flex-1 bg-black" edges={['top']}>
      <ScrollView className="flex-1" contentContainerClassName="gap-5 px-4 pb-36 pt-4" showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.delay(0).springify().damping(18)}>
          <Text className="text-[34px] font-black tracking-tight text-whiteSoft">Train</Text>
          <Text className="mt-1 text-xs font-bold uppercase tracking-widest text-grayText">4-day weekly gym split</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(60).springify().damping(18)} className="flex-row flex-wrap gap-2">
          {workoutPlan.map((item, index) => (
            <Pressable
              key={item.id}
              className={`rounded-full border px-4 py-2.5 ${
                index === selectedIndex
                  ? 'border-red bg-red'
                  : 'border-white/[0.08] bg-[#161616]'
              }`}
              style={index === selectedIndex ? { shadowColor: '#E10600', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10 } : {}}
              onPress={() => setSelectedIndex(index)}
            >
              <Text className={`text-xs font-extrabold tracking-wide ${index === selectedIndex ? 'text-whiteSoft' : 'text-grayText'}`}>
                {item.title.replace('Day ', 'D')}
              </Text>
            </Pressable>
          ))}
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(120).springify().damping(18)}>
          <WorkoutCard
            title={workout.title}
            subtitle={workout.subtitle}
            completed={completedCount}
            total={workout.exercises.length}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(180).springify().damping(18)} className="gap-3">
          <SectionHeader title="Exercises" subtitle="Tap to mark complete" />
          <View className="gap-2.5">
            {workout.exercises.map((exercise) => (
              <ExerciseRow
                key={exercise.name}
                exercise={exercise}
                checked={Boolean(completed[exercise.name])}
                onToggle={() => toggleExercise(exercise.name)}
              />
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
