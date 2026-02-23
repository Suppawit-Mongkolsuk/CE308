import { router } from 'expo-router';
import { View, Text, Button } from 'react-native';

export default function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Details Screen</Text>
      <Button title="Go Back" onPress={() => router.back()} />
      <Button title="Go to Settings" onPress={() => router.push('/Settings')} />
    </View>
  );
}
