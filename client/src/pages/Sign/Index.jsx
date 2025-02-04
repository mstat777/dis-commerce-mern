import './Sign.scss';
import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../store/slices/user.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash, faPhone, faEnvelope, faLocationDot, faCakeCandles, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { faUser as faUserReg } from '@fortawesome/free-regular-svg-icons';
import MainBtn from '../../components/buttons/MainBtn/Index';
import Modal from '../../components/Modal/Index';
import TermsOfUse from '../general/TermsOfUse/Index';

export default function Sign(){
   const BASE_URL = import.meta.env.VITE_API_URL;

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const { pathname } = useLocation();
   const signin = pathname.includes("signin") ? true : false;

   const { isLogged } =  useSelector((state) => state.user);
   
   const [inputs, setInputs] = useState({
      lastName: "",
      firstName: "",
      email: "",
      tel: "",
      address: {
         street: "",
         city: "",
         postalCode: "",
         country: "",
      },
      birthDate: "",
      password: "",
      newsLetter: false
   });
   const [privacy, setPrivacy] = useState(false);

   const [inputDateType, setInputDateType] = useState("text");
   const [passInputType, setPassInputType] = useState("password"); // show/hide the pswd eye icon
   const [passIcon, setPassIcon] = useState(faEyeSlash);
   const [okMsg, setOkMsg] = useState('');
   const [errMsg, setErrMsg] = useState('');

   function handlePassIconToggle() {
      if (passInputType === "password") {
         setPassIcon(faEye);
         setPassInputType('text')
      } else {
         setPassIcon(faEyeSlash)
         setPassInputType('password')
      }
   }

   function handleOnFocus(){
      setErrMsg('');
      setOkMsg('');
   }

   const handleInputChange = (e) => {
      if (e.target.type !== "checkbox"){
         if (!e.target.name.includes("address")){
            setInputs({ ...inputs, [e.target.name]: e.target.value });
         } else {
            const adressKey = e.target.name.replace('address.','');
            setInputs({ ...inputs, address: { ...inputs.address, [adressKey]: e.target.value} });
         }
      } else {
         setInputs({ ...inputs, [e.target.name]: !inputs[e.target.name] });
      }
   }
   
   async function handleSubmit(e){
      e.preventDefault();

      if (signin){
         // SIGNIN page form
         const res = await fetch(`${BASE_URL}/api/v.0.1/user/signin`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
               email: inputs.email, 
               password: inputs.password 
            }),
         });
         const json = await res.json();
         if(res.status === 200){
            localStorage.setItem("auth", json.TOKEN);
            dispatch(signin(json));
            navigate("/");
         } else {
            setErrMsg(json.msg);
         }
      } else {
         // SIGNUP page form
         const res = await fetch(`${BASE_URL}/api/v.0.1/user/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputs)
         });
         const json = await res.json();
         console.log(json);
         setErrMsg(json.msg);
         
         if (res.status === 201) {
            setOkMsg("Votre compte a bien été créé.\nVous pouvez désormais vous connecter.");
            navigate("/signin");
         } else {
            console.log(json.errors);
         }
      }
   }

   return (
      <main className="sign">
         <section className="sign_section">
            { okMsg && 
               <p className={styles.ok_msg}>{okMsg}</p> }
            { errMsg && 
               <p className="err_msg">{errMsg}</p> }
            
            { signin ? 
               <h1>Se connecter</h1> : 
               <h1>Créer votre compte</h1> }

            <form onSubmit={handleSubmit} className="sign_form">

               { !signin && 
               <>
                  <label> 
                     <FontAwesomeIcon icon={faUserReg} className="input_icon"/>  
                     <input 
                        type="text" 
                        name="firstName" 
                        placeholder="Prénom*"
                        value={inputs.firstName}
                        onChange={handleInputChange}
                        required
                     />
                  </label>  

                  <label> 
                     <FontAwesomeIcon icon={faUser} className="input_icon"/> 
                     <input 
                        type="text" 
                        name="lastName" 
                        placeholder="Nom*"
                        value={inputs.lastName}
                        onChange={handleInputChange}
                        required
                     />
                  </label>
               </>
               }

               <label> 
                  <FontAwesomeIcon icon={faEnvelope} className="input_icon"/>
                  <input 
                     type="email" 
                     name="email" 
                     placeholder="Votre adresse mail"
                     value={inputs.email}
                     onChange={handleInputChange}
                     onFocus={handleOnFocus}
                     required
                  />
               </label>

               { !signin && 
               <>
                  <label> 
                     <FontAwesomeIcon icon={faPhone} className="input_icon"/> 
                     <input 
                        type="tel" 
                        name="tel" 
                        placeholder="Numéro de téléphone*"
                        value={inputs.tel}
                        onChange={handleInputChange}
                        required
                     /> 
                  </label>

                  <label> 
                     <FontAwesomeIcon icon={faLocationDot} className="input_icon"/>  
                     <input 
                        type="text" 
                        name="address.street" 
                        placeholder="num. et nom de voie"
                        value={inputs.address.street}
                        onChange={handleInputChange}
                     />  
                     <input 
                        type="text" 
                        name="address.postalCode" 
                        placeholder="code postal"
                        value={inputs.address.postalCode}
                        onChange={handleInputChange}
                     />
                     <input 
                        type="text" 
                        name="address.city" 
                        placeholder="ville"
                        value={inputs.address.city}
                        onChange={handleInputChange}
                     /> 
                     <input 
                        type="text" 
                        name="address.country" 
                        placeholder="pays"
                        value={inputs.address.country}
                        onChange={handleInputChange}
                     />
                  </label>

                  <label> 
                     <FontAwesomeIcon icon={faCakeCandles} className="input_icon"/>  
                     <input 
                        type={inputDateType} 
                        name="birthDate" 
                        placeholder="Date de naissance*"
                        min="1920-01-01"
                        value={inputs.birthDate}
                        onChange={handleInputChange}
                        onFocus={() => setInputDateType("date")}
                        required/> 
                  </label>
               </>
               }

               <label> 
                  <FontAwesomeIcon icon={faLock} className="input_icon"/>
                  <input 
                     className="pass_input"
                     name="password" 
                     type={passInputType} 
                     placeholder="Votre mot de passe"
                     value={inputs.password}
                     onChange={handleInputChange}
                     onFocus={handleOnFocus}
                     required
                  />
                  <button 
                     type="button"
                     className="pass_icon_ctn" 
                     onClick={handlePassIconToggle}
                  >
                     <FontAwesomeIcon icon={passIcon} className="pass_icon"/>
                  </button>    
               </label>

               { !signin && 
               <>
                  <div> 
                     <label className="label_checkbox">
                        <input 
                           type="checkbox" 
                           name="newsLetter"
                           checked={inputs.newsLetter} 
                           onChange={handleInputChange}
                        />
                        <span>Je souhaite m'inscrire à la newsletter</span>
                     </label>

                     <label className="label_checkbox">
                        <input 
                           type="checkbox" 
                           name="privacy"
                           checked={privacy} 
                           onChange={() => setPrivacy(!privacy)}
                        />
                        <span>En cochant cette case, vous déclarez avoir lu et accepter nos  <Modal text="conditions d'utilisation" child={TermsOfUse}/> et la <Modal text="politique de confidentialité" child={TermsOfUse}/>
                        </span>
                     </label>
                  </div>
               </>
               }
               
               <MainBtn type="submit" text={signin ? "se connecter" : "s'inscrire"}/>
            </form>

            { signin ? 
               <p>Vous n'avez pas encore de compte ?<Link to="/signup">En créer un</Link></p> :
               <p>Vous avez déjà un compte ?<Link to="/signin">Se connecter</Link></p>
            }

         </section>
      </main>
   )
}