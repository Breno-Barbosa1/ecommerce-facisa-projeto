import { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigation = useNavigate();
    const sendRequest = async (e: any) => {
        e.preventDefault();

    const response = await fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password}
        ),
        })
        if (response.ok) {
            navigation("/home");
        } else {
            alert("Login failed. Please check your credentials and try again.");
        }
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = () => {
        navigation("/signup");
    }

  return (
    <div className='login-page'>
        <div className='login-container'>
            <div className='left-container'>
                <h1>Hello!</h1>
                <form id='form-login' onSubmit={(event) => {sendRequest(event)}}>
                    <input onChange={(e) => {setEmail(e.target.value)}} type="text" name="email" placeholder='Enter your email'/>
                    <input onChange={(e) => {setPassword(e.target.value)}} type="password" name="password" placeholder='Enter your password'/>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div className='right-container'>
                <h1>Welcome Back!</h1>
                <p>Not yet registered? Click the button below to Sign in!</p>
                <button type="button" onClick={() => registerUser()}>Sign In</button>
            </div> 
        </div>
    </div>
  )        
};