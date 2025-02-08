import './BtnWithConfirm.scss';
import { useState } from 'react';
import MainBtn from '../MainBtn/Index';

export default function BtnWithConfirm(props){
   const {text, clickFunc, child} = props;

   const [showPopup, setShowPopup] = useState(false);

   return (
      <div className="btn_with_popup">
         <MainBtn 
            type="button"
            onClick={() => setShowPopup(true)} 
            text={text}
            child={child}
         />

         {showPopup &&
            <div className="alert">
               <p>Êtes-vous sûr(e) ?</p>

               <MainBtn 
                  type="button"
                  text="NON" 
                  onClick={() => setShowPopup(false)}
               />

               <MainBtn 
                  type="button"
                  text="OUI"
                  onClick={() => {
                     setShowPopup(false);
                     clickFunc();
                  }}
               />
            </div>
         }
      </div>
   )
}