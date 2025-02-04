const API_URL = import.meta.env.VITE_API_URL;

// fetch Home page products data
export const fetchPromoProducts = async () => {
   try {
      const result = await (await fetch(`${API_URL}/api/v.0.1/product`)).json();
      return result;
   } catch (err) {
      console.log(err);
   }
}

// fetch vendors on admin products page
export const fetchVendors = async () => {
   try {
      const result = await (await fetch(`${API_URL}/api/v.0.1/vendor`)).json();
      return result;
   } catch (err) {
      console.log(err);
   }
}