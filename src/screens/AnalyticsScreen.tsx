import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, FontSize, FontFamily, Shadows } from '../constants/theme';
import { BarChart } from '../components/BarChart';
import { LineChart } from '../components/LineChart';
import { DonutChart } from '../components/DonutChart';
import { monthlyRevenue, revenueByCategory, revenueByStore, topProducts, dailyRevenue, formatCurrency } from '../data/mockData';

type Period = 'week' | 'month' | 'year';

export const AnalyticsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [period, setPeriod] = useState<Period>('month');

  const lineData = monthlyRevenue.map(m => ({
    label: m.month.split(' ')[0],
    value: m.revenue,
  }));

  const barData = monthlyRevenue.map(m => ({
    label: m.month.split(' ')[0],
    value: m.revenue,
  }));

  const donutData = revenueByCategory.map((c, i) => ({
    label: c.category,
    value: c.revenue,
    color: Colors.chartColors[i],
  }));

  const storeDonutData = revenueByStore.slice(0, 5).map((s, i) => ({
    label: s.storeName.replace('Sigalli ', ''),
    value: s.revenue,
    color: Colors.chartColors[i + 3],
  }));

  const dailyBarData = dailyRevenue.map(d => ({
    label: d.day.split(' ')[0],
    value: Object.values(d.products).reduce((a, b) => a + b, 0),
  }));

  const totalRevenue = monthlyRevenue.reduce((sum, m) => sum + m.revenue, 0);
  const avgMonthly = totalRevenue / monthlyRevenue.length;
  const bestMonth = monthlyRevenue.reduce((best, m) => m.revenue > best.revenue ? m : best, monthlyRevenue[0]);

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + Spacing.md }]}>
          <Text style={styles.headerTitle}>Analytiques</Text>
          <Text style={styles.headerSubtitle}>Analyse des performances de vente</Text>
        </View>

        {/* Period Selector */}
        <View style={styles.periodRow}>
          {(['week', 'month', 'year'] as Period[]).map((p) => (
            <TouchableOpacity
              key={p}
              style={[styles.periodBtn, period === p && styles.periodBtnActive]}
              onPress={() => setPeriod(p)}
            >
              <Text style={[styles.periodBtnText, period === p && styles.periodBtnTextActive]}>
                {p === 'week' ? 'Semaine' : p === 'month' ? 'Mois' : 'Année'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* KPI Cards */}
        <View style={styles.kpiRow}>
          <View style={[styles.kpiCard, Shadows.small]}>
            <Ionicons name="trending-up" size={20} color={Colors.success} />
            <Text style={styles.kpiValue}>{formatCurrency(totalRevenue)}</Text>
            <Text style={styles.kpiLabel}>Revenu total</Text>
          </View>
          <View style={[styles.kpiCard, Shadows.small]}>
            <Ionicons name="analytics-outline" size={20} color={Colors.primary} />
            <Text style={styles.kpiValue}>{formatCurrency(avgMonthly)}</Text>
            <Text style={styles.kpiLabel}>Moyenne/mois</Text>
          </View>
        </View>
        <View style={[styles.kpiRow, { marginTop: Spacing.md }]}>
          <View style={[styles.kpiCard, Shadows.small]}>
            <Ionicons name="trophy-outline" size={20} color={Colors.secondary} />
            <Text style={styles.kpiValue}>{formatCurrency(bestMonth.revenue)}</Text>
            <Text style={styles.kpiLabel}>Meilleur mois</Text>
          </View>
          <View style={[styles.kpiCard, Shadows.small]}>
            <Ionicons name="star-outline" size={20} color={Colors.warning} />
            <Text style={styles.kpiValue} numberOfLines={1}>{topProducts[0].name}</Text>
            <Text style={styles.kpiLabel}>Top produit</Text>
          </View>
        </View>

        <View style={{ height: Spacing.lg }} />

        {/* Line Chart - Revenue Trend */}
        <LineChart
          data={lineData}
          title="Tendance des revenus"
          color={Colors.primary}
        />

        {/* Bar Chart - Monthly Revenue */}
        <BarChart
          data={barData}
          title="Revenus par mois"
          color={Colors.secondary}
        />

        {/* Daily Revenue */}
        <BarChart
          data={dailyBarData}
          title="Revenus journaliers (dernière semaine)"
          color={Colors.success}
        />

        {/* Category Distribution */}
        <DonutChart
          data={donutData}
          title="Répartition par catégorie"
        />

        {/* Store Performance */}
        <DonutChart
          data={storeDonutData}
          title="Top 5 Magasins"
          size={140}
        />

        {/* Store Rankings */}
        <View style={[styles.rankingCard, Shadows.small]}>
          <Text style={styles.rankingTitle}>Classement des magasins</Text>
          {revenueByStore.map((store, index) => {
            const maxRev = revenueByStore[0].revenue;
            const percentage = (store.revenue / maxRev) * 100;
            return (
              <View key={index} style={styles.rankingRow}>
                <Text style={styles.rankingIndex}>{index + 1}</Text>
                <View style={styles.rankingInfo}>
                  <View style={styles.rankingNameRow}>
                    <Text style={styles.rankingName} numberOfLines={1}>
                      {store.storeName.replace('Sigalli ', '')}
                    </Text>
                    <Text style={styles.rankingValue}>{formatCurrency(store.revenue)}</Text>
                  </View>
                  <View style={styles.rankingBarBg}>
                    <View style={[styles.rankingBarFill, { width: `${percentage}%`, backgroundColor: Colors.chartColors[index % Colors.chartColors.length] }]} />
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  headerTitle: {
    fontFamily: FontFamily.heading,
    fontSize: FontSize.xxl,
    color: Colors.text,
  },
  headerSubtitle: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  periodRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  periodBtn: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  periodBtnActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  periodBtnText: {
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  periodBtnTextActive: {
    color: Colors.white,
  },
  kpiRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  kpiValue: {
    fontFamily: FontFamily.headingMedium,
    fontSize: FontSize.lg,
    color: Colors.text,
    marginTop: Spacing.sm,
  },
  kpiLabel: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  rankingCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  rankingTitle: {
    fontFamily: FontFamily.headingMedium,
    fontSize: FontSize.md,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  rankingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  rankingIndex: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    width: 24,
  },
  rankingInfo: {
    flex: 1,
  },
  rankingNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  rankingName: {
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.sm,
    color: Colors.text,
    flex: 1,
  },
  rankingValue: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.sm,
    color: Colors.primary,
  },
  rankingBarBg: {
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 3,
  },
  rankingBarFill: {
    height: 6,
    borderRadius: 3,
  },
});
