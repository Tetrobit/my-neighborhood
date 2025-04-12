import { TouchableOpacity, Text, StyleSheet, Linking } from 'react-native';
import { MapPin } from 'lucide-react-native';

interface MapButtonProps {
  latitude: number;
  longitude: number;
}

export function MapButton({ latitude, longitude }: MapButtonProps) {
  const handleOpenMap = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={handleOpenMap}
    >
      <MapPin size={20} color="#2563eb" />
      <Text style={styles.text}>На карте</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eff6ff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
  },
  text: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '600',
  },
}); 