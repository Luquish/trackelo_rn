import React, { useState } from 'react';
import { ScrollView, YStack, XStack, Text, Button, Input, TextArea } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, SlideInRight } from 'react-native-reanimated';

// Categorías predefinidas para gastos
const expenseCategories = [
  { id: 'food', name: 'Alimentación', icon: 'restaurant', color: '#f59e0b' },
  { id: 'transport', name: 'Transporte', icon: 'car', color: '#3b82f6' },
  { id: 'home', name: 'Hogar', icon: 'home', color: '#10b981' },
  { id: 'entertainment', name: 'Entretenimiento', icon: 'game-controller', color: '#ec4899' },
  { id: 'health', name: 'Salud', icon: 'medical', color: '#ef4444' },
  { id: 'education', name: 'Educación', icon: 'school', color: '#8b5cf6' },
  { id: 'shopping', name: 'Compras', icon: 'bag', color: '#f97316' },
  { id: 'other', name: 'Otro', icon: 'add-circle', color: '#6b7280' },
];

export default function AddExpenseScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('food');

  const handleSave = () => {
    // TODO: Implementar lógica para guardar el gasto
    console.log('Guardando gasto:', {
      amount: parseFloat(amount),
      title,
      description,
      category: selectedCategory,
      type: 'expense'
    });
    
    // Navegar de vuelta a la pantalla principal
    router.back();
  };

  const formatCurrency = (value: string) => {
    // Remover caracteres no numéricos excepto el punto decimal
    const numericValue = value.replace(/[^0-9.]/g, '');
    return numericValue;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f0f0f' }} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <YStack flex={1} paddingHorizontal="$4" paddingTop="$4" space="$4">
          
          {/* Monto */}
          <Animated.View entering={FadeInDown.delay(100)}>
            <YStack space="$2">
              <Text color="$color" fontSize="$4" fontWeight="600">
                Monto
              </Text>
              <XStack alignItems="center" space="$2">
                <Text color="$color" fontSize="$6" fontWeight="bold">
                  $
                </Text>
                <Input
                  flex={1}
                  value={amount}
                  onChangeText={(text) => setAmount(formatCurrency(text))}
                  placeholder="0.00"
                  keyboardType="numeric"
                  fontSize="$6"
                  fontWeight="bold"
                  borderColor="$borderColor"
                  backgroundColor="$background"
                  color="$color"
                />
              </XStack>
            </YStack>
          </Animated.View>

          {/* Título */}
          <Animated.View entering={FadeInDown.delay(200)}>
            <YStack space="$2">
              <Text color="$color" fontSize="$4" fontWeight="600">
                Título
              </Text>
              <Input
                value={title}
                onChangeText={setTitle}
                placeholder="Ej: Supermercado"
                borderColor="$borderColor"
                backgroundColor="$background"
                color="$color"
              />
            </YStack>
          </Animated.View>

          {/* Categorías */}
          <Animated.View entering={FadeInDown.delay(300)}>
            <YStack space="$3">
              <Text color="$color" fontSize="$4" fontWeight="600">
                Categoría
              </Text>
              <YStack space="$2">
                {expenseCategories.map((category, index) => (
                  <Animated.View 
                    key={category.id}
                    entering={SlideInRight.delay(400 + index * 100)}
                  >
                    <Button
                      variant={selectedCategory === category.id ? "outlined" : "outlined"}
                      backgroundColor={selectedCategory === category.id ? category.color : "transparent"}
                      borderColor={category.color}
                      onPress={() => setSelectedCategory(category.id)}
                      justifyContent="flex-start"
                      paddingHorizontal="$4"
                      paddingVertical="$3"
                    >
                      <XStack alignItems="center" space="$3">
                        <Ionicons 
                          name={category.icon as any} 
                          size={20} 
                          color={selectedCategory === category.id ? "white" : category.color} 
                        />
                        <Text 
                          color={selectedCategory === category.id ? "white" : category.color}
                          fontWeight="600"
                        >
                          {category.name}
                        </Text>
                      </XStack>
                    </Button>
                  </Animated.View>
                ))}
              </YStack>
            </YStack>
          </Animated.View>

          {/* Descripción */}
          <Animated.View entering={FadeInDown.delay(500)}>
            <YStack space="$2">
              <Text color="$color" fontSize="$4" fontWeight="600">
                Descripción (Opcional)
              </Text>
              <TextArea
                value={description}
                onChangeText={setDescription}
                placeholder="Agregar detalles adicionales..."
                borderColor="$borderColor"
                backgroundColor="$background"
                color="$color"
                minHeight={80}
              />
            </YStack>
          </Animated.View>

          {/* Botones */}
          <Animated.View entering={FadeInDown.delay(600)}>
            <YStack space="$3" paddingTop="$4">
              <Button
                backgroundColor="#f87171"
                onPress={handleSave}
                disabled={!amount || !title}
                opacity={(!amount || !title) ? 0.5 : 1}
                paddingVertical="$3"
              >
                <Text color="white" fontSize="$4" fontWeight="600">
                  Agregar Gasto
                </Text>
              </Button>
              
              <Button
                variant="outlined"
                borderColor="$borderColor"
                onPress={() => router.back()}
                paddingVertical="$3"
              >
                <Text color="$color" fontSize="$4" fontWeight="600">
                  Cancelar
                </Text>
              </Button>
            </YStack>
          </Animated.View>

        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
