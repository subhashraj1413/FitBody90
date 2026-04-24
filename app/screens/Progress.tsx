import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { colors } from '@/constants/colors';
import { storage, ProgressRecord } from '@/utils/storage';
import { dateUtils, progressUtils } from '@/utils/calculations';
import { Card, SectionHeader } from '@/components/UI';

export const Progress: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [waist, setWaist] = useState('');
  const [notes, setNotes] = useState('');
  const [progressRecords, setProgressRecords] = useState<ProgressRecord[]>([]);
  const [dayNumber, setDayNumber] = useState(1);
  const today = dateUtils.getTodayDate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const day = await storage.getCurrentDay();
    setDayNumber(day);

    const records = await storage.getAllProgressRecords();
    setProgressRecords(records);

    // Load today's data if exists
    if (records.length > 0) {
      const todayRecord = records.find((r) => r.date === today);
      if (todayRecord) {
        setWeight(todayRecord.weight.toString());
        setWaist(todayRecord.waistMeasurement.toString());
        setNotes(todayRecord.notes);
      }
    }
  };

  const saveProgress = async () => {
    if (!weight || !waist) {
      alert('Please enter both weight and waist measurement');
      return;
    }

    const record: ProgressRecord = {
      date: today,
      weight: parseFloat(weight),
      waistMeasurement: parseFloat(waist),
      notes: notes,
    };

    await storage.saveProgressRecord(record);

    const updatedRecords = await storage.getAllProgressRecords();
    setProgressRecords(updatedRecords);

    alert('Progress saved successfully!');
  };

  const currentWeight = progressRecords.length > 0 ? progressRecords[progressRecords.length - 1].weight : 82;
  const startWeight = 82;
  const goalWeight = 72;
  const weekNumber = Math.ceil(dayNumber / 7);
  const targetWeight = progressUtils.getTargetWeight(weekNumber);

  const weightLost = startWeight - currentWeight;
  const progressPercentage = progressUtils.calculateProgressPercentage(
    startWeight,
    currentWeight,
    goalWeight
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Progress</Text>
          <Text style={styles.subtitle}>Track your transformation</Text>
        </View>

        {/* Overview Card */}
        <Card style={styles.overviewCard}>
          <View style={styles.overviewRow}>
            <View style={styles.overviewBox}>
              <Text style={styles.overviewLabel}>Lost</Text>
              <Text style={styles.overviewValue}>{weightLost.toFixed(1)}</Text>
              <Text style={styles.overviewUnit}>kg</Text>
            </View>
            <View style={styles.overviewBox}>
              <Text style={styles.overviewLabel}>Current</Text>
              <Text style={styles.overviewValue}>{currentWeight.toFixed(1)}</Text>
              <Text style={styles.overviewUnit}>kg</Text>
            </View>
            <View style={styles.overviewBox}>
              <Text style={styles.overviewLabel}>Goal</Text>
              <Text style={styles.overviewValue}>{goalWeight}</Text>
              <Text style={styles.overviewUnit}>kg</Text>
            </View>
          </View>

          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${progressPercentage}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>{progressPercentage}% Progress</Text>
            <Text style={styles.targetText}>Week {weekNumber} target: {targetWeight} kg</Text>
          </View>
        </Card>

        {/* Input Section */}
        <SectionHeader title="Log Today's Metrics" />
        <Card style={styles.inputCard}>
          <View style={styles.inputRow}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Weight (kg)</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 80.5"
                placeholderTextColor={colors.textTertiary}
                keyboardType="decimal-pad"
                value={weight}
                onChangeText={setWeight}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Waist (cm)</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 92"
                placeholderTextColor={colors.textTertiary}
                keyboardType="numeric"
                value={waist}
                onChangeText={setWaist}
              />
            </View>
          </View>

          <View style={styles.notesGroup}>
            <Text style={styles.inputLabel}>Notes</Text>
            <TextInput
              style={[styles.input, styles.notesInput]}
              placeholder="How are you feeling today?"
              placeholderTextColor={colors.textTertiary}
              multiline
              numberOfLines={3}
              value={notes}
              onChangeText={setNotes}
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={saveProgress}>
            <Text style={styles.saveButtonText}>Save Progress</Text>
          </TouchableOpacity>
        </Card>

        {/* Target Milestone */}
        <SectionHeader title="Target Milestones" />
        <Card style={styles.milestonesCard}>
          {progressUtils.targets.map((target, idx) => (
            <View
              key={idx}
              style={[
                styles.milestoneRow,
                idx !== progressUtils.targets.length - 1 && styles.milestoneBorder,
              ]}
            >
              <View>
                <Text style={styles.milestoneWeek}>{target.description}</Text>
                <Text style={styles.milestoneSubtext}>Week {target.week}</Text>
              </View>
              <View style={styles.milestoneRight}>
                <Text style={styles.milestoneWeight}>{target.weight} kg</Text>
                {currentWeight <= target.weight && (
                  <Text style={styles.achieved}>✓ Achieved</Text>
                )}
              </View>
            </View>
          ))}
        </Card>

        {/* Progress History */}
        {progressRecords.length > 0 && (
          <>
            <SectionHeader
              title="Progress History"
              subtitle={`${progressRecords.length} entries`}
            />
            <Card style={styles.historyCard}>
              {progressRecords.map((record, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.historyItem,
                    idx !== progressRecords.length - 1 && styles.historyBorder,
                  ]}
                >
                  <View>
                    <Text style={styles.historyDate}>
                      {dateUtils.formatDate(record.date)}
                    </Text>
                    <Text style={styles.historyDetails}>
                      {record.weight} kg • {record.waistMeasurement} cm
                    </Text>
                    {record.notes && (
                      <Text style={styles.historyNotes}>{record.notes}</Text>
                    )}
                  </View>
                  {idx === progressRecords.length - 1 && (
                    <Text style={styles.latestBadge}>Latest</Text>
                  )}
                </View>
              ))}
            </Card>
          </>
        )}

        {/* Tips */}
        <Card style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>📊 Tracking Tips</Text>
          <Text style={styles.tipItem}>
            ✓ Weigh yourself same time, same place weekly
          </Text>
          <Text style={styles.tipItem}>
            ✓ Weight fluctuates ±1kg daily, track trends
          </Text>
          <Text style={styles.tipItem}>
            ✓ Measure waist monthly for better tracking
          </Text>
          <Text style={styles.tipItem}>
            ✓ Take progress photos every 2 weeks
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

  overviewCard: {
    marginHorizontal: 16,
    backgroundColor: colors.surfaceLight,
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
  },

  overviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },

  overviewBox: {
    alignItems: 'center',
  },

  overviewLabel: {
    fontSize: 11,
    color: colors.textTertiary,
    marginBottom: 4,
  },

  overviewValue: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
  },

  overviewUnit: {
    fontSize: 11,
    color: colors.textSecondary,
  },

  progressBarContainer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  progressBarBackground: {
    height: 12,
    backgroundColor: colors.border,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },

  progressBarFill: {
    height: '100%',
    backgroundColor: colors.success,
    borderRadius: 6,
  },

  progressText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    fontWeight: '600',
  },

  targetText: {
    fontSize: 11,
    color: colors.textTertiary,
    textAlign: 'center',
    marginTop: 4,
  },

  inputCard: {
    marginHorizontal: 16,
  },

  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  inputGroup: {
    flex: 1,
    marginHorizontal: 6,
  },

  notesGroup: {
    marginBottom: 16,
  },

  inputLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 6,
  },

  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.text,
    fontSize: 14,
  },

  notesInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },

  saveButton: {
    backgroundColor: colors.success,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },

  saveButtonText: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 14,
  },

  milestonesCard: {
    marginHorizontal: 16,
  },

  milestoneRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },

  milestoneBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  milestoneWeek: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },

  milestoneSubtext: {
    fontSize: 11,
    color: colors.textTertiary,
    marginTop: 2,
  },

  milestoneRight: {
    alignItems: 'flex-end',
  },

  milestoneWeight: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },

  achieved: {
    fontSize: 11,
    color: colors.success,
    marginTop: 2,
    fontWeight: '600',
  },

  historyCard: {
    marginHorizontal: 16,
  },

  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },

  historyBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  historyDate: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },

  historyDetails: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  historyNotes: {
    fontSize: 11,
    color: colors.textTertiary,
    marginTop: 4,
    fontStyle: 'italic',
  },

  latestBadge: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.accent,
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },

  tipsCard: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: colors.surfaceLight,
  },

  tipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 10,
  },

  tipItem: {
    fontSize: 12,
    color: colors.textSecondary,
    marginVertical: 4,
    lineHeight: 18,
  },
});
