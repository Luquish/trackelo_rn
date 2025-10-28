import React from 'react';
import { YStack, XStack, Text, Button } from 'tamagui';
import { LinearGradient } from '@tamagui/linear-gradient';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

interface BalanceData {
  netBalance: number;
  income: number;
  expenses: number;
  investment: number;
}

interface BalanceCardProps {
  balanceData: BalanceData;
  isBalanceVisible: boolean;
  onToggleVisibility: () => void;
  formatValue: (amount: number) => string;
}

export default function BalanceCard({ 
  balanceData, 
  isBalanceVisible, 
  onToggleVisibility, 
  formatValue 
}: BalanceCardProps) {
  return (
    <Animated.View entering={FadeInDown.delay(300)}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        start={[0, 0]}
        end={[1, 1]}
        borderRadius="$6"
        padding="$5"
        elevation={8}
        shadowColor="$shadowColor"
        shadowOffset={{ width: 0, height: 4 }}
        shadowOpacity={0.3}
        shadowRadius={8}
      >
        <YStack space="$4">
          {/* Balance Neto */}
          <YStack space="$2">
            <XStack alignItems="center" justifyContent="space-between">
              <XStack alignItems="center" space="$2">
                <Ionicons name="wallet" size={20} color="rgba(255,255,255,0.9)" />
                <Text fontSize="$4" color="rgba(255,255,255,0.9)" fontWeight="500">
                  Balance Neto
                </Text>
              </XStack>
              <Button
                size="$3"
                circular
                chromeless
                onPress={onToggleVisibility}
                icon={
                  <Ionicons
                    name={isBalanceVisible ? "eye" : "eye-off"}
                    size={20}
                    color="rgba(255,255,255,0.9)"
                  />
                }
                accessibilityLabel={isBalanceVisible ? "Ocultar balance" : "Mostrar balance"}
                accessibilityRole="button"
                aria-pressed={!isBalanceVisible}
              />
            </XStack>
            <Animated.View entering={FadeIn.duration(200)}>
              <Text fontSize="$10" fontWeight="bold" color="white">
                {formatValue(balanceData.netBalance)}
              </Text>
            </Animated.View>
          </YStack>

          {/* Divisor */}
          <YStack height={1} backgroundColor="rgba(255,255,255,0.2)" />

          {/* Métricas Financieras */}
          <XStack justifyContent="space-between">
            {/* Ingresos */}
            <YStack flex={1} space="$1">
              <XStack alignItems="center" space="$1">
                <Ionicons name="arrow-down-circle" size={16} color="#4ade80" />
                <Text fontSize="$2" color="rgba(255,255,255,0.8)">
                  Ingresos
                </Text>
              </XStack>
              <Text fontSize="$5" fontWeight="600" color="white">
                {formatValue(balanceData.income)}
              </Text>
            </YStack>

            {/* Gastos */}
            <YStack flex={1} space="$1" alignItems="center">
              <XStack alignItems="center" space="$1">
                <Ionicons name="arrow-up-circle" size={16} color="#f87171" />
                <Text fontSize="$2" color="rgba(255,255,255,0.8)">
                  Gastos
                </Text>
              </XStack>
              <Text fontSize="$5" fontWeight="600" color="white">
                {formatValue(balanceData.expenses)}
              </Text>
            </YStack>

            {/* Aportes Inversión */}
            <YStack flex={1} space="$1" alignItems="flex-end">
              <XStack alignItems="center" space="$1">
                <Ionicons name="trending-up" size={16} color="#60a5fa" />
                <Text fontSize="$2" color="rgba(255,255,255,0.8)">
                  Inversión
                </Text>
              </XStack>
              <Text fontSize="$5" fontWeight="600" color="white">
                {formatValue(balanceData.investment)}
              </Text>
            </YStack>
          </XStack>
        </YStack>
      </LinearGradient>
    </Animated.View>
  );
}
