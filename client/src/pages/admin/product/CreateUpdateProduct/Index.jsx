import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setMsg, setErrMsg } from "../../../../store/slices/messages";

export default function CreateUpdateProduct(){
   const BASE_URL = import.meta.env.VITE_API_URL;

   const dispatch = useDispatch();
   const { msg, errMsg } = useSelector((state) => state.messages)

   const { pathname } = useLocation();
   const create = pathname.includes("create") ? true : false;

   const [title, setTitle] = useState("");
   const [subtitle, setSubtitle] = useState("");
   const [mainCategory, setMainCategory] = useState("");
   const [subcategory, setSubcategory] = useState("");
   const [description, setDescription] = useState("");
   const [vendorId, setVendorId] = useState(0);
   const [status, setStatus] = useState("");
   // variations:
   const [color, setColor] = useState("");
   const [fabric, setFabric] = useState("");
   const [size, setSize] = useState("");
   const [quantity, setQuantity] = useState("");
   const [sku, setSku] = useState("");
   const [weight, setWeight] = useState(0);
   const [width, setWidth] = useState(0);
   const [length, setLength] = useState(0);
   const [height, setHeight] = useState(0);
   const [productPrice, setProductPrice] = useState(0);
   const [discount, setDiscount] = useState(0);
   const [rating, setRating] = useState(0);
   const [productImagePath, setProductImagePath] = useState("");
   const [productMainImage, setProductMainImage] = useState("");
   const [productOtherImages, setProductOtherImages] = useState([]);

   // control form inputs validation:
   const [isValidated, setIsValidated] = useState(false);

   // verify all inputs before sending the form data :
   const checkFormValidation = () => {
      // not yet developed: will be developed later
      setIsValidated(true);
   }

   useEffect(() => {
      if (isValidated) {
         submitForm();
      }
   },[isValidated]);

   const submitForm = async () => {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('subtitle', subtitle);
      formData.append('mainCategory', mainCategory);
      formData.append('subcategory', subcategory);
      formData.append('description', description);
      /*[...imagesAll].forEach((file, idx) => {
         formData.append(`file-${idx}`, file, file.name);
      });*/

      // if CREATION of a new product:
      if (create){
         const res = await fetch(`${BASE_URL}/api/v.0.1/product`, {
            method: "POST",
            headers: { Authentication: "Bearer " + TOKEN },
            body: formData
         });
         const json = await res.json();
         dispatch(res.status === 200 ? setMsg(json.msg) : setErrMsg(json.msg));
      } else {
      // if MODIFICATION of an existing product:
         formData.append('id', resultsLodgings[index].l.id);
         const res = await fetch(`${BASE_URL}/api/v.0.1/product`, {
            method: "PATCH",
            headers: { Authentication: "Bearer " + TOKEN },
            body: formData
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
         <h1>{create ? "Créer un nouveau produit" : "Modifier un produit"}</h1>

         <form 
            className="create_form"
            onSubmit={handleSubmit} 
            encType="multipart/form-data"
         >
            <div className="field">
               <label htmlFor="title">Titre :</label>
               <input 
                  type="text" 
                  name="title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
               />
            </div>

            <div className="field">
               <label htmlFor="subtitle">Sous-titre :</label>
               <input 
                  type="text" 
                  name="subtitle" 
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
               />
            </div>

            <div className="field">
               <label htmlFor="mainCategory">Catégorie :</label>
               <input 
                  type="text" 
                  name="mainCategory" 
                  value={mainCategory}
                  onChange={(e) => setMainCategory(e.target.value)}
               />
            </div>

            <div className="field">
               <label htmlFor="subcategory">Sous-catégorie :</label>
               <input 
                  type="text" 
                  name="subcategory" 
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
               />
            </div>

            <div className="field">
               <label htmlFor="description">Description :</label>
               <textarea 
                  name="description" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
               />
            </div>

            { errMsg && 
               <p className="err_msg">{errMsg}</p> }
            { msg && 
               <p className="ok_msg">{okMsg}</p> }
         </form>
      </main>
   )
}