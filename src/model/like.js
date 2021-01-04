import mongoose from 'mongoose'

const likeSchema = new mongoose.Schema({
    to :{
        type: String,
        required: true,
    },
    type :{
        type: String,
        default: "film",
        required: true,
    },
    handle : {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
},{timestamps: true})
export default mongoose.model('like', likeSchema);