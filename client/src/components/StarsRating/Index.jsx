import './StarsRating.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

export default function StarsRating({rating}){
   const maxRating = 5;

   let fullStars = Math.trunc(rating);
   let halfStars;
   const decimal = rating % 1;

   if (decimal >= 0.25 && decimal < 0.75){
      halfStars = 1;
   } else {
      halfStars = 0;
      if (decimal >= 0.75){
         fullStars++;
      }
   }
   const emptyStars = maxRating - fullStars - halfStars;
   //console.log(fullStars,decimal,emptyStars);

   return (
      rating ?
      <div className="rating">
         {/* ----- show full stars ----- */}
         { fullStars ? 
            [...Array(fullStars)].map((_, i) => 
                  <FontAwesomeIcon icon={faStar} key={i}/>
               ) : null
         }
         {/* ----- show half stars ----- */}
         { halfStars ? 
            <FontAwesomeIcon icon={faStarHalfStroke} /> : null
         }
         {/* ----- show empty stars ----- */}
         { emptyStars ? 
            [...Array(emptyStars)].map((_, i) => 
                  <FontAwesomeIcon icon={faStarEmpty} key={i}/>
               ) : null
         }
      </div> : null
   )
}