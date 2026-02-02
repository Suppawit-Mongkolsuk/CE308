import './global.css';
import { View, FlatList } from 'react-native';
import { ItemCard } from './component/ltemCard';

export default function index() {
  const data = [
    {
      id: '1',
      title: 'Banana',
      prict: 2000,
      pcs: 10,
      btnVariant: 'primary' as const,
      btnSize: 'L' as const,
    },
    {
      id: '2',
      title: 'Mango',
      prict: 2000,
      pcs: 10,
      btnVariant: 'secondary' as const,
      btnSize: 'L' as const,
    },
    {
      id: '3',
      title: 'Apple',
      prict: 2000,
      pcs: 10,
      btnVariant: 'danger' as const,
      btnSize: 'L',
    },
  ];

  return (
    <View className="flex-1 p-4">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemCard
            id={item.id}
            title={item.title}
            prict={item.prict}
            pcs={item.pcs}
            btnVariant={item.btnVariant}
            btnSize={item.btnSize}
          />
        )}
      />
    </View>
  );
}
