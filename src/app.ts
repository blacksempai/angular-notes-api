import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import cors from 'cors';
import morgan from 'morgan';
import config from './config/config';
import passportConfig from './middleware/passport';
import { router as authRoutes } from './routes/auth';
import { router as noteRoutes } from './routes/note';

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true,  useFindAndModify: false})
    .then(()=>{console.log('MongoDB Connected')})
    .catch((err)=>{console.log(err)});

const app = express();
app.use(passport.initialize());
passportConfig(passport);
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/note', noteRoutes);

    app.use(express.static('../client/dist/client'));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'angular-notes', 'index.html'));
    });
export { app };