import { ScrollView, YStack } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../components/layout/ScreenHeader';
import PortfolioDonutChart from '../../components/charts/PortfolioDonutChart';
import InvestmentPerformanceChart from '../../components/charts/InvestmentPerformanceChart';
import PortfolioGrowthChart from '../../components/charts/PortfolioGrowthChart';

export default function InversionesScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f0f0f' }} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <YStack flex={1} paddingHorizontal="$4" paddingTop="$4" paddingBottom="$4" gap="$4">

          <ScreenHeader
            title="Inversiones"
            subtitle="Gestiona tus inversiones"
          />

          <PortfolioDonutChart />

          <InvestmentPerformanceChart />

          <PortfolioGrowthChart />

        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
