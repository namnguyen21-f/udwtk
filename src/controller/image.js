import mongoose from 'mongoose'
import fs from 'fs';
import path, {dirname} from 'path';
import image from '../model/image.js';
import cloudinary from '../ulti/cloudinary.js'
import resizeimage from '../ulti/resizeimage.js'
const __dirname = path.resolve();

export function UploadImage (req,res,next) {
    if (req.body.setwidth != null && req.body.setheight != null){
        resizeimage(__dirname + "/uploads/" + req.file.filename, 'jpg', req.body.setimagewidth , req.body.setimageheight);
    }
    cloudinary.v2.uploader.upload(__dirname + "/uploads/" + req.file.filename, {quality : 40} ,(err,result)=>{
        if (result) {
            const imageUpload = new image({
                _id: mongoose.Types.ObjectId(),
                name: req.body.imagename,
                url: result.url,
                handle: req.user.username,
                createdAt : new Date().toISOString(),
            });
            return imageUpload.save().then((data) => {
                if (data) {
                    req.body.imageurl = result.url;
                    next();
                }else{
                    return res.status(400).json({
                        message: 'Upload Image Failed',
                    })
                }

            })
        }else{
            return res.status(400).json({
                message: err,
            })
        }
    
    })

    
}

export function GetImage (req,res) {
    image.findOne({_id: req.body.imageid},(err,img)=>{}).then(img =>{
        if (!img) {
            return res.status(400).json({
                success: false,
                message: 'Image have not been found',
            }); 
        }else{
            return res.status(200).json({
                success: false,
                image: img,
            }); 
        }
    })
    
}