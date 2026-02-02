import { Text, View } from 'react-native';
import CustomButton from './Button';

type ItemCardProps = {
  id: string;
  title: string;
  prict: number;
  pcs: number;
  btnVariant: 'primary' | 'secondary' | 'danger';
  btnSize: 'S' | 'L' | 'XL';
};

export const ItemCard = ({
  title,
  prict,
  pcs,
  btnVariant,
  btnSize,
}: ItemCardProps) => {
  return (
    <View className="p-4 m-4 bg-gray-500 rounded-lg">
      <Text className="text-lg font-bold text-white">ชื่อสินค้า: {title}</Text>
      <Text className="text-sm">ราคา: {prict}</Text>
      <Text className="text-sm">จำนวน: {pcs}</Text>
      <CustomButton
        title="ซื้อสิ่ง"
        variant={btnVariant}
        size={btnSize}
        onPress={() => {}}
      />
    </View>
  );
};
export default ItemCard;
