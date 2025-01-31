import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import withRouter from '../withRouter/Index';

function ScrollToTop() {
   const location = useLocation();

   useEffect(() => {
      function unlisten() {
         window.scrollTo({ top: 0, behavior: 'smooth' });
      };
      return () => {
         unlisten();
      }
   }, [location]);

   return (null);
}

export default withRouter(ScrollToTop);