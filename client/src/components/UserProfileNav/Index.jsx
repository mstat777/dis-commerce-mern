import './UserProfileNav.scss';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';

export default function UserProfileNav(){
   //const TOKEN = localStorage.getItem("auth");
   const { roles } = useSelector((state) => state.user);
   console.log(roles);

   return (
      <div className="user_profile">
         <FontAwesomeIcon icon={faUser} className="user_icon"/>
         <ul>
            <li>
               <NavLink
                  to={"/utilisateur/info"}
                  //onClick={() => setShowMenu(false)}
               >mes infos</NavLink>
            </li>
            <li>
               <NavLink
                  to={"/utilisateur/panier"}
                  //onClick={() => setShowMenu(false)}
               >mon panier</NavLink>
            </li>

            {(roles === "admin") && 
               <li>
                  <NavLink
                     to={"/admin"}
                     onClick={() => setShowMenu(false)}
                  >tableau de bord</NavLink>
               </li>
            }
         </ul>
      </div>
   )
}