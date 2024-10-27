import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query

})

const addComment = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    const {content} = req.body
    const user = req.user

    if(!videoId){
        throw new ApiError(400, "Video ID not found")
    }

    if(!user){
        throw new ApiError(400, "User not found, can't add comment")
    }

    if(!content?.trim()){
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
    const {commentId} = req.params
    const {content} = req.body

    if(!commentId){
        throw new ApiError(400, "Comment ID not found")
    }
    if(!content){
        throw new ApiError(400, "Comment text is required")
    }

    const comment = await Comment.findByIdAndUpdate(
        commentId,
        {
            $set:{
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
    const {commentId} = req.params

    if(!commentId){
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
