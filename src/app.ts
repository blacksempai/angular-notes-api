import express from 'express';
import mongoose from 'mongoose'
import cors from 'cors';
import morgan from 'morgan';
import config from './config/config'
import { router as authRoutes } from './routes/auth';
import { router as noteRoutes } from './routes/note';

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{console.log('Mongo DB Connected')})
    .catch((err)=>{console.log(err)});

const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/note', noteRoutes);

export { app };