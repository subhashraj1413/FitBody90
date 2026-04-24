import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { colors } from '@/constants/colors';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  padding?: number;
}

export const Card: React.FC<CardProps> = ({ children, style, padding = 16 }) => {
  return (
    <View style={[styles.card, { padding }, style]}>
      {children}
    </View>
  );
};

interface StatsBoxProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const StatsBox: React.FC<StatsBoxProps> = ({ label, value, unit = '', icon, style }) => {
  return (
    <View style={[styles.statsBox, style]}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={styles.statsValue}>{value}</Text>
      {unit && <Text style={styles.statsUnit}>{unit}</Text>}
      <Text style={styles.statsLabel}>{label}</Text>
    </View>
  );
};

interface CheckboxProps {
  label: string;
  checked: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onPress, style }) => {
  return (
    <View style={[styles.checkboxContainer, style]}>
      <View style={styles.checkboxOuter}>
        {checked && <View style={styles.checkboxInner} />}
      </View>
      <Text
        style={[styles.checkboxLabel, checked && styles.checkboxLabelChecked]}
        onPress={onPress}
      >
        {label}
      </Text>
    </View>
  );
};

interface ProgressBarProps {
  progress: number; // 0-100
  label?: string;
  showPercentage?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, label, showPercentage = true }) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <View style={styles.progressContainer}>
      {label && <Text style={styles.progressLabel}>{label}</Text>}
      <View style={styles.progressBarBackground}>
        <View
          style={[
            styles.progressBarFill,
            {
              width: `${clampedProgress}%`,
              backgroundColor: clampedProgress < 50 ? colors.warning : colors.success,
            },
          ]}
        />
      </View>
      {showPercentage && <Text style={styles.progressText}>{clampedProgress}%</Text>}
    </View>
  );
};

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, action }) => {
  return (
    <View style={styles.sectionHeader}>
      <View>
        <Text style={styles.sectionTitle}>{title}</Text>
        {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
      </View>
      {action && <View>{action}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },

  statsBox: {
    backgroundColor: colors.surfaceLight,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 6,
  },

  icon: {
    marginBottom: 8,
    fontSize: 24,
  },

  statsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },

  statsUnit: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
  },

  statsLabel: {
    fontSize: 12,
    color: colors.textTertiary,
    textAlign: 'center',
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  checkboxOuter: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  checkboxInner: {
    width: 14,
    height: 14,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },

  checkboxLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
  },

  checkboxLabelChecked: {
    color: colors.text,
    textDecorationLine: 'line-through',
  },

  progressContainer: {
    marginVertical: 8,
  },

  progressLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 6,
  },

  progressBarBackground: {
    height: 8,
    backgroundColor: colors.surfaceLight,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },

  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },

  progressText: {
    fontSize: 12,
    color: colors.textTertiary,
    textAlign: 'right',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingHorizontal: 16,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },

  sectionSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
