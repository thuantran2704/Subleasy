const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('./models/user.js');
const bcrypt = require('bcryptjs');
const Listing = require('./models/listing.js');
const cookieParser = require('cookie-parser');
const app = express();

dotenv.config();

app.use(express.json())

const origin = 'http://localhost:5173';

const  salt = bcrypt.genSaltSync(10);

const jtwSecret = process.env.JWT_SECRET;

app.use(cors({
    credentials: true,
    origin: origin
}));

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req,res)=> {
    res.json('test good');
});

app.post('/listings', async (req, res) => {
    const {
        title,
        description,
        address,
        price,
        type,
        bedrooms,
        bathrooms,
        squareFeet,
        availableFrom,
        leaseDuration,
        petFriendly,
        furnished,
        amenities,
        images,
        contact
    } = req.body;

    try {
        const listingDocument = await Listing.create({
            title,
            description,
            address,
            price,
            type,
            bedrooms,
            bathrooms,
            squareFeet,
            availableFrom,
            leaseDuration,
            petFriendly,
            furnished,
            amenities,
            images,
            contact
        });

        res.json(listingDocument);
    } catch (e) {
        res.status(422).json(e);
    }
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

/*
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userDocument = await User.findOne({ email: email });

        if (!userDocument) {
            return res.status(422).json('Account does not exist');
        }

        const isPasswordValid = bcrypt.compareSync(password, userDocument.password);
        if (!isPasswordValid) {
            return res.status(422).json('Wrong Password');
        }

        const token = jwt.sign({ email: userDocument.email, id: userDocument._id }, jwtSecret, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 3600000 // 1 hour
        }).json('Login successfully');
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json('An error occurred');
    }
});
*/
app.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true, // use true if you're using HTTPS
        sameSite: 'Strict',
    }).json('Logout successfully');
});

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json('Unauthorized');
    }
    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            return res.status(401).json('Unauthorized');
        }
        req.user = user;
        next();
    });
};
//function to verify token
app.get('/protected-listings', verifyToken, async (req, res) => {
    try {
        const listings = await Listing.find();
        res.json(listings);
    } catch (e) {
        res.status(500).json('An error occurred');
    }
});
//get listings
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userDocument = await User.findOne({ email: email });

        if (userDocument) {
            const accepted = bcrypt.compareSync(password, userDocument.password);
            if (accepted) {
                jwt.sign({ email: userDocument.email, id: userDocument._id }, jtwSecret, {}, (err, token) => {
                    if (err) {
                        console.error(err); // Log the error for debugging
                        return res.status(500).json('Error signing the token');
                    }
                    res.cookie('token', token).json('Login successfully');
                });
            } else {
                res.status(422).json('Wrong Password');
            }
        } else {
            res.status(422).json('Password or Account incorrect');
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json('An error occurred');
    }
});



app.listen(4000);
