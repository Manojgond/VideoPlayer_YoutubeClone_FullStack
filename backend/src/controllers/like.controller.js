import mongoose, { isValidObjectId } from "mongoose"
import { Like } from "../models/like.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    const user = req.user

    if (!videoId) {
        throw new ApiError(400, "Video ID not found, can't like/unlike")
    }
    if (!user) {
        throw new ApiError(400, "User not found, can't like/unlike")
    }

    const likeObject = await Like.findOne(
        {
            video: videoId,
            likedBy: user._id
        }
    )


    let like;

    if (likeObject) {
        await Like.findByIdAndDelete(likeObject?._id)
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
    const { commentId } = req.params

    const user = req.user

    if (!commentId) {
        throw new ApiError(400, "Comment ID not found, can't like/unlike")
    }
    if (!user) {
        throw new ApiError(400, "User not found, can't like/unlike")
    }

    const likeObject = await Like.findOne(
        {
            comment: commentId,
            likedBy: user._id
        }
    )

    let like;

    if (likeObject) {
        await Like.findByIdAndDelete(likeObject?._id)
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
    const { tweetId } = req.params

    const user = req.user

    if (!tweetId) {
        throw new ApiError(400, "Tweet ID not found, can't like/unlike")
    }
    if (!user) {
        throw new ApiError(400, "User not found, can't like/unlike")
    }

    const likeObject = await Like.findOne(
        {
            tweet: tweetId,
            likedBy: user._id
        }
    )

    let like;

    if (likeObject) {
        await Like.findByIdAndDelete(likeObject?._id)
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

    if (!user) {
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

const isLikedVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const user = req.user

    if (!user) {
        throw new ApiError(400, "User not found, Unauthorized request")
    }

    if (!videoId) {
        throw new ApiError(400, "Video ID not found")
    }

    const likeObject = await Like.findOne(
        {
            video: videoId,
            likedBy: user._id
        }
    )

    const isLiked = likeObject ? true : false;

    return res
        .status(200)
        .json(
            new ApiResponse(200, isLiked, "Video liked status sent properly")
        )
})

const videoTotalLikes = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    if (!videoId) {
        throw new ApiError(400, "Video ID not found")
    }

    const totalLikes = await Like.countDocuments(
        {
            video: videoId
        }
    )

    return res
        .status(200)
        .json(
            new ApiResponse(200, totalLikes, "Total likes of given video fetched successfully")
        )
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos,
    isLikedVideo,
    videoTotalLikes
}