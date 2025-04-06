import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, Settings, ShoppingCart } from 'lucide-react-native';
import { FarmerList } from '../../components/FarmerList';
import { ProductList } from '../../components/ProductList';
import { OrderForm } from '../../components/OrderForm';
import { OrderSuccess } from '../../components/OrderSuccess';
import { Cart } from '../../components/Cart';
import { Farmer, Product, CartItem } from '../../types/farmer';

// Временные данные для демонстрации
const mockFarmers: Farmer[] = [
  {
    id: '1',
    name: 'Ферма "Зеленый сад"',
    description: 'Экологически чистые овощи и фрукты',
    location: 'Московская область',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    products: [
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
    ],
  },
  {
    id: '2',
    name: 'Ферма "Молочная река"',
    description: 'Натуральные молочные продукты',
    location: 'Ленинградская область',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1596733430284-f7437764d1a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    products: [
      {
        id: '3',
        name: 'Деревенское молоко',
        description: 'Свежее молоко от коров свободного выпаса',
        price: 80,
        quantity: 50,
        unit: 'л',
        farmerId: '2',
        imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        createdAt: new Date(),
      },
    ],
  },
];

export default function FarmerMarket() {
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderSuccess, setOrderSuccess] = useState<{ items: CartItem[]; total: number } | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const cartTotal = cartItems.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);

  const handleBackPress = () => {
    if (selectedProduct) {
      setSelectedProduct(null);
    } else if (selectedFarmer) {
      setSelectedFarmer(null);
    } else {
      router.back();
    }
  };

  const handleDashboardPress = () => {
    router.push('/profile/farms');
  };

  const handleFarmerPress = (farmer: Farmer) => {
    setSelectedFarmer(farmer);
  };

  const handleProductPress = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (quantity: number) => {
    if (selectedProduct && selectedFarmer) {
      const existingItemIndex = cartItems.findIndex(
        item => item.product.id === selectedProduct.id && item.farmerId === selectedFarmer.id
      );

      // Проверяем доступное количество
      const currentInCart = existingItemIndex >= 0 ? cartItems[existingItemIndex].quantity : 0;
      const totalQuantity = currentInCart + quantity;

      if (totalQuantity > selectedProduct.quantity) {
        alert(`Извините, доступно только ${selectedProduct.quantity} ${selectedProduct.unit}`);
        return;
      }

      if (existingItemIndex >= 0) {
        const newItems = [...cartItems];
        newItems[existingItemIndex].quantity += quantity;
        setCartItems(newItems);
      } else {
        setCartItems([
          ...cartItems,
          {
            product: selectedProduct,
            quantity,
            farmerId: selectedFarmer.id,
            farmerName: selectedFarmer.name,
          },
        ]);
      }

      setSelectedProduct(null);
    }
  };

  const handleUpdateCartItemQuantity = (item: CartItem, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveCartItem(item);
      return;
    }

    // Проверяем доступное количество
    if (newQuantity > item.product.quantity) {
      alert(`Извините, доступно только ${item.product.quantity} ${item.product.unit}`);
      return;
    }

    const newItems = cartItems.map(cartItem => {
      if (cartItem.product.id === item.product.id && cartItem.farmerId === item.farmerId) {
        return { ...cartItem, quantity: newQuantity };
      }
      return cartItem;
    });

    setCartItems(newItems);
  };

  const handleRemoveCartItem = (item: CartItem) => {
    setCartItems(cartItems.filter(
      cartItem => !(cartItem.product.id === item.product.id && cartItem.farmerId === item.farmerId)
    ));
  };

  const handleCheckout = () => {
    // Здесь будет логика оформления заказа
    setOrderSuccess({
      items: cartItems,
      total: cartTotal,
    });
    setCartItems([]);
    setIsCartVisible(false);
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
          <View style={styles.headerButtons}>
            <TouchableOpacity onPress={handleDashboardPress} style={styles.dashboardButton}>
              <Settings size={24} color="#0891b2" />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setIsCartVisible(true)} 
              style={styles.cartButton}
            >
              <ShoppingCart size={24} color="#0891b2" />
              {cartItems.length > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>
                    {cartItems.length}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
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
          onSubmit={handleAddToCart}
        />
      )}

      {orderSuccess && (
        <OrderSuccess
          items={orderSuccess.items}
          total={orderSuccess.total}
          onClose={() => setOrderSuccess(null)}
        />
      )}

      {isCartVisible && (
        <Cart
          items={cartItems}
          total={cartTotal}
          onUpdateQuantity={handleUpdateCartItemQuantity}
          onRemoveItem={handleRemoveCartItem}
          onCheckout={handleCheckout}
          onClose={() => setIsCartVisible(false)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
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
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dashboardButton: {
    marginRight: 16,
  },
  cartButton: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#ef4444',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
}); 