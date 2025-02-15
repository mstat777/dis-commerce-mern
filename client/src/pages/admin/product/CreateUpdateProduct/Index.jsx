import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setMsg, setErrMsg } from "../../../../store/slices/messages";
import MainBtn from "../../../../components/buttons/MainBtn/Index";

export default function CreateUpdateProduct(){
   const BASE_URL = import.meta.env.VITE_API_URL;
   const TOKEN = localStorage.getItem("auth");

   const dispatch = useDispatch();
   const { msg, errMsg } = useSelector((state) => state.messages)
   const { data } = useSelector((state) => state.adminData);
   const { pathname } = useLocation();
   const creation = pathname.includes("creation") ? true : false;

   const [inputs, setInputs] = useState({
      title: "",
      subtitle: "",
      mainCategory: "",
      subcategory: "",
      description: "",
      vendorId: null,
      status: "",
      color: "",
      size: "",
      quantity: "",
      sku: "",
      weight: null,
      width: null,
      length: null,
      height: null,
      productPrice: null,
      discount: null,
      rating: null,
      productImagePath: ""
   });

   const [productMainImage, setProductMainImage] = useState("");
   const [productOtherImages, setProductOtherImages] = useState([]);

   const [vendors, setVendors] = useState([]);

   const handleInputChange = (e) => {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
   };

   // control form inputs validation:
   const [isValidated, setIsValidated] = useState(false);

   // if MODIFY page, load inputs data
   useEffect(() => {
      if (!creation) {
         setInputs(data);
      }
   },[]);

   useEffect(() => {
      if (isValidated) {
         submitForm();
      }
   },[isValidated]);

   // Load vendors
   useEffect(() => {
      const getVendors = async () => {
         const res = await fetch(`${BASE_URL}/api/v.0.1/vendor`);
         const json = await res.json();
         console.log(json);
         dispatch(res.status === 200 ? setVendors(json) : setErrMsg(json.msg));
      }

      if (!vendors.length) {
         getVendors();
      }
   },[]);

   // verify all inputs before sending the form data :
   const checkFormValidation = () => {
      // not yet developed: will be developed later
      setIsValidated(true);
   }

   const submitForm = async () => {
      const formData = new FormData();
      formData.append('title', inputs.title);
      formData.append('subtitle', inputs.subtitle);
      formData.append('mainCategory', inputs.mainCategory);
      formData.append('subcategory', inputs.subcategory);
      formData.append('description', inputs.description);
      formData.append('vendorId', inputs.vendorId);
      formData.append('status', inputs.status);
      formData.append('color', inputs.color);
      formData.append('size', inputs.size);
      formData.append('quantity', inputs.quantity);
      formData.append('sku', inputs.sku);
      formData.append('weight', inputs.weight);
      formData.append('width', inputs.width);
      formData.append('length', inputs.length);
      formData.append('height', inputs.height);
      formData.append('productPrice', inputs.productPrice);
      formData.append('discount', inputs.discount);
      formData.append('rating', inputs.rating);
      formData.append('productMainImage', productMainImage);
      [...productOtherImages].forEach((file, idx) => {
         formData.append(`file-${idx}`, file, file.name);
      });

      // if CREATION of a new product:
      if (creation){
         const res = await fetch(`${BASE_URL}/api/v.0.1/product`, {
            method: "POST",
            headers: { Authentication: "Bearer " + TOKEN },
            body: formData
         });
         const json = await res.json();
         dispatch(res.status === 200 ? setMsg(json.msg) : setErrMsg(json.msg));
      } else {
      // if MODIFICATION of an existing product:
         formData.append('id', data.id);
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
         <h1>{creation ? "Créer un nouveau produit" : "Modifier un produit"}</h1>

         { vendors &&
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
                     value={inputs.title}
                     onChange={handleInputChange}
                  />
               </div>

               <div className="field">
                  <label htmlFor="subtitle">Sous-titre :</label>
                  <input 
                     type="text" 
                     name="subtitle" 
                     value={inputs.subtitle}
                     onChange={handleInputChange}
                  />
               </div>

               <div className="field">
                  <label htmlFor="mainCategory">Catégorie :</label>
                  <input 
                     type="text" 
                     name="mainCategory" 
                     value={inputs.mainCategory}
                     onChange={handleInputChange}
                  />
               </div>

               <div className="field">
                  <label htmlFor="subcategory">Sous-catégorie :</label>
                  <input 
                     type="text" 
                     name="subcategory" 
                     value={inputs.subcategory}
                     onChange={handleInputChange}
                  />
               </div>

               <div className="field">
                  <label htmlFor="description">Description :</label>
                  <textarea 
                     name="description" 
                     value={inputs.description}
                     onChange={handleInputChange}
                  />
               </div>

               <div className="field">
                  <label htmlFor="vendorId">ID vendeur :</label>
                  <select 
                     name="vendorId" 
                     defaultValue="0"
                     onChange={handleInputChange}
                  >
                     {vendors.map((vendor) => (
                        <option value={vendor.id} key={vendor.id}>{vendor.name}</option>
                     ))}
                  </select>
               </div>

               <div className="field">
                  <label htmlFor="status">Statut :</label>
                  <input 
                     type="text" 
                     name="status"
                     value={inputs.status}
                     onChange={handleInputChange}
                  />
               </div>

               <div className="field">
                  <label htmlFor="color">Couleur :</label>
                  <input 
                     type="text" 
                     name="color" 
                     value={inputs.color}
                     onChange={handleInputChange}
                  />
               </div>

               <div className="field">
                  <label htmlFor="size">Taille :</label>
                  <input 
                     type="text" 
                     name="size" 
                     value={inputs.size}
                     onChange={handleInputChange}
                  />
               </div>

               <div className="field">
                  <label htmlFor="quantity">Quantité :</label>
                  <input 
                     type="text" 
                     name="quantity" 
                     value={inputs.quantity}
                     onChange={handleInputChange}
                  />
               </div>

               <div className="field">
                  <label htmlFor="sku">sku :</label>
                  <input 
                     type="text" 
                     name="sku" 
                     value={inputs.sku}
                     onChange={handleInputChange}
                  />
               </div>

               <div className="field">
                  <label htmlFor="weight">Poids :</label>
                  <input 
                     type="text" 
                     name="weight" 
                     value={inputs.weight}
                     onChange={handleInputChange}
                  />
               </div>

               <div className="field">
                  <label htmlFor="width">Largeur :</label>
                  <input 
                     type="text" 
                     name="width" 
                     value={inputs.width}
                     onChange={handleInputChange}
                  />
               </div>

               <div className="field">
                  <label htmlFor="length">Longueur :</label>
                  <input 
                     type="text" 
                     name="length" 
                     value={inputs.length}
                     onChange={handleInputChange}
                  />
               </div>

               <div className="field">
                  <label htmlFor="height">Hauteur :</label>
                  <input 
                     type="text" 
                     name="height" 
                     value={inputs.height}
                     onChange={handleInputChange}
                  />
               </div>

               <div className="field">
                  <label htmlFor="productPrice">Prix de produit :</label>
                  <input 
                     type="text" 
                     name="productPrice" 
                     value={inputs.productPrice}
                     onChange={handleInputChange}
                  />
               </div>

               <div className="field">
                  <label htmlFor="discount">Réduction :</label>
                  <input 
                     type="text" 
                     name="discount" 
                     value={inputs.discount}
                     onChange={handleInputChange}
                  />
               </div>

               <div className="field">
                  <label htmlFor="rating">Note :</label>
                  <input 
                     type="text" 
                     name="rating" 
                     value={inputs.rating}
                     onChange={handleInputChange}
                  />
               </div>

               <div className="field">
                  <label htmlFor="productImagePath">URL image :</label>
                  <input 
                     type="text" 
                     name="productImagePath" 
                     value={inputs.productImagePath}
                     onChange={handleInputChange}
                  />
               </div>

               <div className="field">
                  <label htmlFor="productMainImage">Image principale :</label>
                  <input 
                     type="file" 
                     name="productMainImage" 
                     accept="image/jpg"
                     onChange={(e) => setProductMainImage(e.target.files[0])}
                  />
               </div>

               <div className="field">
                  <label htmlFor="productOtherImages">Autres images :</label>
                  <input 
                     type="file" 
                     name="productOtherImages" 
                     accept="image/jpg"
                     multiple
                     onChange={(e) => setProductOtherImages(e.target.files)}
                  />
               </div>

               <MainBtn 
                  type="submit" 
                  text="enregistrer"
               />

               { errMsg && 
                  <p className="err_msg">{errMsg}</p> }
               { msg && 
                  <p className="ok_msg">{okMsg}</p> }
            </form>
         }
      </main>
   );
}