import React, {useState, useEffect} from 'react'
import {auth} from '../firebase'
import { PhoneAuthProvider, multiFactor } from 'firebase/auth'
import { useLocation, useNavigate } from 'react-router-dom'

const TOTPLogin = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [code, setCode] = useState('');
    const [resolver, setResolver] = useState(null);

    useEffect(() => {
        if (location.state?.resolver) {
            setResolver(location.state.resolver);
        }
    }, [location.state]);

    const handleVerify = async () => {
        try {
            const cred = PhoneAuthProvider.credential(resolver.hints[0].uid, code);
            const multiFactorAssertion = PhoneAuthProvider.assertion(cred);
            await resolver.resolveSignIn(multiFactorAssertion);
            navigate('/'); // Redirect to home or dashboard after successful login
        } catch (error) {
            console.error("Error verifying TOTP:", error);
            alert("Failed to verify TOTP: " + error.message);

        } 
    }

    return (
        <div>
            <h2>MFA Login</h2>
            <input placeholder="Enter TOTP code" value={code} onChange={(e) => setCode(e.target.value)} />
            <button onClick={handleVerify}>Verify</button>
        </div>
    )
}

export default TOTPLogin
