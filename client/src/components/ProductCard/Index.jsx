import './ProductCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import StarsRating from '../StarsRating/Index';

export default function ProductCard(props){
   const {
      title,
      subtitle,
      description,
      mainCategory,
      subCategory,
      vendorId,
      status,
      variations
   } = props.data;

   const IMG_URL = import.meta.env.VITE_IMG_URL;

   //console.log(`${IMG_URL}/${variations[0].productImagePath}/${variations[0].productMainImage}.jpg`);

   return (
      Object.values(props).length &&
      <article className="card">

         <span className="label">soldes</span>
         <img 
            className="main_img"
            src={`${IMG_URL}/${variations[0].productImagePath}/${variations[0].productMainImage}.jpg`} 
            alt={`l'image du produit ${title}`} 
         />

         <div className="rating_ctn">
            <StarsRating rating={variations[0].rating} />
            <span>nb</span>
         </div>

         <p className="title">{title}</p>
         <p>{subtitle}</p>
         <p>{variations[0].productPrice} / pce</p>
         <p>{variations[0].discount}</p>
         <p>livraison</p>
         <p>retrait</p>

         <div className="price_and_cart_ctn">
            <span>{variations[0].productPrice}€</span>
            <button>
               <FontAwesomeIcon icon={faBasketShopping} />
            </button>
         </div>

      </article>
   );
}