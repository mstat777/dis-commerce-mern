import './App.scss';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from './components/Loading/Index';
import Header from './components/Header/Index';
import Footer from './components/Footer/Index';
import Home from './pages/Home/Index';
import NotFound from './pages/NotFound/Index';

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
               <Route path="*" element={<NotFound />} />
            </Routes>

            <Footer />
         </>
   );
}