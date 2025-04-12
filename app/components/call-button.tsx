import { TouchableOpacity, Text, StyleSheet, Linking } from 'react-native';
import { Phone } from 'lucide-react-native';

interface CallButtonProps {
  phone: string;
}

export function CallButton({ phone }: CallButtonProps) {
  const handleCall = () => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={handleCall}
    >
      <Phone size={20} color="white" />
      <Text style={styles.text}>Позвонить</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 