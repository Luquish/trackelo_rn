import React from 'react';
import { ScrollView, YStack, XStack, Text } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

export interface Category {
  id: string;
  name: string;
  icon: string;
  color?: string;
}

interface CategoryCarouselProps {
  categories: Category[];
  selectedId: string;
  onSelect: (id: string) => void;
  accentColor: string;
}

function CategoryCard({
  category,
  isSelected,
  onPress,
  accentColor,
}: {
  category: Category;
  isSelected: boolean;
  onPress: () => void;
  accentColor: string;
}) {
  const scale = useSharedValue(isSelected ? 1.05 : 1);
  const opacity = useSharedValue(isSelected ? 1 : 0.6);

  React.useEffect(() => {
    scale.value = withSpring(isSelected ? 1.05 : 1, {
      damping: 15,
      stiffness: 150,
    });
    opacity.value = withSpring(isSelected ? 1 : 0.6, {
      damping: 15,
      stiffness: 150,
    });
  }, [isSelected]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={animatedStyle}>
        <YStack
          backgroundColor={isSelected ? accentColor : 'rgba(255, 255, 255, 0.05)'}
          borderRadius="$6"
          paddingHorizontal="$4"
          paddingVertical="$5"
          minWidth={120}
          alignItems="center"
          justifyContent="center"
          space="$2"
          borderWidth={1}
          borderColor={isSelected ? accentColor : 'rgba(255, 255, 255, 0.1)'}
          shadowColor={isSelected ? accentColor : 'transparent'}
          shadowOpacity={isSelected ? 0.3 : 0}
          shadowRadius={isSelected ? 10 : 0}
          elevation={isSelected ? 8 : 0}
        >
          <Ionicons
            name={category.icon as any}
            size={28}
            color={isSelected ? 'white' : accentColor}
          />
          <Text
            color={isSelected ? 'white' : '$color'}
            fontSize="$3"
            fontWeight={isSelected ? '600' : '500'}
            textAlign="center"
          >
            {category.name}
          </Text>
        </YStack>
      </Animated.View>
    </Pressable>
  );
}

export function CategoryCarousel({
  categories,
  selectedId,
  onSelect,
  accentColor,
}: CategoryCarouselProps) {
  return (
    <YStack space="$3">
      <Text
        color="$color"
        fontSize="$4"
        fontWeight="400"
        opacity={0.6}
        paddingHorizontal="$4"
      >
        Categoría
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 8,
          gap: 12,
        }}
        snapToInterval={132}
        decelerationRate="fast"
      >
        <XStack space="$3">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isSelected={selectedId === category.id}
              onPress={() => onSelect(category.id)}
              accentColor={accentColor}
            />
          ))}
        </XStack>
      </ScrollView>
    </YStack>
  );
}
