import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import checkAuth from './Utils/checkAuth.js';
import { loginValidation, registerValidation} from './validations.js';

import handleValidationErrors from './Utils/handleValidationErrors.js';
import * as UserController from './controllers/UserController.js';

mongoose
    .connect('mongodb+srv://askhvm:askhamakhov1998@cluster0.x7fnny7.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log("without errors"))
    .catch((err) => console.log("mongo error", err));




const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {
    res.send('Server started')
})

app.post('/login',  loginValidation,handleValidationErrors, UserController.login);
app.post('/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/me', checkAuth, UserController.getMe);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('server started');
});