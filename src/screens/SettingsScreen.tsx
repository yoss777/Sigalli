import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, FontSize, FontFamily, Shadows } from '../constants/theme';

interface SettingItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  color?: string;
  showArrow?: boolean;
  onPress?: () => void;
}

const SettingItem: React.FC<SettingItemProps> = ({ icon, label, value, color = Colors.primary, showArrow = true, onPress }) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress} activeOpacity={0.7}>
    <View style={[styles.settingIcon, { backgroundColor: color + '15' }]}>
      <Ionicons name={icon} size={20} color={color} />
    </View>
    <View style={styles.settingContent}>
      <Text style={styles.settingLabel}>{label}</Text>
      {value && <Text style={styles.settingValue}>{value}</Text>}
    </View>
    {showArrow && <Ionicons name="chevron-forward" size={18} color={Colors.textLight} />}
  </TouchableOpacity>
);

export const SettingsScreen: React.FC = () => {
  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profil</Text>
        </View>

        {/* Profile Card */}
        <View style={[styles.profileCard, Shadows.medium]}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>SG</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Sigalli S.A.</Text>
            <Text style={styles.profileRole}>Administrateur</Text>
            <View style={styles.profileBadge}>
              <Ionicons name="shield-checkmark" size={12} color={Colors.success} />
              <Text style={styles.profileBadgeText}>Compte vérifié</Text>
            </View>
          </View>
        </View>

        {/* Settings Sections */}
        <View style={[styles.section, Shadows.small]}>
          <Text style={styles.sectionTitle}>Compte</Text>
          <SettingItem icon="person-outline" label="Informations du profil" color={Colors.primary} />
          <SettingItem icon="lock-closed-outline" label="Sécurité" color={Colors.secondary} />
          <SettingItem icon="notifications-outline" label="Notifications" value="Activées" color={Colors.info} />
          <SettingItem icon="language-outline" label="Langue" value="Français" color={Colors.success} />
        </View>

        <View style={[styles.section, Shadows.small]}>
          <Text style={styles.sectionTitle}>Application</Text>
          <SettingItem icon="color-palette-outline" label="Apparence" value="Clair" color={Colors.primary} />
          <SettingItem icon="download-outline" label="Export des données" color={Colors.secondary} />
          <SettingItem icon="sync-outline" label="Synchronisation" value="Auto" color={Colors.success} />
        </View>

        <View style={[styles.section, Shadows.small]}>
          <Text style={styles.sectionTitle}>Support</Text>
          <SettingItem icon="help-circle-outline" label="Centre d'aide" color={Colors.info} />
          <SettingItem icon="chatbubble-outline" label="Contacter le support" color={Colors.secondary} />
          <SettingItem icon="document-text-outline" label="Conditions d'utilisation" color={Colors.textSecondary} />
          <SettingItem icon="information-circle-outline" label="À propos" value="v1.0.0" color={Colors.primary} />
        </View>

        <TouchableOpacity style={[styles.logoutBtn, Shadows.small]}>
          <Ionicons name="log-out-outline" size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>Sigalli S.A. - Libreville, Gabon</Text>
        <Text style={styles.footerVersion}>Version 1.0.0 - Développé par Declic Consulting</Text>

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
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + Spacing.md : 60,
    paddingBottom: Spacing.md,
  },
  headerTitle: {
    fontFamily: FontFamily.heading,
    fontSize: FontSize.xxl,
    color: Colors.text,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.white + '25',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  avatarText: {
    fontFamily: FontFamily.heading,
    fontSize: FontSize.xl,
    color: Colors.white,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: FontFamily.heading,
    fontSize: FontSize.xl,
    color: Colors.white,
  },
  profileRole: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.md,
    color: Colors.white + 'CC',
    marginTop: 2,
  },
  profileBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  profileBadgeText: {
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.xs,
    color: Colors.white + 'DD',
    marginLeft: 4,
  },
  section: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.xs,
    color: Colors.textLight,
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.md,
    color: Colors.text,
  },
  settingValue: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.error + '10',
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
  },
  logoutText: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.md,
    color: Colors.error,
    marginLeft: Spacing.sm,
  },
  footer: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.textLight,
    textAlign: 'center',
    marginTop: Spacing.xl,
  },
  footerVersion: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textLight,
    textAlign: 'center',
    marginTop: 4,
  },
});
