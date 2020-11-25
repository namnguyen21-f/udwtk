import mongoose from 'mongoose'

const filmSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
      trim: true
    },
    subname: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        trim: true
    },
    Studios: {
        type: String,
        trim: true
    },
    DateAired: {
        type: String,
        trim: true
    },
    Status: {
        type: String,
        trim: true
    },
    Gerne: {
        type: String,
        trim: true
    },
    Scores: {
        type: String,
        trim: true
    },
    Rating: {
        type: String,
        trim: true
    },
    Duration: {
        type: String,
        trim: true
    },
    Quality: {
        type: String,
        trim: true
    },
    Views: {
        type: String,
        trim: true
    },
    Image: {
        type: String,
    },
    Handle : {
        type: String,
    },
    IsTopview:{
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
  });

export default mongoose.model('film', filmSchema);
