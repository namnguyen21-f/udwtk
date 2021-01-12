import mongoose from 'mongoose'
import comment from '../model/comment.js';
import user from '../model/user.js';
import {
    timeDifference
} from '../ulti/timediff.js'
import like from '../model/like.js';
import film from '../model/film.js';
import espisode from '../model/ep.js';

export function addCommentFilm(req, res) {
    const newCommnent = new comment({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        handle: req.user.email,
        type: req.body.type,
        to: req.params.filmname,
        createdAt: new Date().toISOString(),
    })
    newCommnent.save(function (err) {
        if (!err) {
            film.findOne({
                name: req.params.filmname
            }, (err, doc) => {
                if (doc) {
                    if (doc.comment.length == 0) {
                        doc.comment = [newCommnent._id];
                    } else {
                        doc.comment.push(newCommnent._id)
                    }
                    doc.save().then(() => {
                        return res.status(200).json({
                            success: true,
                        });
                    })
                }
            }).catch((error) => {
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

export function UploadSpecificVideo(req,res){
    const newEp = new espisode ({
        _id: mongoose.Types.ObjectId(),
        name : req.params.filmname,
        index : parseInt(req.params.ep),
        videoUrl: req.body.videoUrl,
    })
    console.log(req.params);
    newEp.save(function(err) {
        if (!err){
            film.findOne({name: req.params.filmname},(err,doc) => {
                if (doc){
                    if (doc.ep.length == 0){
                        doc.ep = [newEp._id];
                    }else{
                        doc.ep.push(newEp._id);
                    }
                    doc.save().then(() =>{
                        return res.status(200).json({
                            success: true,
                        });
                    })
                }

            })
        }
    })

}

export function upLikeFilm(req,res){
    const newLike = new like ({
        _id: mongoose.Types.ObjectId(),
        handle : req.user.email,
        to : req.params.filmname,
        createdAt : new Date().toISOString(),
    })
    newLike.find({handle: req.user.email,to : req.params.filmname} , (err,doc) =>{
        if (doc){
            newLike.save(function(err) {
                if (!err){
                    film.findOne({name: req.params.filmname}, function(err, doc) {
                        if (doc){
                            if (doc.like.length == 0){
                                doc.like = [newLike._id];
                            }else{
                                doc.like.push(newLike._id)
                            }
                            doc.save().then(() =>{
                                return res.status(200).json({
                                    success: true,
                                });
                            })
                        }else{
                            return res.status(400).json({
                                success: false,
                            });
                        }
                    }).catch((error) => {
                        console.log(error);
                        res.status(500).json({
                        success: false,
                        message: 'Server error. Please try again.',
                        error: error.message,
                      });
                    });
                }
            })
        }else{
            return res.status(200).json({
                success: false,
            });
        }
    })
}

export function downLikeFilm(req,res){
    like.findOneAndRemove({handle : req.user.email} , (err,doc) =>{
        if (!err && doc){
            film.updateOne(
                { name : req.params.filmname},
                { "$pull": { "like": doc._id } },
                function (err, doc){
                    return res.status(200).json({
                        success: true,
                    });
                }
            );
        }else{
            return res.status(400).json({
                success: false,
            });
        }
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: error.message,
        });
    });
}

export function GetCommentFilm(req, res) {
    film.findOne({
        name: req.params.filmname
    }).populate('comment').exec((err, doc) => {
        if (err) {
            return res.status(400).json({
                success: false,
            });
        }
        if (doc) {
            return res.status(200).json({
                success: true,
                comment: doc.comment,
            });
        }
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: error.message,
        });
    });
}

export function NewFilm(req, res) {

    film.findOne({
        name: req.body.name
    }, (err, data) => {
        if (data) {
            return res.status(400).json({
                success: false,
                message: 'Film is exist',
            });
        } else {

            const newfilm = new film({
                _id: mongoose.Types.ObjectId(),
                name: req.body.name,
                lowername: req.body.name,
                subname: req.body.subname,
                type : req.body.type,
                Studios : req.body.studios ? req.body.studios : "N/A",
                DateAired : req.body.dateaired ? req.body.dateaired : "N/A",
                Status : req.body.status ? req.body.status : "N/A",
                Gerne: req.body.gerne ? req.body.gerne : "N/A",
                Scores: req.body.scores ? req.body.scores : "N/A",
                Rating: req.body.rating ? req.body.rating : "N/A",
                Duration: req.body.duaration ? req.body.duaration : "N/A",
                Quality: req.body.quality ? req.body.quality : "N/A", 
                Views: req.body.views ? req.body.views : "N/A", 
                Handle: req.user.email ? req.user.email : "N/A",
                Rank: req.user.rank ? req.user.rank : "N/A",
                Image: req.body.imageurl,
                ImageBanner: req.body.imagebanner,
                IsTopview: req.body.istopview ? req.body.istopview : "N/A",
                createdAt : new Date().toISOString(),
            })
            return newfilm.save().then(film => {
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

export function UpdateFilm(req, res) {
    const newfilm = new film({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        subname: req.body.subname,
        type: req.body.type,
        Studios: req.body.studios,
        DateAired: req.body.dateaired,
        Status: req.body.status,
        Gerne: req.body.gerne,
        Scores: req.body.scores,
        Rating: req.body.rating,
        Duration: req.body.duaration,
        Quality: req.body.quality,
        Views: req.body.views,
        Image: req.body.imageurl,
        Hanlde: req.user.email,
        createdAt: new Date().toISOString(),
    })
    film.findOneAndUpdate({
            name: req.body.name
        }, newfilm, {
            new: true,
            upsert: false
        }).then(film => {
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


export async function GetOneFilm(req, res) {
    async function handleComment(comment) {
        const rs = [];
        for (let i = 0; i < comment.length; i++) {
            var obj = {};
            let time = timeDifference(new Date().getTime(), comment[i].updatedAt.getTime());
            await user.findOne({
                email: comment[i].handle
            }).then(doc => {
                if (doc) {
                    obj.username = doc.username;
                    obj.time = time;
                }
            })
            obj.title = comment[i].title;
            rs.push(obj);
        }
        return rs;
    }   

    film.findOne({name: req.params.filmname}).populate('comment').exec((err, doc) =>{
        if (err){
            return res.status(400).json({
                success: false,
            });
        }
        if (doc) {
            handleComment(doc.comment).then(rs => {
                var data = doc.toObject();
                data.comment = rs;
                return res.status(200).json({
                    success: true,
                    data: data,
                });
            });
        }
    })
}


export async function GetOneFilmEp(req,res){
    async function handleComment(comment){
        const rs = [];
        for (let i=0;i< comment.length; i++){
            var obj = {};
            let time = timeDifference(new Date().getTime() , comment[i].updatedAt.getTime());
            await user.findOne({email : comment[i].handle}).then(doc =>{
                if (doc){
                    obj.username = doc.username;
                    obj.time = time;
                }
            })
            obj.title = comment[i].title;
            rs.push(obj);
        }
        return rs;
    }   

    await film.findOne({name: req.params.filmname}).populate('comment').populate("ep").exec((err, doc) =>{
        if (err){
            return res.status(400).json({
                success: false,
            });
        }
        if (doc){
            handleComment(doc.comment).then(rs =>{
                var data = doc.toObject();
                data.comment = rs;
                for (let i=0;i< doc.ep.length;i++){
                    if (doc.ep[i].index == parseInt(req.params.ep)){
                        return res.status(200).json({
                            success: true,
                            data: data,
                            videoUrl: doc.ep[i].videoUrl,
                        });
                    }
                }
                return res.status(200).json({
                    success: true,
                    data: data,
                });
            });
        }
    })
}

export function GetAllFilmCategories(req,res){
    const qu = async() =>{
        try {
            const process = async () => {
                var result = [];
                for (let i = 0; i < req.body.categories.length; i++) {
                    var re = new RegExp(req.body.categories[i], "g");
                    const ps = await film.find({
                        Gerne: re
                    }).limit(req.body.limit).exec().then(doc => {
                        var obj = {
                            title: req.body.categories[i]
                        };
                        obj.data = doc;
                        result.push(obj);
                    });
                }
                return result;
            };
            process().then((data) => {
                return res.status(200).json({
                    success: true,
                    data: data,
                })
            })
        } catch (error) {
            return res.status(400).json({
                success: false,

            })
        }
    }
    qu();
}

export function GetFilmBySearch(req,res){
    var re = new RegExp(req.params.filmname.toLowerCase(),"g");
    film.find({lowername: re}).limit(req.body.limit).exec().then(docs => {
        if (docs) {
            return res.status(200).json({
                success: true,
                data : docs,
            })
        }else{
            return res.status(400).json({
                success: true,
                message: "Not found any result"
            })
        }
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: error.message,
      });
    });;
}

export function GetFilmByCategories(req,res){
    var re = new RegExp(req.params.field ,"g");
    film.find({ Gerne: re}).exec().then(docs => {
        if (docs) {
            return res.status(200).json({
                success: true,
                data: docs,
            })
        } else {
            return res.status(400).json({
                success: true,
                message: "Not found any result"
            })
        }
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: error.message,
        });
    });;

}

export function GetFilmByRank(req, res) {
    var re = new RegExp(req.body.rank, "g");
    film.find({
        Rank: re
    }).limit(req.body.limit).exec().then(doc => {
        if (doc) {
            return res.status(200).json({
                success: true,
                data: doc,
            })
        } else {
            return res.status(400).json({
                success: false,
            })
        }
    });
}