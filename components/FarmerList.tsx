import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Farmer } from '../types/farmer';

interface FarmerListProps {
  farmers: Farmer[];
  onFarmerPress: (farmer: Farmer) => void;
}

export const FarmerList: React.FC<FarmerListProps> = ({ farmers, onFarmerPress }) => {
  const renderFarmer = ({ item }: { item: Farmer }) => (
    <TouchableOpacity
      style={styles.farmerCard}
      onPress={() => onFarmerPress(item)}
    >
      <Image
        source={{ uri: item.imageUrl || 'https://via.placeholder.com/150' }}
        style={styles.farmerImage}
      />
      <View style={styles.farmerInfo}>
        <Text style={styles.farmerName}>{item.name}</Text>
        <Text style={styles.farmerLocation}>{item.location}</Text>
        <Text style={styles.farmerRating}>Рейтинг: {item.rating} ⭐</Text>
        <Text style={styles.productCount}>
          Доступно продуктов: {item.products.length}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={farmers}
      renderItem={renderFarmer}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  farmerCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  farmerImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  farmerInfo: {
    marginLeft: 16,
    flex: 1,
  },
  farmerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  farmerLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  farmerRating: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  productCount: {
    fontSize: 14,
    color: '#666',
  },
}); 