import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Product } from '../types/farmer';

interface OrderFormProps {
  product: Product;
  onSubmit: (quantity: number) => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({ product, onSubmit }) => {
  const [quantity, setQuantity] = useState('1');
  const [totalPrice, setTotalPrice] = useState(product.price);

  const handleQuantityChange = (value: string) => {
    const newQuantity = parseInt(value) || 0;
    if (newQuantity > product.quantity) {
      Alert.alert('Ошибка', 'Запрашиваемое количество превышает доступное');
      return;
    }
    setQuantity(value);
    setTotalPrice(product.price * newQuantity);
  };

  const handleSubmit = () => {
    const orderQuantity = parseInt(quantity);
    if (orderQuantity <= 0) {
      Alert.alert('Ошибка', 'Пожалуйста, введите корректное количество');
      return;
    }
    if (orderQuantity > product.quantity) {
      Alert.alert('Ошибка', 'Запрашиваемое количество превышает доступное');
      return;
    }
    onSubmit(orderQuantity);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Оформление заказа</Text>
      
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.price}>Цена: {product.price} ₽/{product.unit}</Text>
        <Text style={styles.available}>
          Доступно: {product.quantity} {product.unit}
        </Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Количество ({product.unit})</Text>
        <TextInput
          style={styles.input}
          value={quantity}
          onChangeText={handleQuantityChange}
          keyboardType="numeric"
          placeholder="Введите количество"
        />

        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Итого:</Text>
          <Text style={styles.totalPrice}>{totalPrice} ₽</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Оформить заказ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  productInfo: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: '#2ecc71',
    marginBottom: 4,
  },
  available: {
    fontSize: 14,
    color: '#666',
  },
  form: {
    marginTop: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  button: {
    backgroundColor: '#2ecc71',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 