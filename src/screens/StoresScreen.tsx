import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, FontSize, FontFamily, Shadows } from '../constants/theme';
import { stores, revenueByStore, formatCurrency } from '../data/mockData';
import { Store } from '../types';

export const StoresScreen: React.FC = () => {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const activeStores = stores.filter(s => s.isActive);
  const inactiveStores = stores.filter(s => !s.isActive);

  const getStoreRevenue = (storeName: string) => {
    const found = revenueByStore.find(r => r.storeName === storeName);
    return found?.revenue || 0;
  };

  const renderStore = ({ item }: { item: Store }) => {
    const revenue = getStoreRevenue(item.name);
    const isSelected = selectedStore?.id === item.id;

    return (
      <TouchableOpacity
        style={[styles.storeCard, Shadows.small, isSelected && styles.storeCardSelected]}
        onPress={() => setSelectedStore(isSelected ? null : item)}
        activeOpacity={0.7}
      >
        <View style={styles.storeRow}>
          <View style={[styles.storeIcon, { backgroundColor: item.isActive ? Colors.success + '15' : Colors.error + '15' }]}>
            <Ionicons
              name="storefront"
              size={24}
              color={item.isActive ? Colors.success : Colors.error}
            />
          </View>
          <View style={styles.storeInfo}>
            <View style={styles.storeNameRow}>
              <Text style={styles.storeName}>{item.name}</Text>
              <View style={[styles.statusDot, { backgroundColor: item.isActive ? Colors.success : Colors.error }]} />
            </View>
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={14} color={Colors.textSecondary} />
              <Text style={styles.storeLocation}>{item.location}</Text>
            </View>
          </View>
        </View>

        {isSelected && (
          <View style={styles.storeDetails}>
            <View style={styles.detailDivider} />

            <View style={styles.detailGrid}>
              <View style={styles.detailItem}>
                <Ionicons name="cash-outline" size={18} color={Colors.primary} />
                <Text style={styles.detailLabel}>Chiffre d'affaires</Text>
                <Text style={styles.detailValue}>{formatCurrency(revenue)}</Text>
              </View>

              <View style={styles.detailItem}>
                <Ionicons name="navigate-outline" size={18} color={Colors.secondary} />
                <Text style={styles.detailLabel}>Ville</Text>
                <Text style={styles.detailValue}>{item.city}</Text>
              </View>

              <View style={styles.detailItem}>
                <Ionicons name="map-outline" size={18} color={Colors.info} />
                <Text style={styles.detailLabel}>Coordonnées</Text>
                <Text style={styles.detailValueSmall}>
                  {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}
                </Text>
              </View>

              <View style={styles.detailItem}>
                <Ionicons name="checkmark-circle-outline" size={18} color={item.isActive ? Colors.success : Colors.error} />
                <Text style={styles.detailLabel}>Statut</Text>
                <Text style={[styles.detailValue, { color: item.isActive ? Colors.success : Colors.error }]}>
                  {item.isActive ? 'Actif' : 'Inactif'}
                </Text>
              </View>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Magasins</Text>
        <Text style={styles.headerSubtitle}>Réseau de distribution Sigalli</Text>
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, Shadows.small]}>
          <View style={[styles.summaryIcon, { backgroundColor: Colors.success + '15' }]}>
            <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
          </View>
          <Text style={styles.summaryValue}>{activeStores.length}</Text>
          <Text style={styles.summaryLabel}>Actifs</Text>
        </View>
        <View style={[styles.summaryCard, Shadows.small]}>
          <View style={[styles.summaryIcon, { backgroundColor: Colors.error + '15' }]}>
            <Ionicons name="close-circle" size={20} color={Colors.error} />
          </View>
          <Text style={styles.summaryValue}>{inactiveStores.length}</Text>
          <Text style={styles.summaryLabel}>Inactifs</Text>
        </View>
        <View style={[styles.summaryCard, Shadows.small]}>
          <View style={[styles.summaryIcon, { backgroundColor: Colors.primary + '15' }]}>
            <Ionicons name="globe-outline" size={20} color={Colors.primary} />
          </View>
          <Text style={styles.summaryValue}>{new Set(stores.map(s => s.city)).size}</Text>
          <Text style={styles.summaryLabel}>Villes</Text>
        </View>
      </View>

      {/* Store List */}
      <FlatList
        data={stores}
        keyExtractor={(item) => item.id}
        renderItem={renderStore}
        contentContainerStyle={{ paddingHorizontal: Spacing.lg, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.md }} />}
      />
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
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + Spacing.md : 60,
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
  summaryRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
  },
  summaryIcon: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  summaryValue: {
    fontFamily: FontFamily.heading,
    fontSize: FontSize.xl,
    color: Colors.text,
  },
  summaryLabel: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  storeCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  storeCardSelected: {
    borderWidth: 1.5,
    borderColor: Colors.primary + '40',
  },
  storeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  storeInfo: {
    flex: 1,
  },
  storeNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeName: {
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.md,
    color: Colors.text,
    flex: 1,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: Spacing.sm,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  storeLocation: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  storeDetails: {
    marginTop: Spacing.md,
  },
  detailDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginBottom: Spacing.md,
  },
  detailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  detailItem: {
    width: '45%',
    alignItems: 'flex-start',
  },
  detailLabel: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  detailValue: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.md,
    color: Colors.text,
    marginTop: 2,
  },
  detailValueSmall: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.sm,
    color: Colors.text,
    marginTop: 2,
  },
});
