import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, Pressable, ScrollView } from 'react-native';
import { CheckCircle } from 'lucide-react-native';
import { CartItem } from '../types/farmer';

interface OrderSuccessProps {
  items: CartItem[];
  total: number;
  onClose: () => void;
}

export const OrderSuccess: React.FC<OrderSuccessProps> = ({ items, total, onClose }) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleClose = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  return (
    <Pressable style={styles.container} onPress={handleClose}>
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{
              scale: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              }),
            }],
          },
        ]}
      >
        <View style={styles.contentInner}>
          <CheckCircle size={80} color="#2ecc71" style={styles.icon} />
          
          <Text style={styles.title}>Заказ успешно оформлен!</Text>
          
          <ScrollView style={styles.itemsList}>
            {items.map((item) => (
              <View key={`${item.farmerId}-${item.product.id}`} style={styles.orderItem}>
                <Image
                  source={{ uri: item.product.imageUrl || 'https://via.placeholder.com/150' }}
                  style={styles.productImage}
                />
                <View style={styles.itemInfo}>
                  <Text style={styles.productName}>{item.product.name}</Text>
                  <Text style={styles.farmerName}>Ферма: {item.farmerName}</Text>
                  <Text style={styles.quantity}>
                    Количество: {item.quantity} {item.product.unit}
                  </Text>
                  <Text style={styles.itemPrice}>
                    {item.product.price * item.quantity} ₽
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.totalInfo}>
            <Text style={styles.totalLabel}>Сумма заказа:</Text>
            <Text style={styles.totalPrice}>{total} ₽</Text>
          </View>
          
          <Text style={styles.message}>
            Спасибо за ваш заказ! Мы свяжемся с вами в ближайшее время для подтверждения.
          </Text>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleClose}
          >
            <Text style={styles.buttonText}>Вернуться к продуктам</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    maxWidth: 400,
  },
  contentInner: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#0f172a',
  },
  itemsList: {
    width: '100%',
    maxHeight: 300,
  },
  orderItem: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 12,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#0f172a',
  },
  farmerName: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  quantity: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2ecc71',
  },
  totalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    marginBottom: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: '#0f172a',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  message: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#2ecc71',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 