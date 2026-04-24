import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { colors } from '@/constants/colors';
import { storage, DailyChecklist } from '@/utils/storage';
import { dateUtils, fitnessUtils, progressUtils } from '@/utils/calculations';
import { Card, StatsBox, Checkbox, ProgressBar, SectionHeader } from '@/components/UI';

export const Dashboard: React.FC = () => {
  const [dayNumber, setDayNumber] = useState(1);
  const [currentWeight, setCurrentWeight] = useState(82);
  const [checklist, setChecklist] = useState<DailyChecklist | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const today = dateUtils.getTodayDate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const day = await storage.getCurrentDay();
    setDayNumber(day);

    const dailyChecklist = await storage.getDailyChecklist(today);
    if (dailyChecklist) {
      setChecklist(dailyChecklist);
    } else {
      // Initialize new checklist for today
      const newChecklist: DailyChecklist = {
        date: today,
        workoutDone: false,
        stepsTarget: 8000,
        stepsCompleted: 0,
        proteinTarget: 150,
        proteinCompleted: 0,
        waterTarget: 3,
        waterCompleted: 0,
        sleepTarget: 7,
        sleepCompleted: 0,
      };
      setChecklist(newChecklist);
      await storage.saveDailyChecklist(newChecklist);
    }

    // Load user weight
    const profile = await storage.getUserProfile();
    if (profile) {
      setCurrentWeight(profile.currentWeight);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const updateChecklist = async (updates: Partial<DailyChecklist>) => {
    const updated = { ...checklist, ...updates } as DailyChecklist;
    setChecklist(updated);
    await storage.saveDailyChecklist(updated);
  };

  const progressPercentage = progressUtils.calculateProgressPercentage(82, currentWeight, 72);
  const motivationalText = fitnessUtils.getMotivationalMessage(dayNumber, 82 - currentWeight);
  const goalWeight = 72;
  const weightToLose = currentWeight - goalWeight;

  if (!checklist) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const stepsProgress = (checklist.stepsCompleted / checklist.stepsTarget) * 100;
  const proteinProgress = (checklist.proteinCompleted / checklist.proteinTarget) * 100;
  const waterProgress = (checklist.waterCompleted / checklist.waterTarget) * 100;
  const sleepProgress = (checklist.sleepCompleted / checklist.sleepTarget) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>FitBody90</Text>
          <Text style={styles.dayCounter}>Day {dayNumber} of 90</Text>
        </View>

        {/* Motivational Card */}
        <Card style={styles.motivationCard}>
          <Text style={styles.motivationText}>{motivationalText}</Text>
        </Card>

        {/* Weight Progress */}
        <SectionHeader title="Weight Progress" subtitle="Current: 82kg → Goal: 72kg" />
        <Card>
          <View style={styles.weightInfo}>
            <View style={styles.weightBox}>
              <Text style={styles.weightLabel}>Current</Text>
              <Text style={styles.weightValue}>{currentWeight.toFixed(1)}</Text>
              <Text style={styles.weightUnit}>kg</Text>
            </View>
            <View style={styles.weightBox}>
              <Text style={styles.weightLabel}>Goal</Text>
              <Text style={styles.weightValue}>{goalWeight}</Text>
              <Text style={styles.weightUnit}>kg</Text>
            </View>
            <View style={styles.weightBox}>
              <Text style={styles.weightLabel}>To Lose</Text>
              <Text style={styles.weightValue}>{weightToLose.toFixed(1)}</Text>
              <Text style={styles.weightUnit}>kg</Text>
            </View>
          </View>
          <ProgressBar progress={progressPercentage} label="Overall Progress" />
        </Card>

        {/* Daily Checklist */}
        <SectionHeader
          title="Daily Checklist"
          subtitle={dateUtils.formatDate(today)}
        />
        <Card>
          <Checkbox
            label="Workout Done"
            checked={checklist.workoutDone}
            onPress={() => updateChecklist({ workoutDone: !checklist.workoutDone })}
          />
          <View style={styles.checklistItem}>
            <Text style={styles.itemLabel}>Steps: {checklist.stepsCompleted}/{checklist.stepsTarget}</Text>
            <ProgressBar progress={stepsProgress} showPercentage={true} />
          </View>
          <View style={styles.checklistItem}>
            <Text style={styles.itemLabel}>Protein: {checklist.proteinCompleted}/{checklist.proteinTarget}g</Text>
            <ProgressBar progress={proteinProgress} showPercentage={true} />
          </View>
          <View style={styles.checklistItem}>
            <Text style={styles.itemLabel}>Water: {checklist.waterCompleted}/{checklist.waterTarget}L</Text>
            <ProgressBar progress={waterProgress} showPercentage={true} />
          </View>
          <View style={styles.checklistItem}>
            <Text style={styles.itemLabel}>Sleep: {checklist.sleepCompleted}/{checklist.sleepTarget}h</Text>
            <ProgressBar progress={sleepProgress} showPercentage={true} />
          </View>
        </Card>

        {/* Quick Stats */}
        <SectionHeader title="Quick Stats" />
        <View style={styles.statsGrid}>
          <StatsBox label="Workout" value={checklist.workoutDone ? '✓' : '○'} />
          <StatsBox label="Steps" value={Math.round(stepsProgress)} unit="%" />
          <StatsBox label="Protein" value={Math.round(proteinProgress)} unit="%" />
          <StatsBox label="Water" value={Math.round(waterProgress)} unit="%" />
        </View>

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

  dayCounter: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },

  motivationCard: {
    marginHorizontal: 16,
    backgroundColor: colors.surfaceLight,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
  },

  motivationText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    lineHeight: 20,
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

  weightInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },

  weightBox: {
    alignItems: 'center',
  },

  weightLabel: {
    fontSize: 12,
    color: colors.textTertiary,
    marginBottom: 4,
  },

  weightValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },

  weightUnit: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  checklistItem: {
    marginBottom: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  itemLabel: {
    fontSize: 13,
    color: colors.text,
    marginBottom: 8,
    fontWeight: '500',
  },

  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 4,
  },
});
