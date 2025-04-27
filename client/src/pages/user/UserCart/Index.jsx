import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTotalPrice } from '../../../store/slices/cart';

import './UserCart.scss';

export default function UserCart(){
   const all = useSelector((state) => state.cart);
   //const { cart, totalPrice } = useSelector((state) => state.cart);
   //console.log(cart);
   console.log(all);

   const dispatch = useDispatch();
/*
   useEffect(() => {
      const calculateTotalPrice = (cart) => {
         let totalPrice = 0;
         cart.forEach(item => {
            totalPrice += item.quantity * item.price;
         });
         return totalPrice;
      };

      if (totalPrice) {
         dispatch(setTotalPrice(calculateTotalPrice(cart)));
      }
   },[cart.quantity]);*/

   return (
      <section className="user_cart">
         <h1>mon panier</h1>

         {/* !cart.length ?
            <div>Votre panier est vide</div> :
            <>
               <CartItem />

               <div className="total">
                  <h2>Total TTC : 
                     <span>totalPrice €</span>
                  </h2>
                  <p className="tax_note">Le prix de livraison de votre commande sera calculé lors du paiement.</p>
               </div>
            </>
   */}
         
      </section>
   )
}