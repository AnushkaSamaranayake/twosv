import React, {useState} from 'react'
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    multiFactor,
    TotpMultiFactorGenerator,
    TotpSecret,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import {auth} from '../firebase'

const Signup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [otp, setOtp] = useState('')
    const [otpSent, setOtpSent] = useState(false)
    const [error, setError] = useState(null)
    const [signedUp, setSignedUp] = useState(false)
    const [totpSecret, setTotpSecret] = useState(null)

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await sendEmailVerification(user);
            alert("Verification Email sent. Please Verify the Email.");
            setSignedUp(true);

            auth.signOut();
        } catch (error) {
            console.error('Signup error', error);
            alert(error.message);
        }
    };

    // const handleSignIn = async () => {
    //     try {

    //         const userCredential = await signInWithEmailAndPassword(auth, email, password);
    //         alert('Successfully logged in')

    //     } catch (error) {
    //         console.log('Login error', error)
    //         alert('Login Error')
    //     }
    // };

    return (
        <div>
            <h2>SignUp</h2>
            <input type="email" placeholder='Email' onChange={e => setEmail(e.target.value)}/>
            <input type="password" placeholder='Password' onChange={e => setPassword(e.target.value)}/>
            <button onClick={handleSignUp}>Sign Up</button>

            {/* <hr />

            {signedUp && (
                <div>
                    <h2>Sign In</h2>
                    <input type="email" placeholder='Email' onChange={e => setEmail(e.target.value)}/>
                    <input type="password" placeholder='Password' onChange={e => setPassword(e.target.value)}/>
                    <button onClick={handleSignIn}>Sign In</button>
                </div>
            )} */}

        </div>
    )
}

export default Signup
