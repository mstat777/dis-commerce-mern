import { Schema, model } from 'mongoose';

const productSchema = new Schema({
   title: {
      type: String,
      required: true
   },
   subtitle: {
      type: String,
      required: true
   },
   mainCategory: {
      type: String,
      required: true
   },
   subCategory: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   vendorId: {
      type: String,
      required: true
   },
   status: {
      type: String,
      default: 'under review'
   },
   quantity: {
      type: Number,
      default: null
   },
   sku: {
      type: String,
      required: true
   },
   productPrice: {
      type: Number,
   },
   discount: {
      type: Number,
   },
   rating: {
      type: Number,
      default: 0
   },
   productImagePath: {
      type: String,
      required: true
   },
   productMainImage: {
      newFilename: {
         type: String,
         required: true
      },
      originalFilename: {
         type: String,
         required: true
      },
      lastModifiedDate: {
         type: String,
         required: true,
      }
   },
   productOtherImages: [{
      newFilename: {
         type: String,
         required: true
      },
      originalFilename: {
         type: String,
         required: true
      },
      lastModifiedDate: {
         type: String,
         required: true,
      }
   }],
   registerDate: {
      type: Date,
      required: true,
      default: Date.now
   }
});

export const Product = model('Product', productSchema);

// ------------- Child Schemas -------------- //

// Electronic schema
export const ElectronicProduct = Product.discriminator('Electronic',
   new Schema({
      color: {
         type: String,
         default: null
      },
   })
);

// Clothing schema
export const ClothingProduct = Product.discriminator('Clothing',
   new Schema({
      color: {
         type: String,
         default: null
      },
      fabric: {
         type: String,
         default: null
      },
      size: {
         type: String,
         default: null
      },
   })
);

// Food schema
export const FoodProduct = Product.discriminator('Food',
   new Schema({
      weight: {
         type: Number,
         default: 0 // in gm
      },
   })
);

// Furniture schema
export const FurnitureProduct = Product.discriminator('Furniture',
   new Schema({
      color: {
         type: String,
         default: null
      },
      dimension: {
         width: {
            type: Number,
            default: 0 // in cm
         },
         length: {
            type: Number,
            default: 0 // in cm
         },
         height: {
            type: Number,
            default: 0 // in cm
         }
      },
   })
);