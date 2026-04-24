import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { colors } from '@/constants/colors';
import { storage, WorkoutRecord } from '@/utils/storage';
import { dateUtils, fitnessUtils } from '@/utils/calculations';
import { Card, Checkbox, SectionHeader } from '@/components/UI';

const WORKOUTS = {
  1: {
    name: 'Push Day',
    emoji: '💪',
    exercises: [
      { name: 'Bench Press', sets: '4x8' },
      { name: 'Incline Dumbbell Press', sets: '3x10' },
      { name: 'Shoulder Press', sets: '3x10' },
      { name: 'Tricep Pushdown', sets: '3x12' },
      { name: 'Pushups', sets: '3 sets' },
    ],
  },
  2: {
    name: 'Pull Day',
    emoji: '🏋️',
    exercises: [
      { name: 'Lat Pulldown', sets: '4x10' },
      { name: 'Seated Row', sets: '3x10' },
      { name: 'Dumbbell Row', sets: '3x10' },
      { name: 'Face Pull', sets: '3x15' },
      { name: 'Biceps Curl', sets: '3x12' },
    ],
  },
  3: {
    name: 'Legs + Core',
    emoji: '🦵',
    exercises: [
      { name: 'Leg Press or Squat', sets: '4x10' },
      { name: 'Romanian Deadlift', sets: '3x10' },
      { name: 'Walking Lunges', sets: '3x12' },
      { name: 'Plank', sets: '3x45s' },
      { name: 'Leg Raises', sets: '3x12' },
    ],
  },
  4: {
    name: 'Full Body',
    emoji: '⚡',
    exercises: [
      { name: 'Deadlift (moderate)', sets: '3x5' },
      { name: 'Dumbbell Press', sets: '3x10' },
      { name: 'Cable Row', sets: '3x10' },
      { name: 'Farmer Carry', sets: '3 rounds' },
      { name: 'Incline Treadmill', sets: '20 min' },
    ],
  },
};

export const Workout: React.FC = () => {
  const [dayNumber, setDayNumber] = useState(1);
  const [currentWorkoutDay, setCurrentWorkoutDay] = useState(1);
  const [workoutRecord, setWorkoutRecord] = useState<WorkoutRecord | null>(null);
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);
  const today = dateUtils.getTodayDate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const day = await storage.getCurrentDay();
    setDayNumber(day);

    const workoutDay = fitnessUtils.getWorkoutDay(day);
    setCurrentWorkoutDay(workoutDay);

    const record = await storage.getWorkoutRecord(today);
    if (record) {
      setWorkoutRecord(record);
    } else {
      const workoutInfo = WORKOUTS[workoutDay as keyof typeof WORKOUTS];
      const newRecord: WorkoutRecord = {
        date: today,
        day: workoutInfo.name,
        exercises: workoutInfo.exercises.map((ex) => ({
          name: ex.name,
          completed: false,
        })),
      };
      setWorkoutRecord(newRecord);
      await storage.saveWorkoutRecord(newRecord);
    }
  };

  const toggleExercise = async (index: number) => {
    if (!workoutRecord) return;

    const updated = {
      ...workoutRecord,
      exercises: workoutRecord.exercises.map((ex, i) =>
        i === index ? { ...ex, completed: !ex.completed } : ex
      ),
    };

    setWorkoutRecord(updated);
    await storage.saveWorkoutRecord(updated);
  };

  const getCompletedCount = () => {
    if (!workoutRecord) return 0;
    return workoutRecord.exercises.filter((ex) => ex.completed).length;
  };

  const workoutInfo = WORKOUTS[currentWorkoutDay as keyof typeof WORKOUTS];
  const completedCount = getCompletedCount();
  const totalExercises = workoutRecord?.exercises.length || 0;
  const completionPercentage = totalExercises > 0 ? (completedCount / totalExercises) * 100 : 0;

  if (!workoutRecord) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Workout</Text>
          <Text style={styles.dayInfo}>Day {dayNumber} of 90</Text>
        </View>

        {/* Workout Card */}
        <Card style={styles.workoutCard}>
          <View style={styles.workoutHeader}>
            <Text style={styles.workoutEmoji}>{workoutInfo.emoji}</Text>
            <View>
              <Text style={styles.workoutName}>{workoutInfo.name}</Text>
              <Text style={styles.workoutDate}>{dateUtils.formatDate(today)}</Text>
            </View>
          </View>

          {/* Progress */}
          <View style={styles.progressSection}>
            <View style={styles.progressInfo}>
              <Text style={styles.progressLabel}>Completed: {completedCount}/{totalExercises}</Text>
              <Text style={styles.progressPercentage}>{Math.round(completionPercentage)}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${completionPercentage}%` },
                ]}
              />
            </View>
          </View>
        </Card>

        {/* Exercises List */}
        <SectionHeader title="Exercises" subtitle={`${totalExercises} exercises`} />
        {workoutRecord.exercises.map((exercise, index) => {
          const workoutExercise = workoutInfo.exercises[index];
          const isExpanded = expandedExercise === exercise.name;

          return (
            <Card key={index} style={styles.exerciseCard}>
              <TouchableOpacity
                style={styles.exerciseHeader}
                onPress={() =>
                  setExpandedExercise(isExpanded ? null : exercise.name)
                }
              >
                <Checkbox
                  label={exercise.name}
                  checked={exercise.completed}
                  onPress={() => toggleExercise(index)}
                  style={styles.exerciseCheckbox}
                />
                <Text style={styles.expandIcon}>{isExpanded ? '▼' : '▶'}</Text>
              </TouchableOpacity>

              {isExpanded && workoutExercise && (
                <View style={styles.exerciseDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Sets & Reps:</Text>
                    <Text style={styles.detailValue}>{workoutExercise.sets}</Text>
                  </View>
                  <Text style={styles.tipsText}>
                    💡 Focus on proper form over heavy weight.
                  </Text>
                </View>
              )}
            </Card>
          );
        })}

        {/* Motivation Tips */}
        <Card style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💪 Tips for Today</Text>
          <Text style={styles.tipsBullet}>✓ Warm up properly before starting</Text>
          <Text style={styles.tipsBullet}>✓ Rest 60-90s between sets</Text>
          <Text style={styles.tipsBullet}>✓ Stay hydrated throughout</Text>
          <Text style={styles.tipsBullet}>✓ Focus on the mind-muscle connection</Text>
        </Card>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scroll: {
    flex: 1,
  },

  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
  },

  dayInfo: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
  },

  workoutCard: {
    marginHorizontal: 16,
    backgroundColor: colors.surfaceLight,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },

  workoutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  workoutEmoji: {
    fontSize: 40,
    marginRight: 12,
  },

  workoutName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },

  workoutDate: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },

  progressSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  progressLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },

  progressPercentage: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.accent,
  },

  progressBar: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 4,
  },

  exerciseCard: {
    marginHorizontal: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },

  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  exerciseCheckbox: {
    flex: 1,
    borderBottomWidth: 0,
    paddingVertical: 0,
    marginVertical: 0,
  },

  expandIcon: {
    fontSize: 12,
    color: colors.textTertiary,
    marginLeft: 8,
  },

  exerciseDetails: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginLeft: 36,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  detailLabel: {
    fontSize: 12,
    color: colors.textTertiary,
  },

  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.accent,
  },

  tipsText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 8,
    fontStyle: 'italic',
  },

  tipsCard: {
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: colors.surfaceLight,
  },

  tipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },

  tipsBullet: {
    fontSize: 12,
    color: colors.textSecondary,
    marginVertical: 4,
    lineHeight: 18,
  },
});
