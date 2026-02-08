import './global.css';
import { View, Text } from 'react-native';
import { useState } from 'react';
import { Input } from './component/Input';
import CustomButton from './component/Button';

/* 
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
      btnSize: 'L' as const,
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
*/
// ===================================================================
// Workshop 3.2

export default function Index() {
  const [value, setValue] = useState('');
  const [prict, setPrict] = useState('');
  const [pcs, setPcs] = useState('');

  return (
    <View className="p-4">
      <Text className="text-blue-600 mb-1 text-2xl font-bold">
        กรอกข้อมูลสินค้า
      </Text>

      <Input
        label="ชื่อสินค้า"
        value={value}
        onChangeText={setValue}
        placeholder="กรอกชื่อสินค้า"
      />
      <Input
        label="ราคา"
        value={prict}
        onChangeText={setPrict}
        placeholder="กรอกราคา"
      />
      <Input
        label="จำนวน"
        value={pcs}
        onChangeText={setPcs}
        placeholder="กรอกจำนวน"
      />
      <CustomButton title="บันทึกข้อมูล" variant="primary" size="L" />
    </View>
  );
}
