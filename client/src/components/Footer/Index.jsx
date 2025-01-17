import './Footer.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import MainBtn from '../buttons/MainBtn/Index';
import visa from '../../assets/img/payment/visa.png';
import masterCard from '../../assets/img/payment/mastercard.png';
import americanExpress from '../../assets/img/payment/american-express.png';
import discover from '../../assets/img/payment/discover.png';

export default function Footer() {
   const [userEmail, setUserEmail] = useState('');
   const [okMsg, setOkMsg] = useState('');
   const [errMsg, setErrMsg] = useState('');

   const clearMessages = () => {
      setOkMsg('');
      setErrMsg('');
   }

   return (
      <footer className="footer">
         <section className="footer_links">

            <div>
               <h2 className="footer_title">suivez-nous</h2>
               <ul className="footer_social">
                  <li><a href="https://www.facebook.com/BeautifulDestinations/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faFacebook} /></a>
                  </li>
                  <li><a href="https://twitter.com/beadestinations?lang=fr" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTwitter} /></a></li>
                  <li><a href="https://www.instagram.com/beautifuldestinations/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faInstagram} /></a></li>
                  <li><a href="https://www.youtube.com/watch?v=RgCENw09Dpk" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faYoutube}/></a></li>
               </ul>

               <h2 className="footer_title">A propos</h2>
               <ul>
                  <li><Link to={"/agency"}>A propos</Link></li>
                  <li><Link to={"/general/recruitment"}>Recrutement</Link></li>
               </ul>
            </div>

            <div>
               <h2 className="footer_title">informations pratiques</h2>
               <ul>
                  <li><Link to={"/general/terms-of-use"}>Conditions Particulières de Vente</Link></li>
                  <li><Link to={"/general/terms-of-use"}>Mentions légales</Link></li>
                  <li><Link to={"/general/terms-of-use"}>Politique de confidentialité</Link></li>
                  <li><Link to={"/general/terms-of-use"}>Avant de partir</Link></li>
                  <li><Link to={"/general/info-covid"}>Info Covid</Link></li>
               </ul>
            </div>

            <div>
               <h2>inscription newsletter</h2>
               <p>J'accepte de recevoir les offres commerciales et newsletters de Dis Commerce</p>

               <form onSubmit={() => console.log("form submitted")} className="newsletter_form">
                  <input type="email" 
                     name="userEmail" 
                     value={userEmail}
                     onChange={(e) => setUserEmail(e.target.value)}
                     onFocus={clearMessages}
                     placeholder="Email"
                     required/>
                  <MainBtn type="submit" text="OK"/>
               </form>

               { okMsg && 
                  <p className="ok_msg">{okMsg}</p>}
               { errMsg && 
                  <p className="err_msg">{errMsg}</p>}

               <h2>paiement sécurisé</h2>
               <div className="payment_methods">
                  <img src={visa} alt="carte Visa"/>
                  <img src={masterCard} alt="carte MasterCard"/>
                  <img src={americanExpress} alt="carte American Express"/>
                  <img src={discover} alt="carte Discover"/>
               </div>
            </div>
         </section>

         <section className="footer_legal">
            <p>&copy;2025 Dis Commerce. Tous droits réservés.</p>
         </section>

      </footer>
   );
}