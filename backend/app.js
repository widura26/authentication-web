import express from 'express';
import router from './routes/userRoutes.js';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
const app = express();
dotenv.config();

mongoose.connect("mongodb://localhost:27017/jwt-trial-pratice", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('database connected'));

// process.on('unhandledRejection', err => {
//     console.log('unhandledRejection', err.message);
// })
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use([ router ]);

app.listen(4000, () => {
    console.log('Server is live on!');
})