import '../../Admin.scss';
import { useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { setErrMsg, clearAllMsg } from "../../../../store/slices/messages";
import MainBtn from "../../../../components/buttons/MainBtn/Index";

export default function SearchVendor(){
   const BASE_URL = import.meta.env.VITE_API_URL;

   const dispatch = useDispatch();
   const { msg } = useSelector((state) => state.messages);

   const [name, setName] = useState(""); // search by product title
   const [results, setResults] = useState([]);

   async function handleSubmit(e){
      e.preventDefault();

      const res = await fetch(`${BASE_URL}/api/v.0.1/vendor/name`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ name }),
      });
      const json = await res.json();
      console.log(json);
      if(res.status === 200){
         setResults(json);
      } else {
         dispatch(setErrMsg(json.msg));
      }
   }

   return (
      <main className="admin">
         <form 
            onSubmit={handleSubmit} 
            className="search_form"
         >
            <div className="field">
               <label htmlFor="name">Nom :</label>
               <input 
                  type="text" 
                  name="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => dispatch(clearAllMsg)}
                  placeholder="Nom du vendeur"
               />
            </div>

            <div className="buttons">
               <MainBtn type="submit" text="rechercher"/>
               <MainBtn type="button" text="effacer"/>
            </div>

            { msg && 
               <p className="msg_nok">{msg}</p> }
         </form>

         { results?.length > 0 &&
            <section className="results_section">
               <h2>Résultats</h2>

               <table className="results_table">
                  <thead>
                     <tr> 
                        <th>N&deg;</th> 
                        <th>Nom</th>
                        <th>Adresse</th>
                        <th>Date enregistré</th>
                     </tr>
                  </thead>

                  <tbody>  
                  { results.map((product, i) => 
                     <tr key={i}>
                        <td>{i+1}</td>
                        <td><b>{product.name}</b></td>
                        <td>{product.address}</td>
                        <td>{product.registerDate}</td>
                        <td>
                           <Link to={`/admin/vendor/update`}>
                              <FontAwesomeIcon icon={faPencil} className="modify_icon"/>
                           </Link>
                        </td>
                     </tr>
                  )}
                  </tbody>
               </table>
            </section>
         }
      </main>
   )
}