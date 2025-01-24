import './Home.scss';
import { useEffect, useState } from 'react';
import { fetchPromoProducts } from '../../utils/fetchData';
import ProductCard from '../../components/ProductCard/Index';

export default function Home(){
   const API_URL = import.meta.env.VITE_API_URL;
   const [products, setProducts] = useState([]);

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