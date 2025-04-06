import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, Settings } from 'lucide-react-native';
import { FarmerList } from '../../components/FarmerList';
import { ProductList } from '../../components/ProductList';
import { OrderForm } from '../../components/OrderForm';
import { Farmer, Product } from '../../types/farmer';

// Временные данные для демонстрации
const mockFarmers: Farmer[] = [
  {
    id: '1',
    name: 'Ферма "Зеленый сад"',
    description: 'Экологически чистые овощи и фрукты',
    location: 'Московская область',
    rating: 4.8,
    products: [
      {
        id: '1',
        name: 'Свежие помидоры',
        description: 'Спелые, сочные помидоры, выращенные без химикатов',
        price: 150,
        quantity: 100,
        unit: 'кг',
        farmerId: '1',
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
        createdAt: new Date(),
      },
    ],
  },
  {
    id: '2',
    name: 'Ферма "Молочная река"',
    description: 'Натуральные молочные продукты',
    location: 'Ленинградская область',
    rating: 4.9,
    products: [
      {
        id: '3',
        name: 'Деревенское молоко',
        description: 'Свежее молоко от коров свободного выпаса',
        price: 80,
        quantity: 50,
        unit: 'л',
        farmerId: '2',
        createdAt: new Date(),
      },
    ],
  },
];

export default function FarmerMarket() {
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleFarmerPress = (farmer: Farmer) => {
    setSelectedFarmer(farmer);
    setSelectedProduct(null);
  };

  const handleProductPress = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleOrderSubmit = (quantity: number) => {
    // Здесь будет логика оформления заказа
    console.log('Заказ оформлен:', {
      product: selectedProduct,
      quantity,
    });
    setSelectedProduct(null);
  };

  const handleDashboardPress = () => {
    router.push('/farmer-market/dashboard');
  };

  const handleBackPress = () => {
    if (selectedProduct) {
      // Если открыт экран заказа, возвращаемся к списку продуктов фермера
      setSelectedProduct(null);
    } else if (selectedFarmer) {
      // Если открыт список продуктов фермера, возвращаемся к списку фермеров
      setSelectedFarmer(null);
    } else {
      // Если открыт список фермеров, возвращаемся на вкладку сервисов
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <ChevronLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {selectedFarmer ? selectedFarmer.name : 'Фермерский рынок'}
        </Text>
        {!selectedFarmer && !selectedProduct && (
          <TouchableOpacity onPress={handleDashboardPress} style={styles.dashboardButton}>
            <Settings size={24} color="#0891b2" />
          </TouchableOpacity>
        )}
      </View>

      {!selectedFarmer ? (
        <FarmerList
          farmers={mockFarmers}
          onFarmerPress={handleFarmerPress}
        />
      ) : !selectedProduct ? (
        <ProductList
          products={selectedFarmer.products}
          onProductPress={handleProductPress}
        />
      ) : (
        <OrderForm
          product={selectedProduct}
          onSubmit={handleOrderSubmit}
        />
      )}
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
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  dashboardButton: {
    padding: 8,
  },
}); 