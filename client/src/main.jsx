import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import ScrollToTop from './HOC/ScrollToTop/Index.js';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <Provider store={store}>
         <BrowserRouter>
            <ScrollToTop />
            <App />
         </BrowserRouter>
      </Provider>
   </StrictMode>
);