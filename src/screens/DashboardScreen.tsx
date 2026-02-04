import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, FontSize, FontFamily, Shadows } from '../constants/theme';
import { StatCard } from '../components/StatCard';
import { SectionHeader } from '../components/SectionHeader';
import { TransactionItem } from '../components/TransactionItem';
import { BarChart } from '../components/BarChart';
import { DonutChart } from '../components/DonutChart';
import { HorizontalBarChart } from '../components/HorizontalBarChart';
import { dashboardStats, recentTransactions, formatCurrency, monthlyRevenue, revenueByCategory, revenueByStore } from '../data/mockData';

export const DashboardScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const barData = monthlyRevenue.map(m => ({
    label: m.month.split(' ')[0],
    value: m.revenue,
  }));

  const donutData = revenueByCategory.map((c, i) => ({
    label: c.category,
    value: c.revenue,
    color: Colors.chartColors[i],
  }));

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + Spacing.md }]}>
          <View>
            <Text style={styles.greeting}>Bonjour,</Text>
            <Text style={styles.companyName}>Sigalli</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={[styles.notifBadge, Shadows.small]}>
              <Ionicons name="notifications-outline" size={22} color={Colors.text} />
              <View style={styles.badge} />
            </View>
          </View>
        </View>

        {/* Revenue Card */}
        <View style={[styles.revenueCard, Shadows.medium]}>
          <Text style={styles.revenueLabel}>Chiffre d'affaires total</Text>
          <Text style={styles.revenueValue}>{formatCurrency(dashboardStats.totalRevenue)}</Text>
          <View style={styles.growthRow}>
            <Ionicons name="trending-up" size={16} color={Colors.white} />
            <Text style={styles.growthText}>+{dashboardStats.revenueGrowth}% ce mois</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsGrid}>
          <StatCard
            title="Produits"
            value={dashboardStats.totalProducts.toString()}
            icon="cube-outline"
            color={Colors.primary}
          />
          <View style={{ width: Spacing.md }} />
          <StatCard
            title="Magasins"
            value={dashboardStats.totalStores.toString()}
            icon="storefront-outline"
            color={Colors.secondary}
          />
        </View>
        <View style={[styles.statsGrid, { marginTop: Spacing.md }]}>
          <StatCard
            title="Commandes"
            value={dashboardStats.totalOrders.toLocaleString()}
            icon="receipt-outline"
            color={Colors.success}
          />
          <View style={{ width: Spacing.md }} />
          <StatCard
            title="Croissance"
            value={`+${dashboardStats.revenueGrowth}%`}
            icon="trending-up"
            color={Colors.info}
          />
        </View>

        {/* Monthly Revenue Chart */}
        <View style={{ height: Spacing.lg }} />
        <BarChart
          data={barData}
          title="Revenus mensuels"
          color={Colors.primary}
        />

        {/* Category Donut */}
        <DonutChart
          data={donutData}
          title="Revenus par catégorie"
        />

        {/* Store Performance */}
        <HorizontalBarChart
          data={revenueByStore.map(s => ({
            label: s.storeName,
            value: s.revenue,
          }))}
          title="Performance des magasins"
        />

        {/* Top Products */}
        <SectionHeader title="Top Produits" />
        <View style={[styles.topProductsCard, Shadows.small]}>
          {dashboardStats.topProducts.map((product, index) => (
            <View key={index} style={styles.topProductRow}>
              <View style={[styles.rank, { backgroundColor: index < 3 ? Colors.secondary + '15' : Colors.border }]}>
                <Text style={[styles.rankText, { color: index < 3 ? Colors.secondary : Colors.textSecondary }]}>
                  {index + 1}
                </Text>
              </View>
              <View style={styles.topProductInfo}>
                <Text style={styles.topProductName}>{product.name}</Text>
                <Text style={styles.topProductQty}>{product.quantity.toLocaleString()} unités</Text>
              </View>
              <Text style={styles.topProductRevenue}>{formatCurrency(product.revenue)}</Text>
            </View>
          ))}
        </View>

        {/* Recent Transactions */}
        <SectionHeader title="Transactions récentes" actionText="Voir tout" />
        <View style={[styles.transactionsCard, Shadows.small]}>
          {recentTransactions.slice(0, 5).map((tx) => (
            <TransactionItem key={tx.id} transaction={tx} />
          ))}
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
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  greeting: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  companyName: {
    fontFamily: FontFamily.heading,
    fontSize: FontSize.xxl,
    color: Colors.text,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notifBadge: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.error,
  },
  revenueCard: {
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    backgroundColor: Colors.primary,
  },
  revenueLabel: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.md,
    color: Colors.white + 'CC',
    marginBottom: Spacing.xs,
  },
  revenueValue: {
    fontFamily: FontFamily.heading,
    fontSize: FontSize.xxxl,
    color: Colors.white,
    marginBottom: Spacing.sm,
  },
  growthRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  growthText: {
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.sm,
    color: Colors.white + 'DD',
    marginLeft: Spacing.xs,
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
  },
  topProductsCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    marginHorizontal: Spacing.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  topProductRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  rank: {
    width: 28,
    height: 28,
    borderRadius: BorderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  rankText: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.sm,
  },
  topProductInfo: {
    flex: 1,
  },
  topProductName: {
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.md,
    color: Colors.text,
  },
  topProductQty: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  topProductRevenue: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.md,
    color: Colors.primary,
  },
  transactionsCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    marginHorizontal: Spacing.lg,
    overflow: 'hidden',
  },
});
