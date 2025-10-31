import React from 'react';
import { YStack, XStack, Text } from 'tamagui';
import { LineChart } from 'react-native-gifted-charts';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

interface DataPoint {
  value: number;
  label: string;
}

interface InvestmentPerformanceChartProps {
  cryptoData?: DataPoint[];
  etfData?: DataPoint[];
  brokerData?: DataPoint[];
  labels?: string[];
}

// Datos de ejemplo: rendimiento de cada tipo de inversión (índice base 100)
const defaultCryptoData: DataPoint[] = [
  { value: 100, label: 'Ene' },
  { value: 115, label: 'Feb' },
  { value: 108, label: 'Mar' },
  { value: 125, label: 'Abr' },
  { value: 118, label: 'May' },
  { value: 130, label: 'Jun' },
];

const defaultEtfData: DataPoint[] = [
  { value: 100, label: 'Ene' },
  { value: 103, label: 'Feb' },
  { value: 107, label: 'Mar' },
  { value: 109, label: 'Abr' },
  { value: 112, label: 'May' },
  { value: 115, label: 'Jun' },
];

const defaultBrokerData: DataPoint[] = [
  { value: 100, label: 'Ene' },
  { value: 105, label: 'Feb' },
  { value: 103, label: 'Mar' },
  { value: 110, label: 'Abr' },
  { value: 108, label: 'May' },
  { value: 112, label: 'Jun' },
];

export default function InvestmentPerformanceChart({
  cryptoData = defaultCryptoData,
  etfData = defaultEtfData,
  brokerData = defaultBrokerData,
}: InvestmentPerformanceChartProps) {

  // Calcular rendimiento total de cada inversión
  const cryptoReturn = ((cryptoData[cryptoData.length - 1].value - 100) / 100) * 100;
  const etfReturn = ((etfData[etfData.length - 1].value - 100) / 100) * 100;
  const brokerReturn = ((brokerData[brokerData.length - 1].value - 100) / 100) * 100;

  // Determinar mejor performer
  const bestPerformer = Math.max(cryptoReturn, etfReturn, brokerReturn);
  const bestPerformerName =
    bestPerformer === cryptoReturn ? 'Crypto' :
    bestPerformer === etfReturn ? 'ETF' : 'Broker';

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
          <Ionicons name="analytics" size={24} color="#764ba2" />
          <Text fontSize="$6" fontWeight="600" color="white">
            Rendimiento por Activo
          </Text>
        </XStack>

        {/* Leyenda */}
        <XStack justifyContent="center" gap="$4" marginBottom="$3" flexWrap="wrap">
          <XStack alignItems="center" gap="$2">
            <YStack width={12} height={12} borderRadius="$2" backgroundColor="#8b5cf6" />
            <Text fontSize="$3" color="rgba(255,255,255,0.8)">
              Crypto
            </Text>
          </XStack>
          <XStack alignItems="center" gap="$2">
            <YStack width={12} height={12} borderRadius="$2" backgroundColor="#3b82f6" />
            <Text fontSize="$3" color="rgba(255,255,255,0.8)">
              ETF
            </Text>
          </XStack>
          <XStack alignItems="center" gap="$2">
            <YStack width={12} height={12} borderRadius="$2" backgroundColor="#f59e0b" />
            <Text fontSize="$3" color="rgba(255,255,255,0.8)">
              Broker
            </Text>
          </XStack>
        </XStack>

        {/* Gráfico de Líneas Múltiples */}
        <YStack paddingVertical="$2">
          <LineChart
            data={cryptoData}
            data2={etfData}
            data3={brokerData}
            height={200}
            width={320}
            curved
            thickness={2.5}
            color="#8b5cf6"
            color2="#3b82f6"
            color3="#f59e0b"
            hideDataPoints={false}
            dataPointsColor="#8b5cf6"
            dataPointsColor2="#3b82f6"
            dataPointsColor3="#f59e0b"
            dataPointsRadius={4}
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
            spacing={50}
            initialSpacing={10}
            endSpacing={20}
            noOfSections={4}
            yAxisThickness={0}
            rulesType="solid"
            rulesColor="rgba(255,255,255,0.1)"
            animateOnDataChange
            animationDuration={1000}
          />
        </YStack>

        {/* Footer con rendimientos */}
        <YStack marginTop="$3" paddingTop="$3" borderTopWidth={1} borderTopColor="rgba(255,255,255,0.1)" gap="$2">
          {/* Rendimientos individuales */}
          <XStack justifyContent="space-between" alignItems="center">
            <XStack alignItems="center" gap="$2">
              <Ionicons name="logo-bitcoin" size={16} color="#8b5cf6" />
              <Text fontSize="$3" color="rgba(255,255,255,0.8)">
                Crypto
              </Text>
            </XStack>
            <XStack alignItems="center" gap="$1">
              <Ionicons
                name={cryptoReturn >= 0 ? "arrow-up" : "arrow-down"}
                size={14}
                color={cryptoReturn >= 0 ? "#10b981" : "#f87171"}
              />
              <Text
                fontSize="$4"
                fontWeight="600"
                color={cryptoReturn >= 0 ? "#10b981" : "#f87171"}
              >
                {cryptoReturn >= 0 ? '+' : ''}{cryptoReturn.toFixed(1)}%
              </Text>
            </XStack>
          </XStack>

          <XStack justifyContent="space-between" alignItems="center">
            <XStack alignItems="center" gap="$2">
              <Ionicons name="globe" size={16} color="#3b82f6" />
              <Text fontSize="$3" color="rgba(255,255,255,0.8)">
                ETF
              </Text>
            </XStack>
            <XStack alignItems="center" gap="$1">
              <Ionicons
                name={etfReturn >= 0 ? "arrow-up" : "arrow-down"}
                size={14}
                color={etfReturn >= 0 ? "#10b981" : "#f87171"}
              />
              <Text
                fontSize="$4"
                fontWeight="600"
                color={etfReturn >= 0 ? "#10b981" : "#f87171"}
              >
                {etfReturn >= 0 ? '+' : ''}{etfReturn.toFixed(1)}%
              </Text>
            </XStack>
          </XStack>

          <XStack justifyContent="space-between" alignItems="center">
            <XStack alignItems="center" gap="$2">
              <Ionicons name="business" size={16} color="#f59e0b" />
              <Text fontSize="$3" color="rgba(255,255,255,0.8)">
                Broker
              </Text>
            </XStack>
            <XStack alignItems="center" gap="$1">
              <Ionicons
                name={brokerReturn >= 0 ? "arrow-up" : "arrow-down"}
                size={14}
                color={brokerReturn >= 0 ? "#10b981" : "#f87171"}
              />
              <Text
                fontSize="$4"
                fontWeight="600"
                color={brokerReturn >= 0 ? "#10b981" : "#f87171"}
              >
                {brokerReturn >= 0 ? '+' : ''}{brokerReturn.toFixed(1)}%
              </Text>
            </XStack>
          </XStack>

          {/* Mejor performer */}
          <XStack
            alignItems="center"
            justifyContent="center"
            marginTop="$2"
            paddingVertical="$2"
            backgroundColor="rgba(16, 185, 129, 0.1)"
            borderRadius="$3"
            gap="$2"
          >
            <Ionicons name="trophy" size={18} color="#10b981" />
            <Text fontSize="$3" color="rgba(255,255,255,0.8)">
              Mejor rendimiento:
            </Text>
            <Text fontSize="$4" color="#10b981" fontWeight="bold">
              {bestPerformerName} (+{bestPerformer.toFixed(1)}%)
            </Text>
          </XStack>
        </YStack>
      </YStack>
    </Animated.View>
  );
}
