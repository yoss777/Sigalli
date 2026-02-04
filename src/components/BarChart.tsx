import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Colors, Spacing, FontSize, FontFamily, BorderRadius, Shadows } from '../constants/theme';
import { formatCurrency } from '../data/mockData';

interface BarChartProps {
  data: { label: string; value: number }[];
  title: string;
  height?: number;
  color?: string;
  formatValue?: (value: number) => string;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

export const BarChart: React.FC<BarChartProps> = ({
  data,
  title,
  height = 200,
  color = Colors.primary,
  formatValue = formatCurrency,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const chartWidth = SCREEN_WIDTH - Spacing.lg * 2 - Spacing.md * 2;
  const maxValue = Math.max(...data.map(d => d.value), 1);
  const barWidth = Math.max(10, (chartWidth - data.length * 4) / data.length);

  return (
    <View style={[styles.container, Shadows.small]}>
      <Text style={styles.title}>{title}</Text>

      {/* Tooltip */}
      {selectedIndex !== null && (
        <View style={styles.tooltip}>
          <Text style={styles.tooltipLabel}>{data[selectedIndex].label}</Text>
          <Text style={styles.tooltipValue}>{formatValue(data[selectedIndex].value)}</Text>
        </View>
      )}

      <View style={[styles.chartArea, { height }]}>
        <View style={styles.barsRow}>
          {data.map((item, index) => {
            const barHeight = (item.value / maxValue) * (height - 28);
            const isSelected = selectedIndex === index;
            return (
              <TouchableOpacity
                key={index}
                style={styles.barCol}
                activeOpacity={0.7}
                onPress={() => setSelectedIndex(isSelected ? null : index)}
              >
                <View style={[styles.barWrapper, { height: height - 28 }]}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: barHeight,
                        width: barWidth,
                        backgroundColor: color,
                        opacity: isSelected ? 1 : 0.65 + (item.value / maxValue) * 0.25,
                      },
                    ]}
                  />
                  {isSelected && (
                    <View style={[styles.selectedIndicator, { backgroundColor: color }]} />
                  )}
                </View>
                <Text
                  style={[
                    styles.barLabel,
                    isSelected && { color: color, fontFamily: FontFamily.bodySemiBold },
                  ]}
                  numberOfLines={1}
                >
                  {item.label.slice(0, 3)}
                </Text>
              </TouchableOpacity>
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
    marginBottom: Spacing.xs,
  },
  tooltip: {
    backgroundColor: Colors.black,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    alignSelf: 'flex-start',
    marginBottom: Spacing.sm,
  },
  tooltipLabel: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.white + 'CC',
  },
  tooltipValue: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.sm,
    color: Colors.white,
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
  selectedIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 3,
  },
  barLabel: {
    fontFamily: FontFamily.body,
    fontSize: 9,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});
