import mongoose from "mongoose"
import { Comment } from "../models/comment.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const { page = 1, limit = 10 } = req.query

    const comments = await Comment.aggregate([
        {
            $match: {
                video: new mongoose.Types.ObjectId(videoId),
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                    {
                        $project: {
                            username: 1,
                            avatar: 1
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "comment",
                as: "likes"
            }
        },
        {
            $addFields: {
                isLiked: {
                    $cond: {
                        if: {
                            $gt: [
                                {
                                    $size: {
                                        $filter: {
                                            input: "$likes",
                                            as: "like",
                                            cond: {
                                                $eq: ["$$like.likedBy", new mongoose.Types.ObjectId(req.user?._id)]
                                            }
                                        }
                                    }
                                },
                                0
                            ]
                        },
                        then: true,
                        else: false
                    }
                },
                likesCount: {
                    $size: '$likes'
                }
            }
        },
        {
            $project: {
                content: 1,
                video: 1,
                owner: 1,
                isLiked: 1,
                likesCount: 1,
            }
        }
    ])

    return res
        .status(200)
        .json(
            new ApiResponse(200, comments, "Comments fetched successfylly")
        )
})

const addComment = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const { content } = req.body
    const user = req.user

    if (!videoId) {
        throw new ApiError(400, "Video ID not found")
    }

    if (!user) {
        throw new ApiError(400, "User not found, can't add comment")
    }

    if (!content?.trim()) {
        throw new ApiError(400, "Comment text cannot be blank")
    }

    const comment = await Comment.create(
        {
            content,
            video: videoId,
            owner: user._id
        }
    )

    return res
        .status(200)
        .json(
            new ApiResponse(200, comment, "Comment added successfully")
        )

})

const updateComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params
    const { content } = req.body

    if (!commentId) {
        throw new ApiError(400, "Comment ID not found")
    }
    if (!content) {
        throw new ApiError(400, "Comment text is required")
    }

    const comment = await Comment.findByIdAndUpdate(
        commentId,
        {
            $set: {
                content
            }
        },
        {
            new: true
        }
    )

    return res
        .status(200)
        .json(
            new ApiResponse(200, comment, "Comment updated successfully")
        )
})

const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params

    if (!commentId) {
        throw new ApiError(400, "Comment ID not found")
    }

    await Comment.findByIdAndDelete(commentId)

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Comment deleted successfully")
        )
})

export {
    getVideoComments,
    addComment,
    updateComment,
    deleteComment
}
