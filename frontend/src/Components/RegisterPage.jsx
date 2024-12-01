import React, { useState } from 'react'
import Image from '../assets/Background.jpg'
import loginImage from '../assets/Login_image_nobg.png'

function RegisterPage() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [coverImage, setCoverImage] = useState(null);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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

            // Handle successful response
            if (response.status === 201) {
                setSuccess('User registered successfully!');
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
                        <div className=''>
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Enter your full name"
                                className='p-2 w-3/4 bg-transparent outline-none'
                            />
                        </div>

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

                        <div>
                            <label htmlFor="avatar" className='pr-4'>Avatar</label>
                            <input
                                type="file"
                                id="avatar"
                                onChange={(e) => handleFileChange(e, setAvatar)}
                                accept="image/*"
                            />
                        </div>

                        <div className='flex'>
                            <label htmlFor="coverImage">Cover Image</label>
                            <input
                                type="file"
                                id="coverImage"
                                onChange={(e) => handleFileChange(e, setCoverImage)}
                                accept="image/*"
                            />
                        </div>

                        <div className='my-2'>
                            <button type="submit" className='bg-white text-black w-3/4 p-2'>Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage