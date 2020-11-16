import mongoose from 'mongoose'
import user from '../model/user.js'
import {generateAccessToken} from '../ulti/generateToken.js'

export function Login (req,res) {
    return user.findOne({username: req.body.username},(err, user) => {
        if (user) {
            return user;
        }else{
            return res.status(400).json({
                success: false,
                message: 'User do not exist',
            });
        }
  
    }).then(user =>{
        const token = generateAccessToken(user.username);
        return res.status(200).json({
            success: true,
            message: 'Login Successful',
            User: user,
            token : token,
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

export function Signup (req,res) {
    const newUser = new user({
        _id: mongoose.Types.ObjectId(),
        username: req.body.username,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        email: req.body.email,
        createdAt: new Date(),
    })

    return newUser.save().then((data) =>{
        const token = generateAccessToken(user.username);
        return res.status(200).json({
            success: true,
            message: 'Login Successful',
            User: newUser,
            token : token,
        })
    })
    .catch((error) => {
        console.log(error);
        return res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: error.message,
      });
    });
}

export function ChangePassword (req,res) {
    return user.findOneAndUpdate({username: req.user.username}, {password : req.body.newPassword}, {new: true,upsert: false} ,(err,doc)=> {
        if (doc) {
            return doc;
        }else{
            return res.status(400).json({
                success: false,
                message: 'User do not exist',
            });
        }
    }).then((newUser) =>{
        const token = generateAccessToken(newUser.username);
        return res.status(200).json({
            success: true,
            message: 'Login Successful',
            User: newUser,
            token : token,
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

