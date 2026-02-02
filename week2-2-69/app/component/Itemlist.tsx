import { View, Text, FlatList } from 'react-native';

type ItemProps = { items: { id: string; title: string; pcs: number }[] };

export const Itemlist = ({ items }: ItemProps) => {
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View className="p-4 border-b border-gray-300">
          <Text className="text-lg font-semibold">
            {item.title} - {item.pcs}
          </Text>
        </View>
      )}
    />
  );
};

export default Itemlist;
