import { View, Text, StyleSheet, Pressable, TextInput, ScrollView, Modal } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Image as ImageIcon, ChevronDown } from 'lucide-react-native';
import { useState } from 'react';

const categories = [
  'Одежда',
  'Электроника',
  'Мебель',
  'Книги',
  'Спорт',
  'Детские товары',
  'Другое'
];

export default function AddProductScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [showCategories, setShowCategories] = useState(false);

  const handleSubmit = () => {
    // Здесь будет логика сохранения товара
    console.log({ title, description, price, address, phone, category });
    router.back();
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={showCategories}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCategories(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Выберите категорию</Text>
              <Pressable 
                onPress={() => setShowCategories(false)}
                style={styles.modalCloseButton}
              >
                <Text style={styles.modalCloseText}>Закрыть</Text>
              </Pressable>
            </View>
            <ScrollView style={styles.modalList}>
              {categories.map((cat) => (
                <Pressable
                  key={cat}
                  style={[
                    styles.modalItem,
                    category === cat && styles.modalItemSelected
                  ]}
                  onPress={() => {
                    setCategory(cat);
                    setShowCategories(false);
                  }}
                >
                  <Text style={[
                    styles.modalItemText,
                    category === cat && styles.modalItemTextSelected
                  ]}>{cat}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#0f172a" />
        </Pressable>
        <Text style={styles.headerTitle}>Добавить товар</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <Pressable style={styles.imageUpload}>
            <ImageIcon size={32} color="#64748b" />
            <Text style={styles.imageUploadText}>Добавить фото</Text>
          </Pressable>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Название</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Например: Детский велосипед"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Описание</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Опишите состояние товара, его особенности"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Категория</Text>
            <Pressable 
              style={styles.categorySelector}
              onPress={() => setShowCategories(true)}
            >
              <Text style={[styles.categoryText, !category && styles.placeholderText]}>
                {category || 'Выберите категорию'}
              </Text>
              <ChevronDown size={20} color="#64748b" />
            </Pressable>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Цена</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
              placeholder="Укажите цену или 'Бесплатно'"
              keyboardType="default"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Адрес</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="Укажите адрес, где можно забрать товар"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Телефон</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="+7 (999) 123-45-67"
              keyboardType="phone-pad"
            />
          </View>

          <Pressable style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Опубликовать</Text>
          </Pressable>
        </View>
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
    paddingHorizontal: 16,
    paddingTop: 60,
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
  },
  content: {
    flex: 1,
  },
  form: {
    padding: 16,
    gap: 20,
  },
  imageUpload: {
    height: 200,
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed',
  },
  imageUploadText: {
    marginTop: 8,
    fontSize: 16,
    color: '#64748b',
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0f172a',
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#0f172a',
  },
  textArea: {
    height: 120,
  },
  categorySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
  },
  categoryText: {
    fontSize: 16,
    color: '#0f172a',
  },
  placeholderText: {
    color: '#64748b',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  modalCloseButton: {
    padding: 8,
  },
  modalCloseText: {
    color: '#0891b2',
    fontSize: 16,
    fontWeight: '500',
  },
  modalList: {
    padding: 8,
  },
  modalItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalItemSelected: {
    backgroundColor: '#f0f9ff',
  },
  modalItemText: {
    fontSize: 16,
    color: '#0f172a',
  },
  modalItemTextSelected: {
    color: '#0891b2',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#0891b2',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 