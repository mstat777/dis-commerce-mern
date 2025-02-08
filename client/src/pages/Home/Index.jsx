import './Home.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchPromoProducts } from '../../utils/fetchData';
import ProductCard from '../../components/ProductCard/Index';

export default function Home(){
   const [products, setProducts] = useState([]);
   const { isLogged, email } = useSelector((state) => state.user);
   const TOKEN = localStorage.getItem("auth");

   useEffect(() => {
      async function fetchData() {
         try {
            const result = await fetchPromoProducts();
            if (result?.length){
               //console.log(result);
               setProducts(result);
            }
         } catch (err) {
            throw Error(err);
         }
      }
      if (!products.length){
         fetchData();
      }
   },[]);

   useEffect(() => {
      console.log(isLogged);
      console.log(email);
      console.log(TOKEN);
   },[isLogged, email]);

   return (
      <main className="home">
         <h1>Home</h1>

         <section  className="promo_products">
            { products.length && 
               products.map((product, idx) => (
                  <ProductCard
                     data={product}
                     key={idx}
                  />
               ))
            }
         </section>
      </main>
   )
}