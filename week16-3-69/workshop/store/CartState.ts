import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {  // กำหนดรูปเเบบของ state
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface CartState {
  items: CartItem[];  // สร้าง state ที่เก็บรายการสินค้าในตะกร้า
  totalPrice: number;  // สร้าง state ที่เก็บราคาสินค้าทั้งหมดในตะกร้า
}

const initialState: CartState = {  // กำหนดค่าเริ่มต้นของ state
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => { // สร้าง action ที่เพิ่มสินค้าในตะกร้า
      state.items.push(action.payload);
      state.totalPrice += action.payload.price * action.payload.quantity;
    },
    removeItem: (state, action: PayloadAction<string>) => { // สร้าง action ที่ลบสินค้าออกจากตะกร้า
      const itemId = action.payload;
      const item = state.items.find(i => i.id === itemId);

      if (item) {
        state.totalPrice -= item.price * item.quantity; // ปรับราคาสินค้าทั้งหมดในตะกร้าเมื่อมีการลบสินค้า
      }

      state.items = state.items.filter(i => i.id !== itemId);// ลบสินค้าจากตะกร้าโดยใช้ filter เพื่อสร้าง array ใหม่ที่ไม่มีสินค้าที่ถูกลบออกไป
    },
    clearCart: (state) => { // สร้าง action ที่ล้างตะกร้าสินค้า
      state.items = [];
      state.totalPrice = 0;
    }
  }
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;  // ส่งออก action creators ของ cart  
export const cartReducer = cartSlice.reducer;  // ส่งออก reducer ของ cart