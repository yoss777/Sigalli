import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Colors, Spacing, FontSize, FontFamily, BorderRadius, Shadows } from '../constants/theme';

interface LineChartProps {
  data: { label: string; value: number }[];
  title: string;
  height?: number;
  color?: string;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

export const LineChart: React.FC<LineChartProps> = ({ data, title, height = 180, color = Colors.primary }) => {
  const chartWidth = SCREEN_WIDTH - Spacing.lg * 2 - Spacing.md * 2;
  const chartHeight = height - 30;
  const maxValue = Math.max(...data.map(d => d.value), 1);
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;
  const paddingTop = 16;
  const paddingBottom = 8;
  const usableHeight = chartHeight - paddingTop - paddingBottom;

  const points = data.map((item, index) => ({
    x: (index / Math.max(data.length - 1, 1)) * (chartWidth - 20) + 10,
    y: paddingTop + usableHeight - ((item.value - minValue) / range) * usableHeight,
    value: item.value,
    label: item.label,
  }));

  const gridLines = [0, 1, 2, 3].map(i => paddingTop + (usableHeight / 3) * i);

  return (
    <View style={[styles.container, Shadows.small]}>
      <Text style={styles.title}>{title}</Text>
      <View style={[styles.chartArea, { height: chartHeight, width: chartWidth }]}>
        {/* Grid */}
        {gridLines.map((y, i) => (
          <View
            key={`grid-${i}`}
            style={[styles.gridLine, { top: y, width: chartWidth - 20, left: 10 }]}
          />
        ))}

        {/* Area fill */}
        {points.length > 1 && (() => {
          const minY = Math.min(...points.map(p => p.y));
          const maxY = chartHeight - paddingBottom;
          return (
            <View
              style={[
                styles.areaFill,
                {
                  backgroundColor: color + '12',
                  top: minY,
                  height: maxY - minY,
                  left: points[0].x,
                  width: points[points.length - 1].x - points[0].x,
                },
              ]}
            />
          );
        })()}

        {/* Lines between points */}
        {points.map((point, index) => {
          if (index === 0) return null;
          const prev = points[index - 1];
          const dx = point.x - prev.x;
          const dy = point.y - prev.y;
          const length = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);

          return (
            <View
              key={`line-${index}`}
              style={[
                styles.line,
                {
                  width: length,
                  left: prev.x,
                  top: prev.y - 1,
                  backgroundColor: color,
                  transform: [{ rotate: `${angle}deg` }],
                  transformOrigin: 'left center',
                },
              ]}
            />
          );
        })}

        {/* Points */}
        {points.map((point, index) => (
          <React.Fragment key={`point-${index}`}>
            <View
              style={[
                styles.pointOuter,
                {
                  left: point.x - 5,
                  top: point.y - 5,
                  borderColor: color,
                },
              ]}
            />
            <View
              style={[
                styles.pointInner,
                {
                  left: point.x - 3,
                  top: point.y - 3,
                  backgroundColor: color,
                },
              ]}
            />
          </React.Fragment>
        ))}
      </View>

      {/* Labels */}
      <View style={styles.labelsRow}>
        {data
          .filter((_, i) => i % Math.ceil(data.length / 6) === 0 || i === data.length - 1)
          .map((item, index) => (
            <Text key={index} style={styles.label}>
              {item.label.slice(0, 3)}
            </Text>
          ))}
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
    position: 'relative',
    overflow: 'hidden',
  },
  gridLine: {
    position: 'absolute',
    height: 1,
    backgroundColor: Colors.border,
  },
  areaFill: {
    position: 'absolute',
  },
  line: {
    position: 'absolute',
    height: 2.5,
    borderRadius: 1.25,
  },
  pointOuter: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: Colors.surface,
  },
  pointInner: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    paddingHorizontal: 8,
  },
  label: {
    fontFamily: FontFamily.body,
    fontSize: 9,
    color: Colors.textSecondary,
  },
});
