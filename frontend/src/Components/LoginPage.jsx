import React, { useState } from 'react'
import Image from '../assets/Background.jpg'
import loginImage from '../assets/Login_image_nobg.png'

function LoginPage() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    // Form submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validate required fields
        if (!email || !username || !password) {
            setError('All fields are required, including avatar');
            return;
        }

        // Prepare form data for sending to backend
        const loginData = { email, username, password };

        try {
            // Send POST request to backend API for registration
            const response = await fetch('http://localhost:8000/api/v1/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
                credentials: 'include',
            });

            // Handle successful response
            if (response.status === 200) {
                setSuccess('User logged in successfully!');
            }
        } catch (err) {
            // Handle error response
            if (err.response) {
                setError(err.response.data.message || 'An error occurred');
            } else {
                setError('Network error, please try again');
            }
        }
    };

    return (
        <div className="bg-[url('/Background.jpg')] bg-cover bg-center w-full h-full flex items-center justify-center flex-col">
            {error && <div className='text-red-600 font-bold text-center mb-5 text-2xl'>{error}</div>}
            {success && <div className='text-green-600 font-bold text-center mb-5 text-2xl'>{success}</div>}
            <div className='bg-[#FF0000] w-1/2 h-3/4 rounded-[15%] grid grid-cols-2'>
                <div className='flex items-center justify-center'>
                    <img src={loginImage} alt="" />
                </div>
                <div className='flex flex-col justify-center '>
                    <form onSubmit={handleSubmit} className='w-full'>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className='p-2 w-3/4 bg-transparent outline-none'
                            />
                        </div>

                        <div>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Choose a username"
                                className='p-2 w-3/4 bg-transparent outline-none'
                            />
                        </div>

                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className='p-2 w-3/4 bg-transparent outline-none'
                            />
                        </div>
                        <div className='my-2'>
                            <button type="submit" className='bg-white text-black w-3/4 p-2'>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage