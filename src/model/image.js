import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : {
        type: String,
        required: true,
    },
    index: {
        type: String,
        required: true,
    },
    image: {
        data : Buffer,
        contentType: String,
    },
    handle : {
        type: String,
        required: true,
    }

})


export default mongoose.model('image', imageSchema);