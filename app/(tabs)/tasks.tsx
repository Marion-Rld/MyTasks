import { FlatList, ScrollView, StyleSheet, TextInput, TouchableOpacity, useColorScheme } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/Button';
import { useIsFocused, useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null); 
  const [editingText, setEditingText] = useState<string>(''); 
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const colorScheme = useColorScheme();

  const loadTasks = async () => {
    const storedTasks = await AsyncStorage.getItem('tasks');
    const loadedTasks = storedTasks ? JSON.parse(storedTasks) : [];
    setTasks(loadedTasks);
  };

  useEffect(() => {
    if (isFocused) {
      loadTasks();
    }
  }, [isFocused]);

  const deleteTask = async (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const editTask = (index: number, text: string) => {
    setEditingIndex(index);
    setEditingText(text);
  };

  const saveTask = async () => {
    if (editingIndex !== null && editingText.trim()) {
      const updatedTasks = tasks.map((task, index) =>
        index === editingIndex ? editingText : task
      );
      setTasks(updatedTasks);
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setEditingIndex(null); 
      setEditingText(''); 
    }
  };
  const renderTask = ({ item, index }: { item: string; index: number }) => (
    <ThemedView style={styles.taskContainer}>
      {editingIndex === index ? (
        <>
          <TextInput
            style={[styles.taskInput, styles.editingTaskInput]}
            value={editingText}
            onChangeText={setEditingText}
            onSubmitEditing={saveTask}
          />
          <Button onPress={saveTask} title="Sauvegarder" /> 
        </>
      ) : (
        <>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => editTask(index, item)}>
            <ThemedText>{item}</ThemedText>
          </TouchableOpacity>
          <Button onPress={() => deleteTask(index)} iconName="trash" />
        </>
      )}
    </ThemedView>
  );
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Vos tâches</ThemedText>
          <Button onPress={() => navigation.navigate('addTask' as never)} iconName="add" />
        </ThemedView>
        <FlatList
          data={tasks}
          renderItem={renderTask}
          keyExtractor={(index) => index.toString()}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
  },
  editingTaskInput: {
    marginRight: 20,
  },
});

