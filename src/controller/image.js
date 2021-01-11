import mongoose from 'mongoose'
import fs from 'fs';
import path, {dirname} from 'path';
import image from '../model/image.js';
import cloudinary from '../ulti/cloudinary.js'
import resizeimage from '../ulti/resizeimage.js'
const __dirname = path.resolve();

export async function UploadImage (req,res,next) {
    cloudinary.v2.uploader.upload(__dirname + "/uploads/" + req.files[0].filename, {quality : 40} ,(err,result)=>{
        if (result) {
            const imageUpload = new image({
                _id: mongoose.Types.ObjectId(),
                name: req.files[0].filename,
                url: result.url,
                handle: req.user.email,
                createdAt : new Date().toISOString(),
            });
            return imageUpload.save().then((data) => {
                if (data) {
                    req.body.imageurl = result.url;
                    cloudinary.v2.uploader.upload(__dirname + "/uploads/" +
                     req.files[1].filename, {quality : 40} ,(err,result2)=>{
                        if (result2){
                            const imageUpload2 = new image({
                                _id: mongoose.Types.ObjectId(),
                                name: req.files[1].filename,
                                url: result2.url,
                                handle: req.user.email,
                                createdAt : new Date().toISOString(),
                            });
                            imageUpload2.save().then((data2) => {
                                if (data2){
                                    req.body.imagebanner = result2.url;
                                    console.log("ok");
                                    next();
                                }
                            })
                        }
                    })
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