import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, FontFamily, BorderRadius, Shadows } from '../constants/theme';
import { formatCurrency } from '../data/mockData';

interface HorizontalBarChartProps {
  data: { label: string; value: number; color?: string }[];
  title: string;
  formatValue?: (value: number) => string;
}

export const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
  data,
  title,
  formatValue = formatCurrency,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const maxValue = Math.max(...data.map(d => d.value), 1);
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <View style={[styles.container, Shadows.small]}>
      <View style={styles.headerRow}>
        <Ionicons name="podium-outline" size={18} color={Colors.secondary} />
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Tooltip */}
      {selectedIndex !== null && (
        <View style={styles.tooltip}>
          <Text style={styles.tooltipLabel}>{data[selectedIndex].label}</Text>
          <Text style={styles.tooltipValue}>
            {formatValue(data[selectedIndex].value)} ({Math.round((data[selectedIndex].value / total) * 100)}%)
          </Text>
        </View>
      )}

      {data.map((item, index) => {
        const percentage = (item.value / maxValue) * 100;
        const isSelected = selectedIndex === index;
        const barColor = item.color || Colors.chartColors[index % Colors.chartColors.length];

        return (
          <TouchableOpacity
            key={index}
            style={[styles.row, isSelected && styles.rowSelected]}
            activeOpacity={0.7}
            onPress={() => setSelectedIndex(isSelected ? null : index)}
          >
            <View style={styles.rankBadge}>
              <Text style={[
                styles.rankText,
                { color: index < 3 ? Colors.secondary : Colors.textLight },
              ]}>
                {index + 1}
              </Text>
            </View>
            <View style={styles.barSection}>
              <View style={styles.labelRow}>
                <Text style={[styles.label, isSelected && { fontFamily: FontFamily.bodySemiBold }]} numberOfLines={1}>
                  {item.label.replace('Sigalli ', '')}
                </Text>
                {isSelected && (
                  <Text style={[styles.valueText, { color: barColor }]}>
                    {formatValue(item.value)}
                  </Text>
                )}
              </View>
              <View style={styles.barBackground}>
                <View
                  style={[
                    styles.barFill,
                    {
                      width: `${percentage}%`,
                      backgroundColor: barColor,
                      opacity: isSelected ? 1 : 0.75,
                    },
                  ]}
                />
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  title: {
    fontFamily: FontFamily.headingMedium,
    fontSize: FontSize.md,
    color: Colors.text,
    marginLeft: Spacing.sm,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: BorderRadius.sm,
    marginBottom: 2,
  },
  rowSelected: {
    backgroundColor: Colors.background,
  },
  rankBadge: {
    width: 22,
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  rankText: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.sm,
  },
  barSection: {
    flex: 1,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  label: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.text,
    flex: 1,
  },
  valueText: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.xs,
    marginLeft: Spacing.sm,
  },
  barBackground: {
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
  },
  barFill: {
    height: 8,
    borderRadius: 4,
  },
});
