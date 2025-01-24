import { Schema, model } from 'mongoose';

const userSchema = new Schema({
   name: {
      type: String,
      required: [true, "can't be blank"]
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
   roles: [{
      type: String,
      required: true
   }],
   registerDate: {
      type: Date,
      required: true,
      default: Date.now
   }
});

export default model('User', userSchema);