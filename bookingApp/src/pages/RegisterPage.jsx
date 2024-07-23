import{Link} from "react-router-dom"
import React, {useState} from 'react';
import axios from "axios";
import AnnouncementPopup, { announced } from '../PopUp';
export default function RegisterPage(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    async function registerUser(ev) {
        ev.preventDefault();
        try {
            await axios.post('/register', {
                name,
                email,
                password
            });
            announced("Registration Successful", "You have successfully registered. Please login to continue.");
        } catch (e) {
            announced("Registration Failed", "Registration failed. Please try again.");
            
        }
    }
    
    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className = "mb-64">
            <h1 className="text-4xl text-center mb-4">Register</h1>
            <form className="max-w-md mx-auto" onSubmit = {registerUser}>
                <input type ="text" placeholder='your name' value = {name} onChange = {ev => setName(ev.target.value)}/>
                <input type="email"
                        placeholder= "your@email.com" 
                        value = {email} 
                        onChange = {ev => setEmail(ev.target.value)}/>
                <input type = "password" 
                        placeholder="password"
                        value = {password} 
                        onChange={ev => setPassword(ev.target.value)}/>
                <button className = "primary">Register</button>
                
                <div className = "text-center py-2 text-gray-500">
                    Already a member? <Link to={'/login'} className = "underline text-bn">Login</Link>
                </div>
            </form>
            <AnnouncementPopup/>
            </div>
        </div>
    );

}
