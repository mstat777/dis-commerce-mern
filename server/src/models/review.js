import { Schema, model } from 'mongoose';

const userSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
   },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
   },
   score: {
      type: String,
      required: true
   },
   reviewDate: {
      type: Date,
      required: true,
      default: Date.now
   }
});

export default model('User', userSchema);