import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, FontSize, FontFamily, BorderRadius, Shadows } from '../constants/theme';

interface DonutChartProps {
  data: { label: string; value: number; color: string }[];
  title: string;
  size?: number;
}

export const DonutChart: React.FC<DonutChartProps> = ({ data, title, size = 140 }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const strokeWidth = 22;

  let cumulativePercentage = 0;

  return (
    <View style={[styles.container, Shadows.small]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.chartRow}>
        <View style={{ width: size, height: size, position: 'relative' }}>
          {/* Background circle */}
          <View
            style={[
              styles.ringBase,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: strokeWidth,
                borderColor: Colors.border,
              },
            ]}
          />
          {/* Segments */}
          {data.map((item, index) => {
            const percentage = total > 0 ? item.value / total : 0;
            const rotation = cumulativePercentage * 360 - 90;
            cumulativePercentage += percentage;

            return (
              <View
                key={index}
                style={[
                  styles.segment,
                  {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    borderWidth: strokeWidth,
                    borderColor: 'transparent',
                    borderTopColor: item.color,
                    borderRightColor: percentage > 0.25 ? item.color : 'transparent',
                    borderBottomColor: percentage > 0.5 ? item.color : 'transparent',
                    borderLeftColor: percentage > 0.75 ? item.color : 'transparent',
                    transform: [{ rotate: `${rotation}deg` }],
                  },
                ]}
              />
            );
          })}
          {/* Center hole */}
          <View
            style={[
              styles.centerHole,
              {
                width: size - strokeWidth * 2,
                height: size - strokeWidth * 2,
                borderRadius: (size - strokeWidth * 2) / 2,
                top: strokeWidth,
                left: strokeWidth,
              },
            ]}
          />
        </View>
        <View style={styles.legend}>
          {data.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: item.color }]} />
              <View style={styles.legendTextWrap}>
                <Text style={styles.legendLabel} numberOfLines={1}>{item.label}</Text>
                <Text style={styles.legendValue}>
                  {total > 0 ? Math.round((item.value / total) * 100) : 0}%
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  title: {
    fontFamily: FontFamily.headingMedium,
    fontSize: FontSize.md,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ringBase: {
    position: 'absolute',
  },
  segment: {
    position: 'absolute',
  },
  centerHole: {
    position: 'absolute',
    backgroundColor: Colors.surface,
  },
  legend: {
    flex: 1,
    marginLeft: Spacing.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: Spacing.sm,
  },
  legendTextWrap: {
    flex: 1,
  },
  legendLabel: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.text,
  },
  legendValue: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
});
