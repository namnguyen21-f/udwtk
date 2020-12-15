import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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
},{timestamps})
export default mongoose.model('comment', commentSchema);