import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params

    const user = req.user

    if(!videoId){
        throw new ApiError(400, "Video ID not found, can't like/unlike")
    }
    if(!user){
        throw new ApiError(400, "User not found, can't like/unlike")
    }

    const likeObject = Like.findOne(
        {
            video: videoId
        }
    )

    let isLiked;
    let like;

    if(likeObject?.length > 0){
        isLiked = true
    } else isLiked = false;

    if(isLiked){
        await Like.findByIdAndDelete(likeObject[0]?._id)
        like = ""
    } else {
        like = await Like.create(
            {
                video: videoId,
                likedBy: user._id
            }
        )
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, like, "Like/Unlike video done successfully")
    )

})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params

    const user = req.user

    if(!commentId){
        throw new ApiError(400, "Comment ID not found, can't like/unlike")
    }
    if(!user){
        throw new ApiError(400, "User not found, can't like/unlike")
    }

    const likeObject = Like.findOne(
        {
            comment: commentId
        }
    )

    let isLiked;
    let like;

    if(likeObject?.length > 0){
        isLiked = true
    } else isLiked = false;

    if(isLiked){
        await Like.findByIdAndDelete(likeObject[0]?._id)
        like = ""
    } else {
        like = await Like.create(
            {
                comment: commentId,
                likedBy: user._id
            }
        )
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, like, "Like/Unlike comment done successfully")
    )
})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params

    const user = req.user

    if(!tweetId){
        throw new ApiError(400, "Tweet ID not found, can't like/unlike")
    }
    if(!user){
        throw new ApiError(400, "User not found, can't like/unlike")
    }

    const likeObject = Like.findOne(
        {
            tweet: tweetId
        }
    )

    let isLiked;
    let like;

    if(likeObject?.length > 0){
        isLiked = true
    } else isLiked = false;

    if(isLiked){
        await Like.findByIdAndDelete(likeObject[0]?._id)
        like = ""
    } else {
        like = await Like.create(
            {
                tweet: tweetId,
                likedBy: user._id
            }
        )
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, like, "Like/Unlike tweet done successfully")
    )
})

const getLikedVideos = asyncHandler(async (req, res) => {

    const user = req.user

    if(!user){
        throw new ApiError(400, "User not found, can't like/unlike")
    }

    const likedVideos = await Like.find(
        {
            likedBy: user._id
        }
    )

    return res
    .status(200)
    .json(
        new ApiResponse(200, likedVideos, "Liked videos fetched successfully")
    )
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}