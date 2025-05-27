import React, {useState} from 'react'
import {auth} from '../firebase'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            alert('Successfully logged in');
            navigate('/enroll-totp'); // Redirect to home or dashboard after login
        } catch (error) {
            if (error.code === 'auth/multi-factor-auth-required') {
                navigate('/mfa-login', { state: {resolver: error } }); // Redirect to TOTP enrollment page
            } else {
                console.error('Login error', error);
                alert('Login Error: ' + error.message);
            }
        }
    }

    return (
        <div>
            <h2>Log In</h2>
            <input type="email" placeholder='Email' onChange={e => setEmail(e.target.value)}/>
            <input type="password" placeholder='Password' onChange={e => setPassword(e.target.value)}/>
            <button onClick={handleSignIn}>Sign In</button>
        </div>
    )
}

export default Login;
