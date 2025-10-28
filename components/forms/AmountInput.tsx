import React, { useState } from 'react';
import { YStack, XStack, Input, Text, Sheet, Button, ScrollView } from 'tamagui';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { currencies, getCurrencyByCode } from '../../constants/currencies';
import * as Haptics from 'expo-haptics';

interface AmountInputProps {
  currency: string;
  value: string;
  onChange: (value: string) => void;
  onCurrencyChange?: (currency: string) => void;
  color?: string;
}

export function AmountInput({
  currency = 'ARS',
  value,
  onChange,
  onCurrencyChange,
  color = '#667eea'
}: AmountInputProps) {
  const isFocused = useSharedValue(0);
  const [open, setOpen] = useState(false);

  const currentCurrency = getCurrencyByCode(currency);

  const animatedLineStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        isFocused.value,
        [0, 1],
        ['#2a2a2a', color]
      ),
      shadowColor: color,
      shadowOpacity: withTiming(isFocused.value * 0.5, { duration: 300 }),
      shadowRadius: withTiming(isFocused.value * 10, { duration: 300 }),
      elevation: withTiming(isFocused.value * 8, { duration: 300 }),
    };
  });

  const handleFocus = () => {
    isFocused.value = withTiming(1, { duration: 300 });
  };

  const handleBlur = () => {
    isFocused.value = withTiming(0, { duration: 300 });
  };

  const formatCurrency = (text: string) => {
    const numericValue = text.replace(/[^0-9.]/g, '');
    return numericValue;
  };

  const handleCurrencySelect = (newCurrency: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCurrencyChange?.(newCurrency);
    setOpen(false);
  };

  return (
    <>
      <YStack alignItems="center" space="$4" paddingVertical="$4">
        {/* Campo de monto con símbolo de moneda */}
        <XStack alignItems="baseline" justifyContent="center" space="$3">
          <Text
            color="$color"
            fontSize={48}
            fontWeight="300"
            opacity={0.7}
          >
            {currentCurrency?.symbol || currency}
          </Text>
          <Input
            value={value}
            onChangeText={(text) => onChange(formatCurrency(text))}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="0"
            keyboardType="numeric"
            fontSize={64}
            fontWeight="200"
            color="$color"
            backgroundColor="transparent"
            borderWidth={0}
            textAlign="left"
            width={200}
            paddingHorizontal={0}
            focusStyle={{
              borderWidth: 0,
              outlineWidth: 0,
            }}
            style={{
              outlineStyle: 'none' as any,
            }}
          />
        </XStack>

        {/* Línea divisoria animada */}
        <Animated.View
          style={[
            {
              width: 200,
              height: 1,
              backgroundColor: '#2a2a2a',
              marginLeft: 60,
            },
            animatedLineStyle,
          ]}
        />

        {/* Botón selector de moneda */}
        <Button
          onPress={() => setOpen(true)}
          backgroundColor="rgba(255, 255, 255, 0.05)"
          borderRadius="$10"
          paddingHorizontal="$4"
          paddingVertical="$2"
          borderWidth={1}
          borderColor="rgba(255, 255, 255, 0.1)"
          pressStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderColor: 'rgba(255, 255, 255, 0.2)',
          }}
        >
          <XStack alignItems="center" space="$2">
            <Text color="$color" fontSize="$3" fontWeight="500" opacity={0.8}>
              {currentCurrency?.flag} {currency}
            </Text>
            <Ionicons name="chevron-down" size={16} color="rgba(255, 255, 255, 0.6)" />
          </XStack>
        </Button>
      </YStack>

      {/* Sheet modal para selección de moneda */}
      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        snapPoints={[85]}
        dismissOnSnapToBottom
        zIndex={100000}
        animation="medium"
      >
        <Sheet.Overlay
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          backgroundColor="rgba(0, 0, 0, 0.5)"
        />
        <Sheet.Frame
          backgroundColor="#1a1a1a"
          borderTopLeftRadius="$6"
          borderTopRightRadius="$6"
          padding="$4"
        >
          <Sheet.Handle backgroundColor="rgba(255, 255, 255, 0.2)" />

          <YStack space="$4" paddingTop="$4">
            <Text
              color="$color"
              fontSize="$6"
              fontWeight="600"
              textAlign="center"
            >
              Seleccionar Moneda
            </Text>

            <ScrollView maxHeight={500} showsVerticalScrollIndicator={false}>
              <YStack space="$2">
                {currencies.map((curr) => (
                  <Button
                    key={curr.code}
                    onPress={() => handleCurrencySelect(curr.code)}
                    backgroundColor={
                      currency === curr.code
                        ? color
                        : 'rgba(255, 255, 255, 0.05)'
                    }
                    borderRadius="$4"
                    paddingVertical="$3"
                    paddingHorizontal="$4"
                    borderWidth={1}
                    borderColor={
                      currency === curr.code
                        ? color
                        : 'rgba(255, 255, 255, 0.1)'
                    }
                    pressStyle={{
                      opacity: 0.8,
                      scale: 0.98,
                    }}
                  >
                    <XStack alignItems="center" space="$3" width="100%">
                      <Text fontSize="$6">{curr.flag}</Text>
                      <YStack flex={1}>
                        <Text
                          color={currency === curr.code ? 'white' : '$color'}
                          fontSize="$4"
                          fontWeight="500"
                        >
                          {curr.name}
                        </Text>
                        <Text
                          color={currency === curr.code ? 'white' : '$color'}
                          fontSize="$2"
                          opacity={0.6}
                        >
                          {curr.code} • {curr.symbol}
                        </Text>
                      </YStack>
                      {currency === curr.code && (
                        <Ionicons name="checkmark-circle" size={24} color="white" />
                      )}
                    </XStack>
                  </Button>
                ))}
              </YStack>
            </ScrollView>
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </>
  );
}
