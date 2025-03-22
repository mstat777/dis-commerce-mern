import './BurgerBtn.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function BurgerBtn(props) {
   const { showMenu, setShowMenu } = props;

   return (
      <button 
         onClick={() => setShowMenu(!showMenu)}
         className="burger_btn"
      >      
         <FontAwesomeIcon icon={faBars} />
         <span>menu</span>
      </button>
   )
}