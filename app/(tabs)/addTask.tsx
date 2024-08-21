import { ScrollView, StyleSheet, TextInput, useColorScheme } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '@/components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function TabTwoScreen() {
  const [newTask, setNewTask] = useState<string>('');
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const addTask = async () => {
    if (newTask.trim()) {
      const storedTasks = await AsyncStorage.getItem('tasks');
      const tasks = storedTasks ? JSON.parse(storedTasks) : [];
      const updatedTasks = [...tasks, newTask];
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setNewTask('');
      navigation.navigate('tasks' as never);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Ajouter une tâche</ThemedText>
        </ThemedView>
        <ThemedView style={styles.taskInputContainer}>
          <TextInput
            style={styles.taskInput}
            value={newTask}
            onChangeText={setNewTask}
            placeholder="Ajouter une nouvelle tâche"
          />
          <Button onPress={addTask} title="Ajouter" />
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flexGrow: 1, 
    justifyContent: 'center', 
    padding: 20,
  },
  titleContainer: {
    marginBottom: 32,
    alignItems: 'center', 
  },
  taskInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  taskInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
  },
});
