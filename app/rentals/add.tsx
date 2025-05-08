import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Home } from 'lucide-react-native';

export default function AddRentalScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState('');

  const handleSave = () => {
    if (!title || !description || !price || !address || !phone) {
      Alert.alert('Заполните все поля');
      return;
    }
    Alert.alert('Квартира добавлена!', 'Ваша квартира появится в списке после модерации.');
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#0f172a" />
        </Pressable>
        <Text style={styles.headerTitle}>Добавить квартиру</Text>
      </View>
      <ScrollView style={styles.form} contentContainerStyle={{ paddingBottom: 32 }}>
        <Text style={styles.label}>Заголовок</Text>
        <TextInput
          style={styles.input}
          placeholder="Например, 2-комнатная у парка"
          value={title}
          onChangeText={setTitle}
        />
        <Text style={styles.label}>Описание</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Опишите квартиру, условия, особенности..."
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <Text style={styles.label}>Цена</Text>
        <TextInput
          style={styles.input}
          placeholder="Например, 25 000 ₽/мес"
          value={price}
          onChangeText={setPrice}
        />
        <Text style={styles.label}>Адрес</Text>
        <TextInput
          style={styles.input}
          placeholder="Улица, дом, район..."
          value={address}
          onChangeText={setAddress}
        />
        <Text style={styles.label}>Телефон</Text>
        <TextInput
          style={styles.input}
          placeholder="Контактный телефон"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <Text style={styles.label}>Ссылка на фото (необязательно)</Text>
        <TextInput
          style={styles.input}
          placeholder="URL фотографии квартиры"
          value={image}
          onChangeText={setImage}
        />
        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Сохранить</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
    flex: 1,
  },
  form: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  label: {
    fontSize: 15,
    color: '#64748b',
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#0f172a',
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  saveButton: {
    backgroundColor: '#0891b2',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 