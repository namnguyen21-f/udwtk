import mongoose from 'mongoose'
import fs from 'fs';
import path, {dirname} from 'path';
import image from '../model/image.js';
const __dirname = path.resolve();

export function UploadImage (req,res) {
    const imageUpload = new image({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        index: req.body.index,
        image: {
            data : fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: "image/jpeg"
        },
        handle: req.user.username,
        createdAt : new Date().toISOString,
    });

    return imageUpload.save().then((data) => {
        if (data) {
            return res.status(200).json({
                success: true,
                message: 'Upload Image Successful',
        
            })
        }else{
            return res.status(400).json({
                message: 'Upload Image Failed',
            
            })
        }
        
    })
    
}