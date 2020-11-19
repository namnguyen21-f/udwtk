import mongoose from 'mongoose'
import film from '../model/film.js';

export function NewFilm (req,res) {
    film.findOne({name: req.body.name},(err, film) => {
        if (film) {
            return res.status(400).json({
                success: false,
                message: 'Film is exist',
            });
        }else{
            const newfilm = new film ({
                _id: mongoose.Types.ObjectId(),
                name: req.body.name,
                subname: req.body.subname,
                type : req.body.type,
                Studios : req.body.studios,
                DateAired : req.body.dateaired,
                Status : req.body.status,
                Gerne: req.body.gerne,
                Scores: req.body.scores,
                Rating: req.body.rating,
                Duration: req.body.duaration,
                Quality: req.body.quality, 
                Views: req.body.views, 
                Handle: req.body.user.username,
                createdAt : new Date().toISOString,
            })
            return newfilm.save().then(film =>{
                return res.status(200).json({
                    success: true,
                    message: 'Create Successful',
                    Film: film,
                });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: error.message,
              });
            });
        }
    })
}

export function UpdateFilm (req,res) { 
    const newfilm = new film ({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        subname: req.body.subname,
        type : req.body.type,
        Studios : req.body.studios,
        DateAired : req.body.dateaired,
        Status : req.body.status,
        Gerne: req.body.gerne,
        Scores: req.body.scores,
        Rating: req.body.rating,
        Duration: req.body.duaration,
        Quality: req.body.quality, 
        Views: req.body.views, 
        createdAt : new Date().toISOString,
    })
   film.findOneAndUpdate({name: req.body.name}, newfilm , {new: true,upsert: false}).then(film => {
        return res.status(200).json({
            success: true,
            message: 'Update Successful',
            Film: film,
        });
   })
   .catch((error) => {
        console.log(error);
        res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: error.message,
        });
    });
}



