import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Admin(){
   const user = useSelector((state) => state.user);
   const adminData = useSelector((state) => state.adminData);
   useEffect(() => {
      console.log(user);
      console.log(adminData);
   },[JSON.stringify(user)]);

   return (
      <main className="admin">
         <h1>tableau d'administration</h1>
         <section>
            <Link 
               to="/admin/produit"     className="link">produits</Link>
            <Link 
               to="/admin/vendeur" 
               className="link">vendeurs</Link>
         </section>
      </main>
   )
}