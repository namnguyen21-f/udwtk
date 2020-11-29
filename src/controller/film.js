import mongoose from 'mongoose'
import film from '../model/film.js';

export function NewFilm (req,res) {
    film.findOne({name: req.body.name},(err, data) => {
        if (data) {
            return res.status(400).json({
                success: false,
                message: 'Film is exist',
            });
        }else{

            const newfilm = new film({
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
                Handle: req.user.username,
                Rank: req.user.rank,
                Image: req.body.imageurl,
                ImageBanner: req.body.imagebanner,
                IsTopview: req.body.istopview,
                createdAt : new Date().toISOString(),
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
        Image: req.body.imageurl,
        Hanlde : req.user.email,
        createdAt : new Date().toISOString(),
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


export function GetOneFilm(req,res){
    film.findOne({name: req.params.filmname},(err,data) =>{
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
}

export function GetAllFilmCategories(req,res){
    const qu = async() =>{
        try {
            const process = async () => {
                var result = [];
                for (let i=0;i < req.body.categories.length ;i++){
                    var re = new RegExp(req.body.categories[i],"g");
                    const ps = await film.find({ Gerne: re}).limit(req.body.limit).exec().then(doc => {
                        var obj = {title: req.body.categories[i]};
                        obj.data = doc; 
                        result.push(obj);
                    });
                }
                return result;
            };
            process().then((data) =>{
                return res.status(200).json({
                    success: true,
                    data : data,
            })
        })      
        }
        catch (error) {
            return res.status(400).json({
                success: false,

        })
        }
    }
    qu();

}

export function GetFilmByRank(req,res){
    var re = new RegExp(req.body.rank,"g");
    film.find({ Rank: re}).limit(req.body.limit).exec().then(doc => {
        if (doc){
            return res.status(200).json({
                success: true,
                data : doc,
            })
        }else{
            return res.status(400).json({
                success: false,
            })
        }
    });
}


