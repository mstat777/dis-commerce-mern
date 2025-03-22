import './ProductCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import StarsRating from '../StarsRating/Index';

export default function ProductCard({data}){
   const IMG_URL = import.meta.env.VITE_IMG_URL;

   return (
      Object.values(data).length &&
      <article className="card">

         <span className="label">soldes</span>
         <img 
            className="main_img"
            src={`${IMG_URL}/${data.productImagePath}/${data.productMainImage}.jpg`} 
            alt={`l'image du produit ${data.title}`} 
         />

         <div className="rating_ctn">
            <StarsRating rating={data.rating} />
            <span>nb</span>
         </div>

         <p className="title">{data.title}</p>
         <p>{data.subtitle}</p>
         <p>{data.productPrice} / pce</p>
         <p>{data.discount}</p>
         <p>livraison</p>
         <p>retrait</p>

         <div className="price_and_cart_ctn">
            <span>{data.productPrice}€</span>
            <button>
               <FontAwesomeIcon icon={faBasketShopping} />
            </button>
         </div>

      </article>
   );
}