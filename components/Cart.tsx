import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Pressable } from 'react-native';
import { CartItem } from '../types/farmer';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react-native';

interface CartProps {
  items: CartItem[];
  total: number;
  onUpdateQuantity: (item: CartItem, newQuantity: number) => void;
  onRemoveItem: (item: CartItem) => void;
  onCheckout: () => void;
  onClose: () => void;
}

export const Cart: React.FC<CartProps> = ({
  items,
  total,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onClose,
}) => {
  if (items.length === 0) {
    return (
      <Pressable style={styles.container} onPress={onClose}>
        <View style={styles.content}>
          <ShoppingCart size={48} color="#64748b" />
          <Text style={styles.emptyText}>Корзина пуста</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Вернуться к покупкам</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable style={styles.container} onPress={onClose}>
      <View style={styles.content} onStartShouldSetResponder={() => true}>
        <Text style={styles.title}>Корзина</Text>
        
        <ScrollView style={styles.itemsList}>
          {items.map((item, index) => (
            <View key={`${item.farmerId}-${item.product.id}`} style={styles.cartItem}>
              <Image
                source={{ uri: item.product.imageUrl || 'https://via.placeholder.com/150' }}
                style={styles.productImage}
              />
              
              <View style={styles.itemInfo}>
                <Text style={styles.productName}>{item.product.name}</Text>
                <Text style={styles.farmerName}>Ферма: {item.farmerName}</Text>
                <Text style={styles.price}>{item.product.price} ₽ за {item.product.unit}</Text>
                
                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => onUpdateQuantity(item, item.quantity - 1)}
                  >
                    <Minus size={20} color="#64748b" />
                  </TouchableOpacity>
                  
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => onUpdateQuantity(item, item.quantity + 1)}
                  >
                    <Plus size={20} color="#64748b" />
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => onRemoveItem(item)}
                  >
                    <Trash2 size={20} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        
        <View style={styles.footer}>
          <View style={styles.totalInfo}>
            <Text style={styles.totalLabel}>Итого:</Text>
            <Text style={styles.totalPrice}>{total} ₽</Text>
          </View>
          
          <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout}>
            <Text style={styles.checkoutButtonText}>Оформить заказ</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    backgroundColor: 'white',
    borderRadius: 16,
    width: '100%',
    maxWidth: 500,
    maxHeight: '90%',
    padding: 24,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#0f172a',
  },
  itemsList: {
    width: '100%',
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    marginBottom: 12,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
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
  price: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0f172a',
    marginBottom: 8,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: 16,
    minWidth: 24,
    textAlign: 'center',
  },
  removeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fee2e2',
    marginLeft: 16,
  },
  footer: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 16,
  },
  totalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: '#0f172a',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  checkoutButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 18,
    color: '#64748b',
    marginVertical: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2ecc71',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 