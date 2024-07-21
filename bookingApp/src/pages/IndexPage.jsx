
import{Link} from "react-router-dom";
import {useState} from 'react';
import axios from "axios";

export default function IndexPage() {
    // JavaScript functions to open and close the form
    const openForm = () => {
        document.getElementById('myForm').style.display = 'block';
    }

    const closeForm = () => {
        document.getElementById('myForm').style.display = 'none';
    }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function handleAddListing(ev){
        ev.preventDefault();
        try{
        await axios.post('/login',{email,password});
        alert('Login succesful');
        } catch(e) {
            alert('Login failed');
        }
    }

    return (
        <div>
            {/* A button to open the popup form */}
            <button className="open-button" onClick={openForm}>+</button>

            {/* The form */}
            <div className="form-popup" id="myForm" style={{ display: 'none' }}>
            <form className="max-w-md mx-auto" onSubmit={handleAddListing}>
                <input type="email" 
                        placeholder="your@email.com" 
                        value = {email} 
                        onChange={ev => setEmail(ev.target.value)}/>
                <input type = "password" 
                        placeholder="password"
                        value = {password} 
                        onChange = {ev => setPassword(ev.target.value)}/>
                <button className = "primary">Submit</button>
            </form>
            </div>
        </div>
    );
}