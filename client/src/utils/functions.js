export function formatDate(date) {
   const tempDate = new Date(date).toLocaleString("fr-FR").slice(0, 10);
   return tempDate;
}