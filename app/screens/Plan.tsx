import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { colors } from '@/constants/colors';
import { storage } from '@/utils/storage';
import { Card, SectionHeader } from '@/components/UI';

interface Phase {
  title: string;
  weeks: string;
  emoji: string;
  goals: string[];
  color: string;
}

const PHASES: Phase[] = [
  {
    title: 'Foundation Building',
    weeks: 'Weeks 1-4',
    emoji: '🏗️',
    color: colors.primary,
    goals: [
      'Build consistent gym habit - visit 4 days/week',
      'Walk 8,000 steps daily without fail',
      'Eliminate sugar and fried foods',
      'Learn to track calories and macros',
      'Get quality sleep 7+ hours',
      'Target: 82 kg → 79.5 kg',
    ],
  },
  {
    title: 'Intensity Building',
    weeks: 'Weeks 5-8',
    emoji: '⚡',
    color: colors.accent,
    goals: [
      'Increase weights gradually each week',
      'Add 2-3 cardio sessions (20-30 min)',
      'Maintain high protein intake (150g+)',
      'Tighten weekend diet - avoid cheat meals',
      'Increase step count to 10,000 if possible',
      'Target: 79.5 kg → 77.5 kg',
    ],
  },
  {
    title: 'Transformation Peak',
    weeks: 'Weeks 9-12',
    emoji: '🏆',
    color: colors.success,
    goals: [
      'Push intensity to maximum sustainable level',
      'Prioritize sleep and recovery',
      'Take weekly progress photos',
      'Review weight and waist measurements',
      'Start seeing significant muscle definition',
      'Target: 77.5 kg → 75.5 kg (3-month goal)',
    ],
  },
  {
    title: 'Fine-tuning Phase',
    weeks: 'Weeks 13-20',
    emoji: '✨',
    color: colors.warning,
    goals: [
      'Focus on maintaining muscle while losing fat',
      'Increase protein if body recomposition stalls',
      'Maintain consistent workout routine',
      'Monitor energy levels carefully',
      'Take more progress photos',
      'Target: 75.5 kg → 73 kg',
    ],
  },
  {
    title: 'Final Polish',
    weeks: 'Weeks 21-25 (Extra goals)',
    emoji: '👑',
    color: colors.accent,
    goals: [
      'Achieve final weight goal (72-74 kg)',
      'Maximize muscle definition and tone',
      'Develop athletic physique',
      'Establish sustainable lifestyle habits',
      'Plan maintenance routine post 90-days',
      'Target: 73 kg → 72-74 kg (Final)',
    ],
  },
];

export const Plan: React.FC = () => {
  const [dayNumber, setDayNumber] = useState(1);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const day = await storage.getCurrentDay();
    setDayNumber(day);

    // Calculate current phase (0-indexed)
    let phaseIndex = 0;
    if (day > 56) phaseIndex = 4;
    else if (day > 28) phaseIndex = 3;
    else if (day > 14) phaseIndex = 2;
    else if (day > 7) phaseIndex = 1;

    setCurrentPhaseIndex(phaseIndex);
  };

  const weekNumber = Math.ceil(dayNumber / 7);
  const currentPhase = PHASES[currentPhaseIndex];
  const progressToPhaseEnd = ((dayNumber % 28) / 28) * 100 || (dayNumber / 28) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>90-Day Plan</Text>
          <Text style={styles.subtitle}>
            Week {weekNumber} • Day {dayNumber}/90
          </Text>
        </View>

        {/* Current Phase */}
        <Card style={[styles.currentPhaseCard, { borderLeftColor: currentPhase.color }]}>
          <View style={styles.phaseHeader}>
            <Text style={styles.phaseEmoji}>{currentPhase.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.phaseName}>{currentPhase.title}</Text>
              <Text style={styles.phaseWeeks}>{currentPhase.weeks}</Text>
            </View>
          </View>

          <View style={styles.phaseProgressBar}>
            <View
              style={[
                styles.phaseProgressFill,
                { width: `${Math.min(progressToPhaseEnd, 100)}%`, backgroundColor: currentPhase.color },
              ]}
            />
          </View>
          <Text style={styles.phaseProgressText}>
            {Math.round(Math.min(progressToPhaseEnd, 100))}% through this phase
          </Text>
        </Card>

        {/* Phase Overview */}
        <SectionHeader title="Current Phase Goals" />
        <Card style={styles.goalsCard}>
          {currentPhase.goals.map((goal, idx) => (
            <View
              key={idx}
              style={[
                styles.goalItem,
                idx !== currentPhase.goals.length - 1 && styles.goalBorder,
              ]}
            >
              <Text style={styles.goalBullet}>•</Text>
              <Text style={styles.goalText}>{goal}</Text>
            </View>
          ))}
        </Card>

        {/* All Phases Timeline */}
        <SectionHeader title="Complete 90-Day Timeline" />
        {PHASES.map((phase, idx) => {
          const isCurrentPhase = idx === currentPhaseIndex;
          const isCompletedPhase = idx < currentPhaseIndex;

          return (
            <Card
              key={idx}
              style={[
                styles.phaseCard,
                isCurrentPhase && styles.phaseCardActive,
                isCompletedPhase && styles.phaseCardCompleted,
              ]}
            >
              <View style={styles.timelineItem}>
                <View
                  style={[
                    styles.timelineIndicator,
                    {
                      backgroundColor: isCompletedPhase
                        ? colors.success
                        : isCurrentPhase
                          ? colors.primary
                          : colors.textTertiary,
                    },
                  ]}
                >
                  <Text style={styles.timelineNumber}>{isCompletedPhase ? '✓' : idx + 1}</Text>
                </View>

                <View style={{ flex: 1, marginLeft: 16 }}>
                  <View style={styles.phaseInfo}>
                    <Text style={styles.phaseTitle}>
                      {phase.emoji} {phase.title}
                    </Text>
                    <Text style={styles.phaseWeeks}>{phase.weeks}</Text>
                  </View>

                  <View style={styles.phaseGoals}>
                    {phase.goals.slice(0, 2).map((goal, goalIdx) => (
                      <Text key={goalIdx} style={styles.miniGoal}>
                        ✓ {goal.split('-')[0]}
                      </Text>
                    ))}
                    {phase.goals.length > 2 && (
                      <Text style={styles.moreGoals}>
                        +{phase.goals.length - 2} more goals
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            </Card>
          );
        })}

        {/* Weekly Breakdown */}
        <SectionHeader title="Weekly Focus Areas" />
        <Card style={styles.weeklyCard}>
          <View style={styles.weeklyRow}>
            <View style={styles.weeklyItem}>
              <Text style={styles.weeklyEmoji}>💪</Text>
              <Text style={styles.weeklyLabel}>Strength</Text>
              <Text style={styles.weeklyValue}>4 days/week</Text>
            </View>
            <View style={styles.weeklyItem}>
              <Text style={styles.weeklyEmoji}>🏃</Text>
              <Text style={styles.weeklyLabel}>Cardio</Text>
              <Text style={styles.weeklyValue}>2-3 days/week</Text>
            </View>
          </View>
          <View style={styles.weeklyRow}>
            <View style={styles.weeklyItem}>
              <Text style={styles.weeklyEmoji}>🥗</Text>
              <Text style={styles.weeklyLabel}>Nutrition</Text>
              <Text style={styles.weeklyValue}>1900-2100 kcal</Text>
            </View>
            <View style={styles.weeklyItem}>
              <Text style={styles.weeklyEmoji}>😴</Text>
              <Text style={styles.weeklyLabel}>Sleep</Text>
              <Text style={styles.weeklyValue}>7-9 hours</Text>
            </View>
          </View>
        </Card>

        {/* Success Factors */}
        <Card style={styles.successCard}>
          <Text style={styles.successTitle}>🎯 Keys to Success</Text>
          <Text style={styles.successBullet}>
            1. Consistency - More important than perfection
          </Text>
          <Text style={styles.successBullet}>
            2. Progressive Overload - Gradually increase weights
          </Text>
          <Text style={styles.successBullet}>
            3. Protein Intake - 150g+ daily for muscle retention
          </Text>
          <Text style={styles.successBullet}>
            4. Sleep Quality - 7+ hours for recovery
          </Text>
          <Text style={styles.successBullet}>
            5. Patience - Fat loss is a marathon, not a sprint
          </Text>
          <Text style={styles.successBullet}>
            6. Tracking - Log workouts and nutrition
          </Text>
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

  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },

  currentPhaseCard: {
    marginHorizontal: 16,
    backgroundColor: colors.surfaceLight,
    borderLeftWidth: 4,
  },

  phaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  phaseEmoji: {
    fontSize: 32,
    marginRight: 12,
  },

  phaseName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },

  phaseWeeks: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },

  phaseProgressBar: {
    height: 10,
    backgroundColor: colors.border,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
  },

  phaseProgressFill: {
    height: '100%',
    borderRadius: 5,
  },

  phaseProgressText: {
    fontSize: 11,
    color: colors.textTertiary,
    textAlign: 'right',
  },

  goalsCard: {
    marginHorizontal: 16,
  },

  goalItem: {
    flexDirection: 'row',
    paddingVertical: 10,
  },

  goalBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  goalBullet: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: 'bold',
    marginRight: 10,
    marginTop: 2,
  },

  goalText: {
    fontSize: 13,
    color: colors.text,
    flex: 1,
    lineHeight: 18,
  },

  phaseCard: {
    marginHorizontal: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.textTertiary,
  },

  phaseCardActive: {
    borderLeftColor: colors.primary,
    backgroundColor: colors.surfaceLight,
  },

  phaseCardCompleted: {
    borderLeftColor: colors.success,
    opacity: 0.7,
  },

  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  timelineIndicator: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },

  timelineNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.background,
  },

  phaseInfo: {
    marginBottom: 8,
  },

  phaseTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },

  phaseGoals: {
    marginTop: 6,
  },

  miniGoal: {
    fontSize: 11,
    color: colors.textSecondary,
    marginVertical: 2,
  },

  moreGoals: {
    fontSize: 10,
    color: colors.textTertiary,
    fontStyle: 'italic',
    marginTop: 4,
  },

  weeklyCard: {
    marginHorizontal: 16,
  },

  weeklyRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },

  weeklyItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },

  weeklyEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },

  weeklyLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },

  weeklyValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },

  successCard: {
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: colors.surfaceLight,
  },

  successTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 10,
  },

  successBullet: {
    fontSize: 12,
    color: colors.textSecondary,
    marginVertical: 4,
    lineHeight: 18,
  },
});
