import { ScrollView, YStack, XStack, Text, Card, Button, Input, Switch, Label } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  FadeInUp,
  BounceIn,
  ZoomIn,
  RotateInDownLeft,
  FlipInEasyX
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useState, useEffect } from 'react';

// Función simulada para obtener tareas
const fetchTasks = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return [
    { id: 1, title: 'Completar diseño UI', completed: false },
    { id: 2, title: 'Implementar animaciones', completed: true },
    { id: 3, title: 'Configurar React Query', completed: true },
    { id: 4, title: 'Agregar gestos', completed: false },
  ];
};

// Función simulada para crear nueva tarea
const createTask = async (title: string) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { id: Date.now(), title, completed: false };
};

export default function ExploreScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  
  const queryClient = useQueryClient();
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
    opacity: opacity.value,
  }));

  const panAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value }
    ],
  }));

  // React Query para obtener tareas
  const { data: tasks, isLoading: tasksLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  // Mutation para crear nueva tarea
  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setNewTaskTitle('');
    },
  });

  // AsyncStorage para favoritos
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem('trackelo_favorites');
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };
    loadFavorites();
  }, []);

  const toggleFavorite = async (item: string) => {
    try {
      const newFavorites = favorites.includes(item)
        ? favorites.filter(fav => fav !== item)
        : [...favorites, item];
      
      setFavorites(newFavorites);
      await AsyncStorage.setItem('trackelo_favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const handleToggle = () => {
    setIsEnabled(!isEnabled);
    rotation.value = withSpring(rotation.value + 180);
    opacity.value = withTiming(isEnabled ? 0.7 : 1, { duration: 300 });
  };

  const handleCreateTask = () => {
    if (newTaskTitle.trim()) {
      createTaskMutation.mutate(newTaskTitle.trim());
    }
  };

  // Gestos con Gesture Handler
  const pan = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd(() => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  const tap = Gesture.Tap()
    .onStart(() => {
      scale.value = withSpring(1.2);
    })
    .onEnd(() => {
      scale.value = withSpring(1);
    });

  const composedGesture = Gesture.Simultaneous(pan, tap);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <YStack flex={1} padding="$4" space="$4">
          <YStack alignItems="center" space="$2">
            <Animated.View entering={FadeInUp.delay(200)}>
              <Text fontSize="$8" fontWeight="bold" color="$color12">
                Explorar 🔍
              </Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(400)}>
              <Text fontSize="$5" color="$color10">
                Descubre más
              </Text>
            </Animated.View>
          </YStack>
          
          <Animated.View entering={BounceIn.delay(600)}>
            <Card elevate padding="$4" backgroundColor="$background">
              <YStack space="$3">
                <Text fontSize="$6" fontWeight="600" color="$color12">
                  Pantalla de Exploración
                </Text>
                <Text fontSize="$4" color="$color10" lineHeight="$1">
                  Aquí puedes agregar contenido para explorar diferentes funcionalidades de tu app usando Tamagui con animaciones de Reanimated y gestos de Gesture Handler.
                </Text>
              </YStack>
            </Card>
          </Animated.View>

          <Animated.View entering={ZoomIn.delay(800)}>
            <Card elevate padding="$4" backgroundColor="$background">
              <YStack space="$3">
                <Text fontSize="$6" fontWeight="600" color="$color12">
                  Componentes Tamagui
                </Text>
                <Text fontSize="$4" color="$color10" lineHeight="$1">
                  Esta app está construida con Tamagui UI, que proporciona componentes universales para web y móvil con animaciones fluidas.
                </Text>
              </YStack>
            </Card>
          </Animated.View>

          {/* Lista de tareas con React Query */}
          <Animated.View entering={RotateInDownLeft.delay(1000)}>
            <Card elevate padding="$4" backgroundColor="$background">
              <YStack space="$3">
                <XStack alignItems="center" space="$2">
                  <MaterialIcons name="task-alt" size={24} color="#FF6B35" />
                  <Text fontSize="$6" fontWeight="600" color="$color12">
                    Lista de Tareas
                  </Text>
                </XStack>
                <Text fontSize="$4" color="$color10" lineHeight="$1">
                  Datos obtenidos del servidor con React Query:
                </Text>
                {tasksLoading ? (
                  <Text fontSize="$4" color="$color10">Cargando tareas...</Text>
                ) : (
                  <YStack space="$2">
                    {tasks?.map((task) => (
                      <XStack key={task.id} alignItems="center" space="$2">
                        <Ionicons 
                          name={task.completed ? "checkmark-circle" : "ellipse-outline"} 
                          size={20} 
                          color={task.completed ? "#34C759" : "#8E8E93"} 
                        />
                        <Text fontSize="$4" color={task.completed ? "$color8" : "$color12"}>
                          {task.title}
                        </Text>
                        <Button 
                          size="$1" 
                          onPress={() => toggleFavorite(task.title)}
                        >
                          <FontAwesome 
                            name={favorites.includes(task.title) ? "heart" : "heart-o"} 
                            size={14} 
                            color={favorites.includes(task.title) ? "#FF3B30" : "#8E8E93"} 
                          />
                        </Button>
                      </XStack>
                    ))}
                  </YStack>
                )}
                
                {/* Crear nueva tarea */}
                <YStack space="$2">
                  <Label htmlFor="newTask">Nueva tarea</Label>
                  <XStack space="$2">
                    <Input 
                      id="newTask"
                      placeholder="Escribe una tarea..."
                      value={newTaskTitle}
                      onChangeText={setNewTaskTitle}
                      flex={1}
                    />
                    <Button 
                      theme="purple" 
                      size="$3" 
                      onPress={handleCreateTask}
                      disabled={createTaskMutation.isPending}
                    >
                      <Text color="white" fontWeight="600">
                        {createTaskMutation.isPending ? "..." : "+"}
                      </Text>
                    </Button>
                  </XStack>
                </YStack>
              </YStack>
            </Card>
          </Animated.View>

          {/* Ejemplo de gestos */}
          <Animated.View entering={FlipInEasyX.delay(1200)}>
            <Card elevate padding="$4" backgroundColor="$background">
              <YStack space="$3">
                <Text fontSize="$6" fontWeight="600" color="$color12">
                  Gestos Interactivos
                </Text>
                <Text fontSize="$4" color="$color10" lineHeight="$1">
                  Toca y arrastra este card para experimentar con Gesture Handler:
                </Text>
                <GestureDetector gesture={composedGesture}>
                  <Animated.View style={panAnimatedStyle}>
                    <Card backgroundColor="$blue4" padding="$3" borderRadius="$4">
                      <Text color="white" textAlign="center" fontWeight="600">
                        🎯 Toca y arrastra
                      </Text>
                    </Card>
                  </Animated.View>
                </GestureDetector>
              </YStack>
            </Card>
          </Animated.View>

          <Animated.View entering={FlipInEasyX.delay(1400)}>
            <XStack space="$3" justifyContent="center" flexWrap="wrap">
              <Button theme="red" size="$2">
                <Text color="white">Rojo</Text>
              </Button>
              <Button theme="yellow" size="$2">
                <Text color="black">Amarillo</Text>
              </Button>
              <Button theme="pink" size="$2">
                <Text color="white">Rosa</Text>
              </Button>
            </XStack>
          </Animated.View>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}

