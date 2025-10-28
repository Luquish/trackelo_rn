import React, { useState, useEffect } from 'react';
import { YStack, XStack, Text, Card, Button, Input, Label } from 'tamagui';
import Animated, { RotateInDownLeft } from 'react-native-reanimated';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

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

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskListProps {
  delay?: number;
}

export default function TaskList({ delay = 1000 }: TaskListProps) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  const queryClient = useQueryClient();

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

  const handleCreateTask = () => {
    if (newTaskTitle.trim()) {
      createTaskMutation.mutate(newTaskTitle.trim());
    }
  };

  return (
    <Animated.View entering={RotateInDownLeft.delay(delay)}>
      <Card elevate padding="$4" backgroundColor="#1a1a1a" borderColor="#2a2a2a" borderWidth={1}>
        <YStack space="$3">
          <XStack alignItems="center" space="$2">
            <MaterialIcons name="task-alt" size={24} color="#FF6B35" />
            <Text fontSize="$6" fontWeight="600" color="#ffffff">
              Lista de Tareas
            </Text>
          </XStack>
          <Text fontSize="$4" color="#a0a0a0" lineHeight="$1">
            Datos obtenidos del servidor con React Query:
          </Text>
          {tasksLoading ? (
            <Text fontSize="$4" color="#a0a0a0">Cargando tareas...</Text>
          ) : (
            <YStack space="$2">
              {tasks?.map((task) => (
                <XStack key={task.id} alignItems="center" space="$2">
                  <Ionicons
                    name={task.completed ? "checkmark-circle" : "ellipse-outline"}
                    size={20}
                    color={task.completed ? "#34C759" : "#8E8E93"}
                  />
                  <Text fontSize="$4" color={task.completed ? "#a0a0a0" : "#ffffff"}>
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
  );
}
