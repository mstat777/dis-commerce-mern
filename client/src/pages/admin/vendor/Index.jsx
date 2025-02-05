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
               to={`/admin/vendor/create`}
               className="link"
            >
               créer
            </Link>
         </p>

         <SearchVendor />
      </main>
   )
}