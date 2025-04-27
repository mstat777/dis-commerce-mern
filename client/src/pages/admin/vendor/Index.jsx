import '../Admin.scss';
import { Link } from 'react-router-dom';
import SearchVendor from './SearchVendor/Index';

export default function Vendor(){

   return (
      <main className="admin">
         <h1>vendeurs</h1>

         <p>
            Ajouter un nouveau vendeur : 
            <Link 
               to={`/admin/vendeur/creation`}
               className="link">créer</Link>
         </p>

         <p>
            Retour au 
            <Link 
               to={`/admin`}
               className="link">tableau de bord</Link>
         </p>

         <SearchVendor />
      </main>
   )
}