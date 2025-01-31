import './NotFound.scss';
import { Link } from 'react-router-dom';

export default function NotFound(){
   return (
      <main className="not_found">
         <h1>erreur 404 : page non trouvée</h1>
         <p>Cette page n'est pas disponible. Retourner à <Link to="/home">l'acceuil</Link></p>
      </main>
   );
}