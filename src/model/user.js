import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 6
    },  
    passwordConfirm:{
      type: String,
      trim: true,
      minLength: 6
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    role :{
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
  });

export default mongoose.model('user',userSchema);