import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   cart: [],
   totalPrice: 0,
   nbCartItems: 0
}

export const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {
      addToCart: (state, action) => {
         //console.log(state.cart);
         //console.log(action.payload);
         state.cart = [...state.cart, action.payload];
         //return { ...state, [...state.cart, action.payload]}
         console.log(state.cart);
      },
      deleteCartItem: (state, action) => {
         state.cart.splice(action.payload.index, 1);
         console.log(state.cart);
      },
      setTotalPrice: (state, action) => {
         state.totalPrice = action.payload;
      },
      /*changeQuantity: (modif, itemIndex) => {
         console.log(itemIndex);
         console.log(this.cart);
         console.log(this.cart[itemIndex]);
         if (modif === 'minus' && this.cart[itemIndex].quantity > 1) this.cart[itemIndex].quantity--;
         if (modif === 'plus' && this.cart[itemIndex].quantity < 99) this.cart[itemIndex].quantity++;
         this.saveCartState();
         this.calculateNbItems();
         return this.cart[itemIndex].quantity;
      },*/
      calculateNbItems: (state) => {
         let nb = 0;
         state.cart.forEach(item => {
            nb += item.quantity;
         });
         console.log(nb);
         state.nbCartItems = nb;
      }
   }
});

export const {
   addToCart,
   deleteCartItem,
   setTotalPrice,
   changeQuantity,
   calculateNbItems
} = cartSlice.actions;

export default cartSlice.reducer;