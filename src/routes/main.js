import express from 'express';
import {Login,Signup,ChangePassword,GetUser,CreateAccount} from '../controller/user.js'
import {CreateComment,GetComment} from '../controller/comment.js'
import {UpdateFilm,NewFilm,GetAllFilmCategories,GetFilmByRank,GetOneFilm ,
  addCommentFilm,GetCommentFilm,upLikeFilm,downLikeFilm,GetFilmBySearch,UploadSpecificVideo, GetOneFilmEp ,GetFilmByCategories} from '../controller/film.js'
import {GetUserLike} from '../controller/like.js'
import {UploadImage,GetImage, UploadVideo,} from '../controller/image.js'
import {userValidatior} from '../ulti/userValidatior.js'
import {authenticateToken} from '../ulti/verifyToken.js'

import multer from 'multer';
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + "." + file.originalname.split(".")[file.originalname.split(".").length - 1]);
    }
  })
  
var upload = multer({ storage: storage })


const router = express.Router();

router.post('/login',Login);
router.post('/getuser', authenticateToken , GetUser);
router.post('/changepassword', authenticateToken , ChangePassword);
router.post('/signup', userValidatior ,Signup);
router.post('/createaccount', CreateAccount); //Account for user loggined by Google
router.post('/uploadimage', authenticateToken , upload.single('image'), UploadImage);
router.post('/getimage', GetImage);//,

//, , NewFilm
router.post('/newfilm', authenticateToken, upload.array('image', 2), UploadImage, NewFilm);
router.post('/upload/:filmname/:ep/video', authenticateToken, upload.single("video"), UploadVideo, UploadSpecificVideo);

router.post('/getallfilm' , GetAllFilmCategories);
router.post('/gettopview' , GetFilmByRank);
router.post('/search/anime/:filmname', GetFilmBySearch);
router.get('/search/anime/categories/:field', GetFilmByCategories);
//
router.post('/user/getlike', authenticateToken , GetUserLike) 
//
router.post('/comment/create', CreateComment);
router.post('/comment/get' , GetComment);
//
router.get('/anime/:filmname', GetOneFilm);
router.get('/anime/:filmname/:ep', GetOneFilmEp);

router.post('/anime/:filmname/comment/add', authenticateToken , addCommentFilm)
router.get('/anime/:filmname/comment', GetCommentFilm);

//
router.post('/anime/:filmname/like',authenticateToken , upLikeFilm); 
router.post('/anime/:filmname/unlike', authenticateToken , downLikeFilm);

export default router;