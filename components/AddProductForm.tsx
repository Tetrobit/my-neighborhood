import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Product } from '../types/farmer';

interface AddProductFormProps {
  onSubmit: (product: Omit<Product, 'id' | 'createdAt'>) => void;
}

export const AddProductForm: React.FC<AddProductFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = () => {
    if (!name || !description || !price || !quantity || !unit) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все обязательные поля');
      return;
    }

    const productData = {
      name,
      description,
      price: parseFloat(price),
      quantity: parseFloat(quantity),
      unit,
      imageUrl: imageUrl || undefined,
      farmerId: 'current-farmer-id', // Это должно приходить из контекста авторизации
    };

    onSubmit(productData);
    
    // Очистка формы
    setName('');
    setDescription('');
    setPrice('');
    setQuantity('');
    setUnit('');
    setImageUrl('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Название продукта *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Введите название продукта"
        />

        <Text style={styles.label}>Описание *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Опишите ваш продукт"
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Цена *</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="Введите цену"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Количество *</Text>
        <TextInput
          style={styles.input}
          value={quantity}
          onChangeText={setQuantity}
          placeholder="Введите количество"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Единица измерения *</Text>
        <TextInput
          style={styles.input}
          value={unit}
          onChangeText={setUnit}
          placeholder="кг, шт, л и т.д."
        />

        <Text style={styles.label}>URL изображения</Text>
        <TextInput
          style={styles.input}
          value={imageUrl}
          onChangeText={setImageUrl}
          placeholder="Введите URL изображения"
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Добавить продукт</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#2ecc71',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 