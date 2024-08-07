import{Link} from "react-router-dom";
import {useState} from 'react';
import axios from "axios";
import AnnouncementPopup, { announced } from '../PopUp';
export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function handleLogin(ev){
        ev.preventDefault();
        try{
        await axios.post('/login',{email,password});
        announced("Login Successful", "You have successfully logged in.");
        } catch(e) {
        announced("Login Failed", "Login failed. Please try again.");
        }
    }
    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className = "mb-64">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            <form className="max-w-md mx-auto" onSubmit={handleLogin}>
                <input type="email" 
                        placeholder="your@email.com" 
                        value = {email} 
                        onChange={ev => setEmail(ev.target.value)}/>
                <input type = "password" 
                        placeholder="password"
                        value = {password} 
                        onChange = {ev => setPassword(ev.target.value)}/>
                <button className = "primary">Login</button>
                <div className = "text-center py-2 text-gray-500">
                    Don't have an account? <Link to={'/register'} className = "underline text-bn">Register here</Link>
                </div>
            </form>
            <AnnouncementPopup/>
            </div>
        </div>
    );

}