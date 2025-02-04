import './App.scss';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from './components/Loading/Index';
import Header from './components/Header/Index';
import Footer from './components/Footer/Index';
import Home from './pages/Home/Index';
import Sign from './pages/Sign/Index';
import NotFound from './pages/NotFound/Index';

// Admin pages
import Admin from './pages/admin/Index';
import SearchProduct from './pages/admin/product/SearchProduct/Index';
import CreateUpdateProduct from './pages/admin/product/CreateUpdateProduct/Index';
import SearchVendor from './pages/admin/vendor/SearchVendor/Index';
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
               <Route path="home" element={<Home />} />
               <Route path="signin" element={<Sign />} />
               <Route path="signup" element={<Sign />} />

               <Route path="admin">
                  <Route index element={<Admin />} />

                  <Route path="product">
                     <Route path="search" element={<SearchProduct />} />
                     <Route path="create" element={<CreateUpdateProduct />} />
                     <Route path="update" element={<CreateUpdateProduct />} />
                  </Route>

                  <Route path="vendor">
                     <Route path="search" element={<SearchVendor />} />
                     <Route path="create" element={<CreateUpdateVendor />} />
                     <Route path="update" element={<CreateUpdateVendor />} />
                  </Route>
               </Route>

               <Route path="*" element={<NotFound />} />
            </Routes>

            <Footer />
         </>
   );
}