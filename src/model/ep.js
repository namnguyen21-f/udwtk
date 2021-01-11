import mongoose from 'mongoose'
const epSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    index : {
        type: Number,
        required:true,
    },
    videoUrl: {
        type: String,
        required: true,
        trim: true,
    },
  },{timestamps: true});

export default mongoose.model('espisode', epSchema);