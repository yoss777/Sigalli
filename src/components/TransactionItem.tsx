import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, FontSize, FontFamily } from '../constants/theme';
import { Transaction } from '../types';
import { formatNumber } from '../data/mockData';

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const isSale = transaction.type === 'sale';
  return (
    <View style={styles.container}>
      <View style={[styles.iconWrap, { backgroundColor: isSale ? Colors.success + '15' : Colors.error + '15' }]}>
        <Ionicons
          name={isSale ? 'arrow-up' : 'arrow-down'}
          size={18}
          color={isSale ? Colors.success : Colors.error}
        />
      </View>
      <View style={styles.details}>
        <Text style={styles.productName} numberOfLines={1}>{transaction.productName}</Text>
        <Text style={styles.storeName}>{transaction.storeName}</Text>
      </View>
      <View style={styles.right}>
        <Text style={[styles.amount, { color: isSale ? Colors.success : Colors.error }]}>
          {isSale ? '+' : '-'}{formatNumber(transaction.amount)} F
        </Text>
        <Text style={styles.date}>{transaction.date.split(' ')[1]}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  details: {
    flex: 1,
  },
  productName: {
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.md,
    color: Colors.text,
  },
  storeName: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  right: {
    alignItems: 'flex-end',
  },
  amount: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.md,
  },
  date: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textLight,
    marginTop: 2,
  },
});
