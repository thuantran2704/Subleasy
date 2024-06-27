const express = require('express').Router();
const cors = require('cors');
const dbConnect = require('./dbConnect.js');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('./models/user.js');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');

const app = express();

dotenv.config();

app.use(express.json())

const origin = 'http://localhost:5173';

const  salt = bcrypt.genSaltSync(10);

const jwtSecret = 'jt1qnpnpje';

app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: origin
}));


app.get('/test', (req,res)=> {
    res.json('test good');
});

app.post('/register', async (req,res) => {
    const {name, email, password } = req.body;
     try{
    const userDocument = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password, salt),
    });

    res.json(userDocument);
} catch(e){
    res.status(422).json(e);
}
});

app.post('/login', async (req,res) =>{
    const {email, password} = req.body;
    const userDocument = await User.findOne({email});
    if(userDocument){
        const accepted = bcrypt.compareSync(password, userDocument.password);
        if(accepted){
            jwt.sign({email: userDocument.email, 
                d:userDocument._id, 
                ame: userDocument.name}, 
                jwtSecret, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(userDocument);
            });
    } else {
        res.status(422).json('Wrong Password');
    } 
} else {
        res.json('not found');
    }
});

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, jwtSecret, {}, async (err, user) => {
            if(err) throw err;
            const {name, email, _id} = await User.findById(user.id);
            res.json(name, email, _id);
        });
    } else {
    res.json(null);
    }
})
/*
//get listings
express.get("listing", async (req, res) => {
    try{//what error could be here? // need research, design front end
        const page = parseInt(req.query.page) -1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || '';
        let sort = req.query.sort || 'rating';
        //rating here is rating the apartment complex, rather than individual apartments
        //as you know, this is much more long term and has less usage than the short term airbnb
        //so we use apartment complex instead of individual subleasor ratings or individuaal apartment rating.
        //yes, blame management for this, but it is what it is.

    } catch(err){
        console.log(err);
        res.status(500).json({error: true, message: 'internal server Error'});
    }

});

*/
app.listen(4000);
