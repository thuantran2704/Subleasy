const mongoose = require('mongoose');
const { Schema } = mongoose;

const ListingSchema = new Schema({
    title: { type: String, required: true }, // Title of the listing
    description: { type: String, required: true }, // Detailed description of the property
    address: {
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true }
    }, // Address of the property
    price: { type: Number, required: true }, // Monthly rental price
    type: { 
        type: String, 
        enum: ['Apartment', 'House', 'Condo'], 
        required: true 
    }, // Type of property
    bedrooms: { type: Number, required: true }, // Number of bedrooms
    bathrooms: { type: Number, required: true }, // Number of bathrooms
    squareFeet: { type: Number }, // Size of the property in square feet
    availableFrom: { type: Date, required: true }, // Availability start date
    leaseDuration: { type: String }, // Duration of the lease (e.g., "6 months", "1 year")
    petFriendly: { type: Boolean, default: false }, // Whether pets are allowed
    furnished: { type: Boolean, default: false }, // Whether the property is furnished
    amenities: [String], // List of amenities (e.g., "Pool", "Gym")
    images: [String], // Array of image URLs for the property
    contact: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String } // Optional contact phone number
    }, // Contact information for the listing
    createdAt: { type: Date, default: Date.now }, // Date when the listing was created
    updatedAt: { type: Date, default: Date.now } // Date when the listing was last updated
});

const ListingModel = mongoose.model('Listing', ListingSchema);

module.exports = ListingModel;
