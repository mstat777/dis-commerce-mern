import '../../Admin.scss';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { setMsg, setErrMsg, clearAllMsg } from "../../../../store/slices/messages";
import { setData } from "../../../../store/slices/adminData";
import MainBtn from "../../../../components/buttons/MainBtn/Index";
import BtnWithConfirm from "../../../../components/buttons/BtnWithConfirm/Index";

export default function SearchProduct(){
   const BASE_URL = import.meta.env.VITE_API_URL;
   const TOKEN = localStorage.getItem("auth");

   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { msg, errMsg } = useSelector((state) => state.messages);

   const [title, setTitle] = useState(""); // search by product title
   const [mainCategory, setMainCategory] = useState(""); // search by product title
   const [results, setResults] = useState([]);

   async function handleSubmit(e){
      e.preventDefault();
      const res = await fetch(`${BASE_URL}/api/v.0.1/product/title`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ title }),
      });
      const json = await res.json();
      console.log(json);
      if(res.status === 200){
         setResults(json);
         if (!json.length) {
            dispatch(setMsg("Aucun résultat trouvé."));
         } else {
            dispatch(clearAllMsg());
         }
      } else {
         dispatch(setErrMsg(json.msg));
      }
   }

   const handleModify = (idx) => {
      console.log(results[idx]);
      dispatch(setData(results[idx]));
      navigate(`/admin/produit/mise-a-jour`);
   }

   const handleDelete = async (idx) => {
      console.log({
         name: results[idx].title
      });
      const res = await fetch(`${BASE_URL}/api/v.0.1/product/`, {
         method: "DELETE",
         headers: { 
            Authentication: "Bearer " + TOKEN,
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            name: results[idx].title
         })
      });
      const json = await res.json();
      dispatch(res.status === 200 ? setMsg(json.msg) : setErrMsg(json.msg));
   }

   return (
      <>
         <form 
            onSubmit={handleSubmit} 
            className="search_form"
         >
            <div className="field">
               <label htmlFor="title">Titre :</label>
               <input 
                  type="text" 
                  name="title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onFocus={() => dispatch(clearAllMsg())}
                  placeholder="Nom de produit"
               />
            </div>

            <div className="field">
               <label htmlFor="mainCategory">Catégorie :</label>
               <input 
                  type="text" 
                  name="mainCategory" 
                  value={mainCategory}
                  onChange={(e) => setMainCategory(e.target.value)}
                  onFocus={() => dispatch(clearAllMsg())}
                  placeholder="Catégorie de produit"
               />
            </div>

            <div className="buttons">
               <MainBtn type="submit" text="rechercher"/>
               <MainBtn type="button" text="effacer"/>
            </div>

            { errMsg && 
               <p className="msg_nok">{errMsg}</p> }
         </form>

         { msg && 
            <p className="msg_ok">{msg}</p> }

         { results?.length > 0 &&
            <section className="results_section">
               <h2>Résultats</h2>

               <table className="results_table">
                  <thead>
                     <tr> 
                        <th>N&deg;</th> 
                        <th>Titre</th>
                        <th>Sous-titre</th>
                        <th>Catégorie</th>
                        <th>Sous-catégorie</th>
                        <th>Description</th>
                        <th>Vendeur</th>
                        <th>Statut</th>
                        <th>Modif.</th>
                        <th>Suppr.</th>
                     </tr>
                  </thead>

                  <tbody>  
                  { results.map((product, i) => 
                     <tr key={i}>
                        <td>{i+1}</td>
                        <td><b>{product.title}</b></td>
                        <td>{product.subtitle}</td>
                        <td>{product.mainCategory}</td>
                        <td>{product.subCategory}</td>
                        <td className="description">
                           {product.description}
                        </td>
                        <td>{product.vendorId}</td>
                        <td>{product.status}</td>
                        <td>
                           <button 
                              type="button"
                              onClick={() => handleModify(i)}
                           >
                              <FontAwesomeIcon icon={faPencil} className="modify_icon"/>
                           </button>
                        </td>
                        <td>
                           <BtnWithConfirm 
                              clickFunc={() => handleDelete(i)}
                              child={
                                 <FontAwesomeIcon 
                                    icon={faTrashCan} className="delete_icon"
                                 />
                              }
                           />
                        </td>
                     </tr>
                  )}
                  </tbody>
               </table>
            </section>
         }
      </>
   )
}