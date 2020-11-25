import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : {
        type: String,
        required: true,
    },
    index: {
        type: String,
    },
    url: {
        type: String,

    },
    handle : {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }

})


export default mongoose.model('image', imageSchema);