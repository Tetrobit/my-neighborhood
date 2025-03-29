import { View, Text, ScrollView, StyleSheet, Image, Pressable } from 'react-native';
import { Href, Link } from 'expo-router';
import { Store, Recycle, MapPin, LucideIcon } from 'lucide-react-native';

export default function MiniAppsScreen() {
  const miniApps: Array<{icon: LucideIcon, title: string, href: Href}> = [
    { icon: Store, title: 'Бизнесы', href: '/business/1' },
    { icon: Recycle, title: 'Переработка', href: '/recycling/1' },
    { icon: MapPin, title: 'Карта', href: '/map' },
  ];
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Мини-приложения</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.miniAppsSection}>
          <Text style={styles.sectionTitle}>Все приложения</Text>
          <View style={styles.miniAppsGrid}>
            {miniApps.map((app, index) => (
              <Link key={index} href={app.href} asChild>
                <Pressable style={styles.miniAppButton}>
                  <View style={styles.miniAppIcon} testID="mini-app-icon">
                    <app.icon size={24} color="#0891b2" />
                  </View>
                  <Text style={styles.miniAppText}>{app.title}</Text>
                </Pressable>
              </Link>
            ))}
          </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  miniAppButton: {
    width: '30%',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
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
    marginBottom: 8,
  },
  miniAppText: {
    fontSize: 14,
    color: '#0f172a',
    textAlign: 'center',
  },
}); 