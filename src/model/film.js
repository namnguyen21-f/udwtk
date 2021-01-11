import mongoose from 'mongoose'
import comment from './comment.js'
import like from './like.js'
import espisode from './ep.js'

const filmSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lowername: {
        type: String,
        required: true,
        trim: true,
        set: v => v.toLowerCase(),
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
        type: String ,
        trim: true
    },
    Image: {
        type: String,
    },
    ImageBanner: {
        type: String,
    },
    Handle : {
        type: String,
    },
    IsTopview:{
        type: String,
    },
    Rank: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    ep: [{type: mongoose.Schema.Types.ObjectId, ref: 'espisode'}],
    comment: [{type: mongoose.Schema.Types.ObjectId, ref: 'comment'}],
    like: [{type: mongoose.Schema.Types.ObjectId, ref: 'like'}],
    
  }, {timestamps: true});

  

export default mongoose.model('film', filmSchema);

