import express from 'express';
import {Login,Signup,ChangePassword} from '../controller/user.js'
import {UpdateFilm,NewFilm} from '../controller/film.js'
import {UploadImage,GetImage} from '../controller/image.js'
import {userValidatior} from '../ulti/userValidatior.js'
import {authenticateToken} from '../ulti/verifyToken.js'

import multer from 'multer';
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
  })
  
var upload = multer({ storage: storage })


const router = express.Router();

router.post('/login',Login);
router.post('/changepassword', authenticateToken , ChangePassword);
router.post('/signup', userValidatior ,Signup);
router.post('/uploadimage', authenticateToken , upload.single('image'), UploadImage);
router.post('/getimage', GetImage);
router.post('/newfilm', authenticateToken , NewFilm);

export default router;