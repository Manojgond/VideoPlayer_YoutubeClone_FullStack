import React, { useState, useEffect } from 'react';
import profilePic from "../assets/profilePic.jpg"
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

function CommentSection({ videoId }) {
    const [isFocused, setIsFocused] = useState(false);
    const [content, setContent] = useState('')
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCommentAdded, setIsCommentAdded] = useState(false) // As soon as new comment added Comments to be fetched again so used.

    const url = `http://localhost:8000/api/v1/comments/${videoId}`

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch comments');
                }

                const data = await response.json();

                setComments(data?.data)
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData()
    }, [videoId, isCommentAdded])

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleComment = async () => {
        const comment = { content }

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(comment),
            credentials: 'include',
        });

        if (response.status === 200) {
            setContent('')
            setIsCommentAdded(!isCommentAdded)
        }
    }

    function formatLikes(likes) {
        if ((likes / 1000000000) > 1) {
            return `${Math.floor((likes / 1000000000) * 10) / 10}B`;
        } else if ((likes / 1000000) > 1) {
            return `${Math.floor((likes / 1000000) * 10) / 10}M`;
        } else if ((likes / 1000) > 1) {
            return `${Math.floor((likes / 1000) * 10) / 10}K`;
        } else return likes
    }

    const handleLike = async (commentId) => {
        const url = `http://localhost:8000/api/v1/likes/toggle/c/${commentId}`;
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
        });

        if (response.ok) {
            // Update the comment state with the new like status and count
            setComments((prevComments) => {
                const allComments = prevComments?.data || []
                return allComments.map((comment) =>
                    comment._id === commentId
                        ? {
                            ...comment,
                            isLiked: !comment.isLiked,
                            likesCount: comment.isLiked ? comment.likesCount - 1 : comment.likesCount + 1,
                        }
                        : comment
                )
            }
            );
        }
    };

    // const allComments = comments || [];

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <p className='text-2xl py-5 font-bold'>{comments.length} Comments</p>
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
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value)
                        }}
                        className='outline-none bg-transparent w-full' />
                    <hr className={`border-t-2 border-gray-300 w-full ${isFocused ? "border-opacity-100" : "border-opacity-50"}`} />
                </div>
            </div>
            <div className={`flex justify-end p-2 gap-2 
                ${content ?
                    'block' :
                    isFocused ?
                        'block' :
                        'hidden'}`}>
                <button
                    className='font-bold rounded-full p-2 px-4'
                    onClick={() => {
                        setContent('')
                    }}
                >
                    Cancel
                </button>
                <button
                    onClick={handleComment}
                    className='p-2 font-bold rounded-full bg-blue-500 px-4'>Comment</button>
            </div>
            {/* Comments */}
            <ul>
                {comments.map((comment, index) => {
                    return (
                        <li className='py-4' key={index}>
                            <div>
                                <div className='flex gap-4'>
                                    <div>
                                        <div className='h-12 w-12 rounded-full overflow-hidden'>
                                            <img src={comment.owner[0].avatar} alt="" className='object-cover' />
                                        </div>
                                    </div>
                                    <div>
                                        <div className='flex gap-4 items-center'>
                                            <p>{comment.owner[0].username}</p>
                                            <p className='text-sm text-gray-400'>1 year ago</p>
                                        </div>
                                        <p>{comment.content}</p>
                                        <div className='flex gap-2'>
                                            <button
                                                onClick={() => handleLike(comment._id)}
                                                className='flex items-center gap-2 pr-2 rounded-full py-2'>
                                                {comment.isLiked
                                                    ? <ThumbUpIcon />
                                                    : <ThumbUpOutlinedIcon />}
                                                <p>{(formatLikes(comment.likesCount) > 0) ? formatLikes(comment.likesCount) : ""}</p>
                                            </button>
                                            <button>Reply</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                })}

            </ul>
        </div>
    )
}

export default CommentSection