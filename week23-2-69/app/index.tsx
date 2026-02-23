import { View, Text, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen!</Text>
      <Button title="Go to Details" onPress={() => router.push('/details')} />
      <Button title="Go to Settings" onPress={() => router.push('/Settings')} />
      <Button title="Go to Profile" onPress={() => router.push('/profile')} />
      <Button title="Go to Login" onPress={() => router.push('/login')} />
    </View>
  );
}
