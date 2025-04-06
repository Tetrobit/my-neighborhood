import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Farmer } from '../types/farmer';

interface AddFarmFormProps {
  onSubmit: (farm: Omit<Farmer, 'id' | 'products'>) => void;
}

export function AddFarmForm({ onSubmit }: AddFarmFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = () => {
    if (!name || !description || !location) {
      // В реальном приложении здесь будет валидация
      return;
    }

    onSubmit({
      name,
      description,
      location,
      rating: 0,
      imageUrl: imageUrl || undefined,
    });

    // Очищаем форму
    setName('');
    setDescription('');
    setLocation('');
    setImageUrl('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Добавить ферму</Text>
      
      <Text style={styles.label}>Название фермы</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Введите название фермы"
      />

      <Text style={styles.label}>Описание</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Опишите вашу ферму"
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Местоположение</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Укажите местоположение фермы"
      />

      <Text style={styles.label}>URL изображения (необязательно)</Text>
      <TextInput
        style={styles.input}
        value={imageUrl}
        onChangeText={setImageUrl}
        placeholder="Введите URL изображения фермы"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Добавить ферму</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#0f172a',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#0f172a',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#2ecc71',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 