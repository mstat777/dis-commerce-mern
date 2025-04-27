import { Schema, model } from 'mongoose';

const userSchema = new Schema({
   firstName: {
      type: String,
      required: true
   },
   lastName: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   tel: {
      type: String,
      required: true
   },
   birthDate: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   address: {
      street: {
         type: String,
         required: true
      },
      city: {
         type: String,
         required: true
      },
      postalCode: {
         type: String,
         required: true
      },
      country: {
         type: String,
         required: true
      },
   },
   roles: {
      type: String,
      required: false,
      default: "user"
   },
   newsLetter: {
      type: Boolean,
      required: true
   },
   registerDate: {
      type: Date,
      required: true,
      default: Date.now
   }
});

export const User = model('User', userSchema);