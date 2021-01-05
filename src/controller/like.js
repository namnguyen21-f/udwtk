import like from '../model/like.js';

export function GetUserLike(req,res){
    like.find({handle: req.user.email},(err,docs) => {
        if (docs){
            return res.status(200).json({
                success: true,
                docs : docs.map( fc => {
                    return fc.to;
                }),
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
