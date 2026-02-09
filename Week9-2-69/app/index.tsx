import './global.css';
import { Text, View } from 'react-native';

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-blue-200">
      <Text className="text-3xl font-bold text-red-600">Hello, World!</Text>
    </View>
  );
}
