import React from "react";
import { View, Text, Button } from "react-native";
import { useDispatch } from "react-redux";
import { removeItem } from "../store/CartState";

// กำหนด type ของ props ที่ component จะรับ
type CartItemProps = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export default function CartItem({
  id,
  name,
  quantity,
  price,
}: CartItemProps) {

  // ใช้ dispatch เพื่อส่ง action ไป reducer
  const dispatch = useDispatch();

  return (
    <View
      style={{
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 10,
      }}
    >
      {/* แสดงข้อมูลสินค้า */}
      <Text style={{ fontSize: 16 }}>
        {name}
      </Text>

      <Text>
        จำนวน: {quantity}
      </Text>

      <Text>
        ราคา: {price} บาท
      </Text>

      {/* คำนวณราคาของสินค้านี้ */}
      <Text>
        รวม: {quantity * price} บาท
      </Text>

      {/* ปุ่มลบสินค้า */}
      <Button
        title="ลบสินค้า"
        onPress={() => dispatch(removeItem(id))}
      />
    </View>
  );
}