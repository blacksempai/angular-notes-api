import express from 'express';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../config/config'
import User from '../models/User'
import errorHandler from '../utils/error-handler'

export async function login (req: express.Request, res: express.Response){
    const candidate = await User.findOne({email: req.body.email});

    if(candidate) {
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, candidate.password);
        if (isPasswordCorrect) {
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            },config.jwt,{expiresIn: 3600});
            res.status(200).json({
                token: `Bearer ${token}`
            });
        }
        else {
            res.status(401).json({
                message: 'Password is incorrect'
            });
        }
    }
    else {
        res.status(404).json({
            message: 'User with this email doesn\'t exist'
        });
    }
}

export async function register (req: express.Request, res: express.Response){
    const candidate = await User.findOne({email: req.body.email});

    if(candidate) {
        res.status(409).json({
            message: 'User with this email is already exists'
        });
    }
    else {
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });
        try{
            await user.save();
            res.status(201).json(user);
        }
        catch(e){
            errorHandler(res, e)
        }
    }
}