import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { ProductList } from '../../components/ProductList';
import { AddProductForm } from '../../components/AddProductForm';
import { AddFarmForm } from '../../components/AddFarmForm';
import { Product, Farmer } from '../../types/farmer';

// Временные данные для демонстрации
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Свежие помидоры',
    description: 'Спелые, сочные помидоры, выращенные без химикатов',
    price: 150,
    quantity: 100,
    unit: 'кг',
    farmerId: '1',
    imageUrl: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Огурцы',
    description: 'Хрустящие огурцы из теплицы',
    price: 120,
    quantity: 80,
    unit: 'кг',
    farmerId: '1',
    imageUrl: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    createdAt: new Date(),
  },
];

export default function FarmerDashboard() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddFarmForm, setShowAddFarmForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'farm'>('products');

  const handleAddProduct = (newProduct: Omit<Product, 'id' | 'createdAt'>) => {
    const product: Product = {
      ...newProduct,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setProducts([...products, product]);
    setShowAddForm(false);
  };

  const handleAddFarm = (newFarm: Omit<Farmer, 'id' | 'products'>) => {
    // В реальном приложении здесь будет логика сохранения фермы
    console.log('Новая ферма:', newFarm);
    setShowAddFarmForm(false);
  };

  const handleProductPress = (product: Product) => {
    // Здесь будет логика редактирования продукта
    console.log('Редактирование продукта:', product);
  };

  const handleBackPress = () => {
    // Возвращаемся в личный кабинет
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <ChevronLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Управление фермой</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'products' && styles.activeTab]} 
          onPress={() => setActiveTab('products')}
        >
          <Text style={[styles.tabText, activeTab === 'products' && styles.activeTabText]}>
            Продукты
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'farm' && styles.activeTab]} 
          onPress={() => setActiveTab('farm')}
        >
          <Text style={[styles.tabText, activeTab === 'farm' && styles.activeTabText]}>
            Ферма
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'products' ? (
          <>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddForm(!showAddForm)}
            >
              <Text style={styles.addButtonText}>
                {showAddForm ? 'Отмена' : 'Добавить продукт'}
              </Text>
            </TouchableOpacity>

            {showAddForm ? (
              <AddProductForm onSubmit={handleAddProduct} />
            ) : (
              <ProductList
                products={products}
                onProductPress={handleProductPress}
              />
            )}
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddFarmForm(!showAddFarmForm)}
            >
              <Text style={styles.addButtonText}>
                {showAddFarmForm ? 'Отмена' : 'Добавить ферму'}
              </Text>
            </TouchableOpacity>

            {showAddFarmForm && (
              <AddFarmForm onSubmit={handleAddFarm} />
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2ecc71',
  },
  tabText: {
    fontSize: 16,
    color: '#64748b',
  },
  activeTabText: {
    color: '#2ecc71',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  addButton: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 