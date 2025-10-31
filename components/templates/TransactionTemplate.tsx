import React, { useState } from 'react';
import { YStack, XStack, Input, Text, Button } from 'tamagui';
import { PortalProvider } from '@tamagui/portal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { AmountInput } from '../forms/AmountInput';
import { CategoryCarousel, Category } from '../forms/CategoryCarousel';

interface TransactionTemplateProps {
  type: 'income' | 'expense' | 'investment';
  currency?: string;
  categories: Category[];
  onSubmit: (data: {
    amount: number;
    category: string;
    note: string;
  }) => void;
  isSubmitting?: boolean;
}

const COLORS = {
  income: '#4ade80',
  expense: '#f87171',
  investment: '#60a5fa',
};

const TITLES = {
  income: 'Nuevo ingreso',
  expense: 'Nuevo gasto',
  investment: 'Nueva inversión',
};

const BUTTON_LABELS = {
  income: 'Agregar Ingreso',
  expense: 'Agregar Gasto',
  investment: 'Agregar Inversión',
};

export function TransactionTemplate({
  type,
  currency = 'ARS',
  categories,
  onSubmit,
  isSubmitting = false,
}: TransactionTemplateProps) {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id || '');
  const [note, setNote] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState(currency);

  const accentColor = COLORS[type];
  const title = TITLES[type];
  const buttonLabel = BUTTON_LABELS[type];

  const handleSubmit = async () => {
    if (!amount || isSubmitting) return;

    // Haptic feedback
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // Submit data
    onSubmit({
      amount: parseFloat(amount),
      category: selectedCategory,
      note,
    });

    // Note: Don't navigate back here - let the onSubmit callback handle it
  };

  const isValid = amount && parseFloat(amount) > 0 && !isSubmitting;

  return (
    <PortalProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0f0f0f' }} edges={['bottom']}>
        <YStack flex={1} paddingTop="$6">

          {/* Header */}
          <Animated.View entering={FadeInDown.delay(100)}>
            <Text
              color="$color"
              fontSize="$5"
              fontWeight="300"
              textAlign="center"
              opacity={0.8}
              marginBottom="$6"
            >
              {title}
            </Text>
          </Animated.View>

          {/* Amount Input */}
          <Animated.View entering={FadeInDown.delay(200)}>
            <AmountInput
              currency={selectedCurrency}
              value={amount}
              onChange={setAmount}
              onCurrencyChange={setSelectedCurrency}
              color={accentColor}
            />
          </Animated.View>

          {/* Category Carousel */}
          <Animated.View entering={FadeInDown.delay(300)}>
            <YStack marginTop="$6" marginBottom="$6">
              <CategoryCarousel
                categories={categories}
                selectedId={selectedCategory}
                onSelect={setSelectedCategory}
                accentColor={accentColor}
              />
            </YStack>
          </Animated.View>

          {/* Note Input */}
          <Animated.View entering={FadeInDown.delay(400)}>
            <YStack paddingHorizontal="$4" space="$2">
              <Input
                value={note}
                onChangeText={setNote}
                placeholder="Agrega contexto o referencia"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
                backgroundColor="rgba(255, 255, 255, 0.03)"
                borderWidth={0}
                color="$color"
                fontSize="$6"
                paddingHorizontal="$4"
                paddingVertical="$4"
                borderRadius="$8"
                multiline
                focusStyle={{
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                }}
              />
            </YStack>
          </Animated.View>

          {/* Spacer */}
          <YStack flex={1} />

          {/* Action Button */}
          <Animated.View entering={FadeInDown.delay(500)}>
            <YStack paddingHorizontal="$4" paddingBottom="$2" space="$2">
              <Button
                backgroundColor={isValid ? accentColor : 'rgba(255, 255, 255, 0.1)'}
                onPress={handleSubmit}
                disabled={!isValid || isSubmitting}
                opacity={isValid ? 1 : 0.5}
                paddingVertical="$3"
                borderRadius="$10"
                borderWidth={0}
                pressStyle={{
                  opacity: 0.8,
                  scale: 0.98,
                }}
              >
                <XStack alignItems="baseline" justifyContent="center" space="$2">
                  <Ionicons name={isSubmitting ? "hourglass" : "add"} size={18} color="white" />
                  <Text
                    color="white"
                    fontSize="$4"
                    fontWeight="600"
                  >
                    {isSubmitting ? 'Guardando...' : buttonLabel}
                  </Text>
                </XStack>
              </Button>

              <Button
                backgroundColor="transparent"
                borderWidth={1}
                borderColor="rgba(255, 255, 255, 0.1)"
                onPress={() => router.back()}
                paddingVertical="$3"
                borderRadius="$10"
                disabled={isSubmitting}
                opacity={isSubmitting ? 0.5 : 1}
                pressStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  scale: 0.98,
                }}
              >
                <Text
                  color="$color"
                  fontSize="$4"
                  fontWeight="600"
                >
                  Cancelar
                </Text>
              </Button>
            </YStack>
          </Animated.View>

        </YStack>
      </SafeAreaView>
    </PortalProvider>
  );
}
