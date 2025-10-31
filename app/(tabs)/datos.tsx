import { ScrollView, YStack } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../components/layout/ScreenHeader';
import CashFlowAreaChart from '../../components/charts/CashFlowAreaChart';
import CategoryBarChart from '../../components/charts/CategoryBarChart';
import SavingsTrendChart from '../../components/charts/SavingsTrendChart';

export default function DatosScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f0f0f' }} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <YStack flex={1} paddingHorizontal="$4" paddingTop="$4" paddingBottom="$4" gap="$4">

          <ScreenHeader
            title="Datos"
            subtitle="Análisis y estadísticas"
          />

          <CashFlowAreaChart />

          <SavingsTrendChart />

          <CategoryBarChart />

        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}

