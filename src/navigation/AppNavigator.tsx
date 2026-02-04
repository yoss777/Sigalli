import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet } from 'react-native';
import { Colors, FontFamily, FontSize, Shadows } from '../constants/theme';
import { DashboardScreen } from '../screens/DashboardScreen';
import { ProductsScreen } from '../screens/ProductsScreen';
import { StoresScreen } from '../screens/StoresScreen';
import { AnalyticsScreen } from '../screens/AnalyticsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const tabIcons: Record<string, { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }> = {
  Dashboard: { active: 'home', inactive: 'home-outline' },
  Produits: { active: 'cube', inactive: 'cube-outline' },
  Magasins: { active: 'storefront', inactive: 'storefront-outline' },
  Analytiques: { active: 'bar-chart', inactive: 'bar-chart-outline' },
  Profil: { active: 'person', inactive: 'person-outline' },
};

export const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const icons = tabIcons[route.name];
          return (
            <Ionicons
              name={focused ? icons.active : icons.inactive}
              size={22}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textLight,
        tabBarLabelStyle: {
          fontFamily: FontFamily.bodyMedium,
          fontSize: FontSize.xs,
          marginTop: -2,
        },
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 88 : 65,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          paddingTop: 8,
          ...Shadows.medium,
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Produits" component={ProductsScreen} />
      <Tab.Screen name="Magasins" component={StoresScreen} />
      <Tab.Screen name="Analytiques" component={AnalyticsScreen} />
      <Tab.Screen name="Profil" component={SettingsScreen} />
    </Tab.Navigator>
  );
};
