const mongoose = require("mongoose");
const listingSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },
    numberOfTenants:{
        type: Number,
        required: true
    },
    propertyType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zip: {
            type: String,
            required: true
        }
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    amenities: {
        hasPool: {
            type: Boolean,
            default: false
        },
        hasGym: {
            type: Boolean,
            default: false
        },
        hasParking: {
            type: Boolean,
            default: false
        },
        isPetFriendly: {
            type: Boolean,
            default: false
        },
        hasInternet: {
            type: Boolean,
            default: false
        },
        hasAirConditioning: {
            type: Boolean,
            default: false
        },
        hasHeating: {
            type: Boolean,
            default: false
        },
        hasLaundry: {
            type: Boolean,
            default: false
        },
    },
    availabilityStart: {
        type: Date,
        required: true
    },
    availabilityEnd: {
        type: Date,
        required: true
    },
    isFurnished: {
        type: Boolean,
        required: true
    },
    picture: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('listing', listingSchema);