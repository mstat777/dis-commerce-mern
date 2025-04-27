import './App.scss';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from './components/Loading/Index';
import Header from './components/Header/Index';
import Footer from './components/Footer/Index';
import Home from './pages/Home/Index';
import Sign from './pages/Sign/Index';
import Signout from './pages/Sign/Signout/Index';
import NotFound from './pages/NotFound/Index';

// User pages
import UserInfo from './pages/user/UserInfo/Index';
import UserCart from './pages/user/UserCart/Index';

// Admin pages
import Admin from './pages/admin/Index';
import Product from './pages/admin/product/Index';
import CreateUpdateProduct from './pages/admin/product/CreateUpdateProduct/Index';
import Vendor from './pages/admin/vendor/Index';
import CreateUpdateVendor from './pages/admin/vendor/CreateUpdateVendor/Index';

export default function App() {
   const [isLoading, setIsLoading] = useState(false);

   return (
      isLoading ?
         <Loading /> :
         <>
            <Header />
            
            <Routes>
               <Route index element={<Home />} />
               <Route path="accueil" element={<Home />} />
               <Route path="connexion" element={<Sign />} />
               <Route path="creation-compte" element={<Sign />} />
               <Route path="deconnexion" element={<Signout />} />

               <Route path="utilisateur">
                  <Route path="info" element={<UserInfo />} />
                  <Route path="panier" element={<UserCart />} />
               </Route>

               <Route path="admin">
                  <Route index element={<Admin />} />

                  <Route path="produit">
                     <Route index element={<Product />} />
                     <Route path="creation" element={<CreateUpdateProduct />} />
                     <Route path="mise-a-jour" element={<CreateUpdateProduct />} />
                  </Route>

                  <Route path="vendeur">
                     <Route index element={<Vendor />} />
                     <Route path="creation" element={<CreateUpdateVendor />} />
                     <Route path="mise-a-jour" element={<CreateUpdateVendor />} />
                  </Route>
               </Route>

               <Route path="*" element={<NotFound />} />
            </Routes>

            <Footer />
         </>
   );
}