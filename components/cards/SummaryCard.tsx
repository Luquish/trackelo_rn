import React from 'react';
import { YStack, XStack, Text, Card } from 'tamagui';
import Animated, { SlideInLeft } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

interface SummaryCardProps {
  totalTransactions: number;
  monthlySavings: string;
  formatValue: (amount: number) => string;
}

export default function SummaryCard({ 
  totalTransactions, 
  monthlySavings, 
  formatValue 
}: SummaryCardProps) {
  return (
    <Animated.View entering={SlideInLeft.delay(500)}>
      <Card elevate padding="$4" backgroundColor="#1a1a1a" borderColor="#2a2a2a" borderWidth={1}>
        <YStack space="$3">
          <XStack alignItems="center" space="$2">
            <Ionicons name="analytics" size={24} color="#667eea" />
            <Text fontSize="$6" fontWeight="600" color="#ffffff">
              Resumen Mensual
            </Text>
          </XStack>
          <Text fontSize="$4" color="#a0a0a0">
            Tus finanzas del mes en curso
          </Text>
          <YStack space="$2">
            <XStack justifyContent="space-between">
              <Text fontSize="$4" color="#a0a0a0">
                Total de transacciones
              </Text>
              <Text fontSize="$4" fontWeight="600" color="#ffffff">
                {totalTransactions}
              </Text>
            </XStack>
            <XStack justifyContent="space-between">
              <Text fontSize="$4" color="#a0a0a0">
                Ahorro este mes
              </Text>
              <Text fontSize="$4" fontWeight="600" color="#4ade80">
                {monthlySavings}
              </Text>
            </XStack>
          </YStack>
        </YStack>
      </Card>
    </Animated.View>
  );
}
