import React from 'react';
import { YStack, XStack, Text } from 'tamagui';
import { PieChart } from 'react-native-gifted-charts';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

interface CategoryData {
  value: number;
  color: string;
  text?: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

interface ExpensesDonutChartProps {
  data?: CategoryData[];
  totalExpenses?: number;
}

// Datos de ejemplo: distribución de gastos por categoría
const defaultData: CategoryData[] = [
  { value: 1200, color: '#f59e0b', label: 'Alimentación', icon: 'restaurant' },
  { value: 800, color: '#3b82f6', label: 'Transporte', icon: 'car' },
  { value: 600, color: '#10b981', label: 'Hogar', icon: 'home' },
  { value: 400, color: '#8b5cf6', label: 'Ocio', icon: 'game-controller' },
  { value: 200, color: '#ef4444', label: 'Salud', icon: 'medical' },
];

export default function ExpensesDonutChart({
  data = defaultData,
  totalExpenses = defaultData.reduce((sum, item) => sum + item.value, 0)
}: ExpensesDonutChartProps) {

  // Calcular porcentajes
  const dataWithPercentage = data.map(item => ({
    ...item,
    text: `${((item.value / totalExpenses) * 100).toFixed(1)}%`,
  }));

  return (
    <Animated.View entering={FadeInDown.delay(500)}>
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
        <XStack alignItems="center" space="$2" marginBottom="$4">
          <Ionicons name="pie-chart" size={24} color="#764ba2" />
          <Text fontSize="$6" fontWeight="600" color="white">
            Gastos por Categoría
          </Text>
        </XStack>

        {/* Gráfico y Leyenda */}
        <XStack justifyContent="space-between" alignItems="center">
          {/* Donut Chart */}
          <YStack alignItems="center">
            <PieChart
              data={dataWithPercentage}
              donut
              radius={80}
              innerRadius={55}
              centerLabelComponent={() => (
                <YStack alignItems="center">
                  <Text fontSize="$2" color="rgba(255,255,255,0.6)">
                    Total
                  </Text>
                  <Text fontSize="$5" fontWeight="bold" color="white">
                    ${totalExpenses.toLocaleString('es-AR')}
                  </Text>
                </YStack>
              )}
              showText
              textColor="white"
              textSize={12}
              fontWeight="bold"
            />
          </YStack>

          {/* Leyenda */}
          <YStack space="$2" flex={1} paddingLeft="$4">
            {dataWithPercentage.map((item, index) => (
              <XStack key={index} alignItems="center" space="$2">
                <YStack
                  width={12}
                  height={12}
                  borderRadius="$2"
                  backgroundColor={item.color}
                />
                <Ionicons name={item.icon} size={16} color={item.color} />
                <YStack flex={1}>
                  <Text fontSize="$3" color="white" fontWeight="500">
                    {item.label}
                  </Text>
                  <XStack space="$2">
                    <Text fontSize="$2" color="rgba(255,255,255,0.6)">
                      ${item.value.toLocaleString('es-AR')}
                    </Text>
                    <Text fontSize="$2" color={item.color} fontWeight="600">
                      {item.text}
                    </Text>
                  </XStack>
                </YStack>
              </XStack>
            ))}
          </YStack>
        </XStack>

        {/* Footer con categoría mayor */}
        <YStack marginTop="$4" paddingTop="$3" borderTopWidth={1} borderTopColor="rgba(255,255,255,0.1)">
          <XStack alignItems="center" justifyContent="center" space="$2">
            <Ionicons name="alert-circle-outline" size={16} color="#f59e0b" />
            <Text fontSize="$3" color="rgba(255,255,255,0.8)">
              Mayor gasto:
            </Text>
            <Text fontSize="$3" color={dataWithPercentage[0].color} fontWeight="600">
              {dataWithPercentage[0].label}
            </Text>
            <Text fontSize="$3" color="rgba(255,255,255,0.6)">
              ({dataWithPercentage[0].text})
            </Text>
          </XStack>
        </YStack>
      </YStack>
    </Animated.View>
  );
}
