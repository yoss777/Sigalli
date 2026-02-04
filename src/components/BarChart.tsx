import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Colors, Spacing, FontSize, FontFamily, BorderRadius, Shadows } from '../constants/theme';

interface BarChartProps {
  data: { label: string; value: number }[];
  title: string;
  height?: number;
  color?: string;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

export const BarChart: React.FC<BarChartProps> = ({ data, title, height = 200, color = Colors.primary }) => {
  const chartWidth = SCREEN_WIDTH - Spacing.lg * 2 - Spacing.md * 2;
  const maxValue = Math.max(...data.map(d => d.value), 1);
  const barWidth = Math.max(10, (chartWidth - data.length * 4) / data.length);

  return (
    <View style={[styles.container, Shadows.small]}>
      <Text style={styles.title}>{title}</Text>
      <View style={[styles.chartArea, { height }]}>
        <View style={styles.barsRow}>
          {data.map((item, index) => {
            const barHeight = (item.value / maxValue) * (height - 28);
            return (
              <View key={index} style={styles.barCol}>
                <View style={[styles.barWrapper, { height: height - 28 }]}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: barHeight,
                        width: barWidth,
                        backgroundColor: color,
                        opacity: 0.75 + (item.value / maxValue) * 0.25,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.barLabel} numberOfLines={1}>
                  {item.label.slice(0, 3)}
                </Text>
              </View>
            );
          })}
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
  chartArea: {
    justifyContent: 'flex-end',
  },
  barsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flex: 1,
  },
  barCol: {
    flex: 1,
    alignItems: 'center',
  },
  barWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    borderRadius: 4,
    minHeight: 2,
  },
  barLabel: {
    fontFamily: FontFamily.body,
    fontSize: 9,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});
