import express from 'express';
import {Login,Signup,ChangePassword} from '../controller/user.js'
import {userValidatior} from '../ulti/userValidatior.js'
import {authenticateToken} from '../ulti/verifyToken.js'
const router = express.Router();

router.post('/login', Login);
router.post('/changepassword', authenticateToken , ChangePassword);
router.post('/signup', userValidatior ,Signup);

export default router;