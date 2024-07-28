import React, { useState } from 'react';
import axios from 'axios';

export default function IndexPage() {
    // JavaScript functions to open and close the form
    const openForm = () => {
        document.getElementById('myForm').style.display = 'flex';
    }

    const closeForm = () => {
        document.getElementById('myForm').style.display = 'none';
    }

    // State for listing form fields
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('Apartment');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [squareFeet, setSquareFeet] = useState('');
    const [availableFrom, setAvailableFrom] = useState('');
    const [leaseDuration, setLeaseDuration] = useState('');
    const [petFriendly, setPetFriendly] = useState(false);
    const [furnished, setFurnished] = useState(false);
    const [amenities, setAmenities] = useState('');
    const [images, setImages] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');

    async function handleAddListing(ev) {
        ev.preventDefault();
        try {
            await axios.post('/listings', {
                title,
                description,
                address: {
                    city,
                    state,
                    zip
                },
                price,
                type,
                bedrooms,
                bathrooms,
                squareFeet,
                availableFrom,
                leaseDuration,
                petFriendly,
                furnished,
                amenities: amenities.split(',').map(item => item.trim()),
                images: images.split(',').map(item => item.trim()),
                contact: {
                    name: contactName,
                    email: contactEmail,
                    phone: contactPhone
                }
            });
            alert('Listing added successfully');
            closeForm();
        } catch (e) {
            alert('Failed to add listing');
        }
    }

    return (
        <div className="relative min-h-screen bg-gray-100">
            {/* A button to open the popup form */}
            <button className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded z-50" onClick={openForm}>
                +
            </button>
        
            {/* The form */}
            <div className="form-popup fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50" id="myForm" style={{ display: 'none' }}>
                <div className="relative bg-white p-6 rounded-lg shadow-md w-full max-w-sm h-auto max-h-[80%] overflow-auto mt-8">
                    {/* Exit button */}
                    <button onClick={closeForm} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    <form className="space-y-4" onSubmit={handleAddListing}>
                        <input type="text" placeholder="Title" value={title} onChange={ev => setTitle(ev.target.value)} className="w-full p-2 border rounded" required />
                        <textarea placeholder="Description" value={description} onChange={ev => setDescription(ev.target.value)} className="w-full p-2 border rounded" required />
                        <input type="text" placeholder="City" value={city} onChange={ev => setCity(ev.target.value)} className="w-full p-2 border rounded" required />
                        <input type="text" placeholder="State" value={state} onChange={ev => setState(ev.target.value)} className="w-full p-2 border rounded" required />
                        <input type="text" placeholder="Zip Code" value={zip} onChange={ev => setZip(ev.target.value)} className="w-full p-2 border rounded" required />
                        <input type="number" placeholder="Price" value={price} onChange={ev => setPrice(ev.target.value)} className="w-full p-2 border rounded" required />
                        <select value={type} onChange={ev => setType(ev.target.value)} className="w-full p-2 border rounded" required>
                            <option value="Apartment">Apartment</option>
                            <option value="House">House</option>
                            <option value="Condo">Condo</option>
                        </select>
                        <input type="number" placeholder="Bedrooms" value={bedrooms} onChange={ev => setBedrooms(ev.target.value)} className="w-full p-2 border rounded" required />
                        <input type="number" placeholder="Bathrooms" value={bathrooms} onChange={ev => setBathrooms(ev.target.value)} className="w-full p-2 border rounded" required />
                        <input type="number" placeholder="Square Feet" value={squareFeet} onChange={ev => setSquareFeet(ev.target.value)} className="w-full p-2 border rounded" />
                        <input type="date" placeholder="Available From" value={availableFrom} onChange={ev => setAvailableFrom(ev.target.value)} className="w-full p-2 border rounded" required />
                        <input type="text" placeholder="Lease Duration" value={leaseDuration} onChange={ev => setLeaseDuration(ev.target.value)} className="w-full p-2 border rounded" />
                        <label className="inline-flex items-center">
                            <input type="checkbox" checked={petFriendly} onChange={ev => setPetFriendly(ev.target.checked)} className="form-checkbox" />
                            <span className="ml-2">Pet Friendly</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input type="checkbox" checked={furnished} onChange={ev => setFurnished(ev.target.checked)} className="form-checkbox" />
                            <span className="ml-2">Furnished</span>
                        </label>
                        <input type="text" placeholder="Amenities (comma-separated)" value={amenities} onChange={ev => setAmenities(ev.target.value)} className="w-full p-2 border rounded" />
                        <input type="text" placeholder="Image URLs (comma-separated)" value={images} onChange={ev => setImages(ev.target.value)} className="w-full p-2 border rounded" />
                        <input type="text" placeholder="Contact Name" value={contactName} onChange={ev => setContactName(ev.target.value)} className="w-full p-2 border rounded" required />
                        <input type="email" placeholder="Contact Email" value={contactEmail} onChange={ev => setContactEmail(ev.target.value)} className="w-full p-2 border rounded" required />
                        <input type="tel" placeholder="Contact Phone" value={contactPhone} onChange={ev => setContactPhone(ev.target.value)} className="w-full p-2 border rounded" />
                        <button className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
