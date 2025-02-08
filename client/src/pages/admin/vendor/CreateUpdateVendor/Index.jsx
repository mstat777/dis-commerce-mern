import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setMsg, setErrMsg } from "../../../../store/slices/messages";
import MainBtn from "../../../../components/buttons/MainBtn/Index";

export default function CreateUpdateVendor(){
   const BASE_URL = import.meta.env.VITE_API_URL;
   const TOKEN = localStorage.getItem("auth");

   const dispatch = useDispatch();
   const { msg, errMsg } = useSelector((state) => state.messages);
   const { data } = useSelector((state) => state.adminData);

   const { pathname } = useLocation();
   const creation = pathname.includes("creation") ? true : false;

   const [name, setName] = useState("");
   const [address, setAddress] = useState("");

   // control form inputs validation:
   const [isValidated, setIsValidated] = useState(false);

   // verify all inputs before sending the form data :
   const checkFormValidation = () => {
      // not yet developed: will be developed later
      setIsValidated(true);
   }

   // if MODIFY page, load inputs data
   useEffect(() => {
      if (!creation) {
         setName(data.name);
         setAddress(data.address);
      }
   },[]);

   useEffect(() => {
      if (isValidated) {
         submitForm();
      }
   },[isValidated]);

   const submitForm = async () => {
      // if CREATION of a new product:
      if (creation){
         console.log({
            name: name,
            address: address
         });
         const res = await fetch(`${BASE_URL}/api/v.0.1/vendor/`, {
            method: "POST",
            headers: { 
               Authentication: "Bearer " + TOKEN,
               "Content-Type": "application/json"
            },
            body: JSON.stringify({
               name: name,
               address: address
            })
         });
         const json = await res.json();
         dispatch(res.status === 200 ? setMsg(json.msg) : setErrMsg(json.msg));
      } else {
      // if MODIFICATION of an existing product:
         const res = await fetch(`${BASE_URL}/api/v.0.1/vendor`, {
            method: "PATCH",
            headers: { 
               Authentication: "Bearer " + TOKEN,
               "Content-Type": "application/json"
            },
            body: JSON.stringify({
               name: name,
               address: address
            })
         });     
         if (res.status === 200) {
            dispatch(setMsg("Les modifications ont été enregistrées."));
         }
      }
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      checkFormValidation();
   }

   return (
    
      <main className="admin">
         <h1>{creation ? "Ajouter un nouveau vendeur" : "Modifier un vendeur"}</h1>

         <form 
            className="create_form"
            onSubmit={handleSubmit} 
         >
            <div className="field">
               <label htmlFor="title">Nom :</label>
               <input 
                  type="text" 
                  name="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
               />
            </div>

            <div className="field">
               <label htmlFor="address">Adresse :</label>
               <textarea 
                  type="text" 
                  name="address" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows="4"
               />
            </div>

            <MainBtn 
               type="submit" 
               text="enregistrer"
            />

            { errMsg && 
               <p className="err_msg">{errMsg}</p> }
            { msg && 
               <p className="ok_msg">{msg}</p> }
         </form>
      </main>
   )
}