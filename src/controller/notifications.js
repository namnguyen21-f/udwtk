import mongoose from 'mongoose'
import notification from '../model/notification'

export function CreateNotificaitons (req,res) {
    const newNotification = new notification({
        _id: mongoose.Types.ObjectId(),
        content: req.body.content,
        handle: req.user.handle,
        to: req.user.to,
        type: req.user.type,
        createdAt : new Date().toISOString,
    });

    newNotification.save().then(data =>{
        if (data){
            return res.status(200).json({
                message: "Successful",
                notification :  newNotification,
            })
        }else{
            return res.status(400).json({
                message: "Something wrong",
            })
        }
    })
}