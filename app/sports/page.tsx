import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { Stack, Link } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { MOCK_SECTIONS } from '../utils/mock/sports';
import { formatPrice } from '../utils/format';

export default function SportsScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Спортивные секции',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#ffffff' },
        }}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.sections}>
          {MOCK_SECTIONS.map((section) => (
            <Link key={section.id} href={`/sports/section/${section.id}`} asChild>
              <Pressable style={styles.sectionCard}>
                <Image source={{ uri: section.image }} style={styles.sectionImage} />
                <View style={styles.sectionContent}>
                  <Text style={styles.sectionTitle}>{section.name}</Text>
                  <Text style={styles.sectionDescription} numberOfLines={2}>
                    {section.description}
                  </Text>
                  <View style={styles.sectionFooter}>
                    <Text style={styles.sectionPrice}>
                      {formatPrice(section.price)}/месяц
                    </Text>
                    <ChevronRight size={20} color="#94a3b8" />
                  </View>
                </View>
              </Pressable>
            </Link>
          ))}
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
  content: {
    flex: 1,
  },
  sections: {
    padding: 16,
    gap: 16,
  },
  sectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#f1f5f9',
  },
  sectionContent: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
  },
  sectionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0891b2',
  },
}); 