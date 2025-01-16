import { Schema, model } from 'mongoose';

const userSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   address: {
      type: String,
      required: true
   },
   registerDate: {
      type: Date,
      required: true,
      default: Date.now
   }
});

export default model('User', userSchema);