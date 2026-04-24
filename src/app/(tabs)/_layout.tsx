import { Tabs } from 'expo-router';
import { ChartNoAxesCombined, Dumbbell, House, Salad, Target } from 'lucide-react-native';
import React from 'react';

import { colors } from '@/src/theme/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.redBright,
        tabBarInactiveTintColor: '#555555',
        tabBarStyle: {
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: 20,
          height: 68,
          borderRadius: 30,
          backgroundColor: 'rgba(16,16,16,0.97)',
          borderTopWidth: 0,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.07)',
          paddingTop: 8,
          paddingBottom: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.55,
          shadowRadius: 24,
          elevation: 20,
        },
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '800',
          letterSpacing: 0.3,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <House color={color} size={size - 2} />,
        }}
      />
      <Tabs.Screen
        name="workout"
        options={{
          title: 'Train',
          tabBarIcon: ({ color, size }) => <Dumbbell color={color} size={size - 2} />,
        }}
      />
      <Tabs.Screen
        name="nutrition"
        options={{
          title: 'Fuel',
          tabBarIcon: ({ color, size }) => <Salad color={color} size={size - 2} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Stats',
          tabBarIcon: ({ color, size }) => <ChartNoAxesCombined color={color} size={size - 2} />,
        }}
      />
      <Tabs.Screen
        name="plan"
        options={{
          title: 'Plan',
          tabBarIcon: ({ color, size }) => <Target color={color} size={size - 2} />,
        }}
      />
    </Tabs>
  );
}
