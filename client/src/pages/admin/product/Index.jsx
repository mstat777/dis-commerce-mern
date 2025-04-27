import '../Admin.scss';
import { Link } from 'react-router-dom';
import SearchProduct from './SearchProduct/Index';

export default function Product(){

   return (
      <main className="admin">
         <h1>produits</h1>

         <p>
            Ajouter un nouveau produit : 
            <Link 
               to={`/admin/produit/creation`}
               className="link">créer</Link>
         </p>

         <p>
            Retour au 
            <Link 
               to={`/admin`}
               className="link">tableau de bord</Link>
         </p>

         <SearchProduct />
      </main>
   )
}