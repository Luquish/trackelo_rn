import React from 'react';
import { YStack, XStack, Text } from 'tamagui';
import { BarChart } from 'react-native-gifted-charts';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

interface CategoryData {
  value: number;
  label: string;
  frontColor: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

interface CategoryBarChartProps {
  data?: CategoryData[];
}

// Datos de ejemplo: ranking de gastos por categoría
const defaultData: CategoryData[] = [
  { value: 1800, label: 'Alimentación', frontColor: '#f59e0b', icon: 'restaurant' },
  { value: 1500, label: 'Transporte', frontColor: '#3b82f6', icon: 'car' },
  { value: 1200, label: 'Hogar', frontColor: '#10b981', icon: 'home' },
  { value: 900, label: 'Ocio', frontColor: '#8b5cf6', icon: 'game-controller' },
  { value: 600, label: 'Salud', frontColor: '#ef4444', icon: 'medical' },
  { value: 400, label: 'Educación', frontColor: '#06b6d4', icon: 'school' },
];

export default function CategoryBarChart({ data = defaultData }: CategoryBarChartProps) {

  // Ordenar por valor descendente
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  // Calcular total
  const total = sortedData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Animated.View entering={FadeInDown.delay(400)}>
      <YStack
        backgroundColor="#1a1a1a"
        borderRadius="$6"
        padding="$4"
        elevation={4}
        shadowColor="$shadowColor"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.25}
        shadowRadius={4}
      >
        {/* Header */}
        <XStack alignItems="center" space="$2" marginBottom="$3">
          <Ionicons name="list" size={24} color="#764ba2" />
          <Text fontSize="$6" fontWeight="600" color="white">
            Ranking de Gastos
          </Text>
        </XStack>

        {/* Gráfico de Barras */}
        <YStack paddingVertical="$2">
          <BarChart
            data={sortedData}
            height={280}
            width={320}
            barWidth={32}
            noOfSections={4}
            barBorderRadius={6}
            horizontal
            xAxisColor="rgba(255,255,255,0.2)"
            yAxisColor="rgba(255,255,255,0.2)"
            yAxisTextStyle={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: 13,
              fontWeight: '500',
            }}
            xAxisLabelTextStyle={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: 12,
            }}
            spacing={25}
            initialSpacing={15}
            endSpacing={15}
            yAxisThickness={0}
            xAxisThickness={0}
            isAnimated
            animationDuration={1000}
            showFractionalValues={false}
            hideRules
            leftShiftForLabels={5}
            leftShiftForLastIndexTooltip={5}
          />
        </YStack>

        {/* Desglose con iconos y porcentajes */}
        <YStack marginTop="$3" paddingTop="$3" borderTopWidth={1} borderTopColor="rgba(255,255,255,0.1)" space="$2">
          {sortedData.map((item, index) => {
            const percentage = ((item.value / total) * 100).toFixed(1);
            return (
              <XStack key={index} alignItems="center" justifyContent="space-between">
                <XStack alignItems="center" space="$2" flex={1}>
                  {item.icon && (
                    <Ionicons name={item.icon} size={18} color={item.frontColor} />
                  )}
                  <Text fontSize="$3" color="rgba(255,255,255,0.8)" flex={1}>
                    {item.label}
                  </Text>
                </XStack>
                <XStack alignItems="center" space="$3">
                  <Text fontSize="$3" color={item.frontColor} fontWeight="600">
                    {percentage}%
                  </Text>
                  <Text fontSize="$4" color="white" fontWeight="600" minWidth={80} textAlign="right">
                    ${item.value.toLocaleString('es-AR')}
                  </Text>
                </XStack>
              </XStack>
            );
          })}
        </YStack>

        {/* Total */}
        <XStack
          justifyContent="space-between"
          alignItems="center"
          marginTop="$3"
          paddingTop="$3"
          borderTopWidth={1}
          borderTopColor="rgba(255,255,255,0.1)"
        >
          <Text fontSize="$4" color="white" fontWeight="bold">
            Total
          </Text>
          <Text fontSize="$5" color="#667eea" fontWeight="bold">
            ${total.toLocaleString('es-AR')}
          </Text>
        </XStack>
      </YStack>
    </Animated.View>
  );
}
