import React, { useState } from 'react';
import { YStack, XStack, Input, Text, Sheet, Button, ScrollView } from 'tamagui';
import { Dimensions } from 'react-native';
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
  
  const screenWidth = Dimensions.get('window').width;
  const renglonWidth = screenWidth * 0.4; // 20% del ancho de la pantalla

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
    // Remover todos los caracteres no numéricos excepto la coma decimal
    const numericValue = text.replace(/[^0-9,]/g, '');
    
    // Si está vacío, devolver vacío
    if (!numericValue) return '';
    
    // Si solo es una coma, devolver vacío
    if (numericValue === ',') return '';
    
    // Separar la parte entera y decimal (usando coma como separador decimal)
    const parts = numericValue.split(',');
    const integerPart = parts[0];
    const decimalPart = parts[1];
    
    // Si no hay parte entera, devolver vacío
    if (!integerPart) return '';
    
    // Formatear la parte entera con separadores de miles (formato argentino)
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
    // Reconstruir el número
    if (decimalPart !== undefined) {
      // Limitar a 2 decimales
      const limitedDecimal = decimalPart.substring(0, 2);
      return `${formattedInteger},${limitedDecimal}`;
    }
    
    return formattedInteger;
  };

  const calculateFontSize = (text: string) => {
    const baseFontSize = 48;
    const minFontSize = 16;
    const maxWidth = renglonWidth;
    
    // Si no hay texto, usar el tamaño base
    if (!text || text === '0') return baseFontSize;
    
    // Calcular el tamaño de fuente basado en la longitud del texto
    const textLength = text.length;
    
    // Reducir el tamaño más agresivamente para números largos
    let fontSize = baseFontSize;
    
    if (textLength > 3) {
      fontSize = baseFontSize - (textLength - 3) * 3;
    }
    
    if (textLength > 6) {
      fontSize = baseFontSize - (textLength - 3) * 4;
    }
    
    if (textLength > 9) {
      fontSize = baseFontSize - (textLength - 3) * 5;
    }
    
    return Math.max(minFontSize, Math.min(fontSize, baseFontSize));
  };

  const handleCurrencySelect = (newCurrency: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCurrencyChange?.(newCurrency);
    setOpen(false);
  };

  return (
    <>
      <YStack alignItems="center" space="$2" paddingVertical="$4">
        {/* Campo de monto con símbolo de moneda */}
        <XStack alignItems="center" justifyContent="center" width="100%">
          {/* Símbolo de moneda a la izquierda del renglón */}
          <Text
            color="$color"
            fontSize={48}
            fontWeight="300"
            opacity={0.7}
            style={{
              position: 'absolute',
              right: screenWidth / 2 + renglonWidth / 2 + 20, // Posiciona a la izquierda del renglón
              textAlign: 'right',
              minWidth: 80, // Ancho mínimo para mantener consistencia
            }}
          >
            {currentCurrency?.symbol || currency}
          </Text>
          
          {/* Input centrado en la pantalla */}
          <Input
            value={value}
            onChangeText={(text) => onChange(formatCurrency(text))}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="0"
            keyboardType="decimal-pad"
            fontSize={calculateFontSize(value)}
            fontWeight="200"
            color="$color"
            backgroundColor="transparent"
            borderWidth={0}
            textAlign="center"
            width={renglonWidth}
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

        {/* Línea divisoria animada - 20% del ancho de pantalla, centrada */}
        <Animated.View
          style={[
            {
              width: renglonWidth,
              height: 1,
              backgroundColor: '#2a2a2a',
              alignSelf: 'center',
            },
            animatedLineStyle,
          ]}
        />

        {/* Botón selector de moneda - centrado */}
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
                    paddingVertical="$6"
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
                    <XStack alignItems="center" justifyContent="center" space="$3" width="100%" minHeight={60}>
                      <Text fontSize="$6">{curr.flag}</Text>
                      <YStack flex={1} justifyContent="center">
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
