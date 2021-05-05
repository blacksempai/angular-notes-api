import express from 'express';
import User from '../models/User'

export function login (req: express.Request, res: express.Response){
    res.status(200).json({
        login: true
    });
}

export function register (req: express.Request, res: express.Response){
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });
    user.save();
    res.status(200).json({
        register: true
    });
}