import './Header.scss';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import BurgerBtn from '../buttons/BurgerBtn/Index';
import logo from '../../assets/img/logo.png';

export default function Header() {
   const [showMenu, setShowMenu] = useState(false);

   return (
      <header className="header">
         <nav className="nav">
            <img className="logo" src={logo} alt="Dis Commerce logo" />

            <BurgerBtn
               showMenu={showMenu}
               setShowMenu={setShowMenu}
            />

            {showMenu &&
               <ul className={`menu ${showMenu ? 'show_menu' : ''}`}>
                  <li>
                     <NavLink
                        to={"/home"}
                        onClick={() => setShowMenu(false)}
                     >accueil</NavLink>
                  </li>

                  <li>
                     <NavLink
                        to={"/settings"}
                        onClick={() => setShowMenu(false)}
                     >settings</NavLink>
                  </li>
               </ul>
            }
         </nav>
      </header>
   );
}