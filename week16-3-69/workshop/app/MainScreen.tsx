import React, { useState, ReactElement } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addItem, clearCart } from "../store/CartState";
import { RootState } from "../store/store";
import CartItem from "../components/CartItem";

export default function MainScreen(): ReactElement {

  // ใช้ dispatch เพื่อส่ง action ไป reducer
  const dispatch = useDispatch();

  // ดึงข้อมูลจาก redux store
  const items = useSelector((state: RootState) => state.cart.items);
  const total = useSelector((state: RootState) => state.cart.totalPrice);

  // state สำหรับ input
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  // ฟังก์ชันเพิ่มสินค้า
  const handleAddItem = () => {

    const newItem = {
      id: Date.now().toString(), // สร้าง id ง่าย ๆ
      name: name,
      quantity: Number(quantity),
      price: Number(price)
    };

    // ส่งข้อมูลไป reducer
    dispatch(addItem(newItem));

    // reset input
    setName("");
    setQuantity("");
    setPrice("");
  };

  return (
    <View style={{ padding: 20 }}>

      {/* Input ชื่อสินค้า */}
      <TextInput
        placeholder="ชื่อสินค้า"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      {/* Input จำนวน */}
      <TextInput
        placeholder="จำนวน"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      {/* Input ราคา */}
      <TextInput
        placeholder="ราคา"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      {/* ปุ่มเพิ่มสินค้า */}
      <Button title="เพิ่มลงตะกร้า" onPress={handleAddItem} />

      {/* แสดงรายการสินค้า */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CartItem
            id={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
          />
        )}
      />

      {/* แสดงยอดรวม */}
      <Text style={{ marginTop: 20, fontSize: 18 }}>
        ยอดรวม: {total} บาท
      </Text>

      {/* ปุ่มล้างตะกร้า */}
      <Button
        title="ล้างตะกร้า"
        onPress={() => dispatch(clearCart())}
      />

    </View>
  );
}