import mongoose from 'mongoose'
import user from '../model/user.js'

import bcrypt from 'bcrypt'
import {generateAccessToken} from '../ulti/generateToken.js'

var saltcryp;

bcrypt.genSalt(10, function(err, salt) {
    saltcryp = salt; 
});

export function Login (req,res) {
    const data = req.body;
    user.findOne({email: data.email},(err, user) => {}).then(user =>{
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Email do not exist',
            }); 
        }else{
            bcrypt.compare(data.password,user.password,function(err,result){
                console.log(result);
                const userReduced = {
                    username: user.username,
                    email: user.email,
                };
                if (result == true){
                    const token = generateAccessToken(user.email);
                    return res.status(200).json({
                        success: true,
                        message: 'Login Successful',
                        User: userReduced,
                        token : token,
                    });
                }else{
                    return res.status(400).json({
                        success: false,
                        message: 'Password incorrect',
                    }); 
                }
            })
        }
    })
    .catch((error) => {
        return res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: error.message,
      });
    });
    
}   

export function GetUser (req,res) {
    const data = req.body;
    user.findOne({email: req.user.email},(err, user) => {}).then(user =>{
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User do not exist',
            }); 
        }else{
            return res.status(200).json({
                success: true,
                user: {
                    username: user.username,
                    email: user.email,
                },
            }); 
        }
    })
    .catch((error) => {
        return res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: error.message,
      });
    });
}

export function Signup (req,res) {
    bcrypt.hash(req.body.password, saltcryp, function(err, hash) {
        const newUser = new user({
            _id: mongoose.Types.ObjectId(),
            username: req.body.username,
            password: hash,
            passwordConfirm: hash,
            email: req.body.email,
            role: "user",
            createdAt: new Date(),
        })
        return newUser.save().then((data) =>{
            const token = generateAccessToken(req.body.email);
            return res.status(200).json({
                success: true,
                message: 'Register Successful',
                User: newUser,
                token : token,
            })
        })
        .catch((error) => {
            return res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: error.message,
          });
        });
    });
}

export function CreateAccount (req,res) {
    user.findOne({email: req.user.email},(err, user) => {}).then(user =>{
        if (!user) {
            const newUser = new user({
                _id: mongoose.Types.ObjectId(),
                username: req.body.username,
                password: "N/A",
                passwordConfirm: "N/A",
                email: req.body.email,
                role: "user/google",
                createdAt: new Date(),
            })
            return newUser.save().then((data) =>{
                const token = generateAccessToken(req.body.email);
                return res.status(200).json({
                    success: true,
                    message: 'Register Successful',
                    token : token,
                })
            })
        }else{
            return res.status(200).json({
                success: true,
            }); 
        }
    })
    .catch((error) => {
        return res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: error.message,
      });
    });
}

export function ChangePassword (req,res) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
    });
    
    return user.findOneAndUpdate({email: req.user.email}, {password : req.body.newPassword}, {new: true,upsert: false} ,(err,doc)=> {
        if (doc) {
            return doc;
        }else{
            return res.status(400).json({
                success: false,
                message: 'User do not exist',
            });
        }
    }).then((newUser) =>{
        const token = generateAccessToken(newUser.email);
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





