const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('./models/user.js');
const bcrypt = require('bcryptjs');
const Listing = require('./models/listing.js');

const app = express();

dotenv.config();

app.use(express.json())

const origin = 'http://localhost:5173';

const  salt = bcrypt.genSaltSync(10);

const jtwSecret = 'JT1qnpNpJe';

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
