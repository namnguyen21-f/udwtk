import mongoose from 'mongoose'
import comment from '../model/comment.js';

export function CreateComment(req,res){
    const newCommnent = new comment ({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        handle : req.user.email,
        type : req.body.type,
        to : req.body.to,
        createdAt : new Date().toISOString(),
    })

    newCommnent.save().then(com =>{
        return res.status(200).json({
            success: true,
        });
    })
    .catch((error) => {
        res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: error.message,
      });
    })
}

export function GetComment(req,res){
    comment.find({to : req.body.name,type: req.body.type},(err,data) =>{
        if (data){
            return res.status(200).json({
                success: true,
                data : data,
            })
        }else{
            return res.status(400).json({
                success: false,
            })
        }
    })
    .catch((error) => {
        res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: error.message,
      });
    })
}