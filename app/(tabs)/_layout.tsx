import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#667eea',
        tabBarInactiveTintColor: '#666666',
        headerShown: true,
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#ffffff',
        tabBarStyle: Platform.select({
          ios: {
            backgroundColor: '#1a1a1a',
            borderTopColor: '#2a2a2a',
            borderTopWidth: 1,
          },
          android: {
            backgroundColor: '#1a1a1a',
            elevation: 8,
            borderTopColor: '#2a2a2a',
            borderTopWidth: 1,
          },
          default: {
            backgroundColor: '#1a1a1a',
            borderTopColor: '#2a2a2a',
            borderTopWidth: 1,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Balance',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="datos"
        options={{
          title: 'Datos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="inversiones"
        options={{
          title: 'Inversiones',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trending-up" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

