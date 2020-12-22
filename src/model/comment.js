import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
    },
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
export default mongoose.model('comment', commentSchema);