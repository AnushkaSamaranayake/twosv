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

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await sendEmailVerification(user);
            alert("Verification Email sent. Please Verify the Email.");

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
        <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4'>
            <h2 className='text-center mb-6'>SignUp</h2>
            <input className='px-2 mt-3 mb-3 border rounded-lg' type="email" placeholder='Email' onChange={e => setEmail(e.target.value)}/>
            <input className='px-2 mt-3 mb-3 border rounded-lg' type="password" placeholder='Password' onChange={e => setPassword(e.target.value)}/>
            <button className='border p-2 mt-3 rounded-lg' onClick={handleSignUp}>Sign Up</button>

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
