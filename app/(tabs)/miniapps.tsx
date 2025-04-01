import { View, Text, ScrollView, StyleSheet, Pressable, Animated } from 'react-native';
import { Href, Link } from 'expo-router';
import { Store, Recycle, MapPin, LucideIcon, ChevronRight } from 'lucide-react-native';
import { useEffect, useRef } from 'react';

export default function MiniAppsScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const miniApps: Array<{icon: LucideIcon, title: string, description: string, href: Href}> = [
    { 
      icon: Store, 
      title: 'Бизнесы', 
      description: 'Найдите местные магазины и услуги',
      href: '/business/1' 
    },
    { 
      icon: Recycle, 
      title: 'Переработка', 
      description: 'Пункты приема вторсырья',
      href: '/recycling/1' 
    },
    { 
      icon: MapPin, 
      title: 'Карта', 
      description: 'Интерактивная карта района',
      href: '/map' 
    },
  ];
  
  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Сервисы</Text>
          <Text style={styles.headerSubtitle}>Все важные функции в одном месте</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.miniAppsSection}>
          <Text style={styles.sectionTitle}>Все приложения</Text>
          <View style={styles.miniAppsGrid}>
            {miniApps.map((app, index) => (
              <Link key={index} href={app.href} asChild>
                <Pressable style={styles.miniAppButton}>
                  <View style={styles.miniAppIcon}>
                    <app.icon size={24} color="#0891b2" />
                  </View>
                  <View style={styles.miniAppContent}>
                    <Text style={styles.miniAppTitle}>{app.title}</Text>
                    <Text style={styles.miniAppDescription}>{app.description}</Text>
                  </View>
                  <ChevronRight size={20} color="#94a3b8" />
                </Pressable>
              </Link>
            ))}
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  content: {
    flex: 1,
  },
  miniAppsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 16,
  },
  miniAppsGrid: {
    gap: 12,
  },
  miniAppButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  miniAppIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f9ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  miniAppContent: {
    flex: 1,
  },
  miniAppTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  miniAppDescription: {
    fontSize: 14,
    color: '#64748b',
  },
}); 