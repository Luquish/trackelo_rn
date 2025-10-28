import React from 'react';
import { YStack, XStack, Text, Card } from 'tamagui';
import Animated, { SlideInRight } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

interface Category {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  amount: number;
}

interface CategoriesCardProps {
  categories: Category[];
  formatValue: (amount: number) => string;
}

export default function CategoriesCard({ categories, formatValue }: CategoriesCardProps) {
  return (
    <Animated.View entering={SlideInRight.delay(600)}>
      <Card elevate padding="$4" backgroundColor="#1a1a1a" borderColor="#2a2a2a" borderWidth={1}>
        <YStack space="$3">
          <XStack alignItems="center" space="$2">
            <Ionicons name="pie-chart" size={24} color="#764ba2" />
            <Text fontSize="$6" fontWeight="600" color="#ffffff">
              Categorías
            </Text>
          </XStack>
          <Text fontSize="$4" color="#a0a0a0">
            Análisis de gastos por categoría
          </Text>
          <YStack space="$2">
            {categories.map((category, index) => (
              <XStack key={index} justifyContent="space-between" alignItems="center">
                <XStack space="$2" alignItems="center">
                  <Ionicons name={category.icon} size={18} color={category.iconColor} />
                  <Text fontSize="$4" color="#a0a0a0">
                    {category.name}
                  </Text>
                </XStack>
                <Text fontSize="$4" fontWeight="600" color="#ffffff">
                  {formatValue(category.amount)}
                </Text>
              </XStack>
            ))}
          </YStack>
        </YStack>
      </Card>
    </Animated.View>
  );
}
