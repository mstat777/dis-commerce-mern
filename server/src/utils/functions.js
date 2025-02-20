export function createProductImagePath(category, subCategory) {
   const cat = category.toLowerCase()
      .replace(/\s/g, '-')
      .replace(/,/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
   //console.log("cat = ", cat);
   const subCat = subCategory.toLowerCase()
      .replace(/\s/g, '-')
      .replace(/,/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
   //console.log("subCat = ", subCat);
   const result = cat + "/" + subCat;
   //console.log("result = ", result);
   return result;
}