import './Header.scss';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import BurgerBtn from '../buttons/BurgerBtn/Index';
import logo from '../../assets/img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { useSelector } from 'react-redux';

export default function Header() {
   const TOKEN = localStorage.getItem("auth");
   const { isLogged } = useSelector((state) => state.user);
   const [showMenu, setShowMenu] = useState(false);

   return (
      <header className="header">
         <nav className="nav">
            <img className="logo" src={logo} alt="Dis Commerce logo" />

            <BurgerBtn
               showMenu={showMenu}
               setShowMenu={setShowMenu}
            />

            { showMenu &&
               <ul className={`menu ${showMenu ? 'show_menu' : ''}`}>
                  <li>
                     <NavLink
                        to={"/accueil"}
                        onClick={() => setShowMenu(false)}
                     >accueil</NavLink>
                  </li>

                  <li>
                     <NavLink
                        to={"/parametres"}
                        onClick={() => setShowMenu(false)}
                     >settings</NavLink>
                  </li>
               </ul>
            }

            <NavLink 
               to={TOKEN || isLogged ? "/deconnexion" : "/connexion"}
               className="sign_btn"
            >
               <FontAwesomeIcon icon={faUser}/>
               <span>{TOKEN || isLogged  ? "déconnexion" : "connexion"}</span>
            </NavLink>
         </nav>
      </header>
   );
}