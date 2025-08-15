import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import ErrorMsgPopUp from './ErrorMsgPopUp'
// import youtubeImg from '../assets/Youtube_Img.jpg'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function RegisterPage() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [passwordType, setPasswordType] = useState('password');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    // Handle file input change (avatar and cover image)
    const handleFileChange = (e, setFile) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
        }
    };

    // Form submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validate required fields
        if (!fullName || !email || !username || !password || !avatar) {
            setError('All fields are required, including avatar');
            return;
        }

        // Prepare form data for sending to backend
        const formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('email', email);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('avatar', avatar);

        if (coverImage) {
            formData.append('coverImage', coverImage);
        }

        try {
            // Send POST request to backend API for registration
            const response = await fetch('http://localhost:8000/api/v1/users/register', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message)
            } else {
                setSuccess('User registered successfully!');
                navigate('/login')
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
        <div className="w-full h-full flex items-center justify-center flex-col">
            {/* bg-[url('/SpaceBG.png')] bg-cover bg-center  */}
            {success && <div className='text-green-600 font-bold text-center mb-5 text-2xl'>{success}</div>}
            <ErrorMsgPopUp message={error} />
            <div className='w-3/4 h-4/5 grid grid-cols-2 border-white border-2 rounded-lg'>
                <div className='flex items-center justify-center w-full'>
                    <div className='w-4/5 rounded-lg overflow-hidden flex items-center justify-center border-white border-2'>
                        {/* <img src={youtubeImg} alt="" className='w-full' /> */}
                    </div>
                </div>
                <div className='flex flex-col justify-around py-10'>
                    <h1 className='text-3xl'>Create Account</h1>
                    <form onSubmit={handleSubmit} className='w-full flex flex-col'>
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Enter your full name"
                            className='p-2 w-3/4 bg-transparent outline-none border-gray-500 border-2 rounded-md focus:border-gray-400'
                        />

                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className='p-2 w-3/4 bg-transparent outline-none border-gray-500 border-2 rounded-md focus:border-gray-400'
                        />

                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Choose a username"
                            className='p-2 w-3/4 bg-transparent outline-none border-gray-500 border-2 rounded-md focus:border-gray-400'
                        />

                        <label htmlFor="password">Password</label>
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

                        <div className='py-2'>
                            <label htmlFor="avatar" className='pr-4'>Avatar</label>
                            <input
                                type="file"
                                id="avatar"
                                onChange={(e) => handleFileChange(e, setAvatar)}
                                accept="image/*"
                            />
                        </div>

                        <div className='py-2'>
                            <label htmlFor="coverImage" className='pr-4'>Cover Image</label>
                            <input
                                type="file"
                                id="coverImage"
                                onChange={(e) => handleFileChange(e, setCoverImage)}
                                accept="image/*"
                            />
                        </div>

                        <div className='my-2'>
                            <button type="submit" className='bg-white text-black w-3/4 p-2 hover:font-bold transition-all duration-300'>Register</button>
                        </div>
                    </form>
                    <div>
                        <span>Already have an account ?</span>
                        <Link to="/login" className='px-3 text-blue-700 underline hover:font-semibold'>Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage