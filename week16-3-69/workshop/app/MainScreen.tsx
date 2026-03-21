import React, { useState, ReactElement } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";

// ===================================================
// ---- แบบฝึกหัด 10.1 ตะกร้าสินค้า (Cart) ----
// ===================================================
import { addItem, clearCart } from "../store/CartState";
import CartItem from "../components/CartItem";

export default function MainScreen(): ReactElement {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const total = useSelector((state: RootState) => state.cart.totalPrice);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleAddItem = () => {
    if (!name.trim()) return;
    const newItem = {
      id: Date.now().toString(),
      name,
      quantity: Number(quantity),
      price: Number(price),
    };
    dispatch(addItem(newItem));
    setName("");
    setQuantity("");
    setPrice("");
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>🛒 ตะกร้าสินค้า</Text>
      <Text style={styles.count}>รายการทั้งหมด: {items.length} รายการ</Text>

      <TextInput
        placeholder="ชื่อสินค้า"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <View style={styles.inputRow}>
        <TextInput
          placeholder="จำนวน"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          style={[styles.input, { flex: 1 }]}
        />
        <TextInput
          placeholder="ราคา (บาท)"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          style={[styles.input, { flex: 1 }]}
        />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
        <Text style={styles.addButtonText}>เพิ่มลงตะกร้า</Text>
      </TouchableOpacity>

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
        ListEmptyComponent={
          <Text style={styles.empty}>ยังไม่มีสินค้าในตะกร้า</Text>
        }
      />

      {items.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.total}>ยอดรวม: {total} บาท</Text>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => dispatch(clearCart())}
          >
            <Text style={styles.clearText}>ล้างตะกร้า</Text>
          </TouchableOpacity>
        </View>
      )}

    </View>
  );
}

// แบบฝึกหัด 10.2 To-Do List
/*
import { addTodo, toggleTodo, removeTodo } from "../store/TodoState";

  const todos = useSelector((state: RootState) => state.todo.todos);
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim() === "") return;
    dispatch(addTodo({ id: Date.now().toString(), text: text.trim(), completed: false }));
    setText("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 To-Do List</Text>
      <Text style={styles.count}>งานทั้งหมด: {todos.length} รายการ</Text>
      <View style={styles.inputRow}>
        <TextInput style={styles.input} placeholder="เพิ่มงาน..." value={text} onChangeText={setText} />
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>เพิ่มงาน</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoRow}>
            <TouchableOpacity style={styles.todoTextArea} onPress={() => dispatch(toggleTodo(item.id))}>
              <Text style={[styles.todoText, item.completed && styles.completed]}>
                {item.completed ? "✅ " : "⬜ "}{item.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => dispatch(removeTodo(item.id))}>
              <Text style={styles.deleteText}>ลบ</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>ยังไม่มีงาน กดเพิ่มงานได้เลย!</Text>}
      />
    </View>
  );
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  count: {
    fontSize: 14,
    color: "#888",
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: "#4A90D9",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  footer: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 12,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  clearButton: {
    backgroundColor: "#FF5C5C",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  clearText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  empty: {
    textAlign: "center",
    color: "#aaa",
    marginTop: 40,
    fontSize: 16,
  },
  todoRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    elevation: 2,
  },
  todoTextArea: { flex: 1 },
  todoText: { fontSize: 16, color: "#333" },
  completed: { textDecorationLine: "line-through", color: "#aaa" },
  deleteButton: {
    backgroundColor: "#FF5C5C",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  deleteText: { color: "#fff", fontWeight: "bold" },
});
