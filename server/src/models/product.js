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
   variations: [{
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
      quantity: {
         type: Number,
         default: null
      },
      sku: {
         type: String,
         required: true
      },
      weight: {
         type: Number,
         default: 0 // in gm
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
      productPrice: {
         type: Number,
         required: true
      },
      discount: {
         type: Number,
         required: true
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
         type: String,
         required: true
      },
      productOtherImages: [{
         type: String,
         required: true
      }]
   }],
   registerDate: {
      type: Date,
      required: true,
      default: Date.now
   }
});

export default model('Product', productSchema);