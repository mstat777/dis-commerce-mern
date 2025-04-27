export const formatDate = (date) => {
   const tempDate = new Date(date).toLocaleString("fr-FR").slice(0, 10);
   return tempDate;
}

// formatter les dates du format DATE (ça corrige le bug '-1 jour') (pour les inputs préremplis):
export const correctDate = (date) => {
   const oldDate = new Date(date);
   const timeOffset = oldDate.getTimezoneOffset();
   const correctDate = new Date(oldDate.getTime() - (timeOffset*60*1000));
   const newDate = correctDate.toISOString().split('T')[0];
   return newDate;
}