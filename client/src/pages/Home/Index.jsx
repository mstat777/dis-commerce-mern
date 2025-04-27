import './Home.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchPromoProducts } from '../../utils/fetchData';
import ProductCard from '../../components/ProductCard/Index';

export default function Home(){
   const [products, setProducts] = useState([]);

   const user = useSelector((state) => state.user);
   console.log(user);

   useEffect(() => {
      async function fetchData() {
         try {
            const result = await fetchPromoProducts();
            if (result?.length){
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