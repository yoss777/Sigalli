import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, FontSize, FontFamily, Shadows } from '../constants/theme';
import { products } from '../data/mockData';
import { Product, ProductCategory } from '../types';

const categories: ('Tous' | ProductCategory)[] = ['Tous', 'Produits Laitiers', 'Boissons', 'Fromages'];

const categoryIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  'Tous': 'grid-outline',
  'Produits Laitiers': 'water-outline',
  'Boissons': 'beer-outline',
  'Fromages': 'pizza-outline',
};

const categoryColors: Record<string, string> = {
  'Produits Laitiers': '#007AFF',
  'Boissons': '#FF9500',
  'Fromages': '#FF3B30',
};

export const ProductsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState<'Tous' | ProductCategory>('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    let result = products;
    if (selectedCategory !== 'Tous') {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.barcode.includes(q)
      );
    }
    return result;
  }, [selectedCategory, searchQuery]);

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={[styles.productCard, Shadows.small]}
      onPress={() => setSelectedProduct(item)}
      activeOpacity={0.7}
    >
      <View style={[styles.productIcon, { backgroundColor: (categoryColors[item.category] || Colors.primary) + '12' }]}>
        <Ionicons
          name={categoryIcons[item.category] || 'cube-outline'}
          size={28}
          color={categoryColors[item.category] || Colors.primary}
        />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.productBarcode}>{item.barcode}</Text>
        <View style={styles.productMeta}>
          <View style={[styles.categoryBadge, { backgroundColor: (categoryColors[item.category] || Colors.primary) + '15' }]}>
            <Text style={[styles.categoryBadgeText, { color: categoryColors[item.category] || Colors.primary }]}>
              {item.category}
            </Text>
          </View>
          <Text style={styles.productPrice}>{item.price.toLocaleString()} F</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + Spacing.md }]}>
        <Text style={styles.headerTitle}>Produits</Text>
        <Text style={styles.headerSubtitle}>{products.length} produits au catalogue</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, Shadows.small]}>
          <Ionicons name="search-outline" size={20} color={Colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un produit ou code-barres..."
            placeholderTextColor={Colors.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={Colors.textLight} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Chips */}
      <View style={styles.categoryRow}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item}
          contentContainerStyle={{ paddingHorizontal: Spacing.lg }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryChip,
                selectedCategory === item && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(item)}
            >
              <Ionicons
                name={categoryIcons[item]}
                size={16}
                color={selectedCategory === item ? Colors.white : Colors.textSecondary}
                style={{ marginRight: 6 }}
              />
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === item && styles.categoryChipTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Count */}
      <View style={styles.countRow}>
        <Text style={styles.countText}>{filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}</Text>
      </View>

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        contentContainerStyle={{ paddingHorizontal: Spacing.lg, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.md }} />}
      />

      {/* Product Detail Modal */}
      <Modal
        visible={!!selectedProduct}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelectedProduct(null)}
      >
        {selectedProduct && (
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setSelectedProduct(null)}>
                <Ionicons name="close" size={28} color={Colors.text} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Détail produit</Text>
              <View style={{ width: 28 }} />
            </View>

            <View style={styles.modalBody}>
              <View style={[styles.modalProductIcon, { backgroundColor: (categoryColors[selectedProduct.category] || Colors.primary) + '12' }]}>
                <Ionicons
                  name={categoryIcons[selectedProduct.category] || 'cube-outline'}
                  size={48}
                  color={categoryColors[selectedProduct.category] || Colors.primary}
                />
              </View>

              <Text style={styles.modalProductName}>{selectedProduct.name}</Text>

              <View style={[styles.modalCategoryBadge, { backgroundColor: (categoryColors[selectedProduct.category] || Colors.primary) + '15' }]}>
                <Text style={[styles.modalCategoryText, { color: categoryColors[selectedProduct.category] || Colors.primary }]}>
                  {selectedProduct.category}
                </Text>
              </View>

              <View style={styles.modalDetails}>
                <View style={styles.modalDetailRow}>
                  <View style={styles.modalDetailIcon}>
                    <Ionicons name="barcode-outline" size={20} color={Colors.primary} />
                  </View>
                  <View>
                    <Text style={styles.modalDetailLabel}>Code-barres</Text>
                    <Text style={styles.modalDetailValue}>{selectedProduct.barcode}</Text>
                  </View>
                </View>

                <View style={styles.modalDetailRow}>
                  <View style={styles.modalDetailIcon}>
                    <Ionicons name="pricetag-outline" size={20} color={Colors.secondary} />
                  </View>
                  <View>
                    <Text style={styles.modalDetailLabel}>Prix unitaire</Text>
                    <Text style={styles.modalDetailValue}>{selectedProduct.price.toLocaleString()} FCFA</Text>
                  </View>
                </View>

                <View style={styles.modalDetailRow}>
                  <View style={styles.modalDetailIcon}>
                    <Ionicons name="cube-outline" size={20} color={Colors.success} />
                  </View>
                  <View>
                    <Text style={styles.modalDetailLabel}>Unité</Text>
                    <Text style={styles.modalDetailValue}>{selectedProduct.unit}</Text>
                  </View>
                </View>

                <View style={styles.modalDetailRow}>
                  <View style={styles.modalDetailIcon}>
                    <Ionicons name="finger-print-outline" size={20} color={Colors.info} />
                  </View>
                  <View>
                    <Text style={styles.modalDetailLabel}>Référence</Text>
                    <Text style={styles.modalDetailValue}>{selectedProduct.id}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </Modal>
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
    paddingBottom: Spacing.sm,
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
  searchContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontFamily: FontFamily.body,
    fontSize: FontSize.md,
    color: Colors.text,
    marginLeft: Spacing.sm,
  },
  categoryRow: {
    marginBottom: Spacing.sm,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    marginRight: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryChipText: {
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  categoryChipTextActive: {
    color: Colors.white,
  },
  countRow: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  countText: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  productIcon: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.md,
    color: Colors.text,
    marginBottom: 2,
  },
  productBarcode: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.textLight,
    marginBottom: Spacing.sm,
  },
  productMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  categoryBadgeText: {
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.xs,
  },
  productPrice: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.md,
    color: Colors.text,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  modalTitle: {
    fontFamily: FontFamily.headingMedium,
    fontSize: FontSize.lg,
    color: Colors.text,
  },
  modalBody: {
    padding: Spacing.lg,
    alignItems: 'center',
  },
  modalProductIcon: {
    width: 100,
    height: 100,
    borderRadius: BorderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    marginTop: Spacing.lg,
  },
  modalProductName: {
    fontFamily: FontFamily.heading,
    fontSize: FontSize.xl,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  modalCategoryBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.xl,
  },
  modalCategoryText: {
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.sm,
  },
  modalDetails: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    ...Shadows.small,
  },
  modalDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalDetailIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  modalDetailLabel: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  modalDetailValue: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.lg,
    color: Colors.text,
    marginTop: 2,
  },
});
