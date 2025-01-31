import './Modal.scss';
import { useState } from 'react';

export default function Modal(props){
   const {child, text} = props;
   const Child = child;
   const [showModal, setShowModal] = useState(false);

   return (
      <>
    styles     <button 
            type="button" 
            className="modal_btn"
            onClick={() => setShowModal(true)}
         >
            {text}
         </button>

         {showModal &&
            <div className="modal_ctn">
               <div className="modal">
                  <Child/>
                  <button 
                     type="button"
                     className="close_modal_btn" 
                     onClick={() => setShowModal(false)}
                  >
                     X
                  </button>
               </div>
            </div>
         }
      </>
   );
}