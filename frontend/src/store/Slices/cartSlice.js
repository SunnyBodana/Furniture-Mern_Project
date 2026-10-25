import { createSlice } from "@reduxjs/toolkit"; 

// Helper function to safely convert to number
const toNumber = (value, defaultValue = 0) => {
  if (value === null || value === undefined) return defaultValue;
  const num = typeof value === 'string' ? parseFloat(value) : Number(value);
  return isNaN(num) ? defaultValue : num;
};

const getItemId = (item) => (item ? (item.id || item._id) : undefined);

const cartSlice = createSlice({
    name: 'cartItem',
    initialState: {
        cart: []
    },
    reducers:{
        addtoCart(state,action){
            const itemId = getItemId(action.payload);
            const price = toNumber(action.payload.price, 0);
            const addQuantity = toNumber(action.payload.quantity, 1);
            
            const index = state.cart.findIndex(item => getItemId(item) === itemId);
            if(index !== -1){
                const currentQuantity = toNumber(state.cart[index].quantity, 1);
                state.cart[index].quantity = currentQuantity + addQuantity;
            } else {
                state.cart.push({
                    ...action.payload,
                    id: itemId,
                    price: price,
                    quantity: addQuantity
                });
            }
        },
        removefromCart(state,action){
            state.cart = state.cart.filter(item => getItemId(item) !== action.payload);
        },
        clearCart(state){
            state.cart = [];
        },
        increaseQuantity(state, action) {
            const index = state.cart.findIndex(item => getItemId(item) === action.payload);
            if (index !== -1) {
                const currentQuantity = toNumber(state.cart[index].quantity, 1);
                state.cart[index].quantity = currentQuantity + 1;
            }
        },
        decreaseQuantity(state, action) {
            const index = state.cart.findIndex(item => getItemId(item) === action.payload);
            if (index !== -1) {
                const currentQuantity = toNumber(state.cart[index].quantity, 1);
                state.cart[index].quantity = Math.max(1, currentQuantity - 1);
            }
        }
    }
})

export const {addtoCart,removefromCart,increaseQuantity,decreaseQuantity,clearCart} = cartSlice.actions;
export default cartSlice.reducer;


