import React, { useState } from 'react'
// import youtubeImg from 'https://pngdownload.io/wp-content/uploads/2023/12/YouTube-Logo-PNG-Symbol-for-Video-Platform-Transparent-jpg.webp'
import { useNavigate, Link } from 'react-router-dom'
import ErrorMsgPopUp from './ErrorMsgPopUp'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordType, setPasswordType] = useState('password');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate()


    // Form submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validate required fields
        if ((!email && !username) || !password) {
            setError('email or username and password fields are required');
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

            const data = await response.json();

            if (!response.ok) {
                setError(data.message)
            } else {
                setSuccess('User logged in successfully!');
                navigate('/')
            }

        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'An error occurred');
            } else {
                setError('Network error, please try again');
            }
        }
    };

    const handleShowPassClick = (e) => {
        e.preventDefault();

        if (passwordType === 'password') {
            setPasswordType('text')
        } else setPasswordType('password');
    }

    return (
        <div className="bg-[url('./SpaceBG.png')] bg-cover bg-center w-full h-full flex items-center justify-center flex-col">
            {success && <div className='text-green-600 font-bold text-center mb-5 text-2xl'>{success}</div>}
            <ErrorMsgPopUp message={error} />
            <div className='w-3/4 h-3/4 grid grid-cols-2 border-white border-2 rounded-lg'>
                <div className='flex items-center justify-center w-full'>
                    <div className='w-4/5 rounded-lg overflow-hidden flex items-center justify-center border-white border-2'>
                        {/* <img src={youtubeImg} alt="Logo" className='w-full' /> */}
                    </div>
                </div>
                <div className='flex flex-col justify-around py-10'>
                    <h1 className='text-3xl'>Welcome Back</h1>
                    <form onSubmit={handleSubmit} className='w-full flex flex-col'>
                        <label htmlFor="email" className='py-2'>Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className='p-2 w-3/4 bg-transparent outline-none border-gray-500 border-2 rounded-md focus:border-gray-400'
                        />

                        <label htmlFor="username" className='py-2'>Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Choose a username"
                            className='p-2 w-3/4 bg-transparent outline-none border-gray-500 border-2 rounded-md focus:border-gray-400'
                        />

                        <label htmlFor="password" className='py-2'>Password</label>
                        <div className='w-3/4 flex border-gray-500 border-2 rounded-md focus:border-gray-400 justify-center'>
                            <input
                                type={passwordType}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className='p-2 w-full bg-transparent outline-none'
                            />
                            <span className='px-3'
                                onClick={handleShowPassClick}>
                                {passwordType === 'password'
                                    ? <VisibilityIcon />
                                    : <VisibilityOffIcon />}
                            </span>
                        </div>
                        <div className='my-5'>
                            <button type="submit" className='bg-white text-black w-3/4 p-2 hover:font-bold transition-all duration-300'>Login</button>
                        </div>
                    </form>
                    <div>
                        <span>Don't have an account ?</span>
                        <Link to="/register" className='px-3 text-blue-700 underline hover:font-semibold'>Register</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage