import React from 'react';
import { YStack, XStack, Text } from 'tamagui';
import { BarChart } from 'react-native-gifted-charts';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

interface MonthData {
  value: number;
  label: string;
  frontColor: string;
  spacing?: number;
  topLabelComponent?: () => JSX.Element;
}

interface PortfolioGrowthChartProps {
  cryptoData?: number[];
  etfData?: number[];
  brokerData?: number[];
  fundData?: number[];
  labels?: string[];
}

// Datos de ejemplo: evolución del valor de cada inversión
const defaultCryptoData = [500, 650, 700, 800, 850, 900];
const defaultEtfData = [800, 850, 900, 950, 1000, 1100];
const defaultBrokerData = [1200, 1300, 1350, 1400, 1450, 1500];
const defaultFundData = [400, 450, 480, 500, 520, 550];
const defaultLabels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];

export default function PortfolioGrowthChart({
  cryptoData = defaultCryptoData,
  etfData = defaultEtfData,
  brokerData = defaultBrokerData,
  fundData = defaultFundData,
  labels = defaultLabels,
}: PortfolioGrowthChartProps) {

  // Crear datos para barras apiladas
  const stackData: MonthData[] = labels.map((label, index) => ({
    label,
    spacing: 2,
    stacks: [
      { value: cryptoData[index], color: '#8b5cf6' },
      { value: etfData[index], color: '#3b82f6' },
      { value: brokerData[index], color: '#f59e0b' },
      { value: fundData[index], color: '#10b981' },
    ],
  })) as any;

  // Calcular totales
  const initialTotal = cryptoData[0] + etfData[0] + brokerData[0] + fundData[0];
  const currentTotal =
    cryptoData[cryptoData.length - 1] +
    etfData[etfData.length - 1] +
    brokerData[brokerData.length - 1] +
    fundData[fundData.length - 1];

  const totalGrowth = currentTotal - initialTotal;
  const totalGrowthPercent = ((totalGrowth / initialTotal) * 100).toFixed(1);

  // Formatear valores para el eje Y
  const formatYLabel = (value: string): string => {
    const num = parseFloat(value);
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}k`;
    }
    return `${num}`;
  };

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
        <XStack alignItems="center" space="$2" marginBottom="$3">
          <Ionicons name="trending-up" size={24} color="#10b981" />
          <Text fontSize="$6" fontWeight="600" color="white">
            Evolución del Portfolio
          </Text>
        </XStack>

        {/* Métricas destacadas */}
        <XStack justifyContent="space-around" marginBottom="$3" paddingVertical="$3" backgroundColor="rgba(16, 185, 129, 0.1)" borderRadius="$4">
          <YStack alignItems="center" gap="$1">
            <Text fontSize="$2" color="rgba(255,255,255,0.6)">
              Valor Actual
            </Text>
            <Text fontSize="$5" fontWeight="bold" color="#10b981">
              ${currentTotal.toLocaleString('es-AR')}
            </Text>
          </YStack>

          <YStack width={1} backgroundColor="rgba(255,255,255,0.2)" />

          <YStack alignItems="center" gap="$1">
            <Text fontSize="$2" color="rgba(255,255,255,0.6)">
              Crecimiento
            </Text>
            <XStack alignItems="center" gap="$1">
              <Ionicons name="arrow-up" size={16} color="#10b981" />
              <Text fontSize="$5" fontWeight="bold" color="#10b981">
                {totalGrowthPercent}%
              </Text>
            </XStack>
          </YStack>
        </XStack>

        {/* Leyenda */}
        <XStack justifyContent="center" gap="$3" marginBottom="$3" flexWrap="wrap">
          <XStack alignItems="center" gap="$1">
            <YStack width={10} height={10} borderRadius="$1" backgroundColor="#8b5cf6" />
            <Text fontSize="$2" color="rgba(255,255,255,0.8)">
              Crypto
            </Text>
          </XStack>
          <XStack alignItems="center" gap="$1">
            <YStack width={10} height={10} borderRadius="$1" backgroundColor="#3b82f6" />
            <Text fontSize="$2" color="rgba(255,255,255,0.8)">
              ETF
            </Text>
          </XStack>
          <XStack alignItems="center" gap="$1">
            <YStack width={10} height={10} borderRadius="$1" backgroundColor="#f59e0b" />
            <Text fontSize="$2" color="rgba(255,255,255,0.8)">
              Broker
            </Text>
          </XStack>
          <XStack alignItems="center" gap="$1">
            <YStack width={10} height={10} borderRadius="$1" backgroundColor="#10b981" />
            <Text fontSize="$2" color="rgba(255,255,255,0.8)">
              Fondo
            </Text>
          </XStack>
        </XStack>

        {/* Gráfico de Barras Apiladas */}
        <YStack paddingVertical="$2">
          <BarChart
            data={stackData}
            height={200}
            width={320}
            barWidth={35}
            noOfSections={4}
            barBorderRadius={4}
            xAxisColor="rgba(255,255,255,0.2)"
            yAxisColor="rgba(255,255,255,0.2)"
            xAxisLabelTextStyle={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: 12,
            }}
            yAxisTextStyle={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: 12,
            }}
            formatYLabel={formatYLabel}
            spacing={40}
            initialSpacing={20}
            endSpacing={20}
            yAxisThickness={0}
            isAnimated
            animationDuration={1000}
            rulesType="solid"
            rulesColor="rgba(255,255,255,0.1)"
            stackData={stackData}
          />
        </YStack>

        {/* Footer con análisis */}
        <YStack marginTop="$3" paddingTop="$3" borderTopWidth={1} borderTopColor="rgba(255,255,255,0.1)" gap="$2">
          {/* Crecimiento absoluto */}
          <XStack justifyContent="space-between" alignItems="center">
            <Text fontSize="$3" color="rgba(255,255,255,0.8)">
              Ganancia Total
            </Text>
            <Text fontSize="$4" fontWeight="600" color="#10b981">
              +${totalGrowth.toLocaleString('es-AR')}
            </Text>
          </XStack>

          {/* Promedio mensual */}
          <XStack justifyContent="space-between" alignItems="center">
            <Text fontSize="$3" color="rgba(255,255,255,0.8)">
              Crecimiento Mensual
            </Text>
            <Text fontSize="$4" fontWeight="600" color="#60a5fa">
              ${(totalGrowth / labels.length).toFixed(0).toLocaleString('es-AR')}
            </Text>
          </XStack>

          {/* Proyección */}
          <YStack
            marginTop="$2"
            padding="$3"
            backgroundColor="rgba(102, 126, 234, 0.1)"
            borderRadius="$4"
            borderWidth={1}
            borderColor="rgba(102, 126, 234, 0.3)"
          >
            <XStack alignItems="center" justifyContent="space-between">
              <XStack alignItems="center" gap="$2">
                <Ionicons name="bulb" size={18} color="#667eea" />
                <Text fontSize="$3" color="rgba(255,255,255,0.8)">
                  Proyección 6 meses
                </Text>
              </XStack>
              <Text fontSize="$4" color="#667eea" fontWeight="bold">
                ${(currentTotal + (totalGrowth / labels.length) * 6).toFixed(0).toLocaleString('es-AR')}
              </Text>
            </XStack>
          </YStack>
        </YStack>
      </YStack>
    </Animated.View>
  );
}
