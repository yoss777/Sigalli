import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Spacing, FontSize, FontFamily, BorderRadius, Shadows } from '../constants/theme';
import { formatCurrency } from '../data/mockData';

interface DonutChartProps {
  data: { label: string; value: number; color: string }[];
  title: string;
  size?: number;
  formatValue?: (value: number) => string;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  title,
  size = 140,
  formatValue = formatCurrency,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
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
            const isSelected = selectedIndex === index;

            return (
              <View
                key={index}
                style={[
                  styles.segment,
                  {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    borderWidth: isSelected ? strokeWidth + 4 : strokeWidth,
                    borderColor: 'transparent',
                    borderTopColor: item.color,
                    borderRightColor: percentage > 0.25 ? item.color : 'transparent',
                    borderBottomColor: percentage > 0.5 ? item.color : 'transparent',
                    borderLeftColor: percentage > 0.75 ? item.color : 'transparent',
                    transform: [{ rotate: `${rotation}deg` }],
                    opacity: selectedIndex !== null && !isSelected ? 0.4 : 1,
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
          >
            {selectedIndex !== null && (
              <>
                <Text style={styles.centerValue}>
                  {Math.round((data[selectedIndex].value / total) * 100)}%
                </Text>
              </>
            )}
          </View>
        </View>
        <View style={styles.legend}>
          {data.map((item, index) => {
            const isSelected = selectedIndex === index;
            return (
              <TouchableOpacity
                key={index}
                style={[styles.legendItem, isSelected && styles.legendItemSelected]}
                activeOpacity={0.7}
                onPress={() => setSelectedIndex(isSelected ? null : index)}
              >
                <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                <View style={styles.legendTextWrap}>
                  <Text
                    style={[styles.legendLabel, isSelected && { fontFamily: FontFamily.bodySemiBold }]}
                    numberOfLines={1}
                  >
                    {item.label}
                  </Text>
                  {isSelected ? (
                    <Text style={[styles.legendValue, { color: item.color }]}>
                      {formatValue(item.value)}
                    </Text>
                  ) : (
                    <Text style={styles.legendValue}>
                      {total > 0 ? Math.round((item.value / total) * 100) : 0}%
                    </Text>
                  )}
                </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerValue: {
    fontFamily: FontFamily.heading,
    fontSize: FontSize.lg,
    color: Colors.text,
  },
  legend: {
    flex: 1,
    marginLeft: Spacing.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: BorderRadius.sm,
  },
  legendItemSelected: {
    backgroundColor: Colors.background,
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
