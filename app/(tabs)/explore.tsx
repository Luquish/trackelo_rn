import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Text style={styles.title}>Explorar 🔍</Text>
          <Text style={styles.subtitle}>Descubre más</Text>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Pantalla de Exploración</Text>
            <Text style={styles.cardText}>
              Aquí puedes agregar contenido para explorar diferentes funcionalidades de tu app.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Expo Router</Text>
            <Text style={styles.cardText}>
              Esta app está construida con Expo Router, que proporciona navegación basada en archivos.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>React Native</Text>
            <Text style={styles.cardText}>
              Utiliza componentes nativos para una experiencia fluida en iOS y Android.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});

