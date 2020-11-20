import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    content : {
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    to: {
        type: String,
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
    

})


export default mongoose.model('notification', notificationSchema);