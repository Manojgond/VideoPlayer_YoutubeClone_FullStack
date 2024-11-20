import React, { useState } from 'react';
import profilePic from "../assets/profilePic.jpg"
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

function CommentSection() {
    const [isFocused, setIsFocused] = useState(false);
    const [commentText, setCommentText] = useState('')

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <div>
            <p className='text-2xl py-5 font-bold'>5,183 Comments</p>
            {/* Input to add comment */}
            <div className='w-full flex items-center'>
                <div className='h-12 w-12 rounded-full overflow-hidden'>
                    <img src={profilePic} alt="" className='object-cover' />
                </div>
                <div className='px-3 w-full pb-4'>
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        value={commentText}
                        onChange={(e) => {
                            setCommentText(e.target.value)
                        }}
                        className='outline-none bg-transparent w-full' />
                    <hr className={`border-t-2 border-gray-300 w-full ${isFocused ? "border-opacity-100" : "border-opacity-50"}`} />
                </div>
            </div>
            <div className={`flex justify-end p-2 gap-2 
                ${commentText ?
                    'block' :
                    isFocused ?
                        'block' :
                        'hidden'}`}>
                <button
                    className='font-bold rounded-full p-2 px-4'
                    onClick={() => {
                        setCommentText('')
                    }}
                >
                    Cancel
                </button>
                <button className='p-2 font-bold rounded-full bg-blue-500 px-4'>Comment</button>
            </div>
            {/* Comments */}
            <ul>
                <li className='py-4'>
                    <div>
                        <div className='flex gap-4'>
                            <div>
                                <div className='h-12 w-12 rounded-full overflow-hidden'>
                                    <img src={profilePic} alt="" className='object-cover' />
                                </div>
                            </div>
                            <div>
                                <div className='flex gap-4 items-center'>
                                    <p>Channle name</p>
                                    <p className='text-sm text-gray-400'>1 year ago</p>
                                </div>
                                <p>This is a comment text and Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias omnis ab repellendus! Iure omnis vitae nobis nesciunt ipsam! Dolores, aliquam!</p>
                                <div className='flex gap-2'>
                                    <button className='flex items-center gap-2 pr-2 rounded-full py-2'>
                                        <ThumbUpOutlinedIcon />
                                        <p>214K</p>
                                    </button>
                                    <button>Reply</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>

        </div>
    )
}

export default CommentSection